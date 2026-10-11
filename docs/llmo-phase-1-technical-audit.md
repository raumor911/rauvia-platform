# Auditoría Técnica Inicial (Fase 1)

## A. React
- **Framework:** React + Vite.
- **Enrutamiento:** React Router Dom v7.
- **SEO/Metadatos:** Uso de `Helmet` a través de componente `SEO.tsx` centralizado.
- **Sitemap:** Generado automáticamente mediante script `scripts/generate-sitemap.js` (incluye posts del blog consultados a la API).

## B. WordPress
- **Ubicación:** `/blog/`
- **Robots.txt:** Administrado desde la raíz de React para cubrir ambos ecosistemas.
- **Rastreo:** Rutas `/blog/wp-admin/` bloqueadas correctamente.

## C. Infraestructura
- **Servidor:** Apache (Hostinger) u otros servidores basados en .htaccess.
- **Reglas de Rendimiento:** Vite realiza minificación.

**Clasificación de Hallazgos:**
- No hay P0 (bloqueo de indexación).
- (P2) Se deben optimizar headers HTTP para CORS y Caché a futuro.
