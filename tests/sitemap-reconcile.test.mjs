import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {reconcileCachedSitemap, renderSitemap} from '../scripts/generate-sitemap.js';
import {publicRoutes} from '../scripts/public-routes.js';

const locs = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const stale = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  '  <url><loc>https://rauvia.com.mx/</loc></url>\n  <url><loc>https://rauvia.com.mx/ruta-90/</loc></url>\n  <url><loc>https://rauvia.com.mx/ruta-retirada/</loc></url>\n' +
  '  <url><loc>https://rauvia.com.mx/recursos/uno/</loc><lastmod>2026-11-01T10:00:00+00:00</lastmod></url>\n' +
  '  <url><loc>https://rauvia.com.mx/recursos/dos/</loc></url>\n</urlset>\n';

test('Reconciliar: añade rutas institucionales nuevas, retira las que ya no existen y conserva artículos y lastmod', () => {
  const out = reconcileCachedSitemap(stale);
  const urls = locs(out);
  for (const r of publicRoutes) assert.ok(urls.includes('https://rauvia.com.mx' + (r === '/' ? '/' : r.endsWith('/') ? r : r + '/')), r);
  assert.ok(urls.includes('https://rauvia.com.mx/seo-ai/'));
  assert.ok(!urls.includes('https://rauvia.com.mx/ruta-retirada/'));
  assert.ok(out.includes('<loc>https://rauvia.com.mx/recursos/uno/</loc><lastmod>2026-11-01T10:00:00+00:00</lastmod>'));
  assert.ok(out.includes('<loc>https://rauvia.com.mx/recursos/dos/</loc></url>'));
  assert.equal(urls.length, new Set(urls).size);
});

test('Reconciliar es idempotente y coincide con renderSitemap cuando ya está al día', () => {
  const once = reconcileCachedSitemap(stale);
  assert.equal(reconcileCachedSitemap(once), once);
  assert.equal(once, renderSitemap([{slug: 'uno', modified: '2026-11-01T10:00:00+00:00'}, {slug: 'dos'}]));
});

test('El respaldo versionado reconcilia sin perder artículos', () => {
  const xml = fs.readFileSync('data/sitemap-cache.xml', 'utf8');
  const before = locs(xml).filter(u => u.includes('/recursos/')).length;
  const out = reconcileCachedSitemap(xml);
  assert.equal(locs(out).filter(u => u.includes('/recursos/')).length, before);
});

test('server.ts reconcilia al arrancar y fuerza el refresco con WordPress cuando hubo cambios', () => {
  const s = fs.readFileSync('server.ts', 'utf8');
  assert.match(s, /reconcileCachedSitemap\(cachedSitemapXml\)/);
  assert.match(s, /sitemapReconciledOnBoot && process\.env\.SITEMAP_REFRESH_ON_START !== 'false'/);
});
