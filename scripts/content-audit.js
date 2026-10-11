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

console.log("Iniciando Auditoría de Contenido Editorial (Fase 3)...");

// Verificación de documentos obligatorios
const requiredDocs = [
  'llmo-phase-3-foundation-validation.md',
  'llmo-phase-3-content-audit.md',
  'topic-territories.md',
  'business-problem-map.md',
  'search-intent-map.md',
  'pillar-page-architecture.md',
  'content-cluster-map.md',
  'editorial-platform-architecture.md',
  'editorial-template.md',
  'direct-answer-policy.md',
  'evidence-policy.md',
  'source-management-policy.md',
  'editorial-authorship-policy.md',
  'case-study-policy.md',
  'aethryon-publication-policy.md',
  'glossary-implementation.md',
  'editorial-taxonomy.md',
  'question-answer-map.md',
  'editorial-linking-policy.md',
  'editorial-schema.md',
  'machine-readable-content.md',
  'editorial-prioritization.md',
  'editorial-roadmap-12-weeks.md',
  'wordpress-editorial-integration.md',
  'content-lifecycle-policy.md',
  'llmo-content-measurement-framework.md',
  'content-retrieval-playbook.md',
  'editorial-governance.md',
  'llmo-phase-3-handoff.md'
];

requiredDocs.forEach(doc => {
  assert(fs.existsSync(path.join(docsPath, doc)), `Documento requerido debe existir: ${doc}`);
});

// Verificación de pruebas de recuperación
const questionsPath = path.join(testsPath, 'content-retrieval-questions.json');
assert(fs.existsSync(questionsPath), "Debe existir tests/content-retrieval-questions.json");

if (errors > 0) {
  console.error(`\n🚨 Auditoría de contenido fallida con ${errors} errores.`);
  process.exit(1);
} else {
  console.log(`\n🎉 Auditoría de contenido completada con éxito.`);
  process.exit(0);
}
