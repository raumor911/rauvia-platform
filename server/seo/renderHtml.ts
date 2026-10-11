import {buildMetaTags, PageSeo, safeJson} from '../../src/seo/buildMetaTags';
import type {InitialContent} from '../../src/lib/initialContent';

export function renderHtml(template: string, body: string, seo: PageSeo, initial?: InitialContent) {
  if (!template.includes('<div id="root"></div>')) throw new Error('Clean HTML shell missing');
  const bootstrap=initial ? `<script id="rauvia-initial-content" type="application/json">${safeJson(initial)}</script>` : '';
  return template.replace('</head>',buildMetaTags(seo)+'\n</head>')
    .replace('<div id="root"></div>',`<div id="root">${body}</div>${bootstrap}`);
}
