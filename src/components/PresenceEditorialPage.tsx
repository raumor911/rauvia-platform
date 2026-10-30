import React from 'react';
import {ArrowRight, CheckCircle2} from 'lucide-react';
import {Link} from 'react-router-dom';
import RouteSEO from '../seo/PageMetadata';
import WhatsAppCTA from './WhatsAppCTA';

export type PresencePageKey = 'trayectoria' | 'rauviaweb' | 'caso-profesional';

type PageCopy = {
  path: string; eyebrow: string; title: string; intro: string;
  problemTitle: string; problem: string;
  sectionTitle: string; points: string[];
  outcomeTitle: string; outcome: string; caveat: string;
  related: {to:string; label:string}[];
  contactText: string;
};

const copy: Record<PresencePageKey, PageCopy> = {
  trayectoria: {
    path: '/trayectoria',
    eyebrow: 'CONTINUIDAD COMERCIAL · RAUVIA TRAYECTORIA',
    title: 'Tu presencia digital debe evolucionar con tu empresa.',
    intro: 'Cuando cambian tus servicios, tu equipo o la forma en que te compran, tu presentación digital también necesita mantenerse vigente. RAUVIA Trayectoria organiza esa evolución como una relación de cambios acordados, no como una página que se publica y se abandona.',
    problemTitle: 'Una web desactualizada genera nuevas explicaciones.',
    problem: 'Una nueva especialidad, una sede adicional o una oferta modificada pueden dejar de coincidir con lo que recibe el comprador. Entonces vuelve a depender de archivos y mensajes para entenderte.',
    sectionTitle: 'Cómo se plantea la continuidad',
    points: [
      'Identificar qué cambió en la operación, la oferta o el contacto.',
      'Clasificar el cambio por alcance: micro, pequeño, mediano o mayor.',
      'Definir prioridad, responsable, evidencia necesaria y criterios de aceptación.',
      'Actualizar y comprobar las páginas acordadas, conservando URLs y señales SEO cuando corresponda.'
    ],
    outcomeTitle: 'La continuidad no sustituye un proyecto nuevo.',
    outcome: 'El objetivo es que el activo comercial publicado refleje la realidad de la organización. Los cambios estructurales, las nuevas funcionalidades y los desarrollos mayores se evalúan por alcance antes de ejecutarse.',
    caveat: 'Alcance, frecuencia, condiciones y precio de cualquier acompañamiento se confirman en la propuesta correspondiente. No se presume soporte ilimitado ni disponibilidad permanente.',
    related: [
      {to:'/frente-comercial/',label:'Conocer Frente Comercial'},
      {to:'/soluciones/',label:'Explorar soluciones'}
    ],
    contactText: 'Hola RAUVIA, quiero revisar cómo mantener actualizada nuestra presencia digital con Trayectoria.'
  },
  rauviaweb: {
    path: '/rauviaweb',
    eyebrow: 'PRESENCIA DIGITAL · RAUVIAWEB',
    title: 'Una presencia profesional que explique qué haces y cómo contactarte.',
    intro: 'RAUVIAWEB propone una puerta de entrada digital clara para profesionistas: presentar su perfil, servicios, experiencia verificable y una ruta de contacto en una referencia que puedan compartir.',
    problemTitle: 'Tu experiencia merece más que un perfil disperso.',
    problem: 'Si la información profesional está repartida entre redes sociales, documentos y mensajes, una persona interesada puede no encontrar qué servicios ofreces ni cómo continuar.',
    sectionTitle: 'Qué debe resolver una web profesional',
    points: [
      'Presentar de forma precisa tu identidad profesional y especialidad.',
      'Organizar servicios o áreas de práctica con lenguaje comprensible.',
      'Concentrar información de contacto, ubicación y canales disponibles.',
      'Permitir que cada sección se consulte bien en dispositivos móviles y tenga estructura semántica.',
      'Conservar una vía para revisar y actualizar la información conforme cambie tu práctica.'
    ],
    outcomeTitle: 'Un punto de partida, no una promesa de resultados automáticos.',
    outcome: 'El sitio ayuda a organizar información y a facilitar contacto; no reemplaza la prestación del servicio, una estrategia comercial ni la validación de credenciales. Las modalidades gratuitas y personalizadas dependen del alcance y disponibilidad.',
    caveat: 'El contenido profesional, los datos públicos y las credenciales deben revisarse con la persona titular antes de su publicación. El SEO facilita comprensión, pero no garantiza posiciones.',
    related: [
      {to:'/pagina-web-gratis-para-medicos/',label:'Web inicial para médicos'},
      {to:'/pagina-comercial-servicios-profesionales/',label:'Web para servicios profesionales'},
      {to:'/frente-comercial/',label:'Conocer Frente Comercial'}
    ],
    contactText: 'Hola RAUVIA, quiero conocer las modalidades de RAUVIAWEB para mi perfil profesional.'
  },
  'caso-profesional': {
    path: '/casos/presencia-posicionamiento-profesional',
    eyebrow: 'CASO DE APLICACIÓN · IDENTIDAD Y PRESENCIA PROFESIONAL',
    title: 'De información profesional dispersa a una presentación digital coherente.',
    intro: 'Este caso describe el enfoque aplicado por RAUVIA para organizar la presencia digital de profesionistas: partir de la evidencia de trayectoria y servicios, construir una narrativa comprensible y facilitar el primer contacto.',
    problemTitle: 'La experiencia no siempre resulta visible para quien busca un servicio.',
    problem: 'Un currículum extenso o un conjunto de perfiles sociales puede contener información suficiente, pero no necesariamente ayuda a una persona nueva a identificar especialidad, alcance, experiencia y siguiente paso.',
    sectionTitle: 'Arquitectura de la intervención',
    points: [
      'Revisar la información y los documentos que aporta la persona profesional.',
      'Distinguir formación, experiencia, servicios ofrecidos y aspiraciones para no presentar cargos no desempeñados.',
      'Definir una estructura breve: inicio, servicios, presentación profesional y contacto.',
      'Validar la propuesta visual antes del desarrollo y revisar su adaptación a móvil.',
      'Incorporar información estructurada y una ruta de contacto clara.'
    ],
    outcomeTitle: 'Evidencia disponible y límites.',
    outcome: 'La intervención ejemplifica una metodología de organización de contenidos y presencia digital. Este reporte no atribuye todavía aumentos de consultas, clientes o posiciones de búsqueda, porque no se dispone aquí de una medición independiente.',
    caveat: 'Los ejemplos y recomendaciones no sustituyen la validación del titular. La mejora de percepción es una hipótesis a comprobar con datos de exposición, interacción y contactos.',
    related: [
      {to:'/casos/',label:'Ver otros casos'},
      {to:'/rauviaweb/',label:'Conocer RAUVIAWEB'},
      {to:'/frente-comercial/',label:'Conocer Frente Comercial'}
    ],
    contactText: 'Hola RAUVIA, quiero organizar mi presencia y posicionamiento profesional.'
  }
};

export default function PresenceEditorialPage({page}: {page:PresencePageKey}) {
  const item=copy[page];
  return <>
    <RouteSEO path={item.path} />
    <article className="bg-white min-h-screen text-rauvia-navy">
      <header className="pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-rauvia-blue mb-6">{item.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-8">{item.title}</h1>
          <p className="max-w-3xl text-lg md:text-xl leading-relaxed text-slate-700">{item.intro}</p>
          <nav aria-label="Siguientes pasos" className="flex flex-wrap gap-4 mt-10">
            {item.related.slice(0,2).map(link=><Link key={link.to} to={link.to} className="inline-flex items-center gap-2 min-h-12 px-5 py-3 rounded-lg border border-slate-300 bg-white font-semibold text-rauvia-navy hover:border-rauvia-blue focus-visible:outline-2 focus-visible:outline-offset-2">{link.label}<ArrowRight size={16} aria-hidden="true"/></Link>)}
          </nav>
        </div>
      </header>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">{item.problemTitle}</h2>
        <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">{item.problem}</p>
      </section>
      <section className="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-9">{item.sectionTitle}</h2>
          <ol className="grid md:grid-cols-2 gap-4 md:gap-6">
            {item.points.map((point,i)=><li key={i} className="bg-white border border-slate-200 rounded-xl p-6 flex gap-4 items-start text-slate-700 leading-relaxed"><CheckCircle2 className="w-6 h-6 text-rauvia-blue shrink-0 mt-0.5" aria-hidden="true"/><span>{point}</span></li>)}
          </ol>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{item.outcomeTitle}</h2>
        <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mb-7">{item.outcome}</p>
        <p className="border-l-4 border-rauvia-blue pl-5 text-sm text-slate-600 leading-relaxed max-w-3xl">{item.caveat}</p>
      </section>
      <section className="bg-rauvia-navy py-14 md:py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-7 md:justify-between">
          <div><h2 className="text-2xl md:text-3xl font-bold mb-3">Conversemos sobre tu situación.</h2><p className="text-slate-200 max-w-lg">Revisamos primero qué necesita entender tu cliente y cuál es el alcance adecuado.</p></div>
          <WhatsAppCTA href={'https://wa.me/525586494076?text='+encodeURIComponent(item.contactText)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-rauvia-navy px-6 py-4 font-bold min-h-12 hover:bg-slate-100">Consultar con RAUVIA <ArrowRight size={18} aria-hidden="true"/></WhatsAppCTA>
        </div>
      </section>
    </article>
  </>;
}
