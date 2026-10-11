import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsPath = path.resolve(__dirname, '../docs');
const testsPath = path.resolve(__dirname, '../tests');

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    errors++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log("Iniciando Auditoría de Autoridad (Fase 4)...");

const requiredDocs = [
  'llmo-phase-4-foundation-validation.md',
  'llmo-phase-4-external-audit.md',
  'external-assets-inventory.md',
  'external-messaging-library.md',
  'profile-consistency-matrix.md',
  'sameas-policy.md',
  'content-distribution-strategy.md',
  'content-repurposing-policy.md',
  'digital-pr-opportunity-map.md',
  'citable-assets-roadmap.md',
  'original-research-policy.md',
  'public-repository-policy.md',
  'founder-authority-strategy.md',
  'community-participation-policy.md',
  'brand-monitoring-framework.md',
  'ai-presence-observability.md',
  'llmo-presence-maturity-model.md',
  'authority-measurement-framework.md',
  'ai-attribution-model.md',
  'llmo-observability-dashboard-spec.md',
  'external-correction-protocol.md',
  'link-mention-governance.md',
  'authority-roadmap-90-days.md',
  'citation-asset-policy.md',
  'feed-distribution-policy.md',
  'manual-external-actions.md',
  'llmo-phase-4-handoff.md'
];

requiredDocs.forEach(doc => {
  assert(fs.existsSync(path.join(docsPath, doc)), `Documento requerido debe existir: ${doc}`);
});

const queriesPath = path.join(testsPath, 'ai-presence-queries.json');
assert(fs.existsSync(queriesPath), "Debe existir tests/ai-presence-queries.json");

if (errors > 0) {
  console.error(`\n🚨 Auditoría de autoridad fallida con ${errors} errores.`);
  process.exit(1);
} else {
  console.log(`\n🎉 Auditoría de autoridad completada con éxito.`);
  process.exit(0);
}
