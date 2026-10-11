import { Compass, Network, Code, Zap, LineChart, Users } from "lucide-react";

export default function CapabilitiesSection() {
  const capabilities = [
    {
      title: "ESTRATEGIA",
      desc: "Definimos dirección, propuesta de valor y modelos de crecimiento.",
      icon: <Compass className="w-8 h-8 text-rauvia-blue" />
    },
    {
      title: "SISTEMAS COMERCIALES",
      desc: "Diseñamos métodos, procesos y experiencias que convierten.",
      icon: <Network className="w-8 h-8 text-rauvia-blue" />
    },
    {
      title: "TECNOLOGÍA",
      desc: "Desarrollamos plataformas, integraciones y soluciones a la medida.",
      icon: <Code className="w-8 h-8 text-rauvia-blue" />
    },
    {
      title: "AUTOMATIZACIÓN",
      desc: "Optimizamos operaciones para aumentar eficiencia y reducir fricción.",
      icon: <Zap className="w-8 h-8 text-rauvia-blue" />
    },
    {
      title: "DATOS & ANALYTICS",
      desc: "Medimos, analizamos y convertimos datos en decisiones.",
      icon: <LineChart className="w-8 h-8 text-rauvia-blue" />
    },
    {
      title: "ACOMPAÑAMIENTO",
      desc: "Trabajamos contigo como socio estratégico en cada etapa del crecimiento.",
      icon: <Users className="w-8 h-8 text-rauvia-blue" />
    }
  ];

  return (
    <section className="bg-white border-t border-slate-100 relative overflow-hidden w-full" id="capacidades">
      {/* Desktop SVG */}
      <div className="hidden lg:flex w-full justify-center">
         <img width="2048" height="370" loading="lazy" src="/media/rauvia-capabilities-section.svg" alt="Capacidades Graphic" className="w-full h-auto object-cover" />
      </div>

      {/* Mobile HTML Version */}
      <div className="lg:hidden max-w-lg mx-auto px-4 sm:px-6 py-20">
        <div className="mb-12 text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase block mb-2">
            NUESTRAS CAPACIDADES
          </span>
          <div className="w-8 h-1 bg-slate-200 mx-auto sm:mx-0 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              {/* Hexagon shape wrapper */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full text-blue-50/50" viewBox="0 0 100 100" fill="currentColor">
                  <polygon points="50,5 95,27 95,72 50,95 5,72 5,27" />
                </svg>
                <svg className="absolute inset-0 w-full h-full text-rauvia-blue" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <polygon points="50,5 95,27 95,72 50,95 5,72 5,27" />
                </svg>
                <div className="relative z-10">
                  {cap.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-rauvia-navy mb-3 uppercase tracking-wide">
                {cap.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
