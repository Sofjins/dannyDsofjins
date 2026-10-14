import * as THREE from './three.js';

let seed = 4815;
export function rnd(min=0,max=1){ seed=(seed*1664525+1013904223)>>>0;return min+(seed/4294967296)*(max-min); }
export const mat=(color,roughness=.86,metalness=0,extra={})=>new THREE.MeshStandardMaterial({color,roughness,metalness,...extra});
export const materials={
  dark:mat('#0b111c'),stone:mat('#22242c',.95),stone2:mat('#29262e',.93),iron:mat('#151e2b',.59,.57),
  rust:mat('#403130',.89,.35),wood:mat('#39241c',.91),woodDark:mat('#201813',.9),woodWarm:mat('#573320',.86),
  brass:mat('#806043',.41,.62),paint:mat('#242938',.87,.24),paper:mat('#ce8554',.85),
  emerald:mat('#152722',.96),asphalt:mat('#161922',.55,.25),black:mat('#0b0c11',.88),
  cloth:new THREE.MeshStandardMaterial({color:'#482321',roughness:1,side:THREE.DoubleSide}),
};
export function box(parent,w,h,d,x,y,z,material=materials.stone){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
export function sphere(parent,r,x,y,z,material=materials.stone,segments=12){
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,segments,Math.max(8,Math.floor(segments*.65))),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
export function cylinder(parent,r1,r2,height,x,y,z,material=materials.stone,segments=12){
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,height,segments),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
export function tube(parent,coords,r,color,opacity=1){
  const curve=new THREE.CatmullRomCurve3(coords.map(v=>new THREE.Vector3(...v)));
  const geo=new THREE.TubeGeometry(curve,Math.max(10,coords.length*6),r,6,false);
  const mt=typeof color==='string'?mat(color,.62,.22):color;
  const o=new THREE.Mesh(geo,mt);o.castShadow=false;parent.add(o);return o;
}
export function plane(parent,w,h,x,y,z,material){const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material);o.position.set(x,y,z);parent.add(o);return o;}
export function point(parent,color,intensity,x,y,z,distance=5){const l=new THREE.PointLight(color,intensity,distance,2);l.position.set(x,y,z);parent.add(l);return l;}
export function textTexture(lines,{width=1024,height=256,color='#e8d3a6',font='Georgia',size=86,bold=false,align='center',back=null,shadow=0,letterSpacing=0}={}){
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const c=canvas.getContext('2d');
  if(back){c.fillStyle=back;c.fillRect(0,0,width,height);}
  const arr=Array.isArray(lines)?lines:[lines];const lineheight=Math.min(size*1.15,height/(arr.length+0.1));
  c.textAlign=align;c.textBaseline='middle'; c.fillStyle=color;
  c.font=`${bold?'700':'500'} ${size}px ${font}`;
  if(shadow){c.shadowBlur=shadow;c.shadowColor=color;}
  arr.forEach((line,i)=>c.fillText(line,align==='center'?width/2:width*.08,height/2+(i-(arr.length-1)/2)*lineheight,width*.92));
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;
}
export function sign(parent,text,x,y,z,w,h,options={}){
  const {color='#e4c298',font='Georgia',glow=false,size=88,bold=false,back=null}=options;
  const tex=textTexture(text,{color,font,size,bold,back,shadow:glow?27:0,width:1024,height:256});
  const mesh=plane(parent,w,h,x,y,z,new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,toneMapped:!glow,side:THREE.DoubleSide}));
  mesh.userData.sign=true;return mesh;
}
export function poster(parent,x,y,z,w,h,word,color='#9a7759'){
  box(parent,w+.05,h+.05,.035,x,y,z-.027,materials.woodDark);
  return sign(parent,word,x,y,z+.008,w,h,{color,font:'Georgia',size:45});
}
export function trimFrame(parent,x,y,z,w,h,t,material){
  box(parent,w,t,.13,x,y+h/2,z,material);box(parent,w,t,.13,x,y-h/2,z,material);
  box(parent,t,h,.13,x-w/2,y,z,material);box(parent,t,h,.13,x+w/2,y,z,material);
}
export function lightPanel(parent,w,h,x,y,z,glowColor,brightness=1){
  const m=new THREE.MeshBasicMaterial({color:glowColor,transparent:true,opacity:brightness,side:THREE.DoubleSide,depthWrite:false,toneMapped:false});
  return plane(parent,w,h,x,y,z,m);
}
export function archWood(parent,x,y,z,w,h,material=materials.woodDark){
  trimFrame(parent,x,y,z,w,h,.19,material);
  box(parent,w+.38,.15,.24,x,y+h/2+.09,z,materials.woodWarm);
}
export function foliage(parent,x,y,z,scale=1){
  const pot=cylinder(parent,.23*scale,.17*scale,.35*scale,x,y+.18*scale,z,materials.rust,9);
  for(let i=0;i<10;i++){
    const a=rnd(0,Math.PI*2);const radius=rnd(.1,.43)*scale;
    const p=sphere(parent,rnd(.12,.28)*scale,x+Math.cos(a)*radius,y+rnd(.52,1.1)*scale,z+Math.sin(a)*radius,mat(i%3?'#253428':'#3a4932',1),6);
    p.scale.y=rnd(.6,1.7);
  }return pot;
}
export function randomBricks(parent,xMin,xMax,yMin,yMax,z,material,sz=.48,prob=.75){
  for(let row=0,y=yMin;y<yMax;row++,y+=sz*.44){
    for(let x=xMin+(row%2)*sz*.5;x<xMax;x+=sz){
      if(rnd()>prob)continue;
      const brick=box(parent,sz*rnd(.88,.98),sz*.38,rnd(.05,.11),x+sz/2,y,z,material);
      brick.material=mat(new THREE.Color(material.color).multiplyScalar(rnd(.66,1.23)),.96);
    }
  }
}
