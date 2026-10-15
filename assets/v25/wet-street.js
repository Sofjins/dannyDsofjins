export const STREET_SURFACE = Object.freeze({ height: 246, depth: 105, tilt: -Math.asin(.85) });

export function createWetStreet({ THREE, parent, texture }) {
  const geometry = new THREE.PlaneGeometry(1900, 1400);
  const shader = {
    name: 'WetCobblestoneReflection',
    uniforms: { color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null },
      street: { value: texture }, clock: { value: 0 }, catPosition: { value: new THREE.Vector2() } },
    vertexShader: `
      uniform mat4 textureMatrix;
      varying vec4 reflectionUv;
      varying vec3 surfaceWorld;
      void main() {
        reflectionUv = textureMatrix * vec4(position, 1.0);
        surfaceWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse, street;
      uniform float clock;
      uniform vec2 catPosition;
      varying vec4 reflectionUv;
      varying vec3 surfaceWorld;
      float hash(vec2 point) { return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 point) {
        vec2 cell = floor(point), blend = fract(point);
        blend = blend * blend * (3.0 - 2.0 * blend);
        return mix(mix(hash(cell), hash(cell + vec2(1.0, 0.0)), blend.x),
          mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0)), blend.x), blend.y);
      }
      void main() {
        vec2 pixel = vec2(surfaceWorld.x, 1024.0 - surfaceWorld.y);
        vec2 imageUv = pixel / vec2(1536.0, 1024.0);
        imageUv.y = 1.0 - imageUv.y;
        float floorMask = smoothstep(774.0, 793.0, pixel.y);
        floorMask *= 1.0 - smoothstep(1010.0, 1024.0, pixel.y);
        floorMask *= smoothstep(30.0, 150.0, pixel.x) * (1.0 - smoothstep(1320.0, 1470.0, pixel.x));
        float foreground = smoothstep(850.0, 960.0, pixel.y) * (1.0 - smoothstep(120.0, 375.0, pixel.x));
        float lettering = (1.0 - smoothstep(12.0, 31.0, abs(pixel.y - 935.0)))
          * (1.0 - smoothstep(160.0, 210.0, abs(pixel.x - 770.0)));
        float grate = (1.0 - smoothstep(12.0, 22.0, abs(pixel.y - 843.0)))
          * (1.0 - smoothstep(60.0, 82.0, abs(pixel.x - 922.0)));
        floorMask *= (1.0 - foreground) * (1.0 - lettering) * (1.0 - grate);
        vec3 paving = texture2D(street, imageUv).rgb;
        float luminance = dot(paving, vec3(.2126, .7152, .0722));
        float wetness = smoothstep(.007, .18, luminance) * (.42 + .58 * noise(pixel * vec2(.027, .091)));
        float distanceFade = smoothstep(780.0, 1024.0, pixel.y);
        float ripple = sin(pixel.y * .51 + clock * .93 + noise(pixel * .018) * 5.0)
          * sin(pixel.x * .028 - clock * .37);
        vec2 distortion = vec2(ripple * (.2 + distanceFade * .55), sin(pixel.y * .24 - clock * .63) * .18);
        vec2 projected = reflectionUv.xy / reflectionUv.w;
        projected += distortion / vec2(1536.0, 1024.0);
        vec2 blur = vec2(.00065, .0009 + distanceFade * .002);
        vec4 reflection = texture2D(tDiffuse, projected) * .4;
        reflection += texture2D(tDiffuse, projected + blur) * .15;
        reflection += texture2D(tDiffuse, projected - blur) * .15;
        reflection += texture2D(tDiffuse, projected + vec2(blur.x, -blur.y)) * .15;
        reflection += texture2D(tDiffuse, projected + vec2(-blur.x, blur.y)) * .15;
        float catFade = 1.0 - smoothstep(14.0, 125.0, pixel.y - catPosition.y);
        float opacity = reflection.a * (.20 + wetness * .42) * catFade * floorMask;
        gl_FragColor = vec4(reflection.rgb, opacity);
        #include <colorspace_fragment>
      }
    `
  };
  const reflector = new THREE.Reflector(geometry, { textureWidth: 1536, textureHeight: 1024, multisample: 0, shader });
  reflector.name = 'PuddleCatReflection';
  reflector.position.set(768, STREET_SURFACE.height, STREET_SURFACE.depth);
  reflector.rotation.x = STREET_SURFACE.tilt;
  reflector.material.transparent = true;
  reflector.material.depthWrite = false;
  reflector.material.toneMapped = false;
  reflector.renderOrder = 2;
  parent.add(reflector);
  const reflect = reflector.onBeforeRender;
  const clear = new THREE.Color();
  reflector.onBeforeRender = function(renderer, scene, camera) {
    this._getReflectionCamera(camera).layers.set(1);
    renderer.getClearColor(clear);
    const alpha = renderer.getClearAlpha();
    renderer.setClearColor(0x000000, 0);
    try { reflect.call(this, renderer, scene, camera); }
    finally { renderer.setClearColor(clear, alpha); }
  };
  const shadowMaterial = new THREE.ShadowMaterial({ color: 0x040711, opacity: .38, depthWrite: false });
  const shadow = new THREE.Mesh(geometry, shadowMaterial);
  shadow.name = 'CatCastShadowReceiver';
  shadow.position.copy(reflector.position); shadow.rotation.copy(reflector.rotation);
  shadow.receiveShadow = true; shadow.renderOrder = 3; parent.add(shadow);
  const key = new THREE.DirectionalLight(0xffd3aa, 1.5);
  key.position.set(350, 900, 600);
  key.target.position.set(780, 250, 105);
  key.castShadow = true;
  Object.assign(key.shadow.camera, { left: -850, right: 850, top: 500, bottom: -500, near: 1, far: 1800 });
  key.shadow.mapSize.set(2048, 1024);
  key.shadow.bias = -.0003; key.shadow.normalBias = .6;
  key.shadow.radius = 3;
  key.layers.enable(1); parent.add(key, key.target);
  let clock = 0;
  return {
    setVisible(value) { reflector.visible = value; shadow.visible = value; },
    update(seconds, pose) {
      clock = seconds;
      reflector.material.uniforms.clock.value = seconds;
      reflector.material.uniforms.catPosition.value.set(pose?.x ?? 768, pose?.surfaceY ?? 778);
      key.intensity = 1.5 * (1 + Math.sin(seconds * 5.3) * .035);
    },
    snapshot: () => ({ reflection: 'planar-skinned-mesh', shadows: 'pcf-cast-and-contact',
      waterOnly: true, textureSize: [1536, 1024], clock }),
    dispose() { parent.remove(reflector, shadow, key, key.target); reflector.dispose();
      shadowMaterial.dispose(); geometry.dispose(); key.shadow.dispose(); }
  };
}
