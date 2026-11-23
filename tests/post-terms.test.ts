import test from 'node:test';
import assert from 'node:assert/strict';
import {buildFacets, matchesFilters, postTerms, decodeEntities} from '../src/lib/postTerms';

const post = (id: number, cats: string[], tags: string[]) => ({id, slug: `p${id}`, date: '2026-01-01T00:00:00', modified: '', title: {rendered: ''}, content: {rendered: ''}, excerpt: {rendered: ''},
  _embedded: {'wp:term': [cats.map(c => ({id: 1, name: c, slug: c.toLowerCase().replace(/ /g, '-'), taxonomy: 'category'})), tags.map(t => ({id: 2, name: t, slug: t.toLowerCase().replace(/ /g, '-'), taxonomy: 'post_tag'}))]}}) as any;

test('postTerms separa temas y etiquetas, decodifica entidades e ignora "Uncategorized"', () => {
  const t = postTerms(post(1, ['Uncategorized', 'Ops &amp; procesos'], ['PyMES']));
  assert.deepEqual(t.categories, [{slug: 'ops-&amp;-procesos', name: 'Ops & procesos'}]);
  assert.deepEqual(t.tags.map(x => x.name), ['PyMES']);
  assert.equal(decodeEntities('A &#8211; B &#x41;'), 'A – B A');
});
test('buildFacets cuenta y ordena por frecuencia; matchesFilters combina tema (Y) con etiquetas (O)', () => {
  const posts = [post(1, ['A'], ['x', 'y']), post(2, ['A'], ['y']), post(3, ['B'], ['x'])];
  const f = buildFacets(posts);
  assert.deepEqual(f.categories.map(c => [c.slug, c.count]), [['a', 2], ['b', 1]]);
  assert.deepEqual(f.tags.map(c => [c.slug, c.count]), [['x', 2], ['y', 2]]);
  assert.equal(posts.filter(p => matchesFilters(p, null, [])).length, 3);
  assert.equal(posts.filter(p => matchesFilters(p, 'a', [])).length, 2);
  assert.equal(posts.filter(p => matchesFilters(p, 'a', ['x'])).length, 1);
  assert.equal(posts.filter(p => matchesFilters(p, null, ['x', 'y'])).length, 3);
  assert.equal(matchesFilters({id: 9, _embedded: undefined} as any, 'a', []), false);
});
