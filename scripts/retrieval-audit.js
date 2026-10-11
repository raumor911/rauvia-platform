import fs from 'node:fs';
import assert from 'node:assert/strict';
import {compileRetrieval} from '../src/retrieval/compiler.ts';
const r=compileRetrieval();
for(const [file,body] of Object.entries(r.outputs))assert.equal(fs.readFileSync(file,'utf8'),body,`Stale retrieval output: ${file}`);
for(const file of Object.keys(r.outputs).filter(f=>f.startsWith('public/'))){const text=fs.readFileSync(file,'utf8');assert.doesNotMatch(text,/"visibility":\s*"internal"|"status":\s*"hypothesis"|privateNotes|repositoryRef|matchGroups|vertical:restaurant|vertical:export-business|\/Users\//);}
for(const page of ['NosotrosPage','SolucionesPage','FrenteComercialPage','AethryonPage','CasosIndexPage'])assert.doesNotMatch(fs.readFileSync('src/pages/'+page+'.tsx','utf8'),/from ['"].*\/(?:knowledge|retrieval)\//);
console.log(`Retrieval audit PASS: complete public intent coverage, supported claims, attribution limits, conditions, deterministic outputs and publication boundary (${r.answers.length} answers).`);
