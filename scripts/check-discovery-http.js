import assert from 'node:assert/strict';
import { publicRoutes } from './public-routes.js';

const base = process.env.CHECK_BASE_URL || 'http://127.0.0.1:3000';
const paths = ['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt',
  '/llmo/', '/llmo/index.json', '/llmo/organization.json', '/llmo/rauvia.md',
  '/llmo/aethryon.md', '/llmo/evidencia.md', '/llmo/no-existe.md', ...publicRoutes];
for (const route of paths) {
  const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(10000) });
  const text = await response.text();
  const expected = route.includes('no-existe') ? 404 : 200;
  assert.equal(response.status, expected, route);
  const type = response.headers.get('content-type') || '';
  if (route.endsWith('.md') && expected === 200) assert.ok(type.includes('text/markdown'), route);
  if (route.endsWith('.json')) JSON.parse(text);
  if (route.endsWith('.xml')) assert.ok(type.includes('xml') && text.includes('<urlset'), route);
  if (route.endsWith('.txt')) assert.ok(type.includes('text/plain') && !text.includes('<!doctype html>'), route);
  console.log(response.status, route, type);
}
