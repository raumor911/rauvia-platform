import RouteSEO from '../seo/PageMetadata';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, XCircle, Layout, MessageCircle, 
  Target, Wrench, Shield, Briefcase, FileText, HelpCircle
} from 'lucide-react';
import './CommercialLandings.css';

const waLink = "https://wa.me/525518519173?text=Hola%20RAUVIA,%20quiero%20revisar%20si%20mi%20sitio%20explica%20bien%20lo%20que%20vende%20mi%20empresa.";

export default function SitioWebServiciosEspecializadosPage() {

  return (
    <article className="r56-landing r56-specialists">
      <RouteSEO path="/sitio-web-servicios-especializados" />
      

      {/* Hero */}
      <section className="r56-section r56-hero pt-32 pb-24 px-4 bg-rauvia-bg">
        <div className="max-w-7xl mx-auto">
          <p className="r56-eyebrow">Frente Comercial · Servicios especializados</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div>
                <h1 className="text-4xl md:text-5xl font-display text-rauvia-text mb-6 leading-tight">
                  Sitio web para empresas de servicios especializados que necesitan explicar mejor su valor
                </h1>
                <p className="text-xl text-rauvia-gray mb-6 leading-relaxed font-medium">
                  Hay empresas que no venden algo simple.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-light text-white px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
                  >
                    Quiero revisar mi sitio actual
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
                      { step: '1', label: 'Servicio complejo', desc: 'Requiere más contexto' },
                      { step: '2', label: 'Explicación clara', desc: 'Traduce lo técnico a valor' },
                      { step: '3', label: 'Evidencia', desc: 'Construye confianza real' },
                      { step: '4', label: 'Conversación', desc: 'Inicia el contacto orientado' },
                      { step: '5', label: 'Cotización', desc: 'Con bases y criterios claros' }
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
          <div className="r56-hero-context">
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  No venden una playera, una comida o un producto que se entiende en cinco segundos. Venden soluciones, servicios, proyectos, experiencia, capacidad técnica, mantenimiento, infraestructura, consultoría, instalaciones, renta de equipos, procesos o atención especializada.
                </p>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Y cuando eso pasa, una página web común muchas veces se queda corta.
                </p>
                <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                  Porque no basta con poner "estos son nuestros servicios". El cliente necesita entender qué haces, cuándo le conviene, por qué confiar, cómo trabajas y qué tendría que hacer para avanzar.
                </p>
          </div>
        </div>
      </section>

      {/* Qué hacemos, para quién y por qué confiar */}
      <section className="r56-section r56-orientation py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="r56-eyebrow">Antes de hablar de diseño</p>
          <h2>Qué hacemos, para quién y por qué confiar</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full flex flex-col hover:shadow-md transition-shadow">
                <Briefcase aria-hidden="true" className="w-8 h-8 text-rauvia-accent mb-6" />
                <h3 className="text-2xl font-bold text-rauvia-navy mb-4">Qué hacemos</h3>
                <p className="text-slate-700 mb-4 leading-relaxed font-medium">
                  RAUVIA construye sitios web comerciales para empresas que venden servicios especializados y necesitan explicar mejor su valor.
                </p>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  No hacemos una página sólo para que tu empresa tenga presencia. Diseñamos una estructura que ayude a que un posible cliente entienda qué haces, qué problema resuelves, para qué tipo de cliente es, qué te hace diferente, qué evidencia respalda tu experiencia y cuál es el siguiente paso para conversar o cotizar.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full flex flex-col hover:shadow-md transition-shadow">
                <Target aria-hidden="true" className="w-8 h-8 text-rauvia-accent mb-6" />
                <h3 className="text-2xl font-bold text-rauvia-navy mb-4">Para quién</h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Esta página está pensada para empresas que venden algo que requiere explicación antes de que el cliente tome una decisión.
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {[
                    "empresas técnicas,",
                    "servicios profesionales,",
                    "consultorías,",
                    "empresas de mantenimiento,",
                    "construcción o adecuación,",
                    "renta o venta de equipos,",
                    "infraestructura temporal,",
                    "servicios industriales,",
                    "empresas que cotizan por proyecto,",
                    "negocios donde el cliente primero pregunta, compara y después decide."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rauvia-accent mt-1 text-sm">✦</span>
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-700 font-medium italic text-sm">
                  Si tu cliente normalmente necesita contexto antes de pedir precio, esta solución tiene sentido.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full flex flex-col hover:shadow-md transition-shadow">
                <Shield aria-hidden="true" className="w-8 h-8 text-rauvia-accent mb-6" />
                <h3 className="text-2xl font-bold text-rauvia-navy mb-4">Por qué confiar</h3>
                <p className="text-slate-700 mb-4 leading-relaxed font-medium">
                  Porque antes de diseñar, RAUVIA ordena la conversación comercial.
                </p>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Revisamos qué vendes, cómo lo explicas, qué dudas tiene el cliente, qué objeciones aparecen, qué evidencia puede darle confianza y qué información necesita ver antes de escribirte.
                </p>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  No partimos de una plantilla. Partimos de entender cómo compra tu cliente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Síntomas */}
      <section className="r56-section r56-symptoms py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-4 text-center">
              Tal vez esto te está pasando
            </h2>
            <p className="text-lg text-slate-600 mb-16 text-center max-w-3xl mx-auto">
              Tu empresa tiene experiencia, pero explicarla toma tiempo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              "Cuando alguien pregunta, tienes que mandar fotos, PDFs, mensajes largos, fichas técnicas o varias notas de voz para que entienda.",
              "Tu página existe, pero no muestra todo lo que realmente sabes hacer.",
              "Tus servicios aparecen como una lista, pero no como soluciones.",
              "El cliente pregunta precio demasiado rápido, antes de entender el alcance.",
              "Compara tu servicio con opciones más simples porque no alcanzó a ver la diferencia."
            ].map((sintoma, idx) => (
              <div key={idx}>
                <div className="bg-white p-6 rounded-xl border border-slate-100 h-full flex items-start gap-4 hover:shadow-md transition-shadow">
                  <MessageCircle aria-hidden="true" className="w-6 h-6 text-rauvia-accent flex-shrink-0 mt-1" />
                  <p className="text-slate-700 leading-relaxed">{sintoma}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-rauvia-navy/5 border border-rauvia-navy/10 p-8 rounded-xl text-center max-w-4xl mx-auto">
              <p className="text-xl font-medium text-rauvia-navy">
                Si algo de esto te suena familiar, probablemente tu sitio necesita dejar de ser sólo una presentación y empezar a funcionar como un frente comercial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* El problema no es tu empresa */}
      <section className="r56-section r56-explanation py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div>
                <h2 className="text-3xl font-display text-rauvia-navy mb-6">
                  El problema no es que tu empresa sea difícil de entender
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                  A veces el problema no está en la empresa. Está en que el sitio no traduce bien lo que la empresa sabe hacer.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "cuándo conviene contratarte,",
                    "qué tipo de problema resuelves,",
                    "qué alcance puedes cubrir,",
                    "qué experiencia tienes,",
                    "qué casos o evidencia respaldan tu trabajo,",
                    "qué diferencia hay frente a una opción más barata,",
                    "qué información necesita el cliente para cotizar."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Cuando eso no está claro, el cliente no siempre pregunta más. Muchas veces sólo se queda con duda y sigue buscando.
                </p>
              </div>
            </div>
            <div>
              <div>
                <div className="bg-slate-50 p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full justify-center">
                  <h3 className="text-2xl font-display text-rauvia-navy mb-8">
                    Una página web para servicios especializados debe hacer más que verse bien
                  </h3>
                  <p className="text-lg text-slate-600 mb-6">Debe ayudar a que el cliente piense:</p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Esto se parece a lo que necesito.",
                      "Esta empresa entiende mi problema.",
                      "Parece que sí tienen experiencia.",
                      "Ya sé qué les puedo preguntar.",
                      "Vale la pena contactarlos."
                    ].map((frase, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-rauvia-accent"></div>
                        <p className="text-rauvia-navy font-medium italic">"{frase}"</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed">
                    Eso no se logra sólo con diseño bonito. Se logra con orden, claridad, evidencia y una estructura pensada para la decisión.
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
                  RAUVIA construye un Frente Comercial: una página o sitio comercial que ordena la forma en que tu empresa presenta su valor.
                </p>
                <p className="text-xl font-bold text-white mb-10">
                  Un Frente Comercial ayuda a convertir una oferta dispersa en una explicación clara.
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
                    "No sustituye la venta. La prepara mejor.",
                    "No promete cerrar por arte de magia. Ayuda a que el cliente llegue más informado, más orientado y con menos dudas básicas.",
                    "No se trata de sonar más complicado. Se trata de sonar más claro."
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl flex items-start gap-4">
                      <div className="mt-1">
                        <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-rauvia-accent" />
                      </div>
                      <p className="text-lg font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para qué tipo de empresas */}
      <section className="r56-section r56-audience py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-16 text-center">
              Para qué tipo de empresas funciona bien
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Empresas que cotizan por proyecto",
                desc: "Cuando no hay un precio único, el sitio debe ayudar a explicar variables, alcances, condiciones y siguiente paso."
              },
              {
                title: "Empresas técnicas o industriales",
                desc: "Cuando el servicio requiere conocimiento especializado, el sitio debe traducir lo técnico a una explicación entendible para quien decide."
              },
              {
                title: "Empresas de servicios profesionales",
                desc: "Cuando vendes experiencia, criterio o acompañamiento, el sitio debe mostrar confianza, método y claridad."
              },
              {
                title: "Empresas con venta consultiva",
                desc: "Cuando antes de vender necesitas entender el caso del cliente, el sitio debe preparar esa conversación."
              },
              {
                title: "Empresas que atienden por WhatsApp",
                desc: "Cuando el chat carga con toda la explicación, el sitio debe ayudar a que el cliente llegue mejor orientado."
              }
            ].map((feature, idx) => (
              <div key={idx}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow">
                  <Wrench aria-hidden="true" className="w-8 h-8 text-rauvia-accent mb-6" />
                  <h3 className="text-xl font-bold text-rauvia-navy mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quién no es */}
      <section className="r56-section r56-fit py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <XCircle aria-hidden="true" className="w-12 h-12 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl font-display text-rauvia-navy mb-8">
              Para quién no es
            </h2>
            <div className="space-y-6 text-lg text-slate-600 mb-10">
              <p>
                Esto probablemente no es para quien sólo quiere una página rápida sin revisar su oferta.
              </p>
              <p>
                Tampoco es lo ideal para empresas que sólo quieren copiar el sitio de un competidor, llenar una plantilla o publicar algo para salir del paso.
              </p>
            </div>
            <div className="bg-rauvia-navy/5 border border-rauvia-navy/10 p-8 rounded-xl">
              <p className="text-xl font-medium text-rauvia-navy">
                RAUVIA trabaja mejor cuando ya existe valor real, experiencia o capacidad, pero hace falta presentarlo mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="r56-section r56-includes py-24 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-display text-rauvia-navy mb-16 text-center">
              Qué incluye un sitio web para servicios especializados
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "1. Orden de la oferta",
                desc: "Organizamos qué vendes, cómo se divide tu servicio, qué problemas resuelve y qué debe entender el cliente antes de contactarte."
              },
              {
                title: "2. Mensaje claro para compradores reales",
                desc: "No escribimos sólo desde lo que la empresa quiere decir. Escribimos pensando en lo que el cliente necesita entender para avanzar."
              },
              {
                title: "3. Estructura comercial",
                desc: "La página sigue una ruta: problema, solución, alcance, evidencia, confianza y siguiente paso."
              },
              {
                title: "4. Evidencia y confianza",
                desc: "Mostramos elementos que ayudan a reducir duda: casos, experiencia, tipos de clientes, procesos, fotografías, resultados cualitativos, preguntas frecuentes, criterios de cotización y señales de profesionalismo."
              },
              {
                title: "5. CTA claro",
                desc: "El sitio debe decirle al cliente qué hacer después: escribir por WhatsApp, pedir una revisión, solicitar cotización, explicar su caso, agendar una llamada o enviar información inicial."
              },
              {
                title: "6. Base SEO y GEO",
                desc: "La página se estructura para que buscadores y modelos de IA entiendan qué hace tu empresa, para quién lo hace y en qué situaciones aplica."
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
                    "Que tu empresa parezca más simple de lo que realmente es.",
                    "Que el cliente no entienda la diferencia entre tu servicio y una opción más barata.",
                    "Que tu página tenga muchas palabras, pero poca claridad.",
                    "Que la venta dependa de explicarlo todo por WhatsApp.",
                    "Que cada prospecto reciba una explicación distinta.",
                    "Que tu experiencia no se vea reflejada en tu presencia digital.",
                    "Que alguien interesado se vaya porque no entendió cómo avanzar."
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
                <h2 className="text-3xl font-display text-rauvia-navy mb-8">Cómo debería sentirse el resultado</h2>
                <p className="text-lg text-slate-600 mb-4 font-medium">
                  Un buen sitio para servicios especializados no debería sentirse como un folleto.
                </p>
                <p className="text-lg text-slate-600 mb-8">
                  Debería sentirse como una conversación bien ordenada.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Reconoce el problema.",
                    "Explica qué puede estar pasando.",
                    "Muestra cómo ayuda tu empresa.",
                    "Da evidencia.",
                    "Deja claro el siguiente paso."
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
                    El objetivo no es impresionar con palabras complicadas. El objetivo es que el cliente piense: "Esta empresa sí entiende lo que necesito."
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
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">Renta o venta de equipos</h3>
                <p className="text-slate-600 mb-6 flex-grow">Cuando el cliente necesita saber medidas, usos, condiciones, disponibilidad, transporte, instalación o alcance del servicio.</p>
                <Link to="/casos/infraestructura-temporal-b2b/" className="text-rauvia-accent font-bold hover:text-rauvia-navy transition-colors inline-flex items-center gap-2">
                  Ver caso de infraestructura temporal <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">Servicios técnicos</h3>
                <p className="text-slate-600 mb-6 flex-grow">Cuando la decisión depende de explicar bien el proceso, el alcance, la experiencia y los criterios para cotizar.</p>
                <Link to="/soluciones/" className="text-rauvia-accent font-bold hover:text-rauvia-navy transition-colors inline-flex items-center gap-2">
                  Ver soluciones de RAUVIA <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">Empresas que venden por WhatsApp</h3>
                <p className="text-slate-600 mb-6 flex-grow">Cuando el primer contacto llega por chat, pero muchas conversaciones se enfrían porque el cliente no llegó suficientemente orientado.</p>
                <Link to="/recursos/cuando-whatsapp-carga-con-todo-el-proceso-comercial/" className="text-rauvia-accent font-bold hover:text-rauvia-navy transition-colors inline-flex items-center gap-2">
                  Leer sobre WhatsApp y proceso comercial <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <h3 className="text-xl font-bold text-rauvia-navy mb-4">Empresas con prospectos interesados pero pocas decisiones</h3>
                <p className="text-slate-600 mb-6 flex-grow">Cuando sí hay interés, pero el cliente no termina de avanzar porque faltan claridad, confianza o siguiente paso.</p>
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
              Diferencia entre una página común y un sitio comercial para servicios especializados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-sm border border-slate-200">
            {/* Común */}
            <div className="bg-slate-50 p-10">
              <h3 className="text-xl font-bold text-slate-700 mb-8 border-b border-slate-200 pb-4">Página común</h3>
              <ul className="space-y-6">
                {[
                  "Dice quién eres.",
                  "Lista servicios.",
                  "Muestra datos de contacto.",
                  "Usa frases generales.",
                  "Depende de que el cliente interprete.",
                  "Deja muchas dudas para WhatsApp."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-slate-400 font-bold mt-1">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Frente Comercial */}
            <div className="bg-rauvia-navy text-white p-10">
              <h3 className="text-xl font-bold text-white mb-8 border-b border-white/20 pb-4">Sitio comercial RAUVIA</h3>
              <ul className="space-y-6">
                {[
                  "Explica qué problema resuelves.",
                  "Ordena tus servicios por necesidad del cliente.",
                  "Muestra evidencia.",
                  "Aclara para quién aplica.",
                  "Prepara mejor la conversación.",
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
                "La diferencia no está sólo en cómo se ve. Está en cómo ayuda a decidir."
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
                q: "¿Esto es una página web normal?",
                a: "No exactamente. Es una página o sitio construido con intención comercial. Además de verse bien, debe explicar tu oferta, reducir dudas y orientar al cliente hacia el siguiente paso."
              },
              {
                q: "¿Esto sirve para empresas técnicas?",
                a: "Sí. Tiene mucho sentido cuando el servicio requiere explicación, contexto, fotografías, alcance, proceso o criterios de cotización."
              },
              {
                q: "¿Sirve si mis servicios cambian según cada cliente?",
                a: "Sí. En ese caso, el sitio no debe prometer paquetes rígidos. Debe explicar cómo evalúas cada caso, qué información necesitas y cómo puede avanzar el cliente."
              },
              {
                q: "¿Esto reemplaza una llamada o cotización?",
                a: "No. La prepara mejor. La idea es que el cliente llegue con más claridad y menos dudas básicas."
              },
              {
                q: "¿Qué pasa si todavía no tengo bien ordenados mis servicios?",
                a: "Ese puede ser parte del trabajo. RAUVIA ayuda a ordenar tu oferta para que el sitio no sólo publique información, sino que explique mejor lo que vendes."
              },
              {
                q: "¿Incluye conexión con WhatsApp?",
                a: "Sí. El sitio puede incluir llamados a WhatsApp, mensajes prellenados y rutas claras para que el cliente pueda iniciar conversación de forma más natural."
              },
              {
                q: "¿Incluye SEO?",
                a: "Incluye una base SEO y GEO: estructura clara, títulos, contenido por intención, preguntas frecuentes, enlaces internos y contenido pensado para que buscadores y modelos de IA entiendan mejor tu oferta."
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
                { title: "La diferencia entre información y comprensión", path: "/recursos/la-diferencia-entre-informacion-y-comprension/" },
                { title: "La brecha entre capacidad real y percepción de mercado", path: "/recursos/brecha-capacidad-real-percepcion-mercado/" },
                { title: "Qué debe existir antes de implementar un CRM", path: "/recursos/que-debe-existir-antes-de-un-crm/" }
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
              Si tu empresa vende algo valioso, tu sitio debería ayudar a explicarlo mejor
            </h2>
            <div className="space-y-4 mb-12 text-lg text-slate-600">
              <p>
                Si sientes que tu sitio todavía no explica con claridad lo que tu empresa sabe hacer, podemos revisarlo.
              </p>
              <p>
                No se trata de hacer una página más grande. Se trata de construir una página más útil para tu cliente y para tu proceso comercial.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-light text-white px-8 py-4 rounded text-sm font-bold tracking-wider transition-colors"
              >
                Quiero revisar mi sitio actual
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
