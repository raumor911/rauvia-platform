import fs from 'node:fs';
import path from 'node:path';
import type {WPPost} from '../../src/lib/wp';
import {sortPublishedPosts} from '../../src/lib/postDates';
import {FALLBACK_POSTS} from '../../src/data/fallbackPosts';

export type PostResult = {status: 200 | 404 | 503; post?: WPPost; stale?: boolean};
// Strict content/event reads retain retry and ten-minute freshness. Resource
// views use a bounded cold read and a last-known-good snapshot while refreshing.
export function createWordPressCache({fetcher = fetch, now = Date.now, env = process.env, fallback = FALLBACK_POSTS, storagePath = env.WORDPRESS_CACHE_PATH}: {
  fetcher?: typeof fetch; now?: () => number; env?: NodeJS.ProcessEnv; fallback?: WPPost[]; storagePath?: string;
} = {}) {
  const ttl = 10 * 60 * 1000; const entries = new Map<string,{result:PostResult; expires:number}>();
  const inflight = new Map<string,Promise<PostResult>>();
  let generation = 0, freshGeneration = -1, retryAfter = 0;
  let persistChain: Promise<void> = Promise.resolve();
  let cachedPosts: WPPost[] = sortPublishedPosts(fallback); let lastFetchTime = 0; let listInflight: Promise<WPPost[]> | undefined;
  const base = env.VITE_WORDPRESS_API_URL || 'https://blog.rauvia.com.mx/wp-json/wp/v2';
  const validPosts = (data: unknown): data is WPPost[] => Array.isArray(data) && data.every(p=>p && typeof p.date==='string' && Number.isFinite(Date.parse(p.date)) && typeof p.slug==='string' && typeof p.title?.rendered==='string' && typeof p.content?.rendered==='string' && typeof p.excerpt?.rendered==='string');
  const fresh = () => lastFetchTime > 0 && freshGeneration === generation && now()-lastFetchTime < ttl;
  // Restore a successful runtime snapshot, never build-time HTML. A restart
  // revalidates it while readers immediately see the last known good content.
  if (storagePath) {
    try {
      if (fs.statSync(storagePath).size <= 10 * 1024 * 1024) {
        const saved=JSON.parse(fs.readFileSync(storagePath,'utf8'));
        if(saved.version===1 && saved.base===base && validPosts(saved.posts) && saved.posts.every((p:WPPost)=>!p.status || p.status==='publish') && Number.isFinite(saved.fetchedAt) && saved.fetchedAt>0 && saved.fetchedAt<=now()) {
          cachedPosts=sortPublishedPosts(saved.posts); lastFetchTime=saved.fetchedAt;
        }
      }
    } catch { /* Missing or corrupt storage must not prevent startup. */ }
  }
  function persist(posts: WPPost[], epoch: number, fetchedAt: number) {
    if(!storagePath)return Promise.resolve();
    const file=storagePath;
    // Serialize atomic writes so an earlier fetch cannot replace a newer file.
    persistChain=persistChain.then(async()=>{
      if(epoch!==generation)return;
      await fs.promises.mkdir(path.dirname(file),{recursive:true});
      const tmp=file+'.tmp';
      await fs.promises.writeFile(tmp,JSON.stringify({version:1,base,fetchedAt,posts}),{mode:0o600});
      if(epoch===generation)await fs.promises.rename(tmp,file);
      else await fs.promises.unlink(tmp).catch(()=>{});
    }).catch(()=>{ /* RAM remains usable when disk is read-only or full. */ });
    return persistChain;
  }
  function remember(slug: string, result: PostResult) {
    if (entries.size >= 256 && !entries.has(slug)) entries.delete(entries.keys().next().value!);
    entries.set(slug,{result,expires:now()+(result.status===404?60_000:ttl)});
  }
  async function request(slug?: string): Promise<WPPost[]> {
    const url = new URL(base.replace(/\/$/,'')+'/posts');
    url.searchParams.set('per_page','100'); url.searchParams.set('orderby','date'); url.searchParams.set('order','desc');
    url.searchParams.set('_embed',''); url.searchParams.set('status','publish'); url.searchParams.set('_cb',String(now()));
    if (slug) url.searchParams.set('slug',slug);
    for (let attempt=0; attempt<2; attempt++) {
      try {
        const response=await fetcher(url.toString(),{cache:'no-store',signal:AbortSignal.timeout(Number(env.WORDPRESS_FETCH_TIMEOUT_MS)||5000)});
        if (!response.ok) throw new Error(`WordPress HTTP ${response.status}`);
        const data=await response.json();
        if (!validPosts(data)) throw new Error('Invalid WordPress posts');
        return sortPublishedPosts(data.filter(p=> !p.status || p.status==='publish'));
      } catch (error) {
        if (attempt===1) throw error;
        await new Promise(resolve=>setTimeout(resolve,500));
      }
    }
    throw new Error('WordPress unavailable');
  }
  async function getPost(slug: string): Promise<PostResult> {
    if (!slug || /[/?#\s]/.test(slug) || slug.length>200) return {status:404};
    const entry=entries.get(slug); if (entry && entry.expires>now()) return entry.result;
    const match=cachedPosts.find(p=>p.slug===slug);
    if (match && entry?.result.status!==404 && fresh()) return {status:200,post:match};
    if (inflight.has(slug)) return inflight.get(slug)!;
    const epoch=generation;
    const pending=(async (): Promise<PostResult> => {
      try {
        const posts=await request(slug); if(epoch!==generation) return getPost(slug); const post=posts.find(p=>p.slug===slug);
        const result: PostResult=post ? {status:200,post} : {status:404};
        remember(slug,result); return result;
      } catch {
        if(epoch!==generation) return getPost(slug);
        const stale=entry?.result.post || (entry?.result.status===404 ? undefined : match);
        // An outage is not evidence that a post does not exist. Never cache a
        // failed fetch as a 404, and never replace an unknown article with Home.
        return stale ? {status:200,post:stale,stale:true} : {status:503};
      } finally { if(epoch===generation) inflight.delete(slug); }
    })();
    inflight.set(slug,pending); return pending;
  }
  async function getPosts(): Promise<WPPost[]> {
    if (fresh()) return cachedPosts;
    if (listInflight) return listInflight;
    const epoch=generation;
    listInflight=(async()=>{
      try {
        const posts=await request(); if(epoch!==generation)return getPosts();
        cachedPosts=posts; lastFetchTime=now(); freshGeneration=epoch; retryAfter=0;
        await persist(posts,epoch,lastFetchTime);
        return epoch===generation ? posts : getPosts();
      } catch {
        if(epoch!==generation)return getPosts();
        retryAfter=now()+30_000; return cachedPosts;
      } finally {if(epoch===generation)listInflight=undefined;}
    })();
    return listInflight;
  }
  async function fetchWPPosts(slug?: string) {
    if (!slug) return getPosts();
    const result=await getPost(slug); return result.post ? [result.post] : [];
  }
  function invalidate() {
    generation++; retryAfter=0; listInflight=undefined; inflight.clear();
    for(const entry of entries.values()) entry.expires=0;
  }
  async function getPostsSnapshot() {
    const posts=await getPosts();
    return {posts, stale:!fresh()};
  }
  async function getResourcesSnapshot() {
    if(fresh())return {posts:cachedPosts,stale:false};
    // Failed upstream requests cannot trigger a retry storm on a popular page.
    if(now()<retryAfter)return {posts:cachedPosts,stale:true};
    const refresh=getPosts();
    if(lastFetchTime>0)return {posts:cachedPosts,stale:true};
    const budget=Math.min(1500,Math.max(1,Number(env.WORDPRESS_RESOURCES_WAIT_MS)||1000));
    let timer:ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([refresh,new Promise<void>(resolve=>{timer=setTimeout(resolve,budget);})]);
    } finally {if(timer)clearTimeout(timer);}
    return {posts:cachedPosts,stale:!fresh()};
  }
  return {getPost,getPosts,getPostsSnapshot,getResourcesSnapshot,fetchWPPosts,invalidate,revision:()=>generation};
}
export const wordpressCache = createWordPressCache({storagePath:process.env.WORDPRESS_CACHE_PATH || path.join(process.cwd(),'data','wordpress-posts-cache.json')});
