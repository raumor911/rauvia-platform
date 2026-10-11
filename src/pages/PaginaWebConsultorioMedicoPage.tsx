import RouteSEO from '../seo/PageMetadata';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Plus, UsersRound, Stethoscope, MapPin, MessageCircle, CalendarDays, Clock3, Phone, FileText, Search, Network, ShieldCheck, Building2, Compass, Layers3, UserRound } from 'lucide-react';
import { ENTITIES } from '../config/entity';
import './PaginaWebGratisMedicosPage.css';
import './PaginaWebMedicosPage.css';
import './PaginaWebConsultorioMedicoPage.css';

const canonical = 'https://rauvia.com.mx/pagina-web-para-consultorio-medico/';
const ogDescription = 'Organiza la presencia digital de tu consultorio con información clara sobre ubicación, especialistas, horarios y formas de contacto.';
const whatsapp = 'https://wa.me/525518519173?text=Hola%20RAUVIA,%20quiero%20informaci%C3%B3n%20para%20crear%20una%20p%C3%A1gina%20web%20para%20mi%20consultorio%20m%C3%A9dico.';
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
  ['¿Qué debe incluir una página web para un consultorio médico?', 'El nombre del consultorio, ubicación, horarios, profesionales, especialidades y una forma clara de contacto. Según el alcance, puede incorporar perfiles, solicitud de cita, mapas, preguntas frecuentes e información práctica antes de asistir.'],
  ['¿Puedo mostrar varios médicos en la misma página?', 'Sí. Se puede organizar el equipo del consultorio y presentar un perfil para cada profesional, con información proporcionada y validada por sus responsables.'],
  ['¿Puedo incluir diferentes especialidades?', 'Sí. Cada área de atención puede relacionarse con los profesionales que la ofrecen, sus horarios, información relevante y canales de contacto.'],
  ['¿Puedo tener más de una ubicación?', 'Sí. La arquitectura puede contemplar varias sedes, cada una con dirección, mapa, horarios, profesionales y formas de contacto.'],
  ['¿La página puede mostrar horarios diferentes para cada médico?', 'Sí. Podemos distinguir el horario general del consultorio de los horarios de cada profesional. El equipo responsable debe mantener esa información actualizada.'],
  ['¿Puedo incluir una agenda de citas?', 'Sí, según el alcance. Puede ser una solicitud de cita o una integración con una herramienta de agenda. La disponibilidad, confirmación y gestión de cambios se definen con el consultorio.'],
  ['¿Puedo agregar teléfono y mensajería?', 'Sí. Se pueden incluir teléfono, mensajería y formulario, según los canales de atención del consultorio, con indicaciones claras para el primer contacto.'],
  ['¿Una página de consultorio ayuda al SEO local?', 'Puede aportar una base para organizar la relación entre consultorio, especialidades, profesionales y ubicación. El posicionamiento depende de varios factores y no se garantizan posiciones específicas.'],
  ['¿Qué diferencia existe entre una página para médico y una página para consultorio?', 'La página para médico se centra en su perfil y práctica individual. La página para consultorio reúne información del lugar, equipo, especialidades, horarios y sedes, y puede enlazar los perfiles de quienes atienden allí.'],
  ['¿Cuánto cuesta una página web para un consultorio médico?', 'Depende del alcance: número de profesionales, especialidades, sedes, contenido e integraciones. Los proyectos se cotizan según alcance. Cuéntanos cómo funciona tu consultorio para identificar qué necesita su página.'],
] as const;
const questions = [
  [MapPin, '¿Dónde está?', 'Dirección, zona y referencias.'],
  [UsersRound, '¿Quién atiende?', 'Médicos y profesionales disponibles.'],
  [Stethoscope, '¿Qué especialidades hay?', 'Áreas de atención del consultorio.'],
  [Clock3, '¿Cuándo atienden?', 'Horarios y disponibilidad general.'],
  [CalendarDays, '¿Cómo solicito una cita?', 'Agenda, formulario, teléfono o contacto.'],
  [Compass, '¿Cómo llego?', 'Mapa y referencias del consultorio.'],
] as const;
const connections = [[MapPin, 'Ubicación'], [UsersRound, 'Médicos'], [Stethoscope, 'Especialidades'], [Clock3, 'Horarios'], [CalendarDays, 'Agenda'], [MessageCircle, 'Contacto'], [MessageCircle, 'Preguntas frecuentes'], [FileText, 'Contenido']] as const;
const contactOptions = [[CalendarDays, 'Solicitud de cita'], [Phone, 'Teléfono'], [MessageCircle, 'Mensaje'], [FileText, 'Formulario'], [Clock3, 'Horarios']] as const;
const professionals = [
  { name: 'Dra. Mariana Vega', specialty: 'Dermatología', schedule: 'Lunes a viernes · 9:00–14:00', profile: 'Ejemplo de perfil profesional vinculado al área de dermatología del consultorio.', context: 'La ficha puede reunir formación, trayectoria, área de atención, sede y una vía para solicitar información.' },
  { name: 'Dr. Luis Herrera', specialty: 'Medicina interna', schedule: 'Lunes a viernes · 9:00–19:00', profile: 'Ejemplo de perfil profesional vinculado al área de medicina interna.', context: 'Cada profesional puede tener una presentación propia, con información validada y horarios distintos del horario general.' },
  { name: 'Lic. Sofía Torres', specialty: 'Nutrición', schedule: 'Lunes a sábado · 9:00–15:00', profile: 'Ejemplo de perfil profesional vinculado al área de nutrición.', context: 'El perfil puede relacionar su área de atención con las sedes y canales de contacto correspondientes.' },
] as const;
const solutions = [
  { icon: UserRound, heading: 'Soy médico y quiero mi propia página', text: 'Una presencia centrada en tu perfil profesional y tu práctica individual.', cta: 'Ver página web para médicos', href: parentPath },
  { icon: Stethoscope, heading: 'Soy especialista', text: 'Una presentación con mayor contexto sobre especialidad, formación y trayectoria.', cta: 'Ver página para especialistas', href: '/pagina-web-para-medicos-especialistas/' },
  { icon: Building2, heading: 'Quiero empezar con una página gratuita', text: 'Conoce el alcance de la opción básica para médicos bajo dominio RAUVIA.', cta: 'Ver página web gratis', href: '/pagina-web-gratis-para-medicos/' },
  { icon: Compass, heading: 'Quiero mejorar mi presencia local', text: 'Ordenar la relación entre especialidad, ubicación, sitio y contacto.', cta: 'Conocer SEO local para médicos', href: '/seo-local-para-medicos/' },
] as const;
function CTA({ children = 'Quiero una página para mi consultorio', href = whatsapp, secondary = false }: { children?: React.ReactNode; href?: string; secondary?: boolean }) {
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
  return <div className="med-landing hub-landing cons-landing">
    <RouteSEO path="/pagina-web-para-consultorio-medico" />
    
    <div className="hub-topbar med-container">
      <nav className="hub-breadcrumb" aria-label="Ruta de navegación"><Link to="/">RAUVIA</Link><span aria-hidden="true">/</span><Link to="/soluciones/">Soluciones</Link><span aria-hidden="true">/</span><Link to={parentPath}>Página web para médicos</Link><span aria-hidden="true">/</span><span aria-current="page">Consultorio médico</span></nav>
      <nav className="hub-sections" aria-label="Secciones de la página"><a href="#profesionales">Profesionales</a><a href="#ubicacion">Ubicación</a><a href="#preguntas">Preguntas</a></nav>
    </div>
    <section className="hub-hero"><div className="med-container hub-hero-grid">
      <div className="hub-hero-copy"><span className="med-eyebrow">Una presencia propia para tu consultorio</span><h1>Página web para consultorio médico que <span>organiza tu práctica en un solo lugar</span></h1>
        <p className="hub-lead">Presenta quién atiende, qué especialidades ofrece tu consultorio, dónde se encuentra, cuáles son sus horarios y cómo solicitar una cita.</p>
        <ul className="cons-hero-benefits"><li><Check size={15} aria-hidden="true" />Equipo y áreas de atención con contexto.</li><li><Check size={15} aria-hidden="true" />Información práctica fácil de consultar.</li><li><Check size={15} aria-hidden="true" />Un siguiente paso claro para contactar.</li></ul>
        <div className="med-actions"><CTA /><Link className="med-text-link" to={parentPath}>Ver página web para médicos <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <p className="hub-micro">Una presencia digital clara para que encontrar información sobre tu consultorio sea más sencillo.</p>
      </div>
      <div className="hub-hero-visual"><div className="hub-visual-label"><span>Un consultorio. Una presencia organizada.</span><span>Ejemplo conceptual</span></div><Mockup name="pagina-consultorio-medico" hero /><div className="hub-visual-footer"><span><UsersRound size={15} aria-hidden="true" />Profesionales</span><span><MapPin size={15} aria-hidden="true" />Ubicación</span><span><CalendarDays size={15} aria-hidden="true" />Agenda</span></div><p className="hub-image-note">Consultorio Áurea, personas, datos y horarios ficticios.</p></div>
    </div><div className="med-container hub-signals">Ubicación <span>·</span> Especialidades <span>·</span> Médicos <span>·</span> Horarios <span>·</span> Agenda</div></section>
    <section className="med-container hub-intro" aria-label="Qué hacemos y para quién"><p>En RAUVIA desarrollamos una <strong>página web para consultorio médico</strong> que reúne la información del lugar y de quienes atienden allí. Una base propia para organizar la práctica y facilitar el primer contacto.</p><p>Para consultorios con uno o varios profesionales, distintas especialidades o más de una ubicación. El alcance se adapta a cómo funciona tu consultorio.</p></section>
    <section className="med-section med-container"><Heading label="01 / Antes de contactar" title="Un consultorio necesita explicar más que una dirección" />
      <div className="cons-problem-grid">{['Qué especialidades existen', 'Qué profesionales atienden', 'Dónde está el consultorio', 'Cuándo está abierto', 'Cómo solicitar una cita', 'Cómo llegar', 'Qué considerar antes de asistir'].map((x, i) => <article key={x}><span>{String(i+1).padStart(2,'0')}</span><h3>{x}</h3></article>)}</div>
      <p className="hub-closing">Cuando esa información está repartida entre redes, mapas, directorios y mensajes, entender la práctica requiere más esfuerzo.</p><p className="cons-emphasis">Una página propia puede organizarla.</p>
    </section>
    <section className="med-section hub-tint"><div className="med-container"><Heading label="02 / Información que orienta" title="Tu página debería responder las preguntas básicas sobre el consultorio" />
      <div className="med-grid med-grid-three hub-question-grid">{questions.map(([Icon, heading, text]) => <article className="med-card" key={heading}><Icon size={24} aria-hidden="true" /><h3>{heading}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="03 / El consultorio como punto central" title="Una sola presencia para conectar toda la información de tu consultorio" text="La página funciona como punto central para organizar la información relacionada con la práctica." />
      <div className="cons-entity"><div className="cons-entity-center"><Building2 size={27} aria-hidden="true" /><h3>Consultorio</h3><p>Identidad e información de la práctica</p></div><div className="hub-feature-grid">{connections.map(([Icon, label]) => <article key={label}><Icon size={20} aria-hidden="true" /><h3>{label}</h3></article>)}</div></div>
      <Figure name="consultorio-medicos-especialidades" caption="Ejemplo conceptual de Consultorio Áurea. Profesionales, especialidades y canales relacionados con el mismo lugar; no representa un cliente real." />
    </section>
    <section id="profesionales" className="med-section hub-showcase"><div className="med-container"><Heading label="04 / Quienes forman parte de tu práctica" title="Presenta a quienes atienden en tu consultorio" text="Cada profesional puede tener una ficha propia, vinculada a su especialidad, horarios y sede. Estas fichas muestran una posible organización de la información." />
      <Figure name="multiples-medicos-consultorio" caption="Tres profesionales ficticios en el mockup: Mariana Vega, Luis Herrera y Sofía Torres. Sus fotografías, perfiles y horarios son ilustrativos." />
      <div className="med-grid med-grid-three cons-professionals">{professionals.map(({name,specialty,schedule,profile,context}) => <article key={name}><span className="med-eyebrow">Perfil ficticio · ejemplo</span><h3>{name}</h3><span className="cons-specialty">{specialty}</span><p>{profile}</p><div className="cons-schedule"><Clock3 size={16} aria-hidden="true" /><span>Horario ilustrativo<br />{schedule}</span></div><details><summary>Ver perfil <Plus size={16} aria-hidden="true" /></summary><p>{context} La información real debe ser validada por el profesional responsable.</p></details></article>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="05 / Áreas de atención conectadas" title="Organiza claramente las áreas de atención" text="Cada especialidad puede relacionarse con el profesional, sus horarios, la información relevante y una vía de contacto. El objetivo es que el visitante entienda cómo está organizada la práctica." />
      <div className="cons-specialties">{['Dermatología','Medicina interna','Nutrición'].map(x => <article key={x}><Stethoscope size={24} aria-hidden="true" /><h3>{x}</h3><span className="med-eyebrow">Ejemplo de área</span><ul>{['Profesional responsable','Horarios por profesional','Información de la consulta','Canal para solicitar información'].map(y => <li key={y}><Check size={14} aria-hidden="true" />{y}</li>)}</ul></article>)}</div>
      <p className="hub-closing">Las áreas que aparezcan en tu sitio serán las que ofrece tu consultorio, con información proporcionada y validada por sus responsables.</p>
    </section>
    <section id="ubicacion" className="med-section hub-tint"><div className="med-container"><Heading label="06 / Ubicación y presencia local" title="Haz fácil entender dónde está tu consultorio" text="La relación entre especialidad, profesional y ubicación es una parte importante de una presencia médica local clara." />
      <Figure name="ubicacion-consultorio-medico" caption="Dirección, mapa estilizado, horarios y referencias ficticios. Las indicaciones y botones dibujados son ejemplos; no ofrecen navegación a un consultorio real." />
      <div className="cons-location-example"><span className="med-eyebrow">Ficha ilustrativa · Consultorio Áurea</span><div><article><h3>Ubicación</h3><p>Av. Lomas Verdes 123, Consultorio 402, Torre Médica.<br />Naucalpan, Estado de México.</p></article><article><h3>Horarios</h3><p>Lunes a viernes · 9:00–19:00.<br />Sábado · 9:00–14:00.</p></article><article><h3>Referencias</h3><p>Mapa, acceso y estacionamiento según la información validada del lugar.</p></article></div><span className="cons-example-note">En tu proyecto, “Cómo llegar” y “Solicitar cita” pueden llevar al mapa y al canal real del consultorio. Aquí se muestran como parte del ejemplo.</span></div>
      <Link className="med-text-link cons-context" to="/seo-local-para-medicos/">Conocer SEO local para médicos <ArrowRight size={17} aria-hidden="true" /></Link>
    </div></section>
    <section className="med-section med-container"><Heading label="07 / Un siguiente paso sencillo" title="Reduce pasos entre encontrar el consultorio y solicitar una cita" text="La persona puede elegir una vía de contacto clara y consultar los horarios antes de solicitar una cita. Las herramientas se definen según cómo atiende el equipo." />
      <div className="cons-contact-grid">{contactOptions.map(([Icon,label]) => <article key={label}><Icon size={21} aria-hidden="true" /><h3>{label}</h3></article>)}</div>
      <Figure name="agenda-contacto-consultorio" caption="Flujo ilustrativo de agenda y contacto. Solicitar una cita no equivale a confirmarla; la disponibilidad y confirmación dependen del proceso del consultorio." />
      <p className="hub-closing">Puede incluir una solicitud sencilla o una integración de agenda, según alcance. El canal de atención y quién confirma cada cita se acuerdan con el equipo.</p>
      <Link className="med-text-link cons-context" to="/pagina-web-medicos-agenda-whatsapp/">Facilitar solicitudes de cita y contacto por WhatsApp <ArrowRight size={17} aria-hidden="true" /></Link>
    </section>
    <section className="med-section hub-tint"><div className="med-container"><Heading label="08 / Una práctica, distintas sedes" title="¿Atiendes en más de una ubicación?" text="La arquitectura puede contemplar varias ubicaciones sin mezclar la información de cada sede." />
      <div className="cons-branches">{['Consultorio 1','Consultorio 2','Consultorio 3'].map((x,i) => <article key={x}><span>0{i+1}</span><h3>{x}</h3><p>Dirección · Horarios · Profesionales · Formas de contacto · Mapa</p></article>)}</div>
      <Figure name="multiples-ubicaciones-medicas" caption="Ejemplo ficticio con sedes en Lomas Verdes, Satélite y Polanco. No implica que todas las prácticas necesiten varias ubicaciones." />
    </div></section>
    <section className="med-section hub-showcase"><div className="med-container"><Heading label="09 / La misma identidad en cada pantalla" title="Una experiencia consistente en computadora y teléfono" text="El inicio del consultorio, especialidades, perfiles, ubicación, agenda y contacto pueden compartir una misma identidad y un recorrido fácil de consultar." />
      <Figure name="consultorio-desktop-mobile" caption="Presentación conceptual en computadora, portátil y teléfono. Los perfiles y accesos se adaptan al tamaño de pantalla, según el diseño acordado." /><div className="hub-showcase-tags">{['Inicio','Especialidades','Perfiles','Ubicación','Agenda','Contacto'].map(x => <span key={x}><Check size={14} aria-hidden="true" />{x}</span>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="10 / Según tu etapa" title="La diferencia está en cómo se organiza la información" />
      <div className="hub-comparison"><article><span className="med-eyebrow">Una base para comenzar</span><h3>Presencia básica</h3><ul>{['Nombre','Dirección','Teléfono'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article><article><span className="med-eyebrow">Más contexto sobre la práctica</span><h3>Presencia organizada</h3><ul>{['Nombre del consultorio','Ubicación','Horarios','Médicos','Especialidades','Perfiles profesionales','Agenda','Contacto','Preguntas frecuentes','Contenido','Base SEO/GEO'].map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></article></div>
      <p className="hub-closing">El nivel adecuado depende de la etapa y complejidad de cada práctica.</p><Figure name="consultorio-basico-vs-profesional" caption="Comparación conceptual de alcances. No representa un antes y después de un consultorio real ni resultados obtenidos." />
    </section>
    <section className="med-section hub-tint"><div className="med-container"><Heading label="11 / Relaciones fáciles de interpretar" title="Ayuda a buscadores y sistemas de IA a entender mejor tu consultorio" />
      <div className="hub-seo-grid"><article><Search size={24} aria-hidden="true" /><h3>SEO: información para buscadores</h3><p>Organizar títulos, secciones y enlaces ayuda a explicar el consultorio y la información que ofrece su sitio.</p></article><article><Network size={24} aria-hidden="true" /><h3>GEO: contexto sobre la práctica</h3><p>Una estructura clara facilita que sistemas digitales interpreten cómo se relacionan el consultorio, sus profesionales, sus especialidades y su ubicación.</p></article></div>
      <ol className="hub-flow cons-relations" aria-label="Relaciones de información del consultorio">{['Consultorio','Ubicación','Especialidad','Médico','Horario','Contacto'].map((x,i) => <li key={x}><span>0{i+1}</span>{x}</li>)}</ol>
      <Figure name="seo-geo-consultorio-medico" caption="Diagrama conceptual de entidades y relaciones de la práctica. Las conexiones explican estructura; no indican posicionamiento ni recomendaciones obtenidas." />
      <p className="hub-closing">No se garantizan posiciones en buscadores, recomendaciones de asistentes de IA, cantidades de pacientes ni resultados comerciales o clínicos.</p>
    </div></section>
    <section className="med-section med-container"><Heading label="12 / Para prácticas que necesitan claridad" title="¿Para qué tipo de práctica puede funcionar?" />
      <div className="hub-audience-grid">{['Médico con consultorio propio','Dos o más médicos que comparten consultorio','Consultorio con varias especialidades','Profesionales que atienden en diferentes horarios','Prácticas que dependen de redes sociales o directorios','Consultorios que necesitan ordenar su información digital'].map((x,i) => <article key={x}><span>0{i+1}</span><h3>{x}</h3></article>)}</div>
    </section>
    <section id="soluciones" className="med-section hub-tint"><div className="med-container"><Heading label="13 / Elige según tu necesidad" title="Tu consultorio puede necesitar diferentes niveles de presencia" text="La página del consultorio organiza el lugar y el equipo. Estas otras soluciones responden a necesidades relacionadas y tienen un alcance propio." />
      <div className="hub-solution-grid">{solutions.map(({icon:Icon,heading,text,cta,href},i) => <article key={heading}><div className="hub-solution-top"><Icon size={25} aria-hidden="true" /><span>0{i+1}</span></div><h3>{heading}</h3><p>{text}</p><Link className="med-text-link" to={href}>{cta}<ArrowRight size={17} aria-hidden="true" /></Link></article>)}</div>
    </div></section>
    <section className="med-section med-container"><Heading label="14 / Cuando necesitas integrar más" title="Cuando el consultorio necesita algo más que una página" text="Frente Comercial Médico puede integrar sitio, perfiles, ubicaciones, agenda, contacto, contenido, medición y estructura SEO/GEO. Definimos los componentes según las necesidades de la práctica." />
      <div className="cons-front-line"><Layers3 size={26} aria-hidden="true" /><strong>Cotización según alcance</strong><CTA href="/frente-comercial/" secondary>Conocer Frente Comercial Médico</CTA></div>
      <Figure name="frente-comercial-consultorio" caption="Ejemplo conceptual de un alcance integrado. Gráficas y métricas ilustrativas; no representan resultados reales. Agenda e integraciones sujetas al alcance acordado." />
    </section>
    <section id="preguntas" className="med-section hub-faq-section"><div className="med-container"><Heading label="15 / Antes de definir el alcance" title="Preguntas frecuentes sobre páginas web para consultorios médicos" />
      <div className="med-faq">{faqs.map(([question,answer]) => <details key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div><a className="med-text-link hub-faq-contact" href={whatsapp}>Cuéntanos cómo funciona tu consultorio <ArrowRight size={17} aria-hidden="true" /></a>
    </div></section>
    <section className="med-section hub-final"><div className="med-container"><span className="med-eyebrow">Tu consultorio, explicado con claridad</span><h2>Organiza la presencia digital de tu consultorio</h2><p>Cuéntanos cómo funciona tu práctica y podemos ayudarte a definir qué información necesita tu página.</p><p>Una página web para consultorio médico puede reunir tu equipo, sedes y formas de contacto en una presencia propia.</p><div className="med-actions"><CTA /><CTA href={parentPath} secondary>Ver página web para médicos</CTA></div></div></section>
    <aside className="med-container hub-responsibility"><ShieldCheck size={22} aria-hidden="true" /><p>RAUVIA desarrolla infraestructura y presencia digital. La información médica, profesional y regulatoria publicada en cada proyecto debe ser proporcionada y validada por los profesionales responsables.</p></aside>
    <nav className="med-container med-related" aria-label="Soluciones y recursos relacionados"><p>Explora las alternativas para tu presencia digital.</p><div><Link to={parentPath}>Página web para médicos</Link><Link to="/pagina-web-gratis-para-medicos/">Página web gratis para médicos</Link><Link to="/pagina-web-para-medicos-especialistas/">Página para especialistas</Link><Link to="/seo-local-para-medicos/">SEO local para médicos</Link><Link to="/frente-comercial/">Frente Comercial</Link><Link to="/soluciones/">Soluciones RAUVIA</Link><Link to="/recursos/">Recursos y perspectivas</Link></div></nav>
  </div>;
}
