import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {gzipSync} from 'node:zlib';import {createHash} from 'node:crypto';
const baseline=JSON.parse(fs.readFileSync('tests/fixtures/v72-route-baseline.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('dist/.vite/manifest.json','utf8'));
const pageKeys=['HomePage','SolucionesPage','AethryonPage','Ruta90Page','FrenteComercialPage','NosotrosPage','RecursosPage','CasosIndexPage'];
const text=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
// Strip only the two explicitly authorized V73 changes before the frozen V72 hash check.
function normalize(h){return h.replace(',"founder":{"@id":"https://rauvia.com.mx/#raul-morales"}', '').replace(/<p\b[^>]*>Experiencia digital desarrollada por[\s\S]*?<\/p>/g,'').replace(/<link\b(?=[^>]*rel="(?:stylesheet|modulepreload)")[^>]*>/g,'').replace(/\/assets\/[^"<>]+/g,'/assets/BUILD-ASSET').replace(/_R_[A-Za-z0-9]+_/g,'_R_ID_').replace(/\s+/g,' ').trim();}
function closure(key){const seen=new Set();function walk(k){if(seen.has(k))return;seen.add(k);for(const child of manifest[k].imports||[])walk(child);}walk('index.html');walk(key);return [...seen].map(k=>manifest[k].file);}
test('All eight entries retain their unique H1 and complete static route content',()=>{
 for(const [route,old] of Object.entries(baseline)){const h=fs.readFileSync('dist/'+(route==='/'?'':route.slice(1))+'index.html','utf8');const headings=[...h.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/g)].map(m=>text(m[1]));assert.deepEqual(headings,old.h1.map(text),route);assert.ok(h.includes('rv-main-site'),route);assert.match(h,/viewport-fit=cover/);assert.equal((h.match(/name="viewport"/g)||[]).length,1);}
});
test('Initial route transfer is reduced without pulling in exclusive unrelated routes',()=>{
 for(const page of pageKeys){const files=closure('src/pages/'+page+'.tsx');assert.ok(files.reduce((n,f)=>n+gzipSync(fs.readFileSync('dist/'+f)).length,0)<280000,page);}
 const r90=closure('src/pages/Ruta90Page.tsx');for(const page of ['SolucionesPage','AethryonPage','FrenteComercialPage'])assert.ok(!r90.includes(manifest['src/pages/'+page+'.tsx'].file),page);
});
test('Every route preload and stylesheet exists, and head links are not duplicated',()=>{
 for(const route of Object.keys(baseline)){const h=fs.readFileSync('dist/'+(route==='/'?'':route.slice(1))+'index.html','utf8');const links=[...h.matchAll(/<link\b[^>]*(?:rel="(?:modulepreload|stylesheet)")[^>]*href="([^"]+)"[^>]*>/g)].map(m=>m[1]);assert.equal(links.length,new Set(links).size,route);for(const href of links)assert.ok(fs.existsSync('dist/'+href.slice(1)),href);}
});
test('Excluded landing, legal and individual case HTML is preserved apart from build hints and generated IDs',()=>{
 const excluded=JSON.parse(fs.readFileSync('tests/fixtures/v72-excluded-html.json','utf8'));for(const [file,hash] of Object.entries(excluded)){const h=fs.readFileSync('dist'+file,'utf8');assert.equal(createHash('sha256').update(normalize(h)).digest('hex'),hash,file);assert.ok(!h.includes('rv-main-site'),file);}
});
test('Soluciones comparison and Ruta 90 chapters keep their semantic relationships',()=>{
 const s=fs.readFileSync('dist/soluciones/index.html','utf8');assert.match(s,/<table role="table" class="rv-solutions-table/);assert.match(s,/data-label="Si hoy te ocurre esto…"/);assert.match(s,/data-label="Punto de entrada probable"/);assert.match(s,/aria-controls="product-frente-comercial-esencial"/);
 const r=fs.readFileSync('dist/ruta-90/index.html','utf8');assert.match(r,/id="componentes"/);assert.match(r,/id="r90-heading-componentes"/);assert.equal((r.match(/<figure/g)||[]).length,10);assert.match(r,/role="region" aria-labelledby="r90-plan-caption" tabindex="0"/);assert.match(r,/Método adoptado por RAUVIA/);
});
