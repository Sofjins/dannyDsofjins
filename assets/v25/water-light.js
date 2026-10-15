export const waterLightShader = `
  if (uLive > .5 && px.y > 775.0) {
    float ground = smoothstep(775.0, 805.0, px.y) * (1.0 - smoothstep(1000.0, 1024.0, px.y));
    ground *= smoothstep(40.0, 150.0, px.x) * (1.0 - smoothstep(1320.0, 1480.0, px.x));
    ground *= 1.0 - smoothstep(850.0, 970.0, px.y) * (1.0 - smoothstep(150.0, 380.0, px.x));
    ground *= 1.0 - lightMask(px, vec2(771.0, 936.0), vec2(220.0, 40.0));
    ground *= 1.0 - lightMask(px, vec2(922.0, 844.0), vec2(95.0, 29.0));
    float brilliance = dot(diffuseColor.rgb, vec3(.2126, .7152, .0722));
    float saturation = max(max(diffuseColor.r, diffuseColor.g), diffuseColor.b)
      - min(min(diffuseColor.r, diffuseColor.g), diffuseColor.b);
    float wetHighlight = smoothstep(.012, .13, brilliance) * smoothstep(.015, .09, saturation);
    float wave = sin(px.y * .43 + uClock * .83 + sin(px.x * .037 - uClock * .19) * 2.5);
    wave *= sin(px.x * .022 + uClock * .24);
    vec2 waterUv = vMapUv + vec2(wave * .45, sin(px.y * .23 - uClock * .68) * .12) / vec2(1536.0, 1024.0);
    vec3 refracted = texture2D(uCleanMap, waterUv).rgb;
    diffuseColor.rgb = mix(diffuseColor.rgb, refracted, ground * wetHighlight * .28);
    float reflectionGain = wave * .09;
    reflectionGain += warm * (sin(uClock * 5.3 + 1.8) * .075 + sin(uClock * 12.7) * .025);
    reflectionGain -= lightMask(px, vec2(1085.0, 920.0), vec2(150.0, 150.0)) * hubDip * .19;
    reflectionGain -= lightMask(px, vec2(1190.0, 925.0), vec2(130.0, 150.0)) * dipB * .34;
    diffuseColor.rgb *= exp2(reflectionGain * ground * wetHighlight);
    float coffeeReflection = lightMask(px, vec2(1175.0, 912.0), vec2(52.0, 151.0));
    float glint = pow(max(0.0, sin(px.y * .36 + wave * .4)), 14.0);
    diffuseColor.rgb += vec3(.10, .012, .13) * coffeeReflection * ground * wetHighlight * glint * (1.0 - clamp(dipB, 0.0, 1.0));
  }
`;
