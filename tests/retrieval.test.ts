import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {compileRetrieval} from '../src/retrieval/compiler.ts';
import {retrieveAnswer} from '../src/retrieval/retrieve.ts';
import {validateRetrieval} from '../src/retrieval/validate.ts';
const r=compileRetrieval(),corpus=JSON.parse(fs.readFileSync('data/knowledge/retrieval-tests.json','utf8'));
test('18 families cover all 64 approved public intents; V74 IDs preserved',()=>{assert.equal(r.answers.length,18);assert.equal(r.archetypes.length,64);assert.equal(validateRetrieval(r).length,0);const ids=r.answers.flatMap(a=>a.intentIds);assert.equal(new Set(ids).size,64);assert.equal(ids.length,64);});
for(const f of corpus.tests)test('query → intent → problem → answer → capability: '+f.intent,()=>{const result=retrieveAnswer(r,f.query);assert.equal(result.state,'matched');assert.equal(result.fit,'POSSIBLE_FIT');const a=result.matches[0];assert(a.intentIds.includes(f.intent));assert(a.problemIds.includes(f.problem));assert.equal(a.answerId,f.answer);assert(a.capabilityIds.includes(f.capability));assert(r.bundles.some(b=>b.id===a.citationBundleId));});
for(const f of corpus.negative_tests)test('negative fit: '+f.query,()=>{const result=retrieveAnswer(r,f.query);assert.equal(result.state,'not_primary_fit');assert.equal(result.fit,f.fit);assert.equal(result.matches.length,0);assert(result.excludedInterventions.includes(f.excluded));});
test('normalization handles accents/case/punctuation; unsupported questions stay unmatched',()=>{assert.equal(retrieveAnswer(r,' COMPRAMOS UN CRM, PERO NADIE LO UTILIZA!! ').matches[0].answerId,'answer:tecnologia-sin-estructura');for(const q of ['','¿Qué terapia médica debo tomar?','Menú digital','Quiero comprar café'])assert.equal(retrieveAnswer(r,q).state,'unmatched');});
test('no automatic Frente Comercial, Ruta90 or automation without relevant context',()=>{const q='Tenemos mucha capacidad técnica pero nuestra web no la refleja.';assert(!retrieveAnswer(r,q).matches[0].possibleInterventions.includes('offering:frente-comercial'));assert(retrieveAnswer(r,q,{offerExists:true,representationGap:true}).matches[0].possibleInterventions.includes('offering:frente-comercial'));const route='¿Qué es Ruta 90?';assert(!retrieveAnswer(r,route,{priorityIdentified:true}).matches[0].possibleInterventions.includes('method:ruta90'));assert(retrieveAnswer(r,route,{priorityIdentified:true,executionCapacity:true}).matches[0].possibleInterventions.includes('method:ruta90'));const tech='Compramos un CRM pero nadie lo utiliza.';assert(!retrieveAnswer(r,tech).matches[0].possibleInterventions.includes('offering:automatizacion'));});
test('entity answers expose application context without diagnosing the requester',()=>{for(const a of r.answers.filter(a=>a.id.startsWith('answer:entidad-'))){assert.equal(a.problemRole,'application_context');assert(a.problemIds.length&&a.capabilityIds.length);}});
test('answer claim source limits are conserved verbatim, including interaction and method attribution',()=>{for(const a of r.answers){const b=r.bundles.find(b=>b.id===a.citationBundleId)!;for(const id of a.claimIds){const c=r.publicClaims.find(c=>c.id===id)!;const s=b.assertions.find(s=>s.claimId===id)!;assert.equal(s.attributionLimit,c.attributionLimit);assert.deepEqual(s.sourceIds,c.supportedBy);assert(s.sourceIds.every(id=>r.publicSources.some(s=>s.id===id)));}}assert.match(r.answers.find(a=>a.id==='answer:evidencia-comercial')!.answer,/3,564 conversaciones iniciadas/);assert.match(r.answers.find(a=>a.id==='answer:entidad-ruta90')!.answer,/adoptado y utilizado/);});
const mutations:[string,(a:ReturnType<typeof compileRetrieval>)=>void,string][]=[
 ['orphan intent',x=>x.answers[0].intentIds.pop(),'Intent requires'],
 ['empty limitations',x=>x.answers[0].limitations=[],'lacks support'],
 ['missing asset',x=>x.answers[0].primaryAsset='asset:unknown','Missing primary'],
 ['unsupported claim',x=>x.answers[0].claimIds.push('claim:fake'),'Invalid Claim'],
 ['wrong source chain',x=>x.bundles[0].assertions[0].sourceIds=[],'Attribution chain'],
 ['public hypothesis',x=>x.answers[0].status='hypothesis' as never,'Unapproved'],
 ['guaranteed results',x=>x.answers[0].answer='RAUVIA garantiza resultados','Guarantee'],
 ['false authorship',x=>x.answers[0].answer='Ruta 90 es desarrollado por RAUVIA.','False method'],
 ['interaction as clients',x=>x.answers[0].answer='3,564 clientes adquiridos','Interaction'],
 ['keyword stuffing',x=>x.answers[0].answer='RAUVIA '.repeat(20),'Keyword'],
 ['missing query',x=>x.archetypes[0].queries=[],'natural query'],
 ['missing capability',x=>x.answers[0].capabilityIds=[],'problem/capability']
];
for(const [label,mutate,error] of mutations)test('retrieval audit rejects '+label,()=>{const fixture=structuredClone(r);mutate(fixture);assert(validateRetrieval(fixture).some(e=>e.includes(error)),label);});
test('compiler is offline, deterministic, generated artifacts are current and public output has no private fields',()=>{const old=globalThis.fetch;globalThis.fetch=()=>{throw new Error('network prohibited');};try{assert.deepEqual(compileRetrieval().outputs,r.outputs);}finally{globalThis.fetch=old;}for(const [file,body] of Object.entries(r.outputs)){assert.equal(fs.readFileSync(file,'utf8'),body,file);if(file.startsWith('public/'))assert.doesNotMatch(body,/matchGroups|repositoryRef|privateNotes|"visibility":\s*"internal"|"status":\s*"hypothesis"|vertical:restaurant|\/Users\//);}});
test('editorial alignment preserves the ten metadata records',()=>{assert.equal(r.alignment.length,10);assert(r.alignment.every(row=>['KEEP','UPDATE'].includes(String(row[8]))));assert(r.gaps.every(g=>g.publication==='not_authorized'));});
