import { catPose, solveLeg } from './cat-motion.js';

export function createStreetCat({ THREE, parent }) {
  const resources = [];
  const root = new THREE.Group();
  root.name = 'StreetCat';
  parent.add(root);
  const body = new THREE.Group();
  root.add(body);
  const coat = new THREE.MeshStandardMaterial({ color: '#171b20', roughness: .97, metalness: 0 });
  const innerEar = new THREE.MeshStandardMaterial({ color: '#372c32', roughness: 1, side: THREE.DoubleSide });
  const noseMaterial = new THREE.MeshStandardMaterial({ color: '#272127', roughness: .72 });
  const eyesMaterial = new THREE.MeshStandardMaterial({ color: '#827b43', roughness: .3, emissive: '#242b13', emissiveIntensity: .12 });
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: '#050708', roughness: .22 });
  resources.push(coat, innerEar, noseMaterial, eyesMaterial, pupilMaterial);
  coat.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 furPosition;');
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nfurPosition = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 furPosition;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      #include <color_fragment>
      float furNoise = fract(sin(dot(floor(furPosition * vec3(8.0, 37.0, 19.0)), vec3(12.9898, 78.233, 37.719))) * 43758.5453);
      diffuseColor.rgb *= 0.87 + furNoise * 0.25;
    `);
  };
  const sphereGeometry = new THREE.SphereGeometry(1, 24, 18);
  resources.push(sphereGeometry);
  function oval(group, position, scale, material = coat) {
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.position.set(...position); mesh.scale.set(...scale); group.add(mesh);
    return mesh;
  }
  const torso = oval(body, [-9, 43, 0], [37, 18.5, 13]);
  const shoulder = oval(body, [18, 44, 0], [16, 20, 12]);
  const rump = oval(body, [-31, 42, 0], [19, 21, 14]);
  const neck = oval(body, [29, 53, 0], [12, 17, 10]);
  neck.rotation.z = -.35;
  const head = new THREE.Group();
  head.position.set(35, 61, 0); body.add(head);
  oval(head, [0, 1, 0], [13.5, 12.5, 11]);
  oval(head, [8, -4, 0], [10, 7, 8.5]);
  oval(head, [14.7, -3.4, 0], [2.1, 1.5, 2.8], noseMaterial);
  oval(head, [10, -7.5, 0], [6.5, 2.1, 5]);
  for (const side of [-1, 1]) {
    const earGeometry = new THREE.BufferGeometry();
    const base = side * 7.8;
    earGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
      -8, 8, base - 3, 2, 10, base + 3, -5, 27, base + side * 1.2,
      2, 10, base + 3, -9, 12, base + 2, -5, 27, base + side * 1.2,
      -9, 12, base + 2, -8, 8, base - 3, -5, 27, base + side * 1.2,
      -8, 8, base - 3, -9, 12, base + 2, 2, 10, base + 3
    ], 3));
    earGeometry.computeVertexNormals();
    const ear = new THREE.Mesh(earGeometry, coat); head.add(ear); resources.push(earGeometry);
    const insetGeometry = new THREE.BufferGeometry();
    insetGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
      -5.5, 12, base + 2.4, -.6, 12.5, base + 3.2, -4.5, 23.5, base + side * 1.2 + .5
    ], 3));
    insetGeometry.computeVertexNormals();
    head.add(new THREE.Mesh(insetGeometry, innerEar)); resources.push(insetGeometry);
    const eye = oval(head, [7.9, 3.6, side * 8.4], [3.1, 2.1, 1.2], eyesMaterial);
    eye.rotation.y = side * .38;
    oval(head, [8.6, 3.6, side * 9.25], [.65, 1.9, .6], pupilMaterial);
  }
  const whiskerGeometry = new THREE.BufferGeometry();
  const whiskerPoints = [];
  for (const side of [-1, 1]) for (let index = 0; index < 3; index++) {
    whiskerPoints.push(12, -4.5, side * 7, 19 + index * 2, -2 - index * 2, side * (19 + index));
  }
  whiskerGeometry.setAttribute('position', new THREE.Float32BufferAttribute(whiskerPoints, 3));
  const whiskerMaterial = new THREE.LineBasicMaterial({ color: '#7b7e82', transparent: true, opacity: .3 });
  head.add(new THREE.LineSegments(whiskerGeometry, whiskerMaterial)); resources.push(whiskerGeometry, whiskerMaterial);
  const legs = [];
  for (const rear of [true, false]) for (const side of [-1, 1]) {
    const joint = new THREE.Group(); joint.position.set(rear ? -32 : 22, 40, side * 8.5); body.add(joint);
    const upper = oval(joint, [rear ? 1 : 0, -11.5, 0], [rear ? 9.1 : 5.5, 15, rear ? 8 : 5.1]);
    upper.rotation.z = rear ? -.24 : .03;
    const lowerJoint = new THREE.Group(); lowerJoint.position.set(0, -23, 0); joint.add(lowerJoint);
    oval(lowerJoint, [0, -7.2, 0], [3.5, 10, 3.9]);
    const foot = oval(lowerJoint, [0, -17, .5], [6.1, 3.5, 4.6]);
    legs.push({ joint, lowerJoint, foot, rear, side });
  }
  const tailJoints = [];
  let tailParent = body;
  for (let index = 0; index < 9; index++) {
    const joint = new THREE.Group();
    joint.position.set(index === 0 ? -42 : -6.6, index === 0 ? 48 : 0, 0);
    tailParent.add(joint);
    oval(joint, [-3.4, 0, 0], [5.3, 3.8 - index * .26, 3.8 - index * .26]);
    tailJoints.push(joint); tailParent = joint;
  }
  const shadowCanvas = Object.assign(document.createElement('canvas'), { width: 128, height: 64 });
  const shadowContext = shadowCanvas.getContext('2d');
  const gradient = shadowContext.createRadialGradient(64, 32, 0, 64, 32, 60);
  gradient.addColorStop(0, 'rgba(0,0,0,.75)'); gradient.addColorStop(.45, 'rgba(0,0,0,.4)'); gradient.addColorStop(1, 'rgba(0,0,0,0)');
  shadowContext.fillStyle = gradient; shadowContext.fillRect(0, 0, 128, 64);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, toneMapped: false });
  const shadowGeometry = new THREE.PlaneGeometry(138, 28);
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial); shadow.renderOrder = 7; parent.add(shadow);
  resources.push(shadowTexture, shadowMaterial, shadowGeometry);
  root.traverse(object => { if (object.isMesh || object.isLine) object.renderOrder = 8; });
  let greetingAt = -100;
  let seconds = 0;
  let pose = catPose(0);
  function update(time) {
    seconds = time; pose = catPose(time, greetingAt);
    root.position.set(pose.x, 1024 - pose.screenY, 100);
    root.rotation.x = .12;
    body.rotation.y = Math.PI * (1 - pose.facing) / 2;
    body.rotation.z = pose.pitch;
    body.position.y = -9 * pose.crouch - 7 * pose.sit + Math.sin(pose.gait * 2) * pose.walk * 1.1;
    torso.scale.y = 18.5 + Math.sin(time * 2.1) * .25;
    rump.position.y = 42 - pose.sit * 13;
    torso.rotation.z = pose.sit * .17;
    shoulder.position.y = 44 - pose.crouch * 2;
    head.rotation.z = pose.head + pose.walk * Math.sin(pose.gait) * .025;
    head.rotation.y = Math.sin(time * .52) * .10 + pose.greeting * .27;
    for (const leg of legs) {
      const phase = pose.gait + (leg.side > 0 ? Math.PI : 0) + (leg.rear ? Math.PI * .52 : 0);
      const cycle = ((phase / (Math.PI * 2)) % 1 + 1) % 1;
      const swing = cycle > .6 ? (cycle - .6) / .4 : 0;
      const stride = cycle < .6 ? 16.2 - cycle * 54 : -16.2 + 32.4 * (swing * swing * (3 - 2 * swing));
      const lift = Math.sin(swing * Math.PI) * 8 * pose.walk;
      leg.joint.position.y = 40 - (leg.rear ? 11 * pose.sit : 0);
      const targetX = stride * pose.walk + (leg.rear ? 4 + pose.sit * 4 : 0);
      const targetY = 3.5 + lift - leg.joint.position.y - body.position.y;
      const angles = solveLeg(targetX, targetY, leg.rear ? 1 : -1);
      leg.joint.rotation.z = angles.upper;
      leg.lowerJoint.rotation.z = angles.lower;
      leg.foot.rotation.z = -leg.joint.rotation.z - leg.lowerJoint.rotation.z;
    }
    for (let index = 0; index < tailJoints.length; index++) {
      const joint = tailJoints[index];
      joint.rotation.z = index === 0 ? -.28 - pose.sit * .7 : -.09 + Math.sin(time * 1.3 - index * .45) * .075;
      joint.rotation.y = Math.sin(time * .9 - index * .35) * .065 + pose.greeting * .06;
    }
    const airborne = pose.mode === 'jump' || pose.mode === 'jump-down';
    const ground = airborne ? 778 - (pose.x > 1225 ? 71 : 0) : pose.screenY;
    const separation = Math.max(0, ground - pose.screenY);
    shadow.position.set(pose.x - 5, 1024 - ground - 1, 30);
    shadow.scale.set(1 + separation * .003, 1 + separation * .004, 1);
    shadowMaterial.opacity = .8 / (1 + separation * .022);
  }
  update(0);
  return {
    update,
    greet: () => { greetingAt = seconds; },
    snapshot: () => ({ ...pose, joints: legs.length * 2 + tailJoints.length + 1, model: 'articulated-3d' }),
    dispose: () => { parent.remove(root, shadow); resources.forEach(resource => resource.dispose()); }
  };
}
