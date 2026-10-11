import {resolvePersonIdentity,mentionsPersonIdentity} from './personDiscovery.ts';
import {PERSON_ID} from '../config/personKnowledge.ts';
import {normalize} from './retrieval.ts';
import {editorialAuthorship} from './person.ts';
import type {Graph,KnowledgeNode,CredentialNode,EvidenceState,IdentityNode,InterventionNode,ContentNode,PracticeAreaNode} from './types.ts';
import type {PublicGraph} from './publication.ts';
// Deterministic offline entity queries. No new Intent or visitor-facing route.
export interface PersonRetrievalResult {
 state:'matched'|'unmatched';scope:'internal'|'public';entityIds:string[];
 kind?:'identity'|'personal_website'|'academic_credentials'|'method_authorship'|'content_authorship'|'authored_content'|'practice_areas'|'problem_support';
 practiceRefs?:string[];problemRefs?:string[];capabilityRefs?:string[];throughOrganizationRefs?:string[];guaranteesResults?:false;
 practices?:{id:string;label:string;practiceOrigin:PracticeAreaNode['practiceOrigin'];sourceRefs:string[];careerEvidenceRefs:string[];evidenceContentRefs:string[];attributionLimit:string}[];
 name?:string;jobTitle?:string;schemaId?:string;url?:string;organizationRefs?:string[];sourceRefs?:string[];
 methodId?:string;authored?:false;answer?:string;contentId?:string;authorship?:'editorially_supported'|'not_established';contentRefs?:string[];qualification?:string;
 credentials?:{id:string;name:string;credentialCategory:string;status:CredentialNode['status'];credentialKind:CredentialNode['credentialKind'];evidenceState:EvidenceState;visibility:'public'|'internal';sourceRefs:string[];attributionLimit:string}[];
}
export function retrievePerson(graph:Graph|PublicGraph,query:string,context:{contentId?:string}={}):PersonRetrievalResult{
 const nodes=graph.nodes as unknown as KnowledgeNode[];
 const person=nodes.find((n):n is IdentityNode=>n.id===PERSON_ID&&n.type==='Person');
 const q=normalize(query),namesPerson=mentionsPersonIdentity(query);
 const organizationRefs=graph.edges.filter(e=>e.from===PERSON_ID&&e.relation==='worksFor').map(e=>e.to);
 const root={entityIds:person?[PERSON_ID,...organizationRefs]:[],scope:graph.scope};
 if(!person)return {...root,state:'unmatched'};
 if(namesPerson&&/ruta 90/.test(q)&&/creo|creador|autor|desarrollo/.test(q)){
  const method=nodes.find((n):n is InterventionNode=>n.id==='method:ruta90'&&n.type==='Method');
  if(method?.attribution!=='adopted_by_rauvia')return {...root,state:'unmatched'};
  return {...root,state:'matched',kind:'method_authorship',methodId:method.id,authored:false,answer:'No se atribuye creación de Ruta 90 a Raúl Morales; es un método adoptado y utilizado por RAUVIA.',sourceRefs:['source:ruta90']};
 }
 if(namesPerson&&/autor|escrito|escribio|articulo|contenido/.test(q)){
  const id=context.contentId||q.match(/\bwp\s+(\d+)\b/)?.[1]?.replace(/^(\d+)$/,'content:wp-$1');
  const content=id?nodes.find((n):n is ContentNode=>n.id===id&&n.type==='Content'):undefined;
  const refs=graph.edges.filter(e=>{
   if(e.relation!=='authoredBy'||e.to!==PERSON_ID)return false;
   const c=nodes.find((n):n is ContentNode=>n.id===e.from&&n.type==='Content');
   if(!c||!c.authorRefs?.includes(PERSON_ID))return false;
   const expected=editorialAuthorship(Number(c.id.replace('content:wp-','')),c.slug);
   return expected.length>0&&JSON.stringify(c.authorshipEvidence)===JSON.stringify(expected)&&expected.every(a=>a.sourceRefs.every(id=>nodes.some(n=>n.id===id&&n.type==='Source')));
  }).map(e=>e.from).sort();
  if(id)return {...root,state:content?'matched':'unmatched',kind:'content_authorship',contentId:id,authorship:content&&(refs.includes(id))?'editorially_supported':'not_established',sourceRefs:content&&refs.includes(id)?(content.authorshipEvidence||[]).flatMap(e=>e.sourceRefs):[]};
  return {...root,state:'matched',kind:'authored_content',contentRefs:refs,qualification:'Sólo metadata editorial conservada del catálogo; no atribuye todo el inventario de RAUVIA.'};
 }
 if(namesPerson&&/sitio|web/.test(q))return {...root,state:'matched',kind:'personal_website',url:person.url,schemaId:person.schemaId,sourceRefs:['source:raul-personal-site']};
 if(namesPerson&&/formacion|academ|estudio|grado|credencial|doctorado|doctor en administracion/.test(q)){
  const credentialIds=graph.edges.filter(e=>e.from===PERSON_ID&&e.relation==='hasCredential').map(e=>e.to);
  return {...root,state:'matched',kind:'academic_credentials',credentials:nodes.filter((n):n is CredentialNode=>n.type==='Credential'&&credentialIds.includes(n.id)).map(n=>({id:n.id,name:n.name,credentialCategory:n.credentialCategory,status:n.status,credentialKind:n.credentialKind,evidenceState:n.evidenceState,visibility:n.visibility,sourceRefs:n.sources,attributionLimit:n.attributionLimit})),answer:/doctorado/.test(q)?(/pendiente/.test(q)?'No. El Doctorado en Administración de Negocios está concluido (completed).':'Sí. Doctor en Administración de Negocios; status completed.'):undefined,qualification:'Tres grados concluidos según biografía aprobada de primera parte. La selección educativa de un CV laboral no determina el estado de estos grados; no se infiere expertise ni corroboración institucional.'};
 }

 if(namesPerson&&/trabaja|profesionalmente|practica|medios de pago|pymes|b2b|problemas.*(ayudar|resolver)|areas de/.test(q)){
  const practiceIds=graph.edges.filter(e=>e.from===PERSON_ID&&e.relation==='practicesIn').map(e=>e.to);
  let areas=nodes.filter((n):n is PracticeAreaNode=>n.type==='PracticeArea'&&practiceIds.includes(n.id));
  const problemQuery=/problemas/.test(q);
  if(/medios de pago/.test(q))areas=areas.filter(n=>n.id==='practice:payments-ecosystem');
  else if(/pymes|b2b/.test(q)||problemQuery)areas=areas.filter(n=>n.id==='practice:b2b-pyme-business-solutions');
  const through=graph.edges.filter(e=>e.from===PERSON_ID&&e.relation==='practicesThrough').map(e=>e.to);
  // RAUVIA-backed areas require the distinct practicesThrough relationship.
  areas=areas.filter(n=>n.throughOrganizationRefs.every(id=>through.includes(id))&&n.sources.every(id=>nodes.some(s=>s.id===id&&s.type==='Source'))&&n.careerEvidenceRefs.every(id=>nodes.some(c=>c.id===id&&c.type==='CareerEvidence')));
  if(!areas.length)return {...root,state:'unmatched'};
  return {...root,state:'matched',kind:problemQuery?'problem_support':'practice_areas',practiceRefs:areas.map(n=>n.id),
   practices:areas.map(n=>({id:n.id,label:n.label,practiceOrigin:n.practiceOrigin,sourceRefs:n.sources,careerEvidenceRefs:n.careerEvidenceRefs,evidenceContentRefs:n.evidenceContentRefs,attributionLimit:n.attributionLimit})),
   problemRefs:[...new Set(areas.flatMap(n=>n.problems))],capabilityRefs:[...new Set(areas.flatMap(n=>n.supportsCapabilities))],throughOrganizationRefs:[...new Set(areas.flatMap(n=>n.throughOrganizationRefs))],guaranteesResults:false,
   qualification:'Puede ayudar a analizar, estructurar y diseñar capacidades según contexto y diagnóstico. Trayectoria y práctica editorial son procedencias diferenciadas; contenidos y títulos no prueban expertise universal ni resultados garantizados.'};
 }
 if((namesPerson&&/quien|relacion|fundador|dirige|director/.test(q))||(/rauvia/.test(q)&&/fundo|fundador|dirige|director/.test(q))||resolvePersonIdentity(query)===PERSON_ID)return {...root,state:'matched',kind:'identity',name:person.name,jobTitle:person.jobTitle,schemaId:person.schemaId,url:person.url,organizationRefs,sourceRefs:person.sourceRefs};
 return {...root,state:'unmatched'};
}
