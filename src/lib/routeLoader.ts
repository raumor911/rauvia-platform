import React, {lazy} from 'react';

// One registry is used by the browser and the build-only static renderer.
// The first route resolves before createRoot: its existing HTML stays readable.
export const routeLoaders = {
  '/': () => import('../pages/HomePage'),
  '/pagina-web-para-consultorio-medico': () => import('../pages/PaginaWebConsultorioMedicoPage'),
  '/pagina-web-medicos-agenda-whatsapp': () => import('../pages/PaginaWebMedicosAgendaWhatsappPage'),
  '/pagina-web-para-medicos': () => import('../pages/PaginaWebMedicosPage'),
  '/seo-local-para-medicos': () => import('../pages/SeoLocalMedicosPage'),
  '/pagina-web-para-medicos-especialistas': () => import('../pages/PaginaWebMedicosEspecialistasPage'),
  '/pagina-web-gratis-para-medicos': () => import('../pages/PaginaWebGratisMedicosPage'),
  '/nosotros': () => import('../pages/NosotrosPage'),
  '/soluciones': () => import('../pages/SolucionesPage'),
  '/ruta-90': () => import('../pages/Ruta90Page'),
  '/aethryon': () => import('../pages/AethryonPage'),
  '/recursos': () => import('../pages/RecursosPage'),
  '/recursos/:slug': () => import('../pages/PostPage'),
  '/aviso-de-privacidad': () => import('../pages/AvisoPrivacidadPage'),
  '/terminos': () => import('../pages/TerminosPage'),
  '/frente-comercial': () => import('../pages/FrenteComercialPage'),
  '/sitio-web-comercial-para-pymes': () => import('../pages/SitioWebComercialPymesPage'),
  '/sitio-web-servicios-especializados': () => import('../pages/SitioWebServiciosEspecializadosPage'),
  '/pagina-comercial-servicios-profesionales': () => import('../pages/PaginaComercialServiciosProfesionalesPage'),
  '/casos': () => import('../pages/CasosIndexPage'),
  '/casos/infraestructura-temporal-b2b': () => import('../pages/CasoInfraestructuraB2BPage'),
  '*': () => import('../pages/NotFoundPage'),
};
type RouteKey = keyof typeof routeLoaders;
const resolved = new Map<RouteKey, React.ComponentType<any>>();
const lazyPages = new Map<RouteKey, React.ComponentType<any>>(Object.entries(routeLoaders).map(([key,load]) => [key as RouteKey,lazy(load)]));
export function routeKey(pathname: string): RouteKey {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (path in routeLoaders) return path as RouteKey;
  if (path.startsWith('/recursos/')) return '/recursos/:slug';
  return '*';
}
export async function preloadRoute(pathname: string) {
  const key = routeKey(pathname);
  if (!resolved.has(key)) resolved.set(key,(await routeLoaders[key]()).default);
}
export function routeComponent(key: RouteKey) { return resolved.get(key) || lazyPages.get(key)!; }
export const mainRoutes = new Set(['/', '/soluciones', '/aethryon', '/ruta-90', '/frente-comercial', '/nosotros', '/recursos', '/casos']);
export function isMainRoute(pathname: string) { return mainRoutes.has(pathname === '/' ? '/' : pathname.replace(/\/+$/, '')); }
