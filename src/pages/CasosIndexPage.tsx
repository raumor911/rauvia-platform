import RouteSEO from '../seo/PageMetadata';
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeInUp from '../components/FadeInUp';
import ConvergenceField from '../components/ConvergenceField';
import { Core } from '../components/HeroScene';
import { DemandScene, ProfileScene } from '../components/CasosVisuals';
import usePageFx from '../hooks/usePageFx';
import '../styles/pageFrontier.css';
import '../styles/casosFx.css';

// Términos que la propia página ya enuncia (hero): se pintan con CSS (data-label), sin añadir texto al DOM.
const CHIPS: Array<{ label: string; x: number; y: number; gold?: boolean }> = [
  { label: 'Contexto', x: 24, y: 14 },
  { label: 'Problema observado', x: 80, y: 22 },
  { label: 'Intervención', x: 14, y: 52 },
  { label: 'Cambio reportado', x: 86, y: 56 },
  { label: 'Evidencia', x: 28, y: 88, gold: true },
  { label: 'Límites', x: 76, y: 90 },
];

export default function CasosIndexPage() {
  const root = useRef<HTMLElement>(null);
  usePageFx(root);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'case_index_view', { event_category: 'Casos y Evidencia' });
    }
  }, []);

  return (
    <>
      <RouteSEO path="/casos" />

      <main ref={root} className="fx-page fx-casos">
        <div className="fx-progress" aria-hidden="true" />

        <section className="fx-hero cs-hero pt-32 pb-20 relative">
          <ConvergenceField coreSelector=".cs-scene-core" origin={[0.7, 0.5]} className="fx-field" overlay="radar" />
          <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 xl:col-span-6 relative z-20">
                <h1 className="cs-title text-5xl md:text-6xl xl:text-7xl font-black tracking-tight mb-8">
                  Casos y evidencia
                </h1>
                <p className="cs-lead text-xl md:text-2xl font-medium leading-relaxed mb-6">
                  Problemas reales. Intervenciones concretas. Cambios observables.
                </p>
                <p className="cs-copy text-lg leading-relaxed max-w-2xl">
                  Cada caso distingue contexto, problema observado, intervención, cambio reportado, evidencia y límites. Los casos distinguen lo observado de las hipótesis y las métricas pendientes.
                </p>
              </div>

              <div className="lg:col-span-5 xl:col-span-6 relative z-0 mt-6 lg:mt-0" aria-hidden="true">
                <div className="fx-scene cs-scene-box">
                  <div className="fx-scene-core cs-scene-core"><Core /></div>
                  {CHIPS.map((c, i) => (
                    <span key={c.label} className="fx-chip" data-fx-node data-fx-dir="in" data-label={c.label}
                      {...(c.gold ? { 'data-gold': '' } : {})}
                      style={{ '--x': `${c.x}%`, '--y': `${c.y}%`, '--i': i } as React.CSSProperties} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fx-light cs-cases py-16 md:py-24 bg-rauvia-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                {/* Caso 01: Infraestructura Temporal B2B */}
                <article className="cs-card group">
                  <div className="cs-visual"><DemandScene /></div>
                  <div className="cs-body">
                    <span className="cs-kicker">
                      COMERCIAL · DEMANDA · INFRAESTRUCTURA B2B
                    </span>

                    <h2 className="cs-h2">
                      De generar conversaciones a construir un sistema para entender la demanda
                    </h2>

                    <p className="cs-p">
                      Una empresa mexicana de infraestructura temporal B2B comenzó mejorando su presencia y captación digital. Los datos mostraron después una restricción más profunda: no bastaba con generar conversaciones; era necesario saber cuáles tenían valor, qué ocurría con ellas y utilizar esa información para decidir.
                    </p>

                    <div className="cs-metrics">
                      <div>
                        <span className="cs-num">
                          2.67 <span className="cs-arrow">→</span> 4.00
                        </span>
                        <span className="cs-cap">
                          Benchmark digital
                        </span>
                      </div>
                      <div>
                        <span className="cs-num">
                          3,564
                        </span>
                        <span className="cs-cap">
                          Conversaciones registradas en el periodo analizado
                        </span>
                      </div>
                    </div>

                    <Link to="/casos/infraestructura-temporal-b2b/" className="cs-link">
                      Ver intervención
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>

                {/* Caso 02: Presencia profesional */}
                <article className="cs-card group">
                  <div className="cs-visual"><ProfileScene /></div>
                  <div className="cs-body">
                    <span className="cs-kicker">PRESENCIA DIGITAL · PROFESIONISTAS</span>
                    <h2 className="cs-h2">De información profesional dispersa a una presentación digital coherente</h2>
                    <p className="cs-p">
                      Cómo organiza RAUVIA la experiencia, los servicios y los canales de contacto en un activo digital profesional. Se explica el enfoque de implementación sin atribuir resultados comerciales no medidos.
                    </p>
                    <Link to="/casos/presencia-posicionamiento-profesional/" className="cs-link">
                      Conocer el enfoque <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </div>
            </FadeInUp>
          </div>
        </section>
      </main>
    </>
  );
}
