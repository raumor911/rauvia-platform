import { Link } from 'react-router-dom';

const coreFeatures = [
  { num: '01', title: 'ESTRATEGIA', desc: 'Claridad, foco y dirección' },
  { num: '02', title: 'PROCESOS', desc: 'Estructura clara y repetible' },
  { num: '03', title: 'TECNOLOGÍA', desc: 'Plataformas, datos e integraciones' },
  { num: '04', title: 'OPERACIÓN', desc: 'Ejecución eficiente y automatizada' },
  { num: '05', title: 'RESULTADOS', desc: 'Impacto medible y escalable' },
];

export default function AethryonCore() {
  return (
    <div className="rv-aethryon-core">
      <link rel="preload" as="image" href="/media/aethryon-convergence-animated-optimized-v73.svg" fetchPriority="high" />
      <Link to="/aethryon/" className="rv-aethryon-graphic flex" aria-label="Conocer AETHRYON: estrategia, procesos, tecnología, operación y resultados">
        {/* Frame the original animated SVG without altering its art or animations.
            Its baked-in labels sit outside this viewport; equivalent HTML follows. */}
        <svg viewBox="240 150 760 800" width="760" height="800" aria-hidden="true" focusable="false">
          <image href="/media/aethryon-convergence-animated-optimized-v73.svg" width="1400" height="1060" />
        </svg>
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
