import React from 'react';
import { useGeo } from '../context/GeoContext';
import { trackEvent } from '../lib/analytics';

interface WhatsAppCTAProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function WhatsAppCTA({ href, className = '', children, onClick }: WhatsAppCTAProps) {
  const { isVisitorNonMx } = useGeo();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent('whatsapp_click', {
      cta_location: 'whatsapp_cta_component'
    });
    if (onClick) {
      onClick();
    }
  };

  if (isVisitorNonMx) {
    return (
      <button 
        type="button" 
        className={`${className} opacity-50 cursor-not-allowed`}
        title="El contacto comercial está disponible actualmente solo en México."
        onClick={(e) => {
            e.preventDefault();
            alert("Los servicios comerciales de RAUVIA están dirigidos actualmente al mercado mexicano. Si ya tienes un acuerdo previo, por favor utiliza los canales de contacto directos proporcionados.");
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
