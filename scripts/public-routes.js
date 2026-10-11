// Shared registry powers canonicalization, prerender and sitemap.
import {routeSeo} from '../src/seo/routeSeo.js';
export const publicRoutes = Object.keys(routeSeo).filter(path => path !== '/404');
