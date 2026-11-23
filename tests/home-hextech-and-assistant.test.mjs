import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ASSISTANT_SYSTEM_PROMPT as prompt} from '../server/prompts/assistant.ts';

const read = p => readFileSync(new URL(p, import.meta.url), 'utf8');

test('Home: metodología y capacidades en HTML/SVG animado, sin imágenes estáticas', () => {
  const m = read('../src/components/MethodologySection.tsx');
  const c = read('../src/components/CapabilitiesSection.tsx');
  for (const t of ['CLARIDAD', 'ESTRUCTURA', 'SISTEMA', 'MEDICIÓN', 'ESCALAMIENTO']) assert.ok(m.includes(t), t);
  for (const t of ['ESTRATEGIA', 'SISTEMAS COMERCIALES', 'TECNOLOGÍA', 'AUTOMATIZACIÓN', 'DATOS & ANALYTICS', 'ACOMPAÑAMIENTO']) assert.ok(c.includes(t), t);
  assert.doesNotMatch(m + c, /<img/);
  assert.ok(m.includes('id="metodologia"') && c.includes('id="capacidades"'));
});

test('Home: animación progresiva, decorativa y en paleta RAUVIA', () => {
  const js = read('../src/components/HexTech.tsx');
  const css = read('../src/components/HexTech.css');
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /classList\.add\('hx-armed'\)/);
  assert.match(js, /aria-hidden="true"/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /^\[data-hx\][^{]*\{[^}]*opacity:\s*0/m);
  assert.doesNotMatch(css, /#2563EB/i);
  for (const token of ['#0A2540', '#1E4A74', '#E6A300', '#FFD766']) assert.ok(css.includes(token), token);
});

test('Asistente: conoce Frente Comercial y SEO para IA con precios y límites públicos', () => {
  for (const t of ['$6,900 MXN + IVA', '$9,900 MXN + IVA', 'desde $13,900 MXN + IVA', 'https://rauvia.com.mx/frente-comercial/', 'https://rauvia.com.mx/seo-ai/', '/seo-ai/auditoria/', '/seo-ai/implementacion/', '$29,900 MXN + IVA al mes durante 6 meses', '$179,400 MXN + IVA en total']) assert.ok(prompt.includes(t), t);
  assert.match(prompt, /no garantiza posiciones, menciones, citas, tráfico, leads ni ventas/);
  assert.match(prompt, /No es un CRM|no es un CRM/);
  // Control interno de la ficha: nunca en el prompt.
  assert.doesNotMatch(prompt, /\b(13,200|5,050|189,300|7\.61|22\.99)\b|margen de/i);
  assert.ok(!prompt.includes('`'));
});
