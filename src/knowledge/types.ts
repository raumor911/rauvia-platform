export const NODE_TYPES = ['Organization','Person','Credential','PracticeArea','CareerEvidence','WebSite','Vertical','ICP','Intent','Problem','Restriction','CapabilityGap','Capability','System','Method','Offering','Asset','Content','UseCase','Case','Claim','Source','Signal','Opportunity','Priority','ActionRoute','Concept','TopicTerritory'] as const;
export type NodeType = typeof NODE_TYPES[number];
export const STATUSES = ['canonical','supported','completed','hypothesis','deprecated'] as const;
export type Status = typeof STATUSES[number];
export const EVIDENCE_STATES = ['editorial','search_observed','human_observed','machine_observed','multi_signal','validated'] as const;
export type EvidenceState = typeof EVIDENCE_STATES[number];
export const FAMILIES = ['PROBLEM','SOLUTION','CATEGORY','PROVIDER','COMPARISON','USE_CASE','ENTITY'] as const;
export type Family = typeof FAMILIES[number];
export const FAMILY_ALIASES: Record<string,Family> = {PRO:'PROBLEM',SOL:'SOLUTION',CAT:'CATEGORY',PRV:'PROVIDER',CMP:'COMPARISON',USE:'USE_CASE',CTL:'ENTITY'};
export function normalizeFamily(value:string):Family|undefined {return FAMILIES.find(f=>f===value)||FAMILY_ALIASES[value];}
export interface BaseNode {
 id:string; type:NodeType; label:string; description:string; rationale:string;
 status:Status; evidenceState:EvidenceState; visibility:'public'|'internal';
 publication:{approved:boolean;basis:'existing_public_content'|'editorial_model'|'internal_hypothesis'};
 sources:string[]; assetRefs:string[]; evidenceRefs?:string[];
 repositoryRef?:string; privateNotes?:string;
}
export interface IntentNode extends BaseNode {
 type:'Intent'; family:Family; expressions:string[]; icps:string[]; verticals:string[];
 mapsToProblems:string[]; contexts:string[]; assets:string[]; primaryAsset?:string; territory:string;
 // Curated lexical patterns for deterministic build/test retrieval, never client routing.
 matchGroups:string[][];
}
export interface AssetNode extends BaseNode {
 type:'Asset'; canonical:string; assetType:'page'|'landing'|'case'|'index'|'legal'; specificity:'overview'|'specific';
 coversIntent:string[]; explainsProblem:string[]; supportsCapability:string[]; representedOffering:string[];
}
export interface AuthorshipEvidence {personId:string;authorId:number;authorName:string;metadataUrl:string;profileUrl:string;snapshotDate:string;sourceRefs:string[];}
export interface CredentialNode extends BaseNode {type:'Credential';credentialKind:'academicCredential'|'professionalCertification'|'professionalDevelopment';name:string;credentialCategory:string;claimRefs:string[];attributionLimit:string;}
export interface ContentNode extends BaseNode {
 type:'Content'; canonical:string; title:string; slug:string; publishedAt?:string; source:string;
 coversIntent:string[]; explainsProblem:string[]; supportsCapability:string[];
 editorialAuthority:'WordPress'; snapshotDate:string;authorRefs?:string[];authorshipEvidence?:AuthorshipEvidence[];
}
export interface SourceNode extends BaseNode {
 type:'Source'; url?:string; kind:'first_party_publication'|'wordpress_metadata'|'external_primary'|'internal_analysis'|'approved_declaration';
 declarationScope?:'biography'|'career';
 verification:'published_self_report'|'editorial_snapshot'|'independent'|'unverified';
 publisher:string; snapshotDate?:string;citationUrls?:string[];
}
export interface ClaimNode extends BaseNode {
 type:'Claim'; text:string; claimType:'factual'|'capability'|'observed'|'result'; supportedBy:string[];
 scope:string; period:string; attributionLimit:string; causalStatus:'not_established'|'supported'|'not_applicable';
 guaranteesResults:false; measurementKind?:'internal_benchmark'|'interaction_count'|'sales_result';
 fulfilmentState?:'in_construction'|'completed'; outcome?:'benchmark_change'|'interaction'|'sales';
}
export interface IdentityNode extends BaseNode {type:'Organization'|'Person'|'WebSite';schemaId:string;name:string;url:string;legalName?:string;jobTitle?:string;sameAs?:string[];credentialRefs?:string[];organizationRefs?:string[];publicAuthorRefs?:string[];sourceRefs?:string[];aliases?:string[];discoveryAliases?:string[];identitySurfaces?:string[];practiceRefs?:string[];careerEvidenceRefs?:string[];}
export interface InterventionNode extends BaseNode {type:'Offering'|'System'|'Method'; representedBy:string[]; supportsCapabilities:string[]; possibleForProblems:string[]; schemaId?:string;name?:string;url?:string; attribution?:'developed_by_rauvia'|'adopted_by_rauvia';}
export interface CaseNode extends BaseNode {type:'Case';representedBy:string[];claims:string[];vertical:string;period:string;guaranteesResults:false;causalStatus:'not_established';}
export interface UseCaseNode extends BaseNode {type:'UseCase';vertical:string;problems:string[];capabilities:string[];representedBy:string[];guaranteesResults:false;}
export type PracticeOrigin='CAREER_EVIDENCE'|'RAUVIA_PRACTICE'|'BOTH';
export interface PracticeAreaNode extends BaseNode {type:'PracticeArea';practiceOrigin:PracticeOrigin;topics:string[];problems:string[];supportsCapabilities:string[];careerEvidenceRefs:string[];evidenceContentRefs:string[];throughOrganizationRefs:string[];attributionLimit:string;guaranteesResults:false;}
export interface CareerEvidenceNode extends BaseNode {type:'CareerEvidence';personRef:string;topics:string[];employer?:'PROSA'|'ISEM';ecosystemRefs:string[];attributionLimit:string;}
export interface ConceptNode extends BaseNode {type:Exclude<NodeType,IdentityNode['type']|InterventionNode['type']|'Intent'|'Asset'|'Content'|'Source'|'Claim'|'Case'|'UseCase'|'Credential'|'PracticeArea'|'CareerEvidence'>;restrictions?:string[];gaps?:string[];capabilities?:string[];interventions?:string[];aliases?:string[];}
export type KnowledgeNode=PracticeAreaNode|CareerEvidenceNode|CredentialNode|IdentityNode|IntentNode|AssetNode|ContentNode|SourceNode|ClaimNode|InterventionNode|CaseNode|UseCaseNode|ConceptNode;
export interface Edge {from:string;relation:string;to:string;condition?:string;}
export interface Graph {schema_version:'1.0.0';graph_version:'1.0.0';locale:'es-MX';scope:'internal'|'public';limitations:string[];nodes:KnowledgeNode[];edges:Edge[];views:Record<'entity'|'intent'|'evidence',string[]>;}
export type Coverage='HIGH'|'MEDIUM'|'LOW'|'HYPOTHESIS';
export interface CoverageRow {intent:string;label:string;family:Family;icps:string[];verticals:string[];problems:string[];restrictions:string[];capabilityGaps:string[];capabilities:string[];possibleInterventions:string[];conditionalInterventions:{id:string;condition:string}[];primaryAsset:string|null;supportingAssets:string[];status:Status;evidenceState:EvidenceState;coverage:Coverage;rationale:string;}
export interface Gap {id:string;type:'ASSET_GAP'|'CONTENT_GAP'|'EVIDENCE_GAP'|'ORPHAN_INTENT'|'ORPHAN_PROBLEM'|'ORPHAN_CAPABILITY'|'UNLINKED_CONTENT';intents:string[];capabilities:string[];existingCoverage:string[];missing:string;rationale:string;}
export const LIMITATIONS = ['Coverage ≠ market demand.','Crawler hit ≠ human demand.','Case ≠ guarantee.','Correlation ≠ causality.','Internal benchmark ≠ sales result.','Capability in construction ≠ completed outcome.','Possible interventions require context and diagnosis.','/llmo/ is a RAUVIA convention, not a conversation API or mandatory protocol; no indexing or citation guarantee.'];
export const sourceForAsset=(id:string)=>'source:'+id.replace(/^asset:/,'');
export function base<T extends NodeType>(type:T,id:string,label:string,assetRefs:string[],description:string,internal=false):BaseNode&{type:T} {
 return {id,type,label,description,rationale:description,status:internal?'hypothesis':'supported',evidenceState:'editorial',visibility:internal?'internal':'public',publication:{approved:!internal,basis:internal?'internal_hypothesis':'existing_public_content'},sources:assetRefs.map(sourceForAsset),assetRefs};
}
