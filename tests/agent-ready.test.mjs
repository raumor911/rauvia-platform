import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.TEST_BASE_URL;
const rpc = (body) => fetch(base + '/mcp', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(body)});

test('robots.txt declara Content-Signal', () => {
  assert.match(fs.readFileSync('public/robots.txt', 'utf8'), /^Content-Signal: .*search=yes.*ai-train=no/m);
});
test('Inicio anuncia recursos con cabecera Link (RFC 8288)', {skip: !base}, async () => {
  const r = await fetch(base + '/', {redirect: 'manual'});
  const link = r.headers.get('link');
  assert.match(link, /<\/llms\.txt>; rel="describedby"/);
  assert.match(link, /<\/llmo\/rauvia\.md>; rel="alternate"; type="text\/markdown"/);
  assert.match(r.headers.get('vary') || '', /Accept/i);
});
test('Inicio y AETHRYON sirven Markdown con Accept: text/markdown; los navegadores siguen recibiendo HTML', {skip: !base}, async () => {
  for (const p of ['/', '/aethryon/']) {
    const md = await fetch(base + p, {headers: {accept: 'text/markdown'}});
    assert.match(md.headers.get('content-type'), /text\/markdown/);
    assert.match(await md.text(), /^# /m);
    const html = await fetch(base + p, {headers: {accept: 'text/html,application/xhtml+xml,*/*;q=0.8'}});
    assert.match(html.headers.get('content-type'), /text\/html/);
  }
});
test('MCP Server Card publicada y apunta a un endpoint que responde', {skip: !base}, async () => {
  const r = await fetch(base + '/.well-known/mcp/server-card.json');
  assert.equal(r.status, 200);
  const card = await r.json();
  assert.ok(card.name && card.version && card.endpoint && card.capabilities.tools);
  assert.equal(new URL(card.endpoint).pathname, '/mcp');
  const init = await (await rpc({jsonrpc: '2.0', id: 1, method: 'initialize', params: {}})).json();
  assert.equal(init.result.serverInfo.name, card.name);
});
test('MCP: herramientas de solo lectura, sin datos privados, errores correctos', {skip: !base}, async () => {
  const list = await (await rpc({jsonrpc: '2.0', id: 2, method: 'tools/list'})).json();
  assert.ok(list.result.tools.length >= 4);
  assert.ok(list.result.tools.every(t => t.annotations.readOnlyHint === true && t.inputSchema.type === 'object'));
  const org = await (await rpc({jsonrpc: '2.0', id: 3, method: 'tools/call', params: {name: 'get_organization', arguments: {}}})).json();
  assert.match(org.result.content[0].text, /\+52 55 8649 4076/);
  const bad = await (await rpc({jsonrpc: '2.0', id: 4, method: 'tools/call', params: {name: 'get_markdown', arguments: {topic: '../../server.ts'}}})).json();
  assert.equal(bad.result.isError, true);
  assert.equal((await rpc({jsonrpc: '2.0', id: 5, method: 'nope'})).status, 200);
  assert.equal((await fetch(base + '/mcp')).status, 405);
  assert.equal((await rpc({foo: 1})).status, 400);
});
test('Inicio: datos de contacto y varios tipos de schema', {skip: !base}, async () => {
  const html = await (await fetch(base + '/')).text();
  assert.match(html, /href="tel:\+525586494076"/);
  assert.match(html, /rel="terms-of-service"/);
  const types = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1])['@type']);
  for (const t of ['Organization', 'WebSite', 'WebPage', 'ProfessionalService']) assert.ok(types.includes(t), t);
  const org = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1])).find(x => x['@type'] === 'Organization');
  assert.equal(org.telephone, '+52 55 8649 4076');
  assert.equal(org.address.addressCountry, 'MX');
});
