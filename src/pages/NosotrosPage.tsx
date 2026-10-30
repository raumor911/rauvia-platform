import RouteSEO from '../seo/PageMetadata';
import { RAUVIA_ENTITY } from '../config/entity';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, ShieldCheck, Target, Layers, Settings, BarChart3, TrendingUp, Hexagon } from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import WhatsAppCTA from '../components/WhatsAppCTA';

export default function NosotrosPage() {

  return (
    <>
      <RouteSEO path="/nosotros" />
      <link rel="preload" as="image" media="(min-width: 1024px)" href="/media/rauvia-nosotros-hero-structure-v73.svg" fetchPriority="high" />
      
      

      {/* SECCIÓN 1 — HERO */}
      <section className="rv-nosotros-hero pt-32 pb-20 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10">
          <div className="w-[800px] h-[800px] border border-slate-300 rounded-full"></div>
          <div className="absolute w-[600px] h-[600px] border border-slate-300 rounded-full"></div>
        </div>
        
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 xl:col-span-5 space-y-6 relative z-20">
              <div className="inline-block">
                <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase">
                  RAUVIA CONSULTING
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-rauvia-navy leading-[1.1]">
                CONSTRUIMOS LA ESTRUCTURA <br/>
                QUE PERMITE A LAS EMPRESAS <br/>
                <span className="text-rauvia-blue">CRECER CON CLARIDAD</span><span className="text-rauvia-gold">.</span>
              </h1>
              
              <p className="text-slate-600 text-base xl:text-lg max-w-md">
                Somos una firma mexicana de consultoría estratégica y desarrollo tecnológico. RAUVIA ayuda a empresas con capacidad real que encuentran una brecha entre lo que pueden hacer, cómo lo entiende el mercado y cómo está estructurada su operación. Primero identifica qué está limitando el avance y después construye la capacidad comercial, operativa o tecnológica necesaria.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <WhatsAppCTA 
                   href="https://wa.me/525586494076" 
                  className="flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-5 py-3 rounded text-xs xl:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-rauvia-navy/20 min-h-[52px]"
                >
                  HABLAR CON RAUVIA
                  <ArrowRight className="w-4 h-4" />
                </WhatsAppCTA>
                <Link 
                  to="/aethryon/"
                  className="flex items-center justify-center gap-2 text-rauvia-navy hover:text-rauvia-blue px-4 py-3 rounded text-xs xl:text-sm font-semibold tracking-wide transition-all whitespace-nowrap min-h-[52px]"
                >
                  <PlayCircle className="w-5 h-5 text-rauvia-blue" />
                  CONOCER CÓMO TRABAJAMOS
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 xl:col-span-7 flex justify-center relative z-0 mt-12 lg:mt-0">
               {/* Hero Graphic */}
               <div className="relative w-full max-w-2xl">
                 <img width="960" height="640" loading="lazy" src="/media/rauvia-nosotros-hero-structure-v73.svg" alt="Estructura Nosotros" className="w-full h-auto object-contain" />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — ORIGEN DEL PROBLEMA */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className="flex justify-center">
              {/* Visual Origen */}
              <div className="relative w-full">
                <img width="1600" height="760" loading="lazy" src="/media/rauvia-structure-problem-aethryon.svg" alt="Estructura del Problema" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 4 — FORMA DE TRABAJO */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-white border-y border-slate-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[1600px]">
              <img width="1800" height="980" loading="lazy" src="/media/aethryon-process-v5.svg" alt="De la ambigüedad a un sistema ejecutable" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 5 — PRINCIPIOS */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-rauvia-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold mb-10 md:mb-16 text-center tracking-tight">PRINCIPIOS DE TRABAJO</h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { title: 'CLARIDAD ANTES QUE COMPLEJIDAD', desc: 'Una solución debe poder comprenderse antes de poder ejecutarse.', icon: 'M4 4h16v16H4z M10 10h4v4h-4z' },
              { title: 'ESTRUCTURA ANTES QUE ESCALA', desc: 'Crecer sin estructura aumenta fricción, dependencia y costo.', icon: 'M4 20h16v-4H4z M8 12h8v-4H8z M10 4h4v4h-4z' },
              { title: 'TECNOLOGÍA CON PROPÓSITO', desc: 'La tecnología debe resolver una necesidad operativa concreta.', icon: 'M12 4L4 20h16z M12 12v4' },
              { title: 'EVIDENCIA ANTES QUE CERTEZA ARTIFICIAL', desc: 'Diferenciamos hechos, hipótesis e inferencias antes de recomendar una decisión.', icon: 'M12 22A10 10 0 10 12 2a10 10 0 000 20z M12 6v6l4 2' },
              { title: 'EJECUCIÓN SOBRE PRESENTACIÓN', desc: 'Un diagnóstico solo tiene valor cuando puede convertirse en una ruta de acción.', icon: 'M5 12l5 5L20 7' }
            ].map((p, i) => (
              <div key={i} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] p-8 border border-slate-700 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors flex-grow-0">
                <svg className="w-8 h-8 text-rauvia-gold mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={p.icon} />
                </svg>
                <h3 className="text-sm font-bold tracking-widest text-slate-200 mb-3 uppercase leading-relaxed">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 6 — AETHRYON */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-white border-b border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-rauvia-gold uppercase block mb-6">NÚCLEO DE INTELIGENCIA ESTRATÉGICA</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">
                AETHRYON HACE VISIBLE<br/>
                LO QUE UNA ORGANIZACIÓN<br/>
                <span className="text-rauvia-blue">NECESITA CONECTAR.</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
                <p>AETHRYON es el sistema de análisis y convergencia desarrollado por RAUVIA para interpretar señales, identificar fricción, evaluar oportunidades y estructurar decisiones ejecutables.</p>
                <p>No sustituye la experiencia directiva ni representa una solución universal para cualquier problema empresarial.</p>
                <p>La organiza, la contrasta y la convierte en una arquitectura de acción.</p>
              </div>
              <Link to="/aethryon/" className="inline-flex items-center gap-2 text-rauvia-navy hover:text-rauvia-blue font-bold tracking-wider text-sm transition-colors uppercase">
                CONOCER AETHRYON <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex justify-center relative">
               <Link to="/aethryon/" className="w-full max-w-lg block group cursor-pointer" title="Conocer más sobre AETHRYON">
                 <img width="1400" height="1060" loading="lazy" src="/media/aethryon-convergence-animated.svg" alt="AETHRYON" className="w-full object-contain group-hover:scale-[1.01] transition-transform" />
               </Link>
            </div>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 7 — FUNDADOR */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-rauvia-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">
              RAUVIA FUE CONSTRUIDA DESDE LA INTERSECCIÓN ENTRE <span className="text-rauvia-blue">NEGOCIO, OPERACIÓN Y TECNOLOGÍA.</span>
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>RAUVIA fue fundada por Raúl Morales como una firma orientada a convertir análisis, estructura y tecnología en capacidades ejecutables para empresas.</p>
              <p>Actualmente, aporta la dirección, el criterio estratégico, la arquitectura de soluciones y la evolución metodológica de la organización.</p>
              <p>Esta visión intelectual y metodológica se institucionaliza a través de RAUVIA, garantizando que el diagnóstico de negocio siempre preceda a la herramienta tecnológica.</p>
              
              <div className="pt-4">
                <a 
                  href="https://www.linkedin.com/in/raumor/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-500 hover:text-rauvia-blue transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Perfil profesional
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'INGENIERÍA', desc: 'Pensamiento sistémico y resolución estructurada.' },
              { title: 'DIRECCIÓN', desc: 'Estrategia, organización y toma de decisiones.' },
              { title: 'TECNOLOGÍA', desc: 'Arquitectura funcional y desarrollo de activos digitales.' },
              { title: 'EJECUCIÓN', desc: 'Implementación en operaciones y proyectos reales.' }
            ].map((b, i) => (
              <div key={i} className="bg-white p-6 border border-slate-100 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded flex items-center justify-center mb-4">
                  <div className="w-2 h-2 bg-rauvia-blue rounded-full"></div>
                </div>
                <h3 className="text-sm font-bold text-rauvia-navy uppercase tracking-widest mb-2">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 8 — RELACIÓN CON EL CLIENTE */}
      <FadeInUp>
      <section className="py-10 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 flex flex-col sm:flex-row gap-8 justify-center">
              {/* Antes */}
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex-1 text-center flex flex-col items-center">
                <div className="text-xs font-bold tracking-widest text-slate-400 mb-6 uppercase">Antes</div>
                <div className="flex gap-2 justify-center mb-6 opacity-40">
                  <div className="w-6 h-6 border-2 border-slate-400 rounded"></div>
                  <div className="w-6 h-6 border-2 border-slate-400 rounded-full"></div>
                  <div className="w-6 h-6 border-2 border-slate-400 rotate-45"></div>
                </div>
                <div className="text-sm font-medium text-slate-600">Dependencia,<br/>dispersión y fricción.</div>
              </div>
              
              {/* Después */}
              <div className="bg-white p-8 rounded-xl border border-rauvia-blue/30 shadow-lg flex-1 text-center flex flex-col items-center relative">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-rauvia-blue hidden sm:block">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold tracking-widest text-rauvia-blue mb-6 uppercase">Después</div>
                <div className="flex gap-2 justify-center mb-6">
                  <div className="w-6 h-6 bg-rauvia-navy rounded"></div>
                  <div className="w-6 h-6 bg-rauvia-navy rounded"></div>
                  <div className="w-6 h-6 bg-rauvia-navy rounded"></div>
                </div>
                <div className="text-sm font-bold text-rauvia-navy">Claridad, transferencia<br/>y medición.</div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">
                NO BUSCAMOS CONVERTIRNOS<br/>
                <span className="text-rauvia-blue">EN OTRA CAPA DE COMPLEJIDAD.</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>Trabajamos con dueños y equipos directivos que necesitan resolver un problema visible, construir una capacidad específica o preparar a la organización para una siguiente etapa.</p>
                <p>Cada intervención debe dejar una estructura más clara, transferible y medible que la que existía al comenzar.</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      </FadeInUp>
      
    </>
  );
}
