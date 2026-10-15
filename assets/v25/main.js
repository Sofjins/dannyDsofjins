/** Reference-locked gateway. Architecture is a rigid four-vertex plane, never displaced.
 * Scene coordinates are the approved artwork's pixels (1536 x 1024).
 * This module enhances the existing static application; no server/build change required.
 */
const root = document.getElementById('gateway-experience');
if (root) boot(root);

function boot(root) {
  const W = 1536, H = 1024;
  const VERSION = 'living-street-2';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  // Measured inside the actual openings, excluding lanterns, curtain and masonry.
  const doors = Object.freeze({
    magic: { x: 300, y: 452, w: 296, h: 283, label: 'Magic Shop' },
    software: { x: 901, y: 363, w: 152, h: 374, label: 'Software Hub' },
  });
  const state = { mode: 'reference', view: 'full', renderer: 'loading', hover: null,
    magic: 0, software: 0, frame: 0, last: 0, entering: null, timer: 0,
    disposed: false, width: 0, height: 0, reason: null };
  let THREE, renderer, scene, camera, material, plane, raycaster, living, catTarget;
  let elapsed = 0, testTime = null;
  const pickMeshes = [];
  const resources = [];
  const listeners = [];
  const uniforms = {
    uClock: { value: 0 }, uLive: { value: 0 }, uMagic: { value: 0 }, uSoftware: { value: 0 },
  };
  const on = (el, event, fn, opts) => {
    el.addEventListener(event, fn, opts);
    listeners.push(() => el.removeEventListener(event, fn, opts));
  };
  const el = (tag, className) => { const node = document.createElement(tag); node.className = className; return node; };
  const still = root.querySelector('#gateway-still');
  const canvas = root.querySelector('#gateway-webgl');
  if (!still || !canvas) return;
  still.removeAttribute('aria-hidden');
  still.style.cssText = '';
  canvas.className = '';
  canvas.style.cssText = '';
  const stage = el('div', 'reference-stage');
  const art = el('div', 'reference-art');
  art.id = 'reference-art';
  const hotspots = el('div', 'gateway-hotspots');
  hotspots.setAttribute('aria-label', 'Enter a shop');
  for (const [id, d] of Object.entries(doors)) {
    const a = el('a', `gateway-door gateway-door--${id}`);
    a.href = `#/${id}`;
    a.dataset.gatewayDoor = id;
    a.setAttribute('aria-label', `Enter ${d.label}`);
    Object.assign(a.style, { left: `${d.x / W * 100}%`, top: `${d.y / H * 100}%`,
      width: `${d.w / W * 100}%`, height: `${d.h / H * 100}%` });
    hotspots.append(a);
  }
  const curtain = el('div', 'reference-transition');
  curtain.setAttribute('aria-hidden', 'true');
  art.append(still, canvas, hotspots);
  stage.append(art, curtain);
  const heading = el('h1', 'reference-mobile-heading');
  heading.innerHTML = 'Find your doorway.<span>Magic and software. Same curious mind.</span>';
  const views = el('div', 'reference-views');
  views.setAttribute('role', 'group'); views.setAttribute('aria-label', 'Street framing');
  views.innerHTML = '<button type="button" data-view="full" aria-pressed="true">Full street</button><button type="button" data-view="magic" aria-pressed="false">Magic view</button><button type="button" data-view="software" aria-pressed="false">Software view</button>';
  const controls = el('div', 'reference-controls');
  const note = el('p', 'reference-note');
  note.textContent = 'Two worlds. One curious mind.';
  const links = el('nav', 'gateway-world-links');
  links.setAttribute('aria-label', 'Shop destinations');
  links.innerHTML = '<a href="#/magic" data-gateway-door="magic">Magic Shop <span aria-hidden="true">↗</span></a><a href="#/software" data-gateway-door="software">Software Hub <span aria-hidden="true">↗</span></a>';
  const lighting = el('div', 'reference-light');
  lighting.setAttribute('role', 'group'); lighting.setAttribute('aria-label', 'Pause or play the living street');
  lighting.innerHTML = '<button type="button" data-mode="reference" aria-pressed="true">Original</button><button type="button" data-mode="live" aria-pressed="false" disabled>Live scene</button>';
  controls.append(note, links, lighting);
  const status = el('p', 'reference-instruction');
  status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  root.replaceChildren(heading, stage, views, controls, status);
  root.className = 'gateway-experience is-reference-repair';
  root.dataset.view = 'full'; root.dataset.mode = 'reference'; root.dataset.version = VERSION;
  root.dataset.renderer = 'loading';
  const isActive = () => document.body.dataset.world === 'gateway' && !document.hidden;

  function layout() {
    if (state.disposed) return;
    const sw = stage.clientWidth, sh = stage.clientHeight;
    if (!sw || !sh) return;
    let scale = Math.min(sw / W, sh / H, 1);
    let cx = W / 2, cy = H / 2;
    if (mobile.matches && state.view !== 'full') {
      // An explicit close view, never an automatic crop of the initial composition.
      scale = Math.min(Math.max(sw / 740, sh / 960), 1);
      cx = state.view === 'magic' ? 390 : 1140; cy = 485;
    }
    const aw = W * scale, ah = H * scale;
    art.style.width = `${aw}px`; art.style.height = `${ah}px`;
    art.style.left = `${sw / 2 + (W / 2 - cx) * scale}px`;
    art.style.top = `${sh / 2 + (H / 2 - cy) * scale}px`;
    if (renderer && (Math.abs(aw - state.width) > .1 || Math.abs(ah - state.height) > .1)) {
      const dpr = Math.min(devicePixelRatio || 1, 2, Math.sqrt(5000000 / Math.max(aw * ah, 1)));
      renderer.setPixelRatio(dpr);
      renderer.setSize(aw, ah, false);
    }
    state.width = aw; state.height = ah;
    schedule();
  }
  function setView(view) {
    if (!['full', 'magic', 'software'].includes(view)) return;
    state.view = mobile.matches ? view : 'full';
    root.dataset.view = state.view;
    for (const b of views.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.view === state.view));
    layout();
  }
  function setMode(mode) {
    state.mode = mode === 'live' && renderer && state.renderer === 'webgl' && !reduced.matches ? 'live' : 'reference';
    root.dataset.mode = state.mode;
    for (const b of lighting.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode));
    uniforms.uLive.value = state.mode === 'live' ? 1 : 0;
    living?.enable(state.mode === 'live');
    state.last = 0;
    if (state.mode === 'reference') {
      state.magic = state.software = 0;
      uniforms.uMagic.value = uniforms.uSoftware.value = 0;
    }
    schedule();
  }
  function focusDoor(id) {
    state.hover = id;
    status.textContent = id ? `Enter ${doors[id].label}` : '';
    schedule();
  }
  function resetEntry() {
    clearTimeout(state.timer); state.timer = 0; state.entering = null;
    delete root.dataset.entering;
  }
  function enter(id) {
    if (!doors[id] || state.entering || state.disposed) return;
    state.entering = id;
    const doorway = doors[id];
    art.style.transformOrigin = `${(doorway.x + doorway.w / 2) / W * 100}% ${(doorway.y + doorway.h / 2) / H * 100}%`;
    root.dataset.entering = id;
    const finish = () => {
      window.__fromStreetGateway = true;
      location.hash = `#/${id}`;
      const title = document.querySelector(`#${id}-title`);
      setTimeout(() => {
        resetEntry();
        if (title && document.body.dataset.world === id) {
          title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true });
        }
      }, 80);
    };
    if (reduced.matches) finish(); else state.timer = setTimeout(finish, 760);
  }
  for (const a of root.querySelectorAll('[data-gateway-door]')) {
    const id = a.dataset.gatewayDoor;
    on(a, 'click', e => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault(); enter(id);
    });
    on(a, 'pointerenter', () => focusDoor(id));
    on(a, 'pointerleave', () => focusDoor(null));
    on(a, 'focus', () => focusDoor(id));
    on(a, 'blur', () => focusDoor(null));
  }
  for (const b of views.querySelectorAll('button')) on(b, 'click', () => setView(b.dataset.view));
  for (const b of lighting.querySelectorAll('button')) on(b, 'click', () => setMode(b.dataset.mode));
  on(window, 'resize', () => { if (!mobile.matches) setView('full'); layout(); }, { passive: true });
  on(window, 'hashchange', () => { resetEntry(); focusDoor(null); setTimeout(layout, 350); });
  on(document, 'visibilitychange', () => {
    if (!isActive()) { cancelAnimationFrame(state.frame); state.frame = 0; state.last = 0; } else schedule();
  });
  on(reduced, 'change', () => {
    lighting.querySelector('[data-mode="live"]').disabled = reduced.matches || state.renderer !== 'webgl';
    if (reduced.matches) setMode('reference'); else schedule();
  });
  const observer = new ResizeObserver(layout); observer.observe(stage);
  layout();

  function schedule() {
    if (!renderer || state.renderer !== 'webgl' || !isActive() || state.frame || state.disposed) return;
    state.frame = requestAnimationFrame(draw);
  }
  function draw(ms) {
    state.frame = 0;
    if (!isActive() || state.disposed || state.renderer !== 'webgl') { state.last = 0; return; }
    const dt = Math.min(.08, (ms - (state.last || ms - 16)) / 1000); state.last = ms;
    const live = state.mode === 'live';
    if (live && testTime === null) elapsed += dt;
    const clock = testTime === null ? elapsed : testTime;
    living?.update(clock);
    if (catTarget) {
      const pose = living.catPose();
      catTarget.hidden = !live || !pose;
      if (pose) {
        catTarget.style.left = `${(pose.x - 76) / W * 100}%`;
        catTarget.style.top = `${(pose.screenY - 99) / H * 100}%`;
        catTarget.dataset.greeting = String(pose.greeting > .1);
      }
    }
    const targetMagic = live && state.hover === 'magic' ? 1 : 0;
    const targetSoftware = live && state.hover === 'software' ? 1 : 0;
    const k = 1 - Math.exp(-dt * 12);
    state.magic += (targetMagic - state.magic) * k;
    state.software += (targetSoftware - state.software) * k;
    uniforms.uClock.value = clock;
    uniforms.uMagic.value = state.magic; uniforms.uSoftware.value = state.software;
    renderer.render(scene, camera);
    if (live || Math.abs(state.magic - targetMagic) + Math.abs(state.software - targetSoftware) > .001) schedule();
  }
  function raycastAt(clientX, clientY) {
    if (!raycaster) return null;
    const r = art.getBoundingClientRect();
    const p = new THREE.Vector2((clientX - r.left) / r.width * 2 - 1, 1 - (clientY - r.top) / r.height * 2);
    raycaster.setFromCamera(p, camera);
    return raycaster.intersectObjects(pickMeshes, false)[0]?.object.userData.door || null;
  }
  on(stage, 'pointermove', e => {
    if (state.renderer !== 'webgl' || e.pointerType === 'touch') return;
    const id = raycastAt(e.clientX, e.clientY);
    if (id !== state.hover) focusDoor(id);
  }, { passive: true });
  on(stage, 'pointerleave', () => focusDoor(null));

  function fallback(reason) {
    state.renderer = 'image'; state.reason = reason; root.dataset.renderer = 'image';
    cancelAnimationFrame(state.frame); state.frame = 0;
    setMode('reference');
    const button = lighting.querySelector('[data-mode="live"]');
    button.disabled = true;
    button.title = 'Live light requires WebGL 2. The original artwork and both doors remain available.';
  }
  on(canvas, 'webglcontextlost', e => { e.preventDefault(); fallback('context-lost'); });
  // This repair intentionally keeps the image fallback until a complete GL frame succeeds.
  async function init() {
    let gl;
    try {
      gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' });
      if (!gl) { fallback('webgl-unavailable'); return; }
      THREE = await import('./three-vendor.js');
      await still.decode();
      if (state.disposed) return;
      renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: false, alpha: false });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.setClearColor(0x080b0e, 1);
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(0, W, H, 0, .1, 2500);
      camera.position.set(0, 0, 1200);
      camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
      const texture = new THREE.Texture(still);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = false;
      texture.minFilter = texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      resources.push(texture);
      material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
      material.onBeforeCompile = shader => {
        Object.assign(shader.uniforms, uniforms);
        shader.fragmentShader = `
          uniform float uClock, uLive, uMagic, uSoftware;
          float lightMask(vec2 p, vec2 c, vec2 r) {
            return 1.0 - smoothstep(0.15, 1.0, length((p-c)/r));
          }
        ` + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
          #include <map_fragment>
          vec2 px = vec2(vMapUv.x * 1536.0, (1.0-vMapUv.y) * 1024.0);
          float warm = clamp((diffuseColor.r - diffuseColor.b) * 6.0, 0.0, 1.0);
          float cool = clamp(max(diffuseColor.b, diffuseColor.g) * 6.0 - diffuseColor.r, 0.0, 1.0);
          float flicker = 0.0;
          flicker += lightMask(px,vec2(354.0,552.0),vec2(12.0,23.0)) * sin(uClock*7.1) * .032;
          flicker += lightMask(px,vec2(475.0,563.0),vec2(15.0,29.0)) * sin(uClock*5.3+1.8) * .04;
          flicker += lightMask(px,vec2(370.0,462.0),vec2(12.0,20.0)) * sin(uClock*6.6+3.2) * .03;
          flicker += lightMask(px,vec2(582.0,457.0),vec2(13.0,23.0)) * sin(uClock*8.3+2.3) * .03;
          flicker += lightMask(px,vec2(158.0,307.0),vec2(43.0,66.0)) * sin(uClock*1.5+1.0) * .012;
          flicker += lightMask(px,vec2(670.0,301.0),vec2(41.0,66.0)) * sin(uClock*1.7+2.0) * .012;
          float neon = lightMask(px,vec2(1100.0,238.0),vec2(94.0,29.0)) * sin(uClock*2.3) * .01;
          // Brief, independent, downward-only ageing in specific sign segments.
          float dipA = 1.0-smoothstep(.035,.095,abs(mod(uClock+1.5,13.7)-6.1));
          float dipB = 1.0-smoothstep(.025,.065,abs(mod(uClock+4.1,19.3)-8.2));
          neon -= lightMask(px,vec2(1344.0,212.0),vec2(75.0,20.0)) * dipA * .48;
          neon -= lightMask(px,vec2(1274.0,623.0),vec2(38.0,49.0)) * dipB * .30;
          neon -= lightMask(px,vec2(1166.0,234.0),vec2(41.0,22.0)) * (1.0-smoothstep(.025,.09,abs(mod(uClock+2.0,17.3)-7.5))) * .30;
          float hubDip = 1.0-smoothstep(.025,.09,abs(mod(uClock+2.0,17.3)-7.5));
          neon -= lightMask(px,vec2(1115.0,893.0),vec2(126.0,112.0)) * hubDip * .15;
          neon -= lightMask(px,vec2(1280.0,875.0),vec2(88.0,96.0)) * dipB * .12;
          flicker += lightMask(px,vec2(410.0,858.0),vec2(163.0,99.0)) * sin(uClock*5.3+1.8) * .018;
          float gain = uLive * (warm*flicker + cool*neon);
          gain += uMagic * lightMask(px,vec2(448.0,603.0),vec2(131.0,124.0)) * .09;
          gain += uSoftware * lightMask(px,vec2(984.0,550.0),vec2(65.0,171.0)) * .07;
          diffuseColor.rgb *= exp2(gain);
        `);
      };
      const geometry = new THREE.PlaneGeometry(W, H, 1, 1);
      plane = new THREE.Mesh(geometry, material);
      plane.position.set(W / 2, H / 2, 0); scene.add(plane);
      resources.push(geometry, material);
      raycaster = new THREE.Raycaster();
      for (const [id, d] of Object.entries(doors)) {
        const g = new THREE.PlaneGeometry(d.w, d.h);
        const m = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.set(d.x + d.w/2, H-d.y-d.h/2, .05);
        mesh.userData.door = id; scene.add(mesh); pickMeshes.push(mesh); resources.push(g, m);
      }
      scene.updateMatrixWorld(true);
      let shaderFailure = false;
      renderer.debug.onShaderError = (gl, program, vertex, fragment) => {
        shaderFailure = [gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertex), gl.getShaderInfoLog(fragment)].filter(Boolean).join(' | ') || 'Unknown shader error';
      };
      const cleanPlate = new Image();
      cleanPlate.src = new URL('./street-clean.webp', import.meta.url).href;
      await cleanPlate.decode();
      if (state.disposed) return;
      const { createLivingScene } = await import('./living-scene.js?v=living-street-2');
      living = createLivingScene({ THREE, scene, image: still, material, originalTexture: texture, cleanPlate });
      catTarget = el('button', 'living-cat-target');
      catTarget.type = 'button';
      catTarget.setAttribute('aria-label', 'Say hello to the street cat');
      catTarget.innerHTML = '<span aria-hidden="true">mrrp.</span>';
      catTarget.hidden = true;
      hotspots.append(catTarget);
      on(catTarget, 'click', () => { if (state.mode === 'live') { living.greet(); schedule(); } });
      for (const spec of living.prepared.lanterns) {
        const b = el('button', 'living-lantern-target');
        b.type = 'button'; b.dataset.lantern = spec.id;
        b.setAttribute('aria-label', `Gently sway the ${spec.id} lantern`);
        const [x,y,w,h] = spec.rect;
        Object.assign(b.style, { left: `${x/W*100}%`, top: `${y/H*100}%`, width: `${w/W*100}%`, height: `${h/H*100}%` });
        hotspots.append(b);
        const nudge = () => { if (state.mode === 'live') { living.react(spec.id); schedule(); } };
        on(b, 'pointerenter', nudge); on(b, 'focus', nudge); on(b, 'click', nudge);
      }
      state.width = state.height = 0; layout();
      renderer.render(scene, camera);
      if (shaderFailure) throw new Error(`Gateway shader compilation failed: ${shaderFailure}`);
      state.renderer = 'webgl'; root.dataset.renderer = 'webgl';
      lighting.querySelector('[data-mode="live"]').disabled = reduced.matches;
      // Visitors get the living street automatically; explicit Still and reduced motion remain.
      setMode(reduced.matches ? 'reference' : 'live');
      renderer.render(scene,camera);
      if (shaderFailure) throw new Error(`Living scene compilation failed: ${shaderFailure}`);
      schedule();
    } catch (error) {
      fallback(error?.message || 'renderer-unavailable');
    }
  }
  function dispose() {
    state.disposed = true; clearTimeout(state.timer); cancelAnimationFrame(state.frame);
    observer.disconnect(); listeners.forEach(off => off());
    living?.dispose();
    resources.forEach(resource => resource.dispose()); renderer?.dispose();
  }
  // Read-only diagnostics plus explicit controls for repeatable browser regression tests.
  window.__gatewayTest = Object.freeze({
    version: VERSION, setMode, setView, raycastAt,
    seek: seconds => { testTime = Number.isFinite(seconds) ? Math.max(0,seconds) : null; schedule(); },
    nudgeLantern: id => { living?.react(id); schedule(); },
    greetCat: () => { living?.greet(); schedule(); },
    snapshot: () => ({ renderer: state.renderer, reason: state.reason, mode: state.mode,
      motion: living?.snapshot() || null, view: state.view, camera: camera?.type || null,
      vertices: plane?.geometry.attributes.position.count || 0,
      maxDepth: plane ? Math.max(...Array.from(plane.geometry.attributes.position.array).filter((_,i)=>i%3===2)) : null,
      art: { width: art.getBoundingClientRect().width, height: art.getBoundingClientRect().height },
      source: { width: still.naturalWidth, height: still.naturalHeight }, doors }),
    dispose,
  });
  init();
}
