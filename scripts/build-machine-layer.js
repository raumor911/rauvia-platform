// Regenera las partes de la capa para máquinas que dependen del catálogo de Soluciones y de la capa de recuperación
// (spec «página Soluciones» v0.2, S-06.1 / L-01 / L-02 / L-03):
//   - public/llms.txt, public/llms-full.txt, public/llmo/rauvia.md: sección «Soluciones publicadas» y entradas ajustadas.
//   - el número de «Canonical answers» y la versión de «Respuestas y fuentes» salen de public/llmo/canonical-answers.json
//     (que escribe `npm run build:retrieval`), no se escriben a mano.
//   - las referencias a llmo/soluciones.json aparecen solo si ese archivo existe (lo escribe `npm run build:knowledge`),
//     para que el commit de L-03 se pueda excluir sin dejar enlaces rotos.
// El resto de esos tres archivos es prosa editorial mantenida a mano; este script solo toca lo que está listado arriba.
// Uso: `node scripts/build-machine-layer.js` (escribe) · `node scripts/build-machine-layer.js --check` (falla si algo está desfasado).
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  seccionSolucionesLlms, seccionSolucionesRauviaMd,
  LINEA_SOLUCIONES, LINEA_FRENTE_COMERCIAL, LINEA_CATALOGO_JSON, LINEA_REFERENCIA_JSON
} from '../src/data/solucionesMachine.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = p => path.join(root, p);

// Sustituye la sección «Soluciones publicadas» si existe; si no, la inserta antes del encabezado `anchor`.
export const upsertSection = (text, block, anchor) => {
  const existing = /(^|\n)## Soluciones publicadas\n[\s\S]*?(?=\n\n## |\s*$)/;
  if (existing.test(text)) return text.replace(existing, (_m, lead) => `${lead}${block}`);
  const at = text.indexOf(`\n${anchor}\n`);
  if (at === -1) throw new Error(`No se encontró el encabezado ancla «${anchor}» para insertar la sección.`);
  return `${text.slice(0, at + 1)}${block}\n\n${text.slice(at + 1)}`;
};

// Garantiza (o quita) una línea justo después de la línea que empieza con `afterStartsWith`.
const ensureLineAfter = (text, afterStartsWith, line, present) => {
  const lines = text.split('\n');
  const clean = lines.filter(l => l !== line);
  if (!present) return clean.join('\n');
  const i = clean.findIndex(l => l.startsWith(afterStartsWith));
  if (i === -1) throw new Error(`No se encontró la línea «${afterStartsWith}» para colocar «${line.slice(0, 40)}…».`);
  clean.splice(i + 1, 0, line);
  return clean.join('\n');
};

const retrievalLabels = (text, {count, release}) => text
  .replace(/(\[Canonical answers\]\([^)]*\): )\d+( familias)/, `$1${count}$2`)
  .replace(/^## Respuestas y fuentes V\d+(?:\.\d+)?$/m, `## Respuestas y fuentes ${release}`);

export const renderLlmsTxt = (text, ctx) => {
  let t = upsertSection(text, seccionSolucionesLlms({conJson: ctx.conJson}), '## Páginas originales');
  t = t.replace(/^- \[Soluciones\]\(https:\/\/rauvia\.com\.mx\/soluciones\/\):.*$/m, LINEA_SOLUCIONES);
  t = t.replace(/^- \[Frente comercial\]\(https:\/\/rauvia\.com\.mx\/frente-comercial\/\):.*$/m, LINEA_FRENTE_COMERCIAL);
  t = t.replace(/^(- \[RAUVIA y sus capacidades\]\(https:\/\/rauvia\.com\.mx\/llmo\/rauvia\.md\): ).*$/m, '$1Identidad, soluciones publicadas y límites.');
  t = ensureLineAfter(t, '- [Entidad estructurada]', LINEA_REFERENCIA_JSON, ctx.conJson);
  t = ensureLineAfter(t, 'Intent coverage:', LINEA_CATALOGO_JSON, ctx.conJson);
  return retrievalLabels(t, ctx);
};

export const renderLlmsFull = (text, ctx) => {
  let t = upsertSection(text, seccionSolucionesLlms({conJson: ctx.conJson}), '## AETHRYON');
  t = ensureLineAfter(t, 'Intent coverage:', LINEA_CATALOGO_JSON, ctx.conJson);
  return retrievalLabels(t, ctx);
};

export const renderRauviaMd = (text, ctx) => upsertSection(text, seccionSolucionesRauviaMd({conJson: ctx.conJson}), '## RAUVIA Trayectoria');

export const context = () => {
  const answers = JSON.parse(fs.readFileSync(rel('public/llmo/canonical-answers.json'), 'utf8'));
  return {count: answers.answers.length, release: answers.release, conJson: fs.existsSync(rel('public/llmo/soluciones.json'))};
};

export const targets = [
  ['public/llms.txt', renderLlmsTxt],
  ['public/llms-full.txt', renderLlmsFull],
  ['public/llmo/rauvia.md', renderRauviaMd]
];

export const run = ({check = false} = {}) => {
  const ctx = context();
  const drift = [];
  for (const [file, render] of targets) {
    const before = fs.readFileSync(rel(file), 'utf8');
    const after = render(before, ctx);
    if (before !== after) {
      drift.push(file);
      if (!check) fs.writeFileSync(rel(file), after);
    }
  }
  return {ctx, drift};
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check');
  const {ctx, drift} = run({check});
  console.log(`Machine layer ${check ? 'check' : 'build'}: ${ctx.count} canonical answers (${ctx.release}); soluciones.json ${ctx.conJson ? 'presente' : 'ausente'}; ${drift.length ? (check ? 'DESFASADOS' : 'actualizados') + ': ' + drift.join(', ') : 'sin cambios'}.`);
  if (check && drift.length) process.exit(1);
}
