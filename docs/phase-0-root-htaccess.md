> Archivo histórico de Fase 0. No instalar estas reglas en V73: redirigen contenidos retirados a Home y contienen fallback de SPA. La política vigente vive en `server/seo/legacyRoutes.ts` y en `docs/v73-stabilization-report.md`; el servicio Node de Hostinger no requiere copiar este ejemplo a Apache.

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

# Fallback de React / Vite SPA
RewriteRule ^ index.html [L]
</IfModule>
```
