# RAUVIA V72 — Mobile & Foldable Experience Layer

Fuente completa + dist compilado; entrega local, no publicada. Ocho páginas principales adaptadas. Contenido, SEO, landings excluidas y atribución adoptada de Ruta 90 preservados.

Leer INFORME-V72-MOBILE-FOLDABLE.md antes de desplegar: 48 apartados, límites de evidencia, 104 vistas y laboratorio: 64 observaciones. Pruebas finales: 86 ejecutadas/80 únicas, sin fallos ni skips. Dos checks preexistentes de audit:entities siguen fallando.

JS inicial: 160.8–251.4kB gzip; Recursos excede ligeramente la preferencia de 250 kB. Inicio desktop registra regresión de LCP; Soluciones y Nosotros aún exceden 2.5 s en el laboratorio. No hay QA físico, bisagra real ni CWV de campo certificados.

Arranque de producción existente: npm start (NODE_ENV=production node dist/server.cjs). Dist está incluido; no ejecutar Vite en producción. Mantener las variables existentes; ningún secreto está incluido y no se cambian dependencias.

Pruebas: npm run lint; npm run build; con TEST_BASE_URL a producción local / TEST_MODE=production: test:seo, test:aethryon, test:ruta90-integration, test:favicon. Regression: node --test tests/url-normalization.test.mjs tests/landing-profesionales.test.mjs tests/mobile-experience.test.mjs.

Evidencia final en docs/v72-evidencias. Código de probes/proxies no incluido. Método de laboratorio descrito con sus límites; no sustituye Lighthouse ni dispositivos reales. Desplegar primero a staging y revisar los pendientes del informe, con rollback V71 disponible.
