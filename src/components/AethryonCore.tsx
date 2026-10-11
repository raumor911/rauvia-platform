import { Link } from 'react-router-dom';

export default function AethryonCore() {
  const coreFeatures = [
    { num: "01", title: "ESTRATEGIA", desc: "Claridad, foco y dirección" },
    { num: "02", title: "PROCESOS", desc: "Estructura clara y escalable" },
    { num: "03", title: "TECNOLOGÍA", desc: "Plataformas que funcionan" },
    { num: "04", title: "OPERACIÓN", desc: "Eficiencia diaria" },
    { num: "05", title: "RESULTADOS", desc: "Crecimiento medible" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Preserve the desktop vector animation; remove duplicated raster data in its delivery copy. */}
      <Link to="/aethryon" className="w-full h-[300px] sm:h-[400px] lg:h-[550px] xl:h-[700px] relative flex items-center justify-center lg:justify-start xl:justify-center overflow-x-hidden group cursor-pointer" title="Conocer más sobre AETHRYON">
        <picture className="contents">
          <source media="(max-width: 1023px)" type="image/webp"
            srcSet="/media/aethryon-convergence-mobile-640.webp 640w, /media/aethryon-convergence-mobile-960.webp 960w"
            sizes="(max-width: 767px) calc(100vw - 32px), 700px" />
          <img width="1400" height="1060"
           loading="eager" fetchPriority="high" decoding="async" src="/media/aethryon-convergence-animated-optimized-v73.svg"
           alt="Aethryon Core" 
           className="w-full min-w-[320px] max-w-full lg:max-w-none h-full object-contain object-center lg:object-center group-hover:scale-[1.01] transition-transform"
          />
        </picture>
      </Link>

      {/* Mobile Vertical List */}
      <div className="w-full lg:hidden flex flex-col gap-4 mt-8 px-4">
        {coreFeatures.map((item, idx) => (
          <div key={idx} className="glass-card bg-white/90 border border-slate-100 rounded-lg p-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform">
            <div className="text-xl font-black text-rauvia-blue">{item.num}</div>
            <div>
              <div className="text-sm font-bold text-rauvia-navy tracking-wide uppercase">{item.title}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
