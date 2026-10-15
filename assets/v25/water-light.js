export const waterLightShader = `
  if(uLive>.5 && px.y>780.0) {
    float ground=smoothstep(780.0,815.0,px.y)*(1.0-smoothstep(1000.0,1024.0,px.y));
    ground*=smoothstep(0.0,70.0,px.x)*(1.0-smoothstep(1466.0,1536.0,px.x));
    float brilliance=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));
    float wetHighlight=smoothstep(.012,.16,brilliance);
    float wave=sin(px.y*.43+uClock*.83+sin(px.x*.037-uClock*.19)*2.5)*sin(px.x*.022+uClock*.24);
    vec2 waterUv=vMapUv+vec2(wave*.45,sin(px.y*.23-uClock*.68)*.12)/vec2(1536.0,1024.0);
    diffuseColor.rgb=mix(diffuseColor.rgb,streetColor(waterUv),ground*wetHighlight*.24);
    float reflectionGain=wave*.07+warm*(sin(uClock*5.3+1.8)*.065+sin(uClock*12.7)*.02);
    reflectionGain+=lightMask(px,vec2(1085.0,920.0),vec2(150.0,150.0))*(uNeonA.y-1.0)*.13;
    diffuseColor.rgb*=exp2(reflectionGain*ground*wetHighlight);
    float curb=829.0+sin((px.x-768.0)*.002)*1.5;
    float sidewalk=1.0-smoothstep(curb-7.0,curb-2.0,px.y);
    float road=smoothstep(curb+14.0,curb+20.0,px.y);
    float surfaceOffset=px.y>curb?24.0:0.0;
    vec2 reflectionPoint=vec2(px.x+wave*2.1,1508.0+surfaceOffset-px.y+sin(px.y*.35-uClock*.4)*1.5);
    vec3 reflectedSign=texture2D(uCleanMap,vec2(reflectionPoint.x/1536.0,1.0-reflectionPoint.y/1024.0)).rgb;
    float coffee=signBounds(reflectionPoint,vec4(1128.0,563.0,78.0,85.0));
    float opening=signBounds(reflectionPoint,vec4(1134.0,648.0,67.0,42.0));
    float reflectedEmission=tubeEmission(reflectedSign);
    float breakup=.12+.88*pow(max(0.0,sin(px.y*.48+wave*.7)),2.0);
    diffuseColor.rgb+=reflectedSign*reflectedEmission*(coffee*uNeonB.y+opening*uNeonB.z)*breakup*ground*(sidewalk*.55+road)*(.25+wetHighlight*.75)*.42;
  }
`;
