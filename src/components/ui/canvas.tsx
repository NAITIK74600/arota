// Canvas animation utility — spiral cursor trails
// @ts-nocheck
function WaveNode(e: Record<string, number>) {
  (this as any).init(e || {});
}
(WaveNode as any).prototype = {
  init(e: Record<string, number>) {
    (this as any).phase = e.phase || 0;
    (this as any).offset = e.offset || 0;
    (this as any).frequency = e.frequency || 0.001;
    (this as any).amplitude = e.amplitude || 1;
  },
  update() {
    (this as any).phase += (this as any).frequency;
    // eslint-disable-next-line no-global-assign
    (globalThis as any).__e = (this as any).offset + Math.sin((this as any).phase) * (this as any).amplitude;
    return (globalThis as any).__e;
  },
  value() { return (globalThis as any).__e; },
};

function TrailLine(e: Record<string, number>) {
  (this as any).init(e || {});
}
(TrailLine as any).prototype = {
  init(e: Record<string, number>) {
    const E = (globalThis as any).__canvasE;
    const pos = (globalThis as any).__canvasPos;
    (this as any).spring = e.spring + 0.1 * Math.random() - 0.05;
    (this as any).friction = E.friction + 0.01 * Math.random() - 0.005;
    (this as any).nodes = [];
    for (let n = 0; n < E.size; n++) {
      const t = new (TrailNode as any)();
      t.x = pos.x; t.y = pos.y;
      (this as any).nodes.push(t);
    }
  },
  update() {
    const E = (globalThis as any).__canvasE;
    const pos = (globalThis as any).__canvasPos;
    let e = (this as any).spring;
    let t = (this as any).nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (let i = 0, a = (this as any).nodes.length; i < a; i++) {
      t = (this as any).nodes[i];
      if (i > 0) {
        const n = (this as any).nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= (this as any).friction; t.vy *= (this as any).friction;
      t.x += t.vx; t.y += t.vy;
      e *= E.tension;
    }
  },
  draw() {
    const ctx = (globalThis as any).__canvasCtx;
    let n = (this as any).nodes[0].x;
    let i = (this as any).nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    let a = 1;
    for (const o = (this as any).nodes.length - 2; a < o; a++) {
      const e = (this as any).nodes[a];
      const t = (this as any).nodes[a + 1];
      n = 0.5 * (e.x + t.x); i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    const e = (this as any).nodes[a];
    const t = (this as any).nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke(); ctx.closePath();
  },
};

function TrailNode(this: any) { this.x = 0; this.y = 0; this.vy = 0; this.vx = 0; }

function onMousemove(e: MouseEvent | TouchEvent) {
  function o() {
    const E = (globalThis as any).__canvasE;
    (globalThis as any).__canvasLines = [];
    for (let i = 0; i < E.trails; i++)
      (globalThis as any).__canvasLines.push(new (TrailLine as any)({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }
  function c(ev: MouseEvent | TouchEvent) {
    const pos = (globalThis as any).__canvasPos;
    if ((ev as TouchEvent).touches) {
      pos.x = (ev as TouchEvent).touches[0].pageX;
      pos.y = (ev as TouchEvent).touches[0].pageY;
    } else {
      pos.x = (ev as MouseEvent).clientX;
      pos.y = (ev as MouseEvent).clientY;
    }
    ev.preventDefault();
  }
  function l(ev: TouchEvent) {
    const pos = (globalThis as any).__canvasPos;
    if (ev.touches.length === 1) { pos.x = ev.touches[0].pageX; pos.y = ev.touches[0].pageY; }
  }
  document.removeEventListener("mousemove", onMousemove as EventListener);
  document.removeEventListener("touchstart", onMousemove as EventListener);
  document.addEventListener("mousemove", c as EventListener);
  document.addEventListener("touchmove", c as EventListener, { passive: false });
  document.addEventListener("touchstart", l as EventListener);
  c(e); o(); animationLoop();
}

function animationLoop() {
  const ctx = (globalThis as any).__canvasCtx;
  const E = (globalThis as any).__canvasE;
  const lines = (globalThis as any).__canvasLines;
  const f = (globalThis as any).__canvasF;
  if (!ctx || !ctx.running) return;
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
  ctx.lineWidth = 10;
  for (let t = 0; t < E.trails; t++) { lines[t].update(); lines[t].draw(); }
  ctx.frame++;
  window.requestAnimationFrame(animationLoop);
}

function resizeCanvas() {
  const ctx = (globalThis as any).__canvasCtx;
  if (!ctx) return;
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

export const renderCanvas = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;
  (globalThis as any).__canvasCtx = ctx;
  (globalThis as any).__canvasPos = {};
  (globalThis as any).__canvasLines = [];
  (globalThis as any).__canvasE = { debug: true, friction: 0.5, trails: 80, size: 50, dampening: 0.025, tension: 0.99 };
  ctx.running = true;
  ctx.frame = 1;
  (globalThis as any).__canvasF = new (WaveNode as any)({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener("mousemove", onMousemove as EventListener);
  document.addEventListener("touchstart", onMousemove as EventListener);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => { if (!ctx.running) { ctx.running = true; animationLoop(); } });
  window.addEventListener("blur", () => { ctx.running = true; });
  resizeCanvas();
};
