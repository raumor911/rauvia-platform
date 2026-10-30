# RAUVIA V78 — Corrección de indexación preparada

Fecha: 13 de octubre de 2026. Estado: desarrollo local terminado; no instalado en producción.

## Base y arquitectura verificada

Base exclusiva: `_nodejs (1).zip`, descargado de `hbuilds/current/nodejs` de rauvia.com.mx. `package.json` indica 78.0.0 y RELEASE-V78.json describe V78+DIO. Ese manifiesto conserva campos históricos de despliegue: la procedencia de esta copia se verificó en Hostinger, no se infirió de esos campos.

La plataforma usa React/Vite y Express. Express entrega HTML de artículos a partir de WordPress, administra el caché editorial, sitemap e IndexNow. WordPress está separado en blog.rauvia.com.mx. `src/seo/articleSeo.ts` ya construye las canónicas del dominio principal. La regla existente de Express para shop ya funciona públicamente. No se requiere recompilar ni redesplegar la aplicación Node para instalar esta corrección.

Comparación de fuente con GitHub main `bd9d596c01a083b80597e9601572daef78d60797`: 708 archivos coinciden, 26 difieren, 44 sólo existen en la copia local y 24 sólo en GitHub, con el alcance descrito en github-comparison.json. Se excluyeron del lado local node_modules, dist, tmp, data y logs. GitHub fue referencia de comparación; no se sustituyó ningún archivo con una versión remota.

## Hallazgos actuales

| Recurso | Evidencia | Decisión |
|---|---|---|
| 14 destinos /recursos/{slug}/ | HTTP 200, una canónica exacta por artículo | Conservar |
| 14 rutas de artículo del CMS | GET y HEAD 200; HTML GET muestra Próximamente | Redirigir sólo publicaciones válidas |
| shop /b/starter-microempresas | 301 directo a https://rauvia.com.mx/, también con parámetros | No añadir reglas |
| API de entradas, categorías, etiquetas y medios | HTTP 200, JSON | Excluir del módulo |
| Inicio, feed, categoría y etiqueta del CMS | Pantalla Próximamente sin X-Robots-Tag noindex | Añadir cabecera noindex, follow |
| wp-sitemap.xml del CMS | HTTP 200 con HTML Próximamente; no es un sitemap XML válido | Desactivar sitemap nativo y proteger respuestas HTML con noindex |
| Sitemap principal | XML válido con los 14 artículos actuales | Conservar |
| Acceso y preview anónimo de WordPress | Acceso 200; preview muestra Próximamente | No redirigir |

Hostinger Tools 3.0.74 está activo. Su clase `wp-content/plugins/hostinger/includes/ComingSoon.php` registra `template_redirect` con prioridad 10 e interrumpe la respuesta. El módulo corre en prioridades 0 y 1, antes de esa pantalla, sin desactivar Hostinger Tools. No hay Yoast, Rank Math u otro plugin SEO convencional entre los plugins instalados que reportó el conector; el inventario de MU-plugins incluye rauvia-indexnow.php y hostinger-auto-updates.php. No se modifica ninguno.

No se recibió la exportación de las 28 URL originales de Search Console. Esta auditoría descubre las publicaciones actuales por la API y no pretende sustituir ni cerrar ese reporte histórico. Los 28 pares origen/destino actuales no demuestran que sean las mismas 28 incidencias de Search Console. Tampoco se ha confirmado que Google indexe actualmente copias completas del artículo: el blog sirve una pantalla de espera.

## Implementación

Único archivo que se instala: `integrations/wordpress/rauvia-seo-headless.php`.

- Se limita al WordPress cuyo home_url es blog.rauvia.com.mx.
- Redirige GET/HEAD sólo de entradas post, publicadas, sin contraseña, con slug válido.
- Destino fijo: https://rauvia.com.mx/recursos/{slug}/. No conserva parámetros del origen.
- Antes del 301 verifica HTTP 200, canónica única y exacta y ausencia de noindex en destino. No sigue redirecciones en esa comprobación.
- El chequeo usa la API HTTP nativa de WordPress, máximo 3 segundos y 512 KiB. Cachea éxito 1 hora y fallo 60 segundos. Las nuevas publicaciones pueden habilitarse sin registrar slugs manualmente.
- Si falla la comprobación, conserva la respuesta normal del CMS y añade noindex al artículo; no redirige a una página dudosa. Un éxito cacheado puede permanecer hasta una hora después de una caída del destino.
- Excluye REST, administración, AJAX, cron, XML-RPC, previews, embeds, adjuntos y métodos distintos de GET/HEAD. Los feeds reciben noindex, no redirección.
- Categorías, etiquetas, otros archivos editoriales, inicio y búsqueda reciben noindex, follow mediante cabecera y el filtro nativo wp_robots cuando el tema lo ejecuta. Las respuestas 404 también reciben noindex.
- Desactiva el sitemap nativo del CMS. Con la pantalla de espera de Hostinger, una solicitud de sitemap puede seguir devolviendo HTML, pero noindex; no se promete un 404 mientras esa pantalla intercepte la respuesta.
- Permite revertir con la constante RAUVIA_HEADLESS_SEO_DISABLED=true o retirando sólo este archivo.

No se cambian React, Express, rutas comerciales, sitemap principal, canónicas, dependencias ni IndexNow. Se verificaron por hash 1,075 archivos originales fuera de node_modules/tmp: conservan sus bytes originales. El caché que generaron las pruebas se restauró desde el ZIP original.

## Evaluación de riesgo

Escala 1–5 para probabilidad e impacto. Son estimaciones de ingeniería, no probabilidades estadísticas ni mediciones de incidentes.

| Alternativa | Probabilidad | Impacto | Producto | Evaluación |
|---|---:|---:|---:|---|
| Sólo canonical en el tema | 1 | 2 | 2 | La pantalla Próximamente puede impedir que se ejecute wp_head; no resuelve la ruta pública por sí sola |
| MU-plugin selectivo con verificación del destino | 2 | 3 | 6 | Elegida; local, reversible y protege el CMS |
| Redirigir todo blog | 4 | 5 | 20 | Rechazada; puede romper API, medios y editor |
| Otra regla para shop | 2 | 2 | 4 | Innecesaria; ya funciona |
| Cambiar DNS o la aplicación principal | 3 | 4 | 12 | No justificado por los hallazgos |

Riesgos residuales: disponibilidad del destino, latencia en chequeos fríos, caché CDN anterior, comportamiento de plugins/tema en WordPress real y rastreo futuro de Google. El módulo no garantiza selección de canónica ni plazo de reindexación.

## Validación realizada

- Integridad del ZIP original: correcta.
- PHP 8.5.10 mediante runtime WebAssembly local: lint correcto; 48 comprobaciones funcionales con WordPress simulado.
- Tres ejecuciones aisladas adicionales: REST_REQUEST, XMLRPC_REQUEST y desactivación global; sin redirección ni consulta de destino.
- Callback de redirección ejecutado: 301, Location fijo y terminación correcta.
- 83 pruebas existentes de SEO/HTML e IndexNow: aprobadas. Incluyen aplicación compilada, artículos, errores 404/503, sitemap, rutas históricas y autenticación de hooks.
- Auditoría pública inicial: 14/14 destinos correctos.
- Auditoría ampliada: 53 solicitudes. Cuatro destinos agotaron el tiempo de espera; los cuatro respondieron 200 con canónica exacta en la revisión específica posterior. Se conservan ambos resultados sin borrar los fallos.
- API, acceso WordPress y shop verificados en producción mediante lecturas; no se escribió en producción.

No se ejecutó el módulo dentro de una instalación real de WordPress de pruebas. Los tests PHP simulan sus APIs: no equivalen a validación integrada de WordPress, tema, caché y CDN. No se realizaron cambios en Search Console ni se asegura cierre de sus incidencias.

## Instalación y reversión

1. Probar primero en una copia de WordPress, conservando la configuración de Hostinger Tools. Si su home_url cambia, adaptar sólo el dominio permitido en esa copia de prueba; no enviar esa variante a producción.
2. Repetir el inventario previo con `python3 scripts/audit-headless-seo.py --phase before --output preflight-nuevo.json`. Resolver fallos persistentes antes de instalar.
3. Respaldar el directorio wp-content/mu-plugins del CMS. Instalar solamente el PHP como `blog.rauvia.com.mx/wp-content/mu-plugins/rauvia-seo-headless.php`. Un MU-plugin se carga automáticamente: copiarlo ya es activarlo. Requiere autorización para producción.
4. No cargar el ZIP completo al despliegue Node ni reemplazar public_html de RAUVIA. No tocar rauvia-indexnow.php. No cambiar DNS ni desactivar el modo Próximamente.
5. Ejecutar `python3 scripts/audit-headless-seo.py --phase after --output validacion-despues.json`. Exigir 301 directo para GET/HEAD de los 14 artículos, 200 y canónica correcta en destino, API JSON accesible y shop sin regresión. Revisar también medios estáticos, editor y preview autenticado manualmente.
6. Si se siguen viendo respuestas previas, revisar caché CDN/LiteSpeed y purgar sólo el CMS con autorización. Si falla la API o aparecen bucles, retirar inmediatamente sólo este MU-plugin.
7. Para revertir: renombrar el PHP a una extensión distinta de .php o retirarlo; alternativamente definir RAUVIA_HEADLESS_SEO_DISABLED=true en wp-config.php. Los transients no ejecutan ninguna lógica por sí solos y expiran. Si se cachearon respuestas en una capa externa, purgar el CMS; un 301 ya almacenado por un navegador puede persistir.
8. Después de verificar producción, revisar las URL exactas exportadas de Search Console y solicitar validación cuando corresponda. La categoría Página con redirección puede ser esperada para el CMS.

## Contenido de los paquetes

`rauvia-v78-correccion-indexacion.zip`: módulo, tests, auditoría reproducible, informe y evidencias. Es un paquete de intervención WordPress, no un plugin convencional que se instala con el botón Subir plugin.

`rauvia-v78-fuente-con-correccion.zip`: fuente V78 conservada más esos archivos aditivos. Se omiten node_modules, tmp, logs y archivos temporales. Incluye dist original sin recompilar. No implica una versión desplegada ni requiere subir la aplicación completa para aplicar este cambio.

Referencias: [template_redirect](https://developer.wordpress.org/reference/hooks/template_redirect/), [wp_robots](https://developer.wordpress.org/reference/hooks/wp_robots/), [wp_sitemaps_enabled](https://developer.wordpress.org/reference/hooks/wp_sitemaps_enabled/).
