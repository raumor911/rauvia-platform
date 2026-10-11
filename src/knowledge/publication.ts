import type {Graph,NodeType,Edge} from './types.ts';
const common=['id','type','label','description','rationale','status','evidenceState','visibility','sources','assetRefs','evidenceRefs'];
export const PUBLIC_FIELDS:Record<NodeType,string[]>={
 Organization:['schemaId','name','url','legalName'],Person:['schemaId','name','url','jobTitle','sameAs','credentialRefs','organizationRefs','publicAuthorRefs','sourceRefs','aliases','identitySurfaces','practiceRefs','careerEvidenceRefs'],PracticeArea:['practiceOrigin','topics','problems','supportsCapabilities','careerEvidenceRefs','evidenceContentRefs','throughOrganizationRefs','attributionLimit','guaranteesResults'],CareerEvidence:['personRef','topics','employer','ecosystemRefs','attributionLimit'],Credential:['credentialKind','name','credentialCategory','claimRefs','attributionLimit'],WebSite:['schemaId','name','url'],
 Intent:['family','expressions','icps','verticals','mapsToProblems','contexts','assets','primaryAsset','territory'],
 Asset:['canonical','assetType','specificity','coversIntent','explainsProblem','supportsCapability','representedOffering'],
 Content:['canonical','title','slug','publishedAt','source','coversIntent','explainsProblem','supportsCapability','editorialAuthority','snapshotDate','authorRefs','authorshipEvidence'],
 Source:['url','kind','verification','publisher','snapshotDate','citationUrls','declarationScope'],Claim:['text','claimType','supportedBy','scope','period','attributionLimit','causalStatus','guaranteesResults','measurementKind','fulfilmentState','outcome'],
 Case:['representedBy','claims','vertical','period','guaranteesResults','causalStatus'],UseCase:['vertical','problems','capabilities','representedBy','guaranteesResults'],
 System:['schemaId','name','url','attribution','representedBy','supportsCapabilities','possibleForProblems'],Method:['attribution','representedBy','supportsCapabilities','possibleForProblems'],Offering:['representedBy','supportsCapabilities','possibleForProblems'],
 Problem:['restrictions','capabilities','aliases'],Restriction:['gaps'],CapabilityGap:['capabilities'],Capability:['interventions'],
 Vertical:[],ICP:[],Signal:[],Opportunity:[],Priority:[],ActionRoute:[],Concept:[],TopicTerritory:[]
};
export const allowedFields=(type:NodeType)=>[...common,...PUBLIC_FIELDS[type]];
export interface PublicGraph {schema_version:string;graph_version:string;locale:string;scope:'public';limitations:string[];nodes:Record<string,unknown>[];edges:Edge[];views:Graph['views'];}
export const isPublicStatus=(type:NodeType,status:string)=>['canonical','supported'].includes(status)||(type==='Credential'&&status==='completed');
export function publicProjection(graph:Graph):PublicGraph {
 const selected=graph.nodes.filter(n=>n.publication.approved&&n.visibility==='public'&&isPublicStatus(n.type,n.status));
 const ids=new Set(selected.map(n=>n.id));
 const nodes=selected.map(n=>Object.fromEntries(allowedFields(n.type).filter(k=>k in n).map(k=>[k,(['credentialRefs','organizationRefs','publicAuthorRefs','sourceRefs','claimRefs','authorRefs','practiceRefs','careerEvidenceRefs','evidenceContentRefs','throughOrganizationRefs'].includes(k)?((n as unknown as Record<string,unknown>)[k] as string[]).filter(id=>ids.has(id)):structuredClone((n as unknown as Record<string,unknown>)[k]))])));
 return {schema_version:graph.schema_version,graph_version:graph.graph_version,locale:graph.locale,scope:'public',limitations:graph.limitations,nodes,edges:graph.edges.filter(e=>ids.has(e.from)&&ids.has(e.to)),views:Object.fromEntries(Object.entries(graph.views).map(([view,values])=>[view,values.filter(id=>ids.has(id))])) as Graph['views']};
}
