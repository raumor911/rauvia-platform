import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsPath = path.resolve(__dirname, '../docs');
const dataPath = path.resolve(__dirname, '../data');

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    errors++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log("Iniciando Auditoría LLMO (Fase 5)...");

const requiredDocs = [
  'llmo-phase-5-foundation-validation.md',
  'llmo-phase-5-observability-audit.md',
  'llmo-baseline.md',
  'query-observation-method.md',
  'ai-answer-evaluation-rubric.md',
  'citation-register-policy.md',
  'entity-error-management.md',
  'llmo-opportunity-management.md',
  'llmo-hypothesis-policy.md',
  'llmo-experiment-policy.md',
  'llmo-experiment-catalog.md',
  'llmo-experiment-prioritization.md',
  'cited-page-maintenance.md',
  'non-retrieved-pages-analysis.md',
  'content-cannibalization-audit.md',
  'content-refresh-policy.md',
  'llmo-commercial-attribution.md',
  'llmo-contribution-model.md',
  'utm-governance.md',
  'llmo-dashboard-implementation.md',
  'llmo-alert-thresholds.md',
  'llmo-monthly-operating-cycle.md',
  'llmo-quarterly-review.md',
  'llmo-change-governance.md',
  'editorial-versioning-policy.md',
  'aethryon-llmo-operations.md',
  'llmo-ci-policy.md',
  'llmo-manual-operations.md',
  'llmo-phase-5-handoff.md'
];

requiredDocs.forEach(doc => {
  assert(fs.existsSync(path.join(docsPath, doc)), `Documento requerido debe existir: ${doc}`);
});

const requiredData = [
  'llmo-citations.json',
  'entity-errors.json',
  'llmo-opportunities.json',
  'llmo-experiments.json',
  'llmo-change-log.json'
];

requiredData.forEach(file => {
  const filePath = path.join(dataPath, file);
  assert(fs.existsSync(filePath), `Data file requerido debe existir: ${file}`);
  if (fs.existsSync(filePath)) {
    try {
      JSON.parse(fs.readFileSync(filePath, 'utf8'));
      assert(true, `El archivo ${file} es un JSON válido`);
    } catch (e) {
      assert(false, `El archivo ${file} debe ser un JSON válido`);
    }
  }
});

if (errors > 0) {
  console.error(`\n🚨 Auditoría LLMO fallida con ${errors} errores.`);
  process.exit(1);
} else {
  console.log(`\n🎉 Auditoría LLMO completada con éxito.`);
  process.exit(0);
}
