# Redirecciones de URLs Históricas (301 SEO Consolidation)

- **Fecha:** 2026-08-07
- **Motivo:** Simplificación de la arquitectura web de RAUVIA, eliminando dependencias de rutas individuales obsoletas o entradas de blog antiguas y consolidando la autoridad SEO directamente en la página principal corporativa.
- **Política Adoptada:** "Las URLs históricas conocidas del sitio anterior de RAUVIA se redirigen de forma permanente a la nueva página principal mediante 301. Las URLs inexistentes que no formen parte del inventario histórico conservan comportamiento 404."

---

## Listado Completo de URLs Redirigidas

Todas las siguientes rutas responden con un código **HTTP 301 (Moved Permanently)** y redirigen directamente a **`https://rauvia.com.mx/`** (sin cadenas intermedias de redirección):

| URL Origen Histórica | Destino Final | Código HTTP | Estado |
| :--- | :--- | :---: | :---: |
| `/sobre-rauvia/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/servicios/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/contacto/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/nuestro-metodo/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/consultoria_gratis/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/test-madurez-sistemica/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/blog/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/blindaje-operativo-2026/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/delegacion-hueca-caos-a-sistema-90-dias/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/metricas-de-rentabilidad-para-agencias-en-cdmx/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/guia-gobernanza-rauvia/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/claridad-operativa-el-regalo-que-si-negocio-necesita/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/ruta-90-dias-agencias/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/diagnostico-de-fuga-de-capital-mejora-la-eficiencia-en-tu-agencia/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/ejecucion-ruta-90-solo-vs-acompanamiento/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/que-hace-rauvia-ruta-90-dias/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/ia-estrategia-contenido-agencias/` | `https://rauvia.com.mx/` | 301 | Activo |
| `/wp-content/uploads/2025/11/RAUVIA_PRESENTACION_GUIA_2025.pdf` | `https://rauvia.com.mx/` | 301 | Activo |
| `/contacto-anterior/` *(Audit Extra)* | `https://rauvia.com.mx/` | 301 | Activo |
| `/servicios-antiguos/` *(Audit Extra)* | `https://rauvia.com.mx/` | 301 | Activo |
| `/acerca-de/` *(Audit Extra)* | `https://rauvia.com.mx/` | 301 | Activo |

*Nota: La lógica de redirección tolera la presencia o ausencia de barra diagonal final (trailing slash).*

---

## Comportamiento de URLs Desconocidas / Inexistentes

Cualquier URL aleatoria que nunca haya existido en el inventario histórico (por ejemplo, `/esta-url-no-existe-12345`):
- **NO** es redirigida a la home.
- **SI** devuelve un código de estado real **HTTP 404 (Not Found)** acompañado de la vista de error 404 del sitio React.
- Se evita la generación de Soft 404s generalizados.

---

## Archivos Modificados

1. **`server.ts`**: Implementación de middleware Express con coincidencia explícita sobre `LEGACY_HISTORICAL_PATHS` antes de las rutas estáticas de Vite/React.
2. **`docs/phase-0-root-htaccess.md`**: Definición técnica de reglas Apache mod_rewrite equivalentes para despliegues en servidores Apache.
3. **`generate-phase0-docs.sh`**: Actualización del generador de scripts para mantener la sincronía del `.htaccess`.
4. **`docs/phase-0-redirect-map.csv`**: Inventario de mapeo de redirecciones actualizado.

---

## Pruebas Realizadas y Resultados

1. **Página de Inicio (`/`):** Responde `200 OK`.
2. **URLs Históricas Especificadas:** Todas responden `301 Moved Permanently` con encabezado `Location: https://rauvia.com.mx/`.
3. **Petición sin Trailing Slash (`/sobre-rauvia`):** Responde `301 Moved Permanently` directamente a `https://rauvia.com.mx/`.
4. **URL Desconocida (`/esta-url-no-existe-12345`):** Responde `404 Not Found`.
5. **Rutas Válidas de React (`/nosotros`, `/soluciones`, `/aethryon`, `/recursos`):** Responden `200 OK`.
6. **Dominio Autónomo WordPress (`https://blog.rauvia.com.mx/`):** Sin modificaciones ni interferencias.

---

## Limitaciones

- Las redirecciones aplican exclusivamente a nivel servidor (Node.js/Express en Cloud Run o `.htaccess` en Apache).
- No se han creado páginas fantasma o stubs en React para rutas históricas para evitar diluir la señal SEO.
