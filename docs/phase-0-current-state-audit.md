# Auditoría de Estado Actual (Fase 0)

## A. WordPress Actual
- **Ubicación:** Actualmente en la raíz (`public_html/`).
- **Versión:** Desconocida (a verificar en servidor).
- **Base de Datos:** A verificar en `wp-config.php`.
- **Estructura de Permalinks:** A verificar (probablemente `/%postname%/`).
- **Plugins:** A auditar (especialmente caché y SEO).
- **Archivos:** `wp-content`, `wp-includes`, `wp-admin`, `.htaccess`, `wp-config.php`, `index.php`.

## B. React Actual
- **Framework:** React con Vite y React Router.
- **Base path:** `/`
- **Consumo de WP:** Mediante REST API en `src/lib/wp.ts` (ahora centralizado).

## C. Infraestructura
- **Servidor:** Hostinger (Apache/LiteSpeed).
- **Acceso:** FTP/SSH y phpMyAdmin requeridos.
- **Dominio:** `https://rauvia.com.mx`

**Riesgos (P0):**
- Si no se actualizan las URL internas de WP, las imágenes y links se romperán.
- Si el `.htaccess` de la raíz no ignora `/blog`, React interceptará el tráfico de WordPress.
