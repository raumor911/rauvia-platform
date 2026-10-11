import {PERSONAL_SITE,PERSON_SAME_AS} from './personKnowledge.ts';
export const ENTITIES = {
  organization: {
    "@id": "https://rauvia.com.mx/#organization",
    name: "RAUVIA",
    legalName: "RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO",
    url: "https://rauvia.com.mx",
    logo: "https://rauvia.com.mx/media/RAUVIA_CONSULTING_LOGO.png",
    description: "RAUVIA es una firma mexicana de consultoría estratégica y desarrollo tecnológico que ayuda a PyMES y empresas B2B con valor real a identificar dónde están perdiendo oportunidades o capacidad y construir la estructura comercial, operativa o tecnológica necesaria para corregirlo.",
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
    url: "https://rauvia.com.mx/aethryon"
  }
};

export const RAUVIA_ENTITY = ENTITIES.organization;
export const AETHRYON_ENTITY = ENTITIES.system;
