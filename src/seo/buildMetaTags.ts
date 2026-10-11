import {personSchema} from './personSchema.ts';
import {ENTITIES} from '../config/entity';

export interface PageSeo {
  title: string; description: string; canonical?: string | null; ogTitle?: string;
  ogDescription?: string; ogType?: string; ogImage?: string; robots?: string;
  twitterCard?: string; imageWidth?: string; imageHeight?: string; imageAlt?: string;
  publishedTime?: string; modifiedTime?: string; author?: string; schema?: object[];
}
export const canonicalPath = (path: string) => path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
export function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
}
export function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, char => '\\u'+char.charCodeAt(0).toString(16).padStart(4,'0'));
}
export function baseEntities() {
  return [{ '@context':'https://schema.org', '@type':'Organization', ...ENTITIES.organization, founder:{'@id':ENTITIES.founder['@id']} },
    {'@context':'https://schema.org', '@type':'WebSite', ...ENTITIES.website, publisher:{'@id':ENTITIES.organization['@id']}}];
}
export function schemasFor(seo: PageSeo) {
  const seen = new Set<string>();
  return [...(seo.schema || []).map((item:any)=>item['@type']==='Person'&&item['@id']===ENTITIES.founder['@id']?personSchema():item), ...baseEntities()].filter((item: any) => {
    const key = item['@id'] || safeJson(item);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).map(item => ({'@context':'https://schema.org', ...item}));
}
// Both server HTML and client metadata use this list.
export function metaEntries(seo: PageSeo): Array<{name?: string; property?: string; content: string}> {
  const ogTitle = seo.ogTitle || seo.title; const desc = seo.ogDescription || seo.description;
  const entries = [
    {name:'description',content:seo.description}, {name:'robots',content:seo.robots || 'index, follow'},
    {property:'og:title',content:ogTitle}, {property:'og:description',content:desc},
    ...(seo.canonical ? [{property:'og:url',content:seo.canonical}] : []), {property:'og:type',content:seo.ogType || 'website'},
    {property:'og:site_name',content:'RAUVIA Consulting'}, {property:'og:locale',content:'es_MX'},
    {name:'twitter:card',content:seo.twitterCard || 'summary_large_image'},
    {name:'twitter:title',content:ogTitle}, {name:'twitter:description',content:desc},
  ];
  for (const [property, content] of [['og:image',seo.ogImage],['og:image:width',seo.imageWidth],['og:image:height',seo.imageHeight],['og:image:alt',seo.imageAlt],['article:published_time',seo.publishedTime],['article:modified_time',seo.modifiedTime],['article:author',seo.author]]) {
    if (content) entries.push({property,content});
  }
  if (seo.ogImage) entries.push({name:'twitter:image',content:seo.ogImage});
  return entries;
}
export function buildMetaTags(seo: PageSeo) {
  return `<title>${escapeHtml(seo.title)}</title>\n`+
    (seo.canonical ? `<link rel="canonical" href="${escapeHtml(seo.canonical)}">\n` : '')+
    metaEntries(seo).map(entry => `<meta ${entry.name ? 'name' : 'property'}="${entry.name || entry.property}" content="${escapeHtml(entry.content)}">`).join('\n')+
    '\n'+schemasFor(seo).map(data => `<script type="application/ld+json" data-rauvia-seo>${safeJson(data)}</script>`).join('\n');
}
