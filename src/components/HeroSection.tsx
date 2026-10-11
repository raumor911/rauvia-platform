import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import AethryonCore from "./AethryonCore";
import { trackEvent } from "../lib/analytics";

export default function HeroSection() {
  return (
    <section className="rv-home-hero pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden relative">
      {/* Background decoration lines (simplified) */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10">
        <div className="w-[800px] h-[800px] border border-slate-300 rounded-full"></div>
        <div className="absolute w-[600px] h-[600px] border border-slate-300 rounded-full"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 relative z-20 order-1">
            <div className="inline-block">
              <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase">
                Consultoría & Desarrollo Tecnológico
              </span>
            </div>
            
            <h1 
              className="font-extrabold tracking-tight text-rauvia-navy leading-[1.1]"
              style={{ fontSize: "clamp(2.2rem, 9vw, 4.2rem)", letterSpacing: "-0.02em" }}
            >
              CONSTRUIMOS LA ESTRUCTURA <br />
              QUE PERMITE A LAS EMPRESAS <br />
              <span className="text-rauvia-blue">CRECER.</span>
            </h1>
            
            <div className="text-slate-600 text-base xl:text-lg max-w-md space-y-4">
              <p>
                Trabajamos con PyMES y empresas B2B que ya tienen valor, clientes o capacidad real, pero enfrentan brechas entre cómo venden, cómo operan y cómo el mercado las entiende.
              </p>
              <p>
                Primero identificamos dónde está la restricción. Después construimos la capacidad comercial, operativa o tecnológica necesaria para corregirla.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/soluciones/"
                onClick={() => trackEvent("cta_click", {source_page: "/", destination: "/soluciones/", context: "product_discovery"})} 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-5 py-4 sm:py-3 rounded text-sm sm:text-xs xl:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-rauvia-navy/20 min-h-[52px]"
              >
                CONOCER NUESTROS PRODUCTOS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/aethryon"
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-rauvia-navy hover:text-rauvia-blue px-4 py-4 sm:py-3 rounded text-sm sm:text-xs xl:text-sm font-semibold tracking-wide transition-all whitespace-nowrap min-h-[52px]"
              >
                <PlayCircle className="w-5 h-5 text-rauvia-blue" />
                CÓMO TRABAJAMOS
              </Link>
            </div>
          </div>

          {/* Center Column: 3D Canvas */}
          <div className="lg:col-span-7 xl:col-span-5 flex flex-col items-center justify-center relative z-0 order-2">
             <AethryonCore />
          </div>

          {/* Right Column: Pricing Card */}
          <div className="lg:col-span-12 xl:col-span-3 flex justify-center lg:justify-end relative z-20 order-3 xl:order-3">
            <div className="glass-card rounded-xl p-6 xl:p-8 w-full max-w-md xl:max-w-sm border-t-4 border-t-rauvia-blue bg-white/90 backdrop-blur shadow-2xl">
              <div className="mb-2">
                <span className="text-xs font-bold tracking-widest text-rauvia-blue uppercase block mb-3">
                  FRENTE COMERCIAL
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-rauvia-navy leading-snug mb-3">
                  Haz más fácil entender, confiar y avanzar con tu empresa.
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Organizamos tu oferta, evidencia y siguiente paso en un activo comercial digital claro, actualizado y fácil de compartir.
                </p>
                <div className="mb-8">
                  <span className="inline-block bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded text-xs font-bold tracking-wide">
                    Desde $6,900 MXN + IVA
                  </span>
                </div>
                <Link 
                  to="/frente-comercial" 
                  className="w-full py-4 text-sm font-bold bg-rauvia-navy text-white rounded hover:bg-rauvia-navy-dark transition-colors flex items-center justify-center gap-2"
                >
                  Conocer Frente Comercial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
