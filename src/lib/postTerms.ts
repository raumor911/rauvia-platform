import type {WPPost} from './wp';

// Temas (categorías) y etiquetas de una entrada, para filtrar el índice de Recursos.
export type Term = {slug: string; name: string};
export type Facet = Term & {count: number};

const ENTITIES: Record<string, string> = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…'};
export function decodeEntities(value: string) {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') { const n = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return Number.isFinite(n) ? String.fromCodePoint(n) : m; }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const IGNORED = new Set(['uncategorized', 'sin-categoria']);
export function postTerms(post: WPPost): {categories: Term[]; tags: Term[]} {
  const groups = (post._embedded?.['wp:term'] ?? []).flat();
  const pick = (taxonomy: string) => {
    const seen = new Set<string>();
    return groups.filter(t => t && t.taxonomy === taxonomy && t.slug && t.name && !IGNORED.has(t.slug) && !seen.has(t.slug) && seen.add(t.slug))
      .map(t => ({slug: t.slug, name: decodeEntities(t.name)}));
  };
  return {categories: pick('category'), tags: pick('post_tag')};
}

export function buildFacets(posts: WPPost[]) {
  const cats = new Map<string, Facet>(), tags = new Map<string, Facet>();
  for (const post of posts) {
    const t = postTerms(post);
    for (const [map, list] of [[cats, t.categories], [tags, t.tags]] as const)
      for (const term of list) { const hit = map.get(term.slug); if (hit) hit.count++; else map.set(term.slug, {...term, count: 1}); }
  }
  const sort = (a: Facet, b: Facet) => b.count - a.count || a.name.localeCompare(b.name, 'es');
  return {categories: [...cats.values()].sort(sort), tags: [...tags.values()].sort(sort)};
}

export function matchesFilters(post: WPPost, category: string | null, tags: string[]) {
  if (!category && !tags.length) return true;
  const t = postTerms(post);
  if (category && !t.categories.some(c => c.slug === category)) return false;
  if (tags.length && !t.tags.some(x => tags.includes(x.slug))) return false;
  return true;
}
