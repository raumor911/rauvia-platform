const ALLOWED_EVENTS = new Set([
  'ruta90_view', 'ruta90_chapter_view', 'ruta90_cta_click', 'ruta90_aethryon_click',
  'page_view',
  'case_view',
  'solution_view',
  'aethryon_view',
  'blog_view',
  'cta_click',
  'whatsapp_click'
]);

export function validateEventPayload(payload: any): string | null {
  if (!payload || typeof payload !== 'object') {
    return 'Invalid payload';
  }

  if (typeof payload.visitor_id !== 'string' || payload.visitor_id.length > 64) {
    return 'Invalid visitor_id';
  }

  if (typeof payload.session_id !== 'string' || payload.session_id.length > 64) {
    return 'Invalid session_id';
  }

  if (typeof payload.event_name !== 'string' || !ALLOWED_EVENTS.has(payload.event_name)) {
    return 'Invalid event_name';
  }

  if (typeof payload.page_path !== 'string' || payload.page_path.length > 255) {
    return 'Invalid page_path';
  }

  if (payload.referrer !== undefined && (typeof payload.referrer !== 'string' || payload.referrer.length > 1024)) {
    return 'Invalid referrer';
  }

  if (payload.device_type !== undefined && (typeof payload.device_type !== 'string' || !['desktop', 'tablet', 'mobile'].includes(payload.device_type))) {
    return 'Invalid device_type';
  }

  if (payload.properties !== undefined && typeof payload.properties !== 'object') {
    return 'Invalid properties';
  }

  return null; // Valid
}
