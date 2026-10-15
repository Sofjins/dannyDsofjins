import { createCatBehavior } from './cat-motion.js?v=living-street-5';
import { createCatRig } from './cat-rig.js?v=living-street-5';

export function createCatActor(THREE, model, seed = 97402971) {
  const root = new THREE.Group(); root.name = 'BlackStreetCat';
  const orientation = new THREE.Group(); root.add(orientation); orientation.add(model.scene);
  const mixer = new THREE.AnimationMixer(model.scene);
  const actions = new Map(model.animations.map(clip => [clip.name, mixer.clipAction(clip).play()]));
  for (const action of actions.values()) action.setEffectiveWeight(0);
  actions.get('Idle').setEffectiveWeight(1); mixer.update(0);
  model.scene.updateMatrixWorld(true);
  const bounds = new THREE.Box3();
  const point = new THREE.Vector3();
  let joints = 0;
  model.scene.traverse(object => {
    if (object.isBone) joints++;
    if (!object.isMesh) return;
    object.skeleton?.update();
    object.renderOrder = 8; object.frustumCulled = false;
    object.castShadow = true; object.layers.enable(1);
    for (let index = 0; index < object.geometry.attributes.position.count; index++) {
      object.getVertexPosition(index, point).applyMatrix4(object.matrixWorld); bounds.expandByPoint(point);
    }
  });
  const scale = 100 / (bounds.max.y - bounds.min.y);
  model.scene.scale.setScalar(scale);
  model.scene.position.y = -bounds.min.y * scale;
  const rig = createCatRig(THREE, model);
  let behavior = createCatBehavior(seed);
  let greetingAt = -100, seconds = 0, pose = behavior.poseAt(0);
  function update(time) {
    seconds = time; pose = behavior.poseAt(time, greetingAt);
    rig.restore();
    for (const action of actions.values()) action.setEffectiveWeight(0);
    const current = actions.get(pose.clip);
    current.time = Math.min(current.getClip().duration - .0001, pose.clipTime);
    current.setEffectiveWeight(pose.blend);
    if (pose.previousClip && pose.blend < 1) {
      const previous = actions.get(pose.previousClip);
      previous.time = pose.previousTime; previous.setEffectiveWeight(1 - pose.blend);
    }
    mixer.update(0);
    root.position.set(pose.x, 1024 - pose.screenY, 105);
    orientation.rotation.y = -Math.PI / 2 + Math.PI * (1 - pose.facing) / 2 + pose.greeting * .16;
    root.rotation.z = pose.pitch * pose.facing;
    root.updateWorldMatrix(true, true);
    rig.apply(pose, time);
  }
  update(0);
  return {
    root, update, pose: () => pose, greet: () => { greetingAt = seconds; },
    setSeed: nextSeed => { behavior = createCatBehavior(nextSeed); greetingAt = -100; update(0); },
    snapshot: () => ({ ...pose, joints, model: 'authored-gltf', author: 'DreamNoms',
      clips: [...actions.keys()], jumpReady: true, coat: 'black-short-fur', tailScale: [.48, .72, .48],
      seed: behavior.seed, plan: behavior.plan(), contacts: rig.contacts() }),
    dispose: () => { mixer.stopAllAction(); mixer.uncacheRoot(model.scene); }
  };
}
