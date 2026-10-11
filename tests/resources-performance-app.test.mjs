import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {performance} from 'node:perf_hooks';
import {productionApp} from './helpers/production-app.mjs';
const published=JSON.parse(fs.readFileSync('tests/fixtures/wp-published-current.json','utf8'));
const article=published[0], token='performance-hook-token-'.repeat(3);
const json=x=>new Response(JSON.stringify(x),{headers:{'x-wp-totalpages':'1'}});
function gate(){let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};}
function fixture(t) {
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-resource-performance-'));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));fs.mkdirSync(path.join(dir,'dist'));
 // An explicit minimal integration template, never included as production output.
 fs.writeFileSync(path.join(dir,'dist/shell.html'),'<!doctype html><html lang="es"><head></head><body><div id="root"></div></body></html>');
 return {TEST_APP_ROOT:dir,NODE_ENV:'production',INDEXNOW_ENABLED:'false',INDEXNOW_WEBHOOK_TOKEN:token,
  WORDPRESS_CACHE_PATH:path.join(dir,'wp.json'),SITEMAP_CACHE_PATH:path.join(dir,'sitemap.xml')};
}
test('compiled resource HTML stays below 3 seconds with a slow cold upstream; refresh completes without restart',{timeout:6000},async t=>{
 const slow=gate();let listCalls=0;
 const app=await productionApp(fixture(t),async(url)=>{
  const u=new URL(url);if(u.searchParams.has('_fields'))return json(published);
  listCalls++;return slow.promise;
 });
 const start=performance.now();const response=await app.request('/recursos/');const coldMs=performance.now()-start;
 assert(coldMs<1800,`cold response ${coldMs}ms`);assert.equal(response.status,200);assert.match(response.headers.warning,/Stale/);assert(response.headers['server-timing']);assert.match(response.text,/<h1[^>]*>Recursos<\/h1>/);
 slow.resolve(json(published));await new Promise(r=>setTimeout(r,25));
 const refreshed=await app.request('/recursos/');assert(refreshed.text.includes(article.title.rendered));assert.equal(refreshed.headers.warning,undefined);assert.equal(listCalls,1);
 console.log(JSON.stringify({scenario:'cold-upstream-pending',localServerResponseMs:Math.round(coldMs),productionBrowserMeasurement:false}));
});
test('compiled warm and invalidated views are fast; full article stays intact and webhook forces fresh content',{timeout:6000},async t=>{
 let current=published,pending=false,calls=0;const slow=gate();
 const app=await productionApp(fixture(t),async(url)=>{
  const u=new URL(url);if(u.searchParams.has('_fields'))return json(current);
  if(u.searchParams.has('slug'))return json(current.filter(p=>p.slug===u.searchParams.get('slug')));
  calls++;return pending?slow.promise:json(current);
 });
 const initial=await app.request('/recursos/');assert(initial.text.includes(article.title.rendered));
 const bootstrap=JSON.parse(initial.text.match(/id="rauvia-initial-content" type="application\/json">([^<]+)</)[1]);
 assert(bootstrap.posts.every(p=>p.content.rendered===''));assert(initial.text.includes('href="https://rauvia.com.mx/recursos/"'));
 const durations=[];
 for(let i=0;i<30;i++){const start=performance.now();assert.equal((await app.request('/recursos/')).status,200);durations.push(performance.now()-start);}
 durations.sort((a,b)=>a-b);const warmP95=durations[Math.floor(durations.length*.95)];assert(warmP95<250,`warm p95 ${warmP95}`);
 pending=true;current=published.map(p=>p.id===article.id?{...p,title:{rendered:'Edición V78'}}:p);
 const event=app.request('/internal/indexnow',{method:'POST',headers:{authorization:'Bearer '+token},body:{event:'updated',urlList:['https://rauvia.com.mx/recursos/'+article.slug+'/']}});
 await new Promise(r=>setImmediate(r));const start=performance.now();const stale=await app.request('/recursos/');const staleMs=performance.now()-start;
 assert(staleMs<250);assert(stale.text.includes(article.title.rendered));assert.match(stale.headers.warning,/Stale/);
 pending=false;slow.resolve(json(current));assert.equal((await event).status,202);
 const fresh=await app.request('/recursos/');assert(fresh.text.includes('Edición V78'));assert.equal(fresh.headers.warning,undefined);
 const api=await app.request('/api/wp/posts?view=resources');assert(api.json().every(p=>p.content.rendered===''));
 const full=await app.request('/api/wp/posts');assert(full.json()[0].content.rendered.length>100);
 const detail=await app.request('/recursos/'+article.slug+'/');assert.equal(detail.status,200);assert(detail.text.includes('BlogPosting'));assert(detail.text.includes('7 de octubre de 2026'));assert(detail.text.includes('Enviar una cotización'));
 assert.equal((await app.request('/soluciones')).status,301);assert.equal((await app.request('/1109c92c84549878ea17f221eaba40bc.txt')).text,'1109c92c84549878ea17f221eaba40bc');
 const restart=await productionApp(fixture(t),async()=>json(published));assert.equal((await restart.request('/recursos/')).status,200);
 console.log(JSON.stringify({scenario:'warm-and-invalidated',warmP95Ms:Number(warmP95.toFixed(2)),staleResponseMs:Number(staleMs.toFixed(2)),bootstrapBytes:Buffer.byteLength(JSON.stringify(bootstrap)),originalPostsBytes:Buffer.byteLength(JSON.stringify(published)),calls,productionBrowserMeasurement:false}));
});
