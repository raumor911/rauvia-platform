import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import AethryonCore from "./AethryonCore";
import { trackEvent } from "../lib/analytics";
import "../styles/homeHero.css";

export default function HeroSection() {
  return (
    <>
      <section className="rv-home-hero" aria-labelledby="home-hero-title">
        <div className="rv-hero-container">
          <p className="rv-hero-eyebrow">CONSULTORÍA PARA PYMES Y EMPRESAS B2B</p>
          <div className="rv-hero-grid">
            <div className="rv-hero-copy">
              <h1 id="home-hero-title">
                <span>CONSTRUIMOS LA </span><span>ESTRUCTURA QUE </span><span>PERMITE A LAS </span><span>EMPRESAS <strong>CRECER.</strong></span>
              </h1>
              <p className="rv-hero-description">
                Trabajamos con PyMES y empresas B2B que ya tienen valor, clientes o capacidad real, pero enfrentan brechas entre cómo venden, cómo operan y cómo el mercado las entiende.
              </p>
              <div className="rv-hero-actions">
                <Link to="/soluciones/" className="rv-hero-primary flex"
                  onClick={() => trackEvent("cta_click", {source_page: "/", destination: "/soluciones/", context: "product_discovery"})}>
                  <span>CONOCER NUESTROS PRODUCTOS</span><ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link to="/aethryon/" className="rv-hero-secondary flex">CÓMO TRABAJAMOS</Link>
              </div>
            </div>
            <div className="rv-hero-core"><AethryonCore /></div>
            <div className="rv-hero-offer">
              <div className="rv-hero-card">
                <p className="rv-hero-card-label">FRENTE COMERCIAL</p>
                <h2 className="rv-hero-card-title text-xl">Haz más fácil entender, confiar y avanzar con tu empresa.</h2>
                <p className="rv-hero-card-description">Organizamos tu oferta, evidencia y siguiente paso en un activo comercial digital claro, actualizado y fácil de compartir.</p>
                <div className="rv-hero-price"><span>Desde $6,900 MXN + IVA</span></div>
                <Link to="/frente-comercial/" className="rv-hero-primary flex">Conocer Frente Comercial<ArrowRight aria-hidden="true" size={18} /></Link>
              </div>
            </div>
          </div>
          <div className="rv-hero-knowledge">
            <div className="rv-hero-knowledge-heading"><BookOpen aria-hidden="true" /><h2 className="text-xl">Explora nuestro conocimiento</h2></div>
            <p>Artículos, guías y análisis para resolver retos reales de tu empresa</p>
            <Link to="/recursos/" className="rv-hero-knowledge-link flex">Ir a Recursos<ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
          <a href="#problema" className="rv-hero-continue flex" aria-label="Explorar los retos que resolvemos"><ChevronDown aria-hidden="true" /></a>
        </div>
      </section>
      <div className="rv-hero-context rv-hero-container"><p>Primero identificamos dónde está la restricción. Después construimos la capacidad comercial, operativa o tecnológica necesaria para corregirla.</p></div>
    </>
  );
}
