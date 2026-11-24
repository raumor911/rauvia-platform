import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {preciosCatalog,prices,noPublishedPrice} from '../src/data/preciosCatalog.ts';
import {trayectoriaCatalog} from '../src/data/trayectoriaCatalog.ts';
import {routeSeo} from '../src/seo/routeSeo.js';

const read=p=>fs.readFileSync(p,'utf8');
const fmt=n=>n.toLocaleString('en-US');
// Producto → archivos que muestran ese precio al público.
const SOURCES={
 'frente-comercial-esencial':['src/pages/FrenteComercialPage.tsx'],
 'frente-comercial-pro':['src/pages/FrenteComercialPage.tsx'],
 'frente-comercial-portafolio':['src/pages/FrenteComercialPage.tsx'],
 'presencia-medica-rauvia':['src/pages/PaginaWebGratisMedicosPage.tsx'],
 'web-medica-personalizada':['src/pages/PaginaWebMedicosPage.tsx','src/pages/PaginaWebGratisMedicosPage.tsx','src/pages/SeoLocalMedicosPage.tsx'],
 'frente-comercial-medico':['src/pages/PaginaWebMedicosPage.tsx','src/pages/PaginaWebGratisMedicosPage.tsx','src/pages/SeoLocalMedicosPage.tsx'],
 'seo-ai-auditoria':['src/pages/SeoAiAuditoriaPage.tsx','src/pages/seoAiCases.ts'],
 'seo-ai-implementacion':['src/pages/SeoAiImplementacionPage.tsx','src/pages/seoAiCases.ts']
};

test('cada producto del catálogo tiene fuente y su precio aparece en las páginas que lo publican',()=>{
  assert.deepEqual(Object.keys(SOURCES).sort(),prices.map(p=>p.id).sort());
  for(const p of prices){
    for(const file of SOURCES[p.id]){
      assert.ok(read(file).includes('$'+fmt(p.amount)),`${p.id}: $${fmt(p.amount)} no aparece en ${file}`);
    }
    if(p.total_amount)assert.ok(read(SOURCES[p.id][0]).includes('$'+fmt(p.total_amount)),p.id+' total');
  }
});

test('IVA, tipos de precio y total de la implementación son coherentes',()=>{
  for(const p of prices){
    assert.equal(p.currency,'MXN');assert.equal(p.tax,'+ IVA');
    assert.ok(p.canonical.startsWith('https://rauvia.com.mx/'));assert.ok(p.conditions.length>0);
  }
  const impl=prices.find(p=>p.id==='seo-ai-implementacion');
  assert.equal(impl.amount*impl.term_months,impl.total_amount);
  for(const id of ['frente-comercial-portafolio','web-medica-personalizada','frente-comercial-medico'])assert.equal(prices.find(p=>p.id===id).price_type,'from');
  assert.equal(prices.find(p=>p.id==='presencia-medica-rauvia').amount,0);
});

test('canónicas existen en routeSeo y las páginas sin precio no publican ninguno',()=>{
  const canon=new Set(Object.values(routeSeo).map(r=>r.canonical));
  for(const u of [...prices.map(p=>p.canonical),...noPublishedPrice.map(p=>p.canonical)])assert.ok(canon.has(u),u);
  const pages=['src/pages/PaginaWebMedicosEspecialistasPage.tsx','src/pages/PaginaWebConsultorioMedicoPage.tsx','src/pages/PaginaWebMedicosAgendaWhatsappPage.tsx','src/pages/PaginaComercialServiciosProfesionalesPage.tsx','src/pages/SitioWebComercialPymesPage.tsx','src/pages/SitioWebServiciosEspecializadosPage.tsx','src/pages/RauviaWebPage.tsx'];
  for(const f of pages)assert.doesNotMatch(read(f),/\$\s?\d[\d,]*\s?(MXN|\+)|\d[\d,]{3,}\s?MXN/,f+' publica un precio que el catálogo declara inexistente');
});

test('JSON-LD de Frente Comercial coincide y Trayectoria sigue como referencia histórica',()=>{
  const fc=JSON.stringify(routeSeo['/frente-comercial'].schema);
  for(const id of ['frente-comercial-esencial','frente-comercial-pro','frente-comercial-portafolio'])assert.ok(fc.includes(`${prices.find(p=>p.id===id).amount}.00`),id);
  assert.equal(preciosCatalog.trayectoria.status,'historical_reference_pending_commercial_confirmation');
  assert.deepEqual(preciosCatalog.trayectoria.plans.map(x=>x.monthly_price),trayectoriaCatalog.plans.map(x=>x.monthly_price));
  assert.deepEqual(preciosCatalog.trayectoria.change_types.map(x=>x.price_from),trayectoriaCatalog.change_types.map(x=>x.price_from));
});

test('snapshot público, llms-full, llms.txt e index.json reflejan el catálogo',()=>{
  const snap=JSON.parse(read('public/llmo/precios.json'));
  assert.deepEqual(snap,JSON.parse(JSON.stringify(preciosCatalog)));
  const full=read('public/llms-full.txt'),llms=read('public/llms.txt');
  for(const p of prices)assert.ok(full.includes('$'+fmt(p.amount)+' MXN'),'llms-full '+p.id);
  assert.ok(full.includes('$179,400 MXN'));
  assert.ok(llms.includes('https://rauvia.com.mx/llmo/precios.json'));
  assert.doesNotMatch(llms,/\$\s?\d/);
  assert.doesNotMatch(full,/margen|13,200|5,050|189,300|costo estimado/i);
  assert.ok(JSON.parse(read('public/llmo/index.json')).resources.some(r=>r.url==='https://rauvia.com.mx/llmo/precios.json'));
  assert.doesNotMatch(JSON.stringify(snap),/\/Users\/|src\/pages|margen/);
});
