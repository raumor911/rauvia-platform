import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import {idx, trackCta, useTechMotion} from './seoAiShared';
import './SeoAiPage.css';

// Contrato: RAUVIA_Dos_Paginas_SEO_GEO_AEO_2027_Especificacion v1.0 · Página 2 (guía educativa de autoservicio).
// Todo el contenido vive en el HTML inicial (prerender); la guía se lee completa sin JS y sin registro.
// Los ejemplos son ficticios y están rotulados junto a sus datos. Ninguna cifra ni práctica se presenta como garantía.

const toc = [
  ['conceptos', 'Qué significan SEO, GEO y AEO'],
  ['fundamentos', 'Lo esencial antes de pensar en asistentes'],
  ['plan-practico', 'Plan práctico: una página, cinco pasos'],
  ['ejemplo-ficticio', 'Ejemplo ficticio'],
  ['medicion', 'Cómo medir sin confundir visibilidad con ventas'],
  ['preguntas', 'Preguntas frecuentes'],
  ['auditoria', 'Revisión adaptada a tu empresa'],
  ['fuentes', 'Fuentes y revisión'],
] as const;

const compare = [
  ['Pregunta de trabajo', '¿Se encuentra y comprende la página?', '¿Hay información útil y comprobable para experiencias generativas?', '¿La respuesta a una pregunta real es clara y completa?'],
  ['Ejemplo', 'Enlace interno hacia una página de servicio', 'Condiciones y evidencia identificables en esa página', 'Explicación directa de cobertura y excepciones'],
  ['Comprobación práctica', 'Inspección de URL e informes disponibles', 'Registro manual de respuestas y enlaces, sin extrapolar', 'Revisión editorial de pregunta, respuesta y evidencia'],
  ['Límite', 'Indexación y posiciones no están garantizadas', 'Una prueba no predice otras sesiones ni plataformas', 'Una respuesta clara no asegura que un motor la reproduzca'],
] as const;

const steps = [
  ['Elige una página prioritaria.', 'Empieza por un servicio importante y anota su URL, objetivo, responsable y última revisión. No intentes rehacer todo el sitio a la vez.'],
  ['Responde las preguntas de decisión.', '¿Qué ofrece? ¿A quién? ¿Dónde? ¿Qué incluye y excluye? ¿Cómo se solicita? Si la respuesta depende de un diagnóstico, dilo. Añade condiciones y fecha cuando puedan cambiar.'],
  ['Reúne pruebas.', 'Para cada afirmación relevante, registra fuente primaria, persona responsable y fecha de comprobación. Una ficha técnica, contrato o medición propia pueden ser evidencias si existen y sustentan exactamente lo afirmado. No publiques datos privados ni afirmaciones que no puedas sostener.'],
  ['Revisa acceso y coherencia.', 'Comprueba la página real en móvil, enlaces, texto principal y los informes disponibles; compara sus datos con otros canales bajo tu control. Si se usa noindex, Google debe poder rastrear la página para detectar la directiva; bloquear el rastreo no equivale por sí solo a solicitar la desindexación.'],
  ['Publica y observa.', 'Guarda una copia anterior, fecha y lista de cambios. Registra las métricas y pruebas descritas más abajo. Corrige errores y mantén los datos actualizados; evita atribuir resultados a una sola edición.'],
] as const;

const template = [
  ['Servicio', '[nombre comprensible]'],
  ['Para quién', '[cliente y situación]'],
  ['Qué incluye', '[alcance concreto]'],
  ['Qué no incluye / condiciones', '[límites y dependencias]'],
  ['Cobertura', '[ubicaciones reales o modalidad remota]'],
  ['Cómo empezar', '[pasos y canal]'],
  ['Evidencia', '[documento o dato comprobable y enlace cuando sea público]'],
  ['Revisado', '[fecha real]; responsable: [equipo o persona]'],
] as const;

const tracking = [
  ['Día 0', 'Inventario, acceso y línea base de 28 días si existen datos', 'URL, exportación, condiciones y preguntas fijas'],
  ['Días 1–7', 'Corregir información y publicar con aprobación', 'Lista de cambios y evidencias'],
  ['Día 14', 'Control de acceso, errores y observaciones manuales', 'Registro de incidencias, no conclusión de impacto'],
  ['Día 35 o después', 'Comparar 28 días posteriores completos con la línea base', 'Tabla descriptiva y factores externos'],
  ['Trimestral', 'Revisar vigencia editorial y documentación de plataformas', 'Fecha real, responsable y cambios documentados'],
] as const;

const faqs = [
  ['¿El SEO tradicional ya no sirve?', 'No. Google afirma que sus prácticas fundamentales de SEO siguen siendo relevantes para sus experiencias generativas. Cada plataforma tiene su propio funcionamiento, por lo que no hay una receta universal.'],
  ['¿Necesito llms.txt o un schema especial?', 'No para aparecer en las funciones generativas de Google Search: Google indica que no exige llms.txt ni marcado especial para sus funciones de IA en Search. Eso no resuelve las necesidades de otros productos; comprueba sus instrucciones específicas.'],
  ['¿Los datos estructurados garantizan una cita o un resultado enriquecido?', 'No. Deben corresponder al contenido visible y cumplir las políticas; ni siquiera un marcado válido garantiza un resultado enriquecido. No hay schema obligatorio específico para funciones generativas de Google.'],
  ['¿Puedo usar IA para crear contenido?', 'Sí puedes usarla como apoyo, pero revisa precisión, relevancia y originalidad. La política de Google se centra, entre otras cosas, en evitar contenido a escala creado principalmente para manipular resultados; no basta con cambiar palabras de forma automática.'],
  ['¿Cómo compruebo si una respuesta menciona mi empresa?', 'Haz una observación manual con consulta, fecha, plataforma y contexto registrados; contrasta la afirmación con una fuente propia. Una observación no representa todas las respuestas. Si no aparece un enlace, registra el hecho para esa prueba sin concluir que la empresa nunca aparece.'],
  ['¿Cuánto tarda y qué resultados puedo esperar?', 'No hay plazo ni resultado garantizado. Puedes usar los momentos del plan como puntos internos de revisión, no como una predicción de indexación, menciones o contactos.'],
  ['¿La guía sustituye una auditoría?', 'Puede ayudarte a resolver aspectos importantes de forma autónoma. Una auditoría aporta revisión específica del sitio, sus fuentes, acceso, prioridades y medición; su alcance debe acordarse por escrito. No es requisito para aplicar la guía.'],
] as const;

const sources = [
  ['Google Search Central: funciones de IA en Google Search', 'https://developers.google.com/search/docs/appearance/ai-features', 'Aplica a Google Search, no a todos los asistentes.'],
  ['Google Search: nuevos controles para propietarios de sitios (publicado 3 de junio y actualizado 31 de agosto de 2026)', 'https://blog.google/products-and-platforms/products/search/new-controls-website-owners/', 'Datos globales declarados y prueba gradual de controles e informes; no implica disponibilidad en tu propiedad.'],
  ['Google Search Central: contenido útil', 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', ''],
  ['Google Search Central: políticas de spam', 'https://developers.google.com/search/docs/essentials/spam-policies', ''],
  ['Google Search Central: políticas de datos estructurados', 'https://developers.google.com/search/docs/appearance/structured-data/sd-policies', ''],
  ['Google Search Central: bloquear la indexación con noindex', 'https://developers.google.com/search/docs/crawling-indexing/block-indexing', ''],
] as const;

function Cmp({rows, heads, label}: {rows: ReadonlyArray<ReadonlyArray<string>>; heads: ReadonlyArray<string>; label: string}) {
  return <div className="seoai-table-wrap" role="region" aria-label={label} tabIndex={0}>
    <table className="seoai-table" data-sa>
      <thead><tr>{heads.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
      <tbody>{rows.map(r => <tr key={r[0]}>{r.map((c, i) => i === 0
        ? <th key={i} scope="row" data-label={heads[i]} className="seoai-rowhead">{c}</th>
        : <td key={i} data-label={heads[i]}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function SeoParaIaGuiaPage() {
  const root = useRef<HTMLDivElement>(null);
  useTechMotion(root);
  return <div ref={root} className="seoai seoai-guide bg-white text-slate-800">
    <RouteSEO path="/recursos/seo-para-ia" />
    <div className="seoai-progress" aria-hidden="true" />

    <section className="seoai-hero pt-16 md:pt-24 pb-14 md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Ruta de navegación" className="seoai-crumb mb-6 sa-rise" style={idx(0)}>
          <ol><li><Link to="/recursos/">Recursos</Link></li><li aria-current="page">SEO para IA</li></ol>
        </nav>
        <p className="seoai-kicker mb-4 sa-rise" style={idx(1)}>Guía para empresas · Información revisada al 23 de noviembre de 2026</p>
        <h1 className="seoai-h1 text-3xl md:text-5xl font-extrabold leading-tight mb-6 sa-rise" style={idx(2)}>SEO, GEO y AEO en 2027: cómo preparar la información de tu empresa para buscadores y asistentes de IA</h1>
        <p className="seoai-lead text-lg md:text-xl max-w-3xl mb-4 sa-rise" style={idx(3)}>Los clientes pueden encontrar información de tu empresa en una página de resultados, en una respuesta generada o directamente en tu sitio. Prepararte no consiste en perseguir un formato secreto: empieza por publicar información útil, comprobable y coherente, y por facilitar su acceso técnico.</p>
        <p className="seoai-aux max-w-3xl mb-6 sa-rise" style={idx(4)}>Esta guía propone acciones que puedes hacer por tu cuenta y un método para observar cambios. <strong>No predice cómo funcionarán los productos en 2027 ni garantiza apariciones, citas, tráfico o ventas.</strong> Las plataformas cambian y cada una puede tener reglas diferentes.</p>
        <p className="seoai-aux max-w-3xl mb-8 sa-rise" style={idx(4)}><strong>En dos minutos:</strong> elige una página de servicio, comprueba que explica qué ofreces, a quién, dónde y bajo qué condiciones; añade una fuente verificable a cada afirmación importante; revisa que la página pueda encontrarse e indexarse; y guarda una línea base antes de modificarla.</p>
        <div className="flex flex-wrap gap-4 sa-rise" style={idx(5)}>
          <a href="#plan-practico" onClick={trackCta('guia_hero_plan', 'general')} className="seoai-btn seoai-btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors">Ir al plan práctico <ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          <a href="#ejemplo-ficticio" onClick={trackCta('guia_hero_ejemplo', 'general')} className="seoai-btn seoai-btn-ghost inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors">Ver ejemplo ficticio</a>
          <a href="#auditoria" onClick={trackCta('guia_hero_auditoria', 'auditoria')} className="seoai-btn seoai-btn-ghost inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors">Solicitar una auditoría</a>
        </div>
      </div>
    </section>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-[15rem_minmax(0,1fr)] gap-10">
      <nav aria-label="En esta guía" className="seoai-toc lg:sticky lg:top-24 self-start">
        <p className="seoai-index mb-3">En esta guía</p>
        <ol>{toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
      </nav>

      <article className="seoai-prose min-w-0">
        <section id="conceptos" className="scroll-mt-28">
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Qué significan SEO, GEO y AEO</h2>
          <p>Usamos los términos como enfoques de trabajo, no como tres sistemas independientes ni garantías de resultado:</p>
          <ul>
            <li><strong>SEO:</strong> mejorar contenido, estructura y acceso para que las personas y los buscadores puedan encontrar y entender un sitio.</li>
            <li><strong>GEO:</strong> nombre habitual para el trabajo orientado a experiencias de búsqueda generativa; aquí lo usamos para revisar si la información útil puede encontrarse y respaldarse en ese contexto.</li>
            <li><strong>AEO:</strong> nombre habitual para el trabajo orientado a responder preguntas concretas; aquí significa organizar respuestas claras y justificadas para las necesidades de la audiencia.</li>
          </ul>
          <p>Hay solapamiento: una misma página clara puede atender los tres enfoques. Google considera que optimizar para sus experiencias de búsqueda generativa sigue siendo SEO; eso no implica que todos los asistentes funcionen igual.</p>
          <Cmp label="Comparación de SEO, GEO y AEO" heads={['Aspecto', 'SEO', 'GEO', 'AEO']} rows={compare} />
        </section>

        <section id="fundamentos" className="scroll-mt-28">
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Lo esencial antes de pensar en asistentes</h2>
          <p><strong>Publica información que un cliente pueda usar.</strong> Describe servicios, zonas atendidas, requisitos, restricciones, formas de contacto y vigencia cuando aplique. Diferencia claramente un precio fijo de un presupuesto orientativo, y una capacidad disponible de un proyecto futuro. Elige ejemplos y evidencias que puedas sostener.</p>
          <p><strong>Comprueba el acceso.</strong> Una página debe estar indexada, cumplir los requisitos técnicos de Google y ser apta para mostrarse con un fragmento para poder aparecer como enlace de apoyo en AI Overviews o AI Mode. Google está probando controles adicionales para parte de los propietarios de sitios; comprueba si están disponibles para tu propiedad, sin asumir que todos disponen de ellos. Cumplir los requisitos no garantiza rastreo, indexación ni aparición (<a href="#fuentes">fuentes</a>). Revisa enlaces internos, respuesta del servidor, acceso del rastreador y contenido principal en texto; si el sitio usa JavaScript, prueba el contenido que se presenta y la inspección de URL en Search Console.</p>
          <p><strong>Haz que la información coincida entre canales que controlas.</strong> Compara sitio, perfiles comerciales y fichas relevantes: nombre, URL, contacto, servicios y cobertura. Google recomienda mantener actualizados, cuando corresponda, Merchant Center y Business Profile; no se deduce que una coincidencia produzca una cita.</p>
          <p><strong>Usa datos estructurados cuando tengan un propósito real.</strong> Deben reflejar contenido visible y no engañar; cumplir las directrices no garantiza resultados enriquecidos. No existe un marcado especial obligatorio para aparecer en las funciones generativas de Google; tampoco exige <code>llms.txt</code> para estas funciones de Google Search. Otros servicios pueden tener requisitos propios: consúltalos antes de implementarlos. Mantén preguntas frecuentes por su utilidad para personas, no para prometer un resultado enriquecido; verifica la documentación vigente antes de plantear cualquier formato específico.</p>
          <p><strong>Evita atajos.</strong> Publicar muchas variaciones sin valor principalmente para manipular resultados puede incumplir la política de abuso de contenido a gran escala; crear menciones inauténticas tampoco es una recomendación de Google. La IA puede apoyar un borrador, pero una persona debe comprobar sus hechos, vigencia y adecuación antes de publicarlo.</p>
        </section>

        <section id="plan-practico" className="scroll-mt-28">
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Plan práctico: una página, cinco pasos</h2>
          <ol className="seoai-steps">
            {steps.map(([title, text], i) => <li key={title} data-sa style={idx(i)}><strong>{title}</strong> {text}</li>)}
          </ol>
          <h3 className="seoai-h3 text-xl font-bold text-rauvia-navy mt-8 mb-3">Plantilla reutilizable para una página de servicio</h3>
          <dl className="seoai-template" data-sa>
            {template.map(([term, text]) => <div key={term}><dt>{term}:</dt><dd>{text}</dd></div>)}
          </dl>
          <p className="text-sm text-slate-600">No rellenes una casilla con información que no tienes: indica «por confirmar» internamente y publica solo después de verificarla.</p>
        </section>

        <section id="ejemplo-ficticio" className="scroll-mt-28">
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Ejemplo ficticio: de una frase vaga a información comprobable</h2>
          <p className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900">Ejemplo ficticio: empresa y datos inventados para ilustrar el método; no describen un cliente ni resultados reales</p>
          <p>Una empresa hipotética, «Mantenimiento Norte», ofrece mantenimiento preventivo de equipos de refrigeración comercial.</p>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="seoai-ba seoai-ba-before" data-sa><p className="seoai-index mb-2">Antes</p><p>«Somos líderes y resolvemos cualquier problema rápidamente en todo el país».</p></div>
            <div className="seoai-ba seoai-ba-after" data-sa style={idx(1)}><p className="seoai-index mb-2">Después (solo publicable si la empresa verifica cada dato)</p><p>«Realizamos mantenimiento preventivo de equipos de refrigeración comercial para negocios de la zona metropolitana de Monterrey. La visita incluye revisión visual, limpieza de componentes accesibles y reporte de observaciones. Las reparaciones y refacciones se cotizan aparte. Confirma cobertura y disponibilidad al solicitar tu visita».</p></div>
          </div>
          <p><strong>Qué comprobar antes de publicar:</strong> el catálogo interno sustenta el alcance; operaciones confirma cobertura; la propuesta comercial confirma exclusiones; el canal de contacto funciona. Las fuentes de este ejemplo son categorías hipotéticas, no documentos reales. El texto mejorado facilita que una persona entienda la oferta; no demuestra que un buscador lo cite.</p>
          <h3 className="seoai-h3 text-xl font-bold text-rauvia-navy mt-8 mb-3">Demostración reproducible sin afirmar un resultado</h3>
          <ol className="seoai-steps">
            <li>En una hoja crea columnas: <em>fecha/hora</em>, <em>plataforma y versión visible</em>, <em>país/idioma</em>, <em>sesión</em>, <em>consulta literal</em>, <em>respuesta resumida</em>, <em>enlace de apoyo y URL</em>, <em>afirmación correcta/incorrecta/no evaluable</em>, <em>captura o referencia</em> y <em>notas</em>.</li>
            <li>Ejecuta la consulta literal «¿Qué incluye el mantenimiento preventivo de refrigeración comercial en Monterrey?» en la plataforma elegida. No uses el nombre ficticio como si fuera una empresa existente. Registra si aparece una respuesta generada, si hay enlaces y qué afirman; si no aparece, anota «no observado», no «inexistente».</li>
            <li>En un sitio real y con autorización, repite con un conjunto fijo de preguntas relevantes antes y después de los cambios. Conserva fecha, país, idioma, dispositivo, cuenta/sesión y versión visibles. No introduzcas datos confidenciales en herramientas externas.</li>
            <li>Contrasta las afirmaciones con la página y sus documentos. Identifica diferencias y captura evidencia permitida; no conviertas una única observación en una conclusión general. Si la plataforma cambia, deja de estar disponible o no expone fuentes, registra esa limitación.</li>
          </ol>
        </section>

        <section id="ejemplos-por-necesidad" aria-labelledby="ejemplos-por-necesidad-titulo" className="scroll-mt-28">
          <h2 id="ejemplos-por-necesidad-titulo" className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3">Ejemplos según la información que falta</h2>
          <p>Si ya identificaste dónde falta información, revisa el ejemplo más cercano a tu situación.</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><a href="/seo-ai/catalogos-para-ia/" className="underline font-semibold text-rauvia-blue">Fichas que no explican para qué sirve un producto</a></li>
            <li><a href="/seo-ai/cobertura-y-envios/" className="underline font-semibold text-rauvia-blue">Zonas, envíos o instalación poco claros</a></li>
            <li><a href="/seo-ai/proveedores-tecnicos/" className="underline font-semibold text-rauvia-blue">Oferta técnica sin evidencia suficiente para Compras</a></li>
            <li><a href="/seo-ai/corregir-informacion-en-ia/" className="underline font-semibold text-rauvia-blue">Una afirmación incorrecta sobre tu empresa</a></li>
          </ul>
        </section>

        <section id="medicion" className="scroll-mt-28">
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Cómo medir sin confundir visibilidad con ventas</h2>
          <p><strong>Antes de modificar:</strong> selecciona páginas, consultas y países; registra fechas, cambios previstos y una ventana comparable anterior. Si tienes acceso, exporta impresiones, clics y consultas de Search Console para esas páginas. Google ha anunciado información específica de apariciones en sus funciones de IA para un subconjunto de propietarios; comprueba la disponibilidad y los límites de tu propiedad antes de usarla. No supongas que cubre otros asistentes ni todos los eventos.</p>
          <p><strong>Después:</strong> compara ventanas equivalentes, por ejemplo 28 días antes y 28 días después de la publicación, con mismas páginas y filtros. Asegúrate de excluir o anotar periodos de implementación si distorsionan la comparación. Documenta campañas, estacionalidad, cambios de producto y modificaciones del buscador. Son comparaciones descriptivas, no un experimento controlado ni prueba causal.</p>
          <p><strong>Registro manual:</strong> usa un conjunto fijo y pequeño de preguntas que cubra marca, servicio y necesidad; realiza varias observaciones en fechas predefinidas y registra las condiciones de la demostración. Número de observaciones con enlace a la página dividido entre el número de observaciones válidas del conjunto = <strong>proporción observada de enlaces en esa muestra</strong>, no cuota de mercado ni probabilidad general. Si no hay respuestas válidas, no calcules el porcentaje. Las respuestas pueden variar entre ejecuciones y usuarios.</p>
          <p><strong>Contactos y conversiones:</strong> si existe medición autorizada, registra definiciones y fuentes por separado: por ejemplo, envío exitoso del formulario según analítica y consultas calificadas según CRM. Las fuentes de referencia pueden estar incompletas o clasificadas de forma diferente. Una cita, una visita o una correlación temporal no prueban que la edición causara una venta. Respeta consentimiento y políticas de privacidad aplicables.</p>
          <h3 className="seoai-h3 text-xl font-bold text-rauvia-navy mt-8 mb-3">Seguimiento sugerido</h3>
          <Cmp label="Seguimiento sugerido" heads={['Momento', 'Acción', 'Entregable interno']} rows={tracking} />
          <p className="text-sm text-slate-600">Los plazos son una propuesta de organización, no tiempos garantizados de rastreo ni de resultados.</p>
        </section>

        <section id="preguntas" className="scroll-mt-28">
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-4" data-sa>Preguntas frecuentes</h2>
          <div className="seoai-faqs">
            {faqs.map(([q, a]) => <details key={q} className="seoai-details"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </section>

        <section id="auditoria" className="seoai-cta scroll-mt-28" data-sa>
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold mb-3">¿Quieres una revisión adaptada a tu empresa?</h2>
          <p>Si ya aplicaste la guía o necesitas ayuda para priorizar, podemos revisar contigo una página o un conjunto de páginas, la coherencia de la información y las opciones de medición. <strong>Primero acordaremos alcance, accesos, entregables y condiciones; no prometemos posiciones, citas ni ventas.</strong> También puedes seguir usando esta guía sin contratar.</p>
          <p className="mt-3"><Link to="/seo-ai/auditoria/" onClick={trackCta('guia_cta_auditoria', 'auditoria')} className="seoai-btn seoai-btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold">Solicitar información sobre la auditoría <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link></p>
          <p className="mt-3 text-sm">Cuéntanos qué sitio quieres revisar y qué decisión necesitas tomar. No compartas contraseñas ni información sensible. <Link to="/seo-ai/" className="underline font-semibold">Ver cómo es el servicio completo</Link> · <Link to="/aviso-de-privacidad/" className="underline font-semibold">Aviso de privacidad</Link>.</p>
        </section>

        <section id="fuentes" className="scroll-mt-28">
          <h2 className="seoai-h2 text-2xl md:text-3xl font-bold text-rauvia-navy mb-3" data-sa>Fuentes y revisión</h2>
          <p className="text-sm text-slate-600">Información revisada al 23 de noviembre de 2026. Las plataformas cambian: contrasta estas fuentes con su documentación vigente antes de actuar. Se revisará de forma trimestral y ante cambios sustantivos.</p>
          <ul className="seoai-sources">
            {sources.map(([label, url, note]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a>{note ? <span> — {note}</span> : null}</li>)}
          </ul>
          <p className="text-sm text-slate-600">Las definiciones operativas, la plantilla, el ejemplo y los pasos de medición son elaboración de RAUVIA. La mención de 2027 es un marco editorial, no una declaración de desempeño futuro.</p>
        </section>
      </article>
    </div>
  </div>;
}
