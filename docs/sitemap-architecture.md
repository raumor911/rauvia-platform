# Arquitectura del sitemap de RAUVIA — corte 2026-10-30

## Fuente de verdad y publicación
- La ruta pública `/sitemap.xml` la sirve Express a partir de `renderSitemap()` y `fetchPosts()` en `scripts/generate-sitemap.js`.
- Las rutas institucionales proceden de `scripts/public-routes.js`, alimentado por las claves de `src/seo/routeSeo.js`.
- Las entradas editoriales se consultan en WordPress REST con `status=publish`, `per_page=100` y paginación; la URL canónica se construye como `https://rauvia.com.mx/recursos/{slug}/`.
- No añadir borradores ni programadas al sitemap antes de que WordPress las publique. No copiar automáticamente un título para deducir un slug.
- `lastmod` de un post usa la fecha de modificación enviada por WordPress; puede preceder a la fecha de publicación de una entrada programada y no se debe sustituir por una fecha inventada.

## Sincronización y resiliencia
- Express mantiene un snapshot del sitemap en memoria y en `data/sitemap-cache.xml` (ruta configurable).
- El refresco programado está configurado por defecto cada **6 horas** (`SITEMAP_REFRESH_INTERVAL_MS=21600000`). El webhook autenticado `/internal/indexnow`, cuando está conectado correctamente a WordPress, invalida y actualiza la lista y el sitemap después de publicaciones, cambios o eliminaciones.
- En el arranque, si existe caché persistida, no se fuerza recuperación inmediata salvo `SITEMAP_REFRESH_ON_START=true`; una nueva publicación puede tardar hasta el refresco programado si falla el webhook. Se conserva el snapshot anterior si falla WordPress.
- La copia versionada `data/sitemap-cache.xml` es **snapshot de respaldo**, no sustituye el contenido vivo ni permite prometer que todas las URLs ya estén indexadas. Los cambios en GitHub no actualizan Hostinger sin despliegue.

## Reconciliación editorial: 30 de octubre de 2026
- WordPress (captura entregada por el propietario): **20 publicaciones**, **12 programadas**, **1 borrador**.
- Sitemap XML facilitado por el propietario: **43 URLs únicas**, compuestas por 23 institucionales y 20 `/recursos/`. La copia versionada se sincroniza con este XML como respaldo.
- **Adecuación en este PR:** `/trayectoria/`, `/rauviaweb/` y `/casos/presencia-posicionamiento-profesional/` se incorporan tanto al registro SEO como al enrutador, con páginas de contenido específico, enlaces internos y prerender a través del registro existente. De esta forma el generador dinámico conservará las tres rutas en cada refresco. Falta verificar HTTP 200, canonical y contenido del despliegue productivo; **la rama no constituye despliegue**.
- El snapshot mantiene exactamente los slugs de WordPress proporcionados, incluso los que parecen errores tipográficos; cualquier corrección se hace en WordPress con redirección 301, no modificando solamente el sitemap.

## QA antes de promover a producción
1. Verificar que el sitemap devuelve XML válido, `200`, host canónico y sin URLs repetidas.
2. Confirmar 20 URLs de publicaciones actuales mediante REST WordPress `status=publish`; revisar las 12 programadas al publicarse.
3. Verificar respuesta 200, canonical propio y ausencia de `noindex` para cada URL incluida, especialmente las tres rutas anteriores.
4. Probar webhook y/o refresco periódico; confirmar que el sitemap regenerado no pierde rutas válidas. No usar el snapshot de respaldo como única verificación.
5. Tras desplegar, volver a consultar `https://rauvia.com.mx/sitemap.xml` y revisar su estado en Google Search Console.

**Nota:** la inclusión en un sitemap es una señal de descubrimiento; no garantiza indexación ni posicionamiento.