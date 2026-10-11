import { Link } from 'react-router-dom';

export default function GrowthStructuralMap() {
  return (
    <Link 
      to="/aethryon" 
      className="block group cursor-pointer w-full max-w-6xl mx-auto px-4"
      title="Conocer más sobre AETHRYON"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1600 500" 
        role="img" 
        aria-labelledby="title desc"
        className="w-full h-auto object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-300"
      >
        <title id="title">Mapa de Capacidades - RAUVIA & AETHRYON</title>
        <desc id="desc">Mapa interactivo de capacidades empresariales en 5 enfoques.</desc>
        <defs>
          <filter id="softGlowMap" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#0B3A53" floodOpacity=".18"/>
          </filter>
          <filter id="goldGlowMap" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#F4B942" floodOpacity=".5"/>
          </filter>
          <style>
            {`
              .map-font { font-family: Inter, system-ui, sans-serif; }
              .stage-card { transition: transform 0.3s ease; }
              .stage-bg { fill: #FFFFFF; stroke: #E2E8F0; stroke-width: 2; transition: all 0.3s ease; }
              .stage-card:hover .stage-bg { stroke: #2563EB; fill: #F8FAFC; filter: url(#softGlowMap); }
            `}
          </style>
        </defs>

        {/* Background Grid & Wave */}
        <rect width="100%" height="100%" fill="#FFFFFF" rx="16"/>
        <path d="M 100 250 Q 400 150 800 250 T 1500 250" fill="none" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4"/>
        
        {/* Connecting Line */}
        <line x1="200" y1="230" x2="1400" y2="230" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 8"/>

        {/* Stage 1 */}
        <g className="stage-card" transform="translate(100, 140)">
          <rect width="220" height="180" rx="16" className="stage-bg"/>
          <circle cx="110" cy="50" r="32" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5"/><image href="/media/iconos-enfoques-rauvia/01-organizar.svg" x="86" y="26" width="48" height="48" />
          <text x="110" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748B" className="map-font">ENFOQUE 01</text>
          <text x="110" y="125" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0F172A" className="map-font">Organizar</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="#475569" className="map-font">Presentación y captura</text>
        </g>

        {/* Stage 2 */}
        <g className="stage-card" transform="translate(400, 140)">
          <rect width="220" height="180" rx="16" className="stage-bg"/>
          <circle cx="110" cy="50" r="32" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5"/><image href="/media/iconos-enfoques-rauvia/02-sistematizar.svg" x="86" y="26" width="48" height="48" />
          <text x="110" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748B" className="map-font">ENFOQUE 02</text>
          <text x="110" y="125" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0F172A" className="map-font">Sistematizar</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="#475569" className="map-font">Procesos replicables</text>
        </g>

        {/* Stage 3 */}
        <g className="stage-card" transform="translate(700, 140)">
          <rect width="220" height="180" rx="16" className="stage-bg"/>
          <circle cx="110" cy="50" r="32" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5"/><image href="/media/iconos-enfoques-rauvia/03-tecnologizar.svg" x="86" y="26" width="48" height="48" />
          <text x="110" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748B" className="map-font">ENFOQUE 03</text>
          <text x="110" y="125" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0F172A" className="map-font">Tecnologizar</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="#475569" className="map-font">Capacidades digitales</text>
        </g>

        {/* Stage 4 */}
        <g className="stage-card" transform="translate(1000, 140)">
          <rect width="220" height="180" rx="16" className="stage-bg"/>
          <circle cx="110" cy="50" r="32" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5"/><image href="/media/iconos-enfoques-rauvia/04-automatizar.svg" x="86" y="26" width="48" height="48" />
          <text x="110" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748B" className="map-font">ENFOQUE 04</text>
          <text x="110" y="125" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0F172A" className="map-font">Automatizar</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="#475569" className="map-font">Reducción de fricción</text>
        </g>

        {/* Stage 5 (AETHRYON Core Highlighted) */}
        <g className="stage-card" transform="translate(1280, 125)">
          <rect width="220" height="210" rx="16" fill="#0B3A53" stroke="#F4B942" strokeWidth="2.5" filter="url(#softGlowMap)"/>
          <circle cx="110" cy="55" r="36" fill="#1E293B" stroke="#F4B942" strokeWidth="2" filter="url(#goldGlowMap)"/><image href="/media/iconos-enfoques-rauvia/05-aethryon.svg" x="82" y="27" width="56" height="56" />
          <text x="110" y="115" textAnchor="middle" fontSize="12" fontWeight="800" fill="#F4B942" className="map-font">ENFOQUE 05 • NÚCLEO</text>
          <text x="110" y="140" textAnchor="middle" fontSize="18" fontWeight="800" fill="#FFFFFF" className="map-font">AETHRYON</text>
          <text x="110" y="162" textAnchor="middle" fontSize="12" fill="#94A3B8" className="map-font">Adaptar y Analizar</text>
          <text x="110" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="#38BDF8" className="map-font">Ver interactivo →</text>
        </g>
      </svg>
    </Link>
  );
}
