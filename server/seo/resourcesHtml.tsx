import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {AppLayout} from '../../src/App';
import {preloadRoute} from '../../src/lib/routeLoader';
import {routeSeo} from '../../src/seo/routeSeo.js';
import {renderHtml} from './renderHtml';
import type {WPPost} from '../../src/lib/wp';
export async function renderResourcesHtml(shell: string, posts: WPPost[], stale=false) {
  await preloadRoute('/recursos');
  const body=renderToStaticMarkup(<StaticRouter location="/recursos"><AppLayout posts={posts} stalePosts={stale} staticRender /></StaticRouter>);
  return renderHtml(shell,body,routeSeo['/recursos'],{path:'/recursos/',status:200,posts,stale});
}
