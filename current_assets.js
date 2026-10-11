const assetsData = {
  '01': [
    {
      id: 'frente-comercial-esencial',
      name: 'FRENTE COMERCIAL ESENCIAL',
      version: '1.2.0',
      objective: 'Establecer la infraestructura comercial básica para operar.',
      problem: 'La empresa pierde oportunidades porque no tiene una presentación clara, un canal de captura de leads o una propuesta de valor estructurada.',
      result: 'Un sistema mínimo viable que comunica la oferta y captura prospectos sistemáticamente.',
      duration: '4 semanas',
      maturity: 'Temprana / Reestructuración',
      deliverables: [
        'Definición de Propuesta de Valor',
        'Landing Page de Captura',
        'Configuración de Correo Corporativo',
        'Manual de Mensajes Clave'
      ],
      indicators: [
        'Aumento en Tasa de Conversión (Visitante a Lead)',
        'Reducción de Tiempo de Explicación de Servicio'
      ],
      dependencies: ['Ninguna'],
      related: ['Ruta 90', 'Sitios Corporativos']
    }
  ],
  '02': [
    {
      id: 'ruta-90',
      name: 'RUTA 90',
      version: '2.0.0',
      objective: 'Trazar un mapa de acción claro para los próximos 90 días.',
      problem: 'El equipo directivo tiene demasiadas ideas y no sabe por dónde empezar, causando parálisis por análisis.',
      result: 'Un plan de ejecución priorizado con responsables, métricas y entregables definidos.',
      duration: '2 semanas',
      maturity: 'Todas',
      deliverables: [
        'Diagnóstico de Situación Actual',
        'Matriz de Priorización',
        'Plan de Ejecución a 90 Días',
        'Tablero de Seguimiento'
      ],
      indicators: [
        'Velocidad de Ejecución de Iniciativas',
        'Alineación del Equipo Directivo'
      ],
      dependencies: ['Frente Comercial Esencial'],
      related: ['Arquitectura Operativa', 'Diagnóstico']
    },
    {
      id: 'blueprint',
      name: 'BLUEPRINT',
      version: '1.5.0',
      objective: 'Modelar visualmente el funcionamiento de un proceso o sistema.',
      problem: 'El conocimiento está en la cabeza de las personas, lo que impide escalar, delegar o estandarizar.',
      result: 'Documentación visual que estandariza cómo la empresa genera valor.',
      duration: '3 semanas',
      maturity: 'Crecimiento',
      deliverables: ['Diagrama de Flujo de Valor', 'Mapeo de Actores y Sistemas', 'Identificación de Puntos de Fricción'],
      indicators: ['Reducción de Errores Operativos', 'Disminución de Tiempo de Inducción'],
      dependencies: ['Ruta 90'],
      related: ['Arquitectura Operativa']
    },
    {
      id: 'diagnostico',
      name: 'DIAGNÓSTICO',
      version: '3.1.0',
      objective: 'Identificar cuellos de botella y áreas de oportunidad.',
      problem: 'La empresa no crece y no se sabe exactamente qué proceso o sistema está fallando.',
      result: 'Un reporte detallado con hallazgos y recomendaciones accionables.',
      duration: '4 semanas',
      maturity: 'Estancamiento',
      deliverables: ['Reporte de Hallazgos', 'Matriz de Riesgos', 'Roadmap de Soluciones'],
      indicators: ['Identificación de Causas Raíz', 'Viabilidad de Recomendaciones'],
      dependencies: ['Ninguna'],
      related: ['Ruta 90', 'Blueprint']
    },
    {
      id: 'arquitectura-operativa',
      name: 'ARQUITECTURA OPERATIVA',
      version: '2.5.0',
      objective: 'Diseñar la estructura que soportará la operación a escala.',
      problem: 'Los procesos actuales no soportan el volumen de ventas o el tamaño del equipo.',
      result: 'Un diseño organizacional y de procesos optimizado para escalar.',
      duration: '8 semanas',
      maturity: 'Crecimiento Acelerado',
      deliverables: ['Diseño Organizacional', 'Manual de Procesos Core', 'Selección de Herramientas Tecnológicas'],
      indicators: ['Eficiencia Operativa', 'Escalabilidad del Sistema'],
      dependencies: ['Blueprint', 'Diagnóstico'],
      related: ['Gobierno Operativo']
    }
  ],
  '03': [
    {
      id: 'sitios-corporativos',
      name: 'SITIOS CORPORATIVOS',
      version: '2.0.0',
      objective: 'Construir la presencia digital oficial y autoritativa.',
      problem: 'El sitio web actual no refleja el tamaño, capacidad o profesionalismo de la empresa.',
      result: 'Una plataforma web rápida, accesible y orientada a la conversión y autoridad.',
      duration: '6-8 semanas',
      maturity: 'Consolidación',
      deliverables: ['Diseño UI/UX', 'Desarrollo Frontend/Backend', 'Integración CMS', 'Optimización SEO'],
      indicators: ['Tráfico Orgánico', 'Tiempo en Sitio', 'Tasa de Conversión'],
      dependencies: ['Frente Comercial Esencial'],
      related: ['Portales', 'Activos Digitales']
    },
    {
      id: 'landing-pages',
      name: 'LANDING PAGES',
      version: '1.0.0',
      objective: 'Capturar leads para campañas o soluciones específicas.',
      problem: 'Las campañas de marketing envían tráfico a la página de inicio, perdiendo conversiones.',
      result: 'Páginas de alta conversión enfocadas en un único objetivo.',
      duration: '2 semanas',
      maturity: 'Crecimiento',
      deliverables: ['Diseño Optimizado', 'Integración con CRM/Email', 'Pruebas A/B Setup'],
      indicators: ['Tasa de Conversión (Lead/Venta)'],
      dependencies: ['Frente Comercial Esencial'],
      related: ['Sitios Corporativos']
    },
    {
      id: 'portales',
      name: 'PORTALES',
      version: '3.0.0',
      objective: 'Crear plataformas de autoservicio para clientes o proveedores.',
      problem: 'El equipo dedica demasiado tiempo a responder preguntas frecuentes o gestionar transacciones básicas.',
      result: 'Un entorno seguro donde los usuarios pueden gestionar su información y procesos.',
      duration: '10-12 semanas',
      maturity: 'Madurez',
      deliverables: ['Plataforma Web', 'Sistema de Autenticación', 'Integración con ERP/CRM'],
      indicators: ['Reducción de Tickets de Soporte', 'Adopción del Portal'],
      dependencies: ['Arquitectura Operativa'],
      related: ['Sistemas Comerciales']
    },
    {
      id: 'activos-digitales',
      name: 'ACTIVOS DIGITALES',
      version: '1.5.0',
      objective: 'Desarrollar herramientas digitales personalizadas (Calculadoras, Widgets).',
      problem: 'La empresa necesita ofrecer herramientas interactivas para atraer prospectos o mejorar el servicio.',
      result: 'Herramientas digitales funcionales que aportan valor inmediato al usuario.',
      duration: '4-6 semanas',
      maturity: 'Crecimiento',
      deliverables: ['Herramienta Web Interactiva', 'Integración de Datos', 'Analytics'],
      indicators: ['Uso de la Herramienta', 'Generación de Leads'],
      dependencies: ['Ninguna'],
      related: ['Sitios Corporativos']
    },
    {
      id: 'sistemas-comerciales',
      name: 'SISTEMAS COMERCIALES',
      version: '2.8.0',
      objective: 'Conectar marketing, ventas y servicio en un solo flujo.',
      problem: 'Los equipos trabajan en silos con datos fragmentados, perdiendo ventas cruzadas o seguimiento.',
      result: 'Un ecosistema tecnológico integrado que alinea todo el ciclo de ingresos.',
      duration: '8-12 semanas',
      maturity: 'Madurez',
      deliverables: ['Mapeo de Flujo de Ingresos', 'Implementación Tecnológica Integrada', 'Capacitación a Equipos'],
      indicators: ['Ciclo de Venta Promedio', 'Costo de Adquisición de Clientes (CAC)'],
      dependencies: ['Arquitectura Operativa'],
      related: ['CRM', 'Automatización']
    },
    {
      id: 'crm',
      name: 'CRM',
      version: '1.2.0',
      objective: 'Centralizar la gestión de relaciones con clientes.',
      problem: 'Las ventas se pierden porque el seguimiento se lleva en hojas de cálculo o correos aislados.',
      result: 'Una plataforma CRM configurada a la medida del proceso de ventas de la empresa.',
      duration: '4-6 semanas',
      maturity: 'Crecimiento',
      deliverables: ['Configuración de CRM', 'Migración de Datos', 'Automatización de Tareas de Venta'],
      indicators: ['Tasa de Cierre', 'Precisión del Pronóstico de Ventas'],
      dependencies: ['Ninguna'],
      related: ['Sistemas Comerciales', 'Automatización']
    },
    {
      id: 'automatizacion',
      name: 'AUTOMATIZACIÓN',
      version: '2.0.0',
      objective: 'Eliminar tareas manuales repetitivas.',
      problem: 'El equipo pierde horas trasladando datos de un sistema a otro o enviando correos manuales.',
      result: 'Flujos de trabajo automatizados que conectan aplicaciones y ejecutan procesos sin intervención.',
      duration: '3-6 semanas',
      maturity: 'Crecimiento Acelerado',
      deliverables: ['Mapeo de Procesos a Automatizar', 'Configuración de Flujos (Zapier/Make)', 'Monitoreo y Alertas'],
      indicators: ['Horas Manuales Ahorradas', 'Reducción de Errores de Transcripción'],
      dependencies: ['Blueprint'],
      related: ['CRM', 'Sistemas Comerciales']
    }
  ],
  '05': [],
  '04': [
    {
      id: 'growth-partner',
      name: 'GROWTH PARTNER',
      version: '1.0.0',
      objective: 'Acompañar a la dirección en la ejecución estratégica a largo plazo.',
      problem: 'La empresa necesita conocimiento experto continuo para tomar decisiones de crecimiento sin contratar un C-Level a tiempo completo.',
      result: 'Un equipo experto externo integrado a la mesa directiva para impulsar el crecimiento.',
      duration: 'Continuo (Retainer)',
      maturity: 'Escala',
      deliverables: ['Reuniones Estratégicas Mensuales', 'Supervisión de Ejecución', 'Acceso a Red de Especialistas'],
      indicators: ['Crecimiento de Ingresos (YoY)', 'Cumplimiento de Objetivos Estratégicos'],
      dependencies: ['Ruta 90', 'Arquitectura Operativa'],
      related: ['Gobierno Operativo']
    },
    {
      id: 'acompanamiento',
      name: 'ACOMPAÑAMIENTO',
      version: '1.5.0',
      objective: 'Soporte táctico durante la implementación de un sistema o cambio.',
      problem: 'Los proyectos fallan no en el diseño, sino en la adopción por parte del equipo.',
      result: 'Adopción exitosa de nuevas tecnologías o procesos.',
      duration: 'Por Proyecto',
      maturity: 'Transición',
      deliverables: ['Plan de Gestión del Cambio', 'Sesiones de Capacitación', 'Soporte Post-Lanzamiento'],
      indicators: ['Tasa de Adopción de Usuario', 'Satisfacción del Equipo'],
      dependencies: ['Cualquier Activo de Implementación'],
      related: ['Roadmaps']
    },
    {
      id: 'gobierno-operativo',
      name: 'GOBIERNO OPERATIVO',
      version: '2.0.0',
      objective: 'Establecer comités, métricas y rutinas de decisión.',
      problem: 'Las decisiones dependen únicamente del dueño; no hay un sistema de gestión y reporte estructurado.',
      result: 'Un modelo de gestión institucionalizado que no depende de una sola persona.',
      duration: '12 semanas',
      maturity: 'Escala',
      deliverables: ['Diseño de Comités', 'Tableros de Control (Dashboards)', 'Manual de Gobierno Operativo'],
      indicators: ['Frecuencia y Calidad de Reuniones de Gestión', 'Descentralización de Decisiones'],
      dependencies: ['Arquitectura Operativa'],
      related: ['Arquitectura Organizacional']
    },
    {
      id: 'arquitectura-organizacional',
      name: 'ARQUITECTURA ORGANIZACIONAL',
      version: '2.5.0',
      objective: 'Alinear la estructura de puestos y talento con la estrategia.',
      problem: 'El organigrama creció orgánicamente, generando duplicidad de funciones o vacíos de responsabilidad.',
      result: 'Una estructura organizacional diseñada para ejecutar la estrategia de forma eficiente.',
      duration: '8 semanas',
      maturity: 'Consolidación / Escala',
      deliverables: ['Diseño de Organigrama Target', 'Descripciones de Puestos Clave', 'Plan de Transición'],
      indicators: ['Claridad de Roles', 'Eficiencia Operativa (Ingresos por Empleado)'],
      dependencies: ['Diagnóstico'],
      related: ['Gobierno Operativo']
    },
    {
      id: 'roadmaps',
      name: 'ROADMAPS',
      version: '1.2.0',
      objective: 'Visualizar la evolución tecnológica y operativa a varios años.',
      problem: 'Se compran herramientas sin saber cómo encajarán en el futuro de la empresa.',
      result: 'Un plan maestro que guía las inversiones tecnológicas y operativas.',
      duration: '4 semanas',
      maturity: 'Escala',
      deliverables: ['Roadmap Tecnológico', 'Roadmap Operativo', 'Estimación Presupuestal'],
      indicators: ['Alineación de Inversiones con Estrategia'],
      dependencies: ['Arquitectura Operativa'],
      related: ['Growth Partner']
    }
  ]
};
