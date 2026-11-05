import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import WhatsAppCTA from '../components/WhatsAppCTA';
import './CasoInfraestructuraB2BPage.css';
import './CasoPresenciaProfesionalPage.css';

const method = [
  ['Comprender', 'Trayectoria, especialidad, públicos y objetivos.'],
  ['Estructurar', 'Una propuesta profesional con capacidades y evidencia.'],
  ['Materializar', 'Un sitio adecuado al perfil y a su forma de aportar.'],
  ['Facilitar el descubrimiento', 'SEO técnico, datos estructurados, enlaces y contacto.'],
];

const additionalReferences = [
  { id: 'monica', name: 'Mónica García Urrutia', specialty: 'Product Operations · Experiencia de cliente', url: 'https://monicagarcia.rauviaweb.mx/', problem: 'Una trayectoria en operaciones y atención a clientes necesita mostrar cómo sus experiencias se conectan con su evolución hacia producto.', solution: 'La presencia organiza su recorrido, habilidades y proyecto destacado, y presenta situaciones en las que puede aportar a un equipo.', details: [['Contexto', 'Perfil profesional en evolución hacia producto.'], ['Estructura', 'Trayectoria, capacidades, proyecto y perspectiva.'], ['Siguiente paso', 'Conversación sobre oportunidades profesionales.']] },
  { id: 'galenus', name: 'Consultorio Médico GALENUS', specialty: 'Salud · Consultorio con diversas especialidades', url: 'https://galenusconsultorio.rauviaweb.mx/', problem: 'Un consultorio con varias áreas de atención necesita orientar a las personas que buscan consulta, sin confundir información administrativa con valoración médica.', solution: 'El sitio presenta atención general, especialidades, servicios, ubicación y horarios, con una vía telefónica para consultar disponibilidad.', details: [['Contexto', 'Atención médica y especialidades.'], ['Estructura', 'Opciones de consulta, servicios y ubicación.'], ['Siguiente paso', 'Llamar para orientación y disponibilidad.']] },
  { id: 'antonio', name: 'Antonio Colyn', specialty: 'Fisioterapia y quiropráctica · Iztapalapa', url: 'https://antoniocolyn.rauviaweb.mx/', problem: 'Quien busca atención por molestias de espalda o cuello necesita comprender qué se puede consultar y cómo acceder a una valoración.', solution: 'La página organiza motivos de consulta, servicios, ubicación y contacto, aclarando que cada situación requiere valoración individual.', details: [['Contexto', 'Práctica local de fisioterapia y quiropráctica.'], ['Estructura', 'Motivos de consulta, servicios y ubicación.'], ['Siguiente paso', 'Consultar disponibilidad para una valoración.']] },
  { id: 'acacia', name: 'Acacia', specialty: 'Salón de fiestas · Huixquilucan', url: 'https://acacia.rauviaweb.mx/', problem: 'Al planear una celebración, las personas necesitan conocer el espacio, las opciones disponibles y cómo iniciar una consulta.', solution: 'El frente comercial reúne celebraciones, galería, paquetes, ubicación y canales de contacto para facilitar la exploración del salón.', details: [['Contexto', 'Salón para celebraciones y reuniones.'], ['Estructura', 'Espacio, celebraciones, paquetes y galería.'], ['Siguiente paso', 'Consultar el evento y su disponibilidad.']] }
];

function ReferenceSection({reference}: {reference: typeof additionalReferences[number]}) {
  return <section className="report-evidence-row pp-reference" aria-labelledby={`${reference.id}-title`}>
    <div>
      <span className="report-kicker">IMPLEMENTACIÓN DE REFERENCIA</span>
      <h2 id={`${reference.id}-title`}>{reference.name}</h2>
      <p className="pp-specialty">{reference.specialty}</p>
      <p>{reference.problem}</p>
      <p>{reference.solution}</p>
      <a className="pp-link" href={reference.url} target="_blank" rel="noopener noreferrer">Explorar el sitio de {reference.name} <ArrowRight aria-hidden="true" /></a>
    </div>
    <div className="case-findings pp-reference-map">
      {reference.details.map(([label, detail]) => <div key={label}><span>{label}</span><p>{detail}</p></div>)}
    </div>
  </section>;
}

function CapabilityCircuit() {
  return <figure className="report-circuit-panel" aria-label="Proceso de construcción de una presencia profesional">
    <figcaption className="report-kicker">DE LA TRAYECTORIA AL ACTIVO DIGITAL</figcaption>
    <ol className="case-stages pp-method">
      {method.map(([title, detail], index) => <li key={title}>
        {index > 0 && <ArrowDown aria-hidden="true" className="case-flow-arrow" />}
        <strong>{title}</strong><span>{detail}</span>
      </li>)}
    </ol>
    <p className="case-chart-note">Un método adaptable al perfil; el alcance se define con cada profesionista.</p>
  </figure>;
}

export default function CasoPresenciaProfesionalPage() {
  return <>
    <RouteSEO path="/casos/presencia-posicionamiento-profesional" />
    <main className="rauvia-case-report pp-report">
      <section className="report-hero"><div className="report-hero-inner">
        <Link className="pp-back" to="/casos/">Casos y evidencia <ArrowRight aria-hidden="true" /></Link>
        <span className="report-kicker">PROFESIONISTAS · IDENTIDAD DIGITAL · RELEVANCIA</span>
        <h1>De la experiencia profesional a una presencia que comunica capacidades</h1>
        <p>La experiencia valiosa merece ser encontrada y comprendida. RAUVIA, mediante RAUVIAWEB, transforma trayectorias, especializaciones y objetivos profesionales en activos digitales que permiten entender quién es una persona, dónde puede aportar y cómo iniciar una conversación.</p>
        <div className="report-meta">
          <div><span>Ámbito</span><span>Presencia profesional</span></div>
          <div><span>Intervención</span><span>Identidad y arquitectura digital</span></div>
          <div><span>Estado</span><span>Capacidad activa</span></div>
          <div><span>Evidencia</span><span>En construcción</span></div>
        </div>
      </div></section>

      <section className="report-blind"><div className="report-shell report-blind-grid">
        <div className="report-blind-copy"><span className="report-kicker">EL PUNTO CIEGO</span>
          <h2>La experiencia existe. Comprenderla puede requerir demasiadas piezas.</h2>
          <p>Un CV, las redes, los proyectos y las conversaciones pueden mostrar partes distintas de una misma trayectoria. Cuando esa información está dispersa, quien busca un especialista o evalúa un perfil debe reconstruir por su cuenta qué sabe hacer y para qué resulta relevante.</p>
        </div>
        <figure className="pp-blind-flow" aria-label="Información dispersa, comprensión de experiencia e identidad estructurada">
          <ul className="pp-sources"><li>CV</li><li>Redes</li><li>Proyectos</li><li>Conversaciones</li></ul>
          <ol><li><strong>Información dispersa</strong><span>Piezas de una trayectoria</span></li>
            <li><ArrowDown aria-hidden="true" /><strong>Comprensión de experiencia</strong><span>Capacidades, contexto y objetivos</span></li>
            <li><ArrowDown aria-hidden="true" /><strong>Identidad estructurada</strong><span>Una presencia que se puede consultar</span></li></ol>
          <figcaption>La intervención organiza el valor profesional para hacerlo más fácil de interpretar.</figcaption>
        </figure>
      </div></section>

      <div className="report-shell">
        <section className="report-phase-two-grid">
          <div className="report-phase-two"><span className="report-kicker">LA CAPACIDAD QUE CONSTRUIMOS</span>
            <h2>Traducir experiencia en una presencia adecuada a cada perfil</h2>
            <p>La capacidad recurrente de RAUVIAWEB comienza al comprender al profesionista: su experiencia, especialidad, objetivos y las personas que necesitan entenderlo. Esa lectura guía la arquitectura, la jerarquía de información y los recorridos del sitio.</p>
            <p>El trabajo conecta identidad, trayectoria y competencias con situaciones concretas de aportación. Después las materializa en una web accesible, con bases técnicas para su descubrimiento y continuidad hacia el contacto.</p>
            <aside className="report-finding"><p>La estructura debe responder a la experiencia y a sus públicos. La misma capacidad puede producir sitios diferentes.</p></aside>
          </div><CapabilityCircuit />
        </section>

        <section className="pp-applications"><span className="report-kicker">APLICACIONES DE LA CAPACIDAD</span>
          <h2>Una arquitectura que cambia con la práctica profesional</h2>
          <p>Estas aplicaciones describen necesidades de comunicación que podemos atender. No representan implementaciones adicionales ni resultados ya obtenidos.</p>
          <div className="pp-columns">
            <div><h3>Profesionistas independientes</h3><p>Relacionar especialidad, experiencia y formas de colaboración para que un posible cliente comprenda cuándo tiene sentido conversar.</p></div>
            <div><h3>Salud y bienestar</h3><p>Presentar formación, enfoque de atención, servicios y canales de contacto con claridad y cuidado del contexto de cada práctica.</p></div>
            <div><h3>Profesionales corporativos</h3><p>Organizar trayectoria, proyectos y competencias para facilitar la lectura del perfil por colegas, organizaciones y equipos de reclutamiento.</p></div>
          </div>
        </section>

        <section className="report-evidence-row pp-reference" aria-labelledby="referencia-title">
          <div><span className="report-kicker">IMPLEMENTACIÓN DE REFERENCIA</span>
            <h2 id="referencia-title">Erika Morales</h2>
            <p className="pp-specialty">Product Owner · IA generativa · Transformación de negocio</p>
            <p>Su sitio reúne identidad, trayectoria y competencias, y las conecta con un mapa de relevancia profesional y un espacio de perspectiva. Ilustra cómo esta capacidad se adapta a un perfil que combina producto, tecnología y negocio.</p>
            <p>La referencia demuestra una forma de organizar y comunicar experiencia. La evidencia sobre descubrimiento, contactos y oportunidades sigue en construcción.</p>
            <a className="pp-link" href="https://erikamorales.rauviaweb.mx/" target="_blank" rel="noopener noreferrer">Explorar el sitio profesional de Erika Morales <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="case-findings pp-reference-map">
            <div><span>Identidad</span><p>Especialidad y propuesta profesional explícitas.</p></div>
            <div><span>Trayectoria</span><p>Experiencia organizada para consultar su contexto.</p></div>
            <div><span>Competencias</span><p>Capacidades relacionadas con su práctica.</p></div>
            <div><span>Relevancia</span><p>Escenarios de aportación en «Cómo puedo ayudarte».</p></div>
            <div><span>Perspectiva</span><p>Criterio profesional en un espacio propio.</p></div>
          </div>
        </section>

        <section className="report-evidence-row pp-reference" aria-labelledby="allison-title">
          <div><span className="report-kicker">IMPLEMENTACIÓN DE REFERENCIA</span>
            <h2 id="allison-title">Allison García Urrutia</h2>
            <p className="pp-specialty">Psicología · Educación, comunidad y organizaciones</p>
            <p>Comunicar una práctica de psicología requiere hacer comprensibles sus ámbitos de colaboración, su formación y su forma de participar. En este perfil, la necesidad es conectar esa información con instituciones, proyectos comunitarios y organizaciones que buscan acompañamiento en sus procesos de personas.</p>
            <p>RAUVIAWEB organiza la presencia en Inicio, «Cómo puedo ayudarte» y «Sobre mí». Relaciona bienestar socioemocional, psicoeducación y talento humano con situaciones concretas de colaboración, y hace visibles los canales de contacto.</p>
            <p>La solución muestra una aplicación distinta de la misma capacidad: comprender los objetivos del profesionista y construir una presencia coherente con su especialización. El sitio delimita su propuesta al trabajo educativo, comunitario y organizacional; no ofrece psicoterapia clínica ni diagnósticos.</p>
            <a className="pp-link" href="https://allisongarcia.rauviaweb.mx/" target="_blank" rel="noopener noreferrer">Explorar el sitio profesional de Allison García Urrutia <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="case-findings pp-reference-map">
            <div><span>Identidad</span><p>Nombre, psicología y enfoque de colaboración explícitos.</p></div>
            <div><span>Ámbitos</span><p>Educación socioemocional, psicoeducación comunitaria y procesos de talento humano.</p></div>
            <div><span>Arquitectura</span><p>Recorridos entre presentación, áreas de colaboración, formación y trayectoria.</p></div>
            <div><span>Contacto</span><p>Acceso a correo, teléfono, WhatsApp y tarjeta de contacto.</p></div>
            <div><span>Presencia</span><p>Identidad visual propia, navegación adaptable, metadatos, canonical y datos estructurados Person.</p></div>
          </div>
        </section>

        {additionalReferences.filter(reference => reference.id === 'monica').map(reference => <ReferenceSection key={reference.id} reference={reference} />)}

        <section className="pp-applications" aria-labelledby="aethryon-frentes-title">
          <span className="report-kicker">DE LA COMPRENSIÓN AL FRENTE COMERCIAL</span>
          <h2 id="aethryon-frentes-title">Una capacidad, distintas situaciones</h2>
          <p>En RAUVIA utilizamos AETHRYON para organizar el contexto, identificar la necesidad prioritaria y estructurar una ruta de acción. Esa lectura orienta cómo aterrizamos cada frente comercial: qué necesita comprender su público, qué información ofrece confianza y cuál es el siguiente paso adecuado.</p>
          <p>Una presencia profesional, un consultorio con varias especialidades y un salón de fiestas requieren recorridos diferentes. RAUVIAWEB adapta la arquitectura y la comunicación a cada caso; el alcance se define según sus necesidades y evidencia disponible.</p>
        </section>

        {additionalReferences.filter(reference => reference.id !== 'monica').map(reference => <ReferenceSection key={reference.id} reference={reference} />)}

        <section className="report-evidence-detail pp-evidence" aria-labelledby="evidencia-title">
          <span className="report-kicker">EVIDENCIA Y LÍMITES</span>
          <h2 id="evidencia-title">Qué demuestra / Qué no demuestra</h2>
          <div className="pp-table-wrap" role="region" aria-label="Evidencia de implementación y límites" tabIndex={0}>
            <table><thead><tr><th scope="col">Evidencia</th><th scope="col">Qué demuestra</th><th scope="col">Qué no demuestra</th></tr></thead><tbody>
              <tr><th scope="row">Sitio publicado</th><td>Una presencia profesional disponible para consulta pública.</td><td>Incremento en visitas, entrevistas o empleo.</td></tr>
              <tr><th scope="row">Información estructurada</th><td>Identidad, trayectoria, competencias y escenarios de aportación organizados.</td><td>Validación independiente de todos los logros descritos por la profesional.</td></tr>
              <tr><th scope="row">Bases de SEO</th><td>Título, descripción, canonical y datos estructurados observados en la página de referencia.</td><td>Indexación efectiva, posiciones en buscadores o mejora de ranking ATS.</td></tr>
              <tr><th scope="row">Enlaces y contacto</th><td>Continuidad hacia LinkedIn y canales de contacto visibles.</td><td>Contactos recibidos, recomendaciones o contrataciones atribuibles al sitio.</td></tr>
            </tbody></table>
          </div>
          <p className="pp-evidence-note">La web complementa el CV y LinkedIn. No garantiza ranking ATS, entrevistas ni empleo. La presencia de metadatos no sustituye la validación del rastreo y la indexación; tampoco implica que un ATS consulte o puntúe el sitio.</p>
        </section>

        <section className="report-outlook pp-learning"><span className="report-kicker">DE LA PRESENCIA AL APRENDIZAJE</span>
          <h2>Entregar el sitio abre una siguiente pregunta: cómo se utiliza</h2>
          <p>La presencia entregada es un primer nivel de evidencia. La relevancia informativa requiere observar si los públicos encuentran y comprenden lo que necesitan. Las oportunidades sólo pueden documentarse cuando existen registros verificables y contexto suficiente.</p>
          <div className="case-findings">
            <div><span>Presencia entregada</span><p>Sitio disponible, información organizada y recorridos de consulta.</p></div>
            <div><span>Relevancia informativa</span><p>Por evaluar con consultas de búsqueda, uso de contenidos y retroalimentación, cuando esas fuentes estén disponibles.</p></div>
            <div><span>Oportunidades</span><p>Por documentar con contactos confirmados y su origen. No se publican métricas de impacto ni atribuciones sin evidencia.</p></div>
          </div>
          <p className="pp-evidence-note">Nuevas implementaciones podrán ampliar este caso con autorización y evidencia propia. Una referencia concreta ilustra la capacidad; no establece resultados universales.</p>
        </section>

        <section className="report-cta pp-close"><span className="report-kicker">CONTINUAR LA CONVERSACIÓN</span>
          <h2>Tu experiencia tiene valor. Hagamos que sea más fácil comprenderlo</h2>
          <p>Una presencia profesional puede conectar lo que has construido con las personas que necesitan entender tu aportación.</p>
          <div><Link to="/rauviaweb/">Conocer RAUVIAWEB</Link>
            <WhatsAppCTA href="https://wa.me/525586494076?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20mi%20presencia%20profesional">Hablar con RAUVIA</WhatsAppCTA></div>
        </section>
      </div>
    </main>
  </>;
}
