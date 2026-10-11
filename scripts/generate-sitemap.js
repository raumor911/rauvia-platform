import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { publicRoutes } from './public-routes.js';
import { beginTrackedTask } from '../server/observability/index.js';
import { getSafeUrlMeta } from '../server/observability/redaction.js';

const escapeXml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));

async function fetchWithRetry(url, options = {}, retries = 3) {
  const task = beginTrackedTask('wordpress_sitemap_fetch', 'external_http_request', {
    externalService: 'wordpress', resource: 'external_http_request', ...getSafeUrlMeta(url),
  });
  let error = null; let attempts = 0;
  try {
    for (let i = 0; i < retries; i++) {
      attempts = i + 1;
      let id = null;
      try {
        const controller = new AbortController();
        const timeoutMs = Number(process.env.WORDPRESS_FETCH_TIMEOUT_MS) || 5000;
        id = setTimeout(() => controller.abort(), timeoutMs); // configurable timeout
        const res = await fetch(url, { ...options, signal: controller.signal });
        task.complete({ attempts, statusCode: res.status });
        return res;
      } catch (err) {
        error = err;
        if (i === retries - 1) throw err;
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      } finally {
        if (id) clearTimeout(id);
      }
    }
  } finally {
    if (error && attempts === retries) task.fail({ attempts, error: error instanceof Error ? error.message : 'Unknown WordPress fetch error' });
  }
}

export async function fetchPosts(fetcher = fetchWithRetry, env = process.env) {
  const base = env.VITE_WORDPRESS_API_URL || 'https://blog.rauvia.com.mx/wp-json/wp/v2';
  const endpoint = new URL(env.WP_API_URL || `${base.replace(/\/$/, '')}/posts`);
  endpoint.searchParams.set('status', 'publish');
  endpoint.searchParams.set('per_page', '100');
  endpoint.searchParams.set('orderby', 'modified');
  endpoint.searchParams.set('order', 'desc');
  endpoint.searchParams.set('_fields', 'slug,modified,modified_gmt');
  const posts = [];
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    endpoint.searchParams.set('page', String(page));
    const response = await fetcher(endpoint.toString());
    if (!response.ok) throw new Error(`WordPress HTTP ${response.status}; sitemap anterior conservado.`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Respuesta WordPress inválida.');
    const count = response.headers.get('x-wp-totalpages');
    if (count !== null) {
      totalPages = Number(count);
      if (!Number.isInteger(totalPages) || totalPages < 0 || totalPages > 500) throw new Error('Paginación inválida.');
    } else if (batch.length === 100) {
      throw new Error('Falta X-WP-TotalPages; no se puede garantizar un sitemap completo.');
    }
    for (const post of batch) {
      if (typeof post.slug !== 'string' || !post.slug || /[/?#\s]/.test(post.slug)) throw new Error('Slug WordPress inválido.');
      posts.push(post);
    }
  }
  return posts;
}

export function renderSitemap(posts) {
  const entries = new Map(publicRoutes.map(route => {
    // Enforce trailing slash para estandarización SEO/GEO
    const cleanRoute = route === '/' ? '/' : (route.endsWith('/') ? route : `${route}/`);
    return [cleanRoute, null];
  }));
  for (const post of posts) {
    const date = post.modified_gmt || post.modified;
    // WordPress typically returns "YYYY-MM-DDTHH:mm:ss". Let's append +00:00 if it's GMT
    const isGmt = !!post.modified_gmt;
    let lastmod = null;
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(date) && Number.isFinite(Date.parse(date))) {
      lastmod = isGmt && !date.includes('+') && !date.endsWith('Z') ? `${date}+00:00` : date;
    }
    entries.set(`/recursos/${post.slug}/`, lastmod);
  }
  if (entries.size > 50000) throw new Error('Se requiere dividir el sitemap.');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [...entries].map(([route, date]) => `  <url><loc>${escapeXml(`https://rauvia.com.mx${route}`)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}</url>`).join('\n') + '\n</urlset>\n';
}

