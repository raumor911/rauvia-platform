import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// N-08 · Nombre único «RAUVIA» (decisión de Raúl, 2026-11-26).
// En el HTML construido, el JSON-LD, llmo/, llms.txt, llms-full.txt y robots.txt no puede aparecer «Consulting»
// (sin distinguir mayúsculas) ni «Experiencia digital desarrollada por». No cuenta el dominio rauvia.consulting:
// tampoco se menciona en ningún archivo.
//
// ÚNICA EXCEPCIÓN: las URL de Facebook e Instagram con el identificador «rauviaconsulting», porque esa es la dirección de
// esas redes. Se quitan del texto antes de buscar.
//
// Páginas legales: su commit no entra al lanzamiento hasta que Raúl lo autorice. Si se excluye ese commit, correr con
// NOMBRE_UNICO_LEGALES_PENDIENTES=1 para listarlas como excepción explícita en lugar de silenciarlas.
const base = process.env.TEST_BASE_URL;
const LEGAL = ['/aviso-de-privacidad/', '/terminos/'];
const LEGALES_PENDIENTES = process.env.NOMBRE_UNICO_LEGALES_PENDIENTES === '1';
const SOCIAL_URL = /https:\/\/www\.(?:facebook|instagram)\.com\/rauviaconsulting\/?/gi;
const withoutAllowed = text => text.replace(SOCIAL_URL, '');
const CREDIT = /Experiencia digital desarrollada por/i;
const hits = (text, re = /consulting/gi) => [...withoutAllowed(text).matchAll(re)].map(m => withoutAllowed(text).slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' '));

const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const jsonLd = html => [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const collect = (node, key, out = []) => { if (Array.isArray(node)) node.forEach(n => collect(n, key, out)); else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) { if (k === key && typeof v === 'string') out.push(v); collect(v, key, out); } return out; };

test('Capa para máquinas en disco: llms.txt, llms-full.txt, robots.txt y llmo/ no mencionan «Consulting»', () => {
  const files = ['public/llms.txt', 'public/llms-full.txt', 'public/robots.txt', ...walk('public/llmo')];
  const bad = files.flatMap(f => hits(fs.readFileSync(f, 'utf8')).map(c => `${f}: …${c}…`));
  assert.deepEqual(bad, []);
  for (const f of ['public/llms.txt', 'public/llms-full.txt']) assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /rauvia\.consulting/i, f);
  assert.match(fs.readFileSync('public/llms.txt', 'utf8'), /rauvia\.tech/);
  assert.match(fs.readFileSync('public/llms-full.txt', 'utf8'), /rauvia\.tech/);
  assert.match(fs.readFileSync('public/robots.txt', 'utf8').split('\n')[0], /^# robots\.txt for RAUVIA$/);
});

test('Las redes con rauviaconsulting se conservan en llms.txt y en el sameAs del JSON-LD', {skip: !base}, async () => {
  assert.match(fs.readFileSync('public/llms.txt', 'utf8'), /facebook\.com\/rauviaconsulting\//);
  assert.match(fs.readFileSync('public/llms.txt', 'utf8'), /instagram\.com\/rauviaconsulting\//);
  const org = jsonLd(await (await fetch(base + '/')).text()).find(x => x['@type'] === 'Organization');
  assert.ok(org.sameAs.includes('https://www.facebook.com/rauviaconsulting/') && org.sameAs.includes('https://www.instagram.com/rauviaconsulting/'));
  assert.equal(org.logo, 'https://rauvia.com.mx/media/RAUVIA_LOGO.png');
  // El name de la home es la razón social (no cambia, §5); el nombre comercial es alternateName y nunca «RAUVIA Consulting».
  assert.doesNotMatch(org.name, /consulting/i);
  assert.equal(org.alternateName, 'RAUVIA');
});

test('Ninguna URL de logo contiene CONSULTING y el logo nuevo existe', () => {
  const org = JSON.parse(fs.readFileSync('public/llmo/organization.json', 'utf8'));
  assert.equal(org.logo, 'https://rauvia.com.mx/media/RAUVIA_LOGO.png');
  assert.ok(fs.existsSync('public/media/RAUVIA_LOGO_compact.svg') && fs.existsSync('public/media/RAUVIA_LOGO.png'));
  assert.equal(fs.readFileSync('public/media/RAUVIA_LOGO.png').subarray(1, 4).toString(), 'PNG', 'el PNG debe tener firma válida');
  assert.doesNotMatch(fs.readFileSync('public/media/RAUVIA_LOGO_compact.svg', 'utf8'), /consulting/i);
  for (const f of ['src/components/Logo.tsx', 'src/config/entity.ts', 'src/seo/routeSeo.js']) assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /[A-Z_]*CONSULTING_LOGO/, f);
});

test('Sitio construido: ninguna página de rauvia.com.mx menciona «Consulting» ni el crédito del pie', {skip: !base}, async () => {
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  const paths = [...sitemap.matchAll(/<loc>https:\/\/rauvia\.com\.mx([^<]*)<\/loc>/g)].map(m => m[1] || '/');
  assert.ok(paths.length >= 55, `el sitemap debería listar las páginas (${paths.length})`);
  const failures = [];
  const logoUrls = new Set();
  for (const p of paths) {
    const res = await fetch(base + p, {redirect: 'manual'});
    if (res.status !== 200) { failures.push(`${p}: HTTP ${res.status}`); continue; }
    const html = await res.text();
    const exempt = LEGALES_PENDIENTES && LEGAL.includes(p);
    if (!exempt) hits(html).forEach(c => failures.push(`${p}: «Consulting» …${c}…`));
    if (CREDIT.test(html)) failures.push(`${p}: crédito «Experiencia digital desarrollada por»`);
    // JSON-LD: nombre de organización, logo y el name de cualquier entidad Organization
    for (const block of jsonLd(html)) {
      collect(block, 'logo').forEach(u => logoUrls.add(u));
      for (const name of collect(block, 'name')) if (!exempt && /consulting/i.test(name)) failures.push(`${p}: JSON-LD name «${name}»`);
    }
    (html.match(/(?:og:image|twitter:image)"[^>]*content="([^"]*)"/g) || []).forEach(m => logoUrls.add(m.replace(/.*content="/, '').replace(/"$/, '')));
    assert.doesNotMatch(html, /og:site_name"[^>]*content="[^"]*Consulting/i, p);
  }
  assert.deepEqual(failures, []);
  for (const u of logoUrls) assert.doesNotMatch(u, /consulting/i, `URL de logo/imagen social con CONSULTING: ${u}`);
});

test('Encabezado y pie muestran el logo nuevo con alt="RAUVIA"', {skip: !base}, async () => {
  const html = await (await fetch(base + '/')).text();
  assert.doesNotMatch(html, /RAUVIA_CONSULTING_LOGO/);
  assert.match(html, /<img[^>]+src="\/media\/RAUVIA_LOGO_compact\.svg"[^>]*alt="RAUVIA"|<img[^>]+alt="RAUVIA"[^>]*src="\/media\/RAUVIA_LOGO_compact\.svg"/);
  for (const u of ['/media/RAUVIA_LOGO_compact.svg', '/media/RAUVIA_LOGO.png']) {
    const r = await fetch(base + u);
    assert.equal(r.status, 200, u);
    if (u.endsWith('.png')) { assert.match(r.headers.get('content-type'), /image\/png/); assert.equal(Buffer.from(await r.arrayBuffer()).subarray(1, 4).toString(), 'PNG'); }
  }
});

test('Títulos y og:site_name de las cinco páginas de la especificación', {skip: !base}, async () => {
  const expected = {
    '/aethryon/': 'AETHRYON | RAUVIA',
    '/casos/': 'Casos y evidencia | RAUVIA',
    '/casos/presencia-posicionamiento-profesional/': 'Caso de presencia profesional | RAUVIA',
    '/frente-comercial/': 'Frente Comercial para PyMES | RAUVIA',
    '/soluciones/': 'Portafolio de Soluciones | RAUVIA'
  };
  for (const [p, title] of Object.entries(expected)) {
    const html = await (await fetch(base + p)).text();
    assert.equal(html.match(/<title>(.*?)<\/title>/s)[1].trim(), title, p);
    assert.match(html, /property="og:site_name"[^>]*content="RAUVIA"/, p);
  }
});

test('El pie de rauvia.com.mx ya no lleva el crédito; la plantilla de clientes lo conserva con «RAUVIA»', () => {
  assert.doesNotMatch(fs.readFileSync('src/components/Footer.tsx', 'utf8'), CREDIT);
  const policy = fs.readFileSync('docs/rauviaweb-attribution-policy.md', 'utf8');
  assert.match(policy, /Experiencia digital desarrollada por <a href="https:\/\/rauvia\.com\.mx\/">RAUVIA<\/a>/);
  assert.doesNotMatch(policy, /consulting/i);
});
