/**
 * Configuración centralizada de endpoints de WordPress.
 * Apunta a https://blog.rauvia.com.mx
 */

const WP_BASE_URL = (import.meta as any).env?.VITE_WORDPRESS_PUBLIC_URL || 'https://blog.rauvia.com.mx';
const WP_API_BASE = (import.meta as any).env?.VITE_WORDPRESS_API_URL || `${WP_BASE_URL}/wp-json/wp/v2`;

export const WP_CONFIG = {
  baseUrl: WP_BASE_URL,
  apiUrl: WP_API_BASE,
  endpoints: {
    posts: `${WP_API_BASE}/posts`,
    categories: `${WP_API_BASE}/categories`,
    tags: `${WP_API_BASE}/tags`,
    media: `${WP_API_BASE}/media`,
    users: `${WP_API_BASE}/users`,
  }
};
