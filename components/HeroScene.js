'use client';

import { useEffect, useRef, useState } from 'react';

/** Floating 3D flower petals + gold dust behind the hero (Three.js).
 *  - prefers-reduced-motion  -> nothing moves
 *  - low-end phone / no WebGL -> light CSS petals instead
 *  Three.js is loaded lazily so it never blocks the first paint. */
export default function HeroScene() {
  const canvas = useRef(null);
  const [mode, setMode] = useState('pending'); // pending | webgl | css | none

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMode('none');
      return;
    }
    const lowEnd =
      (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
    if (lowEnd) {
      setMode('css');
      return;
    }

    let dispose;
    let cancelled = false;
    import('three')
      .then((THREE) => {
        if (cancelled) return;
        dispose = startScene(THREE, canvas.current);
        setMode('webgl');
      })
      .catch(() => setMode('css'));

    return () => {
      cancelled = true;
      if (dispose) dispose();
    };
  }, []);

  return (
    <div className="hero-scene" aria-hidden="true">
      <canvas ref={canvas} />
      {mode === 'css' && (
        <div className="css-petals">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ '--i': i }} />
          ))}
        </div>
      )}
    </div>
  );
}

function startScene(THREE, canvas) {
  const wrap = canvas.parentElement;
  const small = window.innerWidth < 700;
  const rand = (a, b) => a + Math.random() * (b - a);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !small, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.z = 10;
  const bounds = { x: 8, y: 8 };

  /* ---- Petals: one instanced mesh, so it is a single draw call ---- */
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.24, 0.1, 0.27, 0.42, 0, 0.62);
  shape.bezierCurveTo(-0.27, 0.42, -0.24, 0.1, 0, 0);
  const petalGeo = new THREE.ShapeGeometry(shape, 6);
  petalGeo.translate(0, -0.31, 0);
  const pos = petalGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, pos.getX(i) ** 2 * 1.6); // gentle curl
  const petalMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.92 });

  const COUNT = small ? 40 : 95;
  const petals = new THREE.InstancedMesh(petalGeo, petalMat, COUNT);
  const palette = ['#e58a9b', '#c9364f', '#f59e1b', '#ffc145', '#f7d9c4', '#b3122f'].map((c) => new THREE.Color(c));
  const spawn = (anywhere) => ({
    x: rand(-bounds.x, bounds.x),
    y: anywhere ? rand(-bounds.y, bounds.y) : bounds.y + rand(0, 2),
    z: rand(-7, 3),
    fall: rand(0.35, 1.1),
    sway: rand(0.3, 1.1),
    phase: rand(0, Math.PI * 2),
    rx: rand(0, 6), ry: rand(0, 6), rz: rand(0, 6),
    vx: rand(-0.9, 0.9), vy: rand(-0.9, 0.9), vz: rand(-0.6, 0.6),
    s: rand(0.45, 1.1),
  });
  const data = Array.from({ length: COUNT }, (_, i) => {
    petals.setColorAt(i, palette[i % palette.length]);
    return spawn(true);
  });
  scene.add(petals);

  /* ---- Gold dust ---- */
  const DUST = small ? 110 : 260;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = rand(-14, 14);
    dustPos[i * 3 + 1] = rand(-9, 9);
    dustPos[i * 3 + 2] = rand(-9, 4);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dot = document.createElement('canvas');
  dot.width = dot.height = 64;
  const ctx = dot.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,240,190,1)');
  grad.addColorStop(0.35, 'rgba(243,217,139,.7)');
  grad.addColorStop(1, 'rgba(243,217,139,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const dustTex = new THREE.CanvasTexture(dot);
  const dustMat = new THREE.PointsMaterial({
    map: dustTex, size: 0.16, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  /* ---- Sizing, pointer parallax, visibility ---- */
  const resize = () => {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    bounds.x = Math.max(4, 9.5 * camera.aspect);
  };
  resize();
  window.addEventListener('resize', resize);

  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(wrap);

  /* ---- Render loop (paused when the hero is off screen) ---- */
  const dummy = new THREE.Object3D();
  let raf;
  let last = performance.now();
  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!visible || document.hidden) return;
    const time = now / 1000;

    for (let i = 0; i < COUNT; i++) {
      const p = data[i];
      p.y -= p.fall * dt;
      p.rx += p.vx * dt;
      p.ry += p.vy * dt;
      p.rz += p.vz * dt;
      if (p.y < -bounds.y - 1) Object.assign(p, spawn(false));
      dummy.position.set(p.x + Math.sin(time * 0.6 + p.phase) * p.sway, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      petals.setMatrixAt(i, dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;

    dust.rotation.y = time * 0.015;
    dust.position.y = Math.sin(time * 0.25) * 0.4;
    dustMat.opacity = 0.65 + Math.sin(time * 1.3) * 0.2;

    // Slow, camera-like drift toward the pointer.
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.7 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointer);
    petalGeo.dispose();
    petalMat.dispose();
    dustGeo.dispose();
    dustMat.dispose();
    dustTex.dispose();
    renderer.dispose();
  };
}
