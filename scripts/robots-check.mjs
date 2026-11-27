// Analizador de robots.txt (RFC 9309) para verificar la política agente por agente (spec Soluciones, L-06 y L-08).
// Reglas del estándar: un rastreador sigue SOLO el grupo cuyo `User-agent` lo nombra (el de coincidencia más larga) y, si ninguno
// lo nombra, el grupo `*`. Dentro del grupo gana la regla de ruta más larga; a igual largo, gana Allow. Se admiten `*` y `$`.
// Uso: node scripts/robots-check.mjs [ruta/robots.txt]
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';

export const parseRobots = text => {
  const groups = [];
  let current = null, lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).trim().toLowerCase(), value = line.slice(i + 1).trim();
    if (key === 'user-agent') {
      if (!current || !lastWasAgent) { current = {agents: [], rules: [], signals: []}; groups.push(current); }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (key === 'allow' || key === 'disallow') current.rules.push({allow: key === 'allow', path: value});
    else if (key === 'content-signal') current.signals.push(value);
  }
  return groups;
};

export const groupFor = (groups, agent) => {
  const a = agent.toLowerCase();
  let best = null, bestLen = -1;
  for (const g of groups) for (const name of g.agents) {
    if (name !== '*' && a.includes(name) && name.length > bestLen) { best = g; bestLen = name.length; }
  }
  return best || groups.find(g => g.agents.includes('*')) || null;
};

const toRegex = path => new RegExp('^' + path.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));

export const isAllowed = (groups, agent, urlPath) => {
  const g = groupFor(groups, agent);
  if (!g) return true;
  let best = null;
  for (const r of g.rules) {
    if (!r.path) continue; // «Disallow:» vacío no bloquea nada
    if (!toRegex(r.path).test(urlPath)) continue;
    if (!best || r.path.length > best.path.length || (r.path.length === best.path.length && r.allow)) best = r;
  }
  return best ? best.allow : true;
};

export const AGENTS = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'CCBot', 'ClaudeBot', 'AgenteSinGrupo'];
export const PATHS = ['/', '/soluciones/', '/blog/wp-admin/', '/blog/wp-admin/admin-ajax.php', '/blog/wp-login.php', '/blog/wp-includes/x.js', '/buscar?s=x', '/preview/', '/drafts/'];

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2] || 'public/robots.txt';
  const groups = parseRobots(fs.readFileSync(file, 'utf8'));
  console.log(`${file}: ${groups.length} grupos`);
  for (const agent of AGENTS) {
    const g = groupFor(groups, agent);
    console.log(`\n${agent} → grupo [${g.agents.join(', ')}] · Content-Signal: ${g.signals.join(' | ') || 'AUSENTE'}`);
    console.log(PATHS.map(p => `  ${isAllowed(groups, agent, p) ? 'permite  ' : 'bloquea  '}${p}`).join('\n'));
  }
}
