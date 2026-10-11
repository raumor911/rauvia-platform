import React, {Suspense} from 'react';
import {routeLoaders, routeComponent, isMainRoute} from './lib/routeLoader';
import './styles/mobileExperience.css';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { GeoProvider } from './context/GeoContext';
import GeoBanner from './components/GeoBanner';
import TrackingRouteObserver from './components/TrackingRouteObserver';
import AIAssistantWidget from './components/AIAssistantWidget';

// Runs after route content commits, including an asynchronously loaded route.
function ScrollToTop() {
  const {pathname, hash} = useLocation();
  React.useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      if(window.matchMedia('(vertical-viewport-segments:2)').matches) document.querySelector('.rv-main-site')?.scrollTo(0,0);
      return;
    }
    let id = hash.slice(1);
    try {id = decodeURIComponent(id);} catch { /* A malformed fragment does not interrupt reading. */ }
    const element = document.getElementById(id);
    element?.scrollIntoView({behavior:'auto'});
  }, [pathname, hash]);
  return null;
}

export function AppLayout({posts, staticRender=false}: {posts?: import('./lib/wp').WPPost[]; staticRender?: boolean} = {}) {
  const location = useLocation();
  const mobile = isMainRoute(location.pathname);
  React.useEffect(()=>{document.querySelector('meta[name=viewport]')?.setAttribute('content',mobile ? 'width=device-width, initial-scale=1, viewport-fit=cover' : 'width=device-width, initial-scale=1.0');},[mobile]);
  const routeContent = <><Routes>{Object.keys(routeLoaders).map(path => {
    const Page = routeComponent(path as keyof typeof routeLoaders);
    return <Route key={path} path={path} element={<Page {...(path === '/recursos' ? {initialPosts: posts} : {})} />} />;
  })}</Routes><ScrollToTop /></>;
  return (
    <GeoProvider>
      <HelmetProvider>
        <>
          <TrackingRouteObserver />
          <div className={mobile ? "rv-main-site min-h-screen bg-rauvia-bg" : "min-h-screen bg-rauvia-bg"} data-main-route={mobile ? (location.pathname.replace(/\/+$/, '') || 'home') : undefined}>
            <header><Navbar mobileLayer={mobile} /></header>
            
            <main>
              {staticRender ? routeContent : <Suspense fallback={<p role="status" className="px-5 pt-28 pb-12 text-rauvia-navy">Cargando página…</p>}>{routeContent}</Suspense>}
            </main>
            <Footer mobileLayer={mobile} />
          </div>
          <AIAssistantWidget mobileLayer={mobile} />
          <GeoBanner />
        </>
      </HelmetProvider>
    </GeoProvider>
  );
}

export default function App() { return <BrowserRouter><AppLayout /></BrowserRouter>; }
