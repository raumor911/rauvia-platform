import type {WPPost} from '../../src/lib/wp';

// Cards need metadata, an excerpt and the compact topic terms (id, name, slug, taxonomy) used to filter the
// index. They never carry the complete article body or the author. Keep full posts in the server cache for
// article rendering and event checks.
export function resourceCards(posts: WPPost[]): WPPost[] {
  return posts.map(p=>{
    const media=p._embedded?.['wp:featuredmedia']?.[0];
    const terms=p._embedded?.['wp:term']?.map(group=>(group||[]).filter(t=>t&&typeof t.slug==='string'&&typeof t.name==='string').map(t=>({id:t.id,name:t.name,slug:t.slug,taxonomy:t.taxonomy}))).filter(group=>group.length);
    const embedded={
      ...(media ? {'wp:featuredmedia':p._embedded!['wp:featuredmedia']!.map(m=>({source_url:m.source_url,alt_text:m.alt_text}))} : {}),
      ...(terms?.length ? {'wp:term':terms} : {}),
    };
    return {
      id:p.id,slug:p.slug,date:p.date,date_gmt:p.date_gmt,
      modified:p.modified,modified_gmt:p.modified_gmt,status:p.status,
      title:p.title,excerpt:p.excerpt,content:{rendered:''},
      ...(Object.keys(embedded).length ? {_embedded:embedded} : {}),
    };
  });
}
