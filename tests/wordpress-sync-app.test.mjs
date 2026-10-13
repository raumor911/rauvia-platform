import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {productionApp} from './helpers/production-app.mjs';
const published=JSON.parse(fs.readFileSync('tests/fixtures/wp-published-current.json','utf8'));
const article=published.find(p=>p.id===49),origin='https://rauvia.com.mx';
test('compiled Express: dynamic resource HTML, webhook publication/edit/deletion, outage recovery, SEO and sitemap',{timeout:15000},async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-wordpress-sync-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));fs.symlinkSync(path.resolve('dist'),path.join(dir,'dist'),'dir');
 const token='test-token-'.repeat(4);let current=published.slice(1),down=false;const notifications=[];
 const app=await productionApp({TEST_APP_ROOT:dir,NODE_ENV:'production',INDEXNOW_ENABLED:'true',INDEXNOW_WEBHOOK_TOKEN:token,INDEXNOW_STATE_PATH:path.join(dir,'state.json'),SITEMAP_CACHE_PATH:path.join(dir,'sitemap.xml')},async(url,init)=>{
  if(url.includes('indexnow.org')){notifications.push(JSON.parse(init.body));return new Response('',{status:202});}
  if(down)return new Response('',{status:503});
  const slug=new URL(url).searchParams.get('slug');return new Response(JSON.stringify(slug?current.filter(p=>p.slug===slug):current),{headers:{'x-wp-totalpages':'1'}});
 });
 const hook=(event='updated')=>app.request('/internal/indexnow',{method:'POST',headers:{authorization:'Bearer '+token},body:{event,urlList:[origin+'/recursos/'+article.slug+'/']}});
 const initial=await app.request('/recursos/');assert.equal(initial.status,200);assert.equal(initial.headers['cache-control'],'no-store');assert(!initial.text.includes(article.title.rendered));
 assert.equal((await hook('published')).status,503);
 current=published;assert.equal((await hook('published')).status,202);
 const after=await app.request('/recursos/');assert.equal(after.status,200);assert(after.text.includes(article.title.rendered));assert(after.text.indexOf(article.title.rendered)<after.text.indexOf(published[1].title.rendered));assert(after.text.includes('7 de octubre de 2026'));assert(after.text.includes('/recursos/'+article.slug+'/'));assert.match(after.text,/rel="canonical" href="https:\/\/rauvia.com.mx\/recursos\/"/);assert.match(after.text,/<title>Recursos y Blog \| RAUVIA<\/title>/);assert.equal((after.text.match(/<h1\b/g)||[]).length,1);
 const page=await app.request('/recursos/'+article.slug+'/');assert.equal(page.status,200);assert(page.text.includes('2026-10-07T00:20:53'));assert(page.text.includes('BlogPosting'));assert(page.text.includes('href="'+origin+'/recursos/'+article.slug+'/"'));
 current=published.map(p=>p.id===49?{...p,title:{rendered:'Cotización: contenido actualizado'}}:p);assert.equal((await hook()).status,202);assert((await app.request('/recursos/')).text.includes('Cotización: contenido actualizado'));
 for(let i=0;i<50;i++){if((await app.request('/sitemap.xml')).text.includes(article.slug))break;await new Promise(r=>setTimeout(r,10));}
 const sitemap=await app.request('/sitemap.xml');assert(sitemap.text.includes(origin+'/recursos/'+article.slug+'/'),sitemap.text.slice(0,1000));assert(sitemap.text.includes(article.modified_gmt+'+00:00'));assert.equal(sitemap.headers['cache-control'],'no-store');
 down=true;assert.equal((await hook()).status,503);const stale=await app.request('/recursos/');assert.match(stale.headers.warning,/Stale WordPress/);assert(stale.text.includes('contenido actualizado'));
 down=false;current=published.filter(p=>p.id!==49);assert.equal((await hook('deleted')).status,202);assert(!(await app.request('/recursos/')).text.includes(article.title.rendered));assert.equal((await app.request('/recursos/'+article.slug+'/')).status,404);
 assert.equal((await app.request('/soluciones')).status,301);assert.equal((await app.request('/1109c92c84549878ea17f221eaba40bc.txt')).text,'1109c92c84549878ea17f221eaba40bc');
 await new Promise(r=>setImmediate(r));assert(notifications.some(n=>n.urlList.includes(origin+'/recursos/'+article.slug+'/')));
});

test('compiled Express: old sitemap response is discarded after a content event',{timeout:10000},async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-sitemap-race-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));fs.symlinkSync(path.resolve('dist'),path.join(dir,'dist'),'dir');
 let release;const old=new Promise(r=>release=r);let sitemapCalls=0;const token='test-token-'.repeat(4);
 const app=await productionApp({TEST_APP_ROOT:dir,NODE_ENV:'production',INDEXNOW_ENABLED:'true',INDEXNOW_WEBHOOK_TOKEN:token,INDEXNOW_STATE_PATH:path.join(dir,'state.json'),SITEMAP_CACHE_PATH:path.join(dir,'sitemap.xml')},async(url)=>{
  if(url.includes('indexnow.org'))return new Response('',{status:202});
  if(new URL(url).searchParams.has('_fields') && ++sitemapCalls===1)return old;
  return new Response(JSON.stringify(published),{headers:{'x-wp-totalpages':'1'}});
 });
 assert.equal((await app.request('/internal/indexnow',{method:'POST',headers:{authorization:'Bearer '+token},body:{event:'published',urlList:[origin+'/recursos/'+article.slug+'/']}})).status,202);
 release(new Response(JSON.stringify(published.slice(1)),{headers:{'x-wp-totalpages':'1'}}));
 let response;for(let i=0;i<100;i++){response=await app.request('/sitemap.xml');if(response.text.includes(article.slug))break;await new Promise(r=>setTimeout(r,10));}
 assert(response.text.includes(article.slug));assert(sitemapCalls>=2);
});

test('compiled Express: content events invalidate cache even when IndexNow sending is disabled',{timeout:10000},async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-disabled-sync-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));fs.symlinkSync(path.resolve('dist'),path.join(dir,'dist'),'dir');
 let current=[];const token='test-token-'.repeat(4);
 const app=await productionApp({TEST_APP_ROOT:dir,NODE_ENV:'production',INDEXNOW_ENABLED:'false',INDEXNOW_WEBHOOK_TOKEN:token,SITEMAP_CACHE_PATH:path.join(dir,'sitemap.xml')},async(url)=>{assert(!url.includes('indexnow.org'));return new Response(JSON.stringify(current),{headers:{'x-wp-totalpages':'1'}})});
 assert.deepEqual((await app.request('/api/wp/posts')).json(),[]);current=published;
 const event=await app.request('/internal/indexnow',{method:'POST',headers:{authorization:'Bearer '+token},body:{event:'published',urlList:[origin+'/recursos/'+article.slug+'/']}});
 assert.equal(event.status,202);assert.equal(event.json().enabled,false);assert.equal((await app.request('/api/wp/posts')).json()[0].id,49);
 for(let i=0;i<30&&!app.logs.some(l=>l.includes('sitemap_background_refresh_succeeded'));i++)await new Promise(r=>setTimeout(r,10));
});
