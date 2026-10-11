

export default function ProblemSection() {
  const problems = [
    {
      title: "OPORTUNIDADES QUE SE ENFRÍAN",
      description: "Hay consultas o cotizaciones, pero cuesta saber qué ocurrió y cómo avanzar.",
      icon: <img loading="lazy" src="/media/01-oportunidades.svg" alt="Oportunidades" className="w-10 h-10" />
    },
    {
      title: "CRECIMIENTO QUE AUMENTA DEPENDENCIA",
      description: "El dueño o ciertas personas siguen concentrando decisiones, información o seguimiento.",
      icon: <img loading="lazy" src="/media/02-dependencia.svg" alt="Dependencia" className="w-10 h-10" />
    },
    {
      title: "LA OFERTA NO SE ENTIENDE",
      description: "El conocimiento está ahí, pero cuesta convertirlo en una propuesta fácil de comprender y comprar.",
      icon: <img loading="lazy" src="/media/03-oferta.svg" alt="Oferta" className="w-10 h-10" />
    },
    {
      title: "CAPACIDAD MAYOR A LO PROYECTADO",
      description: "La operación, clientes y experiencia están por encima de su comunicación externa.",
      icon: <img loading="lazy" src="/media/04-capacidad.svg" alt="Capacidad" className="w-10 h-10" />
    }
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-200 relative w-full py-20 lg:py-32" id="problema">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-16 lg:mb-24 text-center">
          <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase block mb-6">
            SITUACIÓN VISIBLE
          </span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-rauvia-navy leading-tight">
            Muchas empresas <br className="hidden lg:block"/> tienen capacidades. <br/>
            <span className="text-rauvia-blue">Pocas las convierten <br className="hidden lg:block"/> en resultados.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, idx) => (
            <div 
              key={idx} 
              className="group bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-rauvia-blue/40 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
                {problem.icon}
              </div>
              <h3 className="text-[14px] lg:text-[15px] font-bold text-rauvia-navy mb-4 tracking-wider uppercase leading-snug h-auto lg:h-12 flex items-center justify-center">
                {problem.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
