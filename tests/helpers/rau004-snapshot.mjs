import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
// Extracción compartida por tests/rau004-regression.test.mjs y scripts/refresh-baselines.mjs.
export const hash=s=>createHash('sha256').update(s).digest('hex');
export const normalize=s=>s.replace(/\/assets\/[^"<>]+/g,'/assets/BUILD-ASSET').replace(/_R_[A-Za-z0-9]+_/g,'_R_ID_').replace(/\s+/g,' ').trim();
export function snapshot(html,route){
 const head=html.match(/<head>([\s\S]*?)<\/head>/)[1];
 const semantics=[...head.matchAll(/<title>.*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>|<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g)].map(m=>m[0]).join('');
 let main=html.match(/<main>([\s\S]*?)<\/main>/)[1];
 if(route==='/'){assert.equal((main.match(/Primero entendemos la situación\./g)||[]).length,1,'Hero context paragraph remains visible once');main=main.replace(/<section class="rv-home-hero\b[\s\S]*?<\/section>/,'').replace(/<div class="rv-hero-context rv-hero-container">[\s\S]*?<\/div>/,'');}
 return {head:hash(semantics),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>m[1].replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()),outsideHero:hash(normalize(main))};
}
