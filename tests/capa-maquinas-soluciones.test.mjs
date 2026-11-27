// Pruebas de la capa para máquinas del catálogo de Soluciones (spec «página Soluciones» v0.2, S-06 / L-08).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {soluciones, solucionesExcluidas, SOLUCIONES_REVIEWED_AT, SOLUCIONES_REVIEWED_LABEL} from '../src/data/solucionesCatalog.js';
import {run as runMachineLayer} from '../scripts/build-machine-layer.js';
import {parseRobots, groupFor, isAllowed} from '../scripts/robots-check.mjs';
import {computeRegistry, formatLastmod, routeUrl} from '../scripts/lastmod-registry.mjs';
import {renderSitemap, reconcileCachedSitemap} from '../scripts/generate-sitemap.js';
import {publicRoutes} from '../scripts/public-routes.js';

const base = process.env.TEST_BASE_URL;
const read = p => fs.readFileSync(p, 'utf8');
const json = p => JSON.parse(read(p));
const llmoFiles = fs.readdirSync('public/llmo').map(f => `public/llmo/${f}`);
const machineText = ['public/llms.txt', 'public/llms-full.txt', ...llmoFiles.filter(f => !f.endsWith('.json') || f.endsWith('soluciones.json'))];
const jsonLd = html => [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));

// La tarjeta le habla al lector; los archivos para máquinas, en tercera persona. Solo cambian estas expresiones.
const aTerceraPersona = t => t.replace('que tu empresa ya tiene', 'que una empresa ya tiene').replace('de tu empresa', 'de una empresa')
  .replace('qué vendes', 'qué vende').replace('dónde lo entregas', 'dónde lo entrega').replace('tu oferta corregida', 'la oferta de la empresa corregida')
  .replace('por tu cuenta', 'por cuenta de la empresa').replace('para explicar qué vende hoy', 'para explicarla').replace(/^Empresa /, 'Empresas ').replace('una prioridad clara que necesita', 'una prioridad ya identificada que necesitan');

test('todos los JSON de llmo/ son válidos', () => {
  for (const f of llmoFiles.filter(f => f.endsWith('.json'))) assert.doesNotThrow(() => json(f), f);
});

test('soluciones.json coincide con la fuente única, las tarjetas y la ItemList: nombres, URL y definiciones', () => {
  const s = json('public/llmo/soluciones.json');
  assert.equal(s.order, 'unordered');
  assert.equal(s.reviewed_at, SOLUCIONES_REVIEWED_AT);
  assert.deepEqual(s.solutions.map(x => x.id), soluciones.map(x => x.id));
  assert.deepEqual(s.solutions.map(x => x.name), soluciones.map(x => x.name));
  assert.deepEqual(s.solutions.map(x => x.canonical), soluciones.map(x => x.url));
  assert.deepEqual(s.solutions.map(x => x.definition), soluciones.map(x => x.definitionMachine));
  assert.deepEqual(s.excluded.map(x => x.id), solucionesExcluidas.map(x => x.id));
  assert.ok(s.rules.some(r => /sin promesa de ventas, posiciones, menciones ni citas/i.test(r)));
  for (const x of s.solutions) assert.deepEqual(Object.keys(x), ['id', 'name', 'definition', 'audience', 'includes', 'excludes', 'canonical', 'price_source']);
  // La versión de máquinas no se desfasa de la tarjeta: es la misma frase en tercera persona.
  for (const c of soluciones) {
    assert.equal(c.definitionMachine, aTerceraPersona(c.definition), c.id);
    assert.equal(c.audienceMachine, aTerceraPersona(c.audience).replace(/^Empresa /, 'Empresas '), c.id);
    assert.deepEqual(c.includesMachine ?? c.includes, c.includes.map(aTerceraPersona), c.id);
  }
  // Página: el HTML construido tiene las mismas definiciones y la ItemList los mismos nombres y URL.
  const html = read('dist/soluciones/index.html');
  const list = jsonLd(html).flatMap(b => b['@graph'] || [b]).find(n => n.mainEntity?.['@type'] === 'ItemList').mainEntity;
  assert.deepEqual(list.itemListElement.map(e => e.name), s.solutions.map(x => x.name));
  assert.deepEqual(list.itemListElement.map(e => e.url), s.solutions.map(x => x.canonical));
  for (const c of soluciones) assert.ok(html.includes(c.definition.replace(/&/g, '&amp;')), 'tarjeta: ' + c.id);
});

test('sin precios: soluciones.json, la sección de llms.txt y las respuestas nuevas; price_source apunta a ids de precios.json', () => {
  const precios = new Set(json('public/llmo/precios.json').products?.map(p => p.id) ?? json('public/llmo/precios.json').prices?.map(p => p.id));
  assert.ok(precios.size >= 8, 'precios.json tiene productos');
  const s = json('public/llmo/soluciones.json');
  assert.doesNotMatch(JSON.stringify(s), /\$\s?\d|MXN|IVA|\bprice\b|amount/i);
  for (const x of s.solutions) for (const id of x.price_source) assert.ok(precios.has(id), `${x.id} → ${id}`);
  for (const f of ['public/llms.txt', 'public/llms-full.txt', 'public/llmo/rauvia.md']) {
    const sec = read(f).match(/## Soluciones publicadas\n[\s\S]*?(?=\n\n## |\s*$)/)?.[0];
    assert.ok(sec, f);
    assert.doesNotMatch(sec, /\$\s?\d|MXN|\+ IVA/, f);
  }
  const answers = json('public/llmo/canonical-answers.json').answers.filter(a => ['answer:soluciones-rauvia', 'answer:frente-comercial', 'answer:seo-para-ia'].includes(a.id));
  assert.equal(answers.length, 3);
  for (const a of answers) assert.doesNotMatch(a.answer, /\$\s?\d|MXN|\+ IVA/, a.id);
});

test('la capa para máquinas no conserva «Enfoques de intervención», «Portafolio de Soluciones» ni «Capacidades de intervención»', () => {
  for (const f of [...machineText, ...llmoFiles.filter(f => f.endsWith('.json'))]) {
    assert.doesNotMatch(read(f), /enfoques de intervención|portafolio de soluciones|capacidades de intervención|no conectamos herramientas/i, f);
  }
  // «Consulting» solo donde permite N-10: las URL de Facebook e Instagram (rauviaconsulting).
  for (const f of ['public/llms.txt', 'public/llms-full.txt', 'public/llmo/rauvia.md']) {
    assert.doesNotMatch(read(f).replace(/https:\/\/www\.(?:facebook|instagram)\.com\/rauviaconsulting\/?/g, ''), /consulting/i, f);
  }
});

test('llms.txt, llms-full.txt y rauvia.md traen la sección «Soluciones publicadas» y las entradas ajustadas, y están al día con el generador', () => {
  for (const f of ['public/llms.txt', 'public/llms-full.txt']) {
    const t = read(f);
    assert.match(t, /## Soluciones publicadas/, f);
    assert.ok(t.includes(`Última revisión: ${SOLUCIONES_REVIEWED_LABEL}`), f);
    for (const c of soluciones) assert.ok(t.includes(c.llms), `${f} ${c.id}`);
    assert.ok(t.includes('Catálogo de soluciones: https://rauvia.com.mx/llmo/soluciones.json'), f);
    assert.ok(t.indexOf('## Soluciones publicadas') < (t.indexOf('## Páginas originales') === -1 ? Infinity : t.indexOf('## Páginas originales')), f);
  }
  const t = read('public/llms.txt');
  assert.ok(t.includes('Catálogo de las soluciones publicadas (ver la sección Soluciones publicadas).'));
  assert.ok(t.includes('Niveles Esencial, Pro y Portafolio, con alcance, límites y precio.'));
  assert.doesNotMatch(t, /Información comercial\./);
  const answers = json('public/llmo/canonical-answers.json');
  assert.ok(t.includes(`${answers.answers.length} familias con condiciones y límites`));
  assert.ok(t.includes(`## Respuestas y fuentes ${answers.release}`));
  assert.match(read('public/llmo/rauvia.md'), /Cuando la necesidad va más allá, RAUVIA define con la empresa un alcance\./);
  assert.doesNotMatch(read('public/llmo/rauvia.md'), /servicios y activos apoyados en tecnología|activos digitales/);
  const {drift} = runMachineLayer({check: true});
  assert.deepEqual(drift, [], 'ejecuta `npm run build:machine-layer`');
});

test('index.json lista soluciones.json y llms.txt lo enlaza en «Referencias públicas»', () => {
  const idx = json('public/llmo/index.json');
  assert.ok(idx.resources.some(r => r.url === 'https://rauvia.com.mx/llmo/soluciones.json' && r.type === 'application/json'));
  const t = read('public/llms.txt');
  const refs = t.match(/## Referencias públicas[\s\S]*?(?=\n## )/)[0];
  assert.match(refs, /\(https:\/\/rauvia\.com\.mx\/llmo\/soluciones\.json\)/);
});

test('los enlaces de llms.txt responden 200', {skip: !base}, async () => {
  const urls = [...new Set([...read('public/llms.txt').matchAll(/https:\/\/rauvia\.com\.mx(\/[^\s)<>"]*)/g)].map(m => m[1].replace(/[.,;]+$/, '')))];
  assert.ok(urls.length > 20);
  for (const u of urls) {
    const r = await fetch(base + u, {redirect: 'manual'});
    assert.equal(r.status, 200, u);
  }
});

test('respuestas canónicas: una actualizada y tres nuevas, con su paquete de citas y las mismas definiciones que las tarjetas', () => {
  const ca = json('public/llmo/canonical-answers.json'), cb = json('public/llmo/citation-bundles.json');
  const byId = Object.fromEntries(ca.answers.map(a => [a.id, a]));
  assert.equal(ca.answers.length, 22);
  const ent = byId['answer:entidad-rauvia'];
  assert.ok(ent.answer.endsWith('Las soluciones publicadas y por dónde empezar están en la página de Soluciones.'));
  assert.equal(ent.primaryAsset, 'asset:nosotros');
  assert.ok(ent.supportingAssets.includes('asset:soluciones'));
  const fc = soluciones.find(s => s.id === 'frente-comercial'), seo = soluciones.find(s => s.id === 'seo-para-ia');
  for (const [id, bundle, primary] of [['answer:soluciones-rauvia', 'citation:soluciones-rauvia', 'asset:soluciones'], ['answer:frente-comercial', 'citation:frente-comercial', 'asset:frente-comercial'], ['answer:seo-para-ia', 'citation:seo-para-ia', 'asset:seo-ai']]) {
    const a = byId[id];
    assert.ok(a, id);
    assert.equal(a.citationBundleId, bundle);
    assert.equal(a.primaryAsset, primary);
    assert.ok(a.claimIds.length >= 1 && a.limitations.length >= 3);
    const b = (cb.bundles || cb.citation_bundles).find(x => x.id === bundle);
    assert.ok(b && b.primary_source === 'source:' + primary.slice(6) && b.claims.length, bundle);
  }
  assert.ok(byId['answer:frente-comercial'].answer.startsWith(fc.definitionMachine));
  assert.ok(byId['answer:seo-para-ia'].answer.startsWith(seo.definitionMachine));
  for (const s of soluciones) assert.ok(byId['answer:soluciones-rauvia'].supportingAssets.length >= 5, s.id);
  assert.match(byId['answer:soluciones-rauvia'].answer, /Ruta 90 no publica precio/);
  assert.deepEqual(Object.keys(byId['answer:soluciones-rauvia']), Object.keys(byId['answer:entidad-rauvia']));
});

test('el nodo asset:soluciones del grafo tiene título y descripción de catálogo y enlaza Frente Comercial, SEO para IA y Ruta 90', () => {
  const g = json('public/llmo/knowledge-graph.json');
  const a = g.nodes.find(n => n.id === 'asset:soluciones');
  assert.doesNotMatch(a.label, /Portafolio de Soluciones|Consulting/);
  assert.match(a.description, /Frente Comercial, SEO para IA, Ruta 90, Páginas para médicos/);
  assert.ok(a.representedOffering.includes('offering:frente-comercial') && a.representedOffering.includes('offering:seo-ai'));
  assert.ok(g.nodes.find(n => n.id === 'method:ruta90').representedBy.includes('asset:soluciones'));
  assert.equal(g.nodes.filter(n => n.type === 'Offering').length, 9);
});

test('robots.txt: política intacta y, agente por agente, /blog/wp-admin/ bloqueado, / permitido y Content-Signal presente', () => {
  const txt = read('public/robots.txt'), groups = parseRobots(txt);
  const policy = 'search=yes, ai-input=yes, ai-train=no';
  assert.equal(groups.length, 5);
  assert.deepEqual(groups.map(g => g.agents[0]), ['*', 'googlebot', 'bingbot', 'oai-searchbot', 'chatgpt-user']);
  assert.doesNotMatch(txt, /GPTBot|CCBot|ClaudeBot|Google-Extended|anthropic|Bytespider/i, 'sin bloqueos por agente de usuario (R-1)');
  assert.doesNotMatch(txt, /consulting|Ensure all AI and LLM bots/i);
  assert.ok(txt.includes('Los rastreadores sin grupo propio siguen el grupo `*`.'));
  const star = groups[0];
  for (const g of groups) {
    assert.deepEqual(g.signals, [policy], g.agents[0]);
    assert.deepEqual(g.rules, star.rules, g.agents[0]); // mismas líneas Allow/Disallow que el grupo *
  }
  for (const agent of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'ClaudeBot', 'UnaAraña']) {
    assert.equal(isAllowed(groups, agent, '/'), true, agent + ' /');
    assert.equal(isAllowed(groups, agent, '/soluciones/'), true, agent + ' /soluciones/');
    for (const p of ['/blog/wp-admin/', '/blog/wp-login.php', '/blog/wp-includes/a.js', '/preview/', '/drafts/', '/x?s=1']) assert.equal(isAllowed(groups, agent, p), false, `${agent} ${p}`);
    assert.equal(isAllowed(groups, agent, '/blog/wp-admin/admin-ajax.php'), true, agent + ' admin-ajax');
    assert.ok(groupFor(groups, agent).signals.length === 1, agent + ' Content-Signal');
  }
  assert.ok(txt.includes('Sitemap: https://rauvia.com.mx/sitemap.xml'));
});

// --- sitemap (S-06.3) ---
const blog = [{slug: 'a', modified_gmt: '2026-08-01T10:00:00'}, {slug: 'b', modified: '2026-10-08T22:08:55+00:00'}, {slug: 'c'}];
const registryOf = date => Object.fromEntries(publicRoutes.map(r => [routeUrl(r), {hash: 'h', lastmod: date}]));
const lastmods = xml => Object.fromEntries([...xml.matchAll(/<loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map(m => [m[1], m[2] ?? null]));

test('sitemap: las páginas del sitio con registro llevan lastmod válido y no futuro; los artículos conservan el suyo', () => {
  const date = '2026-11-27T00:21:51+00:00';
  const xml = renderSitemap(blog, registryOf(date));
  const m = lastmods(xml);
  for (const r of publicRoutes) assert.equal(m[routeUrl(r)], date, r);
  assert.equal(m['https://rauvia.com.mx/recursos/a/'], '2026-08-01T10:00:00+00:00');
  assert.equal(m['https://rauvia.com.mx/recursos/b/'], '2026-10-08T22:08:55+00:00');
  assert.equal(m['https://rauvia.com.mx/recursos/c/'], null);
  for (const v of Object.values(m).filter(Boolean)) assert.ok(Date.parse(v) <= Date.now() + 60_000, 'fecha futura: ' + v);
  for (const v of Object.values(m).filter(Boolean)) assert.match(v, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\+00:00|Z)?$/);
  // Una página sin fecha verificable queda sin lastmod (no se inventa).
  const parcial = registryOf(date); parcial[routeUrl('/nosotros')] = {hash: 'h', lastmod: null};
  assert.equal(lastmods(renderSitemap(blog, parcial))[routeUrl('/nosotros')], null);
  // Idempotente: reconciliar una caché ya reconciliada no cambia nada.
  assert.equal(reconcileCachedSitemap(xml, registryOf(date)), xml);
});

test('registro de lastmod: sin cambios de contenido no se altera; si cambia el HTML de una página, cambia solo su lastmod', () => {
  const dist = fs.mkdtempSync(path.join(os.tmpdir(), 'lastmod-'));
  const routes = ['/', '/nosotros', '/soluciones'];
  const write = (route, body) => { const d = path.join(dist, route === '/' ? '' : route.slice(1)); fs.mkdirSync(d, {recursive: true}); fs.writeFileSync(path.join(d, 'index.html'), body); };
  for (const r of routes) write(r, `<html><link rel="stylesheet" href="/assets/a-1234.css"><body>${r}</body></html>`);
  const t1 = new Date('2026-11-01T10:00:00Z'), t2 = new Date('2026-11-05T10:00:00Z'), t3 = new Date('2026-11-09T10:00:00Z');
  const first = computeRegistry({routes, dist, previous: {}, now: t1});
  assert.equal(first.created.length, 3);
  // Otra construcción: solo cambian los nombres con hash de compilación → ningún lastmod cambia.
  for (const r of routes) write(r, `<html><link rel="stylesheet" href="/assets/a-9999.css"><body>${r}</body></html>`);
  const second = computeRegistry({routes, dist, previous: first.registry, now: t2});
  assert.deepEqual(second.registry, first.registry);
  assert.deepEqual(second.changed, []);
  // Cambia el contenido de una página.
  write('/nosotros', '<html><body>/nosotros cambió</body></html>');
  const third = computeRegistry({routes, dist, previous: second.registry, now: t3});
  assert.deepEqual(third.changed, [routeUrl('/nosotros')]);
  assert.equal(third.registry[routeUrl('/nosotros')].lastmod, formatLastmod(t3));
  assert.equal(third.registry[routeUrl('/')].lastmod, formatLastmod(t1));
  assert.equal(third.registry[routeUrl('/soluciones')].lastmod, formatLastmod(t1));
  // Un lastmod futuro se rechaza.
  assert.throws(() => computeRegistry({routes, dist, previous: {}, now: new Date(Date.now() + 86_400_000)}), /futuro/);
});

test('data/lastmod-registry.json cubre las páginas del sitio, con fecha válida y no futura', () => {
  const reg = json('data/lastmod-registry.json');
  assert.deepEqual(Object.keys(reg).sort(), publicRoutes.map(routeUrl).sort());
  for (const [url, v] of Object.entries(reg)) {
    assert.match(v.hash, /^[0-9a-f]{64}$/, url);
    if (v.lastmod !== null) { assert.match(v.lastmod, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+00:00$/, url); assert.ok(Date.parse(v.lastmod) <= Date.now() + 60_000, url); }
  }
});

test('sitemap servido: 32 páginas del sitio con lastmod y artículos del blog sin tocar', {skip: !base}, async () => {
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  const m = lastmods(xml);
  const urls = new Set(publicRoutes.map(routeUrl));
  const site = Object.entries(m).filter(([u]) => urls.has(u));
  assert.equal(site.length, publicRoutes.length);
  for (const [u, v] of site) assert.ok(v, 'sin lastmod: ' + u);
});
