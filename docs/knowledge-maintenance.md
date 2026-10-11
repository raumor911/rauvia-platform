# Mantenimiento V74

Este documento extiende [llmo-change-governance.md](llmo-change-governance.md) y [llmo-hypothesis-policy.md](llmo-hypothesis-policy.md).

1. Revisar la observación y procedencia sin interpretarla como demanda automáticamente.
2. Registrar Observación → Problema → Hipótesis → Cambio → Resultado esperado en el catálogo vigente. Resultados observados quedan pendientes hasta existir evidencia.
3. Editar identidad sólo en entity.ts; URLs de páginas sólo en routeSeo; conceptos controlados en catalog; expresiones en intents; metadata/claims/fuentes en evidence.
4. Para cada nodo registrar significado, razón, status, evidenceState, visibilidad, aprobación, asset y Source. Conservar IDs al cambiar una URL o título. Fusionar sinónimos con alias; retirar mediante deprecated, nunca reutilizar un ID para otro concepto.
5. Añadir una relación cerrada sólo con endpoints tipados, justificación y pruebas. No usar relatedTo genérico ni garantizado.
6. Ejecutar `npm run build:knowledge`, `npm run audit:knowledge`, `npm run test:knowledge`, `npm run lint`, `npm run build` y las auditorías/regresiones vigentes.
7. Revisar diff de los dos JSON públicos, matrices y exclusión de hipótesis/privados; comprobar rutas 301/404/410 y hashes del cliente congelado.
8. Registrar cambios en llmo-change-log.json, y revisar paquete antes de cualquier despliegue autorizado.

El compilador regenera search-intent-map, business-problem-map, ontología, matrices y data/knowledge. No editar esas vistas derivadas. question-answer-map y topic-territories referencian los mismos IDs.

Para incorporar un artículo: actualizar un snapshot de metadata autorizado de WordPress (sin cuerpo), fecha/procedencia, asociaciones editoriales y Source; preservar su ID público. Esa adquisición manual está fuera del compilador. No sincroniza WordPress ni mide lo que está ocurriendo.

Publicación exige revisión explícita; las hipótesis no maduran por tiempo ni por visitas de crawlers. No alterar taxonomías/queries históricas de GEO. El alias CTL→ENTITY se limita a esta capa.
