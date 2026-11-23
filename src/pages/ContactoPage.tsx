import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import RouteSEO from '../seo/PageMetadata';
import ConvergenceField from '../components/ConvergenceField';
import usePageFx from '../hooks/usePageFx';
import '../styles/pageFrontier.css';
import '../styles/landingFx.css';

const WA = `https://wa.me/525586494076?text=${encodeURIComponent('Hola, quiero hablar con RAUVIA.')}`;

const SOCIAL = [
  ['LinkedIn', 'https://www.linkedin.com/company/rauvia/'],
  ['Instagram', 'https://www.instagram.com/rauviaconsulting/'],
  ['Facebook', 'https://www.facebook.com/rauviaconsulting/'],
] as const;

export default function ContactoPage() {
  const root = useRef<HTMLDivElement>(null);
  usePageFx(root);
  const card = 'fx-card rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-3';
  return (
    <div ref={root} className="fx-page lf-page bg-white min-h-screen">
      <RouteSEO path="/contacto-rauvia" />
      <div className="fx-progress" aria-hidden="true" />
      <section className="fx-hero lf-hero pt-36 md:pt-44 pb-20 px-4 sm:px-6 lg:px-8">
        <ConvergenceField origin={[0.5, 0.5]} className="fx-field" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">Contacto</h1>
          <p className="text-lg md:text-xl text-[#c3d3e5] leading-relaxed mb-10">
            Cuéntanos qué quieres resolver. Respondemos por WhatsApp o por teléfono, y te decimos si podemos ayudarte antes de proponer nada.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="pcsp-button-primary inline-flex items-center gap-2 rounded-xl bg-rauvia-navy px-7 py-4 font-bold text-white">
            Hablar por WhatsApp <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-rauvia-bg">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          <article className={card}>
            <MessageCircle className="w-7 h-7 text-rauvia-blue" aria-hidden="true" />
            <h2 className="text-xl font-bold text-rauvia-navy">WhatsApp</h2>
            <p className="text-slate-600">La forma más rápida de empezar. Escríbenos y te contestamos en horario laboral.</p>
            <a className="mt-auto font-semibold text-rauvia-blue underline underline-offset-4" href={WA} target="_blank" rel="noopener noreferrer">+52 55 8649 4076</a>
          </article>
          <article className={card}>
            <Phone className="w-7 h-7 text-rauvia-blue" aria-hidden="true" />
            <h2 className="text-xl font-bold text-rauvia-navy">Teléfono</h2>
            <p className="text-slate-600">Si prefieres hablar, llámanos y platicamos tu caso.</p>
            <a className="mt-auto font-semibold text-rauvia-blue underline underline-offset-4" href="tel:+525586494076">+52 55 8649 4076</a>
          </article>
          <article className={card}>
            <ShieldCheck className="w-7 h-7 text-rauvia-blue" aria-hidden="true" />
            <h2 className="text-xl font-bold text-rauvia-navy">Privacidad de datos</h2>
            <p className="text-slate-600">Para ejercer tus derechos sobre tus datos personales, escribe a este correo.</p>
            <a className="mt-auto font-semibold text-rauvia-blue underline underline-offset-4" href="mailto:privacidad@rauvia.com.mx">privacidad@rauvia.com.mx</a>
          </article>
        </div>

        <div className="max-w-5xl mx-auto mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-slate-600">
          <p className="font-semibold text-rauvia-navy">También en redes</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL.map(([name, href]) => (
              <li key={name}><a className="underline underline-offset-4 hover:text-rauvia-navy" href={href} target="_blank" rel="noopener noreferrer">{name}</a></li>
            ))}
          </ul>
        </div>
        <p className="max-w-5xl mx-auto mt-8 text-sm text-slate-500">
          Al escribirnos aceptas nuestros <Link className="underline underline-offset-4" to="/terminos/">términos y condiciones</Link> y nuestro <Link className="underline underline-offset-4" to="/aviso-de-privacidad/">aviso de privacidad</Link>.
        </p>
      </section>
    </div>
  );
}
