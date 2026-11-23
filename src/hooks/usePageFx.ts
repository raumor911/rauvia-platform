import { useEffect, type RefObject } from 'react';

// Capa visual compartida de las páginas internas (Soluciones, AETHRYON, Nosotros). Solo presentación:
// barra de avance de lectura, luz del puntero en el hero (.fx-hero) y foco por tarjeta (.fx-card).
// Mejora progresiva: sin JS o con movimiento reducido las páginas se ven completas y estáticas.
export default function usePageFx(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bar = el.querySelector<HTMLElement>('.fx-progress');
    let raf = 0;
    const paint = () => {
      raf = 0;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--fx-p', max > 0 ? String(Math.min(1, Math.max(0, window.scrollY / max))) : '0');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const cleanups: Array<() => void> = [];
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const hero = el.querySelector<HTMLElement>('.fx-hero');
      if (hero) {
        let hr = 0;
        const move = (e: PointerEvent) => {
          if (hr) return;
          hr = requestAnimationFrame(() => {
            hr = 0;
            const r = hero.getBoundingClientRect();
            hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
            hero.style.setProperty('--px', String(((e.clientX - r.left) / r.width) * 2 - 1));
            hero.style.setProperty('--py', String(((e.clientY - r.top) / r.height) * 2 - 1));
          });
        };
        hero.addEventListener('pointermove', move);
        cleanups.push(() => hero.removeEventListener('pointermove', move));
      }
      el.querySelectorAll<HTMLElement>('.fx-card').forEach(card => {
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--cx', `${e.clientX - r.left}px`);
          card.style.setProperty('--cy', `${e.clientY - r.top}px`);
        };
        card.addEventListener('pointermove', move);
        cleanups.push(() => card.removeEventListener('pointermove', move));
      });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      cleanups.forEach(fn => fn());
    };
  }, [root]);
}
