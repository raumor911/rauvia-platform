import fs from 'node:fs';
import assert from 'node:assert/strict';
import {compileRetrieval} from '../src/retrieval/compiler.ts';
import {validateRetrieval} from '../src/retrieval/validate.ts';
globalThis.fetch=()=>{throw new Error('Network forbidden in backend audit');};
const result=compileRetrieval();
assert.deepEqual(validateRetrieval(result),[]);
for(const [file,body] of Object.entries(result.outputs)){
 assert.equal(fs.readFileSync(file,'utf8'),body,`Stale backend output: ${file}`);
 if(file.endsWith('.json'))JSON.parse(body);
 if(file.startsWith('public/'))assert.doesNotMatch(body,/"visibility":\s*"internal"|"status":\s*"hypothesis"|privateNotes|repositoryRef|matchGroups|vertical:restaurant|vertical:export-business|\/Users\//);
}
console.log('Retrieval backend audit PASS: JSON, determinism, source chains and publication boundary.');
