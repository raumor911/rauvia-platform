mkdir -p docs tests scripts

# 1. Validation
cat << 'INNER_EOF' > docs/llmo-phase-3-foundation-validation.md
# Validación de la Fase 2 (Fundación LLMO Fase 3)

## Estado Verificado
- Definición canónica de RAUVIA existe.
- Categoría principal definida.
- Definición de AETHRYON existe y es consistente.
- Relación RAUVIA-AETHRYON definida.
- Identidad de Raúl Morales definida.
- Mapa de entidades existe.
- Vocabulario controlado definido.
- Grafo JSON-LD coherente.
- WordPress usa RAUVIA como publisher.
- `llms.txt` refleja la identidad.
- Pruebas automatizadas `audit:entities` y `audit:seo` pasan exitosamente.
- Build funciona.

## Hallazgos
- Ningún defecto P0 crítico encontrado que impida el desarrollo del sistema editorial.
INNER_EOF

# 2. Content Audit
cat << 'INNER_EOF' > docs/llmo-phase-3-content-audit.md
# Auditoría Editorial (Fase 3)

## A. Sitio React
- Páginas Core: Home, Nosotros, Soluciones, AETHRYON, Contacto.
- Faltan: Contenidos profundos de "Arquitectura Operativa", "Sistemas Comerciales", etc., más allá de las descripciones de los servicios.

## B. WordPress
- Entradas publicadas en `/blog`: A auditar y categorizar (actualmente con taxonomías por defecto o no estructuradas de manera óptima).
- Faltan: Estructura clara de categorías, enlaces a servicios, y definiciones de glosario.

## C. Arquitectura
- El enlazado interno entre las piezas editoriales y los servicios/soluciones puede mejorar.
- Metadatos básicos en su lugar, pero el Schema de Artículos debe estar pulido y referenciar correctamente a las entidades principales de la organización (Publisher/Author).
INNER_EOF

# 3. Topic Territories
cat << 'INNER_EOF' > docs/topic-territories.md
# Territorios Temáticos

## Núcleo
1. **Crecimiento Estructural:** Cómo las empresas pueden escalar sin depender exclusivamente de individuos (dependencia del fundador).
2. **Sistemas Comerciales:** Estructurar la adquisición y retención de clientes más allá de herramientas (CRM).
3. **Arquitectura Operativa:** La interrelación entre procesos, negocio y tecnología para generar control y ejecución.
4. **Inteligencia Estructural / Decisiones:** Métodos para distinguir ruido de señales y priorizar basado en evidencia (AETHRYON).

## Apoyo
- Transformación digital (con enfoque en procesos, no sólo en software).
- Activos digitales.
INNER_EOF

# 4. Business Problem Map
cat << 'INNER_EOF' > docs/business-problem-map.md
# Mapa de Problemas Empresariales

1. **Crecimiento sin estructura:** 
   - **Señal:** Operación caótica, pérdida de calidad, pérdida de margen.
   - **Solución:** Arquitectura Operativa.
2. **Dependencia del fundador:**
   - **Señal:** Cuellos de botella en la toma de decisiones, no se puede delegar.
   - **Solución:** Sistemas Comerciales y Operativos repetibles.
3. **Tecnología sin proceso (CRM abandonado):**
   - **Señal:** Software subutilizado, información dispersa.
   - **Solución:** Implementación guiada por procesos.
4. **Baja capacidad de ejecución:**
   - **Señal:** Planes estratégicos que no se implementan.
   - **Solución:** Priorización y claridad vía Inteligencia Estructural (AETHRYON).
INNER_EOF

# 5. Search Intent Map
cat << 'INNER_EOF' > docs/search-intent-map.md
# Mapa de Intenciones

1. **¿Qué es arquitectura operativa?** (Definición / Problema).
2. **¿Por qué implementar un CRM no mejora las ventas?** (Problema / Diagnóstico).
3. **Diferencia entre automatización y estructuración.** (Comparación).
4. **Cómo reducir la dependencia del dueño en una empresa.** (Procedimiento).
5. **Consultoría para escalar operaciones.** (Comercial).
INNER_EOF

# 6. Pillar Page Architecture
cat << 'INNER_EOF' > docs/pillar-page-architecture.md
# Arquitectura de Páginas Pilar

1. **Sistemas Comerciales (Pilar):** Qué son, por qué fallan las ventas B2B, cómo estructurarlas.
2. **Arquitectura Operativa (Pilar):** Definición, componentes, ejemplos, relación con transformación digital.
3. **Dependencia del Fundador (Pilar):** Síntomas, impacto en el crecimiento, cómo crear sistemas que liberen tiempo operativo.
INNER_EOF

# 7. Content Cluster Map
cat << 'INNER_EOF' > docs/content-cluster-map.md
# Arquitectura de Contenidos Satélite

- **Pilar:** Sistemas Comerciales.
  - Satélite 1: Qué debe existir antes de un CRM.
  - Satélite 2: Por qué los prospectos no avanzan.
  - Satélite 3: Captación vs Conversión estructural.
- **Pilar:** Arquitectura Operativa.
  - Satélite 1: Herramientas vs Capacidades.
  - Satélite 2: Cuando automatizar es un error.
INNER_EOF

# 8. Editorial Platform Architecture
cat << 'INNER_EOF' > docs/editorial-platform-architecture.md
# Arquitectura React–WordPress (Editorial)

- **React:** Mantendrá las páginas transaccionales, core corporativo (Home, Nosotros, Soluciones, Contacto) y páginas Pilar si tienen un rol central en el customer journey.
- **WordPress (/blog/):** Gestionará todos los contenidos satélite, artículos de profundidad técnica, glosario editorial y notas de opinión/observaciones.
INNER_EOF

# 9. Editorial Template
cat << 'INNER_EOF' > docs/editorial-template.md
# Plantilla Editorial

1. **H1:** Claro, enfocado en el problema o definición.
2. **Respuesta directa:** (2-3 párrafos) Resumen ejecutivo sin "fluff".
3. **H2:** Desarrollo del contexto / Qué significa.
4. **H2:** Por qué ocurre (Causas / Señales).
5. **H2:** Cómo solucionarlo / Estructurarlo.
6. **H2:** Límites (Qué NO hace esto).
7. **H2:** Conclusión / Recomendación.
8. **Fuentes:** Lista de evidencias o fuentes técnicas.
9. **CTA:** Llamado a interactuar con la solución o explorar AETHRYON.
INNER_EOF

# 10. Direct Answer Policy
cat << 'INNER_EOF' > docs/direct-answer-policy.md
# Política de Respuesta Directa

Todo contenido debe comenzar con 2 o 3 párrafos resolviendo directamente la duda planteada en el H1.
- No "depende".
- No historia del tema.
- Vocabulario controlado (RAUVIA).
- Formato "Featured Snippet / LLM grounding" friendly.
INNER_EOF

# 11. Evidence Policy
cat << 'INNER_EOF' > docs/evidence-policy.md
# Política de Evidencia

Toda afirmación debe clasificarse:
- Hechos públicos (requieren fuente externa de autoridad).
- Datos propios (requieren contexto del caso o muestra).
- Hipótesis o inferencias (deben declararse explícitamente: "nuestra experiencia sugiere...").
- No presentar opiniones como verdades absolutas.
INNER_EOF

# 12. Source Management Policy
cat << 'INNER_EOF' > docs/source-management-policy.md
# Política de Fuentes

- Cada artículo con datos externos debe citar la fuente.
- Formato: URL hipervinculada, Autor/Organización, Fecha.
- Prioridad: Fuentes primarias, papers, documentación oficial (ej. manuales técnicos).
INNER_EOF

# 13. Editorial Authorship Policy
cat << 'INNER_EOF' > docs/editorial-authorship-policy.md
# Política de Autoría

- Todo contenido debe tener un Autor asignado.
- Por defecto, contenido estratégico será firmado por "Raúl Morales".
- El Author Schema debe vincularse a la entidad Person creada en Fase 2.
INNER_EOF

# 14. Case Study Policy
cat << 'INNER_EOF' > docs/case-study-policy.md
# Política de Casos y Ejemplos

- **Casos Anonimizados:** Usados para proteger a clientes reales (indicando "Ejemplo de caso de empresa manufacturera").
- **Ejemplos Compuestos:** Para ilustrar problemas frecuentes, dejando claro que es una ilustración didáctica.
- Nunca inventar métricas y atribuirlas a casos reales sin autorización.
INNER_EOF

# 15. AETHRYON Publication Policy
cat << 'INNER_EOF' > docs/aethryon-publication-policy.md
# Política de Publicación de AETHRYON

- Se expone: el "Por qué" y "Qué problemas resuelve".
- No se expone: Las fórmulas exactas, arquitecturas de software privadas, prompts internos o indicadores confidenciales.
- Enfocado en "inteligencia estructural" y toma de decisiones.
INNER_EOF

# 16. Glossary Implementation
cat << 'INNER_EOF' > docs/glossary-implementation.md
# Implementación de Glosario

Términos iniciales controlados (definidos en artículos específicos o dentro de páginas pilar):
1. Crecimiento Estructural
2. Arquitectura Operativa
3. Inteligencia Estructural
4. Sistema Comercial
INNER_EOF

# 17. Editorial Taxonomy
cat << 'INNER_EOF' > docs/editorial-taxonomy.md
# Taxonomía Editorial de WordPress

- **Categorías (Amplias):**
  - Crecimiento y Escalamiento
  - Operación y Procesos
  - Tecnología Empresarial
  - Decisiones y AETHRYON
- **Etiquetas (Específicas):** 
  - CRM, Automatización, Dependencia del fundador, Inteligencia Estructural.
INNER_EOF

# 18. Question Answer Map
cat << 'INNER_EOF' > docs/question-answer-map.md
# Mapa de Preguntas y Respuestas (Q&A)

- **¿Qué debe existir antes de un CRM?** -> Procesos comerciales definidos. (Satélite)
- **¿Qué es inteligencia estructural?** -> Método para separar señal de ruido en la toma de decisiones. (Glosario/AETHRYON)
INNER_EOF

# 19. Editorial Linking Policy
cat << 'INNER_EOF' > docs/editorial-linking-policy.md
# Política de Enlazado Interno Editorial

- Los artículos satélite (WP) deben enlazar a la Página Pilar correspondiente y a las páginas de Soluciones de React.
- Los anclajes de texto (anchors) deben ser descriptivos (ej. "implementar un sistema comercial" en lugar de "clic aquí").
- AETHRYON se enlazará cuando se hable de priorización, datos y toma de decisiones.
INNER_EOF

# 20. Editorial Schema
cat << 'INNER_EOF' > docs/editorial-schema.md
# Datos Estructurados Editoriales

- **BlogPosting/Article:** En cada artículo de WP.
- Atributos requeridos: `headline`, `author` (Person), `publisher` (Organization = RAUVIA), `datePublished`, `dateModified`, `mainEntityOfPage`.
- Evitar `dateModified` cambiante sin actualizaciones reales.
INNER_EOF

# 21. Machine Readable Content
cat << 'INNER_EOF' > docs/machine-readable-content.md
# Contenido Machine-Readable

- El archivo `llms.txt` será la referencia primaria.
- RSS Feeds de WP se mantienen estándar en `/blog/feed/` para lectura sindicada.
INNER_EOF

# 22. Editorial Prioritization
cat << 'INNER_EOF' > docs/editorial-prioritization.md
# Priorización Editorial

- **P1:** Definiciones Core (Páginas Pilar).
- **P2:** Satélites que atacan dolores directos (ej. "Por qué falla mi CRM").
- **P3:** Glosario profundo.
INNER_EOF

# 23. Editorial Roadmap 12 Weeks
cat << 'INNER_EOF' > docs/editorial-roadmap-12-weeks.md
# Roadmap Editorial (12 Semanas)

- **Semana 1-4:** Consolidación de 3 Páginas Pilar (Sistemas Comerciales, Arquitectura Operativa, Dependencia del Fundador).
- **Semana 5-8:** Generación de 4 Artículos Satélite prioritarios (problemas de conversión, CRM, cuellos de botella).
- **Semana 9-12:** Glosario y artículos sobre Toma de Decisiones y AETHRYON.
INNER_EOF

# 24. WordPress Editorial Integration
cat << 'INNER_EOF' > docs/wordpress-editorial-integration.md
# Integración Editorial con WordPress

- **Gestión:** Revisiones en estado `draft` antes de publicar.
- **Autoría:** Mantener limpia la lista de autores de WP, unificada con la identidad de Raúl Morales o RAUVIA Editorial.
- **Schema:** Configurar el plugin de SEO para reflejar el Publisher como RAUVIA.
INNER_EOF

# 25. Content Lifecycle Policy
cat << 'INNER_EOF' > docs/content-lifecycle-policy.md
# Política de Ciclo de Vida del Contenido

- **Draft:** En redacción / Falta revisión de evidencia.
- **Published:** Público.
- **Update Required:** Marcado anualmente para revisión de relevancia (especialmente si cambia la tecnología).
- **Redirected:** Si el contenido se fusiona con una Pilar (301).
INNER_EOF

# 26. LLMO Content Measurement Framework
cat << 'INNER_EOF' > docs/llmo-content-measurement-framework.md
# Framework de Medición de Contenidos

- **Citas de IA:** Menciones en Perplexity, Copilot (usando herramientas analíticas de referers o manual spot-checks).
- **Impresiones GSC:** Para términos definitorios y problemas ("Qué debe existir antes de un CRM").
- **Navegación:** Conversión del Blog hacia páginas de Soluciones (GA4/Plausible).
INNER_EOF

# 27. Content Retrieval Playbook
cat << 'INNER_EOF' > docs/content-retrieval-playbook.md
# Playbook de Pruebas de Recuperación

Pruebas en LLMs (ChatGPT, Claude, Bing):
- Hacer preguntas del `content-retrieval-questions.json` y evaluar si el sistema asocia a RAUVIA con la respuesta gracias al grounding de `llms.txt` y los artículos indexados.
INNER_EOF

# 28. Editorial Governance
cat << 'INNER_EOF' > docs/editorial-governance.md
# Gobernanza Editorial

- **Flujo:** Propuesta -> Borrador -> Revisión (Factual & Brand) -> Aprobación -> Publicación.
- **Roles:** Raúl Morales como Aprobador Final / Revisor Experto.
INNER_EOF

# 29. Handoff
cat << 'INNER_EOF' > docs/llmo-phase-3-handoff.md
# Handoff LLMO Fase 3

- **Políticas Generadas:** Políticas de evidencia, autoría, formato de artículos (Pilares y Satélites).
- **Roadmap:** Definidas las 12 semanas iniciales.
- **Auditorías:** Script automatizado `audit:content` implementado para asegurar los requerimientos básicos del SEO semántico en artículos.
- **Aprobación:** Cumple criterios de Fase 3. La **Fase 4 puede comenzar.**
INNER_EOF

