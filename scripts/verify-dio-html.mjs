import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {routeSeo} from '../src/seo/routeSeo.js';
const out='docs/dio-v1-evidence';
const baseline=process.env.DIO_BASELINE_DIST;
const checks=[];
for(const [route,seo] of Object.entries(routeSeo)){
 if(route==='/404')continue;
 const file=path.join('dist',route,'index.html');const html=fs.readFileSync(file,'utf8');
 assert(!html.includes('525518519173'),route+' old phone');
 for(const match of html.matchAll(/https:\/\/wa\.me\/([0-9]+)/g))assert.equal(match[1],'525586494076',route);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,route);
 assert(html.includes(`href="${seo.canonical}"`),route);
 if(baseline){
  const previous=fs.readFileSync(path.join(baseline,route,'index.html'),'utf8');
  const seoParts=h=>[...h.matchAll(/<title>.*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>|<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>|<h1\b[^>]*>[\s\S]*?<\/h1>/g)].map(x=>x[0]);
  assert.deepEqual(seoParts(html),seoParts(previous),route+' unchanged metadata, H1 and schema');
 }
 checks.push({route,canonical:seo.canonical,uniqueH1:true,phone:'525586494076',baselineCompared:!!baseline});
}
fs.writeFileSync(out+'/html-regression.json',JSON.stringify(checks,null,2));
console.log(`PASS: ${checks.length} rutas HTML; teléfono único, H1, canonicals y comparación SEO con la base.`);
