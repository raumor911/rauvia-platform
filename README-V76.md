# RAUVIA v76 — IndexNow

Aplicación completa recuperada de `hbuilds/last-source` en Hostinger. El despliegue actual usa el archivo `rauvia-platform-v75.1.zip`, build `01a11820-f8b6-70e9-87a6-5d6972e5073f`, Node.js 24 y entrada `dist/server.cjs`. Los 1,090 archivos del manifiesto V75.1 coincidieron con sus SHA-256 antes de editar.

La versión de aplicación en package.json y package-lock.json pasa de 0.0.0 (metadato heredado) a 76.0.0, coherente con la entrega v76. No se actualizan dependencias.

## Cambios

- Clave pública exacta en `/1109c92c84549878ea17f221eaba40bc.txt`, atendida por Express y disponible en public/dist.
- Servicio IndexNow para el host canónico, con validación estricta, deduplicación de pendientes, lotes, timeout, respuestas 200/202 y reintentos persistentes con Retry-After.
- Endpoint autenticado `POST /internal/indexnow` para publicación, actualización, eliminación y envío inicial explícito.
- Detección de cambios y bajas durante el trabajo existente de sitemap, usando lastmod de WordPress y hashes de HTML institucional. Reintenta pendientes también si WordPress falla.
- Puente WordPress opcional en `integrations/wordpress/rauvia-indexnow.php`.
- Métricas resumidas en el endpoint de estado protegido y logs sin token.

## Contenido y validación

Se incluyen todas las fuentes originales, recursos, datos, documentación, pruebas, HTML/CSS/JS productivos originales y el backend recompilado. El frontend prerenderizado original se conserva byte por byte: no hubo reconstrucción del frontend ni actualización del HTML Person Knowledge heredado de v75.1. El nuevo archivo de clave es la única adición al frontend publicado.

La compilación del backend y la comprobación TypeScript pasan. Las pruebas del servicio y de la aplicación compilada usan transportes simulados y una fixture de WordPress; no acreditan una prueba HTTP sobre puertos reales ni una prueba de producción. El entorno bloqueó sockets locales y descargas npm. Para compilar se usó esbuild 0.25.12 y TypeScript 5.8.3 disponibles en caché local; el proyecto conserva sus dependencias declaradas originales, incluido esbuild ^0.28.1. Los resultados precisos están en `docs/v76-evidencias/` y `RELEASE-V76.json`.

## Despliegue y activación

Consultar `docs/indexnow-operacion.md` antes de activar. La aplicación queda empaquetada con `dist/server.cjs` listo, pero IndexNow está desactivado hasta configurar las variables de producción. Debe verificarse la clave pública después del despliegue, activar el envío y configurar el secreto y el puente WordPress si se desean hooks inmediatos. No se desplegó esta versión, no se instaló el puente en WordPress y no se enviaron URL reales a IndexNow.

Los manifiestos y reportes V75.1 y anteriores se conservan como historial; `MANIFIESTO-V76.json` y `RELEASE-V76.json` describen esta entrega.
