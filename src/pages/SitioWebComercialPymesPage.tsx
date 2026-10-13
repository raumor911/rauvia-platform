import RouteSEO from '../seo/PageMetadata';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, XCircle, Layout, MessageCircle, 
  Search, Target, Filter, TrendingUp, HelpCircle, FileText
} from 'lucide-react';
import './CommercialLandings.css';

const waLink = "https://wa.me/525586494076?text=Hola%20RAUVIA,%20quiero%20revisar%20si%20mi%20sitio%20web%20est%C3%A1%20ayudando%20a%20vender.";

export default function SitioWebComercialPymesPage() {

  return (
    <article className="r56-landing r56-pymes">
      <RouteSEO path="/sitio-web-comercial-para-pymes" />
      

      {/* Hero */}
      <section className="r56-section r56-hero pt-32 pb-24 px-4 bg-rauvia-bg">
        <div className="max-w-7xl mx-auto">
          <p className="r56-eyebrow">Frente Comercial · PyMES</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div>
                <h1 className="text-4xl md:text-5xl font-display text-rauvia-text mb-6 leading-tight">
                  Sitio web comercial para PyMES que necesitan explicar mejor lo que venden
                </h1>
                <p className="text-xl text-rauvia-gray mb-6 leading-relaxed">
                  Tu empresa puede tener buenos servicios, buenos productos o buena experiencia, pero si alguien entra a tu página y no entiende rápido qué haces, para quién es, por qué debería confiar y cuál es el siguiente paso, es muy probable que se vaya sin escribirte.
                </p>
                <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                  Y eso no siempre pasa porque tu empresa esté mal. A veces pasa porque tu sitio web no está funcionando como un frente comercial.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-light text-white px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
                  >
                    Quiero revisar mi sitio comercial
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </a>
                  <Link 
                    to="/frente-comercial/"
                    className="inline-flex items-center justify-center gap-2 border-2 border-rauvia-border hover:border-rauvia-gray text-rauvia-navy px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
                  >
                    Ver qué es un Frente Comercial
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:pl-8">
              <div>
                <div className="r56-flow bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                  <div className="r56-flow-caption">
                    Ruta Comercial
                  </div>
                  <ol className="r56-flow-list">
                    {[
                      { step: '1', label: 'Visita', desc: 'Llega buscando soluciones' },
                      { step: '2', label: 'Entiende', desc: 'Identifica rápido qué haces' },
                      { step: '3', label: 'Confía', desc: 'Ve evidencia y claridad' },
                      { step: '4', label: 'Pregunta', desc: 'Sabe exactamente cómo contactar' },
                      { step: '5', label: 'Avanza', desc: 'Inicia conversación comercial' }
                    ].map((item, idx, arr) => (
                      <li key={item.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-rauvia-navy text-white flex items-center justify-center flex-shrink-0 font-bold text-sm z-10 relative">
                          {item.step}
                          {idx !== arr.length - 1 && (
                            <div className="absolute top-8 left-1/2 -ml-px w-0.5 h-6 bg-slate-100" />
                          )}
                        </div>
                        <div>
                          <strong className="font-bold text-rauvia-navy">{item.label}</strong>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="r56-section r56-orientation bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="r56-eyebrow">Antes de hablar de diseño</p>
          <h2>Qué hacemos, para quién y por qué confiar</h2>
          <div className="r56-orientation-grid">
            <div className="r56-intro-card"><span className="r56-eyebrow">01 / Qué hacemos</span><h3>Ordenar tu frente comercial.</h3><p>RAUVIA construye sitios web comerciales pensados para explicar mejor una oferta, ordenar servicios y generar conversaciones con prospectos.</p></div>
            <div className="r56-intro-card"><span className="r56-eyebrow">02 / Para quién</span><h3>PyMES con valor que explicar.</h3><p>Para empresas que necesitan presentar mejor su oferta, explicar sus servicios y convertir visitas en conversaciones reales.</p></div>
            <div className="r56-intro-card"><span className="r56-eyebrow">03 / Por qué confiar</span><h3>Primero, claridad para tu cliente.</h3><p>Parte del trabajo consiste en ayudarte a ordenar lo que vendes, cómo lo explicas y qué debe entender el cliente antes de contactarte.</p></div>
          </div>
        </div>
      </section>

      {/* Síntomas */}
      <section className="r56-section r56-symptoms py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-4 text-center">
              Tal vez esto te está pasando
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-3xl mx-auto">
              Tienes una página web, redes sociales o un catálogo, pero cuando alguien pregunta por tus servicios todavía tienes que explicar todo desde cero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              "Te escriben por WhatsApp, pero muchas conversaciones se enfrían.",
              "Mandas información o cotizaciones, pero no siempre queda claro qué sigue.",
              "Tus prospectos hacen preguntas que tu página ya debería resolver.",
              "Sientes que tu empresa sí tiene valor, pero ese valor no se entiende tan rápido como debería.",
              "Tu sitio existe, pero no sabes si realmente está ayudando a vender."
            ].map((sintoma, idx) => (
              <div key={idx}>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 h-full flex items-start gap-4 hover:shadow-md transition-shadow">
                  <MessageCircle aria-hidden="true" className="w-6 h-6 text-rauvia-accent flex-shrink-0 mt-1" />
                  <p className="text-slate-700 leading-relaxed">{sintoma}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-rauvia-navy/5 border border-rauvia-navy/10 p-8 rounded-xl text-center max-w-4xl mx-auto">
              <p className="text-xl font-medium text-rauvia-navy">
                Si algo de esto te suena familiar, probablemente no necesitas "otra página bonita". Necesitas un sitio comercial que ayude a ordenar la conversación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No solo una tarjeta */}
      <section className="r56-section r56-explanation py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div>
                <h2 className="text-3xl font-display text-rauvia-navy mb-6">
                  Una página web no debería ser sólo una tarjeta de presentación
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Para una PyME, una página web debería ayudar a responder preguntas muy concretas.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Qué hace tu empresa",
                    "Para quién es",
                    "Qué problema resuelve",
                    "Qué servicios o soluciones ofrece",
                    "Por qué confiar",
                    "Qué evidencia existe",
                    "Qué debe hacer el cliente si quiere avanzar"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Cuando eso no está claro, el cliente no necesariamente te dice "no". Muchas veces simplemente se queda en duda, se distrae o busca otra opción que sí le explicó mejor.
                </p>
              </div>
            </div>
            <div>
              <div>
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center h-full">
                  <Search aria-hidden="true" className="w-16 h-16 text-rauvia-accent mb-6 opacity-80" />
                  <p className="text-3xl font-display text-rauvia-navy leading-tight">
                    "No es falta de interés. Es falta de claridad."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué construye RAUVIA */}
      <section className="r56-section r56-authority py-24 px-4 bg-rauvia-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div>
                <h2 className="text-3xl font-display mb-6">Qué construye RAUVIA</h2>
                <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                  En RAUVIA diseñamos sitios web comerciales para PyMES que necesitan presentar mejor su oferta, explicar sus servicios y convertir visitas en conversaciones reales.
                </p>
                <p className="text-xl font-bold text-white mb-10">
                  A esto le llamamos Frente Comercial.
                </p>
                <Link 
                  to="/frente-comercial/"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-rauvia-navy px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
                >
                  Conocer el Frente Comercial
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div>
              <div>
                <div className="grid gap-4">
                  {[
                    "No es sólo diseño web.",
                    "No es sólo una landing.",
                    "No es sólo poner textos bonitos.",
                    "Es ordenar la forma en que tu empresa se presenta ante alguien que todavía no te conoce."
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
                      <p className="text-lg font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién es / Para quién no es */}
      <section className="r56-section r56-fit py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Para quién es */}
            <div>
              <div>
                <h2 className="text-2xl font-display text-rauvia-navy mb-8 flex items-center gap-3">
                  <CheckCircle2 aria-hidden="true" className="w-6 h-6 text-green-500" />
                  Este tipo de sitio comercial tiene sentido si:
                </h2>
                <ul className="space-y-4">
                  {[
                    "Tu empresa vende servicios, soluciones, proyectos o productos que necesitan explicación.",
                    "Tu cliente suele pedir información antes de comprar.",
                    "Tu venta depende de WhatsApp, llamadas, cotizaciones o seguimiento.",
                    "Tu página actual no refleja bien lo que tu empresa realmente hace.",
                    "Tienes experiencia, pero te cuesta convertirla en una oferta clara.",
                    "Vendes a empresas, negocios, instituciones o clientes que comparan antes de decidir.",
                    "Quieres que tu sitio ayude más en el proceso comercial, no sólo que exista."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                      <Target aria-hidden="true" className="w-5 h-5 text-rauvia-navy flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Para quién no es */}
            <div>
              <div>
                <h2 className="text-2xl font-display text-rauvia-navy mb-8 flex items-center gap-3">
                  <XCircle aria-hidden="true" className="w-6 h-6 text-red-400" />
                  Esto probablemente no es para ti si:
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 p-6 border border-slate-100 rounded-xl">
                    Sólo quieres una página rápida sin estrategia.
                  </p>
                  <p className="text-lg text-slate-600 p-6 border border-slate-100 rounded-xl">
                    Buscas competir únicamente por precio, llenar una plantilla o tener "algo publicado" sin revisar cómo compra tu cliente.
                  </p>
                  <div className="bg-rauvia-navy/5 border border-rauvia-navy/10 p-6 rounded-xl mt-8">
                    <p className="text-lg font-medium text-rauvia-navy">
                      RAUVIA trabaja mejor cuando la empresa ya tiene algo valioso que ofrecer, pero necesita ordenarlo, explicarlo y presentarlo mejor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="r56-section r56-includes py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-16 text-center">
              Qué incluye un sitio web comercial de RAUVIA
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Claridad de oferta",
                desc: "Organizamos qué vendes, para quién es, qué problema resuelve y cómo debe entenderlo un cliente nuevo."
              },
              {
                title: "Estructura comercial",
                desc: "Diseñamos una ruta para que el visitante no se pierda: problema, solución, evidencia y siguiente paso."
              },
              {
                title: "Mensajes pensados para el cliente",
                desc: "No escribimos pensando sólo en lo que la empresa quiere decir. Escribimos pensando en lo que el cliente necesita entender para animarse a preguntar."
              },
              {
                title: "Secciones orientadas a conversión",
                desc: "Inicio comercial, servicios, evidencia, preguntas frecuentes, llamados a WhatsApp, formulario de contacto, recursos e integración con analítica según el caso."
              },
              {
                title: "Base SEO y GEO",
                desc: "Estructura clara, títulos, preguntas frecuentes, contenido por intención de búsqueda y enlaces internos para que buscadores y modelos de IA entiendan mejor la página."
              }
            ].map((feature, idx) => (
              <div key={idx}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow">
                  <Layout aria-hidden="true" className="w-8 h-8 text-rauvia-accent mb-6" />
                  <h3 className="text-xl font-bold text-rauvia-navy mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que buscamos evitar & Cómo se ve el resultado */}
      <section className="r56-section r56-outcome py-24 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Evitar */}
            <div>
              <div>
                <h2 className="text-3xl font-display text-rauvia-navy mb-8">Lo que buscamos evitar</h2>
                <div className="space-y-4">
                  {[
                    "Que tu web diga mucho, pero no explique nada.",
                    "Que el visitante tenga que adivinar qué haces.",
                    "Que tu WhatsApp cargue con toda la explicación comercial.",
                    "Que cada prospecto reciba una versión diferente de tu oferta.",
                    "Que tus servicios se vean como una lista, pero no como una solución.",
                    "Que el cliente se vaya porque no entendió cómo avanzar."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-red-50/50 p-4 rounded-lg">
                      <XCircle aria-hidden="true" className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultado */}
            <div>
              <div>
                <h2 className="text-3xl font-display text-rauvia-navy mb-8">Cómo se ve el resultado</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Un sitio web comercial debe sentirse como una conversación bien ordenada.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Sí, entiendo tu problema.",
                    "Esto es lo que puede estar pasando.",
                    "Así podemos ayudarte.",
                    "Este es el siguiente paso."
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-rauvia-accent/10 text-rauvia-accent font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-rauvia-navy font-medium text-lg">{step}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-rauvia-navy/5 p-6 rounded-xl border border-rauvia-navy/10">
                  <p className="text-lg text-rauvia-navy font-medium italic">
                    Ese es el objetivo: que la persona que entra no sienta que está leyendo una página genérica, sino que diga: "Esto se parece a mi situación."
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Ejemplos de situaciones */}
      <section className="r56-section r56-examples py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-16 text-center">
              Ejemplos de situaciones donde aplica
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">Empresa de servicios profesionales</h3>
                <p className="text-slate-600 mb-6 flex-grow">Tienes experiencia, pero tu oferta se explica diferente cada vez. Tu sitio debe ayudarte a presentar tus servicios de forma clara y confiable.</p>
                <Link to="/soluciones/" className="text-rauvia-accent font-bold hover:text-rauvia-navy transition-colors inline-flex items-center gap-2">
                  Ver soluciones para empresas de servicios <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">Empresa B2B o técnica</h3>
                <p className="text-slate-600 mb-6 flex-grow">Vendes soluciones que no se entienden en cinco segundos. Tu sitio debe traducir lo técnico a una explicación comercial que un comprador pueda evaluar.</p>
                <Link to="/casos/infraestructura-temporal-b2b/" className="text-rauvia-accent font-bold hover:text-rauvia-navy transition-colors inline-flex items-center gap-2">
                  Ver caso de infraestructura temporal B2B <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">Negocio que vende por WhatsApp</h3>
                <p className="text-slate-600 mb-6 flex-grow">Recibes mensajes, pero muchas conversaciones se quedan a medias. Tu web debe preparar mejor al cliente antes de que llegue al chat.</p>
                <Link to="/recursos/cuando-whatsapp-carga-con-todo-el-proceso-comercial/" className="text-rauvia-accent font-bold hover:text-rauvia-navy transition-colors inline-flex items-center gap-2">
                  Leer sobre WhatsApp y proceso comercial <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">PyME con clientes interesados, pero pocas decisiones</h3>
                <p className="text-slate-600 mb-6 flex-grow">Hay interés, pero no siempre hay avance. Tu sitio puede ayudar a reducir dudas, ordenar información y facilitar el siguiente paso.</p>
                <Link to="/recursos/por-que-pyme-pierde-oportunidades-clientes-interesados/" className="text-rauvia-accent font-bold hover:text-rauvia-navy transition-colors inline-flex items-center gap-2">
                  Leer por qué una PyME pierde oportunidades <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferencia: Página web vs Frente Comercial */}
      <section className="r56-section r56-comparison py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-16 text-center">
              Diferencia entre una página web y un Frente Comercial
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-sm border border-slate-200">
            {/* Común */}
            <div className="bg-slate-50 p-10">
              <h3 className="text-xl font-bold text-slate-700 mb-8 border-b border-slate-200 pb-4">Página web común</h3>
              <ul className="space-y-6">
                {[
                  "Presenta información.",
                  "Lista servicios.",
                  "Se enfoca en presencia.",
                  "Deja muchas dudas al contacto.",
                  "Depende de que el cliente interprete."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-slate-400 font-bold mt-1">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Frente Comercial */}
            <div className="bg-rauvia-navy text-white p-10">
              <h3 className="text-xl font-bold text-white mb-8 border-b border-white/20 pb-4">Frente Comercial RAUVIA</h3>
              <ul className="space-y-6">
                {[
                  "Ordena la conversación.",
                  "Explica problemas y soluciones.",
                  "Se enfoca en claridad y conversión.",
                  "Prepara mejor al prospecto.",
                  "Guía hacia el siguiente paso."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-rauvia-accent flex-shrink-0 mt-0.5" /> 
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <div className="mt-12 text-center">
              <p className="text-xl text-slate-600 mb-8 italic">
                "La diferencia no está sólo en el diseño. Está en la intención."
              </p>
              <Link 
                to="/frente-comercial/"
                className="inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-light text-white px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
              >
                Ver Frente Comercial
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="r56-section r56-faq py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-12 flex items-center gap-3">
              <HelpCircle aria-hidden="true" className="w-8 h-8 text-rauvia-accent" />
              Preguntas Frecuentes
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: "¿RAUVIA hace páginas web?",
                a: "Sí, pero no como un servicio aislado de diseño. RAUVIA construye sitios web comerciales pensados para explicar mejor una oferta, ordenar servicios y generar conversaciones con prospectos."
              },
              {
                q: "¿Esto es lo mismo que una landing page?",
                a: "Puede parecerse, pero no siempre es lo mismo. Una landing normalmente se enfoca en una campaña o una oferta puntual. Un sitio web comercial funciona como la base de presentación de tu empresa."
              },
              {
                q: "¿Necesito tener todo claro antes de empezar?",
                a: "No necesariamente. Parte del trabajo consiste en ayudarte a ordenar lo que vendes, cómo lo explicas y qué debe entender el cliente antes de contactarte."
              },
              {
                q: "¿Esto sirve si vendo por WhatsApp?",
                a: "Sí. Uno de los objetivos es que WhatsApp no tenga que cargar con toda la explicación. El sitio debe preparar mejor al cliente antes de iniciar la conversación."
              },
              {
                q: "¿Esto sirve para empresas B2B?",
                a: "Sí. Es especialmente útil para empresas que venden servicios, soluciones técnicas, proyectos, infraestructura, consultoría o productos que requieren explicación."
              },
              {
                q: "¿Incluye SEO?",
                a: "Incluye una base SEO y GEO: estructura clara, títulos, contenido por intención, preguntas frecuentes y enlaces internos. Si después se quiere crecer en posicionamiento, se pueden crear páginas adicionales por intención de búsqueda."
              },
              {
                q: "¿Qué pasa si mi empresa todavía no tiene una oferta bien ordenada?",
                a: "Entonces puede ser buen momento para empezar. Si hay valor real, experiencia o capacidad, RAUVIA puede ayudarte a convertir eso en una presentación comercial más clara."
              }
            ].map((faq, idx) => (
              <div key={idx}>
                <details className="r56-faq-item">
                  <summary>{faq.q}<span aria-hidden="true">+</span></summary>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      <section className="r56-section r56-reading py-24 px-4 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-8">Artículos relacionados</h2>
            <div className="grid gap-4">
              {[
                { title: "Cuando WhatsApp carga con todo el proceso comercial", path: "/recursos/cuando-whatsapp-carga-con-todo-el-proceso-comercial/" },
                { title: "Por qué una PyME pierde oportunidades aunque tenga clientes interesados", path: "/recursos/por-que-pyme-pierde-oportunidades-clientes-interesados/" },
                { title: "Qué debe existir antes de implementar un CRM", path: "/recursos/que-debe-existir-antes-de-un-crm/" },
                { title: "La diferencia entre información y comprensión", path: "/recursos/la-diferencia-entre-informacion-y-comprension/" },
                { title: "La brecha entre capacidad real y percepción de mercado", path: "/recursos/brecha-capacidad-real-percepcion-mercado/" }
              ].map((link, idx) => (
                <Link 
                  key={idx} 
                  to={link.path}
                  className="flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <FileText aria-hidden="true" className="w-5 h-5 text-rauvia-accent opacity-70" />
                    <span className="text-rauvia-navy font-medium group-hover:text-rauvia-accent transition-colors">{link.title}</span>
                  </div>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 text-slate-400 group-hover:text-rauvia-accent transition-colors transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="r56-section r56-final py-24 px-4 bg-rauvia-bg text-center">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-display text-rauvia-navy mb-8">
              Si tu empresa tiene valor, tu sitio debería ayudar a explicarlo mejor
            </h2>
            <div className="space-y-4 mb-12 text-lg text-slate-600">
              <p>
                Si sientes que tu empresa sí tiene valor, pero tu página actual no lo está explicando con la claridad suficiente, podemos revisarlo.
              </p>
              <p>
                No se trata de hacerte sentir que todo está mal. Se trata de encontrar qué parte de tu frente comercial puede trabajar mejor para ti.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-light text-white px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
              >
                Quiero revisar mi sitio comercial
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </a>
              <Link 
                to="/soluciones/"
                className="inline-flex items-center justify-center gap-2 border-2 border-rauvia-border hover:border-rauvia-gray text-rauvia-navy px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
              >
                Ver soluciones de RAUVIA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
