export function createViewportMist({ THREE, stage }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'viewport-mist'; canvas.setAttribute('aria-hidden', 'true'); stage.append(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 10); camera.position.z = 1;
  const geometry = new THREE.PlaneGeometry(2, 2);
  const uniforms = { clock: { value: 0 }, viewport: { value: new THREE.Vector2(1, 1) },
    artOrigin: { value: new THREE.Vector2() }, artScale: { value: 1 } };
  const material = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms,
    vertexShader: `varying vec2 screenUv; void main() { screenUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `
      uniform float clock, artScale;
      uniform vec2 viewport, artOrigin;
      varying vec2 screenUv;
      float hash(vec2 point) { return fract(sin(dot(point,vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 point) {
        vec2 cell=floor(point), blend=fract(point); blend=blend*blend*blend*(blend*(blend*6.0-15.0)+10.0);
        return mix(mix(hash(cell),hash(cell+vec2(1.0,0.0)),blend.x),mix(hash(cell+vec2(0.0,1.0)),hash(cell+1.0),blend.x),blend.y);
      }
      float cloud(vec2 point) {
        return noise(point)*.57+noise(point*2.02+3.7)*.27+noise(point*4.07+9.1)*.11+noise(point*8.13)*.05;
      }
      void main() {
        vec2 pixel = (vec2(screenUv.x, 1.0-screenUv.y)*viewport-artOrigin)/artScale;
        vec2 drift=pixel*vec2(.0035,.006)+vec2(-clock*.065,clock*.008);
        float curl=cloud(drift*.6+vec2(clock*.014,0.0));
        float vapor=smoothstep(.31,.76,cloud(drift+vec2(curl*1.4,curl*.5)));
        float foreground=smoothstep(.30,.78,cloud(drift*.72+vec2(-clock*.022,6.4)));
        float facade=smoothstep(.38,.79,cloud(drift*.6+vec2(8.3,clock*.006)));
        float lowMist=exp(-pow((pixel.y-815.0)/205.0,2.0));
        float nearMist=exp(-pow((pixel.y-990.0)/270.0,2.0));
        float sideMist=exp(-pow((pixel.y-570.0)/280.0,2.0));
        float outside=1.0-smoothstep(-190.0,160.0,pixel.x);
        outside=max(outside,smoothstep(1376.0,1726.0,pixel.x));
        outside=max(outside,smoothstep(1024.0,1480.0,pixel.y));
        outside=max(outside,1.0-smoothstep(-300.0,-20.0,pixel.y));
        float alpha=vapor*lowMist*.23+foreground*nearMist*.16;
        alpha+=facade*sideMist*.065+vapor*outside*.065;
        alpha*=max(smoothstep(190.0,320.0,pixel.y),outside);
        vec3 tint=mix(vec3(.20,.17,.145),vec3(.12,.22,.31),smoothstep(200.0,1200.0,pixel.x));
        gl_FragColor=vec4(tint,alpha);
        #include <colorspace_fragment>
      }
    ` });
  scene.add(new THREE.Mesh(geometry, material));
  let last = -1, enabled = false;
  return {
    layout(width, height, framing) {
      const scale=Math.min(1,960/width,1120/height,Math.sqrt(650000/(width*height)));
      renderer.setSize(Math.round(width*scale),Math.round(height*scale),false);
      uniforms.viewport.value.set(width, height);
      uniforms.artOrigin.value.set(framing.left-framing.artWidth/2, framing.top-framing.artHeight/2);
      uniforms.artScale.value = framing.scale; last = -1;
    },
    enable(value) { enabled = value; canvas.hidden = !value; last = -1; },
    update(seconds, force = false) {
      if (!enabled || !force && Math.abs(seconds-last) < .029) return;
      last = seconds; uniforms.clock.value = seconds; renderer.render(scene, camera);
    },
    dispose() { geometry.dispose(); material.dispose(); renderer.dispose(); canvas.remove(); }
  };
}
