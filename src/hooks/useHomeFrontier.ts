import { useEffect, type RefObject } from 'react';

// Capa visual de la home (solo presentación): barra de avance de lectura, luz que sigue al puntero en el hero
// y foco por tarjeta en "Situación visible". Mejora progresiva: sin JS o con movimiento reducido la página
// se ve completa y estática (los estilos usan valores por defecto cuando faltan las variables).
export default function useHomeFrontier(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bar = el.querySelector<HTMLElement>('.fr-progress');
    const hero = el.querySelector<HTMLElement>('.rv-home-hero');
    let raf = 0;

    const paintProgress = () => {
      raf = 0;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--fr-p', max > 0 ? String(Math.min(1, Math.max(0, window.scrollY / max))) : '0');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paintProgress); };
    paintProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Solo con puntero fino (no en táctiles).
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];
    if (fine) {
      if (hero) {
        let hr = 0;
        const move = (e: PointerEvent) => {
          if (hr) return;
          hr = requestAnimationFrame(() => {
            hr = 0;
            const r = hero.getBoundingClientRect();
            hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
          });
        };
        hero.addEventListener('pointermove', move);
        cleanups.push(() => hero.removeEventListener('pointermove', move));
      }
      el.querySelectorAll<HTMLElement>('.fr-card').forEach(card => {
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
