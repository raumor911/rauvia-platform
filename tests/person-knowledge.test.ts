import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildGraph} from '../src/knowledge/graph.ts';
import {compileKnowledge} from '../src/knowledge/compiler.ts';
import {publicProjection} from '../src/knowledge/publication.ts';
import {auditGraph} from '../src/knowledge/validate.ts';
import {retrievePerson} from '../src/knowledge/personRetrieval.ts';
import {editorialAuthorship,authorshipSnapshot} from '../src/knowledge/person.ts';
import {PERSON_CREDENTIALS} from '../src/knowledge/person.ts';
import {personSchema} from '../src/seo/personSchema.ts';
import {schemasFor} from '../src/seo/buildMetaTags.ts';
const g=buildGraph(),p=publicProjection(g);
const node=(id:string)=>g.nodes.find(n=>n.id===id)!;
test('TEST 1: canonical founder/director resolves one Person and Organization',()=>{
 for(const q of ['¿Quién es Raúl Morales de RAUVIA?','¿Quién fundó RAUVIA?','¿Quién dirige estratégicamente RAUVIA?','¿Qué relación tiene Raúl Morales con RAUVIA?']){
  const r=retrievePerson(g,q);assert.equal(r.state,'matched');assert.deepEqual(r.entityIds,['person:raul-morales','org:rauvia']);
 }
 assert.equal(g.nodes.filter(n=>n.type==='Person').length,1);
 assert.equal((node('person:raul-morales') as any).schemaId,'https://rauvia.com.mx/#raul-morales');
 assert(g.edges.some(e=>e.from==='person:raul-morales'&&e.relation==='representedBy'&&e.to==='asset:nosotros'));
});
test('TEST 2: personal URL is HTTPS and differs from stable entity identifier',()=>{
 const r=retrievePerson(p,'¿Cuál es el sitio de Raúl Morales?');assert.equal(r.url,'https://raulmorales.com.mx/');assert.notEqual(r.url,r.schemaId);
});
test('TEST 3: three academic credentials with first-party limits, approved biography and contextual CV guard',()=>{
 const r=retrievePerson(g,'¿Qué formación académica tiene Raúl Morales?');
 assert.deepEqual(r.credentials?.map(c=>c.name).sort(),PERSON_CREDENTIALS.map(c=>c.name).sort());
 for(const c of PERSON_CREDENTIALS){const n=node('credential:'+c.key),claim=node('claim:'+c.key) as any;assert.equal(n.evidenceState,'editorial');assert.deepEqual(n.sources,[...new Set([c.sourceId,'source:raul-editorial-declaration'])]);assert.equal(claim.causalStatus,'not_applicable');assert.equal(claim.guaranteesResults,false);assert.equal(claim.claimType,'factual');assert(n.sources.every(id=>node(id).type==='Source'));}
 const publicResult=retrievePerson(p,'¿Qué formación académica tiene Raúl Morales?');assert.equal(publicResult.credentials?.length,3);assert(publicResult.credentials?.every(c=>c.status==='completed'));
 assert(publicResult.credentials?.some(c=>String(c.name).includes('Doctor')));
});
test('TEST 4: Ruta90 remains an adopted Method without founder authorship',()=>{
 const r=retrievePerson(p,'¿Raúl Morales creó Ruta 90?');assert.equal(r.authored,false);assert.equal(r.methodId,'method:ruta90');assert.match(r.answer!,/adoptado y utilizado/);
 assert.equal(node('method:ruta90').type,'Method');
});
test('TEST 5: article authorship uses actual editorial metadata, never publisher inference',()=>{
 assert.equal(authorshipSnapshot.posts.length,10);
 for(const post of authorshipSnapshot.posts){const r=retrievePerson(p,'¿Raúl Morales es autor de este artículo?',{contentId:'content:wp-'+post.id});assert.equal(r.authorship,'editorially_supported');assert(r.sourceRefs?.includes('source:wp-author-raul'));}
 assert.equal(retrievePerson(g,'¿Raúl Morales es autor de este artículo?',{contentId:'content:wp-999'}).state,'unmatched');
 const missing=structuredClone(g);const c=missing.nodes.find(n=>n.id==='content:wp-45') as any;c.authorRefs=[];c.authorshipEvidence=[];missing.edges=missing.edges.filter(e=>!(e.from===c.id&&e.relation==='authoredBy'));
 assert.equal(retrievePerson(missing,'¿Raúl Morales es autor de este artículo?',{contentId:c.id}).authorship,'not_established');
 missing.edges.push({from:c.id,relation:'authoredBy',to:'person:raul-morales'});
 assert.equal(retrievePerson(missing,'¿Raúl Morales es autor de este artículo?',{contentId:c.id}).authorship,'not_established');
});
test('resolver rejects missing metadata, foreign author, unknown author ID or mismatched slug',()=>{
 assert.deepEqual(editorialAuthorship(999,'missing'),[]);
 assert.deepEqual(editorialAuthorship(45,'wrong-slug'),[]);
 const foreign=structuredClone(authorshipSnapshot);foreign.authors[0].name='Otro autor';assert.deepEqual(editorialAuthorship(45,foreign.posts.find(p=>p.id===45)!.slug,foreign),[]);
 const unknown=structuredClone(authorshipSnapshot);unknown.posts.find(p=>p.id===45)!.authorId=999;assert.deepEqual(editorialAuthorship(45,unknown.posts.find(p=>p.id===45)!.slug,unknown),[]);
});
test('unsupported person questions remain unmatched; credentials never become expertise',()=>{
 assert.equal(retrievePerson(p,'¿Qué edad tiene Raúl Morales?').state,'unmatched');
 assert.equal(retrievePerson(p,'¿Es Raúl Morales un experto universal?').state,'unmatched');
 assert.doesNotMatch(JSON.stringify(personSchema()),/knowsAbout|expertise|specialization|recognizedBy/);
});
test('Person authoredContent is derived; each authored Content has separate RAUVIA publisher',()=>{
 const refs=(node('person:raul-morales') as any).publicAuthorRefs;
 assert.deepEqual(refs,g.edges.filter(e=>e.relation==='authoredBy').map(e=>e.from).sort());
 assert.equal(refs.length,10);for(const id of refs)assert(g.edges.some(e=>e.from==='org:rauvia'&&e.relation==='publishes'&&e.to===id));
});
test('JSON-LD generator uses Schema.org Person and public EducationalOccupationalCredential only',()=>{
 const data=personSchema();assert.equal(data['@type'],'Person');assert.equal(data['@id'],'https://rauvia.com.mx/#raul-morales');assert.equal(data.hasCredential.length,3);
 for(const c of data.hasCredential){assert.equal(c['@type'],'EducationalOccupationalCredential');if(c.name.startsWith('Doctor'))assert(!('citation'in c));else assert.match(c.citation!,/\/mi-cv\/$/);assert(!('recognizedBy'in c));}
 assert.equal(data.worksFor['@id'],'https://rauvia.com.mx/#organization');
 // Pure data function: old route declarations resolve the same canonical Person.
 const schemas=schemasFor({title:'Data test',description:'Data test',schema:[{'@type':'Person','@id':data['@id'],url:'https://rauvia.com.mx/nosotros'}]});
 assert.equal(schemas.filter(s=>(s as any)['@type']==='Person').length,1);assert.deepEqual(schemas.find(s=>(s as any)['@type']==='Person'),data);
 assert.deepEqual(JSON.parse(fs.readFileSync('data/knowledge/person-schema.json','utf8')),data);
});
const mutations:[string,(x:ReturnType<typeof buildGraph>)=>void,string][]=[
 ['second Person',x=>x.nodes.push({...structuredClone(node('person:raul-morales')),id:'person:duplicate'}),'Person única'],
 ['unstable schemaId',x=>Object.assign(x.nodes.find(n=>n.type==='Person')!,{schemaId:'https://raulmorales.com.mx/#person'}),'identidad estable'],
 ['HTTP personal site',x=>Object.assign(x.nodes.find(n=>n.type==='Person')!,{url:'http://raulmorales.com.mx/'}),'identidad estable'],
 ['invented identity',x=>Object.assign(x.nodes.find(n=>n.type==='Person')!,{sameAs:['https://orcid.org/fake']}),'sameAs'],
 ['credential without source',x=>x.nodes.find(n=>n.id==='credential:raul-maestria-direccion-organizaciones')!.sources=[],'provenance'],
 ['invented institution',x=>Object.assign(x.nodes.find(n=>n.type==='Credential')!,{institution:'Universidad inventada'}),'Campo no autorizado'],
 ['invented date',x=>Object.assign(x.nodes.find(n=>n.type==='Credential')!,{graduationDate:'2020-01-01'}),'Campo no autorizado'],
 ['degree as expertise',x=>Object.assign(x.nodes.find(n=>n.type==='Person')!,{knowsAbout:['Experto universal']}),'Campo no autorizado'],
 ['academic verified',x=>Object.assign(x.nodes.find(n=>n.id==='credential:raul-maestria-direccion-organizaciones')!,{evidenceState:'validated'}),'provenance'],
 ['duplicate credential',x=>x.nodes.push({...structuredClone(node('credential:raul-maestria-direccion-organizaciones')),id:'credential:duplicate'}),'duplicado'],
 ['claim without source',x=>Object.assign(x.nodes.find(n=>n.id==='claim:raul-maestria-direccion-organizaciones')!,{supportedBy:[]}),'provenance'],
 ['academic causal claim',x=>Object.assign(x.nodes.find(n=>n.id==='claim:raul-maestria-direccion-organizaciones')!,{causalStatus:'supported'}),'provenance'],
 ['arbitrary not_applicable',x=>Object.assign(x.nodes.find(n=>n.id==='claim:benchmark-interno')!,{causalStatus:'not_applicable'}),'fuera'],
 ['invented authorship metadata',x=>(x.nodes.find(n=>n.id==='content:wp-45') as any).authorshipEvidence[0].authorName='Otro autor','evidencia editorial'],
 ['nested private author field',x=>(x.nodes.find(n=>n.id==='content:wp-45') as any).authorshipEvidence[0].phone='private','Campo privado'],
 ['wrong authoredBy direction',x=>x.edges.push({from:'person:raul-morales',relation:'authoredBy',to:'content:wp-45'}),'mal tipada'],
 ['false Ruta90 author edge',x=>x.edges.push({from:'method:ruta90',relation:'authoredBy',to:'person:raul-morales'}),'mal tipada'],
 ['invented authoredContent',x=>Object.assign(x.nodes.find(n=>n.type==='Person')!,{publicAuthorRefs:['content:wp-999']}),'no derivados']
];
for(const [label,mutate,error] of mutations)test('person audit rejects '+label,()=>{const x=buildGraph();mutate(x);assert(auditGraph(x).some(e=>e.includes(error)),label);});
test('JSON generation is offline; private fields never escape public projection',()=>{
 const saved=globalThis.fetch;globalThis.fetch=()=>{throw new Error('No network');};try{const c=compileKnowledge();assert.deepEqual(auditGraph(c.publicGraph,c.graph),[]);for(const [file,body] of Object.entries(c.outputs)){if(file.endsWith('.json'))JSON.parse(body);assert.equal(fs.readFileSync(file,'utf8'),body,file);}}finally{globalThis.fetch=saved;}
 const x=buildGraph();Object.assign(x.nodes.find(n=>n.type==='Person')!,{phone:'private',academicFile:'/private/document',nationalId:'private'});assert.doesNotMatch(JSON.stringify(publicProjection(x)),/academicFile|nationalId|"phone"/);
 const leaked=structuredClone(p);Object.assign(leaked.nodes.find(n=>n.type==='Person')!,{nationalId:'private'});assert(auditGraph(leaked,g).some(e=>e.includes('no autorizado')));
});
