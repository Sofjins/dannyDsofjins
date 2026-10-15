export const DRIP_CYCLE = 7.4;
export const DRIP_STARTS = [.8, 1.16, 1.72];
export const DRIP_SOURCE = { x: 790, y: 226 };
export const BOWL = { x: 790, y: 754 };
const gravity = 1580;
export const FALL_TIME = Math.sqrt(2 * (BOWL.y - DRIP_SOURCE.y) / gravity);

export function dripState(seconds, index) {
  const phase = ((seconds % DRIP_CYCLE) + DRIP_CYCLE) % DRIP_CYCLE;
  const age = phase - DRIP_STARTS[index];
  const impactAge = age - FALL_TIME;
  return { falling: age >= 0 && age < FALL_TIME,
    y: Math.min(BOWL.y, DRIP_SOURCE.y + .5 * gravity * Math.max(0, age) ** 2),
    speed: gravity * Math.max(0, age), impactAge,
    ripple: impactAge >= 0 && impactAge < .85 };
}

export function createGutter({ THREE, parent }) {
  const root = new THREE.Group(); root.name = 'GutterAndBowl'; parent.add(root);
  const resources = [];
  const pipePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(728, 827, 10), new THREE.Vector3(754, 826, 10),
    new THREE.Vector3(775, 823, 10), new THREE.Vector3(786, 815, 12),
    new THREE.Vector3(790, 798, 15)
  ]);
  const pipeGeometry = new THREE.TubeGeometry(pipePath, 48, 4.4, 20, false);
  const pipeMaterial = new THREE.MeshStandardMaterial({ color: 0x393b34, roughness: .65, metalness: .68, side: THREE.DoubleSide });
  pipeMaterial.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      #include <color_fragment>
      float oxidation = fract(sin(dot(floor(vViewPosition * 1.3), vec3(12.9898,78.233,44.137))) * 43758.5453);
      diffuseColor.rgb *= .72 + oxidation * .45;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.035,.052,.043), smoothstep(.82,.98,oxidation) * .32);
    `);
  };
  const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial); pipe.renderOrder = 2; root.add(pipe);
  resources.push(pipeGeometry, pipeMaterial);
  const boreGeometry = new THREE.TubeGeometry(pipePath, 48, 3.4, 20, false);
  const boreMaterial = new THREE.MeshStandardMaterial({ color: 0x121c1c, roughness: .9, side: THREE.DoubleSide });
  const bore = new THREE.Mesh(boreGeometry, boreMaterial); bore.renderOrder = 2; root.add(bore);
  resources.push(boreGeometry, boreMaterial);
  for (const progress of [.10, .53, 1]) {
    const geometry = new THREE.TorusGeometry(progress === 1 ? 3.9 : 4.5, progress === 1 ? .52 : .68, 8, 24);
    const collar = new THREE.Mesh(geometry, pipeMaterial);
    collar.position.copy(pipePath.getPointAt(progress));
    collar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pipePath.getTangentAt(progress));
    collar.renderOrder = 3; root.add(collar); resources.push(geometry);
  }
  const drops = DRIP_STARTS.map(() => {
    const geometry = new THREE.SphereGeometry(.8, 12, 12);
    const material = new THREE.MeshStandardMaterial({ color: 0xb8d6de, roughness: .12, metalness: .35,
      transparent: true, opacity: .64, depthWrite: false });
    const mesh = new THREE.Mesh(geometry, material); mesh.renderOrder = 3; root.add(mesh);
    const ringGeometry = new THREE.RingGeometry(.86, 1, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xa5c3ce, transparent: true, opacity: 0, depthWrite: false });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(BOWL.x, 1024 - BOWL.y, 22); ring.renderOrder = 7; root.add(ring);
    const splashGeometry = new THREE.SphereGeometry(.65, 6, 6);
    const splash = new THREE.Mesh(splashGeometry, material); splash.renderOrder = 7; root.add(splash);
    resources.push(geometry, material, ringGeometry, ringMaterial, splashGeometry);
    return { mesh, ring, splash };
  });
  let clock = 0;
  return {
    update(seconds) {
      clock = seconds;
      drops.forEach(({ mesh, ring, splash }, index) => {
        const state = dripState(seconds, index);
        mesh.visible = state.falling;
        mesh.position.set(DRIP_SOURCE.x + Math.sin(index * 2.4) * .5, 1024 - state.y, 16);
        mesh.scale.set(.8, 1 + Math.min(1.8, state.speed * .0012), .75);
        ring.visible = state.ripple;
        const progress = Math.max(0, state.impactAge) / .85;
        const radius = 1 + progress * 17;
        ring.scale.set(radius, radius * .23, 1);
        ring.material.opacity = .52 * (1 - Math.min(1, progress)) ** 1.5;
        splash.visible = state.impactAge >= 0 && state.impactAge < .19;
        splash.position.set(BOWL.x + index - 1, 1024 - BOWL.y + Math.sin(Math.max(0, state.impactAge) / .19 * Math.PI) * 3, 23);
      });
    },
    snapshot: () => ({ dropsPerCycle: DRIP_STARTS.length, cycle: DRIP_CYCLE,
      active: drops.filter(drop => drop.mesh.visible).length, clock, source: DRIP_SOURCE, bowl: BOWL }),
    dispose() { parent.remove(root); resources.forEach(resource => resource.dispose()); }
  };
}
