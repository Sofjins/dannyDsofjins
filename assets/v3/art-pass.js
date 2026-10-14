/* Procedural 3D art details for Gateway V3. No baked background image. */
import * as THREE from './three.js';
import {rnd,mat,materials,box,cylinder,sphere,tube,plane,point,sign} from './primitives.js';
function texture(kind,seed=1){
  const c=document.createElement('canvas');c.width=c.height=512;const q=c.getContext('2d');let v=seed>>>0;
  const r=()=>{v=(1664525*v+1013904223)>>>0;return v/4294967296;};
  q.fillStyle=kind==='wood'?'#b7a49a':kind==='stone'?'#bcb7b8':'#aaaebb';q.fillRect(0,0,512,512);
  for(let i=0;i<19000;i++){q.fillStyle=r()>.55?'rgba(255,235,205,.045)':'rgba(12,16,22,.09)';const x=r()*512,y=r()*512,n=.4+r()*2.8;q.fillRect(x,y,n,kind==='wood'?n*2.7:n);}
  if(kind==='wood'){
    for(let i=0;i<110;i++){const x=r()*512;q.beginPath();q.moveTo(x,0);q.bezierCurveTo(x+(r()-.5)*15,120,x+(r()-.5)*13,325,x+(r()-.5)*15,512);q.strokeStyle=r()>.5?'rgba(36,24,19,.11)':'rgba(243,217,178,.10)';q.lineWidth=r()*2.5+.3;q.stroke();}
  }else if(kind==='metal'){
    for(let i=0;i<75;i++){q.beginPath();const x=r()*512,y=r()*512;q.moveTo(x,y);q.lineTo(x+r()*42,y+(r()-.5)*4);q.strokeStyle=r()>.5?'rgba(12,19,27,.15)':'rgba(239,228,221,.12)';q.lineWidth=.4+r()*1.2;q.stroke();}
  }else{
    for(let i=0;i<75;i++){const x=r()*512,y=r()*512;q.beginPath();q.moveTo(x,y);q.lineTo(x+r()*19,y+r()*8);q.strokeStyle='rgba(32,25,27,.16)';q.lineWidth=.5+r();q.stroke();}
  }
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;
}
export function applySurfaceMaterials(){
  const wood=texture('wood',91),metal=texture('metal',31),stone=texture('stone',91);
  wood.repeat.set(1.8,1.8);metal.repeat.set(2.5,2.5);stone.repeat.set(4,4);
  const tint={wood:'#80604c',woodDark:'#4b362e',woodWarm:'#b28058',iron:'#485361',paint:'#4a5162',rust:'#835b52',stone:'#45454b',stone2:'#575157',asphalt:'#42434e'};
  for(const [k,color] of Object.entries(tint)){const m=materials[k];m.color.set(color);m.map=['wood','woodDark','woodWarm'].includes(k)?wood:['iron','paint','rust'].includes(k)?metal:stone;m.needsUpdate=true;}
}
const moss=mat('#243429',.94),lichen=mat('#444735',1),bronze=mat('#8c6244',.75,.29);
function nail(root,x,y,z){const p=cylinder(root,.032,.032,.018,x,y,z,bronze,8);p.rotation.x=Math.PI/2;}
function card(root,x,y,z,s=.32,rot=0){
  const g=new THREE.Group();g.position.set(x,y,z);g.rotation.z=rot;root.add(g);
  box(g,s,s*1.43,.016,0,0,0,mat('#e1caae',.7));
  box(g,s*.81,s*1.26,.023,0,0,.013,mat('#713e32',.88));
  box(g,s*.73,s*1.18,.024,0,0,.027,mat('#bf956e',.8));return g;
}
function wallLamp(root,x,y,z){
  const g=new THREE.Group();g.position.set(x,y,z);root.add(g);
  box(g,.24,.37,.16,0,0,-.01,materials.woodDark);box(g,.09,.43,.08,0,.24,.12,materials.brass);
  box(g,.41,.06,.36,0,.23,.29,materials.iron);
  box(g,.30,.46,.22,0,-.04,.29,new THREE.MeshStandardMaterial({color:'#f2bd74',emissive:'#ff9d46',emissiveIntensity:2.1,roughness:.36,transparent:true,opacity:.87}));
  for(const xx of [-.155,.155])box(g,.023,.49,.23,xx,-.04,.3,materials.brass);
  box(g,.38,.06,.36,0,-.29,.27,materials.iron);return point(g,'#ffb065',2.9,0,-.07,.66,3.6);
}
export function detailMagic(shop){
  const g=shop.group;
  for(let x=-9.65;x<-1;x+=1.15){box(g,.085,.58,.15,x,7.26,.36,materials.woodWarm);box(g,.34,.11,.80,x,7.06,.37,materials.woodDark);nail(g,x,7.13,.83);}
  for(let x=-9.7;x<-.9;x+=.74)box(g,.055,.37,.09,x,6.96,.67,materials.woodWarm);
  const room=new THREE.Group();room.position.set(-7.15,0,-1.28);g.add(room);
  box(room,.15,3.35,2.05,-1.66,2.65,-.92,materials.woodDark);box(room,.15,3.35,2.05,1.65,2.65,-.92,materials.woodDark);
  box(room,3.24,.13,2.13,0,4.40,-1.03,materials.woodDark);
  for(let row=0;row<3;row++){
    const y=1.46+row*.85;box(room,3.05,.055,.50,0,y,-1.34,materials.woodWarm);
    for(let j=0;j<7;j++){
      const x=-1.25+j*.41;
      if((j+row)%3===0){const o=box(room,.20,.27,.19,x,y+.17,-1.23,materials.woodDark);o.rotation.z=rnd(-.08,.06);}
      else if((j+row)%3===1)cylinder(room,.082,.097,.32,x,y+.19,-1.25,mat('#8b5a35',.84),10);
      else card(room,x,y+.18,-1.17,.24,rnd(-.14,.14));
    }
  }
  for(let i=0;i<5;i++)card(room,-.65+i*.20,1.20,-.28,.33,(i-2)*.16);
  box(room,.89,.14,.48,.73,1.21,-.27,materials.woodWarm);
  wallLamp(g,-9.47,3.70,-.43);wallLamp(g,-5.14,3.65,-.45);wallLamp(g,-1.80,4.09,-.37);
  for(let i=0;i<13;i++){const x=-10.04+i*.69;box(g,.025,.85,.085,x,6.18,-.81,i%3?materials.woodWarm:materials.woodDark);}
  for(const [x,y] of [[-9.45,2.4],[-5.26,1.34],[-1.56,3.9]]){
    for(let j=0;j<5;j++)box(g,.12,.10,.04,x+rnd(-.15,.17),y+rnd(-.35,.36),-.54,j%2?moss:lichen);
  }
  for(const x of [-9.02,-5.30]){
    box(g,.14,3.62,.21,x,2.67,-.67,materials.woodWarm);for(const y of [1.35,2.28,3.5])nail(g,x,y,-.51);
  }
  shop.glow.intensity=4.6;shop.lights.forEach(l=>l.intensity=7.5);return shop;
}
function electricBox(g,x,y,z){
  box(g,.54,.83,.24,x,y,z,materials.paint);box(g,.44,.70,.025,x,y,z+.14,materials.iron);
  for(let i=0;i<3;i++)box(g,.3,.021,.014,x,y-.2+i*.17,z+.161,materials.rust);
  nail(g,x-.15,y+.26,z+.175);nail(g,x+.15,y-.26,z+.175);
}
export function detailSoftware(shop){
  const g=shop.group;
  for(let x=.8;x<9.8;x+=.63){box(g,.04,1,.07,x,5.42,-.59,materials.iron);nail(g,x,4.95,-.52);}
  for(const y of [5.68,5.8,5.92])tube(g,[[.85,y,-.34],[3.3,y-.08,-.28],[6.1,y+.06,-.34],[9.8,y-.12,-.31]],.026,materials.black);
  for(const [x,y,z] of [[.67,4.92,-.56],[4.12,5.64,-.47],[9.60,4.89,-.42]])electricBox(g,x,y,z);
  for(let j=0;j<3;j++){const y=7.32-j*.64;for(const x of [7.34,9.9])nail(g,x,y,-.23);box(g,2.63,.027,.15,8.62,y-.33,-.39,materials.iron);}
  for(const x of [4.94,8.2])box(g,.09,3.71,.19,x,2.60,-.40,materials.iron);
  for(let j=0;j<3;j++)box(g,3.5,.022,.055,6.57,1.52+j*.82,-.43,materials.iron);
  for(let i=0;i<5;i++)box(g,.046,.047,.018,3.52,1.33+i*.14,-.21,new THREE.MeshBasicMaterial({color:i%3===0?'#a5edff':'#4f8ca6',toneMapped:false}));
  electricBox(g,9.12,3.12,-.36);
  for(let i=0;i<8;i++){const x=.74+i*1.20;const strip=box(g,.31,.042,.045,x,4.52,-.5,materials.rust);strip.rotation.z=rnd(-.08,.07);}
  shop.mainLight.intensity=4.7;shop.coffeeLight.intensity=1.7;return shop;
}
export function detailStreet(scene){
  const tiles=mat('#2c2a2d',.45,.24),wet=mat('#35343a',.31,.35);
  for(let x=-10.8;x<10.8;x+=1.18){
    const a=box(scene,1.05,.035,.17,x,.08,1.12,tiles);a.rotation.y=rnd(-.015,.015);
    if(rnd()>.6){const p=box(scene,.27,.009,.16,x+rnd(-.3,.3),.1,1.24,wet);p.rotation.y=rnd(-.1,.1);}
  }
  for(let i=0;i<29;i++){
    const x=rnd(-11.1,11.1),z=rnd(1.7,9);
    tube(scene,[[x,.055,z],[x+rnd(.18,.35),.054,z+rnd(.05,.18)],[x+rnd(.38,.52),.054,z+rnd(.04,.3)]],.005,mat('#0c1219',.9));
  }
}