export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const VISITOR_KEY = 'rv_visitor_id';
const SESSION_KEY = 'rv_session_id';
const SESSION_LAST_ACTIVITY_KEY = 'rv_session_last_activity';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_KEY);
  if (!visitorId) {
    visitorId = generateUUID();
    localStorage.setItem(VISITOR_KEY, visitorId);
  }
  return visitorId;
}

export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  const lastActivity = localStorage.getItem(SESSION_LAST_ACTIVITY_KEY);
  const now = Date.now();

  if (!sessionId || !lastActivity || now - parseInt(lastActivity, 10) > SESSION_TIMEOUT_MS) {
    sessionId = generateUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  // Update last activity immediately when retrieving the session id
  localStorage.setItem(SESSION_LAST_ACTIVITY_KEY, now.toString());

  return sessionId;
}

export function updateSessionActivity(): void {
  localStorage.setItem(SESSION_LAST_ACTIVITY_KEY, Date.now().toString());
}
