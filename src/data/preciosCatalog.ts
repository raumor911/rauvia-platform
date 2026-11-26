// Fuente única del catálogo de precios que consumen los crawlers y asistentes (public/llmo/precios.json).
// Cada precio replica el que muestra la página canónica; si una página cambia, este archivo y su test cambian juntos.
// No contiene cifras de control interno, márgenes, descuentos ni promociones.
import {trayectoriaCatalog} from './trayectoriaCatalog.ts';

const BASE='https://rauvia.com.mx';
type Price={
  id:string;name:string;canonical:string;
  price_type:'fixed'|'from'|'free_initial'|'monthly_fixed_term';
  amount:number;currency:'MXN';tax:'+ IVA';billing:string;
  total_amount?:number;term_months?:number;
  audience:string;scope:string[];excludes?:string[];conditions:string[];
};
const iva='+ IVA (precio publicado antes de IVA)';
export const prices:Price[]=[
 {id:'frente-comercial-esencial',name:'Frente Comercial · Esencial',canonical:BASE+'/frente-comercial/',price_type:'fixed',amount:6900,currency:'MXN',tax:'+ IVA',billing:'Pago único por alcance; sin mensualidad obligatoria.',
  audience:'Empresa con una oferta relativamente clara que necesita presentarla mejor.',scope:['Estructura de presentación comercial','Activo digital responsive','Presentación clara de oferta','Evidencia visible'],conditions:['Precio publicado en MXN '+iva+'.','No garantiza ventas, leads ni posiciones; no sustituye CRM, seguimiento, publicidad ni generación de demanda.']},
 {id:'frente-comercial-pro',name:'Frente Comercial · Pro',canonical:BASE+'/frente-comercial/',price_type:'fixed',amount:9900,currency:'MXN',tax:'+ IVA',billing:'Pago único por alcance; sin mensualidad obligatoria.',
  audience:'Empresa que vende soluciones técnicas, personalizadas o que necesitan mayor explicación.',scope:['Reorganización de información','Agrupación de capacidades','Narrativa comercial ampliada','Mejor explicación de soluciones'],conditions:['Precio publicado en MXN '+iva+'.','No garantiza ventas, leads ni posiciones.']},
 {id:'frente-comercial-portafolio',name:'Frente Comercial · Portafolio',canonical:BASE+'/frente-comercial/',price_type:'from',amount:13900,currency:'MXN',tax:'+ IVA',billing:'Pago único por alcance; sin mensualidad obligatoria.',
  audience:'Empresa con varias líneas de servicio cuyo comprador necesita identificar cuál le corresponde.',scope:['Arquitectura de categorías','Agrupación por necesidad','Rutas de decisión','Navegación del portafolio','Páginas o vistas por solución','CTA contextual'],conditions:['Precio «desde» publicado en MXN '+iva+'.','No garantiza ventas, leads ni posiciones.']},
 {id:'presencia-medica-rauvia',name:'Presencia Médica RAUVIA (página médica gratuita)',canonical:BASE+'/pagina-web-gratis-para-medicos/',price_type:'free_initial',amount:0,currency:'MXN',tax:'+ IVA',billing:'Sin costo inicial.',
  audience:'Médicos que quieren una primera presencia profesional.',scope:['Dominio RAUVIA y alojamiento','Perfil profesional básico y especialidad','Ubicación y WhatsApp','Base SEO/GEO','Diseño estándar'],excludes:['Dominio propio','Diseño a medida','Blog','SEO avanzado','Estrategia de contenido','Branding médico','Integraciones avanzadas'],conditions:['«$0 MXN» es el costo inicial del plan básico bajo dominio RAUVIA; el alcance es el del plan básico y no incluye lo listado en excludes.','No garantiza posiciones en buscadores ni resultados inmediatos.']},
 {id:'web-medica-personalizada',name:'Web Médica Personalizada',canonical:BASE+'/pagina-web-para-medicos/',price_type:'from',amount:7900,currency:'MXN',tax:'+ IVA',billing:'Alcance definido por proyecto.',
  audience:'Médicos que necesitan una presentación adaptada a su práctica o consultorio.',scope:['Dominio propio','Diseño más personalizado y más secciones','Contenido por especialidad','Mejor estructura de servicios','SEO local ampliado','Analítica básica'],conditions:['Precio «desde» publicado en MXN '+iva+'; depende de secciones, consultorios, contenido e integraciones.','Páginas que lo publican: /pagina-web-para-medicos/, /pagina-web-gratis-para-medicos/ y /seo-local-para-medicos/.','No garantiza posiciones en buscadores ni resultados inmediatos.']},
 {id:'frente-comercial-medico',name:'Frente Comercial Médico',canonical:BASE+'/pagina-web-para-medicos/',price_type:'from',amount:13900,currency:'MXN',tax:'+ IVA',billing:'Alcance definido por proyecto.',
  audience:'Médicos que necesitan comunicar su experiencia y servicios con una arquitectura completa.',scope:['Arquitectura de oferta completa','Diferenciación profesional','Servicios y preguntas por especialidad','SEO/GEO avanzado','Estrategia de confianza','Contenido base de posicionamiento','Recorrido de contacto','Analítica y optimización'],conditions:['Precio «desde» publicado en MXN '+iva+'; el alcance se define según la operación del consultorio.','Páginas que lo publican: /pagina-web-para-medicos/, /pagina-web-gratis-para-medicos/ y /seo-local-para-medicos/.','No garantiza posiciones en buscadores ni resultados inmediatos.']},
 {id:'seo-ai-auditoria',name:'Auditoría GEO (SEO para IA)',canonical:BASE+'/seo-ai/auditoria/',price_type:'fixed',amount:9900,currency:'MXN',tax:'+ IVA',billing:'Pago único.',
  audience:'Empresa que quiere saber qué afirman los asistentes de IA sobre ella y qué corregir.',scope:['Una línea comercial','Hasta 3 URLs','6 preguntas de compra en 2 superficies de IA','Diagnóstico con evidencia y prioridades'],conditions:['Precio publicado en MXN '+iva+'.','Más URLs, preguntas, mercados o superficies requieren un alcance distinto acordado antes de contratar.','No modifica el sitio ni garantiza posiciones, menciones, citas, tráfico, leads ni ventas.']},
 {id:'seo-ai-implementacion',name:'Implementación de SEO para IA',canonical:BASE+'/seo-ai/implementacion/',price_type:'monthly_fixed_term',amount:29900,currency:'MXN',tax:'+ IVA',billing:'Facturación mensual durante 6 meses, sin renovación automática en la propuesta.',total_amount:179400,term_months:6,
  audience:'Empresa que ya tiene prioridades de corrección de su información pública para IA.',scope:['Un dominio y una línea comercial','Cada mes, un bloque de cambios acordado: hasta 3 URLs existentes o una intervención acotada en una plantilla, no ambas','Registro del antes y el después con evidencia de verificación','Reporte mensual de avance'],conditions:['Precio publicado en MXN '+iva+' al mes; total publicado de 179,400 MXN + IVA por 6 meses.','Se cobra por trabajo entregado cada mes, no solo por monitoreo.','No garantiza posiciones, menciones, citas, tráfico, leads ni ventas.']}
];
// Páginas de servicio sin precio publicado: no se infiere ni se estima ninguno.
export const noPublishedPrice=[
 {name:'Página web para médicos especialistas',canonical:BASE+'/pagina-web-para-medicos-especialistas/'},
 {name:'Página web para consultorio médico',canonical:BASE+'/pagina-web-para-consultorio-medico/',note:'La página indica que los proyectos se cotizan según alcance.'},
 {name:'Agenda y WhatsApp para médicos',canonical:BASE+'/pagina-web-medicos-agenda-whatsapp/'},
 {name:'Página comercial para servicios profesionales',canonical:BASE+'/pagina-comercial-servicios-profesionales/'},
 {name:'Sitio web comercial para PyMEs',canonical:BASE+'/sitio-web-comercial-para-pymes/'},
 {name:'Sitio web para servicios especializados',canonical:BASE+'/sitio-web-servicios-especializados/'},
 {name:'RAUVIAWEB',canonical:BASE+'/rauviaweb/'},
 {name:'Soluciones, AETHRYON y Ruta 90',canonical:BASE+'/soluciones/'}
];
export const preciosCatalog={
 schema_version:'1.0.0',scope:'public',name:'RAUVIA — precios publicados',publisher:'RAUVIA',language:'es-MX',currency:'MXN',reviewed_at:'2026-11-23',
 basis:'Precios visibles en las páginas canónicas de RAUVIA. No son una cotización vinculante: el alcance, la disponibilidad, las condiciones y el precio final se confirman con RAUVIA antes de contratar.',
 rules:[
  'Salvo indicación contraria, los precios se publican en MXN antes de IVA («+ IVA»).',
  '«Desde» indica un precio mínimo de referencia; no es el precio final de un proyecto.',
  'Un precio no garantiza ventas, leads, pacientes, citas, posiciones, menciones ni citas en asistentes de IA.',
  'Si un producto no aparece con precio, la página canónica no publica uno: no inferir ni estimar.',
  'Los precios de RAUVIA Trayectoria son una referencia histórica pendiente de confirmación comercial; ver trayectoria-catalogo.json.'
 ],
 products:prices,
 trayectoria:{canonical:trayectoriaCatalog.canonical,catalog:BASE+'/llmo/trayectoria-catalogo.json',status:trayectoriaCatalog.status,price_version:trayectoriaCatalog.price_version,
  note:'Referencia histórica: no es tarifario vigente ni oferta vinculante.',
  plans:trayectoriaCatalog.plans.map(p=>({name:p.name,monthly_price:p.monthly_price,currency:'MXN',frequency:p.frequency})),
  change_types:trayectoriaCatalog.change_types.map(c=>({name:c.name,price_from:c.price_from,currency:'MXN'})),tax_note:trayectoriaCatalog.change_tax_note},
 no_published_price:noPublishedPrice,
 case_studies:'Los casos publicados en /casos/ no son una oferta con precio. Las cifras de inversión que reportan son métricas del caso, no tarifas de RAUVIA.'
};
