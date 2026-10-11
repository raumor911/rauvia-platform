// One observation per analytics session; storage failure never breaks reading.
const fallback = new Set();
export function recordOnce(storage, session, event, chapter, send, scope = 'ruta90:1.0') {
  const key = `rv:${scope}:${session}:${event}:${chapter || 'page'}`;
  try {
    if (storage.getItem(key)) return false;
    storage.setItem(key, '1');
  } catch {
    if (fallback.has(key)) return false;
    fallback.add(key);
  }
  send();
  return true;
}
