import { createCatActor } from './cat-actor.js?v=living-street-3';

export async function createStreetCat({ THREE, parent }) {
  const model = await new THREE.GLTFLoader().loadAsync(new URL('./models/somali-cat.glb', import.meta.url).href);
  const seed = new Uint32Array(1); crypto.getRandomValues(seed);
  const actor = createCatActor(THREE, model, seed[0]); parent.add(actor.root);
  const shadowCanvas = Object.assign(document.createElement('canvas'), { width: 128, height: 64 });
  const context = shadowCanvas.getContext('2d'); context.scale(1, .5);
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 60);
  gradient.addColorStop(0, 'rgba(0,0,0,.65)'); gradient.addColorStop(.45, 'rgba(0,0,0,.28)'); gradient.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = gradient; context.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, toneMapped: false });
  const shadowGeometry = new THREE.PlaneGeometry(108, 20);
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial); shadow.renderOrder = 7; parent.add(shadow);
  function update(seconds) {
    actor.update(seconds);
    const pose = actor.pose();
    const separation = Math.max(0, pose.surfaceY - pose.screenY);
    shadow.position.set(pose.x, 1024 - pose.surfaceY - 1, 30);
    const sitting = pose.mode === 'sit' || pose.mode === 'perch';
    shadow.scale.set((sitting ? .6 : 1) + separation * .002, 1 + separation * .004, 1);
    shadowMaterial.opacity = .85 / (1 + separation * .025);
  }
  update(0);
  return {
    update, pose: actor.pose, greet: actor.greet, setSeed: actor.setSeed, snapshot: actor.snapshot,
    dispose() {
      actor.dispose(); parent.remove(actor.root, shadow);
      const resources = new Set([shadowTexture, shadowMaterial, shadowGeometry]);
      model.scene.traverse(object => {
        if (!object.isMesh) return;
        resources.add(object.geometry); resources.add(object.material);
        for (const value of Object.values(object.material)) if (value?.isTexture) resources.add(value);
        object.skeleton?.dispose();
      });
      resources.forEach(resource => resource.dispose());
    }
  };
}
