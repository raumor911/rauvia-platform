import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Check} from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import WhatsAppCTA from '../components/WhatsAppCTA';
import {idx, trackCta, useIntentId, useTechMotion, whatsappUrl, SeoAiHero, SeoAiFaq, months} from './seoAiShared';
import './SeoAiPage.css';

// Contrato: RAUVIA_SEO_AI_Especificacion_tecnica_auditoria_e_implementacion_v0.1 §3, con precios y CTA de
// RAUVIA_SEO_AI_Precios_y_entregables_v0.2 (prevalece sobre «cotización»). Precios antes de IVA; sin cifras internas.
const whatsapp = whatsappUrl('Hola RAUVIA, quiero solicitar una propuesta de implementación de SEO para IA (GEO) para mi empresa.');

const changes = [
  ['Acceso', 'HTML, enlaces, metadatos o reglas de rastreo, según lo que muestre el diagnóstico.', 'Que la página responda, se lea sin JavaScript, tenga canonical y enlaces reales.'],
  ['Definición', 'La plantilla o ficha de empresa y de oferta: quién es, qué vende, para quién y con qué límites.', 'Que lo esencial esté en el HTML visible y coincida entre las páginas.'],
  ['Casos y cobertura', 'Aplicaciones, límites y zonas de servicio o entrega que la empresa pueda respaldar.', 'Que cada afirmación tenga una fuente autorizada por el cliente.'],
] as const;

const requirements = [
  'Quién es el dueño del sitio.',
  'La fuente autorizada de producto y de cobertura.',
  'Quién aprueba los cambios antes de publicarse.',
  'Un diagnóstico, propio o de terceros, que permita delimitar el trabajo.',
  'Accesos de escritura solo por un canal autorizado y con el alcance mínimo.',
] as const;

const faqs = [
  ['¿Necesito una auditoría previa?', 'No es obligatoria. Necesitas un diagnóstico, de RAUVIA o de terceros, que permita delimitar el trabajo. Si falta esa evidencia, te recomendamos empezar por la auditoría en lugar de prometer cambios a ciegas.'],
  ['¿Pueden trabajar sobre mi sitio actual?', 'Sí. Trabajamos sobre las URLs existentes o sobre una plantilla acotada que se acuerde en la propuesta. No incluye rediseño ni migración.'],
  ['¿Quién aprueba lo que se publica?', 'El responsable que tu empresa designe aprueba claims, cobertura y cambios en producción. Nada se publica sin esa aprobación.'],
  ['¿Se garantizan citas o ventas?', 'No. No garantizamos rankings, menciones, citas, tráfico, leads ni ventas. Entregamos cambios verificables y la evidencia de qué se pudo comprobar.'],
  ['¿Auditoría e implementación son lo mismo?', 'No. La auditoría diagnostica y no modifica el sitio. La implementación ejecuta cambios acordados durante seis meses. Puedes contratar la auditoría sola.'],
] as const;

export default function SeoAiImplementacionPage() {
  const intentId = useIntentId('implementacion');
  const root = useRef<HTMLDivElement>(null);
  useTechMotion(root);
  return <div ref={root} className="seoai bg-white text-slate-800">
    <RouteSEO path="/seo-ai/implementacion" />
    <div className="seoai-progress" aria-hidden="true" />

    <SeoAiHero
      crumb="Implementación de SEO para IA"
      kicker="SEO AI · Implementación"
      hook="Del hallazgo al cambio verificado, mes a mes."
      h1="Implementación de SEO para IA para empresas"
      lead="Convertimos los hallazgos en cambios verificables: desde corregir cómo se encuentra una página hasta dejar claro qué vendes, para qué casos sirve y dónde puedes entregarlo. Acordamos qué se va a tocar y con qué evidencia se valida antes de empezar."
      chip="$29,900 MXN + IVA al mes · durante 6 meses · $179,400 MXN + IVA en total"
      primary={{href: '#solicitar-implementacion', label: 'Solicitar propuesta de implementación', placement: 'hero_primary'}}
      secondary={{href: '#cambios', label: 'Ver qué podemos cambiar', placement: 'hero_secondary'}}
      intent="implementacion" intentId={intentId}
      signal={{nodes: [['HALLAZGO', 'html · enlaces'], ['CAMBIO', 'plantilla · ficha'], ['VERIFICACIÓN', 'antes · después']], panel: 'ANTES / DESPUÉS', foot: 'evidencia · QA'}}
    />

    <section id="cambios" className="py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 01 ] Cambios</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Tres tipos de intervención</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>Se cotizan cambios ejecutables sobre activos acordados, no un informe ni una garantía de visibilidad. En cada bloque decimos qué se modifica y qué se comprueba.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {changes.map(([name, modifies, checks], i) => <article key={name} className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa style={idx(i)}>
            <p className="seoai-index mb-2">[ 0{i + 1} ] Intervención {i + 1}</p>
            <h3 className="text-xl font-bold text-rauvia-navy mb-3">{name}</h3>
            <p className="text-slate-700 mb-3"><strong>Qué se modifica. </strong>{modifies}</p>
            <p className="text-slate-700 text-sm"><strong>Qué se comprueba. </strong>{checks}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="ejemplo" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900 mb-4" data-sa>Ejemplo ficticio, no es un cliente ni un resultado</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>De una ficha vaga a una ficha que responde</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>Es el mismo ejemplo de la auditoría, ahora mostrando el cambio. Sin logos ni datos reales.</p>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          <article className="seoai-ba seoai-ba-before" data-sa>
            <p className="seoai-index mb-3">[ Antes ]</p>
            <h3 className="font-bold text-slate-700 text-lg">Gabinete exterior</h3>
            <p className="text-slate-600 text-sm mt-2">Solicite información.</p>
          </article>
          <div className="seoai-ba-arrow" aria-hidden="true" data-sa style={idx(1)}><ArrowRight className="w-6 h-6" /></div>
          <article className="seoai-ba seoai-ba-after" data-sa style={idx(2)}>
            <p className="seoai-index mb-3">[ Después ]</p>
            <h3 className="font-bold text-rauvia-navy text-lg">Gabinete exterior</h3>
            <dl className="mt-3 space-y-2 text-sm text-slate-700">
              <div><dt className="font-bold text-rauvia-navy">Aplicación</dt><dd>Instalaciones exteriores.</dd></div>
              <div><dt className="font-bold text-rauvia-navy">Condiciones a confirmar</dt><dd>Requisitos del lugar de instalación, antes de cotizar.</dd></div>
              <div><dt className="font-bold text-rauvia-navy">Entrega declarada</dt><dd>Querétaro, solo si el proveedor lo confirma.</dd></div>
            </dl>
            <p className="seoai-fake-cta mt-4">Solicitar cotización</p>
          </article>
        </div>
      </div>
    </section>

    <section id="requisitos" className="py-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 02 ] Requisitos</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Qué necesitamos para empezar</h2>
        <p className="text-slate-700 mb-6 max-w-3xl" data-sa style={idx(2)}>Antes de tocar nada, se identifica quién decide y de dónde salen los datos.</p>
        <ul className="grid md:grid-cols-2 gap-3 mb-6">
          {requirements.map((t, i) => <li key={t} className="seoai-check flex gap-2 rounded-lg border border-slate-200 bg-white p-4" data-sa style={idx(i)}><Check className="w-5 h-5 mt-0.5 shrink-0 text-rauvia-blue" aria-hidden="true" /><span className="text-slate-700">{t}</span></li>)}
        </ul>
        <p className="seoai-statement" data-sa>¿Todavía no sabes qué cambiar? <Link to="/seo-ai/auditoria/" onClick={trackCta('hacia_auditoria', 'implementacion')} className="underline text-rauvia-blue">Empieza por la auditoría GEO</Link>: así se delimita el trabajo con evidencia.</p>
      </div>
    </section>

    <section id="entrega" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 03 ] Entrega</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Qué recibes y cuánto cuesta</h2>
        <div className="grid lg:grid-cols-2 gap-8 mb-10 items-start">
          <div data-sa>
            <p className="seoai-price">$29,900 MXN + IVA al mes</p>
            <p className="seoai-price-note">Durante 6 meses · $179,400 MXN + IVA en total. Cada mes recibes cambios acordados, evidencia de verificación y un reporte de avance.</p>
            <p className="text-slate-700 text-sm mb-3"><strong>Alcance base propuesto.</strong> Un dominio y una línea comercial. Cada mes se acuerda un bloque de cambios: hasta 3 URLs existentes o una intervención acotada en una plantilla, no ambas. La propuesta detalla URLs o plantillas, cambios, dependencias, exclusiones y verificaciones.</p>
            <p className="text-slate-600 text-sm">Se cobra por trabajo entregado cada mes, no solo por monitoreo. El compromiso inicial es de seis meses, con facturación mensual y sin renovación automática en la propuesta.</p>
          </div>
          <ul className="space-y-2 text-slate-700 text-sm">
            {['El alcance del bloque acordado.', 'Registro del antes y el después, con evidencia de QA, o instrucciones verificables si despliega tu equipo.', 'Un reporte que separa rastreo e indexación, presencia o cita en asistentes y fidelidad de las respuestas.', 'Qué se pudo verificar, qué queda pendiente, recomendaciones de seguimiento y prioridades del mes siguiente.', 'Se precisa si RAUVIA implementa o entrega para tu equipo, y quién aprueba el despliegue.'].map((t, i) => <li key={t} className="seoai-check flex gap-2" data-sa style={idx(i)}><Check className="w-5 h-5 mt-0.5 shrink-0 text-rauvia-blue" aria-hidden="true" /><span>{t}</span></li>)}
          </ul>
        </div>
        <h3 className="seoai-h3 text-xl md:text-2xl font-bold text-rauvia-navy mb-2" data-sa>Qué se entrega durante los seis meses</h3>
        <p className="text-slate-700 mb-6 max-w-3xl" data-sa style={idx(1)}>El orden se puede ajustar por dependencia técnica sin ampliar el alcance contratado.</p>
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {months.map(([name, text], i) => <li key={name} className="seoai-card rounded-lg border border-slate-200 bg-white p-5" data-sa style={idx(i)}><p className="seoai-index mb-1">[ Mes {i + 1} ]</p><h4 className="font-bold text-rauvia-navy mb-1">{name}</h4><p className="text-slate-700 text-sm">{text}</p></li>)}
        </ol>
        <div className="mt-10 grid md:grid-cols-2 gap-6 text-sm text-slate-700" data-sa>
          <p><strong className="text-rauvia-navy">Cómo se contrata.</strong> Los precios son antes de IVA. La facturación mensual no equivale a un servicio cancelable mes a mes. Las condiciones de arranque, pausas, terminación y pago se confirman en la propuesta o contrato antes de contratar. Los resultados se miden después y no se confunden con las pruebas de entrega.</p>
          <p><strong className="text-rauvia-navy">Qué no incluye.</strong> Rediseño, migración, producción masiva, pauta, integraciones de shopping ni soporte fuera del alcance. No se publica nada sin autorización. No garantizamos rankings, menciones, citas, tráfico, leads ni ventas.</p>
        </div>
      </div>
    </section>

    <section id="preguntas" className="py-16 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-8" data-sa>Preguntas frecuentes</h2>
        <SeoAiFaq items={faqs} />
      </div>
    </section>

    <section id="solicitar-implementacion" className="seoai-final py-16 bg-rauvia-navy text-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker mb-2" data-sa>Primer paso</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold mb-4" data-sa style={idx(1)}>Solicitar propuesta de implementación</h2>
        <p className="seoai-chip mb-4!" data-sa style={idx(2)}>$29,900 MXN + IVA al mes · durante 6 meses · $179,400 MXN + IVA en total</p>
        <p className="text-slate-200 mb-3" data-sa style={idx(3)}>Cuéntanos tu sitio, el cambio o problema que quieres resolver y, si lo tienes, tu diagnóstico previo y una fecha objetivo. Revisaremos el alcance antes de presentar una propuesta.</p>
        <p className="text-slate-200 mb-3" data-sa style={idx(4)}>Escribirnos por WhatsApp no contrata el servicio. En este primer contacto no adjuntes archivos ni compartas accesos.</p>
        <div className="mt-6" data-sa style={idx(5)}>
          <WhatsAppCTA href={whatsapp} onClick={trackCta('solicitud', 'implementacion', intentId)} className="seoai-btn seoai-btn-pulse inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-rauvia-navy hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Solicitar por WhatsApp <ArrowRight className="w-4 h-4" aria-hidden="true" /></WhatsAppCTA>
        </div>
        <p className="text-sm text-slate-300 mt-6" data-sa style={idx(6)}>Cómo tratamos tus datos: <Link className="underline font-semibold" to="/aviso-de-privacidad/">Aviso de privacidad</Link>.</p>
      </div>
    </section>
  </div>;
}
