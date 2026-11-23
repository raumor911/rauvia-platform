import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Check} from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import WhatsAppCTA from '../components/WhatsAppCTA';
import {idx, trackCta, useTechMotion, whatsappUrl, SeoAiHero, SeoAiFaq, auditDeliverables} from './seoAiShared';
import './SeoAiPage.css';

// Contrato: RAUVIA_SEO_AI_Especificacion_tecnica_auditoria_e_implementacion_v0.1 §2, con precios de
// RAUVIA_SEO_AI_Precios_y_entregables_v0.2 (precios antes de IVA; sin cifras de control interno).
const whatsapp = whatsappUrl('Hola RAUVIA, quiero solicitar el alcance de una auditoría GEO para mi empresa.');

const scope = [
  ['Acceso', 'Qué puede consultar un buscador o asistente de tu sitio: respuesta HTTP, HTML, navegación, canonical y señales de rastreo, e indexación cuando haya evidencia.'],
  ['Oferta', 'Qué vende la empresa, para quién y con qué referencias. Revisamos si identidad, nicho, productos y servicios se entienden sin ambigüedad.'],
  ['Casos y cobertura', 'Para qué aplicación sirve cada producto o servicio, en qué condiciones y en qué zonas o envíos.'],
] as const;

// Muestra ficticia: sin métricas ni respuestas de un asistente real.
const sample = [
  {priority: 'Alta', target: '/productos/gabinete-exterior (URL ficticia)', finding: 'La ficha indica uso exterior, pero no confirma envío a Querétaro.', evidence: 'Texto de la ficha tal como se publica; no menciona zonas de entrega.', action: 'Confirmar cobertura con operación y publicar solo destinos autorizados.', verify: 'Releer la ficha publicada y repetir la pregunta de compra sobre entrega.'},
  {priority: 'Media', target: 'Pregunta: «¿Qué condiciones de instalación requiere?»', finding: 'Ninguna de las URLs acordadas responde las condiciones técnicas.', evidence: 'Revisión de las URLs acordadas: no existe una sección de condiciones.', action: 'Redactar las condiciones con datos que el cliente confirme.', verify: 'Comprobar que el texto está en el HTML inicial y coincide entre páginas.'},
  {priority: 'Baja', target: '/catalogo (URL ficticia)', finding: 'El enlace a la ficha solo existe dentro de un script.', evidence: 'Inspección del HTML sin JavaScript: el enlace no aparece.', action: 'Agregar un enlace HTML real a la ficha.', verify: 'Rastrear la URL sin JavaScript y comprobar que el enlace existe.'},
] as const;

const checks = [
  ['Accesibilidad', 'Si la página responde y se puede leer sin depender de scripts.'],
  ['Indexación', 'Si el buscador la tiene registrada. Requiere permisos para confirmarse.'],
  ['Mención', 'Si una respuesta nombra a la empresa en las preguntas acordadas.'],
  ['Cita', 'Si una respuesta enlaza o cita una página de la empresa.'],
  ['Fidelidad', 'Si lo que se dice coincide con lo que la empresa ofrece, aplica y cubre.'],
] as const;

const faqs = [
  ['¿Necesitan acceso para revisar mi sitio?', 'Empezamos por lo que es público. Si hace falta acceso adicional, se acuerda aparte y preferimos que sea de solo lectura. No pedimos contraseñas en la solicitud.'],
  ['¿Corrigen el sitio durante la auditoría?', 'No. La auditoría no modifica tu sitio. Entrega evidencia, hallazgos y un plan de corrección que puedes ejecutar tú o pedirnos como implementación.'],
  ['¿Cuánto cuesta?', 'El alcance base cuesta $9,900 MXN + IVA, en pago único: una línea comercial, hasta 3 URLs y 6 preguntas de compra en 2 superficies de IA. Si necesitas más URLs, preguntas, mercados o superficies, se acuerda un alcance distinto antes de contratar.'],
  ['¿Auditoría e implementación son lo mismo?', 'No. La auditoría diagnostica y no modifica el sitio. La implementación ejecuta cambios acordados durante seis meses. Puedes comprar la auditoría sola.'],
] as const;

export default function SeoAiAuditoriaPage() {
  const root = useRef<HTMLDivElement>(null);
  useTechMotion(root);
  return <div ref={root} className="seoai bg-white text-slate-800">
    <RouteSEO path="/seo-ai/auditoria" />
    <div className="seoai-progress" aria-hidden="true" />

    <SeoAiHero
      crumb="Auditoría GEO"
      kicker="SEO AI · Auditoría"
      hook="Antes de corregir, mira qué se puede consultar y qué se dice de tu empresa."
      h1="Auditoría GEO para empresas"
      lead="Revisamos qué información de tu sitio puede consultarse, cómo se presenta tu oferta y qué falta para responder a las preguntas de tus compradores. Recibes hallazgos con evidencia y un orden de corrección. La auditoría no modifica tu sitio."
      chip="$9,900 MXN + IVA · pago único"
      primary={{href: '#solicitar-auditoria', label: 'Solicitar alcance de auditoría', placement: 'hero_primary'}}
      secondary={{href: '#entregable', label: 'Ver una muestra', placement: 'hero_secondary'}}
      intent="auditoria"
      signal={{panel: 'INFORME · DEMO', foot: 'hallazgos · plan'}}
    />

    <section id="alcance" className="py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 01 ] Alcance</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Tres revisiones, un diagnóstico</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>Contratas un diagnóstico, no posiciones, citas ni cambios web. El alcance acordado enumera las URLs, las preguntas y las superficies; lo que no se inspecciona se rotula como desconocido.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {scope.map(([name, text], i) => <article key={name} className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa style={idx(i)}>
            <p className="seoai-index mb-2">[ 0{i + 1} ] Revisión {i + 1}</p>
            <h3 className="text-xl font-bold text-rauvia-navy mb-3">{name}</h3>
            <p className="text-slate-700">{text}</p>
          </article>)}
        </div>
        <div className="mt-10 grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-start">
          <div data-sa>
            <h3 className="text-xl font-bold text-rauvia-navy mb-2">Alcance base</h3>
            <p className="seoai-price">$9,900 MXN + IVA</p>
            <p className="seoai-price-note">Pago único. Recibe un diagnóstico documentado y un plan de corrección, sin compromiso de implementación.</p>
            <p className="text-slate-700 text-sm">Un sitio, una línea comercial, hasta 3 URLs y 6 preguntas de compra en 2 superficies de IA. Comenzamos con evidencia pública; cualquier acceso adicional se acuerda por separado. No modificamos el sitio.</p>
          </div>
          <ul className="space-y-3">
            {auditDeliverables.map(([t, d], i) => <li key={t} className="seoai-check flex gap-2" data-sa style={idx(i)}><Check className="w-5 h-5 mt-0.5 shrink-0 text-rauvia-blue" aria-hidden="true" /><span><strong className="text-rauvia-navy">{t}.</strong> <span className="text-slate-700 text-sm">{d}</span></span></li>)}
          </ul>
        </div>
      </div>
    </section>

    <section id="entregable" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900 mb-4" data-sa>Ejemplo ficticio, no es un cliente ni un resultado</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Así se ve un hallazgo</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>El entregable ordena cada hallazgo por prioridad, con su evidencia, la acción recomendada y cómo comprobar que quedó resuelto. Es una muestra de formato: no incluye métricas ni respuestas de un asistente real.</p>
        <table className="seoai-table" data-sa>
          <caption className="sr-only">Muestra ficticia de hallazgos de una auditoría GEO</caption>
          <thead><tr><th scope="col">Prioridad</th><th scope="col">URL o pregunta</th><th scope="col">Hallazgo</th><th scope="col">Evidencia</th><th scope="col">Acción recomendada</th><th scope="col">Cómo verificar</th></tr></thead>
          <tbody>
            {sample.map(r => <tr key={r.target}>
              <td data-label="Prioridad"><span className={`seoai-tag seoai-tag-${r.priority.toLowerCase()}`}>{r.priority}</span></td>
              <td data-label="URL o pregunta">{r.target}</td>
              <td data-label="Hallazgo">{r.finding}</td>
              <td data-label="Evidencia">{r.evidence}</td>
              <td data-label="Acción recomendada">{r.action}</td>
              <td data-label="Cómo verificar">{r.verify}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </section>

    <section id="verificacion" className="py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 02 ] Verificación</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Cinco cosas que no se deben confundir</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>Que una página sea accesible no significa que esté indexada, ni que una respuesta la mencione, la cite o la describa bien. Cada una se registra por separado.</p>
        <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {checks.map(([name, text], i) => <li key={name} className="seoai-card rounded-lg bg-white border border-slate-200 p-5" data-sa style={idx(i)}><h3 className="font-bold text-rauvia-navy mb-1"><span className="seoai-index mr-2">0{i + 1}</span>{name}</h3><p className="text-slate-700 text-sm">{text}</p></li>)}
        </ol>
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6" data-sa>
          <h3 className="text-lg font-bold text-rauvia-navy mb-2">Panel de preguntas</h3>
          <p className="text-slate-700 text-sm mb-3">Cada pregunta acordada queda registrada con la misma estructura: <strong>pregunta fija</strong>, <strong>fecha</strong>, <strong>superficie</strong>, <strong>consulta</strong>, <strong>vínculo citado</strong> y <strong>discrepancias</strong> con lo que la empresa ofrece.</p>
          <p className="text-slate-700 text-sm">Un resultado ausente se anota como «no observado bajo esas condiciones». No significa que sea imposible aparecer.</p>
        </div>
      </div>
    </section>

    <section id="preguntas" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-8" data-sa>Preguntas frecuentes</h2>
        <SeoAiFaq items={faqs} />
      </div>
    </section>

    <section id="solicitar-auditoria" className="seoai-final py-16 bg-rauvia-navy text-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker mb-2" data-sa>Primer paso</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold mb-4" data-sa style={idx(1)}>Solicitar alcance de auditoría</h2>
        <p className="text-slate-200 mb-3" data-sa style={idx(2)}>Cuéntanos tu sitio o catálogo y la pregunta o el problema que quieres resolver. Revisamos la información y te respondemos con una propuesta de alcance.</p>
        <p className="text-slate-200 mb-3" data-sa style={idx(3)}>Escribirnos por WhatsApp no contrata la auditoría: primero se acuerda el alcance. No necesitamos contraseñas ni accesos para empezar.</p>
        <div className="mt-6" data-sa style={idx(4)}>
          <WhatsAppCTA href={whatsapp} onClick={trackCta('solicitud', 'auditoria')} className="seoai-btn seoai-btn-pulse inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-rauvia-navy hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Solicitar por WhatsApp <ArrowRight className="w-4 h-4" aria-hidden="true" /></WhatsAppCTA>
        </div>
        <p className="text-slate-200 mt-8" data-sa style={idx(5)}>¿Ya tienes claros los cambios? <Link to="/seo-ai/implementacion/" onClick={trackCta('hacia_implementacion', 'auditoria')} className="underline font-semibold">Solicita alcance de implementación</Link>.</p>
        <p className="text-sm text-slate-300 mt-4" data-sa style={idx(6)}>Cómo tratamos tus datos: <Link className="underline font-semibold" to="/aviso-de-privacidad/">Aviso de privacidad</Link>.</p>
      </div>
    </section>
  </div>;
}
