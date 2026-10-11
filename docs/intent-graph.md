# Intent Graph V74

Autoridad: `src/knowledge/intents.ts`. Vista generada: [search-intent-map.md](search-intent-map.md). No editar un segundo catálogo.

Una Vertical describe el tipo de negocio; un ICP describe una condición. Las necesidades transversales pueden tener ICP sin Vertical. Las seis verticales y los seis ICP se mantienen separados. Restaurant y export-business tienen nueve intenciones internas, status hypothesis y publicación no aprobada.

Familias: PROBLEM, SOLUTION, CATEGORY, PROVIDER, COMPARISON, USE_CASE, ENTITY. Compatibilidad explícita: PRO→PROBLEM, SOL→SOLUTION, CAT→CATEGORY, PRV→PROVIDER, CMP→COMPARISON, USE→USE_CASE, CTL→ENTITY (contexto de entidad). `normalizeFamily` acepta ambas formas; no reescribe IDs, texto ni observaciones históricas de GEO. Los archivos históricos de consultas permanecen intactos.

Status describe el gobierno del concepto: canonical, supported, hypothesis, deprecated. EvidenceState describe su evidencia: editorial, search_observed, human_observed, machine_observed, multi_signal, validated. Un concepto canónico puede seguir siendo editorial. Todas las intenciones V74 son editoriales; ninguna está validada como demanda. Futuras transiciones requieren fuentes revisadas; nunca ocurren por detectar una keyword o un crawler.

## Cobertura cualitativa

Se derivan Problem → Restriction → CapabilityGap y las capacidades necesarias declaradas por el problema. No se toma automáticamente la unión de todas las capacidades de todas las restricciones como diagnóstico confirmado. Capability → possibleIntervention enlaza ofertas existentes y preserva condiciones. Las páginas de representación de intervenciones son assets de apoyo.

- HYPOTHESIS: intención interna o en hipótesis, aun cuando tenga vocabulario empresarial conocido.
- LOW: falta página principal, soporte editorial público, capacidad o problema/contexto válido.
- MEDIUM: contexto coherente y soporte editorial, con página general; las consultas de identidad sin problema usan esta categoría aunque tengan página específica.
- HIGH: intención, problema, capacidad y página principal específica con Source editorial público aprobado.

HIGH no significa demanda, resultados ni recomendación. Las pruebas de eficacia se auditan separadamente como EVIDENCE_GAP. No hay score numérico.

## Retrieval de laboratorio

Normalización de mayúsculas, acentos y puntuación; igualdad de expresión primero; después grupos léxicos curados. Cero coincidencias → unmatched; varias → ambiguous, sin elegir una oferta. Las hipótesis se excluyen. Las cinco consultas del requerimiento, paráfrasis, entradas desconocidas y ambigüedad se prueban sin IA externa. Ruta 90 sólo pasa al conjunto pertinente cuando el test declara prioridad identificada y capacidad de ejecución; su condición queda visible.

Esto comprueba consistencia interna, no comprensión universal de español, demanda ni respuestas reales de asistentes externos. No es buscador de producción ni nuevo flujo de usuarios.
