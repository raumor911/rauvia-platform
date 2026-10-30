import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {productionApp} from './helpers/production-app.mjs';
import {publicRoutes} from '../scripts/public-routes.js';
import {routeSeo} from '../src/seo/routeSeo.js';
import {INDEXNOW_KEY,ORIGIN} from '../server/indexnow/service.js';

test('compiled production app: key, authenticated hooks, SEO and legacy routes',{timeout:15000},async t=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-v76-app-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  // sendFile rejects dot-directories in absolute names; production lives in /home,
  // while this local checkout lives under .codex. A temporary link models /home.
  fs.symlinkSync(path.resolve('dist'),path.join(dir,'dist'),'dir');
  const token='test-token-'.repeat(4),calls=[];
  const post=JSON.parse(fs.readFileSync('tests/fixtures/wp-post.json','utf8'))[0];
  const app=await productionApp({TEST_APP_ROOT:dir,NODE_ENV:'production',INDEXNOW_ENABLED:'true',INDEXNOW_WEBHOOK_TOKEN:token,
    INDEXNOW_STATE_PATH:path.join(dir,'state.json'),SITEMAP_CACHE_PATH:path.join(dir,'sitemap.xml'),
    SITEMAP_REFRESH_ON_START:'false',INTERNAL_STATUS_TOKEN:token},async(url,init)=>{
      if(url==='https://api.indexnow.org/indexnow'){calls.push(JSON.parse(init.body));return new Response('',{status:202});}
      const parsed=new URL(url);const slug=parsed.searchParams.get('slug');
      return new Response(JSON.stringify(!slug||slug===post.slug?[post]:[]),{headers:{'content-type':'application/json','x-wp-totalpages':'1'}});
    });
  // Allow the startup sitemap promise to settle in the same in-process fixture.
  await new Promise(resolve=>setImmediate(resolve));
  await t.test('key GET/HEAD is exact plain text and follows existing host redirect',async()=>{
    const r=await app.request(`/${INDEXNOW_KEY}.txt`);assert.equal(r.status,200);assert.equal(r.text,INDEXNOW_KEY);
    assert.match(r.headers['content-type'],/^text\/plain/);assert(r.headers['x-request-id']);
    const head=await app.request(`/${INDEXNOW_KEY}.txt`,{method:'HEAD'});assert.equal(head.status,200);assert.equal(head.text,'');
    const alias=await app.request(`/${INDEXNOW_KEY}.txt`,{headers:{host:'www.rauvia.com.mx'}});
    assert.equal(alias.status,301);assert.equal(alias.headers.location,`${ORIGIN}/${INDEXNOW_KEY}.txt`);
  });
  await t.test('unauthorized and invalid requests cannot enqueue URLs',async()=>{
    assert.equal((await app.request('/internal/indexnow',{method:'POST',body:{event:'updated',urlList:[`${ORIGIN}/`]}})).status,401);
    const bad=await app.request('/internal/indexnow',{method:'POST',headers:{authorization:`Bearer ${token}`},body:{event:'updated',urlList:['https://evil.test/']}});
    assert.equal(bad.status,400);
  });
  await t.test('authenticated update stores event and submits only RAUVIA host',async()=>{
    const r=await app.request('/internal/indexnow',{method:'POST',headers:{authorization:`Bearer ${token}`},body:{event:'updated',urlList:[`${ORIGIN}/soluciones/`,`${ORIGIN}/soluciones/`]}});
    assert.equal(r.status,202);assert.equal(r.json().queued,1);
    for(let i=0;i<30&&!calls.length;i++)await new Promise(resolve=>setImmediate(resolve));
    assert(calls.some(c=>c.urlList.includes(`${ORIGIN}/soluciones/`)));assert(calls.every(c=>c.host==='rauvia.com.mx'));
  });
  for(const route of publicRoutes)await t.test(`preserved HTML canonical and H1: ${route}`,async()=>{
    const pathname=route==='/'?'/':route+'/';const r=await app.request(pathname);assert.equal(r.status,200);
    assert.equal((r.text.match(/<h1\b/g)||[]).length,1);assert(r.text.includes(`href="${routeSeo[route].canonical}"`));
  });
  await t.test('legacy redirects, trailing slash, Gone and protected files retain behavior',async()=>{
    for(const [url,target] of [['/blog','https://rauvia.com.mx/recursos/'],['/servicios','https://rauvia.com.mx/soluciones/'],['/soluciones?utm_source=qa','https://rauvia.com.mx/soluciones/?utm_source=qa'],['/componentes-ruta-90-dias-pymes','https://rauvia.com.mx/ruta-90/#componentes']]){
      const r=await app.request(url);assert.equal(r.status,301,url);assert.equal(r.headers.location,target,url);
    }
    assert.equal((await app.request('/contacto-anterior/')).status,410);
    for(const url of ['/shell.html','/src/retrieval/catalog.ts','/no-existe/'])assert.equal((await app.request(url)).status,404,url);
  });
  await t.test('sitemap, WP proxy and article resolver still work',async()=>{
    const sitemap=await app.request('/sitemap.xml');assert.equal(sitemap.status,200);assert(sitemap.text.includes(`${ORIGIN}/recursos/${post.slug}/`));
    const proxy=await app.request(`/api/wp/posts?slug=${post.slug}`);assert.equal(proxy.status,200);assert.equal(proxy.json()[0].slug,post.slug);
    const article=await app.request(`/recursos/${post.slug}/`);assert.equal(article.status,200);assert.match(article.text,/BlogPosting/);
    assert.equal((await app.request('/recursos/no-existe/')).status,404);
  });
  await t.test('runtime status remains protected and contains IndexNow counts only',async()=>{
    assert.equal((await app.request('/internal/runtime-status')).status,401);
    const r=await app.request('/internal/runtime-status',{headers:{authorization:`Bearer ${token}`}});assert.equal(r.status,200);assert.equal(r.json().indexNow.enabled,true);
    assert(!r.text.includes(token));assert(!app.logs.some(line=>line.includes(token)));
  });
  await t.test('hook rate limit is bounded per process and cannot be bypassed by forwarded IP',async()=>{
    let result;
    for(let i=0;i<61;i++)result=await app.request('/internal/indexnow',{method:'POST',headers:{authorization:`Bearer ${token}`,'x-forwarded-for':`203.0.113.${i}`},body:{event:'invalid',urlList:[]}});
    assert.equal(result.status,429);assert.equal(result.headers['retry-after'],'60');
  });
  await t.test('existing analytics validation and rate limit still reject invalid events before DB access',async()=>{
    for(let i=0;i<60;i++){
      const r=await app.request('/api/events',{method:'POST',headers:{'x-forwarded-for':`203.0.113.${i}`},body:{}});
      assert.equal(r.status,400);assert.equal(r.json().status,'invalid_event');
    }
    const r=await app.request('/api/events',{method:'POST',headers:{'x-forwarded-for':'198.51.100.1'},body:{}});
    assert.equal(r.status,429);assert.equal(r.json().status,'rate_limited');
  });
  await t.test('public discovery JSON remains unchanged and Vite modules are not exposed',async()=>{
    for(const name of ['knowledge-graph.json','intent-coverage.json','retrieval-map.json','canonical-answers.json','citation-bundles.json']){
      const r=await app.request('/llmo/'+name);assert.equal(r.status,200);assert.equal(r.text,fs.readFileSync('public/llmo/'+name,'utf8'));
    }
    for(const url of ['/@vite/client','/@react-refresh'])assert.equal((await app.request(url)).status,404);
  });
});
