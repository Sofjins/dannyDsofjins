/** Gateway V3 / art pass 2.
 * Additional standalone world-space meshes: no static illustration, sprites, or screen overlays.
 * Detail density is controlled for low-end phones; no dynamic shadow maps needed.
 */
import * as THREE from './three.js';
import {rnd, mat, materials, box, cylinder, sphere, tube, plane, sign, point} from './primitives.js';

const bronze=mat('#aa764b',.45,.58),blackMetal=mat('#161c29',.61,.72),agedGold=mat('#815e38',.64,.46);
const wine=mat('#64342f',.94),ink=mat('#0d1018',.91),oldPaper=mat('#bb9679',.88);
const plaster=mat('#40343b',.89),softGold=mat('#b59c70',.67,.24);
const neonWarm=new THREE.MeshBasicMaterial({color:'#ffba81',toneMapped:false});
const neonBlue=new THREE.MeshBasicMaterial({color:'#57c9fa',toneMapped:false});
const neonPink=new THREE.MeshBasicMaterial({color:'#f19bfa',toneMapped:false});

function fastInstance(parent,geometry,material,transforms){
  const m=new THREE.InstancedMesh(geometry,material,transforms.length);m.castShadow=false;m.receiveShadow=true;
  const t=new THREE.Object3D();transforms.forEach((p,i)=>{
    t.position.set(...p.position);t.rotation.set(...(p.rotation||[0,0,0]));t.scale.set(...(p.scale||[1,1,1]));t.updateMatrix();m.setMatrixAt(i,t.matrix);
  });m.instanceMatrix.needsUpdate=true;parent.add(m);return m;
}
function ornamentNails(root,x0,x1,y,z,n=15){
  const g=new THREE.SphereGeometry(.031,6,4),arr=[];
  for(let i=0;i<n;i++)arr.push({position:[x0+(x1-x0)*i/(n-1),y,z],scale:[1,.9,.5]});
  fastInstance(root,g,bronze,arr);
}
function roofGeometry(root){
  // Overlapping curved fired-clay roof tiles, physically projecting past the wooden eaves.
  const profiles=[]; const rowCount=4,colCount=37;const startX=-10.36;
  for(let row=0;row<rowCount;row++)for(let col=0;col<colCount;col++){
    const x=startX+col*.282+(row%2)*.14,z= -.11-row*.38;
    profiles.push({position:[x,7.91+row*.025,z],rotation:[Math.PI/2+.07,0,0],scale:[1,.95,1]});
  }
  const geo=new THREE.CylinderGeometry(.175,.177,.38,10,1,true,0,Math.PI);
  const roof=mat('#39353a',.87,.04);
  fastInstance(root,geo,roof,profiles);
  // Ridge end caps and raised dark wooden beams cast readable silhouettes.
  for(let x=-10.25;x<-.15;x+=.74){
    box(root,.14,.47,1.35,x,7.46,.70,materials.woodDark);
    box(root,.10,.09,.69,x,7.20,.92,materials.woodWarm);
  }
  tube(root,[[-10.46,7.96,.73],[-7.94,7.95,.74],[-5.31,7.95,.73],[-2.6,7.95,.74],[-.10,7.95,.73]],.057,blackMetal);
}
function paperText(root,word,x,y,z,w,h,color='#38211b'){
  return sign(root,word,x,y,z,w,h,{font:'Georgia',size:138,color,bold:false});
}
function upgradeLantern(l,i){
  const g=l.group;
  // Replace geometric cylinder by an asymmetric rounded rice-paper profile.
  const rounded=[];
  for(let k=0;k<=20;k++){
    const y=-.35+k*.035;
    const r=.165+.135*Math.pow(Math.max(0,1-Math.pow(y/.37,2)),.62);
    rounded.push(new THREE.Vector2(r,y));
  }
  const body=g.children.find(o=>o.isMesh&&o.geometry?.type==='CylinderGeometry'&&o.geometry.parameters.height>.69&&o.geometry.parameters.height<.72);
  if(body){body.geometry.dispose();body.geometry=new THREE.LatheGeometry(rounded,18);body.material=mat('#df7547',.77,0,{emissive:'#c35827',emissiveIntensity:.74,side:THREE.DoubleSide});}
  for(let j=0;j<7;j++){
    const yy=-.295+j*.1;
    const radius=.165+.135*Math.pow(Math.max(0,1-Math.pow(yy/.37,2)),.62);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,.008,4,26),agedGold);
    ring.rotation.x=Math.PI/2;ring.position.y=yy;g.add(ring);
  }
  cylinder(g,.105,.13,.075,0,-.43,0,materials.woodDark,14);
  sphere(g,.05,0,-.51,0,bronze,8);
  tube(g,[[0,-.5,0],[.018,-.61,.006],[.03,-.72,0]],.012,oldPaper);
  // Woven dark side seams turn the lantern into a small 3D crafted object.
  for(const a of [.5,2.4,4.3]){
    const x=Math.sin(a)*.285,z=Math.cos(a)*.285;
    tube(g,[[x*.62,-.33,z*.62],[x,0,z],[x*.62,.33,z*.62]],.008,agedGold);
  }
  g.rotation.y=i===0?-.07:.08;
}
function shopLighting(root){
  // Lantern-style practical wall lamps: actual physical lamps and small local sources.
  for(const [x,y,z] of [[-9.45,4.42,-.29],[-5.22,4.56,-.27],[-1.90,4.44,-.27]]){
    const group=new THREE.Group();group.position.set(x,y,z);root.add(group);
    box(group,.34,.49,.13,0,0,0,materials.iron);
    cylinder(group,.20,.17,.05,0,.30,.18,agedGold,8);
    const glass=new THREE.MeshStandardMaterial({color:'#ffd4a4',roughness:.38,metalness:0,emissive:'#ff9d54',emissiveIntensity:1.6,transparent:true,opacity:.87});
    const lamp=box(group,.25,.46,.22,0,0,.21,glass);
    for(const dx of [-.13,.13])box(group,.022,.53,.25,dx,0,.19,agedGold);
    point(group,'#ffb66a',1.4,0,0,.50,3.2);
  }
}
function woodenStall(root){
  // Weathered showcase depth: dark framing, amber interior and readable card-shop silhouettes.
  for(let i=0;i<7;i++){
    const x=-8.64+i*.49;
    box(root,.048,3.8,.23,x,2.66,-.68,materials.woodWarm);
  }
  // Subtle top lintel moulding and feet below the frame.
  for(const y of [4.54,4.38,1.12,.89])box(root,3.95,.09,.37,-7.21,y,-.45,y===.89?materials.woodDark:materials.woodWarm);
  // Object silhouettes at various depths are visible through glazing.
  const bookColors=[materials.woodDark,agedGold,wine];
  for(let j=0;j<8;j++){
    const x=-8.39+j*.34;
    const bk=box(root,.19,.20+rnd(0,.28),.22,x,1.49,-2.13,bookColors[j%3]);bk.rotation.z=rnd(-.12,.08);
  }
  for(let i=0;i<5;i++){
    const x=-7.95+i*.38;
    box(root,.19,.31,.035,x,1.23,-.86,oldPaper).rotation.z=(i-2)*-.09;
    paperText(root,i%2?'♠':'♥',x,1.23,-.834,.12,.18,i%2?'#201f21':'#79392e');
  }
  // Softly illuminated shelf cavities and actual wooden inner panels.
  for(const [x,y,z] of [[-8.45,3.25,-2.15],[-6.16,3.28,-2.12],[-7.09,2.25,-2.17]]){
    const edge=box(root,.30,.38,.24,x,y,z,materials.woodDark);
    edge.rotation.z=rnd(-.12,.12);
  }
  point(root,'#ff9d52',4.2,-7.22,2.76,-1.18,4.8);
  point(root,'#ffbb77',2.0,-6.86,1.72,-.45,3.4);
}
function noren(root){
  // Separate 3D cloth pieces, with folds folded into geometry (not a printed overlay).
  const folds=11;
  for(let p=0;p<4;p++){
    const w=.85,h=.88,x=-8.41+p*.81;
    const geo=new THREE.PlaneGeometry(w,h,folds,5),v=geo.attributes.position;
    for(let i=0;i<v.count;i++){
      const xx=v.getX(i),yy=v.getY(i);
      v.setZ(i,Math.sin((xx/w+.5)*Math.PI*4)*.04*Math.pow(.6-yy/h,.8));
    }
    geo.computeVertexNormals();
    const cloth=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:p%2?'#57302b':'#62362f',roughness:1,side:THREE.DoubleSide}));
    cloth.position.set(x,5.01,-.49);root.add(cloth);
    // woven seam near bottom
    box(root,.78,.020,.02,x,4.60,-.43,agedGold);
  }
  tube(root,[[-8.92,5.5,-.44],[-6.07,5.5,-.44]],.024,materials.brass);
}
function microMoss(root){
  const moss=mat('#354637',1),l=mat('#495044',1);
  const arr=[];
  for(let i=0;i<72;i++){
    const x=rnd(-10.12,-.43),y=rnd(.35,7.0),z=rnd(-1.08,-.84);
    if(x>-8.98&&x<-5.2&&y<4.55)continue;
    if(x>-4.50&&x<-2.12&&y<4.25)continue;
    arr.push({position:[x,y,z],scale:[rnd(.5,2),rnd(.4,1.8),.3]});
  }
  fastInstance(root,new THREE.SphereGeometry(.034,5,4),moss,arr);
}
function hubPanels(root){
  // Faceted metal frames and an older hacker basement atmosphere.
  for(let i=0;i<10;i++){
    const x=.55+i*1.015;
    box(root,.060,6.95,.16,x,4.20,-.77,i%3?blackMetal:materials.rust);
    for(const yy of [1.15,4.75,7.1])box(root,.105,.055,.21,x,yy,-.68,materials.iron);
  }
  for(const yy of [5.03,5.20,5.38]){
    tube(root,[[.56,yy,-.34],[3.3,yy+.08,-.25],[6.8,yy-.06,-.20],[9.72,yy+.04,-.33]],.045,yy===5.2?blackMetal:materials.iron);
  }
  // Louvered ventilation grilles that look industrial from a distance.
  for(const [x,y,z] of [[.85,6.14,-.40],[9.35,5.18,-.37],[.85,1.83,-.52]]){
    box(root,.90,.74,.17,x,y,z,materials.black);
    for(let i=0;i<6;i++){
      const slat=box(root,.76,.045,.075,x,y-.27+i*.11,z+.13,materials.iron);slat.rotation.x=.12;
    }
    ornamentNails(root,x-.37,x+.37,y+.33,z+.145,3);
  }
  // A vertical neon service strip and a chunky analog keypad next to the door.
  const service=new THREE.Group();service.position.set(3.56,2.65,-.34);root.add(service);
  box(service,.28,2.76,.16,0,0,0,blackMetal);
  const strip=box(service,.044,2.47,.05,0,0,.10,neonBlue);
  const emitter=point(service,'#42c9fc',1.25,0,0,.28,3.3);
  box(root,.30,.65,.18,3.55,1.2,-.26,materials.paint);
  for(let i=0;i<9;i++)sphere(root,.032,3.46+(i%3)*.084,1.37-Math.floor(i/3)*.11,-.137,mat('#96a5a9',.4,.46),6);
  return {strip,emitter};
}
function neonLetterline(root){
  // Physically modelled luminous tubing around the sign panel, segmented and aged.
  const lt=neonBlue;
  const signFrame=[[-.02,7.12,-.37],[8.14,7.12,-.37],[8.14,6.00,-.37],[-.02,6.00,-.37]];
  // Main cyan outline should be faint enough that Software Hub remains the headline.
  tube(root,[[-.03,6.01,-.33],[8.08,6.01,-.33]],.023,neonBlue);
  tube(root,[[.21,7.11,-.33],[3.20,7.11,-.33]],.018,neonBlue);
  for(let i=0;i<4;i++){
    const x=7.42+i*.55;
    box(root,.035,.30,.05,x,5.60,-.28,i===2?neonPink:neonBlue);
  }
}
function rainyDetails(scene,{mobile=false}={}){
  // Small raised, irregular puddle glints: geometry lies flat on the street,
  // influenced by the practical shop-light positions. No fake static reflections.
  const count=mobile?62:142;
  const gold=new THREE.MeshBasicMaterial({color:'#c17b46',transparent:true,opacity:.19,depthWrite:false,side:THREE.DoubleSide});
  const blue=new THREE.MeshBasicMaterial({color:'#408bcb',transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide});
  const mag=new THREE.MeshBasicMaterial({color:'#a349a1',transparent:true,opacity:.13,depthWrite:false,side:THREE.DoubleSide});
  const poolGeo=new THREE.PlaneGeometry(1,1);
  for(const [range,mt,n] of [[[-10,-1],gold,Math.floor(count*.42)],[[.5,7.5],blue,Math.floor(count*.40)],[[7.5,10.2],mag,Math.floor(count*.18)]]){
    const transforms=[];
    for(let i=0;i<n;i++){
      const x=rnd(range[0],range[1]),z=rnd(1.45,11);
      const near=z<4?.07:rnd(.12,.32);
      transforms.push({position:[x,.06+rnd(0,.007),z],rotation:[-Math.PI/2,0,rnd(-.14,.14)],scale:[rnd(.11,.42),rnd(.36,1.34),1]});
    }
    fastInstance(scene,poolGeo,mt,transforms);
  }
  // Rows of embedded drainage and surface metalwork.
  box(scene,1.15,.043,.38,2.18,.046,2.78,materials.iron);
  for(let j=0;j<10;j++)box(scene,.034,.032,.34,1.70+j*.105,.074,2.78,agedGold);
  for(const x of [-10.4,-.45,10.2]){
    cylinder(scene,.10,.15,1.18,x,.52,1.28,blackMetal,12);
    cylinder(scene,.15,.15,.10,x,1.14,1.28,materials.iron,12);
  }
}
export function detailPassTwo(scene,shops,{mobile=false}={}){
  const magic=shops.magic,software=shops.software;
  roofGeometry(magic.group);
  magic.lanterns.forEach((l,i)=>upgradeLantern(l,i));
  woodenStall(magic.group);
  noren(magic.group);
  shopLighting(magic.group);
  microMoss(magic.group);
  ornamentNails(magic.group,-9.8,-1.05,6.17,-.71,22);
  hubPanels(software.group);
  neonLetterline(software.group);
  rainyDetails(scene,{mobile});
  return {neonMaterials:[neonWarm,neonBlue,neonPink]};
}