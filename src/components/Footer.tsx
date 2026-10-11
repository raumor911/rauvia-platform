import Logo from "./Logo";
import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Footer({mobileLayer=false}: {mobileLayer?:boolean}) {
  return (
    <footer className={(mobileLayer ? "rv-footer " : "") + "bg-rauvia-navy-dark text-white relative overflow-hidden flex flex-col min-h-[550px] md:min-h-[100svh] justify-between"}>
      
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 overflow-hidden">
         <Link to="/aethryon" className="absolute inset-0 block group cursor-pointer" title="Conocer más sobre AETHRYON">
           <img 
               src="/media/aethryon-end-screen-blueprint.svg"
               loading={mobileLayer ? "lazy" : undefined} 
               alt="AETHRYON Blueprint" 
               className="w-full h-full object-cover object-center absolute inset-0 scale-[2] md:scale-100 group-hover:scale-[2.02] md:group-hover:scale-[1.01] transition-transform opacity-40 md:opacity-100"
           />
         </Link>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-32 pb-16 relative z-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">
          {/* Left Text / Main Message */}
          <div className="w-full lg:col-span-5 xl:col-span-4 order-1 lg:order-none text-center lg:text-left">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug text-slate-300">
              No conectamos herramientas.<br className="hidden sm:block"/>
              Conectamos estrategia,<br className="hidden sm:block"/>
              procesos, tecnología y personas<br className="hidden sm:block"/>
              en un sistema <span className="text-rauvia-gold font-bold">que genera resultados.</span>
            </p>
          </div>

          {/* Spacer */}
          <div className="w-full h-12 lg:h-auto lg:col-span-2 xl:col-span-4 order-2 lg:order-none flex justify-center items-center">
          </div>

          {/* Right Text / Definition & CTA */}
          <div className="w-full lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 border-t lg:border-t-0 lg:border-l border-slate-700/50 pt-8 lg:pt-0 lg:pl-10 order-3 lg:order-none">
            <div>
              <span className="text-rauvia-gold font-bold tracking-widest text-sm uppercase block mb-3">AETHRYON</span>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
                El núcleo que transforma capacidad en estructura y estructura en crecimiento.
              </p>
            </div>
            <WhatsAppCTA 
              href="https://wa.me/525586494076" 
              className="mt-4 flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-rauvia-navy-dark px-8 py-4 rounded text-sm font-bold tracking-wider transition-all min-h-[52px] w-full sm:w-auto"
            >
              INICIAR CONVERSACIÓN
              <ArrowRight className="w-4 h-4" />
            </WhatsAppCTA>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 relative z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:grid md:grid-cols-3 items-center gap-8 md:gap-6 pt-8 border-t border-slate-800">
          <div className="flex justify-center md:justify-start order-2 md:order-1 min-h-[44px] items-center">
            <Logo variant="footer" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 order-1 md:order-2">
            <Link to="/recursos" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Blog</Link>
            <Link to="/casos" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Casos</Link>
            <Link to="/aviso-de-privacidad" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Aviso de Privacidad</Link>
            <Link to="/terminos" className="text-slate-500 hover:text-slate-300 text-xs tracking-wider uppercase py-3 flex items-center min-h-[44px] transition-colors">Términos</Link>
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
        <p className="max-w-[1600px] mx-auto mt-4 text-center text-xs text-slate-400">
          Experiencia digital desarrollada por{' '}
          <a href="https://rauvia.com.mx/" className="inline-flex items-center min-h-[44px] underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">RAUVIA Consulting</a>
        </p>
      </div>
    </footer>
  );
}
