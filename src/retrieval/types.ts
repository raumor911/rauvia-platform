export type Fit='FIT'|'POSSIBLE_FIT'|'NOT_PRIMARY_FIT';
export interface AnswerSeed {
 key:string; question:string; answer:string; intents:string[]; primary:string;
 claims:string[]; limitations:string[]; fit:{when:string[];possible:string[];nonFit:string[]};
 context?:{problems:string[];capabilities:string[]};
}
export interface CanonicalAnswer {
 id:string;familyId:string;question:string;answer:string;intentIds:string[];problemIds:string[];
 problemRole:'expressed_need'|'application_context';capabilityIds:string[];relevantEntityIds:string[];
 possibleInterventionIds:string[];interventionConditions:{id:string;condition:string}[];
 supportingAssets:string[];primaryAsset:string;claimIds:string[];citationBundleId:string;
 limitations:string[];fit:AnswerSeed['fit'];status:'supported';visibility:'public';
 publication:{approved:true;basis:'existing_public_content'};evidenceState:'editorial';
}
export interface QueryArchetype {
 id:string;queries:string[];intentId:string;answerId:string;familyId:string;
 visibility:'public';publication:{approved:true;basis:'editorial_model'};evidenceState:'editorial';
}
export interface CitationBundle {
 id:string;answerId:string;primary_source:string;supporting_sources:string[];claims:string[];
 evidence:string[];limitations:string[];last_reviewed:string;
 assertions:{claimId:string;sourceIds:string[];scope:string;period:string;attributionLimit:string}[];
}
