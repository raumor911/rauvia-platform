import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

export default function TrackingRouteObserver() {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Prevent double tracking if pathname hasn't actually changed
    // (e.g. hash changes, query params changes if we don't want to track them separately)
    if (lastPath.current !== currentPath) {
      // 1. Generic page view
      trackEvent('page_view');
      
      // 2. Semantic events
      if (currentPath.startsWith('/casos/') && currentPath !== '/casos' && currentPath !== '/casos/') {
        const slug = currentPath.split('/casos/')[1].replace(/\/$/, '');
        if (slug) {
          trackEvent('case_view', { case_slug: slug });
        }
      } else if (currentPath === '/soluciones' || currentPath === '/soluciones/') {
        trackEvent('solution_view');
      } else if (currentPath === '/aethryon' || currentPath === '/aethryon/') {
        trackEvent('aethryon_view');
      } else if (currentPath.startsWith('/recursos/') && currentPath !== '/recursos' && currentPath !== '/recursos/') {
        const slug = currentPath.split('/recursos/')[1].replace(/\/$/, '');
        if (slug) {
          trackEvent('blog_view', { post_slug: slug });
        }
      }

      lastPath.current = currentPath;
    }
  }, [location.pathname]);

  return null;
}
