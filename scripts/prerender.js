import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {build} from 'esbuild';
import {publicRoutes} from './public-routes.js';

// Build-only rendering of the existing React pages. No browser, listening
// server, Vite runtime or duplicate hand-written page body is required.
const root=process.cwd(); const dist=path.join(root,'dist');
const bundle=path.join(root,'.prerender-build.mjs');
try {
  const shell=await fs.readFile(path.join(dist,'index.html'),'utf8');
  await fs.writeFile(path.join(dist,'shell.html'),shell);
  await build({entryPoints:[path.join(root,'scripts/render-static.tsx')],outfile:bundle,bundle:true,
    platform:'node',format:'esm',packages:'external',loader:{'.css':'empty'},
    define:{'import.meta.env':'{}'},logLevel:'warning'});
  const manifest=JSON.parse(await fs.readFile(path.join(dist,'.vite/manifest.json'),'utf8'));
  const registry=await fs.readFile(path.join(root,'src/lib/routeLoader.ts'),'utf8');
  const routeEntries=Object.fromEntries([...registry.matchAll(/'([^']+)': \(\) => import\('\.\.\/pages\/([^']+)'\)/g)].map(m=>[m[1], 'src/pages/'+m[2]+'.tsx']));
  const {renderStaticPage}=await import(pathToFileURL(bundle).href);
  for (const route of [...publicRoutes,'/404']) {
    const key=route === '/404' ? '*' : route;
    const seen=new Set(); const hints=[];
    function visit(id) {
      if(seen.has(id))return;seen.add(id);const item=manifest[id];if(!item)return;
      for(const child of item.imports||[])visit(child);
      for(const css of item.css||[])if(!hints.includes(`<link rel="stylesheet" href="/${css}"/>`))hints.push(`<link rel="stylesheet" href="/${css}"/>`);
      if(item.file.endsWith('.js'))hints.push(`<link rel="modulepreload" href="/${item.file}"/>`);
    }
    visit(routeEntries[key]);
    const existingHrefs=new Set([...shell.matchAll(/<link[^>]+href="([^"]+)"/g)].map(m=>m[1]));
    const uniqueHints=hints.filter(h=>!existingHrefs.has(h.match(/href="([^"]+)"/)[1]));
    let routeShell=shell.replace('</head>',uniqueHints.join('\n')+'\n</head>');
    if(routeEntries[key]) routeShell=routeShell.replace('initial-scale=1.0', ['/', '/soluciones', '/aethryon', '/ruta-90', '/frente-comercial', '/nosotros', '/recursos', '/casos'].includes(route) ? 'initial-scale=1, viewport-fit=cover' : 'initial-scale=1.0');
    const html=await renderStaticPage(routeShell,route);
    const expected='https://rauvia.com.mx'+(route==='/' ? '/' : route+'/');
    const canonicalOk = route === '/404' ? !html.includes('rel="canonical"') : html.includes(`href="${expected}"`);
    if (!canonicalOk || !/<h1\b/.test(html)) throw new Error(`Incomplete prerender: ${route}`);
    const file=route==='/' ? path.join(dist,'index.html') : route==='/404' ? path.join(dist,'404.html') : path.join(dist,route,'index.html');
    await fs.mkdir(path.dirname(file),{recursive:true}); await fs.writeFile(file,html);
    console.log('Prerendered',route);
  }
  console.log('Prerender complete: route-specific HTML from the React source.');
} finally {
  await fs.rm(bundle,{force:true});
}
