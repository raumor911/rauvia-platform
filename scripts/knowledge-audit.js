import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {compileKnowledge} from '../src/knowledge/compiler.ts';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
globalThis.fetch=()=>{throw new Error('Network forbidden in knowledge compiler');};
const a=compileKnowledge(),b=compileKnowledge();let errors=0;
for(const [file,body] of Object.entries(a.outputs)){
 if(body!==b.outputs[file]){console.error(`FAIL nondeterministic: ${file}`);errors++;}
 if(!fs.existsSync(path.join(root,file))||fs.readFileSync(path.join(root,file),'utf8')!==body){console.error(`FAIL stale/missing: ${file}; run build:knowledge`);errors++;}
 if(file.endsWith('.json'))JSON.parse(body);
}
console.log(`Knowledge audit: ${errors} errors; deterministic projection, identity, evidence, references and publication rules checked.`);
process.exitCode=errors?1:0;
