# Política de Headers HTTP

- `Content-Type: text/html; charset=utf-8` para páginas.
- Se recomienda configurar en `.htaccess`:
  - `X-Robots-Tag` para evitar indexación de APIs o archivos PDF irrelevantes.
  - `Strict-Transport-Security` (HSTS).
  - `X-Content-Type-Options: nosniff`.
