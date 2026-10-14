/* Danny Sofjins — design prototype
 * No frameworks, no backend, no heavy assets. Core UX works without WebGL.
 * Deep links use hash routing so this prototype also works as a local file.
 */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pageMap = Object.fromEntries([...document.querySelectorAll('[data-page]')].map(el => [el.dataset.page, el]));
  const wipe = document.getElementById('wipe');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const pageTitles = {
    gateway: 'Danny Sofjins — Making the Impossible',
    magic: 'Magic & Performances — Danny Sofjins',
    software: 'Software & Projects — Danny Sofjins',
  };
  let active = 'gateway';
  let transitionId = 0;
  const year = document.getElementById('current-year');
  year.textContent = String(new Date().getFullYear());

  function routeInfo() {
    const route = decodeURIComponent(location.hash.replace(/^#\/?/, '').replace(/^\//, ''));
    const parts = route.split('/').filter(Boolean);
    const world = parts[0] === 'magic' || parts[0] === 'software' ? parts[0] : 'gateway';
    return { world, subsection: parts[1] || null };
  }

  function updateMenu(world) {
    for (const link of navLinks) {
      const isCurrent = link.dataset.section === world;
      link.classList.toggle('is-current', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  }

  function scrollToSubsection(route, animate = false) {
    const targetId = route.world === 'magic' && route.subsection === 'school' ? 'magic-school'
      : route.world === 'software' && route.subsection === 'projects' ? 'software-projects'
      : null;
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ block: 'start', behavior: animate && !prefersReducedMotion.matches ? 'smooth' : 'instant' });
    } else window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function showWorld(route, isInitial = false) {
    const world = route.world;
    if (active === world) {
      updateMenu(world);
      if (!isInitial) scrollToSubsection(route, true);
      return;
    }
    const thisTransition = ++transitionId;
    const swap = () => {
      if (thisTransition !== transitionId) return;
      for (const [key, page] of Object.entries(pageMap)) {
        page.hidden = key !== world;
        page.classList.remove('is-current', 'is-revealed');
      }
      const page = pageMap[world];
      page.hidden = false;
      page.classList.add('is-current');
      active = world;
      document.body.dataset.world = world;
      document.title = pageTitles[world];
      updateMenu(world);
      scrollToSubsection(route);
      if (!prefersReducedMotion.matches) {
        page.classList.add('is-revealed');
        window.setTimeout(() => page.classList.remove('is-revealed'), 650);
      }
    };
    if (isInitial || prefersReducedMotion.matches || window.__fromStreetGateway) { window.__fromStreetGateway = false; swap(); return; }
    wipe.classList.remove('is-entering');
    void wipe.offsetWidth; // restart the one-time transition
    wipe.classList.add('is-entering');
    window.setTimeout(swap, 315);
    window.setTimeout(() => {
      if (thisTransition === transitionId) wipe.classList.remove('is-entering');
    }, 710);
  }

  // Route initialized immediately; no visit to the wrong page on direct links.
  showWorld(routeInfo(), true);
  window.addEventListener('hashchange', () => showWorld(routeInfo()));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#/"]');
    if (link && link.getAttribute('href') === location.hash) {
      // Browsers don't fire hashchange for the same hash; keep the CTA useful.
      scrollToSubsection(routeInfo(), true);
    }
  });

  // The two gateway portals have a subtle light that follows the cursor.
  document.querySelectorAll('.world-door').forEach(door => {
    door.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const rect = door.getBoundingClientRect();
      door.style.setProperty('--mx', `${(event.clientX - rect.left) / rect.width * 100}%`);
      door.style.setProperty('--my', `${(event.clientY - rect.top) / rect.height * 100}%`);
    }, { passive: true });
  });

  // A short, deliberate mini-illusion. Real event footage can be added later.
  const illusionModule = document.querySelector('.illusion-module');
  const magicTrigger = document.getElementById('magic-trigger');
  const magicCard = document.getElementById('vanishing-card');
  const magicMessage = document.getElementById('illusion-message');
  const hiddenCard = document.getElementById('magic-hidden-card');
  const returnCard = document.getElementById('return-card');
  let illusionState = 'ready';
  let revealTimer = 0;

  function vanishCard() {
    if (illusionState !== 'ready') return;
    illusionState = 'vanishing';
    illusionModule.classList.add('is-vanished');
    magicTrigger.disabled = true;
    magicMessage.textContent = 'Gone. Or is it?';
    clearTimeout(revealTimer);
    revealTimer = window.setTimeout(() => {
      illusionState = 'hidden';
      hiddenCard.hidden = false;
      magicTrigger.textContent = 'LOOK LEFT. THERE IT IS!';
      magicMessage.textContent = 'Magic is mostly about where you look.';
    }, prefersReducedMotion.matches ? 30 : 620);
  }
  function restoreCard() {
    clearTimeout(revealTimer);
    hiddenCard.hidden = true;
    illusionModule.classList.remove('is-vanished');
    magicTrigger.disabled = false;
    magicTrigger.innerHTML = 'MAKE IT DISAPPEAR <span aria-hidden="true">↗</span>';
    magicMessage.textContent = 'A little something for you.';
    illusionState = 'ready';
  }
  magicCard.addEventListener('click', vanishCard);
  magicTrigger.addEventListener('click', vanishCard);
  returnCard.addEventListener('click', restoreCard);

  // Build the chessboard with a tiny loop instead of fetching decorative images.
  const board = document.getElementById('chess-board');
  for (let i = 0; i < 64; i++) {
    const square = document.createElement('span');
    square.className = 'chess-square';
    board.appendChild(square);
  }

  // Contact is functional without a server: validate fields and open an email draft.
  // This does not claim to have sent an email or stored visitor information.
  const dialog = document.getElementById('contact-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogIntro = document.getElementById('dialog-intro');
  const form = document.getElementById('contact-form');
  const subject = document.getElementById('contact-subject');
  const destination = 'daniils0sofjins@gmail.com';
  const dialogConfig = {
    booking: { title: 'Let’s make<br><em>some wonder.</em>', intro: 'Tell me about your event. This will open a ready-to-send email draft.', subject: 'Magic performance' },
    school: { title: 'Want to learn<br><em>the impossible?</em>', intro: 'Ask me about the magic school. This will open a ready-to-send email draft.', subject: 'Magic school' },
    software: { title: 'Let’s build<br><em>something great.</em>', intro: 'Tell me about your project. This will open a ready-to-send email draft.', subject: 'Software project' },
    general: { title: 'Let’s make<br><em>something happen.</em>', intro: 'Introduce yourself or share an idea. This will open a ready-to-send email draft.', subject: 'Something else entirely' },
  };
  function openDialog(context = 'general') {
    const config = dialogConfig[context] || dialogConfig.general;
    dialogTitle.innerHTML = config.title;
    dialogIntro.textContent = config.intro;
    subject.value = config.subject;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('input[name="name"]').focus();
  }
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => openDialog(button.dataset.contact)));
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const topic = String(data.get('subject')).trim();
    const emailSubject = `Danny Sofjins website — ${topic}`;
    const body = [
      `Name: ${String(data.get('name')).trim()}`,
      `Email: ${String(data.get('email')).trim()}`,
      `Topic: ${topic}`,
      '',
      String(data.get('message')).trim(),
    ].join('\n');
    const url = `mailto:${destination}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  });

  // Progressive Three.js: only a quiet field of particles and a thin rift.
  // CDN failures or unsupported WebGL must never block navigation/content.
  async function initAmbient() {
    if (document.body.dataset.world === 'gateway' || prefersReducedMotion.matches || !('WebGLRenderingContext' in window)) return;
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js');
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = 13;
      const mobile = window.matchMedia('(max-width: 760px)').matches;
      const count = mobile ? 90 : 170;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - .5) * 23;
        positions[i * 3 + 1] = (Math.random() - .5) * 14;
        positions[i * 3 + 2] = (Math.random() - .5) * 10;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xbba7ee, size: mobile ? .048 : .039, transparent: true, opacity: .58, sizeAttenuation: true, depthWrite: false }));
      scene.add(particles);
      const riftGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-.05, -6, 0), new THREE.Vector3(.04, -3.2, 0),
        new THREE.Vector3(-.025, 0, 0), new THREE.Vector3(.07, 3.2, 0),
        new THREE.Vector3(-.06, 6, 0),
      ]);
      const riftLine = new THREE.Line(riftGeometry, new THREE.LineBasicMaterial({ color: 0x9173ba, transparent: true, opacity: .2 }));
      riftLine.visible = !mobile;
      scene.add(riftLine);
      function resize() {
        const width = window.innerWidth, height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });
      let pointerX = 0, pointerY = 0;
      window.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        pointerX = (event.clientX / window.innerWidth - .5) * .24;
        pointerY = (event.clientY / window.innerHeight - .5) * .2;
      }, { passive: true });
      let previous = 0;
      function render(ms) {
        requestAnimationFrame(render);
        if (document.hidden || ms - previous < 1000 / 30) return;
        previous = ms;
        particles.rotation.y += .00019;
        particles.rotation.x += .00007;
        scene.rotation.y += (pointerX - scene.rotation.y) * .014;
        scene.rotation.x += (-pointerY - scene.rotation.x) * .014;
        renderer.render(scene, camera);
      }
      requestAnimationFrame(render);
    } catch (error) {
      // CSS gradients remain visible; WebGL is strictly decorative.
      console.info('Three.js ambience unavailable; using static background.');
    }
  }
  // Gateway has a dedicated lightweight Three.js weather scene.
  // Interior pages retain their CSS atmospheric treatments.
})();