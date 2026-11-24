import RouteSEO from '../seo/PageMetadata';
import { RAUVIA_ENTITY } from '../config/entity';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import FadeInUp from '../components/FadeInUp';
import WhatsAppCTA from '../components/WhatsAppCTA';
import { useRef, useState, type CSSProperties } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageFx from '../hooks/usePageFx';
import ConvergenceField from '../components/ConvergenceField';
import HeroScene from '../components/HeroScene';
import { IntersectionVenn, ConvergenceScene } from '../components/NosotrosVisuals';
import useNosotrosFx from '../hooks/useNosotrosFx';
import '../styles/scrollReveal.css';
import '../styles/pageFrontier.css';
import '../styles/nosotrosFx.css';

export default function NosotrosPage() {
  const root = useRef<HTMLDivElement>(null);
  useScrollReveal(root, ':scope > div > section > div');
  usePageFx(root);
  useNosotrosFx(root);
  const [pick, setPick] = useState<number | null>(null);

  return (
    <div ref={root} className="fx-page fx-nosotros">
      <div className="fx-progress" aria-hidden="true" />
      <RouteSEO path="/nosotros" />
      <link rel="preload" as="image" media="(min-width: 1024px)" href="/media/rauvia-nosotros-hero-structure-v73.svg" fetchPriority="high" />
      
      

      {/* SECCIÓN 1 — HERO */}
      <section className="rv-nosotros-hero fx-hero pt-32 pb-20 overflow-hidden relative">
        <ConvergenceField coreSelector=".fx-scene-core" origin={[0.68, 0.5]} className="fx-field" overlay="shield" />
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10">
          <div className="w-[800px] h-[800px] border border-slate-300 rounded-full"></div>
          <div className="absolute w-[600px] h-[600px] border border-slate-300 rounded-full"></div>
        </div>
        
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 xl:col-span-5 space-y-6 relative z-20">
              <div className="inline-block">
                <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase">
                  SOBRE RAUVIA
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-rauvia-navy leading-[1.1]">
                TRABAJO ESPECIALIZADO Y TECNOLOGÍA <br/>
                <span className="text-rauvia-blue">PARA RESOLVER PROBLEMAS REALES</span><span className="text-rauvia-gold">.</span>
              </h1>
              
              <div className="text-slate-600 text-base xl:text-lg max-w-md space-y-3">
                <p>RAUVIA es una empresa mexicana que combina metodología, tecnología y trabajo especializado para ayudar a otras empresas a entender sus desafíos y desarrollar soluciones que puedan poner en práctica.</p>
                <p>Algunas necesidades empiezan con algo concreto: explicar mejor una oferta o preparar la información de una empresa para buscadores y asistentes de IA. Otras requieren revisar la forma en que se vende, se opera o se toman decisiones. El alcance se define según la situación.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/soluciones/"
                  className="flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-5 py-3 rounded text-xs xl:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-rauvia-navy/20 min-h-[52px]"
                >
                  EXPLORAR SOLUCIONES
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <WhatsAppCTA 
                   href="https://wa.me/525586494076" 
                  className="flex items-center justify-center gap-2 text-rauvia-navy hover:text-rauvia-blue px-4 py-3 rounded text-xs xl:text-sm font-semibold tracking-wide transition-all whitespace-nowrap min-h-[52px]"
                >
                  <PlayCircle className="w-5 h-5 text-rauvia-blue" aria-hidden="true" />
                  HABLAR CON RAUVIA
                </WhatsAppCTA>
              </div>
            </div>

            <div className="lg:col-span-6 xl:col-span-7 flex justify-center relative z-0 mt-12 lg:mt-0">
               {/* Hero Graphic */}
               <div className="relative w-full max-w-[620px]">
                 <HeroScene chips={[
                   { label: 'Problema real', x: 20, y: 18, dir: 'in' },
                   { label: 'Alcance acordado', x: 80, y: 22 },
                   { label: 'Capacidades operativas', x: 78, y: 82 },
                   { label: 'Capacidades tecnológicas', x: 24, y: 84 },
                 ]}>
                   <img width="960" height="640" loading="lazy" src="/media/rauvia-nosotros-hero-structure-v73.svg" alt="Estructura Nosotros" className="w-full h-auto object-contain" />
                 </HeroScene>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — QUÉ HACEMOS */}
      <FadeInUp>
      <section id="que-hacemos" className="fx-light py-12 md:py-24 bg-white border-y border-slate-100 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-widest text-rauvia-gold uppercase block mb-4">QUÉ HACEMOS</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">Una necesidad concreta puede revelar un problema más amplio.</h2>
          <div className="space-y-4 text-slate-600 text-base lg:text-lg leading-relaxed">
            <p>Una empresa puede tener conocimiento, clientes y experiencia, pero aun así encontrar difícil explicar lo que ofrece, dar seguimiento a sus oportunidades o conectar la información con su operación.</p>
            <p>En RAUVIA comenzamos por entender la situación. A partir de ahí definimos el alcance: puede ser un activo digital, un diagnóstico, una intervención comercial u operativa, o trabajo tecnológico especializado. No todas las empresas necesitan la misma solución ni tienen que recorrer el mismo camino.</p>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 3 — DOS PUERTAS DE ENTRADA */}
      <FadeInUp>
      <section id="puertas" className="fx-light py-12 md:py-24 bg-slate-50 border-b border-slate-100 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-widest text-rauvia-gold uppercase block mb-4">DOS PUERTAS DE ENTRADA</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-10">Dos formas de empezar a trabajar con RAUVIA.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col shadow-sm">
              <h3 className="text-sm font-bold tracking-widest text-rauvia-navy uppercase mb-4">Frente Comercial</h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">Si tu empresa ya tiene productos, servicios o experiencia, pero explicarlos requiere reunir mensajes, archivos y enlaces, organizamos esa información en un activo comercial digital. La intención es que un comprador pueda entender qué haces, revisar la evidencia disponible y saber cómo avanzar.</p>
              <Link to="/frente-comercial/" className="inline-flex items-center gap-2 text-rauvia-blue hover:text-rauvia-navy font-bold text-sm tracking-wide">Conocer Frente Comercial <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
            </article>
            <article className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col shadow-sm">
              <h3 className="text-sm font-bold tracking-widest text-rauvia-navy uppercase mb-4">SEO para IA</h3>
              <div className="text-slate-600 leading-relaxed mb-6 flex-grow space-y-3">
                <p>Si quieres revisar cómo se encuentra y se interpreta la información de tu empresa, trabajamos sobre acceso, claridad de la oferta, aplicaciones, condiciones y cobertura. Después documentamos lo que se puede observar con preguntas acordadas en las superficies definidas.</p>
                <p>No controlamos las respuestas de buscadores o asistentes ni garantizamos posiciones, menciones o ventas.</p>
              </div>
              <Link to="/seo-ai/" className="inline-flex items-center gap-2 text-rauvia-blue hover:text-rauvia-navy font-bold text-sm tracking-wide">Conocer SEO para IA <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
            </article>
          </div>
          <div className="mt-8 border-l-4 border-rauvia-gold bg-white rounded-r-xl p-6">
            <h3 className="text-sm font-bold tracking-widest text-rauvia-navy uppercase mb-2">Cuando la necesidad va más allá</h3>
            <p className="text-slate-600 leading-relaxed mb-3">Si el problema incluye estrategia, seguimiento comercial, operación o tecnología, podemos definir una intervención más amplia. El trabajo especializado —incluida la consultoría— se acuerda a partir de un problema y un alcance concretos; no está incluido automáticamente en los productos anteriores.</p>
            <Link to="/soluciones/" className="inline-flex items-center gap-2 text-rauvia-blue hover:text-rauvia-navy font-bold text-sm tracking-wide">Ver nuestras capacidades <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 4 — CÓMO TRABAJAMOS */}
      <FadeInUp>
      <section id="como-trabajamos" className="fx-light py-12 md:py-24 bg-white border-b border-slate-100 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-widest text-rauvia-gold uppercase block mb-4">CÓMO TRABAJAMOS</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-10">Entender, definir, ejecutar y revisar.</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              ['Comprender', 'Escuchamos a las personas involucradas y revisamos el contexto, la información y las capacidades existentes.'],
              ['Delimitar', 'Acordamos qué problema atender, cuál es el alcance, qué queda fuera y cómo se revisará la entrega.'],
              ['Diseñar', 'Definimos una solución adecuada: puede incluir contenido, un activo digital, procesos, análisis o tecnología.'],
              ['Construir e implementar', 'Ejecutamos lo acordado o acompañamos al equipo responsable, de acuerdo con el proyecto.'],
              ['Verificar y aprender', 'Revisamos entregables y evidencia disponible; diferenciamos lo que se comprobó de lo que todavía es una hipótesis o depende de terceros.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6">
                <span className="shrink-0 w-9 h-9 rounded-full bg-rauvia-navy text-rauvia-gold flex items-center justify-center text-sm font-bold" aria-hidden="true">{i + 1}</span>
                <div><h3 className="font-bold text-rauvia-navy mb-1">{t}</h3><p className="text-slate-600 text-sm leading-relaxed">{d}</p></div>
              </li>
            ))}
          </ol>
          <p className="text-slate-500 text-sm">El orden y la profundidad varían según el servicio. No prometemos una transformación integral cuando solo se contrata un alcance específico.</p>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 5 — PRINCIPIOS */}
      <FadeInUp>
      <section className="fx-dark fx-principles nx-principles py-10 md:py-20 bg-rauvia-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold mb-10 md:mb-16 text-center tracking-tight">PRINCIPIOS PARA TRABAJAR CON CLARIDAD</h2>
          
          <div className={'nx-opts flex flex-wrap justify-center gap-8' + (pick !== null ? ' has-pick' : '')}>
            {[
              { title: 'CLARIDAD ANTES QUE COMPLEJIDAD', desc: 'Una solución debe poder entenderse y utilizarse por las personas responsables.', icon: 'M4 4h16v16H4z M10 10h4v4h-4z' },
              { title: 'ESTRUCTURA ANTES QUE ESCALA', desc: 'Antes de ampliar una actividad, conviene entender sus dependencias, recursos y restricciones.', icon: 'M4 20h16v-4H4z M8 12h8v-4H8z M10 4h4v4h-4z' },
              { title: 'TECNOLOGÍA CON PROPÓSITO', desc: 'Una herramienta aporta valor cuando responde a una necesidad concreta y puede incorporarse al trabajo.', icon: 'M12 4L4 20h16z M12 12v4' },
              { title: 'EVIDENCIA ANTES QUE CERTEZA ARTIFICIAL', desc: 'Separamos hechos, hipótesis y datos desconocidos para no atribuir resultados sin soporte.', icon: 'M12 22A10 10 0 10 12 2a10 10 0 000 20z M12 6v6l4 2' },
              { title: 'EJECUCIÓN SOBRE PRESENTACIÓN', desc: 'El análisis debe servir para tomar decisiones y producir entregables adecuados al alcance acordado.', icon: 'M5 12l5 5L20 7' }
            ].map((p, i) => (
              <div key={i} style={{ '--i': i } as CSSProperties} className={'fx-card nx-opt nx-reveal w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] p-8 border border-slate-700 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors flex-grow-0' + (pick === i ? ' is-picked' : '')}>
                <button type="button" className="nx-pick" aria-pressed={pick === i} aria-labelledby={'nx-opt-' + i} onClick={() => setPick(pick === i ? null : i)} />
                <svg className="w-8 h-8 text-rauvia-gold mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={p.icon} />
                </svg>
                <h3 id={'nx-opt-' + i} className="text-sm font-bold tracking-widest text-slate-200 mb-3 uppercase leading-relaxed">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 6 — AETHRYON */}
      <FadeInUp>
      <section className="fx-light py-10 md:py-20 bg-white border-b border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-rauvia-gold uppercase block mb-6">AETHRYON</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">
                UNA FORMA DE CONECTAR<br/>
                <span className="text-rauvia-blue">INFORMACIÓN Y DECISIONES.</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
                <p>AETHRYON es el sistema de análisis y convergencia desarrollado por RAUVIA. Ayuda a organizar señales, identificar fricciones y estructurar alternativas cuando el trabajo requiere comprender relaciones entre distintas partes de una empresa.</p>
                <p>No sustituye el criterio de propietarios, directivos o especialistas, ni convierte por sí mismo una hipótesis en resultado. Su aplicación depende del problema y del alcance acordado.</p>
              </div>
              <Link to="/aethryon/" className="inline-flex items-center gap-2 text-rauvia-navy hover:text-rauvia-blue font-bold tracking-wider text-sm transition-colors uppercase">
                CONOCER AETHRYON <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex justify-center relative">
               <Link to="/aethryon/" className="nx-orb w-full max-w-xl block cursor-pointer" title="Conocer más sobre AETHRYON">
                 <ConvergenceScene>
                   <img width="1400" height="1060" loading="lazy" src="/media/aethryon-convergence-animated.svg" alt="AETHRYON" className="w-full object-contain" />
                 </ConvergenceScene>
               </Link>
            </div>
          </div>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 7 — FUNDADOR */}
      <FadeInUp>
      <section className="fx-dark nx-founder py-10 md:py-20 bg-rauvia-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="max-w-3xl mx-auto text-center text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">
              RAUVIA, DESDE <span className="text-rauvia-blue">NEGOCIO, OPERACIÓN Y TECNOLOGÍA.</span>
            </h2>
            <IntersectionVenn />
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>RAUVIA fue fundada por Raúl Morales con el propósito de conectar análisis, estructura, tecnología y ejecución en el trabajo con empresas. Su dirección aporta criterio estratégico, arquitectura de soluciones y evolución metodológica.</p>
              <p>Detrás de cada empresa hay tiempo, decisiones, inversión y conocimiento acumulado. Por eso buscamos comprender los recursos y capacidades existentes antes de proponer cambios, y distinguir lo que puede protegerse o mejorarse de aquello que requiere más evidencia.</p>
              
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
              <div key={i} style={{ '--i': i } as CSSProperties} className="fx-founder-card fx-card nx-reveal bg-white p-6 border border-slate-100 rounded-xl shadow-sm">
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

      {/* SECCIÓN 8 — EVIDENCIA Y TRANSPARENCIA */}
      <FadeInUp>
      <section id="evidencia" className="fx-light py-12 md:py-20 bg-white border-b border-slate-100 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-widest text-rauvia-gold uppercase block mb-4">EVIDENCIA Y TRANSPARENCIA</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">Mostrar el trabajo, sin confundirlo con una garantía.</h2>
          <div className="space-y-4 text-slate-600 text-base lg:text-lg leading-relaxed mb-8">
            <p>Los casos y las implementaciones ayudan a entender cómo se ha aplicado nuestro trabajo. Cuando existe información publicable, buscamos explicar la situación, la intervención, los entregables y las evidencias disponibles, junto con sus límites.</p>
            <p>Una muestra de un sitio no demuestra por sí sola ventas o crecimiento; una cifra comercial debe presentarse con su periodo y contexto. Si algo no se ha medido, lo decimos.</p>
          </div>
          <Link to="/casos/" className="inline-flex items-center gap-2 text-rauvia-blue hover:text-rauvia-navy font-bold tracking-wider text-sm uppercase">Ver casos y evidencia <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      </section>
      </FadeInUp>

      {/* SECCIÓN 9 — CIERRE */}
      <FadeInUp>
      <section className="fx-dark nx-relation py-12 md:py-24 bg-rauvia-navy-dark">
        <ConvergenceField flow="inward" origin={[0.5, 0.5]} className="fx-field" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-rauvia-navy leading-tight mb-6">EMPECEMOS POR LO QUE TU EMPRESA <span className="text-rauvia-blue">NECESITA RESOLVER.</span></h2>
          <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-8">Tal vez necesitas presentar mejor tu oferta, revisar cómo se encuentra tu información o entender un problema que involucra varias partes de la empresa. Cuéntanos la situación y definamos si RAUVIA puede ayudarte y cuál sería el siguiente paso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppCTA
              href="https://wa.me/525586494076"
              className="flex items-center justify-center gap-2 bg-rauvia-blue text-white px-6 py-3 rounded text-sm font-semibold tracking-wide min-h-[52px]"
            >
              HABLAR CON RAUVIA
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </WhatsAppCTA>
            <Link to="/soluciones/" className="flex items-center justify-center gap-2 border border-white/40 text-white px-6 py-3 rounded text-sm font-semibold tracking-wide min-h-[52px]">EXPLORAR SOLUCIONES</Link>
          </div>
        </div>
      </section>
      </FadeInUp>
      
    </div>
  );
}
