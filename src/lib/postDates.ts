import type {WPPost} from './wp';
// WordPress date is the publication time in the site's civil timezone. Editorial
// dates inside content and modified timestamps do not change publication order.
export function sortPublishedPosts(posts: WPPost[]): WPPost[] {
  const stamp=(p:WPPost)=>Date.parse(p.date_gmt ? p.date_gmt.replace(/Z$/, '')+'Z' : p.date) || 0;
  return [...posts].sort((a,b)=>stamp(b)-stamp(a) || b.id-a.id);
}
export function publicationLabel(date: string): string {
  const day=/^\d{4}-\d{2}-\d{2}/.exec(date || '')?.[0];
  if(!day) return '';
  return new Date(day+'T12:00:00Z').toLocaleDateString('es-MX',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'});
}
