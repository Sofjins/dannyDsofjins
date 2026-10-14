import * as THREE from './three.js';
import {rnd,mat,materials,box,sphere,cylinder,tube,plane,point,sign,poster,trimFrame,lightPanel,foliage,randomBricks} from './primitives.js';

const warm=mat('#ffa24d',.55,0,{emissive:'#ff842f',emissiveIntensity:.45});
const golden=mat('#bd7e42',.5,.35,{emissive:'#592c13',emissiveIntensity:.12});
const cyan=mat('#6cbbdb',.34,.25,{emissive:'#149ccc',emissiveIntensity:1.3});
const magenta=mat('#d4a0d7',.4,.14,{emissive:'#a81c94',emissiveIntensity:1.15});
const glass=new THREE.MeshPhysicalMaterial({color:'#182432',roughness:.82,metalness:.08,transmission:.025,transparent:true,opacity:.95,side:THREE.DoubleSide});
const ink=mat('#0e141c',.78,.25);
const tar=mat('#110f16',.94,.22);

function groovedWall(group,x,y,z,w,h,base,slatColor,vertical=true){
  box(group,w,h,.33,x,y,z,base);
  if(vertical){
    for(let i=0;i<Math.floor(w/.35);i++){
      const px=x-w/2+.22+i*.35;box(group,.035,h,.07,px,y,z+.2,slatColor);
    }
  }else{
    for(let i=0;i<Math.floor(h/.33);i++){
      const py=y-h/2+i*.33;box(group,w,.035,.08,x,py,z+.21,slatColor);
    }
  }
}
function frame(group,x,y,z,w,h,b=.18,m=materials.woodWarm){
  box(group,w,b,.28,x,y+h/2,z,m);box(group,w,b,.28,x,y-h/2,z,m);
  box(group,b,h,.28,x-w/2,y,z,m);box(group,b,h,.28,x+w/2,y,z,m);
}
function candle(root,x,y,z,scale=.1){
  const g=new THREE.Group();g.position.set(x,y,z);root.add(g);
  cylinder(g,.075*scale/.1,.079*scale/.1,.23*scale/.1,0,0,0,mat('#e2bf80',.84),10);
  const flame=new THREE.Mesh(new THREE.ConeGeometry(.044*scale/.1,.16*scale/.1,10),new THREE.MeshBasicMaterial({color:'#ffbd61',toneMapped:false}));flame.position.y=.195*scale/.1;g.add(flame);
  const l=point(g,'#ff923d',.30,0,.24*scale/.1,.05,2.6);return {flame,light:l};
}
function neonText(parent,text,x,y,z,w,h,color='#73d8ff',size=60){
  const tint=color==='#ff86db'?magenta:cyan;
  box(parent,w+.19,h+.12,.08,x,y,z-.08,tar);
  // Text mapped onto a true 3D surface; emissive local neon tubing surrounds it.
  const plate=sign(parent,text,x,y,z+.03,w,h,{color,font:'Arial',size,bold:false,glow:true});
  tube(parent,[[x-w/2,y-h/2,z+.055],[x+w/2,y-h/2,z+.055]],.017,tint);
  tube(parent,[[x-w/2,y+h/2,z+.055],[x+w/2,y+h/2,z+.055]],.017,tint);
  return plate;
}
function lantern(parent,x,y,z,character){
  const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);
  tube(parent,[[x,y+.85,z],[x,y+.30,z]],.011,materials.iron);
  const shade=mat('#d16e3d',.83,0,{emissive:'#df622b',emissiveIntensity:.72,side:THREE.DoubleSide});
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.26,.28,.71,16,1,false),shade);g.add(body);
  for(let j=0;j<6;j++){
    const a=(j/6)*Math.PI*2;
    tube(g,[[Math.sin(a)*.28,-.31,Math.cos(a)*.28],[Math.sin(a)*.29,0,Math.cos(a)*.29],[Math.sin(a)*.27,.31,Math.cos(a)*.27]],.012,materials.brass);
  }
  for(const yy of [-.33,.34])cylinder(g,.292,.292,.035,0,yy,0,materials.woodDark,18);
  sign(g,character,0,0,.285,.37,.48,{color:'#24120c',font:'Georgia',size:150,bold:true});
  const light=point(g,'#ff7335',2.0,0,0,.32,5.3);
  return {group:g,light,baseIntensity:light.intensity,velocity:0,target:0,nextGust:rnd(2,7),phase:rnd(0,5)};
}
function woodenRoof(parent,x,width,z,y){
  box(parent,width+.2,.45,2.3,x,y,z,materials.woodDark);
  for(let i=0;i<Math.round(width/.37);i++){
    const px=x-width/2+i*.37+.15;
    const tile=cylinder(parent,.19,.19,2.25,px,y+.20,z,mat(i%4===0?'#29242a':'#333139',.93),10);
    tile.rotation.x=Math.PI/2;
  }
  box(parent,width+.4,.1,.4,x,y-.20,z+1.03,materials.woodWarm);
}
function shelf(parent,x,y,z,w){
  box(parent,w,.10,.40,x,y,z,materials.woodWarm);
  for(let i=0;i<Math.floor(w/.48);i++){
    const a=x-w/2+.2+i*.47;
    const obj=Math.floor(rnd(0,3));
    if(obj===0)cylinder(parent,.08,.09,rnd(.21,.5),a,y+.20,z,mat('#79502e'),10);
    if(obj===1)box(parent,.17,rnd(.20,.45),.16,a,y+.20,z,mat('#5f4a3a'));
    if(obj===2){const b=box(parent,.24,.32,.17,a,y+.21,z,materials.woodDark);b.rotation.z=rnd(-.14,.16);}
  }
}
function trimWood(parent,x,y,z,w,h){for(let i=0;i<5;i++)box(parent,w,.035,.06,x,y-h/2+(i+.5)*h/5,z+.1,materials.woodWarm);}
function streetSign(parent,words,x,y,z,w,h,{wood=false,color='#f3e1bf',size=68}={}){
  box(parent,w,h,.16,x,y,z,wood?materials.woodDark:materials.iron);
  if(wood)frame(parent,x,y,z+.10,w,h,.07,materials.brass);
  sign(parent,words,x,y,z+.13,w*.94,h*.70,{color,font:wood?'Georgia':'Arial',size,bold:false,glow:!wood});
}
function makeDoorHit(group,name,x,y,z,w,h){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,.10),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,colorWrite:false,side:THREE.DoubleSide}));
  mesh.position.set(x,y,z);mesh.userData.door=name;group.add(mesh);return mesh;
}

export function buildMagic(scene){
  const g=new THREE.Group();scene.add(g);
  const windowLight=[];const candles=[];const lanterns=[];
  // Asymmetric aged Japanese-fantasy merchant architecture, kept to one visible storey.
  groovedWall(g,-5.30,4.15,-4.32,10.40,8.48,materials.wood,materials.woodDark);
  // Foreground structural cladding stops at the window; the window truly looks into 3D space.
  box(g,1.18,5.18,.36,-9.84,2.63,-1.68,materials.wood);
  box(g,1.62,5.18,.36,-5.15,2.63,-1.68,materials.wood);
  box(g,1.55,5.18,.36,-1.08,2.63,-1.68,materials.wood);
  box(g,10.38,2.26,.35,-5.27,6.47,-1.72,materials.wood);
  randomBricks(g,-10.38,-.43,6.35,8.20,-1.62,materials.woodWarm,.55,.17);
  for(const x of [-10.23,-.42])box(g,.40,8.10,.56,x,4.05,-1.38,materials.woodDark);
  for(const y of [5.2,7.78])box(g,10.45,.30,.43,-5.34,y,-1.39,materials.woodWarm);
  woodenRoof(g,-5.32,10.23,-1.29,7.78);
  // Main wooden shop sign, under the eaves.
  streetSign(g,'Magic Shop',-5.78,6.70,-.97,5.5,.88,{wood:true,size:126});
  // Left showcase: physical room and shelves behind glass.
  // Leave the showcase open so visitors can see real shelves and candlelight.
  box(g,3.66,.15,.30,-7.22,4.50,-1.55,materials.woodDark);
  box(g,3.66,.16,.30,-7.22,.83,-1.55,materials.woodDark);
  const room=new THREE.Group();room.position.set(-7.15,0,-1.28);g.add(room);
  box(room,3.10,3.2,.10,0,2.65,-2.1,materials.woodDark);
  shelf(room,-.08,1.55,-1.85,2.7);shelf(room,.04,2.5,-1.86,2.65);shelf(room,-.02,3.48,-1.85,2.55);
  box(room,2.8,.19,.60,0,1.04,-.70,materials.woodWarm);
  const c1=candle(room,-.97,1.3,-.51),c2=candle(room,.57,1.30,-.57,.09),c3=candle(room,1.06,2.63,-1.72,.074);
  candles.push(c1,c2,c3);
  // Glass panes read as depth without obscuring the interior.
  plane(g,3.2,3.10,-7.18,2.67,-.82,new THREE.MeshPhysicalMaterial({color:'#bea37c',transparent:true,opacity:.085,metalness:.14,roughness:.30,side:THREE.DoubleSide,depthWrite:false}));
  frame(g,-7.2,2.68,-.76,3.6,3.60,.13,materials.woodWarm);
  box(g,.11,3.56,.12,-7.2,2.68,-.61,materials.brass);
  box(g,3.49,.11,.10,-7.2,2.68,-.60,materials.brass);
  // Norèn cloth, individually hanging panels in 3D above the showcase.
  for(let i=0;i<4;i++){
    const d=box(g,.77,1.02,.035,-8.39+i*.78,4.92,-.55,materials.cloth);d.rotation.z=rnd(-.045,.045);
  }
  sign(g,'幻',-7.2,4.96,-.49,.60,.72,{color:'#b6906d',size:140,bold:true});
  // Distinct entrance to the right, recessed, with warm interior volume.
  const doorX=-3.18;
  box(g,2.36,4.05,.15,doorX,2.43,-1.48,materials.woodDark);
  lightPanel(g,2.09,3.65,doorX,2.45,-1.35,'#542709',.95);
  box(g,1.94,3.52,.12,doorX,2.46,-1.17,new THREE.MeshStandardMaterial({color:'#453022',roughness:.63,emissive:'#4b230f',emissiveIntensity:.34}));
  const door=new THREE.Group();door.position.set(doorX-1.05,0,-.81);g.add(door);
  box(door,1.78,3.45,.18,.89,2.10,0,materials.woodWarm);
  for(const yy of [1.10,3.1]){
    box(door,1.39,.07,.19,.88,yy,.10,materials.brass);
  }
  for(let i=0;i<2;i++){
    box(door,1.28,1.03,.06,.89,2.24+i*.82,.14,materials.woodDark);
    plane(door,1.16,.88,.89,2.24+i*.82,.184,new THREE.MeshPhysicalMaterial({color:'#96664a',metalness:.08,roughness:.25,transparent:true,opacity:.3}));
  }
  sphere(door,.065,1.53,2.00,.20,materials.brass,10);
  frame(g,doorX,2.43,-.56,2.42,4.05,.19,materials.woodDark);
  box(g,2.38,.26,.76,doorX,.35,-.25,materials.woodWarm);
  box(g,2.85,.12,.90,doorX,.18,.11,materials.stone2);
  const light=point(g,'#f6a04f',4.0,doorX,3.30,-.45,5.7);windowLight.push(light);
  // Chinese/Japanese influenced paper lanterns with believable mass and sway.
  lanterns.push(lantern(g,-9.15,5.31,.38,'術'));
  lanterns.push(lantern(g,-.72,4.96,.33,'夢'));
  poster(g,-9.23,3.10,-.9,.64,1.85,['TRICKS','CARDS'].join('\n'));
  // Sidewalk objects. No tarot sphere.
  const board=box(g,1.3,1.84,.10,-9.10,1.13,.89,materials.woodDark);board.rotation.y=.07;
  sign(g,['TRICKS','CARDS','CURIOSITIES'],-9.10,1.32,1.00,1.18,1.36,{color:'#a87c55',font:'Georgia',size:53});
  for(const [x,z,s] of [[-8.55,.55,.8],[-.92,.50,.74],[-5.17,1.08,.72]])foliage(g,x,.1,z,s);
  box(g,.75,.60,.74,-8.12,.34,.61,materials.woodDark);
  box(g,.53,.35,.60,-8.02,.8,.69,materials.woodWarm);
  // Lantern light casts onto actual wood and cobbles.
  const glow=point(g,'#ff6c34',3.0,-7.1,4.12,.4,7.0);
  return {group:g,doorHits:[makeDoorHit(g,'magic',doorX,2.30,.32,2.12,4.02)],door,target:new THREE.Vector3(doorX,2.30,-1.45),lanterns,candles,lights:windowLight,glow};
}

export function buildSoftware(scene){
  const g=new THREE.Group();scene.add(g);
  // Closer-to-street industrial hacker workshop rather than a futuristic office.
  groovedWall(g,5.27,4.17,-1.9,10.35,8.48,materials.paint,materials.iron,false);
  box(g,10.1,.28,.48,5.20,7.95,-1.26,materials.iron);
  for(const x of [.40,3.33,7.2,10.08])box(g,.23,8.01,.44,x,4.10,-1.27,materials.iron);
  // Uneven metal cladding and occasional corrosion patches.
  for(let i=0;i<61;i++){
    const x=rnd(.65,9.75),y=rnd(.5,7.8);
    const p=box(g,rnd(.08,.42),rnd(.025,.13),.02,x,y,-1.05,i%3?materials.rust:materials.iron);
    p.rotation.z=rnd(-.04,.04);
  }
  // Main neon sign, distinct 3D light box with dark border.
  box(g,6.7,1.17,.28,4.30,6.57,-.78,materials.black);
  box(g,6.52,.94,.10,4.30,6.57,-.57,mat('#111c2c',.44,.25,{emissive:'#083047',emissiveIntensity:.3}));
  sign(g,'Software Hub',4.30,6.58,-.47,6.36,.81,{color:'#7fdcff',font:'Arial',size:111,glow:true});
  // Vertical code activity light strip / aged three-tier neon.
  const neonGroups=[];
  const labels=[['◌   Canoodling','#85bbff'],['⌥   git commit','#e5a1ff'],['⇧   git push','#9ffbf5']];
  labels.forEach(([txt,color],i)=>{
    const sub=new THREE.Group();g.add(sub);sub.position.z=-.60;
    const y=7.33-i*.64;
    box(sub,2.47,.55,.21,8.61,y,0,materials.black);
    sign(sub,txt,8.61,y,.16,2.28,.42,{color,font:'monospace',size:51,glow:true});
    const light=point(sub,i===1?'#9d3fff':'#18adfa',.6,8.6,y,.66,2.9);
    neonGroups.push({group:sub,light,base:.67,offset:i*5.9});
  });
  const mainLight=point(g,'#22abef',3.1,4.38,6.32,.15,8.5);
  const neonAccent=point(g,'#ad32ff',1.5,8.15,5.38,0,6.0);
  // Old industrial door with a weighted metal frame, and subtle hidden cold rim.
  const doorX=2.15;
  box(g,2.41,4.14,.19,doorX,2.45,-1.05,materials.black);
  const door=new THREE.Group();door.position.set(doorX-1.1,.32,-.58);g.add(door);
  box(door,2.08,3.77,.16,1.03,1.91,0,materials.iron);
  for(let i=0;i<3;i++){
    box(door,1.84,.035,.03,1.03,1.1+i*.95,.09,materials.rust);
  }
  box(door,.052,3.64,.06,1.97,1.9,.10,cyan);
  box(door,.08,.19,.10,1.73,2.13,.14,materials.brass);
  trimFrame(g,doorX,2.38,-.43,2.47,4.12,.16,materials.iron);
  box(g,2.69,.12,.8,doorX,.27,.10,materials.stone2);
  // Site window: matte, dark, barely visible within.
  box(g,3.62,3.89,.19,6.56,2.60,-.91,materials.black);
  box(g,3.4,3.68,.03,6.56,2.60,-.72,glass);
  plane(g,3.32,3.61,6.56,2.61,-.63,new THREE.MeshBasicMaterial({color:'#0e1424',transparent:true,opacity:.48}));
  frame(g,6.56,2.6,-.50,3.7,3.96,.14,materials.iron);
  tube(g,[[5.35,1.72,-.40],[7.85,4.13,-.42]],.025,materials.iron);
  // Lower-right coffee sign (not visible brightly through the window).
  const coffeeLight=point(g,'#e73bd0',1.0,7.40,2.05,-.10,3.0);
  sign(g,'☕',7.36,2.39,-.34,.61,.44,{color:'#ff75ee',size:150,glow:true});
  sign(g,'COFFEE',7.37,2.00,-.33,1.18,.24,{color:'#ffa0ea',font:'Arial',size:75,glow:true});
  sign(g,'WORKING 24/7',7.37,1.70,-.33,1.27,.20,{color:'#7addff',font:'Arial',size:67,glow:true});
  // Wiring conduits, mechanical details & tiny signs.
  for(let i=0;i<8;i++){
    const px=rnd(.65,9.7),sy=rnd(4.7,7.6);
    tube(g,[[px,sy,-.70],[px+rnd(-.48,.48),sy-.32,-.53],[px+rnd(-.65,.65),sy-1.02,-.51]],rnd(.012,.037),i%3===0?materials.rust:materials.iron);
  }
  for(let i=0;i<12;i++){
    const bx=rnd(.48,9.65),y=rnd(5.9,8.05);
    const wire=tube(g,[[bx,y,-.44],[bx+.3,y-rnd(.01,.4),-.43],[bx+.67,y-rnd(.07,.26),-.46]],.022,materials.black);
  }
  for(let i=0;i<4;i++)box(g,.72,.27,.23,9.26,2.2+i*.32,-.45,materials.rust);
  box(g,.96,.81,.9,9.02,.50,.65,materials.paint);
  poster(g,9.5,3.45,-.42,.64,1.16,'// CODE');
  foliage(g,8.68,.05,.87,.67);
  // Bicycle silhouette: physical geometry, kept subdued.
  const bike=new THREE.Group();g.add(bike);bike.position.set(9.14,.53,1.60);bike.rotation.y=.12;
  const tire=mat('#090c13',.77,.20);for(const xx of [-.62,.67]){
    const t=new THREE.Mesh(new THREE.TorusGeometry(.54,.055,7,24),tire);t.position.set(xx,0,0);bike.add(t);
  }
  tube(bike,[[-.62,0,0],[-.12,.70,0],[.35,0,0],[-.62,0,0]],.04,materials.iron);
  tube(bike,[[.35,0,0],[.67,.45,0],[.67,0,0]],.04,materials.iron);
  tube(bike,[[-.20,.72,0],[.14,.76,0]],.035,materials.iron);
  return {group:g,doorHits:[makeDoorHit(g,'software',doorX,2.30,.16,2.16,4.05)],door,target:new THREE.Vector3(doorX,2.34,-.95),neonGroups,mainLight,neonAccent,coffeeLight};
}
