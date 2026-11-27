import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

// Enlace a Recursos. Mismo texto y destino que tenía dentro del hero.
export default function HomeKnowledgeSection() {
  return (
    <section className="rv-home-knowledge" id="conocimiento" aria-label="Conocimiento y recursos">
      <div className="rv-hero-container">
        <div className="rv-hero-knowledge">
          <div className="rv-hero-knowledge-heading"><BookOpen aria-hidden="true" /><h2 className="text-xl">Explora nuestro conocimiento</h2></div>
          <p>Artículos, guías y análisis para resolver retos reales de tu empresa</p>
          <Link to="/recursos/" className="rv-hero-knowledge-link flex">Ir a Recursos<ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
