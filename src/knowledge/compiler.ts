import {personProfiles} from './personProfiles.ts';
import {personSchema} from '../seo/personSchema.ts';
import {buildGraph} from './graph.ts';
import {publicProjection} from './publication.ts';
import {assertGraph} from './validate.ts';
import {intentCoverage,detectGaps} from './coverage.ts';
import {RELATIONS} from './relations.ts';
import type {ConceptNode} from './types.ts';
const json=(value:unknown)=>JSON.stringify(value,null,2)+'\n';
const cell=(v:unknown)=>String(Array.isArray(v)?v.join('; '):v??'').replaceAll('|','\\|').replaceAll('\n',' ');
const table=(headers:string[],rows:unknown[][])=>'| '+headers.join(' | ')+' |\n| '+headers.map(()=>'---').join(' | ')+' |\n'+rows.map(r=>'| '+r.map(cell).join(' | ')+' |').join('\n')+'\n';
const csv=(headers:string[],rows:unknown[][])=>[headers,...rows].map(row=>row.map(v=>'"'+cell(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
export function compileKnowledge(){
 const graph=buildGraph();assertGraph(graph);
 const publicGraph=publicProjection(graph);assertGraph(publicGraph,graph);
 const coverage=intentCoverage(graph),gaps=detectGaps(graph),publicIds=new Set(publicGraph.nodes.map(n=>String(n.id)));
 const publicCoverage={schema_version:'1.0.0',graph_version:'1.0.0',locale:'es-MX',scope:'public',basis:'Editorial catalog snapshot; not market demand, efficacy, or the full live WordPress inventory.',limitations:graph.limitations,intents:coverage.filter(r=>publicIds.has(r.intent))};
 // Public rows must not acquire references to excluded/internal nodes.
 for(const r of publicCoverage.intents)for(const id of [r.intent,...r.icps,...r.verticals,...r.problems,...r.restrictions,...r.capabilityGaps,...r.capabilities,...r.possibleInterventions,...r.conditionalInterventions.map(c=>c.id),...(r.primaryAsset?[r.primaryAsset]:[]),...r.supportingAssets])if(!publicIds.has(id))throw new Error(`Public coverage references internal node: ${id}`);
 const headers=['Intent','Family','ICP','Vertical','Problem','Restriction','Capability Gap','Capability','Possible Intervention','Primary Asset','Supporting Assets','Status','Evidence State','Coverage'];
 const rows=coverage.map(r=>[r.intent,r.family,r.icps,r.verticals,r.problems,r.restrictions,r.capabilityGaps,r.capabilities,r.possibleInterventions,r.primaryAsset,r.supportingAssets,r.status,r.evidenceState,r.coverage]);
 const gh=['Gap','Type','Intent(s)','Capability','Existing Coverage','Missing Asset/Evidence','Rationale'];
 const gr=gaps.map(g=>[g.id,g.type,g.intents,g.capabilities,g.existingCoverage,g.missing,g.rationale]);
 const intentMap='# Search intent map — vista derivada V74\n\nGenerado desde `src/knowledge/intents.ts`; editar esa autoridad y ejecutar `npm run build:knowledge`. Las familias históricas no se migran ni se reescriben en otros sistemas. Todas las intenciones iniciales son editoriales, no demanda observada.\n\n'+table(['ID','Family','Expressions','Territory','Status','Visibility'],graph.nodes.filter(n=>n.type==='Intent').map(i=>[i.id,i.family,i.expressions,i.territory,i.status,i.visibility]));
 const problemMap='# Business problem map — vista derivada V74\n\nAutoridad: `src/knowledge/catalog.ts`. Alias conservan conceptos anteriores sin crear nodos duplicados. La ruta describe capacidades e intervenciones posibles, sujetas a contexto; no una solución garantizada.\n\n'+table(['Problem','Aliases','Restriction','Capability','Possible interventions'],graph.nodes.filter((n):n is ConceptNode=>n.type==='Problem').map(p=>[p.id,p.aliases,p.restrictions,p.capabilities,[...new Set(coverage.filter(r=>r.problems.includes(p.id)).flatMap(r=>r.possibleInterventions))]]));
 const matrix='# Matrices V74 — catálogo editorial interno\n\nVista derivada; las filas HYPOTHESIS y los gaps no se publican. Coverage ≠ demand. El Content Gap sólo expresa ausencia en el snapshot de diez artículos, no en todo WordPress. Las condiciones de intervención completas están en `../data/knowledge/intent-coverage.json`.\n\n## Intent coverage\n\n'+table(headers,rows)+'\n## Gaps\n\n'+table(gh,gr);
 const ontology='# Ontología del Knowledge Graph V74\n\nOntología propia de RAUVIA, no Schema.org/JSON-LD. Un nodo representa un concepto, no una ocurrencia observada. Identificadores conceptuales estables e independientes de las URLs. `canonical` pertenece sólo al Asset o Content que representa esa página; `Source.url` es una cita y puede apuntar a esa misma URL.\n\nTipos y campos específicos: `src/knowledge/types.ts`. Cada nodo contiene significado, razón editorial, status, evidenceState, visibilidad, aprobación, fuentes y referencias de assets.\n\n## Relaciones cerradas y tipadas\n\n'+table(['Relation','From','To'],Object.entries(RELATIONS).map(([rel,r])=>[rel,r.from,r.to]))+'\n`relatedTo`, `guaranteedSolution`, `createdBy` y `author` no son relaciones aceptadas. `possibleIntervention` y `mayLeadTo` Ruta 90 requieren condición de prioridad y capacidad de ejecución. AETHRYON produce una ruta de acción; no desemboca obligatoriamente en Ruta 90. El vínculo de automatización requiere proceso, responsables y reglas definidos. Las relaciones `supportedBy` institucionales son referencias editoriales, no validaciones externas.\n';
 const outputs:Record<string,string>={
  'public/llmo/knowledge-graph.json':json(publicGraph),'public/llmo/intent-coverage.json':json(publicCoverage),
  'data/knowledge/person-profiles.json':json(personProfiles(graph)),'data/knowledge/person-schema.json':json(personSchema()),'data/knowledge/master-graph.json':json(graph),'data/knowledge/intent-coverage.json':json(coverage),'data/knowledge/gaps.json':json(gaps),
  'data/knowledge/intent-coverage.csv':csv(headers,rows),'data/knowledge/gaps.csv':csv(gh,gr),
  'docs/search-intent-map.md':intentMap,'docs/business-problem-map.md':problemMap,'docs/knowledge-matrices.md':matrix,'docs/knowledge-graph-ontology.md':ontology
 };
 return {graph,publicGraph,coverage,publicCoverage,gaps,outputs};
}
