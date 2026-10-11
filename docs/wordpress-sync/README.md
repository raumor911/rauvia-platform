# RAUVIA 76.0.1 — sincronización WordPress

## Evidencia y causa raíz

El árbol oficial main bd9d596c01a083b80597e9601572daef78d60797 corresponde a V76 (76.0.0). La corrección usa ese código completo y conserva su historial. No se reconstruyen componentes ni se despliega en Hostinger. Versión de corrección: 76.0.1, sin cambio de dependencias.

El listado público consultado mostraba primero “Qué debería existir antes de implementar un CRM”, 5 de octubre; no mostraba la entrada nueva “Cotizar no es ayudar a decidir…”. La exportación nativa de WordPress, limitada a entradas publicadas, confirma 13 entradas y que el ID 49 (cotizacion-cliente-no-avanza-que-revisar) se publicó el **7 de octubre de 2026 a las 00:20:53**, tanto en date como date_gmt. Debe aparecer primero. El archivo published-latest-10.json conserva los diez registros con id, date, date_gmt, modified, modified_gmt, status, slug y title. El fixture público conserva los 13 para pruebas reproducibles.

Las rutas REST /wp-json/wp/v2/posts y su alternativa rest_route fueron inaccesibles desde esta sesión (ERR_BLOCKED_BY_CLIENT; red local sin DNS). Esos diez registros provienen de WXR oficial, NO de una respuesta REST observada. No se exportaron borradores ni publicaciones privadas y no se versiona el XML ni metadatos privados.

Causa demostrada en el código: scripts/render-static.tsx obtiene posts en build; Express sirve /recursos/index.html pregenerado; RecursosPage abandona el fetch cuando existe initialContent().posts. Por ello el HTML y la hidratación fijan el listado a la fecha del build. El webhook de IndexNow no invalidaba wordpressCache. Su TTL de 10 minutos no podía actualizar el HTML pregenerado. Las solicitudes REST omitían un orderby explícito para el listado y dependían del default de WordPress; React mostraba post.date en la zona horaria del cliente.

La fecha editorial en el cuerpo se conserva separada de date/date_gmt. No se reasigna la publicación al leer textos editoriales. El indicio previo de publicación “2 de octubre” no coincide con la fecha vigente del ID 49 en WordPress; no se usa para reordenar ni modificar WordPress. modified y modified_gmt pueden ser anteriores a date en las entradas programadas; se mantienen como datos de origen.

## Capas de caché

| Capa | Estado observado/análisis | Corrección |
| --- | --- | --- |
| WordPress/LiteSpeed 7.9.1 | Plugin activo; caché general encendida; **caché API REST apagada**, sesiones autenticadas no cacheadas | MU-plugin añade no-store a /wp/v2/posts y marca estas respuestas no cacheables en LiteSpeed; no se cambian opciones productivas |
| Express WordPress | Memoria, TTL 10 min, deduplicación de solicitudes; sin invalidación por webhook | Invalidación por generación, incluye cachés positivas/negativas y solicitudes concurrentes; conserva última respuesta válida durante fallos |
| Disco | sitemap-cache.xml cargado al arrancar; no existe un caché de posts de disco en este código | Escritura atómica dentro de refresh único; reintenta si cambia la generación del contenido durante la operación |
| HTML/frontend | Listado pregenerado y bootstrap congelado; sin refetch inicial | Resolver SSR de /recursos/ antes de estáticos; bootstrap con posts actuales; revalidación al montar, recuperar foco o visibilidad, sin polling |
| HTTP navegador/CDN | Artículo autorizaba max-age=60; sitemap max-age=3600 con stale-while-revalidate=86400; no se pudieron obtener encabezados reales del CDN principal | no-store en listado, artículos, proxy y sitemap; configuración efectiva del CDN Hostinger no verificada ni alterada |

No se atribuye el problema a LiteSpeed REST, que estaba apagado. La causa primaria se demuestra sin suponer un fallo del CDN. Un CDN que ignore no-store o conserve objetos anteriores requiere una purga selectiva posterior al despliegue; no se realizó ninguna purga en esta tarea.

## Flujo de publicación

El MU-plugin existente conserva transition_post_status, post_updated y before_delete_post, incluyendo antiguo/nuevo slug, autenticación y WP-Cron con reintentos. POST /internal/indexnow ahora invalida la caché, recupera el listado y resuelve los slugs afectados; una respuesta obsoleta o error da 503/Retry-After y WP-Cron reintenta. Una ausencia confirmada es válida para eliminación/cambio de slug. Tras verificar datos se persiste la notificación IndexNow y se confirma 202; el sitemap se regenera con protección frente a revisiones antiguas, y luego se envía a IndexNow. La sincronización también funciona con IndexNow deshabilitado. No se añaden procesos, workers, servicios ni intervalos permanentes.

La verificación de páginas se prueba en Express compilado en memoria. No hay una comprobación externa del CDN en cada webhook: no se afirma una verificación HTTP pública que no se haya hecho. El timeout y reintentos de WordPress existentes se conservan. Ante indisponibilidad no se confirma contenido como verificado, no se transforma un fallo en 404 y no se reemplaza la última lista válida por un fallback antiguo. El TTL y las siguientes visitas recuperan el contenido sin reinicio; el refresco existente del sitemap sigue siendo respaldo para IndexNow.

## Archivos principales

- server.ts: resolver dinámico, invalidación/validación del evento, no-store, protección de revisiones del sitemap y escritura serializada.
- server/wordpress/cache.ts: orden explícito, invalidación y protección de solicitudes en vuelo, snapshot stale.
- server/seo/resourcesHtml.tsx: reutiliza AppLayout y RecursosPage existentes para SSR.
- src/lib/wp.ts, postDates.ts, initialContent.ts: proxy prioritario, errores recuperables, orden/fecha deterministas y bootstrap.
- src/App.tsx, src/pages/RecursosPage.tsx, src/components/PostArticle.tsx: hidratación consistente, cancelación y revalidación; fecha civil WordPress estable entre servidor/cliente.
- integrations/wordpress/rauvia-indexnow.php: encabezados REST y versión 76.0.1, conserva hooks y secreto externo.
- tests/wordpress-sync.test.ts, wordpress-sync-app.test.mjs, fixture publicado y helpers/production-app.mjs: pruebas. El transporte simulado marca req.complete al finalizar el cuerpo, como hace HTTP real, para permitir respuestas asíncronas.
- package.json/package-lock.json: 76.0.1 y comando test:wordpress-sync, sin cambios de dependencias.

## Validación y límites

Pruebas nuevas: orden real del ID 49, fechas editoriales separadas, vaciado autoritativo, petición REST con orderby=date, invalidación de consultas negativas, carrera de listas/artículos, recuperación tras fallo, proxy y fallback. Flujo completo simulado en la aplicación compilada: listado inicial sin el post, evento publicación, listado actualizado sin cambiar dist ni reiniciar, edición, caída, recuperación, eliminación/404, canonical/metadatos y sitemap, redirecciones 301 y clave IndexNow intactos. Incluye el caso de refresco de sitemap en curso durante un segundo webhook.

TypeScript y compilación backend pasan; las 54 pruebas IndexNow y las 155 de regresión backend pasan. Las diez pruebas nuevas pasan. Total único: 219 pruebas. El conjunto adicional de nueve pruebas de wordpress-cache se incluye en esas 155, no se cuenta dos veces.

Build completo intentado: generadores knowledge/retrieval correctos; Vite falla por falta de Rolldown darwin-arm64 en las dependencias recuperadas de Linux. No se cambian dependencias para sortearlo. No hay intérprete PHP local: el añadido PHP requiere lint/validación en entorno PHP antes de activarse. No se probó el navegador con frontend recompilado ni se simuló una publicación real en WordPress.

La revisión React comprueba limpieza de listeners, aborto de solicitudes anteriores, secuencia para impedir escrituras tardías, fechas deterministas y el mismo estado stale en SSR/bootstrap/hidratación. No añade una biblioteca de datos ni un proceso de desarrollo productivo.

## Integración y activación pendientes

PR en borrador, sin merge ni despliegue automático. En un entorno con dependencias nativas: npm ci, npm run lint, npm run build, npm run test:indexnow y npm run test:wordpress-sync. Es necesario build completo, no desplegar solo el backend con el bundle cliente anterior. Verificar PHP y luego actualizar el MU-plugin 76.0.1 conservando RAUVIA_INDEXNOW_WEBHOOK_TOKEN. Verificar/limpiar una vez las rutas dinámicas antiguas si el CDN aún entrega objetos almacenados. Conservar variables, carpeta privada de IndexNow y el intervalo de sitemap existente (6 horas).

Después de un despliegue autorizado: comparar REST real (los ocho campos solicitados), /api/wp/posts, /recursos/, artículo ID 49 y sitemap; publicación/edición de contenido autorizado y revisión de registros. El resultado esperado es ID 49 primero, fecha 7 de octubre, HTML/bootstrap/API consistentes y nuevos cambios visibles por webhook sin rebuild. Esta tarea no modifica producción, no purga cachés, no crea/edita entradas y no afirma que el sitio productivo ya esté corregido.
