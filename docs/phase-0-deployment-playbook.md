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
