import type { CSSProperties, ReactNode } from 'react';

// Escena decorativa del hero de las páginas internas (aria-hidden): núcleo AETHRYON nativo y rótulos de vidrio.
// Las líneas, el radar o el escudo los dibuja ConvergenceField (overlay). Los rótulos solo usan términos que ya
// aparecen en la página y se pintan con CSS (data-label), sin añadir texto al DOM. La ilustración original
// se conserva en el DOM, oculta visualmente (children).
export type SceneChip = { label: string; x: number; y: number; dir?: 'in' | 'out'; gold?: boolean };

export function Core() {
  return (
    <svg className="fx-core-svg" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="fxc-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFD766" stopOpacity=".5" /><stop offset=".45" stopColor="#2a7f9e" stopOpacity=".22" /><stop offset="1" stopColor="#1E4A74" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fxc-core" cx="42%" cy="38%" r="70%">
          <stop offset="0" stopColor="#fff8dc" /><stop offset=".35" stopColor="#FFD766" /><stop offset="1" stopColor="#c98200" />
        </radialGradient>
        <linearGradient id="fxc-hex" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD766" /><stop offset="1" stopColor="#E6A300" />
        </linearGradient>
      </defs>
      <circle className="fx-core-halo" cx="100" cy="100" r="118" fill="url(#fxc-halo)" />
      <g className="fx-core-ring-a" fill="none" stroke="#8cb9eb" strokeOpacity=".5" strokeWidth="1.2">
        <circle cx="100" cy="100" r="92" strokeDasharray="3 9" />
        <circle cx="100" cy="8" r="3.4" fill="#FFD766" stroke="none" />
        <circle cx="192" cy="100" r="2.4" fill="#cfe0f1" stroke="none" />
      </g>
      <g className="fx-core-ring-b" fill="none" stroke="#8cb9eb" strokeOpacity=".4" strokeWidth="1">
        <circle cx="100" cy="100" r="78" strokeDasharray="30 12 4 12" />
        <circle cx="22" cy="100" r="3" fill="#FFD766" stroke="none" />
      </g>
      <polygon className="fx-core-hex" points="100,30 160.6,65 160.6,135 100,170 39.4,135 39.4,65" fill="rgba(10,37,64,.78)" stroke="url(#fxc-hex)" strokeWidth="2.2" />
      <polygon points="100,48 145,74 145,126 100,152 55,126 55,74" fill="none" stroke="#8cb9eb" strokeOpacity=".45" strokeWidth="1" />
      <circle cx="100" cy="100" r="22" fill="url(#fxc-core)" />
      <circle cx="100" cy="100" r="34" fill="none" stroke="#FFD766" strokeOpacity=".45" strokeWidth="1" />
    </svg>
  );
}

export default function HeroScene({ chips, className = '', children }: { chips: SceneChip[]; className?: string; children?: ReactNode }) {
  return (
    <div className={`fx-scene ${className}`}>
      <div className="fx-src">{children}</div>
      <div className="fx-scene-core" aria-hidden="true"><Core /></div>
      {chips.map((c, i) => (
        <span key={c.label} className="fx-chip" aria-hidden="true" data-fx-node data-fx-dir={c.dir ?? 'out'} data-label={c.label} {...(c.gold ? { 'data-gold': '' } : {})}
          style={{ '--x': `${c.x}%`, '--y': `${c.y}%`, '--i': i } as CSSProperties} />
      ))}
    </div>
  );
}
