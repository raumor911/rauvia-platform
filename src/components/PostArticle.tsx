import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import type {WPPost} from '../lib/wp';
import FadeInUp from './FadeInUp';
import RauviaEditorial, {sanitizeTitleHtml} from './RauviaEditorial';
import {articleSeo} from '../seo/articleSeo';
export default function PostArticle({post}: {post: WPPost}) {
 const {authorName, image:featuredMedia}=articleSeo(post);

  return (
    <>
      <article className="rauvia-post-page min-h-screen">
        <div className="rauvia-post-shell">
          <FadeInUp>
            <Link to="/recursos" className="inline-flex items-center gap-2 text-rauvia-gray hover:text-rauvia-accent transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Todos los recursos</span>
            </Link>
            
            <header className="rauvia-post-header">
              <h1 
                className="text-4xl md:text-5xl font-display text-rauvia-text mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: sanitizeTitleHtml(post.title.rendered) }}
              />
              
              <div className="rauvia-post-meta text-sm text-rauvia-gray pb-8 border-b border-rauvia-border/50">
                <span className="font-medium">{authorName}</span>
                <span>•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
            </header>
          </FadeInUp>

          <div>
            {/* CONTENIDO EDITORIAL */}
            <div>
              {featuredMedia && (
                <FadeInUp delay={0.1}>
                  <div className="rauvia-post-cover">
                    <img 
                      src={featuredMedia} 
                      alt={post.title.rendered.replace(/<[^>]*>?/gm, '')} 
                      className="w-full h-auto"
                    />
                  </div>
                </FadeInUp>
              )}
              
              <RauviaEditorial htmlContent={post.content.rendered} articleTitle={post.title.rendered} />
            </div>
            
            {/* CTA AL FINAL */}
            <FadeInUp delay={0.3}>
              <div className="mt-16 max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-8 md:p-12 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-rauvia-navy rounded-2xl mb-6 flex items-center justify-center">
                  <img src="/media/iconos-enfoques-rauvia/05-aethryon.svg" alt="AETHRYON" className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold tracking-widest text-slate-400 uppercase mb-4">¿Necesitas acelerar este proceso?</h3>
                <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                  AETHRYON es nuestro sistema de análisis que identifica restricciones operativas y diseña rutas de ejecución.
                </p>
                <Link to="/aethryon" className="block w-full sm:w-auto px-8 bg-rauvia-navy text-white text-center py-4 rounded-lg text-sm md:text-base font-bold hover:bg-rauvia-blue transition-colors">
                  Conocer AETHRYON
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>
      </article>

      
    </>
  );
}
