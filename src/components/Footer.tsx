import { useEffect, useRef } from "react";
import Logo from "./Logo";
import ConvergenceField from "./ConvergenceField";
import "../styles/footerEpic.css";
import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Footer({mobileLayer=false}: {mobileLayer?:boolean}) {
  const ref = useRef<HTMLElement>(null);

  // Entrada del cierre al llegar a él (mejora progresiva: solo con IntersectionObserver y sin movimiento reducido).
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("ft-armed");
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { el.classList.add("ft-in"); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); el.classList.remove("ft-armed", "ft-in"); };
  }, []);

  // Si la última sección de la página es oscura, el pie se funde con ella (retícula continua, sin filo ni velo en el borde).
  useEffect(() => {
    const el = ref.current;
    const main = document.querySelector("main");
    if (!el || !main || typeof MutationObserver === "undefined") return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const last = Array.from(main.querySelectorAll("section")).pop();
      if (last?.classList.contains("fx-dark")) el.dataset.join = "dark"; else delete el.dataset.join;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const mo = new MutationObserver(schedule);
    mo.observe(main, { childList: true, subtree: true });
    return () => { mo.disconnect(); if (raf) cancelAnimationFrame(raf); delete el.dataset.join; };
  }, []);

  return (
    <footer ref={ref} className={(mobileLayer ? "rv-footer " : "") + "ft-epic bg-rauvia-navy-dark text-white relative overflow-hidden flex flex-col min-h-[550px] md:min-h-[100svh] justify-between"}>
      
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 overflow-hidden">
         <Link to="/aethryon/" className="absolute inset-0 block group cursor-pointer" title="Conocer más sobre AETHRYON">
           <img 
               src="/media/aethryon-end-screen-blueprint.svg"
               loading={mobileLayer ? "lazy" : undefined} 
               alt="AETHRYON Blueprint" 
               className="w-full h-full object-cover object-center absolute inset-0 scale-[2] md:scale-100 group-hover:scale-[2.02] md:group-hover:scale-[1.01] transition-transform opacity-40 md:opacity-100"
           />
         </Link>
      </div>
      <div className="ft-veil" aria-hidden="true" />
      <ConvergenceField flow="inward" origin={[0.5, 0.46]} className="ft-field" />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-32 pb-16 relative z-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">
          {/* Left Text / Main Message */}
          <div className="w-full lg:col-span-5 xl:col-span-4 order-1 lg:order-none text-center lg:text-left">
            <p data-ft style={{"--i":0} as React.CSSProperties} className="ft-statement text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug text-slate-300">
              No conectamos herramientas.<br className="hidden sm:block"/>
              Conectamos estrategia,<br className="hidden sm:block"/>
              procesos, tecnología y personas<br className="hidden sm:block"/>
              en una solución <span className="ft-gold text-rauvia-gold font-bold">que se puede poner en práctica.</span>
            </p>
          </div>

          {/* Spacer */}
          <div className="w-full h-12 lg:h-auto lg:col-span-2 xl:col-span-4 order-2 lg:order-none flex justify-center items-center">
          </div>

          {/* Right Text / Definition & CTA */}
          <div data-ft style={{"--i":2} as React.CSSProperties} className="ft-side w-full lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 border-t lg:border-t-0 lg:border-l border-slate-700/50 pt-8 lg:pt-0 lg:pl-10 order-3 lg:order-none">
            <div>
              <span className="ft-label text-rauvia-gold font-bold tracking-widest text-sm uppercase block mb-3">AETHRYON</span>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
                Apoya el análisis y la estructuración de decisiones.
              </p>
            </div>
            <WhatsAppCTA 
              href="https://wa.me/525586494076" 
              className="ft-cta mt-4 flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-rauvia-navy-dark px-8 py-4 rounded text-sm font-bold tracking-wider transition-all min-h-[52px] w-full sm:w-auto"
            >
              INICIAR CONVERSACIÓN
              <ArrowRight className="w-4 h-4" />
            </WhatsAppCTA>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 relative z-10">
        <div data-ft style={{"--i":4} as React.CSSProperties} className="ft-bar max-w-[1600px] mx-auto flex flex-col md:grid md:grid-cols-3 items-center gap-8 md:gap-6 pt-8 border-t border-slate-800">
          <div className="flex justify-center md:justify-start order-2 md:order-1 min-h-[44px] items-center">
            <Logo variant="footer" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 order-1 md:order-2">
            <Link to="/recursos/" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Blog</Link>
            <Link to="/trayectoria/" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Trayectoria</Link>
            <Link to="/casos/" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Casos</Link>
            <Link to="/aviso-de-privacidad/" rel="privacy-policy" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Aviso de Privacidad</Link>
            <Link to="/terminos/" rel="terms-of-service" title="Términos y condiciones" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Términos y condiciones</Link>
            <Link to="/contacto-rauvia/" rel="contact" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Contacto</Link>
            <a href="tel:+525586494076" className="whitespace-nowrap text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors" aria-label="Llamar al +52 55 8649 4076">+52 55 8649 4076</a>
          </div>
          <div className="flex justify-center md:justify-end gap-2 order-3 md:order-3 min-h-[44px] items-center">
            <a href="https://www.facebook.com/rauviaconsulting/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition-colors p-2 flex items-center justify-center" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/rauviaconsulting/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition-colors p-2 flex items-center justify-center" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/rauvia/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition-colors p-2 flex items-center justify-center" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
