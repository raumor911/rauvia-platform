

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
    <section className="fr-problem relative w-full" id="problema" aria-labelledby="problema-titulo">
      <div className="fr-problem-inner max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="fr-problem-head text-center">
          <span className="fr-kicker block">
            SITUACIÓN VISIBLE
          </span>
          <h2 id="problema-titulo" className="fr-problem-title">
            Muchas empresas <br className="hidden lg:block"/> tienen capacidades. <br/>
            <span>Pocas las convierten <br className="hidden lg:block"/> en resultados.</span>
          </h2>
        </div>

        <div className="fr-problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, idx) => (
            <div key={idx} className="fr-card group flex flex-col items-center text-center">
              <div className="fr-icon flex items-center justify-center">
                {problem.icon}
              </div>
              <h3 className="fr-card-title">
                {problem.title}
              </h3>
              <p className="fr-card-text">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
