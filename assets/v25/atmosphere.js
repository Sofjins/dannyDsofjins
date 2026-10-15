export function createAtmosphere({ THREE, parent }) {
  const resources = [];
  const layers = [];
  const vertexShader = `
    varying vec2 mistUv;
    void main() {
      mistUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fragmentShader = `
    uniform float clock, seed, density;
    uniform vec3 cold, warm;
    varying vec2 mistUv;
    float hashNoise(vec2 point) {
      return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 point) {
      vec2 cell = floor(point), fraction = fract(point);
      fraction = fraction * fraction * (3.0 - 2.0 * fraction);
      return mix(mix(hashNoise(cell), hashNoise(cell + vec2(1.0, 0.0)), fraction.x),
        mix(hashNoise(cell + vec2(0.0, 1.0)), hashNoise(cell + vec2(1.0, 1.0)), fraction.x), fraction.y);
    }
    float cloud(vec2 point) {
      return noise(point) * .54 + noise(point * 2.03 + 7.2) * .27 + noise(point * 4.13 + 19.1) * .13 + noise(point * 8.37) * .06;
    }
    void main() {
      vec2 position = mistUv * vec2(5.8, 3.1);
      position.x += clock * .027 + seed;
      position.y += sin(position.x * .9 + clock * .07 + seed) * .22;
      float turbulence = cloud(position + cloud(position * .73 + clock * .015));
      float envelope = smoothstep(0.0, .18, mistUv.y) * (1.0 - smoothstep(.35, 1.0, mistUv.y));
      envelope *= smoothstep(0.0, .09, mistUv.x) * (1.0 - smoothstep(.91, 1.0, mistUv.x));
      float wisp = smoothstep(.32, .76, turbulence);
      vec3 tint = mix(warm, cold, smoothstep(.28, .76, mistUv.x));
      gl_FragColor = vec4(tint, envelope * wisp * density);
      #include <colorspace_fragment>
    }
  `;
  for (const [index, width, height, centerY, depth, density] of [
    [0, 1710, 300, 211, 18, .19],
    [1, 1800, 290, 87, 160, .17],
    [2, 540, 240, 142, 175, .12]
  ]) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.ShaderMaterial({
      uniforms: { clock: { value: 0 }, seed: { value: index * 8.37 }, density: { value: density },
        cold: { value: new THREE.Color('#63859b') }, warm: { value: new THREE.Color('#8f8177') } },
      vertexShader, fragmentShader, transparent: true, depthWrite: false, toneMapped: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(index === 2 ? 210 : 768, centerY, depth); mesh.renderOrder = 11 + index;
    parent.add(mesh); layers.push(mesh); resources.push(geometry, material);
  }
  return {
    update: seconds => layers.forEach(layer => { layer.material.uniforms.clock.value = seconds; }),
    snapshot: () => ({ layers: layers.length, animated: true }),
    dispose: () => { layers.forEach(layer => parent.remove(layer)); resources.forEach(resource => resource.dispose()); }
  };
}
