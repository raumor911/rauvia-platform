# Handoff Fase 0

- **Arquitectura Anterior:** WP en la raíz.
- **Arquitectura Nueva:** React en la raíz, WP en `/blog/`.
- **Acciones Manuales Pendientes:** Ejecutar la copia de archivos, reemplazar URLs en base de datos, configurar servidor.
- **Riesgos Residuales:** Enlaces duros en contenido de WordPress hacia la raíz que requieran redirección 301.
- **Validación:** Se generó `npm run audit:migration` para auditar la configuración local de React y la API.
