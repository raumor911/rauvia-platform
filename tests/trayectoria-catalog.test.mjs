import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {trayectoriaCatalog} from '../src/data/trayectoriaCatalog.ts';
import {routeSeo} from '../src/seo/routeSeo.js';
import {buildGraph} from '../src/knowledge/graph.ts';
import {compileKnowledge} from '../src/knowledge/compiler.ts';

test('Trayectoria has three plans and four distinct change tiers',()=>{
  assert.deepEqual(trayectoriaCatalog.plans.map(x=>x.name),['Presencia Libre','RAUVIA Trayectoria','Trayectoria Activa']);
  assert.deepEqual(trayectoriaCatalog.plans.map(x=>x.monthly_price),[0,99,149]);
  assert.deepEqual(trayectoriaCatalog.change_types.map(x=>x.name),['Micro','Pequeño','Mediano','Mayor']);
  assert.deepEqual(trayectoriaCatalog.change_types.map(x=>x.price_from),[149,299,549,1290]);
  assert.equal(trayectoriaCatalog.currency,'MXN');
  assert.equal(trayectoriaCatalog.status,'historical_reference_pending_commercial_confirmation');
  assert.match(trayectoriaCatalog.disclaimer,/históricas|históric/);
});

test('Published machine readable snapshot and build output share one source of truth',()=>{
  const snapshot=JSON.parse(fs.readFileSync('public/llmo/trayectoria-catalogo.json','utf8'));
  assert.deepEqual(snapshot,trayectoriaCatalog);
  assert.deepEqual(JSON.parse(compileKnowledge().outputs['public/llmo/trayectoria-catalogo.json']),trayectoriaCatalog);
});

test('Crawler registry and public graph reference the canonical service page',()=>{
  const index=JSON.parse(fs.readFileSync('public/llmo/index.json','utf8'));
  assert(index.resources.some(x=>x.url==='https://rauvia.com.mx/llmo/trayectoria-catalogo.json'));
  for(const p of ['public/llms.txt','public/llms-full.txt']){
    const text=fs.readFileSync(p,'utf8');
    assert.match(text,/https:\/\/rauvia\.com\.mx\/trayectoria\//);
    assert.match(text,/trayectoria-catalogo\.json/);
  }
  const graph=buildGraph();
  assert(graph.nodes.some(x=>x.id==='asset:trayectoria'&&x.type==='Asset'&&x.canonical==='https://rauvia.com.mx/trayectoria/'));
  assert(graph.nodes.some(x=>x.id==='offering:trayectoria'&&x.type==='Offering'));
  const pub=compileKnowledge().publicGraph;
  assert(pub.nodes.some(x=>x.id==='asset:trayectoria'));
  assert(pub.nodes.some(x=>x.id==='offering:trayectoria'));
});

test('SEO declares one indexable canonical and non-binding Service schema',()=>{
  const seo=routeSeo['/trayectoria'];
  assert.equal(seo.canonical,'https://rauvia.com.mx/trayectoria/');
  assert.equal(seo.robots,'index, follow');
  const schemas=seo.schema;
  const service=schemas.find(x=>x['@type']==='Service');
  assert(service);
  assert.equal(service.provider['@id'],'https://rauvia.com.mx/#organization');
  assert.equal(service.hasOfferCatalog.itemListElement.length,3);
  assert(!JSON.stringify(service).includes('"price":'));
});

test('Table is mounted in the prerendered route, without a separate duplicate page',()=>{
  const view=fs.readFileSync('src/components/PresenceEditorialPage.tsx','utf8');
  const table=fs.readFileSync('src/components/TrayectoriaCatalog.tsx','utf8');
  const footer=fs.readFileSync('src/components/Footer.tsx','utf8');
  assert.match(view,/page==='trayectoria'&&<TrayectoriaCatalog\/>/);
  assert.match(table,/<table/);
  assert.match(table,/catalog\.plans\.map/);
  assert.match(table,/catalog\.change_types\.map/);
  assert.match(footer,/to="\/trayectoria\/"/);
});
