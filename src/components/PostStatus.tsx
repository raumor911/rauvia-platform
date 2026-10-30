import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import type {PageSeo} from '../seo/buildMetaTags';

export function articleStatusSeo(_path: string, status: 404 | 503): PageSeo {
  return {
    title: status === 404 ? 'Artículo no encontrado | RAUVIA' : 'Artículo temporalmente no disponible | RAUVIA',
    description: status === 404 ? 'El recurso que buscas no existe o ha sido movido.' : 'Intenta volver a abrirlo en unos momentos.',
    canonical: null,
    robots: 'noindex, nofollow',
  };
}

export default function PostStatus({status}: {status: 404 | 503}) {
  return <section className="pt-32 pb-24 px-4 bg-rauvia-bg min-h-screen">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-display text-rauvia-text mb-6">{status === 404 ? 'Artículo no encontrado' : 'No pudimos cargar el artículo'}</h1>
      <p className="text-rauvia-gray mb-8">{articleStatusSeo('/', status).description}</p>
      <Link to="/recursos/" className="inline-flex items-center gap-2 text-rauvia-accent hover:text-rauvia-accent/80 transition-colors">
        <ArrowLeft className="w-4 h-4" /><span>Volver a recursos</span>
      </Link>
    </div>
  </section>;
}
