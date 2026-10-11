import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const publicPath = path.resolve(__dirname, '../public');
const srcPath = path.resolve(__dirname, '../src');

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    errors++;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log("Iniciando Auditoría SEO (Fase 1)...");

// 1. Robots.txt
const robotsExists = fs.existsSync(path.join(publicPath, 'robots.txt'));
assert(robotsExists, "robots.txt debe existir en public/");
if (robotsExists) {
  const content = fs.readFileSync(path.join(publicPath, 'robots.txt'), 'utf8');
  assert(content.includes('User-agent: OAI-SearchBot'), "robots.txt debe permitir OAI-SearchBot");
  assert(content.includes('User-agent: Googlebot'), "robots.txt debe permitir Googlebot");
  assert(content.includes('User-agent: Bingbot'), "robots.txt debe permitir Bingbot");
  assert(content.includes('Disallow: /blog/wp-admin/'), "robots.txt debe bloquear /blog/wp-admin/");
  assert(content.includes('Sitemap: https://rauvia.com.mx/sitemap.xml'), "robots.txt debe referenciar sitemap principal");
}

// 2. Sitemap
const sitemapScriptExists = fs.existsSync(path.join(__dirname, 'generate-sitemap.js'));
assert(sitemapScriptExists, "El script generador de sitemap debe existir");

// 3. LLMs
const llmsExists = fs.existsSync(path.join(publicPath, 'llms.txt'));
assert(llmsExists, "llms.txt debe existir en public/");
const llmsFullExists = fs.existsSync(path.join(publicPath, 'llms-full.txt'));
assert(llmsFullExists, "llms-full.txt debe existir en public/");

if (llmsExists) {
  const content = fs.readFileSync(path.join(publicPath, 'llms.txt'), 'utf8');
  assert(!content.includes('secret'), "llms.txt no debe exponer secretos");
}

// 4. SEO Centralizado y Metadata
const seoComponentExists = fs.existsSync(path.join(srcPath, 'components/SEO.tsx'));
assert(seoComponentExists, "Debe existir un componente SEO centralizado (src/components/SEO.tsx)");
if (seoComponentExists) {
  const content = fs.readFileSync(path.join(srcPath, 'components/SEO.tsx'), 'utf8');
  assert(content.includes('og:title'), "SEO.tsx debe implementar Open Graph");
  assert(content.includes('twitter:card'), "SEO.tsx debe implementar Twitter Cards");
  assert(content.includes('rel="canonical"'), "SEO.tsx debe implementar Canonical");
}

// 5. Configuración de API WP (No hardcodeada)
const wpConfigPath = path.join(srcPath, 'config/wordpress.ts');
if (fs.existsSync(wpConfigPath)) {
  const content = fs.readFileSync(wpConfigPath, 'utf8');
  assert(!content.includes('wp-json/wp/v2/users?password='), "La API de WP no debe contener secretos hardcodeados");
}

// 6. Validar que el servidor tiene fallback a 404
const serverTs = fs.readFileSync(path.join(__dirname, '../server.ts'), 'utf8');
assert(serverTs.includes('404.html') || serverTs.includes('404'), "server.ts debe enviar status 404 para rutas desconocidas o tener fallback adecuado");

if (errors > 0) {
  console.error(`\n🚨 Auditoría fallida con ${errors} errores.`);
  process.exit(1);
} else {
  console.log(`\n🎉 Auditoría completada con éxito. Listo para Fase 2.`);
  process.exit(0);
}
