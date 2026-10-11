import {practiceAreas,careerEvidence,careerSources} from './practice.ts';
import {PERSON_PUBLIC_ALIASES,PERSON_IDENTITY_SURFACES} from '../config/personKnowledge.ts';
import {PERSON_DISCOVERY_ALIASES} from './personDiscovery.ts';
import {credentials,academicClaims,personSources} from './person.ts';
import {identities,verticals,icps,problems,restrictions,capabilityGaps,capabilities,interventions,context} from './catalog.ts';
import {assets,assetSources} from './assets.ts';
import {intents} from './intents.ts';
import {cases,claims,contents,contentSources,useCases} from './evidence.ts';
import {RUTA90_CONDITION,AUTOMATION_CONDITION} from './relations.ts';
import {LIMITATIONS,type Graph,type Edge,type KnowledgeNode} from './types.ts';
export function buildGraph():Graph {
 const nodes:KnowledgeNode[]=structuredClone([...identities,...verticals,...icps,...problems,...restrictions,...capabilityGaps,...capabilities,...interventions,...context,...assets,...assetSources,...intents,...cases,...claims,...contents,...contentSources,...useCases,...credentials,...academicClaims,...personSources,...practiceAreas,...careerEvidence,...careerSources]);
 const byId=new Map(nodes.map(n=>[n.id,n]));
 const edges:Edge[]=[];
 const add=(from:string,relation:string,to:string,condition?:string)=>edges.push({from,relation,to,...(condition?{condition}:{})});
 const many=(from:string,relation:string,ids:string[]=[])=>ids.forEach(to=>add(from,relation,to));
 for(const n of nodes){
  many(n.id,'supportedBy',n.sources);
  if(!['Asset','Content','Source','Claim'].includes(n.type))many(n.id,'representedBy',n.assetRefs);
  switch(n.type){
   case 'Intent':many(n.id,'expressesProblem',n.mapsToProblems);many(n.id,'targetsICP',n.icps);many(n.id,'belongsToVertical',n.verticals);many(n.id,'aboutEntity',n.contexts);add(n.id,'belongsToTerritory',n.territory);break;
   case 'Problem':many(n.id,'affectedByRestriction',n.restrictions);many(n.id,'requiresCapability',n.capabilities);break;
   case 'Restriction':many(n.id,'createsCapabilityGap',n.gaps);break;
   case 'CapabilityGap':many(n.id,'requiresCapability',n.capabilities);break;
   case 'Capability':many(n.id,'possibleIntervention',n.interventions);break;
   case 'Offering':add(n.id,'offeredBy','org:rauvia');break;
   case 'Case':many(n.id,'containsClaim',n.claims);add(n.id,'belongsToVertical',n.vertical);break;
   case 'UseCase':many(n.id,'expressesProblem',n.problems);many(n.id,'requiresCapability',n.capabilities);add(n.id,'belongsToVertical',n.vertical);n.capabilities.forEach(c=>add(c,'demonstratedBy',n.id));break;
   case 'PracticeArea':
    many(n.id,'expressesProblem',n.problems);many(n.id,'supportsCapability',n.supportsCapabilities);many(n.id,'hasCareerEvidence',n.careerEvidenceRefs);
    n.evidenceContentRefs=nodes.filter((c)=>c.type==='Content'&&c.authorRefs?.includes('person:raul-morales')&&(c.explainsProblem.some(id=>n.problems.includes(id))||c.supportsCapability.some(id=>n.supportsCapabilities.includes(id)))).map(c=>c.id).sort();
    many(n.id,'evidencedByContent',n.evidenceContentRefs);break;
   case 'Credential':many(n.id,'containsClaim',n.claimRefs);break;
   case 'Content':many(n.id,'authoredBy',n.authorRefs);many(n.id,'coversIntent',n.coversIntent);many(n.id,'explainsProblem',n.explainsProblem);many(n.id,'supportsCapability',n.supportsCapability);add(n.id,'derivedFrom',n.source);add(n.id,'partOf','website:rauvia');break;
   case 'Claim':many(n.id,'supportedBy',n.supportedBy);break;
   case 'Asset':add(n.id,'partOf','website:rauvia');break;
  }
 }
 // Reverse asset descriptions are derived from intent and intervention declarations.
 for(const n of nodes.filter(n=>n.type==='Asset')){
  n.coversIntent=nodes.filter(i=>i.type==='Intent'&&i.assets.includes(n.id)).map(i=>i.id).sort();
  n.explainsProblem=[...new Set(n.coversIntent.flatMap(id=>{const i=byId.get(id);return i?.type==='Intent'?i.mapsToProblems:[]}))].sort();
  n.supportsCapability=[...new Set(n.explainsProblem.flatMap(id=>{const p=byId.get(id);return p?.type==='Problem'?p.capabilities||[]:[]}))].sort();
  n.representedOffering=nodes.filter(i=>i.type==='Offering'&&i.representedBy.includes(n.id)).map(i=>i.id).sort();
  many(n.id,'coversIntent',n.coversIntent);many(n.id,'explainsProblem',n.explainsProblem);many(n.id,'supportsCapability',n.supportsCapability);
 }
 const person=nodes.find(n=>n.id==='person:raul-morales');
 if(person?.type==='Person'){
  person.aliases=[...PERSON_PUBLIC_ALIASES];person.discoveryAliases=[...PERSON_DISCOVERY_ALIASES];person.identitySurfaces=[...PERSON_IDENTITY_SURFACES];
  person.practiceRefs=practiceAreas.map(p=>p.id);person.careerEvidenceRefs=careerEvidence.map(c=>c.id);
  many(person.id,'practicesIn',person.practiceRefs);add(person.id,'practicesThrough','org:rauvia');many(person.id,'hasCareerEvidence',person.careerEvidenceRefs);
  person.credentialRefs=credentials.map(c=>c.id);person.organizationRefs=['org:rauvia'];
  person.publicAuthorRefs=edges.filter(e=>e.relation==='authoredBy'&&e.to===person.id).map(e=>e.from).sort();
  person.sourceRefs=[...person.sources,'source:wp-author-raul'];
  many(person.id,'hasCredential',person.credentialRefs);many(person.id,'containsClaim',academicClaims.map(c=>c.id));add(person.id,'worksFor','org:rauvia');
 }
 add('org:rauvia','foundedBy','person:raul-morales');add('org:rauvia','publishes','website:rauvia');
 nodes.filter(n=>['Asset','Content'].includes(n.type)).forEach(n=>add('org:rauvia','publishes',n.id));
 add('system:aethryon','developedBy','org:rauvia');add('method:ruta90','usedBy','org:rauvia');
 for(const n of nodes){
  if(['Signal','Problem'].includes(n.type)){add('system:aethryon','analyzes',n.id);add(n.id,'analyzedBy','system:aethryon');}
  if(['Restriction','Opportunity','CapabilityGap'].includes(n.type)){add('system:aethryon','evaluates',n.id);add(n.id,'evaluatedBy','system:aethryon');}
 }
 add('system:aethryon','identifies','priority:prioridad-identificada');add('system:aethryon','produces','action-route:decision-ejecutable');
 add('system:aethryon','mayLeadTo','action-route:decision-ejecutable');
 add('priority:prioridad-identificada','mayLeadTo','method:ruta90',RUTA90_CONDITION);
 for(const id of ['concept:execution','concept:90-day-cycle','priority:prioridad-identificada'])add('method:ruta90','operatesInContext',id);
 add('capability:priorizacion','possibleIntervention','system:aethryon','Ante una prioridad o restricción que requiera análisis; no constituye un diagnóstico automático.');
 for(const c of ['capability:priorizacion','capability:operacion-repetible'])add(c,'possibleIntervention','method:ruta90',RUTA90_CONDITION);
 add('capability:operacion-repetible','possibleIntervention','offering:automatizacion',AUTOMATION_CONDITION);
 for(const n of nodes.filter(n=>['System','Method','Offering'].includes(n.type))){
  if(n.type!=='System'&&n.type!=='Method'&&n.type!=='Offering')continue;
  if(n.type==='Offering'){
   n.supportsCapabilities=[...new Set(edges.filter(e=>e.relation==='possibleIntervention'&&e.to===n.id&&byId.get(e.from)?.type==='Capability').map(e=>e.from))].sort();
   n.possibleForProblems=nodes.filter(p=>p.type==='Problem'&&p.capabilities?.some(c=>n.supportsCapabilities.includes(c))).map(p=>p.id).sort();
  }
  many(n.id,'supportsCapability',n.supportsCapabilities);
 }
 for(const [entity,claim] of [['org:rauvia','claim:rauvia-identidad'],['system:aethryon','claim:aethryon-desarrollado'],['method:ruta90','claim:ruta90-adoptado']])add(entity,'containsClaim',claim);
 const unique=[...new Map(edges.map(e=>[`${e.from}|${e.relation}|${e.to}|${e.condition||''}`,e])).values()].sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b),'en'));
 const ids=(types:string[])=>nodes.filter(n=>types.includes(n.type)).map(n=>n.id).sort();
 return {schema_version:'1.0.0',graph_version:'1.0.0',locale:'es-MX',scope:'internal',limitations:[...LIMITATIONS],nodes:nodes.sort((a,b)=>a.id.localeCompare(b.id,'en')),edges:unique,views:{entity:ids(['Organization','Person','Credential','PracticeArea','WebSite','Vertical','ICP','System','Method','Offering','Asset','UseCase']),intent:ids(['Intent','Problem','Restriction','CapabilityGap','Capability','TopicTerritory','Signal','Opportunity','Priority','ActionRoute','Concept']),evidence:ids(['Case','Claim','Source','Content','CareerEvidence'])}};
}
