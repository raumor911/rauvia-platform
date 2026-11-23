// Portada generativa (aria-hidden) para entradas sin imagen destacada: una constelación sobre la retícula triangular
// de la marca, distinta por entrada (semilla = id) y con un nodo dorado que marca la señal. Sin texto.
const COLS = 9, ROWS = 5, DX = 46, DY = 40;
function rng(seed: number) {
  let s = (Math.imul(seed ^ 0x9e3779b9, 2654435761) >>> 0) || 1;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}
const pos = (c: number, r: number): [number, number] => [28 + c * DX + (r % 2 ? DX / 2 : 0), 24 + r * DY];

export default function PostCover({ seed, className = '' }: { seed: number; className?: string }) {
  const rand = rng(seed);
  const all: Array<[number, number]> = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS - (r % 2 ? 1 : 0); c++) all.push([c, r]);
  // nodos encendidos: de izquierda a derecha, una ruta que converge
  const lit: Array<[number, number]> = [];
  const used = new Set<number>();
  const n = 7 + Math.floor(rand() * 3);
  for (let i = 0; i < n; i++) {
    const colTarget = Math.round((i / (n - 1)) * (COLS - 2));
    for (let tries = 0; tries < 20; tries++) {
      const r = Math.floor(rand() * ROWS);
      const c = Math.max(0, Math.min(COLS - 1 - (r % 2 ? 1 : 0), colTarget + Math.floor(rand() * 2)));
      const key = r * 20 + c;
      if (!used.has(key)) { used.add(key); lit.push([c, r]); break; }
    }
  }
  const pts = lit.map(([c, r]) => pos(c, r));
  const goldIdx = Math.floor(rand() * pts.length);
  const [gx, gy] = pts[goldIdx] ?? [200, 112];
  return (
    <svg className={`pc ${className}`} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g className="pc-lattice">
        {all.map(([c, r]) => { const [x, y] = pos(c, r); return <circle key={`${c}-${r}`} cx={x} cy={y} r="1.5" />; })}
      </g>
      <g className="pc-lattice-lines">
        {all.map(([c, r]) => {
          const [x, y] = pos(c, r);
          const right = c < COLS - 1 - (r % 2 ? 1 : 0) ? <line key={`h${c}-${r}`} x1={x} y1={y} x2={x + DX} y2={y} /> : null;
          const dr = r + 1 < ROWS ? <line key={`d${c}-${r}`} x1={x} y1={y} x2={x + (r % 2 ? DX / 2 : -DX / 2)} y2={y + DY} /> : null;
          return <g key={`e${c}-${r}`}>{right}{dr}</g>;
        })}
      </g>
      <polyline className="pc-path" points={pts.map(p => p.join(',')).join(' ')} />
      {pts.map(([x, y], i) => <circle key={i} className="pc-node" cx={x} cy={y} r={i === goldIdx ? 0 : 3 + (i % 3)} />)}
      <circle className="pc-ring" cx={gx} cy={gy} r="16" />
      <circle className="pc-gold" cx={gx} cy={gy} r="6.5" />
    </svg>
  );
}
