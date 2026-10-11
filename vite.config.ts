import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'node:fs';
import {gzipSync} from 'node:zlib';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), {name:'rauvia-build-evidence', generateBundle(_,bundle) {
      const graph = Object.values(bundle).filter(c => c.type === 'chunk').map(c => ({file:c.fileName, entry:c.isEntry, raw:Buffer.byteLength(c.code), gzip:gzipSync(c.code).length, imports:c.imports, dynamicImports:c.dynamicImports, modules:Object.entries(c.modules).map(([id,m]) => ({id:path.relative(process.cwd(),id), renderedLength:m.renderedLength, imports:this.getModuleInfo(id)?.importedIds.map(x=>path.relative(process.cwd(),x))}))}));
      fs.mkdirSync('docs/v72-evidencias',{recursive:true});
      fs.writeFileSync('docs/v72-evidencias/bundle-graph.json',JSON.stringify(graph,null,2));
    }}],
    build: {manifest:true},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
