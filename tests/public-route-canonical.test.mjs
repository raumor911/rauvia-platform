import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {routeSeo} from '../src/seo/routeSeo.js';
import {publicRoutes} from '../scripts/public-routes.js';

const routes = [
  '/trayectoria',
  '/rauviaweb',
  '/casos/presencia-posicionamiento-profesional'
];
const loader = readFileSync(new URL('../src/lib/routeLoader.ts', import.meta.url),'utf8');
const sitemap = readFileSync(new URL('../data/sitemap-cache.xml', import.meta.url),'utf8');

test('new editorial URLs share canonical SEO and client/prerender registries', () => {
  for (const route of routes) {
    const canonical = 'https://rauvia.com.mx' + route + '/';
    assert.ok(publicRoutes.includes(route), route + ' missing from sitemap/prerender registry');
    assert.ok(loader.includes("'" + route + "': () => import("), route + ' missing from routeLoader');
    assert.equal(routeSeo[route].canonical, canonical);
    assert.equal(routeSeo[route].robots, 'index, follow');
    assert.ok(routeSeo[route].title && routeSeo[route].description);
    assert.ok(sitemap.includes('<loc>' + canonical + '</loc>'), route + ' missing from fallback snapshot');
  }
});

test('fallback sitemap is canonical and contains no duplicate URLs', () => {
  const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(entries.length, new Set(entries).size, 'duplicate locations');
  assert.ok(entries.every(url => url.startsWith('https://rauvia.com.mx/')));
  assert.ok(entries.every(url => new URL(url).pathname.endsWith('/')));
  for (const route of publicRoutes) {
    const path = route === '/' ? '/' : route + '/';
    assert.ok(entries.includes('https://rauvia.com.mx' + path), path);
  }
});

test('snapshot never includes scheduled or unpublished articles', () => {
  // WordPress API is authoritative for publish status; this only checks the provided snapshot.
  const resources = [...sitemap.matchAll(/<loc>https:\/\/rauvia\.com\.mx\/recursos\/([^<]+)<\/loc>/g)];
  assert.equal(resources.length, 20, 'published articles in 2026-10-30 snapshot');
  assert.ok(!sitemap.includes('<lastmod>2026-11-'), 'future scheduled publication included');
});
