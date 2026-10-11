import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createIndexNow, validateUrl, authorized, sitemapSnapshot, INDEXNOW_KEY, ORIGIN} from '../server/indexnow/service.js';

function setup(t, options={}) {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-indexnow-'));
  t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  const env={NODE_ENV:'production',INDEXNOW_ENABLED:'true',INDEXNOW_STATE_PATH:path.join(dir,'state.json'),...options.env};
  const calls=[];
  const service=createIndexNow({env,now:options.now,fetcher:options.fetcher || (async (url, init)=>{calls.push({url,...init,body:JSON.parse(init.body)});return new Response('',{status:200});})});
  return {dir,env,calls,service,read:()=>JSON.parse(fs.readFileSync(env.INDEXNOW_STATE_PATH,'utf8'))};
}
const page = number => `${ORIGIN}/recursos/articulo-${number}/`;

test('accept canonical primary host and reject unsafe/noncanonical URLs',()=>{
  assert.equal(validateUrl(`${ORIGIN}/`),`${ORIGIN}/`);
  for(const url of ['http://rauvia.com.mx/','https://www.rauvia.com.mx/','https://blog.rauvia.com.mx/',
    'https://rauvia.com.mx.evil.test/','https://user:secret@rauvia.com.mx/','https://rauvia.com.mx:443/',
    `${ORIGIN}/x/?token=secret`,`${ORIGIN}/x/#frag`,`${ORIGIN}/x`,`${ORIGIN}/x/../`,`${ORIGIN}/%2e/`,
    `${ORIGIN}/%2F/`,`${ORIGIN}/a//b/`,`${ORIGIN}/internal/`,`${ORIGIN}/api/`,`${ORIGIN}/src/`]) {
    assert.throws(()=>validateUrl(url),url);
  }
});
test('webhook requires a separate strong bearer token',()=>{
  const token='a'.repeat(32);
  assert(authorized(`Bearer ${token}`,token));
  assert(!authorized(`Bearer ${INDEXNOW_KEY}`,token));
  assert(!authorized('Bearer short','short'));assert(!authorized(undefined,token));
});
test('disabled and development modes never persist or submit',async t=>{
  for(const env of [{NODE_ENV:'development'},{INDEXNOW_ENABLED:'false'}]) {
    const s=setup(t,{env});s.service.enqueue([page(1)]);s.service.observe({[page(1)]:'x'});await s.service.flush();
    assert.equal(s.calls.length,0);assert(!fs.existsSync(s.env.INDEXNOW_STATE_PATH));
  }
});
test('deduplicate, batch, use exact key and clear durable accepted items',async t=>{
  const s=setup(t,{env:{INDEXNOW_BATCH_SIZE:'2'}});
  s.service.enqueue([page(1),page(2),page(1),page(3)]);await s.service.flush();
  assert.deepEqual(s.calls.map(c=>c.body.urlList.length),[2,1]);
  assert.equal(s.calls[0].body.host,'rauvia.com.mx');assert.equal(s.calls[0].body.keyLocation,`${ORIGIN}/${INDEXNOW_KEY}.txt`);
  assert.equal(s.calls[0].url,'https://api.indexnow.org/indexnow');assert.equal(s.calls[0].redirect,'error');assert.deepEqual(s.read().pending,{});
});
test('first snapshot is a baseline; update, addition and deletion are detected',async t=>{
  const s=setup(t);s.service.observe({[page(1)]:'a',[page(2)]:'b'});assert.equal(s.service.status().pending,0);
  s.service.observe({[page(1)]:'a',[page(2)]:'b'});assert.equal(s.service.status().pending,0);
  s.service.observe({[page(1)]:'updated',[page(3)]:'new'});
  assert.deepEqual(Object.keys(s.read().pending).sort(),[page(1),page(2),page(3)].sort());
  await s.service.flush();assert.equal(s.calls.length,1);
  s.service.observe({[page(1)]:'updated',[page(3)]:'new'});assert.equal(s.service.status().pending,0);
});
test('initial submission can be explicitly enabled',t=>{
  const s=setup(t,{env:{INDEXNOW_SUBMIT_INITIAL:'true'}});s.service.observe({[page(1)]:'a'});assert.equal(s.service.status().pending,1);
});
test('pending items and snapshots survive process replacement',async t=>{
  const s=setup(t);s.service.observe({[page(1)]:'a'});s.service.enqueue([page(1)]);
  const calls=[];const restarted=createIndexNow({env:s.env,fetcher:async(_,init)=>{calls.push(JSON.parse(init.body));return new Response('',{status:200});}});
  await restarted.flush();assert.equal(calls.length,1);assert.deepEqual(s.read().pending,{});
});
for(const status of [200,202])test(`HTTP ${status} is received, with no indexing claim`,async t=>{
  const s=setup(t,{fetcher:async()=>new Response('',{status})});s.service.enqueue([page(1)]);await s.service.flush();assert.equal(s.service.status().pending,0);
});
for(const status of [400,403,422])test(`HTTP ${status} blocks retry until a new revision or operator repair`,async t=>{
  let requests=0;const s=setup(t,{fetcher:async()=>{requests++;return new Response('',{status});}});
  s.service.enqueue([page(1)]);await s.service.flush();await s.service.flush();assert.equal(requests,1);assert.equal(s.service.status().blocked,1);
});
for(const status of [429,500,503])test(`HTTP ${status} persists backoff and honors Retry-After`,async t=>{
  let current=1000,requests=0;
  const s=setup(t,{now:()=>current,fetcher:async()=>{requests++;return new Response('',{status,headers:{'Retry-After':'120'}});}});
  s.service.enqueue([page(1)]);await s.service.flush();s.service.enqueue([page(1)]);await s.service.flush();assert.equal(requests,1);
  current+=120000;await s.service.flush();assert.equal(requests,2);
});
test('HTTP date Retry-After is honored',async t=>{
  const current=Date.parse('2026-10-10T12:00:00Z');
  const s=setup(t,{now:()=>current,fetcher:async()=>new Response('',{status:429,headers:{'Retry-After':'Sat, 10 Oct 2026 12:05:00 GMT'}})});
  s.service.enqueue([page(1)]);await s.service.flush();assert.equal(s.read().pending[page(1)].nextAt,current+300000);
});
test('timeout cancels outbound fetch and keeps event durable',async t=>{
  const s=setup(t,{env:{INDEXNOW_TIMEOUT_MS:'100'},fetcher:async(_,init)=>new Promise((_,reject)=>init.signal.addEventListener('abort',()=>reject(new Error('timeout'))))});
  s.service.enqueue([page(1)]);await s.service.flush();assert.equal(s.service.status().pending,1);assert.equal(s.read().pending[page(1)].lastStatus,0);
});
test('single-flight flush preserves a newer event arriving during send',async t=>{
  let release,ready;const started=new Promise(resolve=>ready=resolve);
  const s=setup(t,{fetcher:async()=>{ready();return new Promise(resolve=>release=()=>resolve(new Response('',{status:200})));}});
  s.service.enqueue([page(1)]);const first=s.service.flush();assert.equal(s.service.flush(),first);
  await started;s.service.enqueue([page(1)]);release();await first;assert.equal(s.service.status().pending,1);
});
test('snapshot revision arriving during send is not lost',async t=>{
  let release,ready;const started=new Promise(resolve=>ready=resolve);
  const s=setup(t,{fetcher:async()=>{ready();return new Promise(resolve=>release=()=>resolve(new Response('',{status:200})));}});
  s.service.observe({[page(1)]:'a'});s.service.observe({[page(1)]:'b'});const first=s.service.flush();await started;
  s.service.observe({[page(1)]:'c'});release();await first;assert.equal(s.service.status().pending,1);
});
test('corrupt state fails closed without sending URLs',t=>{
  const s=setup(t);fs.writeFileSync(s.env.INDEXNOW_STATE_PATH,'broken');assert.throws(()=>createIndexNow({env:s.env}));
});
test('failed atomic write does not acknowledge or advance in-memory state',t=>{
  const s=setup(t);fs.mkdirSync(s.env.INDEXNOW_STATE_PATH);assert.throws(()=>s.service.enqueue([page(1)]));assert.equal(s.service.status().pending,0);
});
test('snapshot fingerprints distinguish HTML changes and WP modified times',t=>{
  const s=setup(t);fs.mkdirSync(path.join(s.dir,'soluciones'));fs.writeFileSync(path.join(s.dir,'soluciones/index.html'),'before');
  const xml=`<urlset><url><loc>${ORIGIN}/soluciones/</loc></url><url><loc>${page(1)}</loc><lastmod>2026-10-10T00:00:00Z</lastmod></url></urlset>`;
  const a=sitemapSnapshot(xml,s.dir);fs.writeFileSync(path.join(s.dir,'soluciones/index.html'),'after');
  const b=sitemapSnapshot(xml,s.dir);assert.notEqual(a[`${ORIGIN}/soluciones/`],b[`${ORIGIN}/soluciones/`]);
  assert.notEqual(a[page(1)],sitemapSnapshot(xml.replace('T00:','T01:'),s.dir)[page(1)]);assert.throws(()=>sitemapSnapshot('<urlset></urlset>',s.dir));
});
test('invalid input is rejected atomically before any event persists',t=>{
  const s=setup(t);assert.throws(()=>s.service.enqueue([page(1),'https://evil.test/']));assert.equal(s.service.status().pending,0);
});
test('stop prevents sends and new queued work',async t=>{
  const s=setup(t);s.service.enqueue([page(1)]);s.service.stop();await s.service.flush();s.service.enqueue([page(2)]);
  assert.equal(s.calls.length,0);assert.equal(s.service.status().pending,1);
});
