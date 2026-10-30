import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {routeSeo} from '../src/seo/routeSeo.js';
import {createCanonicalRedirectMiddleware, REDIRECT_PATHS, RETIRED_PATHS} from '../server/seo/legacyRoutes';
import {publicRoutes} from '../scripts/public-routes.js';

// Request/response doubles exercise the actual exported middleware without
// a proxy, production DNS or a running WordPress instance.
const middleware = createCanonicalRedirectMiddleware(publicRoutes);
function request(path: string, options: {host?:string;method?:string;query?:string} = {}) {
  const calls: Array<{status:number;location?:string}> = [];
  let status=200;
  const req = {method:options.method||'GET',hostname:options.host||'rauvia.com.mx',path,
    originalUrl:path+(options.query||'')} as any;
  const res: any = {
    redirect(code:number,location:string){calls.push({status:code,location});return res;},
    status(code:number){status=code;return res;},
    set(){return res;},type(){return res;},
    send(){calls.push({status});return res;}
  };
  let next=false;
  middleware(req,res,()=>{next=true;});
  return {calls,next,status};
}

test('redirect policies and 410 policies are mutually exclusive',()=>{
  for (const path of RETIRED_PATHS) assert.ok(!REDIRECT_PATHS.has(path),path);
  for (const [path,target] of REDIRECT_PATHS) {
    assert.ok(path.startsWith('/')&&target.startsWith('/'));
    assert.ok(!target.startsWith('//'));
  }
});

test('one absolute HTTPS hop combines domain, slash and legacy with query',()=>{
  for (const [path,target] of REDIRECT_PATHS) {
    for(const host of ['rauvia.com.mx','www.rauvia.com.mx','rauvia.consulting']){
      const first=request(path,{host,query:'?utm_source=qa&gclid=abc'});
      assert.equal(first.calls.length,1,path);
      assert.equal(first.calls[0].status,301,path);
      const fragment=target.indexOf('#');
      const normalized=fragment<0?target:target.slice(0,fragment);
      const suffix=fragment<0?'':target.slice(fragment);
      const destination='https://rauvia.com.mx'+normalized+'?utm_source=qa&gclid=abc'+suffix;
      assert.equal(first.calls[0].location,destination,path);
      const clean=new URL(destination);
      const second=request(clean.pathname,{query:clean.search});
      assert.ok(second.next || second.calls[0]?.status!==301,path+' loop');
    }
  }
});

test('canonical pages never redirect; unslashed and aliases normalize once',()=>{
  for (const route of publicRoutes) {
    const path=route==='/'?'/':route+'/';
    const canonical=request(path,{query:'?utm_source=qa'});
    assert.ok(canonical.next,path);
    assert.equal(canonical.calls.length,0,path);
    if(route!=='/'){
      const first=request(route,{host:'www.rauvia.com.mx',query:'?utm_source=qa'});
      assert.deepEqual(first.calls,[{status:301,location:'https://rauvia.com.mx'+path+'?utm_source=qa'}]);
    }
  }
  assert.deepEqual(request('/recursos/example',{query:'?x=1'}).calls,
    [{status:301,location:'https://rauvia.com.mx/recursos/example/?x=1'}]);
});

test('retired sources return 410 directly and do not redirect via aliases',()=>{
  for(const path of RETIRED_PATHS) {
    const r=request(path,{host:'www.rauvia.com.mx',query:'?utm_source=old'});
    assert.equal(r.calls.length,1);
    assert.equal(r.calls[0].status,410,path);
  }
});

test('unsupported methods and unrelated paths pass through; shop never falls back to homepage',()=>{
  assert.ok(request('/api/events',{method:'POST'}).next);
  assert.ok(request('/unknown/').next);
  assert.deepEqual(request('/shop/cart',{host:'shop.rauvia.com.mx'}).calls,[{status:404}]);
  assert.deepEqual(request('/llmo/',{query:'?utm_source=llmo'}).calls,
    [{status:301,location:'https://rauvia.com.mx/llmo/index.json?utm_source=llmo'}]);
});

test('SEO metadata and machine-readable sources use direct canonical page URLs',()=>{
  const read=(path:string)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
  const sources=['public/llms.txt','public/llms-full.txt',
    'public/llmo/rauvia.md','public/llmo/aethryon.md',
    'public/llmo/evidencia.md','public/llmo/knowledge-graph.json'];
  const matches=(text:string)=>[...text.matchAll(/https:\/\/rauvia\.com\.mx\/(?:nosotros|soluciones|aethryon|recursos|frente-comercial|casos|trayectoria|rauviaweb)(?=["'\s,)}]|$)/g)];
  for(const path of sources)assert.equal(matches(read(path)).length,0,path);
  for(const route of publicRoutes) {
    const seo=routeSeo[route];
    assert.equal(seo.canonical,'https://rauvia.com.mx'+(route==='/'?'/':route+'/'));
  }
});
