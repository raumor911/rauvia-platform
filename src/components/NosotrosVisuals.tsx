// Figura decorativa (aria-hidden) de Nosotros: negocio, operación y tecnología se cruzan en un núcleo.
// Las etiquetas se pintan con CSS (data-label) y solo reutilizan palabras del encabezado de la sección.
export function IntersectionVenn() {
  return (
    <figure className="nx-venn" aria-hidden="true">
      <svg viewBox="0 0 360 330" focusable="false">
        <defs>
          <radialGradient id="nxv-core" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fff8dc" /><stop offset=".45" stopColor="#FFD766" /><stop offset="1" stopColor="#E6A300" stopOpacity="0" /></radialGradient>
          <radialGradient id="nxv-a" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#2a7f9e" stopOpacity=".5" /><stop offset="1" stopColor="#1E4A74" stopOpacity=".12" /></radialGradient>
          <radialGradient id="nxv-b" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#4a78b3" stopOpacity=".5" /><stop offset="1" stopColor="#1E4A74" stopOpacity=".12" /></radialGradient>
          <radialGradient id="nxv-c" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#e6a300" stopOpacity=".32" /><stop offset="1" stopColor="#1E4A74" stopOpacity=".1" /></radialGradient>
        </defs>
        <g className="nx-v-orbit"><circle cx="180" cy="178" r="150" fill="none" stroke="#8cb9eb" strokeOpacity=".3" strokeDasharray="3 9" /><circle cx="180" cy="28" r="3.4" fill="#FFD766" /></g>
        <circle className="nx-v-c nx-v-c1" cx="180" cy="130" r="86" fill="url(#nxv-a)" stroke="#8cb9eb" strokeOpacity=".7" strokeWidth="1.4" />
        <circle className="nx-v-c nx-v-c2" cx="130" cy="216" r="86" fill="url(#nxv-b)" stroke="#8cb9eb" strokeOpacity=".7" strokeWidth="1.4" />
        <circle className="nx-v-c nx-v-c3" cx="230" cy="216" r="86" fill="url(#nxv-c)" stroke="#FFD766" strokeOpacity=".55" strokeWidth="1.4" />
        <circle className="nx-v-core" cx="180" cy="187" r="46" fill="url(#nxv-core)" />
        <circle cx="180" cy="187" r="9" fill="#fff8dc" />
      </svg>
      <span className="nx-v-l nx-v-l1" data-label="Negocio" />
      <span className="nx-v-l nx-v-l2" data-label="Operación" />
      <span className="nx-v-l nx-v-l3" data-label="Tecnología" />
    </figure>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Escenas nativas de Nosotros. Sustituyen visualmente a tres ilustraciones SVG pensadas sobre fondo claro; las imágenes
// originales (y su texto alternativo) siguen en el DOM, ocultas visualmente (.fx-src). El texto visible es el mismo que
// contenían las ilustraciones; las escenas son decorativas para tecnologías de asistencia (aria-hidden).
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { BarChart3, User, Cpu, TrendingUp, Search, Scan, LayoutGrid, Box, Rocket, Gauge, ChevronRight } from 'lucide-react';
import { Core } from './HeroScene';

const S = (i: number) => ({ '--i': i } as CSSProperties);

/** 1 · El problema estructural: capacidades separadas alrededor de un núcleo que aún no las conecta. */
export function ProblemScene({ children }: { children?: ReactNode }) {
  const sats = [
    { icon: BarChart3, title: 'ESTRATEGIA', sub: 'No llega a la operación', x: 17, y: 17 },
    { icon: Cpu, title: 'TECNOLOGÍA', sub: 'Sin arquitectura común', x: 83, y: 17 },
    { icon: User, title: 'PERSONAS', sub: 'Procesos dependientes', x: 17, y: 83 },
    { icon: TrendingUp, title: 'CRECIMIENTO', sub: 'Aumenta la complejidad', x: 83, y: 83 },
  ];
  return (
    <div className="nx-problem max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="nx-src-wrap fx-src">{children}</div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-6 nx-reveal">
          <p className="nx-kicker">EL PROBLEMA ESTRUCTURAL</p>
          <p className="nx-statement">
            <span>LAS EMPRESAS NO SIEMPRE CARECEN DE CAPACIDAD.</span>{' '}
            <span className="nx-gold">CON FRECUENCIA CARECEN DE ESTRUCTURA.</span>
          </p>
          <div className="nx-copy">
            <p>Muchas organizaciones tienen conocimiento, clientes, experiencia y oportunidades.</p>
            <p>Sin embargo, sus capacidades permanecen separadas: la estrategia no llega a la operación, los procesos dependen de personas específicas, la tecnología se incorpora sin una arquitectura común y el crecimiento aumenta la complejidad.</p>
          </div>
          <p className="nx-closer"><ChevronRight aria-hidden="true" />RAUVIA nace para intervenir en ese punto.</p>
        </div>
        <div className="lg:col-span-6" aria-hidden="true">
          <div className="nx-scene nx-reveal">
            <svg className="nx-lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              {sats.map((s, i) => (
                <g key={i}>
                  <line x1="50" y1="50" x2={s.x} y2={s.y} className="nx-ln-glow" vectorEffect="non-scaling-stroke" />
                  <line x1="50" y1="50" x2={s.x} y2={s.y} className="nx-ln" vectorEffect="non-scaling-stroke" style={S(i)} />
                </g>
              ))}
            </svg>
            <div className="nx-core"><Core /></div>
            <span className="nx-core-label">NÚCLEO DE ESTRUCTURA Y DECISIÓN</span>
            {sats.map(({ icon: Icon, title, sub, x, y }, i) => (
              <div key={title} className="nx-sat" style={{ left: `${x}%`, top: `${y}%`, ...S(i) }}>
                <span className="nx-sat-ico"><Icon /></span>
                <span className="nx-sat-t">{title}</span>
                <span className="nx-sat-s">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 2 · De la ambigüedad a un sistema ejecutable: seis pasos unidos por un riel que se enciende. */
export function ProcessScene({ children }: { children?: ReactNode }) {
  const steps = [
    { icon: Search, t: 'COMPRENDER', d: 'Entendemos el contexto, los desafíos y los objetivos reales del negocio.' },
    { icon: Scan, t: 'DELIMITAR', d: 'Identificamos el problema central y delimitamos el alcance con precisión.' },
    { icon: LayoutGrid, t: 'DISEÑAR', d: 'Diseñamos la estructura objetivo y el modelo operativo requerido.' },
    { icon: Box, t: 'CONSTRUIR', d: 'Construimos capacidades, procesos y arquitectura que sostienen la ejecución.' },
    { icon: Rocket, t: 'IMPLEMENTAR', d: 'Acompañamos la puesta en marcha y la adopción del sistema.' },
    { icon: Gauge, t: 'MEDIR', d: 'Medimos resultados, aprendemos y ajustamos para mejorar continuamente.' },
  ];
  return (
    <div className="nx-process max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="fx-src">{children}</div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center nx-reveal">
        <div className="lg:col-span-7">
          <p className="nx-statement nx-statement-l">DE LA AMBIGÜEDAD A UN <span className="nx-blue">SISTEMA EJECUTABLE</span><span className="nx-dot">.</span></p>
          <div className="nx-copy nx-copy-l">
            <p>No comenzamos por una herramienta ni por una solución predeterminada.</p>
            <p>Comenzamos por entender qué está impidiendo que la empresa avance, qué capacidades ya existen y qué estructura debe construirse para convertirlas en resultados.</p>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center" aria-hidden="true">
          <div className="nx-badge">
            <div className="nx-badge-core"><Core /></div>
            <span className="nx-badge-t">INTELIGENCIA ESTRUCTURAL</span>
            <span className="nx-badge-s">AETHRYON</span>
          </div>
        </div>
      </div>
      <ol className="nx-steps nx-reveal" aria-hidden="true">
        {steps.map(({ icon: Icon, t, d }, i) => (
          <li key={t} style={S(i)}>
            <span className="nx-step-ico"><Icon /><b>{String(i + 1).padStart(2, '0')}</b></span>
            <span className="nx-step-t">{t}</span>
            <span className="nx-step-d">{d}</span>
          </li>
        ))}
      </ol>
      <p className="nx-foot" aria-hidden="true">UN PROCESO ESTRUCTURADO. UNA TRANSFORMACIÓN REAL.</p>
    </div>
  );
}

/** 3 · AETHRYON conecta cinco capacidades alrededor de un núcleo; la leyenda y el anillo se iluminan a la par. */
export function ConvergenceScene({ children }: { children?: ReactNode }) {
  const items = [
    { t: 'SITUACIÓN', d: 'Entendemos el problema y su contexto' },
    { t: 'OFERTA', d: 'Definimos qué necesita comprender el cliente' },
    { t: 'INFORMACIÓN', d: 'Organizamos evidencia, contenidos y condiciones' },
    { t: 'IMPLEMENTACIÓN', d: 'Ejecutamos los cambios acordados' },
    { t: 'VERIFICACIÓN', d: 'Revisamos qué se entregó y qué se pudo observar' },
  ];
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (hover || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive(a => (a + 1) % items.length), 2600);
    return () => window.clearInterval(id);
  }, [hover, items.length]);
  const R = 39;
  const pos = (k: number) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / items.length; return [50 + Math.cos(a) * R, 50 + Math.sin(a) * R] as const; };
  return (
    <div className="nx-conv" aria-hidden="true" onMouseLeave={() => setHover(false)}>
      <div className="fx-src">{children}</div>
      <div className="nx-conv-orbit">
        <svg className="nx-lines" viewBox="0 0 100 100" focusable="false">
          <circle cx="50" cy="50" r={R} className="nx-ring" />
          <circle cx="50" cy="50" r={R + 7} className="nx-ring nx-ring-2" />
          {items.map((_, k) => { const [x, y] = pos(k); return <line key={k} x1="50" y1="50" x2={x} y2={y} className={k === active ? 'nx-spoke is-on' : 'nx-spoke'} vectorEffect="non-scaling-stroke" />; })}
        </svg>
        <div className="nx-core nx-core-sm"><Core /></div>
        {items.map((_, k) => { const [x, y] = pos(k); return <span key={k} className={k === active ? 'nx-hex is-on' : 'nx-hex'} style={{ left: `${x}%`, top: `${y}%` }}>{String(k + 1).padStart(2, '0')}</span>; })}
      </div>
      <ul className="nx-legend">
        {items.map((it, k) => (
          <li key={it.t} className={k === active ? 'is-on' : ''} onMouseEnter={() => { setHover(true); setActive(k); }}>
            <b>{String(k + 1).padStart(2, '0')}</b>
            <span><strong>{it.t}</strong><em>{it.d}</em></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
