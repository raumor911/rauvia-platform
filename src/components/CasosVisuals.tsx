import type { CSSProperties } from 'react';

// Escenas decorativas (aria-hidden) de las tarjetas de Casos. Sin texto: solo formas y movimiento CSS.
// Reposo = estado final legible; la animación solo adorna y se apaga con movimiento reducido.

// Conversaciones que entran, se filtran por valor y alimentan un sistema que entiende la demanda.
const DOTS: Array<[number, number, boolean]> = [
  [34, 44, false], [58, 70, false], [28, 96, true], [62, 118, false], [40, 146, false], [70, 168, true],
  [24, 70, false], [52, 100, false], [30, 132, false], [66, 150, false], [46, 56, false], [76, 92, true],
];
export function DemandScene() {
  return (
    <svg className="cs-scene" viewBox="0 0 400 220" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="csd-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8cb9eb" stopOpacity="0" /><stop offset="1" stopColor="#FFD766" stopOpacity=".9" /></linearGradient>
        <radialGradient id="csd-core" cx="42%" cy="38%" r="70%"><stop offset="0" stopColor="#fff8dc" /><stop offset=".4" stopColor="#FFD766" /><stop offset="1" stopColor="#c98200" /></radialGradient>
      </defs>
      <g className="cs-sieve" stroke="#8cb9eb" strokeOpacity=".5" fill="none">
        <path d="M168 24V196" strokeDasharray="2 6" />
        <path d="M196 24V196" strokeDasharray="2 6" />
        <path d="M168 110H196" strokeOpacity=".9" />
      </g>
      <path d="M200 110H282" stroke="url(#csd-beam)" strokeWidth="1.4" />
      {DOTS.map(([x, y, gold], i) => (
        <circle key={i} className={gold ? 'cs-dot cs-dot-gold' : 'cs-dot'} cx={x} cy={y} r={gold ? 4.2 : 3.2}
          style={{ '--tx': gold ? '246px' : '112px', '--ty': gold ? `${110 - y}px` : `${(110 - y) * 0.55}px`, '--d': `${(i % 6) * 0.55}s` } as CSSProperties} />
      ))}
      <g className="cs-hex">
        <polygon points="320,62 360,85 360,131 320,154 280,131 280,85" fill="rgba(10,37,64,.82)" stroke="#FFD766" strokeWidth="2" />
        <polygon points="320,78 346,93 346,123 320,138 294,123 294,93" fill="none" stroke="#8cb9eb" strokeOpacity=".5" />
        <circle cx="320" cy="108" r="13" fill="url(#csd-core)" />
      </g>
    </svg>
  );
}

// Piezas de una trayectoria dispersas que se ordenan en una presencia profesional coherente.
const PIECES: Array<[number, number, number, number, string, number, number]> = [
  // x, y, w, h, tipo, desplazamiento inicial x, y
  [118, 38, 164, 12, 'line', -150, -40], [118, 62, 120, 8, 'bar', 170, -52], [118, 80, 150, 8, 'bar', -130, 20],
  [118, 98, 96, 8, 'bar', 120, 62], [60, 128, 76, 44, 'card', -90, 50], [150, 128, 76, 44, 'card', 20, 84],
  [240, 128, 76, 44, 'card', 150, 40],
];
export function ProfileScene() {
  return (
    <svg className="cs-scene" viewBox="0 0 400 220" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <defs><radialGradient id="csp-core" cx="42%" cy="38%" r="70%"><stop offset="0" stopColor="#fff8dc" /><stop offset=".4" stopColor="#FFD766" /><stop offset="1" stopColor="#c98200" /></radialGradient></defs>
      <g className="cs-frame" fill="none" stroke="#8cb9eb" strokeOpacity=".4"><rect x="36" y="18" width="328" height="184" rx="10" strokeDasharray="3 7" /></g>
      <g className="cs-hex-sm"><polygon points="86,34 108,47 108,73 86,86 64,73 64,47" fill="rgba(10,37,64,.85)" stroke="#FFD766" strokeWidth="1.8" /><circle cx="86" cy="60" r="8" fill="url(#csp-core)" /></g>
      {PIECES.map(([x, y, w, h, kind, fx, fy], i) => (
        <rect key={i} className={`cs-piece cs-${kind}`} x={x} y={y} width={w} height={h} rx={kind === 'card' ? 6 : 3}
          style={{ '--fx': `${fx}px`, '--fy': `${fy}px`, '--d': `${i * 0.18}s` } as CSSProperties} />
      ))}
      <circle className="cs-pulse" cx="338" cy="44" r="4" fill="#FFD766" />
    </svg>
  );
}
