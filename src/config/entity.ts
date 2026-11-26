import {PERSONAL_SITE,PERSON_SAME_AS} from './personKnowledge.ts';
export const ENTITIES = {
  organization: {
    "@id": "https://rauvia.com.mx/#organization",
    name: "RAUVIA",
    legalName: "RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO",
    url: "https://rauvia.com.mx",
    logo: "https://rauvia.com.mx/media/RAUVIA_LOGO.png",
    description: "RAUVIA combina trabajo especializado, metodología y tecnología para resolver problemas y desarrollar capacidades comerciales, operativas y tecnológicas en empresas.",
    telephone: "+52 55 8649 4076",
    // Solo país: RAUVIA no publica domicilio; no se inventa calle ni ciudad.
    address: {"@type": "PostalAddress", addressCountry: "MX"},
    areaServed: {"@type": "Country", name: "México"},
    contactPoint: [
      {"@type": "ContactPoint", contactType: "customer service", telephone: "+52 55 8649 4076", url: "https://wa.me/525586494076", availableLanguage: ["es-MX"], areaServed: "MX"},
      {"@type": "ContactPoint", contactType: "privacy", email: "privacidad@rauvia.com.mx", availableLanguage: ["es-MX"]}
    ],
    sameAs: [
      "https://www.facebook.com/rauviaconsulting/",
      "https://www.instagram.com/rauviaconsulting/",
      "https://www.linkedin.com/company/rauvia/"
    ]
  },
  website: {
    "@id": "https://rauvia.com.mx/#website",
    name: "RAUVIA",
    url: "https://rauvia.com.mx"
  },
  founder: {
    "@id": "https://rauvia.com.mx/#raul-morales",
    name: "Raúl Antonio Morales Domínguez",
    jobTitle: "Fundador y Director Estratégico",
    url: PERSONAL_SITE,
    sameAs: [...PERSON_SAME_AS]
  },
  system: {
    "@id": "https://rauvia.com.mx/aethryon/#entity",
    name: "AETHRYON",
    description: "Sistema de análisis y convergencia desarrollado por RAUVIA para estructurar decisiones.",
    url: "https://rauvia.com.mx/aethryon/"
  }
};

export const RAUVIA_ENTITY = ENTITIES.organization;
export const AETHRYON_ENTITY = ENTITIES.system;
