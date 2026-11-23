import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {publicRoutes} from '../scripts/public-routes.js';
const fixture=JSON.parse(fs.readFileSync('tests/fixtures/rau004-main-baseline.json','utf8'));
import {hash,normalize,snapshot} from './helpers/rau004-snapshot.mjs';
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
