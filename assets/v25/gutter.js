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
    new THREE.Vector3(726, 830, 4), new THREE.Vector3(756, 830, 4),
    new THREE.Vector3(784, 818, 4), new THREE.Vector3(790, 799, 4)
  ]);
  const pipeGeometry = new THREE.TubeGeometry(pipePath, 24, 3.2, 8, false);
  const pipeMaterial = new THREE.MeshStandardMaterial({ color: 0x253037, roughness: .72, metalness: .62 });
  const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial); pipe.renderOrder = 2; root.add(pipe);
  resources.push(pipeGeometry, pipeMaterial);
  const drops = DRIP_STARTS.map(() => {
    const geometry = new THREE.SphereGeometry(1.15, 8, 8);
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
        mesh.position.set(DRIP_SOURCE.x + Math.sin(index * 2.4) * .7, 1024 - state.y, 6);
        mesh.scale.set(.75, 1 + Math.min(2.4, state.speed * .0017), .65);
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
