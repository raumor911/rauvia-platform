import { WP_CONFIG } from '../config/wordpress';
import { FALLBACK_POSTS } from '../data/fallbackPosts';

export interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    author?: Array<{
      name: string;
      link: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export async function getPosts(): Promise<WPPost[]> {
  // Intentar primero directamente desde el cliente para evitar bloqueos de red interna del servidor (Hostinger)
  try {
    const cacheBuster = `_cb=${Date.now()}`;
    const response = await fetch(`${WP_CONFIG.endpoints.posts}?_embed&status=publish&${cacheBuster}`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Fallo el fetch directo a WP, intentando proxy...', error);
  }

  // Fallback al proxy del servidor
  try {
    const proxyRes = await fetch('/api/wp/posts');
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    // Proxy fetch failed
  }

  return FALLBACK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  // Prefer the same cache used for initial HTML. A successful empty result is
  // authoritative: it must never resurrect a removed post from local fallback.
  const urls = [
    `/api/wp/posts?slug=${encodeURIComponent(slug)}`,
    `${WP_CONFIG.endpoints.posts}?slug=${encodeURIComponent(slug)}&_embed&status=publish&_cb=${Date.now()}`,
  ];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const posts = await response.json();
      if (Array.isArray(posts)) return posts.find(post => post.slug === slug) || null;
    } catch { /* The direct endpoint remains available if the proxy fails. */ }
  }
  throw new Error('WordPress temporalmente no disponible');
}
