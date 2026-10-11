import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildGraph} from '../src/knowledge/graph.ts';
import {compileKnowledge} from '../src/knowledge/compiler.ts';
import {auditGraph,assertGraph} from '../src/knowledge/validate.ts';
import {publicProjection} from '../src/knowledge/publication.ts';
import {retrieve} from '../src/knowledge/retrieval.ts';
import {detectGaps} from '../src/knowledge/coverage.ts';
import {normalizeFamily,type Graph} from '../src/knowledge/types.ts';
const mutate=(id:string,fields:Record<string,unknown>)=>{const g=buildGraph();Object.assign(g.nodes.find(n=>n.id===id)!,fields);return g;};
test('typed master and public graphs satisfy all invariants',()=>{const g=buildGraph();assertGraph(g);assertGraph(publicProjection(g),g);assert.equal(g.nodes.filter(n=>n.type==='Intent').length,73);assert.equal(g.nodes.filter(n=>n.type==='Organization').length,1);});
test('identity references, six ICPs and six verticals are separate',()=>{const g=buildGraph();assert.equal(g.nodes.filter(n=>n.type==='ICP').length,6);assert.equal(g.nodes.filter(n=>n.type==='Vertical').length,6);assert.equal(g.nodes.find(n=>n.id==='system:aethryon')?.type,'System');assert.equal(g.nodes.find(n=>n.id==='method:ruta90')?.type,'Method');});
test('family aliases preserve compatibility without rewriting historical queries',()=>{for(const [a,b] of Object.entries({PRO:'PROBLEM',SOL:'SOLUTION',CAT:'CATEGORY',PRV:'PROVIDER',CMP:'COMPARISON',USE:'USE_CASE',CTL:'ENTITY'}))assert.equal(normalizeFamily(a),b);assert.equal(normalizeFamily('UNKNOWN'),undefined);});
test('compiler is offline and byte deterministic',()=>{const old=globalThis.fetch;globalThis.fetch=()=>{throw new Error('network prohibited');};try{assert.deepEqual(compileKnowledge().outputs,compileKnowledge().outputs);}finally{globalThis.fetch=old;}});
test('public projection rejects internal and unapproved references; excludes hypotheses',()=>{const g=buildGraph(),p=publicProjection(g);assert(!JSON.stringify(p).includes('vertical:restaurant'));assert(!JSON.stringify(p).includes('vertical:export-business'));assert(!JSON.stringify(p).includes('repositoryRef'));assert(!JSON.stringify(p).includes('matchGroups'));const n=g.nodes.find(n=>n.id==='source:soluciones')!;n.visibility='internal';n.publication.approved=false;assert(auditGraph(publicProjection(g),g).some(e=>e.includes('colgante')));});
test('allowlist strips accidental private fields and audit rejects a manually injected leak',()=>{const g=mutate('org:rauvia',{privateNotes:'internal prompt',repositoryRef:'/Users/private/file'});const p=publicProjection(g);assert(!JSON.stringify(p).includes('internal prompt'));p.nodes[0].password='secret';assert(auditGraph(p,g).some(e=>e.includes('Campo no autorizado')));delete p.nodes[0].password;p.nodes[0].description='/Users/secret/prompts';assert(auditGraph(p,g).some(e=>e.includes('privado')));});
const negative:[string,()=>Graph,string][]=[
 ['duplicate ID',()=>{const g=buildGraph();g.nodes.push(structuredClone(g.nodes[0]));return g;},'duplicado'],
 ['duplicate organization',()=>{const g=buildGraph();g.nodes.push({...structuredClone(g.nodes.find(n=>n.type==='Organization')!),id:'org:duplicate'});return g;},'Organization única'],
 ['canonical collision',()=>mutate('asset:soluciones',{canonical:'https://rauvia.com.mx/'}),'duplicada'],
 ['unknown asset',()=>mutate('asset:soluciones',{canonical:'https://rauvia.com.mx/no-existe/'}),'no existente'],
 ['empty intent expressions',()=>mutate('intent:crm-pyme',{expressions:[]}),'sin expresión'],
 ['orphan context',()=>mutate('intent:crm-pyme',{mapsToProblems:[],contexts:[]}),'sin Problem'],
 ['result without source',()=>mutate('claim:benchmark-interno',{supportedBy:[]}),'sin Source'],
 ['source not source',()=>mutate('claim:benchmark-interno',{supportedBy:['asset:soluciones']}),'Tipo de referencia'],
 ['unsupported observed evidence',()=>mutate('intent:crm-pyme',{evidenceState:'human_observed'}),'sin soporte'],
 ['unknown evidence state',()=>mutate('intent:crm-pyme',{evidenceState:'high_demand'}),'inválido'],
 ['false AETHRYON type',()=>mutate('system:aethryon',{type:'Offering'}),'AETHRYON debe'],
 ['false Ruta90 authorship field',()=>mutate('method:ruta90',{createdBy:'org:rauvia'}),'Campo no autorizado'],
 ['false Ruta90 authored claim',()=>mutate('claim:ruta90-adoptado',{text:'Ruta 90 fue desarrollado por RAUVIA.'}),'Falsa atribución'],
 ['new claim with false Ruta90 authorship',()=>mutate('claim:rauvia-identidad',{text:'RAUVIA creó Ruta 90.'}),'falsa autoría'],
 ['benchmark presented as sales',()=>mutate('claim:benchmark-interno',{outcome:'sales'}),'Benchmark'],
 ['interaction presented as sales',()=>mutate('claim:conversaciones-reportadas',{outcome:'sales'}),'Interacción'],
 ['construction as completed result',()=>mutate('claim:trazabilidad-en-construccion',{claimType:'result'}),'Construcción'],
 ['case guarantee',()=>mutate('case:infraestructura-temporal-b2b',{guaranteesResults:true}),'garantía'],
 ['unproven causality',()=>mutate('claim:benchmark-interno',{causalStatus:'supported'}),'Causalidad'],
 ['private source URL',()=>mutate('source:soluciones',{url:'https://rauvia.com.mx/soluciones/?token=secret'}),'URL inválida'],
 ['hypothesis approved',()=>mutate('vertical:restaurant',{visibility:'public',publication:{approved:true,basis:'editorial_model'}}),'no aislada']
];
for(const [label,fixture,expected] of negative)test(`audit rejects ${label}`,()=>assert(auditGraph(fixture()).some(e=>e.includes(expected)),label));
for(const [relation,from,to] of [['relatedTo','intent:crm-pyme','problem:tecnologia-sin-proceso'],['guaranteedSolution','problem:dependencia-fundador','offering:arquitectura-operativa'],['createdBy','method:ruta90','org:rauvia'],['developedBy','method:ruta90','org:rauvia'],['targetsICP','intent:crm-pyme','vertical:medical'],['expressesProblem','intent:crm-pyme','problem:missing']])test(`audit rejects invalid edge ${relation} ${to}`,()=>{const g=buildGraph();g.edges.push({from,relation,to});assert(auditGraph(g).length>0);});
test('unconditional Ruta90 or direct AETHRYON→Ruta90 is rejected',()=>{const g=buildGraph();g.edges.push({from:'system:aethryon',relation:'mayLeadTo',to:'method:ruta90'});assert(auditGraph(g).some(e=>e.includes('obligatoriamente')));assert(auditGraph(g).some(e=>e.includes('condición')));});
const scenarios:[string,string,string[],string[]][]=[
 ['Tengo prospectos pero después de cotizar no sé qué ocurrió.','intent:cotizaciones-sin-seguimiento',['problem:oportunidades-sin-trazabilidad','capability:seguimiento-comercial-estructurado','offering:sistema-comercial'],[]],
 ['Mi empresa depende demasiado de mí.','intent:empresa-depende-del-dueno',['problem:dependencia-fundador','restriction:centralizacion-operativa','capability:autonomia-operativa','system:aethryon','offering:arquitectura-operativa'],[]],
 ['Soy consultor y mi página no explica bien qué hago.','intent:servicio-dificil-de-explicar',['vertical:professional-services','problem:oferta-poco-clara','capability:representacion-comercial','offering:frente-comercial'],[]],
 ['Tenemos mucha capacidad técnica pero nuestra web no la refleja.','intent:capacidad-tecnica-no-se-percibe',['vertical:technical-b2b','problem:brecha-capacidad-percepcion','capability:traduccion-comercial','offering:frente-comercial'],[]],
 ['Soy médico especialista y quiero que entiendan qué atiendo, dónde consulto y cómo contactarme.','intent:pagina-web-medicos-especialistas',['vertical:medical','capability:informacion-especialidad','capability:ubicacion-clara','capability:contacto-claro'],['asset:pagina-web-medicos-especialistas','asset:seo-local-medicos']]
];
for(const [query,intent,expected,assets] of scenarios)test(`retrieval: ${intent}`,()=>{const result=retrieve(buildGraph(),query);assert.equal(result.state,'matched');const row=result.matches[0];assert.equal(row.intent,intent);const ids=[...row.problems,...row.restrictions,...row.capabilities,...row.possibleInterventions,...row.verticals];for(const id of expected)assert(ids.includes(id),id);for(const id of assets)assert([row.primaryAsset,...row.supportingAssets].includes(id),id);});
test('paraphrases, accent/case normalization and unknown inputs remain deterministic',()=>{for(const q of ['Mis cotizaciones se pierden y no sé qué ocurrió','Mi negocio depende del dueño para todo','Soy consultor, mi web no dice qué hago','Nuestra capacidad técnica no aparece en el sitio','MÉDICO ESPECIALISTA: quiero una web'])assert.equal(retrieve(buildGraph(),q).state,'matched',q);for(const q of ['','Quiero comprar café','Menú digital'])assert.equal(retrieve(buildGraph(),q).state,'unmatched');});
test('ambiguous input does not silently select an offering',()=>{const r=retrieve(buildGraph(),'Soy consultor, mi página no explica qué hago; mi empresa depende de mí');assert.equal(r.state,'ambiguous');assert.equal(r.matches.length,2);});
test('Ruta90 requires identified priority AND execution capacity, never inferred from query',()=>{const g=buildGraph(),q='Mi empresa depende demasiado de mí.';assert(!retrieve(g,q).matches[0].possibleInterventions.includes('method:ruta90'));assert(!retrieve(g,q,{priorityIdentified:true}).matches[0].possibleInterventions.includes('method:ruta90'));assert(retrieve(g,q,{priorityIdentified:true,executionCapacity:true}).matches[0].possibleInterventions.includes('method:ruta90'));});
test('all seven gap classes have operational detectors, including broken graph fixtures',()=>{const g=buildGraph();const i=g.nodes.find(n=>n.id==='intent:crm-pyme')!;Object.assign(i,{assets:[],primaryAsset:undefined});g.edges=g.edges.filter(e=>e.from!=='intent:crm-pyme'&&e.to!=='problem:tecnologia-sin-proceso'&&!(e.relation==='requiresCapability'&&e.to==='capability:medicion')&&e.from!=='content:wp-18');const found=new Set(detectGaps(g).map(x=>x.type));for(const type of ['ASSET_GAP','CONTENT_GAP','EVIDENCE_GAP','ORPHAN_INTENT','ORPHAN_PROBLEM','ORPHAN_CAPABILITY','UNLINKED_CONTENT'])assert(found.has(type as never),type);});
test('coverage makes no numeric demand scores; private gaps stay internal',()=>{const c=compileKnowledge();assert(c.coverage.every(r=>['HIGH','MEDIUM','LOW','HYPOTHESIS'].includes(r.coverage)));assert(c.coverage.every(r=>r.evidenceState==='editorial'));assert.equal(c.publicCoverage.intents.length,64);assert(!JSON.stringify(c.publicCoverage).includes('HYPOTHESIS'));assert(!Object.keys(c.outputs).some(p=>p.startsWith('public/')&&p.includes('master')));});
test('WordPress metadata matches stored public snapshots; article bodies stay outside graph',()=>{const g=buildGraph();for(const n of g.nodes){if(n.type!=='Content')continue;const value=JSON.parse(fs.readFileSync(n.repositoryRef!,'utf8'));const post=Array.isArray(value)?value.find(p=>p.id===Number(n.id.slice(11))):value;assert.equal(n.title,post.title.rendered);assert.equal(n.slug,post.slug);assert.equal(n.publishedAt,post.date);assert(!('content'in n));assert(!('excerpt'in n));}});
test('public edges and root cannot bypass privacy allowlist',()=>{const g=buildGraph(),p=publicProjection(g);p.edges[0].condition='/Users/private/prompt';assert(auditGraph(p,g).some(e=>e.includes('privado')));Object.assign(p,{internalPrompts:['hidden']});assert(auditGraph(p,g).some(e=>e.includes('grafo no autorizado')));});
test('knowledge output compilation emits data and documents only',()=>{const c=compileKnowledge();assert(Object.keys(c.outputs).every(p=>/\.(json|csv|md)$/.test(p)));});
