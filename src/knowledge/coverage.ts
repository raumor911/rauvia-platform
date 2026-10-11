import type {Graph,CoverageRow,Gap,IntentNode} from './types.ts';
export function intentCoverage(graph:Graph):CoverageRow[]{
 const byId=new Map(graph.nodes.map(n=>[n.id,n]));
 const next=(ids:string[],relation:string)=>[...new Set(graph.edges.filter(e=>ids.includes(e.from)&&e.relation===relation).map(e=>e.to))].sort();
 return graph.nodes.filter((n):n is IntentNode=>n.type==='Intent').map(i=>{
  const problems=next([i.id],'expressesProblem'),restrictions=next(problems,'affectedByRestriction'),capabilityGaps=next(restrictions,'createsCapabilityGap'),capabilities=next(problems,'requiresCapability');
  const interventionEdges=graph.edges.filter(e=>capabilities.includes(e.from)&&e.relation==='possibleIntervention');
  const possibleInterventions=[...new Set(interventionEdges.map(e=>e.to))].sort();
  if(problems.some(p=>graph.edges.some(e=>e.from===p&&e.relation==='analyzedBy')))possibleInterventions.push('system:aethryon');
  const supportingAssets=[...new Set([...i.assets.filter(a=>a!==i.primaryAsset),...possibleInterventions.flatMap(id=>{const n=byId.get(id);return n&&['System','Method','Offering'].includes(n.type)&&'representedBy'in n?n.representedBy:[];})])].filter(id=>id!==i.primaryAsset).sort();
  const primary=byId.get(i.primaryAsset||'');
  const supported=i.sources.some(id=>{const s=byId.get(id);return s?.type==='Source'&&s.visibility==='public'&&s.publication.approved&&!!s.url;});
  const hypothesis=i.status==='hypothesis'||i.visibility==='internal';
  const coherent=!!primary&&supported&&((problems.length>0&&capabilities.length>0)||i.contexts.length>0);
  const coverage=hypothesis?'HYPOTHESIS':coherent?(primary.type==='Asset'&&primary.specificity==='specific'&&problems.length>0?'HIGH':'MEDIUM'):'LOW';
  return {intent:i.id,label:i.label,family:i.family,icps:i.icps,verticals:i.verticals,problems,restrictions,capabilityGaps,capabilities,possibleInterventions:[...new Set(possibleInterventions)].sort(),conditionalInterventions:interventionEdges.filter(e=>e.condition).map(e=>({id:e.to,condition:e.condition!})).filter((e,j,all)=>all.findIndex(v=>v.id===e.id&&v.condition===e.condition)===j),primaryAsset:i.primaryAsset||null,supportingAssets,status:i.status,evidenceState:i.evidenceState,coverage,rationale:hypothesis?'Hipótesis interna, sin soporte publicable.':coverage==='HIGH'?'Intent, problema, capacidad y página específica con soporte editorial; no prueba de demanda ni eficacia.':coverage==='MEDIUM'?'Contexto coherente y fuente editorial; página general o contexto de identidad sin problema.':'Falta contexto, capacidad, página o soporte editorial suficiente.'};
 });
}
export function detectGaps(graph:Graph):Gap[]{
 const coverage=intentCoverage(graph),gaps:Gap[]=[];
 const add=(type:Gap['type'],key:string,intents:string[],capabilities:string[],existingCoverage:string[],missing:string,rationale:string)=>gaps.push({id:`gap:${type.toLowerCase().replaceAll('_','-')}:${key.replace(':','-')}`,type,intents,capabilities,existingCoverage,missing,rationale});
 const linked=(from:string,relation:string)=>graph.edges.filter(e=>e.from===from&&e.relation===relation).map(e=>e.to);
 for(const row of coverage){
  if(!row.primaryAsset)add('ASSET_GAP',row.intent,[row.intent],row.capabilities,row.supportingAssets,'Página de explicación aprobada','Ausencia en este catálogo; no autoriza crear una landing.');
  if(!graph.nodes.some(n=>n.type==='Content'&&n.coversIntent.includes(row.intent)))add('CONTENT_GAP',row.intent,[row.intent],row.capabilities,row.primaryAsset?[row.primaryAsset]:[],'Artículo o guía relacionada en el snapshot','El catálogo offline sólo representa diez artículos; no afirma ausencia en todo WordPress ni demanda de ese contenido.');
  const proof=graph.nodes.some(n=>n.type==='Claim'&&n.claimType==='result'&&n.evidenceState==='validated'&&n.assetRefs.some(a=>[row.primaryAsset,...row.supportingAssets].includes(a)));
  if(row.problems.length&&!proof)add('EVIDENCE_GAP',row.intent,[row.intent],row.capabilities,row.primaryAsset?[row.primaryAsset]:[],'Evidencia de aplicación delimitada y revisada','Cobertura editorial disponible; no acredita eficacia ni resultados transferibles a esta intención.');
  if(!row.problems.length&&!linked(row.intent,'aboutEntity').length)add('ORPHAN_INTENT',row.intent,[row.intent],[],[],'Problema o contexto explícito','Intención sin relación de significado.');
 }
 for(const n of graph.nodes){
  if(n.type==='Offering'&&!n.representedBy.some(id=>{const a=graph.nodes.find(x=>x.id===id);return a?.type==='Asset'&&a.specificity==='specific';})){
   const rows=coverage.filter(r=>r.possibleInterventions.includes(n.id));add('ASSET_GAP',n.id,rows.map(r=>r.intent),n.supportsCapabilities,n.representedBy,'Página específica de explicación','Oferta existente explicada en Soluciones; registrar gap no crea producto ni página.');
  }
  if(n.type==='Problem'&&!graph.edges.some(e=>e.relation==='expressesProblem'&&e.to===n.id))add('ORPHAN_PROBLEM',n.id,[],n.capabilities||[],n.assetRefs,'Intent relacionado','Problema sin intención o escenario relacionado.');
  if(n.type==='Capability'&&!graph.edges.some(e=>e.relation==='requiresCapability'&&e.to===n.id))add('ORPHAN_CAPABILITY',n.id,[],[n.id],n.assetRefs,'Problema o brecha relacionada','Capacidad sin necesidad trazable.');
  if(n.type==='Content'&&!['coversIntent','explainsProblem','supportsCapability'].some(r=>linked(n.id,r).length))add('UNLINKED_CONTENT',n.id,[],[],[n.id],'Relación temática','Metadata sin intención, problema ni capacidad explícitos.');
 }
 return gaps.sort((a,b)=>a.id.localeCompare(b.id,'en'));
}
