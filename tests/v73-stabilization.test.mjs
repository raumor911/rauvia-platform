import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
const removed=["/copywriting-textos-vender-facebook-pymes/", "/marketing-bajo-presupuesto-5-estrategias/", "/despega-tu-marketing/", "/tag/facebook-ads/", "/tag/consultoria-para-pymes/feed/", "/category/startups-y-emprendimiento/feed/"];
const replaced=[["/errores-planeacion-estrategica-90-dias/", "/ruta-90/"], ["/categoria-producto/estrategia-y-planificacion/", "/aethryon/"], ["/privacidad/", "/aviso-de-privacidad/"], ["/brand/rauvia-consulting/", "/nosotros/"], ["/categoria-producto/servicios-de-consultoria/", "/soluciones/"], ["/tag/errores-de-negocio/", "/recursos/"], ["/etiqueta-producto/consultoria-estrategica/", "/soluciones/"], ["/tag/transformacion-digital/", "/recursos/"], ["/tag/innovacion/", "/recursos/"], ["/tag/sistemas-de-negocio/", "/soluciones/"], ["/tag/consultoria-cdmx/", "/soluciones/"], ["/tag/gestion-de-equipos/", "/recursos/la-ilusion-del-crecimiento-sin-capacidad/"], ["/clients/", "/casos/"], ["/ruta-90-dias-rauvia-para-quien-es/", "/ruta-90/"], ["/category/automatizacion-empresarial/", "/soluciones/"], ["/tag/crecimiento-de-negocio/", "/recursos/la-ilusion-del-crecimiento-sin-capacidad/"], ["/guia-definitiva-como-usar-el-seo-basico-para-superar-a-tu-competencia-en-marketplaces/", "/recursos/"], ["/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla/", "/recursos/brecha-capacidad-real-percepcion-mercado/"], ["/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla/feed/", "/recursos/brecha-capacidad-real-percepcion-mercado/"]];
const live=['/','/soluciones/','/aethryon/','/ruta-90/','/frente-comercial/','/nosotros/','/recursos/','/casos/'];
const fixturePosts=['wp-post.json','wp-growth-post.json'].flatMap(n=>JSON.parse(fs.readFileSync(new URL('./fixtures/'+n,import.meta.url),'utf8')));
const fixture=http.createServer((req,res)=>{const slug=new URL(req.url,'http://fixture').searchParams.get('slug');res.setHeader('content-type','application/json');res.end(JSON.stringify(slug?fixturePosts.filter(x=>x.slug===slug):fixturePosts));});
await new Promise(r=>fixture.listen(0,'127.0.0.1',r));
const port=3421,base=`http://127.0.0.1:${port}`;
const log=fs.openSync(path.join(os.tmpdir(),'rauvia-v73-tests.log'),'w');
const child=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production',PORT:String(port),CRAWLER_LOGGING_ENABLED:'false',VITE_WORDPRESS_API_URL:`http://127.0.0.1:${fixture.address().port}/wp-json/wp/v2`,SITEMAP_REFRESH_ON_START:'false'},stdio:['ignore',log,log]});
try{
 let ready=false;for(let i=0;i<100;i++){try{await fetch(base+'/');ready=true;break;}catch{await new Promise(r=>setTimeout(r,100));}}assert.ok(ready,'Production build started');
 const direct=async(p,method='GET',headers)=>headers?new Promise((resolve,reject)=>{const r=http.request(base+p,{method,headers},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve(new Response(method==='HEAD'?null:Buffer.concat(chunks),{status:res.statusCode,headers:res.headers})));});r.on('error',reject);r.end();}):fetch(base+p,{method,redirect:'manual'});
 for(const p of live)await test(`LIVE: ${p} → 200`,async()=>{const r=await direct(p);assert.equal(r.status,200);assert.equal(r.headers.get('location'),null);});
 for(const p of removed)await test(`REMOVED: ${p} → 410, no redirect or false canonical`,async()=>{
  for(const path of [p,p.slice(0,-1)])for(const method of ['GET','HEAD']){
   const r=await direct(path,method);assert.equal(r.status,410);assert.equal(r.headers.get('location'),null);assert.equal(r.headers.get('cache-control'),'public, max-age=300');assert.match(r.headers.get('x-robots-tag'),/noindex/);
   const body=await r.text();if(method==='HEAD')assert.equal(body,'');else{assert.match(body,/Este contenido ya no está disponible/);assert.match(body,/<meta name="robots" content="noindex,follow">/);assert.doesNotMatch(body,/rel="canonical"|application\/ld\+json|<script/i);}
  }
  assert.equal((await direct(p,'GET',{host:'www.rauvia.com.mx'})).status,410);
 });
 for(const [p,target] of replaced)await test(`REPLACED: ${p} → one 301 → ${target} 200`,async()=>{
  for(const source of [p,p.slice(0,-1)]){
   const r=await direct(source);assert.equal(r.status,301);assert.equal(r.headers.get('location'),target);
   const end=await direct(target);assert.equal(end.status,200);assert.equal(end.headers.get('location'),null);
  }
  const head=await direct(p+'?utm_source=v73','HEAD');assert.equal(head.status,301);assert.equal(head.headers.get('location'),target+'?utm_source=v73');
  const host=await direct(p,'GET',{host:'www.rauvia.com.mx'});assert.equal(host.status,301);assert.equal(host.headers.get('location'),'https://rauvia.com.mx'+target);
 });
 for(const p of ['/v73-unknown/','/ruta-90/inventada-v73/','/diagnostico-inventado-v73/','/growth-partner/inventado-v73/','/blueprint-inventado-v73/','/frente-comercial-esencial/inventado-v73/','/servicios/inventado-v73/','/blog/inventado-v73/'])await test(`UNKNOWN: ${p} → 404`,async()=>{const r=await direct(p);assert.equal(r.status,404);assert.equal(r.headers.get('location'),null);});
 await test('Home CTA is a crawlable internal link and secondary CTA is intact',async()=>{
  const html=await(await direct('/')).text();const a=[...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];const primary=a.find(x=>x[2].includes('CONOCER NUESTROS PRODUCTOS')),secondary=a.find(x=>x[2].includes('CÓMO TRABAJAMOS'));
  assert.ok(primary);assert.equal(primary[2].replace(/<[^>]*>/g,'').trim(),'CONOCER NUESTROS PRODUCTOS');assert.match(primary[1],/href="\/soluciones\/"/);assert.doesNotMatch(primary[1],/wa\.me|whatsapp|target="_blank"/i);assert.match(primary[2],/lucide-arrow-right/);
  assert.match(secondary[1],/href="\/aethryon"/);assert.match(secondary[2],/lucide-circle-play/);
  const r=await direct('/soluciones/');assert.equal(r.status,200);assert.equal(r.headers.get('location'),null);
 });
 await test('Footer signature is secondary, only brand is linked, no technical navigation',async()=>{
  const html=await(await direct('/')).text(),footer=html.match(/<footer[\s\S]*?<\/footer>/)[0];assert.match(footer,/Experiencia digital desarrollada por/);assert.match(footer,/<a href="https:\/\/rauvia.com.mx\/"[^>]*>RAUVIA Consulting<\/a>/);assert.doesNotMatch(footer,/GEO &amp; LLM Dossier|href="\/(?:llms.txt|robots.txt|sitemap.xml)"/);
 });
 await test('Gone routes absent from sitemap; telemetry uses existing finished response status',async()=>{
  const map=await(await direct('/sitemap.xml')).text();for(const p of removed)assert.ok(!map.includes('https://rauvia.com.mx'+p));
  const server=fs.readFileSync('server.ts','utf8');assert.ok(server.indexOf('app.use(aiCrawlerMiddleware)')<server.indexOf('app.use(legacyRouteMiddleware)'));
  const crawler=fs.readFileSync('server/analytics/crawlerMiddleware.ts','utf8');assert.match(crawler,/res.on\('finish'/);assert.match(crawler,/statusCode = res.statusCode/);
 });
}finally{child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));fixture.closeAllConnections();await new Promise(r=>fixture.close(r));fs.closeSync(log);}
