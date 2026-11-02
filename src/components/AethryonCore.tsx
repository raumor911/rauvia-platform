import { Link } from 'react-router-dom';

export default function AethryonCore() {
  const coreFeatures = [
    { num: "01", title: "ESTRATEGIA", desc: "Claridad, foco y dirección" },
    { num: "02", title: "PROCESOS", desc: "Estructura clara y escalable" },
    { num: "03", title: "TECNOLOGÍA", desc: "Plataformas que funcionan" },
    { num: "04", title: "OPERACIÓN", desc: "Eficiencia diaria" },
    { num: "05", title: "RESULTADOS", desc: "Crecimiento medible" },
  ];

  return (
    <div className="rv-aethryon-core">
      <Link to="/aethryon/" className="rv-aethryon-graphic" aria-label="Conocer AETHRYON: estrategia, procesos, tecnología, operación y resultados">
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/media/aethryon-convergence-mobile-960.webp" type="image/webp" />
          <source media="(max-width: 1023px)" type="image/webp"
            srcSet="/media/aethryon-convergence-mobile-640.webp 640w, /media/aethryon-convergence-mobile-960.webp 960w"
            sizes="(max-width: 767px) calc(100vw - 32px), calc(50vw - 36px)" />
          <img width="1400" height="1060" loading="eager" fetchPriority="high" decoding="async"
            src="/media/aethryon-convergence-animated-optimized-v73.svg" alt=""
          />
        </picture>
      </Link>
      <ul className="rv-aethryon-features" aria-label="Capacidades AETHRYON">
        {coreFeatures.map(item => (
          <li key={item.num}>
            <span className="rv-aethryon-number" aria-hidden="true">{item.num}</span>
            <div><span className="rv-aethryon-feature-title">{item.title}</span><span>{item.desc}</span></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
