import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {preloadRoute} from '../src/lib/routeLoader';
import {AppLayout} from '../src/App';
import {wordpressCache} from '../server/wordpress/cache';
import {resourceCards} from '../server/wordpress/resources';
import {routeSeo} from '../src/seo/routeSeo.js';
import {renderHtml} from '../server/seo/renderHtml';

export async function renderStaticPage(shell: string, route: string) {
  await preloadRoute(route);
  const seo=routeSeo[route]; if (!seo) throw new Error(`SEO registration missing: ${route}`);
  const snapshot=route==='/recursos' ? await wordpressCache.getPostsSnapshot() : undefined;
  const posts=snapshot ? resourceCards(snapshot.posts) : undefined;
  const body=renderToStaticMarkup(<StaticRouter location={route}><AppLayout posts={posts} stalePosts={snapshot?.stale} staticRender /></StaticRouter>);
  return renderHtml(shell,body,seo,posts ? {path:'/recursos/',status:200,posts,stale:snapshot?.stale} : undefined);
}
