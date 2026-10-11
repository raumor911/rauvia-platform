import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html = fs.readFileSync(new URL('../dist/pagina-comercial-servicios-profesionales/index.html', import.meta.url), 'utf8');
const url = 'https://rauvia.com.mx/pagina-comercial-servicios-profesionales/';
test('prerender has one H1 and the requested content', () => {
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(headings.length, 1);
  assert.equal(headings[0][1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(), 'Página comercial para servicios profesionales que necesitan explicar mejor su valor');
});
test('SEO metadata is unique in the source HTML', () => {
  for (const key of ['rel="canonical"', 'name="description"', 'property="og:title"', 'property="og:description"']) assert.equal(html.split(key).length - 1, 1, key);
  assert.ok(html.includes(`href="${url}"`));
  assert.equal((html.match(/<title>/g) || []).length, 1);
});
test('FAQ schema corresponds to the seven visible questions and answers', () => {
  const script = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(x => JSON.parse(x[1]));
  const graph = script.flatMap(x => x['@graph'] || [x]);
  const questions = graph.find(x => x['@type'] === 'FAQPage').mainEntity;
  assert.equal(questions.length, 7);
  const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  for (const q of questions) { assert.ok(body.includes(q.name)); assert.ok(body.includes(q.acceptedAnswer.text)); }
});
test('required internal links and compiled assets exist', () => {
  for (const route of ['/frente-comercial/', '/soluciones/', '/recursos/', '/sitio-web-comercial-para-pymes/', '/sitio-web-servicios-especializados/', '/recursos/la-diferencia-entre-informacion-y-comprension/', '/recursos/brecha-capacidad-real-percepcion-mercado/', '/recursos/por-que-pyme-pierde-oportunidades-clientes-interesados/', '/recursos/que-debe-existir-antes-de-un-crm/']) assert.ok(html.includes(`href="${route}"`), route);
  for (const asset of [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)]) assert.ok(fs.existsSync(new URL(`../dist${asset[1]}`, import.meta.url)));
  assert.ok(!html.includes('codex-browser'));
});
