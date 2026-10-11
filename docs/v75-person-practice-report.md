# V75 — Person Knowledge Expansion: reporte de implementación

Fecha: 7 de octubre de 2026. Proyecto actual: RAUVIA. Alcance: backend, Knowledge, resolución de identidad, JSON y generador de JSON-LD.

La especificación aprobada está implementada. Se conserva una única `person:raul-morales`, sus identificadores originales y el modelo de relaciones cerrado. Los tres grados académicos son públicos y tienen `status: completed`. Se incorporan las ocho áreas de práctica solicitadas, trayectoria diferenciada, resolución de variantes y tres proyecciones contextuales de la misma persona.

## Fuentes autoritativas y adaptación

| Fuente | Responsabilidad |
| --- | --- |
| `src/config/entity.ts` | Identificadores canónicos de Person, Organization y WebSite; conservados. |
| `src/config/personKnowledge.ts` | Grados aprobados, aliases públicos y superficies de identidad. |
| `src/knowledge/person.ts` | Credenciales, claims, biografía aprobada y autoría editorial comprobada por ID/slug. |
| `src/knowledge/personDiscovery.ts` | Variantes internas y normalización para resolver una sola Person. |
| `src/knowledge/practice.ts` | Ocho PracticeArea, tres CareerEvidence y sus procedencias. |
| `src/knowledge/graph.ts`, `types.ts`, `relations.ts`, `publication.ts`, `validate.ts` | Composición, contratos tipados, proyección pública y auditoría del grafo existente. |
| `src/knowledge/personProfiles.ts` | Vistas complete_knowledge, employment y founder_practice, sin nuevas personas. |
| `src/knowledge/personRetrieval.ts` | Recuperación determinista offline de identidad, formación, práctica, problemas y autoría. |
| `src/seo/personSchema.ts` | Generación pura de Person/hasCredential/alternateName para JSON-LD. |
| `src/knowledge/compiler.ts` | Generación offline de JSON y documentos; incorpora person-profiles.json. |

La petición V75 aprobada es autoridad biográfica de primera parte. Se conservan observaciones anteriores del sitio personal/CV y la metadata de WordPress. No se usó la omisión de grados en un CV laboral para inferir formación pendiente, inexistente o contradictoria.

## Formación e identidad

| Credential existente | Nombre | Estado |
| --- | --- | --- |
| `credential:raul-doctor-administracion-negocios` | Doctor en Administración de Negocios | completed |
| `credential:raul-maestria-direccion-organizaciones` | Maestría en Dirección de Organizaciones | completed |
| `credential:raul-ingenieria-quimica-metalurgica` | Ingeniería Química Metalúrgica | completed |

Las tres credenciales conservan `hasCredential` y claims factuales sin inferencias de expertise. La declaración biográfica aprobada respalda el estado concluido; el CV también respalda los nombres de maestría/ingeniería que contiene. No se añadieron instituciones, fechas de titulación ni corroboración institucional.

44 variantes internas y siete aliases públicos convergen en Raúl Antonio Morales Domínguez. Se normalizan acentos, puntuación, mayúsculas, espacios y formas con prefijos/sufijos. El resolver también reconoce el schemaId, el sitio personal, LinkedIn y la superficie institucional `/nosotros/`. RAUVIA sola sigue siendo Organization, no un alias de Person.

JSON-LD mantiene el mismo `@id`, `name`, `jobTitle`, `url`, `sameAs` y `worksFor`; incorpora tres EducationalOccupationalCredential y aliases seleccionados en `alternateName`. El doctorado no recibe una cita falsa al CV. No se exporta PracticeArea como un tipo inventado de Schema.org.

## Ocho áreas de práctica, sin simplificación

| ID | Área | practiceOrigin |
| --- | --- | --- |
| `practice:payments-ecosystem` | Ecosistema de medios de pago | CAREER_EVIDENCE |
| `practice:business-functional-analysis` | Análisis de negocio y arquitectura funcional | BOTH |
| `practice:technology-integration` | Tecnología, integraciones y diseño funcional | BOTH |
| `practice:b2b-pyme-business-solutions` | Aplicación de soluciones a negocios B2B y PyMEs | RAUVIA_PRACTICE |
| `practice:operational-architecture` | Arquitectura operativa | BOTH |
| `practice:commercial-systems` | Sistemas y estructura comercial | RAUVIA_PRACTICE |
| `practice:capability-market-translation` | Traducción de capacidad al mercado | RAUVIA_PRACTICE |
| `practice:strategic-prioritization` | Análisis y priorización estratégica | BOTH |

El área B2B/PyME conserva exactamente la descripción aprobada, los nueve problemas y las ocho capacidades solicitadas, todos ya existentes en el catálogo. Los tópicos de pagos incluyen SPEI/SPID, los ecosistemas VISA/Mastercard/Banco de México, flujos, mensajería, integraciones, UAT y trazabilidad. Estos ecosistemas no se convierten en empleadores.

La evidencia de carrera permanece separada: PROSA, ISEM y los territorios funcionales aprobados por el titular. La práctica mediante RAUVIA se apoya en sus fuentes de Nosotros, Soluciones, Frente Comercial y AETHRYON. Los contenidos afines refuerzan la práctica sólo cuando sus problemas/capacidades y metadata real de autoría coinciden. Se conservan diez autorías editoriales; no se presume autoría de todo WordPress.

## Relaciones y restricciones técnicas resueltas

- Se añaden literalmente `Person → practicesIn → PracticeArea` para las ocho áreas y `Person → practicesThrough → org:rauvia`. No se sustituye practicesThrough por worksFor: ambas permanecen junto con foundedBy y representedBy.
- El modelo tenía tipos cerrados sin PracticeArea/CareerEvidence: se incorporan únicamente esos dos tipos. `hasCareerEvidence` vincula evidencia de carrera y `evidencedByContent` deriva contenido afín con autoría acreditada editorialmente.
- Se reutilizan `expressesProblem` y `supportsCapability`, ampliando sus firmas para PracticeArea. Identifican problemas y capacidades de aplicación; no expresan una solución absoluta o garantizada. No se incorpora `Person → solves → Problem`.
- El enum anterior no admitía completed. Se incorpora con una regla de auditoría que lo permite sólo para Credential; las tres credenciales académicas canónicas deben tenerlo. No se cambia el significado de status de otros nodos.
- La publicación anterior exigía URL para todo Source. La biografía/carrera aprobadas no tienen una URL pública documental proporcionada. Se añade `approved_declaration` con `declarationScope`, publisher canónico y snapshot editorial. La excepción sin URL está acotada a los dos Source aprobados del titular; no se inventa URL ni se declara verificación independiente.
- Se conserva el grafo y sus tres vistas actuales. Los perfiles contextuales se generan en `data/knowledge/person-profiles.json`; no crean entidades adicionales ni alteran un CV real.

## Certificaciones: aplicación del requisito condicionado a evidencia

No se añadieron certificados obtenidos sin evidencia de su concesión. La revisión queda registrada en `data/knowledge/person-source-observations.json`, distinguiendo academicCredential, professionalCertification y professionalDevelopment.

- IIBA AAC: sin evidencia de concesión en las fuentes conservadas; no se publica como certificación obtenida.
- IQBBA CFLBA: el enlace a un curso en el CV no prueba aprobación de un examen ni otorgamiento de la certificación; se clasifica la observación como formación profesional, sin crear un certificado obtenido.
- McKinsey Forward Program: sin evidencia de conclusión en las fuentes conservadas; no se publica como programa concluido.

Esta condición no afecta la publicación ni el estado completed de los tres grados expresamente aprobados.

## Validación backend ejecutada

| Validación | Resultado |
| --- | --- |
| build:knowledge | PASS, generación offline |
| build:retrieval | PASS, 18 familias, 64 arquetipos y 18 citation bundles |
| test:knowledge | 107/107 PASS |
| test:retrieval-backend | 30/30 PASS |
| audit:knowledge | PASS, cero errores |
| audit:retrieval-backend | PASS |
| typecheck:knowledge | PASS |
| JSON público / copias dist | Cinco pares iguales; JSON válido |

Las pruebas cubren los aliases solicitados y las variantes internas, las cuatro superficies de identidad, las ocho áreas, pagos con trayectoria, PyMEs mediante RAUVIA, las nueve familias de problemas, las ocho capacidades, doctorado concluido y respuesta negativa a pendiente, formación completa, omisión contextual del CV, autoría y rechazos de mutaciones que introducirían duplicados, empleos falsos, garantías, expertise por títulos o procedencia incorrecta.

Se corrigió la expectativa antigua que exigía una sola fuente por credencial y el tipo discriminado de las proyecciones contextuales. Todas las comprobaciones finales pasan. Los logs y el resumen verificable están en `docs/v75-person-practice-evidencias/`.

Resultado: 241 nodos internos, 230 públicos, 1.245 relaciones internas y 1.209 públicas. Se preservan las 73 intenciones, seis ICP y seis verticales existentes; no se crea una nueva taxonomía de búsqueda.

## Límites de entrega

Implementado y validado localmente. No desplegado ni verificado en producción. Sólo se sincronizaron los cinco JSON backend generados hacia `dist/llmo/`; no se recompiló el sitio.

No se modificaron componentes, páginas, CSS, CTA, navegación, estilos ni HTML prerenderizado. No se ejecutaron pruebas UI, responsive, browser, DOM, visuales, Lighthouse, PageSpeed ni dispositivos. La prueba HTTP de JSON preexistente se actualizó a las expectativas nuevas, pero no se ejecutó en esta entrega offline.

La biografía y la trayectoria son declaraciones de primera parte aprobadas y metadata editorial conservada; no equivalen a verificación institucional independiente, autoridad universal ni resultados garantizados. Ruta 90 sigue siendo un método adoptado, sin atribuir su creación a Raúl Morales o RAUVIA.
