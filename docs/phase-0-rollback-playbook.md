# Playbook de Rollback

1. Eliminar archivos del build de React de la raíz.
2. Eliminar el nuevo `.htaccess` y restaurar el original.
3. El WordPress original seguirá en la raíz (no se eliminó aún).
4. Purgar caché.
5. Validar que el sitio original en la raíz vuelve a funcionar.
