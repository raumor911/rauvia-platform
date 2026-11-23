// Capas animadas de los hero de Soluciones, AETHRYON y Nosotros (decorativas, dibujadas sobre el campo de convergencia).
//  · assets: los activos se despliegan desde el núcleo por haces de energía.
//  · radar : un barrido detecta señales y fija la prioridad activa.
//  · shield: un escudo hexagonal desvía las pérdidas que avanzan hacia el núcleo.
// Todas muestran primero los haces hacia los rótulos de la escena ([data-fx-node]).

export type OverlayKind = 'assets' | 'radar' | 'shield';
export type OverlayNode = { x: number; y: number; dir: 'in' | 'out' | 'node' };
export type OverlayInfo = { w: number; h: number; cx: number; cy: number; u: number; scale: number; nodes: OverlayNode[] };
export interface Overlay {
  layout(info: OverlayInfo): void;
  draw(ctx: CanvasRenderingContext2D, t: number, dt: number, still: boolean, ptr: { x: number; y: number; on: boolean }): void;
}

const BLUE = '140,185,235';
const CYAN = '110,200,235';
const GOLD = '255,215,102';
const TAU = Math.PI * 2;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

let glowSprite: HTMLCanvasElement | null = null;
function glow() {
  if (glowSprite) return glowSprite;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, `rgba(${GOLD},1)`); gr.addColorStop(.22, `rgba(${GOLD},.55)`); gr.addColorStop(1, `rgba(${GOLD},0)`);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return (glowSprite = c);
}

// semilla estable para que el layout sea reproducible
function rng(seed: number) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }

// ---------------------------------------------------------------- haces hacia los rótulos
function drawBeams(ctx: CanvasRenderingContext2D, info: OverlayInfo, t: number, still: boolean) {
  const { cx, cy, nodes } = info;
  const sprite = glow();
  nodes.forEach((n, i) => {
    const t0 = 1.5 + i * .22;
    const p = still ? 1 : easeOut(clamp((t - t0) / .9));
    if (p <= 0) return;
    const ex = cx + (n.x - cx) * p, ey = cy + (n.y - cy) * p;
    const g = ctx.createLinearGradient(cx, cy, n.x, n.y);
    g.addColorStop(0, `rgba(${GOLD},.7)`); g.addColorStop(1, `rgba(${BLUE},.4)`);
    ctx.strokeStyle = `rgba(${GOLD},.07)`; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.strokeStyle = g; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
    if (still || t < t0 + .9) return;
    const phase = (((t - t0 - .9) / 2.6) + i * .37) % 1;
    const s = n.dir === 'in' ? 1 - phase : phase;
    const x = cx + (n.x - cx) * s, y = cy + (n.y - cy) * s;
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = Math.sin(phase * Math.PI);
    ctx.drawImage(sprite, x - 18, y - 18, 36, 36);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  });
}

// ---------------------------------------------------------------- assets
function createAssets(): Overlay {
  let info: OverlayInfo;
  return {
    layout(i) { info = i; },
    draw(ctx, t, _dt, still) {
      if (!info) return;
      const { cx, cy, u } = info;
      // onda de despliegue: anillo dorado que sale del núcleo cada 7 s hacia los activos
      if (!still) {
        const k = (t - 2.6) % 7;
        if (t > 2.6 && k >= 0 && k < 1.8) {
          const r = easeOut(k / 1.8) * u * 2.7;
          const a = 1 - k / 1.8;
          ctx.strokeStyle = `rgba(${GOLD},${.55 * a})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
          ctx.strokeStyle = `rgba(${GOLD},${.12 * a})`; ctx.lineWidth = 14;
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
        }
      }
      drawBeams(ctx, info, t, still);
    },
  };
}

// ---------------------------------------------------------------- radar
type Blip = { ang: number; rad: number; gold: boolean };
function createRadar(): Overlay {
  let info: OverlayInfo;
  let blips: Blip[] = [];
  return {
    layout(i) {
      info = i;
      const r = rng(11);
      blips = [];
      for (let k = 0; k < 30; k++) blips.push({ ang: r() * TAU, rad: (1.25 + r() * 1.25) * i.u, gold: false });
      [0.6, 2.1, 3.7, 5.2].forEach((a, k) => blips.push({ ang: a, rad: (1.45 + k * .22) * i.u, gold: true }));
    },
    draw(ctx, t, _dt, still) {
      if (!info) return;
      const { cx, cy, u } = info;
      const rings = [1.45 * u, 2.0 * u, 2.6 * u];
      const fade = still ? 1 : clamp((t - .5) / 1.2);
      ctx.save();
      ctx.setLineDash([3, 7]); ctx.lineWidth = 1.2;
      rings.forEach((r, k) => { ctx.strokeStyle = `rgba(${BLUE},${(.5 - k * .09) * fade})`; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); });
      ctx.setLineDash([]);
      for (let k = 0; k < 72; k++) { // marcas de rumbo
        const a = (k / 72) * TAU, r0 = rings[2], r1 = r0 + (k % 6 === 0 ? 11 : 5);
        ctx.strokeStyle = `rgba(${BLUE},${(k % 6 === 0 ? .65 : .32) * fade})`;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.stroke();
      }
      const a = still ? -0.9 : (t * .85) % TAU;
      const out = rings[2] * 1.02, step = .04, n = 28;
      if (!still) for (let k = 0; k < n; k++) { // estela del barrido
        ctx.fillStyle = `rgba(${CYAN},${Math.pow(1 - k / n, 1.6) * .42 * fade})`;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, out, a - (k + 1) * step, a - k * step); ctx.closePath(); ctx.fill();
      }
      ctx.strokeStyle = `rgba(${GOLD},${.1 * fade})`; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * out, cy + Math.sin(a) * out); ctx.stroke();
      ctx.strokeStyle = `rgba(${GOLD},${.8 * fade})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * out, cy + Math.sin(a) * out); ctx.stroke();
      ctx.restore();

      // señales
      const sprite = glow();
      ctx.globalCompositeOperation = 'lighter';
      for (const b of blips) {
        const delta = (((a - b.ang) % TAU) + TAU) % TAU;
        const lit = still ? .5 : (t < 1.2 ? 0 : Math.exp(-delta * 1.8));
        const x = cx + Math.cos(b.ang) * b.rad, y = cy + Math.sin(b.ang) * b.rad;
        ctx.fillStyle = b.gold ? `rgba(${GOLD},${.2 + .8 * lit})` : `rgba(210,230,250,${.12 + .85 * lit})`;
        ctx.beginPath(); ctx.arc(x, y, b.gold ? 3.2 : 2, 0, TAU); ctx.fill();
        if (lit > .4) { ctx.globalAlpha = lit; const s = b.gold ? 38 : 22; ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s); ctx.globalAlpha = 1; }
      }
      ctx.globalCompositeOperation = 'source-over';

      // la prioridad activa se fija: soporte, anillo de confirmación y ruta hacia el núcleo
      for (const b of blips) {
        if (!b.gold) continue;
        const delta = (((a - b.ang) % TAU) + TAU) % TAU;
        const x = cx + Math.cos(b.ang) * b.rad, y = cy + Math.sin(b.ang) * b.rad;
        const lit = still ? .5 : Math.exp(-delta * 1.8);
        ctx.strokeStyle = `rgba(${GOLD},${.1 + .45 * lit})`; ctx.lineWidth = 1; ctx.setLineDash([2, 6]);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(cx, cy); ctx.stroke(); ctx.setLineDash([]);
        const m = 11, s = 8;
        ctx.strokeStyle = `rgba(${GOLD},${.25 + .6 * lit})`; ctx.lineWidth = 1.4;
        ([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).forEach(([sx, sy]) => {
          ctx.beginPath(); ctx.moveTo(x + sx * m, y + sy * (m - s)); ctx.lineTo(x + sx * m, y + sy * m); ctx.lineTo(x + sx * (m - s), y + sy * m); ctx.stroke();
        });
        if (!still && delta < .7) {
          const k = delta / .7;
          ctx.strokeStyle = `rgba(${GOLD},${(1 - k) * .8})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(x, y, 8 + k * 30, 0, TAU); ctx.stroke();
        }
      }
      drawBeams(ctx, info, t, still);
    },
  };
}

// ---------------------------------------------------------------- shield
type Particle = { x: number; y: number; vx: number; vy: number; trail: Array<[number, number]> };
type Ping = { x: number; y: number; age: number };
function createShield(): Overlay {
  let info: OverlayInfo;
  const parts: Particle[] = [];
  const pings: Ping[] = [];
  const flash = [0, 0, 0, 0, 0, 0];
  let spawnT = 0;
  const r = rng(23);
  const hex = (cx: number, cy: number, R: number, rot: number) => Array.from({ length: 6 }, (_, k) => [cx + Math.cos(rot + k * Math.PI / 3) * R, cy + Math.sin(rot + k * Math.PI / 3) * R] as const);
  return {
    layout(i) { info = i; parts.length = 0; pings.length = 0; },
    draw(ctx, t, dt, still) {
      if (!info) return;
      const { cx, cy, u, scale } = info;
      const grow = still ? 1 : easeOut(clamp((t - .8) / 1.4));
      const Rs = 1.55 * u * grow;
      const rot = still ? 0.2 : t * .08;
      if (grow <= 0) { drawBeams(ctx, info, t, still); return; }

      // partículas de pérdida que avanzan hacia el núcleo y se desvían al tocar el escudo
      if (!still) {
        if (t > 1.9 && t > spawnT && parts.length < 30) {
          spawnT = t + .16 + r() * .2;
          const ang = r() * TAU, d = u * (3.4 + r() * .8), sp = (55 + r() * 55) * Math.max(.7, scale);
          const x = cx + Math.cos(ang) * d, y = cy + Math.sin(ang) * d;
          parts.push({ x, y, vx: -Math.cos(ang) * sp, vy: -Math.sin(ang) * sp, trail: [] });
        }
        for (let k = parts.length - 1; k >= 0; k--) {
          const p = parts[k];
          p.x += p.vx * dt; p.y += p.vy * dt;
          p.trail.push([p.x, p.y]); if (p.trail.length > 12) p.trail.shift();
          const dx = p.x - cx, dy = p.y - cy;
          if (Math.hypot(dx, dy) < Rs * .9) {
            const ang = Math.atan2(dy, dx);
            const idx = Math.floor((((ang - rot + Math.PI / 6) % TAU) + TAU) % TAU / (Math.PI / 3)) % 6;
            flash[idx] = 1;
            pings.push({ x: p.x, y: p.y, age: 0 });
            parts.splice(k, 1);
          }
        }
        const k = (t - 3) % 6; // pulso de refuerzo desde el núcleo
        if (t > 3 && k >= 0 && k < 1.4) {
          const rr = easeOut(k / 1.4) * Rs, a = 1 - k / 1.4;
          ctx.strokeStyle = `rgba(${GOLD},${.45 * a})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(cx, cy, rr, 0, TAU); ctx.stroke();
          if (k > 1.15) for (let i = 0; i < 6; i++) flash[i] = Math.max(flash[i], .7);
        }
      }

      // escudo: hexágono interior fino, principal dorado con halo y exterior discontinuo a contragiro
      const poly = (pts: ReadonlyArray<readonly [number, number]>) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); };
      const inner = hex(cx, cy, Rs * .88, rot), main = hex(cx, cy, Rs, rot), outer = hex(cx, cy, Rs * 1.13, -rot * .6 + .3);
      ctx.fillStyle = `rgba(30,74,116,${.1 * grow})`; poly(main); ctx.fill();
      ctx.strokeStyle = `rgba(${BLUE},${.28 * grow})`; ctx.lineWidth = 1; poly(inner); ctx.stroke();
      ctx.save(); ctx.setLineDash([4, 8]); ctx.strokeStyle = `rgba(${GOLD},${.3 * grow})`; poly(outer); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = `rgba(${GOLD},${.1 * grow})`; ctx.lineWidth = 10; poly(main); ctx.stroke();
      ctx.strokeStyle = `rgba(${GOLD},${.7 * grow})`; ctx.lineWidth = 2; poly(main); ctx.stroke();
      for (let i = 0; i < 6; i++) { // impactos: la arista tocada se enciende
        flash[i] = Math.max(0, flash[i] - dt * 1.8);
        if (flash[i] < .02) continue;
        const a = main[i], b = main[(i + 1) % 6];
        ctx.strokeStyle = `rgba(255,244,201,${flash[i]})`; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }
      const sprite = glow();
      ctx.globalCompositeOperation = 'lighter';
      main.forEach(([x, y]) => { ctx.globalAlpha = .9 * grow; ctx.drawImage(sprite, x - 12, y - 12, 24, 24); });
      ctx.globalAlpha = 1;

      // partículas y chispas
      for (const p of parts) {
        for (let q = 1; q < p.trail.length; q++) {
          ctx.strokeStyle = `rgba(190,205,225,${(q / p.trail.length) * .35})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(p.trail[q - 1][0], p.trail[q - 1][1]); ctx.lineTo(p.trail[q][0], p.trail[q][1]); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(205,220,240,.9)'; ctx.fillRect(p.x - 1.4, p.y - 1.4, 2.8, 2.8);
      }
      ctx.globalCompositeOperation = 'source-over';
      for (let k = pings.length - 1; k >= 0; k--) {
        const g = pings[k]; g.age += dt;
        if (g.age > .6) { pings.splice(k, 1); continue; }
        const a = 1 - g.age / .6;
        ctx.strokeStyle = `rgba(${GOLD},${a * .9})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(g.x, g.y, 3 + g.age * 55, 0, TAU); ctx.stroke();
      }
      drawBeams(ctx, info, t, still);
    },
  };
}

export function createOverlay(kind: OverlayKind): Overlay {
  return kind === 'radar' ? createRadar() : kind === 'shield' ? createShield() : createAssets();
}
