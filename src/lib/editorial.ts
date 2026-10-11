import sanitizeHtml from 'sanitize-html';

// Translate legacy WordPress layout classes. Never expose generic .grid/.hero
// classes or arbitrary utility classes to the surrounding React application.
const legacyClasses: Record<string, string> = {
  wrap: 're-wrap', publication: 're-wrap', hero: 're-intro',
  grid: 're-layout', 'content-grid': 're-layout',
  article: 're-body', 'article-body': 're-body', side: 're-side', sidebar: 're-side',
  card: 're-card', cta: 're-cta', button: 're-button',
  lead: 're-lead', eyebrow: 're-kicker', kicker: 're-kicker',
  meta: 're-meta', 'publication-meta': 're-meta',
  accent: 're-accent', blue: 're-accent', dot: 're-dot',
  quote: 're-insight', warning: 're-warning',
  sig: 're-signature', signature: 're-signature',
  checks: 're-checklist', check: 're-check', list: 're-list',
  compare: 're-compare', 'compare-card': 're-panel',
  info: 're-panel', understanding: 're-panel', capacity: 're-panel',
  'pressure-grid': 're-compare', 'pressure-card': 're-panel',
  steps: 're-steps', 'numbered-list': 're-steps',
  step: 're-step', item: 're-step', 'numbered-item': 're-step',
  num: 're-number', number: 're-number', 'flow-num': 're-number',
  flow: 're-flow', 'flow-item': 're-step', 'section-title': 're-section-title',
  'rauvia-insight': 're-insight', 'rauvia-key-point': 're-key-point',
  'rauvia-checklist': 're-checklist',
  'wp-block-table': 're-wp-table', 'wp-block-image': 're-image',
  'wp-block-columns': 're-compare', 'wp-block-column': 're-panel',
};

function titleKey(value: string) {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
    .normalize('NFKC').toLocaleLowerCase('es').replace(/[^\p{L}\p{N}]/gu, '');
}

export function sanitizeTitleHtml(value: string) {
  return sanitizeHtml(value, { allowedTags: ['em', 'strong'], allowedAttributes: {} });
}

/** Pure transformation: identical during SSR and in the browser. */
export function normalizeEditorialHtml(htmlContent: string, articleTitle = '') {
  const expectedTitle = titleKey(articleTitle);
  const cleaned = sanitizeHtml(htmlContent, {
    allowedTags: [
      'div', 'section', 'article', 'aside', 'header', 'footer',
      'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'strong', 'b', 'em', 'i',
      'small', 'mark', 's', 'u', 'sub', 'sup', 'br', 'hr', 'blockquote', 'cite',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'img',
      'table', 'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'pre', 'code', 'kbd', 'details', 'summary', 'time', 'abbr',
    ],
    allowedAttributes: {
      '*': ['class', 'id', 'title', 'lang', 'dir', 'aria-label'],
      h2: ['data-original-heading'],
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
      th: ['colspan', 'rowspan', 'scope'], td: ['colspan', 'rowspan'],
      ol: ['start', 'reversed', 'type'], li: ['value'], time: ['datetime'],
      details: ['open'],
    },
    nonTextTags: ['head', 'style', 'script', 'title', 'textarea', 'option', 'iframe', 'object'],
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['https', 'http'] },
    allowProtocolRelative: false,
    parseStyleAttributes: false,
    transformTags: {
      '*': (originalTag, attributes) => {
        const attribs = { ...attributes };
        const mapped = (attribs.class || '').split(/\s+/)
          .map(token => legacyClasses[token]).filter(Boolean);
        attribs.class = [...new Set(mapped)].join(' ');
        if (attribs.id) attribs.id = 'rauvia-content-' + attribs.id;
        if (originalTag === 'a') {
          if (attribs.href?.startsWith('#')) {
            attribs.href = '#rauvia-content-' + attribs.href.slice(1);
          }
          if (attribs.target === '_blank') attribs.rel = 'noopener noreferrer';
          else delete attribs.target;
        }
        if (originalTag === 'img') {
          attribs.loading = 'lazy';
          attribs.decoding = 'async';
          if (attribs.src?.startsWith('/')) {
            try { attribs.src = new URL(attribs.src, 'https://blog.rauvia.com.mx').href; }
            catch { delete attribs.src; }
          }
        }
        // The only H1 belongs to PostPage. Preserve different headings as H2.
        if (originalTag === 'h1') {
          attribs['data-original-heading'] = 'h1';
          return { tagName: 'h2', attribs };
        }
        return { tagName: originalTag === 'main' ? 'div' : originalTag, attribs };
      },
    },
    exclusiveFilter: frame => Boolean(
      expectedTitle && frame.attribs['data-original-heading'] === 'h1'
      && titleKey(frame.text) === expectedTitle
    ),
  });
  // Only sanitized, parser-produced table tags are wrapped, never raw CMS HTML.
  return cleaned
    .replace(/<table\b/g, '<div class="re-table-scroll" tabindex="0" role="region" aria-label="Tabla del artículo"><table')
    .replace(/<\/table>/g, '</table></div>');
}

