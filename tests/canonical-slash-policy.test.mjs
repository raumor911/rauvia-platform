import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {publicRoutes} from '../scripts/public-routes.js';

// Política (30-oct): toda URL canónica de rauvia.com.mx termina en "/".
// Aplica al <link rel="canonical"> y a los campos url/@id de páginas en el JSON-LD (los fragmentos #… quedan fuera).
const read = route => fs.readFileSync('dist/' + (route === '/' ? '' : route.slice(1) + '/') + 'index.html', 'utf8');
const ownPath = u => { try { const x = new URL(u); return x.origin === 'https://rauvia.com.mx' && !x.hash && !/\.[a-z0-9]+$/i.test(x.pathname) ? x.pathname : null; } catch { return null; } };

for (const route of publicRoutes) test(`Canonical y URLs de JSON-LD terminan en "/": ${route}`, () => {
  const html = read(route);
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(m => m[1]);
  assert.equal(canonicals.length, 1, 'un solo canonical');
  assert.ok(new URL(canonicals[0]).pathname.endsWith('/'), canonicals[0]);
  const walk = v => { if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (['url', '@id'].includes(k) && typeof x === 'string') { const p = ownPath(x); if (p !== null) assert.ok(p.endsWith('/'), `${k}: ${x}`); } else walk(x); } };
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) walk(JSON.parse(m[1]));
});
