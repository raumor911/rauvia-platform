import {base,type IntentNode,type Family} from './types.ts';
type Row=[string,string,Family,string?,string[]?,string[][]?];
function group(rows:Row[],icp:string,verticals:string[],problem:string,asset:string,territory:string,internal=false):IntentNode[]{
 return rows.map(([key,label,family,p=problem,extra=[],matchGroups=[]])=>{
  const assets=internal?[]:[asset,...extra].map(x=>'asset:'+x);
  return {...base('Intent','intent:'+key,label,assets,internal?'Hipótesis editorial interna sin soporte público suficiente; no representa demanda observada.':'Formulación editorial de una necesidad relacionada con problemas y páginas existentes, sin inferir demanda.',internal),
   publication:{approved:!internal,basis:internal?'internal_hypothesis':'editorial_model'},family,expressions:[label],icps:icp?[icp]:[],verticals:verticals.map(x=>'vertical:'+x),mapsToProblems:p?['problem:'+p]:[],contexts:[],assets,primaryAsset:assets[0],territory:'territory:'+territory,matchGroups};
 });
}
const commercial:Row[]=[
 ['prospectos-no-avanzan','Tengo prospectos pero no avanzan','PROBLEM'],
 ['cotizaciones-sin-seguimiento','Tengo prospectos pero después de cotizar no sé qué ocurrió.','PROBLEM',undefined,[],[['cotiz','no se'],['cotizaciones','seguimiento'],['cotiz','perd'],['cotiz','ocurr']]],
 ['clientes-interesados-se-pierden','Los clientes interesados se pierden','PROBLEM'],
 ['whatsapp-carga-proceso-comercial','WhatsApp carga todo el proceso comercial','PROBLEM','seguimiento-comercial-fragmentado'],
 ['no-se-que-pasa-oportunidades','No sé qué pasa con las oportunidades','PROBLEM'],
 ['organizar-seguimiento-comercial','Quiero organizar el seguimiento comercial','SOLUTION'],
 ['crm-pyme','CRM para una PyME','CATEGORY','tecnologia-sin-proceso'],
 ['que-necesito-antes-crm','¿Qué debe existir antes de un CRM?','COMPARISON','tecnologia-sin-proceso',[],[['antes','crm'],['crm','no mejora','ventas']]],
 ['sistema-comercial-pyme','Sistema comercial para PyME','SOLUTION'],
 ['como-dar-seguimiento-cotizaciones','Cómo dar seguimiento a cotizaciones','SOLUTION']
];
const operations:Row[]=[
 ['empresa-depende-del-dueno','Mi empresa depende demasiado de mí.','PROBLEM','dependencia-fundador',[],[['empresa','depende','mi'],['negocio','depende','dueno'],['empresa','depende','dueno']]],
 ['procesos-dependen-personas','Los procesos dependen de personas','PROBLEM','procesos-fragmentados'],
 ['crecimiento-genera-desorden','El crecimiento genera desorden','PROBLEM','procesos-fragmentados'],
 ['empresa-dejo-de-avanzar','La empresa dejó de avanzar','PROBLEM','ejecucion-sin-continuidad'],
 ['demasiadas-prioridades','Tengo demasiadas prioridades','PROBLEM','prioridades-confusas',['aethryon']],
 ['no-se-que-resolver-primero','No sé qué resolver primero','PROBLEM','prioridades-confusas',['aethryon']],
 ['automatizar-o-estructurar','Diferencia entre automatización y estructuración','COMPARISON','tecnologia-sin-proceso'],
 ['software-o-proceso','¿Necesito software o un proceso?','COMPARISON','tecnologia-sin-proceso'],
 ['como-ordenar-operacion-pyme','Cómo ordenar la operación de una PyME','SOLUTION','procesos-fragmentados'],
 ['como-reducir-dependencia-dueno','Cómo reducir la dependencia del dueño en una empresa','SOLUTION','dependencia-fundador'],
 ['consultoria-escalar-operaciones','Consultoría para escalar operaciones','PROVIDER','procesos-fragmentados']
];
const professionals:Row[]=[
 ['mi-web-no-representa-mi-negocio','Mi web no representa mi negocio','PROBLEM','brecha-capacidad-percepcion'],
 ['mi-experiencia-no-se-entiende','Mi experiencia no se entiende','PROBLEM'],
 ['clientes-no-entienden-mi-oferta','Los clientes no entienden mi oferta','PROBLEM'],
 ['servicio-dificil-de-explicar','Soy consultor y mi página no explica bien qué hago.','PROBLEM',undefined,[],[['consultor','pagina','explica'],['consultor','web','que hago'],['consultor','servicio','explicar']]],
 ['solo-tengo-redes-sociales','Sólo tengo redes sociales','PROBLEM','presencia-digital-fragmentada'],
 ['como-explicar-servicio-profesional','Cómo explicar un servicio profesional','SOLUTION'],
 ['como-generar-confianza-online','Cómo generar confianza online','SOLUTION'],
 ['pagina-web-servicios-profesionales','Página web para servicios profesionales','CATEGORY'],
 ['pagina-comercial-servicios-profesionales','Página comercial para servicios profesionales','SOLUTION'],
 ['sitio-web-consultoria','Sitio web para consultoría','CATEGORY'],
 ['web-para-consultor','Web para consultor','USE_CASE']
];
const technical:Row[]=[
 ['capacidad-tecnica-no-se-percibe','Tenemos mucha capacidad técnica pero nuestra web no la refleja.','PROBLEM',undefined,[],[['capacidad tecnica','web'],['capacidad tecnica','sitio'],['capacidad industrial','presentar']]],
 ['sitio-no-refleja-capacidad','El sitio no refleja nuestra capacidad','PROBLEM'],
 ['clientes-no-entienden-oferta-tecnica','Los clientes no entienden la oferta técnica','PROBLEM','oferta-poco-clara'],
 ['servicios-especializados-dificiles-explicar','Los servicios especializados son difíciles de explicar','PROBLEM','oferta-poco-clara'],
 ['empresa-b2b-no-comunica-valor','La empresa B2B no comunica su valor','PROBLEM'],
 ['sitio-web-servicios-especializados','Sitio web para servicios especializados','SOLUTION'],
 ['sitio-web-empresa-b2b','Sitio web para una empresa B2B','CATEGORY'],
 ['como-presentar-servicios-tecnicos','Cómo presentar servicios técnicos','SOLUTION'],
 ['como-explicar-capacidad-industrial','Cómo explicar capacidad industrial','SOLUTION']
];
const medical:Row[]=[
 ['pagina-web-medicos','Página web para médicos','CATEGORY'],
 ['pagina-web-gratis-medicos','Página web gratis para médicos','COMPARISON',undefined,['pagina-web-gratis-medicos']],
 ['pagina-web-medicos-especialistas','Soy médico especialista y quiero que entiendan qué atiendo, dónde consulto y cómo contactarme.','SOLUTION','informacion-medica-dispersa',['pagina-web-medicos-especialistas','seo-local-medicos'],[['medico','especialista'],['especialidad','consultorio','contacto']]],
 ['pagina-web-consultorio-medico','Página web para consultorio médico','USE_CASE','informacion-medica-dispersa',['pagina-web-consultorio-medico']],
 ['seo-local-medicos','SEO local para médicos','SOLUTION','presencia-digital-fragmentada',['seo-local-medicos']],
 ['agenda-whatsapp-medicos','Agenda y WhatsApp para médicos','SOLUTION','ruta-contacto-fragmentada',['agenda-whatsapp-medicos']],
 ['presencia-medica-dispersa','Mi presencia médica está dispersa','PROBLEM'],
 ['depender-redes-medico','Como médico dependo de redes sociales','PROBLEM'],
 ['depender-directorios-medicos','Dependo de directorios médicos','PROBLEM'],
 ['explicar-especialidad','Quiero explicar mi especialidad médica','SOLUTION','informacion-medica-dispersa',['pagina-web-medicos-especialistas']],
 ['mostrar-trayectoria-medica','Quiero mostrar mi trayectoria médica','SOLUTION','informacion-medica-dispersa',['pagina-web-medicos-especialistas']],
 ['mostrar-ubicacion-consultorio','Quiero mostrar la ubicación del consultorio','SOLUTION','ruta-contacto-fragmentada',['seo-local-medicos']],
 ['facilitar-primer-contacto','Quiero facilitar el primer contacto médico','SOLUTION','ruta-contacto-fragmentada',['agenda-whatsapp-medicos']],
 ['solicitar-cita-online','Quiero solicitar una cita online','USE_CASE','ruta-contacto-fragmentada',['agenda-whatsapp-medicos']],
 ['varios-medicos-consultorio','Varios médicos en un consultorio','USE_CASE','informacion-medica-dispersa',['pagina-web-consultorio-medico']],
 ['varias-especialidades-consultorio','Varias especialidades en el consultorio','USE_CASE','informacion-medica-dispersa',['pagina-web-consultorio-medico']],
 ['varias-ubicaciones-medicas','Varias ubicaciones médicas','USE_CASE','ruta-contacto-fragmentada',['pagina-web-consultorio-medico']],
 ['ser-encontrado-localmente','Quiero ser encontrado localmente como médico','SOLUTION','presencia-digital-fragmentada',['seo-local-medicos']]
];
export const intents:IntentNode[]=[
 ...group(commercial,'icp:pyme-deterioro-comercial',[],'oportunidades-sin-trazabilidad','soluciones','sistemas-comerciales'),
 ...group(operations,'icp:pyme-dependencia-operativa',[],'procesos-fragmentados','soluciones','arquitectura-operativa'),
 ...group(professionals,'icp:servicio-profesional-confianza',['professional-services'],'oferta-poco-clara','pagina-comercial-servicios-profesionales','activos-digitales'),
 ...group(technical,'icp:brecha-capacidad-percepcion',['technical-b2b'],'brecha-capacidad-percepcion','sitio-web-servicios-especializados','activos-digitales'),
 ...group(medical,'icp:profesional-medico-presencia-digital',['medical'],'presencia-digital-fragmentada','pagina-web-medicos','activos-digitales'),
 ...group([['presencia-local-restaurante','Presencia local de un restaurante','PROBLEM'],['menu-digital','Menú digital','SOLUTION'],['reservas-restaurante','Reservas para restaurante','USE_CASE'],['restaurante-depende-redes','El restaurante depende de redes','PROBLEM'],['catering-corporativo','Catering corporativo','USE_CASE'],['pagina-web-restaurante','Página web para restaurante','CATEGORY']], 'icp:negocio-local-presencia-fragmentada',['restaurant'],'presencia-digital-fragmentada','','activos-digitales',true),
 ...group([['presentar-capacidad-exportadora','Presentar capacidad exportadora','PROBLEM'],['sitio-b2b-exportacion','Sitio B2B de exportación','SOLUTION'],['comunicar-certificaciones-capacidad','Comunicar certificaciones y capacidad','SOLUTION']], 'icp:brecha-capacidad-percepcion',['export-business'],'brecha-capacidad-percepcion','','activos-digitales',true),
 ...group([['que-es-arquitectura-operativa','¿Qué es arquitectura operativa?','ENTITY','procesos-fragmentados']], 'icp:pyme-dependencia-operativa',[],'procesos-fragmentados','soluciones','arquitectura-operativa'),
 ...group([['infraestructura-temporal-b2b','Seguimiento comercial en infraestructura temporal B2B','USE_CASE']], 'icp:pyme-deterioro-comercial',['temporary-infrastructure'],'oportunidades-sin-trazabilidad','case-infraestructura-temporal-b2b','sistemas-comerciales')
];
for(const [key,label,context,asset] of [['que-es-rauvia','¿Qué es RAUVIA?','org:rauvia','nosotros'],['que-es-aethryon','¿Qué es inteligencia estructural y AETHRYON?','system:aethryon','aethryon'],['que-es-ruta90','¿Qué es Ruta 90?','method:ruta90','ruta90']]){
 intents.push({...group([[key,label,'ENTITY','']], '',[],'',asset,'inteligencia-estructural')[0],status:'canonical',contexts:[context]});
}
// Prefer the purpose-specific page instead of the general medical overview.
for(const i of intents.filter(i=>i.verticals.includes('vertical:medical')&&i.assets.length>1)){
 i.assets=[...new Set([...i.assets.slice(1),i.assets[0]])];i.assetRefs=[...i.assets];i.primaryAsset=i.assets[0];i.sources=i.assets.map(a=>'source:'+a.slice(6));
}
intents.find(i=>i.id==='intent:crm-pyme')!.expressions.push('¿Por qué implementar un CRM no mejora las ventas?');
intents.find(i=>i.id==='intent:automatizar-o-estructurar')!.expressions.push('¿Automatizar o estructurar?');
intents.find(i=>i.id==='intent:que-es-aethryon')!.expressions.push('¿Qué es AETHRYON?','¿Qué es inteligencia estructural?');
