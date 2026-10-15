import { createCatActor } from './cat-actor.js?v=living-street-9';

export async function createStreetCat({ THREE, parent }) {
  const loader=new THREE.GLTFLoader();
  const loadModel=async()=>{
    if(!('DecompressionStream' in globalThis))return loader.loadAsync(new URL('./models/black-cat-runtime.glb',import.meta.url).href);
    const response=await fetch(new URL('./models/black-cat-runtime.glb.gz',import.meta.url));
    if(!response.ok)throw new Error('Cat model unavailable');
    const bytes=await response.arrayBuffer(),signature=new Uint8Array(bytes,0,2);
    const buffer=signature[0]===31&&signature[1]===139
      ?await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():bytes;
    return loader.parseAsync(buffer,'');
  };
  const [model,coat]=await Promise.all([
    loadModel(),
    new THREE.TextureLoader().loadAsync(new URL('./models/black-shorthair-fur.webp',import.meta.url).href)
  ]);
  coat.colorSpace = THREE.SRGBColorSpace; coat.flipY = false; coat.anisotropy = 8;
  const oldMaterials = new Set();
  model.scene.traverse(mesh => {
    if (!mesh.isMesh) return;
    oldMaterials.add(mesh.material);
    mesh.material = new THREE.MeshPhysicalMaterial({ map: coat, color: 0xb6b7bc, roughness: .84,
      metalness: 0, sheen: .65, sheenColor: 0x6b717a, sheenRoughness: .86 });
    if (mesh.name.startsWith('Eye')) {
      mesh.material.dispose();
      mesh.material = new THREE.MeshPhysicalMaterial({ color: 0x69734c, roughness: .22, clearcoat: 1, clearcoatRoughness: .12 });
      mesh.material.onBeforeCompile = shader => {
        shader.vertexShader = 'varying vec3 eyePosition;\n' + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\neyePosition = position / .12;');
        shader.fragmentShader = 'varying vec3 eyePosition;\n' + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
          #include <color_fragment>
          float irisRadius = length(eyePosition.xy);
          float pupil = 1.0-smoothstep(.67,.76,length(eyePosition.xy*vec2(4.2,1.1)));
          float fibers = .9+.1*sin(atan(eyePosition.y,eyePosition.x)*73.0+irisRadius*18.0);
          diffuseColor.rgb = mix(vec3(.13,.16,.07)*fibers,vec3(.002,.003,.003),pupil);
          diffuseColor.rgb *= 1.0-smoothstep(.72,1.0,irisRadius)*.8;
        `);
      };
    }
  });
  for (const material of oldMaterials) { material.map?.dispose(); material.dispose(); }
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
    setVisible:value=>{actor.root.visible=value;shadow.visible=value;},
    update, root: actor.root, pose: actor.pose, greet: actor.greet, setSeed: actor.setSeed, snapshot: actor.snapshot,
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
