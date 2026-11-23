import { useEffect, useRef } from 'react';

// Campo de convergencia del hero (decorativo, aria-hidden).
// Idea: "construimos la estructura". Puntos dispersos se ordenan en una retícula hexagonal que nace del núcleo
// AETHRYON y crece hacia afuera con un frente de ignición dorado; después la energía viaja por las aristas.
// El puntero deforma la retícula. Mejora progresiva: con movimiento reducido se pinta un solo cuadro ya armado.

type N = { tx: number; ty: number; sx: number; sy: number; d: number; a: number; delay: number; ph: number; ox: number; oy: number; gold: boolean; nb: number[]; x: number; y: number; asm: number };
type Pulse = { path: number[]; seg: number; t: number; trail: Array<[number, number]> };

const BLUE = '140,185,235';
const GOLD = '255,215,102';
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
const DUR = 1.5;
const GROW = 1.9;
const LEVELS = 8;
const buckets: number[][] = Array.from({ length: LEVELS * 2 }, () => []);

type Props = {
  /** Selector del elemento cuyo centro es el núcleo; si no existe se usa `origin`. */
  coreSelector?: string;
  /** Centro del núcleo como fracción del contenedor [x, y]. */
  origin?: [number, number];
  /** 'outward': la energía sale del núcleo (hero). 'inward': converge hacia el núcleo (footer). */
  flow?: 'outward' | 'inward';
  className?: string;
};

export default function ConvergenceField({ coreSelector = '.rv-aethryon-graphic', origin = [.5, .42], flow = 'outward', className = 'rv-hero-field' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let w = 0, h = 0, dpr = 1, R = 1, cx = 0, cy = 0, scale = 1;
    let nodes: N[] = [];
    let edges: Array<[number, number]> = [];
    const pulses: Pulse[] = [];
    const ptr = { x: -9999, y: -9999, on: false };
    let t0 = performance.now();
    let last = t0;
    let began = false;
    let coreFlash = 0;
    const inward = flow === 'inward';
    let spawnAt = 0;
    let raf = 0;
    let visible = true;
    let seed = 7;
    let dprCap = w0();
    let slow = 0;
    function w0() { return window.innerWidth < 768 ? 1.5 : 2; }
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    // sprite de brillo dorado (barato de dibujar muchas veces)
    const glow = document.createElement('canvas');
    glow.width = glow.height = 48;
    const g = glow.getContext('2d')!;
    const gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    gr.addColorStop(0, `rgba(${GOLD},1)`); gr.addColorStop(.25, `rgba(${GOLD},.55)`); gr.addColorStop(1, `rgba(${GOLD},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, 48, 48);

    function layout() {
      const rect = host!.getBoundingClientRect();
      w = Math.max(1, rect.width); h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas!.width = Math.round(w * dpr); canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = clamp(w / 1440, .55, 1.2);

      const core = host!.querySelector(coreSelector);
      const c = core ? core.getBoundingClientRect() : null;
      if (c && c.width > 0) {
        cx = c.left - rect.left + c.width / 2; cy = c.top - rect.top + c.height / 2;
      } else { cx = w * origin[0]; cy = h * origin[1]; }
      R = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) * .96;

      // retícula triangular (cada nodo con 6 vecinos = panal)
      const s = w < 768 ? 48 : w < 1280 ? 62 : 74;
      const dy = s * .866;
      const rows = Math.ceil(h / dy) + 3, cols = Math.ceil(w / s) + 3;
      const idx: number[][] = [];
      nodes = []; edges = []; seed = 7;
      for (let r = 0; r < rows; r++) {
        idx[r] = [];
        for (let c = 0; c < cols; c++) {
          const x = (c - 1) * s + (r % 2 ? s / 2 : 0), y = (r - 1) * dy;
          const d = Math.hypot(x - cx, y - cy);
          const a = clamp(1 - Math.pow(d / R, 1.25), .06, 1);
          idx[r][c] = nodes.length;
          nodes.push({ tx: x, ty: y, sx: rnd() * w, sy: rnd() * h, d, a, delay: .1 + (d / R) * GROW + rnd() * .25, ph: rnd() * 6.283, ox: 0, oy: 0, gold: rnd() < .13, nb: [], x, y, asm: 0 });
        }
      }
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const i = idx[r][c];
        const link = (rr: number, cc: number) => { const j = idx[rr]?.[cc]; if (j !== undefined) { edges.push([i, j]); nodes[i].nb.push(j); nodes[j].nb.push(i); } };
        link(r, c + 1);
        link(r + 1, c + (r % 2 ? 1 : 0));
        link(r + 1, c + (r % 2 ? 0 : -1));
      }
    }

    function spawn() {
      const pool = inward ? nodes.filter(n => n.d > R * .5 && n.d < R * .85) : nodes.filter(n => n.d < R * .22);
      if (!pool.length) return;
      let cur = nodes.indexOf(pool[Math.floor(rnd() * pool.length)]);
      const path = [cur];
      for (let k = 0; k < 60; k++) {
        const next = nodes[cur].nb.filter(j => inward ? nodes[j].d < nodes[cur].d - 1 : nodes[j].d > nodes[cur].d + 1);
        if (!next.length) break;
        cur = next[Math.floor(rnd() * next.length)];
        path.push(cur);
        if (inward ? nodes[cur].d < R * .08 : nodes[cur].a < .12) break;
      }
      if (path.length > 3) pulses.push({ path, seg: 0, t: 0, trail: [] });
    }

    function frame(now: number, still = false) {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const t = still ? 99 : (now - t0) / 1000;
      const front = ((t - .1) / GROW) * R;
      // latido: cada 9 s un anillo de energía sale del núcleo
      const BEAT = 9, bt = still ? -1 : (t - (GROW + 2.2)) % BEAT;
      const bp = bt / 2.4;
      const beatFront = t > GROW + 2.2 && bt >= 0 && bt < 2.4 ? (inward ? 1 - bp : bp) * R * .95 : -1;
      const ignAt = (d: number, sw: number) => still ? 0 : Math.max(
        Math.exp(-Math.pow((d - front) / (R * sw), 2)),
        beatFront > 0 ? Math.exp(-Math.pow((d - beatFront) / (R * sw * 1.1), 2)) * .85 : 0);
      ctx!.clearRect(0, 0, w, h);

      // núcleo: respiración de luz
      const br = .92 + Math.sin(t * 1.3) * .08;
      const cg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * .5 * br);
      cg.addColorStop(0, 'rgba(60,150,190,.30)'); cg.addColorStop(.35, 'rgba(30,74,116,.18)'); cg.addColorStop(1, 'rgba(30,74,116,0)');
      ctx!.fillStyle = cg; ctx!.fillRect(0, 0, w, h);

      // destello del núcleo cuando llega energía
      if (coreFlash > .01) {
        const fg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * .2);
        fg.addColorStop(0, `rgba(${GOLD},${.42 * coreFlash})`); fg.addColorStop(1, `rgba(${GOLD},0)`);
        ctx!.fillStyle = fg; ctx!.fillRect(cx - R * .2, cy - R * .2, R * .4, R * .4);
        coreFlash *= Math.max(0, 1 - dt * 2.4);
      }

      // posiciones
      const push = 150 * scale;
      for (const n of nodes) {
        n.asm = easeOut(clamp((t - n.delay) / DUR));
        const bx = n.sx + (n.tx - n.sx) * n.asm, by = n.sy + (n.ty - n.sy) * n.asm;
        let fx = 0, fy = 0;
        if (ptr.on) {
          const dx = n.tx - ptr.x, dy = n.ty - ptr.y, dd = Math.hypot(dx, dy);
          if (dd < push && dd > .1) { const k = Math.pow(1 - dd / push, 2) * 26 * scale; fx = (dx / dd) * k; fy = (dy / dd) * k; }
        }
        n.ox += (fx - n.ox) * .12; n.oy += (fy - n.oy) * .12;
        const fl = n.asm > .99 && !still ? 1 : 0;
        n.x = bx + n.ox + Math.sin(t * .8 + n.ph) * 2.2 * fl + (1 - n.asm) * Math.sin(t * 1.6 + n.ph) * 10;
        n.y = by + n.oy + Math.cos(t * .7 + n.ph) * 2.2 * fl + (1 - n.asm) * Math.cos(t * 1.3 + n.ph) * 10;
      }

      // aristas: se agrupan por color y nivel de opacidad para dibujar pocas trazas por cuadro
      ctx!.lineWidth = 1;
      for (const b of buckets) b.length = 0;
      for (const [i, j] of edges) {
        const A = nodes[i], B = nodes[j];
        const vis = clamp((Math.min(A.asm, B.asm) - .55) / .45);
        if (vis < .02) continue;
        const a = Math.min(A.a, B.a);
        const dm = (A.d + B.d) / 2;
        const ign = ignAt(dm, .07);
        let boost = 0;
        if (ptr.on) { const mx = (A.x + B.x) / 2 - ptr.x, my = (A.y + B.y) / 2 - ptr.y; boost = clamp(1 - Math.hypot(mx, my) / (190 * scale)) * .5; }
        const al = vis * vis * (.07 + a * .2) + ign * .75 * a + boost * a;
        if (al < .015) continue;
        const lvl = Math.min(LEVELS - 1, Math.floor(clamp(al) * LEVELS));
        buckets[(ign > .08 ? LEVELS : 0) + lvl].push(A.x, A.y, B.x, B.y);
      }
      for (let k = 0; k < buckets.length; k++) {
        const arr = buckets[k];
        if (!arr.length) continue;
        const gold = k >= LEVELS, lvl = k % LEVELS;
        ctx!.strokeStyle = `rgba(${gold ? GOLD : BLUE},${(lvl + .5) / LEVELS})`;
        ctx!.beginPath();
        for (let q = 0; q < arr.length; q += 4) { ctx!.moveTo(arr[q], arr[q + 1]); ctx!.lineTo(arr[q + 2], arr[q + 3]); }
        ctx!.stroke();
      }

      // nodos
      for (const n of nodes) {
        const ign = ignAt(n.d, .06);
        const base = n.asm < 1 ? .25 + n.asm * .4 : .5;
        const al = clamp((base * (.35 + n.a * .65) + ign) * (n.asm < .02 ? .4 : 1));
        const r = (n.gold ? 2.1 : 1.5) * (1 + ign * 1.2);
        ctx!.fillStyle = n.gold || ign > .1 ? `rgba(${GOLD},${al})` : `rgba(210,230,250,${al * .8})`;
        ctx!.beginPath(); ctx!.arc(n.x, n.y, r, 0, 6.283); ctx!.fill();
      }

      // frente de ignición
      if (!still && front > 0 && front < R * 1.05) {
        const fa = clamp(1 - front / (R * 1.05));
        ctx!.strokeStyle = `rgba(${GOLD},${.45 * fa})`; ctx!.lineWidth = 1.5;
        ctx!.beginPath(); ctx!.arc(cx, cy, front, 0, 6.283); ctx!.stroke();
        ctx!.strokeStyle = `rgba(${GOLD},${.14 * fa})`; ctx!.lineWidth = 14;
        ctx!.beginPath(); ctx!.arc(cx, cy, front, 0, 6.283); ctx!.stroke();
        ctx!.lineWidth = 1;
      }

      if (!still && beatFront > 0) {
        const ba = inward ? Math.sin(bp * Math.PI) : clamp(1 - bp);
        ctx!.strokeStyle = `rgba(${GOLD},${.5 * ba})`; ctx!.lineWidth = 1.5;
        ctx!.beginPath(); ctx!.arc(cx, cy, beatFront, 0, 6.283); ctx!.stroke();
        ctx!.strokeStyle = `rgba(${GOLD},${.12 * ba})`; ctx!.lineWidth = 16;
        ctx!.beginPath(); ctx!.arc(cx, cy, beatFront, 0, 6.283); ctx!.stroke();
        ctx!.lineWidth = 1;
      }

      // pulsos de energía por la retícula
      if (!still) {
        if (t > GROW + .9 && now > spawnAt && pulses.length < 24) { spawn(); spawnAt = now + 150 + rnd() * 220; }
        ctx!.globalCompositeOperation = 'lighter';
        const speed = 300 * scale;
        for (let k = pulses.length - 1; k >= 0; k--) {
          const p = pulses[k];
          const A = nodes[p.path[p.seg]], B = nodes[p.path[p.seg + 1]];
          if (!B) { pulses.splice(k, 1); continue; }
          const len = Math.max(1, Math.hypot(B.x - A.x, B.y - A.y));
          p.t += (speed * dt) / len;
          while (p.t >= 1 && p.path[p.seg + 2] !== undefined) { p.t -= 1; p.seg++; }
          if (p.t >= 1) { if (inward) coreFlash = Math.min(1, coreFlash + .25); pulses.splice(k, 1); continue; }
          const a2 = nodes[p.path[p.seg]], b2 = nodes[p.path[p.seg + 1]];
          const x = a2.x + (b2.x - a2.x) * p.t, y = a2.y + (b2.y - a2.y) * p.t;
          p.trail.push([x, y]); if (p.trail.length > 16) p.trail.shift();
          const fade = inward ? clamp(.35 + (1 - nodes[p.path[p.seg]].d / R) * 1.1) : clamp(1.25 - nodes[p.path[p.seg]].d / R);
          for (let q = 1; q < p.trail.length; q++) {
            ctx!.strokeStyle = `rgba(${GOLD},${(q / p.trail.length) * .8 * fade})`; ctx!.lineWidth = 2;
            ctx!.beginPath(); ctx!.moveTo(p.trail[q - 1][0], p.trail[q - 1][1]); ctx!.lineTo(p.trail[q][0], p.trail[q][1]); ctx!.stroke();
          }
          ctx!.globalAlpha = fade; ctx!.drawImage(glow, x - 21, y - 21, 42, 42); ctx!.globalAlpha = 1;
        }
        ctx!.globalCompositeOperation = 'source-over';
        ctx!.lineWidth = 1;
      }
    }

    function loop(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;
      // calidad adaptable: si el equipo no sostiene ~30 fps, baja la resolución del lienzo una vez
      const gap = now - last;
      if (dprCap > 1 && now - t0 > 2500) { slow = gap > 38 ? slow + 1 : Math.max(0, slow - 1); if (slow > 45) { dprCap = 1; slow = 0; layout(); } }
      frame(now);
      raf = requestAnimationFrame(loop);
    }
    const start = () => { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(loop); } };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true;
    };
    const onLeave = () => { ptr.on = false; };

    layout();
    if (reduce) frame(performance.now(), true);

    const ro = new ResizeObserver(() => { layout(); if (reduce) frame(performance.now(), true); });
    ro.observe(host);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) { if (!began) { began = true; t0 = performance.now(); } start(); } }, { threshold: inward ? .25 : 0 });
    io.observe(host);
    const onVis = () => { if (!document.hidden && began) start(); };
    document.addEventListener('visibilitychange', onVis);
    if (fine && !reduce) { host.addEventListener('pointermove', onMove); host.addEventListener('pointerleave', onLeave); }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
