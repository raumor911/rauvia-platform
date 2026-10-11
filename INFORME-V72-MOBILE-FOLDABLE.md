# RAUVIA V72 — Mobile & Foldable Experience Layer

Entrega local del 2 de octubre de 2026. Fuente completa y producción compilada; no publicada.

Las ocho páginas principales recibieron una capa responsive común y ajustes propios de lectura e interacción. Se conservan el contenido de V71, los destinos y metadatos. Ruta 90 mantiene su condición de método adoptado por RAUVIA; no se atribuye su creación a RAUVIA ni a Raúl Morales.

La matriz final contiene 104 combinaciones únicas sin desbordamiento horizontal del documento ni controles visibles fuera del viewport. Las suites finales ejecutaron 86 pruebas (80 únicas por repetición de seis unitarias), sin fallos ni omisiones. Hay dos fallos preexistentes del auditor de entidades, documentados abajo. No se certifican dispositivos físicos, bisagras reales ni Core Web Vitals de campo.

Lectura del rendimiento: se redujo el JS inicial de las ocho páginas; Recursos queda en 251.4 kB gzip, ligeramente sobre la preferencia de 250 kB. Las ocho cargas móviles iniciales del laboratorio quedaron entre 624 y 1104 ms de LCP y CLS cero. Inicio de escritorio presenta regresión de LCP frente a V71; Soluciones y Nosotros todavía superan 2.5 s en esta muestra. Los resultados son observaciones únicas de laboratorio, no percentiles ni una garantía de producción.

Los datos canónicos se encuentran en `docs/v72-evidencias/`. Los archivos intermedios de optimización y capturas nativas inválidas no se incluyen en el paquete.

## 1. Baseline técnico V71/V72

Referencia: `rauvia-platform-v71.zip`, SHA-256 `b29a4bcba9c27cb04747a6655a737e9a1e4e5fd156495822bf1d906ac657d19f`. Los tamaños V71 proceden de su `dist` original: JS 1,295,590 bytes sin comprimir / 366,469 gzip; CSS 208,838 / 34,641 gzip. Compresión reproducible gzip nivel 9, suma de archivos únicos del cierre de ruta, no suma de todos los chunks del sitio.

Se reconstruyó adicionalmente un grafo V71 desde su fuente para conocer pertenencias; esa reconstrucción no reemplaza los tamaños originales. V72: 51 chunks JS en el grafo, carga independiente por ruta y CSS propio cuando corresponde. React, Vite y Express permanecen; lockfile y dependencias sin cambios. Archivos: `baseline-build-weights.json`, `bundle-graph-v71-rebuilt.json`, `source-changes.json`.

## 2. Viewport audit

Ocho páginas × trece tamaños: 320×568, 360×800, 375×812, 390×844, 393×852, 430×932, 844×390, 932×430, 700×900, 850×1000, 768×1024, 1024×768 y 1440×1000. Navegador principal: Chromium/Chrome 154 en macOS.

`matrix-final.json`: 104 claves únicas, un H1 y un title en head por vista; overflow del documento = 0; controles interactivos visibles dentro del ancho y sin objetivos inferiores al mínimo de 44 px, con tolerancia subpíxel de 0.5 px. Se inspeccionaron rectángulos de hijos, además de scrollWidth. Esto verifica geometría; no equivale a un toque físico ni a toda la superficie de cada dispositivo.

## 3. Inventario vh / svh / dvh

Lectura principal: `min-height:100svh`, incluyendo wrappers heredados con min-h-screen. Heroes móviles usan altura natural, sin ocupar obligatoriamente una pantalla. Drawer: `height:100vh` como fallback, seguido de `100dvh`; scroll interno y overscroll contenido. Asistente: max-height `calc(100dvh - 112px - safe areas)` y ajuste VisualViewport mientras está abierto. Su rama excluida conserva el 85vh previo. La rama vertical de segmentos limita el pane a `viewport-segment-height`. No se sustituyó todo uso histórico de vh fuera del alcance.

`svh` estabiliza el mínimo con barras visibles y `dvh` permite ajustar superficies superpuestas a la altura dinámica; la compatibilidad se trata con fallback. [W3C CSS Values](https://www.w3.org/TR/css-values-4/#viewport-relative-lengths).

## 4. Safe areas

`viewport-fit=cover` se agrega sólo a las ocho páginas. Header aplica top/left/right; contenido aplica left/right; footer bottom; drawer los cuatro lados; asistente bottom/right y altura disponible. Los offsets de ancla suman header y safe-area superior. Las pruebas de navegador reportan insets cero en desktop: la rama está implementada, pero notch, Dynamic Island y barras del sistema requieren validación física.

## 5. Navbar móvil

Nuevo MainNavbar renderizado sólo en las rutas principales; rama legacy retenida para landings y páginas excluidas. Menú en portal fuera del root: evita límites geométricos de ancestros. Panel modal con navegación nativa; root inert, body fijo y overflow bloqueado, posición de lectura restaurada al cerrar.

Ocho recorridos finales a 390×844: abrir enfoca Cerrar; Shift+Tab llega a CTA final; Tab vuelve a Cerrar; Escape devuelve foco al botón de apertura y libera inert/bloqueo. También cierre por exterior, enlace, historial y cambio a desktop. `menu-final.json`, `navigation.json`, `keyboard-and-orientation-final.json`.

## 6. Touch audit

Botones, enlaces, summary y select principales tienen mínimos de 44×44 px; iconos sociales y toggle usan cajas explícitas. touch-action:manipulation en controles. Sin controles visibles fuera del ancho en las 104 vistas ni elementos ocultos del catálogo que conserven foco en quince estados. No se hizo envío real de WhatsApp ni del asistente. Pulgar, precisión del dedo y gestos del sistema siguen pendientes.

## 7. Typography audit

Body móvil 16 px con interlineado 1.65; H1 32–38 px y 32 px en AETHRYON; H2 general 28 px o 26 px a 320 px; introducciones Ruta 90 18 px. Se eliminan saltos forzados del hero Inicio/Nosotros sólo en móvil. Catálogo admite quiebres de palabras cuando son necesarios y a menos de 375 px utiliza una columna. Inputs del asistente 16 px para evitar el zoom por tipografía pequeña en iOS; comportamiento iOS real pendiente. Se preservan H1/H2/H3 y no se convierte todo en texto pequeño para encajar.

## 8. Transformación de tablas

Soluciones: una tabla semántica, thead accesible y relaciones de encabezado conservadas, filas como tarjetas con prefijos data-label en móvil. Sin duplicar dos versiones del contenido. Ruta 90: revisión mantiene dos columnas legibles; Plan anual conserva comparación de tres columnas dentro de región local horizontal focusable con nombre/caption, mínimo 560 px. ArrowRight cambió scrollLeft de 0 a 40 en una región de 350 px; documento sin overflow. `table-keyboard.json`. La lectura con VoiceOver/TalkBack de tablas transformadas está pendiente.

## 9. Deep-link audit

Acceso directo a las ocho páginas sin visitar Home; pruebas HTTP del servidor compilado y navegación. Soluciones `#catalogo` y nueva ancla `#soluciones-comparacion`; AETHRYON conserva sus IDs; Ruta 90 `#componentes` se comprobó a 390, 844 landscape y 850: heading visible debajo de header/progreso y capítulo seleccionado. Back/Forward conserva destinos. Hash inválido se decodifica con guard; no rompe la navegación. Aliases históricos Ruta 90 pasan las pruebas de redirección a fragmento canonical.

## 10. Anchor audit

ScrollToTop actúa después del commit del componente de ruta asíncrono. IDs existentes y enlaces se conservan. scroll-margin combina altura de header y 20 px; navegación de capítulos Ruta 90 recibe el mismo offset. No se cambia la URL según dispositivo. En caso de dos segmentos verticales declarados, se reinicia también el pane principal de scroll. Esta última rama carece de prueba física.

## 11. Bundle graph

`bundle-graph.json` contiene cada chunk, raw/gzip, imports estáticos, imports dinámicos y módulos. El entry V72 ya no importa estáticamente todas las páginas. Los cierres de carga se resuelven desde `dist/.vite/manifest.json`. Hay dependencias compartidas de React/router, navegación, analítica y asistente; PageMetadata y runtime JSX se comparten. Motion permanece en el cierre de ciertas rutas por compatibilidad legacy. El grafo muestra esta deuda en lugar de ocultarla.

## 12. Dependency graph

`dependency-graph.json` registra los módulos fuente y sus imports dentro del resultado compilado. No se agregó dependencia de detección de dispositivos ni carousel. El asistente y react-markdown siguen en el entry compartido. FadeInUp evita animación de entrada en páginas principales, pero retiene la implementación anterior fuera del alcance. Deferred getPosts en Recursos sólo cuando falta bootstrap inicial; WordPress, caché y servidor no se rediseñaron.

## 13. Route ownership

| Ruta | Componente | JS inicial gzip kB |
|---|---|---|
| / | HomePage | 200.6 |
| /soluciones/ | SolucionesPage | 205.8 |
| /aethryon/ | AethryonPage | 164.7 |
| /ruta-90/ | Ruta90Page | 160.8 |
| /frente-comercial/ | FrenteComercialPage | 163.0 |
| /nosotros/ | NosotrosPage | 198.5 |
| /recursos/ | RecursosPage | 251.4 |
| /casos/ | CasosIndexPage | 195.8 |

`route-ownership.json` incluye cada archivo JS/CSS del cierre; el registro contiene 22 loaders, incluyendo posts dinámicos y 404. Las rutas excluidas se separan para evitar que sus imports exclusivos entren en las principales, con HTML normalizado preservado.

## 14. Code splitting aplicado / rechazado

Aplicado: imports dinámicos por página, React.lazy para navegación posterior, preload de la ruta inicial antes de createRoot, manifest para preloads/CSS de cada HTML prerenderizado. Rechazado en esta entrega: splits manuales especulativos por vendor, duplicación de app móvil, librerías de folding y carga global de todas las rutas.

No se migró a hydrateRoot. El HTML estático queda visible durante la resolución de la primera ruta y luego se monta el cliente; esta arquitectura conserva una deuda de remount, no se presenta como hidratación nueva. Si falla el primer chunk, el HTML conserva lectura pero faltan interacciones React. [React lazy](https://react.dev/reference/react/lazy), [Vite manifest](https://vite.dev/guide/backend-integration).

## 15. Justificación de arquitectura

El grafo previo concentraba las páginas en un único JS. La separación por ruta reduce carga inicial y mantiene el mismo HTML semántico para todos los dispositivos. Se cargan los imports estáticos del cierre de ruta por adelantado para evitar una cascada innecesaria; no se precargan todos los dynamicImports. La capa responsive sólo se activa en `.rv-main-site`. Esta excepción de infraestructura es necesaria para descargar las landings del entry, sin cambiar su diseño ni contenido.

## 16. JS antes / después

| Ruta | V71 raw kB | V71 gzip kB | V72 raw kB | V72 gzip kB | Reducción gzip |
|---|---|---|---|---|---|
| / | 1295.6 | 366.5 | 661.8 | 200.6 | 45.3% |
| /soluciones/ | 1295.6 | 366.5 | 683.6 | 205.8 | 43.8% |
| /aethryon/ | 1295.6 | 366.5 | 564.2 | 164.7 | 55.1% |
| /ruta-90/ | 1295.6 | 366.5 | 538.0 | 160.8 | 56.1% |
| /frente-comercial/ | 1295.6 | 366.5 | 549.7 | 163.0 | 55.5% |
| /nosotros/ | 1295.6 | 366.5 | 657.3 | 198.5 | 45.8% |
| /recursos/ | 1295.6 | 366.5 | 801.6 | 251.4 | 31.4% |
| /casos/ | 1295.6 | 366.5 | 647.1 | 195.8 | 46.6% |

La preferencia inicial <250,000 bytes gzip se cumple en siete rutas. Recursos: 251,361 bytes, 1,361 sobre la preferencia; su contenido editorial permanece compartido con renderer. El objetivo es orientativo; la excepción se declara. Estos pesos de cierre no equivalen a bytes HTTP totales ni incluyen imágenes.

## 17. CSS antes / después

| Ruta | V71 gzip kB | V72 gzip kB |
|---|---|---|
| / | 34.6 | 16.6 |
| /soluciones/ | 34.6 | 16.6 |
| /aethryon/ | 34.6 | 17.1 |
| /ruta-90/ | 34.6 | 18.6 |
| /frente-comercial/ | 34.6 | 16.6 |
| /nosotros/ | 34.6 | 16.6 |
| /recursos/ | 34.6 | 16.6 |
| /casos/ | 34.6 | 16.6 |

CSS general V72: 16,595 bytes gzip; AETHRYON agrega 505 y Ruta 90 1,971. Menos CSS inicial por diferir páginas; no implica que el conjunto de archivos de todas las rutas sea menor. No se eliminan estilos fuera del alcance.

## 18. HTML antes / después

| Ruta | V71 raw / gzip kB | V72 raw / gzip kB |
|---|---|---|
| / | 38.0 / 7.2 | 37.3 / 7.5 |
| /soluciones/ | 46.4 / 8.9 | 47.2 / 9.3 |
| /aethryon/ | 59.3 / 10.7 | 58.2 / 10.8 |
| /ruta-90/ | 43.6 / 10.3 | 42.7 / 10.4 |
| /frente-comercial/ | 51.1 / 8.9 | 52.8 / 9.3 |
| /nosotros/ | 28.1 / 6.2 | 27.1 / 6.3 |
| /recursos/ | 357.9 / 66.0 | 355.8 / 66.0 |
| /casos/ | 15.3 / 4.0 | 14.3 / 4.0 |

Los modulepreloads, picture, dimensiones y atributos accesibles pueden aumentar gzip aunque el raw baje. Recursos conserva bootstrap editorial y HTML amplio: 355,834 bytes raw / 65,976 gzip. No se sacrificó contenido inicial para reducir artificialmente la medida.

## 19. Requests antes / después

| Ruta | Phone V71 → V72 | Desktop V71 → V72 |
|---|---|---|
| / | 17 → 20 | 17 → 25 |
| /soluciones/ | 17 → 25 | 17 → 25 |
| /aethryon/ | 16 → 21 | 15 → 21 |
| /ruta-90/ | 12 → 16 | 12 → 16 |
| /frente-comercial/ | 10 → 19 | 10 → 19 |
| /nosotros/ | 14 → 16 | 14 → 17 |
| /recursos/ | 19 → 18 | 19 → 23 |
| /casos/ | 10 → 13 | 10 → 13 |

Cuenta ResourceTiming hasta el cierre de observación, excluye navegación HTML y comprende solicitudes observadas, incluyendo recursos lazy próximos al viewport, analítica/Geo existentes y fuentes externas. Más chunks implican más requests en varias rutas aunque menos JS. No es la cuenta estricta de recursos bloqueantes. CSV conserva todas las fases; transferSize/encoded=0 de cross-origin sin TAO significa desconocido, no gratis ni caché segura.

## 20. Image strategy

Home y Soluciones usan picture con variantes WebP 640/960 hasta 1023 px; escritorio conserva el arte original/animado. Las cuatro derivadas pesan 64,936 / 109,752 y 11,406 / 19,674 bytes. Los originales suministrados permanecen sin cambios.

Inicio desktop usa una copia SVG optimizada: elimina sólo la URI base64 duplicada xlink:href y retiene href, PNG, textos y CSS animado. 498,057 → 253,759 bytes raw; 370,954 → 187,024 gzip. Raster de control 640 idéntico píxel a píxel; esto no reemplaza compatibilidad visual/animación en otros motores. `svg-optimization.json`.

Imágenes con dimensiones, decoding async y lazy debajo del primer contenido. Home/Sol hero eager y prioridad alta después de observar IMG como candidato; Ruta 90 primera lámina eager/high y otras nueve lazy. Las diez láminas y su orden permanecen iguales. Blueprint del footer lazy, todavía pesado: deuda abierta.

## 21. Preload strategy

HTML de cada ruta incorpora closure de módulos y CSS deduplicado. Se retiraron precargas automáticas innecesarias de imágenes debajo del fold usando lazy, incluyendo el footer. Logo conserva preload; Ruta 90 conserva el preload responsive de la primera lámina. Heroes picture Home/Sol se descubren en HTML con eager/high; evita precargar el SVG de escritorio en teléfono. Tests verifican archivos reales y links únicos. No se hacen preload de todas las rutas ni de todos los slides.

## 22. Font strategy

Stack del sitio basado en fuentes del sistema; no se agregaron archivos font, Google Fonts ni dependencia tipográfica. SVG conserva sus familias Inter/Arial y fallback propio. No se observaron descargas de fuentes en las muestras. Comprobar substitución de fuente y ampliación de texto en dispositivos reales antes de aceptar la misma geometría como universal.

## 23. LCP candidates

| Ruta | V71 phone | V72 phone | V71 desktop | V72 desktop |
|---|---|---|---|---|
| / | H1 | H1 | H1 | IMG · aethryon-convergence-animated-optimized.svg |
| /soluciones/ | IMG · rauvia-solutions-hero-support-aethryon.svg | IMG · rauvia-solutions-hero-mobile-640.webp | IMG · rauvia-solutions-hero-support-aethryon.svg | IMG · rauvia-solutions-hero-support-aethryon.svg |
| /aethryon/ | H1 | H1 | IMG · aethryon-hero-orbital-v2-clean.svg | IMG · aethryon-hero-orbital-v2-clean.svg |
| /ruta-90/ | H1 | H1 | H1 | H1 |
| /frente-comercial/ | P | P | H1 | H1 |
| /nosotros/ | H1 | H1 | IMG · rauvia-nosotros-hero-structure.svg | IMG · rauvia-nosotros-hero-structure.svg |
| /recursos/ | IMG · Prospectos-que-no-avanzan-demanda-seguimiento-y-decision.png | IMG · Prospectos-que-no-avanzan-demanda-seguimiento-y-decision.png | IMG · Cuando-la-experiencia-se-comunica-como-catalogo.png | IMG · Cuando-la-experiencia-se-comunica-como-catalogo.png |
| /casos/ | P | H2 | P | P |

Inicio desktop cambió H1 → IMG al hacerse visible el hero inmediatamente. Por eso no se interpreta la comparación como el tiempo del mismo elemento. No se oculta ni difiere el elemento significativo para maquillar LCP. Recursos conserva candidatos externos de WordPress.

## 24. Lab performance

64 observaciones: ocho rutas × dos versiones × dos viewports × carga inicial/repetida. Chrome 154 macOS, 390×844 y 1440×1000; CPU sin throttling. Proxy local por origen, cola compartida de 200,000 bytes/s (~1.6 Mbps), 100 ms por request y gzip de texto/JS/SVG. Cola equitativa no reproduce prioridades HTTP reales. Fuentes externas WP y Geo existentes no están conformadas por esa cola. No es Lighthouse, dispositivo físico ni DevTools 4G preciso.

Un origen nuevo por intento cold; warm es recarga del mismo origen y puede retransmitir bytes/200, no se presume caché completa. Probe espera imágenes visibles completas y 1800 ms desde load/último LCP. Una muestra por celda: sin p75, intervalos, significancia o promesa de causalidad. `lab-network-stable.json` y `lab-results.csv` incluyen warm, FCP, candidato, CLS, requests y bytes conocidos.

| Ruta | Phone LCP ms V71 → V72 | Phone FCP ms V71 → V72 | Desktop LCP ms V71 → V72 | Desktop FCP ms V71 → V72 |
|---|---|---|---|---|
| / | 1148 → 724 | 1148 → 724 | 1112 → 2824 | 1112 → 760 |
| /soluciones/ | 3580 → 1104 | 948 → 904 | 3684 → 2856 | 1152 → 956 |
| /aethryon/ | 1068 → 728 | 1068 → 728 | 3732 → 2500 | 1212 → 700 |
| /ruta-90/ | 1216 → 916 | 1216 → 916 | 1356 → 792 | 1356 → 792 |
| /frente-comercial/ | 860 → 624 | 860 → 624 | 964 → 632 | 964 → 632 |
| /nosotros/ | 1324 → 740 | 1324 → 740 | 6904 → 4724 | 1904 → 808 |
| /recursos/ | 932 → 940 | 932 → 924 | 944 → 940 | 944 → 924 |
| /casos/ | 856 → 696 | 856 → 696 | 840 → 760 | 840 → 760 |

Regresión explícita: Home desktop LCP 1112 → 2824 ms, FCP 1112 → 760 ms. La copia SVG redujo el intento intermedio cercano a 3.9 s, pero no cumple aún la preferencia de 2.5 s. Soluciones 2856 ms y Nosotros 4724 ms también exceden esa preferencia. AETHRYON 2500 ms exactos. Recursos phone 932 → 940 ms no permite afirmar mejora; ocho milisegundos y una muestra no dan evidencia estadística.

Carga repetida, LCP ms (una recarga por combinación, no caché completa garantizada):

| Ruta | Phone V71 → V72 | Desktop V71 → V72 |
|---|---|---|
| / | 952 → 600 | 1024 → 2764 |
| /soluciones/ | 3640 → 984 | 3624 → 2712 |
| /aethryon/ | 964 → 692 | 3592 → 2452 |
| /ruta-90/ | 1012 → 760 | 1012 → 748 |
| /frente-comercial/ | 1396 → 732 | 924 → 596 |
| /nosotros/ | 1144 → 856 | 5980 → 4740 |
| /recursos/ | 920 → 856 | 924 → 820 |
| /casos/ | 816 → 964 | 824 → 832 |

## 25. CLS

Todas las muestras V72 phone cold y warm registraron CLS 0. V71 Nosotros phone: 0.1328406863; V72: 0. En desktop V72 cold, Home/Soluciones/Recursos ~0.000350 y Frente ~0.000350; restantes cero; warm cero. Valores dentro del objetivo 0.1 en estas observaciones. Dimensiones de imágenes y alturas naturales reducen inestabilidad observada. No se afirma CLS cero de campo ni sobre todas las interacciones posteriores.

## 26. Interaction performance

Recorrido final AETHRYON con menú, teclado, giro y disclosure: Event Timing registró cinco IDs de interacción no cero, duración máxima 48 ms; dos Enter 40 y 24 ms. Entradas pointerover sin interactionId no cuentan como INP. No se observaron long tasks en ese recorrido. `interaction-final.json` conserva registros y API soportada. Ninguna de estas observaciones constituye INP de campo ni Lighthouse TBT; CPU sin throttling. Separar envío del asistente/latencia del backend, no ejercitados.

## 27. iPhone-like QA

Geometría Chromium: 375×812, 390×844, 393×852 y 430×932 en todas las páginas; sin overflow y controles mínimos. Safari nativo macOS dio smoke limitado de Home, Soluciones, AETHRYON, Ruta 90, Nosotros y Recursos; Home incluye menú/Escape. Frente y Casos quedaron incompletos en esa revisión nativa y no se cuentan como aprobados. `safari-smoke-reviewed.json`. Safari macOS no equivale a Safari iOS, WKWebView ni Dynamic Island.

## 28. Landscape QA

844×390 y 932×430 en la matriz completa. Drawer 844×390: x460–844, altura390, scroll interno66; último CTA y326–370, completamente visible. Al cambiar a 1440×1000 el menú se cierra, libera body y elimina inert. Ruta 90 #componentes muestra título debajo de navegación en 844 landscape. No se presume barra de navegador o teclado del sistema emulado.

## 29. Android phone QA

Geometría Chromium a 360×800, 393×852 y 430×932; trece tamaños completos incluyen control pequeño320×568. Se revisó legibilidad, foco y flujo sin UA sniffing de layout. Asistente a390×420: panel x19–370/y54–396, input y338–383/font16, sin overflow. Es estrés de altura disponible, no teclado Android real ni Chrome Android/Custom Tabs comprobado.

## 30. Fold closed QA

Viewport estrecho 320/360/390/430 usa el mismo responsive de teléfono: sin scroll horizontal, drawer scrollable y mínimo44. No hay una rama que suponga folded=true por el ancho. Esto cubre geometría de pantalla cerrada, no un teléfono plegable identificado ni sus proporciones/barras/gestos específicos.

## 31. Fold open QA

700×900 y850×1000: Soluciones utiliza master/detail de180px mínimo con detalle legible; flujo en columna. AETHRYON mantiene quick summary y profundidad progresiva; Ruta 90 capítulos y tablas conservan lectura. Paquetes Frente dos columnas en tamaño medio. Capturas finales fold-open de las ocho páginas. Ancho850 no se etiqueta como prueba de bisagra real. Cambios de orientación y cierre de menú están verificados por cambio de viewport.

## 32. Viewport segment support

Mejora experimental aplicada con media queries horizontal-viewport-segments:2 y vertical-viewport-segments:2 y env(viewport-segment-*). Sólo esas señales activan el branch; sin soporte se conserva responsive normal. Analítica guarda dos segmentos sólo cuando matchMedia lo declara, con typeof/guards y test mock. No se agregan eventos ni listeners persistentes para detectar folding. [Media Queries 5](https://www.w3.org/TR/mediaqueries-5/), [CSS Environment Variables](https://www.w3.org/TR/css-env-1/).

## 33. Hinge avoidance

Branch horizontal reserva el primer segmento para contenido/header/menú/asistente, con grids de una columna y sin elementos sobre la bisagra. Branch vertical mantiene un pane superior de lectura con scroll propio y menús dentro de ese segmento. Implementación conservadora que no exige usar ambos paneles. La señal real no estuvo disponible en los navegadores de QA: sólo revisión de código y mocks analíticos, pendiente probar geometría, hit targets, safe areas y giro en bisagra real.

## 34. Accessibility

Semántica, landmarks y headings conservados. Foco visible azul sobre superficies claras y dorado sobre oscuras; botones con nombres accesibles; menú modal separado del fondo inert; tablas con relaciones y regiones nombradas; select y details nativos. Catálogo aria-expanded/controls y panel hidden sin controles focusables. Asistente no modal (sin aria-modal), abrir enfoca cerrar y Escape restaura trigger; cerrar saca campos ocultos del orden de foco. No se presenta certificación WCAG, auditoría de contraste completa V72, lector de pantalla ni texto200% verificado.

## 35. Reduced motion

La capa principal desactiva animation/transition y smooth scroll cuando prefers-reduced-motion:reduce. FadeInUp principal renderiza contenido inmediatamente; animación legacy se mantiene sólo fuera del alcance. Asistente respeta la preferencia al seguir mensajes. CSS no modifica la animación interna de todo SVG remoto: validar SVG/OS reduced motion en dispositivo, y revisar si se requiere una variante estática desktop en una siguiente entrega. Revisión de fuente; emulación OS no disponible en esta QA.

## 36. Keyboard / focus

Ocho menús con wrap, Escape y retorno de foco; bloqueo y restauración de lectura. AETHRYON criterio CLARIDAD inicia abierto: primer Enter cierra y segundo reabre; outline sólido, target100px de alto. Ruta 90 tabla acepta ArrowRight con scroll local. Asistente abre en Cerrar, Escape desde input devuelve foco al toggle. Sin envío de mensaje. HTML nativo facilita teclado; lector de pantalla y todos los escenarios de teclado virtual físicos siguen pendientes.

## 37. SEO diff

Ocho rutas: title, description, canonical, OG/Twitter, robots, JSON-LD y H1 normalizado iguales a V71. Texto inicial del main igual y enlaces existentes no eliminados. Viewport cambia a cover, excluido deliberadamente de la igualdad SEO. Un head title y H1 por vista final; los title internos SVG no se cuentan como title del documento. `seo-prerender-diff.json`. JSON-LD, entidades, llms y atribución metodológica permanecen protegidos; no se inventa autoría Ruta 90.

## 38. Prerender diff

Veintiún HTML prerenderizados: veinte rutas públicas y 404; también se conserva shell.html (22 HTML en dist). Además se mantiene el flujo dinámico de posts existente. Render estático precarga el componente correspondiente y evita Suspense asíncrono en build. HTML útil se obtiene de Express sin ejecutar JS; no mobile JS-only. Doce páginas excluidas conservan HTML normalizado: se ignoran únicamente hints de build, hashes de assets e IDs generados React. No se afirma igualdad byte a byte. 197 archivos protegidos existentes (assets originales, servidor/datos/SEO/configuración incluidos) tienen igualdad de fuente/hash.

## 39. Runtime validation

Servidor `NODE_ENV=production node dist/server.cjs`: ocho páginas, sitemap.xml, robots.txt y llms.txt con200 y MIME correcto. Sin Vite client ni QA probe en respuestas reales. Runtime instrumentado local: ningún Vite/Rolldown cargado,0 workers y0 child processes; único handle Server. Proxy y probe de medición quedaron fuera del proyecto/producto.

Sitemap: infraestructura/generador/caché protegidos, prueba HTTP200 y suites existentes aprobadas. Esto confirma preservación local; no confirma actualización programada ni crawling/indexación en la instalación pública. Persistencia real de analítica/Geo, servicios externos y base de datos no se ejercitaron con escrituras de producción.

## 40. Regression

Landings médicas, SEO/local, RAUVIAWEB/comerciales excluidas, legales y caso individual mantienen fuente protegida y HTML normalizado. No se cambia Kyberion. V71 AETHRYON conserva narrativa/caminos/profundidad y Ruta 90 las diez láminas/orden/atención al método adoptado.

Auditorías legacy SEO, content y LLMO pasan. `audit:entities` falla en dos checks preexistentes reproducidos sobre V71: “Debe incluir al fundador” y “llms.txt debe tener la razón social”. No se corrigieron cambiando entidades/SEO dentro de V72. Build conserva warnings de configLoader/__dirname e import.meta en config WP CJS. Sin nuevo warning ocultado ni flags para silenciar.

## 41. Tests

Suites finales: SEO48, AETHRYON9, Ruta90 integration9, favicon2, regression18 =86 ejecutadas; seis unitarias Ruta90 se repiten entre SEO/integration,80 únicas.0 fallos,0 skip. Un log standalone mobile5 prueba los mismos casos que regression18 y no se suma otra vez.

Comandos reproducibles desde raíz del proyecto: `npm run lint`; `npm run build`; con servidor compilado y TEST_BASE_URL apuntando a él / TEST_MODE=production: `npm run test:seo`, `npm run test:aethryon`, `npm run test:ruta90-integration`, `npm run test:favicon`; `node --test tests/url-normalization.test.mjs tests/landing-profesionales.test.mjs tests/mobile-experience.test.mjs`. Guardados fixtures/logs. La matriz visual104 es evidencia adicional, no86 tests automáticos más104 tests unitarios.

## 42. Build

TypeScript sin errores y build final Vite + prerender + bundle Express exit0. Manifest y todos los preloads/CSS existen; producción compilada incluida con server.cjs y assets. Sin nuevas dependencias ni cambios de lockfile. No se ejecuta bundler en request. Los warnings previos están visibles en v72-build.log. No se publica ni se cambia configuración del hosting.

## 43. Screenshots

Capturas finales: cada una de las ocho páginas a390×844,850×1000 y1440×1000;24 bases. Adicionales: AETHRYON summary/CTA; Soluciones selector/table; Ruta90 componentes/table/CTA real; Frente packages; menú landscape; asistente normal/altura reducida. Nombres fold-open describen viewport de lectura media, no dispositivo físico.

- [v72-aethryon-390-final.png](docs/v72-evidencias/v72-aethryon-390-final.png)
- [v72-aethryon-cta-390-final.png](docs/v72-evidencias/v72-aethryon-cta-390-final.png)
- [v72-aethryon-desktop-final.png](docs/v72-evidencias/v72-aethryon-desktop-final.png)
- [v72-aethryon-fold-open-final.png](docs/v72-evidencias/v72-aethryon-fold-open-final.png)
- [v72-aethryon-resumen-390-final.png](docs/v72-evidencias/v72-aethryon-resumen-390-final.png)
- [v72-asistente-390-final.png](docs/v72-evidencias/v72-asistente-390-final.png)
- [v72-asistente-viewport-reducido.png](docs/v72-evidencias/v72-asistente-viewport-reducido.png)
- [v72-casos-390-final.png](docs/v72-evidencias/v72-casos-390-final.png)
- [v72-casos-desktop-final.png](docs/v72-evidencias/v72-casos-desktop-final.png)
- [v72-casos-fold-open-final.png](docs/v72-evidencias/v72-casos-fold-open-final.png)
- [v72-frente-comercial-390-final.png](docs/v72-evidencias/v72-frente-comercial-390-final.png)
- [v72-frente-comercial-desktop-final.png](docs/v72-evidencias/v72-frente-comercial-desktop-final.png)
- [v72-frente-comercial-fold-open-final.png](docs/v72-evidencias/v72-frente-comercial-fold-open-final.png)
- [v72-frente-paquetes-390-final.png](docs/v72-evidencias/v72-frente-paquetes-390-final.png)
- [v72-home-390-final.png](docs/v72-evidencias/v72-home-390-final.png)
- [v72-home-desktop-final.png](docs/v72-evidencias/v72-home-desktop-final.png)
- [v72-home-fold-open-final.png](docs/v72-evidencias/v72-home-fold-open-final.png)
- [v72-menu-landscape-final.png](docs/v72-evidencias/v72-menu-landscape-final.png)
- [v72-nosotros-390-final.png](docs/v72-evidencias/v72-nosotros-390-final.png)
- [v72-nosotros-desktop-final.png](docs/v72-evidencias/v72-nosotros-desktop-final.png)
- [v72-nosotros-fold-open-final.png](docs/v72-evidencias/v72-nosotros-fold-open-final.png)
- [v72-recursos-390-final.png](docs/v72-evidencias/v72-recursos-390-final.png)
- [v72-recursos-desktop-final.png](docs/v72-evidencias/v72-recursos-desktop-final.png)
- [v72-recursos-fold-open-final.png](docs/v72-evidencias/v72-recursos-fold-open-final.png)
- [v72-ruta-90-390-final.png](docs/v72-evidencias/v72-ruta-90-390-final.png)
- [v72-ruta-90-desktop-final.png](docs/v72-evidencias/v72-ruta-90-desktop-final.png)
- [v72-ruta-90-fold-open-final.png](docs/v72-evidencias/v72-ruta-90-fold-open-final.png)
- [v72-ruta90-componentes-390-final.png](docs/v72-evidencias/v72-ruta90-componentes-390-final.png)
- [v72-ruta90-cta-390-final.png](docs/v72-evidencias/v72-ruta90-cta-390-final.png)
- [v72-ruta90-cta-boton-390-final.png](docs/v72-evidencias/v72-ruta90-cta-boton-390-final.png)
- [v72-ruta90-tabla-390-final.png](docs/v72-evidencias/v72-ruta90-tabla-390-final.png)
- [v72-soluciones-390-final.png](docs/v72-evidencias/v72-soluciones-390-final.png)
- [v72-soluciones-desktop-final.png](docs/v72-evidencias/v72-soluciones-desktop-final.png)
- [v72-soluciones-fold-open-final.png](docs/v72-evidencias/v72-soluciones-fold-open-final.png)
- [v72-soluciones-selector-390.png](docs/v72-evidencias/v72-soluciones-selector-390.png)
- [v72-soluciones-selector-850-final.png](docs/v72-evidencias/v72-soluciones-selector-850-final.png)
- [v72-soluciones-tabla-390-final.png](docs/v72-evidencias/v72-soluciones-tabla-390-final.png)

Safari: sólo seis páginas con smoke aceptado y menú Home; se omiten las capturas stale de Frente/Casos. Screenshots por sí solos no prueban todas las interacciones.

## 44. Deuda técnica

Entry aún comparte asistente + markdown + navegación legacy. Motion (~39kB gzip en su chunk) permanece en algunos cierres por compatibilidad. Recursos lleva editorial/bootstrap grande. Blueprint footer y SVG Nosotros todavía pesados. Montaje createRoot reemplaza contenido estático; migrar a hidratación sería trabajo aparte con pruebas específicas. Selectores CSS de utilities existentes pueden necesitar consolidación futura. No se usa esta entrega para un refactor global oportunista.

## 45. Riesgos

P1: Home desktop LCP regresa y sigue>2.5s; Sol/Nos desktop también fuera de esa preferencia. P1: segment APIs no probadas con bisagra real; son experimentales y dependen del motor. P2: Recursos251.4kB excede preferenciaJS, y HTML/editorial/cross-origin dominan parte de carga. P2: dos checks previos de entidades y warnings de build sin corregir fuera del alcance. P2: fallback estático ante fallo inicial conserva lectura, pero perdería interacción. No se declara bloqueo funcional observado de los ocho flujos locales ni aprobación incondicional de producción.

## 46. QA físico pendiente

Safari iOS actual, Chrome Android, WKWebView/Custom Tabs, Samsung Internet y navegador embebido; notch/barras dinámicas, teclado virtual, orientación con overlays abiertos, VoiceOver/TalkBack y zoom200%. Dispositivo plegable cerrado/abierto, bisagra horizontal/vertical, spanning real y cambios de postura. Validar tap targets y scrollpane al recibir señales de segmentos, no sólo ancho. Safari macOS incompleto para Frente/Casos requiere terminar su smoke.

## 47. Field data pendiente

Recopilar LCP/CLS/INP reales por ruta/form factor y población suficiente; separar navegación completa de navegación SPA, cold/cached y fuentes externas. No generar datos de campo con este proxy ni atribuir conversiones/ventas a optimizaciones. Analítica conserva eventos y agrega viewport sin nuevos IDs. Ejemplos incluidos están redactados; la persistencia en producción debe validarse después del despliegue. No se añadieron eventos nuevos, tablas o fingerprinting.

## 48. Recomendación de despliegue

Apto para revisión y staging con rollback al ZIP V71. Mantener variables y arranque existentes `npm start`; instalar dependencias según lockfile si el hosting lo requiere. Usar dist incluido; no asumir que el hosting reconstruirá. Validar HTTP200/canonical/sitemap, navegación entre rutas y assets en el host real antes de promoción pública.

Priorizar repetir laboratorio controlado y revisar Home/Sol/Nos desktop; finalizar pruebas físicas/teclado y segment branch. No recomendar publicación como “Core Web Vitals aprobados” ni “foldables certificados”. El cambio está empaquetado y probado localmente; el despliegue y su verificación pública no forman parte de esta entrega.

## Clasificación de cambios

| Clase | Archivos/patrones | Propósito |
|---|---|---|
| GLOBAL MOBILE INFRASTRUCTURE | src/styles/mobileExperience.css; src/components/MainNavbar.tsx; Navbar.tsx; Footer.tsx; src/App.tsx | Capa opt-in en las ocho páginas; header, drawer, safe areas, anclas, footer y espacio de lectura. Landings mantienen la rama anterior. |
| PAGE-SPECIFIC RESPONSIVE | HeroSection.tsx; SolucionesPage.tsx; AethryonPage.tsx; Ruta90Page.tsx; FrenteComercialPage.tsx; NosotrosPage.tsx | Jerarquía de hero, selector y flujo, tablas, navegación de capítulos y paquetes. Texto, destinos y narrativa conservados. |
| PERFORMANCE | src/lib/routeLoader.ts; src/main.tsx; src/App.tsx; scripts/render-static.tsx; scripts/prerender.js; vite.config.ts; componentes de imágenes; public/media/*mobile*.webp y *optimized.svg | Carga por ruta, preloads deduplicados, CSS por cierre de ruta, deferred WP fetch en Recursos, imágenes con tamaños, lazy y prioridad basada en LCP. |
| ACCESSIBILITY | MainNavbar.tsx; AIAssistantWidget.tsx; SolucionesPage.tsx; Ruta90Page.tsx; mobileExperience.css | Foco, Escape, inert, scroll lock restaurado, 44 px, tablas semánticas, regiones de desplazamiento y disclosures nativos. |
| FOLD ENHANCEMENT | mobileExperience.css; src/App.tsx | Mejora experimental sólo cuando el navegador declara dos segmentos reales; reserva el primer panel de lectura y separa bisagra. No inferencia por ancho. |
| ANALYTICS | src/lib/analytics.ts | Añade ancho, alto, orientación y clase de viewport a eventos existentes sólo en páginas principales; segmentos únicamente cuando matchMedia declara dos. |
| TEST ONLY | tests/mobile-experience.test.mjs; tests/fixtures/v72-*.json; ajustes a aethryon-ux, ruta90.test y ruta90-events; docs/v72-evidencias | Regresión semántica, transferencias, hints existentes, controles excluidos y mocks de viewport sin sustituir QA físico. |

El diff fuente, los hashes y el inventario permiten revisar las modificaciones; varias comparten más de una clase. La mejora de carga por ruta afecta infraestructura común, mientras la capa visual queda limitada a las ocho páginas.

### Inventario por archivo

| Archivo | Estado | Clasificación |
|---|---|---|
| scripts/prerender.js | modified | PERFORMANCE |
| scripts/render-static.tsx | modified | PERFORMANCE |
| src/App.tsx | modified | GLOBAL MOBILE INFRASTRUCTURE, PERFORMANCE, FOLD ENHANCEMENT |
| src/components/AIAssistantWidget.tsx | modified | GLOBAL MOBILE INFRASTRUCTURE, ACCESSIBILITY |
| src/components/AethryonCore.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE |
| src/components/CapabilitiesSection.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE |
| src/components/FadeInUp.tsx | modified | PERFORMANCE, ACCESSIBILITY |
| src/components/Footer.tsx | modified | GLOBAL MOBILE INFRASTRUCTURE, PERFORMANCE, ACCESSIBILITY |
| src/components/HeroSection.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE |
| src/components/MethodologySection.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE |
| src/components/Navbar.tsx | modified | GLOBAL MOBILE INFRASTRUCTURE, ACCESSIBILITY |
| src/components/ProblemSection.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE |
| src/lib/analytics.ts | modified | ANALYTICS |
| src/main.tsx | modified | PERFORMANCE |
| src/pages/AethryonPage.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE |
| src/pages/FrenteComercialPage.tsx | modified | PAGE-SPECIFIC RESPONSIVE |
| src/pages/NosotrosPage.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE |
| src/pages/RecursosPage.tsx | modified | PERFORMANCE |
| src/pages/Ruta90Page.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE, ACCESSIBILITY |
| src/pages/SolucionesPage.tsx | modified | PAGE-SPECIFIC RESPONSIVE, PERFORMANCE, ACCESSIBILITY |
| tests/aethryon-ux.test.mjs | modified | TEST ONLY |
| tests/ruta90-events.test.ts | modified | TEST ONLY |
| tests/ruta90.test.mjs | modified | TEST ONLY |
| vite.config.ts | modified | PERFORMANCE |
| public/media/aethryon-convergence-animated-optimized.svg | added | PERFORMANCE |
| public/media/aethryon-convergence-mobile-640.webp | added | PERFORMANCE |
| public/media/aethryon-convergence-mobile-960.webp | added | PERFORMANCE |
| public/media/rauvia-solutions-hero-mobile-640.webp | added | PERFORMANCE |
| public/media/rauvia-solutions-hero-mobile-960.webp | added | PERFORMANCE |
| src/components/MainNavbar.tsx | added | GLOBAL MOBILE INFRASTRUCTURE, ACCESSIBILITY |
| src/lib/routeLoader.ts | added | PERFORMANCE |
| src/styles/mobileExperience.css | added | GLOBAL MOBILE INFRASTRUCTURE, PAGE-SPECIFIC RESPONSIVE, ACCESSIBILITY, FOLD ENHANCEMENT |
| tests/fixtures/v72-excluded-html.json | added | TEST ONLY |
| tests/fixtures/v72-route-baseline.json | added | TEST ONLY |
| tests/mobile-experience.test.mjs | added | TEST ONLY |
