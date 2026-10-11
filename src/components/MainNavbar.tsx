import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {Link, useLocation} from 'react-router-dom';
import {ArrowRight, Menu, X} from 'lucide-react';
import Logo from './Logo';
import WhatsAppCTA from './WhatsAppCTA';

const items=[['SOLUCIONES','/soluciones'],['AETHRYON','/aethryon'],['CASOS','/casos'],['NOSOTROS','/nosotros'],['RECURSOS','/recursos']];
export default function MainNavbar() {
  const [open,setOpen]=useState(false);
  const panel=useRef<HTMLDivElement>(null), toggle=useRef<HTMLButtonElement>(null);
  const location=useLocation();
  const commercial=/^\/frente-comercial\/?$/.test(location.pathname);
  const wa=commercial ? 'https://wa.me/525586494076?text=Hola,%20me%20interesa%20revisar%20mi%20Frente%20Comercial.' : 'https://wa.me/525586494076';
  const action=commercial ? 'REVISAR MI CASO' : 'HABLAR CON RAUVIA';
  useEffect(()=>{setOpen(false);},[location.key]);
  useEffect(()=>{
    if(!open)return;
    const y=window.scrollY, body=document.body;
    const root=document.getElementById('root'), previousInert=root?.inert;
    if(root)root.inert=true;
    const previous={position:body.style.position,top:body.style.top,width:body.style.width,overflow:body.style.overflow};
    Object.assign(body.style,{position:'fixed',top:`-${y}px`,width:'100%',overflow:'hidden'});
    const controls=()=>Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href],button') || []);
    controls()[0]?.focus();
    function key(e:KeyboardEvent) {
      if(e.key==='Escape') {e.preventDefault();setOpen(false);}
      if(e.key!=='Tab')return;
      const list=controls(),first=list[0],last=list.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    }
    const wide=window.matchMedia('(min-width:1024px)');
    const resize=()=>{if(wide.matches)setOpen(false);};
    document.addEventListener('keydown',key);wide.addEventListener('change',resize);
    return ()=>{document.removeEventListener('keydown',key);wide.removeEventListener('change',resize);Object.assign(body.style,previous);if(root)root.inert=previousInert || false;window.scrollTo(0,y);toggle.current?.focus({preventScroll:true});};
  },[open]);
  return <nav className="rv-navbar fixed top-0 left-0 right-0 z-50 glass-card border-white/20" aria-label="Navegación principal">
    <div className="rv-nav-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <Link to="/" className="flex items-center min-h-[44px] py-1"><Logo /></Link>
      <div className="rv-desktop-nav">{items.map(([label,href])=><Link key={href} to={href} aria-current={location.pathname.replace(/\/$/,'')===href?'page':undefined}>{label}</Link>)}</div>
      <WhatsAppCTA href={wa} className="rv-nav-action bg-rauvia-navy text-white rounded px-5 py-3 text-xs font-semibold tracking-wide">{action}<ArrowRight size={16}/></WhatsAppCTA>
      <button ref={toggle} id="menu-toggle-btn" className="rv-menu-toggle" aria-controls="rv-mobile-menu" aria-expanded={open} aria-label="Abrir menú" onClick={()=>setOpen(true)}><Menu size={24}/></button>
    </div>
    {open&&createPortal(<div className="rv-menu-overlay" onClick={()=>setOpen(false)}>
      <div ref={panel} id="rv-mobile-menu" className="rv-menu-panel" role="dialog" aria-modal="true" aria-label="Menú principal" onClick={e=>e.stopPropagation()}>
        <div className="rv-menu-heading"><span>RAUVIA</span><button aria-label="Cerrar menú" onClick={()=>setOpen(false)}><X size={24}/></button></div>
        <div className="rv-menu-links">{items.map(([label,href])=><Link key={href} to={href} onClick={()=>setOpen(false)}>{label}</Link>)}</div>
        <WhatsAppCTA href={wa} className="rv-menu-action bg-rauvia-navy text-white rounded font-bold" onClick={()=>setOpen(false)}>{action}<ArrowRight size={18}/></WhatsAppCTA>
      </div>
    </div>,document.body)}
  </nav>;
}
