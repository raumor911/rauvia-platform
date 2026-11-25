import {ruta90Seo} from '../data/ruta90.js';
// Single source of public route metadata and structured data. Add future landing entries here.
export const routeSeo = {
  "/ruta-90": ruta90Seo,
  "/": {
    "title": "RAUVIA | Servicios digitales y trabajo especializado para empresas",
    "description": "Presenta mejor tu oferta y prepara la información de tu empresa para buscadores y asistentes de IA con servicios de RAUVIA.",
    "canonical": "https://rauvia.com.mx/",
    "ogTitle": "RAUVIA | Servicios digitales y trabajo especializado para empresas",
    "ogDescription": "Presenta mejor tu oferta y prepara la información de tu empresa para buscadores y asistentes de IA con servicios de RAUVIA.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://rauvia.com.mx/#organization",
        "name": "RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO",
        "alternateName": "RAUVIA",
        "url": "https://rauvia.com.mx",
        "logo": "https://rauvia.com.mx/media/RAUVIA_CONSULTING_LOGO.png",
        "description": "RAUVIA combina trabajo especializado, metodología y tecnología para resolver problemas y desarrollar capacidades comerciales, operativas y tecnológicas en empresas.",
        "founder": {
          "@id": "https://rauvia.com.mx/#raul-morales",
          "name": "Raúl Antonio Morales Domínguez",
          "jobTitle": "Fundador y Director Estratégico",
          "url": "https://rauvia.com.mx/nosotros/",
          "sameAs": [
            "https://www.linkedin.com/in/raumor/"
          ]
        },
        "telephone": "+52 55 8649 4076",
        "address": {"@type": "PostalAddress", "addressCountry": "MX"},
        "areaServed": {"@type": "Country", "name": "México"},
        "contactPoint": [
          {"@type": "ContactPoint", "contactType": "customer service", "telephone": "+52 55 8649 4076", "url": "https://wa.me/525586494076", "availableLanguage": ["es-MX"], "areaServed": "MX"},
          {"@type": "ContactPoint", "contactType": "privacy", "email": "privacidad@rauvia.com.mx", "availableLanguage": ["es-MX"]}
        ],
        "sameAs": [
          "https://www.facebook.com/rauviaconsulting/",
          "https://www.instagram.com/rauviaconsulting/",
          "https://www.linkedin.com/company/rauvia/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://rauvia.com.mx/#website",
        "name": "RAUVIA",
        "url": "https://rauvia.com.mx",
        "inLanguage": "es-MX",
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/#webpage",
        "url": "https://rauvia.com.mx/",
        "name": "RAUVIA | Servicios digitales y trabajo especializado para empresas",
        "description": "Presenta mejor tu oferta y prepara la información de tu empresa para buscadores y asistentes de IA con servicios de RAUVIA.",
        "inLanguage": "es-MX",
        "isPartOf": {"@id": "https://rauvia.com.mx/#website"},
        "about": {"@id": "https://rauvia.com.mx/#organization"}
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://rauvia.com.mx/#service",
        "name": "Consultoría estratégica y desarrollo tecnológico",
        "serviceType": "Consultoría estratégica y desarrollo tecnológico para PyMES y empresas B2B",
        "description": "Identifica dónde una empresa pierde oportunidades o capacidad y construye la estructura comercial, operativa o tecnológica necesaria para corregirlo. Las capacidades no forman una ruta obligatoria ni garantizan resultados.",
        "url": "https://rauvia.com.mx/soluciones/",
        "provider": {"@id": "https://rauvia.com.mx/#organization"},
        "areaServed": {"@type": "Country", "name": "México"},
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Enfoques de intervención",
          "itemListElement": [
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Organizar", "description": "Presentación, información y seguimiento básico."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sistematizar", "description": "Procesos y sistemas comerciales replicables."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Tecnologizar", "description": "Convertir procesos definidos en capacidades digitales."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Automatizar", "description": "Reducir trabajo repetitivo y fricción."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Adaptar", "description": "Analizar señales, restricciones y prioridades mediante AETHRYON."}}
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "@id": "https://rauvia.com.mx/aethryon/#entity",
        "name": "AETHRYON",
        "description": "Sistema de análisis y convergencia desarrollado por RAUVIA para estructurar decisiones.",
        "url": "https://rauvia.com.mx/aethryon/"
      }
    ]
  },
  "/nosotros": {
    "title": "Nosotros | Trabajo especializado y tecnología para empresas | RAUVIA",
    "description": "Conoce cómo RAUVIA combina trabajo especializado, metodología y tecnología para resolver problemas y desarrollar capacidades en empresas.",
    "canonical": "https://rauvia.com.mx/nosotros/",
    "ogTitle": "Nosotros | Trabajo especializado y tecnología para empresas | RAUVIA",
    "ogDescription": "Conoce cómo RAUVIA combina trabajo especializado, metodología y tecnología para resolver problemas y desarrollar capacidades en empresas.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://rauvia.com.mx/nosotros/#webpage",
        "url": "https://rauvia.com.mx/nosotros/",
        "name": "Nosotros - RAUVIA",
        "description": "RAUVIA combina trabajo especializado, metodología y tecnología para resolver problemas y desarrollar capacidades comerciales, operativas y tecnológicas en empresas.",
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "mainEntity": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://rauvia.com.mx/#raul-morales",
        "name": "Raúl Antonio Morales Domínguez",
        "jobTitle": "Fundador y Director Estratégico",
        "url": "https://rauvia.com.mx/nosotros/",
        "sameAs": [
          "https://www.linkedin.com/in/raumor/"
        ],
        "worksFor": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/soluciones": {
    "title": "RAUVIA Consulting | Portafolio de Soluciones",
    "description": "Catálogo de soluciones empresariales. RAUVIA construye capacidades que las organizaciones incorporan para resolver etapas específicas de crecimiento.",
    "canonical": "https://rauvia.com.mx/soluciones/",
    "ogTitle": "RAUVIA Consulting | Portafolio de Soluciones",
    "ogDescription": "Catálogo de soluciones empresariales. RAUVIA construye capacidades que las organizaciones incorporan para resolver etapas específicas de crecimiento.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://rauvia.com.mx/soluciones/#webpage",
        "url": "https://rauvia.com.mx/soluciones/",
        "name": "Portafolio de Soluciones - RAUVIA",
        "description": "Catálogo de soluciones empresariales. RAUVIA combina trabajo especializado, metodología y tecnología para resolver problemas y desarrollar capacidades comerciales, operativas y tecnológicas en empresas.",
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/aethryon": {
    "title": "RAUVIA Consulting | AETHRYON",
    "description": "AETHRYON es el sistema de análisis de RAUVIA para identificar qué está frenando el crecimiento de una empresa y convertirlo en una ruta de acción.",
    "canonical": "https://rauvia.com.mx/aethryon/",
    "ogTitle": "RAUVIA Consulting | AETHRYON",
    "ogDescription": "AETHRYON es el sistema de análisis de RAUVIA para identificar qué está frenando el crecimiento de una empresa y convertirlo en una ruta de acción.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/aethryon/#webpage",
        "name": "AETHRYON - RAUVIA",
        "url": "https://rauvia.com.mx/aethryon/",
        "description": "Sistema de análisis y convergencia desarrollado por RAUVIA para estructurar decisiones.",
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "mainEntity": {
          "@type": "Thing",
          "@id": "https://rauvia.com.mx/aethryon/#entity",
          "name": "AETHRYON",
          "description": "Sistema de análisis y convergencia desarrollado por RAUVIA para estructurar decisiones."
        }
      }
    ]
  },
  "/recursos": {
    "title": "Recursos y Blog | RAUVIA",
    "description": "Artículos, guías y recursos sobre crecimiento estructural, sistemas comerciales y arquitectura operativa.",
    "canonical": "https://rauvia.com.mx/recursos/",
    "ogTitle": "Recursos y Blog | RAUVIA",
    "ogDescription": "Artículos, guías y recursos sobre crecimiento estructural, sistemas comerciales y arquitectura operativa.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://rauvia.com.mx/recursos/#webpage",
        "url": "https://rauvia.com.mx/recursos/",
        "name": "Recursos y Blog | RAUVIA",
        "description": "Artículos, guías y recursos sobre crecimiento estructural, sistemas comerciales y arquitectura operativa.",
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/frente-comercial": {
    "title": "Frente Comercial para PyMES | RAUVIA Consulting",
    "description": "Organiza cómo presentas tu empresa, productos y servicios en un activo comercial digital claro, actualizado y fácil de compartir.",
    "canonical": "https://rauvia.com.mx/frente-comercial/",
    "ogTitle": "Frente Comercial para PyMES | RAUVIA Consulting",
    "ogDescription": "Organiza cómo presentas tu empresa, productos y servicios en un activo comercial digital claro, actualizado y fácil de compartir.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Frente Comercial",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "description": "Frente Comercial organiza y traduce la oferta de una empresa en un activo digital que permite al comprador entender con claridad qué puede contratar, por qué confiar y cuál es el siguiente paso.",
        "offers": [
          {
            "@type": "Offer",
            "name": "Frente Comercial Esencial",
            "price": "6900.00",
            "priceCurrency": "MXN",
            "priceSpecification": {"@type": "UnitPriceSpecification", "price": "6900.00", "priceCurrency": "MXN", "valueAddedTaxIncluded": false},
            "description": "Activo comercial para presentar la oferta de la empresa de manera clara y profesional. Precio en MXN + IVA, pago único."
          },
          {
            "@type": "Offer",
            "name": "Frente Comercial Pro",
            "price": "9900.00",
            "priceCurrency": "MXN",
            "priceSpecification": {"@type": "UnitPriceSpecification", "price": "9900.00", "priceCurrency": "MXN", "valueAddedTaxIncluded": false},
            "description": "Activo comercial avanzado para empresas con soluciones técnicas que necesitan mayor explicación. Precio en MXN + IVA, pago único."
          },
          {
            "@type": "Offer",
            "name": "Frente Comercial Portafolio",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "13900.00",
              "priceCurrency": "MXN",
              "valueAddedTaxIncluded": false,
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitCode": "C62"
              }
            },
            "description": "Activo comercial estructurado para empresas con múltiples líneas de servicio y rutas de decisión. Precio «desde» en MXN + IVA, pago único."
          }
        ]
      }
    ]
  },
  "/sitio-web-comercial-para-pymes": {
    "title": "Sitio web comercial para PyMES | RAUVIA",
    "description": "RAUVIA diseña sitios web comerciales para PyMES que necesitan ordenar su oferta, explicar sus servicios, mostrar evidencia y convertir visitas en conversaciones reales.",
    "canonical": "https://rauvia.com.mx/sitio-web-comercial-para-pymes/",
    "ogTitle": "Sitio web comercial para PyMES | RAUVIA",
    "ogDescription": "RAUVIA diseña sitios web comerciales para PyMES que necesitan ordenar su oferta, explicar sus servicios, mostrar evidencia y convertir visitas en conversaciones reales.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/sitio-web-comercial-para-pymes/#webpage",
        "url": "https://rauvia.com.mx/sitio-web-comercial-para-pymes/",
        "name": "Sitio web comercial para PyMES | RAUVIA",
        "description": "RAUVIA diseña sitios web comerciales para PyMES que necesitan ordenar su oferta, explicar sus servicios, mostrar evidencia y convertir visitas en conversaciones reales.",
        "isPartOf": {
          "@id": "https://rauvia.com.mx/#website"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/sitio-web-comercial-para-pymes/#service",
        "name": "Sitio web comercial para PyMES",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "description": "RAUVIA construye sitios web comerciales pensados para explicar mejor una oferta, ordenar servicios y generar conversaciones con prospectos."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/sitio-web-comercial-para-pymes/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sitio web comercial para PyMES",
            "item": "https://rauvia.com.mx/sitio-web-comercial-para-pymes/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/sitio-web-comercial-para-pymes/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿RAUVIA hace páginas web?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, pero no como un servicio aislado de diseño. RAUVIA construye sitios web comerciales pensados para explicar mejor una oferta, ordenar servicios y generar conversaciones con prospectos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto es lo mismo que una landing page?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede parecerse, pero no siempre es lo mismo. Una landing normalmente se enfoca en una campaña o una oferta puntual. Un sitio web comercial funciona como la base de presentación de tu empresa."
            }
          },
          {
            "@type": "Question",
            "name": "¿Necesito tener todo claro antes de empezar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No necesariamente. Parte del trabajo consiste en ayudarte a ordenar lo que vendes, cómo lo explicas y qué debe entender el cliente antes de contactarte."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto sirve si vendo por WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Uno de los objetivos es que WhatsApp no tenga que cargar con toda la explicación. El sitio debe preparar mejor al cliente antes de iniciar la conversación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto sirve para empresas B2B?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Es especialmente útil para empresas que venden servicios, soluciones técnicas, proyectos, infraestructura, consultoría o productos que requieren explicación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Incluye una base SEO y GEO: estructura clara, títulos, contenido por intención, preguntas frecuentes y enlaces internos. Si después se quiere crecer en posicionamiento, se pueden crear páginas adicionales por intención de búsqueda."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué pasa si mi empresa todavía no tiene una oferta bien ordenada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Entonces puede ser buen momento para empezar. Si hay valor real, experiencia o capacidad, RAUVIA puede ayudarte a convertir eso en una presentación comercial más clara."
            }
          }
        ]
      }
    ]
  },
  "/sitio-web-servicios-especializados": {
    "title": "Sitio web para empresas de servicios especializados | RAUVIA",
    "description": "RAUVIA construye sitios web comerciales para empresas de servicios especializados que necesitan explicar mejor su valor, mostrar evidencia y convertir visitas en conversaciones reales.",
    "canonical": "https://rauvia.com.mx/sitio-web-servicios-especializados/",
    "ogTitle": "Sitio web para empresas de servicios especializados | RAUVIA",
    "ogDescription": "RAUVIA construye sitios web comerciales para empresas de servicios especializados que necesitan explicar mejor su valor, mostrar evidencia y convertir visitas en conversaciones reales.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/sitio-web-servicios-especializados/#webpage",
        "url": "https://rauvia.com.mx/sitio-web-servicios-especializados/",
        "name": "Sitio web para empresas de servicios especializados | RAUVIA",
        "description": "RAUVIA construye sitios web comerciales para empresas de servicios especializados que necesitan explicar mejor su valor, mostrar evidencia y convertir visitas en conversaciones reales.",
        "isPartOf": {
          "@id": "https://rauvia.com.mx/#website"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/sitio-web-servicios-especializados/#service",
        "name": "Sitio web para empresas de servicios especializados",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "description": "RAUVIA construye sitios web comerciales para empresas que venden servicios especializados y necesitan explicar mejor su valor."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/sitio-web-servicios-especializados/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sitio web para servicios especializados",
            "item": "https://rauvia.com.mx/sitio-web-servicios-especializados/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/sitio-web-servicios-especializados/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Esto es una página web normal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No exactamente. Es una página o sitio construido con intención comercial. Además de verse bien, debe explicar tu oferta, reducir dudas y orientar al cliente hacia el siguiente paso."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto sirve para empresas técnicas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Tiene mucho sentido cuando el servicio requiere explicación, contexto, fotografías, alcance, proceso o criterios de cotización."
            }
          },
          {
            "@type": "Question",
            "name": "¿Sirve si mis servicios cambian según cada cliente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. En ese caso, el sitio no debe prometer paquetes rígidos. Debe explicar cómo evalúas cada caso, qué información necesitas y cómo puede avanzar el cliente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto reemplaza una llamada o cotización?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. La prepara mejor. La idea es que el cliente llegue con más claridad y menos dudas básicas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué pasa si todavía no tengo bien ordenados mis servicios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ese puede ser parte del trabajo. RAUVIA ayuda a ordenar tu oferta para que el sitio no sólo publique información, sino que explique mejor lo que vendes."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye conexión con WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. El sitio puede incluir llamados a WhatsApp, mensajes prellenados y rutas claras para que el cliente pueda iniciar conversación de forma más natural."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Incluye una base SEO y GEO: estructura clara, títulos, contenido por intención, preguntas frecuentes, enlaces internos y contenido pensado para que buscadores y modelos de IA entiendan mejor tu oferta."
            }
          }
        ]
      }
    ]
  },
  "/casos": {
    "title": "Casos y evidencia | RAUVIA Consulting",
    "description": "Intervenciones documentadas de RAUVIA: situación, restricción, capacidades construidas y evidencia observable.",
    "canonical": "https://rauvia.com.mx/casos/",
    "ogTitle": "Casos y evidencia | RAUVIA Consulting",
    "ogDescription": "Intervenciones documentadas de RAUVIA: situación, restricción, capacidades construidas y evidencia observable.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Casos y evidencia",
        "description": "Intervenciones documentadas de RAUVIA: situación, restricción, capacidades construidas y evidencia observable.",
        "url": "https://rauvia.com.mx/casos/",
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/casos/infraestructura-temporal-b2b": {
    "title": "De generar conversaciones a entender la demanda | Caso RAUVIA",
    "description": "Caso en evolución de una empresa B2B que comenzó mejorando su captación digital y ahora construye un sistema para calificar demanda y retroalimentar decisiones comerciales.",
    "canonical": "https://rauvia.com.mx/casos/infraestructura-temporal-b2b/",
    "ogTitle": "De generar conversaciones a entender la demanda | Caso RAUVIA",
    "ogDescription": "Caso en evolución de una empresa B2B que comenzó mejorando su captación digital y ahora construye un sistema para calificar demanda y retroalimentar decisiones comerciales.",
    "ogType": "article",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "De generar conversaciones a entender la demanda",
        "description": "Caso en evolución de una empresa B2B que comenzó mejorando su captación digital y ahora construye un sistema para calificar demanda y retroalimentar decisiones comerciales.",
        "author": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "url": "https://rauvia.com.mx/casos/infraestructura-temporal-b2b/",
        "mainEntityOfPage": "https://rauvia.com.mx/casos/infraestructura-temporal-b2b/"
      }
    ]
  },
  "/pagina-comercial-servicios-profesionales": {
    "title": "Página comercial para servicios profesionales | RAUVIA",
    "description": "RAUVIA construye páginas comerciales para servicios profesionales que necesitan explicar mejor su oferta, generar confianza y convertir visitas en conversaciones reales.",
    "canonical": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/",
    "ogTitle": "Página comercial para servicios profesionales | RAUVIA",
    "ogDescription": "RAUVIA construye páginas comerciales para servicios profesionales que necesitan explicar mejor su oferta, generar confianza y convertir visitas en conversaciones reales.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/RAUVIA_CONSULTING_LOGO.png",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/#webpage",
        "url": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/",
        "name": "Página comercial para servicios profesionales | RAUVIA",
        "description": "RAUVIA construye páginas comerciales para servicios profesionales que necesitan explicar mejor su oferta, generar confianza y convertir visitas en conversaciones reales.",
        "inLanguage": "es-MX",
        "isPartOf": {
          "@id": "https://rauvia.com.mx/#website"
        },
        "about": {
          "@id": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/#service",
        "name": "Frente Comercial para servicios profesionales",
        "url": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/",
        "description": "RAUVIA construye páginas comerciales para servicios profesionales que necesitan explicar mejor su oferta, generar confianza y convertir visitas en conversaciones reales.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Página comercial para servicios profesionales",
            "item": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/pagina-comercial-servicios-profesionales/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Esto es una página web normal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No exactamente. Es una página con intención comercial. Además de presentar quién eres, debe explicar tu valor, generar confianza y orientar al cliente hacia el siguiente paso."
            }
          },
          {
            "@type": "Question",
            "name": "¿Sirve para consultores?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Tiene mucho sentido cuando vendes conocimiento, criterio, acompañamiento o experiencia."
            }
          },
          {
            "@type": "Question",
            "name": "¿Sirve para profesionistas independientes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Especialmente si tu reputación, experiencia y forma de trabajar necesitan explicarse mejor."
            }
          },
          {
            "@type": "Question",
            "name": "¿Necesito tener mis servicios bien definidos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No necesariamente. Parte del trabajo puede ser ordenar tu oferta para que el cliente la entienda mejor."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto reemplaza una llamada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. La prepara mejor. La idea es que el cliente llegue con más claridad y confianza antes de conversar contigo."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Puede incluir llamados a WhatsApp con mensajes prellenados para que el contacto sea más fácil y natural."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Incluye una base SEO y GEO: estructura clara, títulos, contenido por intención, preguntas frecuentes y enlaces internos."
            }
          }
        ]
      }
    ]
  },
  "/pagina-web-gratis-para-medicos": {
    "title": "Página web gratis para médicos | RAUVIA",
    "description": "RAUVIA ofrece páginas web gratis para médicos bajo dominio RAUVIA, con perfil profesional, WhatsApp y base SEO/GEO para presencia digital.",
    "canonical": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/",
    "ogTitle": "Página web gratis para médicos | RAUVIA",
    "ogDescription": "Página médica gratuita bajo dominio RAUVIA, con perfil profesional, WhatsApp y base SEO/GEO.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/images/landing-medicos/hero.webp",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/",
        "url": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/",
        "name": "Página web gratis para médicos | RAUVIA",
        "description": "RAUVIA ofrece páginas web gratis para médicos bajo dominio RAUVIA, con perfil profesional, WhatsApp y base SEO/GEO para presencia digital.",
        "inLanguage": "es-MX",
        "about": {
          "@id": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/#servicio"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/#servicio",
        "name": "Presencia Médica RAUVIA",
        "serviceType": "Creación de página web informativa para médicos",
        "description": "RAUVIA ofrece páginas web gratis para médicos bajo dominio RAUVIA, con perfil profesional, WhatsApp y base SEO/GEO para presencia digital.",
        "provider": {
          "@type": "Organization",
          "name": "RAUVIA",
          "url": "https://rauvia.com.mx/"
        },
        "offers": {
          "@type": "Offer",
          "name": "Plan básico bajo dominio RAUVIA sin costo inicial",
          "price": "0",
          "priceCurrency": "MXN",
          "url": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/#preguntas",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿De verdad es gratis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. La versión básica bajo dominio RAUVIA no tiene costo inicial. Las opciones de dominio propio, diseño personalizado y ampliaciones son de pago y se cotizan por separado."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué dominio tendrá mi sitio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tu sitio se publicará bajo dominio RAUVIA, mediante una ruta o subdominio según la arquitectura acordada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye dominio propio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. El plan gratuito utiliza dominio RAUVIA. Si necesitas un dominio propio, podemos cotizarlo como parte de una opción personalizada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye agenda de citas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. El sitio incluye un botón de WhatsApp como vía directa de contacto, pero no incluye agenda ni sistema de citas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Incluye un botón de WhatsApp para facilitar el contacto con el médico o consultorio."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Incluye una base inicial de SEO local y GEO: estructura, títulos e información clara sobre especialidad, ubicación y servicios. No garantiza posiciones en buscadores ni resultados inmediatos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo personalizar el diseño?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La versión gratuita utiliza un diseño estándar. Si necesitas una identidad visual más propia, más secciones o un diseño a medida, se cotiza según el alcance."
            }
          },
          {
            "@type": "Question",
            "name": "¿RAUVIA hace trámites regulatorios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No están incluidos por defecto. El médico o consultorio es responsable de contar con la documentación profesional y regulatoria aplicable para comunicar sus servicios."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo publicar tratamientos o servicios específicos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, siempre que la información sea clara, verificable, apropiada y validada por el profesional. Debe evitar afirmaciones sin sustento y promesas de resultados médicos."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Página web gratis para médicos",
            "item": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/"
          }
        ]
      }
    ],
    "imageAlt": "Ejemplo ilustrativo de página médica RAUVIA"
  },
  "/pagina-web-para-medicos-especialistas": {
    "title": "Página web para médicos especialistas | RAUVIA",
    "description": "RAUVIA crea páginas web para médicos especialistas con perfil profesional, especialidad, ubicación, WhatsApp, agenda de citas y estructura SEO/GEO.",
    "canonical": "https://rauvia.com.mx/pagina-web-para-medicos-especialistas/",
    "ogTitle": "Página web para médicos especialistas | RAUVIA",
    "ogDescription": "Páginas web profesionales para médicos especialistas con perfil, trayectoria, ubicación, WhatsApp, agenda y estructura SEO/GEO.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/images/medicos-especialistas/mockup-collage-especialista.webp",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/pagina-web-para-medicos-especialistas/",
        "url": "https://rauvia.com.mx/pagina-web-para-medicos-especialistas/",
        "name": "Página web para médicos especialistas | RAUVIA",
        "description": "RAUVIA crea páginas web para médicos especialistas con perfil profesional, especialidad, ubicación, WhatsApp, agenda de citas y estructura SEO/GEO.",
        "inLanguage": "es-MX",
        "about": {
          "@id": "https://rauvia.com.mx/pagina-web-para-medicos-especialistas/#servicio"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/pagina-web-para-medicos-especialistas/#servicio",
        "name": "Página web para médicos especialistas",
        "serviceType": "Diseño y desarrollo de presencia digital profesional",
        "description": "RAUVIA crea páginas web para médicos especialistas con perfil profesional, especialidad, ubicación, WhatsApp, agenda de citas y estructura SEO/GEO.",
        "provider": {
          "@type": "Organization",
          "name": "RAUVIA Consulting",
          "url": "https://rauvia.com.mx/"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/pagina-web-para-medicos-especialistas/#preguntas",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Esto es una página web normal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No exactamente. Es una página pensada para presentar mejor tu perfil profesional, especialidad, ubicación y forma de contacto."
            }
          },
          {
            "@type": "Question",
            "name": "¿Sirve si ya tengo Doctoralia u otro perfil?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Los perfiles externos ayudan, pero tu sitio propio puede funcionar como una base más controlada para explicar tu práctica profesional."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Puede incluir botón de WhatsApp para facilitar el contacto del paciente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye agenda?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Puede incluir una opción básica para solicitar o agendar cita, según el alcance definido."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Incluye una base SEO/GEO. Si necesitas una estrategia local más avanzada, se puede trabajar como un servicio adicional."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo empezar con la página gratuita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. La página gratuita puede ser una primera versión. Si después necesitas una presentación más personalizada, puedes crecer hacia una página para especialista o Frente Comercial Médico."
            }
          },
          {
            "@type": "Question",
            "name": "¿RAUVIA redacta información médica?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "RAUVIA puede ayudar a estructurar y redactar información informativa, pero el médico debe validar que todo lo publicado sea correcto, profesional y adecuado."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Página web para médicos especialistas",
            "item": "https://rauvia.com.mx/pagina-web-para-medicos-especialistas/"
          }
        ]
      }
    ],
    "imageWidth": "1600",
    "imageHeight": "900",
    "imageAlt": "Collage de mockups para página web de médicos especialistas."
  },
  "/seo-local-para-medicos": {
    "title": "SEO local para médicos | Revisa tu presencia local | RAUVIA",
    "description": "Revisa cómo se relacionan tu especialidad, ubicación, sitio y contacto. SEO local para médicos, especialistas y consultorios, con alcance definido según los activos de tu práctica.",
    "canonical": "https://rauvia.com.mx/seo-local-para-medicos/",
    "ogTitle": "SEO local para médicos | RAUVIA",
    "ogDescription": "Ordenamos tu presencia digital local para que pacientes, buscadores y modelos de IA entiendan mejor tu especialidad, ubicación y forma de contacto.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/images/seo-local-medicos/mockup-seo-local-medico.webp",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/seo-local-para-medicos/",
        "url": "https://rauvia.com.mx/seo-local-para-medicos/",
        "name": "SEO local para médicos | Revisa tu presencia local | RAUVIA",
        "description": "Revisa cómo se relacionan tu especialidad, ubicación, sitio y contacto. SEO local para médicos, especialistas y consultorios, con alcance definido según los activos de tu práctica.",
        "inLanguage": "es-MX",
        "about": {
          "@id": "https://rauvia.com.mx/seo-local-para-medicos/#servicio"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-local-para-medicos/#servicio",
        "name": "SEO local para médicos",
        "serviceType": "Estructura y revisión de presencia digital local",
        "description": "Revisa cómo se relacionan tu especialidad, ubicación, sitio y contacto. SEO local para médicos, especialistas y consultorios, con alcance definido según los activos de tu práctica.",
        "provider": {
          "@type": "Organization",
          "name": "RAUVIA Consulting",
          "url": "https://rauvia.com.mx/"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/seo-local-para-medicos/#preguntas",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿SEO local significa aparecer primero en Google?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. El trabajo puede mejorar la claridad y consistencia de la información local, pero no controla el ranking ni garantiza una posición."
            }
          },
          {
            "@type": "Question",
            "name": "¿Necesito una página web para trabajar SEO local?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No siempre. Si ya tienes sitio o perfiles, primero delimitamos qué se revisará. Si todavía no tienes una página y quieres crearla, revisa la ruta de página web para médicos; desarrollo y SEO local se cotizan como alcances distintos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto incluye editar Google Maps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La revisión de un perfil puede incluirse si se identifica y acuerda en el alcance. RAUVIA no debe prometer acceso, edición ni administración del perfil sin autorización y capacidad confirmadas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto sirve si atiendo en varios consultorios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede revisarse la relación entre profesionales, ubicaciones, horarios y contacto. Antes se define qué sedes entran y quién valida sus datos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto sirve si ya tengo Doctoralia u otro perfil?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede revisarse cómo se relaciona un perfil público autorizado con tu sitio y otros activos incluidos. No implica alianza con el directorio, control sobre su contenido ni sustitución del perfil."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye contenido médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede organizar contenido informativo basado en datos que el profesional proporcione y valide. RAUVIA no inventa credenciales, tratamientos ni resultados clínicos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo empezar con la página gratuita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La página gratuita es una opción de creación de sitio con alcance propio; no equivale a un servicio de SEO local ni incluye automáticamente revisión de perfiles externos."
            }
          },
          {
            "@type": "Question",
            "name": "¿En cuánto tiempo se ven resultados?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No hay un plazo garantizado. El alcance del trabajo puede tener una fecha acordada en la propuesta, pero indexación, posiciones, menciones y contactos dependen de plataformas y condiciones externas."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "SEO local para médicos | RAUVIA",
            "item": "https://rauvia.com.mx/seo-local-para-medicos/"
          }
        ]
      }
    ],
    "imageWidth": "1600",
    "imageHeight": "900",
    "imageAlt": "Concepto de SEO local para médicos con búsqueda, mapa, ubicación del consultorio y sitio médico."
  },
  "/pagina-web-para-medicos": {
    "title": "Página web para médicos | Presenta tu práctica | RAUVIA",
    "description": "Crea o actualiza tu página web para médicos. Presenta tu especialidad, ubicación y contacto, o revisa la ruta para mejorar el posicionamiento de un sitio existente.",
    "canonical": "https://rauvia.com.mx/pagina-web-para-medicos/",
    "ogTitle": "Página web para médicos | RAUVIA",
    "ogDescription": "Construye una presencia médica profesional que explique quién eres, qué atiendes, dónde te encuentras y cómo pueden contactarte.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/images/pagina-web-medicos/mockup-pagina-web-medico.webp",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/pagina-web-para-medicos/",
        "url": "https://rauvia.com.mx/pagina-web-para-medicos/",
        "name": "Página web para médicos | Presenta tu práctica | RAUVIA",
        "description": "Crea o actualiza tu página web para médicos. Presenta tu especialidad, ubicación y contacto, o revisa la ruta para mejorar el posicionamiento de un sitio existente.",
        "inLanguage": "es-MX",
        "about": {
          "@id": "https://rauvia.com.mx/pagina-web-para-medicos/#servicio"
        },
        "breadcrumb": {
          "@id": "https://rauvia.com.mx/pagina-web-para-medicos/#breadcrumb"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/pagina-web-para-medicos/#servicio",
        "name": "Página web para médicos",
        "serviceType": "Diseño y desarrollo de presencia digital profesional",
        "description": "Crea o actualiza tu página web para médicos. Presenta tu especialidad, ubicación y contacto, o revisa la ruta para mejorar el posicionamiento de un sitio existente.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/pagina-web-para-medicos/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Soluciones",
            "item": "https://rauvia.com.mx/soluciones/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Página web para médicos",
            "item": "https://rauvia.com.mx/pagina-web-para-medicos/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/pagina-web-para-medicos/#preguntas",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué debe tener una página web para un médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Debe presentar al profesional, su especialidad, ubicación y forma de contacto. Según la práctica, puede incluir trayectoria validada, horarios, preguntas frecuentes y una vía para solicitar cita."
            }
          },
          {
            "@type": "Question",
            "name": "¿Necesito una página si ya aparezco en Google Maps o en un directorio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depende de tu necesidad. Esos perfiles pueden ayudar a que las personas te encuentren; una página propia puede reunir la información profesional que validas y explicar cómo contactar contigo. No es obligatorio crear una si la presencia actual ya cumple tu objetivo."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo incluir WhatsApp en mi página?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, si WhatsApp forma parte de tus canales de atención. El número y la forma de contacto se confirman contigo; el botón no implica respuestas automáticas ni una agenda conectada."
            }
          },
          {
            "@type": "Question",
            "name": "¿La página puede incluir agenda de citas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede incluir una vía de solicitud o una integración acordada para el proyecto. La disponibilidad y la confirmación dependen del proceso real de la práctica y de la herramienta instalada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo presentar diferentes consultorios o sedes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, si la información de cada ubicación, sus horarios y canales está confirmada. Para varios profesionales o sedes, revisamos si corresponde la página para consultorio médico."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo explicar mi especialidad y trayectoria?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. RAUVIA puede organizar el contenido que proporciones; tú validas la exactitud de la especialidad, formación, trayectoria y demás afirmaciones antes de publicar."
            }
          },
          {
            "@type": "Question",
            "name": "¿Una página web ayuda al SEO local?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede aportar una base clara para relacionar tu práctica, especialidad, ubicación y contacto. El posicionamiento depende de distintos factores y no se garantiza. Si ya tienes sitio y buscas revisar esta necesidad, consulta la ruta de SEO local para médicos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia hay entre la página gratuita y una página personalizada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La opción gratuita tiene el alcance básico publicado bajo dominio RAUVIA. La opción personalizada define diseño, secciones y funciones de acuerdo con la práctica. Revisa las condiciones vigentes de cada opción antes de solicitarla."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es el Frente Comercial Médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Es un alcance que puede integrar presencia web, contenido, contacto y medición según la necesidad de un profesional o consultorio. Los componentes se definen para cada proyecto; no implica resultados garantizados."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto cuesta una página web para médicos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La página pública presenta una opción gratuita, una página personalizada desde $7,900 MXN + IVA y Frente Comercial Médico desde $13,900 MXN + IVA. El alcance y las condiciones deben confirmarse antes de cotizar; una agenda, integración o proyecto adicional puede cambiar la propuesta."
            }
          }
        ]
      }
    ],
    "imageWidth": "1600",
    "imageHeight": "900",
    "imageAlt": "Ejemplo conceptual de página web para médicos con perfil profesional, especialidad, ubicación y solicitud de cita."
  },
  "/pagina-web-para-consultorio-medico": {
    "title": "Página web para consultorio médico | RAUVIA",
    "description": "Página web para consultorios médicos: organiza profesionales, especialidades, sedes, horarios y contacto. Agenda según el alcance acordado.",
    "canonical": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/",
    "ogTitle": "Página web para consultorio médico | RAUVIA",
    "ogDescription": "Organiza la presencia digital de tu consultorio con información clara sobre ubicación, especialistas, horarios y formas de contacto.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/images/consultorio-medico/mockup-pagina-consultorio-medico.webp",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/",
        "url": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/",
        "name": "Página web para consultorio médico | RAUVIA",
        "description": "Página web para consultorios médicos: organiza profesionales, especialidades, sedes, horarios y contacto. Agenda según el alcance acordado.",
        "inLanguage": "es-MX",
        "about": {
          "@id": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/#servicio"
        },
        "breadcrumb": {
          "@id": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/#breadcrumb"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/#servicio",
        "name": "Página web para consultorio médico",
        "serviceType": "Diseño y desarrollo de presencia digital para consultorios",
        "description": "Página web para consultorios médicos: organiza profesionales, especialidades, sedes, horarios y contacto. Agenda según el alcance acordado.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Soluciones",
            "item": "https://rauvia.com.mx/soluciones/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Página web para médicos",
            "item": "https://rauvia.com.mx/pagina-web-para-medicos/"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Página web para consultorio médico",
            "item": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/pagina-web-para-consultorio-medico/#preguntas",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué debe incluir una página web para un consultorio médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Como base, puede presentar nombre, ubicación, horarios, profesionales, especialidades y contacto. Según el alcance, también puede incluir perfiles, mapas, preguntas frecuentes y una vía para solicitar una cita."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo mostrar varios médicos en la misma página?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. El sitio puede presentar al equipo y una ficha por profesional, con información proporcionada y validada por cada responsable."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo incluir diferentes especialidades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Cada área de atención puede relacionarse con los profesionales que la ofrecen, sus sedes, horarios y canales de contacto."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo tener más de una ubicación?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Se pueden organizar varias sedes con su dirección, mapa, horarios, profesionales y contacto correspondientes, según el alcance acordado."
            }
          },
          {
            "@type": "Question",
            "name": "¿La página puede mostrar horarios diferentes para cada médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Puede distinguir el horario general del consultorio del horario de cada profesional. El equipo responsable deberá revisar y actualizar los datos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo incluir una agenda de citas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, según el alcance: puede ser una solicitud de cita o una integración de agenda. Solicitar no equivale a confirmar; el consultorio define quién revisa la disponibilidad, da seguimiento y comunica confirmaciones o cambios."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo agregar teléfono y mensajería?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Pueden incluirse teléfono, mensajería o formulario según los canales y el alcance acordados. Para el primer contacto, evita solicitar datos clínicos o información de pacientes."
            }
          },
          {
            "@type": "Question",
            "name": "¿La página ayuda al SEO local y a que la IA entienda mi consultorio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede organizar información sobre profesionales, especialidades, sedes y contacto para ponerla a disposición de buscadores y sistemas de IA. Eso no garantiza posiciones, menciones ni pacientes. Una auditoría SEO para IA es un servicio independiente y no está incluida automáticamente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia existe entre una página para médico y una página para consultorio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La primera se centra en un profesional y su práctica individual. La segunda reúne información del lugar, el equipo, las especialidades y las sedes, y puede enlazar perfiles profesionales."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto cuesta una página web para un consultorio médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Se cotiza según el alcance: número de profesionales, especialidades y sedes, contenido e integraciones. No se presenta un precio fijo aquí. Cuéntanos cómo funciona tu consultorio para definir una propuesta; no envíes datos clínicos ni información de pacientes."
            }
          }
        ]
      }
    ],
    "imageWidth": "1600",
    "imageHeight": "900",
    "imageAlt": "Ejemplo conceptual de página web para consultorio médico con especialidades, profesionales, ubicación, horarios y solicitud de cita."
  },
  "/pagina-web-medicos-agenda-whatsapp": {
    "title": "Página web para médicos con agenda y WhatsApp | RAUVIA",
    "description": "Crea una página web médica con solicitud de citas, WhatsApp, horarios, ubicación y contacto claro. Reduce pasos entre encontrar tu práctica y contactarte.",
    "canonical": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/",
    "ogTitle": "Página web para médicos con agenda y WhatsApp | RAUVIA",
    "ogDescription": "Integra página médica, solicitud de cita, horarios, ubicación y contacto en una experiencia clara y mobile-first.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/images/agenda-whatsapp-medicos/mockup-agenda-whatsapp-medico.webp",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/",
        "url": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/",
        "name": "Página web para médicos con agenda y WhatsApp | RAUVIA",
        "description": "Crea una página web médica con solicitud de citas, WhatsApp, horarios, ubicación y contacto claro. Reduce pasos entre encontrar tu práctica y contactarte.",
        "inLanguage": "es-MX",
        "about": {
          "@id": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/#servicio"
        },
        "breadcrumb": {
          "@id": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/#breadcrumb"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/#servicio",
        "name": "Página web para médicos con agenda y WhatsApp",
        "serviceType": "Diseño y desarrollo de páginas médicas orientadas al contacto",
        "description": "Crea una página web médica con solicitud de citas, WhatsApp, horarios, ubicación y contacto claro. Reduce pasos entre encontrar tu práctica y contactarte.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Soluciones",
            "item": "https://rauvia.com.mx/soluciones/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Página web para médicos",
            "item": "https://rauvia.com.mx/pagina-web-para-medicos/"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Agenda y contacto",
            "item": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/#preguntas",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Puedo recibir solicitudes de cita desde mi página?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Según el alcance, la página puede ofrecer un formulario de solicitud y un canal para recibirlo. El proceso, los datos necesarios y quién responde se definen contigo. Una solicitud no equivale a una cita confirmada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo agregar un botón de WhatsApp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Puede abrir una conversación con el número de atención acordado y un mensaje inicial predefinido. La respuesta depende del equipo responsable; el botón por sí solo no incluye bots ni respuestas automáticas."
            }
          },
          {
            "@type": "Question",
            "name": "¿La cita queda confirmada automáticamente?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No cuando se trata sólo de una solicitud. El horario solicitado queda sujeto a confirmación. Una confirmación automática requiere una integración real y un proceso de disponibilidad definido dentro del alcance."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo mostrar mis horarios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Puedes publicar los días y horarios de atención con información validada por ti. Los horarios generales o preferidos no deben presentarse como disponibilidad en tiempo real."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo tener diferentes horarios por consultorio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Cada ubicación puede tener su dirección, profesionales, horarios y canales de contacto para que el visitante elija la sede adecuada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo mostrar varios médicos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. El flujo puede organizar varios profesionales y relacionarlos con sus especialidades y consultorios. Los perfiles y horarios deben mantenerse actualizados por el equipo responsable."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo elegir profesional o especialidad antes de solicitar una cita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Es posible incluir esa elección antes de indicar la ubicación y el horario preferido. Los pasos se adaptan a la organización de tu práctica."
            }
          },
          {
            "@type": "Question",
            "name": "¿Se puede conectar con una agenda externa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede evaluarse una integración con la herramienta que ya utilizas, según sus capacidades y el alcance acordado. Esta landing muestra ejemplos conceptuales y no está conectada a un calendario médico."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo recibir solicitudes desde el celular?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. El diseño puede ofrecer botones claros y formularios sencillos adaptados al teléfono. El destino y la recepción de las solicitudes se definen como parte de la implementación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué información debería pedir en el formulario?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La necesaria para iniciar el contacto: nombre, teléfono, especialidad o profesional, ubicación si aplica y fecha y horario preferidos. El correo puede ser opcional. No es necesario pedir diagnósticos, estudios ni información clínica detallada para una solicitud inicial."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia existe entre una página médica y un sistema de agenda?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Una página médica presenta la práctica y facilita el primer contacto. Un sistema de agenda puede gestionar disponibilidad y citas cuando existe una integración real. Su alcance, confirmaciones y operación se evalúan por separado."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto cuesta integrar agenda y contacto?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depende del alcance y de las integraciones requeridas. Cuéntanos cómo coordinas las citas, cuántos profesionales y sedes participan y qué herramientas utilizas para definir una cotización."
            }
          }
        ]
      }
    ],
    "imageWidth": "1600",
    "imageHeight": "900",
    "imageAlt": "Ejemplo conceptual de página web para médicos con agenda y WhatsApp en laptop y teléfono, con información profesional y solicitud de cita."
  },
  "/aviso-de-privacidad": {
    "title": "Aviso de Privacidad | RAUVIA",
    "description": "Aviso de privacidad integral de RAUVIA Consulting.",
    "canonical": "https://rauvia.com.mx/aviso-de-privacidad/",
    "ogTitle": "Aviso de Privacidad | RAUVIA",
    "ogDescription": "Aviso de privacidad integral de RAUVIA Consulting.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": []
  },
  "/contacto-rauvia": {
    "title": "Contacto | RAUVIA",
    "description": "Habla con RAUVIA por WhatsApp o teléfono. Cuéntanos qué quieres resolver y te decimos si podemos ayudarte.",
    "canonical": "https://rauvia.com.mx/contacto-rauvia/",
    "ogTitle": "Contacto | RAUVIA",
    "ogDescription": "Habla con RAUVIA por WhatsApp o teléfono. Cuéntanos qué quieres resolver y te decimos si podemos ayudarte.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://rauvia.com.mx/contacto-rauvia/#webpage",
        "url": "https://rauvia.com.mx/contacto-rauvia/",
        "name": "Contacto - RAUVIA",
        "inLanguage": "es-MX",
        "isPartOf": { "@id": "https://rauvia.com.mx/#website" },
        "about": { "@id": "https://rauvia.com.mx/#organization" }
      }
    ]
  },
  "/terminos": {
    "title": "Términos y Condiciones | RAUVIA",
    "description": "Términos y condiciones de RAUVIA Consulting.",
    "canonical": "https://rauvia.com.mx/terminos/",
    "ogTitle": "Términos y Condiciones | RAUVIA",
    "ogDescription": "Términos y condiciones de RAUVIA Consulting.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": []
  },
  "/seo-ai": {
    "title": "SEO para IA, GEO y AEO para empresas | RAUVIA",
    "description": "Revisa qué pueden consultar buscadores y asistentes sobre tu empresa. Auditoría GEO con evidencia y programa de implementación verificable.",
    "canonical": "https://rauvia.com.mx/seo-ai/",
    "lang": "es-MX",
    "ogTitle": "SEO para IA, GEO y AEO para empresas | RAUVIA",
    "ogDescription": "Revisa qué pueden consultar buscadores y asistentes sobre tu empresa. Auditoría GEO con evidencia y programa de implementación verificable.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-ai/#servicio",
        "name": "SEO para IA generativa (GEO) para empresas",
        "serviceType": "Consultoría, auditoría e implementación de SEO para IA",
        "url": "https://rauvia.com.mx/seo-ai/",
        "description": "Preparación y verificación de la información pública de una empresa para que sea accesible en búsqueda y útil como fuente en respuestas de IA. Auditoría e implementación se contratan por separado; no se garantizan posiciones, menciones ni citas.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/recursos/seo-para-ia": {
    "title": "SEO, GEO y AEO en 2027: guía práctica para empresas | RAUVIA",
    "description": "Aprende a preparar y comprobar la información de tu empresa para buscadores y asistentes de IA con una guía práctica y ejemplos.",
    "canonical": "https://rauvia.com.mx/recursos/seo-para-ia/",
    "lang": "es-MX",
    "ogTitle": "SEO, GEO y AEO en 2027: guía práctica para empresas | RAUVIA",
    "ogDescription": "Aprende a preparar y comprobar la información de tu empresa para buscadores y asistentes de IA con una guía práctica y ejemplos.",
    "ogType": "article",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/recursos/seo-para-ia/#webpage",
        "name": "SEO, GEO y AEO en 2027: cómo preparar la información de tu empresa para buscadores y asistentes de IA",
        "url": "https://rauvia.com.mx/recursos/seo-para-ia/",
        "inLanguage": "es-MX",
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/recursos/seo-para-ia/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Recursos",
            "item": "https://rauvia.com.mx/recursos/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "SEO, GEO y AEO para empresas",
            "item": "https://rauvia.com.mx/recursos/seo-para-ia/"
          }
        ]
      }
    ]
  },
  "/seo-ai/corregir-informacion-en-ia": {
    "title": "Corregir información de tu empresa en IA | RAUVIA",
    "description": "Detecta por qué un asistente atribuye servicios, condiciones o zonas equivocadas a tu empresa. Audita las fuentes antes de corregir tu sitio.",
    "canonical": "https://rauvia.com.mx/seo-ai/corregir-informacion-en-ia/",
    "lang": "es-MX",
    "ogTitle": "Corregir información de tu empresa en IA | RAUVIA",
    "ogDescription": "Detecta por qué un asistente atribuye servicios, condiciones o zonas equivocadas a tu empresa. Audita las fuentes antes de corregir tu sitio.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-ai/corregir-informacion-en-ia/#servicio",
        "name": "Corrección de información de empresa en respuestas de IA",
        "serviceType": "Corrección de información de empresa en respuestas de IA",
        "url": "https://rauvia.com.mx/seo-ai/corregir-informacion-en-ia/",
        "description": "Auditoría de las afirmaciones que buscadores y asistentes de IA hacen sobre la oferta de una empresa, con fuentes, contradicciones priorizadas y plan de cambios. No modifica el sitio ni garantiza cambios en una respuesta, menciones ni citas.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/seo-ai/corregir-informacion-en-ia/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "SEO para IA",
            "item": "https://rauvia.com.mx/seo-ai/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Corregir información en IA",
            "item": "https://rauvia.com.mx/seo-ai/corregir-informacion-en-ia/"
          }
        ]
      }
    ]
  },
  "/seo-ai/catalogos-para-ia": {
    "title": "SEO para catálogos de productos e IA | RAUVIA",
    "description": "Convierte las fichas prioritarias de tu catálogo en páginas que explican producto, aplicación, límites y requisitos de cotización.",
    "canonical": "https://rauvia.com.mx/seo-ai/catalogos-para-ia/",
    "lang": "es-MX",
    "ogTitle": "SEO para catálogos de productos e IA | RAUVIA",
    "ogDescription": "Convierte las fichas prioritarias de tu catálogo en páginas que explican producto, aplicación, límites y requisitos de cotización.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-ai/catalogos-para-ia/#servicio",
        "name": "SEO para catálogos de productos en buscadores y asistentes de IA",
        "serviceType": "SEO para catálogos de productos en buscadores y asistentes de IA",
        "url": "https://rauvia.com.mx/seo-ai/catalogos-para-ia/",
        "description": "Implementación acotada sobre las fichas prioritarias de un catálogo existente: aplicación, variantes, condiciones y datos a confirmar, con verificación. No garantiza posiciones, menciones ni citas.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/seo-ai/catalogos-para-ia/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "SEO para IA",
            "item": "https://rauvia.com.mx/seo-ai/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Catálogos para IA",
            "item": "https://rauvia.com.mx/seo-ai/catalogos-para-ia/"
          }
        ]
      }
    ]
  },
  "/seo-ai/cobertura-y-envios": {
    "title": "SEO para IA y zonas de servicio y envío | RAUVIA",
    "description": "Aclara qué zonas atiendes por modalidad, cuándo aplican excepciones y qué debe confirmar el comprador antes de pedir una cotización.",
    "canonical": "https://rauvia.com.mx/seo-ai/cobertura-y-envios/",
    "lang": "es-MX",
    "ogTitle": "SEO para IA y zonas de servicio y envío | RAUVIA",
    "ogDescription": "Aclara qué zonas atiendes por modalidad, cuándo aplican excepciones y qué debe confirmar el comprador antes de pedir una cotización.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-ai/cobertura-y-envios/#servicio",
        "name": "SEO para IA: cobertura, envíos e instalación",
        "serviceType": "SEO para IA: cobertura, envíos e instalación",
        "url": "https://rauvia.com.mx/seo-ai/cobertura-y-envios/",
        "description": "Publicación verificable de las zonas de servicio, envío, retiro e instalación que una empresa aprueba, con una respuesta o condición por modalidad. No cambia la logística ni garantiza posiciones, menciones ni citas.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/seo-ai/cobertura-y-envios/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "SEO para IA",
            "item": "https://rauvia.com.mx/seo-ai/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Cobertura y envíos",
            "item": "https://rauvia.com.mx/seo-ai/cobertura-y-envios/"
          }
        ]
      }
    ]
  },
  "/seo-ai/proveedores-tecnicos": {
    "title": "SEO para IA para proveedores técnicos | RAUVIA",
    "description": "Prepara una línea de oferta técnica para que Compras pueda evaluar aplicaciones, requisitos, evidencia y datos para cotizar.",
    "canonical": "https://rauvia.com.mx/seo-ai/proveedores-tecnicos/",
    "lang": "es-MX",
    "ogTitle": "SEO para IA para proveedores técnicos | RAUVIA",
    "ogDescription": "Prepara una línea de oferta técnica para que Compras pueda evaluar aplicaciones, requisitos, evidencia y datos para cotizar.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-ai/proveedores-tecnicos/#servicio",
        "name": "SEO para IA para proveedores técnicos",
        "serviceType": "SEO para IA para proveedores técnicos",
        "url": "https://rauvia.com.mx/seo-ai/proveedores-tecnicos/",
        "description": "Preparación de una línea técnica para que Compras pueda evaluar aplicaciones, requisitos, evidencia y datos para cotizar. No crea pipeline comercial ni garantiza posiciones, menciones ni citas.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/seo-ai/proveedores-tecnicos/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "RAUVIA",
            "item": "https://rauvia.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "SEO para IA",
            "item": "https://rauvia.com.mx/seo-ai/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Proveedores técnicos",
            "item": "https://rauvia.com.mx/seo-ai/proveedores-tecnicos/"
          }
        ]
      }
    ]
  },
  "/seo-ai/auditoria": {
    "title": "Auditoría GEO para empresas | RAUVIA",
    "description": "Identifica qué pueden rastrear los buscadores, cómo se describe tu oferta en respuestas de IA y qué conviene corregir primero.",
    "canonical": "https://rauvia.com.mx/seo-ai/auditoria/",
    "lang": "es-MX",
    "ogTitle": "Auditoría GEO para empresas | RAUVIA",
    "ogDescription": "Identifica qué pueden rastrear los buscadores, cómo se describe tu oferta en respuestas de IA y qué conviene corregir primero.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-ai/auditoria/#servicio",
        "name": "Auditoría GEO para empresas",
        "serviceType": "Auditoría de SEO para IA (GEO)",
        "url": "https://rauvia.com.mx/seo-ai/auditoria/",
        "description": "Diagnóstico documentado de lo que buscadores y asistentes de IA pueden consultar de una empresa y de cómo se describe su oferta, con evidencia, prioridades y plan de corrección. No modifica el sitio ni garantiza posiciones, menciones o citas.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/seo-ai/auditoria/#breadcrumb",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "RAUVIA", "item": "https://rauvia.com.mx/"},
          {"@type": "ListItem", "position": 2, "name": "SEO para IA", "item": "https://rauvia.com.mx/seo-ai/"},
          {"@type": "ListItem", "position": 3, "name": "Auditoría GEO", "item": "https://rauvia.com.mx/seo-ai/auditoria/"}
        ]
      }
    ]
  },
  "/seo-ai/implementacion": {
    "title": "Implementación de SEO para IA (GEO) | RAUVIA",
    "description": "Corrige barreras de rastreo y mejora cómo tu sitio explica productos, aplicaciones y cobertura. Solicita una propuesta de implementación.",
    "canonical": "https://rauvia.com.mx/seo-ai/implementacion/",
    "lang": "es-MX",
    "ogTitle": "Implementación de SEO para IA (GEO) | RAUVIA",
    "ogDescription": "Corrige barreras de rastreo y mejora cómo tu sitio explica productos, aplicaciones y cobertura. Solicita una propuesta de implementación.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/seo-ai/implementacion/#servicio",
        "name": "Implementación de SEO para IA para empresas",
        "serviceType": "Implementación de SEO para IA",
        "url": "https://rauvia.com.mx/seo-ai/implementacion/",
        "description": "Cambios acordados y verificables sobre URLs o plantillas de una empresa para mejorar el rastreo y cómo su sitio explica productos, aplicaciones y cobertura, con evidencia del antes y el después. No garantiza posiciones, menciones, citas ni ventas.",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://rauvia.com.mx/seo-ai/implementacion/#breadcrumb",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "RAUVIA", "item": "https://rauvia.com.mx/"},
          {"@type": "ListItem", "position": 2, "name": "SEO para IA", "item": "https://rauvia.com.mx/seo-ai/"},
          {"@type": "ListItem", "position": 3, "name": "Implementación de SEO para IA", "item": "https://rauvia.com.mx/seo-ai/implementacion/"}
        ]
      }
    ]
  },
  "/trayectoria": {
    "title": "RAUVIA Trayectoria | Planes y actualizaciones web",
    "description": "Conoce los planes Presencia Libre, Trayectoria y Trayectoria Activa, y los cambios Micro, Pequeño, Mediano y Mayor. Precios históricos de referencia sujetos a confirmación.",
    "canonical": "https://rauvia.com.mx/trayectoria/",
    "ogTitle": "RAUVIA Trayectoria | Planes y actualizaciones web",
    "ogDescription": "Conoce los planes Presencia Libre, Trayectoria y Trayectoria Activa, y los cambios Micro, Pequeño, Mediano y Mayor. Precios históricos de referencia sujetos a confirmación.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/trayectoria/#webpage",
        "url": "https://rauvia.com.mx/trayectoria/",
        "name": "RAUVIA Trayectoria | Planes y actualizaciones web",
        "description": "Conoce los planes Presencia Libre, Trayectoria y Trayectoria Activa, y los cambios Micro, Pequeño, Mediano y Mayor. Precios históricos de referencia sujetos a confirmación.",
        "isPartOf": {
          "@id": "https://rauvia.com.mx/#website"
        },
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://rauvia.com.mx/trayectoria/#service",
        "name": "RAUVIA Trayectoria",
        "description": "Continuidad de presencia digital y actualizaciones web de alcance definido. Las tarifas de la página son referencias históricas sujetas a confirmación.",
        "serviceType": "Mantenimiento editorial y actualización de sitios web",
        "provider": {
          "@id": "https://rauvia.com.mx/#organization"
        },
        "url": "https://rauvia.com.mx/trayectoria/",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Modalidades RAUVIA Trayectoria",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Presencia Libre"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "RAUVIA Trayectoria"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Trayectoria Activa"
              }
            }
          ]
        }
      }
    ]
  },
  "/rauviaweb": {
    "title": "RAUVIAWEB | Presencia digital para profesionistas",
    "description": "Construye una presentación profesional clara: perfil, servicios, información verificable y contacto. Conoce el enfoque RAUVIAWEB y sus modalidades.",
    "canonical": "https://rauvia.com.mx/rauviaweb/",
    "ogTitle": "RAUVIAWEB | Presencia digital para profesionistas",
    "ogDescription": "Construye una presentación profesional clara: perfil, servicios, información verificable y contacto. Conoce el enfoque RAUVIAWEB y sus modalidades.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/rauviaweb/#webpage",
        "url": "https://rauvia.com.mx/rauviaweb/",
        "name": "RAUVIAWEB | Presencia digital para profesionistas",
        "description": "Construye una presentación profesional clara: perfil, servicios, información verificable y contacto. Conoce el enfoque RAUVIAWEB y sus modalidades.",
        "isPartOf": {
          "@id": "https://rauvia.com.mx/#website"
        },
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/casos/presencia-posicionamiento-profesional": {
    "title": "Caso de presencia profesional | RAUVIA Consulting",
    "description": "Cómo organizar información, experiencia, servicios y contacto para construir una presencia profesional coherente. Enfoque de implementación y límites de evidencia.",
    "canonical": "https://rauvia.com.mx/casos/presencia-posicionamiento-profesional/",
    "ogTitle": "Caso de presencia profesional | RAUVIA Consulting",
    "ogDescription": "Cómo organizar información, experiencia, servicios y contacto para construir una presencia profesional coherente. Enfoque de implementación y límites de evidencia.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://rauvia.com.mx/casos/presencia-posicionamiento-profesional/#webpage",
        "url": "https://rauvia.com.mx/casos/presencia-posicionamiento-profesional/",
        "name": "Caso de presencia profesional | RAUVIA Consulting",
        "description": "Cómo organizar información, experiencia, servicios y contacto para construir una presencia profesional coherente. Enfoque de implementación y límites de evidencia.",
        "isPartOf": {
          "@id": "https://rauvia.com.mx/#website"
        },
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/404": {
    "title": "Página no encontrada | RAUVIA Consulting",
    "description": "La página que buscas no existe o ha sido movida.",
    "canonical": null,
    "ogTitle": "Página no encontrada | RAUVIA Consulting",
    "ogDescription": "La página que buscas no existe o ha sido movida.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "noindex, nofollow",
    "twitterCard": "summary_large_image",
    "schema": []
  }
};
