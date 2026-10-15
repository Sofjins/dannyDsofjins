import test from 'node:test';
import assert from 'node:assert/strict';
import { gunzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { catPose, createCatBehavior, CAT_GROUND, CAT_BOX_TOP } from '../assets/v25/cat-motion.js';
import { neonLevels } from '../assets/v25/neon.js';
import { environmentTransform } from '../assets/v25/environment.js';
import { createGutter, DRIP_EMITTERS, dripState, DRIP_CYCLE, DRIP_STARTS, DRIP_SOURCE, FALL_TIME, BOWL } from '../assets/v25/gutter.js';
import { streetFraming } from '../assets/v25/framing.js';
import { createWetStreet, STREET_SURFACE } from '../assets/v25/wet-street.js';

test('wet floor uses a tilted reflection camera and a real shadow receiver with disposable resources', async () => {
  const THREE = await import('three');
  const { Reflector } = await import('three/addons/objects/Reflector.js');
  const parent = new THREE.Group();
  const texture = new THREE.Texture();
  const floor = createWetStreet({ THREE: { ...THREE, Reflector }, parent, texture });
  const reflection = parent.getObjectByName('PuddleCatReflection');
  const shadow = parent.getObjectByName('CatCastShadowReceiver');
  assert.ok(reflection.isReflector && shadow.receiveShadow);
  assert.equal(reflection.position.y, STREET_SURFACE.height);
  assert.equal(reflection.position.z, STREET_SURFACE.depth);
  assert.ok(Math.abs(Math.sin(-reflection.rotation.x) - .85) < .0001);
  assert.ok(parent.children.some(object => object.isDirectionalLight && object.castShadow));
  const camera = new THREE.OrthographicCamera(-768, 768, 512, -512, .1, 2500);
  camera.position.set(768, 512, 1200); camera.updateMatrixWorld(); parent.updateMatrixWorld(true);
  let reflectedCamera;
  const renderer = { xr: { enabled: false }, shadowMap: { autoUpdate: true },
    getClearColor: color => color.set(0), getClearAlpha: () => 1, setClearColor() {},
    getRenderTarget: () => null, setRenderTarget() {}, autoClear: true,
    state: { buffers: { depth: { setMask() {} } } },
    render: (scene, view) => { reflectedCamera = view; } };
  reflection.onBeforeRender(renderer, parent, camera);
  const reflectedHead = new THREE.Vector3(840, 320, 105).project(reflectedCamera);
  assert.ok(Math.abs(reflectedHead.x) < 1 && Math.abs(reflectedHead.y) < 1 && Math.abs(reflectedHead.z) < 1);
  assert.equal(reflectedCamera.layers.mask, 2);
  floor.update(41, { x: 800, surfaceY: 778 });
  assert.equal(reflection.material.uniforms.clock.value, 41);
  assert.deepEqual(reflection.material.uniforms.catPosition.value.toArray(), [800, 778]);
  floor.setVisible(false); assert.equal(reflection.visible, false);
  floor.dispose(); texture.dispose();
  assert.equal(parent.children.length, 0);
});

test('full street always fits without crop or distortion, with environment beyond its edges', () => {
  for (const [width, height] of [[1536, 1024], [1710, 896], [1440, 900], [2560, 1080], [1024, 768], [844, 390], [390, 844], [360, 640]]) {
    const framing = streetFraming(width, height);
    assert.ok(framing.artWidth <= width + .001 && framing.artHeight <= height + .001);
    assert.ok(Math.abs(framing.artWidth / framing.artHeight - 1.5) < .00001);
    assert.equal(framing.left, width / 2);
    assert.equal(framing.top, height / 2);
    assert.ok(framing.surroundWidth >= width - .001 && framing.surroundHeight >= height - .001);
  }
  const magic = streetFraming(390, 844, 'magic'), software = streetFraming(390, 844, 'software');
  assert.ok(magic.close && software.close);
  assert.ok(magic.left > software.left);
  assert.ok(streetFraming(1710, 896).feather <= 6);
});

test('seeded behavior has long varied rests, both walking directions, drinking and crate visits', () => {
  const behavior = createCatBehavior(97402971);
  behavior.poseAt(900);
  const plan = behavior.plan();
  for (const mode of ['sit', 'drink', 'walk', 'jump', 'jump-down', 'perch']) assert.ok(plan.some(event => event.mode === mode));
  const rests = plan.filter(event => ['sit', 'perch'].includes(event.mode));
  assert.ok(rests.every(event => event.duration >= 10));
  assert.ok(new Set(rests.map(event => Math.floor(event.duration))).size > 5);
  assert.ok(plan.some(event => event.mode === 'walk' && event.toX < 555));
  assert.ok(plan.some(event => event.mode === 'walk' && event.toX > event.fromX));
  assert.ok(plan.some(event => event.mode === 'walk' && event.toX < event.fromX));
  const same = createCatBehavior(97402971); same.poseAt(900);
  assert.deepEqual(same.plan(), plan);
  assert.notDeepEqual(createCatBehavior(12).plan(), createCatBehavior(13).plan());
});

test('no teleportation, root ground penetration, or invalid poses across ten minutes', () => {
  let previous = catPose(0);
  for (let frame = 1; frame <= 600 * 120; frame++) {
    const pose = catPose(frame / 120);
    assert.ok(Math.abs(pose.x - previous.x) < 1.6);
    assert.ok(Math.abs(pose.screenY - previous.screenY) < 3.2);
    assert.ok(Math.abs(pose.pitch - previous.pitch) < .03);
    assert.ok(Math.abs(pose.facing - previous.facing) < .022);
    assert.ok(pose.screenY <= CAT_GROUND);
    if (pose.mode === 'perch') assert.equal(pose.screenY, CAT_BOX_TOP);
    assert.ok(pose.x >= 340 && pose.x <= 1268);
    assert.ok(Object.values(pose).every(value => typeof value !== 'number' || Number.isFinite(value)));
    previous = pose;
  }
});

test('actual authored skeleton lands front paws first and keeps all transforms finite', async () => {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const { createCatActor } = await import('../assets/v25/cat-actor.js');
  globalThis.self = globalThis;
  const loader = new GLTFLoader();
  loader.register(() => ({ name: 'test-texture', loadTexture: async () => new THREE.Texture() }));
  const bytes = readFileSync(new URL('../assets/v25/models/somali-cat.glb', import.meta.url));
  const model = await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.length), '');
  const actor = createCatActor(THREE, model);
  const plan = actor.snapshot().plan;
  for (const event of plan.filter(event => ['jump', 'jump-down', 'land', 'drink'].includes(event.mode))) {
    for (let step = 0; step < 30; step++) {
      actor.update(event.start + event.duration * step / 30);
      actor.root.updateMatrixWorld(true);
      actor.root.traverse(node => assert.ok(node.matrixWorld.elements.every(Number.isFinite)));
      const pose = actor.snapshot();
      if (event.mode === 'land') for (const contact of pose.contacts) {
        const floor = 1024 - pose.surfaceY;
        assert.ok(contact.point[1] >= floor + 2.7);
        if (contact.front || pose.rearContact) assert.ok(Math.abs(contact.point[1] - floor - 2.8) < .01);
      }
    }
  }
  actor.update(28); const before = actor.snapshot();
  actor.update(101); actor.update(28);
  assert.deepEqual(actor.snapshot().contacts, before.contacts);
  actor.dispose();
});

test('greeting does not interrupt the authored motion or teleport the cat', () => {
  const original = catPose(24);
  const greeted = catPose(24, 23);
  assert.equal(greeted.x, original.x);
  assert.equal(greeted.screenY, original.screenY);
  assert.equal(greeted.clipTime, original.clipTime);
  assert.ok(greeted.greeting > 0);
  assert.equal(catPose(28, 23).greeting, 0);
});

test('the shipped GLB contains the licensed authored mesh, texture, skin and required clips', () => {
  const bytes = readFileSync(new URL('../assets/v25/models/somali-cat.glb', import.meta.url));
  assert.equal(bytes.readUInt32LE(0), 0x46546c67);
  assert.equal(bytes.readUInt32LE(8), bytes.length);
  const document = JSON.parse(bytes.subarray(20, 20 + bytes.readUInt32LE(12)));
  assert.equal(document.asset.extras.author, 'DreamNoms');
  assert.equal(document.asset.extras.license, 'CC-BY-4.0');
  assert.ok(document.skins.length > 0 && document.meshes.length > 0);
  assert.ok(document.images[0].bufferView >= 0);
  assert.deepEqual(document.animations.map(clip => clip.name).sort(), ['Idle', 'SitDown', 'SittingIdle', 'StandUp', 'WalkClean']);
  assert.ok(document.animations.every(clip => clip.channels.length > 30));
});

test('gutter releases just three separated drops and ripples only after contact', () => {
  assert.equal(DRIP_STARTS.length, 3);
  assert.ok(DRIP_CYCLE > 6);
  for (const [index, start] of DRIP_STARTS.entries()) {
    assert.equal(dripState(start - .01, index).falling, false);
    assert.equal(dripState(start + .01, index).falling, true);
    assert.equal(dripState(start + FALL_TIME - .01, index).ripple, false);
    const impact = dripState(start + FALL_TIME + .01, index);
    assert.equal(impact.falling, false);
    assert.equal(impact.ripple, true);
    assert.equal(impact.y, BOWL.y);
  }
  for (let time = 4; time < DRIP_CYCLE; time += .1) for (let index = 0; index < 3; index++) {
    assert.equal(dripState(time, index).falling, false);
    assert.equal(dripState(time, index).ripple, false);
  }
});

test('four faulty neon circuits have different timings while other tubes only breathe',()=>{
  const base=neonLevels(2),coffee=neonLevels(2.4),commit=neonLevels(4.6),hub=neonLevels(5.5),japanese=neonLevels(6.2);
  assert.ok(coffee[5]<.1&&base[5]>.9&&commit[3]<.2&&hub[1]<.4&&japanese[7]<.3);
  for(let seconds=0;seconds<50;seconds+=.05) {
    const levels=neonLevels(seconds);
    assert.ok(levels.every(value=>value>=0&&value<=1.1));
    for(const index of [0,2,4,6])assert.ok(levels[index]>.85);
  }
});
test('seven drip origins have staggered sparse bursts and their own impact positions',()=>{
  assert.equal(DRIP_EMITTERS.length,7);
  assert.equal(new Set(DRIP_EMITTERS.map(emitter=>emitter.cycle)).size,7);
  const dropsPerMinute=DRIP_EMITTERS.reduce((total,emitter)=>total+emitter.starts.length*60/emitter.cycle,0);
  assert.ok(dropsPerMinute>65&&dropsPerMinute<90);
  for(const emitter of DRIP_EMITTERS)for(const [index,start] of emitter.starts.entries()){
    assert.ok(start+2<emitter.cycle);
    assert.ok(emitter.source.y<emitter.target.y);
    assert.equal(dripState(start-.01,index,emitter).falling,false);
    assert.equal(dripState(start+.01,index,emitter).falling,true);
    assert.equal(dripState(start+2,index,emitter).y,emitter.target.y);
  }
});
test('drain spout connects to the roof collector and wall hardware, with an aligned open outlet',async()=>{
  const THREE=await import('three');
  const parent=new THREE.Group();
  const gutter=createGutter({THREE,parent});
  const root=parent.getObjectByName('GutterAndBowl');
  for(const name of ['EaveCollectionGutter','RoofDrainCollector','SpoutWallAnchor','SpoutAnchorStandoff','WallAnchorBolt','SpoutInnerBore'])assert.ok(root.getObjectByName(name));
  const geometry=root.getObjectByName('WeatheredDrainSpout').geometry;
  const outlet=geometry.parameters.path.getPoint(1);
  assert.ok(Math.abs(outlet.x-DRIP_SOURCE.x)<1e-9);
  assert.ok(Math.abs(outlet.y-(1024-DRIP_SOURCE.y))<1e-9);
  assert.equal(geometry.parameters.closed,false);
  assert.equal(BOWL.x,DRIP_SOURCE.x);
  gutter.update(DRIP_STARTS[0]+.1);
  assert.ok(gutter.snapshot().active>0);
  let disposed=0;
  geometry.addEventListener('dispose',()=>disposed++);
  gutter.dispose();
  assert.equal(disposed,1);
  assert.equal(parent.children.length,0);
});
test('floor texture registration exactly matches the surrounding CSS image',()=>{
  for(const horizontal of [true,false]){
    const transform=environmentTransform(horizontal);
    const width=1536,height=1024;
    const backgroundWidth=horizontal?width*2:width;
    const backgroundHeight=horizontal?height:width*2.25;
    const left=(width-backgroundWidth)/2+(horizontal?width*30/1086:0);
    const top=(height-backgroundHeight)/2+(horizontal?0:width*42/836);
    for(const point of [[0,830],[1536,1024],[768,912]]){
      const expected=[(point[0]-left)/backgroundWidth,1-(point[1]-top)/backgroundHeight];
      const actual=[point[0]/width*transform[0]+transform[2],(1-point[1]/height)*transform[1]+transform[3]];
      assert.ok(Math.abs(expected[0]-actual[0])<1e-9&&Math.abs(expected[1]-actual[1])<1e-9);
    }
  }
});

test('runtime cat optimization preserves every referenced geometry and animation byte',()=>{
  const decode=filename=>{
    const bytes=readFileSync(new URL('../assets/v25/models/'+filename,import.meta.url));
    const length=bytes.readUInt32LE(12);
    return {bytes,document:JSON.parse(bytes.subarray(20,20+length)),binary:bytes.subarray(28+length)};
  };
  const source=decode('somali-cat.glb'),runtime=decode('black-cat-runtime.glb');
  assert.ok(runtime.bytes.length<source.bytes.length*.85);
  const compressed=readFileSync(new URL('../assets/v25/models/black-cat-runtime.glb.gz',import.meta.url));
  assert.ok(compressed.length<source.bytes.length*.16);
  assert.deepEqual(gunzipSync(compressed),runtime.bytes);
  assert.deepEqual(runtime.document.animations,source.document.animations);
  assert.deepEqual(runtime.document.meshes,source.document.meshes);
  assert.deepEqual(runtime.document.skins,source.document.skins);
  for(const accessor of source.document.accessors){
    if(accessor.bufferView===undefined)continue;
    const original=source.document.bufferViews[accessor.bufferView],optimized=runtime.document.bufferViews[accessor.bufferView];
    assert.deepEqual(runtime.binary.subarray(optimized.byteOffset||0,(optimized.byteOffset||0)+optimized.byteLength),
      source.binary.subarray(original.byteOffset||0,(original.byteOffset||0)+original.byteLength));
  }
});


