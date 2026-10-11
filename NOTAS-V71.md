# V71 — AETHRYON Human UX

Sólo AETHRYON cambia visual y funcionalmente. SEO, sitemap y las siete páginas de control se conservan.

El paquete incluye fuente completa, dependencias declaradas y dist compilado con HTML prerenderizado. No incluye node_modules ni secretos. Usar el arranque actual de producción: npm start (dist/server.cjs). Mantener la configuración y las variables existentes del entorno.

Pruebas de esta entrega: npm run lint; npm run build; npm run test:seo; npm run test:aethryon; npm run test:favicon; npm run test:ruta90-integration. Los tests HTTP con TEST_BASE_URL se ejecutaron contra producción local; los fixtures se conservan.

Consultar INFORME-V71-AETHRYON-HUMAN-UX.md y docs/v71-evidencias/. Preparada para desplegar; no publicada. Pendientes smoke test público, persistencia de analítica en producción y validación de comprensión con visitantes humanos.

La exposición reutiliza aethryon_view con properties.context=section_view. Para contar visitas históricas excluir properties.section. Las consultas incluidas separan ambos casos.
