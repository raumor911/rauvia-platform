import {ruta90Seo} from '../data/ruta90.js';
// Single source of public route metadata and structured data. Add future landing entries here.
export const routeSeo = {
  "/ruta-90": ruta90Seo,
  "/": {
    "title": "RAUVIA Consulting | Consultoría y desarrollo tecnológico",
    "description": "RAUVIA identifica dónde una empresa está perdiendo valor y construye la capacidad necesaria para corregirlo.",
    "canonical": "https://rauvia.com.mx/",
    "ogTitle": "RAUVIA Consulting | Consultoría y desarrollo tecnológico",
    "ogDescription": "RAUVIA identifica dónde una empresa está perdiendo valor y construye la capacidad necesaria para corregirlo.",
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
        "description": "RAUVIA es una firma mexicana de consultoría estratégica y desarrollo tecnológico que ayuda a PyMES y empresas B2B con valor real a identificar dónde están perdiendo oportunidades o capacidad y construir la estructura comercial, operativa o tecnológica necesaria para corregirlo.",
        "founder": {
          "@id": "https://rauvia.com.mx/#raul-morales",
          "name": "Raúl Antonio Morales Domínguez",
          "jobTitle": "Fundador y Director Estratégico",
          "url": "https://rauvia.com.mx/nosotros",
          "sameAs": [
            "https://www.linkedin.com/in/raumor/"
          ]
        },
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
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
        }
      }
    ]
  },
  "/nosotros": {
    "title": "RAUVIA Consulting | Nosotros",
    "description": "RAUVIA identifica dónde una empresa está perdiendo valor y construye la capacidad necesaria para corregirlo.",
    "canonical": "https://rauvia.com.mx/nosotros/",
    "ogTitle": "RAUVIA Consulting | Nosotros",
    "ogDescription": "RAUVIA identifica dónde una empresa está perdiendo valor y construye la capacidad necesaria para corregirlo.",
    "ogType": "website",
    "ogImage": "https://rauvia.com.mx/media/og-image.jpg",
    "robots": "index, follow",
    "twitterCard": "summary_large_image",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://rauvia.com.mx/nosotros/#webpage",
        "url": "https://rauvia.com.mx/nosotros",
        "name": "Nosotros - RAUVIA",
        "description": "RAUVIA es una firma mexicana de consultoría estratégica y desarrollo tecnológico que ayuda a PyMES y empresas B2B con valor real a identificar dónde están perdiendo oportunidades o capacidad y construir la estructura comercial, operativa o tecnológica necesaria para corregirlo.",
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
        "url": "https://rauvia.com.mx/nosotros",
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
        "url": "https://rauvia.com.mx/soluciones",
        "name": "Portafolio de Soluciones - RAUVIA",
        "description": "Catálogo de soluciones empresariales. RAUVIA es una firma mexicana de consultoría estratégica y desarrollo tecnológico que ayuda a PyMES y empresas B2B con valor real a identificar dónde están perdiendo oportunidades o capacidad y construir la estructura comercial, operativa o tecnológica necesaria para corregirlo.",
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
        "url": "https://rauvia.com.mx/aethryon",
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
        "url": "https://rauvia.com.mx/recursos",
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
            "description": "Activo comercial para presentar la oferta de la empresa de manera clara y profesional."
          },
          {
            "@type": "Offer",
            "name": "Frente Comercial Pro",
            "price": "9900.00",
            "priceCurrency": "MXN",
            "description": "Activo comercial avanzado para empresas con soluciones técnicas que necesitan mayor explicación."
          },
          {
            "@type": "Offer",
            "name": "Frente Comercial Portafolio",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "13900.00",
              "priceCurrency": "MXN",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitCode": "C62"
              }
            },
            "description": "Activo comercial estructurado para empresas con múltiples líneas de servicio y rutas de decisión."
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
    "description": "RAUVIA ofrece páginas web gratis para médicos bajo dominio RAUVIA, con perfil profesional, WhatsApp, agenda de citas y base SEO/GEO para presencia digital.",
    "canonical": "https://rauvia.com.mx/pagina-web-gratis-para-medicos/",
    "ogTitle": "Página web gratis para médicos | RAUVIA",
    "ogDescription": "Página médica gratuita bajo dominio RAUVIA, con perfil profesional, WhatsApp, agenda de citas y base SEO/GEO.",
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
        "description": "RAUVIA ofrece páginas web gratis para médicos bajo dominio RAUVIA, con perfil profesional, WhatsApp, agenda de citas y base SEO/GEO para presencia digital.",
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
        "description": "RAUVIA ofrece páginas web gratis para médicos bajo dominio RAUVIA, con perfil profesional, WhatsApp, agenda de citas y base SEO/GEO para presencia digital.",
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
              "text": "Incluye una opción básica para solicitar o agendar citas, según la configuración acordada. Las integraciones avanzadas se revisan por separado."
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
    "title": "SEO local para médicos | RAUVIA",
    "description": "RAUVIA ayuda a médicos, especialistas y consultorios a ordenar su presencia digital local con sitio web, ubicación, WhatsApp, agenda y base SEO/GEO.",
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
        "name": "SEO local para médicos | RAUVIA",
        "description": "RAUVIA ayuda a médicos, especialistas y consultorios a ordenar su presencia digital local con sitio web, ubicación, WhatsApp, agenda y base SEO/GEO.",
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
        "description": "RAUVIA ayuda a médicos, especialistas y consultorios a ordenar su presencia digital local con sitio web, ubicación, WhatsApp, agenda y base SEO/GEO.",
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
              "text": "No. Nadie debería prometer una posición específica. El SEO local ayuda a ordenar tu presencia digital para que tu especialidad, ubicación y forma de contacto sean más claras para buscadores y pacientes."
            }
          },
          {
            "@type": "Question",
            "name": "¿Necesito una página web para trabajar SEO local?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No siempre es el único punto, pero sí es una base importante. Tu sitio puede funcionar como el centro de tu presencia profesional."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto incluye Google Maps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede incluir revisión y alineación de información local, pero el alcance exacto depende del plan contratado y de los activos digitales que ya tengas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto sirve si atiendo en varios consultorios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. En ese caso conviene estructurar bien las ubicaciones, horarios, datos de contacto y formas de agendar."
            }
          },
          {
            "@type": "Question",
            "name": "¿Esto sirve si ya tengo Doctoralia u otro perfil?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Los perfiles externos ayudan, pero tu sitio propio puede funcionar como una base más controlada para explicar tu práctica profesional."
            }
          },
          {
            "@type": "Question",
            "name": "¿Incluye contenido médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede incluir contenido informativo base, siempre con enfoque profesional, sin promesas clínicas y validado por el médico."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo empezar con la página gratuita?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. La página gratuita puede ser una primera base. Si después necesitas más personalización o SEO local avanzado, puedes crecer hacia una web personalizada o un Frente Comercial Médico."
            }
          },
          {
            "@type": "Question",
            "name": "¿En cuánto tiempo se ven resultados?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depende del estado actual de tu presencia digital, competencia local, especialidad, zona, contenido y consistencia de información. RAUVIA no promete resultados inmediatos; trabaja sobre una base estructural."
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
    "title": "Página web para médicos | Presencia profesional | RAUVIA",
    "description": "Página web para médicos con perfil profesional, especialidad, ubicación, WhatsApp, agenda y estructura SEO/GEO. Construye una presencia médica clara con RAUVIA.",
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
        "name": "Página web para médicos | Presencia profesional | RAUVIA",
        "description": "Página web para médicos con perfil profesional, especialidad, ubicación, WhatsApp, agenda y estructura SEO/GEO. Construye una presencia médica clara con RAUVIA.",
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
        "description": "Página web para médicos con perfil profesional, especialidad, ubicación, WhatsApp, agenda y estructura SEO/GEO. Construye una presencia médica clara con RAUVIA.",
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
              "text": "Una presentación profesional clara, especialidad y áreas de atención, ubicación, horarios y formas de contacto. Según tu práctica, puede sumar trayectoria, solicitud de cita, preguntas frecuentes e información útil antes de una consulta."
            }
          },
          {
            "@type": "Question",
            "name": "¿Necesito una página si ya aparezco en directorios médicos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Los directorios pueden ayudar al descubrimiento. Una página propia puede complementar esos perfiles y reunir tu información profesional, consultorios y formas de contacto en un lugar que puedas compartir y organizar según tu práctica."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo incluir WhatsApp en mi página?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Podemos incluir un botón visible de WhatsApp con una ruta clara para solicitar información o una cita. El número y los horarios de atención se definen contigo."
            }
          },
          {
            "@type": "Question",
            "name": "¿La página puede incluir una agenda de citas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, según el alcance del proyecto. Puede ser una solicitud de cita o la integración de una herramienta de agenda. La disponibilidad y el proceso de confirmación se acuerdan con el profesional."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo mostrar diferentes consultorios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Se pueden organizar las ubicaciones, horarios, referencias y canales de contacto de cada consultorio para que el visitante identifique dónde y cómo solicitar una cita."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo explicar mi especialidad y trayectoria?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Podemos estructurar tu formación, trayectoria, áreas de atención y enfoque profesional con información proporcionada y validada por ti."
            }
          },
          {
            "@type": "Question",
            "name": "¿Una página web ayuda al SEO local?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede aportar una base clara para relacionar tu práctica, especialidad y ubicación. Su efecto depende también de la consistencia de tus datos, competencia, contenido y otros factores; no garantiza posiciones específicas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia hay entre la página gratuita y una página personalizada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La opción gratuita permite construir una primera presencia bajo dominio RAUVIA con el alcance de su plan básico. Una página personalizada adapta la presentación, secciones e integraciones a tu práctica y puede contemplar dominio propio, según lo acordado."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es el Frente Comercial Médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Es un alcance más completo que puede integrar presencia web, contacto, agenda, contenido, estructura SEO/GEO y medición. Los componentes se definen según las necesidades del médico o consultorio."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto cuesta una página web para médicos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depende del alcance: personalización, número de secciones, consultorios, contenido e integraciones. Existe una opción gratuita con alcance básico; los proyectos personalizados y el Frente Comercial Médico se cotizan según alcance. Contáctanos para identificar la alternativa adecuada."
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
    "description": "Crea una página web para tu consultorio médico con ubicación, horarios, profesionales, especialidades, contacto, agenda y estructura SEO/GEO.",
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
        "description": "Crea una página web para tu consultorio médico con ubicación, horarios, profesionales, especialidades, contacto, agenda y estructura SEO/GEO.",
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
        "description": "Crea una página web para tu consultorio médico con ubicación, horarios, profesionales, especialidades, contacto, agenda y estructura SEO/GEO.",
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
              "text": "El nombre del consultorio, ubicación, horarios, profesionales, especialidades y una forma clara de contacto. Según el alcance, puede incorporar perfiles, solicitud de cita, mapas, preguntas frecuentes e información práctica antes de asistir."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo mostrar varios médicos en la misma página?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Se puede organizar el equipo del consultorio y presentar un perfil para cada profesional, con información proporcionada y validada por sus responsables."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo incluir diferentes especialidades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Cada área de atención puede relacionarse con los profesionales que la ofrecen, sus horarios, información relevante y canales de contacto."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo tener más de una ubicación?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. La arquitectura puede contemplar varias sedes, cada una con dirección, mapa, horarios, profesionales y formas de contacto."
            }
          },
          {
            "@type": "Question",
            "name": "¿La página puede mostrar horarios diferentes para cada médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Podemos distinguir el horario general del consultorio de los horarios de cada profesional. El equipo responsable debe mantener esa información actualizada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo incluir una agenda de citas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, según el alcance. Puede ser una solicitud de cita o una integración con una herramienta de agenda. La disponibilidad, confirmación y gestión de cambios se definen con el consultorio."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo agregar teléfono y mensajería?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. Se pueden incluir teléfono, mensajería y formulario, según los canales de atención del consultorio, con indicaciones claras para el primer contacto."
            }
          },
          {
            "@type": "Question",
            "name": "¿Una página de consultorio ayuda al SEO local?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puede aportar una base para organizar la relación entre consultorio, especialidades, profesionales y ubicación. El posicionamiento depende de varios factores y no se garantizan posiciones específicas."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia existe entre una página para médico y una página para consultorio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La página para médico se centra en su perfil y práctica individual. La página para consultorio reúne información del lugar, equipo, especialidades, horarios y sedes, y puede enlazar los perfiles de quienes atienden allí."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto cuesta una página web para un consultorio médico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depende del alcance: número de profesionales, especialidades, sedes, contenido e integraciones. Los proyectos se cotizan según alcance. Cuéntanos cómo funciona tu consultorio para identificar qué necesita su página."
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
  "/trayectoria": {
    "title": "RAUVIA Trayectoria | Evolución de presencia digital",
    "description": "Mantén tu presencia digital alineada a los cambios de tu empresa. RAUVIA Trayectoria organiza actualizaciones de alcance definido, con criterio comercial y verificación.",
    "canonical": "https://rauvia.com.mx/trayectoria/",
    "ogTitle": "RAUVIA Trayectoria | Evolución de presencia digital",
    "ogDescription": "Mantén tu presencia digital alineada a los cambios de tu empresa. RAUVIA Trayectoria organiza actualizaciones de alcance definido, con criterio comercial y verificación.",
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
        "name": "RAUVIA Trayectoria | Evolución de presencia digital",
        "description": "Mantén tu presencia digital alineada a los cambios de tu empresa. RAUVIA Trayectoria organiza actualizaciones de alcance definido, con criterio comercial y verificación.",
        "isPartOf": {
          "@id": "https://rauvia.com.mx/#website"
        },
        "publisher": {
          "@id": "https://rauvia.com.mx/#organization"
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
        "@type": "Article",
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
