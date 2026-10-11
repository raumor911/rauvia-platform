import RouteSEO from '../seo/PageMetadata';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type {WPPost} from '../lib/wp';
import {initialContent} from '../lib/initialContent';
import {sanitizeTitleHtml} from '../lib/editorial';
import FadeInUp from '../components/FadeInUp';

export default function RecursosPage({initialPosts}: {initialPosts?: WPPost[]} = {}) {
  const [posts, setPosts] = useState<WPPost[]>(() => initialPosts || initialContent()?.posts || []);
  const [loading, setLoading] = useState(() => !(initialPosts || initialContent()?.posts));

  useEffect(() => {
    if (initialContent()?.posts) return;
    let mounted=true;
    import('../lib/wp').then(({getPosts})=>getPosts()).then(data => {
      if (!mounted) return;
      setPosts(data);
      setLoading(false);
    }).catch(()=>{if(mounted)setLoading(false);});
    return ()=>{mounted=false;};
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
                    <Link to={`/recursos/${post.slug}`} className="group flex flex-col h-full bg-rauvia-card border border-rauvia-border rounded-lg overflow-hidden transition-all hover:border-rauvia-accent/50 hover:shadow-lg">
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
                          <span>{new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
