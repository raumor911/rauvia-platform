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
