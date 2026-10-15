export const DRIP_CYCLE = 6.8;
export const DRIP_STARTS = [.8, 1.16, 1.72];
export const DRIP_SOURCE = { x: 790, y: 239 };
export const BOWL = { x: 790, y: 754 };
export const DRIP_EMITTERS = [
  {id:'bowl',source:DRIP_SOURCE,target:BOWL,starts:DRIP_STARTS,cycle:DRIP_CYCLE},
  {id:'left-eave',source:{x:211,y:219},target:{x:211,y:778},starts:[2.3,2.75,3.36],cycle:12.7},
  {id:'magic-eave',source:{x:598,y:221},target:{x:598,y:773},starts:[5.1,5.76],cycle:10.3},
  {id:'hub-pipe',source:{x:1094,y:327},target:{x:1094,y:779},starts:[3.7,4.18],cycle:15.9},
  {id:'right-cable',source:{x:1484,y:303},target:{x:1484,y:810},starts:[8.2,8.89],cycle:18.7},
  {id:'left-roof-joint',source:{x:80,y:191},target:{x:80,y:795},starts:[1.6,2.21],cycle:14.3},
  {id:'window-lintel',source:{x:1268,y:344},target:{x:1268,y:786},starts:[6.3,6.79],cycle:17.1}
];
const gravity = 1580;
export const FALL_TIME = Math.sqrt(2 * (BOWL.y - DRIP_SOURCE.y) / gravity);

export function dripState(seconds,index,emitter=DRIP_EMITTERS[0]) {
  const phase=((seconds%emitter.cycle)+emitter.cycle)%emitter.cycle;
  const age=phase-emitter.starts[index];
  const fallTime=Math.sqrt(2*(emitter.target.y-emitter.source.y)/gravity);
  const impactAge=age-fallTime;
  return {falling:age>=0&&age<fallTime,
    y:Math.min(emitter.target.y,emitter.source.y+.5*gravity*Math.max(0,age)**2),
    speed: gravity * Math.max(0, age), impactAge,
    ripple: impactAge >= 0 && impactAge < .85 };
}

export function createGutter({ THREE, parent }) {
  const root = new THREE.Group(); root.name = 'GutterAndBowl'; parent.add(root);
  const resources = [];
  const reflectionPixels=new Uint8Array(128*64*4);
  for(let row=0;row<64;row++)for(let column=0;column<128;column++){
    const horizontal=column/128,vertical=row/64,offset=(row*128+column)*4;
    const warm=Math.exp(-(((horizontal-.22)/.14)**2)-((vertical-.53)/.19)**2);
    const cold=Math.exp(-(((horizontal-.72)/.12)**2)-((vertical-.39)/.23)**2);
    const sky=Math.exp(-(((vertical-.27)/.055)**2))*.22;
    reflectionPixels[offset]=Math.min(255,8+warm*204+cold*43+sky*105);
    reflectionPixels[offset+1]=Math.min(255,12+warm*132+cold*132+sky*136);
    reflectionPixels[offset+2]=Math.min(255,16+warm*69+cold*216+sky*160);
    reflectionPixels[offset+3]=255;
  }
  const metalEnvironment=new THREE.DataTexture(reflectionPixels,128,64);
  metalEnvironment.colorSpace=THREE.SRGBColorSpace;metalEnvironment.mapping=THREE.EquirectangularReflectionMapping;
  metalEnvironment.minFilter=metalEnvironment.magFilter=THREE.LinearFilter;metalEnvironment.needsUpdate=true;
  resources.push(metalEnvironment);
  const world = (horizontal, vertical, depth = 18) => new THREE.Vector3(horizontal, 1024 - vertical, depth);
  const addMesh = (name, geometry, material, position) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.name = name; mesh.renderOrder = 3;
    if (position) mesh.position.copy(position);
    root.add(mesh); resources.push(geometry); return mesh;
  };
  const pipeMaterial = new THREE.MeshPhysicalMaterial({ color: 0x414a43, roughness: .40, metalness: .77,
    clearcoat:.22,clearcoatRoughness:.28,envMap:metalEnvironment,envMapIntensity:.58,side: THREE.DoubleSide });
  pipeMaterial.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec3 metalPosition;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nmetalPosition = position;');
    shader.fragmentShader = 'varying vec3 metalPosition;\n' + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      #include <color_fragment>
      float grain = fract(sin(dot(metalPosition, vec3(43.13,71.71,39.41))) * 43758.5453);
      float patina = sin(metalPosition.x * .48 + sin(metalPosition.y * .69)) * sin(metalPosition.z * .61 + metalPosition.y * .31);
      diffuseColor.rgb *= .94 + grain * .09;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.081,.044,.026), smoothstep(.40,.85,patina) * .42);
    `);
  };
  const seamMaterial = new THREE.MeshStandardMaterial({ color: 0x5c6861, roughness: .32, metalness: .82,envMap:metalEnvironment,envMapIntensity:.66 });
  const mountMaterial = new THREE.MeshStandardMaterial({ color: 0x303a3c, roughness: .6, metalness: .55,envMap:metalEnvironment,envMapIntensity:.35 });
  const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x070b0d, transparent: true, opacity: .34, depthWrite: false });
  const boreMaterial = new THREE.MeshStandardMaterial({ color: 0x121c1c, roughness: .9, side: THREE.DoubleSide });
  resources.push(pipeMaterial, seamMaterial, mountMaterial, shadowMaterial, boreMaterial);
  const trough = addMesh('EaveCollectionGutter', new THREE.CylinderGeometry(4.8, 4.8, 78, 32, 1, true, Math.PI, Math.PI), pipeMaterial, world(697, 187, 13));
  trough.rotation.z = Math.PI / 2;
  const gutterLip = addMesh('GutterRolledLip', new THREE.CylinderGeometry(.62, .62, 80, 10), seamMaterial, world(697, 186.5, 17.8));
  gutterLip.rotation.z = Math.PI / 2;
  const collector = addMesh('RoofDrainCollector', new THREE.CylinderGeometry(8.2, 4.2, 16, 32, 1, true), pipeMaterial, world(731, 195, 16));
  collector.rotation.z = -.12;
  const collectorRim = addMesh('CollectorRolledRim', new THREE.TorusGeometry(8.1, .72, 10, 32), seamMaterial, world(730, 187, 16));
  collectorRim.rotation.x = Math.PI / 2;
  const pipePath = new THREE.CatmullRomCurve3([
    world(732, 202, 16), world(741, 209, 18), world(768, 211, 23),
    world(783, 218, 29), world(790, 231, 34), world(DRIP_SOURCE.x, DRIP_SOURCE.y, 36)
  ]);
  addMesh('WeatheredDrainSpout', new THREE.TubeGeometry(pipePath, 72, 4.2, 32, false), pipeMaterial);
  addMesh('SpoutInnerBore', new THREE.TubeGeometry(pipePath, 72, 3.35, 32, false), boreMaterial);
  const shadowGeometry = new THREE.TubeGeometry(pipePath, 48, 5, 16, false);
  const shadowPositions = shadowGeometry.attributes.position;
  for (let index=0;index<shadowPositions.count;index++) shadowPositions.setZ(index,.5);
  const shadow = addMesh('SpoutWallShadow', shadowGeometry, shadowMaterial);
  shadow.position.set(2,-2,0); shadow.renderOrder = 2;
  for (const progress of [.14, .66, 1]) {
    const collar = addMesh('SpoutJointCollar', new THREE.TorusGeometry(progress === 1 ? 3.77 : 4.36, progress === 1 ? .47 : .65, 12, 32), seamMaterial);
    collar.position.copy(pipePath.getPointAt(progress));
    collar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pipePath.getTangentAt(progress));
  }
  for (const horizontal of [677, 715]) {
    addMesh('EaveGutterBracket', new THREE.BoxGeometry(2.1, 12, 5), mountMaterial, world(horizontal, 190, 11));
    const bolt = addMesh('EaveBracketBolt', new THREE.CylinderGeometry(.95, .95, 1, 6), seamMaterial, world(horizontal, 194, 14));
    bolt.rotation.x = Math.PI / 2;
  }
  addMesh('SpoutWallAnchor', new THREE.BoxGeometry(9, 15, 1.5), mountMaterial, world(744, 208, 3));
  addMesh('SpoutAnchorStandoff', new THREE.BoxGeometry(2.6, 3, 17), mountMaterial, world(744, 209, 12));
  for (const vertical of [202.5, 213.5]) {
    const bolt = addMesh('WallAnchorBolt', new THREE.CylinderGeometry(1.15, 1.15, 1.2, 6), seamMaterial, world(744, vertical, 4.5));
    bolt.rotation.x = Math.PI / 2;
  }
  const drops = DRIP_EMITTERS.flatMap(emitter=>emitter.starts.map((_,index)=>{
    const geometry = new THREE.SphereGeometry(.8, 12, 12);
    const material = new THREE.MeshStandardMaterial({ color: 0xb8d6de, roughness: .12, metalness: .35,
      transparent: true, opacity: .64, depthWrite: false });
    const mesh = new THREE.Mesh(geometry, material); mesh.renderOrder = 3; root.add(mesh);
    const ringGeometry = new THREE.RingGeometry(.86, 1, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xa5c3ce, transparent: true, opacity: 0, depthWrite: false });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(emitter.target.x,1024-emitter.target.y,22); ring.renderOrder = 7; root.add(ring);
    const splashGeometry = new THREE.SphereGeometry(.65, 6, 6);
    const splash = new THREE.Mesh(splashGeometry, material); splash.renderOrder = 7; root.add(splash);
    resources.push(geometry, material, ringGeometry, ringMaterial, splashGeometry);
    return {mesh,ring,splash,emitter,index};
  }));
  let clock = 0;
  return {
    update(seconds) {
      clock = seconds;
      drops.forEach(({mesh,ring,splash,emitter,index})=>{
        const state=dripState(seconds,index,emitter);
        mesh.visible = state.falling;
        mesh.position.set(emitter.source.x + Math.sin(index * 2.4) * .5, 1024 - state.y, 16);
        mesh.scale.set(.8, 1 + Math.min(1.8, state.speed * .0012), .75);
        ring.visible = state.ripple;
        const progress = Math.max(0, state.impactAge) / .85;
        const radius = 1 + progress * 17;
        ring.scale.set(radius, radius * .23, 1);
        ring.material.opacity = .52 * (1 - Math.min(1, progress)) ** 1.5;
        splash.visible = state.impactAge >= 0 && state.impactAge < .19;
        splash.position.set(emitter.target.x + index - 1, 1024 - emitter.target.y + Math.sin(Math.max(0, state.impactAge) / .19 * Math.PI) * 3, 23);
      });
    },
    snapshot: () => ({ dropsPerCycle: DRIP_STARTS.length, cycle: DRIP_CYCLE,
      emitters:DRIP_EMITTERS.map(emitter=>({id:emitter.id,source:emitter.source,target:emitter.target,cycle:emitter.cycle})),
      attachment:'eave-gutter-and-bolted-wall-bracket',
      active: drops.filter(drop => drop.mesh.visible).length, clock, source: DRIP_SOURCE, bowl: BOWL }),
    dispose() { parent.remove(root); resources.forEach(resource => resource.dispose()); }
  };
}
