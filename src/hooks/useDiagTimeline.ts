import { useEffect, type RefObject } from 'react';

// Línea de tiempo de «Señales para revisar» (/seo-local-para-medicos/).
// La línea crece a velocidad constante del primer punto al último y cada tarjeta y su punto
// aparecen justo cuando la punta de la línea llega a ese punto. Los tiempos salen de la
// posición real de cada punto, así que la unión queda sincronizada aunque las tarjetas
// tengan alturas distintas. Mejora progresiva: sin JS, en el prerender o con movimiento
// reducido la lista se ve completa y estática.
const SPEED_PX_PER_MS = 0.34; // ~340 px por segundo
const MIN_MS = 1400;
const MAX_MS = 2600;
const CARD_LEAD_MS = 160; // la tarjeta empieza a aparecer un instante antes de que llegue la línea

export default function useDiagTimeline(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === 'undefined') return;
    const list = el.querySelector<HTMLElement>('.sl-diag-list');
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(':scope > li'));
    const dots = items.map(li => li.querySelector<HTMLElement>('.sl-diag-dot'));
    if (items.length < 2 || dots.some(d => !d)) return;

    // geometría: la línea va del centro del primer punto al centro del último
    const measure = () => {
      const lr = list.getBoundingClientRect();
      const centers = dots.map(d => { const r = d!.getBoundingClientRect(); return r.top + r.height / 2 - lr.top; });
      const top = centers[0];
      const h = Math.max(0, centers[centers.length - 1] - top);
      list.style.setProperty('--tl-top', `${top}px`);
      list.style.setProperty('--tl-h', `${h}px`);
      return { centers, top, h };
    };
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      return () => window.removeEventListener('resize', onResize);
    }

    list.classList.add('tl-armed');
    let doneTimer = 0;
    const run = () => {
      const { centers, top, h } = measure();
      const dur = Math.round(Math.min(MAX_MS, Math.max(MIN_MS, h / SPEED_PX_PER_MS)));
      list.style.setProperty('--tl-d', `${dur}ms`);
      items.forEach((li, i) => {
        const at = h > 0 ? Math.round(((centers[i] - top) / h) * dur) : 0;
        li.style.setProperty('--tl-dot', `${at}ms`);
        li.style.setProperty('--tl-card', `${Math.max(0, at - CARD_LEAD_MS)}ms`);
      });
      // doble rAF: asegura que el estado inicial se pintó antes de arrancar la transición
      requestAnimationFrame(() => requestAnimationFrame(() => list.classList.add('tl-run')));
      doneTimer = window.setTimeout(() => {
        list.classList.add('tl-done');
        window.setTimeout(() => {
          list.classList.remove('tl-armed', 'tl-run', 'tl-done');
          items.forEach(li => { li.style.removeProperty('--tl-dot'); li.style.removeProperty('--tl-card'); });
        }, 900);
      }, dur + 700);
    };

    // arranca cuando el inicio de la lista llega al último cuarto de la ventana
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); run(); }
    }, { threshold: 0, rootMargin: '0px 0px -25% 0px' });
    io.observe(list);

    return () => {
      io.disconnect();
      window.clearTimeout(doneTimer);
      window.removeEventListener('resize', onResize);
      list.classList.remove('tl-armed', 'tl-run', 'tl-done');
    };
  }, [root]);
}
