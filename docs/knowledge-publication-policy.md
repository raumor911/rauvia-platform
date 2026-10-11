# Publicación de conocimiento V74

Extiende [evidence-policy.md](evidence-policy.md), [source-management-policy.md](source-management-policy.md) y [case-study-policy.md](case-study-policy.md), sin reemplazar sus reglas.

Un nodo publicable requiere simultáneamente `publication.approved=true`, `visibility=public` y status canonical/supported. `basis` explica si procede de contenido público existente o del modelo editorial explícitamente pedido en V74. La aprobación local habilita el archivo de release; no equivale a autorización ni confirmación de despliegue.

El maestro incluye hipótesis y metadata de mantenimiento; el público sólo recibe campos permitidos por tipo, definidos en `publication.ts`. No se serializan publication, repositoryRef, privateNotes, matchGroups ni campos desconocidos. Una referencia pública a un nodo filtrado provoca error: no se borra silenciosamente para ocultar inconsistencia. Edges y vistas sólo contienen endpoints publicables. Las filas públicas de coverage se verifican contra el mismo conjunto.

No se publican supuestos de mercado, nuevas verticales sin soporte, fuentes internas, telemetría, prompts, conversaciones, leads, credenciales, rutas locales ni datos privados de clientes. La Person institucional procede de la identidad pública canónica. Los IDs de metadata WordPress son IDs públicos de artículos, no IDs de visitantes o clientes. Sólo se representa un caso público anonimizado.

Los tests inyectan campos privados, referencias internas y fuentes inválidas para comprobar bloqueo y allowlist. La revisión editorial humana sigue siendo necesaria: un validador de formato no puede decidir por sí solo si una frase aparentemente pública revela información privada.

Únicos outputs nuevos en `/llmo/`: knowledge-graph.json e intent-coverage.json. Gaps, CSV y grafo maestro permanecen internos. `/llmo/` es convención RAUVIA; no API de conversación ni protocolo obligatorio, y no garantiza indexación ni citas. No se crea un sitemap independiente del grafo ni una nueva página.

Antes de promover un nodo: revisar significado, razón, fuente y permisos; actualizar aprobación explícita; registrar hipótesis/cambio; compilar, auditar y revisar diff público. Nunca keyword→publicación automática.
