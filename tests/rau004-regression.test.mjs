import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {publicRoutes} from '../scripts/public-routes.js';
const fixture=JSON.parse(fs.readFileSync('tests/fixtures/rau004-main-baseline.json','utf8'));
const hash=s=>createHash('sha256').update(s).digest('hex');
const normalize=s=>s.replace(/\/assets\/[^"<>]+/g,'/assets/BUILD-ASSET').replace(/_R_[A-Za-z0-9]+_/g,'_R_ID_').replace(/\s+/g,' ').trim();
export function snapshot(html,route){
 const head=html.match(/<head>([\s\S]*?)<\/head>/)[1];
 const semantics=[...head.matchAll(/<title>.*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>|<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g)].map(m=>m[0]).join('');
 let main=html.match(/<main>([\s\S]*?)<\/main>/)[1];
 if(route==='/')main=main.replace(/<section class="rv-home-hero\b[\s\S]*?<\/section>/,'');
 return {head:hash(semantics),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>m[1].replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()),outsideHero:hash(normalize(main))};
}
for(const route of publicRoutes)test(`RAU-004 preserves current main SEO, H1 and non-Hero content: ${route}`,()=>{
 const path=route==='/'?'':route.slice(1);
 assert.deepEqual(snapshot(fs.readFileSync(`dist/${path?path+'/':''}index.html`,'utf8'),route),fixture[route]);
});
test('RAU-004 retains official media bytes and the real commercial offer',()=>{
 for(const [file,expected] of Object.entries(fixture.assets))assert.equal(hash(fs.readFileSync(file)),expected,file);
 const html=fs.readFileSync('dist/index.html','utf8');
 assert.ok(html.includes('Desde $6,900 MXN + IVA'));
 for(const dest of ['/soluciones/','/aethryon/','/frente-comercial/','/recursos/'])assert.ok(html.includes(`href="${dest}"`));
});
