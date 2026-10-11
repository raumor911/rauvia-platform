cat << 'INNER_EOF' > docs/phase-0-current-state-audit.md
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
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-url-inventory.md
# Inventario de URLs

| URL Actual | Tipo | Destino Nuevo | Acción |
|---|---|---|---|
| `/` | Antiguo Home (WP) | `/` (React) | Reemplazar index |
| `/wp-admin/` | Admin WP | `/blog/wp-admin/` | Mover y configurar |
| `/wp-json/` | API WP | `/blog/wp-json/` | Mover y configurar |
| `/{slug}/` | Artículo WP | `/blog/{slug}/` | Redirección 301 |
| `/nosotros/` | Página Corp | `/nosotros/` (React) | Redirección 301 si difiere |
| `/soluciones/` | Página Corp | `/soluciones/` (React) | Redirección 301 si difiere |
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-backup-and-restore.md
# Respaldo Obligatorio y Restauración

## Procedimiento de Respaldo
1. Crear ZIP completo de `public_html/` (ej. `rauvia-pre-migration-YYYYMMDD-HHMM-files.zip`).
2. Exportar base de datos desde phpMyAdmin (ej. `rauvia-pre-migration-YYYYMMDD-HHMM-database.sql`).
3. Respaldar `wp-config.php` y `.htaccess` de la raíz.
4. Descargar respaldos a almacenamiento local seguro.

## Procedimiento de Restauración
1. Eliminar archivos de la raíz (excepto respaldos).
2. Extraer el ZIP original en `public_html/`.
3. Restaurar la base de datos desde el archivo `.sql`.
4. Verificar permisos y acceso.
INNER_EOF

cat << 'INNER_EOF' > docs/wordpress-dependencies.md
# Dependencias de WordPress

- Base de datos MySQL.
- Versión de PHP >= 7.4 (recomendado 8.0+).
- Módulo mod_rewrite de Apache para permalinks.
- Módulo curl/zip/gd para plugins y medios.
- `wp-config.php` con credenciales válidas.
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-blog-migration-plan.md
# Plan de Migración a /blog

1. **Crear Directorio:** `mkdir public_html/blog`
2. **Copiar Archivos:** Copiar todos los archivos y carpetas de WP a `/blog`.
3. **Configurar URL:** Definir `WP_HOME` y `WP_SITEURL` en `wp-config.php` de `/blog`.
4. **Actualizar DB:** Buscar y reemplazar `/wp-content/` por `/blog/wp-content/`, etc.
5. **Regenerar Permalinks:** Entrar a `/blog/wp-admin/` y guardar enlaces permanentes.
6. **Desplegar React:** Subir el build de React a `public_html/`.
7. **.htaccess Raíz:** Configurar redirecciones y exclusión de `/blog`.
INNER_EOF

cat << 'INNER_EOF' > docs/wp-config-blog-example.php.txt
<?php
/**
 * Ejemplo Seguro de wp-config.php para /blog
 * NO VERSIONAR EL ARCHIVO REAL
 */

define( 'DB_NAME', 'placeholder_name' );
define( 'DB_USER', 'placeholder_user' );
define( 'DB_PASSWORD', 'placeholder_password' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// Sales (NO usar estas en producción, generar en https://api.wordpress.org/secret-key/1.1/salt/)
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

$table_prefix = 'wp_';

// URL Config for Subdomain
define( 'WP_HOME', 'https://blog.rauvia.com.mx' );
define( 'WP_SITEURL', 'https://blog.rauvia.com.mx' );
define( 'FORCE_SSL_ADMIN', true );

define( 'WP_DEBUG', false );

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-database-url-migration.md
# Migración de URLs en Base de Datos

Uso recomendado de WP-CLI:

```bash
# Dry Run primero
wp search-replace 'https://rauvia.com.mx/wp-content/' 'https://blog.rauvia.com.mx/wp-content/' --all-tables-with-prefix --precise --dry-run
wp search-replace 'https://rauvia.com.mx/wp-includes/' 'https://blog.rauvia.com.mx/wp-includes/' --all-tables-with-prefix --precise --dry-run

# Ejecución real
wp search-replace 'https://rauvia.com.mx/wp-content/' 'https://blog.rauvia.com.mx/wp-content/' --all-tables-with-prefix --precise
wp search-replace 'https://rauvia.com.mx/wp-includes/' 'https://blog.rauvia.com.mx/wp-includes/' --all-tables-with-prefix --precise
```

*Nota: No reemplazar el dominio completo `https://rauvia.com.mx` sin la ruta específica de WP, ya que afectaría URLs que ahora son de React.*
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-blog-rendering-decision.md
# Decisión sobre Renderizado del Blog

**Decisión: Opción A - WordPress Renderiza Públicamente en /blog/**

**Justificación:** 
- WordPress funcionará como CMS headless para los recursos que React consume vía API (ej. `/recursos`).
- Sin embargo, la instalación nativa de WP se conserva en `/blog/` y servirá sus propios artículos.
- Se debe asegurar que las URLs en React para consumo (ej. `/recursos/:slug`) utilicen canonical hacia sí mismas si son el contenido principal, y evitar indexación duplicada. Si los artículos se consumen en `/recursos/:slug` en React, entonces la vista nativa de WP (`/blog/:slug`) debe tener un canonical apuntando a `/recursos/:slug` o viceversa, dependiendo de la estrategia SEO final.
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-root-htaccess.md
# .htaccess de la Raíz

```apache
<IfModule mod_rewrite.c>
RewriteEngine On

# Forzar HTTPS y dominio sin www
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} ^www\.rauvia\.com\.mx$ [NC]
RewriteRule ^ https://rauvia.com.mx%{REQUEST_URI} [R=301,L]

# REDIRECCIONES HISTÓRICAS CONOCIDAS (301 A LA HOME)
RewriteRule ^sobre-rauvia/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^servicios/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^contacto/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^nuestro-metodo/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^consultoria_gratis/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^test-madurez-sistemica/?$ https://rauvia.com.mx/ [R=301,L]

RewriteRule ^blog/?$ https://rauvia.com.mx/ [R=301,L]

RewriteRule ^blindaje-operativo-2026/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^delegacion-hueca-caos-a-sistema-90-dias/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^metricas-de-rentabilidad-para-agencias-en-cdmx/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^guia-gobernanza-rauvia/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^claridad-operativa-el-regalo-que-si-negocio-necesita/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^ruta-90-dias-agencias/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^diagnostico-de-fuga-de-capital-mejora-la-eficiencia-en-tu-agencia/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^ejecucion-ruta-90-solo-vs-acompanamiento/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^que-hace-rauvia-ruta-90-dias/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^ia-estrategia-contenido-agencias/?$ https://rauvia.com.mx/ [R=301,L]

RewriteRule ^wp-content/uploads/2025/11/RAUVIA_PRESENTACION_GUIA_2025\.pdf$ https://rauvia.com.mx/ [R=301,L]

# Adicionales identificadas en auditoría
RewriteRule ^contacto-anterior/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^servicios-antiguos/?$ https://rauvia.com.mx/ [R=301,L]
RewriteRule ^acerca-de/?$ https://rauvia.com.mx/ [R=301,L]

# No interceptar archivos y directorios reales
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Fallback de React para SPA
RewriteRule ^ index.html [L]
</IfModule>
```
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-redirect-map.csv
source,destination,type,status,reason,verified,owner
/contacto-anterior/,/contacto,301,pending,migracion_react,no,seo
/servicios-antiguos/,/soluciones,301,pending,migracion_react,no,seo
/acerca-de/,/nosotros,301,pending,migracion_react,no,seo
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-sitemap-transition.md
# Transición de Sitemaps

1. **Sitemap React:** Generado en `public/sitemap.xml` por el build.
2. **Sitemap WP:** Generado en `/blog/wp-sitemap.xml` (o plugin de SEO).
3. **Sitemap Index:** Se creará (o referenciará) para englobar ambos, o se indicarán de forma independiente en robots.txt.
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-cache-plan.md
# Plan de Purga de Caché

- Durante la migración, purgar caché en Hostinger / LiteSpeed / Cloudflare.
- Desactivar temporalmente los plugins de caché en WordPress (ej. LiteSpeed Cache) hasta que se valide el funcionamiento en `/blog/`.
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-deployment-playbook.md
# Playbook de Despliegue

1. Congelar cambios en WP.
2. Realizar respaldo completo.
3. Copiar archivos a `/blog`.
4. Modificar `wp-config.php` en `/blog` (WP_HOME y WP_SITEURL).
5. Actualizar rutas en DB con WP-CLI.
6. Actualizar Permalinks en `/blog/wp-admin/`.
7. Probar WP en `/blog/`.
8. Actualizar variables React (API URL apuntando a `/blog/wp-json/wp/v2`).
9. Build de React y despliegue a la raíz.
10. Instalar `.htaccess` de la raíz.
11. Purgar caché y realizar validaciones finales.
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-rollback-playbook.md
# Playbook de Rollback

1. Eliminar archivos del build de React de la raíz.
2. Eliminar el nuevo `.htaccess` y restaurar el original.
3. El WordPress original seguirá en la raíz (no se eliminó aún).
4. Purgar caché.
5. Validar que el sitio original en la raíz vuelve a funcionar.
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-post-deployment-monitoring.md
# Monitoreo Post-Despliegue

- Primeras 24-72h:
  - Revisar GSC por errores 404.
  - Comprobar que los logs de Apache no muestren 500s.
  - Verificar que WP REST API entrega datos a React.
  - Verificar que se pueden subir imágenes desde `wp-admin`.
INNER_EOF

cat << 'INNER_EOF' > docs/phase-0-handoff.md
# Handoff Fase 0

- **Arquitectura Anterior:** WP en la raíz.
- **Arquitectura Nueva:** React en la raíz, WP en `/blog/`.
- **Acciones Manuales Pendientes:** Ejecutar la copia de archivos, reemplazar URLs en base de datos, configurar servidor.
- **Riesgos Residuales:** Enlaces duros en contenido de WordPress hacia la raíz que requieran redirección 301.
- **Validación:** Se generó `npm run audit:migration` para auditar la configuración local de React y la API.
INNER_EOF

