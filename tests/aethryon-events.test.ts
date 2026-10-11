import test from 'node:test';
import assert from 'node:assert/strict';
import {recordOnce} from '../src/lib/ruta90Session.js';
import {validateEventPayload} from '../server/analytics/validation';
const sections=['aethryon_quick_summary','aethryon_recognition','aethryon_use_case','aethryon_outcomes','aethryon_solution_paths','aethryon_how_it_works','aethryon_criteria','aethryon_execution','aethryon_final_cta'];
test('Repeated observer callbacks and remounts send one observation per section/session',()=>{
 const data=new Map(), sent:string[]=[];const storage={getItem:(k:string)=>data.get(k),setItem:(k:string,v:string)=>data.set(k,v)};
 for(let pass=0;pass<100;pass++)for(const section of sections)recordOnce(storage,'session-A','aethryon_view',section,()=>sent.push(section),'aethryon:V71');
 assert.deepEqual(sent,sections);
 assert.equal(recordOnce(storage,'session-B','aethryon_view',sections[0],()=>sent.push(sections[0]),'aethryon:V71'),true);assert.equal(sent.length,10);
});
test('Namespace extension preserves Ruta 90 storage keys and failure fallback isolation',()=>{
 const data=new Map();const storage={getItem:(k:string)=>data.get(k),setItem:(k:string,v:string)=>data.set(k,v)};
 recordOnce(storage,'session','ruta90_view',undefined,()=>{});assert.equal(data.get('rv:ruta90:1.0:session:ruta90_view:page'),'1');
 const broken={getItem:()=>{throw Error('blocked');},setItem:()=>{throw Error('blocked');}};let count=0;
 for(const scope of ['ruta90:1.0','aethryon:V71'])for(let i=0;i<4;i++)recordOnce(broken,'failure-test','aethryon_view','section',()=>count++,scope);
 assert.equal(count,2);
});
test('Existing endpoint taxonomy accepts section exposure and navigation without new events',()=>{
 for(const section of sections)assert.equal(validateEventPayload({visitor_id:'qa',session_id:'qa-session',event_name:'aethryon_view',page_path:'/aethryon/',device_type:'mobile',properties:{section,context:'section_view',ux_version:'V71'}}),null);
 for(const destination of ['/soluciones/','/ruta-90/','/frente-comercial/'])assert.equal(validateEventPayload({visitor_id:'qa',session_id:'qa-session',event_name:'cta_click',page_path:'/aethryon/',properties:{source_page:'/aethryon/',destination,context:'solution_pathways'}}),null);
});
