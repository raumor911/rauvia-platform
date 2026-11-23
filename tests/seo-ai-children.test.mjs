import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {routeSeo} from '../src/seo/routeSeo.js';
import {publicRoutes} from '../scripts/public-routes.js';

// Contrato: especificación técnica de auditoría e implementación v0.1 (+ ficha de precios v0.2).
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const loader = read('../src/lib/routeLoader.ts');
const sitemap = read('../data/sitemap-cache.xml');
const css = read('../src/pages/SeoAiPage.css');
const shared = read('../src/pages/seoAiShared.tsx');

const pages = [
  {route: '/seo-ai/auditoria', file: '../src/pages/SeoAiAuditoriaPage.tsx', title: 'Auditoría GEO para empresas | RAUVIA', h1: 'Auditoría GEO para empresas', crumb: 'Auditoría GEO',
   description: 'Identifica qué pueden rastrear los buscadores, cómo se describe tu oferta en respuestas de IA y qué conviene corregir primero.',
   anchors: ['alcance', 'entregable', 'verificacion', 'preguntas', 'solicitar-auditoria'], primary: 'Solicitar alcance de auditoría', secondary: 'Ver una muestra'},
  {route: '/seo-ai/implementacion', file: '../src/pages/SeoAiImplementacionPage.tsx', title: 'Implementación de SEO para IA (GEO) | RAUVIA', h1: 'Implementación de SEO para IA para empresas', crumb: 'Implementación de SEO para IA',
   anchors: ['cambios', 'ejemplo', 'requisitos', 'entrega', 'preguntas', 'solicitar-implementacion'], primary: 'Solicitar propuesta de implementación', secondary: 'Ver qué podemos cambiar'},
];

for (const p of pages) {
  const seo = routeSeo[p.route];
  const page = read(p.file);

  test(`${p.route}: metadata, canonical autorreferente y registro`, () => {
    assert.equal(seo.title, p.title);
    assert.equal(seo.canonical, 'https://rauvia.com.mx' + p.route + '/');
    assert.equal(seo.lang, 'es-MX');
    assert.equal(seo.robots, 'index, follow');
    if (p.description) assert.equal(seo.description, p.description);
    assert.doesNotMatch(seo.description, /garant|cotizaci/i);
    assert.ok(publicRoutes.includes(p.route));
    assert.ok(loader.includes(`'${p.route}': () => import(`));
    assert.ok(sitemap.includes(`<loc>${seo.canonical}</loc>`));
  });

  test(`${p.route}: Service propio, BreadcrumbList coherente con la miga visible, sin precios en el grafo`, () => {
    const service = seo.schema.find(i => i['@type'] === 'Service');
    assert.equal(service['@id'], seo.canonical + '#servicio');
    assert.equal(service.url, seo.canonical);
    assert.equal(service.name, p.h1);
    assert.equal(service.provider['@id'], 'https://rauvia.com.mx/#organization');
    for (const forbidden of ['offers', 'areaServed', 'aggregateRating', 'review', 'price']) assert.ok(!(forbidden in service), forbidden);
    const crumbs = seo.schema.find(i => i['@type'] === 'BreadcrumbList').itemListElement;
    assert.deepEqual(crumbs.map(c => c.name), ['RAUVIA', 'SEO para IA', p.crumb]);
    assert.equal(crumbs[2].item, seo.canonical);
    assert.ok(page.includes(`crumb="${p.crumb}"`));
    assert.ok(shared.includes('<Link to="/">RAUVIA</Link>') && shared.includes('<Link to="/seo-ai/">SEO para IA</Link>'));
    assert.ok(!seo.schema.some(i => ['FAQPage', 'Organization'].includes(i['@type'])));
  });

  test(`${p.route}: contenido del contrato (H1, anclas, CTAs, ficticios, sin formulario ni claims)`, () => {
    assert.ok(page.includes(`h1="${p.h1}"`));
    for (const id of p.anchors) assert.ok(page.includes(`id="${id}"`), id);
    assert.ok(page.includes(`label: '${p.primary}'`) && page.includes(`label: '${p.secondary}'`));
    assert.ok(page.includes(`href: '#${p.anchors.at(-1)}'`));
    assert.ok(page.includes('Ejemplo ficticio, no es un cliente ni un resultado'));
    assert.ok(page.includes('/aviso-de-privacidad/'));
    assert.doesNotMatch(page, /<form|type="password"/);
    assert.doesNotMatch(page, /margen|650|13,200|5,050|costo estimado|189,300/i);
    assert.match(page, /rankings, menciones, citas, tr[aá]fico, leads ni ventas|no modifica tu sitio|no es un resultado real/i);
    assert.doesNotMatch(page, /garantizad|#1\b|primer[ao]s? posici/i);
  });
}

test('auditoría: $9,900 + IVA pago único, tabla ficticia de seis columnas y panel de verificación', () => {
  const page = read(pages[0].file);
  assert.ok(page.includes('$9,900 MXN + IVA'));
  assert.ok(page.includes('pago único'));
  assert.doesNotMatch(page, /\$29,900|\$179,400/);
  for (const col of ['Prioridad', 'URL o pregunta', 'Hallazgo', 'Evidencia', 'Acción recomendada', 'Cómo verificar']) assert.ok(page.includes(`<th scope="col">${col}</th>`), col);
  assert.ok(page.includes('no confirma envío a Querétaro'));
  assert.ok(page.includes('no observado bajo esas condiciones'));
  for (const w of ['Accesibilidad', 'Indexación', 'Mención', 'Cita', 'Fidelidad']) assert.ok(page.includes(`'${w}'`), w);
  assert.ok(page.includes('Escribirnos por WhatsApp no contrata la auditoría'));
  // Enlace a implementación solo en el punto de decisión; la auditoría no se vende como condición.
  assert.ok(page.includes('¿Ya tienes claros los cambios?') && page.includes('Solicita alcance de implementación'));
});

test('implementación: mensualidad, duración y total juntos antes del CTA, requisitos y antes/después', () => {
  const page = read(pages[1].file);
  const chip = '$29,900 MXN + IVA al mes · durante 6 meses · $179,400 MXN + IVA en total';
  assert.ok(page.includes(chip));
  assert.ok(page.indexOf(chip) < page.indexOf("label: 'Solicitar propuesta de implementación'"));
  assert.ok(page.includes('sin renovación automática'));
  assert.doesNotMatch(page, /\$9,900/);
  assert.ok(page.includes('Gabinete exterior') && page.includes('Solicite información.'));
  assert.ok(page.includes('Entrega declarada') && page.includes('solo si el proveedor lo confirma'));
  assert.ok(page.includes('Empieza por la auditoría GEO'));
  assert.ok(page.includes('En este primer contacto no adjuntes archivos ni compartas accesos'));
  assert.match(page, /const requirements = \[(?:.|\n)*Accesos de escritura solo por un canal autorizado/);
});

test('AEO: «¿Auditoría e implementación son lo mismo?» coherente en las tres páginas', () => {
  const files = ['../src/pages/SeoAiPage.tsx', pages[0].file, pages[1].file].map(read);
  const q = '¿Auditoría e implementación son lo mismo?';
  assert.ok(files[1].includes(q) && files[2].includes(q));
  for (const f of files.slice(1)) assert.match(f, /La auditoría diagnostica y no modifica el sitio/);
  for (const f of files.slice(1)) assert.match(f, /seis meses/);
});

test('hijas reusan look & feel y animaciones del hub', () => {
  for (const p of pages) {
    const page = read(p.file);
    assert.ok(page.includes("import './SeoAiPage.css'") && page.includes('useTechMotion(root)') && page.includes('seoai-progress'));
    assert.ok(page.includes('seoai-card') && page.includes('seoai-h2') && page.includes('seoai-final'));
  }
  assert.match(css, /\.seoai-table/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('hijas: HTML inicial prerenderizado (requiere npm run build)', {skip: !existsSync(new URL('../dist/seo-ai/auditoria/index.html', import.meta.url)) || !existsSync(new URL('../dist/seo-ai/implementacion/index.html', import.meta.url))}, () => {
  for (const p of pages) {
    const html = read('../dist' + p.route + '/index.html');
    assert.match(html, /<html lang="es-MX"/);
    assert.ok(html.includes(`<title>${p.title}</title>`));
    assert.equal([...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(m => m[1]).join(), 'https://rauvia.com.mx' + p.route + '/');
    assert.doesNotMatch(html, /noindex/i);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.ok(html.includes(`"@id":"https://rauvia.com.mx${p.route}/#servicio"`));
    assert.ok(html.includes('"@type":"BreadcrumbList"'));
    for (const id of p.anchors) assert.ok(html.includes(`id="${id}"`), id);
    assert.ok(html.includes('href="/seo-ai/"'), 'miga hacia el hub');
  }
  const hub = read('../dist/seo-ai/index.html');
  assert.ok(hub.includes('href="/seo-ai/auditoria/"') && hub.includes('href="/seo-ai/implementacion/"'));
});

test('regresión: una lista con data-sa no se oculta a sí misma (seoai-check)', () => {
  assert.match(css, /\.sa-armed \.seoai-check:not\(\[data-sa\]\)\s*\{\s*opacity:\s*0/);
  assert.doesNotMatch(css, /\.sa-armed \.seoai-check\s*\{\s*opacity:\s*0/);
});
