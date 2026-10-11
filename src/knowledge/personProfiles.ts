import {PERSON_ID} from '../config/personKnowledge.ts';
import type {Graph} from './types.ts';
// Views of one identity, never additional Person nodes or complete employment CVs.
export function personProfiles(graph:Graph){
 const refs=(type:string)=>graph.nodes.filter(n=>n.type===type).map(n=>n.id).sort();
 const person=graph.nodes.find(n=>n.id===PERSON_ID);
 if(person?.type!=='Person')throw new Error('Canonical Person required');
 const common={personRef:PERSON_ID,name:person.name,schemaId:person.schemaId};
 return {schema_version:'1.0.0',scope:'internal',basis:'Approved contextual projections of one identity; omitted education never implies incomplete education.',
  profiles:[
   {...common,context:'complete_knowledge' as const,credentialRefs:refs('Credential'),careerEvidenceRefs:refs('CareerEvidence'),practiceRefs:refs('PracticeArea'),organizationRefs:person.organizationRefs,publicAuthorRefs:person.publicAuthorRefs,identitySurfaces:person.identitySurfaces},
   {...common,context:'employment' as const,focus:['Business Analyst','Medios de Pago','SPEI','SPID','APIs','UAT','Requirements','Integrations'],credentialRefs:['credential:raul-ingenieria-quimica-metalurgica'],careerEvidenceRefs:refs('CareerEvidence'),educationProjection:'context_specific_selection'},
   {...common,context:'founder_practice' as const,jobTitle:person.jobTitle,focus:['Análisis empresarial','Arquitectura de soluciones','Priorización','Capacidades comerciales','Capacidades operativas','Capacidades tecnológicas','B2B','PyMEs'],practiceRefs:refs('PracticeArea').filter(id=>id!=='practice:payments-ecosystem'),throughOrganizationRefs:['org:rauvia']}
  ]};
}
