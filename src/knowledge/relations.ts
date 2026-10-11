import type {NodeType} from './types.ts';
type Rule={from:readonly NodeType[];to:readonly NodeType[]};
const all:NodeType[]=['Organization','Person','Credential','PracticeArea','CareerEvidence','WebSite','Vertical','ICP','Intent','Problem','Restriction','CapabilityGap','Capability','System','Method','Offering','Asset','Content','UseCase','Case','Claim','Source','Signal','Opportunity','Priority','ActionRoute','Concept','TopicTerritory'];
export const RELATIONS:Record<string,Rule>={
 belongsToVertical:{from:['Intent','Case','UseCase'],to:['Vertical']},targetsICP:{from:['Intent'],to:['ICP']},
 expressesProblem:{from:['Intent','UseCase','PracticeArea'],to:['Problem']},affectedByRestriction:{from:['Problem'],to:['Restriction']},
 createsCapabilityGap:{from:['Restriction'],to:['CapabilityGap']},requiresCapability:{from:['Problem','CapabilityGap','UseCase'],to:['Capability']},
 analyzedBy:{from:['Problem','Signal'],to:['System']},evaluatedBy:{from:['Restriction','Opportunity','CapabilityGap'],to:['System']},
 possibleIntervention:{from:['Capability','Problem'],to:['System','Method','Offering']},mayLeadTo:{from:['System','Priority'],to:['ActionRoute','Method']},
 offeredBy:{from:['Offering'],to:['Organization']},usedBy:{from:['Method'],to:['Organization']},
 representedBy:{from:all.filter(t=>!['Source','Asset','Content','Claim'].includes(t)),to:['Asset']},
 coversIntent:{from:['Asset','Content'],to:['Intent']},explainsProblem:{from:['Asset','Content'],to:['Problem']},
 supportsCapability:{from:['Asset','Content','System','Method','Offering','PracticeArea'],to:['Capability']},
 demonstratedBy:{from:['Capability'],to:['Case','UseCase']},containsClaim:{from:['Organization','Person','Credential','System','Method','Case','Content'],to:['Claim']},
 supportedBy:{from:all.filter(t=>t!=='Source'),to:['Source']},derivedFrom:{from:['Content'],to:['Source']},
 analyzes:{from:['System'],to:['Signal','Problem']},evaluates:{from:['System'],to:['Restriction','Opportunity','CapabilityGap']},
 identifies:{from:['System'],to:['Priority']},produces:{from:['System'],to:['ActionRoute']},
 developedBy:{from:['System'],to:['Organization']},foundedBy:{from:['Organization'],to:['Person']},
 publishes:{from:['Organization'],to:['WebSite','Asset','Content']},partOf:{from:['Asset','Content'],to:['WebSite']},
 belongsToTerritory:{from:['Intent'],to:['TopicTerritory']},aboutEntity:{from:['Intent'],to:['Organization','Person','WebSite','System','Method','Concept']},
 practicesIn:{from:['Person'],to:['PracticeArea']},practicesThrough:{from:['Person'],to:['Organization']},
 hasCareerEvidence:{from:['Person','PracticeArea'],to:['CareerEvidence']},evidencedByContent:{from:['PracticeArea'],to:['Content']},
 hasCredential:{from:['Person'],to:['Credential']},worksFor:{from:['Person'],to:['Organization']},authoredBy:{from:['Content'],to:['Person']},
 operatesInContext:{from:['Method'],to:['Concept','Priority']}
};
export const RUTA90_CONDITION='Sólo si se ha identificado una prioridad y existe capacidad de ejecución y revisión; requiere diagnóstico de pertinencia.';
export const AUTOMATION_CONDITION='Sólo con proceso, responsables y reglas definidos; no sustituye la estructuración de la operación.';
