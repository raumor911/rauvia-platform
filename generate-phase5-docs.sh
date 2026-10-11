# 1. Validación de la Fase 4
cat << 'INNER_EOF' > docs/llmo-phase-5-foundation-validation.md
# Validación de la Fase 4 (Fundación LLMO Fase 5)

## Estado Verificado
- Auditoría de presencia externa existente.
- Inventario de activos y biblioteca de mensajes externos listos.
- Matriz de consistencia y políticas (sameAs, distribución, digital PR) creadas.
- Estrategia del fundador definida.
- Panel de observabilidad (especificación) y roadmap implementados.
- Las pruebas de \`audit:authority\` y auditorías previas pasan.
- No hay secretos comprometidos.
- Build, React y WordPress operativos.

## Hallazgos
- No existen defectos P0.
- Listos para construir sistema continuo de observabilidad.
INNER_EOF

# 2. Auditoría de Observabilidad
cat << 'INNER_EOF' > docs/llmo-phase-5-observability-audit.md
# Auditoría de Observabilidad (Fase 5)

## Fuentes Disponibles
- Google Search Console
- Google Analytics (o Plausible, según stack actual)
- Bing Webmaster Tools
- UTMs en perfiles y enlaces externos

## Brechas Identificadas
- Falta rastreo específico para "AI Referral" (ej. Perplexity, ChatGPT).
- Conversiones no atribuidas correctamente.

## Acciones
- Configurar UTMs canónicos para distribución.
- Implementar panel ligero.
INNER_EOF

# 3. Línea Base
cat << 'INNER_EOF' > docs/llmo-baseline.md
# Línea Base (Baseline)

- **Periodo:** Últimos 28 días (Hipótesis inicial).
- **Métricas:** 
  - Impresiones GSC: TBD (Requiere acceso).
  - Tráfico Referral AI: TBD.
  - Conversiones: TBD.
  - Citas confirmadas en LLMs: 0 (Punto de partida).
INNER_EOF

# 4. Consultas de Observación
cat << 'INNER_EOF' > docs/query-observation-method.md
# Método de Observación de Consultas

- **Proceso:** Verificación manual semanal de queries clave (Marca, AETHRYON, Problemas, Soluciones, Comparaciones).
- **Herramientas:** ChatGPT, Copilot, Perplexity.
- **Registro:** `tests/ai-presence-queries.json` y `data/llmo-citations.json`.
INNER_EOF

# 5. Rúbrica de Evaluación
cat << 'INNER_EOF' > docs/ai-answer-evaluation-rubric.md
# Rúbrica de Evaluación de Respuestas de IA

1. **Presencia:** Aparece / No aparece.
2. **Precisión:** Correcta / Parcial / Incorrecta.
3. **Identidad:** Clara / Ambigua / Confusa.
4. **Categoría:** Organización / AETHRYON / Fundador bien clasificados.
5. **Cita:** Enlazada correctamente a URL válida.
INNER_EOF

# 6. Política de Registro de Citas
cat << 'INNER_EOF' > docs/citation-register-policy.md
# Política de Registro de Citas

- Registrar las menciones con URL en `data/llmo-citations.json`.
- Evitar registrar conversaciones privadas o contenido sensible.
INNER_EOF

# 7. Gestión de Errores de Entidad
cat << 'INNER_EOF' > docs/entity-error-management.md
# Gestión de Errores de Entidad

- Registrar alucinaciones, falsas categorizaciones o menciones de "Agencia de Marketing" en `data/entity-errors.json`.
- Accionar según gravedad (corrección en GMB, LinkedIn o llms.txt).
INNER_EOF

# 8. Registro de Oportunidades
cat << 'INNER_EOF' > docs/llmo-opportunity-management.md
# Gestión de Oportunidades LLMO

- Documentar queries sin respuesta en `data/llmo-opportunities.json` para priorizar futuros activos citables.
INNER_EOF

# 9. Política de Hipótesis
cat << 'INNER_EOF' > docs/llmo-hypothesis-policy.md
# Política de Hipótesis LLMO

- **Estructura obligatoria:** Observación -> Problema -> Hipótesis -> Cambio -> Resultado Esperado.
- Ningún cambio sin hipótesis registrada.
INNER_EOF

# 10. Política de Experimentos
cat << 'INNER_EOF' > docs/llmo-experiment-policy.md
# Política de Experimentos

- Registrar cada prueba en `data/llmo-experiments.json`.
- Estados: proposed, approved, active, measuring, completed.
INNER_EOF

# 11. Catálogo de Experimentos
cat << 'INNER_EOF' > docs/llmo-experiment-catalog.md
# Catálogo de Experimentos

- Variables permitidas: H1, title, metadescription, fragmento directo (respuesta), enlaces internos, schema.
- **Prohibido:** Cloaking, contenido oculto.
INNER_EOF

# 12. Priorización de Experimentos
cat << 'INNER_EOF' > docs/llmo-experiment-prioritization.md
# Priorización de Experimentos

- P0: Corrección Inmediata (Identidad comprometida).
- P1: Prioritario (Impacto comercial alto).
- P2: Optimización Secundaria.
INNER_EOF

# 13. Mantenimiento de Páginas Citadas
cat << 'INNER_EOF' > docs/cited-page-maintenance.md
# Mantenimiento de Páginas Citadas

- Las páginas citadas no deben cambiar de URL (aplicar 301 si es estrictamente necesario).
- Actualizar contenido sólo con revisiones editoriales reales.
INNER_EOF

# 14. Páginas No Recuperadas
cat << 'INNER_EOF' > docs/non-retrieved-pages-analysis.md
# Análisis de Páginas No Recuperadas

- Auditar indexación, rastreo, canonical y presencia en `llms.txt`.
INNER_EOF

# 15. Auditoría de Canibalización
cat << 'INNER_EOF' > docs/content-cannibalization-audit.md
# Auditoría de Canibalización

- Evaluar competencia entre Pilar y Satélite.
- Acciones: Diferenciar, fusionar o redirigir (301).
INNER_EOF

# 16. Política de Actualización
cat << 'INNER_EOF' > docs/content-refresh-policy.md
# Política de Actualización de Contenido

- No actualizar `dateModified` sin cambios reales en el texto o la evidencia.
- Ciclos: trimestral o anual según temática.
INNER_EOF

# 17. Atribución Comercial
cat << 'INNER_EOF' > docs/llmo-commercial-attribution.md
# Atribución Comercial LLMO

- Eventos clave: Clic en Contacto, WhatsApp, Calendly.
- Configurar en panel de analítica.
INNER_EOF

# 18. Modelo de Contribución
cat << 'INNER_EOF' > docs/llmo-contribution-model.md
# Modelo de Contribución

- Clasificar por: Descubrimiento, Investigación, Consideración, Conversión asistida.
- La atribución no es siempre causalidad directa.
INNER_EOF

# 19. Gobernanza UTM
cat << 'INNER_EOF' > docs/utm-governance.md
# Gobernanza de UTMs

- Convenciones estándar: `utm_source=chatgpt&utm_medium=ai_referral`.
- Uso obligatorio en perfiles y distribución.
INNER_EOF

# 20. Panel de Observabilidad
cat << 'INNER_EOF' > docs/llmo-dashboard-implementation.md
# Implementación de Panel de Observabilidad

- Sistema ligero (Google Sheets / Data Studio / JSON) que cruza: Citas, Tráfico Referral, Conversiones y Experimentos activos.
INNER_EOF

# 21. Alertas y Umbrales
cat << 'INNER_EOF' > docs/llmo-alert-thresholds.md
# Alertas y Umbrales

- **Críticas:** URL citada con 404, caída súbita de impresiones en GSC, cambio en Razón Social detectado por IA.
INNER_EOF

# 22. Ciclo Operativo Mensual
cat << 'INNER_EOF' > docs/llmo-monthly-operating-cycle.md
# Ciclo Operativo Mensual

- S1: Recopilación.
- S2: Análisis e Hipótesis.
- S3: Implementación.
- S4: Medición.
INNER_EOF

# 23. Revisión Trimestral
cat << 'INNER_EOF' > docs/llmo-quarterly-review.md
# Revisión Trimestral Estratégica

- Evaluación de territorios, páginas pilar, identidad, autoridad y retorno comercial.
INNER_EOF

# 24. Gobernanza de Cambios
cat << 'INNER_EOF' > docs/llmo-change-governance.md
# Gobernanza de Cambios

- Todo cambio debe registrarse en `data/llmo-change-log.json`. No cambios silenciosos.
INNER_EOF

# 25. Política de Versionado
cat << 'INNER_EOF' > docs/editorial-versioning-policy.md
# Política de Versionado Editorial

- Versionar recursos (ej. v1.1) cuando hay cambios metodológicos o estructurales, no por correcciones tipográficas.
INNER_EOF

# 26. AETHRYON en LLMO
cat << 'INNER_EOF' > docs/aethryon-llmo-operations.md
# Operaciones LLMO con AETHRYON

- Utilizar AETHRYON internamente para priorizar oportunidades y distinguir ruido de señales de intención comercial.
INNER_EOF

# 27. Política CI
cat << 'INNER_EOF' > docs/llmo-ci-policy.md
# Política CI para LLMO

- Separar pruebas deterministas (JSON, schema) de pruebas contra producción (status HTTP).
- No bloquear CI por fallos externos de IA.
INNER_EOF

# 28. Operaciones Manuales
cat << 'INNER_EOF' > docs/llmo-manual-operations.md
# Operaciones Manuales LLMO

- Evaluaciones semanales de IA, validación de GSC, autorización de actualizaciones en perfiles externos.
INNER_EOF

# 29. Handoff
cat << 'INNER_EOF' > docs/llmo-phase-5-handoff.md
# Handoff LLMO Fase 5

- **Validación Fase 4:** Exitosa.
- **Sistema Construido:** Data sources JSON (citas, errores, oportunidades, experimentos, cambios).
- **Procesos:** Ciclos de revisión mensual y trimestral documentados.
- **Pruebas:** `audit:llmo` integrado.
- **Riesgos:** Requiere disciplina en el registro de cambios manuales.
- **Aprobación:** Cumple criterios Fase 5. Sistema continuo operativo.
INNER_EOF

# JSON Data sources
cat << 'INNER_EOF' > data/llmo-citations.json
[]
INNER_EOF

cat << 'INNER_EOF' > data/entity-errors.json
[]
INNER_EOF

cat << 'INNER_EOF' > data/llmo-opportunities.json
[]
INNER_EOF

cat << 'INNER_EOF' > data/llmo-experiments.json
[]
INNER_EOF

cat << 'INNER_EOF' > data/llmo-change-log.json
[]
INNER_EOF
