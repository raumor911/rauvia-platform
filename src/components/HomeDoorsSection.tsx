import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// "Por dónde se empieza": las dos puertas de entrada. Mismo texto, precios y enlaces que tenían dentro del hero.
export default function HomeDoorsSection() {
  return (
    <section className="rv-home-doors" id="por-donde-empezar" aria-label="Por dónde se empieza">
      <div className="rv-hero-container">
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
    </section>
  );
}
