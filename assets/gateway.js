/* Living Street gateway · Three.js atmosphere + accessible HTML hot spots.
 * The original painted storefronts stay crisp. Every moving element is separate.
 * No framework, sound autoplay, expensive postprocessing or simulated physics.
 */
(() => {
  'use strict';
  const viewport = document.getElementById('street-viewport');
  const world = document.getElementById('street-world');
  if (!viewport || !world) return;
  const cat = document.getElementById('street-cat');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isMobile = window.matchMedia('(max-width: 760px)');
  let entering = false;
  const random = (min, max) => min + Math.random() * (max - min);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const active = () => document.body.dataset.world === 'gateway' && !document.hidden && !entering;
  let pan = 0;
  let userPanned = false;
  const worldWidth = () => world.getBoundingClientRect().width / (viewport.classList.contains('is-entering') ? 2.65 : 1);
  const setPan = x => {
    const max = Math.max(0, (worldWidth() - viewport.clientWidth) / 2);
    pan = Math.max(-max, Math.min(max, x));
    world.style.setProperty('--pan-x', `${Math.round(pan)}px`);
  };
  function resetMobileView() {
    if (isMobile.matches && !userPanned) setPan(Math.min(125, (worldWidth() - viewport.clientWidth) * .23));
    else if (!isMobile.matches) setPan(0);
  }
  window.addEventListener('resize', resetMobileView, {passive: true});
  resetMobileView();
  // On phones the stage is a horizontally explorable diorama. Two large
  // bottom navigation links still make both pages reachable instantly.
  let drag = null;
  viewport.addEventListener('pointerdown', event => {
    if (!isMobile.matches || event.target.closest('a,button') || entering) return;
    drag = { id:event.pointerId, x:event.clientX, pan, y:event.clientY, moved:false };
  });
  viewport.addEventListener('pointermove', event => {
    if (drag && event.pointerId === drag.id) {
      if (Math.abs(event.clientX - drag.x) > 9) {
        drag.moved=true;userPanned=true;
        setPan(drag.pan + event.clientX - drag.x);
      }
    } else if (!isMobile.matches && active()) {
      const px=(event.clientX / innerWidth - .5)*12;
      world.style.setProperty('--pan-x',`${px.toFixed(1)}px`);
    }
  },{passive:true});
  viewport.addEventListener('pointerup',() => {drag=null;});
  viewport.addEventListener('pointercancel',() => {drag=null;});
  viewport.addEventListener('pointerleave',() => { if(!isMobile.matches && !entering) setPan(0);});

  // Door zoom starts before the route changes. Existing Magic / Software
  // pages remain in place, and browser Back continues to work normally.
  document.querySelectorAll('[data-street-door]').forEach(link => {
    link.addEventListener('click', event => {
      if (entering || !active()) return;
      const destination=link.dataset.streetDoor;
      if (!['magic','software'].includes(destination)) return;
      event.preventDefault();
      entering=true;
      if (reduceMotion.matches) {
        window.__fromStreetGateway=true;
        location.hash=`#/${destination}`;
        entering=false;
        return;
      }
      viewport.classList.add('is-entering',`is-entering-${destination}`);
      window.setTimeout(() => {
        window.__fromStreetGateway=true;
        location.hash=`#/${destination}`;
        viewport.classList.remove('is-entering',`is-entering-${destination}`);
        entering=false;
      },900);
    });
  });

  // Never sway lanterns constantly. Each gust is isolated, with a long
  // irregular rest in between; pointer hovering causes a delicate movement.
  for (const lamp of document.querySelectorAll('.lantern')) {
    let animation;
    async function gustLoop() {
      while (lamp.isConnected) {
        await delay(random(5600,15500));
        if (!active() || reduceMotion.matches) continue;
        animation=lamp.animate([
          {transform:'rotate(0deg)'},
          {transform:`rotate(${random(1.2,2.0).toFixed(1)}deg)`,offset:.24},
          {transform:'rotate(-1.1deg)',offset:.51},
          {transform:'rotate(.5deg)',offset:.72},
          {transform:'rotate(0deg)'}
        ],{duration:random(3000,4400),easing:'ease-in-out'});
      }
    }
    lamp.addEventListener('pointerenter',()=>{
      if (reduceMotion.matches) return;
      if (animation) animation.cancel();
      animation=lamp.animate([{transform:'rotate(0)'},{transform:'rotate(2.7deg)'},{transform:'rotate(-1deg)'},{transform:'rotate(0)'}],{duration:1300,easing:'ease-in-out'});
    });
    gustLoop();
  }

  // Warm practical light sources flicker independently like separate candles.
  // Neon behaves differently: mostly steady, rare brief electrical flicker.
  const warm=[...document.querySelectorAll('[data-light="candle"]')];
  const neon=[...document.querySelectorAll('[data-light="neon"]')];
  let lastLight=0;
  const lightValues=warm.map(()=>random(.42,.68));
  function candleFrame(t) {
    requestAnimationFrame(candleFrame);
    if (!active() || reduceMotion.matches || t-lastLight < 65) return;
    lastLight=t;
    warm.forEach((node,i)=>{
      lightValues[i] += (random(.35,.77)-lightValues[i])*.38;
      node.style.setProperty('--flicker',lightValues[i].toFixed(3));
    });
    for (const light of neon) {
      if (!light.dataset.dimUntil) light.dataset.dimUntil='0';
      const dim=Number(light.dataset.dimUntil) > t;
      if (!dim && Math.random()<.0025) light.dataset.dimUntil=String(t+random(80,150));
      light.style.setProperty('--flicker',dim ? '.13' : '.55');
    }
  }
  requestAnimationFrame(candleFrame);

  // An optional tiny generated purr only after a user click / touch.
  function playPurr() {
    try {
      const AudioContext=window.AudioContext||window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx=new AudioContext(),osc=ctx.createOscillator(),volume=ctx.createGain(),lfo=ctx.createOscillator(),mod=ctx.createGain();
      osc.type='triangle';osc.frequency.value=57;
      lfo.type='sine';lfo.frequency.value=23;mod.gain.value=9;
      lfo.connect(mod);mod.connect(osc.frequency);osc.connect(volume);volume.connect(ctx.destination);
      const now=ctx.currentTime;
      volume.gain.setValueAtTime(.0001,now);
      volume.gain.exponentialRampToValueAtTime(.018,now+.08);
      volume.gain.exponentialRampToValueAtTime(.0001,now+.46);
      osc.start(now);lfo.start(now);osc.stop(now+.48);lfo.stop(now+.48);
      osc.onended=()=>ctx.close();
    } catch (_) { /* Hover text is the accessible fallback. */ }
  }
  let catPausedUntil=0;
  function petCat() {
    catPausedUntil=Date.now()+4000;
    cat.classList.add('is-purring');
    cat.setAttribute('aria-label','Кот мурлычет');
    window.setTimeout(()=>cat.classList.remove('is-purring'),2200);
  }
  cat.addEventListener('pointerenter',petCat);
  cat.addEventListener('focus',petCat);
  cat.addEventListener('click',()=>{petCat();playPurr();});
  let previousCatX=0;
  const catPos=(x,y=0,seconds=3.2)=>{
    cat.style.setProperty('--cat-x',`${Math.round(x*worldWidth())}px`);
    cat.style.setProperty('--cat-y',`${y}px`);
    cat.style.setProperty('--cat-direction', x<previousCatX ? '-1':'1');
    cat.style.transitionDuration=`${seconds}s`;
    previousCatX=x;
  };
  function catState(name) {
    cat.classList.remove('is-walking','is-sitting','is-licking','is-drinking');
    cat.classList.add('is-'+name);
  }
  // The cat has actual distinct states, but remains autonomous and unobtrusive.
  async function catRoutine(){
    if(reduceMotion.matches) {catState('sitting');return;}
    while(cat.isConnected){
      if (!active() || Date.now()<catPausedUntil) {await delay(900);continue;}
      catState('walking');catPos(-.021,0,3.4);await delay(3500);
      catState('drinking');await delay(random(3300,5100));
      if(!active()) continue;
      catState('licking');await delay(random(2100,3300));
      if(!active())continue;
      catState('walking');catPos(Math.random()<.5?-.033:.062,0,4.2);await delay(4200);
      catState('sitting');await delay(random(4600,7800));
      catState('walking');catPos(0,0,4.1);await delay(4200);
      catState('licking');await delay(random(4500,8000));
    }
  }
  catRoutine();

  // Three.js foreground weather: actual 3D line segments and sparse drifting
  // particulate, depth-scaled and independently parallaxed over the artwork.
  async function createAtmosphere() {
    if (reduceMotion.matches || !window.WebGLRenderingContext) return;
    const canvas=document.getElementById('street-weather');
    try {
      const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js');
      const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});
      renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
      const scene=new THREE.Scene();
      const camera=new THREE.PerspectiveCamera(52,1,.1,60);camera.position.z=13;
      const mobile=isMobile.matches;
      const N=mobile?105:235;
      const vertices=new Float32Array(N*2*3);
      const drops=[];
      for(let i=0;i<N;i++)drops.push({x:random(-12,12),y:random(-7,8),z:random(-4,4),v:random(.045,.115),len:random(.055,.25)});
      const geometry=new THREE.BufferGeometry();
      geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3).setUsage(THREE.DynamicDrawUsage));
      const rain=new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color:0xb6c1e2,transparent:true,opacity:.32,depthWrite:false}));
      scene.add(rain);
      const particlesCount=mobile?45:100;
      const particlesGeo=new THREE.BufferGeometry();
      const points=new Float32Array(particlesCount*3);
      for(let i=0;i<particlesCount;i++){
        points[i*3]=random(-14,14);points[i*3+1]=random(-7,7);points[i*3+2]=random(-7,-1);
      }
      particlesGeo.setAttribute('position',new THREE.BufferAttribute(points,3));
      const haze=new THREE.Points(particlesGeo,new THREE.PointsMaterial({color:0x8c91ce,size:.023,transparent:true,opacity:.29,depthWrite:false}));
      scene.add(haze);
      function resize(){
        const r=canvas.getBoundingClientRect();
        const w=r.width||window.innerWidth,h=r.height||window.innerHeight;
        camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);
      }
      resize();window.addEventListener('resize',resize,{passive:true});
      let prev=0;
      function draw(ms) {
        requestAnimationFrame(draw);
        if(!active() || ms-prev<33) return;
        const delta=Math.min(2.5,(ms-prev)/33||1);prev=ms;
        for(let i=0;i<N;i++){
          const d=drops[i];d.y-=d.v*delta;d.x+=.002*delta;
          if(d.y< -8) {d.y=8;d.x=random(-12,12)}
          const j=i*6;
          vertices[j]=d.x;vertices[j+1]=d.y;vertices[j+2]=d.z;
          vertices[j+3]=d.x+.03;vertices[j+4]=d.y-d.len;vertices[j+5]=d.z;
        }
        geometry.attributes.position.needsUpdate=true;
        haze.rotation.y=Math.sin(ms*.0001)*.045;
        renderer.render(scene,camera);
      }
      requestAnimationFrame(draw);
    }catch(error){console.info('WebGL weather unavailable; the street and links remain usable.');}
  }
  createAtmosphere();
})();