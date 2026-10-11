# Observabilidad Técnica

- **Errores 404/500:** Monitorizar en GSC y en los logs de Apache de Hostinger.
- **Soft 404:** Verificar que las rutas en React que no coincidan caigan en el componente `<NotFound>` que devuelva un código HTTP `404` real (gestionado por `.htaccess` y `server.ts`).
