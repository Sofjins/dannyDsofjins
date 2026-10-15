import { neonLevels, neonFunctions } from './neon.js?v=living-street-9';

export const DRAIN_VENT = { x: 912, y: 842, width: 106, rise: 158 };

export function createViewportMist({ THREE, stage, prepared }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'viewport-mist'; canvas.setAttribute('aria-hidden', 'true'); stage.append(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 10); camera.position.z = 1;
  const geometry = new THREE.PlaneGeometry(2, 2);
  const textures=[];
  const textureFor=image=>{
    const texture=new THREE.Texture(image);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;
    texture.generateMipmaps=false;texture.minFilter=texture.magFilter=THREE.LinearFilter;
    textures.push(texture);return texture;
  };
  const uniforms = { clock: { value: 0 }, viewport: { value: new THREE.Vector2(1, 1) },
    artOrigin: { value: new THREE.Vector2() }, artScale: { value: 1 },
    drainVent: { value: new THREE.Vector4(DRAIN_VENT.x,DRAIN_VENT.y,DRAIN_VENT.width,DRAIN_VENT.rise) },
    steamStrength: { value: 1 },shadeStrength:{value:1},
    sceneMap:{value:textureFor(prepared.clean)},
    leftLamp:{value:textureFor(prepared.lanterns[0].texture)},rightLamp:{value:textureFor(prepared.lanterns[1].texture)},
    lampAngles:{value:new THREE.Vector2()},lampLevels:{value:new THREE.Vector2(1,1)},
    uNeonA:{value:new THREE.Vector4(1,1,1,1)},uNeonB:{value:new THREE.Vector4(1,1,1,1)} };
  const material = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms,
    vertexShader: `varying vec2 screenUv; void main() { screenUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `
      uniform float clock, artScale, steamStrength, shadeStrength;
      uniform vec2 viewport, artOrigin;
      uniform vec4 drainVent;
      uniform sampler2D sceneMap,leftLamp,rightLamp;
      uniform vec2 lampAngles,lampLevels;
      varying vec2 screenUv;
      ${neonFunctions}
      float hash(vec2 point) { return fract(sin(dot(point,vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 point) {
        vec2 cell=floor(point), blend=fract(point); blend=blend*blend*blend*(blend*(blend*6.0-15.0)+10.0);
        return mix(mix(hash(cell),hash(cell+vec2(1.0,0.0)),blend.x),mix(hash(cell+vec2(0.0,1.0)),hash(cell+1.0),blend.x),blend.y);
      }
      float cloud(vec2 point) {
        return noise(point)*.57+noise(point*2.02+3.7)*.27+noise(point*4.07+9.1)*.11+noise(point*8.13)*.05;
      }
      float drainSteam(vec2 pixel) {
        float height=drainVent.y-pixel.y;
        if(height < -5.0 || height > drainVent.w || abs(pixel.x-drainVent.x)>190.0) return 0.0;
        float rise=max(0.0,height)/drainVent.w;
        float dissolve=smoothstep(-4.0,7.0,height)*(1.0-smoothstep(.36,1.0,rise));
        float plume=0.0;
        for(int strand=0;strand<4;strand++) {
          float phase=float(strand)*1.73;
          float source=drainVent.x+(float(strand)-1.5)*drainVent.z*.22;
          float bend=pow(rise,1.35)*35.0+sin(height*.037-clock*.64+phase)*rise*14.0;
          float distance=(pixel.x-source-bend)/(4.0+rise*29.0);
          float eddy=cloud(vec2((pixel.x-source)*.037+phase,height*.024+clock*.48));
          float wisp=smoothstep(.26,.73,eddy);
          float breath=.82+.18*sin(clock*.73+phase);
          plume+=exp(-distance*distance*1.6)*wisp*breath;
        }
        return (1.0-exp(-plume*1.5))*dissolve*steamStrength;
      }
      float lampEmission(sampler2D lamp,vec2 pixel,vec4 bounds,vec2 pivot,float angle,float intensity) {
        vec2 offset=pixel-pivot;
        vec2 local=pivot+mat2(cos(angle),sin(angle),-sin(angle),cos(angle))*offset;
        vec2 lampUv=(local-bounds.xy)/bounds.zw;
        if(any(lessThan(lampUv,vec2(0.0)))||any(greaterThan(lampUv,vec2(1.0))))return 0.0;
        vec4 color=texture2D(lamp,vec2(lampUv.x,1.0-lampUv.y));
        return smoothstep(.025,.14,color.r*intensity)*color.a;
      }
      float glow(vec2 point,vec2 center,vec2 radius) {
        vec2 offset=(point-center)/radius;
        float falloff=exp(-dot(offset,offset)*2.0);
        return falloff*smoothstep(.0001,.0004,falloff);
      }
      float protectedLight(vec2 pixel) {
        if(any(lessThan(pixel,vec2(0.0)))||any(greaterThan(pixel,vec2(1536.0,1024.0))))return 0.0;
        vec3 color=texture2D(sceneMap,vec2(pixel.x/1536.0,1.0-pixel.y/1024.0)).rgb;
        float tubes=signBounds(pixel,vec4(880.0,200.0,240.0,68.0))*uNeonA.x;
        tubes+=signBounds(pixel,vec4(1120.0,200.0,106.0,68.0))*uNeonA.y;
        tubes+=signBounds(pixel,vec4(1254.0,136.0,181.0,48.0))*uNeonA.z;
        tubes+=signBounds(pixel,vec4(1254.0,190.0,181.0,43.0))*uNeonA.w;
        tubes+=signBounds(pixel,vec4(1254.0,235.0,181.0,46.0))*uNeonB.x;
        tubes+=signBounds(pixel,vec4(1128.0,563.0,78.0,85.0))*uNeonB.y;
        tubes+=signBounds(pixel,vec4(1134.0,648.0,67.0,42.0))*uNeonB.z;
        tubes+=signBounds(pixel,vec4(1338.0,334.0,43.0,132.0))*uNeonB.w;
        float protection=tubeEmission(color)*clamp(tubes,0.0,1.0);
        protection=max(protection,lampEmission(leftLamp,pixel,vec4(116.0,214.0,100.0,176.0),vec2(164.0,224.0),lampAngles.x,lampLevels.x));
        protection=max(protection,lampEmission(rightLamp,pixel,vec4(618.0,205.0,104.0,196.0),vec2(669.0,214.0),lampAngles.y,lampLevels.y));
        float warmFixture=glow(pixel,vec2(64.0,69.0),vec2(13.0,24.0));
        warmFixture+=glow(pixel,vec2(782.0,389.0),vec2(12.0,26.0));
        warmFixture+=glow(pixel,vec2(710.0,690.0),vec2(35.0,49.0));
        warmFixture+=glow(pixel,vec2(475.0,559.0),vec2(12.0,19.0));
        warmFixture+=glow(pixel,vec2(583.0,447.0),vec2(12.0,19.0));
        return max(protection,smoothstep(.05,.24,color.r)*smoothstep(.08,.35,warmFixture));
      }
      vec3 scatteredLight(vec2 pixel) {
        float lampHaze=(glow(pixel,vec2(164.0,304.0),vec2(97.0,115.0))*lampLevels.x
          +glow(pixel,vec2(670.0,303.0),vec2(100.0,118.0))*lampLevels.y)*smoothstep(193.0,235.0,pixel.y);
        float amber=lampHaze*.11+glow(pixel,vec2(710.0,690.0),vec2(54.0,72.0))*.035;
        amber+=glow(pixel,vec2(782.0,389.0),vec2(30.0,53.0))*(.026+.004*sin(clock*2.8));
        float blue=glow(pixel,vec2(1043.0,234.0),vec2(220.0,61.0))*.075*(uNeonA.x*.65+uNeonA.y*.35);
        blue+=glow(pixel,vec2(1358.0,401.0),vec2(43.0,98.0))*.052*uNeonB.w;
        blue+=glow(pixel,vec2(1167.0,671.0),vec2(45.0,35.0))*.025*uNeonB.z;
        float violet=glow(pixel,vec2(1167.0,610.0),vec2(62.0,77.0))*.072*uNeonB.y;
        violet+=glow(pixel,vec2(1344.0,211.0),vec2(112.0,39.0))*.035*uNeonA.w;
        blue+=glow(pixel,vec2(1344.0,161.0),vec2(110.0,37.0))*.024*uNeonA.z;
        blue+=glow(pixel,vec2(1344.0,258.0),vec2(110.0,38.0))*.028*uNeonB.x;
        float red=glow(pixel,vec2(64.0,69.0),vec2(36.0,56.0))*(.043+.006*sin(clock*1.6));
        return vec3(.86,.28,.075)*amber+vec3(.055,.48,.82)*blue+vec3(.65,.17,.64)*violet+vec3(.9,.06,.025)*red;
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
        float steam=drainSteam(pixel)*.31;
        tint=mix(tint,vec3(.29,.36,.40),steam/max(.001,alpha+steam));
        alpha=1.0-(1.0-alpha)*(1.0-steam);
        float protection=protectedLight(pixel);
        alpha*=1.0-protection*.96;
        vec2 screen=vec2(screenUv.x,1.0-screenUv.y);
        float sideShade=.47*(1.0-smoothstep(0.0,.31,screen.x))+.55*smoothstep(.69,1.0,screen.x);
        vec2 focus=vec2(1536.0*.68,1024.0*.72)*artScale;
        float radial=length((screen-vec2(.5,.54))*viewport/focus);
        float radialShade=.34*smoothstep(.38,.80,radial)+.35*smoothstep(.80,1.25,radial);
        float shade=(1.0-(1.0-sideShade)*(1.0-radialShade))*(1.0-protection)*shadeStrength;
        vec3 haze=scatteredLight(pixel)*(.72+vapor*.65)*(1.0-protection*.88);
        float glowAlpha=max(haze.r,max(haze.g,haze.b));
        vec3 color=(vec3(.0003,.0015,.0033)*shade*(1.0-alpha)+tint*alpha)*(1.0-glowAlpha)+haze;
        float opacity=1.0-(1.0-shade)*(1.0-alpha)*(1.0-glowAlpha);
        gl_FragColor=vec4(color/max(.00001,opacity),opacity);
        #include <colorspace_fragment>
      }
    ` });
  scene.add(new THREE.Mesh(geometry, material));
  stage.dataset.atmosphere='composited';
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
    setSteamEnabled(value) { uniforms.steamStrength.value=value?1:0; last=-1; },
    setShadeEnabled(value) { uniforms.shadeStrength.value=value?1:0; last=-1; },
    snapshot: () => ({ drain:DRAIN_VENT,steam:uniforms.steamStrength.value>0,lightProtection:'emissive-pixels',scattering:true }),
    update(seconds, force = false, lamps = []) {
      if (!enabled || !force && Math.abs(seconds-last) < .029) return;
      last = seconds; uniforms.clock.value = seconds;
      const neon=neonLevels(seconds);uniforms.uNeonA.value.fromArray(neon);uniforms.uNeonB.value.fromArray(neon,4);
      if(lamps.length===2){
        uniforms.lampAngles.value.set(lamps[0].angle,lamps[1].angle);
        uniforms.lampLevels.value.set(lamps[0].intensity,lamps[1].intensity);
      }
      renderer.render(scene, camera);
    },
    dispose() { delete stage.dataset.atmosphere; textures.forEach(texture=>texture.dispose()); geometry.dispose(); material.dispose(); renderer.dispose(); canvas.remove(); }
  };
}
