import type {WPPost} from '../../src/lib/wp';
import {sortPublishedPosts} from '../../src/lib/postDates';
import {FALLBACK_POSTS} from '../../src/data/fallbackPosts';

export type PostResult = {status: 200 | 404 | 503; post?: WPPost; stale?: boolean};
// Shared by the HTML resolver and the existing proxy. Keep the ten-minute TTL,
// short timeout, retry and fallback policy; cache individual/negative lookups too.
export function createWordPressCache({fetcher = fetch, now = Date.now, env = process.env, fallback = FALLBACK_POSTS}: {
  fetcher?: typeof fetch; now?: () => number; env?: NodeJS.ProcessEnv; fallback?: WPPost[];
} = {}) {
  const ttl = 10 * 60 * 1000; const entries = new Map<string,{result:PostResult; expires:number}>();
  const inflight = new Map<string,Promise<PostResult>>();
  let generation = 0;
  let cachedPosts: WPPost[] = sortPublishedPosts(fallback); let lastFetchTime = 0; let listInflight: Promise<WPPost[]> | undefined;
  const base = env.VITE_WORDPRESS_API_URL || 'https://blog.rauvia.com.mx/wp-json/wp/v2';
  function remember(slug: string, result: PostResult) {
    if (entries.size >= 256 && !entries.has(slug)) entries.delete(entries.keys().next().value!);
    entries.set(slug,{result,expires:now()+(result.status===404?60_000:ttl)});
  }
  async function request(slug?: string): Promise<WPPost[]> {
    const url = new URL(base.replace(/\/$/,'')+'/posts');
    url.searchParams.set('per_page','100'); url.searchParams.set('orderby','date'); url.searchParams.set('order','desc');
    url.searchParams.set('_embed',''); url.searchParams.set('status','publish'); url.searchParams.set('_cb',String(now()));
    if (slug) url.searchParams.set('slug',slug);
    for (let attempt=0; attempt<2; attempt++) {
      try {
        const response=await fetcher(url.toString(),{cache:'no-store',signal:AbortSignal.timeout(Number(env.WORDPRESS_FETCH_TIMEOUT_MS)||5000)});
        if (!response.ok) throw new Error(`WordPress HTTP ${response.status}`);
        const data=await response.json();
        if (!Array.isArray(data) || !data.every(p=>p && typeof p.date==='string' && Number.isFinite(Date.parse(p.date)) && typeof p.slug==='string' && typeof p.title?.rendered==='string' && typeof p.content?.rendered==='string' && typeof p.excerpt?.rendered==='string')) throw new Error('Invalid WordPress posts');
        return sortPublishedPosts(data.filter(p=> !p.status || p.status==='publish'));
      } catch (error) {
        if (attempt===1) throw error;
        await new Promise(resolve=>setTimeout(resolve,500));
      }
    }
    throw new Error('WordPress unavailable');
  }
  async function getPost(slug: string): Promise<PostResult> {
    if (!slug || /[/?#\s]/.test(slug) || slug.length>200) return {status:404};
    const entry=entries.get(slug); if (entry && entry.expires>now()) return entry.result;
    const match=cachedPosts.find(p=>p.slug===slug);
    if (match && entry?.result.status!==404 && lastFetchTime > 0 && now()-lastFetchTime<ttl) return {status:200,post:match};
    if (inflight.has(slug)) return inflight.get(slug)!;
    const epoch=generation;
    const pending=(async (): Promise<PostResult> => {
      try {
        const posts=await request(slug); if(epoch!==generation) return getPost(slug); const post=posts.find(p=>p.slug===slug);
        const result: PostResult=post ? {status:200,post} : {status:404};
        remember(slug,result); return result;
      } catch {
        if(epoch!==generation) return getPost(slug);
        const stale=entry?.result.post || (entry?.result.status===404 ? undefined : match);
        // An outage is not evidence that a post does not exist. Never cache a
        // failed fetch as a 404, and never replace an unknown article with Home.
        return stale ? {status:200,post:stale,stale:true} : {status:503};
      } finally { if(epoch===generation) inflight.delete(slug); }
    })();
    inflight.set(slug,pending); return pending;
  }
  async function getPosts(): Promise<WPPost[]> {
    if (lastFetchTime > 0 && now()-lastFetchTime<ttl) return cachedPosts;
    if (listInflight) return listInflight;
    const epoch=generation;
    listInflight=(async()=>{try {const posts=await request(); if(epoch!==generation) return getPosts(); cachedPosts=posts; lastFetchTime=now(); return posts;} catch {if(epoch!==generation) return getPosts(); return cachedPosts;} finally {if(epoch===generation) listInflight=undefined;}})();
    return listInflight;
  }
  async function fetchWPPosts(slug?: string) {
    if (!slug) return getPosts();
    const result=await getPost(slug); return result.post ? [result.post] : [];
  }
  function invalidate() {
    generation++; lastFetchTime=0; listInflight=undefined; inflight.clear();
    for(const entry of entries.values()) entry.expires=0;
  }
  async function getPostsSnapshot() {
    const posts=await getPosts();
    return {posts, stale:!lastFetchTime || now()-lastFetchTime>=ttl};
  }
  return {getPost,getPosts,getPostsSnapshot,fetchWPPosts,invalidate,revision:()=>generation};
}
export const wordpressCache = createWordPressCache();
