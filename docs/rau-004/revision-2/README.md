# RAU-004 — Revisión 2 contra el mockup aprobado

Fecha: 2026-11-02. Base inmutable: `main@75273e3951568849cb8d37e980f599351acc2cae`. PR: [#7](https://github.com/raumor911/rauvia-platform/pull/7). Continúa la misma rama aislada; sin cambios en main, PR #6 o producción.

## Resultado visual

Se cotejó el archivo adjunto real de 1664×945, conservado en `approved-mockup.png`. La implementación incorpora:

1. Línea introductoria azul con trazo horizontal: «CONSULTORÍA PARA PYMES Y EMPRESAS B2B».
2. Título distribuido en cuatro líneas de escritorio y CRECER en azul; copy real y CTA secundario de texto, como en la referencia.
3. SVG original con mayor presencia, cinco capacidades en HTML legible y separador junto a la oferta; tres columnas desde 1024 px.
4. Tarjeta clara de Frente Comercial, borde suave, oferta y «Desde $6,900 MXN + IVA» intactos.
5. Banda inferior enmarcada con libro, encabezado, descripción y botón «Ir a Recursos», más acceso a la siguiente sección.
6. Encabezado de home con marco del logotipo y proporciones cercanas al mockup. El archivo de logotipo oficial no fue sustituido.

El párrafo «Primero identificamos dónde está la restricción…» se conserva visible inmediatamente después del Hero, para respetar la composición de un párrafo de la referencia. La regresión verifica que sigue apareciendo una sola vez. No se ocultó texto comercial a buscadores o usuarios.

**Fidelidad:** estructura, jerarquía, contenido de la referencia, paleta y distribución cotejados visualmente. **No se declara identidad píxel a píxel ni una puntuación de 100%:** se conservan la tipografía heredada y el arte oficial del SVG, que difieren del raster conceptual del mockup. También permanece el asistente global existente. El [comparador con deslizador](comparison.html) y las dos imágenes sin retoques permiten revisar esas diferencias al mismo tamaño. No se calcula un porcentaje engañoso mezclando variación de animación con diferencia de diseño.

## Animación y accesibilidad

El SVG `/media/aethryon-convergence-animated-optimized-v73.svg` permanece byte a byte idéntico al original. Se carga dentro de un viewport SVG `240 150 760 800`: únicamente encuadra el núcleo, sin reemplazar su arte, filtros ni animaciones. Las etiquetas integradas del archivo quedan fuera de ese encuadre y se presentan como lista HTML, con el texto real del SVG y del mockup.

La animación se mantiene también en móvil; la preferencia de movimiento reducido se respeta mediante la regla interna que el SVG original ya contiene. No se fuerza animación a quien ha pedido reducir movimiento. La variante anterior que seleccionaba WebP móvil deja de usarse en este Hero. El recurso se precarga con prioridad alta; mide 196,348 bytes sin compresión y permanece igual en las diez pruebas.

`animation-frame-1.jpg`, `animation-frame-2.jpg` y `animation-verification.json` comprueban movimiento: 10,746 píxeles del núcleo cambiaron por encima de un umbral RGB total de 30, con el mismo encuadre y escala. `animation-live.gif` es una secuencia de 16 capturas reales de aproximadamente un segundo, sin síntesis de cuadros. Los tiempos y encuadre están en `animation-capture.json`.

Se verificaron un H1, enlaces nativos con nombres accesibles, lista de capacidades, controles de al menos 44 px, foco visible de 3 px, Enter hacia Recursos, menú con Enter/Escape y devolución del foco. Sin errores ni advertencias de consola observados en esa sesión. No es una certificación WCAG ni una auditoría completa con lector de pantalla. No se emuló la preferencia de movimiento reducido; se verificó su regla en el SVG original.

## Responsive a zoom 100%

Chrome local, DPR 1; ancho y alto reales medidos. Además de los seis anchos solicitados y del tamaño exacto del mockup, se probaron 1366×768, 1440×768 y 1920×900. La ventana baja usa un tratamiento compacto por altura, conservando lectura y proporción del SVG. El alto incluye espacio reservado al encabezado y el Hero completo, con banda y flecha. La composición cabe en todos los viewports de tablet y escritorio probados. En móvil se conserva scroll vertical para mantener lectura y todos los bloques; no se usa zoom reducido, recorte de contenido o escalado global.

| Viewport | Alto del Hero | Composición | Overflow horizontal |
| --- | ---: | --- | --- |
| 360×800 | 1721 px | Scroll vertical | No |
| 390×844 | 1699 px | Scroll vertical | No |
| 768×1024 | 1008 px | Completa | No |
| 1024×768 | 672 px | Completa | No |
| 1440×900 | 831 px | Completa | No |
| 1664×945 | 883 px | Completa | No |
| 1920×1080 | 910 px | Completa | No |
| 1366×768 | 633 px | Completa | No |
| 1440×768 | 621 px | Completa | No |
| 1920×900 | 822 px | Completa | No |

`after-{ancho}.jpg` muestra el viewport. `composition-{360,390,768}.jpg` muestra la composición completa; no se presenta como si cupiera en la altura de un móvil. `viewports.json` registra los límites de cada bloque y cada enlace.

## Seguridad aplicada

Versiones verificadas en el registro npm; resolución íntegra en `package-lock.json`, comprobada con instalación limpia. Las versiones resueltas superan o igualan las mínimas solicitadas.

| Paquete | Antes | Resuelto | Integración |
| --- | --- | --- | --- |
| body-parser | 2.3.0 | **2.4.0** | Override compatible con Express 5.2.1 |
| vite | 8.3.0 | **8.3.5** | Rango mínimo ^8.3.3 |
| zod | 3.25.76 | **4.6.6** | Puppeteer 25.16.0 → chromium-bidi 157.0.8090-0, que declara Zod ^4.6.5; versión fijada mediante override |
| minimatch | 10.2.6 | **11.0.1** | Compatible con Glob 14; override |
| glob | 13.0.6 | **14.0.3** | Rango mínimo ^14.0.2; migrado import del auxiliar fix-pages a globSync, sin ejecutar ese mutador |
| qs | 6.16.0 | **6.16.1** | Override compatible con body-parser actualizado |
| sanitize-html | 2.17.7 | **2.18.1** | Corrige los avisos solicitados y evita instalar 2.18.0, afectada por otro aviso de recursión |

`npm audit` completo: **11 → 0 vulnerabilidades conocidas reportadas**. `npm audit --omit=dev`: **0**. Son resultados de ese registro y momento, no una garantía universal de ausencia de vulnerabilidades. El escáner agrupa paquetes afectados y sus padres; sus 11 entradas no equivalen al número de CVEs de la lista del usuario.

No se sobrepuso Zod 4 a un consumidor que exige Zod 3: primero se actualizó Puppeteer y su consumidor BiDi. Una prueba ejecuta el parser BiDi real con argumentos válidos e inválidos. La sanitización de contenido no confiable de WordPress permanece separada del activo SVG oficial, así que actualizar sanitize-html no elimina su animación.

Evidencia: `registry-verification.json`, `resolved-security-packages.json` (versiones, integridad y origen), `dependency-tree.txt`, `audit-before.json`, `audit-after.json`, `audit-production.json`.

### Fuentes oficiales consultadas

- [Express: actualización body-parser / CVE-2026-111181](https://expressjs.com/en/blog/2026-10-31-security-releases/).
- [Vite: changelog oficial](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md) y [aviso de fs.allow](https://github.com/vitejs/vite/security/advisories/GHSA-rq7h-c2jc-7f22).
- [Zod: releases y arreglo de validación de colecciones](https://github.com/colinhacks/zod/releases).
- [Minimatch: GHSA-g3hv-75wg-m249](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249).
- [Glob: GHSA-3g3m-2fjr-6pw4](https://github.com/isaacs/node-glob/security/advisories/GHSA-3g3m-2fjr-6pw4).
- [QS: GHSA-6pq8-jhm2-2vcw](https://github.com/ljharb/qs/security/advisories/GHSA-6pq8-jhm2-2vcw).
- [sanitize-html: aviso adicional de 2.18.0 y versión 2.18.1](https://github.com/apostrophecms/apostrophe/security/advisories/GHSA-c9rx-x947-fp3h).

## Pruebas y reproducibilidad

Node 24.12.0. Instalación limpia con `PUPPETEER_SKIP_DOWNLOAD=true npm ci --cache /tmp/rauvia-rau004-npm --no-audit --no-fund` (usa Chrome ya instalado para QA; no descarga otro navegador). El postinstall ejecuta el build de producción. El lockfile se regeneró con npm y se reinstaló íntegramente.

- Build/prerender y `npm run lint`: PASS. Advertencias preexistentes de Vite configLoader e import.meta/CJS se conservan.
- `node --test tests/rau004-regression.test.mjs tests/security-updates.test.mjs`: **32/32 PASS**. Incluye los 24 checks de SEO/contenido/medios contra main y ocho pruebas de parser, QS, sanitización, recursión, Zod, Glob, Minimatch y consumidor BiDi.
- `npm run test:seo`: **51/51 PASS**.
- `npm run test:redirects`: **8/8 PASS**.
- `node --test tests/v73-stabilization.test.mjs`: **44/44 PASS**. Se actualizó únicamente la aserción del icono secundario a su texto: la referencia aprobada usa CTA de texto, sin PlayCircle. Se conservan enlace y semántica.
- `npm run test:wordpress-sync`: **10/10 PASS**.
- `npm run test:resources-performance`: **11/11 PASS**.

**156 pruebas aprobadas en esas suites**, más build/tipado y QA visual. Se repitieron también las suites históricas: mobile-experience 4 PASS/1 FAIL y AETHRYON 6 PASS/2 FAIL/1 omitida. Los tres fallos de fixtures históricos registrados en la revisión 1 son preexistentes: dos metadatos anteriores a las URLs con barra final y un hash de landing anterior; sus fixtures no se reescribieron. No se presenta el repositorio como una suite global totalmente verde.

Express/sendFile rechaza servir el checkout bajo `.codex` por su política de dotfiles; para QA se copiaron los mismos bytes compilados a `/tmp/rau004-runtime/dist`, sin cambiar el servidor. Las capturas se obtuvieron con CUA en Chrome; no son renders sintéticos. Los logs de las pruebas y builds están en este directorio. Se aplicó la revisión React: sin nuevos efectos, consultas o dependencias visuales; lista con claves estables, semántica y CSS acotado al Hero/home.

## Entrega

PR #7 actualizado con implementación, seguridad, capturas, comparador, GIF y evidencia. No hubo merge ni despliegue. PR #6 sigue independiente, sin sobrescritura. La aceptación visual final puede revisarse en el comparador y las capturas a escala común; no se etiqueta como 100% idéntico sin esa evidencia.
