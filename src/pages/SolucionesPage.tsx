import {useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import {trackEvent} from '../lib/analytics';
import usePageFx from '../hooks/usePageFx';
import ConvergenceField from '../components/ConvergenceField';
import HeroScene from '../components/HeroScene';
import HomeHumanSection from '../components/HomeHumanSection';
import WhatsAppCTA from '../components/WhatsAppCTA';
import {soluciones} from '../data/solucionesCatalog.js';
import '../styles/scrollReveal.css';
import '../styles/pageFrontier.css';
import '../styles/homeHuman.css';
import '../styles/solucionesCatalog.css';

// Página Soluciones (spec «página Soluciones» v0.2, S-02 a S-04). Es el catálogo de lo que hoy tiene página pública:
// una tarjeta por solución, todas con la misma estructura, con todo el texto en el HTML (sin pestañas, acordeones ni «leer más»).
// Los datos de las tarjetas salen de src/data/solucionesCatalog.js, la misma fuente de la ItemList del JSON-LD y de la capa para máquinas.
// No hay precios aquí (viven en la página de cada oferta y en llmo/precios.json) ni secuencias numeradas nuevas.

type Solucion = (typeof soluciones)[number];

// Dos botones del mismo tamaño y peso visual: misma clase, sin «principal» ni «secundario».
const BTN = 'rv-sol-btn inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-6 py-3 rounded text-sm font-bold tracking-wider transition-all shadow-lg min-h-[52px]';

const ENTRADAS = [
  {si: 'Tu empresa tiene valor, pero cuesta explicarlo o presentarlo con claridad.', a: 'Frente Comercial', href: '#frente-comercial'},
  {si: 'Un comprador pregunta en Google o a un asistente de IA por lo que vendes y no encuentra respuestas claras.', a: 'SEO para IA', href: '#seo-para-ia'},
  {si: 'Ya tienes una prioridad clara y necesitas ejecutarla en un plazo definido.', a: 'Ruta 90', href: '#ruta-90'},
  {si: 'Tu necesidad es otra (seguimiento, procesos, tecnología, automatización) o tienes varios problemas y no sabes cuál primero.', a: 'Otras rutas', href: '#otras-rutas'}
];

const OTRAS_RUTAS = [
  {t: 'Seguimiento comercial', d: 'cuando llegan oportunidades y se pierde el seguimiento.'},
  {t: 'Procesos y operación', d: 'cuando todo depende de una persona.'},
  {t: 'Tecnología', d: 'cuando el proceso está definido y falta una capacidad digital.'},
  {t: 'Automatización', d: 'cuando las reglas son estables.'}
];

// FAQ 2: la especificación decía «un activo digital», pero la misma especificación prohíbe «activo» (S-03, criterios de aceptación).
// Se usa la redacción de la página de Frente Comercial (actualización, sección o micrositio) sin esa palabra.
const PREGUNTAS = [
  {q: '¿Por dónde empiezo si no sé qué necesito?', a: 'Por la situación que hoy frena a tu empresa. La tabla de arriba te orienta; si hay más de una, primero se identifica cuál frena el siguiente paso.'},
  {q: '¿Frente Comercial es una página web?', a: 'Puede materializarse en una actualización, una sección o un micrositio, pero el alcance lo define lo que necesita tu oferta y el nivel que contrates. Está detallado en su página.'},
  {q: '¿Frente Comercial incluye CRM o seguimiento de ventas?', a: 'No por defecto. Si necesitas saber qué pasó con cada oportunidad, se revisa aparte.'},
  {q: '¿Qué es SEO para IA y qué no promete?', a: 'Es preparar y verificar la información pública de tu empresa para que buscadores y asistentes puedan encontrar qué vendes, para qué sirve y dónde lo entregas. No promete posiciones, menciones ni citas.'},
  {q: '¿RAUVIA solo hace páginas web o SEO?', a: 'No. Esas son dos formas concretas de empezar. Cuando la necesidad va más allá, definimos contigo un alcance.'},
  {q: '¿Cuándo se recomienda automatizar?', a: 'Cuando el proceso y sus reglas están suficientemente definidos. Si cambian en cada caso, primero se revisa el proceso.'},
  {q: '¿Cómo se define el precio?', a: 'Cada solución publica su alcance y su precio en su propia página. Si tu necesidad no corresponde a una solución publicada, se confirma contigo antes de contratar.'}
];

const track = (destination: string, context: string) => () => trackEvent('cta_click', {destination, source_page: '/soluciones/', context});

function SolucionCard({s, size}: {s: Solucion; size: 'primary' | 'compact'}) {
  const extra = 'extraLink' in s ? s.extraLink : undefined;
  return (
    <article id={s.id} className={`rv-sol-card rv-sol-card--${size}`} aria-labelledby={`${s.id}-titulo`}>
      <h3 id={`${s.id}-titulo`} className="rv-sol-name">{s.name}</h3>
      <p className="rv-sol-def">{s.definition}</p>
      <p className="rv-sol-row"><strong>Para quién:</strong> {s.audience}</p>
      <div className="rv-sol-row">
        <strong>Qué recibes:</strong>
        <ul>{s.includes.map(i => <li key={i}>{i}</li>)}</ul>
      </div>
      <p className="rv-sol-row"><strong>Qué no incluye:</strong> {s.excludes}</p>
      <p className="rv-sol-links">
        <Link to={s.path} className="rv-sol-link" onClick={track(s.path, 'solution_card')}>{s.linkLabel}<ArrowRight aria-hidden="true" size={16} /></Link>
        {extra && <Link to={extra.path} className="rv-sol-link rv-sol-link--minor" onClick={track(extra.path, 'solution_card')}>{extra.label}<ArrowRight aria-hidden="true" size={16} /></Link>}
      </p>
    </article>
  );
}

export default function SolucionesPage() {
  const root = useRef<HTMLDivElement>(null);
  usePageFx(root);

  return (
    <div ref={root} className="fx-page fx-soluciones">
      <div className="fx-progress" aria-hidden="true" />
      <RouteSEO path="/soluciones" />

      {/* Bloque 1 · Hero */}
      <section className="rv-soluciones-hero fx-hero pt-32 pb-20 overflow-hidden relative">
        <ConvergenceField coreSelector=".fx-scene-core" origin={[0.68, 0.5]} className="fx-field" overlay="assets" />
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10">
          <div className="w-[1000px] h-[1000px] border border-slate-300 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[800px] h-[800px] border border-slate-300 rounded-full animate-spin-reverse-slow"></div>
        </div>
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 xl:col-span-6 space-y-6 relative z-20">
              <div className="inline-block">
                <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase">SOLUCIONES</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-rauvia-navy leading-[1.1]">
                Empieza por lo que hoy frena a tu empresa<span className="text-rauvia-gold">.</span>
              </h1>
              <div className="space-y-4 text-slate-600 text-base xl:text-lg max-w-md">
                <p>Hay dos formas concretas de empezar. Cuando la necesidad va más allá de estas dos puertas, definimos contigo un alcance.</p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="#frente-comercial" className={BTN}>Ver Frente Comercial<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
                <a href="#seo-para-ia" className={BTN}>Ver SEO para IA<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
              </div>
              <p className="rv-sol-minor"><a href="#otras-rutas">Tengo otro problema</a></p>
            </div>
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center relative z-0 mt-12 lg:mt-0">
              {/* Recurso visual del hero anterior: núcleo AETHRYON; los rótulos nombran las cuatro soluciones, sin orden ni jerarquía. */}
              <Link to="/aethryon/" className="relative block w-full max-w-[620px] group cursor-pointer" title="Conocer más sobre AETHRYON">
                <HeroScene chips={[
                  {label: 'Frente Comercial', x: 22, y: 17},
                  {label: 'SEO para IA', x: 80, y: 24},
                  {label: 'Ruta 90', x: 20, y: 80},
                  {label: 'Páginas para médicos', x: 78, y: 82}
                ]}>
                  <picture className="contents">
                    <source media="(max-width: 1023px)" type="image/webp"
                      srcSet="/media/rauvia-solutions-hero-mobile-640.webp 640w, /media/rauvia-solutions-hero-mobile-960.webp 960w"
                      sizes="(max-width: 767px) calc(100vw - 32px), 576px" />
                    <img width="1100" height="760" loading="eager" fetchPriority="high" decoding="async" src="/media/rauvia-solutions-hero-support-aethryon-v73.svg" alt="Esquema visual de AETHRYON" className="w-full h-full object-contain" />
                  </picture>
                </HeroScene>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque 2 · ¿Por dónde empiezo? (cuatro filas) */}
      <section id="por-donde-empiezo" className="rv-sol-section rv-sol-section--soft" aria-labelledby="por-donde-empiezo-titulo">
        <div className="rv-sol-container rv-sol-container--narrow">
          <h2 id="por-donde-empiezo-titulo" className="rv-sol-h2">¿Por dónde empiezo?</h2>
          <div className="rv-sol-table-wrap">
            <table role="table" className="rv-solutions-table rv-sol-table w-full text-left border-collapse">
              <thead role="rowgroup">
                <tr role="row">
                  <th scope="col" role="columnheader">Si hoy te ocurre esto…</th>
                  <th scope="col" role="columnheader">Empieza por…</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {ENTRADAS.map(r => (
                  <tr role="row" key={r.a}>
                    <td role="cell" data-label="Si hoy te ocurre esto…">{r.si}</td>
                    <td role="cell" data-label="Empieza por…"><a href={r.href} className="rv-sol-table-link">{r.a}<ArrowRight aria-hidden="true" size={16} /></a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bloque 3 · Catálogo de soluciones (cuerpo de la página) */}
      <section id="catalogo" className="rv-sol-section rv-sol-section--white" aria-labelledby="catalogo-titulo">
        <div className="rv-sol-container">
          <h2 id="catalogo-titulo" className="rv-sol-h2">Soluciones de RAUVIA</h2>
          <div className="rv-sol-grid rv-sol-grid--primary">
            {soluciones.slice(0, 2).map(s => <SolucionCard key={s.id} s={s} size="primary" />)}
          </div>
          <div className="rv-sol-grid rv-sol-grid--compact">
            {soluciones.slice(2).map(s => <SolucionCard key={s.id} s={s} size="compact" />)}
          </div>
        </div>
      </section>

      {/* Bloque 4 · Otras rutas */}
      <section id="otras-rutas" className="rv-sol-section rv-sol-section--soft" aria-labelledby="otras-rutas-titulo">
        <div className="rv-sol-container rv-sol-container--narrow">
          <h2 id="otras-rutas-titulo" className="rv-sol-h2">Cuando la necesidad va más allá</h2>
          <p className="rv-sol-lead">Algunas situaciones piden otro tipo de trabajo. No son paquetes predefinidos: si tu necesidad no corresponde a una solución publicada, primero confirmamos el alcance y la capacidad, y definimos contigo una intervención.</p>
          <ul className="rv-sol-routes">
            {OTRAS_RUTAS.map(r => <li key={r.t}><strong>{r.t}:</strong> {r.d}</li>)}
          </ul>
          <p className="rv-sol-action">
            <WhatsAppCTA href="https://wa.me/525586494076" className={BTN}>Hablar con RAUVIA<ArrowRight className="w-4 h-4" aria-hidden="true" /></WhatsAppCTA>
          </p>
        </div>
      </section>

      {/* Bloque 5 · Cómo trabajamos (una línea; el método único vive en la home) */}
      <section id="como-trabajamos" className="rv-sol-section rv-sol-section--white rv-sol-section--tight" aria-labelledby="como-trabajamos-titulo">
        <div className="rv-sol-container rv-sol-container--narrow">
          <h2 id="como-trabajamos-titulo" className="rv-sol-h2 rv-sol-h2--small">Cómo trabajamos</h2>
          <p className="rv-sol-lead">Empezamos por una necesidad concreta y avanzamos con un método. Está explicado en la página de inicio.</p>
          <p className="rv-sol-action"><a href="/#metodologia" className="rv-sol-link">Ver cómo trabajamos<ArrowRight aria-hidden="true" size={16} /></a></p>
        </div>
      </section>

      {/* Bloque 6 · Una persona revisa y decide (mismo bloque de la home, C-06) */}
      <HomeHumanSection />

      {/* Bloque 7 · Prueba (una línea; sin cifras ni el caso anónimo de la home) */}
      <section id="casos" className="rv-sol-section rv-sol-section--white rv-sol-section--tight" aria-labelledby="casos-titulo">
        <div className="rv-sol-container rv-sol-container--narrow">
          <h2 id="casos-titulo" className="rv-sol-h2 rv-sol-h2--small">Casos y evidencia</h2>
          <p className="rv-sol-action"><Link to="/casos/" className="rv-sol-link" onClick={track('/casos/', 'solutions_proof')}>Ver los casos y sus límites de evidencia<ArrowRight aria-hidden="true" size={16} /></Link></p>
        </div>
      </section>

      {/* Bloque 8 · Preguntas frecuentes (texto visible; sin marcado FAQPage) */}
      <section id="preguntas" className="rv-sol-section rv-sol-section--soft" aria-labelledby="preguntas-titulo">
        <div className="rv-sol-container rv-sol-container--narrow">
          <h2 id="preguntas-titulo" className="rv-sol-h2">Preguntas frecuentes</h2>
          <dl className="rv-sol-faq">
            {PREGUNTAS.map(p => (
              <div key={p.q} className="rv-sol-faq-item">
                <dt>{p.q}</dt>
                <dd>{p.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bloque 9 · Cierre */}
      <section id="cierre" className="rv-sol-section rv-sol-section--navy" aria-labelledby="cierre-titulo">
        <div className="rv-sol-container rv-sol-container--narrow rv-sol-center">
          <h2 id="cierre-titulo" className="rv-sol-h2 rv-sol-h2--light">Antes de hacer más, aclaremos qué necesita entender tu comprador.</h2>
          <div className="rv-sol-actions">
            <a href="#frente-comercial" className={BTN}>Ver Frente Comercial<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
            <a href="#seo-para-ia" className={BTN}>Ver SEO para IA<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          </div>
          <p className="rv-sol-minor rv-sol-minor--light"><WhatsAppCTA href="https://wa.me/525586494076" className="rv-sol-minor-link">Hablar con RAUVIA</WhatsAppCTA></p>
        </div>
      </section>
    </div>
  );
}
