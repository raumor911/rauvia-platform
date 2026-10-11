import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const html=fs.readFileSync('dist/aethryon/index.html','utf8');
const text=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const h1=text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]);
// V73 deliberately adds the existing founder reference; all other SEO stays exact.
const withFounder=schemas=>schemas.map(s=>s['@type']==='Organization'&&!s.founder?{...s,founder:{'@id':'https://rauvia.com.mx/#raul-morales'}}:s);
const old=JSON.parse(fs.readFileSync('tests/fixtures/aethryon-v70-seo.json','utf8'));
const main=html.match(/<main>([\s\S]*?)<\/main>/)[1];
test('AETHRYON preserves V70 metadata and H1, with the documented V73 founder reference',()=>{
 assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.equal(h1,old.h1[0]);
 assert.equal(html.match(/<title>(.*?)<\/title>/)[1],old.title);
 assert.deepEqual([...html.matchAll(/<meta\b[^>]*>/g)].map(m=>m[0]).filter(m=>!m.includes('name="viewport"')),old.meta.filter(m=>!m.includes('name="viewport"')));
 assert.deepEqual([...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)].map(m=>m[0]),old.canonical);
 assert.deepEqual([...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])),withFounder(old.jsonld));
});
test('Human reading path reaches example, outcomes and possible routes before methodology',()=>{
 const ids=['aethryon-hero','aethryon-resumen','aethryon-situaciones','aethryon-ejemplo','aethryon-resultados','aethryon-caminos','como-funciona','aethryon-criterios','aethryon-aplicacion','aethryon-ejecucion','aethryon-accion'];
 const positions=ids.map(id=>main.indexOf(`id="${id}"`));assert.ok(positions.every((p,i)=>p>=0&&(i===0||p>positions[i-1])));
 assert.match(main,/Una prioridad justificada y una ruta de acción/);assert.match(main,/ni una garantía automática de resultados/);
 assert.match(main,/EJEMPLO CONCEPTUAL/);assert.match(main,/Esta prioridad busca evitar/);assert.doesNotMatch(main,/La empresa evita invertir/);
});
test('Optional depth retains six original outcomes, four operations, four steps and five criteria in initial HTML',()=>{
 const outcomes=main.slice(main.indexOf('id="aethryon-resultados"'),main.indexOf('id="aethryon-caminos"'));
 assert.match(outcomes,/<details\b(?![^>]*open)[^>]*>[\s\S]*Ver los seis resultados del análisis/);
 for(const s of ['Definición del Problema','Mapa de Señales y Restricciones','Prioridad Recomendada','Escenarios y Riesgos','Ruta de Acción','Indicadores de Seguimiento'])assert.ok(outcomes.includes(s),s);
 for(const s of ['ORDENA','EVALÚA','PRIORIZA','CONVIERTE','ENTENDER LA SITUACIÓN','EVALUAR LAS CONDICIONES','ENCONTRAR LA PRIORIDAD','DISEÑAR LA RUTA'])assert.ok(main.includes(s),s);
 const criteria=main.slice(main.indexOf('id="aethryon-criterios"'),main.indexOf('id="aethryon-aplicacion"'));
 const disclosures=[...criteria.matchAll(/<details\b([^>]*)>/g)];assert.equal(disclosures.length,5);assert.ok(disclosures.filter(m=>/\bopen(?:=|\s|$)/.test(m[1])).length<=1);assert.ok(disclosures.every(m=>m[1].includes('name="aethryon-criteria"')));
 for(const s of ['CLARIDAD','DIFICULTADES','ALINEACIÓN','OPORTUNIDAD','CAPACIDAD DE EJECUCIÓN'])assert.ok(criteria.includes(s),s);
 assert.doesNotMatch(main,/Cómo citar|DOI|metodología propietaria|validación científica/);
});
test('Existing execution semantics and links remain; final actions have distinct destinations',()=>{
 assert.ok(main.includes('Cuando una prioridad requiere un ciclo estructurado de ejecución'));assert.ok(main.includes('No todas las prioridades identificadas por AETHRYON requieren una Ruta 90'));
 for(const path of ['/ruta-90/','/soluciones/','/frente-comercial/'])assert.ok(main.includes(`href="${path}"`));
 const final=main.slice(main.indexOf('id="aethryon-accion"'));assert.ok(final.includes('href="https://wa.me/525586494076"'));assert.ok(final.includes('href="/soluciones/"'));assert.match(final,/ANALIZAR MI SITUACIÓN/);assert.match(final,/EXPLORAR SOLUCIONES/);assert.doesNotMatch(final,/HABLAR CON RAUVIA/);
 assert.equal((main.match(/data-aethryon-section=/g)||[]).length,9);
});
test('Main route metadata preserves V71 apart from the V73 founder reference',()=>{
 const baseline=JSON.parse(fs.readFileSync('tests/fixtures/v72-route-baseline.json','utf8'));
 for(const [route,old] of Object.entries(baseline)){
  const h=fs.readFileSync('dist/'+(route==='/'?'':route.slice(1))+'index.html','utf8');
  assert.deepEqual([...h.matchAll(/<title>(.*?)<\/title>/g)].map(m=>m[1]),old.title);
  assert.deepEqual([...h.matchAll(/<meta\b[^>]*>/g)].map(m=>m[0]).filter(m=>!m.includes('name="viewport"')),old.meta);
  assert.deepEqual([...h.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)].map(m=>m[0]),old.canonical);
  assert.deepEqual([...h.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].map(m=>JSON.parse(m[1])),withFounder(old.jsonld));
 }
});
test('Compiled production returns AETHRYON content and live internal destinations', {skip:!process.env.TEST_BASE_URL},async()=>{
 for(const path of ['/aethryon/','/soluciones/','/ruta-90/','/frente-comercial/']){const res=await fetch(process.env.TEST_BASE_URL+path,{redirect:'manual'});assert.equal(res.status,200,path);const body=await res.text();assert.match(body,/<main>[\s\S]+<\/main>/);if(path==='/aethryon/')assert.equal(body,html);}
});
