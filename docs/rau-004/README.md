# RAU-004 — Hero compacto de RAUVIA

Fecha: 2026-11-02. Base: `main@75273e3951568849cb8d37e980f599351acc2cae`. Rama: `feat/rau-004-compact-hero-20261102`.

El Hero anterior requería 1,185 px de alto a 1440 px y desplazaba la oferta a una segunda fila a 1024 px. Ahora presenta copy, AETHRYON y Frente Comercial en tres columnas desde 1024 px, con fondo blanco y una banda enlazada a `/recursos/`: **Explora nuestro conocimiento**. El título fluye sin saltos forzados y el gráfico usa su proporción real, en lugar de alturas de 550/700 px.

## Identidad y contenido

Se conservan tokens azul marino `#0A2540` y azul `#1E4A74`, la familia tipográfica heredada, el logotipo oficial, todos los párrafos y CTAs del Hero, el evento comercial y **Desde $6,900 MXN + IVA**. Los archivos originales de medios permanecen idénticos, ver hashes en `tests/fixtures/rau004-main-baseline.json`.

Se conserva el SVG animado oficial de AETHRYON en escritorio. En móvil se conserva la entrega WebP responsive existente y su lista de capacidades se compacta a dos columnas; la preferencia de movimiento reducido selecciona un WebP estático. No se añaden fuentes, librerías, imágenes de terceros ni nuevos precios.

## Referencia visual y límites

La conversación `6ae903ea-dad4-83e8-b97e-7053bc3a8b70` permitió recuperar la captura del sitio anterior, pero **no el archivo de la última imagen generada**. Se implementó la descripción explícita del usuario: fondo blanco, colores RAUVIA, tres bloques y banda inferior. No se afirma una comparación píxel a píxel con la imagen aprobada ausente. Las capturas de este directorio son de la aplicación real compilada.

## Coordinación con RAU-001

El [PR #6](https://github.com/raumor911/rauvia-platform/pull/6) permanece abierto en borrador en `audit/rau-001-frontend-baseline-20261102@15703a5e6f4abeb5e72537d0b88dee979f0d3b3c`; solo agrega su documento de auditoría. RAU-004 parte del mismo main, no modifica esa rama ni ese documento y entrega evidencia runtime complementaria a RAU-002. No pretende cerrar la deuda global F01–F12. Los cambios de CSS están limitados al Hero y sus clases; ninguna otra sección o ruta cambia su contenido.

## Prueba visual a zoom 100%

Chrome local, dispositivo emulado mediante ancho/alto de viewport; `devicePixelRatio=1`. No se redujo el zoom para lograr el resultado. Las medidas incluyen el espacio reservado al encabezado fijo y, en la versión nueva, la banda inferior. No son datos de producción ni métricas Core Web Vitals.

| Viewport | Alto anterior | Alto nuevo | Composición en viewport | Overflow horizontal |
| --- | ---: | ---: | --- | --- |
| 360×800 | 1997 px | 1653 px | Scroll vertical | No |
| 390×844 | 1932 px | 1627 px | Scroll vertical | No |
| 768×1024 | 2199 px | 1001 px | Sí | No |
| 1024×768 | 1535 px | 679 px | Sí | No |
| 1440×900 | 1185 px | 635 px | Sí | No |
| 1920×1080 | 1113 px | 645 px | Sí | No |

En móvil no es razonable comprimir todos los textos reales en una sola pantalla de 800/844 px sin degradar la lectura: se conserva scroll vertical normal a zoom 100%, sin recortes, escalado global ni alturas fijas. La composición completa cabe desde el viewport de tablet probado. No se promete que quepa en cualquier altura de ventana.

- Capturas `before-{ancho}.jpg` y `after-{ancho}.jpg`: viewport, seis anchos.
- `after-360-composition.jpg`, `after-390-composition.jpg`, `after-768-composition.jpg`: composición completa, no son viewports móviles de esa altura.
- `before.json` y `after.json`: medidas, fuentes, medios cargados, precio, encabezado único y enlaces (JSON de after).
- `keyboard-focus.jpg` e `interaction-checks.json`: foco, navegación con Enter y menú móvil con Enter/Escape.

## Accesibilidad

Un H1 preservado, región Hero con nombre, enlaces nativos y nombres explícitos, iconos decorativos ocultos, cinco capacidades disponibles como lista HTML en el árbol accesible de escritorio. Foco visible de 3 px comprobado con Shift+Tab; Enter lleva a Soluciones. Menú móvil abre con Enter, cierra con Escape y devuelve foco. En los seis tamaños todos los enlaces del Hero miden al menos 44 px de alto. No se observaron errores ni advertencias de consola en la sesión de interacción.

La selección estática para movimiento reducido se verificó en fuente; no se emuló esa preferencia. No se realizó auditoría completa con lector de pantalla ni certificación WCAG; siguen vigentes los límites globales del PR #6.

## Validación

- `npm ci --cache /tmp/rauvia-rau004-npm --no-audit --no-fund`: instalación limpia; postinstall construye la app.
- `npm run build`: PASS; 23 rutas prerenderizadas más 404. Advertencias preexistentes de Vite/configLoader y `import.meta` al emitir CJS.
- `npm run lint`: PASS (tipado TypeScript).
- `node --test tests/rau004-regression.test.mjs`: **24/24 PASS**. Compara metadatos, canonical, JSON-LD, H1 y contenido fuera del Hero contra el main actual en 23 rutas; verifica hashes de cuatro medios y la oferta.
- `npm run test:seo`: **51/51 PASS** (15 + 36).
- `npm run test:redirects`: **8/8 PASS** (7 + 1).
- `node --test tests/v73-stabilization.test.mjs`: **44/44 PASS**.
- `node --test tests/mobile-experience.test.mjs`: **4 PASS, 1 FAIL preexistente**. El hash congelado de `/sitio-web-comercial-para-pymes/index.html` espera `a28f20…`, pero main y RAU-004 producen el mismo `84ab8f…`.
- `npm run test:aethryon`: **6 PASS, 2 FAIL preexistentes, 1 omitida**. Las dos fallas comparan JSON-LD con snapshots previos a las barras finales de URLs; se reprodujeron en main sin RAU-004. La prueba HTTP opcional no se activó; las rutas se comprobaron en las suites SEO/V73.

Los baselines históricos no fueron reescritos. Los logs completos y las reproducciones de main están en `evidence/*.txt`. La revisión React comprobó componentes sin nuevos efectos/consultas, claves estables, enlaces semánticos y ausencia de dependencias nuevas.

## Reproducción y entorno

El checkout vive bajo `.codex`, un directorio oculto. Express/sendFile rechaza servir ese camino por su política de dotfiles. Para QA se copiaron **los mismos bytes de dist** a `/tmp/rau004-runtime/dist`, enlazando las dependencias y fuentes necesarias para las pruebas. El baseline se compiló con `git archive` de main en `/tmp/rau004-baseline-source` y el mismo lockfile/dependencias. No se modificó el servidor para eludir esa política. Chrome se controló mediante CUA; el intento de iniciar Chrome headless desde la terminal restringida no pudo ejecutarse y no se cuenta como prueba visual.

Para repetir fuera de un directorio oculto: instalar, compilar, ejecutar las suites anteriores y arrancar `PORT=3135 NODE_ENV=production SITEMAP_REFRESH_ON_START=false node dist/server.cjs`. Abrir `/` en Chrome a zoom 100%; probar los seis viewports de la tabla, verificar `innerWidth/innerHeight`, `scrollWidth <= innerWidth`, todos los destinos y foco de teclado. El fixture de regresión registra el SHA de origen; no es una nueva aprobación de branding.

## Entrega

Implementación y evidencia para revisión en PR. No se hizo merge, no se alteró main, no se desplegó producción ni se modificó PR #6.
