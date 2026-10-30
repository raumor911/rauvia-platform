import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync('dist/'+p+'/index.html','utf8');
test('Contextual Ruta 90 links exist in initial HTML without mandatory AETHRYON transition',()=>{
 const solutions=read('soluciones');const links=[...solutions.matchAll(/<a\b[^>]*href="\/ruta-90\/"[^>]*>([\s\S]*?)<\/a>/g)];assert.ok(links.length>=2 && links.length<=3);assert.equal(links.filter(x=>x[1]==='Ruta 90').length,2);
 const aethryon=read('aethryon');assert.match(aethryon,/>Conocer Ruta 90 →<\/a>/);assert.ok(aethryon.includes('No todas las prioridades identificadas por AETHRYON requieren una Ruta 90'));assert.ok(aethryon.includes('Cuando una prioridad requiere un ciclo estructurado de ejecución'));assert.ok(aethryon.includes('Activo, sistema o estructura'));
 const ruta=read('ruta-90');assert.equal((ruta.match(/id="componentes"/g)||[]).length,1);assert.equal((ruta.match(/<figure\b/g)||[]).length,10);
 const map=fs.readFileSync('data/sitemap-cache.xml','utf8');assert.equal(map.split('https://rauvia.com.mx/ruta-90/').length-1,1);assert.ok(!map.includes('componentes-ruta-90-dias-pymes'));
});
test('Historical aliases redirect directly to canonical fragment; destination is 200', {skip:!process.env.TEST_BASE_URL},async()=>{
 for(const p of ['/componentes-ruta-90-dias-pymes','/componentes-ruta-90-dias-pymes/']){const r=await fetch(process.env.TEST_BASE_URL+p,{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://rauvia.com.mx/ruta-90/#componentes');const target=new URL(r.headers.get('location'));const end=await fetch(process.env.TEST_BASE_URL+target.pathname,{redirect:'manual'});assert.equal(end.status,200);assert.equal(end.headers.get('location'),null);}
});
test('Crawler middleware observes historical redirect before response',()=>{
 const server=fs.readFileSync('server.ts','utf8');assert.ok(server.indexOf('app.use(aiCrawlerMiddleware)')<server.indexOf('app.use(createCanonicalRedirectMiddleware(publicRoutes))'));
});
