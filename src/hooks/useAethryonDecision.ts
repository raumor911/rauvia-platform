import { useEffect, type RefObject } from 'react';

// UX de la página AETHRYON (solo presentación): pasos que se encienden en orden con un riel de avance.
// Mejora progresiva: sin JS o con movimiento reducido todo se ve completo.
export default function useAethryonDecision(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    // 1) Pasos: se encienden al aparecer y el riel avanza hasta el último encendido.
    if (!reduce) {
      el.classList.add('dm-armed');
      const groups = new Map<Element, HTMLElement[]>();
      el.querySelectorAll<HTMLElement>('.dm-step').forEach(step => {
        const g = step.closest('.dm-timeline, .grid') ?? step.parentElement!;
        groups.set(g, [...(groups.get(g) ?? []), step]);
      });
      const io = new IntersectionObserver(entries => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const step = en.target as HTMLElement;
          step.classList.add('dm-on');
          io.unobserve(step);
          const list = groups.get(step.closest('.dm-timeline, .grid') ?? step.parentElement!) ?? [];
          const last = list.reduce((m, s, i) => (s.classList.contains('dm-on') ? i : m), 0);
          const rail = step.closest('section')?.querySelector<HTMLElement>('.dm-rail');
          if (rail && list.length > 1) rail.style.setProperty('--rail', String(last / (list.length - 1)));
        }
      }, { threshold: .35, rootMargin: '0px 0px -8% 0px' });
      groups.forEach(list => list.forEach(s => io.observe(s)));
      cleanups.push(() => { io.disconnect(); el.classList.remove('dm-armed'); });
    }

    return () => cleanups.forEach(fn => fn());
  }, [root]);
}
