const dip = (seconds, period, center, width) => {
  const distance = Math.abs(((seconds % period) + period) % period - center);
  const blend = Math.max(0, Math.min(1, (distance - width * .55) / (width * .45)));
  return 1 - blend * blend * (3 - 2 * blend);
};

export function neonLevels(seconds) {
  const coffee = Math.max(dip(seconds,11.7,2.4,.13),dip(seconds,11.7,2.82,.075),
    dip(seconds,11.7,3.4,.29),dip(seconds,11.7,7.9,.09));
  return [
    .98 + .025 * Math.sin(seconds * 1.7),
    1 - .62 * dip(seconds,17.3,5.5,.09) - .28 * dip(seconds,17.3,5.77,.06),
    .94 + .045 * Math.sin(seconds * 2.7),
    1 - .85 * dip(seconds,9.1,4.6,.15) - .42 * dip(seconds,9.1,4.95,.075),
    .96 + .035 * Math.sin(seconds * 1.8 + 4),
    1 - coffee * .94,
    .95 + .035 * Math.sin(seconds * 1.9 + 3),
    1 - .72 * dip(seconds,16.7,6.2,.16) - .45 * dip(seconds,16.7,6.65,.07)
  ];
}

export const neonFunctions = `
  uniform vec4 uNeonA, uNeonB;
  float signBounds(vec2 point,vec4 bounds) {
    vec2 edge=min(point-bounds.xy,bounds.xy+bounds.zw-point);
    return smoothstep(0.0,2.0,min(edge.x,edge.y));
  }
  float tubeEmission(vec3 color) {
    float colored=max(color.b,color.r)-min(color.r,min(color.g,color.b));
    float brightness=max(color.r,max(color.g,color.b));
    return smoothstep(.015,.20,brightness)*smoothstep(.008,.06,colored);
  }
  vec3 modulateTube(vec3 color,vec2 point,vec4 bounds,float intensity) {
    float mask=signBounds(point,bounds)*tubeEmission(color);
    return color*(1.0+mask*(intensity-1.0));
  }
`;

export const neonShader = `
  if(uLive>.5) {
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(880.0,200.0,240.0,68.0),uNeonA.x);
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(1120.0,200.0,106.0,68.0),uNeonA.y);
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(1254.0,136.0,181.0,48.0),uNeonA.z);
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(1254.0,190.0,181.0,43.0),uNeonA.w);
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(1254.0,235.0,181.0,46.0),uNeonB.x);
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(1128.0,563.0,78.0,85.0),uNeonB.y);
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(1134.0,648.0,67.0,42.0),uNeonB.z);
    diffuseColor.rgb=modulateTube(diffuseColor.rgb,px,vec4(1338.0,334.0,43.0,132.0),uNeonB.w);
  }
`;
