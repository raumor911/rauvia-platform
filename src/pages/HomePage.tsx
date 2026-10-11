import RouteSEO from '../seo/PageMetadata';
import { RAUVIA_ENTITY, ENTITIES } from '../config/entity';
import FadeInUp from '../components/FadeInUp';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import MethodologySection from '../components/MethodologySection';
import CapabilitiesSection from '../components/CapabilitiesSection';


export default function HomePage() {

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
    <>
      <RouteSEO path="/" />
      
      
      
      <FadeInUp>
        <HeroSection />
      </FadeInUp>
      <FadeInUp>
        <ProblemSection />
      </FadeInUp>
      <FadeInUp>
        <MethodologySection />
      </FadeInUp>
      <FadeInUp>
        <CapabilitiesSection />
      </FadeInUp>
      
    </>
  );
}
