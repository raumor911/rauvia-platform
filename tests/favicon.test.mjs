import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const icons=['favicon.ico','favicon-48x48.png','favicon-96x96.png','apple-touch-icon.png','favicon.svg'];
test('Official favicon variants survive build unchanged and are declared in initial HTML',()=>{
 for(const name of icons) assert.deepEqual(fs.readFileSync('dist/'+name),fs.readFileSync('public/'+name));
 for(const path of ['index.html','nosotros/index.html','soluciones/index.html','aethryon/index.html','frente-comercial/index.html','recursos/index.html','casos/index.html','ruta-90/index.html','shell.html']) {
  const head=fs.readFileSync('dist/'+path,'utf8').split('</head>')[0];
  for(const name of icons)assert.ok(head.includes('href="/'+name+'"'),path+': '+name);
 }
 for(const [name,size] of [['favicon-48x48.png',48],['favicon-96x96.png',96],['apple-touch-icon.png',180]]){
  const b=fs.readFileSync('dist/'+name);assert.equal(b.subarray(1,4).toString(),'PNG');assert.equal(b.readUInt32BE(16),size);assert.equal(b.readUInt32BE(20),size);assert.equal(b[25],6);
 }
 const ico=fs.readFileSync('dist/favicon.ico');assert.equal(ico.readUInt16LE(2),1);assert.equal(ico.readUInt16LE(4),3);
 for(let i=0;i<3;i++){const n=6+16*i,offset=ico.readUInt32LE(n+12);assert.equal(ico.subarray(offset+1,offset+4).toString(),'PNG');}
});
test('Production HTTP serves actual static images with correct MIME', {skip:!process.env.TEST_BASE_URL},async()=>{
 for(const name of icons){const res=await fetch(process.env.TEST_BASE_URL+'/'+name);assert.equal(res.status,200);assert.match(res.headers.get('content-type'),name.endsWith('.png')?/image\/png/:name.endsWith('.svg')?/image\/svg\+xml/:/image\/(x-icon|vnd.microsoft.icon)/);assert.deepEqual(Buffer.from(await res.arrayBuffer()),fs.readFileSync('public/'+name));}
});
