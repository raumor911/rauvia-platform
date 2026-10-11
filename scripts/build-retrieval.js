import fs from 'node:fs';
import {compileRetrieval} from '../src/retrieval/compiler.ts';
const r=compileRetrieval();
for(const [file,body] of Object.entries(r.outputs)){fs.mkdirSync(file.slice(0,file.lastIndexOf('/')),{recursive:true});fs.writeFileSync(file,body);}
console.log(`Retrieval build PASS: ${r.answers.length} families; ${r.archetypes.length} archetypes; ${r.bundles.length} citation bundles. Static/offline.`);
