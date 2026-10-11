import { useState } from "react";

interface LogoProps {
  variant?: 'default' | 'footer';
  className?: string;
}

export default function Logo({ variant = 'default', className = "" }: LogoProps) {
  const [imgError, setImgError] = useState(false);
  const isFooter = variant === 'footer';

  const logoSrc = "/media/RAUVIA_CONSULTING_LOGO.svg";

  if (isFooter) {
    return (
      <div className={`flex items-center transition-opacity hover:opacity-100 opacity-90 ${className}`}>
        {!imgError ? (
          <img 
            src={logoSrc} 
            alt="RAUVIA Consulting" 
            className="h-8 md:h-9 w-auto object-contain brightness-0 invert"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center gap-3">
            <svg width="34" height="34" viewBox="0 0 80 80" fill="none" className="flex-shrink-0">
              <polygon points="40,5 72,23.5 72,60.5 40,79 8,60.5 8,23.5" stroke="#FFFFFF" strokeWidth="4.5" strokeLinejoin="round" fill="#FFFFFF" fillOpacity="0.05"/>
              <path d="M40,5 L40,42 L72,60.5" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8,23.5 L40,42 M8,60.5 L40,42" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="40" cy="42" r="5" fill="#E6A300"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-[0.18em] text-white leading-none">RAUVIA</span>
              <span className="text-[0.6rem] tracking-[0.3em] text-slate-300 font-semibold leading-none mt-1">CONSULTING</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex-shrink-0 flex items-center ${className}`}>
      {!imgError ? (
        <img 
          src={logoSrc} 
          alt="RAUVIA Consulting" 
          className="h-9 md:h-11 w-auto object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex items-center gap-3">
          <svg width="38" height="38" viewBox="0 0 80 80" fill="none" className="flex-shrink-0">
            <polygon points="40,5 72,23.5 72,60.5 40,79 8,60.5 8,23.5" stroke="#0A2540" strokeWidth="4.5" strokeLinejoin="round" fill="#0A2540" fillOpacity="0.04"/>
            <path d="M40,5 L40,42 L72,60.5" stroke="#1E4A74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8,23.5 L40,42 M8,60.5 L40,42" stroke="#1E4A74" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="40" cy="42" r="5" fill="#E6A300"/>
          </svg>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg md:text-xl tracking-[0.18em] text-rauvia-navy leading-none">RAUVIA</span>
            <span className="text-[0.62rem] tracking-[0.32em] text-slate-500 font-semibold leading-none mt-1">CONSULTING</span>
          </div>
        </div>
      )}
    </div>
  );
}
