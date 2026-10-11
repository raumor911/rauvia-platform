# Auditoría Técnica LLMO Fase 1 - RAUVIA Consulting

## 1. Arquitectura Actual
- **Framework:** React 19 con Vite.
- **Sistema de Rutas:** SPA utilizando `react-router-dom` (rutas principales: `/`, `/nosotros`, `/soluciones`, `/aethryon`).
- **Renderizado:** Client-Side Rendering (CSR). El servidor Express en `server.ts` sirve `dist/index.html` para todas las rutas.
- **Metadatos:** Se gestionan a través de `react-helmet-async`, lo que significa que se inyectan dinámicamente mediante JavaScript.
- **Blog (WordPress):** Actualmente no integrado en el código React. Probablemente alojado en una ruta paralela (ej. `/blog`) servida directamente por WordPress o consumida por una API no implementada en el frontend actual.

## 2. Hallazgos de Indexabilidad y Rastreo
- **P0: Dependencia de CSR.** El contenido sustantivo no está presente en el HTML inicial. Los rastreadores que no ejecutan JavaScript (o lo hacen limitadamente, como OAI-SearchBot) verán un HTML vacío.
- **P0: Ausencia de robots.txt.** No existe un archivo que guíe a los rastreadores.
- **P0: Ausencia de sitemap.xml.** No hay un mapa del sitio automatizado.
- **P1: Falta de URLs canónicas absolutas.** Los metadatos de Helmet no incluyen etiquetas canonical robustas centralizadas.
- **P1: Falta de Open Graph / Twitter Cards.** Las redes sociales y LLMs no tienen previsualizaciones ricas aseguradas desde el HTML inicial.
- **P1: Gestión de códigos HTTP 404.** Al ser una SPA pura sin ruta catch-all explícita en React que envíe un código 404 real desde el servidor, las rutas inexistentes devuelven un 200 OK con el `index.html`.
- **P2: Datos Estructurados (JSON-LD).** No se encontraron implementaciones de JSON-LD.

## 3. Riesgos Documentados antes de Cambios
- **Implementación de SSR:** Convertir la aplicación a SSR completo (ej. Remix, Next.js o Vite SSR nativo) requeriría refactorización mayor, lo cual rompe la regla de "menor riesgo, menor impacto".
- **Solución Propuesta para Renderizado:** Prerendering o inyección de metadatos estáticos en el build. Para el contenido sustantivo, lo ideal es usar un prerenderizado ligero (ej. `prerender-spa-plugin` o equivalente) que genere el HTML estático de las rutas conocidas. Sin embargo, para mayor simplicidad y menor impacto, si no podemos instalar dependencias mayores, interceptaremos en `server.ts` las rutas de bots o generaremos HTML estático en el build usando Vite.
- **Blog:** Si el blog corre en paralelo, se deben documentar en el sitemap y robots.txt sin alterar su funcionamiento.

## 4. Plan de Acción
1. **Componente SEO centralizado.**
2. **Generación estática de HTML (Prerender) o inyección.** Añadiremos un script de prerendering sencillo con Puppeteer o en Express para bots, pero la mejor opción sin puppeteer es inyectar metadatos desde Express si no podemos prerenderizar la UI completa. Wait, OAI-SearchBot lee el contenido. Si el contenido es CSR, no lo lee. Necesitamos prerendering de contenido.
3. **Sitemap y Robots automatizados.**
4. **LLMs.txt y estructurados.**
