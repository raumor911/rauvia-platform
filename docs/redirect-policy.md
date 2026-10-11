# Política de Redirecciones y Normalización

1. Forzar HTTPS y no-www (implementado en `.htaccess` raíz).
2. Evitar trailing slash conflictivo: La configuración de Vite y Apache delega `index.html`.
3. Redirecciones de URLs históricas (de la raíz hacia `/blog/` o hacia nuevas rutas de React) documentadas en Fase 0 (`docs/phase-0-redirect-map.csv`).
4. Tipo: Siempre `301 Moved Permanently`.
