import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {existsSync} from 'node:fs';

const read = p => fs.readFileSync(p, 'utf8');
const css = read('src/pages/Ruta90Motion.css');
const js = read('src/pages/ruta90Motion.tsx');
const page = read('src/pages/Ruta90Page.tsx');

test('Ruta 90: movimiento progresivo (solo con JS, IntersectionObserver y sin movimiento reducido)', () => {
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /classList\.add\('r90-armed'\)/);
  assert.match(css, /\.r90-armed \[data-r90\]:not\(\.r90-in\)/);
  assert.doesNotMatch(css, /^\[data-r90\][^{]*\{[^}]*opacity:\s*0/m);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('Ruta 90: elementos decorativos ocultos a lectores de pantalla y sin cambiar el contenido', () => {
  assert.match(js, /r90-scrollbar" aria-hidden="true"/);
  assert.match(js, /r90-track" aria-hidden="true"/);
  assert.match(page, /<Ruta90ScrollBar \/>/);
  assert.match(page, /<Ruta90Track \/>/);
  // El recorte de la lámina va en el enlace interior: un elemento recortado por completo nunca intersecta el observador.
  assert.doesNotMatch(css, /\.r90-figure:not\(\.r90-in\)\s*\{[^}]*clip-path/);
});

test('Ruta 90: HTML inicial conserva diez láminas, capítulos y la línea de 90 días', {skip: !existsSync('dist/ruta-90/index.html')}, () => {
  const html = read('dist/ruta-90/index.html');
  assert.equal((html.match(/<figure/g) || []).length, 10);
  assert.match(html, /class="r90-track" aria-hidden="true"/);
  for (const phase of ['Diseñar', 'Activar', 'Estabilizar', 'Consolidar']) assert.ok(html.includes(phase), phase);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
});
