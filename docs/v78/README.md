> Informe histórico de V78 antes de DIO. La compilación completa y la validación vigentes de V78 con DIO están en [el informe DIO](../dio-v1-report.md).

# RAUVIA V78 — rendimiento de /recursos/

Versión anterior: 77.0.0. Nueva versión: 78.0.0. Sin cambios de dependencias.

## Problema encontrado

En V77, el HTML y el listado del navegador podían esperar a WordPress cuando vencía la caché de diez minutos: dos intentos de hasta cinco segundos, más 500 ms entre intentos. El listado también serializaba el cuerpo completo y los datos embebidos de los artículos. Esta espera encontrada en el código explica un posible retraso; no se obtuvo una traza de tiempos de la sesión lenta del usuario.

## Cambios

- El HTML de recursos y /api/wp/posts?view=resources responden con la última copia válida mientras una sola consulta actualiza WordPress. Una petición fría espera como máximo 1000 ms por defecto (configuración limitada a 1500 ms).
- Se conserva en disco una respuesta válida de WordPress para reinicios. La escritura es atómica y serializada; las respuestas de una generación invalidada no reemplazan datos recientes. Si falla el disco, sigue funcionando la caché de memoria.
- Una actualización única al arrancar prepara el listado sin bloquear el inicio. No hay nuevos servicios ni intervalos permanentes.
- Se guardan en memoria los HTML de la instantánea actual; se vuelven a renderizar cuando cambian los artículos o su estado de actualización.
- Las tarjetas reciben título, extracto, fecha, enlace e imagen; el cuerpo completo queda disponible en el artículo individual. /api/wp/posts sin view conserva su respuesta completa y la verificación estricta.
- El navegador no hace una segunda consulta lenta directamente a WordPress para este listado. Tiene un límite de 2200 ms y hasta tres reintentos temporales cuando recibe una copia pendiente de actualizar; se cancelan al salir. Conserva el contenido disponible.
- El webhook mantiene la invalidación y la verificación estricta de publicación/edición/eliminación antes de IndexNow. Se conservan sitemap, canonicals, redirecciones, rate limiting y observabilidad. Server-Timing facilita medir la espera del servidor.

## Pruebas y alcance

230 pruebas aprobadas: 11 de rendimiento/recuperación, 54 de IndexNow, 10 de sincronización WordPress y 155 de regresión. TypeScript y compilación del servidor correctos. El JSON validation.json registra los resultados y los tiempos exactos.

En una prueba local del servidor compilado con WordPress pendiente: aproximadamente 1,05 s de respuesta fría, menos de 10 ms para la copia conocida y 7.735 bytes de datos iniciales frente a 191.538 bytes de artículos completos. Son mediciones en proceso, sin red ni navegador real; no equivalen al tiempo de carga total en Hostinger.

El frontend completo no se pudo compilar en este Mac por falta de la dependencia nativa de Rolldown. Se mantiene el postinstall que ejecuta npm run build durante la instalación en Hostinger y que el usuario confirmó funcional para V77. No se incluyen archivos de frontend V76 como compilación V78. El ZIP contiene servidor compilado y todas las fuentes necesarias para generar el frontend.

## Despliegue

Archivo rauvia-platform-v78.zip. Directorio raíz rauvia-platform-v78. Express, Node 24.x, npm, entrada dist/server.cjs. Conservar las variables existentes. El panel no necesita un campo separado de build: npm install ejecuta el postinstall propio y el build completo.

WORDPRESS_CACHE_PATH es opcional. Por defecto utiliza data/wordpress-posts-cache.json, que Express no publica. Para conservarlo entre despliegues se recomienda ubicarlo en almacenamiento privado persistente fuera de hbuilds/current y public_html. El funcionamiento normal no requiere una variable nueva. WORDPRESS_RESOURCES_WAIT_MS permite ajustar la espera fría dentro del límite indicado.

El puente WordPress V77 ya instalado es compatible: los cambios PHP de este paquete solo actualizan el encabezado de versión. No es necesario reinstalarlo para esta mejora.

## Validación después de publicar

No se ha desplegado V78 desde esta entrega. El objetivo de menos de tres segundos de carga total sigue pendiente de verificación en producción.

Después de instalar, confirmar build satisfactorio y medir desde un navegador real: navegación directa y desde el menú, primera visita/reinicio y visitas posteriores, conexión móvil y escritorio. Registrar tiempo del documento, Server-Timing y aparición del contenido principal. Debe verse la publicación del 7 de octubre y su fecha WordPress. Publicar/editar/eliminar una entrada y comprobar invalidación, artículo, sitemap e IndexNow. Con WordPress lento, la lista anterior debe permanecer visible y actualizarse al recuperar comunicación. Estos cambios no garantizan por sí solos una conexión de red inferior a tres segundos.
