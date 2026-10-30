import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import {spawn} from 'node:child_process';
import os from 'node:os';
import nodePath from 'node:path';
import {publicRoutes} from '../scripts/public-routes.js';
import {routeSeo} from '../src/seo/routeSeo.js';
const real=JSON.parse(fs.readFileSync(new URL('./fixtures/wp-post.json',import.meta.url),'utf8'))[0];
const malicious={...real,id:987,slug:'cms-seguridad',title:{rendered:'Prueba &amp; seguridad'},excerpt:{rendered:'<p>Extracto distinto.</p>'},content:{rendered:'<h1>Prueba &amp; seguridad</h1><p>Contenido seguro de prueba.</p><script>window.CMS_INJECTION=true</script><img src="javascript:alert(1)" onerror="alert(2)"><a href="javascript:evil()">Enlace</a>'}};
const artifacts=process.env.SEO_QA_DIR || fs.mkdtempSync(nodePath.join(os.tmpdir(),'rauvia-seo-qa-'));
fs.mkdirSync(artifacts,{recursive:true});
let calls=0;
const fixture=http.createServer((req,res)=>{const slug=new URL(req.url,'http://fixture').searchParams.get('slug');calls++;res.setHeader('content-type','application/json');if(slug==='wp-indisponible'){res.writeHead(503);return res.end('[]');}res.end(JSON.stringify(slug===real.slug?[real]:slug===malicious.slug?[malicious]:[]));});
await new Promise(r=>fixture.listen(0,'127.0.0.1',r));
const port=3121,base=`http://127.0.0.1:${port}`;
const log=fs.openSync(nodePath.join(artifacts,'fixture-server.log'),'w');
const child=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production',PORT:String(port),VITE_WORDPRESS_API_URL:`http://127.0.0.1:${fixture.address().port}/wp-json/wp/v2`,SITEMAP_REFRESH_ON_START:'false'},stdio:['ignore',log,log]});
try {
 let ready=false;for(let i=0;i<100;i++){try{await fetch(base+'/');ready=true;break;}catch{await new Promise(r=>setTimeout(r,100));}}
 assert.ok(ready,'production server started');
 const rows=[];
 for(const route of publicRoutes) {
  await test(`initial HTML: ${route}`,async()=>{
   const path=route==='/'?'/':route+'/';const res=await fetch(base+path,{redirect:'manual'});const html=await res.text();const head=html.match(/<head>([\s\S]*?)<\/head>/i)?.[1]||'';
   assert.equal(res.status,200);assert.equal((head.match(/<title>/g)||[]).length,1);assert.equal((head.match(/rel="canonical"/g)||[]).length,1);
   assert.ok(head.includes(`href="${routeSeo[route].canonical}"`));assert.match(head,/name="description"/);assert.match(head,/property="og:url"/);assert.match(head,/name="twitter:card"/);
   assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.match(html,/<main>[\s\S]+<\/main>/);assert.ok(html.indexOf('<main>')<html.lastIndexOf('<footer'));
   assert.doesNotMatch(html,/@vite\/client|@react-refresh|Asistente RAUVIA/);
   const schemas=[...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
   assert.ok(schemas.every(x=>x['@context']==='https://schema.org'));assert.equal(schemas.filter(x=>x['@type']==='Organization').length,1);assert.equal(schemas.filter(x=>x['@type']==='WebSite').length,1);
   rows.push({path,status:res.status,title:head.match(/<title>(.*?)<\/title>/)?.[1],canonical:routeSeo[route].canonical,h1:1,schemas:schemas.length});
  });
 }
 await test('article uses WordPress data in head and main; repeated HTML and proxy share cache',async()=>{
  const before=calls,path='/recursos/'+real.slug+'/';const res=await fetch(base+path);const html=await res.text();assert.equal(res.status,200);
  assert.match(html,/<title>La brecha entre capacidad real y percepción de mercado \| RAUVIA<\/title>/);assert.ok(html.includes(`href="https://rauvia.com.mx${path}"`));assert.match(html,/property="og:type" content="article"/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.match(html,/<main><article/);assert.match(html,/BlogPosting/);assert.doesNotMatch(html,/<title>RAUVIA Consulting \| Consultoría/);
  await fetch(base+path);await fetch(base+'/api/wp/posts?slug='+real.slug);assert.equal(calls-before,1);
  fs.writeFileSync(nodePath.join(artifacts,'article.html'),html);
 });
 await test('missing article HEAD and GET are real 404 with specific HTML',async()=>{
  const path='/recursos/post-que-no-existe/';assert.equal((await fetch(base+path,{method:'HEAD'})).status,404);const res=await fetch(base+path);const html=await res.text();assert.equal(res.status,404);assert.match(html,/Artículo no encontrado/);assert.doesNotMatch(html,/rel="canonical"|property="og:url"|"@type":"(?:BlogPosting|Article)"/);assert.match(html,/noindex, nofollow/);assert.doesNotMatch(html,/<main><article/);
 });
 await test('upstream outage is 503, including API; never Home or false 404',async()=>{
  const res=await fetch(base+'/recursos/wp-indisponible/');assert.equal(res.status,503);assert.equal(res.headers.get('retry-after'),'60');assert.equal(res.headers.get('cache-control'),'no-store');const html=await res.text();assert.match(html,/No pudimos cargar el artículo/);assert.match(html,/name="robots" content="noindex, nofollow"/);assert.doesNotMatch(html,/rel="canonical"|property="og:url"|"@type":"(?:BlogPosting|Article)"/);assert.equal((await fetch(base+'/api/wp/posts?slug=wp-indisponible')).status,503);
 });
 await test('missing case shares no-canonical error policy and global entities only',async()=>{
  const res=await fetch(base+'/casos/caso-que-no-existe/');const html=await res.text();assert.equal(res.status,404);
  assert.match(html,/name="robots" content="noindex, nofollow"/);assert.doesNotMatch(html,/rel="canonical"|property="og:url"/);
  const types=[...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])['@type']);
  assert.deepEqual(types,['Organization','WebSite']);
 });
 await test('sitemap still responds and preserves valid article/case/public URLs',async()=>{
  const res=await fetch(base+'/sitemap.xml');assert.equal(res.status,200);const xml=await res.text();assert.match(xml,/<urlset/);
  for(const path of ['/','/soluciones/','/casos/infraestructura-temporal-b2b/','/recursos/brecha-capacidad-real-percepcion-mercado/'])assert.ok(xml.includes('https://rauvia.com.mx'+path),path);
 });
 await test('CMS script and dangerous attributes cannot execute in initial HTML; bootstrap is escaped',async()=>{
  const html=await(await fetch(base+'/recursos/cms-seguridad/')).text();const main=html.match(/<main>([\s\S]*?)<\/main>/)[1];assert.match(main,/Contenido seguro de prueba/);assert.doesNotMatch(main,/<script|onerror|javascript:/);assert.equal((main.match(/<h1\b/g)||[]).length,1);
  const data=html.match(/<script id="rauvia-initial-content" type="application\/json">([\s\S]*?)<\/script>/)[1];assert.doesNotMatch(data,/<\/script/);assert.equal(JSON.parse(data).post.slug,'cms-seguridad');
 });
 await test('trailing slash preserves query on articles and case studies; missing cases do not fall back to Home',async()=>{
  for(const path of ['/recursos/'+real.slug,'/casos/infraestructura-temporal-b2b']){const res=await fetch(base+path+'?utm_source=qa',{redirect:'manual'});assert.equal(res.status,301);assert.equal(res.headers.get('location'),'https://rauvia.com.mx'+path+'/?utm_source=qa');}
  assert.equal((await fetch(base+'/casos/inexistente/')).status,404);assert.equal((await fetch(base+'/shell.html')).status,404);
 });
 await test('production does not expose Vite dev modules',async()=>{for(const path of ['/@vite/client','/@react-refresh'])assert.equal((await fetch(base+path)).status,404);});
 await test('Ruta 90 canonical slash, recovered historic intent and sitemap',async()=>{
  const slash=await fetch(base+'/ruta-90?utm_source=qa',{redirect:'manual'});assert.equal(slash.status,301);assert.equal(slash.headers.get('location'),'https://rauvia.com.mx/ruta-90/?utm_source=qa');
  for(const path of ['/componentes-ruta-90-dias-pymes','/componentes-ruta-90-dias-pymes/']){const response=await fetch(base+path,{redirect:'manual'});assert.equal(response.status,301);assert.equal(response.headers.get('location'),'https://rauvia.com.mx/ruta-90/#componentes');}
  const sitemap=await fetch(base+'/sitemap.xml');assert.equal(sitemap.status,200);assert.ok((await sitemap.text()).includes('https://rauvia.com.mx/ruta-90/'));
 });
 fs.writeFileSync(nodePath.join(artifacts,'routes.json'),JSON.stringify(rows,null,2));
} finally {
 child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));fixture.closeAllConnections();await new Promise(r=>fixture.close(r));fs.closeSync(log);
}
