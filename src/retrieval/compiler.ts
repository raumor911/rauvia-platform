import {compileKnowledge} from '../knowledge/compiler.ts';
import type {ClaimNode,ContentNode,IntentNode,SourceNode} from '../knowledge/types.ts';
import {THESIS,answerSeeds,extraQueries,negativeContexts} from './catalog.ts';
import type {CanonicalAnswer,CitationBundle,QueryArchetype} from './types.ts';
import {assertRetrieval} from './validate.ts';
const unique=(a:string[])=>[...new Set(a)].sort();
const json=(v:unknown)=>JSON.stringify(v,null,2)+'\n';
export const csv=(headers:string[],rows:unknown[][])=>[headers,...rows].map(row=>row.map(v=>'"'+String(Array.isArray(v)?v.join('; '):v??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
export function compileRetrieval(){
 const knowledge=compileKnowledge();
 // Internal typed lookup restricted to approved V74 public IDs. Never serialize this lookup.
 const publicIds=new Set(knowledge.publicGraph.nodes.map(n=>String(n.id)));
 const graph={...knowledge.graph,scope:'public' as const,nodes:knowledge.graph.nodes.filter(n=>publicIds.has(n.id)),edges:knowledge.graph.edges.filter(e=>publicIds.has(e.from)&&publicIds.has(e.to))};
 const byId=new Map(graph.nodes.map(n=>[n.id,n]));
 const intents=graph.nodes.filter((n):n is IntentNode=>n.type==='Intent');
 const contents=graph.nodes.filter((n):n is ContentNode=>n.type==='Content');
 const answers:CanonicalAnswer[]=answerSeeds.map(s=>{
  const ids=s.intents.map(k=>'intent:'+k),rows=knowledge.publicCoverage.intents.filter(r=>ids.includes(r.intent));
  const problemIds=s.context?s.context.problems.map(p=>'problem:'+p):unique(rows.flatMap(r=>r.problems));
  const capabilityIds=s.context?s.context.capabilities.map(p=>'capability:'+p):unique(rows.flatMap(r=>r.capabilities));
  const possible=unique(rows.flatMap(r=>r.possibleInterventions));
  if(s.key==='entidad-aethryon')possible.push('system:aethryon');
  if(s.key==='entidad-ruta90'||s.key==='continuidad-ejecucion')possible.push('method:ruta90');
  const conditions=unique(possible).map(id=>({id,condition:id==='method:ruta90'?'Prioridad identificada y capacidad para sostener la ejecución.':id==='offering:frente-comercial'?'Oferta y capacidad existentes; brecha principal de comprensión o representación, no seguimiento ni demanda.':id==='offering:automatizacion'?'Proceso, responsables y reglas definidos; alcance validado.':id==='system:aethryon'?'Prioridad o restricción aún no clara; revisión de contexto y evidencia.':'Necesidad, evidencia, alcance y capacidad de ejecución revisados; no recomendación automática.'}));
  return {id:'answer:'+s.key,familyId:'answer-family:'+s.key,question:s.question,answer:s.answer,intentIds:ids,problemIds,problemRole:s.context?'application_context':'expressed_need',capabilityIds,relevantEntityIds:unique(['org:rauvia',...ids.flatMap(id=>{const i=byId.get(id);return i?.type==='Intent'?i.contexts:[];})]),possibleInterventionIds:unique(possible),interventionConditions:conditions,supportingAssets:unique(['asset:'+s.primary,...rows.flatMap(r=>[...(r.primaryAsset?[r.primaryAsset]:[]),...r.supportingAssets])]),primaryAsset:'asset:'+s.primary,claimIds:s.claims.map(k=>'claim:'+k),citationBundleId:'citation:'+s.key,limitations:s.limitations,fit:s.fit,status:'supported',visibility:'public',publication:{approved:true,basis:'existing_public_content'},evidenceState:'editorial'};
 });
 const archetypes:QueryArchetype[]=intents.map(i=>{
  const a=answers.find(a=>a.intentIds.includes(i.id));if(!a)throw new Error('No answer for '+i.id);
  return {id:'query-archetype:'+i.id.slice(7),queries:unique([...i.expressions,...(extraQueries[i.id.slice(7)]||[])]),intentId:i.id,answerId:a.id,familyId:a.familyId,visibility:'public',publication:{approved:true,basis:'editorial_model'},evidenceState:'editorial'};
 });
 const bundles:CitationBundle[]=answers.map(a=>{
  const claims=a.claimIds.map(id=>byId.get(id) as ClaimNode);
  const content=contents.filter(c=>c.coversIntent.some(i=>a.intentIds.includes(i)));
  const primary='source:'+a.primaryAsset.slice(6);
  const sources=unique([...a.supportingAssets.map(id=>'source:'+id.slice(6)),...claims.flatMap(c=>c.supportedBy),...content.map(c=>c.source)]).filter(id=>id!==primary);
  const caseEvidence=a.id==='answer:evidencia-comercial'?['case:infraestructura-temporal-b2b']:a.id==='answer:consultorio-organizado'?['use-case:consultorio-multiprofesional']:[];
  return {id:a.citationBundleId,answerId:a.id,primary_source:primary,supporting_sources:sources,claims:a.claimIds,evidence:unique([...caseEvidence,...content.map(c=>c.id)]),limitations:unique([...a.limitations,...claims.map(c=>c.attributionLimit),'Fuentes institucionales propias; contenido editorial no equivale a corroboración externa.','Artículos asociados por metadata del snapshot; el cuerpo requiere revisión editorial antes de usarlo como evidencia.']),last_reviewed:'2026-10-06',assertions:claims.map(c=>({claimId:c.id,sourceIds:c.supportedBy,scope:c.scope,period:c.period,attributionLimit:c.attributionLimit}))};
 });
 const publicSources=unique(bundles.flatMap(b=>[b.primary_source,...b.supporting_sources])).map(id=>{const s=byId.get(id) as SourceNode;return {id:s.id,url:s.url,label:s.label,kind:s.kind,verification:s.verification,publisher:s.publisher};});
 const publicClaims=unique(answers.flatMap(a=>a.claimIds)).map(id=>{const c=byId.get(id) as ClaimNode;return {id:c.id,text:c.text,claimType:c.claimType,supportedBy:c.supportedBy,scope:c.scope,period:c.period,attributionLimit:c.attributionLimit,causalStatus:c.causalStatus,guaranteesResults:c.guaranteesResults,...(c.measurementKind?{measurementKind:c.measurementKind}:{}),...(c.fulfilmentState?{fulfilmentState:c.fulfilmentState}:{})};});
 const meta={schema_version:'1.0.0',release:'V75',scope:'public',locale:'es-MX',basis:'Editorial relationships, not observed demand or independent efficacy evidence.',limitations:graph.limitations};
 const retrievalMap={...meta,thesis:THESIS,entityId:'org:rauvia',families:answers.map(a=>({id:a.familyId,question:a.question,answerIds:[a.id],intentIds:a.intentIds})),queries:archetypes,paths:archetypes.map(q=>{const a=answers.find(a=>a.id===q.answerId)!;return {queryArchetypeId:q.id,intentId:q.intentId,answerId:a.id,problemIds:a.problemIds,problemRole:a.problemRole,entityIds:a.relevantEntityIds,capabilityIds:a.capabilityIds,citationBundleId:a.citationBundleId};}),fitPolicy:{default:'POSSIBLE_FIT',qualification:'Editorial applicability requiring context, not a diagnosis or automatic recommendation.',exclusions:negativeContexts.map(({id,queries,fit,reason,excludedInterventions})=>({id,queries,fit,reason,excludedInterventions}))},references:{knowledge:'https://rauvia.com.mx/llmo/knowledge-graph.json',answers:'https://rauvia.com.mx/llmo/canonical-answers.json',citations:'https://rauvia.com.mx/llmo/citation-bundles.json'}};
 const result={graph,answers,archetypes,bundles,retrievalMap,publicSources,publicClaims};assertRetrieval(result);
 const alignment=contents.map(c=>{
  const families=answers.filter(a=>a.intentIds.some(i=>c.coversIntent.includes(i))).map(a=>a.familyId);
  const duplicate=c.id==='content:wp-42'||c.id==='content:wp-39';
  return [c.id,c.canonical,c.title,families,c.coversIntent,c.explainsProblem,c.supportsCapability,c.id==='content:wp-28'?'PILLAR':c.id==='content:wp-34'?'COMPARISON':'SUPPORT',duplicate?'UPDATE':'KEEP',duplicate?'Revisar solapamiento entre wp-39 y wp-42 antes de decidir una fusión; no ejecutar cambios ni redirects.':'Conservar el territorio alineado; revisar el cuerpo y sus afirmaciones antes de citar evidencia.',families.length?'ALIGNED':'LOW STRATEGIC ALIGNMENT','metadata_snapshot_only','BODY_REVIEW_PENDING'];
 });
 const gaps=answers.filter(a=>!contents.some(c=>c.coversIntent.some(i=>a.intentIds.includes(i)))).map(a=>({familyId:a.familyId,priority:a.problemRole==='application_context'?'LATER':'REVIEW',action:'NEW_CONTENT_NEEDED',reason:'No artículo asociado en el snapshot de diez entradas; comprobar inventario vivo antes de encargar una pieza.',brief:{question:a.question,intents:a.intentIds,problems:a.problemIds,capabilities:a.capabilityIds,primarySource:a.primaryAsset,claims:a.claimIds,limitations:a.limitations},publication:'not_authorized'}));
 const authority=answers.map(a=>['org:rauvia',a.familyId,`${a.supportingAssets.length} assets; ${bundles.find(b=>b.answerId===a.id)!.evidence.length} referencias editoriales o de caso`,'UNKNOWN: superficies externas no verificadas en V75',null,a.id==='answer:evidencia-comercial'?'Caso propio publicado, no corroboración independiente':'Sin caso específico corroborado en este catálogo','HYPOTHESIS','Perfiles profesionales consistentes; caso verificable o referencia independiente relevante','external_review_pending']);
 const outputs:Record<string,string>={
  'public/llmo/retrieval-map.json':json(retrievalMap),
  'public/llmo/canonical-answers.json':json({...meta,thesis:THESIS,answers}),
  'public/llmo/citation-bundles.json':json({...meta,bundles,claims:publicClaims,sources:publicSources}),
  'data/knowledge/query-archetypes.json':json({scope:'internal',basis:'Approved editorial archetypes only; private benchmark prompts remain separate.',archetypes}),
  'data/knowledge/authority-gaps.csv':csv(['entity','intent_family','current_internal_coverage','current_external_evidence','external_reference_count','case_support','authority_gap','recommended_surface_type','verification_status'],authority),
  'data/knowledge/content-realignment.csv':csv(['content_id','canonical_url','current_topic','target_answer_family','target_intents','target_problem','target_capabilities','role','action','reason','thesis_alignment','source_scope','evidence_alignment'],alignment),
  'data/knowledge/editorial-gaps.json':json({scope:'internal',snapshot:'2026-10-06',limitations:['Gap de catálogo, no demanda observada.','No crear ni publicar contenido en V75.'],gaps}),
  'docs/retrieval-matrices.md':'# Respuestas y citas V75\n\nVista generada por `npm run build:retrieval`. 64 intenciones editoriales, no demanda observada.\n\n'+answers.map(a=>`- **${a.id}** — ${a.question}\n  ${a.intentIds.length} intenciones; ${a.primaryAsset}; ${a.citationBundleId}. ${a.problemRole==='application_context'?'Problem/Capability describen contexto de aplicación; no diagnostican a quien pregunta por una entidad.':''}`).join('\n')+'\n'
 };
 return {...result,outputs,gaps,alignment};
}
