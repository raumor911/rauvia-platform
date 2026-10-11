# Renderizado e Indexabilidad (React)

- **Problema:** React es Client-Side Rendering por defecto (SPA). Los bots antiguos pueden no ver el contenido.
- **Solución implementada:** Se emplea un proceso de **prerendering** en el proceso de build (`scripts/prerender.js`) que genera el HTML estático para las rutas principales (`/`, `/nosotros`, `/soluciones`, etc.).
- Esto garantiza que Googlebot, Bingbot, OAI-SearchBot y ChatGPT-User accedan al contenido clave sin necesidad de renderizar JavaScript.
