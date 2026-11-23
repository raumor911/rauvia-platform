import RouteSEO from '../seo/PageMetadata';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type {WPPost} from '../lib/wp';
import {initialContent} from '../lib/initialContent';
import {sanitizeTitleHtml} from '../lib/editorial';
import {publicationLabel,sortPublishedPosts} from '../lib/postDates';
import FadeInUp from '../components/FadeInUp';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageFx from '../hooks/usePageFx';
import ConvergenceField from '../components/ConvergenceField';
import PostCover from '../components/PostCover';
import {buildFacets, matchesFilters, postTerms} from '../lib/postTerms';
import '../styles/scrollReveal.css';
import '../styles/pageFrontier.css';
import '../styles/recursosFx.css';

export default function RecursosPage({initialPosts,initialStale}: {initialPosts?: WPPost[];initialStale?:boolean} = {}) {
  const [posts, setPosts] = useState<WPPost[]>(() => sortPublishedPosts(initialPosts || (initialContent()?.path === '/recursos/' ? initialContent()?.posts : undefined) || []));
  const root = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState(false);
  const [allCats, setAllCats] = useState(false);
  const facets = useMemo(() => buildFacets(posts), [posts]);
  const visible = useMemo(() => posts.filter(post => matchesFilters(post, category, tags)), [posts, category, tags]);
  const filtering = !!category || tags.length > 0;
  useScrollReveal(root, '.rv-resource-card', visible.map(post => post.id).join(','));
  usePageFx(root);

  // Filtros en la dirección (?tema=…&etiqueta=a,b) para poder compartir una selección.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get('tema'); const e = q.get('etiqueta');
    if (t) setCategory(t);
    if (e) setTags(e.split(',').filter(Boolean));
  }, []);
  useEffect(() => {
    const q = new URLSearchParams();
    if (category) q.set('tema', category);
    if (tags.length) q.set('etiqueta', tags.join(','));
    const next = window.location.pathname + (q.toString() ? `?${q}` : '') + window.location.hash;
    if (next !== window.location.pathname + window.location.search + window.location.hash) window.history.replaceState(window.history.state, '', next);
  }, [category, tags]);
  const toggleTag = (slug: string) => setTags(list => list.includes(slug) ? list.filter(x => x !== slug) : [...list, slug]);
  const clear = () => { setCategory(null); setTags([]); };
  const shownTags = allTags ? facets.tags : facets.tags.filter((t, i) => i < 12 || tags.includes(t.slug));
  const hiddenTags = facets.tags.length - shownTags.length;

  const [loading, setLoading] = useState(() => !(initialPosts || (initialContent()?.path==='/recursos/' ? initialContent()?.posts : undefined)));

  const [unavailable,setUnavailable] = useState(()=>initialStale ?? (initialContent()?.path==='/recursos/' && !!initialContent()?.stale));
  useEffect(() => {
    let mounted=true, sequence=0, retries=0, controller:AbortController | undefined;
    let retryTimer:ReturnType<typeof setTimeout> | undefined;
    const refresh=async()=>{
      if(retryTimer)clearTimeout(retryTimer);
      const current=++sequence; controller?.abort(); const active=new AbortController();controller=active;
      try {
        const {getResources}=await import('../lib/wp'); const data=await getResources(active.signal);
        if(mounted && current===sequence){
          setPosts(data.posts);setUnavailable(data.stale);
          if(data.stale && retries<3)retryTimer=setTimeout(()=>{if(mounted && document.visibilityState==='visible')void refresh();},[1500,3000,6000][retries++]);
          if(!data.stale)retries=0;
        }
      } catch {if(mounted && current===sequence)setUnavailable(true);}
      finally {if(mounted && current===sequence)setLoading(false);}
    };
    const visible=()=>{if(document.visibilityState==='visible'){retries=0;void refresh();}};
    void refresh(); window.addEventListener('focus',visible);document.addEventListener('visibilitychange',visible);
    return ()=>{mounted=false;sequence++;controller?.abort();if(retryTimer)clearTimeout(retryTimer);window.removeEventListener('focus',visible);document.removeEventListener('visibilitychange',visible);};
  }, []);

  return (
    <div ref={root} className="rv-resources-motion fx-page fx-recursos">
      <div className="fx-progress" aria-hidden="true" />
      <RouteSEO path="/recursos" />

      <section className="fx-hero rs-hero pt-32 pb-14 px-4 sm:px-6 lg:px-8 xl:px-12">
        <ConvergenceField origin={[0.82, 0.55]} className="fx-field" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <FadeInUp>
            <h1 className="rs-title text-5xl md:text-6xl font-display mb-6">
              Recursos
            </h1>
            <p className="rs-lead text-xl max-w-3xl">
              Perspectivas sobre estrategia comercial, arquitectura operativa y tecnología para el crecimiento.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="fx-light rs-journal pt-12 pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-rauvia-bg">
        <div className="max-w-[1600px] mx-auto">
          {unavailable && <p role="status" className="text-rauvia-gray mb-6">No pudimos actualizar los recursos. Conservamos la última información disponible; volveremos a intentarlo al regresar a esta página.</p>}

          {!loading && (facets.categories.length > 0 || facets.tags.length > 0) && (
            <div className="rs-filters" role="group" aria-label="Elegir temas de interés">
              {facets.categories.length > 0 && (
                <div className="rs-filter-row">
                  <span className="rs-filter-label" id="rs-temas">Temas</span>
                  <div className={`rs-chips${allCats ? ' is-open' : ''}`} role="group" aria-labelledby="rs-temas">
                    <button type="button" className="rs-chip" aria-pressed={!category} onClick={() => setCategory(null)}>Todos <span>{posts.length}</span></button>
                    {facets.categories.map((c, i) => (
                      <button key={c.slug} type="button" className={`rs-chip${i >= 5 ? ' rs-xtra' : ''}`} aria-pressed={category === c.slug} onClick={() => setCategory(category === c.slug ? null : c.slug)}>{c.name} <span>{c.count}</span></button>
                    ))}
                    {facets.categories.length > 5 && (
                      <button type="button" className="rs-chip rs-chip-more rs-only-mobile" aria-expanded={allCats} onClick={() => setAllCats(v => !v)}>{allCats ? 'Ver menos' : `Ver todos (${facets.categories.length})`}</button>
                    )}
                  </div>
                </div>
              )}
              {facets.tags.length > 0 && (
                <div className="rs-filter-row">
                  <span className="rs-filter-label" id="rs-etiquetas">Etiquetas</span>
                  <div className={`rs-chips rs-chips-tags${allTags ? ' is-open' : ''}`} role="group" aria-labelledby="rs-etiquetas">
                    {shownTags.map((t, i) => (
                      <button key={t.slug} type="button" className={`rs-chip rs-chip-tag${i >= 6 ? ' rs-xtra' : ''}`} aria-pressed={tags.includes(t.slug)} onClick={() => toggleTag(t.slug)}>{t.name} <span>{t.count}</span></button>
                    ))}
                    {(hiddenTags > 0 || allTags) && (
                      <button type="button" className="rs-chip rs-chip-more" aria-expanded={allTags} onClick={() => setAllTags(v => !v)}>{allTags ? 'Ver menos' : `Ver todas (${facets.tags.length})`}</button>
                    )}
                  </div>
                </div>
              )}
              <p className="rs-status" role="status" aria-live="polite">
                <strong>{visible.length}</strong> {visible.length === 1 ? 'artículo' : 'artículos'}
                {filtering && <button type="button" className="rs-clear" onClick={clear}>Limpiar filtros</button>}
              </p>
            </div>
          )}

          {loading ? (
            <div className="rs-grid">
              {[1, 2, 3].map(i => (
                <div key={i} className="rs-skeleton animate-pulse flex flex-col gap-4">
                  <div className="bg-rauvia-card aspect-video w-full rounded-lg"></div>
                  <div className="h-6 bg-rauvia-card w-3/4 rounded"></div>
                  <div className="h-4 bg-rauvia-card w-full rounded"></div>
                  <div className="h-4 bg-rauvia-card w-2/3 rounded"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-rauvia-gray py-12">
              No hay artículos disponibles en este momento.
            </div>
          ) : visible.length === 0 ? (
            <div className="rs-empty">
              <p>No hay artículos con esa combinación de temas y etiquetas.</p>
              <button type="button" className="rs-clear" onClick={clear}>Limpiar filtros</button>
            </div>
          ) : (
            <div className="rs-grid">
              {visible.map((post, index) => {
                const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                const t = postTerms(post);
                const topic = t.categories[0];
                const chips = t.tags.slice(0, 3);
                return (
                  <div key={post.id} className={`rv-resource-card${index === 0 && !filtering ? ' rs-feature' : ''}`}>
                    <article className="rs-card flex group">
                      <div className="rs-cover">
                        {featuredMedia ? (
                          <img
                            loading={index === 0 ? 'eager' : 'lazy'} decoding="async" src={featuredMedia}
                            alt={post.title.rendered.replace(/<[^>]+>/g, "")}
                            className="w-full h-full object-cover"
                          />
                        ) : <PostCover seed={post.id} />}
                      </div>
                      <div className="rs-body">
                        {(topic || chips.length > 0) && (
                          <div className="rs-tags">
                            {topic && <button type="button" className="rs-tag rs-tag-topic" aria-pressed={category === topic.slug} onClick={() => setCategory(category === topic.slug ? null : topic.slug)}>{topic.name}</button>}
                            {chips.map(c => <button key={c.slug} type="button" className="rs-tag" aria-pressed={tags.includes(c.slug)} onClick={() => toggleTag(c.slug)}>{c.name}</button>)}
                          </div>
                        )}
                        <h2 className="rs-h2">
                          <Link to={`/recursos/${post.slug}/`} className="rs-stretch block" dangerouslySetInnerHTML={{ __html: sanitizeTitleHtml(post.title.rendered) }} />
                        </h2>
                        <div className="rs-excerpt" dangerouslySetInnerHTML={{ __html: sanitizeTitleHtml(post.excerpt.rendered) }} />
                        <div className="rs-meta">
                          <time dateTime={post.date}>{publicationLabel(post.date)}</time>
                          <ArrowUpRight aria-hidden="true" />
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
