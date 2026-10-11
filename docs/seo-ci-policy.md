# Política de CI / Validación de Build

- El comando `npm run audit:seo` ha sido configurado para verificar:
  - Presencia de `robots.txt` y agentes permitidos.
  - `llms.txt`.
  - Componente de SEO centralizado.
  - Generación de Sitemap y Prerendering.
- **CI Pipeline:** Este script deberá ejecutarse antes del despliegue a producción. Si falla, el build falla.
