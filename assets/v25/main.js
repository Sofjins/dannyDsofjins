/**
 * Danny Sofjins — Gallery-quality 2.5D Gateway.
 * A continuous Three.js relief mesh samples an artist-approved composition + depth map.
 * Precisely registered emissive masks animate candle/neon light without changing
 * the high-quality architectural artwork. No cheap procedural animal/lantern meshes.
 */
const root = document.getElementById('gateway-experience');
const canvas = document.getElementById('gateway-webgl');
const still = document.getElementById('gateway-still');
const hotspots = document.getElementById('gateway-hotspots');
const tip = document.getElementById('gateway-instruction');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile = window.matchMedia('(max-width: 760px)');
const interactive = [...root.querySelectorAll('[data-gateway-door]')];
const artWidth = 1536, artHeight = 1024, sceneWidth = 15, sceneHeight = 10;
const artAspect = artWidth / artHeight;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const time = () => performance.now();

const state = { pan: 0, panGoal: 0, mx: 0, my: 0, focused: null, opening: null, entered: false,
  enteringStart: 0, last: 0, canRender: true, nextFlicker: 0, flickerEnd: 0, touched: false };
let THREE, renderer, camera, scene, world, baseScale = 1, plane, glowMeshes = {}, rain;
let running = false, resizeObserver;

function active() { return document.body.dataset.world === 'gateway' && !document.hidden; }
function calcLayout(){
  const width = root.clientWidth || innerWidth, height = root.clientHeight || innerHeight;
  // CSS fallback and Three.js geometry share this exact cover rule.
  const coverW = Math.max(width, height * artAspect) * 1.015;
  const coverH = coverW / artAspect;
  const overflow = Math.max(0, (coverW - width) / 2);
  const mobileStartingPosition = mobile.matches ? overflow * .48 : 0;
  if (!state.touched && state.pan === 0 && state.panGoal === 0) {
    state.pan = state.panGoal = mobileStartingPosition;
  }
  hotspots.style.width = `${coverW}px`;
  hotspots.style.height = `${coverH}px`;
  still.style.width = `${coverW}px`;
  still.style.height = `${coverH}px`;
  root.style.setProperty('--cover-width', `${coverW}px`);
  root.style.setProperty('--cover-height', `${coverH}px`);
  root.dataset.pannable = overflow > 18 ? 'true' : 'false';
  const h = 2 * 15 * Math.tan((36 * Math.PI / 180) / 2);
  baseScale = coverH / height * h / sceneHeight;
  if (renderer) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile.matches ? 1.3 : 1.75));
    renderer.setSize(width, height, false);
    if (world) world.scale.setScalar(baseScale);
  }
  return { width, height, coverW, coverH, overflow, baseScale };
}
const dimensions = {current:calcLayout()};
function applyFallback(){
  const {overflow} = dimensions.current;
  state.panGoal = clamp(state.panGoal, -overflow, overflow);
  const px = state.pan;
  still.style.transform = `translate(calc(-50% + ${px}px), -50%)`;
  hotspots.style.transform = `translate(calc(-50% + ${px}px), -50%)`;
}
applyFallback();
function enterWorld(target){
  if(state.entered || !['magic','software'].includes(target))return;
  state.entered=true;state.opening=target;state.enteringStart=time();
  root.dataset.entering = target;
  tip.textContent = target === 'magic' ? 'ENTERING THE MAGIC SHOP' : 'ENTERING THE SOFTWARE HUB';
  if(reduced.matches) { location.hash=`#/${target}`;return; }
  setTimeout(()=>{
    window.__fromStreetGateway=true;
    location.hash=`#/${target}`;
    setTimeout(()=>{state.entered=false; state.opening=null; root.dataset.entering='';},360);
  },850);
}
for (const link of interactive){
  link.addEventListener('click', e => {e.preventDefault(); enterWorld(link.dataset.gatewayDoor);});
  link.addEventListener('pointerenter',()=>{state.focused=link.dataset.gatewayDoor; root.dataset.hover=state.focused;});
  link.addEventListener('pointerleave',()=>{state.focused=null; root.dataset.hover='';});
  link.addEventListener('focus',()=>{state.focused=link.dataset.gatewayDoor;root.dataset.hover=state.focused;});
  link.addEventListener('blur',()=>{state.focused=null;root.dataset.hover='';});
}
const catSpot = document.getElementById('gateway-cat-spot');
if(catSpot){
 catSpot.addEventListener('pointerenter',()=>root.classList.add('cat-purr'));
 catSpot.addEventListener('pointerleave',()=>root.classList.remove('cat-purr'));
 catSpot.addEventListener('click',()=>{
   root.classList.add('cat-purr');
   setTimeout(()=>root.classList.remove('cat-purr'),1700);
 });
}
let startX = null;
root.addEventListener('pointerdown', e => {
  if(!mobile.matches || e.target.closest('a,button'))return;
  startX = {x:e.clientX, pan:state.panGoal};
}, {passive:true});
root.addEventListener('pointermove', e => {
  if(e.pointerType !== 'touch'){
    state.mx = clamp((e.clientX / innerWidth - .5)*2,-1,1);
    state.my = clamp((e.clientY / innerHeight - .5)*2,-1,1);
  }
  if(startX){
    state.touched=true;
    state.panGoal=clamp(startX.pan+e.clientX-startX.x,-dimensions.current.overflow,dimensions.current.overflow);
  }
}, {passive:true});
window.addEventListener('pointerup',()=>{startX=null;});
window.addEventListener('pointercancel',()=>{startX=null;});
window.addEventListener('hashchange',()=>{
  if(location.hash === '#/' || location.hash === '' ){
    root.dataset.entering = '';
    state.entered=false;state.opening=null;
    tip.textContent='CHOOSE A DOOR';
  }
});
function resize(){dimensions.current=calcLayout();applyFallback();}
window.addEventListener('resize',resize,{passive:true});
if('ResizeObserver' in window){resizeObserver=new ResizeObserver(resize);resizeObserver.observe(root);}

function loadImage(url){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=url;});}
async function init(){
  if(reduced.matches || !window.WebGLRenderingContext)return;
  try{
    THREE=await import('https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js');
    const base='assets/v25/';
    const [image,depth,warm,cyan,pink]=await Promise.all([
      loadImage(base+'street-master.webp'), loadImage(base+'depth.png'),
      loadImage(base+'glow-warm.webp'),loadImage(base+'glow-cyan.webp'),loadImage(base+'glow-pink.webp')
    ]);
    if(!root.isConnected)return;
    renderer = new THREE.WebGLRenderer({canvas,antialias:!mobile.matches,alpha:false,powerPreference:'high-performance'});
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.NoToneMapping;
    renderer.setClearColor(0x05070d,1);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(36,innerWidth/innerHeight,.1,100);
    camera.position.set(0,0,15);
    camera.lookAt(0,0,0);
    world=new THREE.Group();scene.add(world);
    const geometry=new THREE.PlaneGeometry(sceneWidth,sceneHeight,144,96);
    // A continuous displacement map gives architecture/threshold/foreground distinct Z depth.
    const dc=document.createElement('canvas');dc.width=depth.width;dc.height=depth.height;
    const ctx=dc.getContext('2d',{willReadFrequently:true});ctx.drawImage(depth,0,0);
    const ds=ctx.getImageData(0,0,dc.width,dc.height).data;
    const attr=geometry.getAttribute('position');const uv=geometry.getAttribute('uv');
    for(let i=0;i<attr.count;i++){
      const x=clamp(Math.round(uv.getX(i)*(depth.width-1)),0,depth.width-1);
      const y=clamp(Math.round((1-uv.getY(i))*(depth.height-1)),0,depth.height-1);
      const v=ds[(y*depth.width+x)*4]/255;
      attr.setZ(i,(v-.31)*.9);
    }
    attr.needsUpdate=true;geometry.computeVertexNormals();
    const makeTexture=(img)=>{
      const t=new THREE.Texture(img);
      t.colorSpace=THREE.SRGBColorSpace;
      t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
      t.needsUpdate=true;
      return t;
    };
    plane=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:makeTexture(image),side:THREE.DoubleSide}));
    world.add(plane);
    for(const [name,img] of [['warm',warm],['cyan',cyan],['pink',pink]]){
      const g=geometry.clone();const ga=g.attributes.position;
      for(let i=0;i<ga.count;i++)ga.setZ(i,ga.getZ(i)+.018);
      ga.needsUpdate=true;
      const mesh=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:makeTexture(img),transparent:true,opacity:.55,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,toneMapped:false}));
      mesh.renderOrder=3;world.add(mesh);glowMeshes[name]=mesh;
    }
    // A handful of 3D drizzle strands rather than artificial large white streaks.
    if(!mobile.matches){
      const count=65,coords=new Float32Array(count*2*3);
      for(let i=0;i<count;i++){
        const x=(Math.random()-.5)*21,y=(Math.random()-.5)*12,z=1+Math.random()*1.3;
        const ix=i*6;coords[ix]=x;coords[ix+1]=y;coords[ix+2]=z;
        coords[ix+3]=x-.055;coords[ix+4]=y-.17;coords[ix+5]=z;
      }
      const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.Float32BufferAttribute(coords,3));
      rain=new THREE.LineSegments(rg,new THREE.LineBasicMaterial({color:0xb1bfd2,transparent:true,opacity:.1,depthWrite:false}));
      scene.add(rain);
    }
    resize();
    canvas.classList.add('is-ready');root.classList.add('has-25d');still.setAttribute('aria-hidden','true');
    const animate=(ms)=>{
      requestAnimationFrame(animate);
      if(!active()||ms-state.last < (mobile.matches?38:26))return;
      const dt=Math.min(.07,(ms-state.last)/1000 || 0);state.last=ms;
      state.pan += (state.panGoal-state.pan)*(1-Math.exp(-dt*9));
      const pxToWorld=(dimensions.current.width>0 ? 2*15*Math.tan(36*Math.PI/360)/dimensions.current.height : 0);
      const microX=mobile.matches?0:state.mx*.065;
      const microY=mobile.matches?0:state.my*.045;
      const totalX = state.pan*pxToWorld + microX;
      let targetX=totalX, targetY=-microY, targetScale=baseScale;
      if(state.opening){
        const f=clamp((ms-state.enteringStart)/820,0,1);
        const k=1-Math.pow(1-f,3);
        const center=state.opening==='magic'?(-.215*sceneWidth):(.17*sceneWidth);
        targetScale=baseScale*(1+1.5*k);
        targetX=totalX-center*targetScale*k;
        targetY=-microY+(.07*sceneHeight)*targetScale*k;
      }
      world.position.set(targetX,targetY,0);
      world.scale.setScalar(targetScale);
      // Distinct irregular warm/cool glow. Old neon may briefly dip rather than flash.
      const t=ms*.001;
      if(glowMeshes.warm)glowMeshes.warm.material.opacity=.43+.12*Math.sin(t*7.9)+.045*Math.sin(t*13.1);
      if(glowMeshes.cyan){
        if(ms > state.nextFlicker){state.nextFlicker=ms+6400+Math.random()*9500;state.flickerEnd=ms+75+Math.random()*150;}
        glowMeshes.cyan.material.opacity=ms<state.flickerEnd?.2:(.54+.065*Math.sin(t*1.7));
      }
      if(glowMeshes.pink)glowMeshes.pink.material.opacity=.65+.11*Math.sin(t*2.3+1);
      if(rain){rain.position.y=-((t*.22)%1.3);}
      renderer.render(scene,camera);
      const screenX=(state.pan + (microX/pxToWorld||0));
      hotspots.style.transform=`translate(calc(-50% + ${screenX}px), -50%)`;
      // Keep the original image precisely registered while WebGL is loading.
    };
    requestAnimationFrame(animate);
  }catch(error){
    console.warn('2.5D enhancement unavailable; using original artwork and accessible door links.',error);
    root.classList.remove('has-25d');
  }
}
init();