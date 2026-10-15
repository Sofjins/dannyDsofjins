/** Rigid 2.5D props over the reference-locked architecture, rendered by Three.js. */
import {prepareLivingAssets, lanternAngle} from './living-assets.js?v=living-street-2';
import {createFoliage} from './foliage.js';
import {createAtmosphere} from './atmosphere.js';
import {createStreetCat} from './street-cat.js';
export function createLivingScene({THREE,scene,image,material,originalTexture,cleanPlate}) {
  const H=1024,resources=[], prepared=prepareLivingAssets(image,cleanPlate);
  const root=new THREE.Group();root.name='LivingProps';root.visible=false;scene.add(root);
  const tx=canvas=>{
    const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
    t.generateMipmaps=false;t.minFilter=t.magFilter=THREE.LinearFilter;resources.push(t);return t;
  };
  const cleanTexture=tx(prepared.clean);
  const cleanActive={value:0};
  const compileOriginal=material.onBeforeCompile;
  const patchRects=[...prepared.lanterns,...prepared.flames,...prepared.foliage].map(spec=>spec.rect);
  if(prepared.catRemoved)patchRects.push([628,678,188,114]);
  material.onBeforeCompile=shader=>{
    compileOriginal(shader);
    shader.uniforms.uCleanMap={value:cleanTexture};
    shader.uniforms.uCleanActive=cleanActive;
    shader.fragmentShader=`
      uniform sampler2D uCleanMap;
      uniform float uCleanActive;
      float cleanRegion(vec2 point,vec4 bounds){
        return step(bounds.x,point.x)*step(bounds.y,point.y)
          *(1.0-step(bounds.x+bounds.z,point.x))*(1.0-step(bounds.y+bounds.w,point.y));
      }
    `+shader.fragmentShader;
    const regions=patchRects.map(rect=>`cleanRegion(cleanPoint,vec4(${rect.map(value=>Number(value).toFixed(1)).join(',')}))`).join('+');
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
      #include <map_fragment>
      vec2 cleanPoint=vec2(vMapUv.x*1536.0,(1.0-vMapUv.y)*1024.0);
      float cleanMask=clamp(${regions},0.0,1.0)*uCleanActive;
      if(cleanMask>.5)diffuseColor=texture2D(uCleanMap,vMapUv);
    `);
  };
  function makeProp(spec,z){
    const [x,y,w,h]=spec.rect,[px,py]=spec.pivot;
    const pivot=new THREE.Group();pivot.position.set(px,H-py,z);root.add(pivot);
    const g=new THREE.PlaneGeometry(w,h);
    const m=new THREE.MeshBasicMaterial({map:tx(spec.texture),transparent:true,depthWrite:false,toneMapped:false});
    const mesh=new THREE.Mesh(g,m);mesh.position.set(x+w/2-px,py-y-h/2,0);
    mesh.renderOrder=5;pivot.add(mesh);resources.push(g,m);
    return {...spec,pivot,mesh,hoveredAt:-100};
  }
  const lanterns=prepared.lanterns.map(s=>makeProp(s,.12));
  const flames=prepared.flames.map(s=>makeProp(s,.14));
  const foliage=createFoliage({THREE,parent:root,prepared:prepared.foliage,texture:tx});
  const atmosphere=createAtmosphere({THREE,parent:root});
  const cat=prepared.catRemoved?createStreetCat({THREE,parent:root}):null;
  const sky=new THREE.HemisphereLight(0x9eabc3,0x2f2421,1.3);
  const amber=new THREE.PointLight(0xffb476,240000,1400,2);
  amber.position.set(360,550,260);
  const cyan=new THREE.PointLight(0x78bfff,270000,1400,2);
  cyan.position.set(1110,650,300);
  const rim=new THREE.DirectionalLight(0x8fa6bb,1.5);
  rim.position.set(-100,700,-120);
  root.add(sky,amber,cyan,rim);
  let enabled=false,clock=0;
  // Sparse ground-only rain avoids overlaying streaks across the sign lettering.
  const count=28,buffer=new Float32Array(count*6),seeds=[];
  let seed=97402971;const rand=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
  for(let i=0;i<count;i++)seeds.push({x:rand()*1536,phase:rand(),speed:.25+rand()*.27,length:6+rand()*9});
  const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.BufferAttribute(buffer,3));
  const rm=new THREE.LineBasicMaterial({color:0x7795a3,transparent:true,opacity:.13,depthWrite:false,toneMapped:false});
  const rain=new THREE.LineSegments(rg,rm);rain.renderOrder=6;root.add(rain);resources.push(rg,rm);
  const rings=[];
  for(let i=0;i<4;i++){
    const g=new THREE.RingGeometry(9,9.6,40);
    const m=new THREE.MeshBasicMaterial({color:i%2?0x405d79:0x805b35,transparent:true,opacity:0,depthWrite:false,toneMapped:false});
    const mesh=new THREE.Mesh(g,m);mesh.position.set([290,1110,550,1310][i],[145,137,116,110][i],.17);
    mesh.renderOrder=6;root.add(mesh);resources.push(g,m);rings.push(mesh);
  }
  function enable(value){
    enabled=Boolean(value);root.visible=enabled;
    cleanActive.value=enabled?1:0;
    if(!enabled){for(const p of lanterns)p.pivot.rotation.z=0;}
  }
  function update(t){
    clock=t;if(!enabled)return;
    foliage.update(t);atmosphere.update(t);cat?.update(t);
    amber.intensity=240000*(1+Math.sin(t*5.3)*.035);
    cyan.intensity=270000*(1-Math.max(0,1-Math.abs(((t+2)%17.3)-7.5)/.09)*.28);
    for(const s of lanterns){
      s.pivot.rotation.z=-lanternAngle(s,t,s.hoveredAt);
      const b=1+.016*Math.sin(t*1.7+s.offset);
      s.mesh.material.color.setRGB(b,b,b);
    }
    for(let i=0;i<flames.length;i++){
      const f=flames[i];f.pivot.rotation.z=.045*Math.sin(t*5.2+i*1.7)+.025*Math.sin(t*11.1+i);
      f.mesh.scale.set(1+.1*Math.sin(t*7.1+i),1+.10*Math.sin(t*8.7+i*2),1);
      const b=1+.10*Math.sin(t*9.3+i*.8);f.mesh.material.color.setRGB(b,b,b);
    }
    for(let i=0;i<count;i++){
      const s=seeds[i],p=(s.phase+t*s.speed)%1,y=192-p*192,x=(s.x-p*31+1536)%1536,j=i*6;
      buffer.set([x,y,.18,x-2,y-s.length,.18],j);
    }
    rg.attributes.position.needsUpdate=true;
    for(let i=0;i<rings.length;i++){
      const a=(t*.25+i*.7)%2,phase=Math.min(a,1),k=.4+phase*1.7;
      rings[i].scale.set(k,k*.19,1);rings[i].material.opacity=a<1?.2*Math.sin(phase*Math.PI):0;
    }
  }
  function react(id){const s=lanterns.find(s=>s.id===id);if(s)s.hoveredAt=clock;}
  function snapshot(){return {enabled,clock,prepared:true,lanterns:lanterns.map(s=>({id:s.id,angle:s.pivot.rotation.z,pivot:[...s.pivot.position],rect:s.rect})),flames:flames.length,rainCount:count,foliage:foliage.snapshot(),atmosphere:atmosphere.snapshot(),cat:cat?.snapshot()||null};}
  function dispose(){cat?.dispose();foliage.dispose();atmosphere.dispose();scene.remove(root);for(const r of resources)r.dispose();}
  return {enable,update,react,snapshot,dispose,prepared,greet:()=>cat?.greet(),catPose:()=>cat?.snapshot()};
}
