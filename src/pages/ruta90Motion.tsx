import React, {useEffect} from 'react';
import {ruta90} from '../data/ruta90.js';
import './Ruta90Motion.css';

// Animación de /ruta-90/: mejora progresiva sobre la identidad editorial de la página (crema, marino y dorado).
// Se "arma" solo con JS, IntersectionObserver y sin movimiento reducido; sin eso todo queda visible y estático.

const CONTAINERS = '.r90-definitions, .r90-flow, .r90-phases, .r90-cycle, .r90-model, .r90-next, .r90-references';
const stagger = (el: Element, i: number) => { el.setAttribute('data-r90', ''); (el as HTMLElement).style.setProperty('--r90-i', String(Math.min(i, 7))); };

export function useRuta90Motion(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Etiqueta los bloques que se revelan (sin tocar el JSX de cada capítulo).
    el.querySelectorAll('.r90-chapter > header').forEach(h => [...h.children].forEach((n, i) => stagger(n, i)));
    el.querySelectorAll('.r90-bridge').forEach(n => stagger(n, 0));
    el.querySelectorAll('.r90-figure').forEach(n => stagger(n, 0));
    el.querySelectorAll('.r90-development').forEach(dev => [...dev.children].forEach((child, i) => {
      if (child.matches(CONTAINERS)) [...child.children].forEach((item, j) => stagger(item, j));
      else if (child.matches('.rv-table-scroll')) child.querySelectorAll('tbody tr').forEach((tr, j) => stagger(tr, j));
      else if (child.matches('table')) child.querySelectorAll('tbody tr').forEach((tr, j) => stagger(tr, j));
      else if (!child.classList.contains('r90-bridge')) stagger(child, Math.min(i, 3));
    }));
    el.querySelectorAll('.r90-method > *, .r90-contact').forEach((n, i) => stagger(n, Math.min(i, 3)));

    el.classList.add('r90-armed');
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('r90-in'); io.unobserve(entry.target); }
    }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
    el.querySelectorAll('[data-r90]').forEach(n => io.observe(n));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.setProperty('--r90-p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      io.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll);
      el.classList.remove('r90-armed');
      el.querySelectorAll('[data-r90]').forEach(n => { n.removeAttribute('data-r90'); n.classList.remove('r90-in'); });
    };
  }, [root]);
}

// Barra de avance de lectura (decorativa).
export const Ruta90ScrollBar = () => <div className="r90-scrollbar" aria-hidden="true" />;

// Línea de 90 días con las cuatro fases del método (ilustración decorativa; el texto real está en el capítulo «Ciclo»).
const X0 = 24, X1 = 756, at = (day: number) => X0 + (day / 90) * (X1 - X0);
export function Ruta90Track() {
  const phases = (ruta90.phases as unknown as [string, string][]).map(([name, days]) => {
    const [a, b] = days.split('–').map(Number);
    return {name, a, b};
  });
  return <div className="r90-track" aria-hidden="true">
    <svg viewBox="0 0 780 104" focusable="false">
      <line className="r90-t-base" x1={X0} y1="58" x2={X1} y2="58" />
      {phases.map((p, i) => <line key={p.name} className="r90-t-seg" x1={at(p.a === 0 ? 0 : p.a - 1)} y1="58" x2={at(p.b)} y2="58" pathLength={1} style={{'--r90-i': i} as React.CSSProperties} />)}
      {phases.map((p, i) => {
        const x = at(p.a === 0 ? 0 : p.a - 1);
        return <g key={p.name} className="r90-t-node" style={{'--r90-i': i} as React.CSSProperties}>
          <circle className="r90-t-halo" cx={x} cy="58" r="9" />
          <circle className="r90-t-dot" cx={x} cy="58" r="5" />
          <text className="r90-t-name" x={x} y="32" textAnchor={i === 0 ? 'start' : 'middle'}>{p.name}</text>
          <text className="r90-t-day" x={x} y="86" textAnchor={i === 0 ? 'start' : 'middle'}>DÍA {p.a}</text>
        </g>;
      })}
      <circle className="r90-t-end" cx={X1} cy="58" r="6" />
      <text className="r90-t-day" x={X1} y="86" textAnchor="end">DÍA 90</text>
      <circle className="r90-t-runner" cx={X0} cy="58" r="3.5" />
    </svg>
  </div>;
}
