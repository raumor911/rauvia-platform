import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {routeSeo} from '../src/seo/routeSeo.js';
import {publicRoutes} from '../scripts/public-routes.js';

// Contrato: especificación técnica de la landing /seo-ai/ v0.1.
const route = '/seo-ai';
const seo = routeSeo[route];
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const dist = new URL('../dist/seo-ai/index.html', import.meta.url);

test('SEO AI: metadata del contrato', () => {
  assert.equal(seo.title, 'SEO para IA generativa (GEO) para empresas | RAUVIA');
  assert.equal(seo.canonical, 'https://rauvia.com.mx/seo-ai/');
  assert.equal(seo.lang, 'es-MX');
  assert.equal(seo.robots, 'index, follow');
  assert.match(seo.description, /^Preparamos tu sitio para que buscadores y asistentes de IA/);
  assert.doesNotMatch(seo.description, /garant/i);
});

test('SEO AI: registrada en rutas públicas, loader y sitemap de respaldo', () => {
  assert.ok(publicRoutes.includes(route));
  assert.ok(read('../src/lib/routeLoader.ts').includes("'/seo-ai': () => import('../pages/SeoAiPage')"));
  assert.ok(read('../data/sitemap-cache.xml').includes('<loc>https://rauvia.com.mx/seo-ai/</loc>'));
});

test('SEO AI: un Service ligado a la Organization real, sin ofertas ni reseñas inventadas', () => {
  const services = seo.schema.filter(item => item['@type'] === 'Service');
  assert.equal(services.length, 1);
  const [service] = services;
  assert.equal(service['@id'], 'https://rauvia.com.mx/seo-ai/#servicio');
  assert.equal(service.name, 'SEO para IA generativa (GEO) para empresas');
  assert.equal(service.serviceType, 'Consultoría, auditoría e implementación de SEO para IA');
  assert.equal(service.url, seo.canonical);
  assert.equal(service.provider['@id'], 'https://rauvia.com.mx/#organization');
  for (const forbidden of ['offers', 'areaServed', 'aggregateRating', 'review', 'price']) assert.ok(!(forbidden in service), forbidden);
  assert.ok(!seo.schema.some(item => ['FAQPage', 'Organization'].includes(item['@type'])));
});

test('SEO AI: enlace descriptivo desde Frente Comercial y sin rutas futuras', () => {
  assert.match(read('../src/pages/FrenteComercialPage.tsx'), /to="\/seo-ai\/"[^>]*>SEO para IA generativa \(GEO\)</);
  const page = read('../src/pages/SeoAiPage.tsx');
  // El hub enlaza a cada hija con texto descriptivo; ambas existen y están registradas (tests/seo-ai-children).
  assert.match(page, /to="\/seo-ai\/auditoria\/"[^>]*>Ver el detalle de la auditoría GEO/);
  assert.match(page, /to="\/seo-ai\/implementacion\/"[^>]*>Ver el detalle de la implementación/);
});

test('SEO AI: tres ejemplos ficticios de nichos distintos y animación progresiva', () => {
  const page = read('../src/pages/SeoAiPage.tsx');
  const shared = read('../src/pages/seoAiShared.tsx');
  const css = read('../src/pages/SeoAiPage.css');
  const niches = [...page.matchAll(/niche: '([^']+)'/g)].map(m => m[1]);
  assert.equal(niches.length, 3);
  assert.equal(new Set(niches).size, 3);
  assert.ok(page.includes('Querétaro') && page.includes('Guadalajara') && page.includes('software de inventarios'));
  // Cada ejemplo lleva su rótulo visible (una sola plantilla repetida por .map).
  assert.equal((page.match(/Ejemplo ficticio, no es un cliente ni un resultado/g) || []).length, 1);
  // El movimiento es mejora progresiva: se arma solo con JS y sin movimiento reducido.
  assert.match(shared, /classList\.add\('sa-armed'\)/);
  assert.match(shared, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.sa-armed \[data-sa\]:not\(\.sa-in\)/);
  assert.doesNotMatch(css, /^\[data-sa\]\s*\{[^}]*opacity:\s*0/m);
});

test('SEO AI: oferta y precios v0.2, sin cifras internas ni claims', () => {
  const page = read('../src/pages/SeoAiPage.tsx');
  for (const text of ['$9,900 MXN + IVA', '$29,900 MXN + IVA al mes', '$179,400 MXN + IVA en total', 'Durante 6 meses', 'hasta 3 URLs y 6 preguntas de compra en 2 superficies de IA', 'sin renovación automática']) assert.ok(page.includes(text), text);
  // La mensualidad siempre va acompañada de duración y total.
  assert.ok(page.indexOf('$29,900 MXN + IVA al mes') < page.indexOf('Durante 6 meses · $179,400 MXN + IVA en total'));
  assert.equal((page.match(/\$29,900/g) || []).length, 1);
  assert.equal((page.match(/\[ Mes \{i \+ 1\} \]/g) || []).length, 1);
  const shared = read('../src/pages/seoAiShared.tsx');
  const monthsBlock = shared.slice(shared.indexOf('export const months = ['), shared.indexOf('] as const;', shared.indexOf('export const months = [')));
  assert.equal((monthsBlock.match(/\n  \['/g) || []).length, 6);
  assert.ok(monthsBlock.includes("['Cierre'"));
  // Control interno de la ficha: nunca se publica.
  assert.doesNotMatch(page, /margen|650|13,200|5,050|costo estimado|189,300/i);
  assert.match(page, /No garantizamos rankings, menciones, citas, tr[aá]fico, leads ni ventas/);
  assert.match(page, /Solicitar propuesta de implementaci[oó]n/);
  // El Service no declara ofertas ni precios (especificación §3).
  assert.ok(!('offers' in routeSeo['/seo-ai'].schema.find(i => i['@type'] === 'Service')));
});

test('SEO AI: copy fuente de la página (secciones, anclas y límites)', () => {
  const page = read('../src/pages/SeoAiPage.tsx');
  for (const id of ['que-es', 'metodo', 'ejemplo', 'alcance', 'medicion', 'preguntas', 'solicitar-auditoria']) assert.ok(page.includes(`id="${id}"`), id);
  assert.ok(page.includes('href="#solicitar-auditoria"') && page.includes('href="#medicion"'));
  assert.ok(page.includes('Ejemplo ficticio, no es un cliente ni un resultado'));
  assert.ok(page.includes('/aviso-de-privacidad/'));
  assert.match(page, /no contrata la auditor[ií]a ni implica que sea gratuita/);
  assert.doesNotMatch(page, /<form/);
});

test('SEO AI: HTML inicial prerenderizado (requiere npm run build)', {skip: !existsSync(dist)}, () => {
  const html = readFileSync(dist, 'utf8');
  assert.match(html, /<html lang="es-MX"/);
  assert.match(html, /<title>SEO para IA generativa \(GEO\) para empresas \| RAUVIA<\/title>/);
  assert.equal([...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(m => m[1]).join(), 'https://rauvia.com.mx/seo-ai/');
  assert.doesNotMatch(html, /noindex/i);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.equal((html.match(/<h3[^>]*>¿[^<]+\?<\/h3>/g) || []).length, 5);
  assert.match(html, /id="solicitar-auditoria"/);
  assert.match(html, /"@id":"https:\/\/rauvia\.com\.mx\/seo-ai\/#servicio"/);
});

test('SEO AI: capa gráfica decorativa, accesible y sin romper el contrato', () => {
  const page = read('../src/pages/SeoAiPage.tsx');
  const shared = read('../src/pages/seoAiShared.tsx');
  const css = read('../src/pages/SeoAiPage.css');
  assert.match(shared, /<svg viewBox="0 0 520 420" aria-hidden="true" focusable="false">/);
  assert.match(shared, /Ilustración conceptual[^<]*No es un resultado real/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  for (const token of ['#0A2540', '#1E4A74', '#E6A300', '#FFD766']) assert.ok(css.includes(token), token);
  // H1 y textos fijos del contrato se conservan literalmente.
  for (const text of ['SEO para IA generativa (GEO) para empresas', 'Primero revisamos qué puede consultar un buscador o asistente. Después comprobamos qué dice sobre tu empresa con preguntas reales de compra.', 'Nuestro trabajo será preparar y verificar la información pública de tu empresa para que sea accesible en búsqueda y útil como fuente en respuestas de IA.']) assert.ok(page.includes(text), text);
  // El gancho no promete resultados.
  assert.doesNotMatch(page, /garantizad|#1|primer[ao]s? posici|aparecer[áa]s/i);
});
