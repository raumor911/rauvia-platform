import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {trackEvent} from '../lib/analytics';
import './SeoAiPage.css';

// Piezas comunes de /seo-ai/ y sus páginas hijas: mismo look & feel, mismas animaciones.

export type ServiceIntent = 'general' | 'auditoria' | 'implementacion';

export const whatsappUrl = (message: string) => 'https://wa.me/525586494076?text=' + encodeURIComponent(message);

// El evento se adapta a la taxonomía existente: cta_click con propiedades controladas (sin correos ni texto libre).
export function trackCta(placement: string, serviceIntent: ServiceIntent) {
  return () => trackEvent('cta_click', {cta_id: 'seo_ai_cta_click', placement, service_intent: serviceIntent});
}

// Índice de escalonado para las animaciones (CSS lee --sa-i).
export const idx = (i: number) => ({'--sa-i': i} as React.CSSProperties);

// Mejora progresiva: solo se "arma" con JS, con IntersectionObserver y sin preferencia de movimiento reducido.
// Sin JS (o con movimiento reducido) todo el contenido queda visible y estático.
export function useTechMotion(root: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('sa-armed');
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('sa-in'); io.unobserve(entry.target); }
    }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
    el.querySelectorAll('[data-sa]').forEach(node => io.observe(node));
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.setProperty('--sa-p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => { io.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); el.classList.remove('sa-armed'); };
  }, [root]);
}

type SignalProps = {nodes?: ReadonlyArray<readonly [string, string]>; panel?: string; foot?: string};
const hubNodes = [['ACCESO', 'html · enlaces'], ['OFERTA', 'qué vendes'], ['COBERTURA', 'dónde y cuándo']] as const;

export function SeoAiSignal({nodes = hubNodes, panel = 'ASISTENTE · DEMO', foot = 'uso · cobertura'}: SignalProps) {
  // Ilustración conceptual: tres capas de información pública convergen en una respuesta de asistente. Decorativa.
  const ys = [70, 188, 306];
  return <figure className="seoai-signal sa-rise" style={idx(5)}>
    <svg viewBox="0 0 520 420" aria-hidden="true" focusable="false">
      <defs><linearGradient id="sa-scan-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFD766" stopOpacity="0" /><stop offset=".5" stopColor="#FFD766" stopOpacity=".28" /><stop offset="1" stopColor="#FFD766" stopOpacity="0" /></linearGradient></defs>
      <rect className="sa-scan" x="10" y="0" width="500" height="26" rx="13" />
      <path className="sa-wire" d="M180 92 C 215 92, 215 190, 232 200" />
      <path className="sa-wire" d="M180 210 L 198 210" />
      <path className="sa-wire" d="M180 328 C 215 328, 215 230, 232 220" />
      <path className="sa-wire gold" d="M322 210 L 372 210" />
      {nodes.map(([label, sub], k) => <g key={label}>
        <rect className="sa-node" x="20" y={ys[k]} width="160" height="44" rx="8" />
        <circle className="sa-pulse" cx="38" cy={ys[k] + 22} r="3.5" />
        <text className="sa-label" x="52" y={ys[k] + 20}>{label}</text>
        <text className="sa-muted" x="52" y={ys[k] + 34}>{sub}</text>
      </g>)}
      <circle className="sa-ring" cx="260" cy="210" r="86" />
      <circle className="sa-ring alt" cx="260" cy="210" r="72" />
      <polygon className="sa-core" points="260,150 312,180 312,240 260,270 208,240 208,180" />
      <text className="sa-label" x="260" y="214" textAnchor="middle">RAUVIA</text>
      <rect className="sa-node" x="374" y="130" width="130" height="160" rx="10" />
      <text className="sa-muted" x="388" y="154">{panel}</text>
      <rect className="sa-bar" x="388" y="172" width="100" height="7" rx="3.5" />
      <rect className="sa-bar b2" x="388" y="192" width="84" height="7" rx="3.5" />
      <rect className="sa-bar b3" x="388" y="212" width="94" height="7" rx="3.5" />
      <rect className="sa-bar b2" x="388" y="232" width="62" height="7" rx="3.5" />
      <text className="sa-muted" x="388" y="266">{foot}</text>
    </svg>
    <figcaption>Ilustración conceptual de cómo un asistente reúne información pública. No es un resultado real.</figcaption>
  </figure>;
}

// Miga visible: base del BreadcrumbList del JSON-LD (los nombres deben coincidir con routeSeo).
export function Breadcrumb({current}: {current: string}) {
  return <nav aria-label="Ruta de navegación" className="seoai-crumb sa-rise" style={idx(0)}>
    <ol>
      <li><Link to="/">RAUVIA</Link></li>
      <li><Link to="/seo-ai/">SEO para IA</Link></li>
      <li aria-current="page">{current}</li>
    </ol>
  </nav>;
}

type CtaLink = {href: string; label: string; placement: string};
type HeroProps = {
  crumb: string; kicker: string; hook: string; h1: string; lead: string; chip: string;
  primary: CtaLink; secondary: CtaLink; intent: ServiceIntent; signal?: SignalProps;
};
export function SeoAiHero({crumb, kicker, hook, h1, lead, chip, primary, secondary, intent, signal}: HeroProps) {
  return <section className="seoai-hero pt-24 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <Breadcrumb current={crumb} />
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center mt-8">
        <div>
          <p className="seoai-kicker mb-4 sa-rise" style={idx(1)}>{kicker}</p>
          <p className="seoai-hook sa-rise" style={idx(2)}>{hook}</p>
          <h1 className="seoai-h1 text-3xl md:text-5xl font-extrabold leading-tight mb-6 sa-rise" style={idx(3)}>{h1}</h1>
          <p className="seoai-lead text-lg md:text-xl max-w-2xl mb-6 sa-rise" style={idx(4)}>{lead}</p>
          <p className="seoai-chip sa-rise" style={idx(5)}>{chip}</p>
          <div className="flex flex-wrap gap-4 sa-rise" style={idx(6)}>
            <a href={primary.href} onClick={trackCta(primary.placement, intent)} className="seoai-btn seoai-btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors">{primary.label} <ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
            <a href={secondary.href} onClick={trackCta(secondary.placement, intent)} className="seoai-btn seoai-btn-ghost inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors">{secondary.label}</a>
          </div>
        </div>
        <SeoAiSignal {...signal} />
      </div>
    </div>
  </section>;
}

export function SeoAiFaq({items}: {items: ReadonlyArray<readonly [string, string]>}) {
  return <div className="space-y-6">
    {items.map(([q, a], i) => <div key={q} className="seoai-faq" data-sa style={idx(i)}><h3 className="text-lg font-bold text-rauvia-navy mb-2">{q}</h3><p className="text-slate-700">{a}</p></div>)}
  </div>;
}

// Entregables de la auditoría y plan de seis meses: fuente única (ficha de precios y entregables v0.2).
export const auditDeliverables = [
  ['Ficha de rastreo y acceso', 'Revisamos HTTP, HTML, enlaces y señales de rastreo de las URLs acordadas. Separamos lo que se pudo comprobar de lo que requiere permisos, como la indexación en Search Console. Entregamos evidencia por URL.'],
  ['Matriz de oferta y respuestas', 'Cruzamos qué vende la empresa, para qué sirve, sus restricciones y zonas de atención o entrega con las preguntas acordadas. Guardamos superficie, fecha, cita si existe y lo que la respuesta omite o afirma mal.'],
  ['Plan priorizado y devolución', 'Hallazgos con evidencia, acción, orden y forma de validar. Los revisamos contigo en una sesión de devolución, para que puedas ejecutarlos internamente o pedir cotización.'],
] as const;

export const months = [
  ['Acceso', 'Línea base, inventario de URLs y preguntas, y primeras correcciones de rastreo, HTML o enlaces según lo encontrado.'],
  ['Oferta', 'Fichas o bloques que explican quién es la empresa, qué vende, para quién y con qué límites.'],
  ['Casos de uso', 'Contenido que conecta necesidades reales con productos o servicios y explica qué debe confirmar el comprador antes de cotizar.'],
  ['Cobertura', 'Información verificada sobre ubicaciones, zonas de servicio o envío y exclusiones.'],
  ['Verificación y ajustes', 'Repetición de las preguntas de compra y corrección de páginas donde falte evidencia o se preste a confusión.'],
  ['Cierre', 'Comparativo con la línea base, inventario de cambios, pendientes y recomendación de continuidad.'],
] as const;
