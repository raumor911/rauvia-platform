# Política de Robots.txt

- **Ubicación:** `public/robots.txt`
- **Reglas:**
  - `Allow: /` y `Allow: /blog/` para todos los bots importantes.
  - `Disallow: /blog/wp-admin/` y `/blog/wp-login.php` para ocultar administración.
  - `Allow: /blog/wp-admin/admin-ajax.php` (requerido por funcionalidades AJAX de WP).
- **Bots explícitamente permitidos:**
  - Googlebot
  - Bingbot
  - OAI-SearchBot
  - ChatGPT-User
- Se referencia `https://rauvia.com.mx/sitemap.xml`.
