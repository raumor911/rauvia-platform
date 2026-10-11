# Arquitectura de Sitemaps

- **Estrategia:** Un Sitemap unificado que consolide rutas de React y Posts de WordPress, o un Índice de Sitemaps.
- **Implementación Actual:** `public/sitemap.xml` generado en el build por `generate-sitemap.js`, que consulta la API de WordPress para incluir URLs de recursos, además de las rutas estáticas de React.
- **Exclusión:** No se indexan drafts ni URLs con parámetros o `/blog/wp-admin/`.

## Actualización 2026-09-10

El catálogo canónico es `scripts/public-routes.js`: diez rutas estáticas, incluidos casos y páginas legales. Los posts publicados se consultan con paginación y límite de tiempo. Un error detiene el build y conserva el sitemap anterior; no se sustituyen artículos por una lista vacía silenciosamente. `lastmod` se usa solo cuando procede de WordPress, no como fecha ficticia de compilación.

La publicación de un nuevo artículo requiere recompilar y desplegar para actualizar el sitemap. Consultar `ACTUALIZACION-SITEMAP-LLMO.md` para instalación y límites; estar incluido en el sitemap no garantiza indexación.
