import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {performance} from 'node:perf_hooks';
import {createWordPressCache} from '../server/wordpress/cache';
import {resourceCards} from '../server/wordpress/resources';
import {getResources} from '../src/lib/wp';
const published=JSON.parse(fs.readFileSync('tests/fixtures/wp-published-current.json','utf8'));
const json=(x:unknown)=>new Response(JSON.stringify(x));
function gate(){let resolve!:(x:Response)=>void;const promise=new Promise<Response>(r=>resolve=r);return {promise,resolve};}

test('warm list does not wait on WordPress; expired list responds while a single refresh is pending',async()=>{
 let time=1000,calls=0;const slow=gate();
 const cache=createWordPressCache({now:()=>time,fetcher:async()=>++calls===1?json(published):slow.promise});
 await cache.getPosts();const warm=await cache.getResourcesSnapshot();assert.equal(warm.stale,false);
 time+=600001;const start=performance.now();
 const results=await Promise.all(Array.from({length:30},()=>cache.getResourcesSnapshot()));
 assert(performance.now()-start<100,'stale views must not wait for the pending upstream response');
 assert(results.every(r=>r.stale && r.posts[0].id===49));assert.equal(calls,2);
 const newer=published.map((p:any)=>p.id===49?{...p,title:{rendered:'Nueva edición'}}:p);
 slow.resolve(json(newer));await cache.getPosts();assert.equal((await cache.getResourcesSnapshot()).posts[0].title.rendered,'Nueva edición');
});
test('cold resource response respects a small wait budget while slow upstream continues in background',async()=>{
 const slow=gate();let calls=0;
 const cache=createWordPressCache({fallback:[],env:{WORDPRESS_RESOURCES_WAIT_MS:'40'},fetcher:async()=>{calls++;return slow.promise;}});
 const start=performance.now();const result=await cache.getResourcesSnapshot();const elapsed=performance.now()-start;
 assert(elapsed>=25 && elapsed<250,`cold wait ${elapsed}ms`);assert.equal(result.stale,true);assert.deepEqual(result.posts,[]);
 slow.resolve(json(published));await cache.getPosts();assert.equal((await cache.getResourcesSnapshot()).posts[0].id,49);assert.equal(calls,1);
});
test('persistent snapshot survives process replacement and revalidates without blocking readers',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-wp-snapshot-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const file=path.join(dir,'posts.json');const cache=createWordPressCache({storagePath:file,fetcher:async()=>json(published)});await cache.getPosts();
 assert.equal(JSON.parse(fs.readFileSync(file,'utf8')).posts[0].id,49);
 const slow=gate();const restarted=createWordPressCache({storagePath:file,fetcher:async()=>slow.promise});
 const start=performance.now();const result=await restarted.getResourcesSnapshot();assert(performance.now()-start<100);assert.equal(result.posts[0].id,49);assert.equal(result.stale,true);
 slow.resolve(json(published.slice(1)));await restarted.getPosts();assert.equal((await restarted.getResourcesSnapshot()).posts[0].id,45);
});
test('invalidated refresh cannot restore a deleted post or overwrite a newer disk snapshot',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-wp-snapshot-race-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const file=path.join(dir,'posts.json');const slow=gate();let calls=0;
 const cache=createWordPressCache({storagePath:file,fetcher:async()=>++calls===1?slow.promise:json(published.slice(1))});
 const old=cache.getPosts();cache.invalidate();await cache.getPosts();slow.resolve(json(published));await old;
 assert.equal((await cache.getResourcesSnapshot()).posts[0].id,45);assert.equal(JSON.parse(fs.readFileSync(file,'utf8')).posts[0].id,45);
});
test('outage retry is throttled for views while explicit event reads can recover immediately',async()=>{
 let time=1000,down=false,calls=0;const cache=createWordPressCache({now:()=>time,fetcher:async()=>{calls++;return down?new Response('',{status:503}):json(published);}});
 await cache.getPosts();cache.invalidate();down=true;await cache.getPosts();const before=calls;
 for(let i=0;i<10;i++)assert.equal((await cache.getResourcesSnapshot()).posts[0].id,49);
 assert.equal(calls,before);down=false;cache.invalidate();assert.equal((await cache.getPostsSnapshot()).stale,false);
});
test('corrupt disk cache and unwritable storage do not prevent valid resource reads',async t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rauvia-wp-corrupt-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const file=path.join(dir,'bad.json');fs.writeFileSync(file,'{broken');
 const cache=createWordPressCache({storagePath:file,fetcher:async()=>json(published)});assert.equal((await cache.getResourcesSnapshot()).posts[0].id,49);
 const unwritable=createWordPressCache({storagePath:dir,fetcher:async()=>json(published)});assert.equal((await unwritable.getPostsSnapshot()).posts[0].id,49);
});
test('resource summaries omit bodies and embedded author/terms, preserving title, date, image and links',()=>{
 const posts=published.map((p:any)=>({...p,content:{rendered:'large article body '.repeat(5000)},_embedded:{author:[{name:'Author'}],'wp:term':[[{name:'Tag'}]],'wp:featuredmedia':[{source_url:'https://blog.rauvia.com.mx/cover.webp',alt_text:'Cover'}]}}));
 const cards=resourceCards(posts);assert.equal(cards[0].slug,posts[0].slug);assert.equal(cards[0].date,posts[0].date);assert.equal(cards[0].title.rendered,posts[0].title.rendered);
 assert.equal(cards[0]._embedded?.['wp:featuredmedia']?.[0].source_url,'https://blog.rauvia.com.mx/cover.webp');assert.equal(cards[0].content.rendered,'');assert.equal(cards[0]._embedded?.author,undefined);
 assert(Buffer.byteLength(JSON.stringify(cards))<Buffer.byteLength(JSON.stringify(posts))/10);assert(posts[0].content.rendered.length>1000);
});
test('client accepts marked stale resource data without launching a second WordPress request',async()=>{
 const original=globalThis.fetch;let calls=0;
 try {
  globalThis.fetch=async(url,init)=>{calls++;assert.equal(url,'/api/wp/posts?view=resources');assert.equal(init?.cache,'no-store');assert(init?.signal);return new Response(JSON.stringify(resourceCards(published)),{headers:{Warning:'110 - "Stale WordPress content"'}});};
  const result=await getResources();assert.equal(result.posts[0].id,49);assert.equal(result.stale,true);assert.equal(calls,1);
 }finally{globalThis.fetch=original;}
});
test('client cancellation aborts a pending resource fetch and does not start a fallback',async()=>{
 const original=globalThis.fetch;let calls=0;
 try {
  globalThis.fetch=async(_url,init)=>{calls++;return new Promise<Response>((_resolve,reject)=>init?.signal?.addEventListener('abort',()=>reject(init.signal?.reason),{once:true}));};
  const controller=new AbortController();const pending=getResources(controller.signal);controller.abort();await assert.rejects(pending);assert.equal(calls,1);
 }finally{globalThis.fetch=original;}
});
