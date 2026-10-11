import test from 'node:test';
import assert from 'node:assert/strict';
import {validateEventPayload} from '../server/analytics/validation';
for(const event_name of ['ruta90_view','ruta90_chapter_view','ruta90_cta_click','ruta90_aethryon_click'])test(`existing event endpoint accepts ${event_name}`,()=>{
 assert.equal(validateEventPayload({visitor_id:'qa',session_id:'qa-session',event_name,page_path:'/ruta-90/',device_type:'mobile',properties:{chapter:'componentes',slide:4,framework_version:'1.0'}}),null);
});
test('event endpoint still rejects unknown events',()=>assert.equal(validateEventPayload({visitor_id:'qa',session_id:'qa-session',event_name:'ruta90_arbitrary',page_path:'/ruta-90/'}),'Invalid event_name'));

test('analytics normalizes Ruta 90 paths and preserves navigation properties',async()=>{
 const {trackEvent}=await import('../src/lib/analytics');
 const map=new Map(),bodies:Blob[]=[];
 const originals=new Map(['window','document','navigator','localStorage'].map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));
 const location={pathname:'/ruta-90',search:'?utm_source=qa'};
 try {
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(k:string)=>map.get(k)||null,setItem:(k:string,v:string)=>map.set(k,v)}});
  Object.defineProperty(globalThis,'window',{configurable:true,value:{location,innerWidth:390,innerHeight:844}});
  Object.defineProperty(globalThis,'document',{configurable:true,value:{referrer:''}});
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{userAgent:'QA Desktop',sendBeacon:(_url:string,blob:Blob)=>{bodies.push(blob);return true;}}});
  trackEvent('ruta90_view',{framework_version:'1.0'});location.pathname='/ruta-90/';trackEvent('ruta90_chapter_view',{chapter:'componentes',slide:4,framework_version:'1.0'});
  location.pathname='/soluciones/';location.search='';trackEvent('cta_click',{destination:'/ruta-90/',source_page:'/soluciones/',context:'related_solution'});
  const events=await Promise.all(bodies.map(async b=>JSON.parse(await b.text())));assert.equal(events.length,3);assert.equal(events[0].page_path,'/ruta-90/?utm_source=qa');assert.equal(events[1].page_path,events[0].page_path);assert.equal(events[0].session_id,events[1].session_id);assert.equal(events[2].properties.destination,'/ruta-90/');assert.equal(validateEventPayload(events[2]),null);
  assert.equal(events[0].properties.viewport_width,390);assert.equal(events[0].properties.orientation,'portrait');
  assert.equal(events[0].properties.viewport_class,'phone');assert.equal(events[0].properties.viewport_segments,undefined);
  (globalThis.window as any).innerWidth=850;(globalThis.window as any).innerHeight=1000;
  (globalThis.window as any).matchMedia=()=>({matches:false});trackEvent('ruta90_view');
  const ordinary=JSON.parse(await bodies[3].text());assert.equal(ordinary.properties.viewport_segments,undefined);
  (globalThis.window as any).matchMedia=(q:string)=>({matches:q.includes('horizontal-viewport')});trackEvent('ruta90_view');
  const segmented=JSON.parse(await bodies[4].text());assert.equal(segmented.properties.viewport_segments,2);
  location.pathname='/pagina-web-para-medicos/';trackEvent('page_view');
  const excluded=JSON.parse(await bodies[5].text());assert.equal(excluded.properties.viewport_width,undefined);
 } finally {for(const [key,descriptor] of originals) {if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete (globalThis as any)[key];}}
});
