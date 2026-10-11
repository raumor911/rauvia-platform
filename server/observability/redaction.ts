export function getSafeUrlMeta(value: unknown) {
  try {
    const url = value instanceof URL ? value : new URL(String(value));
    return {
      urlOrigin: url.origin,
      urlPath: url.pathname,
    };
  } catch {
    const raw = String(value ?? '');
    return {
      urlOrigin: null,
      urlPath: raw.split('?')[0] || null,
    };
  }
}

export function sanitizeErrorMessage(message: string): string {
  if (!message) return 'Unknown error';
  return message
    .replace(/password=([^\s&]+)/gi, 'password=****')
    .replace(/Bearer\s+([^\s]+)/gi, 'Bearer ****')
    .replace(/key=([^\s&]+)/gi, 'key=****')
    .replace(/token=([^\s&]+)/gi, 'token=****');
}
