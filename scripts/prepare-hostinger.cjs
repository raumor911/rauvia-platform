'use strict';
// Hostinger's Express archive flow installs packages without a build command.
// Build once during installation; never start a development server.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], {
  cwd: root, stdio: 'inherit', env: process.env,
});
if (result.error) {
  console.error('RAUVIA: production build could not start:', result.error.message);
  process.exit(1);
}
if (result.status !== 0) process.exit(result.status || 1);
for (const file of ['dist/server.cjs', 'dist/shell.html', 'dist/index.html', 'dist/.vite/manifest.json']) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error('RAUVIA: required production build file is missing:', file);
    process.exit(1);
  }
}
console.log('RAUVIA: complete production build prepared during npm install.');
