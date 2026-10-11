# RAUVIA — DIO v1.0.0, candidato para integración

Fecha: 11 de octubre de 2026. Estado: implementado y validado localmente; sin despliegue, sin push y sin cambios en WordPress productivo.

## Fuente y versión corregida

Versión de aplicación: **78.0.0**. DIO v1.0.0 está integrado y validado sobre la copia local completa V78, que conserva las correcciones V77 de WordPress y V78 de rendimiento. Se corrige la propuesta anterior de V79. package.json y package-lock.json mantienen 78.0.0 y no cambian las dependencias.

La implementación DIO procede de GitHub main bd9d596c01a083b80597e9601572daef78d60797; el parche de nueve páginas se aplicó después a V78. La fuente de esta entrega es rauvia-v78-dio. El código de WordPress, Recursos, el render estático, la integración PHP, package.json y el lockfile coinciden por SHA-256 con la copia original V78: [comprobación](dio-v1-evidence/v78-preservation.json).

Se compiló V78 antes y después de DIO, incluyendo el frontend completo. Se compararon los 20 HTML: metadatos, schema, H1, canonicals y precios permanecen iguales. El número anterior desaparece de los enlaces operativos de WhatsApp en las 20 rutas. La evidencia histórica de producción conserva su captura previa.

## Mejora comprobada frente a V78 anterior

| Elemento | Antes | V78 con DIO |
|---|---|---|
| Servicios profesionales | «Quiero revisar mi página comercial» | «Cotizar mi página comercial», resumen del servicio e información para definir alcance |
| Servicios especializados | «Quiero revisar mi sitio actual», que presupone un sitio existente | «Cotizar mi sitio web», válido para sitio nuevo o existente, con enlace a la alternativa profesional |
| Médicos | «Quiero mi página web médica» | «Cotizar mi página web médica», orientación por especialidad, ciudad y agenda |
| Consultorios | «Quiero una página para mi consultorio» | «Cotizar la página de mi consultorio», orientación por profesionales, sedes y solicitudes de cita |
| WhatsApp | Dos números publicados en distintas páginas | Único destino comercial +52 55 8649 4076 |
| WordPress y Recursos | Correcciones de V77/V78 | Código conservado y pruebas de recuperación, invalidación y rendimiento aprobadas |

La mejora verificable es claridad de oferta, coherencia del contacto y un siguiente paso explícito. No se ha demostrado incremento de tráfico, posiciones o contactos. No se hicieron pruebas A/B ni se obtuvieron métricas privadas de Search Console/Bing.

## Auditoría y mapas

No aparecieron archivos originales llamados Index Map 1, 2 y 3. Sí existe cobertura en src/knowledge/intents.ts, src/knowledge/assets.ts, src/seo/routeSeo.js y las páginas React. A petición del usuario se crearon tres documentos derivados y trazables:

- [Index Map 1: profesionistas](index-map-1-profesionistas.md).
- [Index Map 2: médicos y consultorios](index-map-2-medicos-consultorios.md).
- [Index Map 3: empresas de servicios](index-map-3-empresas-servicios.md).

El mapa 3 distingue la cobertura técnica/B2B explícita del soporte más general en las páginas de PyMES y profesionales. No se presenta como cobertura exhaustiva de cualquier empresa de servicios. No se identificó un hueco que, con la evidencia disponible, justificara crear nuevas landings.

Las nueve páginas de los segmentos existen y responden 200 en producción; las cuatro seleccionadas tienen título, metadescripción, un H1, canonical correcto y seis bloques JSON-LD. Sitemap, robots, clave pública IndexNow, API pública WordPress y seis artículos enlazados respondieron 200. La clave IndexNow coincide exactamente con su cuerpo. Esto no acredita indexación ni entrega reciente a los buscadores.

Evidencia: [auditoría inicial](dio-v1-evidence/public-audit.json) y [rutas adicionales y recursos](dio-v1-evidence/mapping-http.json). Las capturas public-*.txt son el HTML previo de producción y pueden contener el teléfono antiguo como registro histórico.

Search Console y Bing Webmaster Tools: no hay herramientas conectadas disponibles ni exportaciones de rendimiento en este checkout. No se inventaron métricas, posiciones, demanda, conversiones ni impacto comercial. El potencial de la tabla siguiente es una hipótesis editorial basada en la intención y la función de cada página.

## Priorización: cuatro URL

| Orden | URL | Intención y potencial cualitativo | Oportunidad verificada | Esfuerzo / riesgo SEO |
|---|---|---|---|---|
| 1 | /pagina-comercial-servicios-profesionales/ | Cotizar presencia comercial; alta pertinencia para independientes | Apertura conceptual sobre confianza; faltaba indicar qué enviar para definir alcance | Bajo / bajo: texto y enlaces, mismo H1 y metadata |
| 2 | /sitio-web-servicios-especializados/ | Contratar un sitio para servicios técnicos; alta pertinencia empresarial | Apertura «Hay empresas que no venden algo simple» y CTA que asumía sitio existente | Bajo / bajo: oferta concreta y CTA válido para sitio nuevo o existente |
| 3 | /pagina-web-para-medicos/ | Comparar y cotizar presencia médica; página general de entrada | CTA genérico; faltaba pedir especialidad, ciudad y necesidad de agenda junto al contacto | Bajo / bajo: mantiene gratuita y diferencia alcance de integraciones |
| 4 | /pagina-web-para-consultorio-medico/ | Cotizar web para equipo/sedes; necesidad específica | CTA genérico; faltaba orientar la cotización por profesionales, sedes y citas | Bajo / bajo: mismo alcance, rutas y FAQ |

Frente Comercial ya dispone de paquetes, precios y CTA específicos; se conserva como destino comercial. Especialistas, agenda, SEO local, gratuita y PyMES mantienen contenido. La prioridad no se basa en volúmenes de búsqueda.

## Cambios y justificación

1. Resúmenes visibles que identifican proveedor, destinatario, servicio y componentes. Están en el HTML inicial y también tras hidratar React; facilitan comprensión y recuperación, sin prometer recomendaciones de IA.
2. CTA de cotización con mensajes prellenados propios del segmento. No piden datos clínicos ni añaden formularios, servicios, almacenamiento o seguimiento.
3. Información breve junto al CTA sobre qué comunicar para definir alcance.
4. Enlaces contextuales: profesional → paquetes; servicios especializados → profesional; médico → consultorio; consultorio → agenda/WhatsApp. Se verificaron también los enlaces editoriales existentes hacia artículos; no se editaron artículos ni WordPress.
5. Por instrucción posterior del usuario, sustitución del teléfono antiguo en las nueve páginas que lo contenían. Único destino WhatsApp de RAUVIA: +52 55 8649 4076. En cinco páginas adicionales el cambio es exclusivamente de teléfono. Los cuatro destinos DIO siguen siendo el límite de optimización editorial.

Se conservan branding, CSS, H1, títulos, metadescripciones, canonicals, FAQ/schema, precios, rutas, redirecciones, sitemap, backend, configuración WordPress e IndexNow. No se añade una plataforma analítica, recomendador ni CRM; Kyberion permanece fuera del alcance. La revisión React confirmó que no se añadieron hooks, estado, dependencias ni solicitudes de datos.

## Validación

| Comprobación | Resultado y límite |
|---|---|
| npm ci --ignore-scripts | Dependencias del lockfile instaladas, sin cambios de versiones |
| npm run build | PASS. Compilación, prerender y servidor; advertencias de compatibilidad del cargador Vite y de import.meta/CJS ya presentes en la base |
| npm run lint | PASS, TypeScript sin errores |
| Regresión existente | 161/161: IndexNow, aplicación compilada, WordPress/cache y sincronización, rendimiento/recuperación de Recursos, SEO HTML, landing profesional y rutas históricas |
| 20 páginas públicas | Teléfono único, un H1, canonical; comparación exacta de metadata, H1 y JSON-LD con build previo |
| 16 vistas responsive | Cuatro páginas × 360, 390, 768 y 1440 px; sin overflow horizontal, CTA completos de al menos 50 px, sin imágenes visibles rotas |
| WhatsApp | URL y texto decodificado verificados; no se enviaron mensajes ni se confirmó recepción comercial |
| HTTP público | Sólo lecturas; páginas, artículos, robots, sitemap, clave IndexNow y API WordPress disponibles |
| git diff --check | PASS |

Las pruebas de servidor utilizan fixtures de WordPress e IndexNow; no se notificaron cambios ficticios a producción. Se ejecutaron desde /tmp/rauvia-v78-dio-validation para evitar el rechazo de archivos bajo carpetas ocultas de Express. El navegador Chrome conectado revisó el frontend V78 compilado servido localmente. Se permitió la conexión local necesaria para las pruebas.

En esta ejecución del servidor compilado con datos controlados: respuesta fría con WordPress pendiente 1051 ms; p95 de respuesta caliente 0,33 ms; copia previa durante invalidación 7,67 ms. Datos iniciales compactos 7.735 bytes frente a 191.538 bytes de artículos completos. Son mediciones locales en proceso; no representan carga total en producción. Conservan el comportamiento previamente registrado en V78 (1047 ms, 0,33 ms y 7,54 ms en su ejecución histórica), sin que esas variaciones pequeñas prueben una mejora o regresión de velocidad.

Evidencias: [build](dio-v1-evidence/build.log), [TypeScript](dio-v1-evidence/typecheck.log), [regresión](dio-v1-evidence/regression.log), [HTML](dio-v1-evidence/html-regression.json), [móvil](dio-v1-evidence/mobile.json) y cuatro PNG de 390 px en la misma carpeta. Las pruebas visuales se hicieron contra el frontend compilado servido localmente; las pruebas Express se ejecutaron aparte.

Comando de regresión usado:

```sh
node --import tsx --test --test-concurrency=1 tests/indexnow.test.mjs tests/indexnow-app.test.mjs tests/wordpress-cache.test.ts tests/landing-profesionales.test.mjs tests/seo-html.test.mjs tests/v73-stabilization.test.mjs tests/wordpress-sync.test.ts tests/wordpress-sync-app.test.mjs tests/resources-performance.test.ts tests/resources-performance-app.test.mjs
```

El script scripts/verify-dio-html.mjs permite repetir la revisión HTML. DIO_BASELINE_DIST puede apuntar al dist de la versión anterior para comparar metadatos y schema. Las capturas responsive corresponden a esta ejecución y deben renovarse si cambia la UI.

## Entrega y despliegue pendiente de autorización

La entrega **rauvia-platform-v78-dio.zip** contiene V78 completo con DIO, código, frontend y servidor compilados, mapas, informe y evidencias. El archivo original de V78 se conserva. El ZIP de revisión **rauvia-v78-dio-review.zip** contiene el parche, las nueve páginas cambiadas y la documentación.

1. Revisar el candidato V78 y su manifiesto. Las pruebas de integración ya están completadas en esta entrega. Sincronizar su fuente con la rama del repositorio que conserve V77/V78 antes de futuras modificaciones.
2. Después de autorización expresa, desplegar V78 con el procedimiento existente de Hostinger: Express, Node 24.x, npm, entrada dist/server.cjs. El postinstall existente puede reconstruir el frontend y el servidor durante npm install.
3. Conservar las variables, secretos, cola persistente de IndexNow, base de datos, caché WordPress y MU plugin. No reemplazar WordPress. El puente PHP existente sigue siendo compatible.
4. Validar en producción las nueve páginas, número único, canonicals, sitemap y rutas históricas. Notificar las nueve URL modificadas mediante el mecanismo autenticado existente de IndexNow, sin exponer secretos. Respuesta 200/202 no significa indexación.
5. Medir tiempo real de carga de Recursos, navegación móvil y contactos. Comparar rendimiento comercial sólo con datos reales de Search Console/Bing y contactos. Restaurar el artefacto anterior si se detecta una regresión.

No se cambió el modelo desde este chat: no hay un control disponible para seleccionar SOL 6.1 LOW. No se crearon agentes ni chats adicionales.
