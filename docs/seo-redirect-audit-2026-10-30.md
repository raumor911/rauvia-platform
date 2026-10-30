# RAUVIA — Auditoría de redirecciones y canonicalización (2026-10-30)

**Base auditada:** `main` commit `6c872a1aa120`. **Rama de propuesta:** `fix/seo-single-hop-canonical-20261030`. Sin despliegue. El estado de Search Console **«Página con redirección» es informativo**, no un error si el origen 301 no se incluye como URL canónica ni en sitemap.

## (a) Comportamiento correcto preexistente
- `server/seo/legacyRoutes.ts:98–106`: el inventario V73 se ejecutaba primero y conservaba query; las rutas retiradas devolvían 410 (`91–96`).
- `server.ts:521–538`: sitemap desde snapshot dinámico; `scripts/generate-sitemap.js:39–88` usa entradas WordPress `status=publish` y rutas de `publicRoutes`. No se cambia el motor.
- `src/seo/buildMetaTags.ts:10,35,48`: canonical de páginas y og:url comparten fuente; `integrations/wordpress/rauvia-seo-headless.php:25–80` valida HTTP 200 y canonical antes de redirigir publicaciones.
- `server.ts:593–605`: fallback evita servir Home como 200 en rutas desconocidas.

## (b) Problemas comprobados en el código original
1. **Duplicación/precedencia:** `server.ts:30–65` y `106–196` aplicaban reglas distintas a la misma URL; `/blog`, `/servicios` y dos artículos se declaraban tanto como 301 y como 410 (410 inalcanzables). Además `server/seo/legacyRoutes.ts:98–106` se ejecutaba antes.
2. **Saltos innecesarios:** `server.ts:45–61` usaba destinos relativos para legacy; host alias podía requerir segunda redirección (`server.ts:110–129`). `/blog` tenía un tercer destino `/recursos` sin slash (`server.ts:175–192`).
3. **Pérdida de query:** `server.ts:41,46,50,61,139` no concatenaba los parámetros; `/componentes-ruta-90-dias-pymes` tampoco preservaba query.
4. **Soft-404 potencial:** `shop.rauvia.com.mx/* → /` (`server.ts:39–41`) y entradas antiguas sin equivalente que apuntaban a `/recursos/`. La clasificación de Google **no se verificó**.
5. **Referencias no canónicas:** `public/llms.txt:66–79`, `public/llms-full.txt:12,80–100` y varios campos URL de `src/seo/routeSeo.js` no llevaban slash final. Menús y CTAs apuntaban a variantes sin slash.

## (c) No verificado desde el repositorio
- Terminación TLS, orden de reglas HTTP→HTTPS de Hostinger/.htaccess/CDN, validez de `X-Forwarded-Proto` y de `Host` recibido por Express.
- DNS y enrutamiento efectivo del subdominio `shop`, y que aliases `rauvia.consulting` realmente apunten a este Node.
- Que cada URL legada tenga autoridad externa significativa; conversiones de 301 a 410 requieren control editorial si hay sustitutos reales.
- HTTP status y canonical reales publicados después del despliegue, respuestas de WordPress en producción, Googlebot y datos privados de Search Console.

## Inventario exhaustivo de políticas legadas explícitas

Orden previo: **1)** V73 410/301; **2)** shop/blog/servicios/artículos; **3)** host y slash; **4)** componentes; **5)** LEGACY_GONE y LEGACY_REDIRECT (algunas reglas muertas); **6)** `express.static`. Nuevo orden: **1)** middleware canónico único 410/301; **2)** páginas/WordPress y estáticos sin redirección de directorio; **3)** fallback 404.

| Origen | Antes (código efectivo) | Archivo:línea antes | Después | Archivo:línea después |
|---|---|---|---|---|
| `/acerca-de` | 410 | server.ts:171 | 410 | server/seo/legacyRoutes.ts:57 |
| `/analisis-estrategico-mensual-startup` | 301 → /recursos/ (además 410 muerta) | server.ts:55–62,146 | 410 | server/seo/legacyRoutes.ts:38 |
| `/blindaje-operativo-2026` | 410 | server.ts:158 | 410 | server/seo/legacyRoutes.ts:46 |
| `/blog` | 301 → /recursos/ (además 410/301 muertas) | server.ts:45–46,157,176 | 301 → https://rauvia.com.mx/recursos/ | server/seo/legacyRoutes.ts:62 |
| `/brand/rauvia-consulting` | 301 → /nosotros/ | server/seo/legacyRoutes.ts:26 | 301 → https://rauvia.com.mx/nosotros/ | server/seo/legacyRoutes.ts:16 |
| `/categoria-producto/estrategia-y-planificacion` | 301 → /aethryon/ | server/seo/legacyRoutes.ts:18 | 301 → https://rauvia.com.mx/aethryon/ | server/seo/legacyRoutes.ts:14 |
| `/categoria-producto/servicios-de-consultoria` | 301 → /soluciones/ | server/seo/legacyRoutes.ts:30 | 301 → https://rauvia.com.mx/soluciones/ | server/seo/legacyRoutes.ts:17 |
| `/category/automatizacion-empresarial` | 301 → /soluciones/ | server/seo/legacyRoutes.ts:70 | 410 | server/seo/legacyRoutes.ts:34 |
| `/category/startups-y-emprendimiento/feed` | 410 | server/seo/legacyRoutes.ts:10 | 410 | server/seo/legacyRoutes.ts:10 |
| `/claridad-operativa-el-regalo-que-si-negocio-necesita` | 410 | server.ts:162 | 410 | server/seo/legacyRoutes.ts:49 |
| `/clients` | 301 → /casos/ | server/seo/legacyRoutes.ts:62 | 301 → https://rauvia.com.mx/casos/ | server/seo/legacyRoutes.ts:19 |
| `/componentes-ruta-90-dias-pymes` | 301 → /ruta-90/#componentes (sin query) | server.ts:137–142 | 301 → https://rauvia.com.mx/ruta-90/#componentes | server/seo/legacyRoutes.ts:64 |
| `/consultoria_gratis` | 410 | server.ts:155 | 410 | server/seo/legacyRoutes.ts:45 |
| `/contacto` | 410 | server.ts:153 | 410 | server/seo/legacyRoutes.ts:43 |
| `/contacto-anterior` | 410 | server.ts:169 | 410 | server/seo/legacyRoutes.ts:55 |
| `/copywriting-textos-vender-facebook-pymes` | 410 | server/seo/legacyRoutes.ts:5 | 410 | server/seo/legacyRoutes.ts:5 |
| `/delegacion-hueca-caos-a-sistema-90-dias` | 301 → /recursos/ (además 410 muerta) | server.ts:55–62,159 | 410 | server/seo/legacyRoutes.ts:47 |
| `/despega-tu-marketing` | 410 | server/seo/legacyRoutes.ts:7 | 410 | server/seo/legacyRoutes.ts:7 |
| `/diagnostico-de-fuga-de-capital-mejora-la-eficiencia-en-tu-agencia` | 410 | server.ts:164 | 410 | server/seo/legacyRoutes.ts:51 |
| `/ejecucion-ruta-90-solo-vs-acompanamiento` | 410 | server.ts:165 | 410 | server/seo/legacyRoutes.ts:52 |
| `/errores-planeacion-estrategica-90-dias` | 301 → /ruta-90/ | server/seo/legacyRoutes.ts:14 | 301 → https://rauvia.com.mx/ruta-90/ | server/seo/legacyRoutes.ts:13 |
| `/etiqueta-producto/consultoria-estrategica` | 301 → /soluciones/ | server/seo/legacyRoutes.ts:38 | 301 → https://rauvia.com.mx/soluciones/ | server/seo/legacyRoutes.ts:18 |
| `/guia-definitiva-como-usar-el-seo-basico-para-superar-a-tu-competencia-en-marketplaces` | 301 → /recursos/ | server/seo/legacyRoutes.ts:78 | 410 | server/seo/legacyRoutes.ts:35 |
| `/guia-gobernanza-rauvia` | 410 | server.ts:161 | 410 | server/seo/legacyRoutes.ts:48 |
| `/ia-estrategia-contenido-agencias` | 410 | server.ts:167 | 410 | server/seo/legacyRoutes.ts:54 |
| `/llmo` | 302 → /llmo/index.json | server.ts:71 | 301 → https://rauvia.com.mx/llmo/index.json | server/seo/legacyRoutes.ts:65 |
| `/marketing-bajo-presupuesto-5-estrategias` | 410 | server/seo/legacyRoutes.ts:6 | 410 | server/seo/legacyRoutes.ts:6 |
| `/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla` | 301 → /recursos/brecha-capacidad-real-percepcion-mercado/ | server/seo/legacyRoutes.ts:82 | 410 | server/seo/legacyRoutes.ts:36 |
| `/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla/feed` | 301 → /recursos/brecha-capacidad-real-percepcion-mercado/ | server/seo/legacyRoutes.ts:86 | 410 | server/seo/legacyRoutes.ts:37 |
| `/metricas-de-rentabilidad-para-agencias-en-cdmx` | 410 | server.ts:147 | 410 | server/seo/legacyRoutes.ts:39 |
| `/nuestro-metodo` | 410 | server.ts:154 | 301 → https://rauvia.com.mx/aethryon/ | server/seo/legacyRoutes.ts:15 |
| `/privacidad` | 301 → /aviso-de-privacidad/ | server/seo/legacyRoutes.ts:22 | 301 → https://rauvia.com.mx/aviso-de-privacidad/ | server/seo/legacyRoutes.ts:15 |
| `/que-hace-rauvia-ruta-90-dias` | 410 | server.ts:166 | 410 | server/seo/legacyRoutes.ts:53 |
| `/ruta-90-dias-agencias` | 410 | server.ts:163 | 410 | server/seo/legacyRoutes.ts:50 |
| `/ruta-90-dias-rauvia-para-quien-es` | 301 → /ruta-90/ | server/seo/legacyRoutes.ts:66 | 301 → https://rauvia.com.mx/ruta-90/ | server/seo/legacyRoutes.ts:20 |
| `/servicios` | 301 → /soluciones/ (además 410 muerta) | server.ts:49–50,152 | 301 → https://rauvia.com.mx/soluciones/ | server/seo/legacyRoutes.ts:63 |
| `/servicios-antiguos` | 410 | server.ts:170 | 410 | server/seo/legacyRoutes.ts:56 |
| `/sobre-rauvia` | 410 | server.ts:151 | 410 | server/seo/legacyRoutes.ts:42 |
| `/tag/consultoria-cdmx` | 301 → /soluciones/ | server/seo/legacyRoutes.ts:54 | 410 | server/seo/legacyRoutes.ts:31 |
| `/tag/consultoria-para-pymes/feed` | 410 | server/seo/legacyRoutes.ts:9 | 410 | server/seo/legacyRoutes.ts:9 |
| `/tag/crecimiento-de-negocio` | 301 → /recursos/la-ilusion-del-crecimiento-sin-capacidad/ | server/seo/legacyRoutes.ts:74 | 410 | server/seo/legacyRoutes.ts:33 |
| `/tag/errores-de-negocio` | 301 → /recursos/ | server/seo/legacyRoutes.ts:34 | 410 | server/seo/legacyRoutes.ts:27 |
| `/tag/facebook-ads` | 410 | server/seo/legacyRoutes.ts:8 | 410 | server/seo/legacyRoutes.ts:8 |
| `/tag/gestion-de-equipos` | 301 → /recursos/la-ilusion-del-crecimiento-sin-capacidad/ | server/seo/legacyRoutes.ts:58 | 410 | server/seo/legacyRoutes.ts:32 |
| `/tag/innovacion` | 301 → /recursos/ | server/seo/legacyRoutes.ts:46 | 410 | server/seo/legacyRoutes.ts:29 |
| `/tag/sistemas-de-negocio` | 301 → /soluciones/ | server/seo/legacyRoutes.ts:50 | 410 | server/seo/legacyRoutes.ts:30 |
| `/tag/transformacion-digital` | 301 → /recursos/ | server/seo/legacyRoutes.ts:42 | 410 | server/seo/legacyRoutes.ts:28 |
| `/test-madurez-sistemica` | 410 | server.ts:148 | 410 | server/seo/legacyRoutes.ts:40 |
| `/wp-content/uploads/2025/11/RAUVIA_PRESENTACION_GUIA_2025.pdf` | 410 | server.ts:149 | 410 | server/seo/legacyRoutes.ts:41 |

> Decisión editorial: la página retirada se redirige a AETHRYON por equivalencia temática.

**Reglas por patrón (no enumerables):**

| Origen/patrón | Antes | Después |
|---|---|---|
| `www.rauvia.com.mx/*`, `rauvia.consulting/*`, `www.rauvia.consulting/*` | 301 a dominio canónico, pero algunas rutas ya habían recibido 301 relativo | Un 301 absoluto HTTPS que combina legacy y/o slash |
| `shop.rauvia.com.mx/*` que llegue a esta app | 301 a Home sin considerar ruta | 404 `noindex` (no inventar equivalente) |
| Ruta pública sin slash | 301 relativo (`server.ts:124–129`) | 301 absoluto HTTPS con query intacta |
| Artículo WordPress `/recursos/:slug` sin slash | 301 relativo | 301 absoluto HTTPS con query intacta |
| `/llmo` o `/llmo/` | 302 relativo para `/llmo`; `/llmo/` dependía de estáticos | 301 absoluto a `/llmo/index.json` |
| Archivos estáticos/direcciones de carpetas | `express.static` podía añadir su propio 301 | `redirect:false`; solo middleware normaliza URLs publicadas |
| Host canónico por HTTP | No hay garantía de redirect; Express detrás de proxy puede recibir HTTP aunque el cliente llegó por HTTPS | **No se obliga en Node** sin conocer proxy. Debe resolverse/verificarse en el ingress de Hostinger |

## Diseño del parche
- Un solo middleware `createCanonicalRedirectMiddleware(publicRoutes)` en `server/seo/legacyRoutes.ts` instalado antes de rutas de WP/estáticas, con `Location` absoluto HTTPS, query antes de fragment.
- Los destinos de legacy se normalizaron a slash final. Las URL sin equivalente conservado pasan a 410. **No hay reescritura de las rutas públicas** ni cambios al origen WordPress/IndexNow.
- Sin `app.set('trust proxy', true)`: aceptar cualquier `X-Forwarded-Proto` sin controlar IP y configuración del proxy permitiría suplantación y/o bucles. Debe validarse en Hostinger antes de habilitar una política de redirección HTTP dentro de Express.
- `/llmo` es un alias estable del documento `/llmo/index.json`; 301 procede si se confirma que esta URI es la definitiva.
- Actualización de enlaces internos `src/`, llms, grafo de conocimiento y metadata para no anunciar páginas que deban redirigir. Ningún cambio a la semántica del sitemap ni a la API de WP.

## Verificación y comandos
**Revisión estática de este cambio:** 23 rutas institucionales, 20 artículos publicados del snapshot (43 URLs sin duplicados), canonical de metadata y enlaces de descubrimiento con slash, JSON del grafo válido. No equivale a ejecución del servidor.

**Ejecución pendiente en entorno Node 24 con dependencias instaladas**: `npm ci`, `npm run lint`, `npm run build`, `npm run test:redirects`, `npm run test:resources-performance`, `npm run test:indexnow`, `npm run test:wordpress-sync`, `npm run test:knowledge`, y regresión SEO `npm run test:seo`. El contenedor disponible no puede resolver github.com para clonar el repositorio; **no reportar PASSES inventados**.

### Comprobaciones posteriores al despliegue
```sh
curl -sIL --max-redirs 5 'https://www.rauvia.com.mx/blog?utm_source=qa'
curl -sIL --max-redirs 5 'https://rauvia.com.mx/servicios?utm_source=qa'
curl -sIL --max-redirs 5 'https://rauvia.com.mx/nosotros?utm_source=qa'
curl -sIL --max-redirs 5 'https://rauvia.com.mx/llmo?utm_source=qa'
curl -sIL --max-redirs 5 'https://rauvia.com.mx/recursos/'
curl -sIL --max-redirs 5 'http://rauvia.com.mx/nosotros/'
curl -sIL --max-redirs 5 'https://rauvia.com.mx/analisis-estrategico-mensual-startup/'
curl -sIL --max-redirs 5 'https://blog.rauvia.com.mx/<slug-publicado>/'
```
**Esperado:** origen legacy 301 seguido de 200 **con un solo 301**; retiradas 410 directo, sin `Location`; páginas del sitemap 200 directo. `http://` depende del proxy y no se declara resuelto desde Node. Verificar WordPress publicado 301 directo al artículo RAUVIA, pero solo si el destino tiene canonical 200. No utilizar placeholders de slugs reales sin reemplazarlos.

En Search Console: revisar muestra «Página con redirección» como excluida razonable; usar inspección de URL para comprobar la canónica, reenviar `sitemap.xml` tras publicar, y verificar que **las URLs canónicas indexables** no aparecen en «Página con redirección».
