import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Check, X} from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import WhatsAppCTA from '../components/WhatsAppCTA';
import {idx, trackCta, useTechMotion, whatsappUrl, SeoAiHero, SeoAiFaq} from './seoAiShared';
import {offers, type SeoAiCase} from './seoAiCases';
import './SeoAiPage.css';

// Plantilla común de las cuatro landings por caso (contrato v0.3 §2):
// héroe → #encaje → #demostracion → #alcance → #verificacion → #preguntas → #siguiente-paso.
export default function SeoAiCasePage({c}: {c: SeoAiCase}) {
  const root = useRef<HTMLDivElement>(null);
  useTechMotion(root);
  const offer = offers[c.intent];
  const whatsapp = whatsappUrl(c.whatsappMessage);
  const {demo} = c;
  return <div ref={root} className="seoai bg-white text-slate-800">
    <RouteSEO path={c.path} />
    <div className="seoai-progress" aria-hidden="true" />

    <SeoAiHero
      crumb={c.crumb} kicker={c.kicker} hook={c.hook} h1={c.h1} lead={c.lead} chip={offer.chip}
      primary={{href: whatsapp, label: c.ctaLabel, placement: 'hero_primary'}}
      secondary={{href: '#demostracion', label: c.demoLabel, placement: 'hero_demo'}}
      intent={c.intent} intentId={c.id} signal={c.signal}
    />

    <section id="encaje" className="py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 01 ] Encaje</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>¿Es para tu empresa?</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>{c.fit.intro}</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa>
            <h3 className="text-lg font-bold text-rauvia-navy mb-3">Sí encaja si…</h3>
            <ul className="space-y-3">{c.fit.yes.map((t, i) => <li key={t} className="seoai-check flex gap-2" data-sa style={idx(i)}><Check className="w-5 h-5 mt-0.5 shrink-0 text-rauvia-blue" aria-hidden="true" /><span className="text-slate-700">{t}</span></li>)}</ul>
          </div>
          <div className="seoai-card rounded-lg border border-slate-200 bg-slate-50 p-6" data-sa style={idx(1)}>
            <h3 className="text-lg font-bold text-rauvia-navy mb-3">{c.fit.noTitle}</h3>
            <ul className="space-y-3">{c.fit.no.map((t, i) => <li key={t} className="seoai-check flex gap-2" data-sa style={idx(i)}><X className="w-5 h-5 mt-0.5 shrink-0 text-slate-500" aria-hidden="true" /><span className="text-slate-700">{t}</span></li>)}</ul>
          </div>
        </div>
      </div>
    </section>

    <section id="demostracion" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900 mb-4" data-sa>Ejemplo ficticio, no es un cliente ni un resultado</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>{demo.title}</h2>
        <div className="seoai-statement mb-6 max-w-3xl" data-sa style={idx(2)}><strong>{c.story.title}.</strong> {c.story.text}</div>
        <p className="text-slate-700 mb-6 max-w-3xl" data-sa style={idx(3)}>{demo.intro}</p>
        {demo.states && <ul className="flex flex-wrap gap-2 mb-6" aria-label="Estados posibles de una afirmación" data-sa>{demo.states.map(s => <li key={s} className="seoai-tag seoai-tag-media">{s}</li>)}</ul>}
        <table className="seoai-table" data-sa>
          <caption className="sr-only">{demo.table.caption}</caption>
          <thead><tr>{demo.table.headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>{demo.table.rows.map(r => <tr key={r.join('|')}>{r.map((cell, k) => <td key={k} data-label={demo.table.headers[k]}>{cell}</td>)}</tr>)}</tbody>
        </table>
        {demo.before && demo.after && <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="seoai-ba" data-sa><p className="seoai-index mb-2">{demo.before[0]}</p><p className="text-slate-700">{demo.before[1]}</p></div>
          <div className="seoai-ba seoai-ba-after" data-sa style={idx(1)}><p className="seoai-index mb-2">{demo.after[0]}</p><p className="text-slate-800 font-medium">{demo.after[1]}</p></div>
        </div>}
        <p className="seoai-query text-sm md:text-base mt-8" data-sa><span className="sr-only">Pregunta de prueba: </span>«{demo.testQuestion}»</p>
        <p className="text-sm text-slate-600 mt-4" data-sa>{demo.note}</p>
      </div>
    </section>

    <section id="alcance" className="py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 02 ] Alcance</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Qué contratas</h2>
        <div className="mt-6 grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-start">
          <div data-sa>
            <h3 className="text-xl font-bold text-rauvia-navy mb-2">{offer.name}</h3>
            <p className="seoai-price">{offer.price}</p>
            <p className="seoai-price-note">{offer.terms}</p>
            <p className="text-slate-700 text-sm mb-4">{offer.notPromised} Si una URL nueva, un trabajo de estructura o un lote queda fuera del alcance base, se cotiza y se aprueba antes.</p>
            <Link to={offer.to} onClick={trackCta('hacia_servicio', c.intent, c.id)} className="font-semibold text-rauvia-blue underline">{offer.link}</Link>
          </div>
          <div data-sa style={idx(1)}>
            <p className="text-slate-700 mb-3">{c.deliverable.intro}</p>
            <ul className="space-y-3 mb-4">{c.deliverable.items.map((t, i) => <li key={t} className="seoai-check flex gap-2" data-sa style={idx(i)}><Check className="w-5 h-5 mt-0.5 shrink-0 text-rauvia-blue" aria-hidden="true" /><span className="text-slate-700">{t}</span></li>)}</ul>
            <p className="text-slate-700 text-sm">{c.deliverable.notIncluded} Si ya cuentas con un diagnóstico suficiente, no hace falta comprar una auditoría aparte.</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-6" data-sa>Ningún servicio garantiza posiciones, menciones, citas, tráfico, leads ni ventas. Una mención en un asistente no demuestra una visita ni una venta.</p>
      </div>
    </section>

    <section id="verificacion" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 03 ] Verificación</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Cómo se acepta el trabajo y cómo se mide</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="seoai-card rounded-lg bg-white border border-slate-200 p-6" data-sa><h3 className="text-lg font-bold text-rauvia-navy mb-2">Criterio de aceptación</h3><p className="text-slate-700">{c.verify.criterion}</p><p className="text-slate-700 text-sm mt-3">{c.verify.notJudged}</p></div>
          <div className="seoai-card rounded-lg bg-white border border-slate-200 p-6" data-sa style={idx(1)}><h3 className="text-lg font-bold text-rauvia-navy mb-2">Qué se mide</h3><p className="text-slate-700">Las consultas por URL en Search Console y, por separado, un panel de preguntas con fecha, superficie, respuesta, fuente y omisiones.</p><p className="text-slate-700 text-sm mt-3">No inferimos volumen por municipio ni que un cambio en una página causó una mención.</p></div>
        </div>
      </div>
    </section>

    <section id="preguntas" className="py-16 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-8" data-sa>Preguntas frecuentes</h2>
        <SeoAiFaq items={c.faqs} />
      </div>
    </section>

    <section id="siguiente-paso" className="seoai-final py-16 bg-rauvia-navy text-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker mb-2" data-sa>Siguiente paso</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold mb-4" data-sa style={idx(1)}>{c.ctaLabel}</h2>
        <p className="text-slate-200 mb-3" data-sa style={idx(2)}>Para que la primera respuesta sea útil, ten a la mano:</p>
        <ul className="list-disc pl-6 text-slate-200 mb-3 space-y-1" data-sa style={idx(3)}>{c.prepare.map(t => <li key={t}>{t}</li>)}</ul>
        <p className="text-slate-200 mb-3" data-sa style={idx(4)}>{c.dontSend} Escribirnos por WhatsApp no contrata el servicio: primero se acuerda el alcance.</p>
        <div className="mt-6" data-sa style={idx(5)}>
          <WhatsAppCTA href={whatsapp} onClick={trackCta('siguiente_paso', c.intent, c.id)} className="seoai-btn seoai-btn-pulse inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-rauvia-navy hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{c.ctaLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" /></WhatsAppCTA>
        </div>
        <p className="text-sm text-slate-300 mt-8" data-sa style={idx(6)}>Cómo tratamos tus datos: <Link className="underline font-semibold" to="/aviso-de-privacidad/">Aviso de privacidad</Link>.</p>
      </div>
    </section>
  </div>;
}
