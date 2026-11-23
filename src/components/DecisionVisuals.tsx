import { useEffect, useRef, useState, type CSSProperties } from 'react';

// Figuras decorativas (aria-hidden) de la página AETHRYON. No añaden texto al DOM: las etiquetas se pintan con CSS
// (data-label) y solo reutilizan palabras que ya aparecen en la página. Sin JS o con movimiento reducido se ven completas.

/** Ejemplo conceptual: el núcleo analiza tres opciones y la prioridad se enciende (la que ya describe el texto). */
export function DecisionFork() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<'final' | 'armed' | 'on'>('final');
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    setPhase('armed');
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setPhase('on'); io.disconnect(); } }, { threshold: .55 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const branches = [
    { d: 'M300 62 C300 120 118 118 118 196', x: 19.6, label: 'Marketing', win: false },
    { d: 'M300 62 L300 196', x: 50, label: 'Personal', win: false },
    { d: 'M300 62 C300 120 482 118 482 196', x: 80.4, label: 'Automatizar', win: true },
  ];
  return (
    <figure ref={ref} className={`dm-fork is-${phase}`} aria-hidden="true">
      <svg viewBox="0 0 600 250" className="dm-fork-svg" focusable="false">
        {branches.map((b, i) => (
          <g key={i} className={b.win ? 'dm-branch is-win' : 'dm-branch'} style={{ '--i': i } as CSSProperties}>
            <path d={b.d} pathLength={1} className="dm-b-glow" />
            <path d={b.d} pathLength={1} className="dm-b-line" />
            {b.win && <path d={b.d} className="dm-b-flow" />}
          </g>
        ))}
      </svg>
      <span className="dm-fork-core" data-label="AETHRYON" />
      {branches.map((b, i) => (
        <span key={i} className={`dm-node${b.win ? ' is-win' : ''}`} data-label={b.label} style={{ left: `${b.x}%`, '--i': i } as CSSProperties} />
      ))}
    </figure>
  );
}

/** Cinco criterios como un pentágono: el vértice del criterio abierto se enciende. */
export function CriteriaGauge({ active }: { active: number }) {
  const cx = 160, cy = 150, R = 100;
  const pt = (k: number, r: number) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const; };
  const poly = (r: number) => Array.from({ length: 5 }, (_, k) => pt(k, r).join(',')).join(' ');
  const vals = [.9, .7, .84, .62, .8];
  const data = vals.map((v, k) => pt(k, R * v).join(',')).join(' ');
  return (
    <svg className="dm-gauge" viewBox="0 0 320 300" aria-hidden="true" focusable="false" data-active={active}>
      <defs>
        <radialGradient id="dmg-core" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fff8dc" /><stop offset=".5" stopColor="#FFD766" /><stop offset="1" stopColor="#E6A300" stopOpacity=".2" /></radialGradient>
      </defs>
      {[.34, .67, 1].map((f, i) => <polygon key={i} points={poly(R * f)} className="dm-g-ring" />)}
      {Array.from({ length: 5 }, (_, k) => { const [x, y] = pt(k, R); return <line key={k} x1={cx} y1={cy} x2={x} y2={y} className={`dm-g-spoke${active === k ? ' is-on' : ''}`} />; })}
      <polygon points={data} className="dm-g-data" />
      {Array.from({ length: 5 }, (_, k) => {
        const [x, y] = pt(k, R), [tx, ty] = pt(k, R + 26), on = active === k;
        return (
          <g key={k} className={on ? 'dm-g-v is-on' : 'dm-g-v'}>
            {on && <circle cx={x} cy={y} r="9" className="dm-g-ping" />}
            <circle cx={x} cy={y} r={on ? 6 : 3.5} className="dm-g-dot" />
            <text x={tx} y={ty + 4} textAnchor="middle" className="dm-g-num">{k + 1}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="16" fill="url(#dmg-core)" className="dm-g-core" />
    </svg>
  );
}
