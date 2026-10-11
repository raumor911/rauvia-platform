# Registro histórico de la implementación inicial, sustituido por la biografía V75 aprobada

No describe el estado actual de formación ni del grafo.

# V75 — Person Knowledge Expansion: Raúl Morales

Fecha: 7 de octubre de 2026. Alcance: datos, Knowledge Graph, generación JSON-LD y retrieval offline.

La expansión está implementada en el proyecto actual. Se conservan una única Persona y su identificador `https://rauvia.com.mx/#raul-morales`. Se modelan tres credenciales y diez autorías con evidencia editorial. El doctorado queda **interno, pendiente de fuente pública**: fue declarado por el titular en la solicitud, pero no apareció en la biografía y el CV públicos consultados. No se atribuye esa declaración al sitio personal.

## Identidad y relaciones

`person:raul-morales` conserva el nombre Raúl Antonio Morales Domínguez y el cargo Fundador y Director Estratégico. Su `url` es `https://raulmorales.com.mx/`; esta superficie personal no sustituye su `schemaId` ni crea otra Persona.

Se mantienen `Person → representedBy → asset:nosotros` y `org:rauvia → foundedBy → Person`. Se añade `Person → worksFor → org:rauvia` para expresar el cargo vigente, distinto de la fundación. No se añade otra relación equivalente de afiliación.

`sameAs` contiene el sitio personal y el perfil LinkedIn previamente registrado, enlazado expresamente desde la [biografía pública](https://raulmorales.com.mx/raul-morales/) y el [CV](https://raulmorales.com.mx/mi-cv/). Esa referencia de primera parte no representa una certificación externa de identidad.

## Nodos y provenance

| Credential y Claim correspondientes | Categoría | Source | Publicación |
| --- | --- | --- | --- |
| `credential:raul-doctor-administracion-negocios` / `claim:raul-doctor-administracion-negocios` | Doctorado | `source:raul-editorial-declaration` | Internos, pendientes de fuente pública |
| `credential:raul-maestria-direccion-organizaciones` / `claim:raul-maestria-direccion-organizaciones` | Maestría | `source:raul-public-cv` | Públicos, declaración biográfica propia |
| `credential:raul-ingenieria-quimica-metalurgica` / `claim:raul-ingenieria-quimica-metalurgica` | Título profesional / Ingeniería | `source:raul-public-cv` | Públicos, declaración biográfica propia |

Los nombres modelados son Doctor en Administración de Negocios, Maestría en Dirección de Organizaciones e Ingeniería Química Metalúrgica. El [CV público](https://raulmorales.com.mx/mi-cv/) declara los dos últimos. Se incorporaron únicamente los nombres de esos grados; las instituciones, fechas de titulación, contactos y otros datos del CV quedaron fuera del grafo.

Todos los Credential y Claim académicos usan `evidenceState: editorial`. Los claims son `factual`, con `causalStatus: not_applicable` y `guaranteesResults: false`. Su límite explícito indica que una biografía de primera parte no constituye verificación independiente de la institución educativa. No se derivan `expertise`, `knowsAbout`, especializaciones o garantías de resultados de los grados.

Fuentes añadidas:

- `source:raul-personal-site`: sitio personal y URL de la biografía; identidad y vínculo con RAUVIA.
- `source:raul-public-cv`: CV público; maestría e ingeniería.
- `source:wp-author-raul`: perfil editorial WordPress y metadata pública del autor.
- `source:raul-editorial-declaration`: declaración del titular sobre el doctorado; Source interno sin URL pública inventada.

Las observaciones mínimas se conservan en `data/knowledge/person-source-observations.json`. No se conserva una copia completa de la biografía ni documentos académicos privados.

## Authorship

La [metadata del autor](https://blog.rauvia.com.mx/wp-json/wp/v2/users/1) identifica a “Raul Morales”, con el [perfil editorial](https://blog.rauvia.com.mx/author/raulmorales/). Se capturaron ID, nombre, slug y perfil públicos; cada relación se cruza con ID, slug y autor del artículo correspondiente.

Se detectaron diez `Content → authoredBy → person:raul-morales`: `content:wp-15`, `wp-18`, `wp-22`, `wp-25`, `wp-28`, `wp-31`, `wp-34`, `wp-39`, `wp-42` y `wp-45`. Cada uno conserva por separado `org:rauvia → publishes → Content`.

Que los diez artículos del catálogo tengan ese autor no implica una atribución automática a todo WordPress. Se ignoran artículos fuera del catálogo; no se añaden nuevas entradas ni se modifican textos del CMS. Metadata ausente, autor distinto, ID desconocido o slug incorrecto no generan `authoredBy`. El helper offline también rechaza una relación aislada sin evidencia editorial concordante.

`publicAuthorRefs` se deriva de relaciones confirmadas. Las fuentes WordPress existentes incorporan URLs de consulta de la metadata de cada artículo.

## Grafo público y JSON-LD

El master tiene **229 nodos** y la proyección pública **215**. El delta contra el JSON del paquete V75 anterior añade diez nodos, modifica 21 y conserva todos los IDs y relaciones anteriores. Se añaden 7 `supportedBy`, 10 `authoredBy`, 6 `containsClaim`, 3 `hasCredential` y 1 `worksFor`.

La proyección pública de Person incluye identidad, web personal, referencias de entidad verificadas por fuente propia, dos `credentialRefs`, `organizationRefs`, diez `publicAuthorRefs` y `sourceRefs`. Excluye el doctorado pendiente y su Source/Claim internos. Las listas derivadas se filtran por los IDs efectivamente publicables; no contienen referencias a nodos internos.

La taxonomía conserva 73 Intent, 64 públicos; no se crea una nueva Intent para las consultas personales. RAUVIA sigue siendo Organization, AETHRYON System y Ruta 90 Method adoptado y utilizado. No se incorpora autoría de Ruta 90 a Raúl Morales o RAUVIA.

La función pura `src/seo/personSchema.ts` produce Person con el mismo `@id`, web personal, `sameAs`, `worksFor` y dos EducationalOccupationalCredential públicos. Utiliza [hasCredential](https://schema.org/hasCredential) y [EducationalOccupationalCredential](https://schema.org/EducationalOccupationalCredential), sin tipos Schema.org inventados. El doctorado pendiente permanece en un módulo backend y no entra en la configuración pública usada por este generador.

`schemasFor` normaliza la representación existente de la misma Persona mediante este generador de datos; no requiere editar componentes visuales. Se genera `data/knowledge/person-schema.json`. No se regeneró HTML ni el paquete de aplicación: la integración de esos metadatos en una futura compilación completa queda fuera de esta entrega de datos. Los cinco JSON públicos se sincronizaron a `dist/llmo/`.

## Validación backend

| Comprobación | Resultado |
| --- | --- |
| `build:knowledge` y `build:retrieval` | PASS, compilación estática offline |
| `audit:knowledge` | PASS, 0 errores |
| `test:knowledge` | PASS, 75 pruebas |
| `test:retrieval-backend` | PASS, 30 pruebas |
| `audit:retrieval-backend` | PASS |
| `typecheck:knowledge` | PASS, alcance Knowledge y generación de datos |
| Cinco recursos HTTP JSON | PASS, 5 pruebas locales |
| Parse, referencias, IDs, tipos, determinismo y límite público/interno | PASS |

El retrieval personal resuelve fundador/director, sitio, relación con RAUVIA, formación y autoría. La consulta interna de formación incluye los tres registros con su visibilidad; la pública devuelve los dos con fuente pública. La consulta sobre creación de Ruta 90 niega esa atribución. Artículos sin evidencia concordante devuelven autoría no establecida.

Las mutaciones negativas cubren Persona duplicada, ID inestable, URL insegura, identidades inventadas, credenciales sin fuentes, instituciones/fechas agregadas, expertise inferida, credenciales promovidas a validated, claims causales inapropiados, autoría inventada y campos privados anidados.

Las pruebas HTTP se limitaron a `/llmo/knowledge-graph.json`, `intent-coverage.json`, `retrieval-map.json`, `canonical-answers.json` y `citation-bundles.json` en el servidor local existente. Comprobaron 200, Content-Type JSON, parse, concordancia con el archivo generado, ausencia de Location y límite de publicación. No se cargaron páginas. El servidor de prueba se cerró.

## Errores corregidos y límites

Durante el primer pase dos comprobaciones heredadas accedieron a archivos fuera del alcance backend pese al filtro de nombres aplicado. Se retiraron de las suites de datos; el pase final usa comprobaciones exclusivamente backend. No se abrió navegador ni se realizaron comprobaciones visuales. También se corrigió el tipado explícito de las respuestas del helper personal; la comprobación de tipos final pasa.

Las ediciones se limitaron a Knowledge, configuración canónica de identidad, generación de datos estructurados, JSON, scripts, pruebas de datos y documentación. No se editaron páginas, componentes visuales, CSS, imágenes o navegación. No se compararon hashes de HTML/CSS/JS. No se crearon páginas, productos, ICP o taxonomías de Intent.

Limitaciones: formación declarada por primera parte, sin verificación institucional independiente; doctorado pendiente de URL pública; autoría basada en un snapshot editorial de los diez artículos existentes, no todo el inventario ni corroboración de sus afirmaciones. No se desplegó en producción. El complemento backend no sustituye el paquete completo V75.
