import RouteSEO from '../seo/PageMetadata';
import React, { useEffect } from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeInUp from '../components/FadeInUp';

export default function CasosIndexPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'case_index_view', { event_category: 'Casos y Evidencia' });
    }
  }, []);

  return (
    <>
      <RouteSEO path="/casos" />
      
      

      

      <main className="pt-32 pb-24 bg-rauvia-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mb-20 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black text-rauvia-navy mb-6 tracking-tight">
                Casos y evidencia
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-6">
                Problemas reales. Intervenciones concretas. Cambios observables.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Cada caso distingue contexto, problema observado, intervención, cambio reportado, evidencia y límites. El caso publicado es un reporte propio en evolución: su benchmark es interno, las conversaciones no equivalen a ventas y la trazabilidad sigue en construcción. No demuestra causalidad ni garantiza resultados en otra empresa.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Card 01: Infraestructura Temporal B2B */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-xl group">
                <div className="p-8 md:p-10 flex-grow flex flex-col">
                  <div className="mb-6">
                    <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase">
                      COMERCIAL · DEMANDA · INFRAESTRUCTURA B2B
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-extrabold text-rauvia-navy mb-4 tracking-tight group-hover:text-rauvia-blue transition-colors">
                    De generar conversaciones a construir un sistema para entender la demanda
                  </h2>
                  
                  <p className="text-slate-600 leading-relaxed mb-10 flex-grow">
                    Una empresa mexicana de infraestructura temporal B2B comenzó mejorando su presencia y captación digital. Los datos mostraron después una restricción más profunda: no bastaba con generar conversaciones; era necesario saber cuáles tenían valor, qué ocurría con ellas y utilizar esa información para decidir.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 mb-10">
                    <div>
                      <span className="block text-2xl font-black text-rauvia-navy mb-1">
                        2.67 <span className="text-slate-400 font-medium text-lg mx-1">→</span> 4.00
                      </span>
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Benchmark digital
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black text-rauvia-navy mb-1">
                        3,564
                      </span>
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Conversaciones registradas en el periodo analizado
                      </span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/casos/infraestructura-temporal-b2b/"
                    className="inline-flex items-center text-rauvia-blue font-bold group-hover:text-rauvia-navy transition-colors mt-auto"
                  >
                    Ver intervención
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-xl group">
                <div className="p-8 md:p-10 flex-grow flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase mb-6">PRESENCIA DIGITAL · PROFESIONISTAS</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-rauvia-navy mb-4 tracking-tight">De información profesional dispersa a una presentación digital coherente</h2>
                  <p className="text-slate-600 leading-relaxed mb-10 flex-grow">
                    Cómo organiza RAUVIA la experiencia, los servicios y los canales de contacto en un activo digital profesional. Se explica el enfoque de implementación sin atribuir resultados comerciales no medidos.
                  </p>
                  <Link to="/casos/presencia-posicionamiento-profesional/" className="inline-flex items-center text-rauvia-blue font-bold group-hover:text-rauvia-navy transition-colors mt-auto">
                    Conocer el enfoque <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </main>

      
    </>
  );
}
