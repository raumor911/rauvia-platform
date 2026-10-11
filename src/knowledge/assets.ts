import {routeSeo} from '../seo/routeSeo.js';
import {base, type AssetNode, type SourceNode} from './types.ts';
const entries:[string,string,AssetNode['assetType']][]=[
 ['home','/','page'],['nosotros','/nosotros','page'],['soluciones','/soluciones','index'],['aethryon','/aethryon','page'],['ruta90','/ruta-90','page'],['frente-comercial','/frente-comercial','landing'],['recursos','/recursos','index'],['casos','/casos','index'],['case-infraestructura-temporal-b2b','/casos/infraestructura-temporal-b2b','case'],['sitio-web-comercial-pymes','/sitio-web-comercial-para-pymes','landing'],['sitio-web-servicios-especializados','/sitio-web-servicios-especializados','landing'],['pagina-comercial-servicios-profesionales','/pagina-comercial-servicios-profesionales','landing'],['pagina-web-medicos','/pagina-web-para-medicos','landing'],['pagina-web-gratis-medicos','/pagina-web-gratis-para-medicos','landing'],['pagina-web-medicos-especialistas','/pagina-web-para-medicos-especialistas','landing'],['pagina-web-consultorio-medico','/pagina-web-para-consultorio-medico','landing'],['seo-local-medicos','/seo-local-para-medicos','landing'],['agenda-whatsapp-medicos','/pagina-web-medicos-agenda-whatsapp','landing'],['privacidad','/aviso-de-privacidad','legal'],['terminos','/terminos','legal']
];
export const assets:AssetNode[]=entries.map(([key,path,assetType])=>({
 ...base('Asset','asset:'+key,routeSeo[path].title,[],`Página existente que explica ${key.replaceAll('-',' ')}; la URL procede del registro canónico vigente.`),
 status:'canonical',canonical:routeSeo[path].canonical,assetType,specificity:['index','legal'].includes(assetType)||['home','nosotros'].includes(key)?'overview':'specific',
 sources:['source:'+key],assetRefs:['asset:'+key],coversIntent:[],explainsProblem:[],supportsCapability:[],representedOffering:[]
}));
export const assetSources:SourceNode[]=assets.map(a=>({
 ...base('Source','source:'+a.id.slice(6),'Publicación institucional: '+a.label,[],`Referencia editorial pública de ${a.label}; no constituye validación independiente.`),
 url:a.canonical,kind:'first_party_publication',verification:'published_self_report',publisher:'org:rauvia',assetRefs:[a.id]
}));
