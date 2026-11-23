#!/usr/bin/env node
// Regenera las líneas base congeladas de tests/fixtures desde dist/ (requiere `npm run build`).
//   node scripts/refresh-baselines.mjs                       → simulacro: muestra qué cambiaría
//   node scripts/refresh-baselines.mjs --write --reason "…"  → escribe y registra en tests/fixtures/BASELINE_LOG.md
// Los cambios SEMÁNTICOS (title, meta, canonical, JSON-LD, H1) se listan aparte: revísalos antes de aprobar.
// Los de contenido (hashes) son esperables tras cambios editoriales.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {publicRoutes} from './public-routes.js';
import {snapshot} from '../tests/helpers/rau004-snapshot.mjs';
import {normalize} from '../tests/helpers/v72-normalize.mjs';

const args = process.argv.slice(2);
const write = args.includes('--write');
const reason = args.includes('--reason') ? args[args.indexOf('--reason') + 1] : '';
if (write && !reason) { console.error('--write exige --reason "motivo del cambio"'); process.exit(2); }

const fx = f => 'tests/fixtures/' + f;
const readJson = f => JSON.parse(fs.readFileSync(fx(f), 'utf8'));
const htmlOf = route => fs.readFileSync('dist/' + (route === '/' ? '' : route.slice(1)) + 'index.html', 'utf8');
const founder = {'@id': 'https://rauvia.com.mx/#raul-morales'};
const dropFounder = s => (s.founder && JSON.stringify(s.founder) === JSON.stringify(founder)) ? Object.fromEntries(Object.entries(s).filter(([k]) => k !== 'founder')) : s;

function seoOf(h) {
  return {
    title: [...h.matchAll(/<title>(.*?)<\/title>/g)].map(m => m[1]),
    meta: [...h.matchAll(/<meta\b[^>]*>/g)].map(m => m[0]).filter(m => !m.includes('name="viewport"')),
    canonical: [...h.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)].map(m => m[0]),
    jsonld: [...h.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].map(m => dropFounder(JSON.parse(m[1]))),
    h1: [...h.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/g)].map(m => m[1]),
  };
}

const next = {};
// 1. Línea base V72 de las ocho rutas principales.
const v72 = readJson('v72-route-baseline.json');
next['v72-route-baseline.json'] = Object.fromEntries(Object.keys(v72).map(r => [r, seoOf(htmlOf(r))]));
// 2. SEO de AETHRYON (V70).
const aeth = seoOf(htmlOf('/aethryon/'));
const plain = x => x.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
next['aethryon-v70-seo.json'] = {...aeth, title: aeth.title[0], h1: aeth.h1.map(plain)};
// 3. HTML excluido (landings, legales, casos).
const excluded = readJson('v72-excluded-html.json');
next['v72-excluded-html.json'] = Object.fromEntries(Object.keys(excluded).map(f => [f, createHash('sha256').update(normalize(fs.readFileSync('dist' + f, 'utf8'))).digest('hex')]));
// 4. RAU-004: SEO, H1 y contenido fuera del Hero para todas las rutas públicas.
const rau = readJson('rau004-main-baseline.json');
const rauNext = {source: rau.source, assets: rau.assets};
for (const r of publicRoutes) rauNext[r] = snapshot(htmlOf(r === '/' ? '/' : r + '/'), r);
next['rau004-main-baseline.json'] = rauNext;

const semantic = [], content = [];
for (const [file, value] of Object.entries(next)) {
  const old = readJson(file);
  const keys = new Set([...Object.keys(old), ...Object.keys(value)]);
  for (const k of keys) {
    const a = JSON.stringify(old[k]), b = JSON.stringify(value[k]);
    if (a === b) continue;
    if (file === 'v72-route-baseline.json') {
      for (const f of ['title', 'meta', 'canonical', 'jsonld', 'h1']) if (JSON.stringify(old[k]?.[f]) !== JSON.stringify(value[k]?.[f])) semantic.push(`${file} ${k} ${f}`);
    } else if (file === 'aethryon-v70-seo.json') {
      if (['title', 'meta', 'canonical', 'jsonld', 'h1'].includes(k)) semantic.push(`${file} ${k}`);
    } else if (file === 'rau004-main-baseline.json') {
      if (old[k] === undefined) semantic.push(`${file} ${k} (ruta nueva)`);
      else {
        if (old[k].head !== value[k]?.head) semantic.push(`${file} ${k} head (title/meta/canonical/JSON-LD)`);
        if (JSON.stringify(old[k].h1) !== JSON.stringify(value[k]?.h1)) semantic.push(`${file} ${k} h1`);
        if (old[k].outsideHero !== value[k]?.outsideHero) content.push(`${file} ${k} contenido`);
      }
    } else content.push(`${file} ${k}`);
  }
}
console.log(`Cambios SEMÁNTICOS (${semantic.length}):`); semantic.forEach(s => console.log('  - ' + s));
console.log(`Cambios de CONTENIDO (${content.length}):`); content.forEach(s => console.log('  - ' + s));
if (!write) { console.log('\nSimulacro: no se escribió nada. Usa --write --reason "…" para aplicar.'); process.exit(0); }
for (const [file, value] of Object.entries(next)) fs.writeFileSync(fx(file), JSON.stringify(value, null, 2) + '\n');
const commit = (await import('node:child_process')).execSync('git rev-parse --short HEAD').toString().trim();
fs.appendFileSync(fx('BASELINE_LOG.md'), `\n## ${new Date().toISOString().slice(0, 10)} · ${commit}\nMotivo: ${reason}\nSemánticos: ${semantic.length} · Contenido: ${content.length}\n${semantic.concat(content).map(s => '- ' + s).join('\n')}\n`);
console.log('\nLíneas base actualizadas y registradas en tests/fixtures/BASELINE_LOG.md');
