import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {routeSeo} from '../src/seo/routeSeo.js';
const read=p=>fs.readFileSync(p,'utf8');
const OLD=/firma mexicana de consultoría estratégica|identifica dónde una empresa está perdiendo valor|CONSULTORÍA PARA PYMES/i;
test('Home y Nosotros declaran la identidad aprobada en metadata y JSON-LD',()=>{
  assert.equal(routeSeo['/'].title,'RAUVIA | Servicios digitales para empresas');
  assert.equal(routeSeo['/nosotros'].title,'Nosotros | Trabajo especializado y tecnología para empresas | RAUVIA');
  for(const k of ['/','/nosotros']){
    const s=routeSeo[k];assert.doesNotMatch(JSON.stringify(s),OLD);
    assert.equal(s.ogDescription,s.description);
  }
  const org=routeSeo['/'].schema.find(x=>x['@type']==='Organization');
  assert.equal(org['@id'],'https://rauvia.com.mx/#organization');
  // N-09 (adenda 2026-11-26): name = nombre comercial, razón social en legalName y sin alternateName.
  assert.equal(org.name,'RAUVIA');
  assert.equal(org.legalName,'RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO');
  assert.equal('alternateName' in org,false);
  assert.match(org.description,/trabajo especializado, metodología y tecnología/);
});
test('Hero: dos entradas, sin promesa de consultoría total ni crecimiento garantizado',()=>{
  // C-02: las dos puertas salieron del hero a HomeDoorsSection; el resto del hero sigue en HeroSection.
  const h=read('src/components/HeroSection.tsx')+read('src/components/HomeDoorsSection.tsx');
  assert.match(h,/SERVICIOS DIGITALES PARA EMPRESAS/);
  assert.match(h,/ENCONTRAR\./);
  assert.match(h,/to="\/frente-comercial\/"/);assert.match(h,/to="\/seo-ai\/"/);
  assert.match(h,/to="\/soluciones\/"/);assert.match(h,/to="\/nosotros\/#como-trabajamos"/);
  assert.doesNotMatch(h,OLD);
  assert.doesNotMatch(read('src/components/MethodologySection.tsx'),/sin límites|generan crecimiento/);
});
test('Nosotros incluye el ancla #como-trabajamos y conserva consultoría según alcance',()=>{
  const n=read('src/pages/NosotrosPage.tsx');
  assert.match(n,/id="como-trabajamos"/);
  assert.match(n,/incluida la consultoría/);
  assert.match(n,/no está incluido automáticamente/);
  assert.match(n,/to="\/frente-comercial\/"/);assert.match(n,/to="\/seo-ai\/"/);assert.match(n,/to="\/casos\/"/);
});
test('Capa de conocimiento refleja la identidad sin cambiar IDs ni razón social',()=>{
  for(const p of ['public/llms.txt','public/llms-full.txt','public/llmo/rauvia.md','public/llmo/organization.json']){
    const t=read(p);assert.doesNotMatch(t,OLD,p);assert.match(t,/trabajo especializado/i,p);
  }
  const org=JSON.parse(read('public/llmo/organization.json'));
  assert.equal(org['@id'],'https://rauvia.com.mx/#organization');
  assert.equal(org.legalName,'RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO');
  const kg=JSON.parse(read('public/llmo/knowledge-graph.json'));
  const claim=kg.nodes.find(n=>n.id==='claim:rauvia-identidad');
  assert(claim);assert.match(claim.text,/consultoría especializada/);assert.equal(claim.guaranteesResults,false);
  const ans=JSON.parse(read('public/llmo/canonical-answers.json')).answers.find(a=>a.id==='answer:entidad-rauvia');
  assert.match(ans.answer,/Frente Comercial y SEO para IA/);
  assert.match(read('public/llmo/citation-bundles.json'),/consultoría especializada/);
});
