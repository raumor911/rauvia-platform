import type {ServiceIntent} from './seoAiShared';

// Contrato: RAUVIA_SEO_AI_Cuatro_Landings_Benchmark_CIV_Convergencia_v0.3 §3–§6.
// Precios y condiciones: RAUVIA_SEO_AI_Precios_y_entregables_v0.2 (antes de IVA; sin cifras de control interno).
export type CaseId = 'correccion' | 'catalogos' | 'cobertura' | 'proveedores';
export type Table = {caption: string; headers: readonly string[]; rows: readonly (readonly string[])[]};
export type SeoAiCase = {
  id: CaseId; path: string; crumb: string; kicker: string; hook: string; h1: string; lead: string;
  intent: ServiceIntent; ctaLabel: string; demoLabel: string; whatsappMessage: string;
  signal: {nodes: ReadonlyArray<readonly [string, string]>; panel: string; foot: string};
  fit: {intro: string; yes: readonly string[]; noTitle: string; no: readonly string[]};
  story: {title: string; text: string};
  demo: {title: string; intro: string; table: Table; states?: readonly string[]; before?: readonly [string, string]; after?: readonly [string, string]; testQuestion: string; note: string};
  deliverable: {intro: string; items: readonly string[]; notIncluded: string};
  verify: {criterion: string; notJudged: string};
  faqs: ReadonlyArray<readonly [string, string]>;
  prepare: readonly string[]; dontSend: string;
};

export const offers = {
  auditoria: {name: 'Auditoría GEO', to: '/seo-ai/auditoria/', link: 'Ver el detalle de la auditoría GEO', price: '$9,900 MXN + IVA', terms: 'Pago único. Una línea comercial, hasta 3 URLs y 6 preguntas de compra en 2 superficies de IA acordadas. Entrega diagnóstico, evidencia y prioridades.', chip: '$9,900 MXN + IVA · pago único', notPromised: 'No modifica el sitio, no cierra posiciones, no elimina respuestas ni garantiza citas.'},
  implementacion: {name: 'Implementación de SEO para IA', to: '/seo-ai/implementacion/', link: 'Ver el detalle de la implementación', price: '$29,900 MXN + IVA al mes', terms: 'Durante 6 meses · $179,400 MXN + IVA en total, sin renovación automática. Un dominio y una línea comercial; la unidad mensual se acota en la propuesta (hasta 3 URLs existentes o una intervención de plantilla, con una ronda de ajustes). No exige Demanda Inteligente.', chip: '$29,900 MXN + IVA al mes · durante 6 meses · $179,400 MXN + IVA en total', notPromised: 'No incluye rediseño integral, alta masiva de fichas nuevas, integración con marketplaces, cambios sin autorización, recuperación inmediata en asistentes ni renovación automática.'},
} as const;

const sameQuestion: readonly [string, string] = ['¿Auditoría e implementación son lo mismo?', 'No. La auditoría diagnostica y no modifica el sitio. La implementación ejecuta cambios acordados durante seis meses. Puedes comprar la auditoría sola.'];

export const cases: Record<CaseId, SeoAiCase> = {
  correccion: {
    id: 'correccion', path: '/seo-ai/corregir-informacion-en-ia', crumb: 'Corregir información en IA', kicker: 'SEO AI · Corrección',
    hook: 'Si una IA no describe correctamente qué vendes, puede dejarte fuera de la búsqueda adecuada o presentar un servicio que no ofreces.',
    h1: 'Aclara lo que los asistentes de IA dicen de tu empresa',
    lead: 'Auditamos qué afirma, qué fuente puede respaldarlo y qué debes corregir primero.',
    intent: 'auditoria', ctaLabel: 'Solicitar auditoría de mi información', demoLabel: 'Ver una matriz de ejemplo',
    whatsappMessage: 'Hola RAUVIA, quiero solicitar una auditoría de la información que los asistentes de IA dan de mi empresa.',
    signal: {nodes: [['AFIRMACIÓN', 'qué dice la IA'], ['FUENTE', 'qué la respalda'], ['VERDAD', 'qué ofreces']], panel: 'MATRIZ · DEMO', foot: 'respaldada · contradicha'},
    fit: {
      intro: 'Sirve cuando ya existe algo concreto que revisar y alguien puede confirmar qué ofrece la empresa.',
      yes: ['Hay una respuesta, captura o pregunta concreta en la que un asistente describe mal tu oferta.', 'Tienes un sitio comercial con la oferta publicada.', 'Una persona puede validar la verdad del producto o servicio.'],
      noTitle: 'No es el servicio si…', no: ['No existe una oferta estable que describir.', 'Solo buscas borrar una reseña. No gestionamos supresión de contenido ajeno ni reclamaciones ante plataformas.'],
    },
    story: {title: 'Una historia ficticia', text: 'Una empresa entrega gabinetes en Naucalpan, pero no instala. Una página antigua agrupa «entrega e instalación» de otro servicio. Compras pide instalación, que el equipo no ofrece. Se rastrean las fuentes y se separa esa condición, sin afirmar que la página antigua fue la causa si no hay una cita que lo indique.'},
    demo: {
      title: 'Una afirmación, su evidencia y su corrección',
      intro: 'Cada afirmación relevante se registra con su evidencia observada, la verdad que aprueba la empresa, la corrección propuesta y cómo comprobarla. La muestra se puede copiar como plantilla.',
      table: {caption: 'Muestra ficticia de una fila de la matriz de afirmaciones', headers: ['Afirmación', 'Evidencia observada', 'Verdad aprobada', 'Corrección propuesta', 'Verificación'], rows: [['Incluye instalación', 'Sin cita, o cita X', 'La entrega no incluye montaje', 'Ficha y página de cobertura', 'Buscar la condición en el HTML y repetir la pregunta']]},
      states: ['Respaldada', 'Contradicha', 'Sin evidencia', 'No observada'],
      testQuestion: '¿La oferta incluye instalación en Naucalpan o solo entrega, y qué fuente lo indica?',
      note: 'Muestra de formato: no contiene respuestas de un asistente real ni mide impacto.',
    },
    deliverable: {
      intro: 'Compras la Auditoría GEO. El entregable de esta ruta es:',
      items: ['Registro de afirmaciones relevantes por pregunta.', 'Fuentes y URLs revisadas.', 'Contradicciones priorizadas.', 'Plan de cambios con dueño recomendado.'],
      notIncluded: 'La auditoría no cambia el sitio. Corregir las páginas es una implementación y se cotiza por separado.',
    },
    verify: {criterion: 'Cada hallazgo incluye evidencia o una etiqueta de «desconocido», y un criterio para comprobarlo.', notJudged: 'No se juzga el resultado por si una respuesta cambia: no controlamos lo que genera un modelo.'},
    faqs: [
      ['¿Pueden cambiar directamente una respuesta de un asistente?', 'No. Podemos corregir lo que tu empresa publica y repetir la prueba. La respuesta de un asistente depende del propio asistente.'],
      ['¿Qué pasa si no hay cita?', 'Registramos la afirmación sin atribuirla a una URL. Una afirmación sin fuente observable queda como «sin evidencia», no como causa asumida.'],
      ['¿Incluye implementar las correcciones?', 'No. La auditoría entrega el plan; implementar se cotiza por separado como Implementación de SEO para IA.'],
      sameQuestion,
    ],
    prepare: ['La URL de la oferta o página relevante.', 'La pregunta o captura donde ves la descripción equivocada.', 'Quién puede confirmar qué ofrece realmente la empresa.'],
    dontSend: 'No envíes accesos, contraseñas ni datos sensibles en este primer contacto.',
  },
  catalogos: {
    id: 'catalogos', path: '/seo-ai/catalogos-para-ia', crumb: 'Catálogos para IA', kicker: 'SEO AI · Catálogos',
    hook: 'Tu catálogo tiene el modelo correcto, pero el comprador no encuentra para qué sirve o cómo cotizarlo.',
    h1: 'SEO para catálogos de productos en buscadores y asistentes de IA',
    lead: 'Convertimos las fichas prioritarias en páginas que expliquen aplicaciones, variantes y condiciones con datos verificables.',
    intent: 'implementacion', ctaLabel: 'Solicitar propuesta para mi catálogo', demoLabel: 'Ver ficha antes y después',
    whatsappMessage: 'Hola RAUVIA, quiero solicitar una propuesta de implementación de SEO para IA para mi catálogo.',
    signal: {nodes: [['CATÁLOGO', 'pdf · html'], ['FICHA', 'aplicación · límites'], ['COTIZACIÓN', 'datos a confirmar']], panel: 'FICHA · DEMO', foot: 'antes · después'},
    fit: {
      intro: 'Sirve para mejorar un catálogo comercial que ya existe, empezando por una línea prioritaria.',
      yes: ['Tienes un catálogo en PDF o HTML.', 'Hay una línea prioritaria que quieres trabajar primero.', 'Alguien es dueño de los datos de producto y puede aprobarlos.', 'Podemos revisar la plataforma donde se publica.'],
      noTitle: 'Antes de comprometer un sprint…', no: ['Si faltan la ficha o la aprobación de los datos, se empieza por un inventario o diagnóstico.', 'Esta ruta no construye una tienda en línea, no compra pauta ni integra feeds de shopping.'],
    },
    story: {title: 'Una historia ficticia', text: 'Una persona busca una protección para equipo exterior y llega a un PDF donde todos los gabinetes aparecen en la misma tabla. La ficha editada responde en qué aplicación usarlo y qué debe confirmar con ingeniería. El PDF se conserva como respaldo descargable.'},
    demo: {
      title: 'Una ficha HTML que responde antes de cotizar',
      intro: 'La ficha visible reúne nombre y variante, aplicación, condiciones, datos a confirmar, cobertura, enlace al PDF y el camino a cotización. Los datos de la muestra son ficticios: no hay certificación, stock, norma ni plazo reales.',
      table: {caption: 'Muestra ficticia de ficha de producto', headers: ['Nombre y variante', 'Aplicación', 'Condiciones', 'Datos a confirmar', 'Cobertura', 'Siguiente paso'], rows: [['Gabinete metálico, variante exterior', 'Equipo en exteriores', 'No incluye instalación', 'Dimensiones, exposición y grado de protección, con ingeniería', 'Entrega sujeta a código postal', 'PDF descargable y solicitud de cotización']]},
      before: ['Antes', '«Gabinete metálico, consultar disponibilidad».'],
      after: ['Después', '«Gabinete para equipo en exteriores. Confirma dimensiones, exposición y grado de protección con ingeniería. Entrega sujeta a código postal; no incluye instalación».'],
      testQuestion: '¿Para qué aplicación sirve este gabinete y qué debo confirmar antes de cotizar?',
      note: 'Primer lote: una línea que sí se vende, con evidencia aprobada y una pregunta que los compradores repiten. Muestra de formato: no es un resultado.',
    },
    deliverable: {
      intro: 'Compras la Implementación de SEO para IA. El trabajo de esta ruta es:',
      items: ['Selección del primer lote o de una plantilla incluida en el alcance.', 'Cambios versionados.', 'Enlaces desde la categoría hacia cada ficha.', 'Verificación sin depender del PDF, y repetición de las preguntas por separado.'],
      notIncluded: 'Se prioriza la primera unidad de trabajo; el resto del catálogo se define según el alcance acordado. Una URL nueva o un lote fuera del alcance base se cotiza y aprueba antes.',
    },
    verify: {criterion: 'Desde la categoría se puede abrir la ficha, y en el HTML aparecen aplicación, restricción y contacto de forma coherente.', notJudged: 'No se juzga la entrega por que una respuesta cite la ficha.'},
    faqs: [
      ['¿Debo eliminar el PDF del catálogo?', 'No. Usa el HTML para las respuestas y conserva el PDF como detalle descargable si aporta valor.'],
      ['¿Pueden optimizar todo el catálogo en un mes?', 'No como promesa. Se prioriza la primera unidad de trabajo y el resto se define según el alcance acordado.'],
      ['¿Necesito una tienda en línea?', 'No para una ruta de solicitud de cotización. La ficha explica el producto y lleva a un contacto claro.'],
      sameQuestion,
    ],
    prepare: ['La línea prioritaria del catálogo y su URL o PDF público.', 'Quién es dueño de los datos de producto y puede aprobarlos.', 'Si podemos revisar la plataforma donde se publica.'],
    dontSend: 'No adjuntes PDFs ni datos de tus clientes en este primer contacto.',
  },
  cobertura: {
    id: 'cobertura', path: '/seo-ai/cobertura-y-envios', crumb: 'Cobertura y envíos', kicker: 'SEO AI · Cobertura',
    hook: 'Si un comprador pregunta por entrega en su municipio y tu web no distingue envío, retiro e instalación, no puede saber si eres una opción.',
    h1: 'SEO para IA: aclara dónde vendes, envías e instalas',
    lead: 'Publicamos esas condiciones donde se decide la compra.',
    intent: 'implementacion', ctaLabel: 'Solicitar propuesta para mi cobertura', demoLabel: 'Ver matriz de cobertura',
    whatsappMessage: 'Hola RAUVIA, quiero solicitar una propuesta de implementación de SEO para IA para aclarar mi cobertura, envíos e instalación.',
    signal: {nodes: [['ZONA', 'dónde atiendes'], ['MODALIDAD', 'retiro · envío'], ['INSTALACIÓN', 'incluida o no']], panel: 'COBERTURA · DEMO', foot: 'condiciones · contacto'},
    fit: {
      intro: 'Sirve cuando tu oferta depende de la zona y la modalidad, y esas reglas existen pero no se publican con claridad.',
      yes: ['Tienes un producto o servicio real en CDMX o la ZMVM con reglas por modalidad: retiro, envío o instalación.', 'Operación puede confirmar destinos y excepciones.'],
      noTitle: 'Qué no hacemos', no: ['No creamos una página por municipio.', 'No afirmamos cobertura nacional porque exista un botón de WhatsApp.', 'No cambiamos tu logística: publicamos condiciones que tu empresa aprueba.'],
    },
    story: {title: 'Una historia ficticia', text: 'Hay retiro en la oficina de CDMX, envío a Naucalpan sujeto a código postal e instalación no incluida. El comprador necesita elegir con esos tres datos, no con una lista genérica de ciudades.'},
    demo: {
      title: 'Una matriz que responde por zona y modalidad',
      intro: 'La tabla visible indica, por zona y modalidad, qué aplica y quién lo confirma. En el antes/después se reemplaza una frase imposible de verificar por una regla aprobada y el canal para confirmarla.',
      table: {caption: 'Muestra ficticia de matriz de cobertura', headers: ['Zona y modalidad', 'Retiro', 'Envío', 'Instalación', 'Excepción', 'Quién confirma'], rows: [['CDMX · oficina', 'Sí, en la oficina', 'No aplica', 'No incluida', '—', 'Operación'], ['Naucalpan', 'No aplica', 'Sujeto a código postal', 'No incluida', 'Confirmar el código postal antes de cotizar', 'Operación']]},
      before: ['Antes', '«Atendemos toda la ciudad».'],
      after: ['Después', '«Retiro en la oficina de CDMX. Envío a Naucalpan sujeto a código postal. Instalación no incluida. Confirma tu zona con Operación antes de cotizar».'],
      testQuestion: '¿Puedo recibirlo en Naucalpan y la instalación está incluida?',
      note: 'Muestra de formato con datos ficticios. Una solicitud recibida no implica stock, envío ni instalación aceptados.',
    },
    deliverable: {
      intro: 'Compras la Implementación de SEO para IA. El trabajo de esta ruta es:',
      items: ['Bloque de cobertura aprobado por Operación.', 'Cambios en la página de cobertura y en la ficha relevante, o en una plantilla dentro del alcance.', 'Registro de las contradicciones resueltas.'],
      notIncluded: 'Si la necesidad queda resuelta dentro de una ruta de catálogos, se mantiene allí; no se fracciona por ubicación.',
    },
    verify: {criterion: 'La ficha, la página de cobertura y el CTA dicen lo mismo, y cada modalidad tiene una respuesta o una condición.', notJudged: 'No se juzga la entrega por posiciones en mapas ni por menciones en asistentes.'},
    faqs: [
      ['¿Tener una ubicación equivale a tener cobertura?', 'No. Una dirección no dice a qué zonas se vende, envía o instala. La cobertura se publica por modalidad.'],
      ['¿Cómo publico una zona que depende del código postal?', 'Indica que es condicionada y cómo confirmarla: qué dato pedir y con quién. Eso es mejor que una lista de ciudades sin condiciones.'],
      ['¿Van a cambiar mi logística?', 'No. Publicamos las condiciones que tu empresa aprueba; no modificamos cómo operas.'],
      sameQuestion,
    ],
    prepare: ['La modalidad que genera más consultas: retiro, envío o instalación.', 'Las zonas y excepciones que ya conoces.', 'Quién de Operación confirma destinos.'],
    dontSend: 'No envíes accesos, contraseñas ni datos de tus clientes en este primer contacto.',
  },
  proveedores: {
    id: 'proveedores', path: '/seo-ai/proveedores-tecnicos', crumb: 'Proveedores técnicos', kicker: 'SEO AI · Proveedores técnicos',
    hook: 'Si Compras pide opciones para una aplicación y tu sitio solo enumera productos, no hay suficiente información para evaluar tu oferta.',
    h1: 'SEO para IA para proveedores técnicos',
    lead: 'Convertimos una línea técnica en una referencia clara para verificar encaje y pedir cotización.',
    intent: 'implementacion', ctaLabel: 'Solicitar propuesta para mi oferta técnica', demoLabel: 'Ver ficha de evaluación',
    whatsappMessage: 'Hola RAUVIA, quiero solicitar una propuesta de implementación de SEO para IA para mi oferta técnica.',
    signal: {nodes: [['APLICACIÓN', 'para qué sirve'], ['ESPECIFICACIÓN', 'mínimos · límites'], ['COTIZACIÓN', 'datos para pedirla']], panel: 'EVALUACIÓN · DEMO', foot: 'evidencia · cotización'},
    fit: {
      intro: 'Sirve cuando ya vendes una línea técnica y quieres que Compras pueda evaluarla con información pública.',
      yes: ['Hay una línea que ya se vende.', 'Alguien de Ventas e Ingeniería u Operación puede aprobar afirmaciones y evidencia publicable.'],
      noTitle: 'Antes de implementar…', no: ['Si todavía falta definir qué vende la empresa, o hay que cambiar su proceso comercial, primero se delimita eso.', 'Esta ruta no es para captar a quien busca proveedores: es para que tu empresa sea evaluable.'],
    },
    story: {title: 'Una historia ficticia', text: 'Compras busca un proveedor de equipos para exterior. Un competidor hipotético explica entorno, compatibilidad y cómo cotizar; la ficha del proveedor solo enumera tres modelos. El trabajo es documentar si la oferta se puede evaluar, no afirmar que el otro ganó por efecto de la IA.'},
    demo: {
      title: 'Una ficha que permite evaluar y cotizar',
      intro: 'La ficha de evaluación reúne lo mínimo que Compras necesita comprobar. Los datos de la muestra son ficticios: no hay certificaciones ni coeficientes reales.',
      table: {caption: 'Muestra ficticia de ficha de evaluación', headers: ['Aplicación', 'Especificación mínima', 'Límites', 'Evidencia pública', 'Cobertura', 'Datos para cotizar'], rows: [['Protección de equipo en exteriores', 'Compatibilidad confirmada solo para los usos descritos', 'Dimensiones y montaje se revisan con ingeniería', 'Ficha técnica publicada por la empresa', 'Zonas de servicio publicadas', 'Unidad, medidas y zona']]},
      testQuestion: '¿Esta línea sirve para mi aplicación y qué datos necesito para pedir una cotización?',
      note: 'Muestra de formato. Nunca se inventan certificaciones ni coeficientes; todo dato publicado lo aprueba el responsable.',
    },
    deliverable: {
      intro: 'Compras la Implementación de SEO para IA. El trabajo de esta ruta es:',
      items: ['Página o módulo de aplicación.', 'Ficha de oferta o de casos.', 'Criterios para cotizar, verificados con el responsable.'],
      notIncluded: 'No se venden como creación de pipeline comercial.',
    },
    verify: {criterion: 'Un revisor puede responder para quién es la línea, qué debe comprobar y cómo avanzar, y verificarlo en la fuente pública aprobada.', notJudged: 'No se juzga el resultado por nuevas oportunidades de venta ni por menciones en asistentes.'},
    faqs: [
      ['¿Pueden publicar especificaciones sin Ingeniería?', 'No. Las afirmaciones técnicas las aprueba el responsable de tu empresa antes de publicarse.'],
      ['¿Necesito una ficha para cada modelo?', 'No necesariamente. Se eligen los activos según la pregunta de compra, no se documenta todo el catálogo.'],
      ['¿Esto sustituye una evaluación de Compras?', 'No. Prepara información verificable; la decisión sigue siendo del comprador.'],
      sameQuestion,
    ],
    prepare: ['La línea técnica que ya vendes y su URL.', 'Quién de Ventas e Ingeniería u Operación aprueba afirmaciones y evidencia.', 'Qué datos pide Compras para cotizar.'],
    dontSend: 'No envíes especificaciones confidenciales ni datos de clientes en este primer contacto.',
  },
};

// Ola B · enlazado y bloque de decisión por caso (contrato v1.1 §3). Textos literales; no tocar sin revisión editorial.
export const caseRelatedLinks: Record<CaseId, readonly {label: string; href: string}[]> = {
  correccion: [
    {label: "Si el dato incorrecto es dónde entregas o instalas, revisa cómo documentar tu cobertura.", href: "/seo-ai/cobertura-y-envios/"},
  ],
  catalogos: [
    {label: "Si la duda es dónde entregas el producto, revisa cómo explicar tus zonas y modalidades.", href: "/seo-ai/cobertura-y-envios/"},
    {label: "Si Compras necesita validar la aplicación técnica, revisa cómo presentar una línea para evaluación.", href: "/seo-ai/proveedores-tecnicos/"},
  ],
  cobertura: [
    {label: "Si un asistente ya atribuye a tu empresa una zona que no atiendes, revisa cómo comprobar ese dato.", href: "/seo-ai/corregir-informacion-en-ia/"},
    {label: "Si no está clara la aplicación del producto, revisa qué información mostrar en sus fichas.", href: "/seo-ai/catalogos-para-ia/"},
  ],
  proveedores: [
    {label: "Si el problema abarca fichas de toda una línea, revisa cómo priorizar un catálogo.", href: "/seo-ai/catalogos-para-ia/"},
  ],
};

export const caseDecisionContent: Partial<Record<CaseId, {heading: string; intro: string; example: string; scope: string; check: string}>> = {
  catalogos: {
    heading: "La ficha debe explicar para qué sirve el producto",
    intro: "Un catálogo puede tener el producto correcto y aun así dejar al comprador sin saber para qué aplicación sirve o qué dato necesita para cotizar. El trabajo empieza por una línea prioritaria, no por rehacer todo el catálogo.",
    example: "Una ficha solo dice «Caja C-12». La versión organizada distingue tres datos: aplicación (almacenaje en interior), información para cotizar (medidas y cantidad) y una condición por validar (uso a la intemperie). El uso exterior no se presenta como compatible sin confirmación.",
    scope: "Fichas HTML de la línea acordada con aplicación, límites y datos necesarios para solicitar cotización.",
    check: "La ficha permite identificar para qué sirve el producto, qué no está confirmado y qué datos enviar; toda afirmación aprobada se puede cotejar con su fuente.",
  },
  cobertura: {
    heading: "Una zona no significa lo mismo para envío, retiro e instalación",
    intro: "Decir «atendemos la región» no aclara si la empresa envía, instala o solo permite recoger en sucursal. La decisión del comprador depende de combinar zona, modalidad y condición.",
    example: "En Zona A se puede pedir envío previa confirmación del código postal. En Zona B hay retiro en sucursal; la instalación queda por confirmar. La matriz no presenta Zona B como zona de instalación ni convierte una excepción en cobertura general.",
    scope: "Una matriz web con las zonas, modalidades y excepciones que la empresa valide.",
    check: "Cada fila distingue qué está disponible y qué requiere confirmación; la matriz, las fichas y el canal de contacto no se contradicen.",
  },
  proveedores: {
    heading: "Compras necesita comprobar si tu línea sirve para su aplicación",
    intro: "Una lista de modelos no siempre basta para evaluar a un proveedor. Compras necesita comparar la aplicación, los requisitos de selección y la evidencia que respalda lo ofrecido antes de pedir cotización.",
    example: "Una ficha enumera «Serie P-4». La versión organizada pregunta si se usará en interior o exterior, qué dimensiones admite la instalación y qué documento respalda la compatibilidad. Si esa compatibilidad todavía no se valida, la ficha indica que se debe confirmar en vez de declararla.",
    scope: "Presentación de una línea técnica que reúna aplicaciones, requisitos para evaluar el encaje y evidencia disponible.",
    check: "Cada requisito publicado se vincula con su respaldo o se señala como pendiente, y el comprador sabe qué información aportar para cotizar.",
  },
};
