import test from 'node:test';
import assert from 'node:assert/strict';

// Run against npm run dev (or npm start) in another terminal.
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const production = process.env.TEST_MODE === 'production';
for (const route of ['/nosotros', '/sitio-web-servicios-especializados', '/recursos/articulo-de-prueba']) {
  for (const method of ['GET', 'HEAD']) {
    test(`${method} page preserves query and adds one slash: ${route}`, async () => {
      const res = await fetch(`${base}${route}?utm_source=regression`, { method, redirect: 'manual' });
      assert.equal(res.status, 301);
      assert.equal(res.headers.get('location'), `https://rauvia.com.mx${route}/?utm_source=regression`);
    });
  }
}
for (const route of ['/', '/sitio-web-servicios-especializados/']) {
  test(`canonical page is served without another redirect: ${route}`, async () => {
    const res = await fetch(`${base}${route}`, { redirect: 'manual' });
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/html/);
  });
}
if (!production) {
  for (const route of ['/@react-refresh', '/@vite/client']) {
    test(`Vite module is JavaScript, not redirected HTML: ${route}`, async () => {
      const res = await fetch(`${base}${route}`, { redirect: 'manual' });
      assert.equal(res.status, 200);
      assert.equal(res.headers.get('location'), null);
      assert.match(res.headers.get('content-type'), /javascript/);
      assert.doesNotMatch(await res.text(), /<!doctype html>/i);
    });
  }
}
test('machine-readable document is still served', async () => {
  const res = await fetch(`${base}/llmo/index.json`, { redirect: 'manual' });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /json/);
});
