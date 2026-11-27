import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
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
            </div>
            <div className="rv-hero-core"><AethryonCore /></div>
          </div>
          <a href="#problema" className="rv-hero-continue flex" aria-label="Explorar los retos que atendemos"><ChevronDown aria-hidden="true" /></a>
        </div>
      </section>
      <div className="rv-hero-context rv-hero-container"><p>Primero entendemos la situación. Después acordamos qué información, activo o capacidad hace falta desarrollar.</p></div>
    </>
  );
}
