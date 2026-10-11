import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fetchPosts, renderSitemap, generateSitemap } from './generate-sitemap.js';
import { publicRoutes } from './public-routes.js';

test('all static canonical routes; no fabricated lastmod or duplicates', () => {
  const xml = renderSitemap([{ slug: 'example', modified: '2026-09-01T12:00:00' }, { slug: 'example' }]);
  for (const route of publicRoutes) assert.ok(xml.includes(`<loc>https://rauvia.com.mx${route}</loc>`));
  assert.equal((xml.match(/<loc>/g) || []).length, publicRoutes.length + 1);
  assert.ok(!renderSitemap([]).includes('<lastmod>'));
  assert.ok(renderSitemap([{ slug: 'a&b', modified: '2026-09-01T12:00:00' }]).includes('a&amp;b'));
});

test('all WordPress pages and only published posts requested', async () => {
  const pages = [];
  const posts = await fetchPosts(async url => {
    const page = url.searchParams.get('page');
    pages.push(page);
    assert.equal(url.searchParams.get('status'), 'publish');
    return new Response(JSON.stringify([{ slug: `post-${page}` }]), { headers: { 'x-wp-totalpages': '2' } });
  }, {});
  assert.deepEqual(pages, ['1', '2']);
  assert.equal(posts.length, 2);
});

test('invalid WordPress data is rejected', async () => {
  for (const data of [{ error: true }, [{ slug: '../secret/path' }]]) {
    await assert.rejects(fetchPosts(async () => new Response(JSON.stringify(data)), {}));
  }
  await assert.rejects(fetchPosts(async () => new Response('[]', { status: 503 }), {}));
});

test('fetch failure preserves existing sitemap', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'rauvia-discovery-test-'));
  const file = path.join(dir, 'sitemap.xml');
  await fs.writeFile(file, 'previous sitemap');
  await assert.rejects(generateSitemap(async () => { throw new Error('offline'); }, pathToFileURL(file)));
  assert.equal(await fs.readFile(file, 'utf8'), 'previous sitemap');
  await fs.unlink(file);
  await fs.rmdir(dir);
});

test('all linked public LLMO files exist and JSON parses', async () => {
  const root = new URL('../public/', import.meta.url);
  const llms = await fs.readFile(new URL('llms.txt', root), 'utf8');
  for (const match of llms.matchAll(/https:\/\/rauvia\.com\.mx\/(llmo\/[^)\s]+)/g)) {
    await fs.access(new URL(match[1], root));
  }
  const index = JSON.parse(await fs.readFile(new URL('llmo/index.json', root), 'utf8'));
  for (const resource of index.resources) await fs.access(new URL(new URL(resource.url).pathname.slice(1), root));
  const org = JSON.parse(await fs.readFile(new URL('llmo/organization.json', root), 'utf8'));
  assert.equal(org['@id'], 'https://rauvia.com.mx/#organization');
  assert.equal(org.name, 'RAUVIA');
});
