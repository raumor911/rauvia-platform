// Fuente única del catálogo de Soluciones (spec «página Soluciones» v0.2, S-02 y S-06).
// De aquí salen: las cuatro tarjetas de /soluciones/, la ItemList del JSON-LD de esa página, la sección «Soluciones publicadas»
// de llms.txt y llms-full.txt, public/llmo/soluciones.json y las respuestas canónicas de la capa de recuperación.
// Si una tarjeta cambia, se cambia aquí y se regeneran los archivos (`npm run build`); nada de esto se edita a mano en otro lugar.
//
// Reglas del catálogo (S-02, S-06): sin precios (viven en cada página de oferta y en llmo/precios.json), sin orden de prioridad,
// sin promesa de ventas, posiciones, menciones ni citas. Los textos salen de las páginas publicadas; si una difiere, manda la página.
//
// Dos registros de redacción, ambos de la especificación: la tarjeta le habla al lector («tu empresa») y los archivos para
// máquinas están en tercera persona («una empresa»). `definitionMachine`, `audienceMachine` e `includesMachine` (solo donde la
// tarjeta dice «tu») son la misma frase en tercera persona;
// tests/capa-maquinas-soluciones.test.mjs comprueba que no se desfasen de la tarjeta.

export const SOLUCIONES_URL = 'https://rauvia.com.mx/soluciones/';
// Fecha de la «Última revisión» visible en la página, en soluciones.json (reviewed_at) y en llms.txt. Se actualiza cuando cambie el catálogo.
export const SOLUCIONES_REVIEWED_AT = '2026-11-26';
export const SOLUCIONES_REVIEWED_LABEL = '26 de noviembre de 2026';

const BASE = 'https://rauvia.com.mx';

export const soluciones = [
  {
    id: 'frente-comercial',
    name: 'Frente Comercial',
    definition: 'Frente Comercial organiza la oferta que tu empresa ya tiene en una referencia clara, para que el comprador entienda qué puede contratar, por qué confiar y cuál es el siguiente paso.',
    definitionMachine: 'Frente Comercial organiza la oferta que una empresa ya tiene en una referencia clara, para que el comprador entienda qué puede contratar, por qué confiar y cuál es el siguiente paso.',
    audience: 'Empresa con una oferta existente y suficiente información para explicar qué vende hoy.',
    audienceMachine: 'Empresas con una oferta existente y suficiente información para explicarla.',
    includes: [
      'Estructura de presentación comercial y organización de productos y servicios.',
      'Evidencia y elementos de confianza.',
      'Contacto y siguiente paso visible.'
    ],
    excludes: 'CRM, seguimiento de oportunidades, publicidad, generación de demanda ni estrategia comercial completa.',
    url: `${BASE}/frente-comercial/`,
    path: '/frente-comercial/',
    linkLabel: 'Ver alcance y precio de Frente Comercial',
    // Niveles Esencial, Pro y Portafolio: sus precios viven en /frente-comercial/ y en precios.json.
    priceSource: ['frente-comercial-esencial', 'frente-comercial-pro', 'frente-comercial-portafolio'],
    llms: '[Frente Comercial](https://rauvia.com.mx/frente-comercial/): Organiza la oferta que una empresa ya tiene en una referencia clara, para que el comprador entienda qué puede contratar, por qué confiar y cuál es el siguiente paso. Para empresas con una oferta existente y suficiente información para explicarla. Niveles Esencial, Pro y Portafolio. No incluye CRM, seguimiento de oportunidades, publicidad, generación de demanda ni estrategia comercial completa.'
  },
  {
    id: 'seo-para-ia',
    name: 'SEO para IA',
    definition: 'SEO para IA es preparar y verificar la información pública de tu empresa para que buscadores y asistentes puedan encontrar qué vendes, para qué sirve y dónde lo entregas.',
    definitionMachine: 'SEO para IA es preparar y verificar la información pública de una empresa para que buscadores y asistentes puedan encontrar qué vende, para qué sirve y dónde lo entrega.',
    audience: 'Empresa con sitio y oferta, y quien apruebe lo publicado.',
    audienceMachine: 'Empresas con sitio y oferta, y quien apruebe lo publicado.',
    // Ajustado a /seo-ai/auditoria/ y /seo-ai/implementacion/: la auditoría «no modifica tu sitio»; la oferta corregida y aprobada es de la implementación.
    // Recortado a ≤90 palabras por tarjeta (S-02), contando nombre y etiquetas.
    includes: [
      'Revisión con evidencia de lo que consulta un buscador o asistente.',
      'Con la implementación, tu oferta corregida y aprobada.',
      'Registro fechado de las preguntas de compra.'
    ],
    includesMachine: [
      'Revisión con evidencia de lo que consulta un buscador o asistente.',
      'Con la implementación, la oferta de la empresa corregida y aprobada.',
      'Registro fechado de las preguntas de compra.'
    ],
    excludes: 'No promete posiciones, menciones ni citas; una respuesta de un tercero puede cambiar.',
    url: `${BASE}/seo-ai/`,
    path: '/seo-ai/',
    linkLabel: 'Ver alcance y precio de SEO para IA',
    priceSource: ['seo-ai-auditoria', 'seo-ai-implementacion'],
    llms: '[SEO para IA](https://rauvia.com.mx/seo-ai/): Prepara y verifica la información pública de una empresa para que buscadores y asistentes puedan encontrar qué vende, para qué sirve y dónde lo entrega. Se ofrece como [auditoría](https://rauvia.com.mx/seo-ai/auditoria/) y como [implementación](https://rauvia.com.mx/seo-ai/implementacion/). No promete posiciones, menciones ni citas.'
  },
  {
    id: 'ruta-90',
    name: 'Ruta 90',
    // «Adoptado» no se quita: la página y answer:entidad-ruta90 dicen que RAUVIA no se atribuye su creación.
    definition: 'Ruta 90 es un método de ejecución de 90 días, adoptado por RAUVIA, para convertir una prioridad empresarial en resultados, entregables, responsables, métricas y evidencia.',
    definitionMachine: 'Ruta 90 es un método de ejecución de 90 días, adoptado por RAUVIA, para convertir una prioridad empresarial en resultados, entregables, responsables, métricas y evidencia.',
    audience: 'Empresa con una prioridad clara que necesita ejecución en un plazo definido.',
    audienceMachine: 'Empresas con una prioridad ya identificada que necesitan ejecución en un plazo definido.',
    // Ajustado a /ruta-90/ (capítulo 08, Modalidad): el marco puede aplicarse solo o con acompañamiento de RAUVIA.
    includes: [
      'Un ciclo de 90 días con resultado esperado, responsables y entregables.',
      'Revisión semanal y evidencia de cierre.',
      'Aplicación por tu cuenta o con acompañamiento de RAUVIA, según el alcance.'
    ],
    includesMachine: [
      'Un ciclo de 90 días con resultado esperado, responsables y entregables.',
      'Revisión semanal y evidencia de cierre.',
      'Aplicación por cuenta de la empresa o con acompañamiento de RAUVIA, según el alcance.'
    ],
    excludes: 'Una garantía de terminación absoluta: los 90 días son un horizonte, no una promesa.',
    url: `${BASE}/ruta-90/`,
    path: '/ruta-90/',
    // /ruta-90/ no publica precio (precios.json lo lista en no_published_price): el enlace no dice «precio».
    linkLabel: 'Ver alcance de Ruta 90',
    priceSource: [],
    llms: '[Ruta 90](https://rauvia.com.mx/ruta-90/): Método de ejecución de 90 días, adoptado por RAUVIA, para convertir una prioridad empresarial en resultados, entregables, responsables, métricas y evidencia. Requiere una prioridad ya identificada. No es una garantía de terminación absoluta.'
  },
  {
    id: 'medicos',
    name: 'Páginas para médicos',
    definition: 'Las páginas para médicos son páginas web que RAUVIA crea o actualiza con información profesional que el médico valida, con una opción gratuita y opciones personalizadas.',
    definitionMachine: 'Las páginas para médicos son páginas web que RAUVIA crea o actualiza con información profesional que el médico valida, con una opción gratuita y opciones personalizadas.',
    audience: 'Médicos, especialistas y consultorios que quieren ser más fáciles de encontrar y contactar.',
    audienceMachine: 'Médicos, especialistas y consultorios que quieren ser más fáciles de encontrar y contactar.',
    includes: [
      'Página gratuita bajo dominio RAUVIA: perfil, especialidad, ubicación, WhatsApp y base SEO/GEO.',
      'Opciones personalizadas: dominio propio, diseño y secciones a la medida.'
    ],
    excludes: 'La página gratuita no incluye dominio propio, diseño a medida, blog ni agenda; no garantiza posiciones.',
    url: `${BASE}/pagina-web-para-medicos/`,
    path: '/pagina-web-para-medicos/',
    linkLabel: 'Ver alcance y precio de las páginas para médicos',
    // Única entrada gratuita publicada; no se extiende a otros públicos (S-02).
    extraLink: {label: 'Ver la página gratuita para médicos', url: `${BASE}/pagina-web-gratis-para-medicos/`, path: '/pagina-web-gratis-para-medicos/'},
    priceSource: ['presencia-medica-rauvia', 'web-medica-personalizada', 'frente-comercial-medico'],
    llms: '[Páginas para médicos](https://rauvia.com.mx/pagina-web-para-medicos/): Presencia web para médicos y profesionistas de la salud, con una página médica gratuita bajo dominio RAUVIA ([detalle](https://rauvia.com.mx/pagina-web-gratis-para-medicos/)) y opciones personalizadas.'
  }
];

// Fuera del catálogo a propósito (S-02, S-06 L-03): no se listan hasta que Producto lo confirme.
export const solucionesExcluidas = [
  {id: 'trayectoria', reason: 'Su catálogo es una referencia histórica pendiente de confirmación comercial (llmo/trayectoria-catalogo.json).'},
  {id: 'entrada-gratuita-empresas', reason: 'Camino gratuito para empresas sin confirmar por Producto. La única gratuidad publicada es la de médicos.'}
];

export const OTRAS_RUTAS_TEXTO = 'Cuando la necesidad va más allá de estas soluciones, RAUVIA define con la empresa un alcance. Esas intervenciones no son paquetes predefinidos ni están incluidas por defecto en las soluciones publicadas.';

export const wordCount = text => text.trim().split(/\s+/).filter(Boolean).length;
// Texto de una tarjeta tal como se lee (nombre, definición y los tres campos con sus etiquetas, sin el enlace).
export const cardText = s => [s.name, s.definition, 'Para quién:', s.audience, 'Qué recibes:', ...s.includes, 'Qué no incluye:', s.excludes].join(' ');

// ItemList del JSON-LD de /soluciones/ (S-04.5): solo las soluciones con tarjeta; name, url y description = texto visible; sin position.
export const solucionesItemList = () => ({
  '@type': 'ItemList',
  '@id': `${SOLUCIONES_URL}#catalogo`,
  name: 'Soluciones de RAUVIA',
  itemListOrder: 'https://schema.org/ItemListUnordered',
  numberOfItems: soluciones.length,
  itemListElement: soluciones.map(s => ({'@type': 'ListItem', name: s.name, url: s.url, description: s.definition}))
});
