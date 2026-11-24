import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import AethryonCore from "./AethryonCore";
import ConvergenceField from "./ConvergenceField";
import { trackEvent } from "../lib/analytics";
import "../styles/homeHero.css";
import "../styles/homeHeroEpic.css";

export default function HeroSection() {
  return (
    <>
      <section className="rv-home-hero" aria-labelledby="home-hero-title">
        <ConvergenceField />
        <div className="rv-hero-container">
          <p className="rv-hero-eyebrow">SERVICIOS DIGITALES PARA EMPRESAS</p>
          <div className="rv-hero-grid">
            <div className="rv-hero-copy">
              <h1 id="home-hero-title">
                <span>HAZ QUE TU </span><span>EMPRESA SEA MÁS </span><span>FÁCIL DE ENTENDER </span><span>Y <strong>ENCONTRAR.</strong></span>
              </h1>
              <p className="rv-hero-description">
                Combinamos metodología, tecnología y trabajo especializado para ayudar a tu empresa a presentar lo que vende y preparar su información para buscadores y asistentes de IA.
              </p>
              <div className="rv-hero-actions">
                <Link to="/soluciones/" className="rv-hero-primary flex"
                  onClick={() => trackEvent("cta_click", {source_page: "/", destination: "/soluciones/", context: "product_discovery"})}>
                  <span>CONOCER NUESTROS SERVICIOS</span><ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link to="/nosotros/#como-trabajamos" className="rv-hero-secondary flex">CÓMO TRABAJAMOS</Link>
              </div>
              <p className="rv-hero-clarify">Empezamos por una necesidad concreta. Cuando el problema requiere mirar más allá del sitio o la oferta, definimos contigo un alcance de trabajo especializado.</p>
            </div>
            <div className="rv-hero-core"><AethryonCore /></div>
            <div className="rv-hero-offer rv-hero-offer-duo">
              <div className="rv-hero-card">
                <p className="rv-hero-card-label">FRENTE COMERCIAL</p>
                <h2 className="rv-hero-card-title text-xl">Presenta tu oferta para que tus clientes entiendan qué haces y cómo avanzar.</h2>
                <p className="rv-hero-card-description">Organiza servicios, evidencia y siguiente paso en un activo comercial digital claro y fácil de compartir.</p>
                <div className="rv-hero-price"><span>Desde $6,900 MXN + IVA</span></div>
                <Link to="/frente-comercial/" className="rv-hero-primary flex">Conocer Frente Comercial<ArrowRight aria-hidden="true" size={18} /></Link>
              </div>
              <div className="rv-hero-card">
                <p className="rv-hero-card-label">SEO · GEO · AEO</p>
                <h2 className="rv-hero-card-title text-xl">Prepara la información de tu empresa para buscadores y asistentes de IA.</h2>
                <p className="rv-hero-card-description">Revisa el acceso a tu sitio, la claridad de tu oferta y las respuestas que se pueden comprobar con preguntas de compra. No garantiza posiciones, menciones ni citas.</p>
                <div className="rv-hero-price"><span>Auditoría $9,900 MXN + IVA</span></div>
                <Link to="/seo-ai/" className="rv-hero-primary flex">Conocer SEO para IA<ArrowRight aria-hidden="true" size={18} /></Link>
              </div>
            </div>
          </div>
          <div className="rv-hero-knowledge">
            <div className="rv-hero-knowledge-heading"><BookOpen aria-hidden="true" /><h2 className="text-xl">Explora nuestro conocimiento</h2></div>
            <p>Artículos, guías y análisis para resolver retos reales de tu empresa</p>
            <Link to="/recursos/" className="rv-hero-knowledge-link flex">Ir a Recursos<ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
          <a href="#problema" className="rv-hero-continue flex" aria-label="Explorar los retos que atendemos"><ChevronDown aria-hidden="true" /></a>
        </div>
      </section>
      <div className="rv-hero-context rv-hero-container"><p>Primero entendemos la situación. Después acordamos qué información, activo o capacidad hace falta desarrollar.</p></div>
    </>
  );
}
