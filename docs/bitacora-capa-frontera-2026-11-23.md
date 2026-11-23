# Bitácora: capa visual "frontera", agentes, seguridad y Recursos (2026-11-23)

Resumen de lo construido en esta sesión de trabajo. Todo es **solo presentación** salvo donde se indica: mismo texto, mismo H1, mismo SEO. Los archivos de conocimiento previos (`llms.txt`, `organization.json`, etc.) no se tocaron.

## 1. Criterio común: la capa "frontera"

Lenguaje visual compartido (hero oscuro, retícula triangular que converge, acento dorado, cierre oscuro que se une al pie):

- `ConvergenceField` (canvas): props `coreSelector`, `origin`, `flow: outward|inward`, `overlay`, `className`. La fase de la retícula es global, así que dos canvases contiguos se unen sin costura.
- `usePageFx(root)`: barra de progreso (`.fx-progress`, variable `--fx-p`), luz que sigue al puntero en `.fx-hero` y foco en `.fx-card`.
- `src/styles/pageFrontier.css`: clases `.fx-page .fx-hero .fx-dark .fx-light .fx-card .fx-lift .fx-field .fx-chip .fx-scene`.
- Mejora progresiva: sin JS o con `prefers-reduced-motion` todo se ve y funciona igual; SVG decorativos con `aria-hidden`; se usan las propiedades CSS `translate` y `scale` para no chocar con otros `transform`.
- El pie detecta (MutationObserver) si la última `section` de `main` tiene `.fx-dark` y marca `data-join="dark"` para unir la retícula.

## 2. Trabajo realizado (orden cronológico)

| Tema | Resultado |
|---|---|
| Logo | Logo compacto sin lema, centrado y más grande en navbar y pie; navbar casi opaca (`af40c7a`). |
| Agent-readiness (9 puntos del escáner) | Content-Signal en `robots.txt`; Markdown con `Accept: text/markdown`; cabecera `Link`; MCP de solo lectura (`POST /mcp`, JSON-RPC sin estado); Server Card en `/.well-known/mcp/server-card.json`; WebMCP (`src/lib/webmcp.ts`); JSON-LD completo de organización (teléfono, país, `contactPoint`); enlaces de contacto, términos y privacidad en el pie. Pruebas en `tests/agent-ready.test.mjs` (`55cf961`). |
| Casos | Capa visual en el índice y en los dos casos (`ab5b1a5`). |
| Seguridad | `react-router-dom` 7.18.6 y `react-router` 8.5.2 por los avisos GHSA-2rq8, qhgm y mjj8 (`556a80c`). |
| Recursos | Las entradas del blog son las protagonistas; filtros por tema y por etiqueta; asociaciones visibles en cada tarjeta; portadas generadas (`PostCover`); `resourceCards()` conserva términos compactos (`8df49cc`). |
| Higiene | `.playwright-mcp/` en `.gitignore` (`ef82cd8`). |
| 10 landings (este cambio, sin commit) | Ver sección 3. |

## 3. Las 10 landings

Páginas: `/frente-comercial/`, `/sitio-web-comercial-para-pymes/`, `/sitio-web-servicios-especializados/`, `/pagina-comercial-servicios-profesionales/` y las seis de médicos (`/pagina-web-para-medicos/`, `-gratis-`, `-especialistas`, `-consultorio-medico`, `-medicos-agenda-whatsapp`, `/seo-local-para-medicos/`).

**Qué se hizo**

- Raíz de cada página con `fx-page lf-page`, barra `fx-progress`, hero `fx-hero lf-hero` con `ConvergenceField` y cierre `fx-dark lf-final` con el campo en sentido `inward`.
- `src/styles/landingFx.css` (nuevo):
  - Variables de color invertidas dentro de `.lf-hero` y `.lf-final` para las familias `med`, `pcsp` y `r56`.
  - Títulos con acento dorado, botón principal dorado con brillo, secundario de vidrio.
  - Paneles de vidrio para las "rutas" (`.r56-flow`, `.pcsp-flow`) con paso activo animado.
  - Mockups de médicos con resplandor; barra local con desenfoque.
  - Tarjetas que se elevan al pasar el cursor; `details` con barra dorada e ícono "+" que gira.
  - Aparición por scroll (`animation-timeline: view()`, rango `entry 0% entry 100%`), solo con `@supports` y sin movimiento reducido.
- Las hojas de cada familia (`CommercialLandings.css`, `pcsp`, médicos) usan selectores más pesados; por eso hay un bloque de refuerzos con prefijo `.lf-page` / `.r56-landing`.
- La página `FrenteComercialPage.tsx` se editó a mano; las otras nueve con un guion y se verificaron con `tsc`.

**Verificación**

- `npm run lint`: sin errores.
- `npm test`: 542 pruebas bien, 0 fallas (queda la marca TODO de aprobación visual del Hero, que es decisión humana).
- Evidencia móvil/hero: 56 filas, 0 hallazgos.
- Las 10 páginas: el cierre oscuro es la última `section` de `main`; sin desborde horizontal a 1440 ni a 390 px.
- Baselines congeladas refrescadas con motivo documentado en `tests/fixtures/BASELINE_LOG.md`. Cambios semánticos: **0** (head y H1 idénticos); solo cambió el hash del contenido fuera del hero. `/recursos` cambia además por las entradas vivas de WordPress al compilar.

### Cuerpo de las 10 landings (`src/styles/landingBody.css`)

Hasta aquí solo el hero, el cierre y detalles (tarjetas, preguntas frecuentes) tenían el look actual; el cuerpo seguía en el estilo anterior (blanco/gris alternado, texto chico, acentos verde azulado). Se añadió una capa **solo CSS** (se carga con `@import` desde `landingFx.css`; no cambia HTML ni texto):

- **Secciones claras (todas):** filo dorado entre secciones, retícula y brillo muy tenues, etiquetas de sección con punto dorado, títulos más compactos, tarjetas con borde azul, elevación y filo dorado al pasar el cursor, botones primarios azules con aro dorado, enlaces con subrayado dorado.
- **Bandas oscuras "instrumento"** (fondo azul profundo con retícula triangular, brillo, filo dorado; tarjetas de vidrio, maquetas enmarcadas, botones dorados):
  - Médicos: `.hub-showcase` (médicos y consultorio), `.hub-mobile-section` (agenda), `.esp-gallery-section` y `.esp-local` (especialistas), `.sl-build` y `.sl-options` (SEO local), `.med-showcase` (gratis; las pestañas de ejemplo usan la activa en dorado).
  - Ya eran azules y solo se armonizaron: `.r56-authority` (pymes, servicios especializados), `.pcsp-insight` (servicios profesionales), `.med-why` (gratis), bloques `bg-rauvia-navy-dark` y la pregunta Sí/No de Frente Comercial.
- Las páginas que ya tenían banda azul (comercial) recibieron menos cambio; las de médicos sin ninguna recibieron una o dos.
- Revisado en 1440 y 390 px: sin desborde horizontal. Verificación: lint, `npm test` 546 bien / 0 fallas (solo el TODO del Hero) y evidencia 56 filas / 0 hallazgos. Los baselines no se movieron (solo `/recursos`, por WordPress), porque el HTML no cambió.

## 4. Análisis de causa raíz: página en blanco en `localhost:3000/pagina-web-para-medicos/`

**Síntoma:** la pestaña muestra título "localhost", página en blanco y el aviso de Chrome por la marca `--disable-blink-features=AutomationControlled`.

**Evidencia reunida**

1. El título de pestaña era "localhost" y no el título de la página: el HTML de la aplicación **no llegó** al navegador. Cuando la página carga, el título es "Página web para médicos | Presencia profesional | RAUVIA".
2. En el momento de la captura el servidor de desarrollo estaba detenido: se lo había terminado con `pkill -f "tsx server.ts"` para liberar el puerto antes de `npm run evidence:hero` (el script levanta su propio servidor de producción en el puerto 3118 y se bloqueaba al navegar mientras corría el de desarrollo).
3. Al levantar de nuevo `npm run dev`, la misma URL responde 200, el `<h1>` existe, `#root` tiene ~84 KB de contenido y no hay errores de JavaScript.
4. Descartado que sea la capa nueva: el desfase con hueco en blanco que aparece al hacer scroll con `mouse.wheel` en el navegador automatizado ocurre también en `/nosotros/` (sin cambios) y con todas las animaciones de `.lf-page` desactivadas. Es un artefacto de captura de pantalla del navegador controlado, no de los estilos.

**Causa raíz:** el servidor de desarrollo estaba apagado cuando se recargó la pestaña (acción mía durante la ronda de pruebas), no un defecto del código de las landings.

**Corrección:** se volvió a iniciar el servidor de desarrollo (`npm run dev`, puerto 3000) y se comprobó la carga. No hay cambio de código asociado.

**Otros hallazgos**

- `POST /api/events` responde 500 en local: el servidor no tiene credenciales de MySQL (`Access denied for user ''`), de modo que la analítica falla al insertar. Es de entorno; en producción usa sus credenciales. El endpoint responde 400 correctamente ante cargas inválidas. No se modificó.
- Mejora de proceso sugerida: antes de correr `evidence:hero`, detener el servidor de desarrollo, y volver a levantarlo al terminar.

## 5. Escáner de agentes: "faltan enlaces a contacto y términos"

**Hallazgo del escáner:** "No link found for: contact, terms" en la portada.

**Análisis**

- Producción ya servía la versión nueva (Content-Signal y cabecera `Link` presentes) y el pie ya traía "Términos" (`/terminos/`) y "Contacto" (`tel:`). El escáner no los reconoció.
- Ningún enlace de la portada tenía "contact" en su dirección (el único era `tel:`), y el de términos decía solo "Términos" con la dirección `/terminos/`. Es la explicación más probable, pero no se pudo comprobar contra el escáner: se verificará al volver a escanear tras redesplegar.
- Solo existe un buzón real (`privacidad@rauvia.com.mx`); no se inventó otro.
- `/contacto` estaba retirada (410, `RETIRED_PATHS` en `server/seo/legacyRoutes.ts`). Por indicación del dueño ahora redirige con 301 a `/contacto-rauvia/` (entrada en `REDIRECT_PATHS`); `/contacto-anterior` sigue en 410.

**Cambios**

- `/contacto` y `/contacto/` → 301 a `https://rauvia.com.mx/contacto-rauvia/`.
- Nueva página `/contacto-rauvia/` (`src/pages/ContactoPage.tsx`): WhatsApp, teléfono, correo de privacidad y redes, con los datos públicos reales; sin dirección ni horarios inventados. SEO propio con esquema `ContactPage`. Registrada en `routeSeo.js`, `routeLoader.ts` y `webmcp.ts`.
- Pie de todas las páginas: "Contacto" ahora enlaza a `/contacto-rauvia/` (`rel="contact"`), "Términos y condiciones" con título completo, y el teléfono sigue visible como enlace `tel:`.
- `data/sitemap-cache.xml` incluye la URL nueva (la prueba del sitemap de respaldo la exige).
- Baselines refrescadas con motivo: 1 cambio semántico (la ruta nueva) y el texto del pie en el HTML excluido.

**Verificación:** lint sin errores; `npm test` 546 bien, 0 fallas (solo el TODO de aprobación visual del Hero); evidencia 56 filas, 0 hallazgos; `/contacto-rauvia/` responde 200 y `/contacto/` sigue en 410.

## 6. Notas de operación

- Congeladas: `node scripts/refresh-baselines.mjs` (simulacro) y `--write --reason "…"` (registra en `tests/fixtures/BASELINE_LOG.md`).
- Tras compilar o probar, restaurar `docs/v72-evidencias/bundle-graph.json` y `data/sitemap-cache.xml` con `git checkout`.
- `npm run evidence:hero` usa `dist/`; ejecutarlo después de una compilación reciente (`npm run test:ci` ya compila). Falla si hay elementos interactivos recortados horizontalmente en móvil.
- Regla global a recordar: `.rv-main-site main a:not([class*=flex]):not([class*=block])` fuerza `inline-flex`; añade `flex` o `block` en la clase cuando el enlace deba ser de bloque.
- Producción (Hostinger) no despliega sola: sigue sirviendo la versión anterior hasta redesplegar (`dist/server.cjs`).

## 7. Pendiente de decisión

- Hacer commit y push de las 10 landings y de esta bitácora.
- Redesplegar en Hostinger.
- Dirección real para el esquema de organización (hoy solo país).
- Redesplegar y volver a pasar el escáner para confirmar que ya detecta contacto y términos.
- Quitar la dependencia `react-router@8` si nada fuera de `src/` la usa.
- Depurar las 161 etiquetas de WordPress (muchas con una sola entrada).
- Aprobación visual del Hero (prueba TODO).
- Extender la capa frontera al resto de páginas.
- Añadir teléfono o contacto a `llms.txt` / `organization.json` (toca archivos de conocimiento: requiere autorización).
