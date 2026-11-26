import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// C-05 · Prueba (caso anonimizado). Texto literal de la especificación: no cambiar cifras ni fechas ni agregar
// datos que identifiquen al cliente. Pendiente de autorización de Raúl: vive en su propio commit para poder
// quitarlo del release sin tocar el resto de la home.
export default function HomeProofSection() {
  return (
    <section className="rv-home-proof" id="prueba" aria-labelledby="prueba-titulo">
      <div className="rv-hero-container">
        <article className="rv-proof-card">
          <span className="rv-proof-kicker">PRUEBA</span>
          <h2 id="prueba-titulo" className="rv-proof-title">Un proveedor B2B de infraestructura temporal</h2>
          <p className="rv-proof-text">
            En septiembre de 2026 tenía dos artículos accesibles en su sitio, frente a competidores con catálogos más amplios. Ordenamos su oferta por necesidad, construimos las páginas que faltaban y publicamos fichas de sus proyectos. Al 20 de noviembre su sitio declaraba 58 páginas, y el 26 de noviembre aparecía en la primera página de Google México en las cinco búsquedas comerciales que revisamos. No es una cifra de ventas: es lo que se midió, con fecha.
          </p>
          <Link to="/casos/infraestructura-temporal-b2b/" className="rv-proof-link">Ver el caso<ArrowRight aria-hidden="true" size={18} /></Link>
        </article>
      </div>
    </section>
  );
}
