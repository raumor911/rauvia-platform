import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createWordPressCache} from '../server/wordpress/cache';
import {publicationLabel,sortPublishedPosts} from '../src/lib/postDates';
import {getPosts} from '../src/lib/wp';
const published=JSON.parse(fs.readFileSync('tests/fixtures/wp-published-current.json','utf8'));
const article=published.find((p:any)=>p.id===49);
const json=(p:any)=>new Response(JSON.stringify(p));
function gate(){let resolve!:(x:Response)=>void;const promise=new Promise<Response>(r=>resolve=r);return {promise,resolve};}

test('current WordPress export: article 49 is published October 7, ordered first, independently of modified/editorial dates',()=>{
 assert.equal(article.date,'2026-10-07T00:20:53');assert.equal(article.date_gmt,'2026-10-07T00:20:53');
 assert.equal(sortPublishedPosts([...published].reverse())[0].id,49);
 assert.equal(publicationLabel(article.date),'7 de octubre de 2026');
 assert.equal(publicationLabel('2026-10-02T00:01:00'),'2 de octubre de 2026');
 assert.match(article.content.rendered,/7 de octubre de 2026/);
});
test('explicit upstream publication ordering and authoritative empty list',async()=>{
 let seen='';const cache=createWordPressCache({fetcher:async(url)=>{seen=String(url);return json([])}});
 assert.deepEqual(await cache.getPosts(),[]);
 const u=new URL(seen);assert.equal(u.searchParams.get('orderby'),'date');assert.equal(u.searchParams.get('order'),'desc');assert.equal(u.searchParams.get('per_page'),'100');
});
test('invalidated in-flight list cannot overwrite or return an earlier publication snapshot',async()=>{
 const old=gate();let calls=0;const cache=createWordPressCache({fetcher:async()=>++calls===1?old.promise:json(published)});
 const before=cache.getPosts();cache.invalidate();const fresh=await cache.getPosts();old.resolve(json(published.slice(1)));
 assert.equal(fresh[0].id,49);assert.equal((await before)[0].id,49);assert.equal((await cache.getPosts())[0].id,49);assert.equal(calls,2);
});
test('invalidated in-flight article cannot overwrite an edit',async()=>{
 const old=gate();let calls=0;const edited={...article,title:{rendered:'Título actualizado'}};
 const cache=createWordPressCache({fetcher:async()=>++calls===1?old.promise:json([edited])});
 const before=cache.getPost(article.slug);cache.invalidate();assert.equal((await cache.getPost(article.slug)).post?.title.rendered,'Título actualizado');old.resolve(json([article]));
 assert.equal((await before).post?.title.rendered,'Título actualizado');assert.equal((await cache.getPost(article.slug)).post?.title.rendered,'Título actualizado');
});
test('invalidation expires negative lookups and refreshes newly published content',async()=>{
 let posts:any[]=[];const cache=createWordPressCache({fetcher:async()=>json(posts)});
 assert.equal((await cache.getPost(article.slug)).status,404);posts=[article];cache.invalidate();assert.equal((await cache.getPost(article.slug)).status,200);
});
test('outage preserves last known good list and marks it stale; next request recovers without restart',async()=>{
 let down=false;const cache=createWordPressCache({fetcher:async()=>down?new Response('',{status:503}):json(published)});
 await cache.getPosts();cache.invalidate();down=true;const stale=await cache.getPostsSnapshot();assert.equal(stale.stale,true);assert.equal(stale.posts[0].id,49);
 down=false;assert.equal((await cache.getPostsSnapshot()).stale,false);
});
test('client prefers proxy, uses no-store, accepts successful empty list and falls back to REST on error',async()=>{
 const original=globalThis.fetch;const calls:any[]=[];
 try {
  globalThis.fetch=async(url,init)=>{calls.push([url,init]);return json([])};
  assert.deepEqual(await getPosts(),[]);assert.equal(calls.length,1);assert.equal(calls[0][0],'/api/wp/posts');assert.equal(calls[0][1].cache,'no-store');
  globalThis.fetch=async(url)=>String(url).startsWith('/')?new Response('',{status:503}):json([...published].reverse());
  assert.equal((await getPosts())[0].id,49);
  globalThis.fetch=async()=>new Response('',{status:503});await assert.rejects(()=>getPosts(),/no disponible/);
 }finally{globalThis.fetch=original;}
});
