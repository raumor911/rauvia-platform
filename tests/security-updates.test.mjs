import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {gzipSync} from 'node:zlib';
import {mkdtemp,writeFile,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import qs from 'qs';
import sanitizeHtml from 'sanitize-html';
import {glob} from 'glob';
import {minimatch} from 'minimatch';
import {z} from 'zod';

test('compressed JSON with trailing garbage does not crash the parser or prevent subsequent requests', {timeout:5000}, async()=>{
 const app=express();app.use(express.json());app.post('/',(req,res)=>res.json(req.body));app.use((err,req,res,next)=>res.status(err.status||400).json({error:'invalid body'}));
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));const port=server.address().port;
 const post=(body,headers={})=>new Promise((resolve,reject)=>{const req=http.request({hostname:'127.0.0.1',port,path:'/',method:'POST',headers:{'content-type':'application/json',...headers}},res=>{res.resume();res.once('end',()=>resolve(res.statusCode));});req.once('error',reject);req.end(body);});
 try {const status=await post(Buffer.concat([gzipSync('{"ok":true}'),Buffer.from('invalid trailing bytes')]),{'content-encoding':'gzip'});assert.ok(status===200||status===400);assert.equal(await post('{"ok":true}'),200);}finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
});

test('comma serialization accepts object elements with non-callable toString',()=>{
 for(const value of [{toString:'x'},Object.create(null),[{toString:'x'}]])for(const encodeValuesOnly of [false,true])assert.doesNotThrow(()=>qs.stringify({a:[value]},{arrayFormat:'comma',encodeValuesOnly}));
});

test('sanitization blocks refresh URLs and untrusted SVG animation attributes',()=>{
 const input='<meta http-equiv="refresh" content="0;url=javascript:alert(1)"><svg><animate attributeName="xlink:href" values="javascript:alert(2)" /></svg><p>Safe copy</p>';
 const cleaned=sanitizeHtml(input);assert.doesNotMatch(cleaned,/javascript:|<meta|<animate/);assert.match(cleaned,/Safe copy/);
});

test('nested discarded iframes remain bounded and do not cause stack overflow',()=>{
 assert.doesNotThrow(()=>sanitizeHtml('<iframe>'.repeat(1500)+'<p>Safe</p>',{nestingLimit:20}));
});

test('oversized constrained Zod collections fail before element transforms run',()=>{
 let visited=0;const element=z.string().transform(x=>{visited++;return x;});
 assert.equal(z.array(element).max(1).safeParse(Array(2000).fill('x')).success,false);assert.equal(visited,0);
});

test('glob still resolves supported patterns and a pre-aborted walk performs no directory reads',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'rauvia-glob-'));try{await mkdir(path.join(dir,'a'));await writeFile(path.join(dir,'a','x.txt'),'x');assert.deepEqual(await glob('**/*.txt',{cwd:dir}),['a/x.txt']);let reads=0;
 await assert.rejects(glob('**/*',{cwd:dir,signal:AbortSignal.abort(),fs:{...fs,readdir:(...args)=>{reads++;return fs.readdir(...args);}}}),{name:'AbortError'});assert.equal(reads,0);
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('minimatch handles repeated globparts and ordinary path matching',()=>{
 assert.equal(minimatch('src/components/HeroSection.tsx','src/**/*.tsx'),true);
 assert.doesNotThrow(()=>minimatch('a/b/c','**/'.repeat(100)+'x',{optimizationLevel:2}));
});

test('Puppeteer BiDi protocol consumer validates with its compatible Zod 4 dependency',async()=>{
 const parser=await import(new URL('./protocol-parser/protocol-parser.js',import.meta.resolve('chromium-bidi')));
 assert.deepEqual(parser.Browser.parseRemoveUserContextParameters({userContext:'test-context'}),{userContext:'test-context'});
 assert.throws(()=>parser.Browser.parseRemoveUserContextParameters({userContext:42}));
});
