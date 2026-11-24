import { useRef } from "react";
import { HexIcon, glyphs, hxIdx, useHexMotion } from "./HexTech";

const steps = [
  { num: "01", title: "CLARIDAD", desc: "Entendemos tu negocio, tus objetivos y tus oportunidades.", glyph: glyphs.claridad },
  { num: "02", title: "ESTRUCTURA", desc: "Diseñamos la arquitectura correcta para generar valor.", glyph: glyphs.estructura },
  { num: "03", title: "SISTEMA", desc: "Construimos activos digitales y procesos que funcionan.", glyph: glyphs.sistema },
  { num: "04", title: "MEDICIÓN", desc: "Implementamos métricas para tomar mejores decisiones.", glyph: glyphs.medicion },
  { num: "05", title: "ESCALAMIENTO", desc: "Revisamos lo aprendido y definimos los siguientes ajustes cuando el alcance lo contempla.", glyph: glyphs.escalamiento },
];

export default function MethodologySection() {
  const ref = useRef<HTMLElement>(null);
  useHexMotion(ref);

  return (
    <section ref={ref} className="hx-section bg-rauvia-bg" id="metodologia" aria-labelledby="metodologia-titulo">
      <div className="hx-wrap">
        <div className="hx-method-grid">
          <div data-hx style={hxIdx(0)}>
            <span className="hx-kicker">NUESTRA METODOLOGÍA</span>
            <span className="hx-bar" aria-hidden="true" />
            <h2 id="metodologia-titulo" className="hx-title mt-8">
              De una necesidad concreta <br className="hidden lg:block" />a una solución que se puede <br className="hidden lg:block" />
              <em>poner en práctica.</em>
            </h2>
          </div>

          <ol className="hx-steps">
            {steps.map((step, i) => (
              <li key={step.num} className="hx-step hx-item" data-hx style={hxIdx(i + 1)}>
                <span className="hx-num">{step.num}</span>
                <div className="hx-hexbox"><HexIcon uid={`m${i}`}>{step.glyph}</HexIcon></div>
                <div className="hx-rail" aria-hidden="true"><span /></div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
