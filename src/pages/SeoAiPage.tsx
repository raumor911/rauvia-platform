import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Check} from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import WhatsAppCTA from '../components/WhatsAppCTA';
import {idx, trackCta, useTechMotion, whatsappUrl, auditDeliverables, months} from './seoAiShared';
import './SeoAiPage.css';

// Contrato: RAUVIA_SEO_AI_Especificacion_tecnica_landing_v0.1 (bóveda AETHRYON), evolucionado por
// RAUVIA_Dos_Paginas_SEO_GEO_AEO_2027_Especificacion v1.0 (borrador para revisión).
// Todo el contenido vive en el HTML inicial (prerender); sin JS cada sección y cada respuesta es legible.
const whatsapp = whatsappUrl('Hola RAUVIA, quiero solicitar el alcance de una auditoría de SEO para IA (GEO) para mi empresa.');

const method = [
  ['Acceso', 'Revisamos qué puede consultar un buscador o asistente de tu sitio: HTML disponible, enlaces y rastreo.', 'Puede corregirse: bloqueos de rastreo, contenido que solo aparece con scripts, enlaces rotos o inexistentes.'],
  ['Empresa y oferta', 'Revisamos si identidad, nicho, productos y servicios están definidos sin ambigüedad.', 'Puede corregirse: nombres inconsistentes, descripciones vagas, productos sin una página que los explique.'],
  ['Casos de uso y cobertura', 'Revisamos para qué necesidad sirve cada producto, en qué condiciones y en qué zona de atención o entrega.', 'Puede corregirse: aplicaciones, condiciones técnicas y cobertura que hoy no están escritas o no coinciden entre páginas.'],
  ['Comprobación de representación', 'Registramos preguntas, superficie, fecha, respuesta, mención o cita si existe, y discrepancias con tu información autorizada.', 'Puede repetirse: las preguntas acordadas se repiten cuando corresponda. Una respuesta puede cambiar y una prueba solo muestra lo observado en esas condiciones.'],
] as const;

// Ejemplos ficticios: no son clientes ni resultados; no afirman inventario, capacidad ni citas reales.
const ficha = [
  ['Pregunta de compra', '¿Qué proveedor ofrece gabinetes para instalaciones exteriores y entrega en Querétaro?'],
  ['Información publicada', 'Ficha de producto con aplicación exterior; sin cobertura ni instalación aclaradas.'],
  ['Condición por confirmar', 'Zonas de entrega y qué incluye la instalación, según lo que Operación confirme.'],
  ['Siguiente paso', 'Publicar condiciones aprobadas y repetir la pregunta, con fecha y superficie registradas.'],
] as const;

const muestra = [
  ['Pregunta de compra', '¿Hay entrega en Querétaro y está incluida la instalación?'],
  ['Página revisada', 'Ficha de un producto exterior; URL ficticia no enlazable.'],
  ['Hecho revisable', 'La ficha hipotética no aclara cobertura ni instalación.'],
  ['Qué confirmar', 'Operación determina zonas, restricciones y qué se contrata.'],
  ['Trabajo entregable', 'Bloque HTML con condiciones aprobadas, enlace y registro de cambio.'],
  ['Validación', 'Comprobar el texto publicado y repetir la pregunta con fecha y superficie.'],
  ['Resultado no garantizado', 'Que el asistente modifique su respuesta o cite la ficha.'],
] as const;
const examples = [
  {niche: 'Industria · producto', question: '¿Qué proveedor ofrece gabinetes para instalaciones exteriores y entrega en Querétaro?', parts: [
    ['Producto', 'Qué gabinete se ofrece y cómo se llama en cada página.'],
    ['Uso', 'Para qué instalaciones exteriores sirve.'],
    ['Condición técnica a confirmar', 'Qué requisitos del lugar deben validarse con el proveedor. No se asumen.'],
    ['Cobertura', 'Si hay entrega en Querétaro y bajo qué condiciones.'],
  ]},
  {niche: 'Servicios · mantenimiento', question: '¿Quién da mantenimiento a equipos de refrigeración comercial para restaurantes en Guadalajara?', parts: [
    ['Servicio', 'Qué tipo de mantenimiento se ofrece y cómo se nombra en el sitio.'],
    ['Uso', 'Para qué equipos y qué tipo de negocio aplica.'],
    ['Condición a confirmar', 'Tiempos de respuesta, horarios y refacciones. No se asumen.'],
    ['Cobertura', 'Si se atiende Guadalajara y sus zonas, y bajo qué condiciones.'],
  ]},
  {niche: 'Tecnología · software B2B', question: '¿Qué software de inventarios se integra con facturación electrónica y se implementa en pymes de México?', parts: [
    ['Producto', 'Qué solución es, cómo se llama y qué módulos incluye.'],
    ['Uso', 'Para qué tipo de operación y tamaño de empresa sirve.'],
    ['Condición técnica a confirmar', 'Qué integraciones existen y qué requiere cada una. No se asumen.'],
    ['Cobertura', 'Si se implementa en México, en qué zonas y con qué soporte.'],
  ]},
] as const;

// Oferta y precios: RAUVIA_SEO_AI_Precios_y_entregables_v0.2 (decisión de mesa; pendiente de publicación).
// Precios antes de IVA. Mensualidad siempre con duración y total. Sin cifras de control interno.
const whatsappImpl = whatsappUrl('Hola RAUVIA, quiero solicitar una propuesta de implementación de SEO para IA (GEO) para mi empresa.');

const measure = [
  ['Acceso y rastreo', 'Si las páginas acordadas responden y pueden rastrearse. Responder, poder rastrearse y estar indexada son estados distintos.'],
  ['Indexación', 'Se reporta un estado solo cuando hay evidencia suficiente y permisos; de otro modo, «no verificado».'],
  ['Impresiones y clics', 'Cuánto aparece y cuánto se visita el sitio en buscadores, según los datos a los que se tenga acceso autorizado.'],
  ['Mención y cita en asistentes', 'Si un asistente nombra a la empresa o enlaza una de sus páginas, con pregunta, fecha y superficie anotadas.'],
  ['Fidelidad comercial', 'Si lo que se dice sobre productos, usos, condiciones y cobertura coincide con la información autorizada.'],
  ['Solicitudes y avance comercial', 'Cuántas conversaciones comerciales llegan y cómo evolucionan. Se registran aparte y no se atribuyen a la IA sin evidencia.'],
] as const;

const faqs = [
  ['¿Cuál es la diferencia entre SEO, GEO y AEO?', 'SEO trabaja la visibilidad en buscadores; GEO se refiere a la optimización para experiencias generativas y AEO para motores de respuesta. Se solapan: son lenguaje de mercado, no tres productos separados. En RAUVIA se trabajan juntos sobre la misma información pública de tu empresa, sin prometer cómo la utilizará cada sistema.'],
  ['¿Pueden garantizar que aparezca en ChatGPT?', 'No. Nadie controla qué fuentes elige un asistente ni cuándo las cita. Trabajamos para que tu información sea accesible, clara y verificable, y comprobamos qué dice cada asistente con preguntas acordadas.'],
  ['¿Se puede trabajar sobre mi sitio actual?', 'Sí. La auditoría parte del sitio o catálogo que ya tienes. Si hace falta cambiar el sitio, se propone por separado y solo se ejecuta si lo autorizas.'],
  ['¿Qué revisan sobre cobertura y envíos?', 'Revisamos si la zona de atención o entrega, y las condiciones que aplican, están escritas de forma consistente en tu sitio. No afirmamos inventario ni capacidad que no nos confirmes.'],
  ['¿Puedo contratar la implementación sin la auditoría de RAUVIA?', 'Sí, si existe un diagnóstico suficiente, propio o de terceros, para delimitar el trabajo. Si no lo hay, la auditoría es el punto de partida.'],
  ['¿La auditoría incluye implementación?', 'No. La auditoría entrega evidencia, hallazgos y un plan de corrección, y no modifica el sitio. Ejecutar ese plan es la implementación, un programa aparte de seis meses. Puedes comprar la auditoría sola y decidir después.'],
] as const;

export default function SeoAiPage() {
  const root = useRef<HTMLDivElement>(null);
  useTechMotion(root);
  return <div ref={root} className="seoai bg-white text-slate-800">
    <RouteSEO path="/seo-ai" />
    <div className="seoai-progress" aria-hidden="true" />

    <section className="seoai-hero pt-16 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
        <div>
          <p className="seoai-kicker mb-4 sa-rise" style={idx(0)}>SEO AI · RAUVIA Consulting · Edición 2027</p>
          <p className="seoai-hook sa-rise" style={idx(1)}>Las personas pueden buscar respuestas en Google y también conversar con un asistente. ¿Qué podría encontrar un comprador sobre tu empresa?</p>
          <h1 className="seoai-h1 text-3xl md:text-5xl font-extrabold leading-tight mb-6 sa-rise" style={idx(2)}>Prepara tu empresa para las búsquedas con IA en 2027</h1>
          <p className="seoai-lead text-lg md:text-xl max-w-2xl mb-4 sa-rise" style={idx(3)}>Preparamos y verificamos la información pública de tu empresa para que buscadores y asistentes puedan encontrar qué vendes, para qué sirve y dónde lo entregas.</p>
          <p className="seoai-aux max-w-2xl mb-8 sa-rise" style={idx(4)}>Primero revisamos el acceso y la oferta; después comprobamos respuestas con preguntas de compra acordadas.</p>
          <div className="flex flex-wrap gap-4 sa-rise" style={idx(5)}>
            <Link to="/seo-ai/auditoria/" onClick={trackCta('hero_primary', 'auditoria')} className="seoai-btn seoai-btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors">Conocer la auditoría <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
            <a href="#medicion" onClick={trackCta('hero_secondary', 'general')} className="seoai-btn seoai-btn-ghost inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors">Ver cómo comprobamos</a>
          </div>
          <p className="seoai-aux mt-4 text-sm sa-rise" style={idx(5)}>Auditoría $9,900 MXN + IVA, pago único. Enviar una solicitud no contrata el servicio.</p>
        </div>
        <figure className="seoai-ficha sa-rise" style={idx(5)} aria-labelledby="ficha-title">
          <p id="ficha-title" className="seoai-ficha-head">Ficha de trabajo · demostración ficticia</p>
          <dl>
            {ficha.map(([term, text], k) => <div key={term} className="seoai-ficha-row" style={idx(k)}><dt>{term}</dt><dd>{text}</dd></div>)}
          </dl>
          <figcaption>Demostración ficticia; no es una respuesta de un asistente ni un resultado de cliente.</figcaption>
        </figure>
      </div>
    </section>

    <section id="que-es" className="py-14 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 00 ] Contexto</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-4" data-sa style={idx(1)}>Una nueva pregunta para tu presencia digital</h2>
        <p className="seoai-statement mb-4" data-sa style={idx(2)}>Cuando una persona busca un proveedor, ya puede encontrarse con una lista de enlaces o con una respuesta generada a partir de varias fuentes. En ambos casos importa una pregunta: ¿puede encontrar información suficiente y correcta para decidir si tu empresa es una opción?</p>
        <p className="text-lg text-slate-700 mb-4" data-sa style={idx(3)}>No necesitas asumir que todos tus compradores ya usan asistentes. Puedes empezar por una sola oferta y comprobar qué información de ella está disponible hoy. Así preparas un activo útil para tu equipo comercial y para quienes investigan antes de contactarte.</p>
        <p className="text-slate-600 text-sm mb-4" data-sa style={idx(4)}>Como referencia, en una encuesta de febrero de 2026, el 42 % de los adultos de Estados Unidos dijo usar alguna vez chatbots de IA para buscar información (<a className="underline text-rauvia-blue" href="https://www.pewresearch.org/chart/search-and-work-are-the-most-common-uses-for-chatbots-1-in-10-use-these-tools-for-emotional-support/" target="_blank" rel="noopener noreferrer">Pew Research Center</a>). No es una cifra de México, ni de compras, ni una proyección para 2027.</p>
        <p className="text-lg text-slate-700" data-sa style={idx(5)}>Si un comprador pregunta qué vendes, dónde lo entregas y qué condiciones debe confirmar, ¿encuentra esas respuestas en tu sitio?</p>
        <p className="mt-4 text-sm" data-sa style={idx(6)}>¿Prefieres aprender primero? <Link to="/recursos/seo-para-ia/" onClick={trackCta('contexto_guia', 'general')} className="seoai-link font-semibold text-rauvia-blue underline">Lee la guía práctica de SEO, GEO y AEO para empresas</Link>.</p>
      </div>
    </section>

    <section id="muestra" className="py-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>¿Tu sitio responde lo que Compras necesita saber?</h2>
        <p className="text-slate-700 mb-6 max-w-3xl" data-sa style={idx(1)}>Una empresa puede tener un catálogo completo y dejar sin respuesta una aplicación, una condición o una zona de entrega. Importa si lo que se dice es correcto y comprobable. Esto es lo que se entrega y cómo se verifica.</p>
        <p className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900 mb-4" data-sa>Demostración ficticia: no es un cliente, una respuesta de IA ni un resultado medido</p>
        <table className="seoai-table" data-sa>
          <thead><tr><th scope="col">Campo</th><th scope="col">Demostración ficticia</th></tr></thead>
          <tbody>{muestra.map(([k, v]) => <tr key={k}><td data-label="Campo"><strong className="text-rauvia-navy">{k}</strong></td><td data-label="Demostración ficticia">{v}</td></tr>)}</tbody>
        </table>
        <p className="mt-4 text-sm" data-sa><Link to="/seo-ai/auditoria/" onClick={trackCta('muestra_auditoria', 'auditoria')} className="seoai-link font-semibold text-rauvia-blue underline">Ver una muestra de la auditoría</Link>. El resultado verificable es el contenido aprobado y su registro; la respuesta de un tercero es una observación separada.</p>
      </div>
    </section>

    <section id="metodo" className="py-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Cómo trabaja RAUVIA</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(1)}>Cuatro pasos, una sola pregunta: ¿pueden entenderte? Responder, poder rastrearse y estar indexada son estados diferentes; en cada etapa mostramos qué se revisa y qué puede corregirse.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {method.map(([name, review, fix], i) => <article key={name} className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa style={idx(i)}>
            <p className="seoai-index mb-2">[ 0{i + 1} ] Etapa {i + 1}</p>
            <h3 className="text-xl font-bold text-rauvia-navy mb-3">{name}</h3>
            <p className="text-slate-700 mb-3"><strong>Qué se revisa. </strong>{review}</p>
            <p className="text-slate-600 text-sm">{fix}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="ejemplo" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-4" data-sa>Tres preguntas reales de compra, separadas en partes</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(1)}>Una respuesta útil necesita cuatro piezas. Cada una debe poder encontrarse en la información pública del proveedor, siguiendo las etapas de <a className="font-semibold text-rauvia-blue underline" href="#metodo">Cómo trabaja RAUVIA</a>. Son tres nichos distintos con el mismo método.</p>
        <div className="grid lg:grid-cols-3 gap-6">
          {examples.map((ex, n) => <article key={ex.niche} className="seoai-card seoai-example rounded-lg border border-slate-200 bg-white p-5" data-sa style={idx(n)}>
            <p className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900 mb-3">Ejemplo ficticio, no es un cliente ni un resultado</p>
            <p className="seoai-index mb-3">[ 0{n + 1} ] {ex.niche}</p>
            <p className="seoai-query text-sm md:text-base mb-4"><span className="sr-only">Pregunta: </span>«{ex.question}»</p>
            <dl className="space-y-3">
              {ex.parts.map(([term, text], k) => <div key={term} className="seoai-part rounded-lg border border-slate-200 bg-slate-50 p-3" style={idx(k)}><dt className="font-bold text-rauvia-navy text-sm">{term}</dt><dd className="text-slate-700 text-sm mt-1">{text}</dd></div>)}
            </dl>
          </article>)}
        </div>
        <p className="text-sm text-slate-600 mt-6" data-sa>Son ejemplos para explicar el método. No citan una fuente externa ni afirman inventario o capacidad reales.</p>
      </div>
    </section>

    <section id="no-aparece" className="py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 03 ] Diagnóstico</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Mi empresa no aparece en ChatGPT</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>Esa frase puede describir tres problemas distintos. Separarlos evita corregir lo que no era. No prometemos aparecer ni controlar lo que genera un modelo; sí podemos revisar la evidencia pública y comprobar qué cambia al repetir las preguntas.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['Ausencia', 'La pregunta correcta no devuelve tu empresa. Se revisa si tu oferta, tu cobertura y tus páginas pueden consultarse y entenderse. Empieza con una auditoría.'],
            ['Afirmación incorrecta', 'Un asistente atribuye servicios, condiciones o zonas que no son los tuyos. Se rastrea qué fuente puede respaldarlo y qué verdad debes publicar.'],
            ['Falta de evidencia para comprar', 'Tu empresa aparece, pero Compras no encuentra aplicación, requisitos o datos para cotizar. Se trabaja la ficha que debe responder esa pregunta.'],
          ].map(([name, text], i) => <article key={name} className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa style={idx(i)}>
            <p className="seoai-index mb-2">[ 0{i + 1} ] Tipo {i + 1}</p>
            <h3 className="text-xl font-bold text-rauvia-navy mb-3">{name}</h3>
            <p className="text-slate-700">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="soluciones-por-caso" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker text-rauvia-blue! mb-2" data-sa>[ 04 ] Soluciones por caso</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa style={idx(1)}>Elige la situación que se parece a la tuya</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(2)}>Cada ruta explica un caso concreto, con su ejemplo ficticio y el servicio que le corresponde, la auditoría o la implementación.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {([
            ['/seo-ai/corregir-informacion-en-ia/', 'Corregir información de mi empresa en asistentes de IA', 'Una IA describe mal qué vendes o a quién atiendes. Se audita la afirmación, la fuente y la corrección.', 'Auditoría'],
            ['/seo-ai/catalogos-para-ia/', 'SEO para catálogos de productos en buscadores y asistentes de IA', 'El catálogo existe, pero el comprador no entiende para qué sirve ni cómo cotizarlo.', 'Implementación'],
            ['/seo-ai/cobertura-y-envios/', 'Aclarar dónde vendo, envío e instalo', 'El comprador necesita saber si llegas a su zona, y con qué modalidad, antes de cotizar.', 'Implementación'],
            ['/seo-ai/proveedores-tecnicos/', 'SEO para IA para proveedores técnicos', 'Compras necesita evaluar tu línea para una aplicación y pedir una cotización con datos claros.', 'Implementación'],
          ] as const).map(([to, label, text, service], i) => <article key={to} className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa style={idx(i)}>
            <p className="seoai-index mb-2">[ 0{i + 1} ] {service}</p>
            <h3 className="text-lg font-bold text-rauvia-navy mb-2"><Link to={to} onClick={trackCta('soluciones_por_caso', service === 'Auditoría' ? 'auditoria' : 'implementacion')} className="hover:underline">{label}</Link></h3>
            <p className="text-slate-700 text-sm">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="alcance" className="py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Auditoría e implementación</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(1)}>Primero se audita. Después, si quieres ejecutar el plan, hay un programa de seis meses. La auditoría se puede comprar sola.</p>
        <div className="grid lg:grid-cols-2 gap-6">
          <article className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa>
            <p className="seoai-index mb-2">[ A ] Auditoría GEO</p>
            <h3 className="text-xl font-bold text-rauvia-navy mb-1">Auditoría GEO para empresas</h3>
            <p className="seoai-price">$9,900 MXN + IVA</p>
            <p className="seoai-price-note">Pago único. Recibe un diagnóstico documentado y un plan de corrección, sin compromiso de implementación.</p>
            <p className="text-slate-700 text-sm mb-4"><strong>Alcance base.</strong> Una línea comercial, hasta 3 URLs y 6 preguntas de compra en 2 superficies de IA. Comenzamos con evidencia pública; cualquier acceso adicional se acuerda por separado. No modificamos el sitio.</p>
            <ul className="space-y-3 mb-6">
              {auditDeliverables.map(([t, d], i) => <li key={t} className="seoai-check flex gap-2" style={idx(i)}><Check className="w-5 h-5 mt-0.5 shrink-0 text-rauvia-blue" aria-hidden="true" /><span><strong className="text-rauvia-navy">{t}.</strong> <span className="text-slate-700 text-sm">{d}</span></span></li>)}
            </ul>
            <a href="#solicitar-auditoria" onClick={trackCta('alcance_auditoria', 'auditoria')} className="seoai-btn inline-flex items-center gap-2 rounded-lg bg-rauvia-navy px-5 py-3 font-semibold text-white hover:bg-rauvia-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rauvia-blue">Solicitar alcance de auditoría <ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
            <p className="mt-4 text-sm"><Link to="/seo-ai/auditoria/" className="seoai-link font-semibold text-rauvia-blue underline">Ver el detalle de la auditoría GEO: alcance, muestra y verificación</Link></p>
          </article>
          <article className="seoai-card rounded-lg border border-slate-200 bg-white p-6" data-sa style={idx(1)}>
            <p className="seoai-index mb-2">[ B ] Implementación</p>
            <h3 className="text-xl font-bold text-rauvia-navy mb-1">Implementación de SEO para IA</h3>
            <p className="seoai-price">$29,900 MXN + IVA al mes</p>
            <p className="seoai-price-note">Durante 6 meses · $179,400 MXN + IVA en total. Cada mes recibes cambios acordados, evidencia de verificación y un reporte de avance.</p>
            <p className="text-slate-700 text-sm mb-3"><strong>Alcance base propuesto.</strong> Un dominio y una línea comercial. Cada mes se acuerda un bloque de cambios: hasta 3 URLs existentes o una intervención acotada en una plantilla, no ambas. Se necesita un diagnóstico que permita delimitar el trabajo; puede ser de RAUVIA o de terceros.</p>
            <ul className="space-y-2 mb-4 text-slate-700 text-sm">
              {['El alcance del bloque acordado.', 'Evidencia del antes y el después, o instrucciones verificables si despliega tu equipo.', 'Un reporte que separa rastreo e indexación, presencia o cita en asistentes y fidelidad de las respuestas.', 'Qué se pudo verificar, qué queda pendiente y prioridades del mes siguiente.'].map((t, i) => <li key={t} className="seoai-check flex gap-2" style={idx(i)}><Check className="w-5 h-5 mt-0.5 shrink-0 text-rauvia-blue" aria-hidden="true" /><span>{t}</span></li>)}
            </ul>
            <p className="text-slate-600 text-sm mb-6">Se cobra por trabajo entregado cada mes, no solo por monitoreo. El compromiso inicial es de seis meses, con facturación mensual y sin renovación automática en la propuesta.</p>
            <a href="#solicitar-auditoria" onClick={trackCta('alcance_implementacion', 'implementacion')} className="seoai-btn inline-flex items-center gap-2 rounded-lg bg-rauvia-navy px-5 py-3 font-semibold text-white hover:bg-rauvia-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rauvia-blue">Solicitar propuesta de implementación <ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
            <p className="mt-4 text-sm"><Link to="/seo-ai/implementacion/" className="seoai-link font-semibold text-rauvia-blue underline">Ver el detalle de la implementación: cambios, requisitos y entrega</Link></p>
          </article>
        </div>

        <h3 className="seoai-h3 text-xl md:text-2xl font-bold text-rauvia-navy mt-14 mb-2" data-sa>Qué se entrega durante los seis meses</h3>
        <p className="text-slate-700 mb-6 max-w-3xl" data-sa style={idx(1)}>El orden se puede ajustar por dependencia técnica sin ampliar el alcance contratado.</p>
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {months.map(([name, text], i) => <li key={name} className="seoai-card rounded-lg border border-slate-200 bg-white p-5" data-sa style={idx(i)}><p className="seoai-index mb-1">[ Mes {i + 1} ]</p><h4 className="font-bold text-rauvia-navy mb-1">{name}</h4><p className="text-slate-700 text-sm">{text}</p></li>)}
        </ol>

        <div className="mt-10 grid md:grid-cols-2 gap-6 text-sm text-slate-700" data-sa>
          <p><strong className="text-rauvia-navy">Cómo se contrata.</strong> Los precios son antes de IVA. La facturación mensual no equivale a un servicio cancelable mes a mes. Las condiciones de arranque, pausas, terminación y pago se confirman en la propuesta o contrato antes de contratar. Si ya tienes un diagnóstico, de RAUVIA o de terceros, que permita delimitar el trabajo, no necesitas pagar otra auditoría para entrar al programa.</p>
          <p><strong className="text-rauvia-navy">Qué no incluye.</strong> Rediseño, migración, producción masiva, pauta, integraciones de shopping ni soporte fuera del alcance. No garantizamos rankings, menciones, citas, tráfico, leads ni ventas. SEO AI no exige contratar Demanda Inteligente, que se vende por separado.</p>
        </div>
      </div>
    </section>

    <section id="medicion" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Cómo comprobamos</h2>
        <p className="text-slate-700 mb-8 max-w-3xl" data-sa style={idx(1)}>Separamos seis cosas que suelen confundirse. Una entrega comprobada no es una venta atribuida. Una mención en un asistente no demuestra una visita ni una venta, y no lo vendemos como si lo fuera. Los resultados de asistentes son variables: una prueba muestra únicamente lo observado bajo esas condiciones.</p>
        <ol className="grid md:grid-cols-2 gap-4">
          {measure.map(([name, text], i) => <li key={name} className="seoai-card rounded-lg bg-white border border-slate-200 p-5" data-sa style={idx(i)}><h3 className="font-bold text-rauvia-navy mb-1"><span className="seoai-index mr-2">0{i + 1}</span>{name}</h3><p className="text-slate-700 text-sm">{text}</p></li>)}
        </ol>
      </div>
    </section>

    <section id="preguntas" className="py-16 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-8" data-sa>Preguntas frecuentes</h2>
        <div className="space-y-6">
          {faqs.map(([q, a], i) => <div key={q} className="seoai-faq" data-sa style={idx(i)}><h3 className="text-lg font-bold text-rauvia-navy mb-2">{q}</h3><p className="text-slate-700">{a}</p></div>)}
        </div>
      </div>
    </section>

    <section id="solicitar-auditoria" className="seoai-final py-16 bg-rauvia-navy text-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="seoai-kicker mb-2" data-sa>Primer paso</p>
        <h2 className="seoai-h2 text-2xl md:text-3xl font-bold mb-4" data-sa style={idx(1)}>Solicitar alcance de auditoría</h2>
        <p className="text-slate-200 mb-3" data-sa style={idx(2)}>Cuéntanos tu dominio o catálogo y la línea de negocio o pregunta que quieres resolver. Revisamos la información y te respondemos con una propuesta de alcance.</p>
        <p className="text-slate-200 mb-3" data-sa style={idx(3)}>Enviar la solicitud no contrata la auditoría ni implica que sea gratuita: primero se acuerda el alcance.</p>
        <p className="text-slate-200 mb-6" data-sa style={idx(4)}>No necesitamos contraseñas ni accesos para empezar.</p>
        <div className="mb-4 flex flex-wrap gap-4" data-sa style={idx(5)}>
          <Link to="/seo-ai/auditoria/" onClick={trackCta('solicitar_alcance', 'auditoria')} className="seoai-btn seoai-btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold">Ver alcance y solicitar auditoría <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          <Link to="/seo-ai/implementacion/" onClick={trackCta('solicitar_alcance', 'implementacion')} className="underline font-semibold self-center text-slate-100">Ya tengo diagnóstico: solicitar implementación</Link>
        </div>
        <div data-sa style={idx(5)}>
          <WhatsAppCTA href={whatsapp} onClick={trackCta('solicitud', 'auditoria')} className="seoai-btn seoai-btn-pulse inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-rauvia-navy hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Solicitar por WhatsApp <ArrowRight className="w-4 h-4" aria-hidden="true" /></WhatsAppCTA>
        </div>
        <div className="mt-4" data-sa style={idx(5)}>
          <WhatsAppCTA href={whatsappImpl} onClick={trackCta('solicitud_implementacion', 'implementacion')} className="seoai-btn seoai-btn-ghost inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold">Solicitar propuesta de implementación <ArrowRight className="w-4 h-4" aria-hidden="true" /></WhatsAppCTA>
        </div>
        <p className="text-sm text-slate-300 mt-6" data-sa style={idx(6)}>Cómo tratamos tus datos: <Link className="underline font-semibold" to="/aviso-de-privacidad/">Aviso de privacidad</Link>.</p>
      </div>
    </section>
  </div>;
}
