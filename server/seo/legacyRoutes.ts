import type {Request, Response, NextFunction} from 'express';

// Exact historical URLs only. No wildcard archive redirects or generic home fallbacks.
export const V73_RETIRED_PATHS = new Set([
  '/copywriting-textos-vender-facebook-pymes',
  '/marketing-bajo-presupuesto-5-estrategias',
  '/despega-tu-marketing',
  '/tag/facebook-ads',
  '/tag/consultoria-para-pymes/feed',
  '/category/startups-y-emprendimiento/feed'
]);
export const V73_REPLACED_PATHS = new Map<string, string>([
  ['/errores-planeacion-estrategica-90-dias', '/ruta-90/'],
  ['/categoria-producto/estrategia-y-planificacion', '/aethryon/'],
  ['/nuestro-metodo', '/aethryon/'],
  ['/privacidad', '/aviso-de-privacidad/'],
  ['/brand/rauvia-consulting', '/nosotros/'],
  ['/categoria-producto/servicios-de-consultoria', '/soluciones/'],
  ['/etiqueta-producto/consultoria-estrategica', '/soluciones/'],
  ['/clients', '/casos/'],
  ['/ruta-90-dias-rauvia-para-quien-es', '/ruta-90/']
]);

// Removed articles and taxonomy archives without a confirmed equivalent do
// not redirect to the generic /recursos/ list (potential Google soft 404).
export const RETIRED_PATHS = new Set<string>([
  ...V73_RETIRED_PATHS,
  '/tag/errores-de-negocio',
  '/tag/transformacion-digital',
  '/tag/innovacion',
  '/tag/sistemas-de-negocio',
  '/tag/consultoria-cdmx',
  '/tag/gestion-de-equipos',
  '/tag/crecimiento-de-negocio',
  '/category/automatizacion-empresarial',
  '/guia-definitiva-como-usar-el-seo-basico-para-superar-a-tu-competencia-en-marketplaces',
  '/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla',
  '/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla/feed',
  '/analisis-estrategico-mensual-startup',
  '/metricas-de-rentabilidad-para-agencias-en-cdmx',
  '/test-madurez-sistemica',
  '/wp-content/uploads/2025/11/RAUVIA_PRESENTACION_GUIA_2025.pdf',
  '/sobre-rauvia',
  '/contacto',
  '/consultoria_gratis',
  '/blindaje-operativo-2026',
  '/delegacion-hueca-caos-a-sistema-90-dias',
  '/guia-gobernanza-rauvia',
  '/claridad-operativa-el-regalo-que-si-negocio-necesita',
  '/ruta-90-dias-agencias',
  '/diagnostico-de-fuga-de-capital-mejora-la-eficiencia-en-tu-agencia',
  '/ejecucion-ruta-90-solo-vs-acompanamiento',
  '/que-hace-rauvia-ruta-90-dias',
  '/ia-estrategia-contenido-agencias',
  '/contacto-anterior',
  '/servicios-antiguos',
  '/acerca-de'
]);

export const REDIRECT_PATHS = new Map<string, string>([
  ...V73_REPLACED_PATHS,
  ['/blog', '/recursos/'],
  ['/servicios', '/soluciones/'],
  ['/componentes-ruta-90-dias-pymes', '/ruta-90/#componentes'],
  ['/llmo', '/llmo/index.json']
]);

const ORIGIN = 'https://rauvia.com.mx';
const ALIASES = new Set(['www.rauvia.com.mx', 'rauvia.consulting', 'www.rauvia.consulting']);

export function sendGone(res: Response) {
  return res.status(410)
    .set('Cache-Control', 'public, max-age=300')
    .set('X-Robots-Tag', 'noindex, follow')
    .type('html').send('<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><title>Contenido retirado | RAUVIA</title></head><body><main><h1>Este contenido ya no está disponible.</h1><p>Puedes consultar las soluciones o recursos actuales de RAUVIA.</p><nav aria-label="Contenido actual"><a href="/soluciones/">Soluciones</a> · <a href="/recursos/">Recursos</a></nav></main></body></html>');
}

/** Single canonicalization pass, before WordPress/static/fallback.
 * A trusted Hostinger TLS proxy must enforce incoming http -> https externally;
 * unverified X-Forwarded-* headers must never be trusted here.
 */
export function createCanonicalRedirectMiddleware(publicRoutes: readonly string[]) {
  const pages = new Set(publicRoutes);
  return function canonicalRedirect(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const path = req.path;
    const key = path.replace(/\/+$/, '') || '/';
    const queryAt = req.originalUrl.indexOf('?');
    const query = queryAt < 0 ? '' : req.originalUrl.slice(queryAt);
    const host = req.hostname.toLowerCase();

    // No arbitrary shop URLs -> homepage. Unknown shop topology is a separate
    // Hostinger routing question; don't treat them as canonical public pages.
    if (host === 'shop.rauvia.com.mx') {
      return res.status(404).set('X-Robots-Tag', 'noindex, follow').type('text/plain').send('Not found');
    }

    if (RETIRED_PATHS.has(key)) return sendGone(res);

    const legacy = REDIRECT_PATHS.get(key);
    const isAlias = ALIASES.has(host);
    const isPublicPage = pages.has(key) || /^\/recursos\/[^/]+$/.test(key);
    const needsSlash = isPublicPage && path !== (key === '/' ? '/' : key + '/');

    if (!legacy && !isAlias && !needsSlash) return next();

    const destination = legacy || (needsSlash ? key + '/' : path);
    const fragmentAt = destination.indexOf('#');
    const cleanPath = fragmentAt === -1 ? destination : destination.slice(0, fragmentAt);
    const fragment = fragmentAt === -1 ? '' : destination.slice(fragmentAt);
    // Query precedes fragment; a single absolute Location replaces all chains.
    return res.redirect(301, ORIGIN + cleanPath + query + fragment);
  };
}
