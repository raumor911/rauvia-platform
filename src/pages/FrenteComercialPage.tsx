import RouteSEO from '../seo/PageMetadata';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, XCircle, ChevronDown, Check, X, Smartphone, Zap, Search, Shield, Layout, Settings } from 'lucide-react';
import { RAUVIA_ENTITY } from '../config/entity';
import Logo from '../components/Logo';
import WhatsAppCTA from '../components/WhatsAppCTA';

// WhatsApp Link Generator
const getWaLink = (message: string) => {
  return `https://wa.me/525586494076?text=${encodeURIComponent(message)}`;
};

// Track Event Helper
const trackEvent = (eventName: string, params = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, { event_category: 'Frente Comercial', ...params });
  }
};

export default function FrenteComercialPage() {
  
  useEffect(() => {
    trackEvent('fce_view');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition + windowHeight >= documentHeight / 2) {
        trackEvent('fce_scroll_50');
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: "¿Necesito cambiar toda mi página web?",
      a: "No necesariamente. El Frente Comercial puede ser una actualización, sección, micrositio o activo independiente, dependiendo de lo que ya exista."
    },
    {
      q: "¿Tengo que pagar mensualidad?",
      a: "No. El proyecto inicial se contrata por alcance y no requiere una mensualidad obligatoria."
    },
    {
      q: "¿Puedo utilizar mi dominio actual?",
      a: "Sí. Siempre que la infraestructura existente lo permita, puede integrarse al dominio actual."
    },
    {
      q: "¿Qué debo entregar?",
      a: "Información existente sobre la empresa, productos o servicios, materiales comerciales, imágenes y evidencia disponible."
    },
    {
      q: "¿RAUVIA crea todo el contenido desde cero?",
      a: "Trabajamos principalmente sobre información existente. Investigación extensa, fotografía, branding o creación integral de contenido se cotizan por separado si son necesarios."
    },
    {
      q: "¿Cuánto tarda?",
      a: "El plazo se confirma después de validar el alcance."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <RouteSEO path="/frente-comercial" />
      

      {/* HERO */}
      <section className="rv-frente-hero pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-rauvia-navy leading-tight mb-8">
          Haz más fácil entender, confiar <br className="hidden md:block"/>y avanzar con tu empresa.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Si cada vez que un cliente te pide información terminas enviando varios archivos, explicando lo mismo o mandándolo a tus redes, probablemente no necesitas hacer más marketing todavía. Necesitas una mejor forma de presentar tu oferta.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <WhatsAppCTA 
            href={getWaLink("Hola, quiero revisar mi frente comercial.")}onClick={() => trackEvent('fce_cta_hero_main')}
            className="w-full sm:w-auto bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-8 py-4 rounded font-bold tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[52px]"
          >
            Revisar mi frente comercial
            <ArrowRight className="w-5 h-5" />
          </WhatsAppCTA>
          <a 
            href="#niveles"
            onClick={() => trackEvent('fce_cta_hero_sec')}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-rauvia-navy px-8 py-4 rounded font-bold tracking-wider transition-colors flex items-center justify-center min-h-[52px]"
          >
            Ver qué incluye
          </a>
        </div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
          Alcance claro · pago único · sin mensualidad obligatoria
        </p>
      </section>

      {/* SÍNTOMA (RECONOCIMIENTO) */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-rauvia-navy text-center mb-12">
            ¿Te pasa algo de esto?
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto mb-12">
            {[
              "Tu presentación o página ya no refleja lo que vendes hoy.",
              "Tus clientes necesitan demasiada explicación para entender qué haces.",
              "Tus redes sociales son prácticamente tu único escaparate.",
              "Tienes varias líneas de servicio y al cliente le cuesta saber cuál necesita.",
              "Cada vez que alguien pregunta debes reunir archivos, mensajes o enlaces diferentes."
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <p className="text-slate-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Si alguna te resulta familiar, el problema puede estar menos en generar más atención y más en cómo presentas lo que ya ofreces.
          </p>
        </div>
      </section>

      {/* AUTOVERIFICACIÓN */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="autoverificacion">
        <div className="bg-rauvia-navy text-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
            Si hoy un prospecto te pidiera información, ¿podrías enviarle una sola referencia que explique qué haces, qué puede contratar, por qué confiar y cómo continuar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-xl flex flex-col items-center">
              <span className="text-3xl font-black text-green-400 mb-2">SÍ</span>
              <p className="text-slate-200 text-sm">Probablemente tu frente comercial ya está bien resuelto.</p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-xl flex flex-col items-center">
              <span className="text-3xl font-black text-red-400 mb-2">NO</span>
              <p className="text-slate-200 text-sm">Aquí es donde podemos ayudarte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REENCUADRE */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-rauvia-navy mb-6">
            El problema no siempre es conseguir más prospectos.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Muchas empresas ya generan conversaciones comerciales. La fricción aparece cuando el comprador no entiende con claridad qué ofrece la empresa, qué alternativa le corresponde, por qué confiar o cuál es el siguiente paso.
          </p>
          <div className="bg-blue-50 border-l-4 border-rauvia-blue p-6 md:p-8 text-left rounded-r-lg">
            <p className="text-rauvia-navy-dark font-bold text-lg md:text-xl">
              No buscamos rehacer toda tu operación. Organizamos cómo tu empresa presenta su valor frente al cliente.
            </p>
          </div>
        </div>
      </section>

      {/* ANTES / DESPUÉS */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Antes */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm opacity-80">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6 block">Antes</span>
              <ul className="space-y-4">
                {['PDFs dispersos', 'Fotografías y mensajes', 'Redes sociales', 'Enlaces diferentes', 'Versiones distintas', 'Explicación manual'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500">
                    <X className="w-5 h-5 text-slate-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Después */}
            <div className="bg-white p-8 rounded-xl border-2 border-rauvia-blue shadow-lg relative">
              <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase mb-6 block">Después</span>
              <ul className="space-y-4">
                {['Una referencia principal', 'Oferta organizada', 'Información vigente', 'Evidencia visible', 'Fácil de compartir', 'Siguiente paso claro'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-rauvia-navy font-medium">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-xl font-bold text-rauvia-navy max-w-3xl mx-auto leading-relaxed">
            Cuando la oferta y la capacidad ya existen, el Frente Comercial ayuda a que el comprador pueda comprenderlas con mayor claridad.
          </p>
        </div>
      </section>

      {/* NIVELES */}
      <section className="py-20 md:py-32 bg-white" id="niveles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-rauvia-navy mb-6">
              Opciones de Implementación
            </h2>
            <p className="text-lg text-slate-600">
              Frente Comercial organiza y traduce la oferta existente de una empresa en una presentación comercial digital que permite al comprador entender qué puede contratar, por qué confiar y cuál es el siguiente paso.
            </p>
          </div>

          <div className="rv-packages grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Esencial */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-rauvia-navy mb-2 uppercase tracking-wide">Esencial</h3>
              <p className="text-slate-600 text-sm mb-6 min-h-[40px]">La empresa ya tiene una oferta relativamente clara y necesita presentarla mejor.</p>
              <div className="mb-8 pb-8 border-b border-slate-200">
                <span className="text-3xl font-black text-rauvia-navy">$6,900</span>
                <span className="text-sm font-bold text-slate-500 ml-1">MXN + IVA</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-sm text-slate-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Estructura de presentación comercial.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Activo digital responsive</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Presentación clara de oferta</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Evidencia visible</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> CTA y contacto</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Publicación y una ronda de ajustes</li>
              </ul>
              <WhatsAppCTA 
                href={getWaLink("Hola, quiero revisar el Frente Comercial Esencial.")}onClick={() => trackEvent('fce_cta_esencial')}
                className="w-full text-center py-4 rounded font-bold text-sm tracking-wider border-2 border-rauvia-navy text-rauvia-navy hover:bg-rauvia-navy hover:text-white transition-colors"
              >
                QUIERO REVISAR EL ESENCIAL
              </WhatsAppCTA>
            </div>

            {/* Pro */}
            <div className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl p-8 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-rauvia-blue rounded-t-2xl"></div>
              <h3 className="text-xl font-bold text-rauvia-navy mb-2 uppercase tracking-wide">Pro</h3>
              <p className="text-slate-600 text-sm mb-6 min-h-[40px]">La empresa vende soluciones técnicas, personalizadas o que necesitan mayor explicación.</p>
              <div className="mb-8 pb-8 border-b border-slate-200">
                <span className="text-3xl font-black text-rauvia-navy">$9,900</span>
                <span className="text-sm font-bold text-slate-500 ml-1">MXN + IVA</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-sm text-slate-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Reorganización de información</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Agrupación de capacidades</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Narrativa comercial ampliada</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Mejor explicación de soluciones</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Ruta clara hacia cotización</li>
              </ul>
              <WhatsAppCTA 
                href={getWaLink("Hola, quiero revisar si necesito el Frente Comercial Pro.")}onClick={() => trackEvent('fce_cta_pro')}
                className="w-full text-center py-4 rounded font-bold text-sm tracking-wider bg-rauvia-navy text-white hover:bg-rauvia-navy-dark transition-colors"
              >
                REVISAR SI NECESITO PRO
              </WhatsAppCTA>
            </div>

            {/* Portafolio */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-rauvia-navy mb-2 uppercase tracking-wide">Portafolio</h3>
              <p className="text-slate-600 text-sm mb-6 min-h-[40px]">La empresa tiene varias líneas de servicio y el comprador necesita identificar cuál le corresponde.</p>
              <div className="mb-8 pb-8 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-500 mr-2 uppercase">Desde</span>
                <span className="text-3xl font-black text-rauvia-navy">$13,900</span>
                <span className="text-sm font-bold text-slate-500 ml-1">MXN + IVA</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-sm text-slate-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Arquitectura de categorías</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Agrupación por necesidad</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Rutas de decisión</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Navegación del portafolio</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> Páginas o vistas por solución</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-rauvia-blue shrink-0" /> CTA contextual</li>
              </ul>
              <WhatsAppCTA 
                href={getWaLink("Hola, quiero revisar el Frente Comercial Portafolio.")}onClick={() => trackEvent('fce_cta_portafolio')}
                className="w-full text-center py-4 rounded font-bold text-sm tracking-wider border-2 border-rauvia-navy text-rauvia-navy hover:bg-rauvia-navy hover:text-white transition-colors"
              >
                REVISAR MI PORTAFOLIO
              </WhatsAppCTA>
            </div>
          </div>
        </div>
      </section>

      {/* EMPRESAS TÉCNICAS B2B */}
      <section className="py-16 md:py-24 bg-rauvia-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest text-rauvia-gold uppercase block mb-4">
            EMPRESAS TÉCNICAS B2B
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight">
            ¿Tu empresa ya tiene capacidad, clientes y experiencia, pero su comunicación no refleja ese nivel?
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            En empresas técnicas, industriales o B2B, el problema puede ser más amplio que organizar una página. Puede existir una brecha entre la capacidad real de la empresa, cómo está estructurada su oferta y lo que el mercado alcanza a entender.
          </p>
          <WhatsAppCTA 
            href={getWaLink("Hola, somos una empresa B2B técnica y queremos revisar nuestro caso.")}onClick={() => trackEvent('fce_b2b_strategic')}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-rauvia-navy-dark px-8 py-4 rounded font-bold tracking-wider transition-colors min-h-[52px]"
          >
            REVISAR MI CASO
            <ArrowRight className="w-5 h-5" />
          </WhatsAppCTA>
        </div>
      </section>

      {/* QUÉ NO ES */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-rauvia-navy text-center mb-12">
            También es importante saber cuándo esto no es lo que necesitas.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wide">No es CRM</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Si el problema es saber qué pasó con cada prospecto, quién debe actuar o cuál es la siguiente tarea, probablemente necesitas un sistema de seguimiento comercial.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wide">No es Gestión Documental</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Si el problema principal es encontrar archivos, controlar versiones o definir quién puede modificar información, el problema está dentro de la organización.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wide">No es una estrategia completa</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Si todavía no está claro qué vender, a quién, cómo cotizar o cómo organizar el proceso comercial, primero debe resolverse esa estructura.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wide">No genera demanda por sí solo</h3>
              <p className="text-sm text-slate-600 leading-relaxed">El Frente Comercial mejora las condiciones para que un comprador comprenda y avance. No sustituye publicidad, prospección ni generación de demanda.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 lg:col-span-2">
              <h3 className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wide">No automatiza seguimiento</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Puede preparar la entrada de una oportunidad, pero no sustituye CRM, automatización ni disciplina comercial.</p>
            </div>
          </div>
          <p className="text-center font-semibold text-rauvia-navy max-w-2xl mx-auto">
            Si durante la revisión detectamos que el problema está en otra parte, te lo diremos antes de proponerte algo que no corresponda.
          </p>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-rauvia-navy text-center mb-16">Cómo trabajamos</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { num: "1", title: "Revisamos", desc: "Cómo estás presentando actualmente tu empresa y tu oferta." },
              { num: "2", title: "Definimos", desc: "Qué necesita entender un comprador para avanzar." },
              { num: "3", title: "Construimos", desc: "RAUVIA organiza y prepara el activo comercial." },
              { num: "4", title: "Publicamos", desc: "Se realiza la revisión incluida y queda listo para compartir." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-rauvia-blue text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  {step.num}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-rauvia-navy text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS TÉCNICAS */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-slate-500 text-sm">
            <div className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> Diseño responsive</div>
            <div className="flex items-center gap-2"><Layout className="w-4 h-4" /> Estructura semántica</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4" /> Velocidad y performance</div>
            <div className="flex items-center gap-2"><Search className="w-4 h-4" /> SEO técnico base</div>
            <div className="flex items-center gap-2"><Settings className="w-4 h-4" /> Integración Analytics</div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Publicación segura</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-rauvia-navy text-center mb-12">Respuestas rápidas</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-lg border border-slate-200" onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) trackEvent('fce_faq_open', { question: faq.q });
              }}>
                <summary className="flex items-center justify-between font-bold cursor-pointer list-none p-6 text-slate-800">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 bg-rauvia-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
            Antes de hacer más, revisa cómo estás presentando lo que ya vendes.
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Si hoy un cliente nuevo te pidiera información, ¿qué le mandarías? Si la respuesta implica varios archivos, explicaciones o enlaces, probablemente vale la pena ordenar primero ese frente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppCTA 
              href={getWaLink("Hola, me gustaría revisar mi caso para el Frente Comercial.")}onClick={() => trackEvent('fce_final_cta')}
              className="w-full sm:w-auto bg-white text-rauvia-navy px-8 py-4 rounded font-bold tracking-wider hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 min-h-[52px]"
            >
              Revisar mi caso
              <ArrowRight className="w-5 h-5" />
            </WhatsAppCTA>
            <WhatsAppCTA 
              href={getWaLink("Hola, quiero hacer una consulta rápida por WhatsApp.")}onClick={() => trackEvent('fce_whatsapp', { source: 'Final CTA' })}
              className="w-full sm:w-auto border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-bold tracking-wider transition-colors flex items-center justify-center min-h-[52px]"
            >
              Contarlo por WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* STICKY CTA (Mobile only) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur border-t border-slate-200 sm:hidden z-40 transform translate-y-0 transition-transform">
        <WhatsAppCTA 
          href={getWaLink("Hola, quiero revisar mi frente comercial.")}className="w-full bg-rauvia-navy text-white py-3 rounded font-bold text-sm tracking-wider flex items-center justify-center shadow-lg"
          onClick={() => trackEvent('fce_sticky_cta')}
        >
          Revisar mi frente comercial
        </WhatsAppCTA>
      </div>

    </div>
  );
}
