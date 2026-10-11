# Evidence Graph V74

Se aplican las políticas vigentes de evidencia, fuentes y casos. Source identifica procedencia; Claim separa afirmación y soporte; Case delimita una aplicación. UseCase es un escenario ilustrativo, no un cliente o resultado nuevo.

Claim admite factual, capability, observed, result; todos los claims públicos exigen Source, scope, period y attributionLimit. Todo result requiere Source. `claimType=observed` puede describir un reporte publicado de interacciones y continuar `evidenceState=editorial`; no acredita una observación auditada actual.

El caso de infraestructura temporal contiene exclusivamente cifras ya publicadas: benchmark interno 2.67→4.00 y 3,564 conversaciones iniciadas en octubre 2025–julio 2026. Se preservan sus límites: benchmark interno ≠ ventas, conversaciones ≠ clientes/cierres, correlación ≠ causalidad. La trazabilidad se registra en construcción, no completada. Son reportes de primera parte, sin validación independiente; el grafo no agrega conversiones, clientes, certificados ni cifras derivadas.

Invariantes técnicas: Case/UseCase/Claim sin garantías; benchmark e interacción no pueden clasificarse como sales; construcción no puede ser result; causalidad sustentada exige validación y Source independiente; evidenceState no editorial requiere referencias de prueba independientes, fechadas y verificables. Ese umbral conservador bloquea maduración accidental; una futura integración de observaciones debe ampliar la procedencia con revisión humana, no activar estados por sí sola.

AETHRYON es System desarrollado por RAUVIA. Ruta 90 es Method adoptado y usedBy RAUVIA. Su creación no se atribuye a RAUVIA ni al fundador. El auditor rechaza campos/edges de autoría y el cambio de su claim institucional. No se infiere un método obligatorio desde AETHRYON.

WordPress conserva autoridad editorial. V74 registra metadata de diez artículos públicos previamente capturados en fixtures locales; fecha de compilación del snapshot 2026-10-06, no nueva consulta live. No se copian cuerpos HTML a los JSON. La relación de esos artículos con intenciones/capacidades es una decisión editorial del catálogo.

## Gap detection

ASSET_GAP: intención sin página principal, u oferta existente sin asset específico (sólo índice de Soluciones). CONTENT_GAP: no hay Content relacionado en el snapshot representado, sin afirmar ausencia en todo el CMS. EVIDENCE_GAP: no hay claim de resultado validado aplicable al conjunto de assets de la intención; la cobertura editorial y el caso autorreportado no sustituyen esa prueba. ORPHAN_INTENT: ningún expressesProblem/aboutEntity. ORPHAN_PROBLEM: ningún Intent/UseCase expresa ese problema. ORPHAN_CAPABILITY: ningún problema/brecha/escenario la requiere. UNLINKED_CONTENT: sin relación a intención, problema o capacidad.

No se crean páginas, artículos ni ofertas al detectar gaps. Las siete clases se comprueban con fixtures negativos aunque los tres detectores de huérfanos y UNLINKED_CONTENT no tengan hallazgos en el catálogo final.
