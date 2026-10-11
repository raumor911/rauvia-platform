import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostStatus, {articleStatusSeo} from '../components/PostStatus';
import RouteSEO from '../seo/PageMetadata';
import {articleSeo} from '../seo/articleSeo';
import PostArticle from '../components/PostArticle';
import {initialArticle} from '../lib/initialContent';
import { getPostBySlug, WPPost } from '../lib/wp';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WPPost | null>(() => initialArticle(slug)?.post || null);
  const [loading, setLoading] = useState(() => !initialArticle(slug));
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    const initial = initialArticle(slug);
    if (initial) { setPost(initial.post); setLoading(false); setLoadError(initial.status === 503); return; }
    setLoading(true);
    setLoadError(false);
    setPost(null);
    if (!slug) {
      setLoading(false);
      return;
    }
    getPostBySlug(slug)
      .then(data => { if (active) setPost(data); })
      .catch(() => { if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-32 pb-24 px-4 bg-rauvia-bg min-h-screen">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 bg-rauvia-card w-1/4 rounded mb-8"></div>
          <div className="h-12 bg-rauvia-card w-full rounded mb-6"></div>
          <div className="h-4 bg-rauvia-card w-1/3 rounded mb-12"></div>
          <div className="space-y-4">
            <div className="h-4 bg-rauvia-card w-full rounded"></div>
            <div className="h-4 bg-rauvia-card w-full rounded"></div>
            <div className="h-4 bg-rauvia-card w-5/6 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    const status = loadError ? 503 : 404;
    const path = `/recursos/${encodeURIComponent(slug || '')}/`;
    return <><RouteSEO data={articleStatusSeo(path, status)} /><PostStatus status={status} /></>;
  }

  return <><RouteSEO data={articleSeo(post).seo} /><PostArticle post={post} /></>;
}
