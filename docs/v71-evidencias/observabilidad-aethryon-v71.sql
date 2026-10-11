-- MySQL. Sólo lectura. No modifica tablas, eventos ni identidades.
-- Confirmar el esquema de producción antes de ejecutar; no se accedió a la BD real.
SHOW COLUMNS FROM web_events;
-- Definir @window_start, @v71_start y @window_end con las fechas reales de
-- observación y despliegue. V71 no ha sido publicada durante esta tarea.

-- Visitas comparables V70/V71: excluir las exposiciones de secciones que
-- reutilizan aethryon_view. COUNT(DISTINCT session_id) es sesiones, no personas.
SELECT CASE WHEN event_timestamp < @v71_start THEN 'V70' ELSE 'V71' END AS period,
       COUNT(*) AS route_view_events,
       COUNT(DISTINCT session_id) AS sessions,
       COUNT(DISTINCT visitor_id) AS browser_visitors
FROM web_events
WHERE event_name = 'aethryon_view'
  AND JSON_EXTRACT(properties, '$.section') IS NULL
  AND SUBSTRING_INDEX(page_path, '?', 1) IN ('/aethryon','/aethryon/')
  AND event_timestamp >= @window_start AND event_timestamp < @window_end
GROUP BY period;

-- Exposición: >=50% del encabezado en el área visible bajo el header.
-- No equivale a lectura completa, tiempo de atención ni comprensión.
SELECT JSON_UNQUOTE(JSON_EXTRACT(properties, '$.section')) AS section,
       COUNT(*) AS observations, COUNT(DISTINCT session_id) AS sessions
FROM web_events
WHERE event_name = 'aethryon_view'
  AND JSON_UNQUOTE(JSON_EXTRACT(properties, '$.context')) = 'section_view'
  AND JSON_UNQUOTE(JSON_EXTRACT(properties, '$.ux_version')) = 'V71'
  AND event_timestamp >= @v71_start AND event_timestamp < @window_end
GROUP BY section;

-- Auditoría de deduplicación cliente: cualquier fila indica que debe
-- investigarse una duplicación o reinicio de almacenamiento del navegador.
SELECT session_id, JSON_UNQUOTE(JSON_EXTRACT(properties, '$.section')) AS section,
       COUNT(*) AS observations
FROM web_events
WHERE event_name = 'aethryon_view'
  AND JSON_UNQUOTE(JSON_EXTRACT(properties, '$.context')) = 'section_view'
  AND JSON_UNQUOTE(JSON_EXTRACT(properties, '$.ux_version')) = 'V71'
  AND event_timestamp >= @v71_start AND event_timestamp < @window_end
GROUP BY session_id, section HAVING COUNT(*) > 1;

-- Caminos explorados y acciones. El clic no demuestra compra, contacto
-- completado ni mejora del negocio. No sumar cta_click y whatsapp_click
-- como si fueran acciones diferentes: ambos pueden describir el mismo clic.
SELECT JSON_UNQUOTE(JSON_EXTRACT(properties, '$.destination')) AS destination,
       JSON_UNQUOTE(JSON_EXTRACT(properties, '$.context')) AS context,
       COUNT(*) AS clicks, COUNT(DISTINCT session_id) AS sessions
FROM web_events
WHERE event_name = 'cta_click'
  AND JSON_UNQUOTE(JSON_EXTRACT(properties, '$.source_page')) = '/aethryon/'
  AND JSON_UNQUOTE(JSON_EXTRACT(properties, '$.ux_version')) = 'V71'
  AND event_timestamp >= @v71_start AND event_timestamp < @window_end
GROUP BY destination, context;

-- WhatsApp mantiene su evento histórico. Comparación temporal descriptiva:
-- no atribuye diferencias al rediseño sin controlar fuente/tráfico/contexto.
SELECT CASE WHEN event_timestamp < @v71_start THEN 'V70' ELSE 'V71' END AS period,
       COUNT(*) AS clicks, COUNT(DISTINCT session_id) AS sessions
FROM web_events
WHERE event_name = 'whatsapp_click'
  AND SUBSTRING_INDEX(page_path, '?', 1) IN ('/aethryon','/aethryon/')
  AND event_timestamp >= @window_start AND event_timestamp < @window_end
GROUP BY period;
