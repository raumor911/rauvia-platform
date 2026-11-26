import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// C-06 · Una persona revisa y decide. La línea de AETHRYON ("No conectamos herramientas…") ya vive en el pie y se
// repetía aquí: por decisión de Raúl (2026-11-26) se retiró de este bloque. AETHRYON apoya el análisis; no garantiza resultados.
export default function HomeHumanSection() {
  return (
    <section className="rv-home-human" id="revision-humana" aria-labelledby="revision-humana-titulo">
      <div className="rv-hero-container">
        <div className="rv-human-side">
          <h2 id="revision-humana-titulo" className="rv-human-title">Una persona revisa y decide.</h2>
          <p className="rv-human-text">Usamos inteligencia artificial para analizar y proponer. El análisis parte de la información de tu empresa, marca lo que no se sabe y nada se publica sin que una persona lo revise y lo apruebe. AETHRYON apoya el análisis; no garantiza resultados.</p>
          <Link to="/aethryon/" className="rv-human-link">Conocer AETHRYON<ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
