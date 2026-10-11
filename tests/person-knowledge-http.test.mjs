import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.TEST_BASE_URL;
if(!base)throw new Error('TEST_BASE_URL required: test only the five JSON resources.');
const resources=['knowledge-graph.json','intent-coverage.json','retrieval-map.json','canonical-answers.json','citation-bundles.json'];
for(const name of resources)test('Backend JSON HTTP: '+name,async()=>{
 const response=await fetch(base+'/llmo/'+name,{redirect:'manual'});
 assert.equal(response.status,200);assert.equal(response.headers.get('location'),null);
 assert.match(response.headers.get('content-type'),/^application\/json/);
 const body=await response.text(),value=JSON.parse(body);
 assert.equal(body,fs.readFileSync('public/llmo/'+name,'utf8'));assert.equal(value.scope,'public');
 assert.doesNotMatch(body,/repositoryRef|privateNotes|matchGroups|"visibility":\s*"internal"|"status":\s*"hypothesis"|\/Users\//);
 if(name==='knowledge-graph.json'){
  const person=value.nodes.find(n=>n.id==='person:raul-morales');assert.equal(person.schemaId,'https://rauvia.com.mx/#raul-morales');assert.equal(person.url,'https://raulmorales.com.mx/');assert.equal(person.credentialRefs.length,3);assert.equal(person.publicAuthorRefs.length,10);assert.equal(person.practiceRefs.length,8);
  assert(value.nodes.filter(n=>n.type==='Credential').every(n=>n.status==='completed'));
  assert(value.edges.some(e=>e.from===person.id&&e.relation==='practicesThrough'&&e.to==='org:rauvia'));
  const ids=new Set(value.nodes.map(n=>n.id));assert.equal(ids.size,value.nodes.length);assert(value.edges.every(e=>ids.has(e.from)&&ids.has(e.to)));
  assert.equal(value.nodes.find(n=>n.id==='method:ruta90').attribution,'adopted_by_rauvia');
 }
});
