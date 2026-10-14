import * as THREE from './three.js';
import {buildMagic,buildSoftware} from './shops.js';
import {buildEnvironment,makeRain} from './environment.js';
import {createCat} from './cat.js';

const root=document.getElementById('gateway-experience');
const canvas=document.getElementById('gateway-webgl');
const fallback=document.getElementById('gateway-fallback');
const catSpeech=document.getElementById('gateway-cat-speech');
const touchHint=document.querySelector('.gateway-mobile-tip');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(max-width: 760px)');
const tstart=performance.now();
let renderer,scene,camera,raycaster,cat,shops,lights,weather,doorTargets,clock;
let selected=null,hovered=null,transitionStart=0,travelFrom,travelTo;
let pointer=new THREE.Vector2(99,99),pointerGoal=new THREE.Vector2(0,0),touchX=0,dragStart=null;
let canInteract=true,animationHandle=0,nextClick=0,frame=0;
const title=document.getElementById('gateway-instruction');
const links=[...document.querySelectorAll('[data-world-entrance]')];

function isGateway(){return document.body.dataset.world==='gateway';}
function drawSize(){return {width:root.clientWidth||innerWidth,height:root.clientHeight||innerHeight};}
function updateCameraLayout(){
 const {width,height}=drawSize();const aspect=width/Math.max(1,height);
 renderer.setSize(width,height,false);
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile.matches?1.25:1.65));
 camera.aspect=aspect;camera.fov=mobile.matches?38:30;camera.updateProjectionMatrix();
 // Deliberately narrow FOV and horizontally pannable on mobile; shops never shrink into buttons.
 const desiredZ=mobile.matches?18.6:23.4;
 camera.position.set(touchX,4.7,desiredZ);camera.lookAt(touchX,3.35,-1.4);
 if(touchHint)touchHint.hidden=!mobile.matches;
}
function sceneInit(){
 renderer=new THREE.WebGLRenderer({canvas,antialias:!mobile.matches,alpha:false,powerPreference:'high-performance'});
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.45;
 scene=new THREE.Scene();
 camera=new THREE.PerspectiveCamera(30,1,.1,90);
 buildEnvironment(scene,{mobile:mobile.matches});
 const magic=buildMagic(scene);const software=buildSoftware(scene);
 shops={magic,software};
 cat=createCat(scene);
 weather=makeRain(scene,{count:mobile.matches?115:230});
 // Real room depth is visibly distinct from the frosted hacker workshop.
 raycaster=new THREE.Raycaster();
 doorTargets=[...magic.doorHits,...software.doorHits];
 clock=new THREE.Clock();
 updateCameraLayout();
 window.addEventListener('resize',updateCameraLayout,{passive:true});
 const resizeObserver=new ResizeObserver(updateCameraLayout);resizeObserver.observe(root);
 canvas.classList.add('is-ready');root.classList.add('has-webgl');fallback.hidden=true;
}
function setHover(name){
 if(hovered===name)return;
 hovered=name;root.dataset.hover=name||'';
 canvas.style.cursor=name?'pointer':'default';
 title.textContent=name==='magic'?'ENTER THE MAGIC SHOP  ↗':name==='software'?'ENTER THE SOFTWARE HUB  ↗':'CHOOSE A DOOR  ↗';
}
function castPointer(e){
 if(!canInteract||!isGateway())return null;
 const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return null;
 pointer.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);
 raycaster.setFromCamera(pointer,camera);
 const hits=raycaster.intersectObjects(doorTargets,false);
 return hits[0]?.object.userData.door??null;
}
function pointToNdc(e){
 const r=canvas.getBoundingClientRect();if(!r.width)return;
 pointerGoal.set(((e.clientX-r.left)/r.width-.5)*2,((e.clientY-r.top)/r.height-.5)*2);
}
function setCameraFocus(name,now){
 const shop=shops[name];if(!shop)return;
 selected=name;transitionStart=now;travelFrom=camera.position.clone();
 travelTo=shop.target.clone().add(new THREE.Vector3(0,.23,3.35));
 canInteract=false;root.classList.add('is-travelling');
 title.textContent=name==='magic'?'STEPPING INSIDE MAGIC…':'ENTERING THE HUB…';
 // Navigation is completed by the same built-in hash router used across the site.
 setTimeout(()=>{location.hash=`#/${name}`;root.classList.remove('is-travelling');},reduce.matches?70:950);
}
function pointerMove(e){
 pointToNdc(e);
 if(e.pointerType==='touch'&&dragStart){const dx=e.clientX-dragStart.x;touchX=THREE.MathUtils.clamp(dragStart.base-dx/Math.max(1,root.clientWidth)*7.5,-4.7,4.7);return;}
 if(e.pointerType!=='touch')setHover(castPointer(e));
 // Three.js cat is physically raycastable, not an overlaid image.
 if(e.pointerType!=='touch'&&isGateway()&&canInteract){
   const hits=[];raycaster.setFromCamera(pointer,camera);cat.root.traverse(o=>{if(o.isMesh&&o.visible)hits.push(o);});
   const near=raycaster.intersectObjects(hits,false)[0];
   if(near&&near.distance<33){cat.pet((performance.now()-tstart)/1000);catSpeech.classList.add('visible');clearTimeout(nextClick);nextClick=setTimeout(()=>catSpeech.classList.remove('visible'),1350);}
 }
}
function clickDoor(e){
 if(!isGateway()||!canInteract||dragStart?.moved)return;
 const door=castPointer(e);
 if(door)setCameraFocus(door,performance.now());
}
function bindEvents(){
 canvas.addEventListener('pointermove',pointerMove,{passive:true});
 canvas.addEventListener('pointerleave',()=>{setHover(null);pointerGoal.set(0,0);});
 canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){dragStart={x:e.clientX,base:touchX,moved:false};}});
 canvas.addEventListener('pointerup',e=>{if(e.pointerType==='touch'&&dragStart){dragStart.moved=Math.abs(e.clientX-dragStart.x)>12;const dragged=dragStart.moved;dragStart=null;if(!dragged)clickDoor(e);}});
 canvas.addEventListener('click',e=>{if(e.detail!==0&&e.pointerType==='touch')return;clickDoor(e);});
 links.forEach(link=>{
  const name=link.dataset.worldEntrance;
  link.addEventListener('mouseenter',()=>{if(isGateway())setHover(name);});
  link.addEventListener('mouseleave',()=>{setHover(null);});
  link.addEventListener('click',e=>{if(reduce.matches)return;
    if(!isGateway()||!canInteract)return;
    e.preventDefault();setCameraFocus(name,performance.now());
  });
 });
 window.addEventListener('hashchange',()=>{
   if(location.hash==='#/'||location.hash===''||location.hash==='#'){
     selected=null;canInteract=true;setHover(null);root.classList.remove('is-travelling');touchX=0;updateCameraLayout();
   }
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clock?.stop();else clock?.start()});
}
function ease(t){return t*t*(3-2*t);}
function animateNeon(t){
  const hub=shops.software;
  hub.neonGroups.forEach(({group,light,base,offset},i)=>{
    const disturbance=Math.sin(t*.29+offset)*.03;
    const burst=(Math.sin(t*1.97+offset*3.1)>.984)? .42:0;
    light.intensity=Math.max(.09,base*(1+disturbance-burst));
    group.traverse(o=>{if(o.isMesh&&o.userData.sign)o.material.opacity=.77+Math.sin(t*1.24+offset)*.10-burst*.4;});
  });
  hub.mainLight.intensity=3.10*(1+Math.sin(t*1.33)*.022)-((Math.sin(t*3.11)> .991)? .52:0);
  hub.coffeeLight.intensity=.94*(1+Math.sin(t*.61)*.11);
}
function animateLanterns(t,dt){
 for(let i=0;i<shops.magic.lanterns.length;i++){
   const l=shops.magic.lanterns[i];
   if(t>l.nextGust){l.target=(Math.random()-.5)*.085;l.nextGust=t+4+Math.random()*8;}
   l.velocity+=(l.target-l.group.rotation.z)*Math.min(1,dt*4);l.velocity*=Math.pow(.84,dt*60);
   l.group.rotation.z+=l.velocity*dt*3.2;
   l.group.rotation.x=Math.sin(t*.3+i)*.012;
   l.light.intensity=l.baseIntensity*(1+Math.sin(t*2.4+i*3)*.045);
 }
}
function tick(){
 animationHandle=requestAnimationFrame(tick);
 if(!isGateway()||document.hidden)return;
 const dt=Math.min(clock.getDelta(),.055),t=(performance.now()-tstart)/1000;
 const idle=!reduce.matches;
 if(selected){
   const x=THREE.MathUtils.clamp((performance.now()-transitionStart)/930,0,1);
   camera.position.lerpVectors(travelFrom,travelTo,ease(x));
   camera.lookAt(shops[selected].target);
 }else{
   const z=mobile.matches?18.6:23.4;
   const px=mobile.matches?touchX:(pointerGoal.x*.15+(hovered==='magic'?-.13:hovered==='software'?.13:0));
   const py=pointerGoal.y*.065;
   camera.position.x+=(px-camera.position.x)*Math.min(1,dt*3.3);
   camera.position.y+=(4.7+py-camera.position.y)*Math.min(1,dt*3.3);
   camera.position.z+=(z-camera.position.z)*Math.min(1,dt*3.2);
   camera.lookAt(camera.position.x,3.35,-1.4);
 }
 if(idle){
   animateLanterns(t,dt);animateNeon(t);
   const magicTurn=selected==='magic'?.9:hovered==='magic'?.07:0;
   const softwareTurn=selected==='software'?-1.02:hovered==='software'?-.07:0;
   shops.magic.door.rotation.y+=(magicTurn-shops.magic.door.rotation.y)*Math.min(1,dt*4);
   shops.software.door.rotation.y+=(softwareTurn-shops.software.door.rotation.y)*Math.min(1,dt*4);
   shops.magic.lights.forEach((l,i)=>{l.intensity+=((selected==='magic'?5.3:hovered==='magic'?4.65:4.0)-l.intensity)*Math.min(1,dt*3);});
   for(let i=0;i<shops.magic.candles.length;i++){
     const c=shops.magic.candles[i];c.flame.scale.y=.87+Math.sin(t*11.1+i*4.2)*.17;
     c.light.intensity=.30*(.87+.15*Math.sin(t*7.1+i*2.2));
   }
   cat.update(t,dt,mobile.matches);
   weather.update(dt);
 }
 // Throttle on phones; physics continues to use true elapsed time.
 frame++;
 if(mobile.matches&&frame%2!==0)return;
 renderer.render(scene,camera);
}
function fallbackView(err){
 console.warn('Gateway 3D could not initialize:',err);
 root.classList.add('no-webgl');
 fallback.hidden=false;
 title.textContent='CHOOSE A WORLD';
 // Intentional, readable CSS-only fallback — no broken static scene image.
}
try{
 sceneInit();bindEvents();tick();
}catch(err){fallbackView(err);}