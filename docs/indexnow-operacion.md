> V78: mejoras de rendimiento del listado; véase [informe V78](v78/README.md). Las secciones anteriores de versiones previas se conservan como historia.

# IndexNow en RAUVIA — operación v76

> Actualización 76.0.1 en revisión: [sincronización WordPress](wordpress-sync/README.md). Requiere build completo antes de desplegar. Las referencias a despliegue/pruebas de v76 abajo son históricas; la activación posterior está documentada en activacion-v76.md.

## Arquitectura comprobada y procedencia

Hostinger identifica rauvia.com.mx como aplicación Node.js y blog.rauvia.com.mx como WordPress, cuenta de hosting u345974778. El panel marca como actual el despliegue completado el 7 de octubre de 2026 a las 14:49 de Ciudad de México: rauvia-platform-v75.1.zip. La configuración Passenger apunta a `/home/u345974778/domains/rauvia.com.mx/hbuilds/current/nodejs`, Node.js 24 y `dist/server.cjs`.

Se descargó el contenido original de `hbuilds/last-source` mediante el administrador de archivos de Hostinger, con acceso de lectura. Su manifiesto SHA-256 confirmó los 1,090 archivos originales. El repositorio encontrado `raumor911/rauvia-platform` solo contenía v52 y no se utilizó como base. El sitio público por sí solo no se utilizó para reconstruir Express.

El frontend usa React/Vite y HTML prerenderizado. Express sirve los HTML institucionales, resuelve artículos de WordPress, aplica las redirecciones 301/410, atiende APIs y ofrece recursos de descubrimiento. El sitemap en memoria/disco se genera desde `scripts/public-routes.js`, que deriva de `src/seo/routeSeo.js`, y la lista completa paginada de posts públicos de WordPress. Los artículos usan `/recursos/{slug}/`, independientemente del permalink del CMS. La lista exacta de rutas y endpoints se documenta en `v76-evidencias/inventario.json`.

El código original tiene un intervalo de sitemap por defecto de **21,600,000 ms (6 horas)**, configurable mediante `SITEMAP_REFRESH_INTERVAL_MS`. La referencia de conversación a 12 horas no se confirmó como configuración productiva: los valores de entorno Hostinger están enmascarados. v76 conserva el valor original; 43,200,000 ms permite configurar 12 horas explícitamente.

## Activación en Hostinger

1. Desplegar el ZIP completo con la misma configuración de aplicación: Express, Node.js 24, raíz `./`, entrada `dist/server.cjs`. Contiene dist listo. Conservar la configuración de build personalizada existente. Si se requiere reconstruir únicamente backend: `npm run build:server`; para reconstrucción total desde fuentes, el comando original es `npm run build`, que no se ejecutó para el frontend en esta entrega. No arrancar `npm run dev`, Vite, preview, cron externo ni otro proceso permanente.
2. Mantener IndexNow desactivado inicialmente (`INDEXNOW_ENABLED=false`). Mantener todas las variables productivas existentes. La API de Hostinger reemplaza la colección completa de variables: nunca pegar `********` como valor ni sobrescribir secretos existentes.
3. Comprobar que `https://rauvia.com.mx/1109c92c84549878ea17f221eaba40bc.txt` devuelve 200, `text/plain` y exactamente `1109c92c84549878ea17f221eaba40bc`. La ruta Express respeta antes los middlewares de canonicalización existentes. No se verificó esta ruta en producción porque v76 no se publicó.
4. Crear una carpeta privada persistente con permisos 700, fuera de public_html y de las carpetas de versiones hbuilds. Configurar `INDEXNOW_STATE_PATH=/home/u345974778/domains/rauvia.com.mx/private/indexnow-state.json`. El proceso de hosting debe poder escribir ahí. El archivo se guarda mediante reemplazo atómico con permisos 600. Esta cola está diseñada para **una instancia Node escritora**; no habilitar múltiples réplicas que escriban simultáneamente el mismo archivo.
5. Configurar `INDEXNOW_KEY` con la clave anterior; generar un secreto aleatorio distinto de al menos 32 caracteres para `INDEXNOW_WEBHOOK_TOKEN`, exclusivamente en el servidor. Ejemplo de generación local: `openssl rand -hex 32`. La clave IndexNow pública no autentica los hooks.
6. Activar `INDEXNOW_ENABLED=true` con `NODE_ENV=production` y aplicar el reinicio normal de la aplicación. Configuración por defecto: `INDEXNOW_BATCH_SIZE=1000`, máximo 10000; timeout 5000 ms, máximo 30000. `INDEXNOW_SUBMIT_INITIAL=false` establece una línea base sin reenviar todo el sitemap. Si se activa la opción inicial sobre un estado ya establecido, no provoca un envío retrospectivo: usar el evento `submit` para una lista explícita.

## Publicación, actualización y eliminación

El código original no tenía un CMS de páginas institucionales ni hooks de publicación propios: estas páginas se publican desplegando el código. v76 detecta cambios en sus HTML mediante la misma revisión del sitemap, incluyendo al arrancar cuando hay estado previo persistente. Puede enviarse además un evento autenticado después del despliegue, utilizando las URL canónicas verificadas.

`POST /internal/indexnow` requiere `Authorization: Bearer <INDEXNOW_WEBHOOK_TOKEN>` y JSON:

```json
{"event":"updated","urlList":["https://rauvia.com.mx/soluciones/"]}
```

Eventos admitidos: `published`, `updated`, `deleted`, `submit`. Máximo 1000 URL por evento y 60 solicitudes autenticadas por minuto y proceso. Cada URL debe ser HTTPS, del host exacto rauvia.com.mx, con slash final, sin query, fragmento, usuario, puerto explícito ni rutas internas. Un lote con cualquier URL inválida se rechaza completo. La lista debe contener solo páginas públicas reales; la validación de dominio no garantiza que una página exista. Al cambiar el slug se notifican la URL nueva y la anterior. Una baja debe poder notificarse aunque ya no figure en el sitemap y responda 404/410; no exigir 200 a las eliminaciones.

En 76.0.1 el evento primero invalida la caché y verifica los datos actuales de WordPress. Si la verificación falla, devuelve 503 con Retry-After para que WP-Cron reintente. El 202 significa que la sincronización de datos se verificó y la notificación IndexNow se persistió cuando los envíos están habilitados; no significa envío confirmado ni indexación. Si INDEXNOW_ENABLED=false, se sincroniza contenido y se devuelve enabled=false sin persistir una notificación de IndexNow. A continuación se intenta la revalidación del sitemap y el envío. El endpoint anterior `/internal/revalidate-sitemap` conserva su autenticación y límite de 10 segundos; cuando regenera el sitemap también produce detección de cambios.

## Puente WordPress headless opcional

Copiar `integrations/wordpress/rauvia-indexnow.php` a `wp-content/mu-plugins/rauvia-indexnow.php` de **blog.rauvia.com.mx**. Crear mu-plugins si no existe. Configurar en wp-config.php, fuera del repositorio:

```php
define('RAUVIA_INDEXNOW_WEBHOOK_TOKEN', 'VALOR_REAL_DEL_MISMO_SECRETO');
```

Se atienden publicaciones, actualizaciones, cambios de slug, paso de publicado a borrador/privado/papelera y eliminación definitiva. Revisiones, autosaves no publicados y otros tipos de contenido no producen envíos. El puente usa WP-Cron para un evento puntual a los cinco segundos y hasta tres reintentos posteriores ante errores de transporte, 429 y 5xx. Depende de que WP-Cron ya funcione y tenga ejecución regular. No se instala ningún servicio persistente. El puente debe instalarse y probarse en WordPress antes de considerar habilitados los hooks inmediatos. Se suministra como integración opcional; no se instaló ni se verificó contra el CMS real durante este trabajo. La caché de WordPress conserva su TTL de diez minutos y ahora se invalida por los eventos autenticados, incluidas consultas negativas y solicitudes en vuelo.

## Reintentos, observabilidad y recuperación

Los envíos POST se dirigen exclusivamente a `https://api.indexnow.org/indexnow`, sin seguir redirecciones. El JSON identifica host, key, keyLocation y URL. No hay endpoint de envío configurable ni destinos derivados de Host o del permalink de WordPress.

- 200: recibido por el servicio.
- 202: recibido, validación de clave pendiente.
- 400/403/422: los elementos del lote quedan bloqueados para evitar insistir en datos o clave incorrectos. Corregir la configuración y reencolar explícitamente mediante un cambio de revisión, o detener la aplicación y editar solamente los elementos bloqueados del archivo de estado: `blocked=false`, `nextAt=0`; conservar snapshot y el resto del archivo. Guardar copia antes de editar y reiniciar después. No editar el archivo mientras el proceso escribe.
- 429, 5xx, timeout y otros errores: conservar pendientes, respetar Retry-After numérico o fecha, o aplicar backoff exponencial desde un minuto, limitado a 24 horas.

No se añaden intervalos ni bucles de espera para reintentos: se intentan al arrancar, con un nuevo evento y en el intervalo original de sitemap, incluso si ese fetch falla. El próximo intento puede ocurrir bastante después de Retry-After si no hay actividad; es un mínimo de espera, no un temporizador nuevo. Máximo 10000 URL procesadas en una ejecución; el resto queda persistido. La cola admite hasta 50000 pendientes. Un cambio recibido durante un envío no se elimina al confirmar la revisión anterior.

Consultar `/internal/runtime-status` con el token de estado existente para `indexNow.enabled`, `pending`, `blocked`, `inFlight`. Logs: `indexnow_snapshot`, `indexnow_content_event`, `indexnow_response`, `indexnow_transport_failed` y eventos de error. No se registran el bearer token, el body completo ni la clave en los logs nuevos. Un estado ilegible/corrupto impide arrancar con IndexNow habilitado para evitar pérdida silenciosa: restaurar copia o desactivar `INDEXNOW_ENABLED`, investigar y reactivar.

Para rollback desactivar IndexNow y retirar/desactivar el puente; puede redesplegarse v75.1 usando la copia original. Conservar la cola privada para investigación. El archivo de clave público no es una contraseña.

## Validación entregada y pendientes externos

Pruebas unitarias del servicio: transporte simulado; pruebas de aplicación: Express compilado con solicitudes/respuestas en memoria y WordPress simulado. Se comprueban autenticación, validación de host, clave, lotes, persistencia, carreras, backoff, estado, canonicals, H1, redirects, 410/404, sitemap y proxy/artículo. No equivalen a pruebas de red real ni navegador.

Las restricciones locales impidieron abrir sockets TCP y descargar las dependencias nuevas de npm. Se utilizaron dependencias ya instaladas en el despliegue para pruebas y herramientas oficiales recuperadas de la caché local: esbuild 0.25.12 y TypeScript 5.8.3. Las dependencias declaradas del proyecto no se cambiaron. El backend se recompiló y TypeScript pasó. No se reconstruyó el frontend, no se ejecutó PHP real ni WP-Cron, no se desplegó v76, no se modificaron variables de Hostinger ni WordPress, no se envió ninguna URL real a IndexNow y no se comprobó indexación.

Después de desplegar y activar: verificar la clave en HTTPS; publicar, actualizar, cambiar slug y retirar un post de prueba; comprobar eventos y respuestas; revisar el sitemap y el contenido público. Una aceptación de IndexNow no garantiza rastreo, indexación ni posicionamiento. Referencia del protocolo: https://www.indexnow.org/documentation.
