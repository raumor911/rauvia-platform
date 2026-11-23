import { useRef } from "react";
import { HexIcon, glyphs, hxIdx, useHexMotion } from "./HexTech";

const capabilities = [
  { title: "ESTRATEGIA", desc: "Definimos dirección, propuesta de valor y modelos de crecimiento.", glyph: glyphs.estrategia },
  { title: "SISTEMAS COMERCIALES", desc: "Diseñamos métodos, procesos y experiencias que convierten.", glyph: glyphs.comerciales },
  { title: "TECNOLOGÍA", desc: "Desarrollamos plataformas, integraciones y soluciones a la medida.", glyph: glyphs.tecnologia },
  { title: "AUTOMATIZACIÓN", desc: "Optimizamos operaciones para aumentar eficiencia y reducir fricción.", glyph: glyphs.automatizacion },
  { title: "DATOS & ANALYTICS", desc: "Medimos, analizamos y convertimos datos en decisiones.", glyph: glyphs.datos },
  { title: "ACOMPAÑAMIENTO", desc: "Trabajamos contigo como socio estratégico en cada etapa del crecimiento.", glyph: glyphs.acompanamiento },
];

export default function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null);
  useHexMotion(ref);

  return (
    <section ref={ref} className="hx-section bg-white" id="capacidades" aria-labelledby="capacidades-titulo">
      <div className="hx-wrap">
        <div data-hx style={hxIdx(0)}>
          <h2 id="capacidades-titulo" className="hx-kicker">NUESTRAS CAPACIDADES</h2>
          <span className="hx-bar" aria-hidden="true" />
        </div>
        <ul className="hx-caps">
          {capabilities.map((cap, i) => (
            <li key={cap.title} className="hx-cap hx-item" data-hx style={hxIdx(i + 1)}>
              <div className="hx-hexbox"><HexIcon uid={`c${i}`}>{cap.glyph}</HexIcon></div>
              <h3>{cap.title}</h3>
              <p>{cap.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
