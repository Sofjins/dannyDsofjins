export function createCatRig(THREE, model) {
  const scene = model.scene;
  const names = model.animations[0].tracks.filter(track => track.name.endsWith('.quaternion')).map(track => track.name.slice(0, -11));
  const nodes = new Map(names.map(name => [name.replace(/_\d+$/, ''), scene.getObjectByName(name)]));
  const changed = [...nodes.values()].filter(Boolean).map(node => ({ node, position: node.position.clone(), rotation: node.quaternion.clone() }));
  const point = new THREE.Vector3(), axis = new THREE.Vector3(), rotation = new THREE.Quaternion();
  const first = new THREE.Vector3(), second = new THREE.Vector3(), origin = new THREE.Vector3();
  const parentRotation = new THREE.Quaternion(), worldRotation = new THREE.Quaternion();
  const feet = ['PawL', 'PawR', 'FootL', 'FootR'].map(name => {
    const node = nodes.get(name);
    const rest = scene.worldToLocal(node.getWorldPosition(new THREE.Vector3()));
    const front = name.startsWith('Paw');
    const side = name.endsWith('L') ? 'L' : 'R';
    const chain = (front ? ['UpperArm', 'Arm'] : ['Hip', 'Thigh', 'Heel']).map(prefix => nodes.get(prefix + side));
    const end = scene.getObjectByName((front ? 'Arm' : 'Heel') + side + '_end');
    return { node, rest, front, chain, end };
  });
  function rotateWorld(node, quaternion) {
    node.getWorldQuaternion(worldRotation);
    node.parent.getWorldQuaternion(parentRotation).invert();
    node.quaternion.copy(parentRotation).multiply(quaternion).multiply(worldRotation);
    node.updateWorldMatrix(false, true);
  }
  function tilt(name, angle) {
    if (!angle) return;
    scene.getWorldQuaternion(rotation);
    axis.set(1, 0, 0).applyQuaternion(rotation);
    rotateWorld(nodes.get(name), rotation.setFromAxisAngle(axis, angle));
  }
  function solve(chain, end, target) {
    for (let iteration = 0; iteration < 5; iteration++) {
      for (let index = chain.length - 1; index >= 0; index--) {
        const joint = chain[index];
        joint.getWorldPosition(origin); end.getWorldPosition(first);
        first.sub(origin).normalize(); second.copy(target).sub(origin).normalize();
        rotation.setFromUnitVectors(first, second);
        rotateWorld(joint, rotation);
      }
    }
  }
  return {
    restore() { for (const item of changed) { item.node.position.copy(item.position); item.node.quaternion.copy(item.rotation); } },
    apply(pose, seconds) {
      for (const item of changed) { item.position.copy(item.node.position); item.rotation.copy(item.node.quaternion); }
      scene.updateWorldMatrix(true, true);
      tilt('UpperSpine', -.43 * pose.drink);
      tilt('Neck', -.36 * pose.drink - pose.pitch * .5);
      tilt('Head', -.24 * pose.drink + pose.drink * Math.sin(seconds * 7.4) * .018);
      tilt('TailBase', -.4 * pose.jump - .16 * pose.drink);
      tilt('TailBaseMiddle', .2 * pose.jump);
      nodes.get('TailBase').scale.set(.48, .72, .48);
      nodes.get('TailBase').updateWorldMatrix(false, true);
      const active = pose.jump > 0 || pose.drink > 0 || pose.mode === 'land' || pose.mode === 'crouch';
      if (!active) return;
      for (const foot of feet) {
        point.copy(foot.rest);
        if (pose.jump > 0) {
          point.y += pose.jump * (foot.front ? 72 : 95);
          point.z += pose.jump * (foot.front ? -65 : -25);
        }
        const target = scene.localToWorld(point.clone());
        if (pose.frontContact && foot.front) target.y = Math.max(target.y, 1024 - pose.surfaceY + 2.8);
        if (pose.mode === 'land') {
          target.y = 1024 - pose.surfaceY + 2.8 + (!foot.front && !pose.rearContact ? (1 - pose.progress / .28) * 9 : 0);
        }
        solve(foot.chain, foot.end, target);
        foot.node.position.copy(foot.node.parent.worldToLocal(target.clone()));
        foot.node.updateWorldMatrix(false, true);
      }
    },
    contacts() { return feet.map(foot => ({ front: foot.front, point: foot.node.getWorldPosition(new THREE.Vector3()).toArray() })); }
  };
}
