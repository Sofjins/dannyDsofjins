import * as THREE from './three.js';
import {rnd,mat,materials,box,tube,cylinder,point,foliage} from './primitives.js';

const stoneColors=['#191b24','#20202a','#24222a','#1c1d26','#25242b','#171a21'];
function puddleTexture(){
  const c=document.createElement('canvas');c.width=256;c.height=512;const q=c.getContext('2d');
  const grd=q.createLinearGradient(0,0,0,c.height);grd.addColorStop(0,'rgba(160,205,249,0)');grd.addColorStop(.24,'rgba(160,205,249,.21)');grd.addColorStop(.49,'rgba(130,169,226,.60)');grd.addColorStop(.59,'rgba(110,140,198,.32)');grd.addColorStop(1,'rgba(110,140,198,0)');
  q.fillStyle=grd;q.fillRect(55,0,146,512);
  const fade=q.createLinearGradient(0,0,256,0);fade.addColorStop(0,'rgba(0,0,0,0)');fade.addColorStop(.44,'rgba(0,0,0,1)');fade.addColorStop(.56,'rgba(0,0,0,1)');fade.addColorStop(1,'rgba(0,0,0,0)');q.globalCompositeOperation='destination-in';q.fillStyle=fade;q.fillRect(0,0,256,512);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function groundLight(scene,x,z,w,h,color,opacity=.6){
 const m=new THREE.MeshBasicMaterial({map:puddleTexture(),color,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,toneMapped:false});
 const p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);p.rotation.x=-Math.PI/2;p.position.set(x,.035,z);scene.add(p);return p;
}
export function buildEnvironment(scene,{mobile=false}={}){
  const darkBack=mat('#080c14',.98);
  scene.background=new THREE.Color('#060910');
  scene.fog=new THREE.FogExp2('#10131d',mobile?.022:.0135);
  // Flat backing walls are *real 3D planes*, not a baked street image.
  box(scene,26,9.5,.35,0,4.2,-4.6,darkBack);
  box(scene,3.4,11.6,3.3,-12.25,4.9,-2.1,mat('#0b0d12'));
  box(scene,3.4,11.6,3.3,12.25,4.9,-1.7,mat('#0a0e17'));
  const street=mat('#23242d',.43,.36);
  box(scene,27,.12,15,0,-.12,5.6,street);
  // Uneven individual physical cobbles: subtle randomized variation, no image tiles.
  const count=mobile?420:770;
  const inst=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),mat('#999999',.43,.32),count);
  const proxy=new THREE.Object3D();const color=new THREE.Color();
  for(let i=0;i<count;i++){
    const row=Math.floor(i/35),col=i%35;
    const x=-13.2+(col+(row%2)*.48)*.78+rnd(-.035,.035);
    const z=-.0+row*.66+rnd(-.025,.025);
    const y=-.002+rnd(-.012,.007);
    proxy.position.set(x,y,z);proxy.rotation.set(0,rnd(-.012,.012),0);
    proxy.scale.set(.75*rnd(.9,1.0),.04*rnd(.75,1.05),.63*rnd(.88,1));proxy.updateMatrix();inst.setMatrixAt(i,proxy.matrix);
    color.set(stoneColors[i%stoneColors.length]).multiplyScalar(rnd(.78,1.3));inst.setColorAt(i,color);
  }
  inst.instanceMatrix.needsUpdate=true;inst.receiveShadow=true;scene.add(inst);
  // Real raised sidewalk and curb, with a narrow center gutter.
  box(scene,22,.14,1.25,0,.015,.25,mat('#2a282e',.69,.17));
  box(scene,22,.14,.16,0,-.02,1.12,mat('#444049',.57,.26));
  for(const x of [-9.4,-6.2,-3.2,-.25,2.45,5.38,8.56]){
   box(scene,.04,.16,1.22,x,.022,.25,mat('#10121b',1));
  }
  // Drain grating physically modelled.
  box(scene,1.28,.045,.47,.42,.018,3.28,materials.iron);
  for(let i=0;i<10;i++)box(scene,.026,.05,.40,-.10+i*.13,.052,3.28,mat('#565360',.6,.4));
  for(let i=0;i<3;i++){
    const y=2.5+i*2.2;
    tube(scene,[[-11.8,y,-.6],[-10.7,y+.1,-.2],[-9.7,y,.12]],.032,materials.iron);
    tube(scene,[[10.8,y,-1],[11.1,y-.15,-.3],[11.8,y-.1,-.25]],.035,materials.iron);
  }
  // Worn steel edge posts guide the eye and reinforce foreground perspective.
  for(const x of [-11.95,12.2]){
    cylinder(scene,.13,.15,1.45,x,.66,5.85,mat('#16151a',.8,.42),12);
    cylinder(scene,.20,.20,.09,x,1.40,5.85,materials.iron,12);
  }
  // Sparse foreground depth objects.
  foliage(scene,-11.6,.02,1.6,.85);foliage(scene,11.45,.02,1.1,.77);
  groundLight(scene,-5.6,4.8,3.9,9,'#bb592c',.85);
  groundLight(scene,4.4,4.6,4.3,10,'#2266b7',.86);
  groundLight(scene,8.1,4.2,2.8,8,'#882373',.56);
  // Warm amber and cold electric light reach the pavement rather than existing as screen glow overlays.
  const hemi=new THREE.HemisphereLight('#a1aec3','#635044',3.5);scene.add(hemi);
  const moon=new THREE.DirectionalLight('#d6dae4',1.9);moon.position.set(-4,11,9);scene.add(moon);
  const fill=point(scene,'#398dd9',2.35,5.2,5.2,4.6,12.0);
  const amber=point(scene,'#ffad5c',4.1,-6.1,4.5,2.5,11);
  return {hemi,moon,fill,amber};
}

export function makeRain(scene,{count=200}={}){
  const geo=new THREE.BufferGeometry();const pos=new Float32Array(count*6);const velocity=new Float32Array(count);
  const start=()=>{for(let i=0;i<count;i++){
    const x=rnd(-12,12),y=rnd(.1,9.7),z=rnd(1.1,10);
    const j=i*6;pos[j]=x;pos[j+1]=y;pos[j+2]=z;pos[j+3]=x-.065;pos[j+4]=y-.24;pos[j+5]=z;
    velocity[i]=rnd(3.5,6.5);
  }};start();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const obj=new THREE.LineSegments(geo,new THREE.LineBasicMaterial({color:'#9ec4ee',transparent:true,opacity:.15,depthWrite:false}));scene.add(obj);
  return {update(dt){let a=geo.attributes.position.array;for(let i=0;i<count;i++){
    const n=i*6;let y=a[n+1]-velocity[i]*dt;
    if(y<.08)y=9.5+rnd(0,1.5);
    a[n+1]=y;a[n+4]=y-.24;
  }geo.attributes.position.needsUpdate=true;}};
}
