import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import WhatsAppCTA from "./WhatsAppCTA";

import MainNavbar from "./MainNavbar";

export default function Navbar({mobileLayer=false}: {mobileLayer?:boolean}) {
  return mobileLayer ? <MainNavbar /> : <LegacyNavbar />;
}

function LegacyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) {
      // Return focus to the toggle button when menu closes
      const toggleBtn = document.getElementById('menu-toggle-btn');
      toggleBtn?.focus();
      return;
    }
    
    const panel = panelRef.current;
    if (!panel) return;
    
    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const toggleBtn = document.getElementById('menu-toggle-btn');
    if (!toggleBtn) return;

    // Combine toggle button and panel elements into one array
    const allFocusable = [toggleBtn, ...Array.from(focusableElements)] as HTMLElement[];
    
    const firstElement = allFocusable[0];
    const lastElement = allFocusable[allFocusable.length - 1];
    
    // Focus first element on open (which is the toggle btn, or the first link, let's focus the first link inside the panel)
    if (focusableElements[0]) {
      focusableElements[0].focus();
    }
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const navItems = [
    { name: 'SOLUCIONES', href: '/soluciones' },
    { name: 'AETHRYON', href: '/aethryon' },
    { name: 'CASOS', href: '/casos' },
    { name: 'NOSOTROS', href: '/nosotros' }
  ];

  if (location.pathname === '/frente-comercial') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center min-h-[44px] py-1">
              <Logo />
            </Link>
            <WhatsAppCTA 
              href="https://wa.me/525586494076?text=Hola,%20me%20interesa%20revisar%20mi%20Frente%20Comercial." 
              className="flex items-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-5 py-2.5 rounded text-xs font-semibold tracking-wider transition-all"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'fce_whatsapp', { event_category: 'Frente Comercial', event_label: 'Header CTA' });
                }
              }}
            >
              <span className="hidden sm:inline">REVISAR MI CASO</span>
              <span className="sm:hidden">WHATSAPP</span>
            </WhatsAppCTA>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b-0 border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <div className="relative z-[60] flex items-center h-full">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center min-h-[44px] py-1">
              <Logo />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-xs font-semibold tracking-widest text-rauvia-navy hover:text-rauvia-blue transition-colors py-2 px-2 group"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-rauvia-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4 relative z-[60]">
            <WhatsAppCTA 
              href="https://wa.me/525586494076" 
              className="hidden md:flex items-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-dark text-white px-6 py-2.5 rounded text-xs font-semibold tracking-wider transition-all"
            >
              HABLAR CON RAUVIA
              <ArrowRight className="w-4 h-4" />
            </WhatsAppCTA>
            <button 
              id="menu-toggle-btn"
              className="md:hidden text-rauvia-navy p-2 flex items-center justify-center min-w-[44px] min-h-[44px]"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && createPortal(
        <div className="md:hidden fixed inset-0 z-[40] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-rauvia-navy-dark/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Panel */}
          <div 
            ref={panelRef}
            className="relative w-[85%] max-w-sm h-[100dvh] bg-white shadow-2xl flex flex-col pt-24 px-6 pb-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
          >
            <div className="flex flex-col gap-6 flex-grow">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-lg font-bold text-rauvia-navy hover:text-rauvia-blue py-3 border-b border-slate-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <WhatsAppCTA 
                href="https://wa.me/525586494076" 
                className="w-full flex justify-center items-center gap-2 bg-rauvia-navy text-white px-6 py-4 rounded font-bold tracking-wider transition-all min-h-[52px]"
                onClick={() => setIsOpen(false)}
              >
                HABLAR CON RAUVIA
                <ArrowRight className="w-5 h-5" />
              </WhatsAppCTA>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
