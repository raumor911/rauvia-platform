import React, {useEffect} from 'react';
import './HexTech.css';

// Piezas comunes de Metodología y Capacidades (home): hexágono técnico animado con la paleta RAUVIA.
// Mismo lenguaje visual que /seo-ai/: líneas que se dibujan, órbita dorada, escaneo, pulso y flujo punteado.

const HEX = '60,8 105,34 105,86 60,112 15,86 15,34';

export const hxIdx = (i: number) => ({'--hx-i': i} as React.CSSProperties);

// Mejora progresiva: solo se "arma" con JS, IntersectionObserver y sin movimiento reducido.
export function useHexMotion(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('hx-armed');
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('hx-in'); io.unobserve(entry.target); }
    }, {threshold: 0.2, rootMargin: '0px 0px -5% 0px'});
    el.querySelectorAll('[data-hx]').forEach(node => io.observe(node));
    return () => { io.disconnect(); el.classList.remove('hx-armed'); };
  }, [root]);
}

export function HexIcon({uid, children}: {uid: string; children: React.ReactNode}) {
  return <svg className="hx-hex" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <defs><clipPath id={`hx-c-${uid}`}><polygon points={HEX} /></clipPath></defs>
    <polygon className="hx-fill" points={HEX} />
    <g clipPath={`url(#hx-c-${uid})`}>
      <path className="hx-guide" d="M60 8 V112 M15 34 L105 86 M105 34 L15 86" />
      <rect className="hx-scan" x="0" y="0" width="120" height="3" />
    </g>
    <circle className="hx-ring" cx="60" cy="60" r="45" />
    <g className="hx-orbit"><circle className="hx-dot" cx="60" cy="15" r="3.2" /></g>
    <polygon className="hx-edge" points={HEX} pathLength={1} />
    <g className="hx-glyph">{children}</g>
  </svg>;
}

// Glifos (centro 60,60). `hx-g` se dibuja; `hx-gold` es acento dorado.
const g = 'hx-g';
const gold = 'hx-g hx-gold';
const P = {pathLength: 1} as const;

export const glyphs = {
  claridad: <>
    <circle className={g} cx="60" cy="60" r="24" {...P} /><circle className={g} cx="60" cy="60" r="12" {...P} />
    <circle className="hx-pulse-dot" cx="60" cy="60" r="4" />
    <path className={gold} d="M62 58 L82 38 M74 38 H82 V46" {...P} />
  </>,
  estructura: <>
    <path className={g} d="M60 34 L83 47 V73 L60 86 L37 73 V47 Z" {...P} />
    <path className={g} d="M60 60 V86 M60 60 L37 47 M60 60 L83 47" {...P} />
    <circle className="hx-pulse-dot" cx="60" cy="60" r="3.4" />
  </>,
  sistema: <>
    <path className={g} d="M60 32 L86 45 L60 58 L34 45 Z" {...P} />
    <path className={g} d="M34 57 L60 70 L86 57" {...P} />
    <path className={gold} d="M34 69 L60 82 L86 69" {...P} />
  </>,
  medicion: <>
    <circle className={g} cx="44" cy="43" r="6" {...P} /><circle className={g} cx="62" cy="64" r="9" {...P} /><circle className={g} cx="46" cy="86" r="6" {...P} />
    <path className={g} d="M48 48 L56 57 M57 71 L50 80 M71 64 H79" {...P} />
    <circle className="hx-pulse-dot" cx="85" cy="64" r="5" />
  </>,
  escalamiento: <>
    <path className={g} d="M34 86 H86" {...P} />
    <rect className={g} x="38" y="70" width="8" height="16" {...P} /><rect className={g} x="52" y="63" width="8" height="23" {...P} /><rect className={g} x="66" y="56" width="8" height="30" {...P} />
    <path className={gold} d="M38 54 L56 42 L66 47 L86 30 M78 30 H86 V38" {...P} />
  </>,
  estrategia: <>
    <circle className={g} cx="60" cy="60" r="24" {...P} />
    <path className={g} d="M60 28 V40 M60 80 V92 M28 60 H40 M80 60 H92" {...P} />
    <path className={gold} d="M60 46 L67 60 L60 74 L53 60 Z" {...P} />
  </>,
  comerciales: <>
    <path className={g} d="M35 38 H85 L68 62 V84 L52 76 V62 Z" {...P} />
    <path className={g} d="M44 50 H76" {...P} />
    <circle className="hx-pulse-dot" cx="60" cy="68" r="3.4" />
  </>,
  tecnologia: <>
    <path className={g} d="M47 44 L31 60 L47 76 M73 44 L89 60 L73 76" {...P} />
    <path className={gold} d="M66 40 L54 80" {...P} />
  </>,
  automatizacion: <>
    <circle className={g} cx="60" cy="60" r="15" {...P} /><circle className={g} cx="60" cy="60" r="5" {...P} />
    <g className="hx-spin">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => <path key={a} className={g} d="M60 36 V43" transform={`rotate(${a} 60 60)`} {...P} />)}
    </g>
    <circle className="hx-pulse-dot" cx="60" cy="60" r="2.4" />
  </>,
  datos: <>
    <path className={g} d="M34 86 H86" {...P} />
    <rect className={g} x="38" y="72" width="8" height="14" {...P} /><rect className={g} x="52" y="62" width="8" height="24" {...P} /><rect className={g} x="66" y="52" width="8" height="34" {...P} />
    <path className={gold} d="M36 58 L52 48 L66 54 L84 34" {...P} />
  </>,
  acompanamiento: <>
    <circle className={g} cx="60" cy="48" r="11" {...P} />
    <path className={g} d="M37 86 C37 66 83 66 83 86" {...P} />
    <circle className="hx-pulse-dot" cx="86" cy="52" r="3.4" />
  </>,
} as const;
