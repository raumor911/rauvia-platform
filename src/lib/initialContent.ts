import type {WPPost} from './wp';
export type InitialContent = {path: string; status: number; post?: WPPost; posts?: WPPost[]; stale?: boolean};
let cached: InitialContent | null | undefined;
export function initialContent(): InitialContent | null {
  if (typeof document === 'undefined') return null;
  if (cached !== undefined) return cached;
  const node = document.getElementById('rauvia-initial-content');
  try { cached = node ? JSON.parse(node.textContent || '') : null; } catch { cached = null; }
  return cached;
}
export function initialArticle(slug?: string) {
  const data = initialContent();
  return data && data.path === `/recursos/${encodeURIComponent(slug || '')}/` ? data : null;
}
