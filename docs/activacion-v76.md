# RAUVIA v76 — activación en producción

Completada el 10 de octubre de 2026, 18:13 de Ciudad de México. Cuenta Hostinger u345974778.

## Despliegue y configuración

- Dominio: https://rauvia.com.mx/
- Despliegue vigente: `01a1284d-6c60-7173-9411-ded9a515e78c`, completado a las 00:12:19 UTC del 11 de octubre.
- Archivo: `rauvia-platform-v76.zip`; SHA-256 `2c7e29a92b6d00e102cc7b52a4259e1e75eb51a8027c79b95b0bdaf0472aadd2`.
- Express, Node.js 24, entrada dist/server.cjs. Se conservaron el frontend prerenderizado y las 22 variables originales. La primera publicación y la aplicación de variables generaron dos despliegues v76 completados en Hostinger.
- IndexNow habilitado mediante INDEXNOW_ENABLED=true. Clave pública configurada, secreto independiente generado y guardado en Hostinger y wp-config.php; no se incluyen secretos en este informe ni en el ZIP.
- Cola: /home/u345974778/domains/rauvia.com.mx/private/indexnow-state.json. Directorio 700 y archivo 600, fuera del directorio público y de las versiones desplegadas.
- Cadencia productiva de sitemap conservada: 21,600,000 ms, seis horas. No se agregaron servicios permanentes.

## WordPress

Puente v76.0.0 instalado en blog.rauvia.com.mx, wp-content/mu-plugins/rauvia-indexnow.php. WordPress lo reconoce en Imprescindibles y lo ejecuta automáticamente. Se comprobó que wp-config.php conserva su contenido previo y añade únicamente la constante del secreto. WP-Cron no está deshabilitado.

## Comprobaciones reales

Un evento PHP puntual en WP Crontrol, ya consumido, comprobó desde el servidor WordPress:

- Clave pública HTTPS: 200, text/plain y cuerpo exacto de 32 caracteres.
- Inicio: 200, contenido RAUVIA y canonical presentes.
- /healthz y /api/db/health: 200.
- /soluciones: 301 hacia /soluciones/.
- Hook sin autorización: 401.
- Sitemap: 200; inicialmente 30 URL del caché. Tras la revalidación completa: 20 páginas institucionales y 13 artículos, 33 URL.

Se invocó la función real de encolado del puente con un artículo ya publicado. WP-Cron entregó el evento a /internal/indexnow, que respondió 202. Express regeneró el sitemap y notificó a IndexNow un lote deduplicado de tres URL. IndexNow respondió 202, accepted=true, keyValidationPending=true. La cola quedó con cero pendientes y el estado conserva las 33 URL. Los eventos puntuales de prueba y entrega ya no aparecen en WP-Cron. No se crearon ni modificaron artículos públicos de prueba.

La aceptación 202 de IndexNow indica recepción con validación de clave pendiente; no acredita rastreo, indexación ni posicionamiento. Se probó la entrega real por cola y WP-Cron; no se ejercitaron publicaciones, cambios de slug y eliminaciones reales de artículos durante esta activación.

El navegador local bloqueó la navegación directa al TXT con ERR_BLOCKED_BY_CLIENT. La comprobación HTTP se realizó desde WordPress con validación TLS normal y confirmó el cuerpo exacto. El inicio del sitio también se abrió correctamente en Chrome.

## Evidencia y operación

La entrega original de activación conserva las capturas del despliegue y del MU plugin, verificacion-wordpress.json y hostinger-evidencia.json; no se duplican esos artefactos en este árbol fuente. Los registros productivos muestran también la API /api/events y consultas MySQL completadas satisfactoriamente después del despliegue.

La guía incluida en el ZIP conserva el estado histórico previo al despliegue; este informe documenta su activación posterior. Para futuras entregas, conservar las variables IndexNow y la carpeta private. Para deshabilitar envíos, establecer INDEXNOW_ENABLED=false desde hPanel y retirar el MU plugin; conservar la cola para investigación. v75.1 permanece disponible en el historial y en la copia fuente recuperada.
