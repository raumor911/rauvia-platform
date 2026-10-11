import { useState } from "react";
import { Target, Layers, Settings, BarChart3, TrendingUp } from "lucide-react";

export default function MethodologySection() {
  const steps = [
    {
      num: "01",
      title: "CLARIDAD",
      desc: "Entendemos tu negocio, tus objetivos y tus oportunidades.",
      icon: <Target className="w-6 h-6" />
    },
    {
      num: "02",
      title: "ESTRUCTURA",
      desc: "Diseñamos la arquitectura correcta para generar valor.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      num: "03",
      title: "SISTEMA",
      desc: "Construimos activos digitales y procesos que funcionan.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      num: "04",
      title: "MEDICIÓN",
      desc: "Implementamos métricas para tomar mejores decisiones.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      num: "05",
      title: "ESCALAMIENTO",
      desc: "Optimización continua para crecer sin límites.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="bg-rauvia-bg border-t border-slate-100 relative overflow-hidden w-full" id="metodologia">
      {/* Desktop SVG */}
      <div className="hidden lg:flex w-full justify-center">
         <img width="2048" height="480" loading="lazy" src="/media/rauvia-methodology-interactive.svg" alt="Metodología Graphic" className="w-full h-auto object-cover" />
      </div>

      {/* Mobile HTML Version */}
      <div className="lg:hidden max-w-md mx-auto px-4 sm:px-6 py-20">
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase block mb-6">
            NUESTRA METODOLOGÍA
          </span>
          <h2 className="text-3xl font-extrabold text-rauvia-navy leading-tight">
            Convertimos capacidades <br/> en sistemas que generan <br/>
            <span className="text-rauvia-blue">crecimiento.</span>
          </h2>
        </div>

        <div className="relative pl-6">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-300"></div>

          <div className="flex flex-col gap-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div 
                  key={idx} 
                  className="relative flex flex-col gap-3 pl-8 cursor-pointer"
                  onClick={() => setActiveStep(idx)}
                >
                  {/* Node on the line */}
                  <div className={`absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full transition-all duration-300 ${isActive ? 'bg-rauvia-gold scale-125' : 'bg-slate-300'}`}>
                    {isActive && <div className="absolute inset-0 bg-rauvia-gold/30 rounded-full scale-[2.5] animate-ping"></div>}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-black transition-colors ${isActive ? 'text-rauvia-gold' : 'text-slate-300'}`}>
                      {step.num}
                    </div>
                    <div className={`p-3 rounded-xl border transition-all ${isActive ? 'bg-blue-50 border-rauvia-blue text-rauvia-blue shadow-md' : 'bg-white border-slate-200 text-slate-400'}`}>
                      {step.icon}
                    </div>
                  </div>

                  <h3 className={`text-lg font-extrabold tracking-wide uppercase transition-colors ${isActive ? 'text-rauvia-blue' : 'text-rauvia-navy'}`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
