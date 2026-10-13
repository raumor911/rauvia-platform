import RouteSEO from '../seo/PageMetadata';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type {WPPost} from '../lib/wp';
import {initialContent} from '../lib/initialContent';
import {sanitizeTitleHtml} from '../lib/editorial';
import {publicationLabel,sortPublishedPosts} from '../lib/postDates';
import FadeInUp from '../components/FadeInUp';

export default function RecursosPage({initialPosts,initialStale}: {initialPosts?: WPPost[];initialStale?:boolean} = {}) {
  const [posts, setPosts] = useState<WPPost[]>(() => sortPublishedPosts(initialPosts || (initialContent()?.path === '/recursos/' ? initialContent()?.posts : undefined) || []));
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
    <>
      <RouteSEO path="/recursos" />
      

      <section className="pt-32 pb-24 px-4 bg-rauvia-bg">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-display text-rauvia-text mb-6">
              Recursos
            </h1>
            <p className="text-xl text-rauvia-gray max-w-3xl mb-12">
              Perspectivas sobre estrategia comercial, arquitectura operativa y tecnología para el crecimiento.
            </p>
          </FadeInUp>

          {unavailable && <p role="status" className="text-rauvia-gray mb-6">No pudimos actualizar los recursos. Conservamos la última información disponible; volveremos a intentarlo al regresar a esta página.</p>}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => {
                const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                return (
                  <FadeInUp key={post.id} delay={index * 0.1}>
                    <Link to={`/recursos/${post.slug}/`} className="group flex flex-col h-full bg-rauvia-card border border-rauvia-border rounded-lg overflow-hidden transition-all hover:border-rauvia-accent/50 hover:shadow-lg">
                      {featuredMedia && (
                        <div className="aspect-video w-full overflow-hidden bg-rauvia-bg">
                          <img 
                            loading="lazy" decoding="async" src={featuredMedia} 
                            alt={post.title.rendered.replace(/<[^>]+>/g, "")} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-xl font-display text-rauvia-text mb-3 group-hover:text-rauvia-accent transition-colors" dangerouslySetInnerHTML={{ __html: sanitizeTitleHtml(post.title.rendered) }} />
                        <div className="text-rauvia-gray mb-4 text-sm flex-grow" dangerouslySetInnerHTML={{ __html: sanitizeTitleHtml(post.excerpt.rendered) }} />
                        <div className="flex justify-between items-center text-xs text-rauvia-gray mt-auto pt-4 border-t border-rauvia-border/50">
                          <time dateTime={post.date}>{publicationLabel(post.date)}</time>
                        </div>
                      </div>
                    </Link>
                  </FadeInUp>
                );
              })}
            </div>
          )}
        </div>
      </section>

      
    </>
  );
}
