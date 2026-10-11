// Exercise the real compiled Express app in-process. Transport and external
// services are simulated; no listening socket or production call is made.
import vm from 'node:vm';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {Duplex} from 'node:stream';
import {IncomingMessage, ServerResponse} from 'node:http';
import {EventEmitter} from 'node:events';

export async function productionApp(env, fetcher) {
  const require=createRequire(new URL('../../dist/server.cjs',import.meta.url));
  const original=require('express');let app,ready;
  const booted=new Promise(resolve=>ready=resolve);
  const express=Object.assign((...args)=>{
    app=original(...args);
    // Express checks RegExp with instanceof; normalize across the VM boundary.
    const get=app.get;
    app.get=function(route,...handlers){return get.call(this,
      Object.prototype.toString.call(route)==='[object RegExp]'?new RegExp(route.source,route.flags):route,...handlers);};
    app.listen=(_port,_host,callback)=>{callback?.();ready();return new EventEmitter();};
    return app;
  },original);
  const fakeProcess=Object.create(process);
  fakeProcess.env={...process.env,...env,OBSERVABILITY_ENABLED:'false',CRAWLER_LOGGING_ENABLED:'false'};
  fakeProcess.cwd=()=>env.TEST_APP_ROOT || process.cwd();
  fakeProcess.on=()=>fakeProcess;
  const logs=[];
  const context={require:name=>name==='express'?express:require(name),module:{exports:{}},exports:{},
    process:fakeProcess,global:{},Buffer,URL,URLSearchParams,AbortController,AbortSignal,Response,Headers,
    fetch:fetcher,setTimeout,clearTimeout,setImmediate,clearImmediate,
    setInterval:()=>({unref(){}}),clearInterval:()=>{},
    console:Object.fromEntries(['log','warn','error'].map(method=>[method,(...args)=>logs.push(args.join(' '))])),
    __dirname:new URL('../../dist/',import.meta.url).pathname,__filename:new URL('../../dist/server.cjs',import.meta.url).pathname};
  vm.runInNewContext(fs.readFileSync(new URL('../../dist/server.cjs',import.meta.url),'utf8'),context);
  await booted;
  async function request(url,{method='GET',headers={},body}={}) {
    const chunks=[];
    const socket=new Duplex({read(){},write(_chunk,_encoding,done){done();}});
    socket.remoteAddress='127.0.0.1';
    const req=new IncomingMessage(socket);req.url=url;req.method=method;req.httpVersion='1.1';
    req.headers={host:'rauvia.com.mx',...headers};
    const payload=body===undefined?'':typeof body==='string'?body:JSON.stringify(body);
    if(body!==undefined){req.headers['content-type']='application/json';req.headers['content-length']=String(Buffer.byteLength(payload));}
    const res=new ServerResponse(req);res.assignSocket(socket);
    const end=res.end;
    // Capture body separately: a synthetic socket has no HTTP server drain loop.
    res.write=function(chunk){if(chunk)chunks.push(Buffer.from(chunk));return true;};
    res.end=function(chunk,...args){if(chunk)chunks.push(Buffer.from(chunk));return end.call(this,undefined,...args);};
    const done=new Promise((resolve,reject)=>{res.on('finish',resolve);res.on('error',reject);});
    app.handle(req,res);
    if(payload)req.push(payload);req.push(null);
    await done;
    const text=Buffer.concat(chunks).toString();
    socket.destroy();
    return {status:res.statusCode,headers:res.getHeaders(),text,json:()=>JSON.parse(text)};
  }
  return {request,logs};
}
