import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {routeSeo} from '../src/seo/routeSeo.js';

// Archivos que consumen asistentes de IA: grafo público, llms.txt y llms-full.txt.
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const graph = JSON.parse(read('../public/llmo/knowledge-graph.json'));
const llms = read('../public/llms.txt');
const full = read('../public/llms-full.txt');
const routes = ['/seo-ai', '/seo-ai/auditoria', '/seo-ai/implementacion'];
const keys = {'/seo-ai': 'seo-ai', '/seo-ai/auditoria': 'seo-ai-auditoria', '/seo-ai/implementacion': 'seo-ai-implementacion'};

test('grafo público: activo, oferta y fuente por cada página SEO AI, con la URL canónica del registro', () => {
  const byId = new Map(graph.nodes.map(n => [n.id, n]));
  for (const route of routes) {
    const key = keys[route];
    for (const id of [`asset:${key}`, `offering:${key}`, `source:${key}`]) assert.ok(byId.has(id), id);
    const asset = byId.get(`asset:${key}`);
    assert.equal(asset.canonical, routeSeo[route].canonical);
    assert.equal(asset.label ?? asset.title, routeSeo[route].title);
    assert.deepEqual(byId.get(`offering:${key}`).representedBy, [`asset:${key}`]);
  }
});

test('grafo público: las ofertas no publican precios ni garantías', () => {
  const text = graph.nodes.filter(n => n.id.startsWith('offering:seo-ai')).map(n => JSON.stringify(n)).join(' ');
  assert.doesNotMatch(text, /\$\s?\d|\bMXN\b|\bIVA\b|margen/i);
  assert.match(text, /No garantiza posiciones, menciones, citas/);
});

test('llms.txt y llms-full.txt referencian las tres URLs canónicas y sus límites', () => {
  for (const route of routes) {
    assert.ok(llms.includes(`(${routeSeo[route].canonical})`), 'llms.txt ' + route);
    assert.ok(full.includes(routeSeo[route].canonical), 'llms-full.txt ' + route);
  }
  assert.match(full, /no garantiza posiciones, menciones, citas, tr[aá]fico, leads ni ventas/i);
  assert.match(full, /ejemplos[^.]*son ficticios/i);
  // Precios: iguales a los de las páginas, antes de IVA, y nunca cifras de control interno.
  for (const price of ['$9,900 MXN', '$29,900 MXN', '$179,400 MXN']) assert.ok(full.includes(price), price);
  assert.doesNotMatch(full, /margen|13,200|5,050|189,300|costo estimado/i);
  assert.doesNotMatch(llms, /\$\s?\d/);
});
