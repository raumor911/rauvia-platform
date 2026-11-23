import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {routeSeo} from '../src/seo/routeSeo.js';
import {publicRoutes} from '../scripts/public-routes.js';

// Contrato: RAUVIA_SEO_AI_Cuatro_Landings_Benchmark_CIV_Convergencia_v0.3 §2–§6 y §8.
const read = p => readFileSync(new URL(p, import.meta.url), 'utf8');
const cases = [
  {id: 'correccion', route: '/seo-ai/corregir-informacion-en-ia', slug: 'corregir-informacion-en-ia', title: 'Corregir información de tu empresa en IA | RAUVIA', meta: 'Detecta por qué un asistente atribuye servicios, condiciones o zonas equivocadas a tu empresa. Audita las fuentes antes de corregir tu sitio.', h1: 'Aclara lo que los asistentes de IA dicen de tu empresa', cta: 'Solicitar auditoría de mi información', demo: 'Ver una matriz de ejemplo', intent: 'auditoria'},
  {id: 'catalogos', route: '/seo-ai/catalogos-para-ia', slug: 'catalogos-para-ia', title: 'SEO para catálogos de productos e IA | RAUVIA', meta: 'Convierte las fichas prioritarias de tu catálogo en páginas que explican producto, aplicación, límites y requisitos de cotización.', h1: 'SEO para catálogos de productos en buscadores y asistentes de IA', cta: 'Solicitar propuesta para mi catálogo', demo: 'Ver ficha antes y después', intent: 'implementacion'},
  {id: 'cobertura', route: '/seo-ai/cobertura-y-envios', slug: 'cobertura-y-envios', title: 'SEO para IA y zonas de servicio y envío | RAUVIA', meta: 'Aclara qué zonas atiendes por modalidad, cuándo aplican excepciones y qué debe confirmar el comprador antes de pedir una cotización.', h1: 'SEO para IA: aclara dónde vendes, envías e instalas', cta: 'Solicitar propuesta para mi cobertura', demo: 'Ver matriz de cobertura', intent: 'implementacion'},
  {id: 'proveedores', route: '/seo-ai/proveedores-tecnicos', slug: 'proveedores-tecnicos', title: 'SEO para IA para proveedores técnicos | RAUVIA', meta: 'Prepara una línea de oferta técnica para que Compras pueda evaluar aplicaciones, requisitos, evidencia y datos para cotizar.', h1: 'SEO para IA para proveedores técnicos', cta: 'Solicitar propuesta para mi oferta técnica', demo: 'Ver ficha de evaluación', intent: 'implementacion'},
];
const src = read('../src/pages/seoAiCases.ts');
const tpl = read('../src/pages/SeoAiCasePage.tsx');

for (const c of cases) {
  const seo = routeSeo[c.route];
  test(`Landing por caso ${c.id}: metadatos, canonical y datos estructurados`, () => {
    assert.equal(seo.title, c.title);
    assert.equal(seo.description, c.meta);
    assert.equal(seo.canonical, `https://rauvia.com.mx/seo-ai/${c.slug}/`);
    assert.equal(seo.lang, 'es-MX');
    assert.equal(seo.robots, 'index, follow');
    const [service] = seo.schema.filter(i => i['@type'] === 'Service');
    assert.equal(service['@id'], seo.canonical + '#servicio');
    assert.equal(service.provider['@id'], 'https://rauvia.com.mx/#organization');
    for (const f of ['offers', 'areaServed', 'aggregateRating', 'review', 'price']) assert.ok(!(f in service), f);
    assert.ok(!seo.schema.some(i => ['FAQPage', 'Organization'].includes(i['@type'])));
    const crumb = seo.schema.find(i => i['@type'] === 'BreadcrumbList');
    assert.deepEqual(crumb.itemListElement.map(i => i.position), [1, 2, 3]);
    assert.equal(crumb.itemListElement[2].item, seo.canonical);
  });
  test(`Landing por caso ${c.id}: registrada en rutas, cargador, sitemap de respaldo y archivos para IA`, () => {
    assert.ok(publicRoutes.includes(c.route));
    assert.ok(read('../src/lib/routeLoader.ts').includes(`'${c.route}': () => import(`));
    assert.ok(read('../data/sitemap-cache.xml').includes(`<loc>https://rauvia.com.mx/seo-ai/${c.slug}/</loc>`));
    assert.ok(read('../public/llms.txt').includes(`https://rauvia.com.mx/seo-ai/${c.slug}/`));
    assert.ok(read('../public/llms-full.txt').includes(`https://rauvia.com.mx/seo-ai/${c.slug}/`));
    const graph = JSON.parse(read('../public/llmo/knowledge-graph.json'));
    assert.ok(graph.nodes.some(n => n.url === seo.canonical || JSON.stringify(n).includes(`/seo-ai/${c.slug}`)), 'grafo');
  });
  test(`Landing por caso ${c.id}: copy, CTA y oferta del contrato`, () => {
    assert.ok(src.includes(`id: '${c.id}'`) && src.includes(c.h1), c.h1);
    assert.ok(src.includes(`ctaLabel: '${c.cta}'`), c.cta);
    assert.ok(src.includes(`demoLabel: '${c.demo}'`), c.demo);
    assert.ok(src.includes(`intent: '${c.intent}'`));
    assert.ok(src.includes(`path: '${c.route}'`));
  });
  test(`Landing por caso ${c.id}: el ejemplo es ficticio y no promete resultados`, () => {
    const start = src.indexOf(`id: '${c.id}'`);
    const block = src.slice(start, src.indexOf('prepare:', start));
    assert.doesNotMatch(block, /garantiz(amos|ado)\b(?! posiciones)|#1|primer[ao]s? posici|aparecer[áa]s|aumenta(rá|mos)\b/i);
    assert.match(block, /fictici|ficticio/i);
  });
}

test('Plantilla: orden de módulos, anclas, rótulo ficticio, CTA repetido y sin formulario', () => {
  const ids = ['encaje', 'demostracion', 'alcance', 'verificacion', 'preguntas', 'siguiente-paso'];
  const pos = ids.map(id => tpl.indexOf(`id="${id}"`));
  assert.ok(pos.every((p, i) => p >= 0 && (i === 0 || p > pos[i - 1])), ids.join(' → '));
  assert.ok(tpl.includes('Ejemplo ficticio, no es un cliente ni un resultado'));
  assert.ok(tpl.includes("href: '#demostracion'") || tpl.includes("href: '#demostracion'".replace(/'/g, '"')) || tpl.includes('#demostracion'));
  assert.ok(tpl.includes('/aviso-de-privacidad/'));
  assert.match(tpl, /Ningún servicio garantiza posiciones, menciones, citas, tr[aá]fico, leads ni ventas/);
  assert.match(tpl, /Escribirnos por WhatsApp no contrata el servicio|WhatsApp no contrata el servicio/);
  assert.doesNotMatch(tpl, /<form|type="password"/);
  assert.match(tpl, /trackCta\('siguiente_paso', c\.intent, c\.id\)/);
});

test('Oferta: precios de la ficha v0.2, mensualidad con duración y total, sin cifras de control interno', () => {
  for (const t of ['$9,900 MXN + IVA', '$29,900 MXN + IVA al mes', '$179,400 MXN + IVA en total', '6 meses', 'sin renovación automática', 'hasta 3 URLs y 6 preguntas de compra en 2 superficies', 'No exige Demanda Inteligente']) assert.ok(src.includes(t), t);
  assert.ok(src.indexOf('$29,900 MXN + IVA al mes · durante 6 meses · $179,400 MXN + IVA en total') > 0);
  assert.doesNotMatch(src + tpl, /margen|\b650\b|13,200|5,050|189,300|7\.61|22\.99|costo estimado/i);
});

test('Evento de clic: intent_id con valores fijos, sin texto libre', () => {
  const shared = read('../src/pages/seoAiShared.tsx');
  assert.match(shared, /intent_id: intentId/);
  for (const id of ['correccion', 'catalogos', 'cobertura', 'proveedores']) assert.ok(src.includes(`id: '${id}'`), id);
});

test('Hub: sección «Mi empresa no aparece en ChatGPT» sin quinta URL y «Soluciones por caso» con enlaces descriptivos', () => {
  const hub = read('../src/pages/SeoAiPage.tsx');
  assert.ok(hub.includes('id="no-aparece"') && hub.includes('Mi empresa no aparece en ChatGPT'));
  for (const t of ['Ausencia', 'Afirmación incorrecta', 'Falta de evidencia para comprar']) assert.ok(hub.includes(t), t);
  assert.ok(hub.includes('id="soluciones-por-caso"'));
  for (const c of cases) assert.ok(hub.includes(`/seo-ai/${c.slug}/`), c.slug);
  assert.ok(!publicRoutes.some(r => /chatgpt|gemini|alcald/i.test(r)), 'sin aliases por plataforma ni por alcaldía');
});

test('HTML inicial prerenderizado de las cuatro landings (requiere npm run build)', {skip: !existsSync(new URL('../dist/seo-ai/catalogos-para-ia/index.html', import.meta.url))}, () => {
  for (const c of cases) {
    const html = read(`../dist/seo-ai/${c.slug}/index.html`);
    assert.match(html, /<html lang="es-MX"/);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.equal([...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(m => m[1]).join(), `https://rauvia.com.mx/seo-ai/${c.slug}/`);
    assert.doesNotMatch(html, /noindex/i);
    for (const id of ['encaje', 'demostracion', 'alcance', 'verificacion', 'preguntas', 'siguiente-paso']) assert.ok(html.includes(`id="${id}"`), `${c.slug} #${id}`);
    assert.ok(html.includes(c.cta), c.cta);
    assert.ok(html.includes('Ejemplo ficticio, no es un cliente ni un resultado'));
    assert.ok((html.match(/<h3[^>]*>¿[^<]+\?<\/h3>/g) || []).length >= 4, 'respuestas de FAQ en el HTML');
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.doesNotMatch(html, /<form/);
  }
});
