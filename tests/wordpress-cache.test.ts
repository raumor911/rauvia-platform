import test from 'node:test';
import assert from 'node:assert/strict';
import {createWordPressCache} from '../server/wordpress/cache';
import {articleSeo} from '../src/seo/articleSeo';
import {buildMetaTags,safeJson,schemasFor} from '../src/seo/buildMetaTags';
import {normalizeEditorialHtml} from '../src/lib/editorial';
const post:any={id:1,slug:'prueba',date:'2026-09-30T12:00:00',modified:'2026-10-01T12:00:00',title:{rendered:'Capacidad &amp; mercado'},excerpt:{rendered:'<p>Contexto específico.</p>'},content:{rendered:'<p>Contenido editorial.</p>'}};
const json=(value:any)=>new Response(JSON.stringify(value),{headers:{'content-type':'application/json'}});

test('article HTML and proxy share positive cache; concurrent requests deduplicate; cache expires at ten minutes', async()=>{
 let calls=0,time=1000; const cache=createWordPressCache({now:()=>time,fetcher:async()=>{calls++;await new Promise(r=>setTimeout(r,10));return json([post]);}});
 await Promise.all([cache.getPost('prueba'),cache.getPost('prueba')]);
 assert.equal(calls,1); assert.equal((await cache.fetchWPPosts('prueba'))[0].id,1);assert.equal(calls,1);
 time+=600001;assert.equal((await cache.getPost('prueba')).status,200);assert.equal(calls,2);
});
test('fresh list is reused by article resolver',async()=>{
 let calls=0;const cache=createWordPressCache({fetcher:async()=>{calls++;return json([post]);}});
 await cache.getPosts();assert.equal((await cache.getPost('prueba')).status,200);assert.equal(calls,1);
});
test('confirmed deleted post is never resurrected from fallback or cached list, including after negative TTL',async()=>{
 let time=1000,mode='list';const cache=createWordPressCache({now:()=>time,fallback:[post],fetcher:async()=> mode==='list' ? json([post]) : mode==='deleted' ? json([]) : new Response('',{status:503})});
 await cache.getPosts();time+=600001;mode='deleted';assert.equal((await cache.getPost('prueba')).status,404);
 time+=60001;mode='down';assert.equal((await cache.getPost('prueba')).status,503);
});
test('unknown article upstream outage is 503, never false 404',async()=>{
 const cache=createWordPressCache({fallback:[],fetcher:async()=>new Response('',{status:503})});
 assert.equal((await cache.getPost('desconocido')).status,503);
});
test('previously fetched article remains available as stale during outage',async()=>{
 let time=1000,down=false;const cache=createWordPressCache({now:()=>time,fetcher:async()=>down?new Response('',{status:503}):json([post])});
 await cache.getPost('prueba');time+=600001;down=true;const result=await cache.getPost('prueba');assert.equal(result.status,200);assert.equal(result.stale,true);
});
test('successful missing result is cached briefly and does not use hardcoded posts',async()=>{
 let calls=0;const cache=createWordPressCache({fallback:[post],fetcher:async()=>{calls++;return json([]);}});
 assert.equal((await cache.getPost('prueba')).status,404);await cache.getPost('prueba');assert.equal(calls,1);
});
test('unsafe WordPress markup is removed and duplicate article H1 is eliminated',()=>{
 const body=normalizeEditorialHtml('<h1>Capacidad &amp; mercado</h1><script>alert(1)</script><img src="javascript:alert(1)" onerror="alert(2)"><p onclick="evil()">Texto visible</p><a href="javascript:evil()">Enlace</a><iframe src="https://evil.test"></iframe>',post.title.rendered);
 assert.doesNotMatch(body,/<script|<iframe|<h1|onerror|onclick|javascript:/i);assert.match(body,/Texto visible/);
});
test('article metadata decodes entities, escapes injection, retains author/date/image when provided',()=>{
 const withMedia={...post,_embedded:{author:[{name:'Raúl &amp; equipo'}],'wp:featuredmedia':[{source_url:'https://blog.rauvia.com.mx/cover.webp'}]}};
 const {seo}=articleSeo(withMedia);assert.equal(seo.title,'Capacidad & mercado | RAUVIA');assert.equal(seo.ogType,'article');assert.equal(seo.author,'Raúl & equipo');assert.match(buildMetaTags(seo),/Capacidad &amp; mercado/);
 assert.equal(schemasFor(seo).filter((x:any)=>x['@type']==='BlogPosting').length,1);
 const jsonData=safeJson({content:'</script><script>evil()</script>'});assert.doesNotMatch(jsonData,/<\/script/i);assert.equal(JSON.parse(jsonData).content,'</script><script>evil()</script>');
});

test('null/undefined canonical is absent from generated head, including OG URL',()=>{
  for (const canonical of [null,undefined,'']) {
    const html=buildMetaTags({title:'Error | RAUVIA',description:'Recurso no disponible',canonical,robots:'noindex, nofollow'});
    assert.doesNotMatch(html,/rel="canonical"|property="og:url"/);
    assert.match(html,/name="robots" content="noindex, nofollow"/);
    assert.doesNotMatch(html,/"@type":"(?:BlogPosting|Article)"/);
  }
  const {seo}=articleSeo(post);
  assert.match(buildMetaTags(seo),/rel="canonical" href="https:\/\/rauvia.com.mx\/recursos\/prueba\/"/);
  assert.match(buildMetaTags(seo),/name="robots" content="index, follow"/);
});
