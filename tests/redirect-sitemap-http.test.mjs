import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {spawn} from 'node:child_process';

const post=JSON.parse(await fs.readFile(new URL('./fixtures/wp-post.json',import.meta.url),'utf8'))[0];
async function freePort() {
  const server=net.createServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=server.address().port;
  await new Promise(resolve=>server.close(resolve));
  return port;
}
test('all URLs from freshly generated sitemap return direct 200 without redirect', {timeout:45000}, async()=>{
  const dir=await fs.mkdtemp(path.join(os.tmpdir(),'rauvia-sitemap-http-'));
  const fixture=http.createServer((req,res)=>{
    const u=new URL(req.url,'http://fixture');
    const rows=(u.searchParams.get('slug') && u.searchParams.get('slug')!==post.slug)?[]:[post];
    res.setHeader('Content-Type','application/json');
    res.setHeader('X-WP-TotalPages','1');
    res.end(JSON.stringify(rows));
  });
  await new Promise(resolve=>fixture.listen(0,'127.0.0.1',resolve));
  const port=await freePort();
  const base='http://127.0.0.1:'+port;
  const logPath=path.join(dir,'server.log');
  const log=await fs.open(logPath,'w');
  const child=spawn(process.execPath,['dist/server.cjs'],{env:{
    ...process.env,NODE_ENV:'production',PORT:String(port),
    VITE_WORDPRESS_API_URL:'http://127.0.0.1:'+fixture.address().port+'/wp-json/wp/v2',
    SITEMAP_CACHE_PATH:path.join(dir,'sitemap.xml'),
    SITEMAP_REFRESH_ON_START:'true',
    CRAWLER_LOGGING_ENABLED:'false'
  },stdio:['ignore',log.fd,log.fd]});
  try{
    let xml='';
    for(let retry=0;retry<100;retry++){
      try{
        const sitemap=await fetch(base+'/sitemap.xml',{redirect:'manual'});
        if(sitemap.status===200){
          xml=await sitemap.text();
          if(xml.includes('/recursos/'+post.slug+'/'))break;
        }
      }catch{}
      await new Promise(resolve=>setTimeout(resolve,100));
    }
    assert.ok(xml.includes('/recursos/'+post.slug+'/'),'sitemap did not refresh using the published WordPress fixture');
    const entries=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
    assert.equal(entries.length,new Set(entries).size);
    assert.ok(entries.length>=24, 'public route registry + one published article');
    for (const url of entries){
      const target=new URL(url);
      assert.equal(target.origin,'https://rauvia.com.mx');
      const response=await fetch(base+target.pathname,{redirect:'manual'});
      assert.equal(response.status,200,target.pathname+' returned '+response.status);
      assert.equal(response.headers.get('location'),null,target.pathname+' must not redirect');
      const html=await response.text();
      assert.match(html,/<link rel="canonical"/,target.pathname);
      assert.ok(html.includes('href="'+target.origin+target.pathname+'"'),target.pathname);
    }
    const retired=await fetch(base+'/analisis-estrategico-mensual-startup',{redirect:'manual'});
    assert.equal(retired.status,410);
    assert.equal(retired.headers.get('location'),null);
  }finally{
    if(child.exitCode===null && child.signalCode===null){
      const exited=new Promise(resolve=>child.once('exit',resolve));
      child.kill('SIGTERM');
      await exited;
    }
    fixture.closeAllConnections();
    await new Promise(resolve=>fixture.close(resolve));
    await log.close();
    await fs.rm(dir,{recursive:true,force:true});
  }
});
