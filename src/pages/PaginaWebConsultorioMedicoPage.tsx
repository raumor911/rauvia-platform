import RouteSEO from '../seo/PageMetadata';
import React, { useRef } from 'react';
import ConvergenceField from '../components/ConvergenceField';
import usePageFx from '../hooks/usePageFx';
import '../styles/pageFrontier.css';
import '../styles/landingFx.css';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Plus, UsersRound, Stethoscope, MapPin, MessageCircle, CalendarDays, Clock3, Phone, FileText, Search, Network, ShieldCheck, Building2, Compass, Layers3, UserRound } from 'lucide-react';
import { ENTITIES } from '../config/entity';
import './PaginaWebGratisMedicosPage.css';
import './PaginaWebMedicosPage.css';
import './PaginaWebConsultorioMedicoPage.css';

const canonical = 'https://rauvia.com.mx/pagina-web-para-consultorio-medico/';
const ogDescription = 'Organiza la presencia digital de tu consultorio con información clara sobre ubicación, especialistas, horarios y formas de contacto.';
const whatsapp = 'https://wa.me/525586494076?text=Hola%20RAUVIA%2C%20quiero%20cotizar%20una%20p%C3%A1gina%20web%20para%20mi%20consultorio.%20Me%20gustar%C3%ADa%20definir%20el%20alcance%20seg%C3%BAn%20profesionales%2C%20sedes%20y%20forma%20de%20recibir%20solicitudes%20de%20cita.';
const parentPath = '/pagina-web-para-medicos/';
const images = {
  'pagina-consultorio-medico': ['Ejemplo conceptual de página web para consultorio médico con especialidades, profesionales, ubicación, horarios y solicitud de cita.', 1600, 900],
  'consultorio-medicos-especialidades': ['Consultorio médico ficticio conectando profesionales, especialidades, ubicación, horarios, agenda y contacto.', 1600, 900],
  'ubicacion-consultorio-medico': ['Ejemplo conceptual de ubicación de consultorio médico con mapa estilizado, dirección, horarios y referencias de llegada.', 1600, 900],
  'agenda-contacto-consultorio': ['Ejemplo conceptual de solicitud de cita y contacto de un consultorio con selección de especialidad, profesional y horario.', 1600, 900],
  'multiples-medicos-consultorio': ['Presentación ficticia de tres profesionales de dermatología, medicina interna y nutrición en un mismo consultorio.', 1600, 900],
  'multiples-ubicaciones-medicas': ['Ejemplo conceptual de un consultorio con varias ubicaciones, cada una con dirección, horarios, profesionales y contacto.', 1600, 900],
  'consultorio-desktop-mobile': ['Página de consultorio médico ficticio mostrada en computadora, portátil y teléfono con profesionales y ubicación.', 1600, 900],
  'consultorio-basico-vs-profesional': ['Comparación conceptual entre información básica y presencia organizada de un consultorio médico.', 1600, 900],
  'seo-geo-consultorio-medico': ['Diagrama conceptual de relaciones entre consultorio, ubicación, profesionales, especialidades, horarios, agenda, contenido y contacto.', 1600, 900],
  'frente-comercial-consultorio': ['Concepto de Frente Comercial para consultorio con sitio, profesionales, especialidades, agenda, contacto, contenido y medición ilustrativa.', 1600, 900],
} as const;
type ImageName = keyof typeof images;
const imagePath = (name: string) => `/images/consultorio-medico/mockup-${name}.webp`;
const faqs = [
  ['¿Qué debe incluir una página web para un consultorio médico?', 'Como base, puede presentar nombre, ubicación, horarios, profesionales, especialidades y contacto. Según el alcance, también puede incluir perfiles, mapas, preguntas frecuentes y una vía para solicitar una cita.'],
  ['¿Puedo mostrar varios médicos en la misma página?', 'Sí. El sitio puede presentar al equipo y una ficha por profesional, con información proporcionada y validada por cada responsable.'],
  ['¿Puedo incluir diferentes especialidades?', 'Sí. Cada área de atención puede relacionarse con los profesionales que la ofrecen, sus sedes, horarios y canales de contacto.'],
  ['¿Puedo tener más de una ubicación?', 'Sí. Se pueden organizar varias sedes con su dirección, mapa, horarios, profesionales y contacto correspondientes, según el alcance acordado.'],
  ['¿La página puede mostrar horarios diferentes para cada médico?', 'Sí. Puede distinguir el horario general del consultorio del horario de cada profesional. El equipo responsable deberá revisar y actualizar los datos.'],
  ['¿Puedo incluir una agenda de citas?', 'Sí, según el alcance: puede ser una solicitud de cita o una integración de agenda. Solicitar no equivale a confirmar; el consultorio define quién revisa la disponibilidad, da seguimiento y comunica confirmaciones o cambios.'],
  ['¿Puedo agregar teléfono y mensajería?', 'Sí. Pueden incluirse teléfono, mensajería o formulario según los canales y el alcance acordados. Para el primer contacto, evita solicitar datos clínicos o información de pacientes.'],
  ['¿La página ayuda al SEO local y a que la IA entienda mi consultorio?', 'Puede organizar información sobre profesionales, especialidades, sedes y contacto para ponerla a disposición de buscadores y sistemas de IA. Eso no garantiza posiciones, menciones ni pacientes. Una auditoría SEO para IA es un servicio independiente y no está incluida automáticamente.'],
  ['¿Qué diferencia existe entre una página para médico y una página para consultorio?', 'La primera se centra en un profesional y su práctica individual. La segunda reúne información del lugar, el equipo, las especialidades y las sedes, y puede enlazar perfiles profesionales.'],
  ['¿Cuánto cuesta una página web para un consultorio médico?', 'Se cotiza según el alcance: número de profesionales, especialidades y sedes, contenido e integraciones. No se presenta un precio fijo aquí. Cuéntanos cómo funciona tu consultorio para definir una propuesta; no envíes datos clínicos ni información de pacientes.'],
] as const;
const questions = [
  [MapPin, '¿Dónde está?', 'Dirección, zona y referencias de cada sede.'],
  [UsersRound, '¿Quién atiende?', 'Médicos y otros profesionales del consultorio.'],
  [Stethoscope, '¿Qué especialidades hay?', 'Áreas de atención y profesionales relacionados.'],
  [Clock3, '¿Cuándo atienden?', 'Horario general y horarios por profesional, cuando corresponda.'],
  [CalendarDays, '¿Cómo solicito una cita?', 'Teléfono, mensajería, formulario o agenda, según el alcance acordado.'],
  [Compass, '¿Cómo llego?', 'Mapa y referencias proporcionadas por el consultorio.'],
] as const;
const connections = [[MapPin, 'Ubicación'], [UsersRound, 'Médicos'], [Stethoscope, 'Especialidades'], [Clock3, 'Horarios'], [CalendarDays, 'Agenda'], [MessageCircle, 'Contacto'], [MessageCircle, 'Preguntas frecuentes'], [FileText, 'Contenido']] as const;
const contactOptions = [[CalendarDays, 'Solicitud de cita'], [Phone, 'Teléfono'], [MessageCircle, 'Mensaje'], [FileText, 'Formulario'], [Clock3, 'Horarios']] as const;
const professionals = [
  { name: 'Dra. Mariana Vega', specialty: 'Dermatología', schedule: 'Lunes a viernes · 9:00–14:00', profile: 'Ejemplo de perfil vinculado al área de dermatología del consultorio.', context: 'Una ficha puede reunir formación, trayectoria, área de atención, sede y vía de contacto. En un proyecto real, el profesional responsable valida sus datos.' },
  { name: 'Dr. Luis Herrera', specialty: 'Medicina interna', schedule: 'Lunes a viernes · 9:00–19:00', profile: 'Ejemplo de perfil vinculado al área de medicina interna del consultorio.', context: 'Cada ficha puede mostrar horarios propios, distintos del horario general. Los datos reales deben ser validados por el profesional responsable.' },
  { name: 'Lic. Sofía Torres', specialty: 'Nutrición', schedule: 'Lunes a sábado · 9:00–15:00', profile: 'Ejemplo de perfil vinculado al área de nutrición del consultorio.', context: 'El perfil puede relacionar el área de atención con las sedes y canales correspondientes. Los datos reales deben ser validados por la profesional responsable.' },
] as const;
const solutions = [
  { icon: UserRound, heading: 'Soy médico y quiero mi propia página', text: 'Una presencia centrada en tu perfil y práctica individual.', cta: 'Ver página web para médicos', href: parentPath },
  { icon: Stethoscope, heading: 'Soy especialista', text: 'Una presentación con contexto sobre tu especialidad, formación y trayectoria.', cta: 'Ver página para especialistas', href: '/pagina-web-para-medicos-especialistas/' },
  { icon: Building2, heading: 'Quiero conocer la opción gratuita', text: 'Consulta el alcance y las condiciones de la opción básica para médicos bajo dominio RAUVIA.', cta: 'Ver página web gratis', href: '/pagina-web-gratis-para-medicos/' },
  { icon: Compass, heading: 'Quiero ordenar mi presencia local', text: 'Conoce una solución enfocada en la relación entre especialidad, ubicación, sitio y contacto.', cta: 'Conocer SEO local para médicos', href: '/seo-local-para-medicos/' },
] as const;
function CTA({ children = 'Cotizar la página de mi consultorio', href = whatsapp, secondary = false }: { children?: React.ReactNode; href?: string; secondary?: boolean }) {
  const className = `med-button${secondary ? ' med-button-secondary' : ''}`;
  const content = <>{children}<ArrowRight size={17} aria-hidden="true" /></>;
  return href.startsWith('/') ? <Link className={className} to={href}>{content}</Link> : <a className={className} href={href}>{content}</a>;
}
function Heading({ label, title: heading, text }: { label: string; title: string; text?: string }) {
  return <div className="med-heading"><span className="med-eyebrow">{label}</span><h2>{heading}</h2>{text && <p>{text}</p>}</div>;
}
function Mockup({ name, hero = false }: { name: ImageName; hero?: boolean }) {
  const [alt, width, height] = images[name];
  return <img src={imagePath(name)} srcSet={`${imagePath(`${name}-small`)} 800w, ${imagePath(name)} ${width}w`} sizes={hero ? '(max-width: 900px) calc(100vw - 36px), (max-width: 1300px) 48vw, 620px' : '(max-width: 700px) calc(100vw - 36px), (max-width: 1300px) 92vw, 1240px'} width={width} height={height} alt={alt} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} decoding="async" />;
}
function Figure({ name, caption }: { name: ImageName; caption: string }) {
  return <figure className="hub-figure"><a href={imagePath(name)} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagen: ${images[name][0]} (abre en otra pestaña)`}><Mockup name={name} /><span className="hub-enlarge">Ampliar ejemplo <ArrowUpRight size={14} aria-hidden="true" /></span></a><figcaption>{caption}</figcaption></figure>;
}
export default function PaginaWebConsultorioMedicoPage() {
  const root = useRef<HTMLElement>(null);
  usePageFx(root);
  return <div ref={root as any} className="fx-page lf-page med-landing hub-landing cons-landing">
<div className="fx-progress" aria-hidden="true" />
    <RouteSEO path="/pagina-web-para-consultorio-medico" />
    
    <div className="hub-topbar med-container">
      <nav className="hub-breadcrumb" aria-label="Ruta de navegación"><Link to="/">RAUVIA</Link><span aria-hidden="true">/</span><Link to="/soluciones/">Soluciones</Link><span aria-hidden="true">/</span><Link to={parentPath}>Página web para médicos</Link><span aria-hidden="true">/</span><span aria-current="page">Consultorio médico</span></nav>
      <nav className="hub-sections" aria-label="Secciones de la página"><a href="#profesionales">Profesionales</a><a href="#ubicacion">Ubicación</a><a href="#preguntas">Preguntas</a></nav>
    </div>
    <section className="fx-hero lf-hero hub-hero"><ConvergenceField origin={[0.74, 0.5]} className="fx-field" /><div className="med-container hub-hero-grid">
      <div className="hub-hero-copy"><span className="med-eyebrow">Una página propia para tu consultorio</span><h1>Página web para consultorio médico: <span>presenta tu equipo, sedes y formas de contacto</span></h1>
        <p className="hub-lead">RAUVIA desarrolla páginas web para consultorios médicos que reúnen profesionales, especialidades, ubicaciones, horarios y formas de contacto. Organizamos esa información para las personas que visitan tu sitio y la ponemos a disposición de buscadores y asistentes de IA. Las funciones e integraciones se definen según el alcance acordado.</p>
        <ul className="cons-hero-benefits"><li><Check size={15} aria-hidden="true" />Médicos y áreas de atención en un mismo lugar.</li><li><Check size={15} aria-hidden="true" />Ubicación y horarios fáciles de consultar.</li><li><Check size={15} aria-hidden="true" />Un canal claro para solicitar información o una cita.</li></ul>
        <div className="med-actions"><CTA /><Link className="med-text-link" to={parentPath}>Ver página web para médicos <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <p className="hub-micro">Para preparar una cotización, cuéntanos cuántos profesionales y sedes quieres presentar y cómo reciben solicitudes de cita. No compartas datos clínicos ni información de pacientes.</p>
        <Link className="med-text-link" to="/pagina-web-medicos-agenda-whatsapp/">Comparar solicitud de citas y agenda con WhatsApp <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="hub-hero-visual"><div className="hub-visual-label"><span>Un consultorio. Su información en un solo lugar.</span><span>Ejemplo conceptual</span></div><Mockup name="pagina-consultorio-medico" hero /><div className="hub-visual-footer"><span><UsersRound size={15} aria-hidden="true" />Profesionales</span><span><MapPin size={15} aria-hidden="true" />Ubicación</span><span><CalendarDays size={15} aria-hidden="true" />Agenda</span></div><p className="hub-image-note">Consultorio Áurea, profesionales, datos y horarios ficticios.</p></div>
    </div><div className="med-container hub-signals">Ubicación <span>·</span> Especialidades <span>·</span> Médicos <span>·</span> Horarios <span>·</span> Agenda</div></section>
    <section className="med-container hub-intro" aria-label="Qué hacemos y para quién"><p>Una <strong>página web para consultorio médico</strong> presenta qué servicios se ofrecen, quiénes atienden, dónde se encuentra cada sede y cómo contactar al equipo. Puede incluir perfiles, horarios y opciones para solicitar una cita, según el alcance acordado.</p><p>Es una base para consultorios con uno o varios profesionales, distintas especialidades o varias ubicaciones. La información se organiza de acuerdo con la operación real de cada práctica.</p></section>
    <section className="med-section med-container"><Heading label="01 / Antes de contactar" title="Un consultorio necesita explicar más que una dirección" />
      <div className="cons-problem-grid">{['Qué especialidades ofrece', 'Qué profesionales atienden', 'Dónde se encuentra cada sede', 'Cuáles son los horarios', 'Cómo solicitar una cita', 'Cómo llegar', 'Qué información práctica consultar antes de asistir'].map((x, i) => <article key={x}><span>{String(i+1).padStart(2,'0')}</span><h3>{x}</h3></article>)}</div>
      <p className="hub-closing">Cuando estos datos están repartidos entre redes, mapas, directorios y mensajes, puede ser difícil saber cuál consultar.</p><p className="cons-emphasis">Una página propia puede reunirlos y relacionarlos.</p>
    </section>
    <section className="med-section hub-tint"><div className="med-container"><Heading label="02 / Información que orienta" title="Las preguntas que tu página puede responder" />
      <div className="med-grid med-grid-three hub-question-grid">{questions.map(([Icon, heading, text]) => <article className="med-card" key={heading}><Icon size={24} aria-hidden="true" /><h3>{heading}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="03 / El consultorio como punto central" title="Una página para conectar la información de tu consultorio" text="El sitio puede relacionar el lugar, las personas que atienden y los datos que una persona necesita para ponerse en contacto." />
      <div className="cons-entity"><div className="cons-entity-center"><Building2 size={27} aria-hidden="true" /><h3>Consultorio</h3><p>Identidad e información de la práctica</p></div><div className="hub-feature-grid">{connections.map(([Icon, label]) => <article key={label}><Icon size={20} aria-hidden="true" /><h3>{label}</h3></article>)}</div></div>
      <Figure name="consultorio-medicos-especialidades" caption="Ejemplo conceptual de Consultorio Áurea. El lugar, los profesionales, especialidades y canales son ficticios; no representa un cliente real." />
    </section>
    <section id="profesionales" className="med-section hub-showcase"><div className="med-container"><Heading label="04 / Quienes forman parte de tu práctica" title="Presenta a los profesionales de tu consultorio" text="Cada profesional puede contar con una ficha vinculada a su área de atención, sede y horarios. La información real debe ser proporcionada y validada por la persona responsable." />
      <Figure name="multiples-medicos-consultorio" caption="Tres profesionales ficticios en el ejemplo: Mariana Vega, Luis Herrera y Sofía Torres. Sus fotografías, perfiles y horarios son ilustrativos." />
      <div className="med-grid med-grid-three cons-professionals">{professionals.map(({name,specialty,schedule,profile,context}) => <article key={name}><span className="med-eyebrow">Perfil ficticio · ejemplo</span><h3>{name}</h3><span className="cons-specialty">{specialty}</span><p>{profile}</p><div className="cons-schedule"><Clock3 size={16} aria-hidden="true" /><span>Horario ilustrativo<br />{schedule}</span></div><details><summary>Ver perfil <Plus size={16} aria-hidden="true" /></summary><p>{context}</p></details></article>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="05 / Áreas de atención conectadas" title="Organiza las especialidades y áreas de atención" text="Cada área puede relacionarse con los profesionales que la ofrecen, sus horarios, información práctica y una vía de contacto. Así se explica cómo se organiza el consultorio." />
      <div className="cons-specialties">{['Dermatología','Medicina interna','Nutrición'].map(x => <article key={x}><Stethoscope size={24} aria-hidden="true" /><h3>{x}</h3><span className="med-eyebrow">Ejemplo de área</span><ul>{['Profesional responsable','Horarios por profesional','Información de la consulta','Canal para solicitar información'].map(y => <li key={y}><Check size={14} aria-hidden="true" />{y}</li>)}</ul></article>)}</div>
      <p className="hub-closing">Las áreas mostradas son ejemplos. En tu página se incluirán las que ofrece tu consultorio, con información proporcionada y validada por sus responsables.</p>
    </section>
    <section id="ubicacion" className="med-section hub-tint"><div className="med-container"><Heading label="06 / Ubicación y presencia local" title="Explica dónde está cada consultorio y cómo llegar" text="La página puede relacionar cada ubicación con las especialidades y profesionales que atienden allí, además de sus horarios y referencias." />
      <Figure name="ubicacion-consultorio-medico" caption="Dirección, mapa estilizado, horarios y referencias ficticios. Los botones dibujados no llevan a un consultorio real." />
      <div className="cons-location-example"><span className="med-eyebrow">Ficha ilustrativa · Consultorio Áurea</span><div><article><h3>Ubicación</h3><p>Av. Lomas Verdes 123, Consultorio 402, Torre Médica.<br />Naucalpan, Estado de México.</p></article><article><h3>Horarios</h3><p>Lunes a viernes · 9:00–19:00.<br />Sábado · 9:00–14:00.</p></article><article><h3>Referencias</h3><p>Mapa, acceso y estacionamiento según los datos validados del lugar.</p></article></div><span className="cons-example-note">En tu proyecto, «Cómo llegar» y «Solicitar cita» pueden dirigir al mapa y al canal real acordados con el consultorio. Aquí son parte de un ejemplo ficticio.</span></div>
      <Link className="med-text-link cons-context" to="/seo-local-para-medicos/">Conocer SEO local para médicos <ArrowRight size={17} aria-hidden="true" /></Link>
    </div></section>
    <section className="med-section med-container"><Heading label="07 / Un siguiente paso sencillo" title="Ofrece una forma clara de solicitar una cita" text="Una persona puede consultar horarios y elegir el canal de contacto disponible. La herramienta y el proceso de atención se definen con el equipo del consultorio." />
      <div className="cons-contact-grid">{contactOptions.map(([Icon,label]) => <article key={label}><Icon size={21} aria-hidden="true" /><h3>{label}</h3></article>)}</div>
      <Figure name="agenda-contacto-consultorio" caption="Flujo ilustrativo de agenda y contacto. Solicitar una cita no significa que esté confirmada: el consultorio debe revisar disponibilidad y comunicar la confirmación." />
      <p className="hub-closing">Puede contemplarse una solicitud sencilla o una integración de agenda, según el alcance acordado. Definiremos qué canal se usará, quién dará seguimiento y cómo se confirmarán o modificarán las citas. Para el primer contacto, no se deben solicitar datos clínicos.</p>
      <Link className="med-text-link cons-context" to="/pagina-web-medicos-agenda-whatsapp/">Conocer solicitud de citas y contacto por WhatsApp <ArrowRight size={17} aria-hidden="true" /></Link>
    </section>
    <section className="med-section hub-tint"><div className="med-container"><Heading label="08 / Una práctica, distintas sedes" title="¿Atiendes en más de una ubicación?" text="La página puede separar la información de cada sede y relacionarla con los profesionales que atienden en ella." />
      <div className="cons-branches">{['Consultorio 1','Consultorio 2','Consultorio 3'].map((x,i) => <article key={x}><span>0{i+1}</span><h3>{x}</h3><p>Dirección · Horarios · Profesionales · Contacto · Mapa</p></article>)}</div>
      <Figure name="multiples-ubicaciones-medicas" caption="Ejemplo ficticio con sedes en Lomas Verdes, Satélite y Polanco. Tu página incluiría solo las ubicaciones que correspondan a tu práctica." />
    </div></section>
    <section className="med-section hub-showcase"><div className="med-container"><Heading label="09 / La misma identidad en cada pantalla" title="La información del consultorio en computadora y teléfono" text="Inicio, especialidades, perfiles, ubicación, agenda y contacto pueden compartir una identidad visual y adaptarse a distintos tamaños de pantalla, según el diseño acordado." />
      <Figure name="consultorio-desktop-mobile" caption="Presentación conceptual en computadora, portátil y teléfono; perfiles y accesos ilustrativos." /><div className="hub-showcase-tags">{['Inicio','Especialidades','Perfiles','Ubicación','Agenda','Contacto'].map(x => <span key={x}><Check size={14} aria-hidden="true" />{x}</span>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="10 / Según tu etapa" title="El alcance depende de la información que necesitas presentar" />
      <div className="hub-comparison"><article><span className="med-eyebrow">Una base para comenzar</span><h3>Presencia básica</h3><ul>{['Nombre','Dirección','Teléfono'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article><article><span className="med-eyebrow">Más contexto sobre la práctica</span><h3>Presencia organizada</h3><ul>{['Nombre del consultorio','Ubicación','Horarios','Médicos','Especialidades','Perfiles profesionales','Agenda','Contacto','Preguntas frecuentes','Contenido','Base SEO/GEO'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article></div>
      <p className="hub-closing">Estas son formas conceptuales de organizar información, no paquetes ni listas de funciones incluidas. El alcance, la agenda y las integraciones se acuerdan para cada proyecto.</p><Figure name="consultorio-basico-vs-profesional" caption="Comparación conceptual; no es un antes y después de un consultorio real ni muestra resultados obtenidos." />
    </section>
    <section className="med-section hub-tint"><div className="med-container"><Heading label="11 / Relaciones fáciles de interpretar" title="Tu consultorio, con información clara para buscadores y asistentes de IA" />
      <div className="hub-seo-grid"><article><Search size={24} aria-hidden="true" /><h3>SEO: información para buscadores</h3><p>Títulos, secciones y enlaces pueden organizar la información del consultorio: quiénes atienden, qué áreas de atención ofrecen y en qué ubicaciones. Trabajamos con datos reales proporcionados y validados por sus responsables.</p></article><article><Network size={24} aria-hidden="true" /><h3>GEO: contexto sobre la práctica</h3><p>El contenido relaciona profesionales, especialidades, sedes, horarios y contacto para poner ese contexto a disposición de buscadores y sistemas de IA. Cada sistema decide qué información consultar y cómo utilizarla.</p></article></div>
      <ol className="hub-flow cons-relations" aria-label="Relaciones de información del consultorio">{['Consultorio','Ubicación','Especialidad','Médico','Horario','Contacto'].map((x,i) => <li key={x}><span>0{i+1}</span>{x}</li>)}</ol>
      <Figure name="seo-geo-consultorio-medico" caption="Diagrama conceptual de entidades y relaciones. Las conexiones representan estructura, no posiciones o recomendaciones obtenidas." />
      <p className="hub-closing">La estructura de la página se define en el proyecto de tu consultorio. Si ya tienes un sitio y quieres revisar qué información puede consultarse y cómo se presenta tu práctica, RAUVIA ofrece una <strong>auditoría SEO para IA</strong> como servicio independiente. La auditoría entrega hallazgos y un plan; no modifica tu sitio. Una implementación posterior se acuerda por separado.</p>
      <Link className="med-text-link cons-context" to="/seo-ai/">Conocer SEO para IA <ArrowRight size={17} aria-hidden="true" /></Link>
      <p className="hub-closing">No se garantizan posiciones en buscadores, menciones, citas de fuentes ni recomendaciones de sistemas de IA, captación de pacientes o resultados comerciales o clínicos.</p>
    </div></section>
    <section className="med-section med-container"><Heading label="12 / Para prácticas que necesitan claridad" title="¿Para qué tipo de práctica puede funcionar?" />
      <div className="hub-audience-grid">{['Médico con consultorio propio','Dos o más médicos que comparten consultorio','Consultorio con varias especialidades','Profesionales con horarios diferentes','Prácticas que usan redes sociales o directorios','Consultorios que necesitan organizar su información digital'].map((x,i) => <article key={x}><span>0{i+1}</span><h3>{x}</h3></article>)}</div>
    </section>
    <section id="soluciones" className="med-section hub-tint"><div className="med-container"><Heading label="13 / Elige según tu necesidad" title="Elige la presencia que corresponde a tu práctica" text="La página para consultorio presenta el lugar, las sedes y el equipo. Estas soluciones relacionadas tienen alcances propios." />
      <div className="hub-solution-grid">{solutions.map(({icon:Icon,heading,text,cta,href},i) => <article key={heading}><div className="hub-solution-top"><Icon size={25} aria-hidden="true" /><span>0{i+1}</span></div><h3>{heading}</h3><p>{text}</p><Link className="med-text-link" to={href}>{cta}<ArrowRight size={17} aria-hidden="true" /></Link></article>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="14 / Cuando necesitas integrar más" title="Cuando tu práctica necesita un alcance más amplio" text="Frente Comercial puede ayudarte a organizar la presentación digital de tu consultorio: qué ofrece, quiénes atienden, dónde se encuentra y cómo puede avanzar una persona interesada. Según el alcance acordado, el proyecto puede contemplar sitio, perfiles, ubicaciones, contacto, contenido y estructura SEO/GEO; la agenda, la medición y las integraciones se definen para cada proyecto." />
      <p className="hub-closing">La auditoría SEO para IA es un servicio independiente: no está incluida automáticamente en la página ni en Frente Comercial. Puedes solicitarla para un sitio existente sin contratar el desarrollo de otro.</p>
      <div className="cons-front-line"><Layers3 size={26} aria-hidden="true" /><strong>Cotización según alcance</strong><CTA href="/frente-comercial/" secondary>Conocer Frente Comercial</CTA></div>
      <Figure name="frente-comercial-consultorio" caption="Ejemplo conceptual de un alcance integrado. Gráficas y métricas ilustrativas; no representan resultados reales. Agenda e integraciones sujetas al alcance acordado." />
    </section>
    <section id="preguntas" className="med-section hub-faq-section"><div className="med-container"><Heading label="15 / Antes de definir el alcance" title="Preguntas frecuentes sobre páginas web para consultorios médicos" />
      <div className="med-faq">{faqs.map(([question,answer]) => <details key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div><a className="med-text-link hub-faq-contact" href={whatsapp}>Cuéntanos cómo funciona tu consultorio <ArrowRight size={17} aria-hidden="true" /></a>
    </div></section>
    <section className="fx-dark lf-final med-section hub-final"><ConvergenceField flow="inward" className="fx-field" /><div className="med-container"><span className="med-eyebrow">Tu consultorio, explicado con claridad</span><h2>Organiza la presencia digital de tu consultorio</h2><p>Cuéntanos cuántos profesionales y sedes necesitas presentar y cómo reciben solicitudes de cita. No compartas datos clínicos ni información de pacientes.</p><p>Podemos ayudarte a definir una página web para consultorio médico que reúna equipo, ubicaciones, horarios y formas de contacto, según el alcance acordado. Si ya cuentas con un sitio y quieres revisar su información para buscadores y asistentes de IA, conoce también nuestro servicio independiente de SEO para IA.</p><div className="med-actions"><CTA /><CTA href={parentPath} secondary>Ver página web para médicos</CTA></div></div></section>
    <aside className="med-container hub-responsibility"><ShieldCheck size={22} aria-hidden="true" /><p>RAUVIA desarrolla infraestructura y presencia digital. La información médica, profesional y regulatoria publicada en cada proyecto debe ser proporcionada y validada por los profesionales responsables.</p></aside>
    <nav className="med-container med-related" aria-label="Soluciones y recursos relacionados"><p>Explora las alternativas para tu presencia digital.</p><div><Link to={parentPath}>Página web para médicos</Link><Link to="/pagina-web-gratis-para-medicos/">Página web gratis para médicos</Link><Link to="/pagina-web-para-medicos-especialistas/">Página para especialistas</Link><Link to="/seo-local-para-medicos/">SEO local para médicos</Link><Link to="/frente-comercial/">Frente Comercial</Link><Link to="/soluciones/">Soluciones RAUVIA</Link><Link to="/recursos/">Recursos y perspectivas</Link></div></nav>
  </div>;
}
