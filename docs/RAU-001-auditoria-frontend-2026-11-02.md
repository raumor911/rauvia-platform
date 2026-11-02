# RAU-001 — Auditoría de código frontend | RAUVIA Consulting

**Fecha:** 2026-11-02  
**Repositorio:** [raumor911/rauvia-platform](https://github.com/raumor911/rauvia-platform)  
**Referencia inmutable auditada:** `main` en `75273e3951568849cb8d37e980f599351acc2cae`  
**Estado:** auditoría estática de código completada; comprobación de navegador, rendimiento, WCAG y compilación actual reservada para RAU-002.  
**Cambios en aplicación:** ninguno.

## 1. Alcance y metodología

Inspección directa de los archivos versionados en GitHub: manifiesto del árbol, configuración de herramientas y dependencias, archivos fuente React/TypeScript, componentes de la portada, navegación, asistente, estilos, rutas, estrategia de prerender, pruebas y evidencias históricas. Los hallazgos siguientes distinguen **defectos que se deducen del código** de **riesgos que requieren pruebas runtime**. No se ejecutaron `npm ci`, `npm run build`, `npm run lint`, pruebas de navegador, Lighthouse ni lectores de pantalla. Por tanto, no se atribuyen métricas actuales de Core Web Vitals ni una calificación WCAG definitiva.

**Inventario observado:** 827 archivos versionados; 105 dentro de `src/`, 42 en `tests/`, 377 en `docs/`. Dentro de `public/media/` existen 40 archivos (33 SVG), con 3,955,234 bytes de activos almacenados; esta cifra **no** es transferencia de una página. No se observaron fuentes locales `.woff`, `.woff2`, `.ttf` o `.otf` en el árbol.

## 2. Arquitectura confirmada

- React 19 + TypeScript + Vite 8 + Tailwind CSS 4; aplicación Express y salida de servidor `dist/server.cjs`; ver `package.json`, `vite.config.ts`, `server.ts`.
- Rutas cargadas dinámicamente desde `src/lib/routeLoader.ts`; `src/main.tsx` precarga la ruta inicial antes de `createRoot`. `scripts/prerender.js` genera HTML estático por URL usando el mismo registro.
- El layout global se compone de `Navbar`, `Footer`, `AIAssistantWidget`, `GeoBanner`, `TrackingRouteObserver` y contenido de ruta en `src/App.tsx`.
- La navegación y capa responsive principal se activan específicamente para ocho rutas mediante `isMainRoute`; otras páginas conservan `LegacyNavbar`.
- Hay pruebas versionadas de SEO, rutas, integridad del prerender y algunas interacciones; son activos valiosos, pero **no** sustituyen ejecución actual.

## 3. Hallazgos y acciones

| ID | Severidad | Estado | Evidencia y mecanismo | Acción / aceptación |
| --- | --- | --- | --- | --- |
| **F01** | P1 | Confirmado en fuente | `src/components/MethodologySection.tsx:41-53`, `src/components/CapabilitiesSection.tsx:38-68`: en `lg` se presenta un `img` con `alt="Metodología Graphic"` o `alt="Capacidades Graphic"`, mientras la versión HTML semántica está `lg:hidden`. | Mantener encabezados, etapas y descripciones disponibles semánticamente en escritorio; considerar imagen decorativa si el contenido se reproduce en HTML. Verificar árbol accesible. |
| **F02** | P1 | Confirmado en fuente | `src/components/MethodologySection.tsx:65-71`: filas de pasos con `<div onClick>`, sin botón, `tabIndex` ni interacción de teclado. | Usar `button` con `aria-pressed`/estado pertinente o eliminar la falsa interacción si solo es presentación; verificar Tab, Enter y Space. |
| **F03** | P1 | Confirmado en fuente | `src/components/AIAssistantWidget.tsx:103-113,136-138,185-201`: `aria-label` se asigna solo si `mobileLayer`; en rutas legacy, cerrar y enviar son botones solo de ícono sin nombre accesible, y el input depende de placeholder. | Dar nombre accesible incondicional y etiqueta asociada al campo; probar rutas principales y legacy. |
| **F04** | P1 | Confirmado en fuente | `src/components/Navbar.tsx:43-49`: el efecto de `LegacyNavbar` ejecuta `toggleBtn?.focus()` cuando `isOpen` es `false`, incluido el montaje inicial; el trap incluye botón fuera del diálogo (`54-84`). | Restaurar foco únicamente después de un cierre real; mantener Tab dentro del diálogo, comprobar Escape y navegación inicial. |
| **F05** | P1 | Confirmado en fuente; impacto condicionado | `src/components/GeoBanner.tsx`: overlay a pantalla completa para visitantes fuera de México, sin `role="dialog"`, `aria-modal`, enfoque inicial ni control del foco. | Hacer el aviso modal accesible o convertirlo en región no modal; probar entrada/salida de foco, cierre y retorno. |
| **F06** | P1 | Riesgo de compatibilidad confirmado en lockfile; fallo runtime no demostrado | `package.json` declara `react-router:^8.3.1` y `react-router-dom:^7.18.3`; `package-lock.json` resuelve `node_modules/react-router@8.3.1` y `node_modules/react-router-dom/node_modules/react-router@7.18.3`. | Determinar por qué existen dos mayores y consolidar versiones cuando el paquete directo no sea imprescindible; agregar prueba de navegación e inspección de bundle. |
| **F07** | P2 | Confirmado en fuente | `src/components/Navbar.tsx:10-16` selecciona Main/Legacy; `src/lib/routeLoader.ts:46-47` delimita ocho rutas principales; el resto tiene navegación, tratamientos de foco y reglas de interacción distintos. | Unificar contrato de navegación y accesibilidad entre rutas, conservando las variantes justificadas. |
| **F08** | P2 | Confirmado en fuente; problema de identidad por validar | `src/index.css:1-36` usa `font-sans` y tokens de color; las hojas globales revisadas no registran `@font-face`; no hay fuentes locales en el árbol. | Definir familia tipográfica, fallback, tamaños y tokens en sistema de diseño aprobado. No asumir falla de red de fuentes sin comprobación de navegador. |
| **F09** | P2 | Dependencia eager confirmada; costo actual no medido | `src/App.tsx:11,47-51` monta `AIAssistantWidget` globalmente; `src/components/AIAssistantWidget.tsx:3` importa `react-markdown` de forma estática aunque el chat esté cerrado. | Medir costo del paquete y evaluar carga diferida del asistente y del parser; conservar accesibilidad del botón inicial. |
| **F10** | P2 | Confirmado en fuente | `package.json`: `lint` ejecuta solo `tsc --noEmit`; `tsconfig.json` no habilita `strict`; no se observaron archivos `.github/workflows` en el árbol; tampoco un script único `test`. | Definir checks reproducibles: tipado estricto por etapas, ESLint, ejecución de suites relevantes y CI para PR; no tratar ausencia de CI GitHub como ausencia de toda automatización externa. |
| **F11** | P2 | Riesgo de mantenimiento | `src/pages/AethryonPage.tsx` (43 KB), `src/pages/SolucionesPage.tsx` (39 KB), `src/seo/routeSeo.js` (75 KB), CSS por página y `src/styles/editorial.css`/ `src/components/RauviaEditorial.css`. | Inspeccionar responsabilidades y duplicidades reales, extraer componentes y tokens según necesidad; evitar refactor puramente cosmético. |
| **F12** | P3 | Confirmado en fuente | `src/components/ProblemSection.tsx:48-64`: tarjetas usan `cursor-pointer` y efectos hover, pero no tienen enlace ni acción. | Retirar señales de clic o convertir tarjetas en controles con destino y comportamiento verificable. |

## 4. Fortalezas con evidencia

1. Registro compartido de rutas y generación de HTML prerenderizado: `src/lib/routeLoader.ts` y `scripts/prerender.js`. Reduce dependencia de JS para contenido inicial indexable.
2. Uso de importación por ruta y precarga selectiva: `src/lib/routeLoader.ts`, `src/main.tsx`.
3. Menú principal con portal, foco inicial, bloqueo de scroll, Escape e inercia del `#root`: `src/components/MainNavbar.tsx`. El código expresa un esfuerzo accesible que debe verificarse en navegador, no una certificación WCAG.
4. Hero usa `<h1>`, enlaces reales y dimensiones predecibles de medios; `AethryonCore.tsx` entrega WebP móvil y SVG desktop con `picture`.
5. Pruebas regresivas existentes: `tests/mobile-experience.test.mjs`, `tests/aethryon-ux.test.mjs`, `tests/redirect-canonical.test.ts`. La evidencia V72 informa rutas de entre 160,822 y 251,361 bytes JS gzip; es un **registro histórico**, no medición del commit auditado.

## 5. Priorización por dependencias

**Antes del rediseño visual:** abordar F01, F02, F03, F04 y F05 con criterios de accesibilidad verificables. Revisar F06 para reducir incertidumbre de dependencias.

**RAU-002:** construir y ejecutar el commit de referencia en entorno reproducible; verificar seis anchos (360, 390, 768, 1024, 1440, 1920), WCAG 2.2 AA en flujos críticos, teclado/lector de pantalla, análisis de bundles, Core Web Vitals y registro de errores de consola; cotejar con capturas previas, sin tratarlas como evidencia actual.

**RAU-008 / RAU-016:** resolver F07-F11 mediante una biblioteca mínima de componentes y tokens, QA automatizado y optimizaciones respaldadas por mediciones. **RAU-004**: resolver F12 si tarjetas no son enlaces, al reconsiderar affordances comerciales.

## 6. Criterio de cierre RAU-001

- [x] Identificar rama y SHA inmutables.
- [x] Inventariar estructura y dependencias principales.
- [x] Inspeccionar portada, navegación, componentes globales, CSS, fuentes y semántica.
- [x] Señalar evidencia por archivo y líneas, severidad, nivel de certeza y acciones.
- [x] Revisar estrategia de pruebas existente y límites de medición.
- [ ] **Fuera de alcance de RAU-001 / pendiente RAU-002:** ejecutar build, tests, Lighthouse, lector de pantalla y capturas actuales.

**Dictamen:** el frontend tiene una arquitectura SEO y de carga por rutas más elaborada que una plantilla simple, pero arrastra deuda verificable de accesibilidad, consistencia entre rutas, dependencias y gobernanza de calidad. No es defendible asignar una nota técnica global definitiva únicamente desde la inspección estática.
