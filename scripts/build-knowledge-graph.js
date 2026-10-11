import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {compileKnowledge} from '../src/knowledge/compiler.ts';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const result=compileKnowledge();
for(const [file,body] of Object.entries(result.outputs)){const dest=path.join(root,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,body);}
console.log(`Knowledge build PASS: ${result.graph.nodes.length} internal / ${result.publicGraph.nodes.length} public nodes; ${result.coverage.length} intents; ${result.gaps.length} catalog gaps. Static/offline.`);
