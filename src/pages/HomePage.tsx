import RouteSEO from '../seo/PageMetadata';
import { RAUVIA_ENTITY, ENTITIES } from '../config/entity';
import FadeInUp from '../components/FadeInUp';
import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import MethodologySection from '../components/MethodologySection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import '../styles/scrollReveal.css';


export default function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  useScrollReveal(root, '.rv-home-reveal > section, .rv-home-problems .grid > div');

  const webSiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rauvia.com.mx/#website",
    "name": RAUVIA_ENTITY.name,
    "url": RAUVIA_ENTITY.url,
    "publisher": {
      "@id": "https://rauvia.com.mx/#organization"
    }
  };

  return (
    <div ref={root}>
      <RouteSEO path="/" />
      
      
      
      <FadeInUp>
        <HeroSection />
      </FadeInUp>
      <FadeInUp className="rv-home-reveal rv-home-problems">
        <ProblemSection />
      </FadeInUp>
      <FadeInUp className="rv-home-reveal">
        <MethodologySection />
      </FadeInUp>
      <FadeInUp className="rv-home-reveal">
        <CapabilitiesSection />
      </FadeInUp>
      
    </div>
  );
}
