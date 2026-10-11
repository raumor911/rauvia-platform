import React from 'react';
import {Helmet} from 'react-helmet-async';
import {routeSeo} from './routeSeo.js';
import {PageSeo, metaEntries, schemasFor, safeJson} from './buildMetaTags';

export default function RouteSEO({path, data}: {path?: string; data?: PageSeo}) {
  const seo: PageSeo = data || routeSeo[path === '/' ? '/' : path?.replace(/\/+$/, '')];
  if (!seo) throw new Error(`Missing route SEO: ${path}`);
  // The build and Express insert the exact same head separately from body markup.
  if (typeof window === 'undefined') return null;
  return <><Helmet><title>{seo.title}</title>{seo.canonical ? <link rel="canonical" href={seo.canonical} /> : null}
    {metaEntries(seo).map((entry,i) => <meta key={i} {...entry} />)}
  </Helmet>{schemasFor(seo).map((item,i) => <script key={i} type="application/ld+json" data-rauvia-seo dangerouslySetInnerHTML={{__html:safeJson(item)}} />)}</>;
}
