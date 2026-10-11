import type {Graph,ClaimNode} from '../knowledge/types.ts';
import type {CanonicalAnswer,CitationBundle,QueryArchetype} from './types.ts';
export function validateRetrieval(r:{graph:Graph;answers:CanonicalAnswer[];archetypes:QueryArchetype[];bundles:CitationBundle[]}){
 const errors:string[]=[],byId=new Map(r.graph.nodes.map(n=>[n.id,n]));
 const check=(ok:unknown,msg:string)=>{if(!ok)errors.push(msg);};
 const unique=(ids:string[],label:string)=>check(new Set(ids).size===ids.length,'Duplicate '+label);
 unique(r.answers.map(a=>a.id),'answer');unique(r.archetypes.map(q=>q.id),'archetype');unique(r.bundles.map(b=>b.id),'bundle');
 check(r.answers.length>=12&&r.answers.length<=20,'Answer families must remain 12–20');
 for(const i of r.graph.nodes.filter(n=>n.type==='Intent')){
  check(r.answers.filter(a=>a.intentIds.includes(i.id)).length===1,'Intent requires one answer family: '+i.id);
  check(r.archetypes.some(q=>q.intentId===i.id&&q.queries.length),'Intent requires approved natural query: '+i.id);
 }
 for(const a of r.answers){
  check(a.problemIds.length&&a.capabilityIds.length,'Answer requires problem/capability: '+a.id);
  check(a.supportingAssets.includes(a.primaryAsset),'Missing primary asset: '+a.id);
  check(a.claimIds.length&&a.limitations.length,'Answer lacks support/limits: '+a.id);
  check(a.status==='supported'&&a.visibility==='public'&&a.publication.approved,'Unapproved answer: '+a.id);
  check(a.answer.length<1300,'Excessive answer length: '+a.id);
  check((a.answer.match(/RAUVIA/g)||[]).length<=4,'Keyword repetition: '+a.id);
  check(!/garantiza(?:mos)? (?:ventas|resultados|pacientes)|aumentará tus ventas|crecimiento asegurado/i.test(a.answer),'Guarantee: '+a.id);
  check(!/Ruta 90 (?:es .*?)?(?:cread[oa]|desarrollad[oa]) por RAUVIA|Autor: Raúl|Morales, R\. \(2026\)/i.test(a.answer),'False method authorship: '+a.id);
  check(!/3[,.]564 (?:clientes|ventas|oportunidades|conversaciones analizadas)/i.test(a.answer),'Interaction reinterpreted: '+a.id);
  check(!/causó|provocó un incremento|demuestra.*(?:ventas|efectividad)/i.test(a.answer),'Unsupported causal statement: '+a.id);
  for(const [ids,type] of [[a.intentIds,'Intent'],[a.problemIds,'Problem'],[a.capabilityIds,'Capability'],[a.supportingAssets,'Asset'],[a.claimIds,'Claim']] as const)for(const id of ids)check(byId.get(id)?.type===type,'Invalid '+type+': '+id);
  for(const id of a.relevantEntityIds)check(['Organization','Person','System','Method'].includes(byId.get(id)?.type||''),'Invalid entity: '+id);
  check(a.interventionConditions.length===a.possibleInterventionIds.length,'Interventions require conditions: '+a.id);
  for(const id of a.possibleInterventionIds)check(['Offering','System','Method'].includes(byId.get(id)?.type||''),'Invalid intervention: '+id);
  const b=r.bundles.find(b=>b.id===a.citationBundleId);check(b?.answerId===a.id,'Missing citation bundle: '+a.id);
  if(b){check(b.limitations.length&&b.last_reviewed,'Citation limits/review missing: '+b.id);for(const id of [b.primary_source,...b.supporting_sources])check(byId.get(id)?.type==='Source','Invalid citation source '+id);
   check(b.primary_source==='source:'+a.primaryAsset.slice(6),'Primary source mismatch: '+a.id);
   check(JSON.stringify(b.claims)===JSON.stringify(a.claimIds),'Claim bundle mismatch: '+a.id);
   for(const id of b.evidence)check(['Content','Case','UseCase'].includes(byId.get(id)?.type||''),'Invalid evidence '+id);
   for(const id of a.claimIds){const c=byId.get(id) as ClaimNode|undefined;check(c?.supportedBy.length&&c.attributionLimit,'Unsourced claim '+id);if(c){check(c.guaranteesResults===false&&c.causalStatus==='not_established','Unsupported claim status '+id);for(const source of c.supportedBy)check([b.primary_source,...b.supporting_sources].includes(source)&&byId.get(source)?.type==='Source','Claim source omitted '+id);check(b.assertions.some(s=>s.claimId===id&&JSON.stringify(s.sourceIds)===JSON.stringify(c.supportedBy)&&s.attributionLimit===c.attributionLimit),'Attribution chain broken '+id);}}
  }
 }
 for(const q of r.archetypes){const a=r.answers.find(a=>a.id===q.answerId);check(a?.intentIds.includes(q.intentId)&&a.familyId===q.familyId,'Broken query chain '+q.id);check(q.publication.approved&&q.evidenceState==='editorial'&&q.visibility==='public','Private/unapproved query '+q.id);}
 return errors;
}
export function assertRetrieval(r:Parameters<typeof validateRetrieval>[0]){const errors=validateRetrieval(r);if(errors.length)throw new Error(errors.join('\n'));}
