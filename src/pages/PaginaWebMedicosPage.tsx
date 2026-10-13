import RouteSEO from '../seo/PageMetadata';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Check, Plus, UserRound, Stethoscope, MapPin,
  MessageCircle, CalendarDays, GraduationCap, Clock3, Phone, FileText,
  Search, Network, MonitorSmartphone, ChartNoAxesCombined, ShieldCheck,
  LayoutTemplate, Compass, Layers3,
} from 'lucide-react';
import { ENTITIES } from '../config/entity';
import './PaginaWebGratisMedicosPage.css';
import './PaginaWebMedicosPage.css';

const canonical = 'https://rauvia.com.mx/pagina-web-para-medicos/';
const ogDescription = 'Construye una presencia médica profesional que explique quién eres, qué atiendes, dónde te encuentras y cómo pueden contactarte.';
const whatsapp = 'https://wa.me/525586494076?text=Hola%20RAUVIA%2C%20quiero%20cotizar%20mi%20p%C3%A1gina%20web%20m%C3%A9dica.%20Me%20gustar%C3%ADa%20definir%20el%20alcance%20seg%C3%BAn%20mi%20especialidad%2C%20ciudad%20y%20necesidades%20de%20citas%20o%20agenda.';
const freePath = '/pagina-web-gratis-para-medicos/';
const images = {
  'pagina-web-medico': ['Ejemplo conceptual de página web para médicos con perfil profesional, especialidad, ubicación y solicitud de cita.', 1600, 900],
  'perfil-medico-profesional': ['Perfil profesional médico ficticio con especialidad, formación, trayectoria y datos de contacto.', 1600, 900],
  'especialidad-ubicacion-contacto': ['Estructura de página médica conectando especialidad, ubicación del consultorio y formas de contacto.', 1600, 900],
  'pagina-medica-desktop-mobile': ['Página web médica responsive mostrada en computadora, tableta y teléfono.', 1600, 900],
  'pagina-basica-vs-profesional': ['Comparación conceptual entre una página médica básica y una presencia digital profesional.', 1600, 900],
  'seo-geo-medico': ['Estructura SEO y GEO de una página médica con especialidad, ubicación, trayectoria, preguntas frecuentes y contacto.', 1600, 900],
  'pagina-medica-mobile': ['Página médica conceptual en teléfono con especialidad, ubicación, horarios y solicitud de cita.', 1122, 1402],
  'opciones-pagina-web-medicos': ['Diferentes niveles de página web para médicos según sus necesidades de presencia digital.', 1600, 900],
  'frente-comercial-medico': ['Concepto de Frente Comercial Médico integrando sitio web, perfil profesional, ubicación, agenda, contenido y contacto.', 1600, 900],
  'ecosistema-pagina-medica': ['Ecosistema conceptual de página médica con perfil, especialidad, ubicación, agenda, trayectoria y preguntas frecuentes.', 1600, 900],
} as const;
type ImageName = keyof typeof images;
const imagePath = (name: string) => `/images/pagina-web-medicos/mockup-${name}.webp`;
const faqs = [
  ['¿Qué debe tener una página web para un médico?', 'Una presentación profesional clara, especialidad y áreas de atención, ubicación, horarios y formas de contacto. Según tu práctica, puede sumar trayectoria, solicitud de cita, preguntas frecuentes e información útil antes de una consulta.'],
  ['¿Necesito una página si ya aparezco en directorios médicos?', 'Los directorios pueden ayudar al descubrimiento. Una página propia puede complementar esos perfiles y reunir tu información profesional, consultorios y formas de contacto en un lugar que puedas compartir y organizar según tu práctica.'],
  ['¿Puedo incluir WhatsApp en mi página?', 'Sí. Podemos incluir un botón visible de WhatsApp con una ruta clara para solicitar información o una cita. El número y los horarios de atención se definen contigo.'],
  ['¿La página puede incluir una agenda de citas?', 'Sí, según el alcance del proyecto. Puede ser una solicitud de cita o la integración de una herramienta de agenda. La disponibilidad y el proceso de confirmación se acuerdan con el profesional.'],
  ['¿Puedo mostrar diferentes consultorios?', 'Sí. Se pueden organizar las ubicaciones, horarios, referencias y canales de contacto de cada consultorio para que el visitante identifique dónde y cómo solicitar una cita.'],
  ['¿Puedo explicar mi especialidad y trayectoria?', 'Sí. Podemos estructurar tu formación, trayectoria, áreas de atención y enfoque profesional con información proporcionada y validada por ti.'],
  ['¿Una página web ayuda al SEO local?', 'Puede aportar una base clara para relacionar tu práctica, especialidad y ubicación. Su efecto depende también de la consistencia de tus datos, competencia, contenido y otros factores; no garantiza posiciones específicas.'],
  ['¿Qué diferencia hay entre la página gratuita y una página personalizada?', 'La opción gratuita permite construir una primera presencia bajo dominio RAUVIA con el alcance de su plan básico. Una página personalizada adapta la presentación, secciones e integraciones a tu práctica y puede contemplar dominio propio, según lo acordado.'],
  ['¿Qué es el Frente Comercial Médico?', 'Es un alcance más completo que puede integrar presencia web, contacto, agenda, contenido, estructura SEO/GEO y medición. Los componentes se definen según las necesidades del médico o consultorio.'],
  ['¿Cuánto cuesta una página web para médicos?', 'Depende del alcance: personalización, número de secciones, consultorios, contenido e integraciones. Existe una opción gratuita con alcance básico; los proyectos personalizados y el Frente Comercial Médico se cotizan según alcance. Contáctanos para identificar la alternativa adecuada.'],
] as const;
const questions = [
  [UserRound, '¿Quién eres?', 'Perfil profesional y presentación.'],
  [Stethoscope, '¿Qué atiendes?', 'Especialidad, áreas de atención y motivos frecuentes de consulta.'],
  [MapPin, '¿Dónde atiendes?', 'Consultorio, zona, horarios y referencias de ubicación.'],
  [MessageCircle, '¿Cómo te contacto?', 'WhatsApp, teléfono o formulario.'],
  [CalendarDays, '¿Cómo puedo agendar?', 'Una ruta clara para solicitar una cita.'],
  [GraduationCap, '¿Por qué confiar?', 'Trayectoria, formación e información profesional verificable.'],
] as const;
const features = [
  [UserRound, 'Perfil profesional'], [Stethoscope, 'Especialidad y áreas de atención'],
  [GraduationCap, 'Formación y trayectoria'], [MapPin, 'Ubicación del consultorio'],
  [Clock3, 'Horarios'], [MessageCircle, 'WhatsApp'], [CalendarDays, 'Solicitud de cita'],
  [Phone, 'Formulario de contacto'], [MessageCircle, 'Preguntas frecuentes'],
  [FileText, 'Información previa a consulta'], [FileText, 'Contenido profesional'],
  [Network, 'Base SEO/GEO'], [MonitorSmartphone, 'Diseño responsive'],
  [ChartNoAxesCombined, 'Configuración básica de medición'],
] as const;
const solutions = [
  { icon: CalendarDays, title: 'Quiero facilitar citas y contacto', text: 'Si necesitas una ruta clara para solicitar una cita, revisar horarios o iniciar una conversación desde tu página.', cta: 'Ver agenda y WhatsApp para médicos', href: '/pagina-web-medicos-agenda-whatsapp/', label: 'Del contexto al primer contacto' },
  { icon: UserRound, title: 'Quiero una página para mi consultorio', text: 'Si necesitas presentar el lugar, quienes atienden, las especialidades, horarios y formas de contacto de tu consultorio.', cta: 'Ver página para consultorio médico', href: '/pagina-web-para-consultorio-medico/', label: 'El lugar y el equipo en una misma presencia' },
  { icon: LayoutTemplate, title: 'Quiero empezar', text: 'Si todavía no tienes una página propia y quieres construir una presencia digital básica, puedes comenzar con nuestra opción gratuita.', cta: 'Ver página web gratis', href: freePath, label: 'Una primera presencia propia' },
  { icon: Stethoscope, title: 'Soy médico especialista', text: 'Si necesitas comunicar con mayor profundidad tu especialidad, trayectoria, formación, ubicación y formas de contacto.', cta: 'Ver página para especialistas', href: '/pagina-web-para-medicos-especialistas/', label: 'Más contexto sobre tu práctica' },
  { icon: Compass, title: 'Quiero mejorar mi presencia local', text: 'Si ya tienes presencia digital pero necesitas ordenar cómo se relacionan tu especialidad, ubicación, sitio y contacto.', cta: 'Ver SEO local para médicos', href: '/seo-local-para-medicos/', label: 'Especialidad, zona y contacto' },
  { icon: Layers3, title: 'Necesito una presencia comercial más completa', text: 'Si necesitas integrar sitio, contacto, agenda, contenido, medición y estructura comercial en un mismo sistema.', cta: 'Conocer Frente Comercial Médico', href: '/frente-comercial/', label: 'Un sistema más integrado' },
] as const;
function CTA({ children = 'Cotizar mi página web médica', href = whatsapp, secondary = false }: { children?: React.ReactNode; href?: string; secondary?: boolean }) {
  const className = `med-button${secondary ? ' med-button-secondary' : ''}`;
  const content = <>{children}<ArrowRight size={17} aria-hidden="true" /></>;
  return href.startsWith('/') ? <Link className={className} to={href}>{content}</Link> : <a className={className} href={href}>{content}</a>;
}
function Heading({ label, title: heading, text }: { label: string; title: string; text?: string }) {
  return <div className="med-heading"><span className="med-eyebrow">{label}</span><h2>{heading}</h2>{text && <p>{text}</p>}</div>;
}
function Mockup({ name, hero = false, sizes = '(max-width: 700px) calc(100vw - 36px), (max-width: 1300px) 92vw, 1240px' }: { name: ImageName; hero?: boolean; sizes?: string }) {
  const [alt, width, height] = images[name];
  return <img src={imagePath(name)} srcSet={`${imagePath(`${name}-small`)} 800w, ${imagePath(name)} ${width}w`} sizes={sizes} width={width} height={height} alt={alt} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} decoding="async" />;
}
function Figure({ name, caption, sizes }: { name: ImageName; caption: string; sizes?: string }) {
  return <figure className="hub-figure"><a href={imagePath(name)} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagen: ${images[name][0]} (abre en otra pestaña)`}><Mockup name={name} sizes={sizes} /><span className="hub-enlarge">Ampliar ejemplo <ArrowUpRight size={14} aria-hidden="true" /></span></a><figcaption>{caption}</figcaption></figure>;
}
export default function PaginaWebMedicosPage() {
  return <div className="med-landing hub-landing">
    <RouteSEO path="/pagina-web-para-medicos" />
    
    <div className="hub-topbar med-container">
      <nav className="hub-breadcrumb" aria-label="Ruta de navegación"><Link to="/">RAUVIA</Link><span aria-hidden="true">/</span><Link to="/soluciones/">Soluciones</Link><span aria-hidden="true">/</span><span aria-current="page">Página web para médicos</span></nav>
      <nav className="hub-sections" aria-label="Secciones de la página"><a href="#incluye">Qué puede incluir</a><a href="#solucion">Tu solución</a><a href="#preguntas">Preguntas</a></nav>
    </div>
    <section className="hub-hero">
      <div className="med-container hub-hero-grid">
        <div className="hub-hero-copy"><span className="med-eyebrow">Presencia digital para tu práctica</span>
          <h1>Página web para médicos que necesitan una presencia <span>profesional, clara y fácil de encontrar</span></h1>
          <p className="hub-lead">RAUVIA crea páginas web para médicos con perfil profesional, especialidad, ubicación y contacto por WhatsApp. La solicitud de citas y las integraciones de agenda se definen según el alcance de tu práctica.</p>
          <div className="med-actions"><CTA /><Link className="med-text-link" to={freePath}>Empezar con una página gratuita <ArrowRight size={16} aria-hidden="true" /></Link></div>
          <p className="hub-micro">Para cotizar, indícanos tu especialidad, ciudad y si necesitas solicitud de citas o integración de agenda.</p>
          <Link className="med-text-link" to="/pagina-web-para-consultorio-medico/">¿Necesitas presentar un equipo? Ver página para consultorio <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="hub-hero-visual"><div className="hub-visual-label"><span>Tu práctica, explicada con claridad.</span><span>Ejemplo conceptual</span></div><Mockup name="pagina-web-medico" hero sizes="(max-width: 900px) calc(100vw - 36px), (max-width: 1300px) 48vw, 620px" /><div className="hub-visual-footer"><span><Stethoscope size={15} aria-hidden="true" />Especialidad</span><span><MapPin size={15} aria-hidden="true" />Ubicación</span><span><MessageCircle size={15} aria-hidden="true" />Contacto</span></div><p className="hub-image-note">Personas, datos y sitios ficticios. Representación de un posible alcance.</p></div>
      </div>
      <div className="med-container hub-signals" aria-label="Elementos de una presencia médica">Especialidad <span>·</span> Ubicación <span>·</span> Perfil profesional <span>·</span> Contacto <span>·</span> Agenda</div>
    </section>
    <section className="med-container hub-intro" aria-label="Qué hace RAUVIA y para quién"><p>En RAUVIA desarrollamos una <strong>página web para médicos</strong> que reúna la información de su práctica en una presencia propia, clara y fácil de compartir.</p><p>Para médicos independientes, especialistas y profesionales que comienzan consulta privada. El alcance se adapta a lo que necesitas comunicar y a cómo quieres recibir el primer contacto.</p></section>
    <section className="med-section med-container">
      <Heading label="01 / Antes del primer contacto" title="Una página médica debería responder las dudas básicas antes del primer contacto" />
      <div className="med-grid med-grid-three hub-question-grid">{questions.map(([Icon, heading, text]) => <article className="med-card" key={heading}><Icon size={24} aria-hidden="true" /><h3>{heading}</h3><p>{text}</p></article>)}</div>
      <p className="hub-closing">Una página médica no necesita complicar la decisión. Necesita reducir las dudas que aparecen antes de contactar.</p>
      <Figure name="perfil-medico-profesional" caption="Ejemplo conceptual de perfil y áreas de atención. La formación y trayectoria de cada proyecto deben ser verificadas por el profesional responsable." />
    </section>
    <section className="med-section hub-tint"><div className="med-container">
      <Heading label="02 / Un lugar para conectar tu información" title="Tu página puede convertirse en el centro de tu presencia digital" text="Redes sociales, directorios, mapas y recomendaciones pueden generar descubrimiento. Tu página propia puede funcionar como el lugar donde toda esa información se ordena y conecta." />
      <ol className="hub-flow" aria-label="Recorrido de descubrimiento a contacto">{['Búsqueda', 'Página médica', 'Perfil profesional', 'Especialidad', 'Ubicación', 'Contacto / agenda'].map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}{i < 5 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol>
      <Figure name="especialidad-ubicacion-contacto" caption="Especialidad, ubicación y contacto conectados. Los botones, teléfono y dirección del ejemplo son ilustrativos." />
    </div></section>
    <section id="incluye" className="med-section med-container">
      <Heading label="03 / Componentes según tu práctica" title="¿Qué puede incluir una página web para médicos?" text="Puede incluir según el alcance del proyecto. Elegimos contigo qué información e integraciones aportan claridad a tu presencia profesional." />
      <div className="hub-feature-grid">{features.map(([Icon, label]) => <article key={label}><Icon size={20} aria-hidden="true" /><h3>{label}</h3></article>)}</div>
      <Figure name="ecosistema-pagina-medica" caption="Un ejemplo de componentes conectados; no todos son obligatorios. La agenda y las integraciones se definen según alcance." />
    </section>
    <section className="med-section hub-showcase"><div className="med-container">
      <Heading label="04 / La misma claridad en cada pantalla" title="Una presencia médica pensada para verse bien y entenderse rápido" text="Perfil, especialidad, ubicación, agenda, WhatsApp y preguntas frecuentes pueden formar parte de un recorrido claro en computadora y teléfono." />
      <Figure name="pagina-medica-desktop-mobile" caption="Ejemplo responsive de una práctica ficticia. El diseño y las secciones se adaptan a cada proyecto." />
      <div className="hub-showcase-tags">{['Desktop', 'Mobile', 'Perfil', 'Especialidad', 'Ubicación', 'Agenda', 'WhatsApp', 'FAQ'].map(x => <span key={x}><Check size={14} aria-hidden="true" />{x}</span>)}</div>
    </div></section>
    <section id="solucion" className="med-section med-container">
      <Heading label="05 / Encuentra tu siguiente paso" title="No todos los médicos necesitan la misma página" text="Empieza por la necesidad que mejor describe tu momento. Cada alternativa tiene un alcance propio." />
      <div className="hub-solution-grid">{solutions.map(({ icon: Icon, title: heading, text, cta, href, label }, i) => <article key={heading}><div className="hub-solution-top"><Icon size={25} aria-hidden="true" /><span>0{i + 1}</span></div><span className="med-eyebrow">{label}</span><h3>{heading}</h3><p>{text}</p><Link className="med-text-link" to={href}>{cta}<ArrowRight size={17} aria-hidden="true" /></Link></article>)}</div>
      <Figure name="opciones-pagina-web-medicos" caption="Visual conceptual de distintos niveles de presencia. No representa paquetes cerrados ni resultados comerciales obtenidos." />
    </section>
    <section className="med-section hub-tint"><div className="med-container">
      <Heading label="06 / Una presencia acorde a tu etapa" title="La diferencia no está solamente en el diseño" />
      <div className="hub-comparison"><article><span className="med-eyebrow">Información esencial</span><h3>Página básica</h3><p>Una primera base para presentar tu práctica.</p><ul>{['Nombre', 'Especialidad', 'Teléfono'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article><article><span className="med-eyebrow">Más contexto para el visitante</span><h3>Presencia profesional</h3><ul>{['Nombre', 'Especialidad', 'Perfil', 'Trayectoria', 'Ubicación', 'Horarios', 'Contacto', 'Agenda', 'Preguntas frecuentes', 'Información útil', 'Estructura SEO/GEO'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article></div>
      <p className="hub-closing">Cada etapa necesita un nivel diferente de presencia digital.</p>
      <Figure name="pagina-basica-vs-profesional" caption="Comparación de alcances posibles. No representa un antes y después de un cliente real." />
    </div></section>
    <section className="med-section med-container">
      <Heading label="07 / Información fácil de interpretar" title="Una página también debe ayudar a entender quién eres, qué haces y dónde atiendes" />
      <div className="hub-seo-grid"><article><Search size={24} aria-hidden="true" /><h3>SEO: estructura para buscadores</h3><p>Títulos, contenido y enlaces ayudan a organizar tu información profesional para los buscadores.</p></article><article><Network size={24} aria-hidden="true" /><h3>GEO: contexto para sistemas de IA</h3><p>Profesional, especialidad, ubicación, servicios, trayectoria, preguntas frecuentes y contacto en una estructura más fácil de interpretar.</p></article></div>
      <Figure name="seo-geo-medico" caption="Diagrama conceptual de información conectada. No implica recomendaciones ni aparición garantizada en asistentes de IA." />
      <p className="hub-closing">Para trabajar específicamente la relación entre especialidad, zona y contacto, conoce nuestro enfoque de <Link to="/seo-local-para-medicos/">SEO local para médicos</Link>.</p>
    </section>
    <section className="med-section hub-mobile-section"><div className="med-container hub-mobile-grid"><div>
      <Heading label="08 / Diseñada desde el teléfono" title="Pensada para el momento en que alguien necesita contactarte" text="Una persona que encuentra tu página desde el teléfono debería poder entender rápidamente si tu práctica corresponde a lo que busca y cómo contactarte." />
      <ul className="hub-mobile-list">{['Especialidad visible', 'Ubicación', 'Horarios', 'WhatsApp', 'Solicitar cita', 'Teléfono', 'Mapa'].map(x => <li key={x}><Check size={17} aria-hidden="true" />{x}</li>)}</ul>
      <p>Estos accesos se definen según tus canales de atención y el alcance acordado. La solicitud de cita debe distinguirse de su confirmación.</p>
    </div><Figure name="pagina-medica-mobile" sizes="(max-width: 540px) 85vw, 340px" caption="Ejemplo conceptual móvil. Los canales de contacto se adaptan a la práctica de cada profesional." /></div></section>
    <section id="alcances" className="med-section med-container">
      <Heading label="09 / Crece desde tu necesidad actual" title="Puedes empezar con lo que necesitas hoy" />
      <div className="med-grid med-grid-three hub-levels">
        <article><span className="med-eyebrow">01 / Primera presencia</span><h3>Página médica gratuita</h3><p>Para construir una primera presencia propia.</p><span className="hub-level-note">Bajo dominio RAUVIA, con el alcance del plan básico.</span><CTA href={freePath} secondary>Empezar gratis</CTA></article>
        <article><span className="med-eyebrow">02 / Adaptada a tu práctica</span><h3>Página médica personalizada</h3><p>Para médicos que necesitan una presentación profesional adaptada a su práctica.</p><span className="hub-level-note">Secciones, diseño e integraciones según lo acordado.</span><CTA>Solicitar información</CTA></article>
        <article><span className="med-eyebrow">03 / Presencia integrada</span><h3>Frente Comercial Médico</h3><p>Para integrar presencia web, estructura de contacto, visibilidad, contenido y medición.</p><strong className="hub-level-note">Cotización según alcance</strong><CTA href="/frente-comercial/" secondary>Conocer Frente Comercial</CTA></article>
      </div>
      <div className="hub-front"><div><span className="med-eyebrow">Cuando necesitas integrar más</span><h3>Tu presencia digital, organizada como un sistema.</h3><p>La presentación profesional y las rutas de contacto pueden conectarse con contenido, agenda y medición. Definimos los componentes que corresponden a tu operación.</p><Link className="med-text-link" to="/frente-comercial/">Conocer el enfoque de Frente Comercial<ArrowRight size={17} aria-hidden="true" /></Link></div><Figure name="frente-comercial-medico" sizes="(max-width: 900px) 92vw, 58vw" caption="Ejemplo conceptual de un alcance integrado. Las gráficas son ilustrativas y no representan resultados reales." /></div>
    </section>
    <section className="med-section hub-tint"><div className="med-container">
      <Heading label="10 / Distintos momentos, una necesidad de claridad" title="¿Para quién puede funcionar?" />
      <div className="hub-audience-grid">{['Médicos independientes', 'Médicos especialistas', 'Profesionales que comienzan consulta privada', 'Médicos con uno o varios consultorios', 'Profesionales que dependen principalmente de redes o directorios', 'Médicos que quieren ordenar su presencia digital'].map((x, i) => <article key={x}><span>{String(i + 1).padStart(2, '0')}</span><h3>{x}</h3></article>)}</div>
    </div></section>
    <section className="med-section med-container hub-boundaries">
      <Heading label="11 / Expectativas claras" title="Una presencia profesional sin promesas irreales" text="Una página web puede mejorar la claridad, estructura y accesibilidad de tu presencia digital. El posicionamiento y los resultados comerciales dependen de múltiples factores, incluyendo competencia, ubicación, especialidad, autoridad, contenido y evolución de los buscadores." />
      <div><ShieldCheck size={27} aria-hidden="true" /><h3>RAUVIA no promete</h3><ul>{['Posiciones específicas en buscadores', 'Determinada cantidad de pacientes', 'Resultados clínicos', 'Recomendaciones por parte de sistemas de IA', 'Resultados comerciales garantizados'].map(x => <li key={x}>{x}</li>)}</ul></div>
    </section>
    <section id="preguntas" className="med-section hub-faq-section"><div className="med-container">
      <Heading label="12 / Antes de elegir" title="Preguntas frecuentes sobre páginas web para médicos" />
      <div className="med-faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      <a className="med-text-link hub-faq-contact" href={whatsapp}>Cuéntanos qué necesitas y revisamos el alcance<ArrowRight size={17} aria-hidden="true" /></a>
    </div></section>
    <section className="med-section hub-final"><div className="med-container">
      <span className="med-eyebrow">Una presencia que corresponde a tu práctica</span><h2>Construye una presencia médica que explique mejor tu práctica</h2>
      <p>Cuéntanos qué necesitas y te ayudamos a identificar qué tipo de página corresponde mejor a tu práctica.</p><p>Tu página web para médicos puede empezar por una base clara y crecer contigo.</p>
      <div className="med-actions"><CTA /><CTA href={freePath} secondary>Empezar con una página gratuita</CTA></div>
    </div></section>
    <aside className="med-container hub-responsibility"><ShieldCheck size={22} aria-hidden="true" /><p>RAUVIA desarrolla infraestructura y presencia digital. La información médica, profesional y regulatoria publicada en cada proyecto debe ser proporcionada y validada por el profesional responsable.</p></aside>
    <nav className="med-container med-related" aria-label="Soluciones y recursos relacionados"><p>Explora las alternativas para tu presencia profesional.</p><div><Link to={freePath}>Página web gratis para médicos</Link><Link to="/pagina-web-para-medicos-especialistas/">Página para especialistas</Link><Link to="/seo-local-para-medicos/">SEO local para médicos</Link><Link to="/frente-comercial/">Frente Comercial</Link><Link to="/soluciones/">Soluciones RAUVIA</Link><Link to="/recursos/">Recursos y perspectivas</Link></div></nav>
  </div>;
}
