// Registro de `lastmod` de las páginas del sitio (spec «página Soluciones» v0.2, S-06.3, L-07).
// Regla: `lastmod` es la fecha real del último cambio de contenido de esa URL. Se guarda {url: {hash, lastmod}} en
// data/lastmod-registry.json (versionado). En cada construcción se calcula el hash del HTML renderizado y normalizado
// (sin nombres de archivos con hash de compilación, ids generados ni espacios); si cambió, `lastmod` es el momento de esa
// construcción; si no, se conserva el anterior. Construir dos veces sin cambios no altera ningún `lastmod`.
// Nada se escribe a mano ni se usa la hora del servidor al servir el sitemap.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const SITE = 'https://rauvia.com.mx';
export const REGISTRY_PATH = 'data/lastmod-registry.json';

export const normalizeHtml = h => h
  .replace(/<link\b(?=[^>]*rel="(?:stylesheet|modulepreload)")[^>]*>/g, '')
  .replace(/\/assets\/[^"<>]+/g, '/assets/BUILD-ASSET')
  .replace(/_R_[A-Za-z0-9]+_/g, '_R_ID_')
  .replace(/\s+/g, ' ').trim();
export const hashHtml = h => createHash('sha256').update(normalizeHtml(h)).digest('hex');

export const routeUrl = route => `${SITE}${route === '/' ? '/' : route.endsWith('/') ? route : route + '/'}`;
const htmlFile = (dist, route) => path.join(dist, route === '/' ? '' : route.replace(/^\//, ''), 'index.html');

// Formato del blog: 2026-10-08T22:08:55+00:00. Nunca una fecha futura.
export const formatLastmod = date => date.toISOString().replace(/\.\d{3}Z$/, '+00:00');

export const loadRegistry = (file = REGISTRY_PATH) => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; }
};

// Devuelve {registry, changed[], unchanged[], created[]}; no escribe.
export const computeRegistry = ({routes, dist, previous, now}) => {
  if (now.getTime() > Date.now() + 60_000) throw new Error('lastmod en el futuro.');
  const registry = {}, changed = [], unchanged = [], created = [];
  for (const route of routes) {
    const url = routeUrl(route);
    const hash = hashHtml(fs.readFileSync(htmlFile(dist, route), 'utf8'));
    const before = previous[url];
    if (!before) { registry[url] = {hash, lastmod: formatLastmod(now)}; created.push(url); }
    else if (before.hash !== hash) { registry[url] = {hash, lastmod: formatLastmod(now)}; changed.push(url); }
    else { registry[url] = {hash, lastmod: before.lastmod ?? null}; unchanged.push(url); }
  }
  return {registry, changed, unchanged, created};
};

export const serializeRegistry = registry => JSON.stringify(Object.fromEntries(Object.entries(registry).sort(([a], [b]) => a.localeCompare(b))), null, 2) + '\n';

// Siembra única: guarda el hash del HTML PUBLICADO (producción) con lastmod null. Así, en la primera construcción, solo las
// páginas cuyo HTML difiere del publicado reciben fecha; las que no cambiaron quedan sin lastmod (no se inventa una fecha).
export const seedFromProduction = async ({routes, base = SITE, fetcher = fetch}) => {
  const seeded = {}, failed = [];
  for (const route of routes) {
    const url = routeUrl(route);
    try {
      const res = await fetcher(url.replace(SITE, base), {headers: {'user-agent': 'rauvia-lastmod-seed'}});
      if (!res.ok) throw new Error('HTTP ' + res.status);
      seeded[url] = {hash: hashHtml(await res.text()), lastmod: null};
    } catch (e) { failed.push([url, String(e.message || e)]); }
  }
  return {seeded, failed};
};

const main = async () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  process.chdir(root);
  const {publicRoutes} = await import('./public-routes.js');
  const args = process.argv.slice(2);
  const arg = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
  const dist = arg('--dist') || 'dist', file = arg('--registry') || REGISTRY_PATH;
  const now = arg('--now') ? new Date(arg('--now')) : new Date();
  if (args.includes('--seed-from-production')) {
    const {seeded, failed} = await seedFromProduction({routes: publicRoutes});
    if (failed.length) { console.error('No se pudo sembrar:', failed); process.exit(1); }
    fs.writeFileSync(file, serializeRegistry(seeded));
    console.log(`Sembrado ${Object.keys(seeded).length} hashes de producción en ${file} (lastmod null).`);
    return;
  }
  const {registry, changed, unchanged, created} = computeRegistry({routes: publicRoutes, dist, previous: loadRegistry(file), now});
  const body = serializeRegistry(registry);
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== body) fs.writeFileSync(file, body);
  const sinFecha = Object.values(registry).filter(r => !r.lastmod).length;
  console.log(`lastmod registry: ${changed.length} cambiadas, ${created.length} nuevas, ${unchanged.length} sin cambio; ${sinFecha} sin lastmod (HTML igual al publicado).`);
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
