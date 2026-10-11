import fs from 'node:fs';
import path from 'node:path';
import {createHash, randomUUID, timingSafeEqual} from 'node:crypto';

export const INDEXNOW_KEY = '1109c92c84549878ea17f221eaba40bc';
export const ORIGIN = 'https://rauvia.com.mx';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// Validation is independent of request Host/Forwarded headers and CMS permalinks.
export function validateUrl(value) {
  if (typeof value !== 'string' || value.length > 2048 || /[\s\\]/.test(value)) throw new Error('Invalid URL');
  const url = new URL(value);
  if (url.origin !== ORIGIN || url.username || url.password || url.hash || url.search ||
      url.href !== value || /%(?:2f|5c|2e|00)/i.test(url.pathname) ||
      /\/{2}/.test(url.pathname) || !url.pathname.endsWith('/') ||
      /^\/(api|internal|src|server|data|docs|assets|llmo)(\/|$)/.test(url.pathname)) {
    throw new Error('Only canonical public RAUVIA page URLs are allowed');
  }
  return url.href;
}

export function authorized(header, secret) {
  if (typeof secret !== 'string' || secret.length < 32 || typeof header !== 'string') return false;
  const actual = Buffer.from(header);
  const expected = Buffer.from(`Bearer ${secret}`);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

const decodeXml = value => value.replace(/&(?:amp|lt|gt|quot|apos);/g, c => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'"}[c]));
export function sitemapSnapshot(xml, distRoot) {
  if (typeof xml !== 'string' || !xml.includes('<urlset') || !xml.includes('</urlset>')) throw new Error('Invalid sitemap snapshot');
  const result = {};
  for (const match of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g)) {
    const url = validateUrl(decodeXml(match[1]));
    const lastmod = match[2].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] || '';
    const pathname = new URL(url).pathname;
    let content = lastmod;
    // Article HTML is resolved dynamically. Its authoritative revision is WP lastmod.
    if (!pathname.startsWith('/recursos/') || pathname === '/recursos/') {
      const file = path.join(distRoot, pathname, 'index.html');
      if (fs.existsSync(file)) content += createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    }
    result[url] = createHash('sha256').update(content).digest('hex');
  }
  if (!Object.keys(result).length) throw new Error('Empty sitemap must not remove every URL');
  return result;
}

export function createIndexNow({env = process.env, fetcher = fetch, now = Date.now, log = (_level, _event, _meta) => {}} = {}) {
  const key = env.INDEXNOW_KEY || INDEXNOW_KEY;
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid INDEXNOW_KEY');
  const enabled = env.NODE_ENV === 'production' && env.INDEXNOW_ENABLED === 'true';
  const statePath = env.INDEXNOW_STATE_PATH || path.join(process.cwd(), 'data', 'indexnow-state.json');
  const batchSize = Math.min(10000, Math.max(1, Math.floor(Number(env.INDEXNOW_BATCH_SIZE) || 1000)));
  const timeoutMs = Math.min(30000, Math.max(100, Number(env.INDEXNOW_TIMEOUT_MS) || 5000));
  const maxQueue = 50000;
  let state = {version:1, snapshot:null, pending:{}};
  let running = null;
  let stopped = false;
  let controller;
  const activeIds = new Set();
  if (enabled && fs.existsSync(statePath)) {
    // Fail closed on corrupted state, avoiding mass deletion notifications.
    const saved = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    if (saved.version !== 1 || !saved.pending || typeof saved.pending !== 'object' || Array.isArray(saved.pending) ||
        (saved.snapshot !== null && (!saved.snapshot || typeof saved.snapshot !== 'object' || Array.isArray(saved.snapshot)))) throw new Error('Invalid IndexNow state');
    for (const [url, item] of Object.entries(saved.pending)) {
      validateUrl(url);
      if (!item || typeof item.id !== 'string' || !Number.isFinite(item.nextAt) || !Number.isInteger(item.attempts) || item.attempts < 0) throw new Error('Invalid IndexNow pending item');
    }
    for (const url of Object.keys(saved.snapshot || {})) validateUrl(url);
    state = saved;
  }
  function persist(next) {
    fs.mkdirSync(path.dirname(statePath), {recursive:true});
    const temporary = `${statePath}.${process.pid}.tmp`;
    try {
      fs.writeFileSync(temporary, JSON.stringify(next), {mode:0o600});
      fs.renameSync(temporary, statePath);
      state = next;
    } finally {
      if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
    }
  }
  function add(pending, urls) {
    for (const url of urls) pending[url] = {id:randomUUID(), attempts:0, nextAt:0};
    if (Object.keys(pending).length > maxQueue) throw new Error('IndexNow queue capacity exceeded');
  }
  function enqueue(urls) {
    const valid = [...new Set(urls.map(validateUrl))];
    if (!enabled || stopped) return {queued:0, enabled};
    const pending = {...state.pending};
    // Repeated hooks preserve backoff and deduplicate until the first send completes.
    add(pending, valid.filter(url => !pending[url] || activeIds.has(pending[url].id)));
    persist({...state, pending});
    return {queued:valid.length, enabled};
  }
  function observe(snapshot) {
    for (const url of Object.keys(snapshot)) validateUrl(url);
    if (!Object.keys(snapshot).length) throw new Error('Empty IndexNow snapshot');
    if (!enabled || stopped) return {changed:0};
    const previous = state.snapshot;
    const changed = previous ? [...new Set([...Object.keys(previous), ...Object.keys(snapshot)])].filter(url => previous[url] !== snapshot[url]) :
      env.INDEXNOW_SUBMIT_INITIAL === 'true' ? Object.keys(snapshot) : [];
    const pending = {...state.pending};
    // A new content revision replaces any older in-flight revision or rejected item.
    add(pending, changed);
    persist({...state, snapshot, pending});
    log('info', 'indexnow_snapshot', {changed:changed.length, initial:previous === null});
    return {changed:changed.length};
  }
  function retryDelay(response, attempts) {
    const value = response?.headers.get('retry-after');
    const seconds = value && /^\d+$/.test(value) ? Number(value) : NaN;
    const requested = Number.isFinite(seconds) ? seconds * 1000 : value ? Date.parse(value) - now() : 0;
    return Math.min(86400000, Math.max(60000, requested || 60000 * 2 ** Math.min(attempts - 1, 10)));
  }
  async function send() {
    if (!enabled || stopped) return {enabled, sent:0};
    const taskUrls = Object.entries(state.pending).filter(([, item]) => !item.blocked && item.nextAt <= now());
    let sent = 0;
    // Bounded work; excess remains durable for the next existing sitemap tick/event.
    for (let offset = 0; offset < Math.min(taskUrls.length, 10000) && !stopped; offset += batchSize) {
      const batch = taskUrls.slice(offset, offset + batchSize);
      for (const [, item] of batch) activeIds.add(item.id);
      let response;
      controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        response = await fetcher(ENDPOINT, {method:'POST', redirect:'error', signal:controller.signal,
          headers:{'Content-Type':'application/json; charset=utf-8'},
          body:JSON.stringify({host:'rauvia.com.mx',key,keyLocation:`${ORIGIN}/${key}.txt`,urlList:batch.map(([url]) => url)})});
        await response.body?.cancel();
      } catch {
        log('warn', 'indexnow_transport_failed', {count:batch.length});
      } finally {
        clearTimeout(timer);
        controller = undefined;
      }
      const status = response?.status || 0;
      const accepted = status === 200 || status === 202;
      const permanent = [400,403,422].includes(status);
      const pending = {...state.pending};
      for (const [url, item] of batch) {
        if (pending[url]?.id !== item.id) continue;
        if (accepted) {delete pending[url]; sent++;}
        else pending[url] = {...item, attempts:item.attempts+1, blocked:permanent,
          nextAt:now()+retryDelay(response,item.attempts+1), lastStatus:status};
      }
      persist({...state, pending});
      activeIds.clear();
      log(accepted ? 'info' : 'warn', 'indexnow_response', {status,count:batch.length,accepted,keyValidationPending:status===202,blocked:permanent});
      // Avoid multiple failing batches against a throttled or unavailable endpoint.
      if (!accepted) break;
    }
    return {enabled,sent,pending:Object.keys(state.pending).length};
  }
  function flush() {
    if (!running) running = send().finally(() => {running = null;});
    return running;
  }
  return {key,enabled,enqueue,observe,flush,
    stop() {stopped=true;controller?.abort();},
    status() {return {enabled,pending:Object.keys(state.pending).length,blocked:Object.values(state.pending).filter(item => item.blocked).length,inFlight:!!running};},
  };
}
