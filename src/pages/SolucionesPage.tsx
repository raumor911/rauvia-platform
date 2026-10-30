import {trackEvent} from '../lib/analytics';
import {ruta90} from '../data/ruta90.js';
import RouteSEO from '../seo/PageMetadata';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RAUVIA_ENTITY } from '../config/entity';
import { ArrowRight, Hexagon, Target, CheckCircle2, ChevronDown, ChevronRight, Layers, Box, Cpu, LineChart, Network, Activity, BarChart3, Database, Globe } from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import GrowthStructuralMap from '../components/GrowthStructuralMap';

// Define the assets structure
const assetsData = {
  '01': [
    {
      id: 'frente-comercial-esencial',
      name: 'FRENTE COMERCIAL ESENCIAL',
      version: '1.2.0',
      objective: 'Organiza y traduce la oferta de una empresa en un activo digital que permite al comprador entender con claridad qué puede contratar, por qué confiar y cuál es el siguiente paso.',
      problem: 'La empresa ya tiene productos, servicios o capacidades reales, pero presentarlos requiere demasiada explicación, información dispersa o múltiples referencias.',
      result: 'Una referencia comercial clara, actualizada y fácil de compartir que organiza la oferta, muestra evidencia disponible y facilita el siguiente paso del comprador.',
      duration: 'Se confirma después de validar el alcance',
      maturity: 'Temprana / Reestructuración',
      deliverables: [
        'Estructura de presentación comercial',
        'Organización de productos y servicios',
        'Evidencia y elementos de confianza',
        'Contacto y siguiente paso'
      ],
      indicators: [
        'Oferta comprensible',
        'Información concentrada',
        'Siguiente paso visible'
      ],
      dependencies: ['Una oferta existente y suficiente información para explicar qué vende actualmente la empresa. Si todavía no está claro qué vender, a quién o cómo estructurar la oferta, primero debe revisarse ese problema.'],
      related: ['Ruta 90','Sistema Comercial', 'Arquitectura Operativa']
    }
  ],
  '02': [
    {
      id: 'ruta-90',
      name: 'RUTA 90',
      version: ruta90.frameworkVersion,
      objective: ruta90.canonicalDefinition,
      problem: 'Existe una prioridad identificada, pero falta convertirla en ejecución con responsables y evidencia.',
      result: 'Capacidad instalada verificable mediante entregables, revisión y evidencia de cierre.',
      duration: '90 días por ciclo; alcance definido según la situación',
      maturity: 'Todas',
      deliverables: [
        'Resultado esperado y línea base',
        'Entregables con responsables',
        'Cadencia e indicadores de revisión',
        'Evidencia de cierre y transferencia'
      ],
      indicators: [
        'Velocidad de Ejecución de Iniciativas',
        'Alineación del Equipo Directivo'
      ],
      dependencies: ['Una prioridad identificada y capacidad para sostener la ejecución.'],
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
  ],
  '04': [
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
  '05': [
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

export default function SolucionesPage() {
  const [activeStage, setActiveStage] = useState('01');
  const [openProduct, setOpenProduct] = useState('frente-comercial-esencial');

  const toggleProduct = (id: string) => {
    setOpenProduct(openProduct === id ? '' : id);
  };

  const stages = [
    { id: '01', title: 'ORGANIZAR', desc: 'Presentación, información y seguimiento básico.', icon: <Box className="w-5 h-5" /> },
    { id: '02', title: 'SISTEMATIZAR', desc: 'Procesos y sistemas comerciales replicables.', icon: <Layers className="w-5 h-5" /> },
    { id: '03', title: 'TECNOLOGIZAR', desc: 'Convertir procesos definidos en capacidades digitales.', icon: <Cpu className="w-5 h-5" /> },
    { id: '04', title: 'AUTOMATIZAR', desc: 'Reducir trabajo repetitivo y fricción.', icon: <Network className="w-5 h-5" /> },
    { id: '05', title: 'ADAPTAR', desc: 'Analizar señales, restricciones y prioridades mediante AETHRYON.', icon: <Activity className="w-5 h-5" /> }
  ];

  const currentProducts = assetsData[activeStage as keyof typeof assetsData] || [];

  return (
    <>
      <RouteSEO path="/soluciones" />
      

      {/* SECCIÓN 1 — HERO */}
      <section className="rv-soluciones-hero pt-32 pb-20 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10">
          <div className="w-[1000px] h-[1000px] border border-slate-300 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[800px] h-[800px] border border-slate-300 rounded-full animate-spin-reverse-slow"></div>
        </div>
        
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 xl:col-span-5 space-y-6 relative z-20">
              <div className="inline-block">
                <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase">
                  PORTAFOLIO DE ACTIVOS
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-rauvia-navy leading-[1.1]">
                CONSTRUIMOS LOS ACTIVOS <br className="hidden lg:block"/>
                QUE TU EMPRESA NECESITA <br className="hidden lg:block"/>
                PARA <span className="text-rauvia-blue">CRECER</span><span className="text-rauvia-gold">.</span>
              </h1>
              
              <div className="space-y-4 text-slate-600 text-base xl:text-lg max-w-md">
                <p>Si los prospectos no avanzan, revisamos seguimiento y trazabilidad comercial. Si la operación depende del dueño, revisamos procesos y responsabilidades.</p>
                <p>Si la capacidad real no se entiende, organizamos su representación comercial. Si la tecnología no tiene un proceso claro, primero definimos la estructura que debe apoyar.</p>
                <p className="font-semibold text-rauvia-navy">El problema orienta la capacidad a construir; la intervención depende del contexto y del alcance.</p>
              </div>

              <div className="pt-4">
                <a href="#catalogo" className="inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-6 py-3 rounded text-sm font-bold tracking-wider transition-all shadow-lg min-h-[52px]">
                  EXPLORAR ACTIVOS
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 xl:col-span-7 flex justify-center relative z-0 mt-12 lg:mt-0">
               {/* Hero Graphic: AETHRYON deploying assets */}
               <Link to="/aethryon/" className="relative w-full max-w-xl aspect-square flex items-center justify-center group cursor-pointer" title="Conocer más sobre AETHRYON">
                  <picture className="contents">
                    <source media="(max-width: 1023px)" type="image/webp"
                      srcSet="/media/rauvia-solutions-hero-mobile-640.webp 640w, /media/rauvia-solutions-hero-mobile-960.webp 960w"
                      sizes="(max-width: 767px) calc(100vw - 32px), 576px" />
                    <img width="1100" height="760" loading="eager" fetchPriority="high" decoding="async" src="/media/rauvia-solutions-hero-support-aethryon-v73.svg" alt="AETHRYON desplegando activos" className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform" />
                  </picture>
               </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — FILOSOFÍA */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-8">
            NO VENDEMOS SERVICIOS.<br/>
            <span className="text-rauvia-blue">CONSTRUIMOS CAPACIDADES.</span>
          </h2>
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>Cada producto de RAUVIA representa una capacidad organizacional.</p>
            <div className="flex flex-wrap justify-center gap-3 my-8">
              <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm text-rauvia-navy">Sistema Comercial</span>
              <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm text-rauvia-navy">Plataforma</span>
              <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm text-rauvia-navy">Estructura Operativa</span>
              <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm text-rauvia-navy">Automatización</span>
              <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm text-rauvia-navy">Arquitectura Completa</span>
            </div>
            <p>El objetivo no es entregar un documento.</p>
            <p className="text-rauvia-navy font-bold">Es dejar instalada una capacidad nueva dentro de la empresa.</p>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 3 — CATÁLOGO DE ACTIVOS */}
      <section id="catalogo" className="py-10 md:py-20 bg-rauvia-bg">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-rauvia-navy">CATÁLOGO DE ACTIVOS</h2>
            <p className="text-slate-600 mt-2">Organizado por el tipo de capacidad que la empresa necesita construir.</p>
          </div>

          <div className="rv-catalog-layout grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <div className="rv-category-nav sticky top-32 space-y-2">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    aria-pressed={activeStage === stage.id}
                    onClick={() => {
                       setActiveStage(stage.id);
                       setOpenProduct(assetsData[stage.id as keyof typeof assetsData]?.[0]?.id || '');
                    }}
                    className={`w-full text-left p-4 rounded-lg flex items-start gap-4 transition-all ${
                      activeStage === stage.id 
                        ? 'bg-white border-l-4 border-l-rauvia-blue shadow-sm border-y border-r border-slate-200' 
                        : 'hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <div className={`mt-1 ${activeStage === stage.id ? 'text-rauvia-blue' : 'text-slate-400'}`}>
                      {stage.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 font-mono mb-1">ENFOQUE {stage.id}</div>
                      <div className={`font-bold tracking-wide ${activeStage === stage.id ? 'text-rauvia-navy' : 'text-slate-600'}`}>
                        {stage.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 hidden lg:block">
                        {stage.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Assets Content */}
            <div className="lg:col-span-9 space-y-6">
              <FadeInUp key={activeStage}>
                
                {/* Specific Header for Etapa 01 Diagram */}
                {activeStage === '01' && (
                  <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-bold text-rauvia-navy mb-6">FLUJO DE VALOR: FRENTE COMERCIAL</h3>
                    <div className="rv-solution-flow flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full max-w-2xl mx-auto">
                      <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg">
                        <span className="text-xs font-bold text-slate-500 block mb-2">Situación Actual</span>
                        <span className="text-sm font-medium">Oferta difícil de entender o presentar</span>
                      </div>
                      <ArrowRight className="w-6 h-6 text-rauvia-blue flex-shrink-0 rotate-90 sm:rotate-0 my-2 sm:my-0" />
                      <div className="flex-1 bg-rauvia-navy text-white border border-rauvia-navy-dark p-4 rounded-lg shadow-lg">
                        <span className="text-xs font-bold text-rauvia-gold block mb-2">Activo</span>
                        <span className="text-sm font-bold">Frente Comercial</span>
                      </div>
                      <ArrowRight className="w-6 h-6 text-rauvia-blue flex-shrink-0 rotate-90 sm:rotate-0 my-2 sm:my-0" />
                      <div className="flex-1 bg-white border border-rauvia-blue/30 p-4 rounded-lg shadow-sm">
                        <span className="text-xs font-bold text-rauvia-blue block mb-2">Resultado</span>
                        <span className="text-sm font-bold text-rauvia-navy">Presentación comercial clara y siguiente paso visible</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
                    <button 
                      aria-expanded={openProduct === product.id}
                      aria-controls={"product-"+product.id}
                      onClick={() => toggleProduct(product.id)}
                      className="w-full text-left p-6 lg:p-8 flex items-center justify-between hover:bg-slate-50 focus:outline-none"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl lg:text-2xl font-extrabold text-rauvia-navy tracking-tight">{product.name}</h3>
                          <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-mono rounded font-bold">v{product.version}</span>
                        </div>
                        <p className="text-slate-600 text-sm lg:text-base font-medium">{product.objective}</p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${openProduct === product.id ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    {/* Technical Sheet Detail */}
                    <div id={"product-"+product.id} hidden={openProduct !== product.id} className={`border-t border-slate-100 transition-all duration-500 overflow-hidden ${openProduct === product.id ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-slate-50/50">
                        
                        {/* Left Column */}
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" /> Problema que resuelve
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 border border-slate-200 rounded-lg">{product.problem}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-rauvia-blue" /> Resultado esperado
                            </h4>
                            <p className="text-sm font-semibold text-rauvia-navy bg-blue-50/50 p-4 border border-blue-100 rounded-lg">{product.result}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 border border-slate-200 rounded-lg">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Duración</span>
                              <span className="text-sm font-semibold text-slate-800">{product.duration}</span>
                            </div>
                            <div className="bg-white p-4 border border-slate-200 rounded-lg">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nivel de madurez</span>
                              <span className="text-sm font-semibold text-slate-800">{product.maturity}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 flex items-center gap-2">
                              <Layers className="w-4 h-4" /> Entregables Core
                            </h4>
                            <ul className="space-y-2">
                              {product.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                  <ChevronRight className="w-4 h-4 text-rauvia-gold flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 flex items-center gap-2">
                              <Activity className="w-4 h-4" /> Indicadores de Éxito
                            </h4>
                            <ul className="space-y-2">
                              {product.indicators.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-6 border-t border-slate-200">
                            <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs">
                              <div>
                                <span className="font-bold text-slate-400 block mb-1">Dependencias:</span>
                                <span className="text-slate-600">{product.dependencies.join(', ')}</span>
                              </div>
                              <div>
                                <span className="font-bold text-slate-400 block mb-1">Relacionados:</span>
                                <span className="text-rauvia-blue">{product.related.map((name,index)=><React.Fragment key={name}>{index>0?', ':''}{name==='Ruta 90' && product.id==='frente-comercial-esencial' ? <Link to="/ruta-90/" className="underline" onClick={()=>trackEvent('cta_click',{destination:'/ruta-90/',source_page:'/soluciones/',context:'related_solution'})}>Ruta 90</Link> : name}</React.Fragment>)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Full Width Footer of the card */}
                        <div className="col-span-1 md:col-span-2 flex justify-end pt-4 border-t border-slate-200 mt-2">
                          <Link 
                            to={product.id === 'ruta-90' ? '/ruta-90/' : '/frente-comercial'}
                            onClick={()=>{if(product.id==='ruta-90')trackEvent('cta_click',{destination:'/ruta-90/',source_page:'/soluciones/',context:'solution_details'});}} 
                            
                            
                            className="inline-flex items-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-6 py-2.5 rounded text-xs font-bold tracking-wider transition-all"
                          >
                            {product.id === 'ruta-90' ? 'CONOCER RUTA 90' : 'CONOCER FRENTE COMERCIAL'}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </FadeInUp>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 4 — RELACIÓN ENTRE PRODUCTOS (MAPA) */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-rauvia-navy mb-4">CAPACIDADES DE CRECIMIENTO</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 md:p-6 mb-10 md:mb-16 max-w-3xl mx-auto text-left flex items-start gap-4">
            <div className="text-amber-500 mt-1 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-amber-900 text-sm md:text-base font-medium leading-relaxed">
              Estas capacidades no forman una ruta obligatoria. La intervención correcta depende del problema, la madurez y las condiciones reales de cada empresa.
            </p>
          </div>
          
          <div className="relative w-full">
             <GrowthStructuralMap />
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 5 — COMPARADOR */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-rauvia-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="soluciones-comparacion" className="text-3xl font-extrabold text-rauvia-navy mb-12 text-center">¿QUÉ ACTIVO NECESITA TU EMPRESA?</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table role="table" className="rv-solutions-table w-full text-left border-collapse" aria-labelledby="soluciones-comparacion">
                <thead role="rowgroup">
                  <tr role="row" className="bg-slate-50 border-b border-slate-200">
                    <th scope="col" role="columnheader" className="p-4 lg:p-6 text-xs font-bold tracking-widest text-slate-500 uppercase w-1/2">Si hoy te ocurre esto...</th>
                    <th scope="col" role="columnheader" className="p-4 lg:p-6 text-xs font-bold tracking-widest text-slate-500 uppercase w-1/2 border-l border-slate-200">Punto de entrada Probable</th>
                  </tr>
                </thead>
                <tbody role="rowgroup" className="divide-y divide-slate-100">
                  {[
                    { req: 'Tu empresa tiene valor, pero cuesta explicarlo o presentarlo con claridad.', res: 'Frente Comercial' },
                    { req: 'Llegan oportunidades, pero no sabes qué pasó con cada una o quién debe dar seguimiento.', res: 'Sistema Comercial / CRM' },
                    { req: 'La empresa funciona, pero demasiadas decisiones o actividades dependen del dueño.', res: 'Procesos / Ruta 90' },
                    { req: 'Cada persona ejecuta el mismo trabajo de manera diferente.', res: 'Arquitectura Operativa' },
                    { req: 'Ya existe un proceso definido pero necesita una capacidad digital.', res: 'Desarrollo tecnológico' },
                    { req: 'Hay tareas repetitivas y reglas claras que consumen demasiado tiempo.', res: 'Automatización' },
                    { req: 'Tienes varios problemas y no está claro cuál resolver primero.', res: 'AETHRYON' }
                  ].map((row, i) => (
                    <tr role="row" key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td role="cell" data-label="Si hoy te ocurre esto…" className="p-4 lg:p-6 text-sm text-slate-700 font-medium">{row.req}</td>
                      <td role="cell" data-label="Punto de entrada probable" className="p-4 lg:p-6 text-sm font-bold text-rauvia-blue border-l border-slate-100 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block" /> {row.res==='Procesos / Ruta 90' ? <>Procesos / <Link to="/ruta-90/" className="underline" onClick={()=>trackEvent('cta_click',{destination:'/ruta-90/',source_page:'/soluciones/',context:'process_solution'})}>Ruta 90</Link></> : row.res}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 6 — AETHRYON INTEGRATION */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-rauvia-navy text-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-rauvia-gold font-bold tracking-widest text-sm uppercase block mb-3">MOTOR DE DECISIÓN</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
              AETHRYON DEFINE EL CAMINO.
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
             <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex-1 text-center w-full">
               <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Señal</span>
               <span className="text-lg font-medium text-white">Situación<br/>Observable</span>
             </div>
             <ArrowRight className="w-6 h-6 text-rauvia-gold rotate-90 md:rotate-0 flex-shrink-0" />
             <div className="bg-rauvia-navy-dark border border-rauvia-blue p-6 rounded-xl flex-1 text-center shadow-[0_0_30px_rgba(37,99,235,0.2)] w-full">
               <img width="64" height="64" loading="lazy" src="/media/iconos-enfoques-rauvia/05-aethryon.svg" alt="Aethryon" className="w-12 h-12 mx-auto mb-2" />
               <span className="text-xs text-rauvia-blue font-bold uppercase tracking-wider block mb-1">Análisis</span>
               <span className="text-lg font-bold text-white">AETHRYON</span>
             </div>
             <ArrowRight className="w-6 h-6 text-rauvia-gold rotate-90 md:rotate-0 flex-shrink-0" />
             <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex-1 text-center w-full">
               <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Solución</span>
               <span className="text-lg font-medium text-white">Activo<br/>Recomendado</span>
             </div>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN FINAL */}
      
    </>
  );
}
