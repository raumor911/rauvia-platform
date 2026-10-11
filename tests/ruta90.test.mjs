import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {ruta90,ruta90Seo} from '../src/data/ruta90.js';
import {recordOnce} from '../src/lib/ruta90Session.js';
const html=fs.readFileSync('dist/ruta-90/index.html','utf8');
const start=html.indexOf('<article class="ruta90"');
const article=html.slice(start,html.indexOf('</article>',start)+10);
test('Ruta 90: initial HTML supplies the complete ten-chapter narrative',()=>{
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.equal((article.match(/<figure\b/g)||[]).length,10);
 let last=-1;
 for(const chapter of ruta90.chapters){
  const index=article.indexOf(`id="${chapter.id}"`);assert.ok(index>last,`${chapter.id} occurs in order`);last=index;
  assert.ok(article.includes(chapter.title));assert.ok(article.includes(chapter.alt));assert.ok(article.includes(chapter.caption));assert.ok(article.includes(chapter.asset+'.webp'));
 }
 assert.equal((article.match(/<figcaption>/g)||[]).length,10);
 assert.equal((article.match(/loading="lazy"/g)||[]).length,9);
 assert.equal((article.match(/fetchPriority="high"|fetchpriority="high"/g)||[]).length,1);
 for(const phrase of [ruta90.canonicalDefinition,'Resultado esperado','Línea base','Entregables','Responsables','Cadencia','Indicadores','Evidencia','Diseñar','Activar','Estabilizar','Consolidar','Plan anual','autogestionada','acompañada','Entrada','Proceso','Salida','Resultado','Output ≠ Outcome','Agendar una conversación']) assert.ok(article.includes(phrase),phrase);
 assert.equal(ruta90.components.length,7);assert.equal(ruta90.phases.length,4);
 assert.match(ruta90.canonicalDefinition,/método de ejecución adoptado por RAUVIA/);
 assert.doesNotMatch(article,/marco-metodologico|Cómo citar Ruta 90|Glosario de consulta|Referencias y antecedentes conceptuales|desarrollado por RAUVIA|Autor: Raúl Morales/);
 assert.doesNotMatch(article,/\/recursos\/como-estructurar-ruta|ScholarlyArticle|FAQPage|HowTo/);
});
test('Ruta 90 metadata and entities match the visible document',()=>{
 assert.ok(html.includes(`<title>${ruta90Seo.title}</title>`));assert.ok(html.includes('href="'+ruta90.canonical+'"'));assert.match(html,/name="robots" content="index, follow"/);
 const schemas=[...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]));
 for(const type of ['WebPage','Service','BreadcrumbList','Organization','WebSite']) assert.equal(schemas.filter(x=>x['@type']===type).length,1,type);
 assert.equal(schemas.filter(x=>['Person','DefinedTermSet'].includes(x['@type'])).length,0);
 for(const schema of schemas.filter(x=>['WebPage','Service'].includes(x['@type']))) {assert.equal(schema.author,undefined);assert.equal(schema.creator,undefined);}
 assert.equal(schemas.find(x=>x['@type']==='Service').description,ruta90.canonicalDefinition);
});
test('Ruta 90 analytics: replay, remount and new analytics sessions',()=>{
 const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};let sent=0;
 for(let i=0;i<20;i++) recordOnce(storage,'session-1','ruta90_chapter_view','componentes',()=>sent++);
 assert.equal(sent,1);recordOnce(storage,'session-1','ruta90_chapter_view','ciclo',()=>sent++);assert.equal(sent,2);
 recordOnce(storage,'session-2','ruta90_chapter_view','componentes',()=>sent++);assert.equal(sent,3);
 for(let i=0;i<3;i++) recordOnce(storage,'session-1','ruta90_view',undefined,()=>sent++);assert.equal(sent,4);
 const blocked={getItem(){throw Error('blocked')}};for(let i=0;i<3;i++)recordOnce(blocked,'blocked-session','ruta90_view',undefined,()=>sent++);assert.equal(sent,5);
});
test('Ruta 90 optimized assets have explicit dimensions and preserved source hashes',()=>{
 for(const chapter of ruta90.chapters){for(const suffix of ['','-small']){const bytes=fs.readFileSync('public/images/ruta-90/'+chapter.asset+suffix+'.webp');assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');}assert.ok(chapter.width>=1600);assert.ok(chapter.height>0);}
 assert.ok(fs.readFileSync('data/sitemap-cache.xml','utf8').includes(ruta90.canonical));
});
