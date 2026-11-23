import { useEffect, type RefObject } from 'react';

// UX de la página AETHRYON (solo presentación): pasos que se encienden en orden con un riel de avance y un índice
// lateral de secciones. Mejora progresiva: sin JS o con movimiento reducido todo se ve completo; el índice se crea
// con los encabezados que ya existen (no añade texto visible).
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

    // 2) Índice lateral de secciones.
    const sections = Array.from(el.querySelectorAll<HTMLElement>(':scope > section[id]'));
    if (sections.length) {
      const nav = document.createElement('nav');
      nav.className = 'dm-dots';
      nav.setAttribute('aria-label', 'Secciones');
      const links = sections.map(sec => {
        const label = (sec.querySelector('h1, h2')?.textContent ?? sec.id).replace(/\s+/g, ' ').trim();
        const a = document.createElement('a');
        a.href = `#${sec.id}`;
        a.setAttribute('aria-label', label);
        a.dataset.label = label;
        nav.appendChild(a);
        return a;
      });
      el.appendChild(nav);
      const io2 = new IntersectionObserver(entries => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const i = sections.indexOf(en.target as HTMLElement);
          links.forEach((l, k) => { l.classList.toggle('is-on', k === i); if (k === i) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
          const dark = (en.target as HTMLElement).classList.contains('fx-dark') || en.target.id === 'aethryon-hero';
          nav.classList.toggle('on-light', !dark);
        }
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(s => io2.observe(s));
      cleanups.push(() => { io2.disconnect(); nav.remove(); });
    }

    return () => cleanups.forEach(fn => fn());
  }, [root]);
}
