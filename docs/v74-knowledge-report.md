# RAUVIA V74 — Knowledge & Intent Graph

V74 queda implementado en la fuente y el paquete local. Hay un único grafo tipado, tres vistas lógicas, proyección pública controlada, matrices de cobertura/gaps y compilación estática. El sitio no se ha desplegado. La cobertura sigue siendo editorial y no acredita demanda ni eficacia.

## Resultado y alcance

| Elemento | Resultado |
| --- | --- |
| Maestro interno | 216 nodos, 1,095 relaciones |
| Proyección pública | 205 nodos, 1,059 relaciones |
| Intenciones | 73: 64 públicas y 9 hipótesis internas |
| Cobertura | HIGH 39; MEDIUM 25; LOW 0; HYPOTHESIS 9 |
| Conceptos controlados | 12 Problems, 8 Restrictions, 8 CapabilityGaps, 13 Capabilities |
| ICP / Vertical | 6 / 6; condiciones y tipos de negocio separados |
| Intervenciones | 5 Offering existentes, AETHRYON System y Ruta 90 Method |
| Assets / Content | 20 páginas existentes / metadata de 10 artículos publicados |
| Evidencia | 1 caso público, 1 escenario ilustrativo, 6 claims y 30 sources |
| JavaScript cliente añadido | 0 bytes; bundles idénticos a V73 |

Se incluyen todas las intenciones mínimas solicitadas y cinco contextos complementarios ya presentes: arquitectura operativa, infraestructura temporal y consultas sobre RAUVIA, AETHRYON y Ruta 90. Restaurant/export-business y sus nueve intents permanecen internos. No se crea página, oferta o diagnóstico de cliente nuevo.

## Autoridades y publicación

`src/config/entity.ts` conserva identidad institucional; `src/seo/routeSeo.js` conserva URLs. El grafo consume esas autoridades sin reescribirlas. `src/knowledge/intents.ts` y `catalog.ts` gobiernan expresiones y conceptos; `graph.ts` deriva relaciones inversas y vistas. Search intent map y business problem map se generan desde el mismo modelo. Q&A y territorios se alinean con sus IDs.

AETHRYON es System desarrollado por RAUVIA, analiza señales/problemas, evalúa restricciones/oportunidades/brechas e identifica prioridades y rutas de acción. Ruta 90 es Method adoptado y utilizado por RAUVIA. No hay atribución de creación/desarrollo a RAUVIA o Raúl Morales. El auditor bloquea autoría falsa en campos, relaciones, descripción y claims. No existe AETHRYON→Ruta 90 obligatorio; su pertinencia requiere prioridad identificada y capacidad de ejecución/revisión.

Publicación requiere aprobación explícita, visibilidad pública y status canonical/supported. Los campos publicados usan una allowlist por tipo; referencias a nodos excluidos causan error. No salen hipótesis, prompts, telemetría, leads, credenciales, notas/rutas internas ni metadatos de recuperación léxica. La Person es la identidad institucional pública y el caso se conserva anonimizado. No se atribuye a una máquina capacidad de verificar por sí sola toda confidencialidad contextual: sigue existiendo revisión editorial.

Nuevas superficies estáticas:

- [knowledge-graph.json](../public/llmo/knowledge-graph.json), 353,641 bytes.
- [intent-coverage.json](../public/llmo/intent-coverage.json), 84,586 bytes.

Index.json los registra; llms.txt y llms-full.txt añaden sólo dos referencias. La ontología propia no se inserta en JSON-LD ni se inventan tipos Schema.org. /llmo/ sigue siendo convención de RAUVIA, sin API de conversación, protocolo obligatorio ni garantía de indexación/citas.

## Fuentes, evidencia y WordPress

La metadata de diez artículos se conserva del bootstrap público de Recursos incluido en `rauvia-platform-v73.zip`, SHA-256 `5cc6491d115428ecbfbe031427044e3bdba21b08204b83c56b39d25c950085c5`. Snapshot de metadata preparado en V74 el 2026-10-06; no se afirma una nueva captura live de todos los artículos. Se guardan ID público, título, slug y fecha, sin cuerpos de artículos. WordPress conserva autoridad editorial; las asociaciones de contenido con intents/capacidades son decisiones editoriales revisadas.

El caso publicado conserva benchmark interno 2.67→4.00 y 3,564 conversaciones reportadas, sin traducirlos a ventas, clientes o cierres. Trazabilidad en construcción no se clasifica como resultado completado. Son autorreportes de primera parte, con alcance, periodo y límites de atribución, sin causalidad ni eficacia independiente establecida. Todos los intents siguen evidenceState editorial. El auditor exige Source para result y bloquea estados observados/validados sin prueba verificable.

El compilador funciona offline leyendo sólo el catálogo y el snapshot local. No usa DB, Search Console, Kyberion, servicios de IA, telemetría ni WordPress live. El build general conserva su prerender y consulta WordPress preexistentes; esa consulta no forma parte del compilador del grafo.

## Matrices y gaps

- [Matriz completa de Intent y gaps](knowledge-matrices.md).
- [Intent coverage CSV](../data/knowledge/intent-coverage.csv).
- [Gaps CSV](../data/knowledge/gaps.csv).
- [Maestro interno](../data/knowledge/master-graph.json).

| Tipo de gap | Hallazgos en el snapshot |
| --- | --- |
| ASSET_GAP | 13: nueve hipótesis sin página y cuatro ofertas explicadas en el índice de Soluciones sin landing específica |
| CONTENT_GAP | 46: sin artículo relacionado dentro de los diez artículos representados |
| EVIDENCE_GAP | 70: sin claim validado de resultados aplicable |
| ORPHAN_INTENT | 0 |
| ORPHAN_PROBLEM | 0 |
| ORPHAN_CAPABILITY | 0 |
| UNLINKED_CONTENT | 0 |

Los siete detectores tienen pruebas negativas. Content Gap no significa que el artículo no exista en otro punto del CMS; Evidence Gap no significa que la firma no tenga experiencia, sino que este catálogo no aporta la prueba requerida. HIGH expresa buen soporte semántico editorial, no alta demanda. Ningún gap crea automáticamente contenido o productos.

## Verificación

Lint, build, prerender y siete auditorías pasan: knowledge, SEO, entities, content, authority, LLMO y migration. Se seleccionaron 197 comprobaciones finales, sin fallos ni omisiones: 130 regresiones de producción, 47 pruebas de conocimiento, 9 pruebas HTTP del grafo y 11 de URLs en desarrollo. Los logs y conteos están en [test-summary.json](v74-evidencias/test-summary.json).

Knowledge tests incluyen los cinco casos pedidos, paráfrasis, acentos, desconocidos, ambigüedad, hipótesis excluidas, fuente de resultados, garantías/causalidad, falsa autoría, relaciones mal tipadas, IDs/URLs duplicados, referencias colgantes, aprobación, privacidad y determinismo con fetch prohibido. El helper de retrieval es sólo build/test; no buscador ni router de productos en producción.

HTTP local comprueba 200, MIME JSON, ausencia de redirect y igualdad de bytes para ambos recursos. Maestro, coverage interno, fuente de intents, gaps y documentos internos responden 404; no se sirven. La regresión conserva rutas canónicas, sitemap, JSON-LD y el comportamiento 301/404/410 existente.

Comparación de hashes contra V73: 22 HTML idénticos (20 rutas, shell y 404), 63 archivos JS/CSS idénticos y servidor compilado idéntico. Identidad, rutas, middleware, CSS, imágenes, responsive, preloads y dependencias/lock permanecen congelados. El plugin Vite preexistente escribe su evidencia en el directorio histórico V72; se conservó su salida actual en v74-evidencias/bundle-graph-current.json y se restauró la evidencia histórica original antes de empaquetar, sin editar Vite. Evidencia: [freeze-regression.json](v74-evidencias/freeze-regression.json).

CUA realizó 16 observaciones nuevas: ocho páginas en 390×844 y 1440×1000, un H1, main presente, sin desbordamiento horizontal ni imágenes visibles rotas. Home mantiene CTA principal de 52px hacia /soluciones/, sin target externo; CTA secundario hacia /aethryon en la misma pestaña. Escape colapsa el menú, devuelve foco y libera el scroll. Evidencia: [browser-smoke.json](v74-evidencias/browser-smoke.json). Las 56 combinaciones históricas V73 se validan mediante fingerprints sin presentarlas como recaptura V74. No se certifican dispositivos físicos ni nuevos resultados de performance.

Los warnings de import.meta en CJS y de configuración futura Vite son preexistentes; no requieren cambios en este alcance. El entorno de desarrollo comparte un puerto HMR ya ocupado; no se altera el proceso del usuario. La página y los módulos dev responden correctamente en su servidor de prueba.

## Operación y documentación

- [Arquitectura](knowledge-graph-architecture.md).
- [Ontología y relaciones](knowledge-graph-ontology.md).
- [Intent y reglas de cobertura](intent-graph.md).
- [Política de publicación](knowledge-publication-policy.md).
- [Modelo de evidencia](knowledge-evidence-model.md).
- [Mantenimiento](knowledge-maintenance.md).

`npm run build:knowledge` genera vistas; `npm run audit:knowledge` rechaza invariantes rotas y outputs desactualizados; `npm run test:knowledge` ejecuta pruebas offline. `npm run test:knowledge-http` usa TEST_BASE_URL con servidor local. El build ejecuta el compilador antes de Vite. Los JSON/CSV derivados no se editan como una segunda autoridad.

Hipótesis y cambio se registran en los archivos de gobernanza vigentes. La observación es una revisión del código y mapas existentes, no una señal de demanda. No se registra resultado de mercado ni despliegue ficticio.

## Definition of Done

| Requisitos | Estado y prueba |
| --- | --- |
| 1–12: grafo tipado, identidad, tres vistas y conceptos | PASS; tipos, compiler, matrices y audit |
| 13–16: System/Method, autoría e intervención condicional | PASS; invariantes y retrieval negativos |
| 17–19: assets, contenido y evidencia | PASS; 20 páginas, 10 metadatos, claims con Source |
| 20–24: interno/público y JSON | PASS; filtros y dos recursos estáticos |
| 25–31: registro, llms, audit/retrieval, IDs, Organization y privacidad | PASS; tests offline/HTTP y allowlists |
| 32–34: Asset/Content/Evidence Gaps | PASS; matrices y detectores |
| 35–42: páginas, ofertas, UX, performance y runtime congelados | PASS; diff de fuente y hashes V73 |
| 43–47: build, prerender, SEO/LLMO, 301/404/410 | PASS; siete auditorías y regresión local |

## Entrega y límites

`rauvia-platform-v74.zip` incluye fuente, snapshot metadata, grafo interno, matrices, tests, documentación/evidencias y producción compilada. `MANIFIESTO-V74.json` y el SHA externo permiten verificar integridad. Se excluyen node_modules, credenciales, helpers de QA y manifiestos anteriores. El grafo interno está en el paquete de fuente, fuera de public/dist y fuera de HTTP.

El resultado es revisable y listo para el proceso de despliegue autorizado del proyecto. No se ha publicado en Hostinger ni se confirman resultados de asistentes, indexación, citas, demanda o dispositivos físicos.
