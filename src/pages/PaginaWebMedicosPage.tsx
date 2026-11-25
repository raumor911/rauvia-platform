import RouteSEO from '../seo/PageMetadata';
import React, { useRef } from 'react';
import ConvergenceField from '../components/ConvergenceField';
import usePageFx from '../hooks/usePageFx';
import useFrenteMotion from '../hooks/useFrenteMotion';
import '../styles/frenteMotion.css';
import '../styles/pageFrontier.css';
import '../styles/landingFx.css';
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
import './PaginaWebMedicosPremium.css';
import './PaginaWebMedicosHubPremium.css';

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
  ['¿Qué debe tener una página web para un médico?', 'Debe presentar al profesional, su especialidad, ubicación y forma de contacto. Según la práctica, puede incluir trayectoria validada, horarios, preguntas frecuentes y una vía para solicitar cita.'],
  ['¿Necesito una página si ya aparezco en Google Maps o en un directorio?', 'Depende de tu necesidad. Esos perfiles pueden ayudar a que las personas te encuentren; una página propia puede reunir la información profesional que validas y explicar cómo contactar contigo. No es obligatorio crear una si la presencia actual ya cumple tu objetivo.'],
  ['¿Puedo incluir WhatsApp en mi página?', 'Sí, si WhatsApp forma parte de tus canales de atención. El número y la forma de contacto se confirman contigo; el botón no implica respuestas automáticas ni una agenda conectada.'],
  ['¿La página puede incluir agenda de citas?', 'Puede incluir una vía de solicitud o una integración acordada para el proyecto. La disponibilidad y la confirmación dependen del proceso real de la práctica y de la herramienta instalada.'],
  ['¿Puedo presentar diferentes consultorios o sedes?', 'Sí, si la información de cada ubicación, sus horarios y canales está confirmada. Para varios profesionales o sedes, revisamos si corresponde la página para consultorio médico.'],
  ['¿Puedo explicar mi especialidad y trayectoria?', 'Sí. RAUVIA puede organizar el contenido que proporciones; tú validas la exactitud de la especialidad, formación, trayectoria y demás afirmaciones antes de publicar.'],
  ['¿Una página web ayuda al SEO local?', 'Puede aportar una base clara para relacionar tu práctica, especialidad, ubicación y contacto. El posicionamiento depende de distintos factores y no se garantiza. Si ya tienes sitio y buscas revisar esta necesidad, consulta la ruta de SEO local para médicos.'],
  ['¿Qué diferencia hay entre la página gratuita y una página personalizada?', 'La opción gratuita tiene el alcance básico publicado bajo dominio RAUVIA. La opción personalizada define diseño, secciones y funciones de acuerdo con la práctica. Revisa las condiciones vigentes de cada opción antes de solicitarla.'],
  ['¿Qué es el Frente Comercial Médico?', 'Es un alcance que puede integrar presencia web, contenido, contacto y medición según la necesidad de un profesional o consultorio. Los componentes se definen para cada proyecto; no implica resultados garantizados.'],
  ['¿Cuánto cuesta una página web para médicos?', 'La página pública presenta una opción gratuita, una página personalizada desde $7,900 MXN + IVA y Frente Comercial Médico desde $13,900 MXN + IVA. El alcance y las condiciones deben confirmarse antes de cotizar; una agenda, integración o proyecto adicional puede cambiar la propuesta.'],
] as const;
const questions = [
  [UserRound, '¿Quién eres?', 'Perfil profesional y presentación.'],
  [Stethoscope, '¿Qué atiendes?', 'Especialidad y áreas de atención que tú validas.'],
  [MapPin, '¿Dónde atiendes?', 'Consultorio, zona, horarios y referencias confirmadas.'],
  [MessageCircle, '¿Cómo te contacto?', 'WhatsApp, teléfono o formulario, según el canal que uses.'],
  [CalendarDays, '¿Cómo solicito una cita?', 'Una ruta clara para enviar una solicitud; la confirmación depende de tu proceso.'],
  [GraduationCap, '¿Qué información respalda tu perfil?', 'Formación y trayectoria que el profesional proporciona y valida.'],
] as const;
const features = [
  [UserRound, 'Perfil profesional'], [Stethoscope, 'Especialidad y áreas de atención'],
  [GraduationCap, 'Formación y trayectoria'], [MapPin, 'Ubicación del consultorio'],
  [Clock3, 'Horarios confirmados'], [MessageCircle, 'WhatsApp o teléfono'], [CalendarDays, 'Solicitud de cita'],
  [Phone, 'Formulario de contacto'], [MessageCircle, 'Preguntas frecuentes'],
  [FileText, 'Información práctica antes del contacto'], [FileText, 'Contenido profesional'],
  [Network, 'Estructura SEO/GEO'], [MonitorSmartphone, 'Diseño adaptable'],
  [ChartNoAxesCombined, 'Medición acordada'],
] as const;
const solutions = [
  { icon: LayoutTemplate, title: 'Necesito crear una página', text: 'Para presentar una práctica profesional en un lugar propio y fácil de compartir.', cta: 'Ver página web gratuita para médicos', href: freePath, label: 'Primera presencia' },
  { icon: Stethoscope, title: 'Quiero presentar mejor mi práctica', text: 'Para explicar especialidad, trayectoria, ubicación y contacto con el nivel de detalle que necesitas.', cta: 'Ver página para médicos especialistas', href: '/pagina-web-para-medicos-especialistas/', label: 'Página profesional' },
  { icon: UserRound, title: 'Necesito presentar un equipo o varias sedes', text: 'Para organizar profesionales, especialidades, ubicaciones, horarios y contacto de una práctica colectiva.', cta: 'Ver página web para consultorio médico', href: '/pagina-web-para-consultorio-medico/', label: 'Consultorio o clínica' },
  { icon: CalendarDays, title: 'Quiero facilitar solicitudes de cita', text: 'Para definir cómo una persona inicia una solicitud y cómo tu práctica la recibe y confirma.', cta: 'Ver página para médicos con agenda y WhatsApp', href: '/pagina-web-medicos-agenda-whatsapp/', label: 'Contacto y agenda' },
  { icon: Compass, title: 'Ya tengo sitio; quiero mejorar mi posicionamiento', text: 'Para revisar cómo se relacionan sitio, especialidad, ubicación y presencia local.', cta: 'Ver SEO local para médicos', href: '/seo-local-para-medicos/', label: 'Sitio ya existente' },
  { icon: Layers3, title: 'Necesito integrar varias necesidades', text: 'Si necesitas combinar presencia web, contacto, contenido y medición, revisamos qué alcance corresponde a tu operación.', cta: 'Conocer Frente Comercial Médico', href: '/frente-comercial/', label: 'Alcance integrado' },
] as const;
const levels = [
  { name: 'Página médica gratuita', label: 'Primera presencia', text: 'Una primera presencia profesional con el alcance básico de la opción gratuita bajo dominio RAUVIA. Revisa sus condiciones antes de solicitarla.', price: '$0', unit: 'MXN', from: false, note: 'Bajo dominio RAUVIA, con el alcance del plan básico.', items: ['Dominio RAUVIA y alojamiento', 'Perfil profesional y especialidad', 'Ubicación y WhatsApp', 'Base SEO/GEO'], href: freePath, cta: 'Empezar con la página gratuita', primary: false },
  { name: 'Página médica personalizada', label: 'Adaptada a tu práctica', text: 'Para adaptar la presentación, las secciones y las funciones a tu práctica.', price: '$7,900', unit: 'MXN + IVA', from: true, note: 'Secciones, diseño e integraciones según lo acordado.', items: ['Dominio propio', 'Diseño personalizado y más secciones', 'Contenido por especialidad', 'SEO local ampliado'], href: whatsapp, cta: 'Solicitar información', primary: true },
  { name: 'Frente Comercial Médico', label: 'Presencia integrada', text: 'Para integrar presencia web, estructura de contacto, contenido y medición según las necesidades de tu práctica.', price: '$13,900', unit: 'MXN + IVA', from: true, note: 'Alcance definido según tu operación.', items: ['Arquitectura de oferta completa', 'Diferenciación profesional', 'SEO/GEO avanzado', 'Estrategia de confianza', 'Analítica y optimización'], href: '/frente-comercial/', cta: 'Conocer Frente Comercial Médico', primary: false },
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
  const root = useRef<HTMLElement>(null);
  usePageFx(root);
  useFrenteMotion(root);
  return <div ref={root as any} className="fx-page lf-page med-landing hub-landing med-hub">
<div className="fx-progress" aria-hidden="true" />
    <RouteSEO path="/pagina-web-para-medicos" />
    
    <div className="hub-topbar med-container">
      <nav className="hub-breadcrumb" aria-label="Ruta de navegación"><Link to="/">RAUVIA</Link><span aria-hidden="true">/</span><Link to="/soluciones/">Soluciones</Link><span aria-hidden="true">/</span><span aria-current="page">Página web para médicos</span></nav>
      <nav className="hub-sections" aria-label="Secciones de la página"><a href="#incluye">Qué puede incluir</a><a href="#solucion">Tu solución</a><a href="#preguntas">Preguntas</a></nav>
    </div>
    <section className="fx-hero lf-hero hub-hero"><ConvergenceField origin={[0.74, 0.5]} className="fx-field" />
      <div className="med-container hub-hero-grid">
        <div className="hub-hero-copy"><span className="med-eyebrow">Presencia digital para tu práctica</span>
          <h1>Página web para médicos: <span>presenta tu práctica y facilita el contacto</span></h1>
          <p className="hub-lead">Cuando alguien busca tu nombre o especialidad, necesita entender quién eres, dónde atiendes y cómo ponerse en contacto. RAUVIA crea o actualiza páginas para médicos con información profesional validada y una ruta clara para el siguiente paso.</p>
          <div className="med-actions"><CTA>Quiero crear o actualizar mi página</CTA><Link className="med-text-link" to="/seo-local-para-medicos/">Ya tengo sitio; quiero mejorar mi posicionamiento <ArrowRight size={16} aria-hidden="true" /></Link></div>
          <p className="hub-micro">Para orientarte, cuéntanos si buscas una presentación profesional, recibir solicitudes de contacto/cita o revisar un sitio existente. No compartas información clínica de pacientes.</p>
          <Link className="med-text-link" to="/pagina-web-para-consultorio-medico/">¿Necesitas presentar un equipo? Ver página para consultorio <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="hub-hero-visual"><div className="hub-visual-label"><span>Tu práctica, explicada con claridad.</span><span>Ejemplo conceptual</span></div><Mockup name="pagina-web-medico" hero sizes="(max-width: 900px) calc(100vw - 36px), (max-width: 1300px) 48vw, 620px" /><div className="hub-visual-footer"><span><Stethoscope size={15} aria-hidden="true" />Especialidad</span><span><MapPin size={15} aria-hidden="true" />Ubicación</span><span><MessageCircle size={15} aria-hidden="true" />Contacto</span></div><p className="hub-image-note">Personas, datos y sitios ficticios. Representación de un posible alcance.</p></div>
      </div>
      <div className="med-container hub-signals" aria-label="Elementos de una presencia médica">Especialidad <span>·</span> Ubicación <span>·</span> Perfil profesional <span>·</span> Contacto <span>·</span> Agenda</div>
    </section>
    <section className="med-container hub-intro" aria-label="Necesidad y contexto de la práctica"><h2 className="hub-intro-title">Tu información profesional puede aparecer en varios lugares</h2><p>Tu perfil de Google, un directorio, la página de un hospital y tus redes pueden mostrar distintas partes de tu práctica. Una <strong>página web para médicos</strong> propia permite reunir la información profesional que tú validas y enlazarla con las formas de contacto que utilizas.</p><p>Tener una ficha en Google o aparecer en un hospital no significa que necesites otra página. La pregunta es si hoy puedes presentar tu práctica con claridad y dirigir a quien te busca al siguiente paso que corresponde.</p></section>
    <section className="med-section med-container">
      <Heading label="01 / Antes del primer contacto" title="Una página médica puede responder las dudas básicas antes del primer contacto" text="Quien llega a tu página necesita encontrar información práctica y profesional sin tener que reconstruirla entre varias fuentes." />
      <div className="med-grid med-grid-three hub-question-grid">{questions.map(([Icon, heading, text]) => <article className="med-card" key={heading}><Icon size={24} aria-hidden="true" /><h3>{heading}</h3><p>{text}</p></article>)}</div>
      <p className="hub-closing">Una presentación clara ayuda a que la persona entienda tu práctica y sepa qué hacer después.</p>
      <Figure name="perfil-medico-profesional" caption="Ejemplo conceptual de perfil y áreas de atención. La formación y trayectoria de cada proyecto deben ser verificadas por el profesional responsable." />
    </section>
    <section className="med-section hub-tint"><div className="med-container">
      <Heading label="02 / Un lugar para conectar tu información" title="Conecta la información de tu práctica en una página propia" text="Una persona puede llegar por una búsqueda, una recomendación, un directorio o una institución donde atiendes. Tu página puede reunir tu perfil, especialidad, ubicación y contacto en un mismo lugar para que esa información se entienda en contexto." />
      <ol className="hub-flow" aria-label="Recorrido de descubrimiento a contacto">{['Búsqueda', 'Página médica', 'Perfil profesional', 'Especialidad', 'Ubicación', 'Contacto / solicitud de cita'].map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}{i < 5 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol>
      <Figure name="especialidad-ubicacion-contacto" caption="Especialidad, ubicación y contacto conectados. Los datos del ejemplo son ilustrativos." />
    </div></section>
    <section id="incluye" className="med-section med-container">
      <Heading label="03 / Componentes según tu práctica" title="¿Qué puede incluir una página web para médicos?" text="El contenido y las funciones se definen según tu práctica. Organizamos la información que necesitas presentar y acordamos cómo recibes el primer contacto." />
      <div className="hub-feature-grid">{features.map(([Icon, label]) => <article key={label}><Icon size={20} aria-hidden="true" /><h3>{label}</h3></article>)}</div>
      <p className="hub-closing">No todos los componentes aplican a cada práctica. La agenda y las integraciones se definen según alcance. Una solicitud no significa que una cita quedó confirmada.</p>
      <Figure name="ecosistema-pagina-medica" caption="Ejemplo conceptual de componentes conectados; no representa un sitio de cliente ni resultados reales." />
    </section>
    <section className="med-section hub-showcase"><div className="med-container">
      <Heading label="04 / La misma claridad en cada pantalla" title="La misma información debe entenderse en computadora y teléfono" text="Especialidad, ubicación, horarios y contacto deben seguir siendo fáciles de encontrar cuando una persona consulta desde su teléfono o computadora. El diseño y las secciones se adaptan al alcance del proyecto." />
      <Figure name="pagina-medica-desktop-mobile" caption="Ejemplo responsive de una práctica ficticia. El diseño y las secciones se adaptan a cada proyecto." />
      <div className="hub-showcase-tags">{['Desktop', 'Mobile', 'Perfil', 'Especialidad', 'Ubicación', 'Agenda', 'WhatsApp', 'FAQ'].map(x => <span key={x}><Check size={14} aria-hidden="true" />{x}</span>)}</div>
    </div></section>
    <section id="solucion" className="med-section med-container">
      <Heading label="05 / Encuentra tu siguiente paso" title="¿Qué necesitas resolver ahora?" text="Elige la situación que mejor describe tu práctica. Si no estás seguro, cuéntanos qué tienes hoy y qué quieres que la página permita hacer." />
      <div className="hub-solution-grid">{solutions.map(({ icon: Icon, title: heading, text, cta, href, label }, i) => <article key={heading}><div className="hub-solution-top"><Icon size={25} aria-hidden="true" /><span>0{i + 1}</span></div><span className="med-eyebrow">{label}</span><h3>{heading}</h3><p>{text}</p><Link className="med-text-link" to={href}>{cta}<ArrowRight size={17} aria-hidden="true" /></Link></article>)}</div>
      <Figure name="opciones-pagina-web-medicos" caption="Visual conceptual de distintos niveles de presencia. No representa paquetes cerrados ni resultados comerciales obtenidos." />
    </section>
    <section className="med-section hub-tint"><div className="med-container">
      <Heading label="06 / Una presencia acorde a tu etapa" title="El nivel de detalle depende de lo que necesitas presentar" />
      <div className="hub-comparison"><article><span className="med-eyebrow">Información esencial</span><h3>Página básica</h3><p>Una primera base para presentar tu práctica.</p><ul>{['Nombre', 'Especialidad', 'Contacto'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article><article><span className="med-eyebrow">Más contexto para el visitante</span><h3>Presencia profesional</h3><p>Para explicar la práctica con más contexto.</p><ul>{['Perfil', 'Trayectoria validada', 'Ubicación', 'Horarios', 'Contacto', 'Solicitud de cita', 'Preguntas frecuentes', 'Estructura SEO/GEO'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article></div>
      <p className="hub-closing">El alcance se define según la información y las funciones que realmente necesitas.</p>
      <Figure name="pagina-basica-vs-profesional" caption="Comparación de alcances posibles. No representa un antes y después de un cliente real." />
    </div></section>
    <section className="med-section med-container">
      <Heading label="07 / Información fácil de interpretar" title="Una página clara para las personas y comprensible para buscadores" />
      <div className="hub-seo-grid"><article><Search size={24} aria-hidden="true" /><h3>SEO: organiza la información para buscadores</h3><p>Títulos, texto, enlaces y estructura técnica ayudan a que buscadores rastreen y entiendan el contenido de la página.</p></article><article><Network size={24} aria-hidden="true" /><h3>GEO: presenta el contexto de tu práctica</h3><p>Relacionamos en texto visible al profesional, su especialidad, ubicación, servicios informativos y vías de contacto, con datos proporcionados y validados por la práctica.</p></article></div>
      <Figure name="seo-geo-medico" caption="Diagrama conceptual. No representa una recomendación real ni garantiza aparecer en buscadores o asistentes de IA." />
      <p className="hub-closing">Esa claridad puede ayudar a que buscadores y sistemas de IA interpreten la información. RAUVIA no controla posiciones ni garantiza que Gemini u otros asistentes recomienden, mencionen o citen una página.</p>
      <Link className="med-text-link hub-context-link" to="/seo-local-para-medicos/">Conoce SEO local para médicos <ArrowRight size={17} aria-hidden="true" /></Link>
    </section>
    <section className="med-section hub-mobile-section"><div className="med-container hub-mobile-grid"><div>
      <Heading label="08 / Diseñada desde el teléfono" title="Facilita que quien te encuentra sepa cómo contactarte" text="Desde un teléfono, la persona debería poder identificar tu especialidad, ubicación y forma de contacto. La página puede mostrar WhatsApp, teléfono, mapa, formulario o solicitud de cita según los canales que realmente utilizas." />
      <ul className="hub-mobile-list">{['Especialidad', 'Ubicación', 'Horarios', 'WhatsApp', 'Solicitar cita', 'Teléfono', 'Mapa'].map(x => <li key={x}><Check size={17} aria-hidden="true" />{x}</li>)}</ul>
      <p>Los canales y datos se validan contigo. Una solicitud de cita no confirma disponibilidad ni sustituye el proceso de tu práctica.</p>
    </div><Figure name="pagina-medica-mobile" sizes="(max-width: 540px) 85vw, 340px" caption="Ejemplo conceptual móvil. Los canales de contacto se adaptan a la práctica de cada profesional." /></div></section>
    <section id="alcances" className="med-section med-container">
      <Heading label="09 / Crece desde tu necesidad actual" title="Puedes empezar por la necesidad que tienes hoy" />
      <div className="med-grid med-grid-three hub-levels">
        {levels.map((lv, i) => <article key={lv.name} className={`hub-level hub-level-${i + 1}`}>
          <span className="hub-level-no" aria-hidden="true">Nº 0{i + 1}</span>
          <span className="med-eyebrow">{lv.label}</span>
          <h3>{lv.name}</h3>
          <p className="hub-level-desc">{lv.text}</p>
          <p className="hub-level-price">{lv.from && <small>Desde</small>}{lv.price}<span>{lv.unit}</span></p>
          <span className="hub-level-note">{lv.note}</span>
          <ul className="hub-level-list">{lv.items.map(x => <li key={x}><span aria-hidden="true"><Check size={13} /></span>{x}</li>)}</ul>
          <CTA href={lv.href} secondary={!lv.primary}>{lv.cta}</CTA>
        </article>)}
      </div>
      <p className="hub-closing">Si aún no sabes qué nivel corresponde, dinos si necesitas crear o actualizar tu página, facilitar solicitudes o mejorar el posicionamiento de un sitio existente. La recomendación de alcance depende de esa necesidad.</p>
      <div className="hub-front"><div><span className="med-eyebrow">Cuando necesitas integrar más</span><h3>Tu presencia digital, organizada como un sistema.</h3><p>La presentación profesional y las rutas de contacto pueden conectarse con contenido, agenda y medición. Definimos los componentes que corresponden a tu operación.</p><Link className="med-text-link" to="/frente-comercial/">Conocer el enfoque de Frente Comercial<ArrowRight size={17} aria-hidden="true" /></Link></div><Figure name="frente-comercial-medico" sizes="(max-width: 900px) 92vw, 58vw" caption="Ejemplo conceptual de un alcance integrado. Las gráficas son ilustrativas y no representan resultados reales." /></div>
    </section>
    <section className="med-section hub-tint"><div className="med-container">
      <Heading label="10 / Distintos momentos, una necesidad de claridad" title="¿Para quién puede funcionar?" />
      <div className="hub-audience-grid">{['Médicos independientes', 'Médicos especialistas', 'Profesionales que comienzan consulta privada', 'Médicos con uno o varios consultorios', 'Profesionales cuya información está distribuida entre redes, directorios o instituciones', 'Médicos que necesitan presentar o actualizar su práctica'].map((x, i) => <article key={x}><span>{String(i + 1).padStart(2, '0')}</span><h3>{x}</h3></article>)}</div>
      <p className="hub-closing">Si participan varios profesionales, especialidades o sedes, revisamos si corresponde la <Link to="/pagina-web-para-consultorio-medico/">página para consultorio médico</Link>.</p>
    </div></section>
    <section className="med-section med-container hub-boundaries">
      <Heading label="11 / Expectativas claras" title="Información profesional clara, con responsabilidades definidas" text="RAUVIA organiza y presenta la información que proporciona el médico o consultorio. El profesional responsable valida su perfil, formación, especialidad, servicios, ubicación, horarios y cualquier afirmación que se publique." />
      <div><ShieldCheck size={27} aria-hidden="true" /><h3>RAUVIA no garantiza</h3><ul>{['Posiciones específicas en buscadores', 'Recomendaciones, citas o menciones en sistemas de IA', 'Una cantidad de pacientes o solicitudes', 'Resultados clínicos o comerciales'].map(x => <li key={x}>{x}</li>)}</ul><p className="hub-boundaries-note">La página no sustituye sistemas clínicos, asesoría médica ni obligaciones profesionales o regulatorias.</p></div>
    </section>
    <section id="preguntas" className="med-section hub-faq-section"><div className="med-container">
      <Heading label="12 / Antes de elegir" title="Preguntas frecuentes sobre páginas web para médicos" />
      <div className="med-faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      <a className="med-text-link hub-faq-contact" href={whatsapp}>Cuéntanos qué necesitas resolver<ArrowRight size={17} aria-hidden="true" /></a>
    </div></section>
    <section className="fx-dark lf-final med-section hub-final"><ConvergenceField flow="inward" className="fx-field" /><div className="med-container">
      <span className="med-eyebrow">Una página acorde a tu práctica</span><h2>Empecemos por lo que tu práctica necesita explicar</h2>
      <p>Cuéntanos si quieres crear o actualizar una página, presentar mejor tu práctica, facilitar solicitudes de contacto o revisar el posicionamiento de un sitio que ya tienes. Con esa información podemos orientarte hacia la ruta adecuada.</p>
      <div className="med-actions"><CTA>Quiero crear o actualizar mi página</CTA><CTA href="/seo-local-para-medicos/" secondary>Ya tengo sitio; quiero revisar mi presencia local</CTA></div>
    </div></section>
    <aside className="med-container hub-responsibility"><ShieldCheck size={22} aria-hidden="true" /><p>RAUVIA desarrolla infraestructura y presencia digital. La información médica, profesional y regulatoria publicada en cada proyecto debe ser proporcionada y validada por el profesional responsable.</p></aside>
    <nav className="med-container med-related" aria-label="Soluciones y recursos relacionados"><p>Explora las alternativas para tu presencia profesional.</p><div><Link to={freePath}>Página web gratis para médicos</Link><Link to="/pagina-web-para-medicos-especialistas/">Página para especialistas</Link><Link to="/seo-local-para-medicos/">SEO local para médicos</Link><Link to="/frente-comercial/">Frente Comercial</Link><Link to="/soluciones/">Soluciones RAUVIA</Link><Link to="/recursos/">Recursos y perspectivas</Link></div></nav>
  </div>;
}
