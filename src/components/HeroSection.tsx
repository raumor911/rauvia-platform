import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import AethryonCore from "./AethryonCore";
import { trackEvent } from "../lib/analytics";
import "../styles/homeHero.css";

export default function HeroSection() {
  return (
    <section className="rv-home-hero" aria-labelledby="home-hero-title">
      <div className="rv-hero-container">
        <div className="rv-hero-grid">
          {/* Left Column: Copy */}
          <div className="rv-hero-copy">
            <div className="inline-block">
              <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase">
                Consultoría & Desarrollo Tecnológico
              </span>
            </div>
            
            <h1 id="home-hero-title">
              CONSTRUIMOS LA ESTRUCTURA QUE PERMITE A LAS EMPRESAS <span className="text-rauvia-blue">CRECER.</span>
            </h1>

            <div className="rv-hero-description">
              <p>
                Trabajamos con PyMES y empresas B2B que ya tienen valor, clientes o capacidad real, pero enfrentan brechas entre cómo venden, cómo operan y cómo el mercado las entiende.
              </p>
              <p>
                Primero identificamos dónde está la restricción. Después construimos la capacidad comercial, operativa o tecnológica necesaria para corregirla.
              </p>
            </div>

            <div className="rv-hero-actions">
              <Link 
                to="/soluciones/"
                onClick={() => trackEvent("cta_click", {source_page: "/", destination: "/soluciones/", context: "product_discovery"})} 
                className="rv-hero-primary"
              >
                CONOCER NUESTROS PRODUCTOS
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <Link 
                to="/aethryon/"
                className="rv-hero-secondary"
              >
                <PlayCircle aria-hidden="true" className="w-5 h-5 text-rauvia-blue" />
                CÓMO TRABAJAMOS
              </Link>
            </div>
          </div>

          {/* Original AETHRYON vector and accessible capability list. */}
          <div className="rv-hero-core">
             <AethryonCore />
          </div>

          {/* Right Column: Pricing Card */}
          <div className="rv-hero-offer">
            <div className="rv-hero-card">
              <div className="rv-hero-card-content">
                <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase block">
                  FRENTE COMERCIAL
                </span>
                <h2 className="rv-hero-card-title text-xl">
                  Haz más fácil entender, confiar y avanzar con tu empresa.
                </h2>
                <p className="rv-hero-card-description">
                  Organizamos tu oferta, evidencia y siguiente paso en un activo comercial digital claro, actualizado y fácil de compartir.
                </p>
                <div className="rv-hero-price">
                  <span className="inline-block bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded text-xs font-bold tracking-wide">
                    Desde $6,900 MXN + IVA
                  </span>
                </div>
                <Link 
                  to="/frente-comercial/" 
                  className="rv-hero-primary"
                >
                  Conocer Frente Comercial
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rv-hero-knowledge">
        <Link to="/recursos/" className="rv-hero-container rv-hero-knowledge-link flex">
          <span>Explora nuestro conocimiento</span>
          <ArrowRight aria-hidden="true" size={20} />
        </Link>
      </div>
    </section>
  );
}
