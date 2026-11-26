import test from 'node:test';
import assert from 'node:assert/strict';
import {soluciones, cardText, wordCount, SOLUCIONES_REVIEWED_AT, SOLUCIONES_REVIEWED_LABEL} from '../src/data/solucionesCatalog.js';

// S-05 · /soluciones/ como catálogo plano (spec «página Soluciones» v0.2). Se prueba el HTML construido y servido, sin ejecutar scripts.
const base = process.env.TEST_BASE_URL;
const opts = {skip: !base};
const IDS = ['frente-comercial', 'seo-para-ia', 'ruta-90', 'medicos'];

const strip = html => html.replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/g, '');
const textOf = html => strip(html).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const mainOf = html => (html.match(/<main[\s\S]*?<\/main>/) || [''])[0];
const jsonLd = html => [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const walk = (n, f) => { if (Array.isArray(n)) n.forEach(x => walk(x, f)); else if (n && typeof n === 'object') { f(n); Object.values(n).forEach(v => walk(v, f)); } };
let cache;
const page = async () => cache ??= await (await fetch(base + '/soluciones/')).text();
const articles = html => [...html.matchAll(/<article\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)].map(m => ({id: m[1], html: m[2]}));

test('Un solo H1, título ≤60, meta ≤155 y metadatos iguales entre sí', opts, async () => {
  const h = await page();
  assert.equal([...h.matchAll(/<h1\b/g)].length, 1);
  assert.match(h.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]+>/g, ''), /^Empieza por lo que hoy frena a tu empresa\.$/);
  const title = h.match(/<title>(.*?)<\/title>/s)[1].trim();
  const meta = h.match(/<meta name="description" content="([^"]*)"/)[1];
  assert.equal(title, 'Soluciones | Frente Comercial y SEO para IA | RAUVIA');
  assert.ok(title.length <= 60, `título ${title.length}`);
  assert.ok(meta.length <= 155, `meta ${meta.length}`);
  assert.equal(meta, 'Dos formas de empezar con RAUVIA: Frente Comercial, para que tu oferta se entienda, y SEO para IA, para que te encuentren buscadores y asistentes.');
  assert.match(h, new RegExp(`property="og:title"[^>]*content="${title.replace(/[|]/g, '\\|')}"`));
  assert.match(h, new RegExp(`name="twitter:title"[^>]*content="${title.replace(/[|]/g, '\\|')}"`));
  assert.match(h, /rel="canonical" href="https:\/\/rauvia\.com\.mx\/soluciones\/"/);
  assert.match(h, /property="og:site_name"[^>]*content="RAUVIA"/);
});

test('Ninguna frase retirada en S-03 sigue en la página, ni «activo(s)» ni «Consulting»', opts, async () => {
  const t = textOf(await page());
  const retiradas = [
    /NO VENDEMOS SERVICIOS/i, /CONSTRUIMOS CAPACIDADES/i, /CONSTRUIMOS LOS ACTIVOS/i, /PORTAFOLIO DE ACTIVOS/i, /EXPLORAR ACTIVOS/i, /CAT[ÁA]LOGO DE ACTIVOS/i,
    /QU[ÉE] ACTIVO NECESITA/i, /\bactivos?\b/i, /ENFOQUE\s*0?\d/i, /Organizar|Sistematizar|Tecnologizar|Automatizar\b(?!,)/, /flujo de valor/i, /Situaci[óo]n actual/i,
    /v1\.2\.0/, /Nivel de madurez/i, /Entregables core/i, /Indicadores de [ée]xito/i, /Dependencias/i, /Relacionados/i, /Se confirma despu[ée]s de validar el alcance/i,
    /Temprana \/ Reestructuraci[óo]n/i, /Sistema Comercial/i, /Arquitectura Operativa/i, /innovaci[óo]n disruptiva|soluci[óo]n 360|siguiente nivel/i, /Consulting/i, /AETHRYON DEFINE EL CAMINO/i
  ];
  for (const re of retiradas) assert.doesNotMatch(t, re, String(re));
  // «No conectamos herramientas…» sale una sola vez en toda la página (la del pie).
  assert.ok((t.match(/No conectamos herramientas/g) || []).length <= 1);
  assert.doesNotMatch(mainOf(await page()), /No conectamos herramientas/);
});

test('Sin precios en el texto de la página (viven en cada oferta y en llmo/precios.json)', opts, async () => {
  const t = textOf(mainOf(await page()));
  assert.doesNotMatch(t, /\$|MXN|\bIVA\b|pesos/i);
});

test('Cuatro tarjetas <article> con los id indicados, las mismas filas y el texto de la fuente única', opts, async () => {
  const arts = articles(await page());
  assert.deepEqual(arts.map(a => a.id), IDS);
  for (const [i, a] of arts.entries()) {
    const s = soluciones[i];
    assert.equal(a.id, s.id);
    assert.equal((a.html.match(/<h3\b/g) || []).length, 1, a.id);
    assert.match(a.html, /<h3\b[^>]*>([^<]*)<\/h3>/);
    assert.equal(a.html.match(/<h3\b[^>]*>([^<]*)<\/h3>/)[1], s.name);
    for (const label of ['Para quién:', 'Qué recibes:', 'Qué no incluye:']) assert.equal((a.html.match(new RegExp(`<strong>${label}</strong>`, 'g')) || []).length, 1, `${a.id} ${label}`);
    // mismo orden de campos
    const order = ['rv-sol-name', 'rv-sol-def', 'Para quién:', 'Qué recibes:', 'Qué no incluye:', 'rv-sol-links'].map(k => a.html.indexOf(k));
    assert.deepEqual(order, [...order].sort((x, y) => x - y), `${a.id} orden`);
    assert.ok(!order.includes(-1), a.id);
    const t = textOf(a.html);
    assert.ok(t.includes(s.definition), `${a.id} definición`);
    assert.ok(t.includes(s.audience), `${a.id} para quién`);
    for (const inc of s.includes) assert.ok(t.includes(inc), `${a.id} incluye`);
    assert.ok(t.includes(s.excludes), `${a.id} no incluye`);
    // enlace descriptivo hacia la página de la solución
    assert.match(a.html, new RegExp(`<a [^>]*href="${s.path}"[^>]*>\\s*${s.linkLabel}`), a.id);
  }
});

test('Cada tarjeta ≤90 palabras (nombre, etiquetas y campos; sin el enlace)', opts, async () => {
  for (const a of articles(await page())) {
    const body = textOf(a.html.replace(/<a\b[\s\S]*?<\/a>/g, ' '));
    assert.ok(wordCount(body) <= 90, `${a.id}: ${wordCount(body)} palabras`);
    assert.equal(wordCount(body), wordCount(cardText(soluciones.find(s => s.id === a.id))), `${a.id}: el HTML dice lo mismo que la fuente`);
  }
});

test('Todo el texto está en el HTML estático: sin pestañas, acordeones, «leer más» ni contenido oculto', opts, async () => {
  const h = await page(), m = mainOf(h);
  assert.doesNotMatch(m, /role="(tab|tablist|tabpanel)"|<details|<summary|aria-expanded|aria-controls|aria-pressed|<button|\shidden[\s>=]|display:\s*none|data-toggle|leer m[áa]s|ver m[áa]s|mostrar m[áa]s/i);
  // las cuatro tarjetas completas, leídas sin scripts
  const sinScripts = textOf(h.replace(/<script[\s\S]*?<\/script>/g, ''));
  for (const s of soluciones) for (const piece of [s.name, s.definition, s.audience, ...s.includes, s.excludes]) assert.ok(sinScripts.includes(piece), `${s.id}: «${piece.slice(0, 40)}…»`);
  assert.match(m, new RegExp(`<time datetime="${SOLUCIONES_REVIEWED_AT}">${SOLUCIONES_REVIEWED_LABEL}</time>`, 'i')); // React escribe el atributo como dateTime; en HTML no distingue mayúsculas
});

test('Jerarquía de encabezados limpia: un H1, H2 por bloque, H3 solo por solución, sin saltos', opts, async () => {
  const m = mainOf(await page());
  const heads = [...m.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map(x => ({l: +x[1], t: x[2].replace(/<[^>]+>/g, '').trim()}));
  let prev = 0;
  for (const h of heads) { assert.ok(h.l <= prev + 1, `salto de H${prev} a H${h.l}: ${h.t}`); prev = h.l; }
  assert.equal(heads.filter(h => h.l === 1).length, 1);
  const h2 = heads.filter(h => h.l === 2).map(h => h.t);
  for (const t of ['Soluciones de RAUVIA', 'Cuando la necesidad va más allá', 'Preguntas frecuentes']) assert.ok(h2.includes(t), t);
  assert.deepEqual(heads.filter(h => h.l === 3).map(h => h.t), soluciones.map(s => s.name));
});

test('Los dos botones principales del hero y del cierre tienen el mismo estilo', opts, async () => {
  const m = mainOf(await page());
  const cls = label => [...m.matchAll(new RegExp(`<a\\b[^>]*class="([^"]*)"[^>]*>${label}`, 'g'))].map(x => x[1]);
  const fc = cls('Ver Frente Comercial'), seo = cls('Ver SEO para IA');
  assert.equal(fc.length, 2); assert.equal(seo.length, 2);
  assert.ok(new Set([...fc, ...seo]).size === 1, 'misma clase en los cuatro botones');
  assert.match(m, /href="#frente-comercial"[^>]*>Ver Frente Comercial/);
  assert.match(m, /href="#seo-para-ia"[^>]*>Ver SEO para IA/);
  assert.match(m, /href="#otras-rutas"[^>]*>Tengo otro problema/);
});

test('Existen las anclas #otras-rutas, #frente-comercial, #seo-para-ia, #ruta-90 y #medicos, y todo enlace a ancla tiene destino', opts, async () => {
  const m = mainOf(await page());
  for (const id of ['otras-rutas', 'frente-comercial', 'seo-para-ia', 'ruta-90', 'medicos']) assert.match(m, new RegExp(`id="${id}"`), id);
  for (const [, id] of m.matchAll(/href="#([^"]+)"/g)) assert.match(m, new RegExp(`id="${id}"`), `ancla #${id}`);
  // la tabla de cuatro filas apunta a cuatro destinos distintos
  const rows = [...m.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map(r => r[1]).filter(r => /<td/.test(r));
  assert.equal(rows.length, 4);
});

test('Todos los enlaces internos del cuerpo responden 200 en el sitio construido', opts, async () => {
  const m = mainOf(await page());
  const hrefs = new Set([...m.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)].map(x => x[1]));
  assert.ok(hrefs.has('/frente-comercial/') && hrefs.has('/seo-ai/') && hrefs.has('/ruta-90/') && hrefs.has('/pagina-web-para-medicos/') && hrefs.has('/pagina-web-gratis-para-medicos/') && hrefs.has('/casos/') && hrefs.has('/aethryon/'));
  const bad = [];
  for (const href of hrefs) { const r = await fetch(base + href, {redirect: 'manual'}); if (r.status !== 200) bad.push(`${href}: ${r.status}`); }
  assert.deepEqual(bad, []);
  // el ancla de la home que enlaza «Cómo trabajamos» existe en la home construida
  assert.match(m, /href="\/#metodologia"/);
  assert.match(await (await fetch(base + '/')).text(), /id="metodologia"/);
});

test('JSON-LD válido: CollectionPage con ItemList sin orden que coincide con las tarjetas; sin FAQPage, Offer, Product ni «Consulting»', opts, async () => {
  const h = await page();
  const blocks = jsonLd(h); // JSON.parse ya valida cada bloque
  const page_ = blocks.find(b => b['@type'] === 'CollectionPage');
  assert.equal(page_.name, 'Soluciones | RAUVIA');
  assert.equal(page_.description, h.match(/<meta name="description" content="([^"]*)"/)[1]);
  const list = page_.mainEntity;
  assert.equal(list['@type'], 'ItemList');
  assert.equal(list.itemListOrder, 'https://schema.org/ItemListUnordered');
  assert.equal(list.itemListElement.length, 4);
  const cards = articles(h);
  list.itemListElement.forEach((it, i) => {
    assert.equal(it.name, soluciones[i].name); assert.equal(it.url, soluciones[i].url); assert.equal(it.description, soluciones[i].definition);
    assert.ok(textOf(cards[i].html).includes(it.description), 'description igual al texto visible');
    assert.ok(!('position' in it), 'sin position (la decisión es «sin orden»)');
  });
  const types = new Set(); walk(blocks, n => [].concat(n['@type'] || []).forEach(t => types.add(t)));
  for (const t of ['FAQPage', 'Offer', 'Product', 'AggregateOffer', 'Question']) assert.ok(!types.has(t), t);
  // única excepción permitida de «Consulting»: las URL de Facebook e Instagram (rauviaconsulting) del sameAs
  assert.doesNotMatch(JSON.stringify(blocks).replace(/https:\/\/www\.(?:facebook|instagram)\.com\/rauviaconsulting\/?/g, ''), /consulting|\bprice\b|priceCurrency/i);
});

test('Las fuentes de las tarjetas son páginas existentes y sin precio publicado en este catálogo', () => {
  for (const s of soluciones) {
    assert.match(s.url, /^https:\/\/rauvia\.com\.mx\/[a-z0-9-]+\/$/);
    assert.ok(Array.isArray(s.priceSource));
    for (const t of [s.definition, s.audience, ...s.includes, s.excludes, s.llms]) assert.doesNotMatch(t, /\$|MXN|\bIVA\b/);
  }
});
