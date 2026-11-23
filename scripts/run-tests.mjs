#!/usr/bin/env node
// Suite completa en un comando: levanta el servidor de producción de dist/ y corre todas las pruebas con TEST_BASE_URL.
//   npm test           → requiere `npm run build` previo
//   npm run test:ci    → build + suite (lo que corre el CI)
import {spawn, spawnSync} from 'node:child_process';
import fs from 'node:fs';

if (!fs.existsSync('dist/server.cjs')) { console.error('Falta dist/. Ejecuta `npm run build` (o `npm run test:ci`).'); process.exit(2); }
const PORT = process.env.TEST_PORT || '3119';
const base = `http://127.0.0.1:${PORT}`;
const server = spawn('node', ['dist/server.cjs'], {env: {...process.env, NODE_ENV: 'production', PORT}, stdio: 'ignore'});
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop); process.on('SIGINT', () => process.exit(130));
let ready = false;
for (let i = 0; i < 60 && !ready; i++) { try { ready = (await fetch(base + '/')).ok; } catch {} if (!ready) await new Promise(r => setTimeout(r, 250)); }
if (!ready) { console.error('El servidor de producción no respondió.'); process.exit(2); }
const files = fs.readdirSync('tests').filter(f => /\.test\.(mjs|ts)$/.test(f)).map(f => 'tests/' + f);
const run = spawnSync('node', ['--import', 'tsx', '--test', ...files], {stdio: 'inherit', env: {...process.env, TEST_BASE_URL: base, TEST_MODE: 'production'}});
stop();
process.exit(run.status ?? 1);
