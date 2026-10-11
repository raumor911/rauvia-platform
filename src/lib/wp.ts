import { WP_CONFIG } from '../config/wordpress';
import {sortPublishedPosts} from './postDates';

export interface WPPost {
  id: number;
  date: string;
  modified: string;
  date_gmt?: string;
  modified_gmt?: string;
  status?: string;
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

export async function getPosts(signal?: AbortSignal): Promise<WPPost[]> {
  const direct=new URL(WP_CONFIG.endpoints.posts);
  direct.searchParams.set('_embed',''); direct.searchParams.set('status','publish');
  direct.searchParams.set('per_page','100'); direct.searchParams.set('orderby','date'); direct.searchParams.set('order','desc');
  direct.searchParams.set('_cb',String(Date.now()));
  for(const url of ['/api/wp/posts',direct.toString()]) {
    try {
      const response=await fetch(url,{signal,cache:'no-store'});
      if(!response.ok || response.headers.get('Warning')?.startsWith('110')) continue;
      const data=await response.json();
      if(Array.isArray(data) && data.every(p=>p && typeof p.slug==='string' && typeof p.date==='string' && p.title?.rendered !== undefined && p.excerpt?.rendered !== undefined)) return sortPublishedPosts(data);
    } catch(error) {if(signal?.aborted) throw error;}
  }
  throw new Error('WordPress temporalmente no disponible');
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
