import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.TEST_BASE_URL;
for(const file of ['knowledge-graph.json','intent-coverage.json'])test(`Knowledge static HTTP 200: ${file}`,{skip:!base},async()=>{
 const response=await fetch(base+'/llmo/'+file,{redirect:'manual'});assert.equal(response.status,200);assert.equal(response.headers.get('location'),null);assert.match(response.headers.get('content-type'),/application\/json/);
 const body=await response.text();assert.equal(body,fs.readFileSync('public/llmo/'+file,'utf8'));const value=JSON.parse(body);assert.equal(value.scope,'public');assert.doesNotMatch(body,/vertical:restaurant|vertical:export-business|repositoryRef|privateNotes|matchGroups|\/Users\//);
 if(file==='knowledge-graph.json'){assert.equal(value.nodes.length,208);assert.equal(value.nodes.filter(n=>n.type==='Organization').length,1);assert.equal(value.nodes.find(n=>n.id==='method:ruta90').attribution,'adopted_by_rauvia');}
 else{assert.equal(value.intents.length,64);assert(value.intents.every(n=>n.evidenceState==='editorial'));}
});
test('LLMO index and curated text register both public resources',{skip:!base},async()=>{
 const index=await (await fetch(base+'/llmo/index.json')).json();for(const name of ['knowledge-graph.json','intent-coverage.json'])assert(index.resources.some(r=>r.url==='https://rauvia.com.mx/llmo/'+name));
 for(const name of ['llms.txt','llms-full.txt']){const r=await fetch(base+'/'+name,{redirect:'manual'});assert.equal(r.status,200);const body=await r.text();for(const n of ['knowledge-graph.json','intent-coverage.json'])assert(body.includes('/llmo/'+n));assert(!body.includes('"nodes":'));}
});
for(const path of ['/data/knowledge/master-graph.json','/data/knowledge/intent-coverage.json','/src/knowledge/intents.ts','/llmo/master-graph.json','/llmo/gaps.json','/docs/knowledge-matrices.md'])test(`Internal knowledge is not served: ${path}`,{skip:!base},async()=>{const r=await fetch(base+path,{redirect:'manual'});assert.equal(r.status,404);assert.equal(r.headers.get('location'),null);assert.doesNotMatch(await r.text(),/internal_hypothesis|matchGroups|"scope":\s*"internal"/);});
