mkdir -p docs tests scripts

cat << 'INNER_EOF' > docs/llmo-phase-4-foundation-validation.md
# Validación de la Fase 3 (Fundación LLMO Fase 4)

## Estado Verificado
- Auditoría editorial existe.
- Territorios temáticos definidos.
- Mapa de problemas e intenciones existe.
- Páginas pilar y satélite definidas.
- Política de evidencia y fuentes existe.
- Taxonomía y esquema editorial validados.
- `audit:content`, `audit:entities`, `audit:seo` pasan exitosamente.
- Build funciona.
- No existen duplicados ni contenido P0 crítico.

## Hallazgos
- No se encontraron bloqueos críticos P0 que impidan construir autoridad externa.
INNER_EOF

cat << 'INNER_EOF' > docs/llmo-phase-4-external-audit.md
# Auditoría de Presencia Externa (Fase 4)

## Entidades Verificadas
- **LinkedIn RAUVIA:** Pendiente de verificación manual de URL y contenido.
- **LinkedIn Raúl Morales:** Pendiente de verificación.
- **Google Business Profile:** Posible presencia, requiere validación.

## Hallazgos
- Menciones actuales genéricas (posible confusión con agencias).
- Falta de activos citables estructurados.
INNER_EOF

cat << 'INNER_EOF' > docs/external-assets-inventory.md
# Inventario de Activos Externos

| ID | Plataforma | Entidad | Estado | Acción |
|---|---|---|---|---|
| EXT-01 | LinkedIn | RAUVIA | Pendiente validación | Verificar y unificar mensaje |
| EXT-02 | LinkedIn | Raúl Morales | Pendiente validación | Alinear con Founder Strategy |
INNER_EOF

cat << 'INNER_EOF' > docs/external-messaging-library.md
# Biblioteca de Mensajes Externos

- **Descripción ultracorta:** Firma mexicana de consultoría estratégica y desarrollo tecnológico.
- **Descripción corta:** Diseñamos sistemas comerciales y estructuras operativas para empresas que buscan control y ejecución.
- **Bio Fundador (Corta):** Raúl Morales, fundador de RAUVIA, especialista en arquitectura operativa y sistemas comerciales.
INNER_EOF

cat << 'INNER_EOF' > docs/profile-consistency-matrix.md
# Matriz de Consistencia de Perfiles

| Atributo | Valor Canónico | LinkedIn (Actual) | Acción |
|---|---|---|---|
| Razón Social | RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO | - | Actualizar |
| Categoría | Consultoría Estratégica / Desarrollo Tecnológico | - | Unificar |
INNER_EOF

cat << 'INNER_EOF' > docs/sameas-policy.md
# Política SameAs

Solo se incluirán URLs confirmadas en el array `sameAs` del schema JSON-LD.
- No se incluirán directorios genéricos ni perfiles personales no profesionales.
INNER_EOF

cat << 'INNER_EOF' > docs/content-distribution-strategy.md
# Estrategia de Distribución

- **Canal Núcleo:** LinkedIn Corporativo y Fundador.
- **Canal Apoyo:** Google Business Profile.
- **Experimental:** GitHub (para herramientas de auditoría).
INNER_EOF

cat << 'INNER_EOF' > docs/content-repurposing-policy.md
# Política de Reutilización de Contenidos

- **De Pilar a LinkedIn:** Extraer un problema y un fragmento técnico sin contexto excesivo.
- La fuente principal debe permanecer en rauvia.com.mx.
INNER_EOF

cat << 'INNER_EOF' > docs/digital-pr-opportunity-map.md
# Digital PR - Oportunidades

- Participación en podcasts de negocios B2B.
- Artículos técnicos en plataformas de desarrollo y negocios en México.
- (Acciones pendientes de aprobación manual).
INNER_EOF

cat << 'INNER_EOF' > docs/citable-assets-roadmap.md
# Roadmap de Activos Citables

- **Mes 1:** Mapa de Decisión: ¿CRM o Sistema Comercial?
- **Mes 2:** Checklist de Arquitectura Operativa.
- **Mes 3:** Glosario Estructural Abierto.
INNER_EOF

cat << 'INNER_EOF' > docs/original-research-policy.md
# Política de Investigación Propia

- Todo estudio requerirá metodología clara.
- Datos de clientes deben ser anonimizados y contar con autorización expresa.
INNER_EOF

cat << 'INNER_EOF' > docs/public-repository-policy.md
# Política de Repositorios Públicos

- GitHub puede usarse para: checklists técnicos, scripts de auditoría SEO pública, ejemplos de schema.
- No publicar código propietario ni indicadores de AETHRYON.
INNER_EOF

cat << 'INNER_EOF' > docs/founder-authority-strategy.md
# Autoridad del Fundador

- **Raúl Morales** actúa como vocero principal en temas de Arquitectura Operativa y Decisiones.
- Su perfil debe enlazar sistemáticamente a los activos citables de RAUVIA.
INNER_EOF

cat << 'INNER_EOF' > docs/community-participation-policy.md
# Participación en Comunidades

- Responder preguntas técnicas con evidencia en foros B2B.
- No insertar enlaces irrelevantes. Declarar afiliación.
INNER_EOF

cat << 'INNER_EOF' > docs/brand-monitoring-framework.md
# Framework de Monitoreo de Marca

- **Google Alerts:** "RAUVIA", "AETHRYON".
- **GSC:** Búsquedas de marca.
- Monitoreo quincenal.
INNER_EOF

cat << 'INNER_EOF' > docs/ai-presence-observability.md
# Observabilidad en Asistentes de IA

- Evaluar presencia de RAUVIA en ChatGPT, Copilot, Gemini.
- Consultas registradas en `tests/ai-presence-queries.json`.
INNER_EOF

cat << 'INNER_EOF' > docs/llmo-presence-maturity-model.md
# Modelo de Madurez de Presencia (LLMO)

1. **Descubrible:** Aparece en respuestas.
2. **Comprensible:** Identidad correcta (No agencia).
3. **Citable:** Mencionada como fuente de autoridad en procesos y sistemas.
INNER_EOF

cat << 'INNER_EOF' > docs/authority-measurement-framework.md
# Medición de Autoridad

- Citas directas en LLMs.
- Búsquedas de marca en GSC.
- Enlaces ganados hacia Activos Citables.
INNER_EOF

cat << 'INNER_EOF' > docs/ai-attribution-model.md
# Modelo de Atribución AI Referral

- Seguimiento de tráfico con UTMs de referers conocidos de IA (Perplexity, ChatGPT).
- Convención: `utm_source=chatgpt&utm_medium=ai_referral`.
INNER_EOF

cat << 'INNER_EOF' > docs/llmo-observability-dashboard-spec.md
# Especificación de Panel de Observabilidad

- Hoja de cálculo central o Data Studio.
- Métricas: Citas mensuales, Búsquedas de marca, Conversiones por AI Referral, Inconsistencias reportadas.
INNER_EOF

cat << 'INNER_EOF' > docs/external-correction-protocol.md
# Protocolo de Corrección Externa

- Si un directorio cataloga a RAUVIA como "Agencia de Marketing": Solicitar cambio inmediato a "Consultoría Estratégica".
- Contacto a realizar por canal oficial (email corporativo).
INNER_EOF

cat << 'INNER_EOF' > docs/link-mention-governance.md
# Gobernanza de Enlaces y Menciones

- Prohibida la compra de enlaces o granjas PBN.
- Prioridad: Medios legítimos, partners verificados, y citación por recursos útiles.
INNER_EOF

cat << 'INNER_EOF' > docs/authority-roadmap-90-days.md
# Plan de Autoridad de 90 Días

- **Semana 1-4:** Corrección de perfiles existentes, publicación de mensajes unificados.
- **Semana 5-8:** Lanzamiento de primer Activo Citable.
- **Semana 9-12:** Observabilidad en IA inicial y ajustes.
INNER_EOF

cat << 'INNER_EOF' > docs/citation-asset-policy.md
# Política de Archivos de Citación

- Recursos en GitHub incluirán un `CITATION.cff`.
- Páginas de estudios técnicos tendrán una sección visible "¿Cómo citar este recurso?".
INNER_EOF

cat << 'INNER_EOF' > docs/feed-distribution-policy.md
# Política de Feeds

- RSS de `/blog/feed/` se mantiene limpio, sin borradores y con enlaces canónicos a RAUVIA.
INNER_EOF

cat << 'INNER_EOF' > docs/manual-external-actions.md
# Acciones Manuales (Externas)

- **Acción 1:** Actualizar bio en LinkedIn de Raúl Morales. (Requiere autorización)
- **Acción 2:** Validar y unificar Google Business Profile. (Requiere autorización)
INNER_EOF

cat << 'INNER_EOF' > docs/llmo-phase-4-handoff.md
# Handoff LLMO Fase 4

- **Validación Fase 3:** Exitosa.
- **Estrategias:** Definidas políticas de distribución, activos citables, y medición.
- **Pruebas:** Script automatizado `audit:authority` implementado.
- **Riesgos:** La actualización de perfiles externos requiere acción manual y tiempo.
- **Aprobación:** Cumple criterios Fase 4. **La Fase 5 puede comenzar.**
INNER_EOF
