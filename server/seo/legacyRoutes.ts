import type {Request, Response, NextFunction} from 'express';

// Exact inventories only: an unknown URL remains a 404 in the production fallback.
export const V73_RETIRED_PATHS = new Set([
  "/copywriting-textos-vender-facebook-pymes",
  "/marketing-bajo-presupuesto-5-estrategias",
  "/despega-tu-marketing",
  "/tag/facebook-ads",
  "/tag/consultoria-para-pymes/feed",
  "/category/startups-y-emprendimiento/feed"
]);
export const V73_REPLACED_PATHS = new Map<string, string>([
  [
    "/errores-planeacion-estrategica-90-dias",
    "/ruta-90/"
  ],
  [
    "/categoria-producto/estrategia-y-planificacion",
    "/aethryon/"
  ],
  [
    "/privacidad",
    "/aviso-de-privacidad/"
  ],
  [
    "/brand/rauvia-consulting",
    "/nosotros/"
  ],
  [
    "/categoria-producto/servicios-de-consultoria",
    "/soluciones/"
  ],
  [
    "/tag/errores-de-negocio",
    "/recursos/"
  ],
  [
    "/etiqueta-producto/consultoria-estrategica",
    "/soluciones/"
  ],
  [
    "/tag/transformacion-digital",
    "/recursos/"
  ],
  [
    "/tag/innovacion",
    "/recursos/"
  ],
  [
    "/tag/sistemas-de-negocio",
    "/soluciones/"
  ],
  [
    "/tag/consultoria-cdmx",
    "/soluciones/"
  ],
  [
    "/tag/gestion-de-equipos",
    "/recursos/la-ilusion-del-crecimiento-sin-capacidad/"
  ],
  [
    "/clients",
    "/casos/"
  ],
  [
    "/ruta-90-dias-rauvia-para-quien-es",
    "/ruta-90/"
  ],
  [
    "/category/automatizacion-empresarial",
    "/soluciones/"
  ],
  [
    "/tag/crecimiento-de-negocio",
    "/recursos/la-ilusion-del-crecimiento-sin-capacidad/"
  ],
  [
    "/guia-definitiva-como-usar-el-seo-basico-para-superar-a-tu-competencia-en-marketplaces",
    "/recursos/"
  ],
  [
    "/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla",
    "/recursos/brecha-capacidad-real-percepcion-mercado/"
  ],
  [
    "/marketing-deficiente-la-razon-silenciosa-que-mata-al-90-de-las-startups-y-como-evitarla/feed",
    "/recursos/brecha-capacidad-real-percepcion-mercado/"
  ]
]);

export function sendGone(res: Response) {
  return res.status(410)
    .set('Cache-Control', 'public, max-age=300')
    .set('X-Robots-Tag', 'noindex, follow')
    .type('html').send('<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><title>Contenido retirado | RAUVIA</title></head><body><main><h1>Este contenido ya no está disponible.</h1><p>Puedes consultar las soluciones o recursos actuales de RAUVIA.</p><nav aria-label="Contenido actual"><a href="/soluciones/">Soluciones</a> · <a href="/recursos/">Recursos</a></nav></main></body></html>');
}

export function legacyRouteMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  const key = req.path.replace(/\/$/, '');
  if (V73_RETIRED_PATHS.has(key)) return sendGone(res);
  const target = V73_REPLACED_PATHS.get(key);
  if (!target) return next();
  const query = req.originalUrl.slice(req.path.length);
  const nonCanonical = ['www.rauvia.com.mx', 'rauvia.consulting', 'www.rauvia.consulting', 'shop.rauvia.com.mx'].includes(req.hostname);
  return res.redirect(301, `${nonCanonical ? 'https://rauvia.com.mx' : ''}${target}${query}`);
}
