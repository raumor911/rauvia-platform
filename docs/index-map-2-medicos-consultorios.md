# Index Map 2 — Médicos y consultorios

Reconstruido el 11 de octubre de 2026 para DIO v1.0 a solicitud del usuario. No se encontraron documentos originales llamados Index Map 1, 2 y 3. La cobertura ya existe en el código; este documento la hace explícita, no afirma haber recuperado un mapa histórico.

Base: GitHub main bd9d596c01a083b80597e9601572daef78d60797. Autoridades: src/knowledge/intents.ts, src/knowledge/assets.ts, src/seo/routeSeo.js y páginas React existentes. Los mapas son documentación de consulta; para cambiar rutas o intenciones se editan esas autoridades.

18 intenciones editoriales existentes. Cobertura de contenido no equivale a indexación, volumen de demanda, posiciones, recomendaciones de IA ni conversiones. No se dispone de Search Console ni Bing Webmaster Tools.

| ID existente | Intención | Tipo | URL principal existente | Apoyos existentes |
|---|---|---|---|---|
| intent:pagina-web-medicos | Página web para médicos | CATEGORY | https://rauvia.com.mx/pagina-web-para-medicos/ | — |
| intent:pagina-web-gratis-medicos | Página web gratis para médicos | COMPARISON | https://rauvia.com.mx/pagina-web-gratis-para-medicos/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:pagina-web-medicos-especialistas | Soy médico especialista y quiero que entiendan qué atiendo, dónde consulto y cómo contactarme. | SOLUTION | https://rauvia.com.mx/pagina-web-para-medicos-especialistas/ | https://rauvia.com.mx/seo-local-para-medicos/; https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:pagina-web-consultorio-medico | Página web para consultorio médico | USE_CASE | https://rauvia.com.mx/pagina-web-para-consultorio-medico/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:seo-local-medicos | SEO local para médicos | SOLUTION | https://rauvia.com.mx/seo-local-para-medicos/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:agenda-whatsapp-medicos | Agenda y WhatsApp para médicos | SOLUTION | https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:presencia-medica-dispersa | Mi presencia médica está dispersa | PROBLEM | https://rauvia.com.mx/pagina-web-para-medicos/ | — |
| intent:depender-redes-medico | Como médico dependo de redes sociales | PROBLEM | https://rauvia.com.mx/pagina-web-para-medicos/ | — |
| intent:depender-directorios-medicos | Dependo de directorios médicos | PROBLEM | https://rauvia.com.mx/pagina-web-para-medicos/ | — |
| intent:explicar-especialidad | Quiero explicar mi especialidad médica | SOLUTION | https://rauvia.com.mx/pagina-web-para-medicos-especialistas/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:mostrar-trayectoria-medica | Quiero mostrar mi trayectoria médica | SOLUTION | https://rauvia.com.mx/pagina-web-para-medicos-especialistas/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:mostrar-ubicacion-consultorio | Quiero mostrar la ubicación del consultorio | SOLUTION | https://rauvia.com.mx/seo-local-para-medicos/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:facilitar-primer-contacto | Quiero facilitar el primer contacto médico | SOLUTION | https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:solicitar-cita-online | Quiero solicitar una cita online | USE_CASE | https://rauvia.com.mx/pagina-web-medicos-agenda-whatsapp/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:varios-medicos-consultorio | Varios médicos en un consultorio | USE_CASE | https://rauvia.com.mx/pagina-web-para-consultorio-medico/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:varias-especialidades-consultorio | Varias especialidades en el consultorio | USE_CASE | https://rauvia.com.mx/pagina-web-para-consultorio-medico/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:varias-ubicaciones-medicas | Varias ubicaciones médicas | USE_CASE | https://rauvia.com.mx/pagina-web-para-consultorio-medico/ | https://rauvia.com.mx/pagina-web-para-medicos/ |
| intent:ser-encontrado-localmente | Quiero ser encontrado localmente como médico | SOLUTION | https://rauvia.com.mx/seo-local-para-medicos/ | https://rauvia.com.mx/pagina-web-para-medicos/ |

## Lectura y siguiente paso

Existen seis páginas médicas: general, gratuita, especialistas, consultorio, SEO local y agenda/WhatsApp. DIO prioriza general y consultorio por su función de entrada y elección de alcance. Las otras cuatro conservan su contenido; sólo se unifica el teléfono. No hace falta crear más páginas para esta cobertura.

Contacto único autorizado: +52 55 8649 4076. Validación HTTP y de contenido: docs/dio-v1-evidence/public-audit.json y mapping-http.json. Las rutas técnicas y las páginas se validan nuevamente tras la compilación. El estado en los índices de Google/Bing sigue sin comprobarse.
