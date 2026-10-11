import {isMainRoute} from './routeLoader';
import { getVisitorId, getSessionId, updateSessionActivity } from './analyticsIdentity';

export type EventName =
  | 'ruta90_view'
  | 'ruta90_chapter_view'
  | 'ruta90_cta_click'
  | 'ruta90_aethryon_click'
  | 'page_view'
  | 'case_view'
  | 'solution_view'
  | 'aethryon_view'
  | 'blog_view'
  | 'cta_click'
  | 'whatsapp_click'
  | 'assistant_open'
  | 'assistant_start'
  | 'assistant_question'
  | 'assistant_response'
  | 'assistant_summary_generated';

interface TrackEventParams {
  eventName: EventName;
  properties?: Record<string, any>;
  pagePath?: string;
  referrer?: string;
}

const API_ENDPOINT = '/api/events';

// Geometry enriches existing events; ordinary widths do not imply a folding device.
function viewportProperties(): Record<string, number | string> {
  if (!isMainRoute(window.location.pathname)) return {};
  const width = window.innerWidth, height = window.innerHeight;
  const segmented = typeof window.matchMedia === 'function' &&
    (window.matchMedia('(horizontal-viewport-segments:2)').matches ||
     window.matchMedia('(vertical-viewport-segments:2)').matches);
  return {
    ...(segmented ? {viewport_segments: 2} : {}),
    viewport_width: width,
    viewport_height: height,
    orientation: width > height ? 'landscape' : 'portrait',
    viewport_class: width < 375 ? 'compact' : width < 431 ? 'phone' :
      width < 600 ? 'wide_phone' : width < 900 ? 'medium' : width < 1200 ? 'tablet' : 'desktop',
  };
}

export function trackEvent(
  eventName: EventName,
  properties?: Record<string, any>
): void {
  try {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isTablet = /Tablet|iPad/i.test(navigator.userAgent);
    const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

    const payload = {
      visitor_id: visitorId,
      session_id: sessionId,
      event_name: eventName,
      page_path: /^\/ruta-90\/?$/.test(window.location.pathname) ? '/ruta-90/' + window.location.search : window.location.pathname + window.location.search,
      referrer: document.referrer || '',
      device_type: deviceType,
      properties: {...viewportProperties(), ...properties},
    };

    // Update last activity since we're tracking a valid event
    updateSessionActivity();

    // Use sendBeacon if available for better non-blocking performance
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(API_ENDPOINT, blob);
    } else {
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silently catch network errors so UI doesn't break
      });
    }
  } catch (err) {
    // Fail silently in production
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics] Failed to track event:', err);
    }
  }
}
