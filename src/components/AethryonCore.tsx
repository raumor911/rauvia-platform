import { Link } from 'react-router-dom';

const coreFeatures = [
  { num: '01', title: 'SITUACIÓN', desc: 'Entendemos el problema y su contexto.' },
  { num: '02', title: 'OFERTA', desc: 'Definimos qué necesita comprender el cliente.' },
  { num: '03', title: 'INFORMACIÓN', desc: 'Organizamos evidencia, contenidos y condiciones.' },
  { num: '04', title: 'IMPLEMENTACIÓN', desc: 'Ejecutamos los cambios acordados.' },
  { num: '05', title: 'VERIFICACIÓN', desc: 'Revisamos qué se entregó y qué se pudo observar.' },
];

export default function AethryonCore({ showSteps = true }: { showSteps?: boolean }) {
  return (
    <div className="rv-aethryon-core">
      <link rel="preload" as="image" href="/media/aethryon-convergence-animated-optimized-v73.svg" fetchPriority="high" />
      <Link to="/aethryon/" className="rv-aethryon-graphic flex" aria-label={showSteps ? "Conocer AETHRYON: situación, oferta, información, implementación y verificación" : "Conocer AETHRYON"}>
        {/* Frame the original animated SVG without altering its art or animations.
            Its baked-in labels sit outside this viewport; equivalent HTML follows. */}
        <svg viewBox="240 150 760 800" width="760" height="800" aria-hidden="true" focusable="false">
          <image href="/media/aethryon-convergence-animated-optimized-v73.svg" width="1400" height="1060" />
        </svg>
      </Link>
      {showSteps && (
        <ul className="rv-aethryon-features" aria-label="Cómo empieza y se ejecuta un trabajo">
          {coreFeatures.map(item => (
            <li key={item.num}>
              <span className="rv-aethryon-number" aria-hidden="true">{item.num}</span>
              <div><span className="rv-aethryon-feature-title">{item.title}</span><span>{item.desc}</span></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
