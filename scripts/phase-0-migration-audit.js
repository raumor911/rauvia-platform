import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    errors++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log("Iniciando Auditoría de Migración de WP y React (Fase 0)...");

// 1. Verificar WP_CONFIG en React
const wpConfigPath = path.join(__dirname, '../src/config/wordpress.ts');
assert(fs.existsSync(wpConfigPath), "Debe existir src/config/wordpress.ts centralizando los endpoints");

if (fs.existsSync(wpConfigPath)) {
  const content = fs.readFileSync(wpConfigPath, 'utf8');
  assert(content.includes('blog.rauvia.com.mx') || content.includes('/blog') || content.includes('wp-json'), "WP_CONFIG debe apuntar a la API de WordPress");
}

// 2. Verificar consumo de WP_CONFIG en wp.ts
const wpTsPath = path.join(__dirname, '../src/lib/wp.ts');
if (fs.existsSync(wpTsPath)) {
  const content = fs.readFileSync(wpTsPath, 'utf8');
  assert(content.includes('WP_CONFIG'), "src/lib/wp.ts debe usar la configuración centralizada (WP_CONFIG)");
}

// 3. Verificar que sitemap apunte al blog para fetch
const sitemapScriptPath = path.join(__dirname, 'generate-sitemap.js');
if (fs.existsSync(sitemapScriptPath)) {
  const content = fs.readFileSync(sitemapScriptPath, 'utf8');
  assert(content.includes('blog.rauvia.com.mx') || content.includes('/blog') || content.includes('wp-json'), "generate-sitemap.js debe usar la ruta de API para el blog");
}

if (errors > 0) {
  console.error(`\n🚨 Auditoría fallida con ${errors} errores.`);
  process.exit(1);
} else {
  console.log(`\n🎉 Auditoría de migración completada con éxito.`);
  process.exit(0);
}
