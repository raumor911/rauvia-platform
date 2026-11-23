#!/usr/bin/env node
// Captura evidencia de navegador real (Chrome vía puppeteer) del Hero de la home y de las ocho rutas principales.
//   node scripts/capture-hero-evidence.mjs            → escribe docs/v77-evidencias/ (requiere `npm run build`)
//   node scripts/capture-hero-evidence.mjs --approve "Nombre"  → registra la aprobación visual del Hero
// La aprobación es una decisión humana: sin --approve el estado queda "pending" y la prueba lo muestra como TODO.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import {spawn, execSync} from 'node:child_process';
import puppeteer from 'puppeteer';

const OUT = 'docs/v77-evidencias';
const PORT = 3118;
const base = `http://127.0.0.1:${PORT}`;
const approveIdx = process.argv.indexOf('--approve');
fs.mkdirSync(OUT + '/screens', {recursive: true});

if (approveIdx > -1) {
  const by = process.argv[approveIdx + 1];
  if (!by) { console.error('--approve exige el nombre de quien aprueba'); process.exit(2); }
  const file = OUT + '/cta-validation.json';
  const ev = JSON.parse(fs.readFileSync(file, 'utf8'));
  ev.approval = {status: 'approved', by, at: new Date().toISOString()};
  fs.writeFileSync(file, JSON.stringify(ev, null, 2) + '\n');
  console.log('Aprobación registrada:', ev.approval); process.exit(0);
}

const sourceFiles = ['src/components/HeroSection.tsx', 'src/components/Footer.tsx', 'src/components/AethryonCore.tsx', 'src/styles/mobileExperience.css', 'src/pages/SolucionesPage.tsx', 'src/pages/NosotrosPage.tsx', 'src/App.tsx', 'src/pages/AethryonPage.tsx', 'src/pages/FrenteComercialPage.tsx', 'src/pages/CasosIndexPage.tsx', 'src/lib/analytics.ts'];
const sha = f => createHash('sha256').update(fs.readFileSync(f)).digest('hex');

const cachePath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'rauvia-hero-')), 'sitemap-cache.xml');
fs.copyFileSync('data/sitemap-cache.xml', cachePath);
const server = spawn('node', ['dist/server.cjs'], {env: {...process.env, NODE_ENV: 'production', PORT: String(PORT), SITEMAP_CACHE_PATH: cachePath}, stdio: 'ignore'});
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);
for (let i = 0; i < 40; i++) { try { if ((await fetch(base + '/')).ok) break; } catch {} await new Promise(r => setTimeout(r, 250)); }

const browser = await puppeteer.launch({headless: true, executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const heroViewports = [[390, 844], [850, 1000], [1440, 1000]];
const matrixViewports = [[320, 568], [390, 844], [430, 932], [768, 1024], [850, 1000], [1024, 1366], [1440, 1000]];
const routes = ['/', '/nosotros/', '/soluciones/', '/aethryon/', '/ruta-90/', '/frente-comercial/', '/recursos/', '/casos/'];

async function open(w, h, path) {
  const page = await browser.newPage();
  await page.setViewport({width: w, height: h, deviceScaleFactor: 1});
  await page.goto(base + path, {waitUntil: 'networkidle0'});
  return page;
}
const heroCtas = page => page.evaluate(() => [...document.querySelectorAll('.rv-home-hero .rv-hero-primary, .rv-home-hero .rv-hero-secondary')].slice(0, 2).map(a => {
  const r = a.getBoundingClientRect();
  return {text: a.textContent.trim(), href: a.getAttribute('href'), target: a.getAttribute('target'), class: a.className, icon: a.querySelector('svg')?.outerHTML ?? null, rect: {x: r.x, y: r.y, width: r.width, height: r.height}, viewport: [innerWidth, innerHeight]};
}));

const after = [], navigation = [];
for (const [w, h] of heroViewports) {
  let page = await open(w, h, '/');
  after.push(await heroCtas(page));
  await page.screenshot({path: `${OUT}/screens/home-hero-${w}.png`});
  await page.close();
  for (const [method, sel] of [['click', '.rv-home-hero .rv-hero-primary'], ['secondary_click', '.rv-home-hero .rv-hero-secondary']]) {
    page = await open(w, h, '/');
    await Promise.all([page.waitForNavigation({waitUntil: 'networkidle0'}).catch(() => {}), page.click(sel)]);
    await new Promise(r => setTimeout(r, 400));
    navigation.push({viewport: [w, h], method, tab: '1', url: page.url()});
    await page.close();
  }
}
// Teclado: Enter sobre el CTA principal con foco visible; menú móvil se cierra con Escape y devuelve el foco.
let page = await open(390, 844, '/');
await page.focus('.rv-home-hero .rv-hero-primary');
const focus = await page.evaluate(() => { const a = document.activeElement, s = getComputedStyle(a); return {href: a.getAttribute('href'), outline: `${s.outlineColor} ${s.outlineStyle} ${s.outlineWidth}`, outlineOffset: s.outlineOffset, tag: a.tagName, text: a.textContent.trim()}; });
await Promise.all([page.waitForNavigation({waitUntil: 'networkidle0'}).catch(() => {}), page.keyboard.press('Enter')]);
navigation.push({viewport: [390, 844], method: 'keyboard_enter', tab: '1', url: page.url(), focus});
await page.close();
page = await open(390, 844, '/');
await page.click('#menu-toggle-btn');
await new Promise(r => setTimeout(r, 400));
const menu = await page.evaluate(() => ({bodyOverflow: document.body.style.overflow, expanded: document.getElementById('menu-toggle-btn').getAttribute('aria-expanded'), dialogs: [...document.querySelectorAll('[role="dialog"]')].map(d => { const r = d.getBoundingClientRect(); return {x: r.x, y: r.y, width: r.width, height: r.height}; })}));
await page.keyboard.press('Escape');
await new Promise(r => setTimeout(r, 400));
const closed = await page.evaluate(() => ({bodyOverflow: document.body.style.overflow, expanded: document.getElementById('menu-toggle-btn').getAttribute('aria-expanded'), focused: document.activeElement?.getAttribute('aria-label')}));
await page.close();

// Matriz: 8 rutas × 7 anchos.
const matrix = [];
for (const [w, h] of matrixViewports) for (const route of routes) {
  const p = await open(w, h, route);
  matrix.push({route, viewport: [w, h], ...(await p.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
    const interactive = [...document.querySelectorAll('a[href],button,input,select,textarea,[role="button"]')].filter(vis);
    const label = e => (e.getAttribute('aria-label') || e.textContent || e.id || e.tagName).trim().slice(0, 60);
    return {
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelectorAll('h1').length,
      badTargets: interactive.filter(e => { const r = e.getBoundingClientRect(); return !e.closest('p,li') && (r.width < 24 || r.height < 24); }).map(label),
      brokenVisibleImages: [...document.images].filter(i => vis(i) && i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src),
      clippedInteractive: interactive.filter(e => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1; }).map(label),
      stylesheets: [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.getAttribute('href')),
    };
  }))});
  await p.close();
}
await browser.close(); stop();

const commit = execSync('git rev-parse --short HEAD').toString().trim();
const evidence = {
  version: 'v77', capturedAt: new Date().toISOString(), source: `Chrome (puppeteer) sobre dist/ local, commit base ${commit} + working tree`,
  approval: {status: 'pending', by: null, at: null, note: 'El Hero (RAU-004, b9e5c73) no pasó por revisión visual. Revisa docs/v77-evidencias/screens y registra con --approve "Nombre".'},
  after, navigation, keyboard: {focus, menu, closed}, geometryToleranceCssPx: 1,
  sourceHashes: Object.fromEntries(sourceFiles.map(f => [f, sha(f)])),
};
fs.writeFileSync(OUT + '/cta-validation.json', JSON.stringify(evidence, null, 2) + '\n');
fs.writeFileSync(OUT + '/mobile-matrix.json', JSON.stringify(matrix, null, 2) + '\n');
const bad = matrix.filter(r => r.scrollWidth > r.viewport[0] + 1 || r.h1 !== 1 || r.badTargets.length || r.brokenVisibleImages.length || r.clippedInteractive.length);
console.log(`Evidencia escrita en ${OUT}. Filas de matriz: ${matrix.length}; con hallazgos: ${bad.length}`);
bad.slice(0, 12).forEach(r => console.log('  ', r.route, r.viewport.join('x'), JSON.stringify({sw: r.scrollWidth, h1: r.h1, bt: r.badTargets.slice(0, 3), bi: r.brokenVisibleImages.length, ci: r.clippedInteractive.slice(0, 3)})));
