import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {initialContent} from './lib/initialContent';
import './index.css';
import {preloadRoute} from './lib/routeLoader';

async function bootstrap() {
await preloadRoute(window.location.pathname);
const container = document.getElementById('root')!;
// Prerender exports browser HTML, not React server hydration markup.
// Keep createRoot, but release static SEO tags before React 19 recreates them.
// Crawlers without JavaScript still receive the complete prerendered metadata.
initialContent();
if (container.hasChildNodes()) {
  document.querySelectorAll('script[data-rauvia-seo], script[type="application/ld+json"]').forEach(tag => tag.remove());
  document.head.querySelectorAll(
    'title, meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], meta[property^="article:"], link[rel="canonical"]',
  ).forEach((tag) => tag.remove());
}

createRoot(container).render(<StrictMode><App /></StrictMode>);

}
bootstrap().catch(() => { /* Preserve the complete static document if a chunk fails. */ });
