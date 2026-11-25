import { useEffect, type RefObject } from 'react';

// Animaciones de aparición al hacer scroll para /frente-comercial/ y la línea de tiempo "Cómo trabajamos".
// Solo presentación y mejora progresiva: las clases se añaden desde aquí, así que sin JS, en el prerender
// o con movimiento reducido todo el contenido queda visible y estático.
const REVEAL = [
  'section:not(.rv-frente-hero):not(.rv-tl-section) h2:not(.med-heading h2)',
  'section:not(.rv-frente-hero):not(.rv-tl-section) > div > p',
  'section:not(.rv-frente-hero):not(.rv-tl-section) .grid > div',
  'section:not(.rv-frente-hero):not(.rv-tl-section) .flex-wrap > div',
  'section:not(.rv-frente-hero):not(.rv-tl-section) details',
  'section:not(.rv-frente-hero):not(.rv-tl-section) a[class*="inline-flex"]',
  '.rv-not-note',
  '.hub-flow', '.hub-feature-grid > article', '.hub-solution-grid > article', '.hub-comparison > article', '.hub-seo-grid > article', '.hub-audience-grid > article', '.hub-mobile-grid > div', '.hub-front > div', '.hub-boundaries > div', '.hub-showcase-tags span', '.hub-signals', '.med-heading', '.med-grid:not(.med-plans) > article', '.med-audience li', '.med-upgrades > div', '.med-faq details', '.med-responsibility', '.med-related', '.med-feature-strip span', '.med-showcase-grid', '.med-example-controls',
  '.sl-diag-list', '.sl-diag-list li', '.sl-diag-quote', '.sl-ask-panel', '.sl-ask li', '.esp-statement', '.sl-system', '.sl-system article', '.sl-system-bottom', '.sl-building-blocks span', '.esp-comparison article', '.esp-audiences article', '.sl-mobile-example', '.esp-explain-grid > div', '.esp-front', '.sl-geo-heading > div', '.esp-boundaries > div', '.esp-checklist li',
  '.cons-problem-grid > article', '.cons-entity-center', '.cons-professionals > article', '.cons-specialties > article', '.cons-location-example', '.cons-contact-grid > article', '.cons-branches > article', '.cons-front-line',
  '.rv-s-eyebrow', '.pr-plan', '.pr-change', '.pr-caveat', '.pr-policy', '.pr-problem > div', '.rv-sym-card', '.rv-s-callout', '.rv-quote', '.rv-ba-card', '.rv-ba-arrow', '.rv-faq-side', '.rv-route',
].join(',');

export default function useFrenteMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const cleanups: Array<() => void> = [];

    // 1) Aparición general, escalonada por hermano
    const targets = Array.from(el.querySelectorAll<HTMLElement>(REVEAL));
    const seen = new Map<Element, number>();
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const t = en.target as HTMLElement;
        t.classList.add('fr-in');
        io.unobserve(t);
        window.setTimeout(() => t.classList.remove('fr-rv', 'fr-in', 'fr-left', 'fr-right'), 1400);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(t => {
      const p = t.parentElement!;
      const i = seen.get(p) ?? 0;
      seen.set(p, i + 1);
      t.style.setProperty('--fr-d', `${Math.min(i, 5) * 110}ms`);
      t.classList.add('fr-rv');
      io.observe(t);
    });
    cleanups.push(() => { io.disconnect(); targets.forEach(t => t.classList.remove('fr-rv', 'fr-in')); });

    // 2) Línea de tiempo épica
    const tl = el.querySelector<HTMLElement>('.rv-tl');
    if (tl) {
      const steps = Array.from(tl.querySelectorAll<HTMLElement>('.rv-tl-step'));
      tl.classList.add('rv-tl-armed');
      let raf = 0;
      const paint = () => {
        raf = 0;
        const r = tl.getBoundingClientRect();
        const mid = window.innerHeight * 0.62;
        const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
        tl.style.setProperty('--tl-p', p.toFixed(4));
        steps.forEach(s => {
          const n = s.querySelector('.rv-tl-node')!.getBoundingClientRect();
          const lit = n.top + n.height / 2 < mid;
          if (lit && !s.classList.contains('is-lit')) s.classList.add('is-lit');
          else if (!lit && s.classList.contains('is-lit')) s.classList.remove('is-lit');
        });
        tl.classList.toggle('is-done', p >= 0.999);
      };
      const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
      paint();
      window.addEventListener('scroll', on, { passive: true });
      window.addEventListener('resize', on);
      cleanups.push(() => {
        window.removeEventListener('scroll', on);
        window.removeEventListener('resize', on);
        if (raf) cancelAnimationFrame(raf);
        tl.classList.remove('rv-tl-armed', 'is-done');
        steps.forEach(s => s.classList.remove('is-lit'));
      });
    }

    return () => cleanups.forEach(fn => fn());
  }, [root]);
}
