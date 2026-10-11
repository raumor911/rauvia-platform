import React, { useState } from 'react';
import { useGeo } from '../context/GeoContext';

export default function GeoBanner() {
  const { isVisitorNonMx, isLoading } = useGeo();
  const [dismissed, setDismissed] = useState(false);

  if (isLoading || !isVisitorNonMx || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
  };

  const handleLeave = () => {
    window.location.href = 'https://google.com';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative">
        <h2 className="text-xl md:text-2xl font-black text-rauvia-navy mb-4">RAUVIA opera actualmente en México</h2>
        <p className="text-slate-600 mb-4 leading-relaxed text-sm md:text-base">
          Los servicios y mecanismos comerciales disponibles en este sitio están dirigidos al mercado mexicano.
        </p>
        <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
          Si te encuentras fuera de México, puedes consultar el contenido informativo del sitio, pero te pedimos no enviar información personal ni iniciar una solicitud comercial salvo que hayas acordado previamente trabajar con RAUVIA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button 
            onClick={handleLeave}
            className="px-6 py-3 text-sm font-bold tracking-wider text-slate-500 hover:text-slate-800 transition-colors uppercase border border-slate-200 rounded min-h-[44px]"
          >
            SALIR DEL SITIO
          </button>
          <button 
            onClick={handleDismiss}
            className="px-6 py-3 text-sm font-bold tracking-wider text-white bg-rauvia-navy hover:bg-rauvia-navy-dark transition-colors rounded uppercase min-h-[44px]"
          >
            CONTINUAR EN MODO INFORMATIVO
          </button>
        </div>
      </div>
    </div>
  );
}
