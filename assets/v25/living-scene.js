/** Rigid 2.5D props over the reference-locked architecture, rendered by Three.js. */
import {prepareLivingAssets, lanternAngle, CLEAN_PATCHES, PAVEMENT_PATCH, FOLIAGE_REPAIRS, CLOTH_PATCH} from './living-assets.js?v=living-street-8';
import {createFoliage} from './foliage.js?v=living-street-8';
import {createAtmosphere} from './atmosphere.js?v=living-street-8';
import {createStreetCat} from './street-cat.js?v=living-street-8';
import {createCurtains} from './curtains.js?v=living-street-8';
import {createGutter} from './gutter.js?v=living-street-8';
import {createWetStreet} from './wet-street.js?v=living-street-8';
import {neonLevels} from './neon.js?v=living-street-8';
export async function createLivingScene({THREE,scene,image,material,originalTexture,cleanPlate,pavementPlate,foliageAtlas,foliagePlate,curtainAtlas,clothPlate,preparedAssets}) {
  const H=1024,resources=[], prepared=preparedAssets||prepareLivingAssets(image,cleanPlate,pavementPlate,foliageAtlas,foliagePlate,curtainAtlas,clothPlate);
  const root=new THREE.Group();root.name='LivingProps';root.visible=false;scene.add(root);
  const tx=canvas=>{
    const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
    t.generateMipmaps=false;t.minFilter=t.magFilter=THREE.LinearFilter;resources.push(t);return t;
  };
  const cleanTexture=tx(prepared.clean);
  const cleanActive={value:0};
  const compileOriginal=material.onBeforeCompile;
  const patchRects=[...prepared.lanterns,...prepared.flames,...prepared.foliage,...prepared.curtains].map(spec=>spec.rect);
  if(prepared.catRemoved)patchRects.push(...CLEAN_PATCHES);
  if(pavementPlate)patchRects.push(PAVEMENT_PATCH);
  patchRects.push(...FOLIAGE_REPAIRS,CLOTH_PATCH);
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
  const curtains=createCurtains({THREE,parent:root,prepared:prepared.curtains,texture:tx});
  const atmosphere=createAtmosphere({THREE,parent:root});
  const gutter=createGutter({THREE,parent:root});
  let cat=null,catPromise=null,catError=null,catSeed=null,disposed=false;
  function loadCat(){
    if(!prepared.catRemoved)return Promise.resolve();
    if(!catPromise)catPromise=createStreetCat({THREE,parent:root}).then(actor=>{
      if(disposed){actor.dispose();return;}
      cat=actor;if(catSeed!==null)cat.setSeed(catSeed);cat.update(clock);
    }).catch(error=>{catError=error.message;});
    return catPromise;
  }
  const pavement=createWetStreet({THREE,parent:root,texture:cleanTexture});
  const sky=new THREE.HemisphereLight(0x9eabc3,0x2f2421,1.3);
  const amber=new THREE.PointLight(0xffb476,240000,1400,2);
  amber.position.set(360,550,260);
  const cyan=new THREE.PointLight(0x78bfff,270000,1400,2);
  cyan.position.set(1110,650,300);
  const rim=new THREE.DirectionalLight(0x8fa6bb,1.5);
  rim.position.set(-100,700,-120);
  const coffee=new THREE.PointLight(0xe586ec,18000,380,2);coffee.position.set(1164,413,110);
  root.add(sky,amber,cyan,rim,coffee);
  for (const light of [sky,amber,cyan,rim,coffee]) light.layers.enable(1);
  let enabled=false,clock=0;
  function enable(value){
    enabled=Boolean(value);root.visible=enabled;
    cleanActive.value=enabled?1:0;
    if(!enabled){for(const p of lanterns)p.pivot.rotation.z=0;}
  }
  function update(t){
    clock=t;if(!enabled)return;
    foliage.update(t);curtains.update(t);atmosphere.update(t);gutter.update(t);cat?.update(t);
    pavement.update(t,cat?.pose());
    amber.intensity=240000*(1+Math.sin(t*5.3)*.085+Math.sin(t*12.7)*.035);
    const neon=neonLevels(t);
    cyan.intensity=270000*(.78+neon[1]*.22);coffee.intensity=18000*neon[5];
    for(const s of lanterns){
      s.pivot.rotation.z=-lanternAngle(s,t,s.hoveredAt);
      const b=1+.08*Math.sin(t*1.7+s.offset)+.035*Math.sin(t*6.9+s.offset*3);
      s.mesh.material.color.setRGB(b,b,b);
    }
    for(let i=0;i<flames.length;i++){
      const f=flames[i];f.pivot.rotation.z=.12*Math.sin(t*5.2+i*1.7)+.065*Math.sin(t*11.1+i);
      f.pivot.scale.set(1+.15*Math.sin(t*7.1+i),1+.22*Math.sin(t*8.7+i*2),1);
      const b=1+.18*Math.sin(t*9.3+i*.8)+.06*Math.sin(t*17.1+i);f.mesh.material.color.setRGB(b,b,b);
    }
  }
  function react(id){const s=lanterns.find(s=>s.id===id);if(s)s.hoveredAt=clock;}
  function snapshot(){return {enabled,clock,prepared:true,lanterns:lanterns.map(s=>({id:s.id,angle:s.pivot.rotation.z,pivot:[...s.pivot.position],rect:s.rect})),flames:flames.length,rainCount:0,foliage:foliage.snapshot(),curtains:curtains.snapshot(),gutter:gutter.snapshot(),atmosphere:atmosphere.snapshot(),pavement:pavement.snapshot(),cat:cat?.snapshot()||{model:catError?'unavailable':'loading',error:catError}};}
  function dispose(){disposed=true;cat?.dispose();pavement.dispose();foliage.dispose();curtains.dispose();gutter.dispose();atmosphere.dispose();scene.remove(root);for(const r of resources)r.dispose();}
  return {enable,update,react,snapshot,dispose,prepared,loadCat,setPortrait:foliage.setPortrait,setViewportMist:atmosphere.setViewport,setCatVisible:value=>cat?.setVisible(value),greet:()=>cat?.greet(),catPose:()=>cat?.pose(),setCatSeed:seed=>{catSeed=seed;cat?.setSeed(seed);},setSurfaceVisible:value=>pavement.setVisible(value)};
}
