import { useEffect, type RefObject } from 'react';

// UX de Nosotros (solo presentación): los elementos marcados con .nx-reveal se encienden al aparecer, en orden.
// Mejora progresiva: sin JS o con movimiento reducido todo se ve completo y estático.
export default function useNosotrosFx(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('nx-armed');
    const io = new IntersectionObserver(entries => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add('nx-on');
        io.unobserve(en.target);
      }
    }, { threshold: .3, rootMargin: '0px 0px -8% 0px' });
    el.querySelectorAll('.nx-reveal').forEach(n => io.observe(n));
    return () => { io.disconnect(); el.classList.remove('nx-armed'); };
  }, [root]);
}
