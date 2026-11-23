# RAUVIA Trayectoria — restauración del catálogo comercial

**Corte:** 2026-11-10 (Ciudad de México). **Ámbito:** rama de funcionalidad; no equivale a producción ni a aprobación de tarifas.

## Objetivo

Restituir en `/trayectoria/` la tabla de suscripciones, planes y cambios individuales de RAUVIA Trayectoria, manteniendo página institucional, canonical, sitemap y despliegue actual.

## Fuente y control de versiones comerciales

La referencia inicial del 14 de octubre de 2026 contenía los planes Presencia Libre ($0), RAUVIA Trayectoria ($99/mes; 1 cambio Micro mensual) y Trayectoria Activa ($149/mes; 2 Micro o 1 Pequeño mensual), con cambios individuales Micro ($149), Pequeño ($299), Mediano ($549) y Mayor (desde $1,290). Los cambios incluidos no se acumulaban. Los precios de cambios individuales fueron descritos como IVA incluido, sin aprobación equivalente comprobable de IVA de suscripciones.

Existió **otra propuesta** en la misma fecha: cambios Micro $199, Pequeño $399, Mediano $899, Mayor desde $2,490; Trayectoria $99/mes con 1 Micro trimestral y Activa $199/mes con 1 Micro mensual. **No existe evidencia suficiente de ratificación** para sustituir el primer conjunto. Ningún precio de este PR debe presentarse como tarifa vigente aprobada.

Decisión implementada: **recuperar como referencia histórica v1** con un aviso visible, fuente única y solicitudes de confirmación por WhatsApp; sin checkout automático. No ejecutar actualización automática de precios ni promociones en crawlers.

## Autoridad de datos y superficies públicas

- `src/data/trayectoriaCatalog.ts`: única fuente de planes, alcance, cantidades, precios y disclaimer.
- `src/components/TrayectoriaCatalog.tsx`: dos tablas semánticas; selección de plan o modificación conduce a consulta por WhatsApp.
- `src/components/PresenceEditorialPage.tsx`: monta las tablas únicamente en `/trayectoria/`.
- `src/components/Footer.tsx`: enlace para descubrir el servicio.
- `src/seo/routeSeo.js`: canonical actual y entidad `Service` con un catálogo descriptivo sin precios JSON-LD no ratificados.
- `src/knowledge/assets.ts`, `catalog.ts`: asset y offering tipados con referencias a fuente pública.
- `src/knowledge/compiler.ts`: genera `public/llmo/trayectoria-catalogo.json` a partir de la misma fuente.
- `public/llmo/index.json`, `llms.txt`, `llms-full.txt`, `public/llmo/rauvia.md`: rutas de descubrimiento para agentes, buscadores y lectores.
- `public/llmo/trayectoria-catalogo.json`: snapshot versionado; **el build** lo regenera con la fuente de datos.

## Restricciones y riesgos

- No se promueve a producción automáticamente; falta merge, despliegue y verificación HTTP 200/HTML estático.
- `historical_reference_pending_commercial_confirmation` exige validación comercial antes de retirar avisos.
- No hacer `Offer` con precios en JSON-LD como si fuesen tarifas actuales.
- No convertir la condición de IVA de cambios individuales en condición de IVA para suscripciones.
- El equipo debe validar contratos, límites, periodicidad, políticas de baja y disponibilidad antes de ofrecer contratación.
- La creación del sitio gratuito y el hosting compartido son **sujetos a aceptación y disponibilidad**, no garantías irrestrictas.

## QA propuesto antes de merge y deploy

1. `npm ci`.
2. `npm run lint`.
3. `npm run build:knowledge` y `npm run test:knowledge`.
4. `npm run test:trayectoria`.
5. `npm run build` y `npm run test:seo`.
6. Verificar `GET /trayectoria/` con 200, H1 único, dos tablas en HTML inicial, canonical sin redirecciones y sin errores de consola.
7. Verificar `GET /llmo/trayectoria-catalogo.json` y `GET /llmo/knowledge-graph.json` tras build; comparar planes y valores.
8. Probar responsive, foco teclado en tablas con desplazamiento, enlaces a WhatsApp y footer.
9. Revisar la actualización del sitemap vivo, su indexabilidad y el almacenamiento en caché tras desplegar.

## Criterio de aceptación

Plan y cambios visibles en tablas, textos y valores coherentes con un solo archivo de datos; evidencia pública con disclaimer; fuente SEO canónica sin contenido duplicado; grafo público incluye `asset:trayectoria` y `offering:trayectoria`; ningún precio histórico presentado como vigente sin aprobación.

## Rollback

Revertir el merge que introduce el catálogo (sin borrar la ruta existente). Conservar `/trayectoria/`, canonical y enlaces previos al catálogo; invalidar caché de `llmo` si fuera necesario. No cambiar las reglas del sitemap ni Hostinger durante el PR.
