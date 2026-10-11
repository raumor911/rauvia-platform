# Retrieval, Citation & Authority Layer — V75

`src/retrieval/catalog.ts` gobierna la tesis, 18 respuestas y sus condiciones; consume IDs existentes aprobados por V74. Query Archetype → Intent → Answer Family → Canonical Answer → Problem/Capability/Entity → Citation Bundle → Claim → Source → Scope/Period/Attribution Limit. El lookup tipado interno nunca se serializa: los tres outputs usan campos explícitos.

Los 64 arquetipos son formulaciones editoriales aprobadas, no consultas observadas. Los prompts de prueba internos están en `data/knowledge/retrieval-tests.json`; el benchmark externo futuro se prepara aparte. Las nueve hipótesis V74 siguen internas. Tres nuevos Claim de alcances institucionales se añaden al catálogo V74; no se duplica identidad.

En las tres respuestas de identidad, `problemRole: application_context` describe el contexto de aplicación. Preguntar qué es RAUVIA, AETHRYON o Ruta 90 no diagnostica un problema al usuario. Problem y Capability siguen obligatorios, sin modificar esos Intent.

Cada respuesta conserva asset, fuente, alcance y límites. WordPress conserva sus cuerpos; la metadata capturada no prueba afirmaciones de un cuerpo pendiente de revisión. Un caso propio no constituye corroboración externa.

FIT describe condiciones editoriales, POSSIBLE_FIT exige contexto y NOT_PRIMARY_FIT evita atribuir Frente Comercial a campañas publicitarias o ecommerce masivo. El helper offline parte de POSSIBLE_FIT, sin diagnóstico automático. Frente Comercial exige oferta/capacidad existentes y brecha de representación; Ruta 90 exige prioridad y ejecución; automatización exige proceso definido.

`npm run build:retrieval` genera JSON y matrices; `audit:retrieval` detecta artefactos desactualizados, referencias rotas, falta de soporte/límites, garantías y filtraciones; `test:retrieval` incluye corpus, negativos, seguridad y HTTP con TEST_BASE_URL. Editar catálogo y HTML/fuente, regenerar knowledge/retrieval y ejecutar checks. No promover hipótesis por pasar tests.

Ontología propia, no Schema.org. Sin lógica cliente, modelo, API de conversación, score comercial, garantía de indexación o cita. Las pruebas locales no demuestran demanda ni mejora externa.
