import RouteSEO from '../seo/PageMetadata';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Compass, MessageCircle, ShieldCheck, Layers, Route, Search, Plus } from 'lucide-react';
import './PaginaComercialServiciosProfesionalesPage.css';

const url = 'https://rauvia.com.mx/pagina-comercial-servicios-profesionales/';
const whatsapp = 'https://wa.me/525586494076?text=Hola%20RAUVIA%2C%20quiero%20cotizar%20una%20p%C3%A1gina%20comercial%20para%20mis%20servicios%20profesionales.%20Me%20gustar%C3%ADa%20definir%20el%20alcance%20seg%C3%BAn%20mis%20servicios%2C%20mis%20clientes%20y%20mi%20sitio%20actual.';
const symptoms = [
  'Tu página dice qué haces, pero no explica bien por qué elegirte.',
  'Tu servicio depende mucho de confianza, pero la página no la construye.',
  'Tienes experiencia, pero cuesta convertirla en una oferta clara.',
  'Explicas diferente tu servicio cada vez que alguien pregunta.',
  'Te piden precio antes de entender el valor.',
  'Tu sitio parece informativo, pero no ayuda a iniciar conversaciones.',
  'Sientes que tu trabajo vale más de lo que tu página logra comunicar.',
];
const includes = [
  { icon: Layers, title: 'Claridad de oferta', text: 'Ordenamos tus servicios para que el cliente entienda qué puede contratar y en qué situaciones aplica.' },
  { icon: MessageCircle, title: 'Mensaje profesional', text: 'Convertimos experiencia, conocimiento y trayectoria en mensajes claros para el cliente.' },
  { icon: ShieldCheck, title: 'Confianza', text: 'Integramos evidencia, trayectoria, método, casos, preguntas frecuentes o señales de profesionalismo.' },
  { icon: Route, title: 'Ruta de decisión', text: 'La página guía al visitante desde el problema hasta el siguiente paso, sin hacerlo sentir presionado.' },
  { icon: Compass, title: 'CTA claro', text: 'Definimos una acción natural: escribir, solicitar revisión, pedir información, agendar llamada o explicar su caso.' },
  { icon: Search, title: 'Base SEO/GEO', text: 'Estructuramos la página para que buscadores y modelos de IA entiendan qué haces, para quién lo haces y en qué situaciones aplica.' },
];
const audiences = [
  ['Consultoría', 'Cuando el cliente necesita entender tu enfoque, experiencia y forma de acompañar antes de contratar.'],
  ['Despachos o firmas profesionales', 'Cuando la confianza, el criterio y la claridad pesan más que una lista de servicios.'],
  ['Profesionistas independientes', 'Cuando tu nombre, experiencia y propuesta necesitan presentarse de forma más sólida.'],
  ['Servicios especializados', 'Cuando el cliente necesita contexto antes de saber si eres la opción adecuada.'],
  ['Servicios que se cotizan por caso', 'Cuando no vendes paquetes simples y necesitas explicar cómo evalúas cada situación.'],
];
const faqs = [
  ['¿Esto es una página web normal?', 'No exactamente. Es una página con intención comercial. Además de presentar quién eres, debe explicar tu valor, generar confianza y orientar al cliente hacia el siguiente paso.'],
  ['¿Sirve para consultores?', 'Sí. Tiene mucho sentido cuando vendes conocimiento, criterio, acompañamiento o experiencia.'],
  ['¿Sirve para profesionistas independientes?', 'Sí. Especialmente si tu reputación, experiencia y forma de trabajar necesitan explicarse mejor.'],
  ['¿Necesito tener mis servicios bien definidos?', 'No necesariamente. Parte del trabajo puede ser ordenar tu oferta para que el cliente la entienda mejor.'],
  ['¿Esto reemplaza una llamada?', 'No. La prepara mejor. La idea es que el cliente llegue con más claridad y confianza antes de conversar contigo.'],
  ['¿Incluye WhatsApp?', 'Sí. Puede incluir llamados a WhatsApp con mensajes prellenados para que el contacto sea más fácil y natural.'],
  ['¿Incluye SEO?', 'Incluye una base SEO y GEO: estructura clara, títulos, contenido por intención, preguntas frecuentes y enlaces internos.'],
];
const articles = [
  ['La diferencia entre información y comprensión', 'la-diferencia-entre-informacion-y-comprension'],
  ['La brecha entre capacidad real y percepción de mercado', 'brecha-capacidad-real-percepcion-mercado'],
  ['Por qué una PyME pierde oportunidades aunque tenga clientes interesados', 'por-que-pyme-pierde-oportunidades-clientes-interesados'],
  ['Qué debe existir antes de implementar un CRM', 'que-debe-existir-antes-de-un-crm'],
];

function ContactLink() {
  return <a className="pcsp-button pcsp-button-primary" href={whatsapp}>Cotizar mi página comercial <ArrowRight size={18} aria-hidden="true" /></a>;
}
function SectionHeading({ label, children, id }: { label: string; children: React.ReactNode; id: string }) {
  return <div className="pcsp-heading"><p className="pcsp-eyebrow">{label}</p><h2 id={id}>{children}</h2></div>;
}

export default function PaginaComercialServiciosProfesionalesPage() {
  return <article className="pcsp">
    <RouteSEO path="/pagina-comercial-servicios-profesionales" />
    
    <section className="pcsp-hero" aria-labelledby="pcsp-title">
      <div className="pcsp-wrap">
        <p className="pcsp-eyebrow"><span className="pcsp-gold-line" /> Frente Comercial · Servicios profesionales</p>
        <div className="pcsp-hero-grid">
          <div>
            <h1 id="pcsp-title">Página comercial para servicios profesionales <span>que necesitan explicar mejor su valor</span></h1>
            <p className="pcsp-lead">RAUVIA construye páginas comerciales para consultores, despachos y profesionistas independientes: servicios claros, experiencia verificable y contacto por WhatsApp para solicitar información o una cotización.</p>
            <div className="pcsp-actions"><ContactLink /><Link className="pcsp-text-link" to="/frente-comercial/">Ver qué es un Frente Comercial <ArrowRight size={17} aria-hidden="true" /></Link></div>
            <p className="pcsp-note">Para definir el alcance, cuéntanos qué servicios ofreces, a quién atiendes y si ya tienes sitio. Si necesitas comparar opciones, revisa los <Link className="pcsp-text-link" to="/frente-comercial/">paquetes de Frente Comercial</Link>.</p>
          </div>
          <aside className="pcsp-flow" aria-label="De la experiencia al cliente potencial">
            <p className="pcsp-eyebrow">Cómo se construye la confianza</p>
            <p className="pcsp-flow-title">Tu experiencia es el punto de partida.</p>
            <ol>{[
              ['Experiencia', 'Lo que sabes hacer bien.'], ['Confianza', 'Razones para considerarte.'], ['Oferta clara', 'Entender cómo puedes ayudar.'], ['Conversación', 'Un siguiente paso natural.'], ['Cliente potencial', 'Una persona que entiende tu valor.'],
            ].map(([name, text], i) => <li key={name}><span className="pcsp-step" aria-hidden="true">0{i + 1}</span><div><strong>{name}</strong><p>{text}</p></div>{i < 4 && <span className="pcsp-flow-arrow" aria-hidden="true">↓</span>}</li>)}</ol>
            <p className="pcsp-flow-note">Más claridad antes de la primera conversación.</p>
          </aside>
        </div>
        <div className="pcsp-hero-context"><p>Por eso una página común muchas veces se queda corta. Puede decir quién eres y qué haces, pero no siempre ayuda a que la persona entienda por qué debería elegirte, qué problema resuelves y cuál es el siguiente paso.</p><p>RAUVIA construye páginas comerciales para servicios profesionales que necesitan presentar mejor su oferta y convertir visitas en conversaciones reales.</p></div>
      </div>
    </section>

    <section className="pcsp-section pcsp-white" aria-labelledby="pcsp-orientation">
      <div className="pcsp-wrap">
        <SectionHeading label="Antes de hablar de diseño" id="pcsp-orientation">Entender tu servicio.<br />Ordenar cómo lo presentas.</SectionHeading>
        <div className="pcsp-grid-three pcsp-orientation">
          <div className="pcsp-card"><span className="pcsp-card-number">01 / QUÉ HACEMOS</span><h3>Tu valor, explicado con claridad.</h3><p>RAUVIA construye páginas comerciales para servicios profesionales que necesitan explicar mejor qué hacen, para quién trabajan, qué problema resuelven y por qué vale la pena contactarlos.</p><p>No se trata sólo de tener una página publicada. Se trata de construir un frente comercial que ayude a presentar tu experiencia de forma clara, confiable y orientada a conversación.</p></div>
          <div className="pcsp-card"><span className="pcsp-card-number">02 / PARA QUIÉN</span><h3>Servicios que se eligen por confianza.</h3><p>Para consultores, despachos, profesionistas independientes, estudios, asesores, especialistas y empresas de servicios que dependen de confianza antes de vender.</p><p className="pcsp-list-intro">Aplica especialmente si:</p><ul className="pcsp-check-list">{['Vendes conocimiento, criterio o acompañamiento.', 'Cotizas según cada caso.', 'Necesitas explicar tu método.', 'Tu cliente compara antes de decidir.', 'Tu servicio no se entiende en una frase.'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></div>
          <div className="pcsp-card pcsp-card-accent"><span className="pcsp-card-number">03 / POR QUÉ CONFIAR</span><h3>Primero, tu conversación comercial.</h3><p>Porque antes de diseñar, RAUVIA ordena tu conversación comercial.</p><p>Revisamos qué vendes, cómo lo explicas, qué dudas tiene tu cliente, qué objeciones aparecen, qué evidencia puede generar confianza y qué necesita entender una persona antes de escribirte.</p><p className="pcsp-card-conclusion">No partimos de una plantilla. Partimos de entender cómo compra tu cliente.</p></div>
        </div>
      </div>
    </section>

    <section className="pcsp-section" aria-labelledby="pcsp-symptoms"><div className="pcsp-wrap pcsp-split">
      <div><SectionHeading label="Reconocer la situación" id="pcsp-symptoms">Tal vez esto<br />te está pasando.</SectionHeading><p className="pcsp-section-intro">Tu experiencia existe. La dificultad puede estar en cómo llega a quien está evaluando contratarte.</p></div>
      <div><ul className="pcsp-symptoms">{symptoms.map((x, i) => <li key={x}><span aria-hidden="true">0{i + 1}</span><p>{x}</p></li>)}</ul><p className="pcsp-note">Si algo de esto te suena familiar, probablemente no necesitas sólo una página más bonita. Necesitas una página comercial que ayude a que tu valor se entienda mejor.</p></div>
    </div></section>

    <section className="pcsp-insight" aria-labelledby="pcsp-problem"><div className="pcsp-wrap pcsp-split">
      <div><p className="pcsp-eyebrow">Una pausa para mirar el problema</p><h2 id="pcsp-problem">El problema no siempre es falta de clientes.</h2></div>
      <div><p>A veces el problema no es que no haya interés. El problema es que el cliente no alcanza a entender suficiente para dar el siguiente paso.</p><p>En servicios profesionales, la decisión suele depender de confianza. Si la página no ayuda a construirla, el visitante puede irse aunque sí tuviera una necesidad real.</p><p className="pcsp-insight-line">No siempre falta demanda.<br />A veces falta claridad y confianza.</p></div>
    </div></section>

    <section className="pcsp-section pcsp-white" aria-labelledby="pcsp-solution"><div className="pcsp-wrap pcsp-split">
      <div><SectionHeading label="Qué construye RAUVIA" id="pcsp-solution">Un Frente Comercial para servicios profesionales.</SectionHeading><p className="pcsp-section-intro">RAUVIA construye un Frente Comercial para servicios profesionales: una página diseñada para explicar tu valor, ordenar tu oferta y facilitar que una persona interesada sepa cómo avanzar contigo.</p><p>No es sólo diseño web, una biografía profesional, una lista de servicios o una tarjeta digital.</p><Link className="pcsp-text-link" to="/frente-comercial/">Conocer el Frente Comercial <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <div className="pcsp-question-panel"><p className="pcsp-eyebrow">Una estructura que ayuda a responder</p><ol>{['Qué haces', 'Para quién es', 'Qué problema resuelves', 'Cómo trabajas', 'Por qué confiar', 'Qué hacer después'].map((x, i) => <li key={x}><span>0{i + 1}</span>{x}<ArrowRight size={17} aria-hidden="true" /></li>)}</ol></div>
    </div></section>

    <section className="pcsp-section" id="pcsp-incluye" aria-labelledby="pcsp-includes"><div className="pcsp-wrap"><SectionHeading label="Qué incluye" id="pcsp-includes">Cada elemento tiene<br />una tarea comercial.</SectionHeading><div className="pcsp-grid-three">{includes.map(({icon: Icon, title: name, text}) => <div className="pcsp-card pcsp-include" key={name}><span className="pcsp-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span><h3>{name}</h3><p>{text}</p></div>)}</div></div></section>

    <section className="pcsp-section pcsp-white" aria-labelledby="pcsp-audience"><div className="pcsp-wrap pcsp-split"><div><SectionHeading label="Dónde tiene sentido" id="pcsp-audience">Para qué tipo de servicios funciona bien.</SectionHeading><p className="pcsp-section-intro">Cuando entender cómo trabajas es parte de la decisión.</p></div><div className="pcsp-audiences">{audiences.map(([name, text]) => <div key={name}><h3>{name}</h3><p>{text}</p></div>)}</div></div></section>

    <section className="pcsp-section" aria-labelledby="pcsp-comparison"><div className="pcsp-wrap"><SectionHeading label="De informar a preparar la conversación" id="pcsp-comparison">Página común vs.<br />Página comercial RAUVIA.</SectionHeading><div className="pcsp-comparison">
      <div className="pcsp-card"><p className="pcsp-eyebrow">Presentar información</p><h3>Página común</h3><ul>{['Dice quién eres.', 'Lista servicios.', 'Muestra contacto.', 'Habla desde la empresa.', 'Deja dudas importantes.', 'No siempre genera confianza.'].map(x => <li key={x}><span aria-hidden="true">—</span>{x}</li>)}</ul></div>
      <div className="pcsp-card pcsp-card-accent"><p className="pcsp-eyebrow">Facilitar una decisión</p><h3>Página comercial RAUVIA</h3><ul>{['Explica qué problema resuelves.', 'Ordena tu oferta.', 'Habla desde la necesidad del cliente.', 'Muestra por qué confiar.', 'Prepara la conversación.', 'Guía hacia el siguiente paso.'].map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul></div>
    </div><p className="pcsp-comparison-note">La diferencia no está sólo en cómo se ve.<br /><strong>Está en cómo ayuda a que el cliente entienda y confíe.</strong></p></div></section>

    <section className="pcsp-section pcsp-white" aria-labelledby="pcsp-related"><div className="pcsp-wrap"><SectionHeading label="El contexto de tu empresa importa" id="pcsp-related">Una misma intención.<br />Distintas necesidades.</SectionHeading><p className="pcsp-related-intro">Si tu empresa necesita una página comercial general, puedes revisar nuestra solución para PyMES. Si vendes servicios técnicos o especializados, también puedes revisar la página para servicios especializados. Esta página está enfocada en servicios profesionales donde la confianza y la claridad son decisivas.</p><div className="pcsp-grid-three">{[
      ['Sitio web comercial para PyMES', '/sitio-web-comercial-para-pymes/'], ['Sitio web para servicios especializados', '/sitio-web-servicios-especializados/'], ['Conoce el Frente Comercial', '/frente-comercial/'],
    ].map(([name, to]) => <Link className="pcsp-related-card" to={to} key={to}><span>{name}</span><ArrowRight size={21} aria-hidden="true" /></Link>)}</div><Link className="pcsp-text-link pcsp-more" to="/soluciones/">Explorar las soluciones de RAUVIA <ArrowRight size={17} aria-hidden="true" /></Link></div></section>

    <section className="pcsp-section" aria-labelledby="pcsp-faq"><div className="pcsp-wrap pcsp-split"><div><SectionHeading label="Antes de conversar" id="pcsp-faq">Preguntas frecuentes.</SectionHeading><p className="pcsp-section-intro">Claridad también sobre lo que puedes esperar.</p></div><div className="pcsp-faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}</div></div></section>

    <section className="pcsp-section pcsp-white" aria-labelledby="pcsp-reading"><div className="pcsp-wrap"><SectionHeading label="Para seguir pensando tu caso" id="pcsp-reading">Artículos relacionados.</SectionHeading><div className="pcsp-readings">{articles.map(([name, slug], i) => <Link to={`/recursos/${slug}/`} key={slug}><span className="pcsp-reading-number">0{i + 1}</span><span>{name}</span><ArrowRight size={18} aria-hidden="true" /></Link>)}</div><Link className="pcsp-text-link pcsp-more" to="/recursos/">Ver todos los recursos <ArrowRight size={17} aria-hidden="true" /></Link></div></section>

    <section className="pcsp-section pcsp-final" aria-labelledby="pcsp-final"><div className="pcsp-wrap"><div className="pcsp-final-inner"><p className="pcsp-eyebrow">Podemos empezar por entender tu caso</p><h2 id="pcsp-final">Si tu servicio depende de confianza, tu página debería ayudar a construirla.</h2><p className="pcsp-section-intro">Si sientes que tu experiencia, tu método o tu valor no se están entendiendo con suficiente claridad, podemos revisarlo.</p><p>No se trata de hacer una página más grande. Se trata de construir una página más útil para quien está evaluando contratarte.</p><div className="pcsp-actions"><ContactLink /><Link className="pcsp-text-link" to="/frente-comercial/">Ver Frente Comercial <ArrowRight size={17} aria-hidden="true" /></Link></div></div></div></section>
  </article>;
}
