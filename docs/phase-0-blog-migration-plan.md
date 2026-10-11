# Plan de Migración a /blog

1. **Crear Directorio:** `mkdir public_html/blog`
2. **Copiar Archivos:** Copiar todos los archivos y carpetas de WP a `/blog`.
3. **Configurar URL:** Definir `WP_HOME` y `WP_SITEURL` en `wp-config.php` de `/blog`.
4. **Actualizar DB:** Buscar y reemplazar `/wp-content/` por `/blog/wp-content/`, etc.
5. **Regenerar Permalinks:** Entrar a `/blog/wp-admin/` y guardar enlaces permanentes.
6. **Desplegar React:** Subir el build de React a `public_html/`.
7. **.htaccess Raíz:** Configurar redirecciones y exclusión de `/blog`.
