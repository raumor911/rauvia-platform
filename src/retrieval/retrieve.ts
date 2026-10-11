import {normalize} from '../knowledge/retrieval.ts';
import {negativeContexts} from './catalog.ts';
import type {CanonicalAnswer,QueryArchetype} from './types.ts';
// Offline test/review helper. No runtime visitor handling, LLM, scoring or API.
export function retrieveAnswer(catalog:{answers:CanonicalAnswer[];archetypes:QueryArchetype[]},query:string,context:{priorityIdentified?:boolean;executionCapacity?:boolean;offerExists?:boolean;representationGap?:boolean;processDefined?:boolean}={}){
 const q=normalize(query);
 const excluded=negativeContexts.find(n=>n.queries.some(s=>normalize(s)===q)||n.groups.some(g=>g.every(p=>q.includes(normalize(p)))));
 if(excluded)return {state:'not_primary_fit' as const,fit:excluded.fit,reason:excluded.reason,matches:[],excludedInterventions:excluded.excludedInterventions};
 const aliases=catalog.archetypes.filter(a=>a.queries.some(s=>normalize(s)===q));
 const ids=[...new Set(aliases.map(a=>a.answerId))];
 const matches=ids.map(id=>{const a=catalog.answers.find(a=>a.id===id)!;const explicitRepresentation=context.offerExists&&context.representationGap;const explicitExecution=context.priorityIdentified&&context.executionCapacity;
  return {intentIds:aliases.filter(q=>q.answerId===id).map(q=>q.intentId),answerId:a.id,familyId:a.familyId,problemIds:a.problemIds,problemRole:a.problemRole,capabilityIds:a.capabilityIds,citationBundleId:a.citationBundleId,possibleInterventions:a.possibleInterventionIds.filter(id=>id==='offering:frente-comercial'?explicitRepresentation:id==='method:ruta90'?explicitExecution:id==='offering:automatizacion'?context.processDefined:true),limitations:a.limitations};});
 return {state:ids.length===0?'unmatched' as const:ids.length>1?'ambiguous' as const:'matched' as const,fit:ids.length?'POSSIBLE_FIT' as const:'NOT_PRIMARY_FIT' as const,reason:'Coincidencia con arquetipos editoriales revisados; no evaluación de ajuste ni diagnóstico automático.',matches,excludedInterventions:[]};
}
