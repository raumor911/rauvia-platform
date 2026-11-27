import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer';

// Regresión: al navegar internamente (sin recarga) desde una página con idioma explícito (/seo-ai/, es-MX)
// hacia una que usa el idioma por defecto (/), <html lang> no debe quedar vacío ni desaparecer.
// Se lee con getAttribute('lang'): null o '' hacen fallar la prueba (document.documentElement.lang no los distingue).
// Requiere `npm run build` y el servidor de producción (npm test lo levanta y fija TEST_BASE_URL).

const base = process.env.TEST_BASE_URL;
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const readLang = page => page.evaluate(() => document.documentElement.getAttribute('lang'));
const settle = ms => new Promise(r => setTimeout(r, ms));
const htmlLang = html => (html.match(/<html\b[^>]*\blang="([^"]*)"/) || [])[1];

test('HTML inicial: Inicio declara «es» y SEO para IA declara «es-MX»', async () => {
  assert.equal(htmlLang(fs.readFileSync('dist/index.html', 'utf8')), 'es', 'dist/index.html');
  assert.equal(htmlLang(fs.readFileSync('dist/seo-ai/index.html', 'utf8')), 'es-MX', 'dist/seo-ai/index.html');
  if (!base) return;
  assert.equal(htmlLang(await (await fetch(base + '/')).text()), 'es', 'servidor /');
  assert.equal(htmlLang(await (await fetch(base + '/seo-ai/')).text()), 'es-MX', 'servidor /seo-ai/');
});

test('lang se conserva en cada paso de la navegación interna (SEO para IA ↔ Inicio)',
  {skip: !base ? 'TEST_BASE_URL no definido (usa npm test)' : !fs.existsSync(chrome) ? `Chrome no encontrado en ${chrome} (CHROME_PATH)` : false},
  async () => {
    const browser = await puppeteer.launch({headless: true, executablePath: chrome});
    try {
      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 800});

      await page.goto(base + '/', {waitUntil: 'networkidle0'});
      assert.equal(await readLang(page), 'es', 'Inicio cargado directamente');

      await page.goto(base + '/seo-ai/', {waitUntil: 'networkidle0'});
      assert.equal(await readLang(page), 'es-MX', 'SEO para IA cargado directamente');

      await page.evaluate(() => { window.__sinRecarga = true; });
      const logos = await page.$$('header a[href="/"], nav a[href="/"]');
      let logo = null;
      for (const h of logos) if (await h.boundingBox()) { logo = h; break; }
      assert.ok(logo, 'logo visible del navbar (a[href="/"])');
      await Promise.all([page.waitForFunction(() => location.pathname === '/'), logo.click()]);
      await settle(800);
      assert.equal(await page.evaluate(() => window.__sinRecarga === true), true, 'el clic en el logo no recargó la página');
      assert.equal(await readLang(page), 'es', 'SEO para IA → Inicio mediante el logo, sin recarga');

      await page.goBack();
      await page.waitForFunction(() => location.pathname === '/seo-ai/');
      await settle(800);
      assert.equal(await page.evaluate(() => window.__sinRecarga === true), true, 'Atrás no recargó la página');
      assert.equal(await readLang(page), 'es-MX', 'Botón Atrás, sin recarga');
    } finally { await browser.close(); }
  });
