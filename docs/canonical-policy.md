# Política de URLs Canónicas

- **Dominio Canónico:** `https://rauvia.com.mx` (forzado HTTPS sin `www` vía `.htaccess`).
- **Implementación React:** Componente `SEO.tsx` inyecta `<link rel="canonical" href="https://rauvia.com.mx..." />`.
- **Implementación WordPress:** En `/blog/`, el canonical debe apuntar a la URL de ese artículo específico en WordPress (a menos que se consuma de forma Headless en una ruta de React, en cuyo caso WP debe tener el canonical apuntando a la ruta de React).
