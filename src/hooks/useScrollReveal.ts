import { useEffect, type RefObject } from 'react';

export default function useScrollReveal(root: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const container = root.current;
    if (!container || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('rv-reveal-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    elements.forEach(element => {
      element.classList.add('rv-reveal-target');
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach(element => element.classList.remove('rv-reveal-target', 'rv-reveal-visible'));
    };
  }, [root, selector]);
}
