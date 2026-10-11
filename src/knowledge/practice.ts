import {base,type PracticeAreaNode,type PracticeOrigin,type CareerEvidenceNode,type SourceNode} from './types.ts';
import {PERSON_ID} from '../config/personKnowledge.ts';
// The approved career declaration supports application territories, not employers,
// exam awards, client results or independent verification.
export const careerSources:SourceNode[]=[{
 ...base('Source','source:raul-career-declaration','Trayectoria funcional aprobada por el titular',[],
 'Declaración de experiencia profesional aprobada en V75: análisis, procesos, medios de pago e integraciones. No acredita empleo en organizaciones del ecosistema ni resultados garantizados.'),
 publication:{approved:true,basis:'editorial_model'},kind:'approved_declaration',declarationScope:'career',
 verification:'editorial_snapshot',publisher:PERSON_ID,snapshotDate:'2026-10-07'
}];
export const careerEvidence:CareerEvidenceNode[]=[
 {...base('CareerEvidence','career:raul-prosa','PROSA: análisis de negocio y diseño funcional',[],
 'Trayectoria declarada en el CV público en PROSA como Business Analyst / Diseñador TI, con soluciones relacionadas con ecosistemas de pagos.'),
 personRef:PERSON_ID,employer:'PROSA',topics:['Business Analysis','Functional Analysis','Technology Delivery'],ecosystemRefs:['VISA','Mastercard','Banco de México'],sources:['source:raul-public-cv'],attributionLimit:'Participación en soluciones relacionadas; no empleo en VISA, Mastercard o Banco de México.'},
 {...base('CareerEvidence','career:raul-isem','ISEM: análisis y mejora de procesos',[],
 'Experiencia de análisis y mejora de procesos declarada en el CV público.'),
 personRef:PERSON_ID,employer:'ISEM',topics:['Process Analysis','Process Improvement','BPMN'],ecosystemRefs:[],sources:['source:raul-public-cv'],attributionLimit:'Trayectoria de primera parte; no es validación independiente del empleador.'},
 {...base('CareerEvidence','career:raul-functional-delivery','Trayectoria: pagos, requerimientos e integraciones',[],
 'Territorios de aplicación profesional aprobados por el titular; se conservan separados de la práctica comercial de RAUVIA.'),
 personRef:PERSON_ID,topics:['Business Analysis','Functional Analysis','Requirements Analysis','Process Analysis','BPMN','UML','AS-IS','TO-BE','Impact Analysis','Dependency Analysis','Integrations','APIs','UAT','Requirements Traceability','Incident Analysis','Process Improvement','Stakeholder Coordination','Product ↔ Engineering','Technology Delivery',
 'Payment Systems','Transaction Flows','Payment Messaging','Originación','Procesamiento','Mensajería','Envío','Liquidación','Confirmación','Conciliación'],
 ecosystemRefs:['SPEI','SPID','VISA','Mastercard','Banco de México'],sources:['source:raul-career-declaration'],attributionLimit:'Declaración de trayectoria aprobada, sin inferir empleadores, fechas, certificaciones de examen ni expertise universal.'}
];
const problem=(...ids:string[])=>ids.map(id=>'problem:'+id);
const capability=(...ids:string[])=>ids.map(id=>'capability:'+id);
export const B2B_PROBLEMS=problem('oportunidades-sin-trazabilidad','seguimiento-comercial-fragmentado','brecha-capacidad-percepcion','oferta-poco-clara','dependencia-fundador','procesos-fragmentados','tecnologia-sin-proceso','prioridades-confusas','ejecucion-sin-continuidad');
export const B2B_CAPABILITIES=capability('medicion','seguimiento-comercial-estructurado','trazabilidad-comercial','representacion-comercial','traduccion-comercial','autonomia-operativa','operacion-repetible','priorizacion');
const limit='Área de práctica respaldada editorialmente; puede ayudar a analizar, estructurar y diseñar capacidades. La selección de intervención requiere contexto y diagnóstico; no acredita expertise universal ni garantiza resultados.';
function area(id:string,label:string,origin:PracticeOrigin,topics:string[],problems:string[],caps:string[],career:string[],assets:string[],description=limit):PracticeAreaNode {
 return {...base('PracticeArea','practice:'+id,label,assets,description),publication:{approved:true,basis:'editorial_model'},practiceOrigin:origin,topics,problems,supportsCapabilities:caps,
  careerEvidenceRefs:career,evidenceContentRefs:[],throughOrganizationRefs:origin==='CAREER_EVIDENCE'?[]:['org:rauvia'],
  sources:[...new Set([...assets.map(id=>'source:'+id.replace('asset:','')),...career.flatMap(id=>careerEvidence.find(c=>c.id===id)?.sources||[])])],attributionLimit:limit,guaranteesResults:false};
}
export const practiceAreas:PracticeAreaNode[]=[
 area('payments-ecosystem','Ecosistema de medios de pago','CAREER_EVIDENCE',
 ['SPEI','SPID','VISA','Mastercard','Banco de México','Payment Systems','Transaction Flows','Payment Messaging','Originación','Procesamiento','Mensajería','Envío','Liquidación','Confirmación','Conciliación','APIs','Servicios','Integraciones','Dependencias','UAT','Requirements Traceability','Incident Analysis'],[],[],['career:raul-prosa','career:raul-functional-delivery'],[],
 'Participación profesional en análisis y diseño funcional de soluciones de medios de pago, respaldada por trayectoria; no implica empleo en los organismos o marcas del ecosistema.'),
 area('business-functional-analysis','Análisis de negocio y arquitectura funcional','BOTH',
 ['requirements-analysis','functional-analysis','business-rules','use-cases','user-stories','acceptance-criteria','BPMN','UML','AS-IS','TO-BE','gap-analysis','impact-analysis','dependency-analysis','UAT'],
 problem('procesos-fragmentados','tecnologia-sin-proceso'),capability('operacion-repetible','priorizacion'),['career:raul-functional-delivery','career:raul-isem'],['asset:soluciones']),
 area('technology-integration','Tecnología, integraciones y diseño funcional','BOTH',
 ['APIs','Servicios','Integraciones','Sistemas internos','Data flows','Dependencias','Impact analysis','Functional solution design','CRM/ERP functional architecture'],
 problem('tecnologia-sin-proceso'),capability('operacion-repetible','priorizacion'),['career:raul-functional-delivery'],['asset:soluciones']),
 area('b2b-pyme-business-solutions','Aplicación de soluciones a negocios B2B y PyMEs','RAUVIA_PRACTICE',
 ['B2B','PyMEs','Análisis de negocio','Procesos','Capacidades','Arquitectura operativa','Sistemas comerciales','Tecnología'],B2B_PROBLEMS,B2B_CAPABILITIES,[],['asset:nosotros','asset:soluciones'],
 'Aplicación de análisis de negocio, procesos, capacidades, arquitectura operativa, sistemas comerciales y tecnología para estructurar y resolver problemas en negocios B2B y PyMEs, partiendo de necesidades, restricciones y capacidades antes de seleccionar una intervención.'),
 area('operational-architecture','Arquitectura operativa','BOTH',
 ['Procesos','Dependencias','Roles','Reglas','Autonomía operativa','Operación repetible','AS-IS','TO-BE','Capability gaps','Process design'],
 problem('dependencia-fundador','procesos-fragmentados'),capability('autonomia-operativa','operacion-repetible'),['career:raul-isem','career:raul-functional-delivery'],['asset:soluciones']),
 area('commercial-systems','Sistemas y estructura comercial','RAUVIA_PRACTICE',
 ['Seguimiento','Trazabilidad','Medición','CRM','Pipeline','Procesos comerciales','Reglas','Responsabilidades','Información comercial'],
 problem('oportunidades-sin-trazabilidad','seguimiento-comercial-fragmentado'),capability('seguimiento-comercial-estructurado','trazabilidad-comercial','medicion'),[],['asset:soluciones']),
 area('capability-market-translation','Traducción de capacidad al mercado','RAUVIA_PRACTICE',
 ['Representación comercial','Traducción comercial','Claridad de oferta','Frente Comercial','Brecha capacidad-percepción','Oferta técnica difícil de explicar'],
 problem('brecha-capacidad-percepcion','oferta-poco-clara'),capability('representacion-comercial','traduccion-comercial'),[],['asset:frente-comercial','asset:soluciones']),
 area('strategic-prioritization','Análisis y priorización estratégica','BOTH',
 ['Problem framing','Restriction analysis','Capability gaps','Dependency analysis','Impact analysis','Prioritization','Solution architecture','Decision support'],
 problem('prioridades-confusas','ejecucion-sin-continuidad'),capability('priorizacion'),['career:raul-functional-delivery'],['asset:aethryon','asset:soluciones'])
];
