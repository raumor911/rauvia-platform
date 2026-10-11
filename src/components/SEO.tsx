import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://rauvia.com.mx/media/og-image.jpg', // Default OG Image
  twitterCard = 'summary_large_image',
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
}) => {
  let absoluteUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `https://rauvia.com.mx${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`;
  // Ensure consistent trailing slash inclusion (except for root path which already has it)
  absoluteUrl = absoluteUrl === 'https://rauvia.com.mx/' ? absoluteUrl : (absoluteUrl.endsWith('/') ? absoluteUrl : `${absoluteUrl}/`);

  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `https://rauvia.com.mx${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteUrl} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:site_name" content="RAUVIA Consulting" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Article Specific metadata */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
};

export default SEO;
