# Actualización RAUVIA: sitemap y referencias para LLMO

## Qué se corrigió

El ZIP 17 ya tenía sitemap.xml, robots.txt, llms.txt y llms-full.txt. El sitemap omitía casos y páginas legales; no existía la carpeta pública llmo. Se amplió lo existente, sin cambiar diseño, navegación, contenido de páginas, asistente ni eventos comerciales.

## Cómo subir esta actualización

1. Usa esta copia completa del proyecto como nueva versión de desarrollo. Conserva la anterior como respaldo.
2. Mantén tus variables de entorno y credenciales en el hosting; no deben guardarse en public/ ni llmo/.
3. Ejecuta el proceso habitual de instalación y compilación: `npm ci` y `npm run build`.
4. Publica el resultado y reinicia el servidor Node con `NODE_ENV=production`, según tu configuración actual de Hostinger. Este paquete no cambia tu arquitectura de hosting.
5. Comprueba las URLs indicadas abajo. Subir solamente el ZIP de código al dominio no publica automáticamente una aplicación React.

No hay librerías nuevas ni migraciones de MySQL. La carpeta `public` es una ubicación del código: no debe aparecer `/public/` en la dirección web.

## URLs que deben funcionar después de publicar

- https://rauvia.com.mx/sitemap.xml
- https://rauvia.com.mx/robots.txt
- https://rauvia.com.mx/llms.txt
- https://rauvia.com.mx/llms-full.txt
- https://rauvia.com.mx/llmo/index.json
- https://rauvia.com.mx/llmo/rauvia.md
- https://rauvia.com.mx/llmo/aethryon.md
- https://rauvia.com.mx/llmo/evidencia.md
- https://rauvia.com.mx/llmo/organization.json

En producción `/llmo/` redirige al índice. Un archivo inexistente dentro de esa carpeta debe devolver 404, nunca la portada React. Si hay Apache/CDN delante de Node, debe respetar los archivos estáticos y reenviar a Node las rutas restantes; verificar después del despliegue.

## Archivos nuevos

- `public/llmo/`: cinco archivos públicos de referencia; no incluye prompts privados ni documentación interna.
- `scripts/public-routes.js`: catálogo compartido de rutas canónicas públicas.
- `scripts/discovery.test.js`: pruebas de generación y referencias.
- `scripts/check-discovery-http.js`: comprobación de URLs después de iniciar el servidor (admite `CHECK_BASE_URL` para comprobar el dominio publicado).
- Este documento.

## Archivos modificados

- `public/sitemap.xml`: páginas públicas y artículos publicados actuales.
- `scripts/generate-sitemap.js`: paginación WordPress, validación, límite de tiempo, escape XML y escritura atómica. Si WordPress falla, la compilación se detiene antes de borrar artículos del sitemap anterior.
- `public/llms.txt` y `public/llms-full.txt`: referencias corregidas hacia `/recursos`, casos y nueva carpeta.
- `index.html`: enlace de descubrimiento hacia llms.txt, sin cambios visuales.
- `server.ts`: publicación de `/llmo/` y reconocimiento de rutas React válidas en acceso directo.
- `scripts/prerender.js`: incluye las diez rutas públicas estáticas del catálogo, además de 404. Evita heredar el canonical de la portada al generar otras páginas y verifica que cada página tenga exactamente su canonical correcto.
- `package-lock.json`: sincronizado con las dependencias ya declaradas; el ZIP original no permitía ejecutar `npm ci` por inconsistencias. No se añadieron dependencias a `package.json`.
- `docs/sitemap-architecture.md` y `docs/llms-file-policy.md`: documentación alineada con esta actualización.

Se conserva `robots.txt`, que ya declara el sitemap y permite el acceso público. Su política de rastreo no se cambia. Robots.txt no protege datos privados.

## Mantenimiento

El sitemap se regenera en cada build. Después de publicar o retirar artículos en WordPress, recompila y vuelve a publicar RAUVIA: no se actualiza en tiempo real ni se creó una automatización.

La fuente WordPress se toma de `WP_API_URL` (endpoint posts) o `VITE_WORDPRESS_API_URL` (base wp/v2). Esas variables deben estar disponibles en el entorno de compilación. En ausencia de ambas se usa el blog actual de RAUVIA.

No se inventan fechas lastmod para páginas estáticas; los artículos usan la fecha de modificación de WordPress. Al crear una página nueva, agregar su URL canónica a `scripts/public-routes.js` además de su ruta React. Actualizar las referencias públicas si cambia la identidad, el portafolio o los casos; conservar coherencia con `src/config/entity.ts`.

Pruebas locales: `node --test scripts/discovery.test.js`. Después del despliegue, enviar `https://rauvia.com.mx/sitemap.xml` en Google Search Console y comprobar la lectura sin errores.

## Alcance y límites

La carpeta `/llmo/` es una convención de RAUVIA, no una carpeta obligatoria de un estándar. `llms.txt` es una propuesta de descubrimiento de contenido para modelos. Estos archivos no son una API de chat ni garantizan indexación, posicionamiento, entrenamiento o citas en respuestas de IA.

No se cambió el manejo existente de slugs desconocidos de `/recursos/`: continúa siendo una limitación del servidor SPA ajena a esta actualización. Los artículos se enumeran en el sitemap, pero no se agregó prerender individual de posts.

Referencias: https://llmstxt.org/ y https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## Verificación realizada en esta entrega

- TypeScript (`npm run lint`): aprobado.
- Cinco pruebas automatizadas de sitemap y archivos públicos: aprobadas.
- XML del sitemap: sintaxis validada con xmllint.
- Build completo, prerender de diez páginas y 404, y bundle del servidor: aprobado.
- Canonical único y correcto en cada página prerenderizada: verificado por el build.
- Sitemap actualizado desde WordPress: 16 URLs, diez páginas y seis artículos.
- Comprobación HTTP local de 21 rutas: códigos y tipos de contenido correctos; archivo LLMO inexistente devuelve 404.
- Vite conserva una advertencia de tamaño del bundle JavaScript (más de 500 kB); no impidió compilar y no se realizó una optimización ajena a esta tarea.

La verificación fue local. No se publicó ni se modificó rauvia.com.mx ni se envió el sitemap a Search Console. El ZIP contiene código fuente y recursos públicos, no node_modules ni el directorio dist; el build debe ejecutarse al desplegar. El archivo bun.lock original se conserva, pero las pruebas y la sincronización de dependencias se realizaron con npm/package-lock.json, no con Bun.
