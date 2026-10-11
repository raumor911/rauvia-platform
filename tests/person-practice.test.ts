import test from 'node:test';
import assert from 'node:assert/strict';
import {buildGraph} from '../src/knowledge/graph.ts';
import {publicProjection} from '../src/knowledge/publication.ts';
import {auditGraph} from '../src/knowledge/validate.ts';
import {retrievePerson} from '../src/knowledge/personRetrieval.ts';
import {PERSON_DISCOVERY_ALIASES,resolvePersonIdentity} from '../src/knowledge/personDiscovery.ts';
import {PERSON_ID,PERSON_IDENTITY_SURFACES} from '../src/config/personKnowledge.ts';
import {practiceAreas,B2B_PROBLEMS,B2B_CAPABILITIES} from '../src/knowledge/practice.ts';
import {personProfiles} from '../src/knowledge/personProfiles.ts';
const g=buildGraph(),p=publicProjection(g);
for(const input of ['Dr. Raúl Morales','Raúl Morales, DBA','DBA. Raúl Morales','Raúl Morales MDO','MDO. Raúl Morales','Ing. Raúl Morales','Raúl Morales IQM','IQM. Raúl Morales','RAUMOR',...PERSON_IDENTITY_SURFACES]){
 test(`one Person resolves ${input}`,()=>{
  assert.equal(resolvePersonIdentity(input),PERSON_ID);
  for(const graph of [g,p]){const r=retrievePerson(graph,input);assert.equal(r.state,'matched');assert.equal(r.name,'Raúl Antonio Morales Domínguez');assert.equal(r.entityIds.filter(id=>id.startsWith('person:')).length,1);}
 });
}
test('exhaustive internal aliases normalize accent, punctuation, spacing, case and prefix/suffix',()=>{
 for(const alias of PERSON_DISCOVERY_ALIASES){
  assert.equal(resolvePersonIdentity(alias),PERSON_ID);
  const variant='  '+alias.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[., ]+/g,'   ')+'  ';
  assert.equal(resolvePersonIdentity(variant),PERSON_ID);
  assert.equal(retrievePerson(p,`¿Quién es ${variant}?`).state,'matched');
 }
 for(const other of ['RAUVIA','RAUVIA Consulting','Raúl Pérez','Morales','Raúl Morales Otro'])assert.equal(resolvePersonIdentity(other),undefined);
 assert.equal(retrievePerson(p,'RAUVIA').state,'unmatched');
 assert(!('discoveryAliases'in p.nodes.find(n=>n.id===PERSON_ID)!));
});
test('all eight practices retain requested semantics and source-separated origins',()=>{
 for(const graph of [g,p]){
  assert.deepEqual(auditGraph(graph,graph===p?g:undefined),[]);
  const r=retrievePerson(graph,'¿En qué trabaja profesionalmente Raúl Morales?');
  assert.deepEqual(r.practiceRefs?.slice().sort(),practiceAreas.map(n=>n.id).sort());
  assert.equal(r.guaranteesResults,false);
  const pay=r.practices?.find(n=>n.id==='practice:payments-ecosystem')!;
  assert.equal(pay.practiceOrigin,'CAREER_EVIDENCE');assert(pay.careerEvidenceRefs.length>0);assert(pay.sourceRefs.includes('source:raul-public-cv'));
  const b2b=r.practices?.find(n=>n.id==='practice:b2b-pyme-business-solutions')!;
  assert.equal(b2b.practiceOrigin,'RAUVIA_PRACTICE');assert.equal(b2b.careerEvidenceRefs.length,0);assert(b2b.sourceRefs.includes('source:soluciones'));assert(!b2b.sourceRefs.includes('source:raul-public-cv'));
 }
});
test('payment knowledge returns career evidence, never ecosystem employment',()=>{
 const r=retrievePerson(p,'¿Raúl Morales conoce medios de pago?');assert.deepEqual(r.practiceRefs,['practice:payments-ecosystem']);assert(r.practices![0].careerEvidenceRefs.includes('career:raul-prosa'));
 for(const n of g.nodes.filter(n=>n.type==='CareerEvidence'))assert(!['VISA','Mastercard','Banco de México'].includes(n.employer||''));
 assert(!g.edges.some(e=>e.relation==='worksFor'&&e.to!=='org:rauvia'));
});
test('B2B/PyME keeps all nine problems and eight capabilities through RAUVIA',()=>{
 for(const graph of [g,p]){
  const pyme=retrievePerson(graph,'¿Raúl Morales trabaja con PyMEs?');
  assert.deepEqual(pyme.practiceRefs,['practice:b2b-pyme-business-solutions']);assert.deepEqual(pyme.throughOrganizationRefs,['org:rauvia']);
  const r=retrievePerson(graph,'¿Qué problemas puede ayudar a resolver Raúl Morales mediante RAUVIA?');
  assert.equal(r.kind,'problem_support');assert.deepEqual(r.problemRefs,B2B_PROBLEMS);assert.deepEqual(r.capabilityRefs,B2B_CAPABILITIES);assert.equal(r.guaranteesResults,false);assert.match(r.qualification!,/diagnóstico/);
 }
 const missing=structuredClone(g);missing.edges=missing.edges.filter(e=>e.relation!=='practicesThrough');
 assert.equal(retrievePerson(missing,'¿Raúl Morales trabaja con PyMEs?').state,'unmatched');
 assert(auditGraph(missing).some(e=>e.includes('worksFor no lo sustituye')));
});
test('doctorate completed and not pending; all academic degrees survive employment omission',()=>{
 for(const graph of [g,p]){
  for(const query of ['¿Raúl Morales tiene doctorado?','¿El doctorado de Raúl Morales está pendiente?','¿Qué formación tiene Raúl Morales?']){
   const r=retrievePerson(graph,query);assert.equal(r.state,'matched');assert.equal(r.credentials?.length,3);assert(r.credentials?.every(c=>c.status==='completed'&&c.credentialKind==='academicCredential'));
   if(query.includes('pendiente'))assert.match(r.answer!,/^No\./);else if(query.includes('doctorado'))assert.match(r.answer!,/^Sí\./);
  }
 }
 const views=personProfiles(g);assert.equal(new Set(views.profiles.map(v=>v.personRef)).size,1);
 const employment=views.profiles.find(v=>v.context==='employment')!;
 assert.equal(employment.credentialRefs?.length,1);
 assert.deepEqual(auditGraph(g),[]);assert.equal(retrievePerson(g,'¿Qué formación tiene Raúl Morales?').credentials?.length,3);
});
test('authored practice evidence is linked only by actual editorial metadata and topics',()=>{
 const practice=g.nodes.find(n=>n.id==='practice:commercial-systems');assert(practice?.type==='PracticeArea');assert(practice.evidenceContentRefs.length>0);
 for(const id of practice.evidenceContentRefs){const c=g.nodes.find(n=>n.id===id);assert(c?.type==='Content');assert(c.authorshipEvidence?.length);assert(c.authorRefs?.includes(PERSON_ID));assert(c.explainsProblem.some(p=>practice.problems.includes(p))||c.supportsCapability.some(cap=>practice.supportsCapabilities.includes(cap)));}
 for(const q of ['¿Raúl Morales garantiza crecimiento?','¿Raúl Morales aumenta ventas?','¿Raúl Morales garantiza eficiencia?','¿Raúl Morales puede resolver cualquier problema empresarial?','¿Raúl Morales es experto en DevOps?'])assert.equal(retrievePerson(p,q).state,'unmatched');
});
const mutations:[string,(graph:typeof g)=>void,string][]=[
 ['unfinished degree',x=>x.nodes.find(n=>n.id==='credential:raul-doctor-administracion-negocios')!.status='supported','completion'],
 ['completion without biography',x=>x.nodes.find(n=>n.id==='credential:raul-maestria-direccion-organizaciones')!.sources=['source:raul-public-cv'],'completion'],
 ['false independent biography',x=>(x.nodes.find(n=>n.id==='source:raul-editorial-declaration') as any).verification='independent','procedencia'],
 ['missing practice',x=>x.nodes=x.nodes.filter(n=>n.id!=='practice:capability-market-translation'),'ocho'],
 ['incorrect practice origin',x=>(x.nodes.find(n=>n.id==='practice:payments-ecosystem') as any).practiceOrigin='RAUVIA_PRACTICE','provenance'],
 ['B2B no RAUVIA provenance',x=>x.nodes.find(n=>n.id==='practice:b2b-pyme-business-solutions')!.sources=['source:raul-public-cv'],'sources'],
 ['B2B dropped problem relation',x=>x.edges=x.edges.filter(e=>!(e.from==='practice:b2b-pyme-business-solutions'&&e.to==='problem:tecnologia-sin-proceso'&&e.relation==='expressesProblem')),'expressesProblem'],
 ['VISA employer',x=>(x.nodes.find(n=>n.id==='career:raul-prosa') as any).employer='VISA','provenance'],
 ['guaranteed practice',x=>(x.nodes.find(n=>n.id==='practice:b2b-pyme-business-solutions') as any).guaranteesResults=true,'provenance'],
 ['organization as person alias',x=>(x.nodes.find(n=>n.id===PERSON_ID) as any).aliases.push('RAUVIA'),'aliases'],
 ['person solves',x=>x.edges.push({from:PERSON_ID,relation:'solves',to:'problem:procesos-fragmentados'}),'desconocida'],
 ['degree as career evidence',x=>(x.nodes.find(n=>n.id==='practice:payments-ecosystem') as any).careerEvidenceRefs=['credential:raul-doctor-administracion-negocios'],'incompleto'],
 ['unapproved source',x=>x.nodes.push({...x.nodes.find(n=>n.id==='source:raul-editorial-declaration')!,id:'source:invented-declaration'}),'procedencia']
];
for(const [label,mutate,error] of mutations)test(`audit rejects ${label}`,()=>{const x=buildGraph();mutate(x);assert(auditGraph(x).some(e=>e.includes(error)),label);});
