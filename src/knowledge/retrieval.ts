import type {Graph,IntentNode} from './types.ts';
import {intentCoverage} from './coverage.ts';
export const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
// Build/test helper only. It never handles a visitor, invokes AI, or routes the website.
export function retrieve(graph:Graph,query:string,context:{priorityIdentified?:boolean;executionCapacity?:boolean}={}){
 const q=normalize(query),intents=graph.nodes.filter((n):n is IntentNode=>n.type==='Intent'&&n.visibility==='public'&&n.publication.approved&&['canonical','supported'].includes(n.status));
 let matches=intents.filter(i=>i.expressions.some(e=>normalize(e)===q));
 if(!matches.length)matches=intents.filter(i=>i.matchGroups.some(group=>group.every(part=>q.includes(normalize(part)))));
 const rows=intentCoverage(graph).filter(r=>matches.some(i=>i.id===r.intent));
 return {state:rows.length===0?'unmatched':rows.length>1?'ambiguous':'matched',matches:rows.map(row=>({...row,possibleInterventions:row.possibleInterventions.filter(id=>id!=='method:ruta90'||(context.priorityIdentified&&context.executionCapacity)),conditionalInterventions:row.conditionalInterventions,qualification:'Relaciones editoriales posibles; requieren contexto y diagnóstico, sin garantía ni recomendación automática.'}))};
}
