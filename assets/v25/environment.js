export const environmentFunctions = `
  uniform sampler2D uEnvironment;
  uniform vec4 uEnvironmentTransform;
  vec3 environmentColor(vec2 sourceUv) {
    return texture2D(uEnvironment,sourceUv*uEnvironmentTransform.xy+uEnvironmentTransform.zw).rgb;
  }
  vec3 streetColor(vec2 sourceUv) {
    vec3 source=texture2D(uCleanMap,sourceUv).rgb;
    return mix(source,environmentColor(sourceUv),smoothstep(795.0,831.0,(1.0-sourceUv.y)*1024.0));
  }
`;

export function environmentTransform(horizontal) {
  return horizontal ? [.5,1,.25-15/1086,0]
    : [1,1024/3456,0,1-(1024+1216-1536*42/836)/3456];
}
