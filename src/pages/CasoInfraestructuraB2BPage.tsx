import RouteSEO from '../seo/PageMetadata';
import WhatsAppCTA from "../components/WhatsAppCTA";
import React, { useEffect, useRef, useId } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CasoInfraestructuraB2BPage.css';


/** Reusable SVG figure. Numeric coordinates, accessible names and no external assets. */
function BenchmarkFigure() {
  const id = useId();
  const samples = [
    { date: '03 OCT 2025', value: 2.67, x: 35 },
    { date: '31 DIC 2025', value: 3.67, x: 180 },
    { date: '15 JUL 2026', value: 4.00, x: 325 },
  ];
  const y = (value: number) => 100 - ((value - 1) / 4) * 88;
  return (
    <figure className="case-benchmark">
      <svg viewBox="0 0 360 135" role="img" aria-labelledby={id + '-title ' + id + '-desc'}>
        <title id={id + '-title'}>Evolución del Benchmark Interno</title>
        <desc id={id + '-desc'}>Índice interno, escala 1 a 5. 03 octubre 2025: 2.67; 31 diciembre 2025: 3.67; 15 julio 2026: 4.00. No representa crecimiento en ventas. Los cortes se muestran a intervalos iguales, no a escala temporal.</desc>
        <polyline points={samples.map(p => p.x + ',' + y(p.value)).join(' ')} fill="none" stroke="#0756db" strokeWidth="1.8" strokeLinejoin="round" />
        {samples.map(p => (
          <g key={p.date}>
            <line x1={p.x} y1={y(p.value)} x2={p.x} y2="100" stroke="#dae4ed" />
            <circle cx={p.x} cy={y(p.value)} r="5" fill="#0756db" />
            <text x={p.x} y={y(p.value) - 15} textAnchor="middle" fontSize="16" fontWeight="700" fill="#102744">{p.value.toFixed(2)}</text>
            <text x={p.x} y="119" textAnchor="middle" fontSize="9" fill="#475569">{p.date}</text>
          </g>
        ))}
      </svg>
      <dl className="case-benchmark-mobile">
        {samples.map(p => <div key={p.date}><dt>{p.date}</dt><dd>{p.value.toFixed(2)}</dd></div>)}
      </dl>
      <figcaption className="case-chart-note">Cortes comparativos; separación horizontal no proporcional al tiempo.</figcaption>
    </figure>
  );
}

function DemandCircuit() {
  const channels = ['Google Business', 'Web', 'Facebook', 'LinkedIn', 'Publicidad', 'Prospección', 'Contenido'];
  const stages = [
    ['DEMANDA', 'Señales e intención'],
    ['CATALYST', 'Trazabilidad comercial'],
    ['CALIFICACIÓN', ''], ['SEGUIMIENTO', ''], ['RESULTADO', ''],
    ['EVIDENCIA', ''], ['APRENDIZAJE', ''],
  ];
  return (
    <figure className="case-circuit" aria-label="Canales paralelos que convergen en demanda y aprendizaje comercial">
      <p className="case-circuit-label">FUENTES Y CANALES DE DEMANDA</p>
      <ul className="case-channels">
        {channels.map(channel => <li key={channel}>{channel}</li>)}
      </ul>
      <div className="case-convergence" aria-hidden="true">
        <svg viewBox="0 0 700 40" preserveAspectRatio="none">
          <path d="M50 0V15H650V0 M150 0V15 M250 0V15 M350 0V34 M450 0V15 M550 0V15 M344 28L350 34L356 28" fill="none" stroke="#91a7b8" strokeWidth="1.5" />
        </svg>
      </div>
      <ol className="case-stages">
        {stages.map(([label, detail], index) => (
          <li key={label}>
            {index > 0 && <ArrowDown aria-hidden="true" className="case-flow-arrow" />}
            <strong>{label}</strong>
            {detail && <span>{detail}</span>}
          </li>
        ))}
      </ol>
      <div className="case-feedback" aria-label="El aprendizaje retroalimenta oferta, mercado y contenido">
        <ArrowDown aria-hidden="true" className="case-flow-arrow" />
        <div className="case-feedback-branches"><span>OFERTA</span><span>CONTENIDO</span></div>
        <svg viewBox="0 0 360 48" aria-hidden="true">
          <path d="M180 0V40 M176 34L180 40L184 34 M150 40H50V12 M46 18L50 12L54 18 M210 40H310V12 M306 18L310 12L314 18" fill="none" stroke="#91a7b8" />
        </svg>
        <strong>MERCADO</strong>
      </div>
    </figure>
  );
}

export default function CasoInfraestructuraB2BPage() {
  const benchmarkRef = useRef<HTMLDivElement>(null);
  const evidenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'case_ce_anonymous_view', { event_category: 'Casos y Evidencia' });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && typeof window !== 'undefined' && (window as any).gtag) {
            if (entry.target === benchmarkRef.current) {
              (window as any).gtag('event', 'case_benchmark_view', { event_category: 'Casos y Evidencia' });
              observer.unobserve(entry.target);
            }
            if (entry.target === evidenceRef.current) {
              (window as any).gtag('event', 'case_evidence_view', { event_category: 'Casos y Evidencia' });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (benchmarkRef.current) observer.observe(benchmarkRef.current);
    if (evidenceRef.current) observer.observe(evidenceRef.current);

    return () => observer.disconnect();
  }, []);

  const trackCtaClick = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, { event_category: 'Casos y Evidencia' });
    }
  };

  return (
    <>
      <RouteSEO path="/casos/infraestructura-temporal-b2b" />
      
      
      
      <main className="rauvia-case-report">
<section className="report-hero"><div className="report-hero-inner"><span className="report-kicker">
                CASO · COMERCIAL Y CAPTURA DE DEMANDA
              </span>
              <h1 >
                De generar conversaciones a construir un sistema para entender la demanda.
              </h1>
              <p >
                Una empresa mexicana de infraestructura temporal B2B comenzó mejorando su presencia y captación digital. Los datos mostraron después una restricción más profunda: no bastaba con generar conversaciones; era necesario saber cuáles tenían valor, qué ocurría con ellas y utilizar esa información para decidir.
              </p>
              
              <div className="report-meta">
                <div>
                  <span >Sector</span>
                  <span >Infraestructura temporal B2B</span>
                </div>
                <div>
                  <span >Periodo</span>
                  <span >Octubre 2025 – actualidad</span>
                </div>
                <div>
                  <span >Estado</span>
                  <span >
                     Intervención en evolución
                  </span>
                </div>
              </div></div></section>
<section className="report-shell report-phase-one"><div><span className="report-kicker">FASE 1</span>
              <h2 >Hacer visible el problema</h2>
              <p >
                Entre octubre 2025 y julio 2026 se trabajó en mejorar la presencia digital y la captación de demanda de la empresa. La inversión generaba atención, pero el reto era entender el impacto real de ese volumen. Durante este periodo se registraron:
              </p>

              <div className="case-metrics">
                <div>
                  <span >$38,345.94<span >MXN</span></span>
                  <span >Inversión registrada</span>
                </div>
                <div>
                  <span >3,564</span>
                  <span >Conversaciones iniciadas</span>
                </div>
                <div>
                  <span >$10.76<span >MXN</span></span>
                  <span >Costo prom. por conversación</span>
                </div>
                <div>
                  <span >811,365</span>
                  <span >Visualizaciones</span>
                </div>
                <div>
                  <span >447,527</span>
                  <span >Alcance acumulado</span>
                </div>
              </div>
            

            
            
              </div><aside className="report-finding"><div >
                <p >
                  El análisis mostró que generar conversaciones era sólo una parte del problema. La siguiente restricción estaba en convertir esas conversaciones en información comercial trazable.
                </p>
              </div></aside></section>
<section className="report-blind"><div className="report-shell report-blind-grid"><div className="report-blind-copy"><span className="report-kicker">EL PUNTO CIEGO</span>
<h2 >El punto ciego estaba después del primer contacto.</h2>
              <p >
                La empresa estaba generando atención. Pero el recorrido de la demanda se volvía opaco casi de inmediato.
              </p>

              
</div>
<div className="report-blind-evidence">
<div className="report-blind-steps"><span>Publicidad</span><span>WhatsApp</span><span>Información</span><span>Cotización</span><span>Esperar</span></div>
<svg className="report-contact-rail" viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden="true"><path d="M8 12H590M585 8L590 12L585 16" stroke="#61bbec" fill="none"/><g fill="#61bbec"><circle cx="60" cy="12" r="3"/><circle cx="180" cy="12" r="3"/><circle cx="300" cy="12" r="3"/><circle cx="420" cy="12" r="3"/><circle cx="540" cy="12" r="3"/></g></svg>
<div className="report-blind-questions"><span>¿Cuántas conversaciones estaban calificadas?</span><span>¿Cuántas recibieron cotización?</span><span>¿Cuántas llegaron al CRM?</span><span>¿Cuántas recibieron seguimiento?</span><span>¿Cuántas se ganaron? ¿Cuántas se perdieron?</span></div>
<p className="report-blind-conclusion">No existía información suficiente para responderlas de forma consistente.</p>
</div></div></section>
<div className="report-shell">
<section className="report-evidence-row">
<div className="report-classification"><h2 className="report-kicker">CLASIFICACIÓN DE CONVERSACIONES</h2><div className="report-classification-stats">
                <div >
                  <span >511</span>
                  <span >Interacciones clasificadas</span>
                </div>
                
                <div >
                  <span >154</span>
                  <span >Catálogo / información</span>
                </div>
                
                <div >
                  <span >25</span>
                  <span >Conversaciones largas</span>
                </div>
              </div>
              <p >
                Nota: Las categorías representan distintos niveles observados en la revisión; no constituyen por sí mismas un funnel comercial ni tasas de conversión.
              </p></div>
<div className="report-benchmark-panel" ref={benchmarkRef}><h2 >
                Evolución del Benchmark Interno
              </h2>

              <div >
                <BenchmarkFigure />

                <div className="case-benchmark-summary">
                  <div>
                    <span >+1.33</span>
                    <span >puntos</span>
                  </div>
                  <div>
                    <span >+49.8%</span>
                    <span >evolución relativa acumulada</span>
                  </div>
                </div>

                <div >
                  <p >Índice interno comparativo · escala 1–5</p>
                  <p><strong>Nota:</strong> No representa crecimiento en ventas.</p>
                </div>
              </div>

              </div>
</section>
<section className="report-dimensions-row"><div className="report-dimensions"><div >
                <div>
                  <h3 >Dimensiones Evaluadas</h3>
                  <ul >
                    <li>• Amplitud de oferta</li>
                    <li>• Propuesta de valor</li>
                    <li>• Activación social</li>
                    <li>• Profundidad web</li>
                    <li>• Diferenciación</li>
                    <li>• SEO local</li>
                  </ul>
                </div>
                <div>
                  <h3 >Mayores Avances</h3>
                  <ul >
                    <li>• Diferenciación</li>
                    <li>• Profundidad web</li>
                    <li>• Amplitud de oferta</li>
                  </ul>
                  <h3 >También</h3>
                  <ul >
                    <li>• Claridad de propuesta</li>
                    <li>• SEO local</li>
                    <li>• Activación social</li>
                  </ul>
                </div>
              </div></div><div className="report-transition"><h3>De la atención a la segunda pregunta</h3><p >
                Cuando la demanda comenzó a hacerse visible, apareció una segunda pregunta: ¿qué ocurre con ella después de entrar?
              </p>

              <div className="report-unknown-flow">
                <span>ATENCIÓN</span> <ArrowRight aria-hidden="true" />
                <span>CONVERSACIÓN</span> <ArrowRight aria-hidden="true" />
                <span ><span >?</span> OPORTUNIDAD</span> <ArrowRight aria-hidden="true" />
                <span ><span >?</span> COTIZACIÓN</span> <ArrowRight aria-hidden="true" />
                <span ><span >?</span> SEGUIMIENTO</span> <ArrowRight aria-hidden="true" />
                <span ><span >?</span> RESULTADO</span>
              </div>

              <p >
                La segunda fase de la intervención se concentra en eliminar estos signos de interrogación.
              </p></div></section>
<section className="report-phase-two-grid"><div><section className="report-phase-two"><span className="report-kicker">FASE 2 · EN CURSO</span>
              <h2 >De capturar demanda a construir inteligencia comercial</h2>
              <p >Julio 2026 – actualidad.</p>
              
              <p >
                Catalyst está construyendo la capacidad para hacer trazable el recorrido de cada oportunidad. Evoluciona como sistema de visibilidad del pipeline, estructurando progresivamente la información necesaria para observar el recorrido de cada oportunidad.
              </p>

              <div className="report-before-after">
                <div>
                  <h3 >Antes</h3>
                  <ul >
                    <li > Seguimiento reactivo</li>
                    <li > Dificultad para interpretar qué ocurría después</li>
                  </ul>
                </div>
                <div>
                  <h3 >Capacidad en Construcción</h3>
                  <ul >
                    <li > Registro estructurado</li>
                    <li > Variables comerciales observables</li>
                    <li > Trazabilidad y seguimiento</li>
                  </ul>
                </div>
              </div></section><section className="report-web"><h2 >Rediseño y relanzamiento web</h2>
              <p >
                Competir en claridad, profundidad y especialización, no necesariamente en volumen de inversión.
              </p>
              <p >
                La empresa competía contra organizaciones de mayor escala, presencia digital y profundidad de contenido, sin depender de replicar la escala de presencia de sus competidores. La web funciona como una superficie de descubrimiento, educación y captura de demanda.
              </p>

              <div className="report-web-status">
                <ul >
                  <li >
                    <span>Reorganización de arquitectura</span>
                    <span >IMPLEMENTADO</span>
                  </li>
                  <li >
                    <span>Casos de uso por necesidad</span>
                    <span >IMPLEMENTADO</span>
                  </li>
                  <li >
                    <span>Separación clara de venta y renta</span>
                    <span >IMPLEMENTADO</span>
                  </li>
                </ul>
                <ul >
                  <li >
                    <span>Mayor profundidad y especialización</span>
                    <span >EN EVOLUCIÓN</span>
                  </li>
                  <li >
                    <span>SEO técnico y local</span>
                    <span >EN EVOLUCIÓN</span>
                  </li>
                  <li >
                    <span>GEO / LLMO progresivo</span>
                    <span >SIGUIENTE FASE</span>
                  </li>
                </ul>
              </div></section></div><section className="report-circuit-panel"><h2 >
                De captar demanda a construir un circuito de aprendizaje comercial
              </h2>

              <DemandCircuit /></section></section>
<section className="report-evidence-detail" ref={evidenceRef}><h2 >Evidencia de la primera fase</h2>
              
              <div className="report-table-scroll" tabIndex={0} role="region" aria-label="Tabla de evidencia">
                <table >
                  <thead>
                    <tr >
                      <th >EVIDENCIA</th>
                      <th >QUÉ DEMUESTRA</th>
                      <th >QUÉ NO DEMUESTRA</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                      <td >Benchmark 2.67 → 4.00</td>
                      <td >Evolución de capacidades digitales/comerciales evaluadas.</td>
                      <td >Crecimiento equivalente en ventas.</td>
                    </tr>
                    <tr>
                      <td >3,564 conversaciones iniciadas</td>
                      <td >Existía volumen de interacción.</td>
                      <td >3,564 oportunidades.</td>
                    </tr>
                    <tr>
                      <td >511 interacciones clasificadas</td>
                      <td >Se comenzó a observar y clasificar comportamiento comercial.</td>
                      <td >Que toda la demanda haya sido clasificada.</td>
                    </tr>
                    <tr>
                      <td >154 de información / 25 largas</td>
                      <td >Diferentes niveles de profundidad dentro de las conversaciones.</td>
                      <td >Número de ventas o cierres.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            

            
            
              <div >
                <h3 >Lo que estos datos no permiten afirmar</h3>
                <p >
                  No atribuimos automáticamente a esta intervención cualquier variación posterior en ventas. Precio, disponibilidad, calidad del seguimiento, condiciones del mercado, decisión del comprador y capacidad operativa también influyen en el resultado.
                </p>
                <p >
                  Los resultados publicados corresponden a cambios observables y métricas disponibles durante el periodo analizado.
                </p>
              </div></section>
<section className="report-outlook"><h2 >Este caso continúa en evolución.</h2>
              <p >
                La primera fase hizo visible dónde se perdía información entre atención y resultado comercial. La fase actual está construyendo la capacidad para cerrar esa brecha y utilizar los datos resultantes para realimentar captación, oferta y decisión.
              </p>

              <h3 >Próxima evidencia</h3>
              <p >
                Futuras actualizaciones deberán evaluar, cuando exista una muestra suficiente:
              </p>

              <div className="report-next-evidence">
                <div ><span>Oportunidades calificadas</span></div>
                <div ><span>Cotizaciones</span></div>
                <div ><span>Seguimiento</span></div>
                <div ><span>Ganado/perdido</span></div>
                <div ><span>Motivos de pérdida</span></div>
                <div ><span>Canal de origen</span></div>
                <div ><span>Tiempos de avance</span></div>
                <div ><span>Comportamiento de demanda</span></div>
                <div ><span>Evolución benchmark</span></div>
              </div></section>
<section className="report-conclusion"><h2 >
                Qué demuestra esta intervención
              </h2>
              
              <div className="case-findings">
                <div >
                  <span >Diagnóstico</span>
                  <p >
                    Identificar dónde se rompe la continuidad entre atención y resultado.
                  </p>
                </div>
                
                <div >
                  <span >Arquitectura digital</span>
                  <p >
                    Construir una superficie de descubrimiento, educación y captura.
                  </p>
                </div>
                
                <div >
                  <span >Sistema comercial</span>
                  <p >
                    Hacer progresivamente observable el recorrido de las oportunidades.
                  </p>
                </div>
                
                <div >
                  <span >Aprendizaje</span>
                  <p >
                    Utilizar evidencia comercial para realimentar oferta, contenido y decisión.
                  </p>
                </div>
              </div></section>
<section className="report-cta"><h2 className="text-3xl md:text-4xl font-extrabold text-rauvia-navy mb-6 tracking-tight">
                ¿Tu empresa genera conversaciones, pero no está claro qué ocurre después?
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                Antes de aumentar la inversión en captación, conviene entender qué parte de la demanda ya existente se está aprovechando y cuál se está perdiendo.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <WhatsAppCTA 
                  href="https://wa.me/525586494076?text=Hola,%20me%20gustar%C3%ADa%20revisar%20el%20caso%20de%20mi%20empresa"
                  className="inline-flex justify-center items-center px-8 py-4 bg-rauvia-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => trackCtaClick('case_cta_review')}
                >
                  Revisar mi caso
                </WhatsAppCTA>
                <Link 
                  to="/aethryon/"
                  className="inline-flex justify-center items-center px-8 py-4 bg-white text-rauvia-navy border border-slate-200 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  onClick={() => trackCtaClick('case_aethryon_click')}
                >
                  Conocer AETHRYON
                </Link>
              </div></section>
</div>
      </main>
    </>
  );
}
