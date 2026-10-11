import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import PostArticle from '../../src/components/PostArticle';
import {GeoProvider} from '../../src/context/GeoContext';
import {articleSeo} from '../../src/seo/articleSeo';
import {renderHtml} from './renderHtml';
import type {PostResult} from '../wordpress/cache';
import PostStatus, {articleStatusSeo} from '../../src/components/PostStatus';

export function renderArticleHtml(shell: string, path: string, result: PostResult) {
  const seo=result.post ? articleSeo(result.post).seo : articleStatusSeo(path, result.status === 404 ? 404 : 503);
  const body=renderToStaticMarkup(<StaticRouter location={path}><GeoProvider><div className="min-h-screen bg-rauvia-bg">
    <header><Navbar /></header><main>{result.post ? <PostArticle post={result.post} /> : <PostStatus status={result.status === 404 ? 404 : 503} />}</main><Footer />
  </div></GeoProvider></StaticRouter>);
  return renderHtml(shell,body,seo,{path,status:result.status,post:result.post});
}
