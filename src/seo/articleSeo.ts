import sanitizeHtml from 'sanitize-html';
import {decodeHTML} from 'entities';
import type {WPPost} from '../lib/wp';
import type {PageSeo} from './buildMetaTags';

export const plainText = (html: string) => decodeHTML(sanitizeHtml(html || '', {allowedTags:[], allowedAttributes:{}})).replace(/\s+/g,' ').trim();
export function articleSeo(post: WPPost) {
  const headline = plainText(post.title.rendered);
  const description = plainText(post.excerpt.rendered) || plainText(post.content.rendered).slice(0,160);
  const authorName = plainText(post._embedded?.author?.[0]?.name || '');
  const source = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const image = source && /^https?:\/\//i.test(source) ? source : undefined;
  const canonical = `https://rauvia.com.mx/recursos/${encodeURIComponent(post.slug)}/`;
  const validDate = (date: string) => date && Number.isFinite(Date.parse(date)) ? date : undefined;
  const datePublished = validDate(post.date); const dateModified = validDate(post.modified);
  const article = {'@context':'https://schema.org','@type':'BlogPosting','@id':canonical+'#article',
    headline, description, mainEntityOfPage:{'@type':'WebPage','@id':canonical},
    publisher:{'@id':'https://rauvia.com.mx/#organization'},
    ...(image ? {image} : {}), ...(authorName ? {author:{'@type':'Person',name:authorName}} : {}),
    ...(datePublished ? {datePublished} : {}), ...(dateModified ? {dateModified} : {}),
  };
  const seo: PageSeo = {title:headline+' | RAUVIA',description,canonical,ogTitle:headline,ogType:'article',
    ogImage:image,publishedTime:datePublished,modifiedTime:dateModified,author:authorName || undefined,schema:[article]};
  return {seo,headline,description,authorName,image};
}
