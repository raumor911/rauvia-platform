# Decisión sobre Renderizado del Blog

**Decisión: Opción A - WordPress Renderiza Públicamente en /blog/**

**Justificación:** 
- WordPress funcionará como CMS headless para los recursos que React consume vía API (ej. `/recursos`).
- Sin embargo, la instalación nativa de WP se conserva en `/blog/` y servirá sus propios artículos.
- Se debe asegurar que las URLs en React para consumo (ej. `/recursos/:slug`) utilicen canonical hacia sí mismas si son el contenido principal, y evitar indexación duplicada. Si los artículos se consumen en `/recursos/:slug` en React, entonces la vista nativa de WP (`/blog/:slug`) debe tener un canonical apuntando a `/recursos/:slug` o viceversa, dependiendo de la estrategia SEO final.
