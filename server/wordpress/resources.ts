import type {WPPost} from '../../src/lib/wp';

// Cards need metadata and an excerpt, never the complete article body or terms.
// Keep full posts in the server cache for article rendering and event checks.
export function resourceCards(posts: WPPost[]): WPPost[] {
  return posts.map(p=>({
    id:p.id,slug:p.slug,date:p.date,date_gmt:p.date_gmt,
    modified:p.modified,modified_gmt:p.modified_gmt,status:p.status,
    title:p.title,excerpt:p.excerpt,content:{rendered:''},
    ...(p._embedded?.['wp:featuredmedia']?.[0] ? {_embedded:{'wp:featuredmedia':p._embedded['wp:featuredmedia'].map(m=>({source_url:m.source_url,alt_text:m.alt_text}))}} : {}),
  }));
}
