import {practiceAreas,careerEvidence} from './practice.ts';
import {PERSON_DISCOVERY_ALIASES} from './personDiscovery.ts';
import {ENTITIES} from '../config/entity.ts';
import {PERSON_ID,PERSONAL_SITE,PERSON_SAME_AS,PERSON_PUBLIC_ALIASES,PERSON_IDENTITY_SURFACES} from '../config/personKnowledge.ts';
import {editorialAuthorship,PERSON_CREDENTIALS} from './person.ts';
import {routeSeo} from '../seo/routeSeo.js';
import {RELATIONS} from './relations.ts';
import {allowedFields,isPublicStatus,type PublicGraph} from './publication.ts';
import {NODE_TYPES,STATUSES,EVIDENCE_STATES,FAMILIES,type Graph,type KnowledgeNode,type NodeType} from './types.ts';
export const REF_TYPES:Record<string,string[]>={practiceRefs:['PracticeArea'],careerEvidenceRefs:['CareerEvidence'],evidenceContentRefs:['Content'],throughOrganizationRefs:['Organization'],personRef:['Person'],credentialRefs:['Credential'],organizationRefs:['Organization'],publicAuthorRefs:['Content'],sourceRefs:['Source'],authorRefs:['Person'],claimRefs:['Claim'],sources:['Source'],assetRefs:['Asset'],evidenceRefs:['Source'],icps:['ICP'],verticals:['Vertical'],mapsToProblems:['Problem'],contexts:['Organization','Person','WebSite','System','Method','Concept'],assets:['Asset'],primaryAsset:['Asset'],territory:['TopicTerritory'],restrictions:['Restriction'],gaps:['CapabilityGap'],capabilities:['Capability'],interventions:['Offering'],coversIntent:['Intent'],explainsProblem:['Problem'],supportsCapability:['Capability'],representedOffering:['Offering'],source:['Source'],publisher:['Organization','Person'],supportedBy:['Source'],representedBy:['Asset'],supportsCapabilities:['Capability'],possibleForProblems:['Problem'],claims:['Claim'],vertical:['Vertical'],problems:['Problem']};
const arr=(value:unknown):unknown[]=>Array.isArray(value)?value:[];
const safeUrl=(value:unknown)=>{try{const u=new URL(String(value));return u.protocol==='https:'&&!u.username&&!u.password&&!u.search&&!u.hash;}catch{return false;}};
const privateText=/(?:\/Users\/|\/private\/|node_modules\/|file:\/\/|\bsk-[a-zA-Z0-9]{12,}|[?&](?:token|api_key|secret|password)=)/;
export function auditGraph(graph:Graph|PublicGraph,master?:Graph):string[]{
 const errors:string[]=[];const fail=(message:string)=>errors.push(message);
 const publicMode=graph.scope==='public';
 for(const key of Object.keys(graph))if(!['schema_version','graph_version','locale','scope','limitations','nodes','edges','views'].includes(key))fail(`Campo de grafo no autorizado: ${key}`);
 if(graph.schema_version!=='1.0.0'||graph.graph_version!=='1.0.0'||graph.locale!=='es-MX')fail('Graph version/locale inválido');
 const nodes=graph.nodes as unknown as Record<string,unknown>[];
 const index=new Map<string,Record<string,unknown>>();
 const urls=new Set<string>();
 const assetUrls=new Set(Object.values(routeSeo).map(v=>v.canonical));
 for(const n of nodes){
  const id=String(n.id),type=n.type as NodeType;
  if(!/^[a-z][a-z0-9-]*:[a-z0-9][a-z0-9-]*$/.test(id))fail(`ID inválido: ${id}`);
  if(index.has(id))fail(`ID duplicado: ${id}`);index.set(id,n);
  if(!NODE_TYPES.includes(type)){fail(`Tipo desconocido: ${id}`);continue;}
  if(n.status==='completed'&&type!=='Credential')fail(`Completed fuera de Credential: ${id}`);
  if(!STATUSES.includes(n.status as never)||!EVIDENCE_STATES.includes(n.evidenceState as never))fail(`Status/evidenceState inválido: ${id}`);
  for(const field of ['label','description','rationale'])if(typeof n[field]!=='string'||!String(n[field]).trim())fail(`Falta ${field}: ${id}`);
  for(const field of ['sources','assetRefs'])if(!Array.isArray(n[field]))fail(`Falta lista ${field}: ${id}`);
  if(!['public','internal'].includes(String(n.visibility)))fail(`Visibilidad inválida: ${id}`);
  const permitted=[...allowedFields(type),...(publicMode?[]:['publication','repositoryRef','privateNotes',...(type==='Intent'?['matchGroups']:[]),...(type==='Person'?['discoveryAliases']:[])])];
  for(const key of Object.keys(n))if(!permitted.includes(key))fail(`Campo no autorizado: ${id}.${key}`);
  if(publicMode){
   if(n.visibility!=='public'||!isPublicStatus(type,String(n.status)))fail(`Nodo interno/hipótesis público: ${id}`);
   if(privateText.test(JSON.stringify(n)))fail(`Dato privado público: ${id}`);
   const original=master?.nodes.find(m=>m.id===id);
   if(master&&(!original||!original.publication.approved||original.visibility!=='public'||!isPublicStatus(original.type,original.status)))fail(`Publicación no aprobada: ${id}`);
  }else{
   const p=n.publication as KnowledgeNode['publication']|undefined;
   if(!p||typeof p.approved!=='boolean'||!['existing_public_content','editorial_model','internal_hypothesis'].includes(p.basis))fail(`Aprobación editorial incompleta: ${id}`);
   if(n.status==='hypothesis'&&(n.visibility!=='internal'||p?.approved))fail(`Hipótesis no aislada: ${id}`);
  }
  if('canonical'in n){
   if(!safeUrl(n.canonical)||!String(n.canonical).startsWith('https://rauvia.com.mx/'))fail(`URL canónica inválida: ${id}`);
   if(urls.has(String(n.canonical)))fail(`URL canónica duplicada: ${id}`);urls.add(String(n.canonical));
   if(type==='Asset'&&!assetUrls.has(String(n.canonical)))fail(`Asset no existente en routeSeo: ${id}`);
  }
  if(type==='Asset'&&!n.canonical)fail(`Asset sin URL: ${id}`);
  if(type==='Source'){
   if(n.url&&!safeUrl(n.url))fail(`Source URL inválida: ${id}`);
   if(!['first_party_publication','wordpress_metadata','external_primary','internal_analysis','approved_declaration'].includes(String(n.kind))||!['published_self_report','editorial_snapshot','independent','unverified'].includes(String(n.verification)))fail(`Source sin procedencia: ${id}`);
   if(['source:raul-editorial-declaration','source:raul-career-declaration'].includes(id)&&n.kind!=='approved_declaration')fail(`Declaración aprobada sin procedencia: ${id}`);
   if(n.kind==='approved_declaration'&&(!['source:raul-editorial-declaration','source:raul-career-declaration'].includes(id)||n.publisher!==PERSON_ID||n.verification!=='editorial_snapshot'||n.declarationScope!==(id==='source:raul-editorial-declaration'?'biography':'career')||!n.snapshotDate||(!publicMode&&(n.publication as any)?.basis!=='editorial_model')))fail(`Declaración aprobada sin procedencia: ${id}`);
   if(publicMode&&(n.kind==='internal_analysis'||n.verification==='unverified'||(!n.url&&n.kind!=='approved_declaration')))fail(`Source privado o no publicable: ${id}`);
  }
  if(type==='Content'&&(n.editorialAuthority!=='WordPress'||!n.title||!n.slug||!n.source||!n.snapshotDate))fail(`Content sin metadata editorial: ${id}`);
  if(type==='Intent'){
   if(!FAMILIES.includes(n.family as never))fail(`Intent family inválida: ${id}`);
   if(['canonical','supported'].includes(String(n.status))&&!arr(n.expressions).some(e=>typeof e==='string'&&e.trim()))fail(`Intent sin expresión: ${id}`);
   if(!arr(n.mapsToProblems).length&&!arr(n.contexts).length)fail(`Intent sin Problem/contexto: ${id}`);
   if(n.primaryAsset&&!arr(n.assets).includes(n.primaryAsset))fail(`PrimaryAsset fuera de assets: ${id}`);
  }
  if(type==='Claim'){
   if(!['factual','capability','observed','result'].includes(String(n.claimType)))fail(`ClaimType inválido: ${id}`);
   if(!arr(n.supportedBy).length)fail(`Claim sin Source: ${id}`);
   for(const f of ['text','scope','period','attributionLimit'])if(!n[f])fail(`Claim sin ${f}: ${id}`);
   if(n.guaranteesResults!==false||!['not_established','supported','not_applicable'].includes(String(n.causalStatus)))fail(`Claim garantía/causalidad inválida: ${id}`);
   if(n.causalStatus==='not_applicable'&&(n.claimType!=='factual'||!PERSON_CREDENTIALS.some(c=>'claim:'+c.key===id)))fail(`Causalidad not_applicable fuera de claim académico factual: ${id}`);
   if(n.causalStatus==='supported'&&(!arr(n.evidenceRefs).length||n.evidenceState!=='validated'))fail(`Causalidad sin validación: ${id}`);
   if(n.measurementKind==='internal_benchmark'&&n.outcome==='sales')fail(`Benchmark interpretado como ventas: ${id}`);
   if(n.measurementKind==='interaction_count'&&n.outcome==='sales')fail(`Interacción interpretada como ventas: ${id}`);
   if(n.fulfilmentState==='in_construction'&&(n.claimType==='result'||n.outcome==='sales'))fail(`Construcción interpretada como resultado: ${id}`);
   if(id==='claim:ruta90-adoptado'&&!/método adoptado y utilizado/i.test(String(n.text)))fail('Falsa atribución de Ruta 90');
   if(/(?:Ruta\s*90.*(?:cread[oa]|desarrollad[oa]|diseñad[oa]|autoría)|(?:RAUVIA|Morales).*(?:creó|desarrolló|creador|autor de).*Ruta\s*90)/i.test(String(n.text)))fail('Claim con falsa autoría de Ruta 90');
  }
  if(['Case','UseCase'].includes(type)&&n.guaranteesResults!==false)fail(`Case/UseCase presentado como garantía: ${id}`);
  if(type==='Case'&&n.causalStatus!=='not_established')fail(`Case con causalidad no sustentada: ${id}`);
  if(id==='method:ruta90'&&/(?:cread[oa]|desarrollad[oa]|diseñad[oa]|autoría)/i.test(String(n.description)))fail('Method con falsa autoría de Ruta 90');
 }
 for(const c of PERSON_CREDENTIALS){
  const credential=index.get('credential:'+c.key),claim=index.get('claim:'+c.key);
  if(credential?.status!=='completed'||credential.credentialKind!=='academicCredential'||!arr(credential.sources).includes('source:raul-editorial-declaration'))fail(`Credential completion/provenance inválida: ${c.key}`);
  if(credential?.type!=='Credential'||credential.name!==c.name||credential.credentialCategory!==c.credentialCategory)fail(`Credential canónico requerido: ${c.key}`);
  if(nodes.filter(n=>n.type==='Credential'&&n.name===c.name).length!==1)fail(`Credential duplicado/ausente: ${c.key}`);
  if(credential?.evidenceState!=='editorial'||!arr(credential?.sources).includes(c.sourceId)||!credential?.attributionLimit)fail(`Credential sin provenance editorial: ${c.key}`);
  if(claim?.claimType!=='factual'||claim.causalStatus!=='not_applicable'||claim.evidenceState!=='editorial'||!arr(claim.supportedBy).includes(c.sourceId)||claim.text!==c.text)fail(`Claim académico sin provenance factual: ${c.key}`);
  if(!graph.edges.some(e=>e.from===PERSON_ID&&e.relation==='hasCredential'&&e.to==='credential:'+c.key))fail(`Credential sin hasCredential: ${c.key}`);
 }
 for(const n of nodes.filter(n=>n.type==='Credential')){
  if(!arr(n.sources).length||!arr(n.claimRefs).length)fail(`Credential sin Source/Claim: ${n.id}`);
  if(!PERSON_CREDENTIALS.some(c=>'credential:'+c.key===n.id))fail(`Credential no aprobado: ${n.id}`);
 }
 for(const n of nodes){
  for(const [field,types] of Object.entries(REF_TYPES))if(field in n&&n[field]!==undefined&&n[field]!==null){
   const refs=Array.isArray(n[field])?n[field] as unknown[]:[n[field]];
   for(const ref of refs){const target=index.get(String(ref));if(!target)fail(`Referencia colgante: ${n.id}.${field} → ${ref}`);else if(!types.includes(String(target.type)))fail(`Tipo de referencia inválido: ${n.id}.${field} → ${ref}`);}
  }
  if(n.type==='Source'&&arr(n.citationUrls).some(u=>!safeUrl(u)))fail(`Citation URL inválida: ${n.id}`);
  if(n.type==='Content'){
   const evidence=arr(n.authorshipEvidence) as Record<string,unknown>[];
   const expected=editorialAuthorship(Number(String(n.id).replace('content:wp-','')),String(n.slug));
   if(JSON.stringify(evidence)!==JSON.stringify(expected))fail(`Authorship sin evidencia editorial: ${n.id}`);
   if(JSON.stringify(arr(n.authorRefs))!==JSON.stringify(expected.map(e=>e.personId)))fail(`AuthorRefs sin evidencia editorial: ${n.id}`);
   for(const e of evidence){
    if(Object.keys(e).some(k=>!['personId','authorId','authorName','metadataUrl','profileUrl','snapshotDate','sourceRefs'].includes(k)))fail(`Campo privado en authorship: ${n.id}`);
    for(const ref of arr(e.sourceRefs))if(index.get(String(ref))?.type!=='Source')fail(`Authorship Source colgante: ${n.id}`);
   }
  }
  if(n.evidenceState!=='editorial'){
   const proof=arr(n.evidenceRefs).map(id=>index.get(String(id)));
   if(!proof.length||proof.some(s=>s?.type!=='Source'||s.verification!=='independent'||!s.url||!s.snapshotDate))fail(`EvidenceState sin soporte verificable: ${n.id}`);
  }
 }
 const edgeIds=new Set<string>();
 for(const e of graph.edges){
  const source=index.get(e.from),target=index.get(e.to),rule=RELATIONS[e.relation];
  if(!source||!target)fail(`Edge colgante: ${e.from} → ${e.to}`);
  if(!rule)fail(`Relación desconocida: ${e.relation}`);
  else if(source&&target&&(!rule.from.includes(source.type as NodeType)||!rule.to.includes(target.type as NodeType)))fail(`Relación mal tipada: ${e.from} ${e.relation} ${e.to}`);
  const key=JSON.stringify(e);if(edgeIds.has(key))fail(`Edge duplicado: ${key}`);edgeIds.add(key);
  if(Object.keys(e).some(k=>!['from','relation','to','condition'].includes(k)))fail('Campo privado/no autorizado en Edge');
  if(publicMode&&privateText.test(JSON.stringify(e)))fail('Dato privado público en Edge');
  if(e.to==='method:ruta90'&&['mayLeadTo','possibleIntervention'].includes(e.relation)&&!e.condition)fail('Ruta 90 requiere condición de pertinencia');
  if(e.from==='method:ruta90'&&['developedBy','createdBy','author','foundedBy'].includes(e.relation))fail('Ruta 90 no fue creada por RAUVIA');
  if(e.relation==='authoredBy'&&source?.type==='Content'&&(!arr(source.authorRefs).includes(e.to)||!(arr(source.authorshipEvidence) as Record<string,unknown>[]).some(a=>a.personId===e.to)))fail(`authoredBy sin evidencia editorial: ${e.from}`);
  if(source?.type==='Content')for(const ref of arr(source.authorRefs))if(!graph.edges.some(edge=>edge.from===e.from&&edge.relation==='authoredBy'&&edge.to===ref))fail(`authoredBy ausente: ${e.from}`);
  if(e.from==='system:aethryon'&&e.to==='method:ruta90')fail('AETHRYON no debe conducir obligatoriamente a Ruta 90');
 }
 for(const [view,ids] of Object.entries(graph.views)){if(!['entity','intent','evidence'].includes(view))fail('Vista desconocida');for(const id of ids)if(!index.has(id))fail(`Vista colgante: ${id}`);}
 if(nodes.filter(n=>n.type==='Organization').length!==1||index.get('org:rauvia')?.type!=='Organization')fail('Organization única requerida');
 const org=index.get('org:rauvia'),founder=index.get('person:raul-morales'),system=index.get('system:aethryon'),method=index.get('method:ruta90');
 if(org?.name!==ENTITIES.organization.name||org?.schemaId!==ENTITIES.organization['@id']||org?.url!==ENTITIES.organization.url||org?.legalName!==ENTITIES.organization.legalName)fail('Organization diverge de entity.ts');
 if(nodes.filter(n=>n.type==='Person').length!==1||founder?.type!=='Person')fail('Person única requerida');
 if(founder?.name!==ENTITIES.founder.name||founder?.schemaId!=='https://rauvia.com.mx/#raul-morales'||founder?.url!==PERSONAL_SITE||!safeUrl(founder?.url)||founder?.jobTitle!==ENTITIES.founder.jobTitle)fail('Founder diverge de identidad estable');
 if(JSON.stringify(founder?.sameAs)!==JSON.stringify(PERSON_SAME_AS))fail('Person sameAs no verificado');
 const authored=graph.edges.filter(e=>e.relation==='authoredBy'&&e.to===PERSON_ID).map(e=>e.from).sort();
 if(JSON.stringify(founder?.publicAuthorRefs)!==JSON.stringify(authored))fail('Person publicAuthorRefs no derivados de authoredBy');
 const credentialRefs=PERSON_CREDENTIALS.filter(c=>!publicMode||c.publicApproved).map(c=>'credential:'+c.key);
 if(JSON.stringify(founder?.credentialRefs)!==JSON.stringify(credentialRefs))fail('Person credentialRefs no aprobados');
 if(!graph.edges.some(e=>e.from===PERSON_ID&&e.relation==='representedBy'&&e.to==='asset:nosotros')||!graph.edges.some(e=>e.from==='org:rauvia'&&e.relation==='foundedBy'&&e.to===PERSON_ID)||!graph.edges.some(e=>e.from===PERSON_ID&&e.relation==='worksFor'&&e.to==='org:rauvia'))fail('Person relaciones institucionales incompletas');

 if(JSON.stringify(founder?.aliases)!==JSON.stringify(PERSON_PUBLIC_ALIASES)||JSON.stringify(founder?.identitySurfaces)!==JSON.stringify(PERSON_IDENTITY_SURFACES))fail('Person aliases/superficies no aprobadas');
 if(!publicMode&&JSON.stringify(founder?.discoveryAliases)!==JSON.stringify(PERSON_DISCOVERY_ALIASES))fail('Person discovery no aprobado');
 if(JSON.stringify(founder?.practiceRefs)!==JSON.stringify(practiceAreas.map(p=>p.id))||JSON.stringify(founder?.careerEvidenceRefs)!==JSON.stringify(careerEvidence.map(c=>c.id)))fail('Person practice/career refs incompletas');
 if(!graph.edges.some(e=>e.from===PERSON_ID&&e.relation==='practicesThrough'&&e.to==='org:rauvia'))fail('practicesThrough requerido; worksFor no lo sustituye');
 if(nodes.filter(n=>n.type==='PracticeArea').length!==practiceAreas.length)fail('PracticeArea únicos: se requieren ocho');
 for(const expected of practiceAreas){
  const n=index.get(expected.id);
  if(n?.type!=='PracticeArea'||n.label!==expected.label||n.description!==expected.description||n.practiceOrigin!==expected.practiceOrigin||n.guaranteesResults!==false||n.evidenceState!=='editorial'||n.attributionLimit!==expected.attributionLimit)fail(`PracticeArea canónico/provenance inválido: ${expected.id}`);
  for(const field of ['sources','topics','problems','supportsCapabilities','careerEvidenceRefs','throughOrganizationRefs'] as const)if(JSON.stringify(n?.[field])!==JSON.stringify(expected[field]))fail(`PracticeArea ${field} incompleto: ${expected.id}`);
  if(!graph.edges.some(e=>e.from===PERSON_ID&&e.relation==='practicesIn'&&e.to===expected.id))fail(`practicesIn ausente: ${expected.id}`);
  for(const [field,rel] of [['problems','expressesProblem'],['supportsCapabilities','supportsCapability'],['careerEvidenceRefs','hasCareerEvidence']] as const){
   const linked=graph.edges.filter(e=>e.from===expected.id&&e.relation===rel).map(e=>e.to).sort();
   if(JSON.stringify(linked)!==JSON.stringify([...expected[field]].sort()))fail(`PracticeArea relación ${rel} incompleta: ${expected.id}`);
  }
  const authoredEvidence=nodes.filter(c=>c.type==='Content'&&arr(c.authorRefs).includes(PERSON_ID)&&(arr(c.explainsProblem).some(id=>expected.problems.includes(String(id)))||arr(c.supportsCapability).some(id=>expected.supportsCapabilities.includes(String(id))))).map(c=>String(c.id)).sort();
  if(JSON.stringify(n?.evidenceContentRefs)!==JSON.stringify(authoredEvidence)||JSON.stringify(graph.edges.filter(e=>e.from===expected.id&&e.relation==='evidencedByContent').map(e=>e.to).sort())!==JSON.stringify(authoredEvidence))fail(`PracticeArea evidencia editorial no derivada: ${expected.id}`);
 }
 if(nodes.filter(n=>n.type==='CareerEvidence').length!==careerEvidence.length)fail('CareerEvidence no aprobado');
 for(const expected of careerEvidence){
  const n=index.get(expected.id);
  for(const field of ['type','personRef','employer','topics','ecosystemRefs','sources','description','attributionLimit','evidenceState'] as const)if(JSON.stringify(n?.[field])!==JSON.stringify(expected[field]))fail(`CareerEvidence provenance inválida: ${expected.id}.${field}`);
  if(!graph.edges.some(e=>e.from===PERSON_ID&&e.relation==='hasCareerEvidence'&&e.to===expected.id))fail(`Person career evidencia ausente: ${expected.id}`);
 }
 const website=index.get('website:rauvia');if(website?.name!==ENTITIES.website.name||website?.url!==ENTITIES.website.url||website?.schemaId!==ENTITIES.website['@id'])fail('WebSite diverge de entity.ts');
 if(system?.type!=='System'||system.name!==ENTITIES.system.name||system.url!==ENTITIES.system.url||system.schemaId!==ENTITIES.system['@id']||system.description!==ENTITIES.system.description||system.attribution!=='developed_by_rauvia')fail('AETHRYON debe ser System canónico');
 if(method?.type!=='Method'||method.attribution!=='adopted_by_rauvia'||!graph.edges.some(e=>e.from==='method:ruta90'&&e.relation==='usedBy'&&e.to==='org:rauvia'))fail('Ruta 90 debe ser Method adoptado/usedBy RAUVIA');
 if(!graph.limitations.includes('Coverage ≠ market demand.')||!graph.limitations.includes('Crawler hit ≠ human demand.'))fail('Faltan límites de demanda');
 return errors;
}
export function assertGraph(graph:Graph|PublicGraph,master?:Graph):void {const errors=auditGraph(graph,master);if(errors.length)throw new Error(errors.join('\n'));}
