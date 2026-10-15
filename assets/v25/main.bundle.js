var Bu=Object.defineProperty;var Ot=(e,t)=>()=>(e&&(t=e(e=0)),t);var Pn=(e,t)=>{for(var i in t)Bu(e,i,{get:t[i],enumerable:!0})};function Ca(e){let t=Math.max(ui(e,11.7,2.4,.13),ui(e,11.7,2.82,.075),ui(e,11.7,3.4,.29),ui(e,11.7,7.9,.09));return[.98+.025*Math.sin(e*1.7),1-.62*ui(e,17.3,5.5,.09)-.28*ui(e,17.3,5.77,.06),.94+.045*Math.sin(e*2.7),1-.85*ui(e,9.1,4.6,.15)-.42*ui(e,9.1,4.95,.075),.96+.035*Math.sin(e*1.8+4),1-t*.94,.95+.035*Math.sin(e*1.9+3),1-.72*ui(e,16.7,6.2,.16)-.45*ui(e,16.7,6.65,.07)]}var ui,ul,dl,In=Ot(()=>{ui=(e,t,i,r)=>{let a=Math.abs((e%t+t)%t-i),n=Math.max(0,Math.min(1,(a-r*.55)/(r*.45)));return 1-n*n*(3-2*n)};ul=`
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
`,dl=`
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
`});var tu={};Pn(tu,{AmbientLight:()=>pf,AnimationMixer:()=>Cf,Box3:()=>Mi,BufferAttribute:()=>Ct,BufferGeometry:()=>Pt,CanvasTexture:()=>Sp,CatmullRomCurve3:()=>Th,Color:()=>ze,CylinderGeometry:()=>bp,DirectionalLight:()=>kh,DoubleSide:()=>ti,DynamicDrawUsage:()=>Sd,EllipseCurve:()=>Bo,Float32BufferAttribute:()=>st,GLTFLoader:()=>R_,Group:()=>qi,HemisphereLight:()=>lf,Line:()=>bn,LineBasicMaterial:()=>Oo,LineSegments:()=>_h,LinearFilter:()=>Mt,MathUtils:()=>ah,Matrix4:()=>Ve,Mesh:()=>Dt,MeshBasicMaterial:()=>Yi,MeshPhysicalMaterial:()=>oi,MeshStandardMaterial:()=>Tn,NoToneMapping:()=>ri,OrthographicCamera:()=>Ea,PCFSoftShadowMap:()=>zc,PlaneGeometry:()=>ko,PointLight:()=>zh,Quaternion:()=>Ht,Raycaster:()=>Lf,Reflector:()=>Qh,RepeatWrapping:()=>cr,RingGeometry:()=>zp,SRGBColorSpace:()=>Et,Scene:()=>ip,ShaderMaterial:()=>Zt,ShadowMaterial:()=>Hp,SphereGeometry:()=>kp,Texture:()=>Lt,TextureLoader:()=>Fh,TorusGeometry:()=>Gp,TubeGeometry:()=>Vp,Vector2:()=>Pe,Vector3:()=>L,WebGLRenderer:()=>E_});function yd(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function bd(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function ba(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Td(){let e=ba("canvas");return e.style.display="block",e}function xn(...e){let t="THREE."+e.shift();Br?Br("log",t,...e):console.log(t,...e)}function rh(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let i=e[1];i&&i.isStackTrace?e[0]+=" "+i.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function be(...e){e=rh(e);let t="THREE."+e.shift();if(Br)Br("warn",t,...e);else{let i=e[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...e)}}function Ue(...e){e=rh(e);let t="THREE."+e.shift();if(Br)Br("error",t,...e);else{let i=e[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...e)}}function ho(...e){let t=e.join(" ");t in yl||(yl[t]=!0,be(...e))}function wd(e,t,i){return new Promise(function(r,a){function n(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(n,i);break;default:r()}}setTimeout(n,i)})}function ai(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(At[e&255]+At[e>>8&255]+At[e>>16&255]+At[e>>24&255]+"-"+At[t&255]+At[t>>8&255]+"-"+At[t>>16&15|64]+At[t>>24&255]+"-"+At[i&63|128]+At[i>>8&255]+"-"+At[i>>16&255]+At[i>>24&255]+At[r&255]+At[r>>8&255]+At[r>>16&255]+At[r>>24&255]).toLowerCase()}function qe(e,t,i){return Math.max(t,Math.min(i,e))}function Po(e,t){return(e%t+t)%t}function Ad(e,t,i,r,a){return r+(e-t)*(a-r)/(i-t)}function Rd(e,t,i){return e!==t?(i-e)/(t-e):0}function fa(e,t,i){return(1-i)*e+i*t}function Cd(e,t,i,r){return fa(e,t,1-Math.exp(-i*r))}function Ld(e,t=1){return t-Math.abs(Po(e,t*2)-t)}function Pd(e,t,i){return e<=t?0:e>=i?1:(e=(e-t)/(i-t),e*e*(3-2*e))}function Id(e,t,i){return e<=t?0:e>=i?1:(e=(e-t)/(i-t),e*e*e*(e*(e*6-15)+10))}function Nd(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Dd(e,t){return e+Math.random()*(t-e)}function Ud(e){return e*(.5-Math.random())}function Od(e){e!==void 0&&(bl=e);let t=bl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fd(e){return e*pa}function Bd(e){return e*zr}function zd(e){return(e&e-1)===0&&e!==0}function kd(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function Gd(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function Vd(e,t,i,r,a){let n=Math.cos,s=Math.sin,o=n(i/2),l=s(i/2),c=n((t+r)/2),h=s((t+r)/2),d=n((t-r)/2),u=s((t-r)/2),p=n((r-t)/2),v=s((r-t)/2);switch(a){case"XYX":e.set(o*h,l*d,l*u,o*c);break;case"YZY":e.set(l*u,o*h,l*d,o*c);break;case"ZXZ":e.set(l*d,l*u,o*h,o*c);break;case"XZX":e.set(o*h,l*v,l*p,o*c);break;case"YXY":e.set(l*p,o*h,l*v,o*c);break;case"ZYZ":e.set(l*v,l*p,o*h,o*c);break;default:be("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function ii(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function et(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}function Hd(){let e={enabled:!0,workingColorSpace:Wt,spaces:{},convert:function(a,n,s){return this.enabled===!1||n===s||!n||!s||(this.spaces[n].transfer===Qe&&(a.r=Ii(a.r),a.g=Ii(a.g),a.b=Ii(a.b)),this.spaces[n].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[n].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Qe&&(a.r=Dr(a.r),a.g=Dr(a.g),a.b=Dr(a.b))),a},workingToColorSpace:function(a,n){return this.convert(a,this.workingColorSpace,n)},colorSpaceToWorking:function(a,n){return this.convert(a,n,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===ji?_n:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,n=this.workingColorSpace){return a.fromArray(this.spaces[n].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,n,s){return a.copy(this.spaces[n].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,n){return ho("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,n)},toWorkingColorSpace:function(a,n){return ho("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,n)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Wt]:{primaries:t,whitePoint:r,transfer:_n,toXYZ:wl,fromXYZ:El,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:t,whitePoint:r,transfer:Qe,toXYZ:wl,fromXYZ:El,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),e}function Ii(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Dr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}function zn(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Wd.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(be("Texture: Unable to serialize Texture."),{})}function Hn(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+(t-e)*6*i:i<1/2?t:i<2/3?e+(t-e)*6*(2/3-i):e}function Jn(e,t,i,r,a){for(let n=0,s=e.length-3;n<=s;n+=3){tr.fromArray(e,n);let o=a.x*Math.abs(tr.x)+a.y*Math.abs(tr.y)+a.z*Math.abs(tr.z),l=t.dot(tr),c=i.dot(tr),h=r.dot(tr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}function cp(e,t,i,r,a,n,s,o){let l;if(t.side===Bt?l=r.intersectTriangle(s,n,a,!0,o):l=r.intersectTriangle(a,n,s,t.side===Ni,o),l===null)return null;Wa.copy(o),Wa.applyMatrix4(e.matrixWorld);let c=i.ray.origin.distanceTo(Wa);return c<i.near||c>i.far?null:{distance:c,point:Wa.clone(),object:e}}function Xa(e,t,i,r,a,n,s,o,l,c){e.getVertexPosition(o,ka),e.getVertexPosition(l,Ga),e.getVertexPosition(c,Va);let h=cp(e,t,i,r,ka,Ga,Va,Fl);if(h){let d=new L;Qr.getBarycoord(Fl,ka,Ga,Va,d),a&&(h.uv=Qr.getInterpolatedAttribute(a,o,l,c,d,new Pe)),n&&(h.uv1=Qr.getInterpolatedAttribute(n,o,l,c,d,new Pe)),s&&(h.normal=Qr.getInterpolatedAttribute(s,o,l,c,d,new L),h.normal.dot(r.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new L,materialIndex:0};Qr.getNormal(ka,Ga,Va,u.normal),h.face=u,h.barycoord=d}return h}function Za(e,t,i,r,a,n,s){let o=e.geometry.attributes.position;if(Mn.fromBufferAttribute(o,a),Sn.fromBufferAttribute(o,n),i.distanceSqToSegment(Mn,Sn,os,jl)>r)return;os.applyMatrix4(e.matrixWorld);let l=t.ray.origin.distanceTo(os);if(!(l<t.near||l>t.far))return{distance:l,point:jl.clone().applyMatrix4(e.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:e}}function Zl(e,t,i,r,a,n,s){let o=fo.distanceSqToPoint(e);if(o<i){let l=new L;fo.closestPointToPoint(e,l),l.applyMatrix4(r);let c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;n.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:s})}}function zo(){let e=0,t=0,i=0,r=0;function a(n,s,o,l){e=n,t=o,i=-3*n+3*s-2*o-l,r=2*n-2*s+o+l}return{initCatmullRom:function(n,s,o,l,c){a(s,o,c*(o-n),c*(l-s))},initNonuniformCatmullRom:function(n,s,o,l,c,h,d){let u=(s-n)/c-(o-n)/(c+h)+(o-s)/h,p=(o-s)/h-(l-s)/(h+d)+(l-o)/d;u*=h,p*=h,a(s,o,u,p)},calc:function(n){let s=n*n,o=s*n;return e+t*n+i*s+r*o}}}function Ql(e,t,i,r,a){let n=(r-t)*.5,s=(a-i)*.5,o=e*e,l=e*o;return(2*i-2*r+n+s)*l+(-3*i+3*r-2*n-s)*o+n*e+i}function wp(e,t){let i=1-e;return i*i*t}function Ep(e,t){return 2*(1-e)*e*t}function Ap(e,t){return e*e*t}function ma(e,t,i,r){return wp(e,t)+Ep(e,i)+Ap(e,r)}function Rp(e,t){let i=1-e;return i*i*i*t}function Cp(e,t){let i=1-e;return 3*i*i*e*t}function Lp(e,t){return 3*(1-e)*e*e*t}function Pp(e,t){return e*e*e*t}function ga(e,t,i,r,a){return Rp(e,t)+Cp(e,i)+Lp(e,r)+Pp(e,a)}function Vr(e){let t={};for(let i in e){t[i]={};for(let r in e[i]){let a=e[i][r];if(ec(a))a.isRenderTargetTexture?(be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=a.clone();else if(Array.isArray(a))if(ec(a[0])){let n=[];for(let s=0,o=a.length;s<o;s++)n[s]=a[s].clone();t[i][r]=n}else t[i][r]=a.slice();else t[i][r]=a}}return t}function Nt(e){let t={};for(let i=0;i<e.length;i++){let r=Vr(e[i]);for(let a in r)t[a]=r[a]}return t}function ec(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Wp(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].clone());return t}function Ph(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ze.workingColorSpace}function Qa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function Zp(e){function t(a,n){return e[a]-e[n]}let i=e.length,r=new Array(i);for(let a=0;a!==i;++a)r[a]=a;return r.sort(t),r}function tc(e,t,i){let r=e.length,a=new e.constructor(r);for(let n=0,s=0;s!==r;++n){let o=i[n]*t;for(let l=0;l!==t;++l)a[s++]=e[o+l]}return a}function Nh(e,t,i,r){let a=1,n=e[0];for(;n!==void 0&&n[r]===void 0;)n=e[a++];if(n===void 0)return;let s=n[r];if(s!==void 0)if(Array.isArray(s))do s=n[r],s!==void 0&&(t.push(n.time),i.push(...s)),n=e[a++];while(n!==void 0);else if(s.toArray!==void 0)do s=n[r],s!==void 0&&(t.push(n.time),s.toArray(i,i.length)),n=e[a++];while(n!==void 0);else do s=n[r],s!==void 0&&(t.push(n.time),i.push(s)),n=e[a++];while(n!==void 0)}function tf(e){switch(e.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hr;case"vector":case"vector2":case"vector3":case"vector4":return Xr;case"color":return Uh;case"quaternion":return Wr;case"bool":case"boolean":return qr;case"string":return Yr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+e)}function rf(e){if(e.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=tf(e.type);if(e.times===void 0){let i=[],r=[];Nh(e.keys,i,r,"value"),e.times=i,e.values=r}return t.parse!==void 0?t.parse(e):new t(e.name,e.times,e.values,e.interpolation)}function ic(e){try{let t=e.slice(e.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}function lc(e,t){return e.distance-t.distance}function go(e,t,i,r){let a=!0;if(e.layers.test(t.layers)&&e.raycast(t,i)===!1&&(a=!1),a===!0&&r===!0){let n=e.children;for(let s=0,o=n.length;s<o;s++)go(n[s],t,i,!0)}}function cc(e,t,i,r){let a=Pf(r);switch(i){case eh:return e*t;case To:return e*t/a.components*a.byteLength;case wo:return e*t/a.components*a.byteLength;case hr:return e*t*2/a.components*a.byteLength;case Eo:return e*t*2/a.components*a.byteLength;case th:return e*t*3/a.components*a.byteLength;case Kt:return e*t*4/a.components*a.byteLength;case Ao:return e*t*4/a.components*a.byteLength;case on:case ln:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case cn:case hn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Is:case Ds:return Math.max(e,16)*Math.max(t,8)/4;case Ps:case Ns:return Math.max(e,8)*Math.max(t,8)/2;case Us:case Os:case Bs:case zs:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Fs:case mn:case ks:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Gs:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Vs:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Hs:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Ws:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Xs:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case js:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case qs:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ys:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ks:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Zs:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Js:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case $s:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Qs:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case eo:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case to:case io:case ro:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ao:case no:return Math.ceil(e/4)*Math.ceil(t/4)*8;case gn:case so:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Pf(e){switch(e){case Vt:case Zc:return{byteLength:1,components:1};case _a:case Jc:case xi:return{byteLength:2,components:1};case yo:case bo:return{byteLength:2,components:4};case _i:case So:case Yt:return{byteLength:4,components:1};case $c:case Qc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function Vh(){let e=null,t=!1,i=null,r=null;function a(n,s){i(n,s),r=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&i!==null&&e!==null&&(r=e.requestAnimationFrame(a),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(n){i=n},setContext:function(n){e=n}}}function If(e){let t=new WeakMap;function i(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function r(o,l,c){let h=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,h);else{d.sort((p,v)=>p.start-v.start);let u=0;for(let p=1;p<d.length;p++){let v=d[u],g=d[p];g.start<=v.start+v.count+1?v.count=Math.max(v.count,g.start+g.count-v.start):(++u,d[u]=g)}d.length=u+1;for(let p=0,v=d.length;p<v;p++){let g=d[p];e.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function n(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,i(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(c.buffer,o,l),c.version=o.version}}return{get:a,remove:n,update:s}}function f0(e,t,i,r,a,n){let s=new ze(0),o=a===!0?0:1,l,c,h=null,d=0,u=null;function p(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){let y=_.backgroundBlurriness>0;M=t.get(M,y)}return M}function v(_){let M=!1,y=p(_);y===null?m(s,o):y&&y.isColor&&(m(y,1),M=!0);let T=e.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,n):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,n),(e.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(_,M){let y=p(M);y&&(y.isCubeTexture||y.mapping===yn)?(c===void 0&&(c=new Dt(new Fo(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:Vr(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(p0.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Hh),c.material.toneMapped=Ze.getTransfer(y.colorSpace)!==Qe,(h!==y||d!==y.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=e.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Dt(new ko(2,2),new Zt({name:"BackgroundMaterial",uniforms:Vr(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(y.colorSpace)!==Qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=e.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,M){_.getRGB(rn,Ph(e)),i.buffers.color.setClear(rn.r,rn.g,rn.b,M,n)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(_,M=1){s.set(_),o=M,m(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(s,o)},render:v,addToRenderList:g,dispose:f}}function m0(e,t){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},a=u(null),n=a,s=!1;function o(R,B,j,O,H){let W=!1,k=d(R,O,j,B);n!==k&&(n=k,c(n.object)),W=p(R,O,j,H),W&&v(R,O,j,H),H!==null&&t.update(H,e.ELEMENT_ARRAY_BUFFER),(W||s)&&(s=!1,y(R,B,j,O),H!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return e.createVertexArray()}function c(R){return e.bindVertexArray(R)}function h(R){return e.deleteVertexArray(R)}function d(R,B,j,O){let H=O.wireframe===!0,W=r[B.id];W===void 0&&(W={},r[B.id]=W);let k=R.isInstancedMesh===!0?R.id:0,ee=W[k];ee===void 0&&(ee={},W[k]=ee);let te=ee[j.id];te===void 0&&(te={},ee[j.id]=te);let ne=te[H];return ne===void 0&&(ne=u(l()),te[H]=ne),ne}function u(R){let B=[],j=[],O=[];for(let H=0;H<i;H++)B[H]=0,j[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:j,attributeDivisors:O,object:R,attributes:{},index:null}}function p(R,B,j,O){let H=n.attributes,W=B.attributes,k=0,ee=j.getAttributes();for(let te in ee)if(ee[te].location>=0){let ne=H[te],ce=W[te];if(ce===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(ce=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(ce=R.instanceColor)),ne===void 0||ne.attribute!==ce||ce&&ne.data!==ce.data)return!0;k++}return n.attributesNum!==k||n.index!==O}function v(R,B,j,O){let H={},W=B.attributes,k=0,ee=j.getAttributes();for(let te in ee)if(ee[te].location>=0){let ne=W[te];ne===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(ne=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(ne=R.instanceColor));let ce={};ce.attribute=ne,ne&&ne.data&&(ce.data=ne.data),H[te]=ce,k++}n.attributes=H,n.attributesNum=k,n.index=O}function g(){let R=n.newAttributes;for(let B=0,j=R.length;B<j;B++)R[B]=0}function m(R){f(R,0)}function f(R,B){let j=n.newAttributes,O=n.enabledAttributes,H=n.attributeDivisors;j[R]=1,O[R]===0&&(e.enableVertexAttribArray(R),O[R]=1),H[R]!==B&&(e.vertexAttribDivisor(R,B),H[R]=B)}function _(){let R=n.newAttributes,B=n.enabledAttributes;for(let j=0,O=B.length;j<O;j++)B[j]!==R[j]&&(e.disableVertexAttribArray(j),B[j]=0)}function M(R,B,j,O,H,W,k){k===!0?e.vertexAttribIPointer(R,B,j,H,W):e.vertexAttribPointer(R,B,j,O,H,W)}function y(R,B,j,O){g();let H=O.attributes,W=j.getAttributes(),k=B.defaultAttributeValues;for(let ee in W){let te=W[ee];if(te.location>=0){let ne=H[ee];if(ne===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(ne=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(ne=R.instanceColor)),ne!==void 0){let ce=ne.normalized,Se=ne.itemSize,De=t.get(ne);if(De===void 0)continue;let Oe=De.buffer,Z=De.type,le=De.bytesPerElement,ge=Z===e.INT||Z===e.UNSIGNED_INT||ne.gpuType===So;if(ne.isInterleavedBufferAttribute){let pe=ne.data,Ae=pe.stride,Ie=ne.offset;if(pe.isInstancedInterleavedBuffer){for(let J=0;J<te.locationSize;J++)f(te.location+J,pe.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let J=0;J<te.locationSize;J++)m(te.location+J);e.bindBuffer(e.ARRAY_BUFFER,Oe);for(let J=0;J<te.locationSize;J++)M(te.location+J,Se/te.locationSize,Z,ce,Ae*le,(Ie+Se/te.locationSize*J)*le,ge)}else{if(ne.isInstancedBufferAttribute){for(let pe=0;pe<te.locationSize;pe++)f(te.location+pe,ne.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let pe=0;pe<te.locationSize;pe++)m(te.location+pe);e.bindBuffer(e.ARRAY_BUFFER,Oe);for(let pe=0;pe<te.locationSize;pe++)M(te.location+pe,Se/te.locationSize,Z,ce,Se*le,Se/te.locationSize*pe*le,ge)}}else if(k!==void 0){let ce=k[ee];if(ce!==void 0)switch(ce.length){case 2:e.vertexAttrib2fv(te.location,ce);break;case 3:e.vertexAttrib3fv(te.location,ce);break;case 4:e.vertexAttrib4fv(te.location,ce);break;default:e.vertexAttrib1fv(te.location,ce)}}}}_()}function T(){w();for(let R in r){let B=r[R];for(let j in B){let O=B[j];for(let H in O){let W=O[H];for(let k in W)h(W[k].object),delete W[k];delete O[H]}}delete r[R]}}function E(R){if(r[R.id]===void 0)return;let B=r[R.id];for(let j in B){let O=B[j];for(let H in O){let W=O[H];for(let k in W)h(W[k].object),delete W[k];delete O[H]}}delete r[R.id]}function C(R){for(let B in r){let j=r[B];for(let O in j){let H=j[O];if(H[R.id]===void 0)continue;let W=H[R.id];for(let k in W)h(W[k].object),delete W[k];delete H[R.id]}}}function x(R){for(let B in r){let j=r[B],O=R.isInstancedMesh===!0?R.id:0,H=j[O];if(H!==void 0){for(let W in H){let k=H[W];for(let ee in k)h(k[ee].object),delete k[ee];delete H[W]}delete j[O],Object.keys(j).length===0&&delete r[B]}}}function w(){U(),s=!0,n!==a&&(n=a,c(n.object))}function U(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:w,resetDefaultState:U,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:m,disableUnusedAttributes:_}}function g0(e,t,i){let r;function a(l){r=l}function n(l,c){e.drawArrays(r,l,c),i.update(c,r,1)}function s(l,c,h){h!==0&&(e.drawArraysInstanced(r,l,c,h),i.update(c,r,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,l,0,c,0,h);let d=0;for(let u=0;u<h;u++)d+=c[u];i.update(d,r,1)}this.setMode=a,this.render=n,this.renderInstances=s,this.renderMultiDraw=o}function v0(e,t,i,r){let a;function n(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(C){return!(C!==Kt&&r.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let x=C===xi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Vt&&r.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Yt&&!x)}function l(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=i.precision!==void 0?i.precision:"highp",h=l(c);h!==c&&(be("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=i.logarithmicDepthBuffer===!0,u=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&u===!1&&be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),_=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=e.getParameter(e.MAX_SAMPLES),E=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:n,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:v,maxTextureSize:g,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:y,maxSamples:T,samples:E}}function _0(e){let t=this,i=null,r=0,a=!1,n=!1,s=new Xi,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||r!==0||a;return a=u,r=d.length,p},this.beginShadows=function(){n=!0,h(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(d,u){i=h(d,u,0)},this.setState=function(d,u,p){let v=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,f=e.get(d);if(!a||v===null||v.length===0||n&&!m)n?h(null):c();else{let _=n?0:r,M=_*4,y=f.clippingState||null;l.value=y,y=h(v,u,M,p);for(let T=0;T!==M;++T)y[T]=i[T];f.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==i&&(l.value=i,l.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function h(d,u,p,v){let g=d!==null?d.length:0,m=null;if(g!==0){if(m=l.value,v!==!0||m===null){let f=p+g*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,y=p;M!==g;++M,y+=4)s.copy(d[M]).applyMatrix4(_,o),s.normal.toArray(m,y),m[y+3]=s.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function S0(e){let t=[],i=[],r=[],a=e,n=e-Ki+1+hc.length;for(let s=0;s<n;s++){let o=Math.pow(2,a);t.push(o);let l=1/o;s>e-Ki?l=hc[s-e+Ki-1]:s===0&&(l=0),i.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,v=6,g=3,m=2,f=1,_=new Float32Array(g*v*p),M=new Float32Array(m*v*p),y=new Float32Array(f*v*p);for(let E=0;E<p;E++){let C=E%3*2/3-1,x=E>2?0:-1,w=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];_.set(w,g*v*E),M.set(u,m*v*E);let U=[E,E,E,E,E,E];y.set(U,f*v*E)}let T=new Pt;T.setAttribute("position",new Ct(_,g)),T.setAttribute("uv",new Ct(M,m)),T.setAttribute("faceIndex",new Ct(y,f)),r.push(new Dt(T,null)),a>Ki&&a--}return{lodMeshes:r,sizeLods:t,sigmas:i}}function pc(e,t,i){let r=new ni(e,t,i);return r.texture.mapping=yn,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Rr(e,t,i,r,a){e.viewport.set(t,i,r,a),e.scissor.set(t,i,r,a)}function y0(e,t,i){return new Zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:x0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function b0(e,t,i){let r=new Float32Array(sr),a=new L(0,1,0);return new Zt({name:"SphericalGaussianBlur",defines:{n:sr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:wn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function fc(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function mc(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function wn(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function T0(e){let t=new WeakMap,i=new WeakMap,r=null;function a(u,p=!1){return u==null?null:p?s(u):n(u)}function n(u){if(u&&u.isTexture){let p=u.mapping;if(p===Dn||p===Un)if(t.has(u)){let v=t.get(u).texture;return o(v,u.mapping)}else{let v=u.image;if(v&&v.height>0){let g=new Wh(v.height);return g.fromEquirectangularTexture(e,u),t.set(u,g),u.addEventListener("dispose",c),o(g.texture,u.mapping)}else return null}}return u}function s(u){if(u&&u.isTexture){let p=u.mapping,v=p===Dn||p===Un,g=p===lr||p===Fr;if(v||g){let m=i.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return r===null&&(r=new dc(e)),m=v?r.fromEquirectangular(u,m):r.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,i.set(u,m),m.texture;if(m!==void 0)return m.texture;{let _=u.image;return v&&_&&_.height>0||g&&_&&l(_)?(r===null&&(r=new dc(e)),m=v?r.fromEquirectangular(u):r.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,i.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===Dn?u.mapping=lr:p===Un&&(u.mapping=Fr),u}function l(u){let p=0,v=6;for(let g=0;g<v;g++)u[g]!==void 0&&p++;return p===v}function c(u){let p=u.target;p.removeEventListener("dispose",c);let v=t.get(p);v!==void 0&&(t.delete(p),v.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let v=i.get(p);v!==void 0&&(i.delete(p),v.dispose())}function d(){t=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:a,dispose:d}}function w0(e){let t={};function i(r){if(t[r]!==void 0)return t[r];let a=e.getExtension(r);return t[r]=a,a}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){let a=i(r);return a===null&&ho("WebGLRenderer: "+r+" extension not supported."),a}}}function E0(e,t,i,r){let a={},n=new WeakMap;function s(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let v in u.attributes)t.remove(u.attributes[v]);u.removeEventListener("dispose",s),delete a[u.id];let p=n.get(u);p&&(t.remove(p),n.delete(u)),r.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,i.memory.geometries--}function o(d,u){return a[u.id]===!0||(u.addEventListener("dispose",s),a[u.id]=!0,i.memory.geometries++),u}function l(d){let u=d.attributes;for(let p in u)t.update(u[p],e.ARRAY_BUFFER)}function c(d){let u=[],p=d.index,v=d.attributes.position,g=0;if(v===void 0)return;if(p!==null){let _=p.array;g=p.version;for(let M=0,y=_.length;M<y;M+=3){let T=_[M+0],E=_[M+1],C=_[M+2];u.push(T,E,E,C,C,T)}}else{let _=v.array;g=v.version;for(let M=0,y=_.length/3-1;M<y;M+=3){let T=M+0,E=M+1,C=M+2;u.push(T,E,E,C,C,T)}}let m=new(v.count>=65535?ph:dh)(u,1);m.version=g;let f=n.get(d);f&&t.remove(f),n.set(d,m)}function h(d){let u=n.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return n.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function A0(e,t,i){let r;function a(d){r=d}let n,s;function o(d){n=d.type,s=d.bytesPerElement}function l(d,u){e.drawElements(r,u,n,d*s),i.update(u,r,1)}function c(d,u,p){p!==0&&(e.drawElementsInstanced(r,u,n,d*s,p),i.update(u,r,p))}function h(d,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,u,0,n,d,0,p);let v=0;for(let g=0;g<p;g++)v+=u[g];i.update(v,r,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function R0(e){let t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(n,s,o){switch(i.calls++,s){case e.TRIANGLES:i.triangles+=o*(n/3);break;case e.LINES:i.lines+=o*(n/2);break;case e.LINE_STRIP:i.lines+=o*(n-1);break;case e.LINE_LOOP:i.lines+=o*n;break;case e.POINTS:i.points+=o*n;break;default:Ue("WebGLInfo: Unknown draw mode:",s);break}}function a(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:a,update:r}}function C0(e,t,i){let r=new WeakMap,a=new nt;function n(s,o,l){let c=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=r.get(o);if(u===void 0||u.count!==d){let p=function(){x.dispose(),r.delete(o),o.removeEventListener("dispose",p)};u!==void 0&&u.texture.dispose();let v=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],y=0;v===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let T=o.attributes.position.count*y,E=1;T>t.maxTextureSize&&(E=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);let C=new Float32Array(T*E*4*d),x=new ch(C,T,E,d);x.type=Yt,x.needsUpdate=!0;let w=y*4;for(let U=0;U<d;U++){let R=f[U],B=_[U],j=M[U],O=T*E*4*U;for(let H=0;H<R.count;H++){let W=H*w;v===!0&&(a.fromBufferAttribute(R,H),C[O+W+0]=a.x,C[O+W+1]=a.y,C[O+W+2]=a.z,C[O+W+3]=0),g===!0&&(a.fromBufferAttribute(B,H),C[O+W+4]=a.x,C[O+W+5]=a.y,C[O+W+6]=a.z,C[O+W+7]=0),m===!0&&(a.fromBufferAttribute(j,H),C[O+W+8]=a.x,C[O+W+9]=a.y,C[O+W+10]=a.z,C[O+W+11]=j.itemSize===4?a.w:1)}}u={count:d,texture:x,size:new Pe(T,E)},r.set(o,u),o.addEventListener("dispose",p)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",s.morphTexture,i);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];let v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",v),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,i),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:n}}function L0(e,t,i,r,a){let n=new WeakMap;function s(c){let h=a.render.frame,d=c.geometry,u=t.get(c,d);if(n.get(u)!==h&&(t.update(u),n.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),n.get(c)!==h&&(i.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&i.update(c.instanceColor,e.ARRAY_BUFFER),n.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;n.get(p)!==h&&(p.update(),n.set(p,h))}return u}function o(){n=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),r.releaseStatesOfObject(h),i.remove(h.instanceMatrix),h.instanceColor!==null&&i.remove(h.instanceColor)}return{update:s,dispose:o}}function I0(e,t,i,r,a){let n=new ni(t,i,{type:e,depthBuffer:r,stencilBuffer:a,depthTexture:r?new Gr(t,i):void 0}),s=new ni(t,i,{type:xi,depthBuffer:!1,stencilBuffer:!1}),o=new Pt;o.setAttribute("position",new st([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new st([0,2,0,0,2,0],2));let l=new qp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Dt(o,l),h=new Ea(-1,1,1,-1,0,1),d=null,u=null,p=!1,v,g=null,m=[],f=!1;this.setSize=function(_,M){n.setSize(_,M),s.setSize(_,M);for(let y=0;y<m.length;y++){let T=m[y];T.setSize&&T.setSize(_,M)}},this.setEffects=function(_){m=_,f=m.length>0&&m[0].isRenderPass===!0;let M=n.width,y=n.height;for(let T=0;T<m.length;T++){let E=m[T];E.setSize&&E.setSize(M,y)}},this.begin=function(_,M){if(p||_.toneMapping===ri&&m.length===0)return!1;if(g=M,M!==null){let y=M.width,T=M.height;(n.width!==y||n.height!==T)&&this.setSize(y,T)}return f===!1&&_.setRenderTarget(n),v=_.toneMapping,_.toneMapping=ri,!0},this.hasRenderPass=function(){return f},this.end=function(_,M){_.toneMapping=v,p=!0;let y=n,T=s;for(let E=0;E<m.length;E++){let C=m[E];if(C.enabled!==!1&&(C.render(_,T,y,M),C.needsSwap!==!1)){let x=y;y=T,T=x}}if(d!==_.outputColorSpace||u!==_.toneMapping){d=_.outputColorSpace,u=_.toneMapping,l.defines={},Ze.getTransfer(d)===Qe&&(l.defines.SRGB_TRANSFER="");let E=P0[u];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,_.setRenderTarget(g),_.render(c,h),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){n.depthTexture&&n.depthTexture.dispose(),n.dispose(),s.dispose(),o.dispose(),l.dispose()}}function Zr(e,t,i){let r=e[0];if(r<=0||r>0)return e;let a=t*i,n=gc[a];if(n===void 0&&(n=new Float32Array(a),gc[a]=n),t!==0){r.toArray(n,0);for(let s=1,o=0;s!==t;++s)o+=i,e[s].toArray(n,o)}return n}function bt(e,t){if(e.length!==t.length)return!1;for(let i=0,r=e.length;i<r;i++)if(e[i]!==t[i])return!1;return!0}function Tt(e,t){for(let i=0,r=t.length;i<r;i++)e[i]=t[i]}function En(e,t){let i=vc[t];i===void 0&&(i=new Int32Array(t),vc[t]=i);for(let r=0;r!==t;++r)i[r]=e.allocateTextureUnit();return i}function N0(e,t){let i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}function D0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bt(i,t))return;e.uniform2fv(this.addr,t),Tt(i,t)}}function U0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(bt(i,t))return;e.uniform3fv(this.addr,t),Tt(i,t)}}function O0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bt(i,t))return;e.uniform4fv(this.addr,t),Tt(i,t)}}function F0(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(bt(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),Tt(i,t)}else{if(bt(i,r))return;Mc.set(r),e.uniformMatrix2fv(this.addr,!1,Mc),Tt(i,r)}}function B0(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(bt(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),Tt(i,t)}else{if(bt(i,r))return;xc.set(r),e.uniformMatrix3fv(this.addr,!1,xc),Tt(i,r)}}function z0(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(bt(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),Tt(i,t)}else{if(bt(i,r))return;_c.set(r),e.uniformMatrix4fv(this.addr,!1,_c),Tt(i,r)}}function k0(e,t){let i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}function G0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bt(i,t))return;e.uniform2iv(this.addr,t),Tt(i,t)}}function V0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bt(i,t))return;e.uniform3iv(this.addr,t),Tt(i,t)}}function H0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bt(i,t))return;e.uniform4iv(this.addr,t),Tt(i,t)}}function W0(e,t){let i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}function X0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(bt(i,t))return;e.uniform2uiv(this.addr,t),Tt(i,t)}}function j0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(bt(i,t))return;e.uniform3uiv(this.addr,t),Tt(i,t)}}function q0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(bt(i,t))return;e.uniform4uiv(this.addr,t),Tt(i,t)}}function Y0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a);let n;this.type===e.SAMPLER_2D_SHADOW?(vo.compareFunction=i.isReversedDepthBuffer()?Lo:Co,n=vo):n=Xh,i.setTexture2D(t||n,a)}function K0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture3D(t||qh,a)}function Z0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTextureCube(t||Yh,a)}function J0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture2DArray(t||jh,a)}function $0(e){switch(e){case 5126:return N0;case 35664:return D0;case 35665:return U0;case 35666:return O0;case 35674:return F0;case 35675:return B0;case 35676:return z0;case 5124:case 35670:return k0;case 35667:case 35671:return G0;case 35668:case 35672:return V0;case 35669:case 35673:return H0;case 5125:return W0;case 36294:return X0;case 36295:return j0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return K0;case 35680:case 36300:case 36308:case 36293:return Z0;case 36289:case 36303:case 36311:case 36292:return J0}}function Q0(e,t){e.uniform1fv(this.addr,t)}function ev(e,t){let i=Zr(t,this.size,2);e.uniform2fv(this.addr,i)}function tv(e,t){let i=Zr(t,this.size,3);e.uniform3fv(this.addr,i)}function iv(e,t){let i=Zr(t,this.size,4);e.uniform4fv(this.addr,i)}function rv(e,t){let i=Zr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function av(e,t){let i=Zr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function nv(e,t){let i=Zr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}function sv(e,t){e.uniform1iv(this.addr,t)}function ov(e,t){e.uniform2iv(this.addr,t)}function lv(e,t){e.uniform3iv(this.addr,t)}function cv(e,t){e.uniform4iv(this.addr,t)}function hv(e,t){e.uniform1uiv(this.addr,t)}function uv(e,t){e.uniform2uiv(this.addr,t)}function dv(e,t){e.uniform3uiv(this.addr,t)}function pv(e,t){e.uniform4uiv(this.addr,t)}function fv(e,t,i){let r=this.cache,a=t.length,n=En(i,a);bt(r,n)||(e.uniform1iv(this.addr,n),Tt(r,n));let s;this.type===e.SAMPLER_2D_SHADOW?s=vo:s=Xh;for(let o=0;o!==a;++o)i.setTexture2D(t[o]||s,n[o])}function mv(e,t,i){let r=this.cache,a=t.length,n=En(i,a);bt(r,n)||(e.uniform1iv(this.addr,n),Tt(r,n));for(let s=0;s!==a;++s)i.setTexture3D(t[s]||qh,n[s])}function gv(e,t,i){let r=this.cache,a=t.length,n=En(i,a);bt(r,n)||(e.uniform1iv(this.addr,n),Tt(r,n));for(let s=0;s!==a;++s)i.setTextureCube(t[s]||Yh,n[s])}function vv(e,t,i){let r=this.cache,a=t.length,n=En(i,a);bt(r,n)||(e.uniform1iv(this.addr,n),Tt(r,n));for(let s=0;s!==a;++s)i.setTexture2DArray(t[s]||jh,n[s])}function _v(e){switch(e){case 5126:return Q0;case 35664:return ev;case 35665:return tv;case 35666:return iv;case 35674:return rv;case 35675:return av;case 35676:return nv;case 5124:case 35670:return sv;case 35667:case 35671:return ov;case 35668:case 35672:return lv;case 35669:case 35673:return cv;case 5125:return hv;case 36294:return uv;case 36295:return dv;case 36296:return pv;case 35678:case 36198:case 36298:case 36306:case 35682:return fv;case 35679:case 36299:case 36307:return mv;case 35680:case 36300:case 36308:case 36293:return gv;case 36289:case 36303:case 36311:case 36292:return vv}}function Sc(e,t){e.seq.push(t),e.map[t.id]=t}function yv(e,t,i){let r=e.name,a=r.length;for(vs.lastIndex=0;;){let n=vs.exec(r),s=vs.lastIndex,o=n[1],l=n[2]==="]",c=n[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){Sc(i,c===void 0?new xv(o,e,t):new Mv(o,e,t));break}else{let h=i.map[o];h===void 0&&(h=new Sv(o),Sc(i,h)),i=h}}}function yc(e,t,i){let r=e.createShader(t);return e.shaderSource(r,i),e.compileShader(r),r}function wv(e,t){let i=e.split(`
`),r=[],a=Math.max(t-6,0),n=Math.min(t+6,i.length);for(let s=a;s<n;s++){let o=s+1;r.push(`${o===t?">":" "} ${o}: ${i[s]}`)}return r.join(`
`)}function Ev(e){Ze._getMatrix(bc,Ze.workingColorSpace,e);let t=`mat3( ${bc.elements.map(i=>i.toFixed(4))} )`;switch(Ze.getTransfer(e)){case _n:return[t,"LinearTransferOETF"];case Qe:return[t,"sRGBTransferOETF"];default:return be("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Tc(e,t,i){let r=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(r&&a==="")return"";let n=/ERROR: 0:(\d+)/.exec(a);if(n){let s=parseInt(n[1]);return i.toUpperCase()+`

`+a+`

`+wv(e.getShaderSource(t),s)}else return a}function Av(e,t){let i=Ev(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function Cv(e,t){let i=Rv[t];return i===void 0?(be("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}function Lv(){Ze.getLuminanceCoefficients(an);let e=an.x.toFixed(4),t=an.y.toFixed(4),i=an.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Pv(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(da).join(`
`)}function Iv(e){let t=[];for(let i in e){let r=e[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function Nv(e,t){let i={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){let n=e.getActiveAttrib(t,a),s=n.name,o=1;n.type===e.FLOAT_MAT2&&(o=2),n.type===e.FLOAT_MAT3&&(o=3),n.type===e.FLOAT_MAT4&&(o=4),i[s]={type:n.type,location:e.getAttribLocation(t,s),locationSize:o}}return i}function da(e){return e!==""}function wc(e,t){let i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ec(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function _o(e){return e.replace(Dv,Ov)}function Ov(e,t){let i=We[t];if(i===void 0){let r=Uv.get(t);if(r!==void 0)i=We[r],be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("Can not resolve #include <"+t+">")}return _o(i)}function Ac(e){return e.replace(Fv,Bv)}function Bv(e,t,i,r){let a="";for(let n=parseInt(t);n<parseInt(i);n++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return a}function Rc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function kv(e){return zv[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function Vv(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":Gv[e.envMapMode]||"ENVMAP_TYPE_CUBE"}function Wv(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":Hv[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}function jv(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":Xv[e.combine]||"ENVMAP_BLENDING_NONE"}function qv(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function Yv(e,t,i,r){let a=e.getContext(),n=i.defines,s=i.vertexShader,o=i.fragmentShader,l=kv(i),c=Vv(i),h=Wv(i),d=jv(i),u=qv(i),p=Pv(i),v=Iv(n),g=a.createProgram(),m,f,_=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(m=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,v].filter(da).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,v].filter(da).join(`
`),f.length>0&&(f+=`
`)):(m=[Rc(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,v,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(da).join(`
`),f=[Rc(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,v,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+c:"",i.envMap?"#define "+h:"",i.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ri?"#define TONE_MAPPING":"",i.toneMapping!==ri?We.tonemapping_pars_fragment:"",i.toneMapping!==ri?Cv("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Av("linearToOutputTexel",i.outputColorSpace),Lv(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(da).join(`
`)),s=_o(s),s=wc(s,i),s=Ec(s,i),o=_o(o),o=wc(o,i),o=Ec(o,i),s=Ac(s),o=Ac(o),i.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",i.glslVersion===Sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let M=_+m+s,y=_+f+o,T=yc(a,a.VERTEX_SHADER,M),E=yc(a,a.FRAGMENT_SHADER,y);a.attachShader(g,T),a.attachShader(g,E),i.index0AttributeName!==void 0?a.bindAttribLocation(g,0,i.index0AttributeName):i.morphTargets===!0&&a.bindAttribLocation(g,0,"position"),a.linkProgram(g);function C(R){if(e.debug.checkShaderErrors){let B=a.getProgramInfoLog(g)||"",j=a.getShaderInfoLog(T)||"",O=a.getShaderInfoLog(E)||"",H=B.trim(),W=j.trim(),k=O.trim(),ee=!0,te=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1)if(ee=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,g,T,E);else{let ne=Tc(a,T,"vertex"),ce=Tc(a,E,"fragment");Ue("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+ne+`
`+ce)}else H!==""?be("WebGLProgram: Program Info Log:",H):(W===""||k==="")&&(te=!1);te&&(R.diagnostics={runnable:ee,programLog:H,vertexShader:{log:W,prefix:m},fragmentShader:{log:k,prefix:f}})}a.deleteShader(T),a.deleteShader(E),x=new pn(a,g),w=Nv(a,g)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let U=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=a.getProgramParameter(g,bv)),U},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=Tv++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=E,this}function $v(e){return e===hr||e===mn||e===gn}function Qv(e,t,i,r,a,n){let s=new No,o=new Zv,l=new Set,c=[],h=new Map,d=r.logarithmicDepthBuffer,u=r.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,w,U,R,B,j){let O=R.fog,H=B.geometry,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ee=t.get(x.envMap||W,k),te=ee&&ee.mapping===yn?ee.image.height:null,ne=p[x.type];x.precision!==null&&(u=r.getMaxPrecision(x.precision),u!==x.precision&&be("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let ce=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Se=ce!==void 0?ce.length:0,De=0;H.morphAttributes.position!==void 0&&(De=1),H.morphAttributes.normal!==void 0&&(De=2),H.morphAttributes.color!==void 0&&(De=3);let Oe,Z,le,ge;if(ne){let Fe=mi[ne];Oe=Fe.vertexShader,Z=Fe.fragmentShader}else Oe=x.vertexShader,Z=x.fragmentShader,o.update(x),le=o.getVertexShaderID(x),ge=o.getFragmentShaderID(x);let pe=e.getRenderTarget(),Ae=e.state.buffers.depth.getReversed(),Ie=B.isInstancedMesh===!0,J=B.isBatchedMesh===!0,Re=!!x.map,_e=!!x.matcap,Ye=!!ee,$e=!!x.aoMap,pt=!!x.lightMap,it=!!x.bumpMap,ot=!!x.normalMap,D=!!x.displacementMap,mt=!!x.emissiveMap,we=!!x.metalnessMap,Xe=!!x.roughnessMap,de=x.anisotropy>0,rt=x.clearcoat>0,Ce=x.dispersion>0,A=x.iridescence>0,S=x.sheen>0,G=x.transmission>0,N=de&&!!x.anisotropyMap,z=rt&&!!x.clearcoatMap,Y=rt&&!!x.clearcoatNormalMap,Q=rt&&!!x.clearcoatRoughnessMap,P=A&&!!x.iridescenceMap,ae=A&&!!x.iridescenceThicknessMap,re=S&&!!x.sheenColorMap,he=S&&!!x.sheenRoughnessMap,K=!!x.specularMap,ve=!!x.specularColorMap,Le=!!x.specularIntensityMap,ke=G&&!!x.transmissionMap,Ge=G&&!!x.thicknessMap,I=!!x.gradientMap,$=!!x.alphaMap,se=x.alphaTest>0,ue=!!x.alphaHash,Te=!!x.extensions,ie=ri;x.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(ie=e.toneMapping);let Ee={shaderID:ne,shaderType:x.type,shaderName:x.name,vertexShader:Oe,fragmentShader:Z,defines:x.defines,customVertexShaderID:le,customFragmentShaderID:ge,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:J,batchingColor:J&&B._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&B.instanceColor!==null,instancingMorph:Ie&&B.morphTexture!==null,outputColorSpace:pe===null?e.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Ze.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Re,matcap:_e,envMap:Ye,envMapMode:Ye&&ee.mapping,envMapCubeUVHeight:te,aoMap:$e,lightMap:pt,bumpMap:it,normalMap:ot,displacementMap:D,emissiveMap:mt,normalMapObjectSpace:ot&&x.normalMapType===fd,normalMapTangentSpace:ot&&x.normalMapType===lo,packedNormalMap:ot&&x.normalMapType===lo&&$v(x.normalMap.format),metalnessMap:we,roughnessMap:Xe,anisotropy:de,anisotropyMap:N,clearcoat:rt,clearcoatMap:z,clearcoatNormalMap:Y,clearcoatRoughnessMap:Q,dispersion:Ce,iridescence:A,iridescenceMap:P,iridescenceThicknessMap:ae,sheen:S,sheenColorMap:re,sheenRoughnessMap:he,specularMap:K,specularColorMap:ve,specularIntensityMap:Le,transmission:G,transmissionMap:ke,thicknessMap:Ge,gradientMap:I,opaque:x.transparent===!1&&x.blending===Nr&&x.alphaToCoverage===!1,alphaMap:$,alphaTest:se,alphaHash:ue,combine:x.combine,mapUv:Re&&v(x.map.channel),aoMapUv:$e&&v(x.aoMap.channel),lightMapUv:pt&&v(x.lightMap.channel),bumpMapUv:it&&v(x.bumpMap.channel),normalMapUv:ot&&v(x.normalMap.channel),displacementMapUv:D&&v(x.displacementMap.channel),emissiveMapUv:mt&&v(x.emissiveMap.channel),metalnessMapUv:we&&v(x.metalnessMap.channel),roughnessMapUv:Xe&&v(x.roughnessMap.channel),anisotropyMapUv:N&&v(x.anisotropyMap.channel),clearcoatMapUv:z&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:Y&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:P&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:re&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:he&&v(x.sheenRoughnessMap.channel),specularMapUv:K&&v(x.specularMap.channel),specularColorMapUv:ve&&v(x.specularColorMap.channel),specularIntensityMapUv:Le&&v(x.specularIntensityMap.channel),transmissionMapUv:ke&&v(x.transmissionMap.channel),thicknessMapUv:Ge&&v(x.thicknessMap.channel),alphaMapUv:$&&v(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ot||de),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!H.attributes.uv&&(Re||$),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&ot===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ae,skinning:B.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:De,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&U.length>0,shadowMapType:e.shadowMap.type,toneMapping:ie,decodeVideoTexture:Re&&x.map.isVideoTexture===!0&&Ze.getTransfer(x.map.colorSpace)===Qe,decodeVideoTextureEmissive:mt&&x.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(x.emissiveMap.colorSpace)===Qe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ti,flipSided:x.side===Bt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Te&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&x.extensions.multiDraw===!0||J)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ee.vertexUv1s=l.has(1),Ee.vertexUv2s=l.has(2),Ee.vertexUv3s=l.has(3),l.clear(),Ee}function m(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let U in x.defines)w.push(U),w.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(f(w,x),_(w,x),w.push(e.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function _(x,w){s.disableAll(),w.instancing&&s.enable(0),w.instancingColor&&s.enable(1),w.instancingMorph&&s.enable(2),w.matcap&&s.enable(3),w.envMap&&s.enable(4),w.normalMapObjectSpace&&s.enable(5),w.normalMapTangentSpace&&s.enable(6),w.clearcoat&&s.enable(7),w.iridescence&&s.enable(8),w.alphaTest&&s.enable(9),w.vertexColors&&s.enable(10),w.vertexAlphas&&s.enable(11),w.vertexUv1s&&s.enable(12),w.vertexUv2s&&s.enable(13),w.vertexUv3s&&s.enable(14),w.vertexTangents&&s.enable(15),w.anisotropy&&s.enable(16),w.alphaHash&&s.enable(17),w.batching&&s.enable(18),w.dispersion&&s.enable(19),w.batchingColor&&s.enable(20),w.gradientMap&&s.enable(21),w.packedNormalMap&&s.enable(22),w.vertexNormals&&s.enable(23),x.push(s.mask),s.disableAll(),w.fog&&s.enable(0),w.useFog&&s.enable(1),w.flatShading&&s.enable(2),w.logarithmicDepthBuffer&&s.enable(3),w.reversedDepthBuffer&&s.enable(4),w.skinning&&s.enable(5),w.morphTargets&&s.enable(6),w.morphNormals&&s.enable(7),w.morphColors&&s.enable(8),w.premultipliedAlpha&&s.enable(9),w.shadowMapEnabled&&s.enable(10),w.doubleSided&&s.enable(11),w.flipSided&&s.enable(12),w.useDepthPacking&&s.enable(13),w.dithering&&s.enable(14),w.transmission&&s.enable(15),w.sheen&&s.enable(16),w.opaque&&s.enable(17),w.pointsUvs&&s.enable(18),w.decodeVideoTexture&&s.enable(19),w.decodeVideoTextureEmissive&&s.enable(20),w.alphaToCoverage&&s.enable(21),w.numLightProbeGrids>0&&s.enable(22),x.push(s.mask)}function M(x){let w=p[x.type],U;if(w){let R=mi[w];U=Ih.clone(R.uniforms)}else U=x.uniforms;return U}function y(x,w){let U=h.get(w);return U!==void 0?++U.usedTimes:(U=new Yv(e,w,x,a),c.push(U),h.set(w,U)),U}function T(x){if(--x.usedTimes===0){let w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function C(){o.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:M,acquireProgram:y,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:C}}function e_(){let e=new WeakMap;function t(s){return e.has(s)}function i(s){let o=e.get(s);return o===void 0&&(o={},e.set(s,o)),o}function r(s){e.delete(s)}function a(s,o,l){e.get(s)[o]=l}function n(){e=new WeakMap}return{has:t,get:i,remove:r,update:a,dispose:n}}function t_(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Cc(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Lc(){let e=[],t=0,i=[],r=[],a=[];function n(){t=0,i.length=0,r.length=0,a.length=0}function s(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,v,g,m,f){let _=e[t];return _===void 0?(_={id:u.id,object:u,geometry:p,material:v,materialVariant:s(u),groupOrder:g,renderOrder:u.renderOrder,z:m,group:f},e[t]=_):(_.id=u.id,_.object=u,_.geometry=p,_.material=v,_.materialVariant=s(u),_.groupOrder=g,_.renderOrder=u.renderOrder,_.z=m,_.group=f),t++,_}function l(u,p,v,g,m,f){let _=o(u,p,v,g,m,f);v.transmission>0?r.push(_):v.transparent===!0?a.push(_):i.push(_)}function c(u,p,v,g,m,f){let _=o(u,p,v,g,m,f);v.transmission>0?r.unshift(_):v.transparent===!0?a.unshift(_):i.unshift(_)}function h(u,p){i.length>1&&i.sort(u||t_),r.length>1&&r.sort(p||Cc),a.length>1&&a.sort(p||Cc)}function d(){for(let u=t,p=e.length;u<p;u++){let v=e[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:i,transmissive:r,transparent:a,init:n,push:l,unshift:c,finish:d,sort:h}}function i_(){let e=new WeakMap;function t(r,a){let n=e.get(r),s;return n===void 0?(s=new Lc,e.set(r,[s])):a>=n.length?(s=new Lc,n.push(s)):s=n[a],s}function i(){e=new WeakMap}return{get:t,dispose:i}}function r_(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new L,color:new ze};break;case"SpotLight":i={position:new L,direction:new L,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new L,color:new ze,distance:0,decay:0};break;case"HemisphereLight":i={direction:new L,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":i={color:new ze,position:new L,halfWidth:new L,halfHeight:new L};break}return e[t.id]=i,i}}}function a_(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=i,i}}}function s_(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function o_(e){let t=new r_,i=a_(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new L);let a=new L,n=new Ve,s=new Ve;function o(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)r.probe[w].set(0,0,0);let p=0,v=0,g=0,m=0,f=0,_=0,M=0,y=0,T=0,E=0,C=0;c.sort(s_);for(let w=0,U=c.length;w<U;w++){let R=c[w],B=R.color,j=R.intensity,O=R.distance,H=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===hr?H=R.shadow.map.texture:H=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=B.r*j,d+=B.g*j,u+=B.b*j;else if(R.isLightProbe){for(let W=0;W<9;W++)r.probe[W].addScaledVector(R.sh.coefficients[W],j);C++}else if(R.isDirectionalLight){let W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let k=R.shadow,ee=i.get(R);ee.shadowIntensity=k.intensity,ee.shadowBias=k.bias,ee.shadowNormalBias=k.normalBias,ee.shadowRadius=k.radius,ee.shadowMapSize=k.mapSize,r.directionalShadow[p]=ee,r.directionalShadowMap[p]=H,r.directionalShadowMatrix[p]=R.shadow.matrix,_++}r.directional[p]=W,p++}else if(R.isSpotLight){let W=t.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(B).multiplyScalar(j),W.distance=O,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,r.spot[g]=W;let k=R.shadow;if(R.map&&(r.spotLightMap[T]=R.map,T++,k.updateMatrices(R),R.castShadow&&E++),r.spotLightMatrix[g]=k.matrix,R.castShadow){let ee=i.get(R);ee.shadowIntensity=k.intensity,ee.shadowBias=k.bias,ee.shadowNormalBias=k.normalBias,ee.shadowRadius=k.radius,ee.shadowMapSize=k.mapSize,r.spotShadow[g]=ee,r.spotShadowMap[g]=H,y++}g++}else if(R.isRectAreaLight){let W=t.get(R);W.color.copy(B).multiplyScalar(j),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),r.rectArea[m]=W,m++}else if(R.isPointLight){let W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){let k=R.shadow,ee=i.get(R);ee.shadowIntensity=k.intensity,ee.shadowBias=k.bias,ee.shadowNormalBias=k.normalBias,ee.shadowRadius=k.radius,ee.shadowMapSize=k.mapSize,ee.shadowCameraNear=k.camera.near,ee.shadowCameraFar=k.camera.far,r.pointShadow[v]=ee,r.pointShadowMap[v]=H,r.pointShadowMatrix[v]=R.shadow.matrix,M++}r.point[v]=W,v++}else if(R.isHemisphereLight){let W=t.get(R);W.skyColor.copy(R.color).multiplyScalar(j),W.groundColor.copy(R.groundColor).multiplyScalar(j),r.hemi[f]=W,f++}}m>0&&(e.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=fe.LTC_FLOAT_1,r.rectAreaLTC2=fe.LTC_FLOAT_2):(r.rectAreaLTC1=fe.LTC_HALF_1,r.rectAreaLTC2=fe.LTC_HALF_2)),r.ambient[0]=h,r.ambient[1]=d,r.ambient[2]=u;let x=r.hash;(x.directionalLength!==p||x.pointLength!==v||x.spotLength!==g||x.rectAreaLength!==m||x.hemiLength!==f||x.numDirectionalShadows!==_||x.numPointShadows!==M||x.numSpotShadows!==y||x.numSpotMaps!==T||x.numLightProbes!==C)&&(r.directional.length=p,r.spot.length=g,r.rectArea.length=m,r.point.length=v,r.hemi.length=f,r.directionalShadow.length=_,r.directionalShadowMap.length=_,r.pointShadow.length=M,r.pointShadowMap.length=M,r.spotShadow.length=y,r.spotShadowMap.length=y,r.directionalShadowMatrix.length=_,r.pointShadowMatrix.length=M,r.spotLightMatrix.length=y+T-E,r.spotLightMap.length=T,r.numSpotLightShadowsWithMaps=E,r.numLightProbes=C,x.directionalLength=p,x.pointLength=v,x.spotLength=g,x.rectAreaLength=m,x.hemiLength=f,x.numDirectionalShadows=_,x.numPointShadows=M,x.numSpotShadows=y,x.numSpotMaps=T,x.numLightProbes=C,r.version=n_++)}function l(c,h){let d=0,u=0,p=0,v=0,g=0,m=h.matrixWorldInverse;for(let f=0,_=c.length;f<_;f++){let M=c[f];if(M.isDirectionalLight){let y=r.directional[d];y.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),d++}else if(M.isSpotLight){let y=r.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){let y=r.rectArea[v];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),s.identity(),n.copy(M.matrixWorld),n.premultiply(m),s.extractRotation(n),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(s),y.halfHeight.applyMatrix4(s),v++}else if(M.isPointLight){let y=r.point[u];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){let y=r.hemi[g];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:r}}function Pc(e){let t=new o_(e),i=[],r=[],a=[];function n(u){d.camera=u,i.length=0,r.length=0,a.length=0}function s(u){i.push(u)}function o(u){r.push(u)}function l(u){a.push(u)}function c(){t.setup(i)}function h(u){t.setupView(i,u)}let d={lightsArray:i,shadowsArray:r,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:n,state:d,setupLights:c,setupLightsView:h,pushLight:s,pushShadow:o,pushLightProbeGrid:l}}function l_(e){let t=new WeakMap;function i(a,n=0){let s=t.get(a),o;return s===void 0?(o=new Pc(e),t.set(a,[o])):n>=s.length?(o=new Pc(e),s.push(o)):o=s[n],o}function r(){t=new WeakMap}return{get:i,dispose:r}}function p_(e,t,i){let r=new Uo,a=new Pe,n=new Pe,s=new nt,o=new Yp,l=new Kp,c={},h=i.maxTextureSize,d={[Ni]:Bt,[Bt]:Ni,[ti]:ti},u=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:c_,fragmentShader:h_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let v=new Pt;v.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Dt(v,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nn;let f=this.type;this.render=function(E,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===zc&&(be("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=nn);let w=e.getRenderTarget(),U=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Pi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let j=f!==this.type;j&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(H=>H.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,H=E.length;O<H;O++){let W=E[O],k=W.shadow;if(k===void 0){be("WebGLShadowMap:",W,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;a.copy(k.mapSize);let ee=k.getFrameExtents();a.multiply(ee),n.copy(k.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(n.x=Math.floor(h/ee.x),a.x=n.x*ee.x,k.mapSize.x=n.x),a.y>h&&(n.y=Math.floor(h/ee.y),a.y=n.y*ee.y,k.mapSize.y=n.y));let te=e.state.buffers.depth.getReversed();if(k.camera._reversedDepth=te,k.map===null||j===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ha){if(W.isPointLight){be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new ni(a.x,a.y,{format:hr,type:xi,minFilter:Mt,magFilter:Mt,generateMipmaps:!1}),k.map.texture.name=W.name+".shadowMap",k.map.depthTexture=new Gr(a.x,a.y,Yt),k.map.depthTexture.name=W.name+".shadowMapDepth",k.map.depthTexture.format=Di,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=yt,k.map.depthTexture.magFilter=yt}else W.isPointLight?(k.map=new Wh(a.x),k.map.depthTexture=new yp(a.x,_i)):(k.map=new ni(a.x,a.y),k.map.depthTexture=new Gr(a.x,a.y,_i)),k.map.depthTexture.name=W.name+".shadowMap",k.map.depthTexture.format=Di,this.type===nn?(k.map.depthTexture.compareFunction=te?Lo:Co,k.map.depthTexture.minFilter=Mt,k.map.depthTexture.magFilter=Mt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=yt,k.map.depthTexture.magFilter=yt);k.camera.updateProjectionMatrix()}let ne=k.map.isWebGLCubeRenderTarget?6:1;for(let ce=0;ce<ne;ce++){if(k.map.isWebGLCubeRenderTarget)e.setRenderTarget(k.map,ce),e.clear();else{ce===0&&(e.setRenderTarget(k.map),e.clear());let Se=k.getViewport(ce);s.set(n.x*Se.x,n.y*Se.y,n.x*Se.z,n.y*Se.w),B.viewport(s)}if(W.isPointLight){let Se=k.camera,De=k.matrix,Oe=W.distance||Se.far;Oe!==Se.far&&(Se.far=Oe,Se.updateProjectionMatrix()),la.setFromMatrixPosition(W.matrixWorld),Se.position.copy(la),_s.copy(Se.position),_s.add(u_[ce]),Se.up.copy(d_[ce]),Se.lookAt(_s),Se.updateMatrixWorld(),De.makeTranslation(-la.x,-la.y,-la.z),Ic.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Ic,Se.coordinateSystem,Se.reversedDepth)}else k.updateMatrices(W);r=k.getFrustum(),y(C,x,k.camera,W,this.type)}k.isPointLightShadow!==!0&&this.type===ha&&_(k,x),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(w,U,R)};function _(E,C){let x=t.update(g);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ni(a.x,a.y,{format:hr,type:xi})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,e.setRenderTarget(E.mapPass),e.clear(),e.renderBufferDirect(C,null,x,u,g,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,e.setRenderTarget(E.map),e.clear(),e.renderBufferDirect(C,null,x,p,g,null)}function M(E,C,x,w){let U=null,R=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)U=R;else if(U=x.isPointLight===!0?l:o,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let B=U.uuid,j=C.uuid,O=c[B];O===void 0&&(O={},c[B]=O);let H=O[j];H===void 0&&(H=U.clone(),O[j]=H,C.addEventListener("dispose",T)),U=H}if(U.visible=C.visible,U.wireframe=C.wireframe,w===ha?U.side=C.shadowSide!==null?C.shadowSide:C.side:U.side=C.shadowSide!==null?C.shadowSide:d[C.side],U.alphaMap=C.alphaMap,U.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,U.map=C.map,U.clipShadows=C.clipShadows,U.clippingPlanes=C.clippingPlanes,U.clipIntersection=C.clipIntersection,U.displacementMap=C.displacementMap,U.displacementScale=C.displacementScale,U.displacementBias=C.displacementBias,U.wireframeLinewidth=C.wireframeLinewidth,U.linewidth=C.linewidth,x.isPointLight===!0&&U.isMeshDistanceMaterial===!0){let B=e.properties.get(U);B.light=x}return U}function y(E,C,x,w,U){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&U===ha)&&(!E.frustumCulled||r.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);let B=t.update(E),j=E.material;if(Array.isArray(j)){let O=B.groups;for(let H=0,W=O.length;H<W;H++){let k=O[H],ee=j[k.materialIndex];if(ee&&ee.visible){let te=M(E,ee,w,U);E.onBeforeShadow(e,E,C,x,B,te,k),e.renderBufferDirect(x,null,B,te,E,k),E.onAfterShadow(e,E,C,x,B,te,k)}}}else if(j.visible){let O=M(E,j,w,U);E.onBeforeShadow(e,E,C,x,B,O,null),e.renderBufferDirect(x,null,B,O,E,null),E.onAfterShadow(e,E,C,x,B,O,null)}}let R=E.children;for(let B=0,j=R.length;B<j;B++)y(R[B],C,x,w,U)}function T(E){E.target.removeEventListener("dispose",T);for(let C in c){let x=c[C],w=E.target.uuid;w in x&&(x[w].dispose(),delete x[w])}}}function f_(e,t){function i(){let I=!1,$=new nt,se=null,ue=new nt(0,0,0,0);return{setMask:function(Te){se!==Te&&!I&&(e.colorMask(Te,Te,Te,Te),se=Te)},setLocked:function(Te){I=Te},setClear:function(Te,ie,Ee,Fe,Ut){Ut===!0&&(Te*=Fe,ie*=Fe,Ee*=Fe),$.set(Te,ie,Ee,Fe),ue.equals($)===!1&&(e.clearColor(Te,ie,Ee,Fe),ue.copy($))},reset:function(){I=!1,se=null,ue.set(-1,0,0,0)}}}function r(){let I=!1,$=!1,se=null,ue=null,Te=null;return{setReversed:function(ie){if($!==ie){let Ee=t.get("EXT_clip_control");ie?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),$=ie;let Fe=Te;Te=null,this.setClear(Fe)}},getReversed:function(){return $},setTest:function(ie){ie?pe(e.DEPTH_TEST):Ae(e.DEPTH_TEST)},setMask:function(ie){se!==ie&&!I&&(e.depthMask(ie),se=ie)},setFunc:function(ie){if($&&(ie=Ed[ie]),ue!==ie){switch(ie){case Ts:e.depthFunc(e.NEVER);break;case ws:e.depthFunc(e.ALWAYS);break;case Es:e.depthFunc(e.LESS);break;case Or:e.depthFunc(e.LEQUAL);break;case As:e.depthFunc(e.EQUAL);break;case Rs:e.depthFunc(e.GEQUAL);break;case Cs:e.depthFunc(e.GREATER);break;case Ls:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ue=ie}},setLocked:function(ie){I=ie},setClear:function(ie){Te!==ie&&(Te=ie,$&&(ie=1-ie),e.clearDepth(ie))},reset:function(){I=!1,se=null,ue=null,Te=null,$=!1}}}function a(){let I=!1,$=null,se=null,ue=null,Te=null,ie=null,Ee=null,Fe=null,Ut=null;return{setTest:function(ht){I||(ht?pe(e.STENCIL_TEST):Ae(e.STENCIL_TEST))},setMask:function(ht){$!==ht&&!I&&(e.stencilMask(ht),$=ht)},setFunc:function(ht,ci,Jt){(se!==ht||ue!==ci||Te!==Jt)&&(e.stencilFunc(ht,ci,Jt),se=ht,ue=ci,Te=Jt)},setOp:function(ht,ci,Jt){(ie!==ht||Ee!==ci||Fe!==Jt)&&(e.stencilOp(ht,ci,Jt),ie=ht,Ee=ci,Fe=Jt)},setLocked:function(ht){I=ht},setClear:function(ht){Ut!==ht&&(e.clearStencil(ht),Ut=ht)},reset:function(){I=!1,$=null,se=null,ue=null,Te=null,ie=null,Ee=null,Fe=null,Ut=null}}}let n=new i,s=new r,o=new a,l=new WeakMap,c=new WeakMap,h={},d={},u={},p=new WeakMap,v=[],g=null,m=!1,f=null,_=null,M=null,y=null,T=null,E=null,C=null,x=new ze(0,0,0),w=0,U=!1,R=null,B=null,j=null,O=null,H=null,W=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,ee=0,te=e.getParameter(e.VERSION);te.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(te)[1]),k=ee>=1):te.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),k=ee>=2);let ne=null,ce={},Se=e.getParameter(e.SCISSOR_BOX),De=e.getParameter(e.VIEWPORT),Oe=new nt().fromArray(Se),Z=new nt().fromArray(De);function le(I,$,se,ue){let Te=new Uint8Array(4),ie=e.createTexture();e.bindTexture(I,ie),e.texParameteri(I,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(I,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ee=0;Ee<se;Ee++)I===e.TEXTURE_3D||I===e.TEXTURE_2D_ARRAY?e.texImage3D($,0,e.RGBA,1,1,ue,0,e.RGBA,e.UNSIGNED_BYTE,Te):e.texImage2D($+Ee,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Te);return ie}let ge={};ge[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ge[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ge[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),n.setClear(0,0,0,1),s.setClear(1),o.setClear(0),pe(e.DEPTH_TEST),s.setFunc(Or),it(!1),ot(fl),pe(e.CULL_FACE),$e(Pi);function pe(I){h[I]!==!0&&(e.enable(I),h[I]=!0)}function Ae(I){h[I]!==!1&&(e.disable(I),h[I]=!1)}function Ie(I,$){return u[I]!==$?(e.bindFramebuffer(I,$),u[I]=$,I===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=$),I===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=$),!0):!1}function J(I,$){let se=v,ue=!1;if(I){se=p.get($),se===void 0&&(se=[],p.set($,se));let Te=I.textures;if(se.length!==Te.length||se[0]!==e.COLOR_ATTACHMENT0){for(let ie=0,Ee=Te.length;ie<Ee;ie++)se[ie]=e.COLOR_ATTACHMENT0+ie;se.length=Te.length,ue=!0}}else se[0]!==e.BACK&&(se[0]=e.BACK,ue=!0);ue&&e.drawBuffers(se)}function Re(I){return g!==I?(e.useProgram(I),g=I,!0):!1}let _e={[nr]:e.FUNC_ADD,[Vu]:e.FUNC_SUBTRACT,[Hu]:e.FUNC_REVERSE_SUBTRACT};_e[Wu]=e.MIN,_e[Xu]=e.MAX;let Ye={[ju]:e.ZERO,[qu]:e.ONE,[Yu]:e.SRC_COLOR,[ys]:e.SRC_ALPHA,[ed]:e.SRC_ALPHA_SATURATE,[$u]:e.DST_COLOR,[Zu]:e.DST_ALPHA,[Ku]:e.ONE_MINUS_SRC_COLOR,[bs]:e.ONE_MINUS_SRC_ALPHA,[Qu]:e.ONE_MINUS_DST_COLOR,[Ju]:e.ONE_MINUS_DST_ALPHA,[td]:e.CONSTANT_COLOR,[id]:e.ONE_MINUS_CONSTANT_COLOR,[rd]:e.CONSTANT_ALPHA,[ad]:e.ONE_MINUS_CONSTANT_ALPHA};function $e(I,$,se,ue,Te,ie,Ee,Fe,Ut,ht){if(I===Pi){m===!0&&(Ae(e.BLEND),m=!1);return}if(m===!1&&(pe(e.BLEND),m=!0),I!==Gu){if(I!==f||ht!==U){if((_!==nr||T!==nr)&&(e.blendEquation(e.FUNC_ADD),_=nr,T=nr),ht)switch(I){case Nr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ml:e.blendFunc(e.ONE,e.ONE);break;case gl:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case vl:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Ue("WebGLState: Invalid blending: ",I);break}else switch(I){case Nr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ml:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case gl:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vl:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",I);break}M=null,y=null,E=null,C=null,x.set(0,0,0),w=0,f=I,U=ht}return}Te=Te||$,ie=ie||se,Ee=Ee||ue,($!==_||Te!==T)&&(e.blendEquationSeparate(_e[$],_e[Te]),_=$,T=Te),(se!==M||ue!==y||ie!==E||Ee!==C)&&(e.blendFuncSeparate(Ye[se],Ye[ue],Ye[ie],Ye[Ee]),M=se,y=ue,E=ie,C=Ee),(Fe.equals(x)===!1||Ut!==w)&&(e.blendColor(Fe.r,Fe.g,Fe.b,Ut),x.copy(Fe),w=Ut),f=I,U=!1}function pt(I,$){I.side===ti?Ae(e.CULL_FACE):pe(e.CULL_FACE);let se=I.side===Bt;$&&(se=!se),it(se),I.blending===Nr&&I.transparent===!1?$e(Pi):$e(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),n.setMask(I.colorWrite);let ue=I.stencilWrite;o.setTest(ue),ue&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),mt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?pe(e.SAMPLE_ALPHA_TO_COVERAGE):Ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function it(I){R!==I&&(I?e.frontFace(e.CW):e.frontFace(e.CCW),R=I)}function ot(I){I!==zu?(pe(e.CULL_FACE),I!==B&&(I===fl?e.cullFace(e.BACK):I===ku?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ae(e.CULL_FACE),B=I}function D(I){I!==j&&(k&&e.lineWidth(I),j=I)}function mt(I,$,se){I?(pe(e.POLYGON_OFFSET_FILL),(O!==$||H!==se)&&(O=$,H=se,s.getReversed()&&($=-$),e.polygonOffset($,se))):Ae(e.POLYGON_OFFSET_FILL)}function we(I){I?pe(e.SCISSOR_TEST):Ae(e.SCISSOR_TEST)}function Xe(I){I===void 0&&(I=e.TEXTURE0+W-1),ne!==I&&(e.activeTexture(I),ne=I)}function de(I,$,se){se===void 0&&(ne===null?se=e.TEXTURE0+W-1:se=ne);let ue=ce[se];ue===void 0&&(ue={type:void 0,texture:void 0},ce[se]=ue),(ue.type!==I||ue.texture!==$)&&(ne!==se&&(e.activeTexture(se),ne=se),e.bindTexture(I,$||ge[I]),ue.type=I,ue.texture=$)}function rt(){let I=ce[ne];I!==void 0&&I.type!==void 0&&(e.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function A(){try{e.compressedTexImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function S(){try{e.texSubImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function G(){try{e.texSubImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function N(){try{e.compressedTexSubImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function z(){try{e.compressedTexSubImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function Y(){try{e.texStorage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function Q(){try{e.texStorage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function P(){try{e.texImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function ae(){try{e.texImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function re(I){return d[I]!==void 0?d[I]:e.getParameter(I)}function he(I,$){d[I]!==$&&(e.pixelStorei(I,$),d[I]=$)}function K(I){Oe.equals(I)===!1&&(e.scissor(I.x,I.y,I.z,I.w),Oe.copy(I))}function ve(I){Z.equals(I)===!1&&(e.viewport(I.x,I.y,I.z,I.w),Z.copy(I))}function Le(I,$){let se=c.get($);se===void 0&&(se=new WeakMap,c.set($,se));let ue=se.get(I);ue===void 0&&(ue=e.getUniformBlockIndex($,I.name),se.set(I,ue))}function ke(I,$){let se=c.get($).get(I);l.get($)!==se&&(e.uniformBlockBinding($,se,I.__bindingPointIndex),l.set($,se))}function Ge(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),s.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),h={},d={},ne=null,ce={},u={},p=new WeakMap,v=[],g=null,m=!1,f=null,_=null,M=null,y=null,T=null,E=null,C=null,x=new ze(0,0,0),w=0,U=!1,R=null,B=null,j=null,O=null,H=null,Oe.set(0,0,e.canvas.width,e.canvas.height),Z.set(0,0,e.canvas.width,e.canvas.height),n.reset(),s.reset(),o.reset()}return{buffers:{color:n,depth:s,stencil:o},enable:pe,disable:Ae,bindFramebuffer:Ie,drawBuffers:J,useProgram:Re,setBlending:$e,setMaterial:pt,setFlipSided:it,setCullFace:ot,setLineWidth:D,setPolygonOffset:mt,setScissorTest:we,activeTexture:Xe,bindTexture:de,unbindTexture:rt,compressedTexImage2D:Ce,compressedTexImage3D:A,texImage2D:P,texImage3D:ae,pixelStorei:he,getParameter:re,updateUBOMapping:Le,uniformBlockBinding:ke,texStorage2D:Y,texStorage3D:Q,texSubImage2D:S,texSubImage3D:G,compressedTexSubImage2D:N,compressedTexSubImage3D:z,scissor:K,viewport:ve,reset:Ge}}function m_(e,t,i,r,a,n,s){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,h=new WeakMap,d=new Set,u,p=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return v?new OffscreenCanvas(A,S):ba("canvas")}function m(A,S,G){let N=1,z=Ce(A);if((z.width>G||z.height>G)&&(N=G/Math.max(z.width,z.height)),N<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let Y=Math.floor(N*z.width),Q=Math.floor(N*z.height);u===void 0&&(u=g(Y,Q));let P=S?g(Y,Q):u;return P.width=Y,P.height=Q,P.getContext("2d").drawImage(A,0,0,Y,Q),be("WebGLRenderer: Texture has been resized from ("+z.width+"x"+z.height+") to ("+Y+"x"+Q+")."),P}else return"data"in A&&be("WebGLRenderer: Image in DataTexture is too big ("+z.width+"x"+z.height+")."),A;return A}function f(A){return A.generateMipmaps}function _(A){e.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(A,S,G,N,z,Y=!1){if(A!==null){if(e[A]!==void 0)return e[A];be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Q;N&&(Q=t.get("EXT_texture_norm16"),Q||be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let P=S;if(S===e.RED&&(G===e.FLOAT&&(P=e.R32F),G===e.HALF_FLOAT&&(P=e.R16F),G===e.UNSIGNED_BYTE&&(P=e.R8),G===e.UNSIGNED_SHORT&&Q&&(P=Q.R16_EXT),G===e.SHORT&&Q&&(P=Q.R16_SNORM_EXT)),S===e.RED_INTEGER&&(G===e.UNSIGNED_BYTE&&(P=e.R8UI),G===e.UNSIGNED_SHORT&&(P=e.R16UI),G===e.UNSIGNED_INT&&(P=e.R32UI),G===e.BYTE&&(P=e.R8I),G===e.SHORT&&(P=e.R16I),G===e.INT&&(P=e.R32I)),S===e.RG&&(G===e.FLOAT&&(P=e.RG32F),G===e.HALF_FLOAT&&(P=e.RG16F),G===e.UNSIGNED_BYTE&&(P=e.RG8),G===e.UNSIGNED_SHORT&&Q&&(P=Q.RG16_EXT),G===e.SHORT&&Q&&(P=Q.RG16_SNORM_EXT)),S===e.RG_INTEGER&&(G===e.UNSIGNED_BYTE&&(P=e.RG8UI),G===e.UNSIGNED_SHORT&&(P=e.RG16UI),G===e.UNSIGNED_INT&&(P=e.RG32UI),G===e.BYTE&&(P=e.RG8I),G===e.SHORT&&(P=e.RG16I),G===e.INT&&(P=e.RG32I)),S===e.RGB_INTEGER&&(G===e.UNSIGNED_BYTE&&(P=e.RGB8UI),G===e.UNSIGNED_SHORT&&(P=e.RGB16UI),G===e.UNSIGNED_INT&&(P=e.RGB32UI),G===e.BYTE&&(P=e.RGB8I),G===e.SHORT&&(P=e.RGB16I),G===e.INT&&(P=e.RGB32I)),S===e.RGBA_INTEGER&&(G===e.UNSIGNED_BYTE&&(P=e.RGBA8UI),G===e.UNSIGNED_SHORT&&(P=e.RGBA16UI),G===e.UNSIGNED_INT&&(P=e.RGBA32UI),G===e.BYTE&&(P=e.RGBA8I),G===e.SHORT&&(P=e.RGBA16I),G===e.INT&&(P=e.RGBA32I)),S===e.RGB&&(G===e.UNSIGNED_SHORT&&Q&&(P=Q.RGB16_EXT),G===e.SHORT&&Q&&(P=Q.RGB16_SNORM_EXT),G===e.UNSIGNED_INT_5_9_9_9_REV&&(P=e.RGB9_E5),G===e.UNSIGNED_INT_10F_11F_11F_REV&&(P=e.R11F_G11F_B10F)),S===e.RGBA){let ae=Y?_n:Ze.getTransfer(z);G===e.FLOAT&&(P=e.RGBA32F),G===e.HALF_FLOAT&&(P=e.RGBA16F),G===e.UNSIGNED_BYTE&&(P=ae===Qe?e.SRGB8_ALPHA8:e.RGBA8),G===e.UNSIGNED_SHORT&&Q&&(P=Q.RGBA16_EXT),G===e.SHORT&&Q&&(P=Q.RGBA16_SNORM_EXT),G===e.UNSIGNED_SHORT_4_4_4_4&&(P=e.RGBA4),G===e.UNSIGNED_SHORT_5_5_5_1&&(P=e.RGB5_A1)}return(P===e.R16F||P===e.R32F||P===e.RG16F||P===e.RG32F||P===e.RGBA16F||P===e.RGBA32F)&&t.get("EXT_color_buffer_float"),P}function T(A,S){let G;return A?S===null||S===_i||S===xa?G=e.DEPTH24_STENCIL8:S===Yt?G=e.DEPTH32F_STENCIL8:S===_a&&(G=e.DEPTH24_STENCIL8,be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===_i||S===xa?G=e.DEPTH_COMPONENT24:S===Yt?G=e.DEPTH_COMPONENT32F:S===_a&&(G=e.DEPTH_COMPONENT16),G}function E(A,S){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==yt&&A.minFilter!==Mt?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function C(A){let S=A.target;S.removeEventListener("dispose",C),w(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&d.delete(S)}function x(A){let S=A.target;S.removeEventListener("dispose",x),R(S)}function w(A){let S=r.get(A);if(S.__webglInit===void 0)return;let G=A.source,N=p.get(G);if(N){let z=N[S.__cacheKey];z.usedTimes--,z.usedTimes===0&&U(A),Object.keys(N).length===0&&p.delete(G)}r.remove(A)}function U(A){let S=r.get(A);e.deleteTexture(S.__webglTexture);let G=A.source,N=p.get(G);delete N[S.__cacheKey],s.memory.textures--}function R(A){let S=r.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),r.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(S.__webglFramebuffer[N]))for(let z=0;z<S.__webglFramebuffer[N].length;z++)e.deleteFramebuffer(S.__webglFramebuffer[N][z]);else e.deleteFramebuffer(S.__webglFramebuffer[N]);S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[N])}else{if(Array.isArray(S.__webglFramebuffer))for(let N=0;N<S.__webglFramebuffer.length;N++)e.deleteFramebuffer(S.__webglFramebuffer[N]);else e.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let N=0;N<S.__webglColorRenderbuffer.length;N++)S.__webglColorRenderbuffer[N]&&e.deleteRenderbuffer(S.__webglColorRenderbuffer[N]);S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let G=A.textures;for(let N=0,z=G.length;N<z;N++){let Y=r.get(G[N]);Y.__webglTexture&&(e.deleteTexture(Y.__webglTexture),s.memory.textures--),r.remove(G[N])}r.remove(A)}let B=0;function j(){B=0}function O(){return B}function H(A){B=A}function W(){let A=B;return A>=a.maxTextures&&be("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+a.maxTextures),B+=1,A}function k(A){let S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function ee(A,S){let G=r.get(A);if(A.isVideoTexture&&de(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&G.__version!==A.version){let N=A.image;if(N===null)be("WebGLRenderer: Texture marked for update but no image data found.");else if(N.complete===!1)be("WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(G,A,S);return}}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);i.bindTexture(e.TEXTURE_2D,G.__webglTexture,e.TEXTURE0+S)}function te(A,S){let G=r.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){Ae(G,A,S);return}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);i.bindTexture(e.TEXTURE_2D_ARRAY,G.__webglTexture,e.TEXTURE0+S)}function ne(A,S){let G=r.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){Ae(G,A,S);return}i.bindTexture(e.TEXTURE_3D,G.__webglTexture,e.TEXTURE0+S)}function ce(A,S){let G=r.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&G.__version!==A.version){Ie(G,A,S);return}i.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture,e.TEXTURE0+S)}let Se={[cr]:e.REPEAT,[gi]:e.CLAMP_TO_EDGE,[fn]:e.MIRRORED_REPEAT},De={[yt]:e.NEAREST,[Kc]:e.NEAREST_MIPMAP_NEAREST,[ua]:e.NEAREST_MIPMAP_LINEAR,[Mt]:e.LINEAR,[sn]:e.LINEAR_MIPMAP_NEAREST,[Ci]:e.LINEAR_MIPMAP_LINEAR},Oe={[md]:e.NEVER,[Md]:e.ALWAYS,[gd]:e.LESS,[Co]:e.LEQUAL,[vd]:e.EQUAL,[Lo]:e.GEQUAL,[_d]:e.GREATER,[xd]:e.NOTEQUAL};function Z(A,S){if(S.type===Yt&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Mt||S.magFilter===sn||S.magFilter===ua||S.magFilter===Ci||S.minFilter===Mt||S.minFilter===sn||S.minFilter===ua||S.minFilter===Ci)&&be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,Se[S.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,Se[S.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,Se[S.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,De[S.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,De[S.minFilter]),S.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,Oe[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===yt||S.minFilter!==ua&&S.minFilter!==Ci||S.type===Yt&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||r.get(S).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,a.getMaxAnisotropy())),r.get(S).__currentAnisotropy=S.anisotropy}}}function le(A,S){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",C));let N=S.source,z=p.get(N);z===void 0&&(z={},p.set(N,z));let Y=k(S);if(Y!==A.__cacheKey){z[Y]===void 0&&(z[Y]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,G=!0),z[Y].usedTimes++;let Q=z[A.__cacheKey];Q!==void 0&&(z[A.__cacheKey].usedTimes--,Q.usedTimes===0&&U(S)),A.__cacheKey=Y,A.__webglTexture=z[Y].texture}return G}function ge(A,S,G){return Math.floor(Math.floor(A/G)/S)}function pe(A,S,G,N){let z=A.updateRanges;if(z.length===0)i.texSubImage2D(e.TEXTURE_2D,0,0,0,S.width,S.height,G,N,S.data);else{z.sort((re,he)=>re.start-he.start);let Y=0;for(let re=1;re<z.length;re++){let he=z[Y],K=z[re],ve=he.start+he.count,Le=ge(K.start,S.width,4),ke=ge(he.start,S.width,4);K.start<=ve+1&&Le===ke&&ge(K.start+K.count-1,S.width,4)===Le?he.count=Math.max(he.count,K.start+K.count-he.start):(++Y,z[Y]=K)}z.length=Y+1;let Q=i.getParameter(e.UNPACK_ROW_LENGTH),P=i.getParameter(e.UNPACK_SKIP_PIXELS),ae=i.getParameter(e.UNPACK_SKIP_ROWS);i.pixelStorei(e.UNPACK_ROW_LENGTH,S.width);for(let re=0,he=z.length;re<he;re++){let K=z[re],ve=Math.floor(K.start/4),Le=Math.ceil(K.count/4),ke=ve%S.width,Ge=Math.floor(ve/S.width),I=Le;i.pixelStorei(e.UNPACK_SKIP_PIXELS,ke),i.pixelStorei(e.UNPACK_SKIP_ROWS,Ge),i.texSubImage2D(e.TEXTURE_2D,0,ke,Ge,I,1,G,N,S.data)}A.clearUpdateRanges(),i.pixelStorei(e.UNPACK_ROW_LENGTH,Q),i.pixelStorei(e.UNPACK_SKIP_PIXELS,P),i.pixelStorei(e.UNPACK_SKIP_ROWS,ae)}}function Ae(A,S,G){let N=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(N=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(N=e.TEXTURE_3D);let z=le(A,S),Y=S.source;i.bindTexture(N,A.__webglTexture,e.TEXTURE0+G);let Q=r.get(Y);if(Y.version!==Q.__version||z===!0){if(i.activeTexture(e.TEXTURE0+G),!(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)){let $=Ze.getPrimaries(Ze.workingColorSpace),se=S.colorSpace===ji?null:Ze.getPrimaries(S.colorSpace),ue=S.colorSpace===ji||$===se?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue)}i.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment);let P=m(S.image,!1,a.maxTextureSize);P=rt(S,P);let ae=n.convert(S.format,S.colorSpace),re=n.convert(S.type),he=y(S.internalFormat,ae,re,S.normalized,S.colorSpace,S.isVideoTexture);Z(N,S);let K,ve=S.mipmaps,Le=S.isVideoTexture!==!0,ke=Q.__version===void 0||z===!0,Ge=Y.dataReady,I=E(S,P);if(S.isDepthTexture)he=T(S.format===or,S.type),ke&&(Le?i.texStorage2D(e.TEXTURE_2D,1,he,P.width,P.height):i.texImage2D(e.TEXTURE_2D,0,he,P.width,P.height,0,ae,re,null));else if(S.isDataTexture)if(ve.length>0){Le&&ke&&i.texStorage2D(e.TEXTURE_2D,I,he,ve[0].width,ve[0].height);for(let $=0,se=ve.length;$<se;$++)K=ve[$],Le?Ge&&i.texSubImage2D(e.TEXTURE_2D,$,0,0,K.width,K.height,ae,re,K.data):i.texImage2D(e.TEXTURE_2D,$,he,K.width,K.height,0,ae,re,K.data);S.generateMipmaps=!1}else Le?(ke&&i.texStorage2D(e.TEXTURE_2D,I,he,P.width,P.height),Ge&&pe(S,P,ae,re)):i.texImage2D(e.TEXTURE_2D,0,he,P.width,P.height,0,ae,re,P.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Le&&ke&&i.texStorage3D(e.TEXTURE_2D_ARRAY,I,he,ve[0].width,ve[0].height,P.depth);for(let $=0,se=ve.length;$<se;$++)if(K=ve[$],S.format!==Kt)if(ae!==null)if(Le){if(Ge)if(S.layerUpdates.size>0){let ue=cc(K.width,K.height,S.format,S.type);for(let Te of S.layerUpdates){let ie=K.data.subarray(Te*ue/K.data.BYTES_PER_ELEMENT,(Te+1)*ue/K.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,Te,K.width,K.height,1,ae,ie)}S.clearLayerUpdates()}else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,K.width,K.height,P.depth,ae,K.data)}else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,he,K.width,K.height,P.depth,0,K.data,0,0);else be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?Ge&&i.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,K.width,K.height,P.depth,ae,re,K.data):i.texImage3D(e.TEXTURE_2D_ARRAY,$,he,K.width,K.height,P.depth,0,ae,re,K.data)}else{Le&&ke&&i.texStorage2D(e.TEXTURE_2D,I,he,ve[0].width,ve[0].height);for(let $=0,se=ve.length;$<se;$++)K=ve[$],S.format!==Kt?ae!==null?Le?Ge&&i.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,K.width,K.height,ae,K.data):i.compressedTexImage2D(e.TEXTURE_2D,$,he,K.width,K.height,0,K.data):be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?Ge&&i.texSubImage2D(e.TEXTURE_2D,$,0,0,K.width,K.height,ae,re,K.data):i.texImage2D(e.TEXTURE_2D,$,he,K.width,K.height,0,ae,re,K.data)}else if(S.isDataArrayTexture)if(Le){if(ke&&i.texStorage3D(e.TEXTURE_2D_ARRAY,I,he,P.width,P.height,P.depth),Ge)if(S.layerUpdates.size>0){let $=cc(P.width,P.height,S.format,S.type);for(let se of S.layerUpdates){let ue=P.data.subarray(se*$/P.data.BYTES_PER_ELEMENT,(se+1)*$/P.data.BYTES_PER_ELEMENT);i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,se,P.width,P.height,1,ae,re,ue)}S.clearLayerUpdates()}else i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,P.width,P.height,P.depth,ae,re,P.data)}else i.texImage3D(e.TEXTURE_2D_ARRAY,0,he,P.width,P.height,P.depth,0,ae,re,P.data);else if(S.isData3DTexture)Le?(ke&&i.texStorage3D(e.TEXTURE_3D,I,he,P.width,P.height,P.depth),Ge&&i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,P.width,P.height,P.depth,ae,re,P.data)):i.texImage3D(e.TEXTURE_3D,0,he,P.width,P.height,P.depth,0,ae,re,P.data);else if(S.isFramebufferTexture){if(ke)if(Le)i.texStorage2D(e.TEXTURE_2D,I,he,P.width,P.height);else{let $=P.width,se=P.height;for(let ue=0;ue<I;ue++)i.texImage2D(e.TEXTURE_2D,ue,he,$,se,0,ae,re,null),$>>=1,se>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in e){let $=e.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),P.parentNode!==$){$.appendChild(P),d.add(S),$.onpaint=Ee=>{let Fe=Ee.changedElements;for(let Ut of d)Fe.includes(Ut.image)&&(Ut.needsUpdate=!0)},$.requestPaint();return}let se=0,ue=e.RGBA,Te=e.RGBA,ie=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,se,ue,Te,ie,P),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(ve.length>0){if(Le&&ke){let $=Ce(ve[0]);i.texStorage2D(e.TEXTURE_2D,I,he,$.width,$.height)}for(let $=0,se=ve.length;$<se;$++)K=ve[$],Le?Ge&&i.texSubImage2D(e.TEXTURE_2D,$,0,0,ae,re,K):i.texImage2D(e.TEXTURE_2D,$,he,ae,re,K);S.generateMipmaps=!1}else if(Le){if(ke){let $=Ce(P);i.texStorage2D(e.TEXTURE_2D,I,he,$.width,$.height)}Ge&&i.texSubImage2D(e.TEXTURE_2D,0,0,0,ae,re,P)}else i.texImage2D(e.TEXTURE_2D,0,he,ae,re,P);f(S)&&_(N),Q.__version=Y.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Ie(A,S,G){if(S.image.length!==6)return;let N=le(A,S),z=S.source;i.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+G);let Y=r.get(z);if(z.version!==Y.__version||N===!0){i.activeTexture(e.TEXTURE0+G);let Q=Ze.getPrimaries(Ze.workingColorSpace),P=S.colorSpace===ji?null:Ze.getPrimaries(S.colorSpace),ae=S.colorSpace===ji||Q===P?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let re=S.isCompressedTexture||S.image[0].isCompressedTexture,he=S.image[0]&&S.image[0].isDataTexture,K=[];for(let ie=0;ie<6;ie++)!re&&!he?K[ie]=m(S.image[ie],!0,a.maxCubemapSize):K[ie]=he?S.image[ie].image:S.image[ie],K[ie]=rt(S,K[ie]);let ve=K[0],Le=n.convert(S.format,S.colorSpace),ke=n.convert(S.type),Ge=y(S.internalFormat,Le,ke,S.normalized,S.colorSpace),I=S.isVideoTexture!==!0,$=Y.__version===void 0||N===!0,se=z.dataReady,ue=E(S,ve);Z(e.TEXTURE_CUBE_MAP,S);let Te;if(re){I&&$&&i.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ge,ve.width,ve.height);for(let ie=0;ie<6;ie++){Te=K[ie].mipmaps;for(let Ee=0;Ee<Te.length;Ee++){let Fe=Te[Ee];S.format!==Kt?Le!==null?I?se&&i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee,0,0,Fe.width,Fe.height,Le,Fe.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee,Ge,Fe.width,Fe.height,0,Fe.data):be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?se&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee,0,0,Fe.width,Fe.height,Le,ke,Fe.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee,Ge,Fe.width,Fe.height,0,Le,ke,Fe.data)}}}else{if(Te=S.mipmaps,I&&$){Te.length>0&&ue++;let ie=Ce(K[0]);i.texStorage2D(e.TEXTURE_CUBE_MAP,ue,Ge,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(he){I?se&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,K[ie].width,K[ie].height,Le,ke,K[ie].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ge,K[ie].width,K[ie].height,0,Le,ke,K[ie].data);for(let Ee=0;Ee<Te.length;Ee++){let Fe=Te[Ee].image[ie].image;I?se&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee+1,0,0,Fe.width,Fe.height,Le,ke,Fe.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee+1,Ge,Fe.width,Fe.height,0,Le,ke,Fe.data)}}else{I?se&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Le,ke,K[ie]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ge,Le,ke,K[ie]);for(let Ee=0;Ee<Te.length;Ee++){let Fe=Te[Ee];I?se&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee+1,0,0,Le,ke,Fe.image[ie]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee+1,Ge,Le,ke,Fe.image[ie])}}}f(S)&&_(e.TEXTURE_CUBE_MAP),Y.__version=z.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function J(A,S,G,N,z,Y){let Q=n.convert(G.format,G.colorSpace),P=n.convert(G.type),ae=y(G.internalFormat,Q,P,G.normalized,G.colorSpace),re=r.get(S),he=r.get(G);if(he.__renderTarget=S,!re.__hasExternalTextures){let K=Math.max(1,S.width>>Y),ve=Math.max(1,S.height>>Y);z===e.TEXTURE_3D||z===e.TEXTURE_2D_ARRAY?i.texImage3D(z,Y,ae,K,ve,S.depth,0,Q,P,null):i.texImage2D(z,Y,ae,K,ve,0,Q,P,null)}i.bindFramebuffer(e.FRAMEBUFFER,A),Xe(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,N,z,he.__webglTexture,0,we(S)):(z===e.TEXTURE_2D||z>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,N,z,he.__webglTexture,Y),i.bindFramebuffer(e.FRAMEBUFFER,null)}function Re(A,S,G){if(e.bindRenderbuffer(e.RENDERBUFFER,A),S.depthBuffer){let N=S.depthTexture,z=N&&N.isDepthTexture?N.type:null,Y=T(S.stencilBuffer,z),Q=S.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Xe(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,we(S),Y,S.width,S.height):G?e.renderbufferStorageMultisample(e.RENDERBUFFER,we(S),Y,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,Y,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,A)}else{let N=S.textures;for(let z=0;z<N.length;z++){let Y=N[z],Q=n.convert(Y.format,Y.colorSpace),P=n.convert(Y.type),ae=y(Y.internalFormat,Q,P,Y.normalized,Y.colorSpace);Xe(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,we(S),ae,S.width,S.height):G?e.renderbufferStorageMultisample(e.RENDERBUFFER,we(S),ae,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,ae,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function _e(A,S,G){let N=S.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(e.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let z=r.get(S.depthTexture);if(z.__renderTarget=S,(!z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),N){if(z.__webglInit===void 0&&(z.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),z.__webglTexture===void 0){z.__webglTexture=e.createTexture(),i.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture),Z(e.TEXTURE_CUBE_MAP,S.depthTexture);let re=n.convert(S.depthTexture.format),he=n.convert(S.depthTexture.type),K;S.depthTexture.format===Di?K=e.DEPTH_COMPONENT24:S.depthTexture.format===or&&(K=e.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,K,S.width,S.height,0,re,he,null)}}else ee(S.depthTexture,0);let Y=z.__webglTexture,Q=we(S),P=N?e.TEXTURE_CUBE_MAP_POSITIVE_X+G:e.TEXTURE_2D,ae=S.depthTexture.format===or?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(S.depthTexture.format===Di)Xe(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,ae,P,Y,0,Q):e.framebufferTexture2D(e.FRAMEBUFFER,ae,P,Y,0);else if(S.depthTexture.format===or)Xe(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,ae,P,Y,0,Q):e.framebufferTexture2D(e.FRAMEBUFFER,ae,P,Y,0);else throw new Error("Unknown depthTexture format")}function Ye(A){let S=r.get(A),G=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){let N=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),N){let z=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,N.removeEventListener("dispose",z)};N.addEventListener("dispose",z),S.__depthDisposeCallback=z}S.__boundDepthTexture=N}if(A.depthTexture&&!S.__autoAllocateDepthBuffer)if(G)for(let N=0;N<6;N++)_e(S.__webglFramebuffer[N],A,N);else{let N=A.texture.mipmaps;N&&N.length>0?_e(S.__webglFramebuffer[0],A,0):_e(S.__webglFramebuffer,A,0)}else if(G){S.__webglDepthbuffer=[];for(let N=0;N<6;N++)if(i.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[N]),S.__webglDepthbuffer[N]===void 0)S.__webglDepthbuffer[N]=e.createRenderbuffer(),Re(S.__webglDepthbuffer[N],A,!1);else{let z=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[N];e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,z,e.RENDERBUFFER,Y)}}else{let N=A.texture.mipmaps;if(N&&N.length>0?i.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[0]):i.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=e.createRenderbuffer(),Re(S.__webglDepthbuffer,A,!1);else{let z=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,z,e.RENDERBUFFER,Y)}}i.bindFramebuffer(e.FRAMEBUFFER,null)}function $e(A,S,G){let N=r.get(A);S!==void 0&&J(N.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),G!==void 0&&Ye(A)}function pt(A){let S=A.texture,G=r.get(A),N=r.get(S);A.addEventListener("dispose",x);let z=A.textures,Y=A.isWebGLCubeRenderTarget===!0,Q=z.length>1;if(Q||(N.__webglTexture===void 0&&(N.__webglTexture=e.createTexture()),N.__version=S.version,s.memory.textures++),Y){G.__webglFramebuffer=[];for(let P=0;P<6;P++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[P]=[];for(let ae=0;ae<S.mipmaps.length;ae++)G.__webglFramebuffer[P][ae]=e.createFramebuffer()}else G.__webglFramebuffer[P]=e.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let P=0;P<S.mipmaps.length;P++)G.__webglFramebuffer[P]=e.createFramebuffer()}else G.__webglFramebuffer=e.createFramebuffer();if(Q)for(let P=0,ae=z.length;P<ae;P++){let re=r.get(z[P]);re.__webglTexture===void 0&&(re.__webglTexture=e.createTexture(),s.memory.textures++)}if(A.samples>0&&Xe(A)===!1){G.__webglMultisampledFramebuffer=e.createFramebuffer(),G.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let P=0;P<z.length;P++){let ae=z[P];G.__webglColorRenderbuffer[P]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,G.__webglColorRenderbuffer[P]);let re=n.convert(ae.format,ae.colorSpace),he=n.convert(ae.type),K=y(ae.internalFormat,re,he,ae.normalized,ae.colorSpace,A.isXRRenderTarget===!0),ve=we(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,ve,K,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+P,e.RENDERBUFFER,G.__webglColorRenderbuffer[P])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=e.createRenderbuffer(),Re(G.__webglDepthRenderbuffer,A,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if(Y){i.bindTexture(e.TEXTURE_CUBE_MAP,N.__webglTexture),Z(e.TEXTURE_CUBE_MAP,S);for(let P=0;P<6;P++)if(S.mipmaps&&S.mipmaps.length>0)for(let ae=0;ae<S.mipmaps.length;ae++)J(G.__webglFramebuffer[P][ae],A,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+P,ae);else J(G.__webglFramebuffer[P],A,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+P,0);f(S)&&_(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Q){for(let P=0,ae=z.length;P<ae;P++){let re=z[P],he=r.get(re),K=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(K=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(K,he.__webglTexture),Z(K,re),J(G.__webglFramebuffer,A,re,e.COLOR_ATTACHMENT0+P,K,0),f(re)&&_(K)}i.unbindTexture()}else{let P=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(P=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(P,N.__webglTexture),Z(P,S),S.mipmaps&&S.mipmaps.length>0)for(let ae=0;ae<S.mipmaps.length;ae++)J(G.__webglFramebuffer[ae],A,S,e.COLOR_ATTACHMENT0,P,ae);else J(G.__webglFramebuffer,A,S,e.COLOR_ATTACHMENT0,P,0);f(S)&&_(P),i.unbindTexture()}A.depthBuffer&&Ye(A)}function it(A){let S=A.textures;for(let G=0,N=S.length;G<N;G++){let z=S[G];if(f(z)){let Y=M(A),Q=r.get(z).__webglTexture;i.bindTexture(Y,Q),_(Y),i.unbindTexture()}}}let ot=[],D=[];function mt(A){if(A.samples>0){if(Xe(A)===!1){let S=A.textures,G=A.width,N=A.height,z=e.COLOR_BUFFER_BIT,Y=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=r.get(A),P=S.length>1;if(P)for(let re=0;re<S.length;re++)i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer);let ae=A.texture.mipmaps;ae&&ae.length>0?i.bindFramebuffer(e.DRAW_FRAMEBUFFER,Q.__webglFramebuffer[0]):i.bindFramebuffer(e.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let re=0;re<S.length;re++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(z|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(z|=e.STENCIL_BUFFER_BIT)),P){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Q.__webglColorRenderbuffer[re]);let he=r.get(S[re]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,he,0)}e.blitFramebuffer(0,0,G,N,0,0,G,N,z,e.NEAREST),l===!0&&(ot.length=0,D.length=0,ot.push(e.COLOR_ATTACHMENT0+re),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ot.push(Y),D.push(Y),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,D)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ot))}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),P)for(let re=0;re<S.length;re++){i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.RENDERBUFFER,Q.__webglColorRenderbuffer[re]);let he=r.get(S[re]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,Q.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+re,e.TEXTURE_2D,he,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let S=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[S])}}}function we(A){return Math.min(a.maxSamples,A.samples)}function Xe(A){let S=r.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function de(A){let S=s.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function rt(A,S){let G=A.colorSpace,N=A.format,z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||G!==Wt&&G!==ji&&(Ze.getTransfer(G)===Qe?(N!==Kt||z!==Vt)&&be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",G)),S}function Ce(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=j,this.getTextureUnits=O,this.setTextureUnits=H,this.setTexture2D=ee,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=ce,this.rebindTextures=$e,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Xe,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function g_(e,t){function i(r,a=ji){let n,s=Ze.getTransfer(a);if(r===Vt)return e.UNSIGNED_BYTE;if(r===yo)return e.UNSIGNED_SHORT_4_4_4_4;if(r===bo)return e.UNSIGNED_SHORT_5_5_5_1;if(r===$c)return e.UNSIGNED_INT_5_9_9_9_REV;if(r===Qc)return e.UNSIGNED_INT_10F_11F_11F_REV;if(r===Zc)return e.BYTE;if(r===Jc)return e.SHORT;if(r===_a)return e.UNSIGNED_SHORT;if(r===So)return e.INT;if(r===_i)return e.UNSIGNED_INT;if(r===Yt)return e.FLOAT;if(r===xi)return e.HALF_FLOAT;if(r===eh)return e.ALPHA;if(r===th)return e.RGB;if(r===Kt)return e.RGBA;if(r===Di)return e.DEPTH_COMPONENT;if(r===or)return e.DEPTH_STENCIL;if(r===To)return e.RED;if(r===wo)return e.RED_INTEGER;if(r===hr)return e.RG;if(r===Eo)return e.RG_INTEGER;if(r===Ao)return e.RGBA_INTEGER;if(r===on||r===ln||r===cn||r===hn)if(s===Qe)if(n=t.get("WEBGL_compressed_texture_s3tc_srgb"),n!==null){if(r===on)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ln)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===cn)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===hn)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(n=t.get("WEBGL_compressed_texture_s3tc"),n!==null){if(r===on)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ln)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===cn)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===hn)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ps||r===Is||r===Ns||r===Ds)if(n=t.get("WEBGL_compressed_texture_pvrtc"),n!==null){if(r===Ps)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Is)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ns)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ds)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Us||r===Os||r===Fs||r===Bs||r===zs||r===mn||r===ks)if(n=t.get("WEBGL_compressed_texture_etc"),n!==null){if(r===Us||r===Os)return s===Qe?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(r===Fs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(r===Bs)return n.COMPRESSED_R11_EAC;if(r===zs)return n.COMPRESSED_SIGNED_R11_EAC;if(r===mn)return n.COMPRESSED_RG11_EAC;if(r===ks)return n.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Gs||r===Vs||r===Hs||r===Ws||r===Xs||r===js||r===qs||r===Ys||r===Ks||r===Zs||r===Js||r===$s||r===Qs||r===eo)if(n=t.get("WEBGL_compressed_texture_astc"),n!==null){if(r===Gs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Vs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Hs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ws)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Xs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===js)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===qs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ys)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ks)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Zs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Js)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===$s)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Qs)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===eo)return s===Qe?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===to||r===io||r===ro)if(n=t.get("EXT_texture_compression_bptc"),n!==null){if(r===to)return s===Qe?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===io)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ro)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ao||r===no||r===gn||r===so)if(n=t.get("EXT_texture_compression_rgtc"),n!==null){if(r===ao)return n.COMPRESSED_RED_RGTC1_EXT;if(r===no)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===gn)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===so)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===xa?e.UNSIGNED_INT_24_8:e[r]!==void 0?e[r]:null}return{convert:i}}function y_(e,t){function i(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function r(m,f){f.color.getRGB(m.fogColor.value,Ph(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,_,M,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?n(m,f):f.isMeshLambertMaterial?(n(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(n(m,f),d(m,f)):f.isMeshPhongMaterial?(n(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(n(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(n(m,f),v(m,f)):f.isMeshDepthMaterial?n(m,f):f.isMeshDistanceMaterial?(n(m,f),g(m,f)):f.isMeshNormalMaterial?n(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,_,M):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function n(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,i(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Bt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,i(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Bt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,i(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,i(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,i(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let _=t.get(f),M=_.envMap,y=_.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(S_.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Kh),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,i(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,i(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,_,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=M*.5,f.map&&(m.map.value=f.map,i(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,i(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,i(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,i(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,i(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,i(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,i(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,i(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Bt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,i(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,i(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,i(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,i(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,i(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,i(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,i(f.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){let _=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function b_(e,t,i,r){let a={},n={},s=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,M){let y=M.program;r.uniformBlockBinding(_,y)}function c(_,M){let y=a[_.id];y===void 0&&(v(_),y=h(_),a[_.id]=y,_.addEventListener("dispose",m));let T=M.program;r.updateUBOMapping(_,T);let E=t.render.frame;n[_.id]!==E&&(u(_),n[_.id]=E)}function h(_){let M=d();_.__bindingPointIndex=M;let y=e.createBuffer(),T=_.__size,E=_.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,T,E),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,y),y}function d(){for(let _=0;_<o;_++)if(s.indexOf(_)===-1)return s.push(_),_;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let M=a[_.id],y=_.uniforms,T=_.__cache;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let E=0,C=y.length;E<C;E++){let x=Array.isArray(y[E])?y[E]:[y[E]];for(let w=0,U=x.length;w<U;w++){let R=x[w];if(p(R,E,w,T)===!0){let B=R.__offset,j=Array.isArray(R.value)?R.value:[R.value],O=0;for(let H=0;H<j.length;H++){let W=j[H],k=g(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,B+O,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):ArrayBuffer.isView(W)?R.__data.set(new W.constructor(W.buffer,W.byteOffset,R.__data.length)):(W.toArray(R.__data,O),O+=k.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(_,M,y,T){let E=_.value,C=M+"_"+y;if(T[C]===void 0)return typeof E=="number"||typeof E=="boolean"?T[C]=E:ArrayBuffer.isView(E)?T[C]=E.slice():T[C]=E.clone(),!0;{let x=T[C];if(typeof E=="number"||typeof E=="boolean"){if(x!==E)return T[C]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(x.equals(E)===!1)return x.copy(E),!0}}return!1}function v(_){let M=_.uniforms,y=0,T=16;for(let C=0,x=M.length;C<x;C++){let w=Array.isArray(M[C])?M[C]:[M[C]];for(let U=0,R=w.length;U<R;U++){let B=w[U],j=Array.isArray(B.value)?B.value:[B.value];for(let O=0,H=j.length;O<H;O++){let W=j[O],k=g(W),ee=y%T,te=ee%k.boundary,ne=ee+te;y+=te,ne!==0&&T-ne<k.storage&&(y+=T-ne),B.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=k.storage}}}let E=y%T;return E>0&&(y+=T-E),_.__size=y,_.__cache={},this}function g(_){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):be("WebGLRenderer: Unsupported uniform value type.",_),M}function m(_){let M=_.target;M.removeEventListener("dispose",m);let y=s.indexOf(M.__bindingPointIndex);s.splice(y,1),e.deleteBuffer(a[M.id]),delete a[M.id],delete n[M.id]}function f(){for(let _ in a)e.deleteBuffer(a[_]);s=[],a={},n={}}return{bind:l,update:c,dispose:f}}function w_(){return pi===null&&(pi=new Do(T_,16,16,hr,xi),pi.name="DFG_LUT",pi.minFilter=Mt,pi.magFilter=Mt,pi.wrapS=gi,pi.wrapT=gi,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}function Nc(e,t){if(t===dd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(t===oo||t===ih){let i=e.getIndex();if(i===null){let s=[],o=e.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)s.push(l);e.setIndex(s),i=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}let r=i.count-2,a=[];if(t===oo)for(let s=1;s<=r;s++)a.push(i.getX(0)),a.push(i.getX(s)),a.push(i.getX(s+1));else for(let s=0;s<r;s++)s%2===0?(a.push(i.getX(s)),a.push(i.getX(s+1)),a.push(i.getX(s+2))):(a.push(i.getX(s+2)),a.push(i.getX(s+1)),a.push(i.getX(s)));a.length/3!==r&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let n=e.clone();return n.setIndex(a),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),e}function A_(e){let t=new Map,i=new Map,r=e.clone();return Zh(e,r,function(a,n){t.set(n,a),i.set(a,n)}),r.traverse(function(a){if(!a.isSkinnedMesh)return;let n=a,s=t.get(a),o=s.skeleton.bones;n.skeleton=s.skeleton.clone(),n.bindMatrix.copy(s.bindMatrix),n.skeleton.bones=o.map(function(l){return i.get(l)}),n.bind(n.skeleton,n.bindMatrix)}),r}function Zh(e,t,i){i(e,t);for(let r=0;r<e.children.length;r++)Zh(e.children[r],t.children[r],i)}function C_(){let e={};return{get:function(t){return e[t]},add:function(t,i){e[t]=i},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function _t(e,t,i){let r=e.json.materials[t];return r.extensions&&r.extensions[i]?r.extensions[i]:null}function ex(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Tn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ni})),e.DefaultMaterial}function ar(e,t,i){for(let r in i.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=i.extensions[r])}function fi(e,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(e.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function tx(e,t,i){let r=!1,a=!1,n=!1;for(let c=0,h=t.length;c<h;c++){let d=t[c];if(d.POSITION!==void 0&&(r=!0),d.NORMAL!==void 0&&(a=!0),d.COLOR_0!==void 0&&(n=!0),r&&a&&n)break}if(!r&&!a&&!n)return Promise.resolve(e);let s=[],o=[],l=[];for(let c=0,h=t.length;c<h;c++){let d=t[c];if(r){let u=d.POSITION!==void 0?i.getDependency("accessor",d.POSITION):e.attributes.position;s.push(u)}if(a){let u=d.NORMAL!==void 0?i.getDependency("accessor",d.NORMAL):e.attributes.normal;o.push(u)}if(n){let u=d.COLOR_0!==void 0?i.getDependency("accessor",d.COLOR_0):e.attributes.color;l.push(u)}}return Promise.all([Promise.all(s),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],d=c[1],u=c[2];return r&&(e.morphAttributes.position=h),a&&(e.morphAttributes.normal=d),n&&(e.morphAttributes.color=u),e.morphTargetsRelative=!0,e})}function ix(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let i=0,r=t.weights.length;i<r;i++)e.morphTargetInfluences[i]=t.weights[i];if(t.extras&&Array.isArray(t.extras.targetNames)){let i=t.extras.targetNames;if(e.morphTargetInfluences.length===i.length){e.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++)e.morphTargetDictionary[i[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function rx(e){let t,i=e.extensions&&e.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(i?t="draco:"+i.bufferView+":"+i.indices+":"+Ss(i.attributes):t=e.indices+":"+Ss(e.attributes)+":"+e.mode,e.targets!==void 0)for(let r=0,a=e.targets.length;r<a;r++)t+=":"+Ss(e.targets[r]);return t}function Ss(e){let t="",i=Object.keys(e).sort();for(let r=0,a=i.length;r<a;r++)t+=i[r]+":"+e[i[r]]+";";return t}function Mo(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ax(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?"image/jpeg":e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?"image/webp":e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}function ox(e,t,i){let r=t.attributes,a=new Mi;if(r.POSITION!==void 0){let o=i.json.accessors[r.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(a.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),o.normalized){let h=Mo(Ur[o.componentType]);a.min.multiplyScalar(h),a.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let n=t.targets;if(n!==void 0){let o=new L,l=new L;for(let c=0,h=n.length;c<h;c++){let d=n[c];if(d.POSITION!==void 0){let u=i.json.accessors[d.POSITION],p=u.min,v=u.max;if(p!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(v[2]))),u.normalized){let g=Mo(Ur[u.componentType]);l.multiplyScalar(g)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}a.expandByVector(o)}e.boundingBox=a;let s=new Si;a.getCenter(s.center),s.radius=a.min.distanceTo(a.max)/2,e.boundingSphere=s}function Bc(e,t,i){let r=t.attributes,a=[];function n(s,o){return i.getDependency("accessor",s).then(function(l){e.setAttribute(o,l)})}for(let s in r){let o=xo[s]||s.toLowerCase();o in e.attributes||a.push(n(r[s],o))}if(t.indices!==void 0&&!e.index){let s=i.getDependency("accessor",t.indices).then(function(o){e.setIndex(o)});a.push(s)}return Ze.workingColorSpace!==Wt&&"COLOR_0"in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),fi(e,t),ox(e,t,i),Promise.all(a).then(function(){return t.targets!==void 0?tx(e,t.targets,i):e})}var zu,fl,ku,nn,zc,ha,Ni,Bt,ti,Pi,Nr,ml,gl,vl,Gu,nr,Vu,Hu,Wu,Xu,ju,qu,Yu,Ku,ys,bs,Zu,Ju,$u,Qu,ed,td,id,rd,ad,Ts,ws,Es,Or,As,Rs,Cs,Ls,kc,nd,sd,ri,Gc,Vc,Hc,Wc,Xc,jc,qc,_l,od,Yc,lr,Fr,Dn,Un,yn,cr,gi,fn,yt,Kc,ua,Mt,sn,Ci,Vt,Zc,Jc,_a,So,_i,Yt,xi,yo,bo,xa,$c,Qc,eh,th,Kt,Di,or,To,wo,hr,Eo,Ao,on,ln,cn,hn,Ps,Is,Ns,Ds,Us,Os,Fs,Bs,zs,mn,ks,Gs,Vs,Hs,Ws,Xs,js,qs,Ys,Ks,Zs,Js,$s,Qs,eo,to,io,ro,ao,no,gn,so,ld,cd,hd,Ma,Sa,On,xl,Pr,Ir,vn,Ro,ud,dd,ih,oo,pd,lo,fd,ji,Et,Wt,_n,Qe,pr,Ml,md,gd,vd,Co,_d,xd,Lo,Md,co,Sd,Sl,vi,ya,yl,Br,Ed,Zi,At,bl,pa,zr,ah,Pe,Ht,L,Fn,Tl,He,Bn,wl,El,Ze,fr,Wd,Xd,Io,jd,kn,Lt,nt,qd,ni,ch,Yd,Ve,mr,$t,Kd,Zd,Bi,La,kt,Al,Rl,kr,No,Jd,Cl,gr,bi,Pa,$r,$d,Qd,Ll,Pl,Il,Nl,ep,vr,Gn,St,qi,tp,Vn,uh,zi,Ia,ze,Rt,ip,Qt,Ti,Wn,wi,_r,xr,Dl,Xn,jn,qn,Yn,Kn,Zn,Qr,Mi,Ei,ei,Na,Mr,Sr,yr,ki,Gi,er,ea,Da,Ua,tr,xt,Oa,rp,Ct,dh,ph,st,ap,ta,$n,Si,np,jt,Qn,br,Gt,ia,wt,Pt,sp,It,op,lp,si,Ai,es,Fa,Vi,ts,Ba,is,Ta,Yi,Ul,ir,za,Ol,ka,Ga,Va,rs,Ha,Fl,Wa,Dt,ra,Bl,zl,hp,kl,ja,as,Gl,ns,up,gh,Do,Vl,dp,pp,po,Tr,Hl,qa,Wl,fp,aa,na,mp,ss,gp,vp,Xi,rr,_p,Ya,Uo,Oo,Mn,Sn,Xl,sa,Ka,os,jl,bn,ql,Yl,_h,xp,xh,Kl,fo,Ja,$a,Mp,Mh,Sp,Gr,yp,Sh,Fo,bp,Ui,Bo,Tp,Jl,$l,ls,cs,hs,Th,Ip,Np,Dp,Up,Op,wh,Fp,Bp,ko,zp,kp,Gp,Vp,Hp,Ih,Xp,jp,Zt,qp,Tn,oi,Yp,Kp,jr,Jp,Dh,$p,Qp,li,qr,Uh,Hr,ef,Wr,Yr,Xr,mo,Li,af,nf,Kr,Ri,sf,Oh,wr,of,Fh,wa,lf,us,rc,ac,Go,en,tn,di,Bh,Hi,nc,sc,Ft,cf,hf,uf,zh,Ea,df,kh,pf,va,ds,ff,Er,Ar,mf,gf,vf,Vo,_f,Ho,xf,Mf,Sf,yf,bf,Tf,wf,Ef,ut,Af,Rf,Cf,oc,Lf,bx,Nf,Df,Uf,Of,Ff,Bf,zf,kf,Gf,Vf,Hf,Wf,Xf,jf,qf,Yf,Kf,Zf,Jf,$f,Qf,em,tm,im,rm,am,nm,sm,om,lm,cm,hm,um,dm,pm,fm,mm,gm,vm,_m,xm,Mm,Sm,ym,bm,Tm,wm,Em,Am,Rm,Cm,Lm,Pm,Im,Nm,Dm,Um,Om,Fm,Bm,zm,km,Gm,Vm,Hm,Wm,Xm,jm,qm,Ym,Km,Zm,Jm,$m,Qm,eg,tg,ig,rg,ag,ng,sg,og,lg,cg,hg,ug,dg,pg,fg,mg,gg,vg,_g,xg,Mg,Sg,yg,bg,Tg,wg,Eg,Ag,Rg,Cg,Lg,Pg,Ig,Ng,Dg,Ug,Og,Fg,Bg,zg,kg,Gg,Vg,Hg,Wg,Xg,jg,qg,Yg,Kg,Zg,Jg,$g,Qg,e0,t0,i0,r0,a0,n0,s0,o0,l0,c0,h0,u0,d0,We,fe,mi,rn,p0,Hh,Ki,hc,sr,x0,oa,uc,ps,fs,ms,gs,M0,dc,Wh,P0,Xh,vo,jh,qh,Yh,gc,vc,_c,xc,Mc,xv,Mv,Sv,vs,pn,bv,Tv,bc,Rv,an,Dv,Uv,Fv,zv,Gv,Hv,Xv,Kv,Zv,Jv,n_,c_,h_,u_,d_,Ic,la,_s,v_,__,x_,M_,S_,Kh,T_,pi,E_,R_,Ke,L_,P_,I_,N_,D_,U_,O_,F_,B_,z_,k_,G_,V_,H_,W_,X_,Dc,j_,Jh,ca,Uc,q_,Y_,K_,Z_,$h,J_,$_,qt,Ur,Oc,Fc,xs,xo,Wi,Q_,Ms,nx,sx,Qh,iu=Ot(()=>{/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */zu=0,fl=1,ku=2,nn=1,zc=2,ha=3,Ni=0,Bt=1,ti=2,Pi=0,Nr=1,ml=2,gl=3,vl=4,Gu=5,nr=100,Vu=101,Hu=102,Wu=103,Xu=104,ju=200,qu=201,Yu=202,Ku=203,ys=204,bs=205,Zu=206,Ju=207,$u=208,Qu=209,ed=210,td=211,id=212,rd=213,ad=214,Ts=0,ws=1,Es=2,Or=3,As=4,Rs=5,Cs=6,Ls=7,kc=0,nd=1,sd=2,ri=0,Gc=1,Vc=2,Hc=3,Wc=4,Xc=5,jc=6,qc=7,_l="attached",od="detached",Yc=300,lr=301,Fr=302,Dn=303,Un=304,yn=306,cr=1e3,gi=1001,fn=1002,yt=1003,Kc=1004,ua=1005,Mt=1006,sn=1007,Ci=1008,Vt=1009,Zc=1010,Jc=1011,_a=1012,So=1013,_i=1014,Yt=1015,xi=1016,yo=1017,bo=1018,xa=1020,$c=35902,Qc=35899,eh=1021,th=1022,Kt=1023,Di=1026,or=1027,To=1028,wo=1029,hr=1030,Eo=1031,Ao=1033,on=33776,ln=33777,cn=33778,hn=33779,Ps=35840,Is=35841,Ns=35842,Ds=35843,Us=36196,Os=37492,Fs=37496,Bs=37488,zs=37489,mn=37490,ks=37491,Gs=37808,Vs=37809,Hs=37810,Ws=37811,Xs=37812,js=37813,qs=37814,Ys=37815,Ks=37816,Zs=37817,Js=37818,$s=37819,Qs=37820,eo=37821,to=36492,io=36494,ro=36495,ao=36283,no=36284,gn=36285,so=36286,ld=2200,cd=2201,hd=2202,Ma=2300,Sa=2301,On=2302,xl=2303,Pr=2400,Ir=2401,vn=2402,Ro=2500,ud=2501,dd=0,ih=1,oo=2,pd=3200,lo=0,fd=1,ji="",Et="srgb",Wt="srgb-linear",_n="linear",Qe="srgb",pr=7680,Ml=519,md=512,gd=513,vd=514,Co=515,_d=516,xd=517,Lo=518,Md=519,co=35044,Sd=35048,Sl="300 es",vi=2e3,ya=2001;yl={},Br=null;Ed={[Ts]:ws,[Es]:Cs,[As]:Ls,[Or]:Rs,[ws]:Ts,[Cs]:Es,[Ls]:As,[Rs]:Or},Zi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let a=0,n=r.length;a<n;a++)r[a].call(this,e);e.target=null}}},At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bl=1234567,pa=Math.PI/180,zr=180/Math.PI;ah={DEG2RAD:pa,RAD2DEG:zr,generateUUID:ai,clamp:qe,euclideanModulo:Po,mapLinear:Ad,inverseLerp:Rd,lerp:fa,damp:Cd,pingpong:Ld,smoothstep:Pd,smootherstep:Id,randInt:Nd,randFloat:Dd,randFloatSpread:Ud,seededRandom:Od,degToRad:Fd,radToDeg:Bd,isPowerOfTwo:zd,ceilPowerOfTwo:kd,floorPowerOfTwo:Gd,setQuaternionFromProperEuler:Vd,normalize:et,denormalize:ii},Pe=class nh{static{nh.prototype.isVector2=!0}constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let i=this.x,r=this.y,a=t.elements;return this.x=a[0]*i+a[3]*r+a[6],this.y=a[1]*i+a[4]*r+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=qe(this.x,t.x,i.x),this.y=qe(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=qe(this.x,t,i),this.y=qe(this.y,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(qe(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(qe(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){let r=Math.cos(i),a=Math.sin(i),n=this.x-t.x,s=this.y-t.y;return this.x=n*r-s*a+t.x,this.y=n*a+s*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ht=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,n,s){let o=i[r+0],l=i[r+1],c=i[r+2],h=i[r+3],d=a[n+0],u=a[n+1],p=a[n+2],v=a[n+3];if(h!==v||o!==d||l!==u||c!==p){let g=o*d+l*u+c*p+h*v;g<0&&(d=-d,u=-u,p=-p,v=-v,g=-g);let m=1-s;if(g<.9995){let f=Math.acos(g),_=Math.sin(f);m=Math.sin(m*f)/_,s=Math.sin(s*f)/_,o=o*m+d*s,l=l*m+u*s,c=c*m+p*s,h=h*m+v*s}else{o=o*m+d*s,l=l*m+u*s,c=c*m+p*s,h=h*m+v*s;let f=1/Math.sqrt(o*o+l*l+c*c+h*h);o*=f,l*=f,c*=f,h*=f}}e[t]=o,e[t+1]=l,e[t+2]=c,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,a,n){let s=i[r],o=i[r+1],l=i[r+2],c=i[r+3],h=a[n],d=a[n+1],u=a[n+2],p=a[n+3];return e[t]=s*p+c*h+o*u-l*d,e[t+1]=o*p+c*d+l*h-s*u,e[t+2]=l*p+c*u+s*d-o*h,e[t+3]=c*p-s*h-o*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,n=e._order,s=Math.cos,o=Math.sin,l=s(i/2),c=s(r/2),h=s(a/2),d=o(i/2),u=o(r/2),p=o(a/2);switch(n){case"XYZ":this._x=d*c*h+l*u*p,this._y=l*u*h-d*c*p,this._z=l*c*p+d*u*h,this._w=l*c*h-d*u*p;break;case"YXZ":this._x=d*c*h+l*u*p,this._y=l*u*h-d*c*p,this._z=l*c*p-d*u*h,this._w=l*c*h+d*u*p;break;case"ZXY":this._x=d*c*h-l*u*p,this._y=l*u*h+d*c*p,this._z=l*c*p+d*u*h,this._w=l*c*h-d*u*p;break;case"ZYX":this._x=d*c*h-l*u*p,this._y=l*u*h+d*c*p,this._z=l*c*p-d*u*h,this._w=l*c*h+d*u*p;break;case"YZX":this._x=d*c*h+l*u*p,this._y=l*u*h+d*c*p,this._z=l*c*p-d*u*h,this._w=l*c*h-d*u*p;break;case"XZY":this._x=d*c*h-l*u*p,this._y=l*u*h-d*c*p,this._z=l*c*p+d*u*h,this._w=l*c*h+d*u*p;break;default:be("Quaternion: .setFromEuler() encountered an unknown order: "+n)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],n=t[1],s=t[5],o=t[9],l=t[2],c=t[6],h=t[10],d=i+s+h;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(c-o)*u,this._y=(a-l)*u,this._z=(n-r)*u}else if(i>s&&i>h){let u=2*Math.sqrt(1+i-s-h);this._w=(c-o)/u,this._x=.25*u,this._y=(r+n)/u,this._z=(a+l)/u}else if(s>h){let u=2*Math.sqrt(1+s-i-h);this._w=(a-l)/u,this._x=(r+n)/u,this._y=.25*u,this._z=(o+c)/u}else{let u=2*Math.sqrt(1+h-i-s);this._w=(n-r)/u,this._x=(a+l)/u,this._y=(o+c)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=t._x,o=t._y,l=t._z,c=t._w;return this._x=i*c+n*s+r*l-a*o,this._y=r*c+n*o+a*s-i*l,this._z=a*c+n*l+i*o-r*s,this._w=n*c-i*s-r*o-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,n=-n,s=-s);let o=1-t;if(s<.9995){let l=Math.acos(s),c=Math.sin(l);o=Math.sin(o*l)/c,t=Math.sin(t*l)/c,this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+a*t,this._w=this._w*o+n*t,this._onChangeCallback()}else this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+a*t,this._w=this._w*o+n*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class sh{static{sh.prototype.isVector3=!0}constructor(t=0,i=0,r=0){this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Tl.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Tl.setFromAxisAngle(t,i))}applyMatrix3(t){let i=this.x,r=this.y,a=this.z,n=t.elements;return this.x=n[0]*i+n[3]*r+n[6]*a,this.y=n[1]*i+n[4]*r+n[7]*a,this.z=n[2]*i+n[5]*r+n[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,n=t.elements,s=1/(n[3]*i+n[7]*r+n[11]*a+n[15]);return this.x=(n[0]*i+n[4]*r+n[8]*a+n[12])*s,this.y=(n[1]*i+n[5]*r+n[9]*a+n[13])*s,this.z=(n[2]*i+n[6]*r+n[10]*a+n[14])*s,this}applyQuaternion(t){let i=this.x,r=this.y,a=this.z,n=t.x,s=t.y,o=t.z,l=t.w,c=2*(s*a-o*r),h=2*(o*i-n*a),d=2*(n*r-s*i);return this.x=i+l*c+s*d-o*h,this.y=r+l*h+o*c-n*d,this.z=a+l*d+n*h-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let i=this.x,r=this.y,a=this.z,n=t.elements;return this.x=n[0]*i+n[4]*r+n[8]*a,this.y=n[1]*i+n[5]*r+n[9]*a,this.z=n[2]*i+n[6]*r+n[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=qe(this.x,t.x,i.x),this.y=qe(this.y,t.y,i.y),this.z=qe(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=qe(this.x,t,i),this.y=qe(this.y,t,i),this.z=qe(this.z,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(qe(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){let r=t.x,a=t.y,n=t.z,s=i.x,o=i.y,l=i.z;return this.x=a*l-n*o,this.y=n*s-r*l,this.z=r*o-a*s,this}projectOnVector(t){let i=t.lengthSq();if(i===0)return this.set(0,0,0);let r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return Fn.copy(this).projectOnVector(t),this.sub(Fn)}reflect(t){return this.sub(Fn.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(qe(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y,a=this.z-t.z;return i*i+r*r+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){let a=Math.sin(i)*t;return this.x=a*Math.sin(r),this.y=Math.cos(i)*t,this.z=a*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){let i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){let i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=a,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fn=new L,Tl=new Ht,He=class oh{static{oh.prototype.isMatrix3=!0}constructor(t,i,r,a,n,s,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,a,n,s,o,l,c)}set(t,i,r,a,n,s,o,l,c){let h=this.elements;return h[0]=t,h[1]=a,h[2]=o,h[3]=i,h[4]=n,h[5]=l,h[6]=r,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,n=this.elements,s=r[0],o=r[3],l=r[6],c=r[1],h=r[4],d=r[7],u=r[2],p=r[5],v=r[8],g=a[0],m=a[3],f=a[6],_=a[1],M=a[4],y=a[7],T=a[2],E=a[5],C=a[8];return n[0]=s*g+o*_+l*T,n[3]=s*m+o*M+l*E,n[6]=s*f+o*y+l*C,n[1]=c*g+h*_+d*T,n[4]=c*m+h*M+d*E,n[7]=c*f+h*y+d*C,n[2]=u*g+p*_+v*T,n[5]=u*m+p*M+v*E,n[8]=u*f+p*y+v*C,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return i*s*h-i*o*c-r*n*h+r*o*l+a*n*c-a*s*l}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*s-o*c,u=o*l-h*n,p=c*n-s*l,v=i*d+r*u+a*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/v;return t[0]=d*g,t[1]=(a*c-h*r)*g,t[2]=(o*r-a*s)*g,t[3]=u*g,t[4]=(h*i-a*l)*g,t[5]=(a*n-o*i)*g,t[6]=p*g,t[7]=(r*l-c*i)*g,t[8]=(s*i-r*n)*g,this}transpose(){let t,i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,a,n,s,o){let l=Math.cos(n),c=Math.sin(n);return this.set(r*l,r*c,-r*(l*s+c*o)+s+t,-a*c,a*l,-a*(-c*s+l*o)+o+i,0,0,1),this}scale(t,i){return this.premultiply(Bn.makeScale(t,i)),this}rotate(t){return this.premultiply(Bn.makeRotation(-t)),this}translate(t,i){return this.premultiply(Bn.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<9;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Bn=new He,wl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),El=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze=Hd();Wd=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{fr===void 0&&(fr=ba("canvas")),fr.width=e.width,fr.height=e.height;let r=fr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=fr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ba("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let n=0;n<a.length;n++)a[n]=Ii(a[n]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ii(t[i]/255)*255):t[i]=Ii(t[i]);return{data:t,width:e.width,height:e.height}}else return be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Xd=0,Io=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let n=0,s=r.length;n<s;n++)r[n].isDataTexture?a.push(zn(r[n].image)):a.push(zn(r[n]))}else a=zn(r);i.url=a}return t||(e.images[this.uuid]=i),i}};jd=0,kn=new L,Lt=class un extends Zi{constructor(t=un.DEFAULT_IMAGE,i=un.DEFAULT_MAPPING,r=gi,a=gi,n=Mt,s=Ci,o=Kt,l=Vt,c=un.DEFAULT_ANISOTROPY,h=ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=ai(),this.name="",this.source=new Io(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=n,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(kn).x}get height(){return this.source.getSize(kn).y}get depth(){return this.source.getSize(kn).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){be(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let a=this[i];if(a===void 0){be(`Texture.setValues(): property '${i}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cr:t.x=t.x-Math.floor(t.x);break;case gi:t.x=t.x<0?0:1;break;case fn:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cr:t.y=t.y-Math.floor(t.y);break;case gi:t.y=t.y<0?0:1;break;case fn:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=Yc;Lt.DEFAULT_ANISOTROPY=1;nt=class lh{static{lh.prototype.isVector4=!0}constructor(t=0,i=0,r=0,a=1){this.x=t,this.y=i,this.z=r,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,a){return this.x=t,this.y=i,this.z=r,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,n=this.w,s=t.elements;return this.x=s[0]*i+s[4]*r+s[8]*a+s[12]*n,this.y=s[1]*i+s[5]*r+s[9]*a+s[13]*n,this.z=s[2]*i+s[6]*r+s[10]*a+s[14]*n,this.w=s[3]*i+s[7]*r+s[11]*a+s[15]*n,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,a,n,s=t.elements,o=s[0],l=s[4],c=s[8],h=s[1],d=s[5],u=s[9],p=s[2],v=s[6],g=s[10];if(Math.abs(l-h)<.01&&Math.abs(c-p)<.01&&Math.abs(u-v)<.01){if(Math.abs(l+h)<.1&&Math.abs(c+p)<.1&&Math.abs(u+v)<.1&&Math.abs(o+d+g-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;let f=(o+1)/2,_=(d+1)/2,M=(g+1)/2,y=(l+h)/4,T=(c+p)/4,E=(u+v)/4;return f>_&&f>M?f<.01?(r=0,a=.707106781,n=.707106781):(r=Math.sqrt(f),a=y/r,n=T/r):_>M?_<.01?(r=.707106781,a=0,n=.707106781):(a=Math.sqrt(_),r=y/a,n=E/a):M<.01?(r=.707106781,a=.707106781,n=0):(n=Math.sqrt(M),r=T/n,a=E/n),this.set(r,a,n,i),this}let m=Math.sqrt((v-u)*(v-u)+(c-p)*(c-p)+(h-l)*(h-l));return Math.abs(m)<.001&&(m=1),this.x=(v-u)/m,this.y=(c-p)/m,this.z=(h-l)/m,this.w=Math.acos((o+d+g-1)/2),this}setFromMatrixPosition(t){let i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=qe(this.x,t.x,i.x),this.y=qe(this.y,t.y,i.y),this.z=qe(this.z,t.z,i.z),this.w=qe(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=qe(this.x,t,i),this.y=qe(this.y,t,i),this.z=qe(this.z,t,i),this.w=qe(this.w,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(qe(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qd=class extends Zi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},a=new Lt(r),n=i.count;for(let s=0;s<n;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:Mt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Io(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},ni=class extends qd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ch=class extends Lt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yt,this.minFilter=yt,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Yd=class extends Lt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yt,this.minFilter=yt,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ve=class uo{static{uo.prototype.isMatrix4=!0}constructor(t,i,r,a,n,s,o,l,c,h,d,u,p,v,g,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,a,n,s,o,l,c,h,d,u,p,v,g,m)}set(t,i,r,a,n,s,o,l,c,h,d,u,p,v,g,m){let f=this.elements;return f[0]=t,f[4]=i,f[8]=r,f[12]=a,f[1]=n,f[5]=s,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=v,f[11]=g,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new uo().fromArray(this.elements)}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){let i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){let i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return this.determinant()===0?(t.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();let i=this.elements,r=t.elements,a=1/mr.setFromMatrixColumn(t,0).length(),n=1/mr.setFromMatrixColumn(t,1).length(),s=1/mr.setFromMatrixColumn(t,2).length();return i[0]=r[0]*a,i[1]=r[1]*a,i[2]=r[2]*a,i[3]=0,i[4]=r[4]*n,i[5]=r[5]*n,i[6]=r[6]*n,i[7]=0,i[8]=r[8]*s,i[9]=r[9]*s,i[10]=r[10]*s,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){let i=this.elements,r=t.x,a=t.y,n=t.z,s=Math.cos(r),o=Math.sin(r),l=Math.cos(a),c=Math.sin(a),h=Math.cos(n),d=Math.sin(n);if(t.order==="XYZ"){let u=s*h,p=s*d,v=o*h,g=o*d;i[0]=l*h,i[4]=-l*d,i[8]=c,i[1]=p+v*c,i[5]=u-g*c,i[9]=-o*l,i[2]=g-u*c,i[6]=v+p*c,i[10]=s*l}else if(t.order==="YXZ"){let u=l*h,p=l*d,v=c*h,g=c*d;i[0]=u+g*o,i[4]=v*o-p,i[8]=s*c,i[1]=s*d,i[5]=s*h,i[9]=-o,i[2]=p*o-v,i[6]=g+u*o,i[10]=s*l}else if(t.order==="ZXY"){let u=l*h,p=l*d,v=c*h,g=c*d;i[0]=u-g*o,i[4]=-s*d,i[8]=v+p*o,i[1]=p+v*o,i[5]=s*h,i[9]=g-u*o,i[2]=-s*c,i[6]=o,i[10]=s*l}else if(t.order==="ZYX"){let u=s*h,p=s*d,v=o*h,g=o*d;i[0]=l*h,i[4]=v*c-p,i[8]=u*c+g,i[1]=l*d,i[5]=g*c+u,i[9]=p*c-v,i[2]=-c,i[6]=o*l,i[10]=s*l}else if(t.order==="YZX"){let u=s*l,p=s*c,v=o*l,g=o*c;i[0]=l*h,i[4]=g-u*d,i[8]=v*d+p,i[1]=d,i[5]=s*h,i[9]=-o*h,i[2]=-c*h,i[6]=p*d+v,i[10]=u-g*d}else if(t.order==="XZY"){let u=s*l,p=s*c,v=o*l,g=o*c;i[0]=l*h,i[4]=-d,i[8]=c*h,i[1]=u*d+g,i[5]=s*h,i[9]=p*d-v,i[2]=v*d-p,i[6]=o*h,i[10]=g*d+u}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Kd,t,Zd)}lookAt(t,i,r){let a=this.elements;return kt.subVectors(t,i),kt.lengthSq()===0&&(kt.z=1),kt.normalize(),Bi.crossVectors(r,kt),Bi.lengthSq()===0&&(Math.abs(r.z)===1?kt.x+=1e-4:kt.z+=1e-4,kt.normalize(),Bi.crossVectors(r,kt)),Bi.normalize(),La.crossVectors(kt,Bi),a[0]=Bi.x,a[4]=La.x,a[8]=kt.x,a[1]=Bi.y,a[5]=La.y,a[9]=kt.y,a[2]=Bi.z,a[6]=La.z,a[10]=kt.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,n=this.elements,s=r[0],o=r[4],l=r[8],c=r[12],h=r[1],d=r[5],u=r[9],p=r[13],v=r[2],g=r[6],m=r[10],f=r[14],_=r[3],M=r[7],y=r[11],T=r[15],E=a[0],C=a[4],x=a[8],w=a[12],U=a[1],R=a[5],B=a[9],j=a[13],O=a[2],H=a[6],W=a[10],k=a[14],ee=a[3],te=a[7],ne=a[11],ce=a[15];return n[0]=s*E+o*U+l*O+c*ee,n[4]=s*C+o*R+l*H+c*te,n[8]=s*x+o*B+l*W+c*ne,n[12]=s*w+o*j+l*k+c*ce,n[1]=h*E+d*U+u*O+p*ee,n[5]=h*C+d*R+u*H+p*te,n[9]=h*x+d*B+u*W+p*ne,n[13]=h*w+d*j+u*k+p*ce,n[2]=v*E+g*U+m*O+f*ee,n[6]=v*C+g*R+m*H+f*te,n[10]=v*x+g*B+m*W+f*ne,n[14]=v*w+g*j+m*k+f*ce,n[3]=_*E+M*U+y*O+T*ee,n[7]=_*C+M*R+y*H+T*te,n[11]=_*x+M*B+y*W+T*ne,n[15]=_*w+M*j+y*k+T*ce,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[4],a=t[8],n=t[12],s=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],v=t[3],g=t[7],m=t[11],f=t[15],_=l*p-c*u,M=o*p-c*d,y=o*u-l*d,T=s*p-c*h,E=s*u-l*h,C=s*d-o*h;return i*(g*_-m*M+f*y)-r*(v*_-m*T+f*E)+a*(v*M-g*T+f*C)-n*(v*y-g*E+m*C)}transpose(){let t=this.elements,i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=i,a[14]=r),this}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],v=t[12],g=t[13],m=t[14],f=t[15],_=i*o-r*s,M=i*l-a*s,y=i*c-n*s,T=r*l-a*o,E=r*c-n*o,C=a*c-n*l,x=h*g-d*v,w=h*m-u*v,U=h*f-p*v,R=d*m-u*g,B=d*f-p*g,j=u*f-p*m,O=_*j-M*B+y*R+T*U-E*w+C*x;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/O;return t[0]=(o*j-l*B+c*R)*H,t[1]=(a*B-r*j-n*R)*H,t[2]=(g*C-m*E+f*T)*H,t[3]=(u*E-d*C-p*T)*H,t[4]=(l*U-s*j-c*w)*H,t[5]=(i*j-a*U+n*w)*H,t[6]=(m*y-v*C-f*M)*H,t[7]=(h*C-u*y+p*M)*H,t[8]=(s*B-o*U+c*x)*H,t[9]=(r*U-i*B-n*x)*H,t[10]=(v*E-g*y+f*_)*H,t[11]=(d*y-h*E-p*_)*H,t[12]=(o*w-s*R-l*x)*H,t[13]=(i*R-r*w+a*x)*H,t[14]=(g*M-v*T-m*_)*H,t[15]=(h*T-d*M+u*_)*H,this}scale(t){let i=this.elements,r=t.x,a=t.y,n=t.z;return i[0]*=r,i[4]*=a,i[8]*=n,i[1]*=r,i[5]*=a,i[9]*=n,i[2]*=r,i[6]*=a,i[10]*=n,i[3]*=r,i[7]*=a,i[11]*=n,this}getMaxScaleOnAxis(){let t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,a))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){let i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){let r=Math.cos(i),a=Math.sin(i),n=1-r,s=t.x,o=t.y,l=t.z,c=n*s,h=n*o;return this.set(c*s+r,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+r,h*l-a*s,0,c*l-a*o,h*l+a*s,n*l*l+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,a,n,s){return this.set(1,r,n,0,t,1,s,0,i,a,1,0,0,0,0,1),this}compose(t,i,r){let a=this.elements,n=i._x,s=i._y,o=i._z,l=i._w,c=n+n,h=s+s,d=o+o,u=n*c,p=n*h,v=n*d,g=s*h,m=s*d,f=o*d,_=l*c,M=l*h,y=l*d,T=r.x,E=r.y,C=r.z;return a[0]=(1-(g+f))*T,a[1]=(p+y)*T,a[2]=(v-M)*T,a[3]=0,a[4]=(p-y)*E,a[5]=(1-(u+f))*E,a[6]=(m+_)*E,a[7]=0,a[8]=(v+M)*C,a[9]=(m-_)*C,a[10]=(1-(u+g))*C,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,i,r){let a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];let n=this.determinant();if(n===0)return r.set(1,1,1),i.identity(),this;let s=mr.set(a[0],a[1],a[2]).length(),o=mr.set(a[4],a[5],a[6]).length(),l=mr.set(a[8],a[9],a[10]).length();n<0&&(s=-s),$t.copy(this);let c=1/s,h=1/o,d=1/l;return $t.elements[0]*=c,$t.elements[1]*=c,$t.elements[2]*=c,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=d,$t.elements[9]*=d,$t.elements[10]*=d,i.setFromRotationMatrix($t),r.x=s,r.y=o,r.z=l,this}makePerspective(t,i,r,a,n,s,o=vi,l=!1){let c=this.elements,h=2*n/(i-t),d=2*n/(r-a),u=(i+t)/(i-t),p=(r+a)/(r-a),v,g;if(l)v=n/(s-n),g=s*n/(s-n);else if(o===vi)v=-(s+n)/(s-n),g=-2*s*n/(s-n);else if(o===ya)v=-s/(s-n),g=-s*n/(s-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,i,r,a,n,s,o=vi,l=!1){let c=this.elements,h=2/(i-t),d=2/(r-a),u=-(i+t)/(i-t),p=-(r+a)/(r-a),v,g;if(l)v=1/(s-n),g=s/(s-n);else if(o===vi)v=-2/(s-n),g=-(s+n)/(s-n);else if(o===ya)v=-1/(s-n),g=-n/(s-n);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<16;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}},mr=new L,$t=new Ve,Kd=new L(0,0,0),Zd=new L(1,1,1),Bi=new L,La=new L,kt=new L,Al=new Ve,Rl=new Ht,kr=class hh{constructor(t=0,i=0,r=0,a=hh.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,a=this._order){return this._x=t,this._y=i,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let a=t.elements,n=a[0],s=a[4],o=a[8],l=a[1],c=a[5],h=a[9],d=a[2],u=a[6],p=a[10];switch(i){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-s,n)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,n),this._z=0);break;case"ZXY":this._x=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,n));break;case"ZYX":this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,n)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,n)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qe(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-h,p),this._y=0);break;default:be("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Al.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Al,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Rl.setFromEuler(this),this.setFromQuaternion(Rl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kr.DEFAULT_ORDER="XYZ";No=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Jd=0,Cl=new L,gr=new Ht,bi=new Ve,Pa=new L,$r=new L,$d=new L,Qd=new Ht,Ll=new L(1,0,0),Pl=new L(0,1,0),Il=new L(0,0,1),Nl={type:"added"},ep={type:"removed"},vr={type:"childadded",child:null},Gn={type:"childremoved",child:null},St=class dn extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dn.DEFAULT_UP.clone();let t=new L,i=new kr,r=new Ht,a=new L(1,1,1);function n(){r.setFromEuler(i,!1)}function s(){i.setFromQuaternion(r,void 0,!1)}i._onChange(n),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ve},normalMatrix:{value:new He}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new No,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return gr.setFromAxisAngle(t,i),this.quaternion.multiply(gr),this}rotateOnWorldAxis(t,i){return gr.setFromAxisAngle(t,i),this.quaternion.premultiply(gr),this}rotateX(t){return this.rotateOnAxis(Ll,t)}rotateY(t){return this.rotateOnAxis(Pl,t)}rotateZ(t){return this.rotateOnAxis(Il,t)}translateOnAxis(t,i){return Cl.copy(t).applyQuaternion(this.quaternion),this.position.add(Cl.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Ll,t)}translateY(t){return this.translateOnAxis(Pl,t)}translateZ(t){return this.translateOnAxis(Il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Pa.copy(t):Pa.set(t,i,r);let a=this.parent;this.updateWorldMatrix(!0,!1),$r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt($r,Pa,this.up):bi.lookAt(Pa,$r,this.up),this.quaternion.setFromRotationMatrix(bi),a&&(bi.extractRotation(a.matrixWorld),gr.setFromRotationMatrix(bi),this.quaternion.premultiply(gr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ue("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Nl),vr.child=t,this.dispatchEvent(vr),vr.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(ep),Gn.child=t,this.dispatchEvent(Gn),Gn.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Nl),vr.child=t,this.dispatchEvent(vr),vr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,a=this.children.length;r<a;r++){let n=this.children[r].getObjectByProperty(t,i);if(n!==void 0)return n}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,t,$d),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,Qd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,a=t.z,n=this.matrix.elements;n[12]+=i-n[0]*i-n[4]*r-n[8]*a,n[13]+=r-n[1]*i-n[5]*r-n[9]*a,n[14]+=a-n[2]*i-n[6]*r-n[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function n(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=n(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];n(t.shapes,d)}else n(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(n(t.materials,this.material[l]));a.material=o}else a.material=n(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];a.animations.push(n(t.animations,l))}}if(i){let o=s(t.geometries),l=s(t.materials),c=s(t.textures),h=s(t.images),d=s(t.shapes),u=s(t.skeletons),p=s(t.animations),v=s(t.nodes);o.length>0&&(r.geometries=o),l.length>0&&(r.materials=l),c.length>0&&(r.textures=c),h.length>0&&(r.images=h),d.length>0&&(r.shapes=d),u.length>0&&(r.skeletons=u),p.length>0&&(r.animations=p),v.length>0&&(r.nodes=v)}return r.object=a,r;function s(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let a=t.children[r];this.add(a.clone())}return this}};St.DEFAULT_UP=new L(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;qi=class extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}},tp={type:"move"},Vn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,n=null,s=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){n=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,i),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let c=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=c.position.distanceTo(h.position),u=.02,p=.005;l.inputState.pinching&&d>u+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));s!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(tp)))}return s!==null&&(s.visible=r!==null),o!==null&&(o.visible=a!==null),l!==null&&(l.visible=n!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new qi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},Ia={h:0,s:0,l:0};ze=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ze.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ze.workingColorSpace){if(e=Po(e,1),t=qe(t,0,1),i=qe(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,n=2*i-a;this.r=Hn(n,a,e+1/3),this.g=Hn(n,a,e),this.b=Hn(n,a,e-1/3)}return Ze.colorSpaceToWorking(this,r),this}setStyle(e,t=Et){function i(a){a!==void 0&&parseFloat(a)<1&&be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,n=r[1],s=r[2];switch(n){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],n=a.length;if(n===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(n===6)return this.setHex(parseInt(a,16),t);be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let i=uh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}copyLinearToSRGB(e){return this.r=Dr(e.r),this.g=Dr(e.g),this.b=Dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return Ze.workingToColorSpace(Rt.copy(this),e),Math.round(qe(Rt.r*255,0,255))*65536+Math.round(qe(Rt.g*255,0,255))*256+Math.round(qe(Rt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Rt.copy(this),t);let i=Rt.r,r=Rt.g,a=Rt.b,n=Math.max(i,r,a),s=Math.min(i,r,a),o,l,c=(s+n)/2;if(s===n)o=0,l=0;else{let h=n-s;switch(l=c<=.5?h/(n+s):h/(2-n-s),n){case i:o=(r-a)/h+(r<a?6:0);break;case r:o=(a-i)/h+2;break;case a:o=(i-r)/h+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Et){Ze.workingToColorSpace(Rt.copy(this),e);let t=Rt.r,i=Rt.g,r=Rt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(zi),this.setHSL(zi.h+e,zi.s+t,zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(zi),e.getHSL(Ia);let i=fa(zi.h,Ia.h,t),r=fa(zi.s,Ia.s,t),a=fa(zi.l,Ia.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rt=new ze;ze.NAMES=uh;ip=class extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kr,this.environmentIntensity=1,this.environmentRotation=new kr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qt=new L,Ti=new L,Wn=new L,wi=new L,_r=new L,xr=new L,Dl=new L,Xn=new L,jn=new L,qn=new L,Yn=new nt,Kn=new nt,Zn=new nt,Qr=class Cr{constructor(t=new L,i=new L,r=new L){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,a){a.subVectors(r,i),Qt.subVectors(t,i),a.cross(Qt);let n=a.lengthSq();return n>0?a.multiplyScalar(1/Math.sqrt(n)):a.set(0,0,0)}static getBarycoord(t,i,r,a,n){Qt.subVectors(a,i),Ti.subVectors(r,i),Wn.subVectors(t,i);let s=Qt.dot(Qt),o=Qt.dot(Ti),l=Qt.dot(Wn),c=Ti.dot(Ti),h=Ti.dot(Wn),d=s*c-o*o;if(d===0)return n.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,v=(s*h-o*l)*u;return n.set(1-p-v,v,p)}static containsPoint(t,i,r,a){return this.getBarycoord(t,i,r,a,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(t,i,r,a,n,s,o,l){return this.getBarycoord(t,i,r,a,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(n,wi.x),l.addScaledVector(s,wi.y),l.addScaledVector(o,wi.z),l)}static getInterpolatedAttribute(t,i,r,a,n,s){return Yn.setScalar(0),Kn.setScalar(0),Zn.setScalar(0),Yn.fromBufferAttribute(t,i),Kn.fromBufferAttribute(t,r),Zn.fromBufferAttribute(t,a),s.setScalar(0),s.addScaledVector(Yn,n.x),s.addScaledVector(Kn,n.y),s.addScaledVector(Zn,n.z),s}static isFrontFacing(t,i,r,a){return Qt.subVectors(r,i),Ti.subVectors(t,i),Qt.cross(Ti).dot(a)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,a){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,i,r,a){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qt.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),Qt.cross(Ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Cr.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Cr.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,a,n){return Cr.getInterpolation(t,this.a,this.b,this.c,i,r,a,n)}containsPoint(t){return Cr.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Cr.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){let r=this.a,a=this.b,n=this.c,s,o;_r.subVectors(a,r),xr.subVectors(n,r),Xn.subVectors(t,r);let l=_r.dot(Xn),c=xr.dot(Xn);if(l<=0&&c<=0)return i.copy(r);jn.subVectors(t,a);let h=_r.dot(jn),d=xr.dot(jn);if(h>=0&&d<=h)return i.copy(a);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return s=l/(l-h),i.copy(r).addScaledVector(_r,s);qn.subVectors(t,n);let p=_r.dot(qn),v=xr.dot(qn);if(v>=0&&p<=v)return i.copy(n);let g=p*c-l*v;if(g<=0&&c>=0&&v<=0)return o=c/(c-v),i.copy(r).addScaledVector(xr,o);let m=h*v-p*d;if(m<=0&&d-h>=0&&p-v>=0)return Dl.subVectors(n,a),o=(d-h)/(d-h+(p-v)),i.copy(a).addScaledVector(Dl,o);let f=1/(m+g+u);return s=g*f,o=u*f,i.copy(r).addScaledVector(_r,s).addScaledVector(xr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Mi=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let n=0,s=a.count;n<s;n++)e.isMesh===!0?e.getVertexPosition(n,ei):ei.fromBufferAttribute(a,n),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Na.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Na.copy(i.boundingBox)),Na.applyMatrix4(e.matrixWorld),this.union(Na)}let r=e.children;for(let a=0,n=r.length;a<n;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ea),Da.subVectors(this.max,ea),Mr.subVectors(e.a,ea),Sr.subVectors(e.b,ea),yr.subVectors(e.c,ea),ki.subVectors(Sr,Mr),Gi.subVectors(yr,Sr),er.subVectors(Mr,yr);let t=[0,-ki.z,ki.y,0,-Gi.z,Gi.y,0,-er.z,er.y,ki.z,0,-ki.x,Gi.z,0,-Gi.x,er.z,0,-er.x,-ki.y,ki.x,0,-Gi.y,Gi.x,0,-er.y,er.x,0];return!Jn(t,Mr,Sr,yr,Da)||(t=[1,0,0,0,1,0,0,0,1],!Jn(t,Mr,Sr,yr,Da))?!1:(Ua.crossVectors(ki,Gi),t=[Ua.x,Ua.y,Ua.z],Jn(t,Mr,Sr,yr,Da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ei=[new L,new L,new L,new L,new L,new L,new L,new L],ei=new L,Na=new Mi,Mr=new L,Sr=new L,yr=new L,ki=new L,Gi=new L,er=new L,ea=new L,Da=new L,Ua=new L,tr=new L;xt=new L,Oa=new Pe,rp=0,Ct=class extends Zi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=co,this.updateRanges=[],this.gpuType=Yt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ii(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=et(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array),a=et(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==co&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}},dh=class extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}},ph=class extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}},st=class extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}},ap=new Mi,ta=new L,$n=new L,Si=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):ap.setFromPoints(e).getCenter(i);let r=0;for(let a=0,n=e.length;a<n;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ta.subVectors(e,this.center);let t=ta.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ta,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($n.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ta.copy(e.center).add($n)),this.expandByPoint(ta.copy(e.center).sub($n))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},np=0,jt=new Ve,Qn=new St,br=new L,Gt=new Mi,ia=new Mi,wt=new L,Pt=class fh extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yd(t)?ph:dh)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){let i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);let r=this.attributes.normal;if(r!==void 0){let n=new He().getNormalMatrix(t);r.applyNormalMatrix(n),r.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return jt.makeRotationFromQuaternion(t),this.applyMatrix4(jt),this}rotateX(t){return jt.makeRotationX(t),this.applyMatrix4(jt),this}rotateY(t){return jt.makeRotationY(t),this.applyMatrix4(jt),this}rotateZ(t){return jt.makeRotationZ(t),this.applyMatrix4(jt),this}translate(t,i,r){return jt.makeTranslation(t,i,r),this.applyMatrix4(jt),this}scale(t,i,r){return jt.makeScale(t,i,r),this.applyMatrix4(jt),this}lookAt(t){return Qn.lookAt(t),Qn.updateMatrix(),this.applyMatrix4(Qn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(br).negate(),this.translate(br.x,br.y,br.z),this}setFromPoints(t){let i=this.getAttribute("position");if(i===void 0){let r=[];for(let a=0,n=t.length;a<n;a++){let s=t[a];r.push(s.x,s.y,s.z||0)}this.setAttribute("position",new st(r,3))}else{let r=Math.min(t.length,i.count);for(let a=0;a<r;a++){let n=t[a];i.setXYZ(a,n.x,n.y,n.z||0)}t.length>i.count&&be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,a=i.length;r<a;r++){let n=i[r];Gt.setFromBufferAttribute(n),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let r=this.boundingSphere.center;if(Gt.setFromBufferAttribute(t),i)for(let n=0,s=i.length;n<s;n++){let o=i[n];ia.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(Gt.min,ia.min),Gt.expandByPoint(wt),wt.addVectors(Gt.max,ia.max),Gt.expandByPoint(wt)):(Gt.expandByPoint(ia.min),Gt.expandByPoint(ia.max))}Gt.getCenter(r);let a=0;for(let n=0,s=t.count;n<s;n++)wt.fromBufferAttribute(t,n),a=Math.max(a,r.distanceToSquared(wt));if(i)for(let n=0,s=i.length;n<s;n++){let o=i[n],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)wt.fromBufferAttribute(o,c),l&&(br.fromBufferAttribute(t,c),wt.add(br)),a=Math.max(a,r.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let r=i.position,a=i.normal,n=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*r.count),4));let s=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<r.count;x++)o[x]=new L,l[x]=new L;let c=new L,h=new L,d=new L,u=new Pe,p=new Pe,v=new Pe,g=new L,m=new L;function f(x,w,U){c.fromBufferAttribute(r,x),h.fromBufferAttribute(r,w),d.fromBufferAttribute(r,U),u.fromBufferAttribute(n,x),p.fromBufferAttribute(n,w),v.fromBufferAttribute(n,U),h.sub(c),d.sub(c),p.sub(u),v.sub(u);let R=1/(p.x*v.y-v.x*p.y);isFinite(R)&&(g.copy(h).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-v.x).multiplyScalar(R),o[x].add(g),o[w].add(g),o[U].add(g),l[x].add(m),l[w].add(m),l[U].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let x=0,w=_.length;x<w;++x){let U=_[x],R=U.start,B=U.count;for(let j=R,O=R+B;j<O;j+=3)f(t.getX(j+0),t.getX(j+1),t.getX(j+2))}let M=new L,y=new L,T=new L,E=new L;function C(x){T.fromBufferAttribute(a,x),E.copy(T);let w=o[x];M.copy(w),M.sub(T.multiplyScalar(T.dot(w))).normalize(),y.crossVectors(E,w);let U=y.dot(l[x])<0?-1:1;s.setXYZW(x,M.x,M.y,M.z,U)}for(let x=0,w=_.length;x<w;++x){let U=_[x],R=U.start,B=U.count;for(let j=R,O=R+B;j<O;j+=3)C(t.getX(j+0)),C(t.getX(j+1)),C(t.getX(j+2))}}computeVertexNormals(){let t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Ct(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let u=0,p=r.count;u<p;u++)r.setXYZ(u,0,0,0);let a=new L,n=new L,s=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,p=t.count;u<p;u+=3){let v=t.getX(u+0),g=t.getX(u+1),m=t.getX(u+2);a.fromBufferAttribute(i,v),n.fromBufferAttribute(i,g),s.fromBufferAttribute(i,m),h.subVectors(s,n),d.subVectors(a,n),h.cross(d),o.fromBufferAttribute(r,v),l.fromBufferAttribute(r,g),c.fromBufferAttribute(r,m),o.add(h),l.add(h),c.add(h),r.setXYZ(v,o.x,o.y,o.z),r.setXYZ(g,l.x,l.y,l.z),r.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=i.count;u<p;u+=3)a.fromBufferAttribute(i,u+0),n.fromBufferAttribute(i,u+1),s.fromBufferAttribute(i,u+2),h.subVectors(s,n),d.subVectors(a,n),h.cross(d),r.setXYZ(u+0,h.x,h.y,h.z),r.setXYZ(u+1,h.x,h.y,h.z),r.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)wt.fromBufferAttribute(t,i),wt.normalize(),t.setXYZ(i,wt.x,wt.y,wt.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,v=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*h;for(let f=0;f<h;f++)u[v++]=c[p++]}return new Ct(u,h,d)}if(this.index===null)return be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let i=new fh,r=this.index.array,a=this.attributes;for(let o in a){let l=a[o],c=t(l,r);i.setAttribute(o,c)}let n=this.morphAttributes;for(let o in n){let l=[],c=n[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=t(u,r);l.push(p)}i.morphAttributes[o]=l}i.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,l=s.length;o<l;o++){let c=s[o];i.addGroup(c.start,c.count,c.materialIndex)}return i}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});let r=this.attributes;for(let l in r){let c=r[l];t.data.attributes[l]=c.toJSON(t.data)}let a={},n=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(a[l]=h,n=!0)}n&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let i={};this.name=t.name;let r=t.index;r!==null&&this.setIndex(r.clone());let a=t.attributes;for(let c in a){let h=a[c];this.setAttribute(c,h.clone(i))}let n=t.morphAttributes;for(let c in n){let h=[],d=n[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(i));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let s=t.groups;for(let c=0,h=s.length;c<h;c++){let d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},sp=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=co,this.updateRanges=[],this.version=0,this.uuid=ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,a=this.stride;r<a;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},It=new L,op=class mh{constructor(t,i,r,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=i,this.offset=r,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let i=0,r=this.data.count;i<r;i++)It.fromBufferAttribute(this,i),It.applyMatrix4(t),this.setXYZ(i,It.x,It.y,It.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)It.fromBufferAttribute(this,i),It.applyNormalMatrix(t),this.setXYZ(i,It.x,It.y,It.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)It.fromBufferAttribute(this,i),It.transformDirection(t),this.setXYZ(i,It.x,It.y,It.z);return this}getComponent(t,i){let r=this.array[t*this.data.stride+this.offset+i];return this.normalized&&(r=ii(r,this.array)),r}setComponent(t,i,r){return this.normalized&&(r=et(r,this.array)),this.data.array[t*this.data.stride+this.offset+i]=r,this}setX(t,i){return this.normalized&&(i=et(i,this.array)),this.data.array[t*this.data.stride+this.offset]=i,this}setY(t,i){return this.normalized&&(i=et(i,this.array)),this.data.array[t*this.data.stride+this.offset+1]=i,this}setZ(t,i){return this.normalized&&(i=et(i,this.array)),this.data.array[t*this.data.stride+this.offset+2]=i,this}setW(t,i){return this.normalized&&(i=et(i,this.array)),this.data.array[t*this.data.stride+this.offset+3]=i,this}getX(t){let i=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(i=ii(i,this.array)),i}getY(t){let i=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(i=ii(i,this.array)),i}getZ(t){let i=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(i=ii(i,this.array)),i}getW(t){let i=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(i=ii(i,this.array)),i}setXY(t,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(i=et(i,this.array),r=et(r,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=r,this}setXYZ(t,i,r,a){return t=t*this.data.stride+this.offset,this.normalized&&(i=et(i,this.array),r=et(r,this.array),a=et(a,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=r,this.data.array[t+2]=a,this}setXYZW(t,i,r,a,n){return t=t*this.data.stride+this.offset,this.normalized&&(i=et(i,this.array),r=et(r,this.array),a=et(a,this.array),n=et(n,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=r,this.data.array[t+2]=a,this.data.array[t+3]=n,this}clone(t){if(t===void 0){xn("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let i=[];for(let r=0;r<this.count;r++){let a=r*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)i.push(this.data.array[a+n])}return new Ct(new this.array.constructor(i),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new mh(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){xn("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let i=[];for(let r=0;r<this.count;r++){let a=r*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)i.push(this.data.array[a+n])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},lp=0,si=class extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=ai(),this.name="",this.type="Material",this.blending=Nr,this.side=Ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ys,this.blendDst=bs,this.blendEquation=nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ml,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pr,this.stencilZFail=pr,this.stencilZPass=pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){be(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Nr&&(i.blending=this.blending),this.side!==Ni&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ys&&(i.blendSrc=this.blendSrc),this.blendDst!==bs&&(i.blendDst=this.blendDst),this.blendEquation!==nr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Or&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ml&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let n=[];for(let s in a){let o=a[s];delete o.metadata,n.push(o)}return n}if(t){let a=r(e.textures),n=r(e.images);a.length>0&&(i.textures=a),n.length>0&&(i.images=n)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ai=new L,es=new L,Fa=new L,Vi=new L,ts=new L,Ba=new L,is=new L,Ta=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,t),Ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){es.copy(e).add(t).multiplyScalar(.5),Fa.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(es);let a=e.distanceTo(t)*.5,n=-this.direction.dot(Fa),s=Vi.dot(this.direction),o=-Vi.dot(Fa),l=Vi.lengthSq(),c=Math.abs(1-n*n),h,d,u,p;if(c>0)if(h=n*o-s,d=n*s-o,p=a*c,h>=0)if(d>=-p)if(d<=p){let v=1/c;h*=v,d*=v,u=h*(h+n*d+2*s)+d*(n*h+d+2*o)+l}else d=a,h=Math.max(0,-(n*d+s)),u=-h*h+d*(d+2*o)+l;else d=-a,h=Math.max(0,-(n*d+s)),u=-h*h+d*(d+2*o)+l;else d<=-p?(h=Math.max(0,-(-n*a+s)),d=h>0?-a:Math.min(Math.max(-a,-o),a),u=-h*h+d*(d+2*o)+l):d<=p?(h=0,d=Math.min(Math.max(-a,-o),a),u=d*(d+2*o)+l):(h=Math.max(0,-(n*a+s)),d=h>0?a:Math.min(Math.max(-a,-o),a),u=-h*h+d*(d+2*o)+l);else d=n>0?-a:a,h=Math.max(0,-(n*d+s)),u=-h*h+d*(d+2*o)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(es).addScaledVector(Fa,d),u}intersectSphere(e,t){Ai.subVectors(e.center,this.origin);let i=Ai.dot(this.direction),r=Ai.dot(Ai)-i*i,a=e.radius*e.radius;if(r>a)return null;let n=Math.sqrt(a-r),s=i-n,o=i+n;return o<0?null:s<0?this.at(o,t):this.at(s,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,n,s,o,l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),c>=0?(a=(e.min.y-d.y)*c,n=(e.max.y-d.y)*c):(a=(e.max.y-d.y)*c,n=(e.min.y-d.y)*c),i>n||a>r||((a>i||isNaN(i))&&(i=a),(n<r||isNaN(r))&&(r=n),h>=0?(s=(e.min.z-d.z)*h,o=(e.max.z-d.z)*h):(s=(e.max.z-d.z)*h,o=(e.min.z-d.z)*h),i>o||s>r)||((s>i||i!==i)&&(i=s),(o<r||r!==r)&&(r=o),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,t,i,r,a){ts.subVectors(t,e),Ba.subVectors(i,e),is.crossVectors(ts,Ba);let n=this.direction.dot(is),s;if(n>0){if(r)return null;s=1}else if(n<0)s=-1,n=-n;else return null;Vi.subVectors(this.origin,e);let o=s*this.direction.dot(Ba.crossVectors(Vi,Ba));if(o<0)return null;let l=s*this.direction.dot(ts.cross(Vi));if(l<0||o+l>n)return null;let c=-s*Vi.dot(is);return c<0?null:this.at(c/n,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Yi=class extends si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kr,this.combine=kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ul=new Ve,ir=new Ta,za=new Si,Ol=new L,ka=new L,Ga=new L,Va=new L,rs=new L,Ha=new L,Fl=new L,Wa=new L,Dt=class extends St{constructor(e=new Pt,t=new Yi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,n=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let s=this.morphTargetInfluences;if(a&&s){Ha.set(0,0,0);for(let o=0,l=a.length;o<l;o++){let c=s[o],h=a[o];c!==0&&(rs.fromBufferAttribute(h,e),n?Ha.addScaledVector(rs,c):Ha.addScaledVector(rs.sub(t),c))}t.add(Ha)}return t}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),za.copy(i.boundingSphere),za.applyMatrix4(a),ir.copy(e.ray).recast(e.near),!(za.containsPoint(ir.origin)===!1&&(ir.intersectSphere(za,Ol)===null||ir.origin.distanceToSquared(Ol)>(e.far-e.near)**2))&&(Ul.copy(a).invert(),ir.copy(e.ray).applyMatrix4(Ul),!(i.boundingBox!==null&&ir.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ir)))}_computeIntersections(e,t,i){let r,a=this.geometry,n=this.material,s=a.index,o=a.attributes.position,l=a.attributes.uv,c=a.attributes.uv1,h=a.attributes.normal,d=a.groups,u=a.drawRange;if(s!==null)if(Array.isArray(n))for(let p=0,v=d.length;p<v;p++){let g=d[p],m=n[g.materialIndex],f=Math.max(g.start,u.start),_=Math.min(s.count,Math.min(g.start+g.count,u.start+u.count));for(let M=f,y=_;M<y;M+=3){let T=s.getX(M),E=s.getX(M+1),C=s.getX(M+2);r=Xa(this,m,e,i,l,c,h,T,E,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,u.start),v=Math.min(s.count,u.start+u.count);for(let g=p,m=v;g<m;g+=3){let f=s.getX(g),_=s.getX(g+1),M=s.getX(g+2);r=Xa(this,n,e,i,l,c,h,f,_,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(o!==void 0)if(Array.isArray(n))for(let p=0,v=d.length;p<v;p++){let g=d[p],m=n[g.materialIndex],f=Math.max(g.start,u.start),_=Math.min(o.count,Math.min(g.start+g.count,u.start+u.count));for(let M=f,y=_;M<y;M+=3){let T=M,E=M+1,C=M+2;r=Xa(this,m,e,i,l,c,h,T,E,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,u.start),v=Math.min(o.count,u.start+u.count);for(let g=p,m=v;g<m;g+=3){let f=g,_=g+1,M=g+2;r=Xa(this,n,e,i,l,c,h,f,_,M),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};ra=new nt,Bl=new nt,zl=new nt,hp=new nt,kl=new Ve,ja=new L,as=new Si,Gl=new Ve,ns=new Ta,up=class extends Dt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_l,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mi),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ja),this.boundingBox.expandByPoint(ja)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Si),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ja),this.boundingSphere.expandByPoint(ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),as.copy(this.boundingSphere),as.applyMatrix4(r),e.ray.intersectsSphere(as)!==!1&&(Gl.copy(r).invert(),ns.copy(e.ray).applyMatrix4(Gl),!(this.boundingBox!==null&&ns.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ns)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new nt,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let a=1/e.manhattanLength();a!==1/0?e.multiplyScalar(a):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_l?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===od?this.bindMatrixInverse.copy(this.bindMatrix).invert():be("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;Bl.fromBufferAttribute(r.attributes.skinIndex,e),zl.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(ra.copy(t),t.set(0,0,0,0)):(ra.set(...t,1),t.set(0,0,0)),ra.applyMatrix4(this.bindMatrix);for(let a=0;a<4;a++){let n=zl.getComponent(a);if(n!==0){let s=Bl.getComponent(a);kl.multiplyMatrices(i.bones[s].matrixWorld,i.boneInverses[s]),t.addScaledVector(hp.copy(ra).applyMatrix4(kl),n)}}return t.isVector4&&(t.w=ra.w),t.applyMatrix4(this.bindMatrixInverse)}},gh=class extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}},Do=class extends Lt{constructor(e=null,t=1,i=1,r,a,n,s,o,l=yt,c=yt,h,d){super(null,n,s,o,l,c,r,a,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vl=new Ve,dp=new Ve,pp=class vh{constructor(t=[],i=[]){this.uuid=ai(),this.bones=t.slice(0),this.boneInverses=i,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,i=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),i.length===0)this.calculateInverses();else if(t.length!==i.length){be("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let r=0,a=this.bones.length;r<a;r++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,i=this.bones.length;t<i;t++){let r=new Ve;this.bones[t]&&r.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(r)}}pose(){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];r&&r.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];r&&(r.parent&&r.parent.isBone?(r.matrix.copy(r.parent.matrixWorld).invert(),r.matrix.multiply(r.matrixWorld)):r.matrix.copy(r.matrixWorld),r.matrix.decompose(r.position,r.quaternion,r.scale))}}update(){let t=this.bones,i=this.boneInverses,r=this.boneMatrices,a=this.boneTexture;for(let n=0,s=t.length;n<s;n++){let o=t[n]?t[n].matrixWorld:dp;Vl.multiplyMatrices(o,i[n]),Vl.toArray(r,n*16)}a!==null&&(a.needsUpdate=!0)}clone(){return new vh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let i=new Float32Array(t*t*4);i.set(this.boneMatrices);let r=new Do(i,t,t,Kt,Yt);return r.needsUpdate=!0,this.boneMatrices=i,this.boneTexture=r,this}getBoneByName(t){for(let i=0,r=this.bones.length;i<r;i++){let a=this.bones[i];if(a.name===t)return a}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,i){this.uuid=t.uuid;for(let r=0,a=t.bones.length;r<a;r++){let n=t.bones[r],s=i[n];s===void 0&&(be("Skeleton: No bone found with UUID:",n),s=new gh),this.bones.push(s),this.boneInverses.push(new Ve().fromArray(t.boneInverses[r]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let i=this.bones,r=this.boneInverses;for(let a=0,n=i.length;a<n;a++){let s=i[a];t.bones.push(s.uuid);let o=r[a];t.boneInverses.push(o.toArray())}return t}},po=class extends Ct{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Tr=new Ve,Hl=new Ve,qa=[],Wl=new Mi,fp=new Ve,aa=new Dt,na=new Si,mp=class extends Dt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new po(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,fp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Tr),Wl.copy(e.boundingBox).applyMatrix4(Tr),this.boundingBox.union(Wl)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Si),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Tr),na.copy(e.boundingSphere).applyMatrix4(Tr),this.boundingSphere.union(na)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,n=e*a+1;for(let s=0;s<i.length;s++)i[s]=r[n+s]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(aa.geometry=this.geometry,aa.material=this.material,aa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),na.copy(this.boundingSphere),na.applyMatrix4(i),e.ray.intersectsSphere(na)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,Tr),Hl.multiplyMatrices(i,Tr),aa.matrixWorld=Hl,aa.raycast(e,qa);for(let n=0,s=qa.length;n<s;n++){let o=qa[n];o.instanceId=a,o.object=this,t.push(o)}qa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new po(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Do(new Float32Array(r*this.count),r,this.count,To,Yt));let a=this.morphTexture.source.data.data,n=0;for(let l=0;l<i.length;l++)n+=i[l];let s=this.geometry.morphTargetsRelative?1:1-n,o=r*e;return a[o]=s,a.set(i,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ss=new L,gp=new L,vp=new He,Xi=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=ss.subVectors(i,t).cross(gp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(ss),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let n=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(n<0||n>1)?null:t.copy(e.start).addScaledVector(r,n)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||vp.getNormalMatrix(e),r=this.coplanarPoint(ss).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},rr=new Si,_p=new Pe(.5,.5),Ya=new L,Uo=class{constructor(e=new Xi,t=new Xi,i=new Xi,r=new Xi,a=new Xi,n=new Xi){this.planes=[e,t,i,r,a,n]}set(e,t,i,r,a,n){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(n),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=vi,i=!1){let r=this.planes,a=e.elements,n=a[0],s=a[1],o=a[2],l=a[3],c=a[4],h=a[5],d=a[6],u=a[7],p=a[8],v=a[9],g=a[10],m=a[11],f=a[12],_=a[13],M=a[14],y=a[15];if(r[0].setComponents(l-n,u-c,m-p,y-f).normalize(),r[1].setComponents(l+n,u+c,m+p,y+f).normalize(),r[2].setComponents(l+s,u+h,m+v,y+_).normalize(),r[3].setComponents(l-s,u-h,m-v,y-_).normalize(),i)r[4].setComponents(o,d,g,M).normalize(),r[5].setComponents(l-o,u-d,m-g,y-M).normalize();else if(r[4].setComponents(l-o,u-d,m-g,y-M).normalize(),t===vi)r[5].setComponents(l+o,u+d,m+g,y+M).normalize();else if(t===ya)r[5].setComponents(o,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rr)}intersectsSprite(e){rr.center.set(0,0,0);let t=_p.distanceTo(e.center);return rr.radius=.7071067811865476+t,rr.applyMatrix4(e.matrixWorld),this.intersectsSphere(rr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Ya.x=r.normal.x>0?e.max.x:e.min.x,Ya.y=r.normal.y>0?e.max.y:e.min.y,Ya.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ya)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Oo=class extends si{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Mn=new L,Sn=new L,Xl=new Ve,sa=new Ta,Ka=new Si,os=new L,jl=new L,bn=class extends St{constructor(e=new Pt,t=new Oo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,a=t.count;r<a;r++)Mn.fromBufferAttribute(t,r-1),Sn.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Mn.distanceTo(Sn);e.setAttribute("lineDistance",new st(i,1))}else be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,n=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(r),Ka.radius+=a,e.ray.intersectsSphere(Ka)===!1)return;Xl.copy(r).invert(),sa.copy(e.ray).applyMatrix4(Xl);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=this.isLineSegments?2:1,c=i.index,h=i.attributes.position;if(c!==null){let d=Math.max(0,n.start),u=Math.min(c.count,n.start+n.count);for(let p=d,v=u-1;p<v;p+=l){let g=c.getX(p),m=c.getX(p+1),f=Za(this,e,sa,o,g,m,p);f&&t.push(f)}if(this.isLineLoop){let p=c.getX(u-1),v=c.getX(d),g=Za(this,e,sa,o,p,v,u-1);g&&t.push(g)}}else{let d=Math.max(0,n.start),u=Math.min(h.count,n.start+n.count);for(let p=d,v=u-1;p<v;p+=l){let g=Za(this,e,sa,o,p,p+1,p);g&&t.push(g)}if(this.isLineLoop){let p=Za(this,e,sa,o,u-1,d,u-1);p&&t.push(p)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}};ql=new L,Yl=new L,_h=class extends bn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,a=t.count;r<a;r+=2)ql.fromBufferAttribute(t,r),Yl.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+ql.distanceTo(Yl);e.setAttribute("lineDistance",new st(i,1))}else be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},xp=class extends bn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},xh=class extends si{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Kl=new Ve,fo=new Ta,Ja=new Si,$a=new L,Mp=class extends St{constructor(e=new Pt,t=new xh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,n=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ja.copy(i.boundingSphere),Ja.applyMatrix4(r),Ja.radius+=a,e.ray.intersectsSphere(Ja)===!1)return;Kl.copy(r).invert(),fo.copy(e.ray).applyMatrix4(Kl);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=i.index,c=i.attributes.position;if(l!==null){let h=Math.max(0,n.start),d=Math.min(l.count,n.start+n.count);for(let u=h,p=d;u<p;u++){let v=l.getX(u);$a.fromBufferAttribute(c,v),Zl($a,v,o,r,e,t,this)}}else{let h=Math.max(0,n.start),d=Math.min(c.count,n.start+n.count);for(let u=h,p=d;u<p;u++)$a.fromBufferAttribute(c,u),Zl($a,u,o,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}};Mh=class extends Lt{constructor(e=[],t=lr,i,r,a,n,s,o,l,c){super(e,t,i,r,a,n,s,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Sp=class extends Lt{constructor(e,t,i,r,a,n,s,o,l){super(e,t,i,r,a,n,s,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Gr=class extends Lt{constructor(e,t,i=_i,r,a,n,s=yt,o=yt,l,c=Di,h=1){if(c!==Di&&c!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,r,a,n,s,o,c,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Io(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},yp=class extends Gr{constructor(e,t=_i,i=lr,r,a,n=yt,s=yt,o,l=Di){let c={width:e,height:e,depth:1},h=[c,c,c,c,c,c];super(e,e,t,i,r,a,n,s,o,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Sh=class extends Lt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Fo=class yh extends Pt{constructor(t=1,i=1,r=1,a=1,n=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:a,heightSegments:n,depthSegments:s};let o=this;a=Math.floor(a),n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=0,p=0;v("z","y","x",-1,-1,r,i,t,s,n,0),v("z","y","x",1,-1,r,i,-t,s,n,1),v("x","z","y",1,1,t,r,i,a,s,2),v("x","z","y",1,-1,t,r,-i,a,s,3),v("x","y","z",1,-1,t,i,r,a,n,4),v("x","y","z",-1,-1,t,i,-r,a,n,5),this.setIndex(l),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(d,2));function v(g,m,f,_,M,y,T,E,C,x,w){let U=y/C,R=T/x,B=y/2,j=T/2,O=E/2,H=C+1,W=x+1,k=0,ee=0,te=new L;for(let ne=0;ne<W;ne++){let ce=ne*R-j;for(let Se=0;Se<H;Se++){let De=Se*U-B;te[g]=De*_,te[m]=ce*M,te[f]=O,c.push(te.x,te.y,te.z),te[g]=0,te[m]=0,te[f]=E>0?1:-1,h.push(te.x,te.y,te.z),d.push(Se/C),d.push(1-ne/x),k+=1}}for(let ne=0;ne<x;ne++)for(let ce=0;ce<C;ce++){let Se=u+ce+H*ne,De=u+ce+H*(ne+1),Oe=u+(ce+1)+H*(ne+1),Z=u+(ce+1)+H*ne;l.push(Se,De,Z),l.push(De,Oe,Z),ee+=6}o.addGroup(p,ee,w),p+=ee,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yh(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},bp=class bh extends Pt{constructor(t=1,i=1,r=1,a=32,n=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:r,radialSegments:a,heightSegments:n,openEnded:s,thetaStart:o,thetaLength:l};let c=this;a=Math.floor(a),n=Math.floor(n);let h=[],d=[],u=[],p=[],v=0,g=[],m=r/2,f=0;_(),s===!1&&(t>0&&M(!0),i>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(p,2));function _(){let y=new L,T=new L,E=0,C=(i-t)/r;for(let x=0;x<=n;x++){let w=[],U=x/n,R=U*(i-t)+t;for(let B=0;B<=a;B++){let j=B/a,O=j*l+o,H=Math.sin(O),W=Math.cos(O);T.x=R*H,T.y=-U*r+m,T.z=R*W,d.push(T.x,T.y,T.z),y.set(H,C,W).normalize(),u.push(y.x,y.y,y.z),p.push(j,1-U),w.push(v++)}g.push(w)}for(let x=0;x<a;x++)for(let w=0;w<n;w++){let U=g[w][x],R=g[w+1][x],B=g[w+1][x+1],j=g[w][x+1];(t>0||w!==0)&&(h.push(U,R,j),E+=3),(i>0||w!==n-1)&&(h.push(R,B,j),E+=3)}c.addGroup(f,E,0),f+=E}function M(y){let T=v,E=new Pe,C=new L,x=0,w=y===!0?t:i,U=y===!0?1:-1;for(let B=1;B<=a;B++)d.push(0,m*U,0),u.push(0,U,0),p.push(.5,.5),v++;let R=v;for(let B=0;B<=a;B++){let j=B/a*l+o,O=Math.cos(j),H=Math.sin(j);C.x=w*H,C.y=m*U,C.z=w*O,d.push(C.x,C.y,C.z),u.push(0,U,0),E.x=O*.5+.5,E.y=H*.5*U+.5,p.push(E.x,E.y),v++}for(let B=0;B<a;B++){let j=T+B,O=R+B;y===!0?h.push(O,O+1,j):h.push(O+1,O,j),x+=3}c.addGroup(f,x,y===!0?1:2),f+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bh(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ui=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){be("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let n=1;n<=e;n++)i=this.getPoint(n/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,a=i.length,n;t?n=t:n=e*i[a-1];let s=0,o=a-1,l;for(;s<=o;)if(r=Math.floor(s+(o-s)/2),l=i[r]-n,l<0)s=r+1;else if(l>0)o=r-1;else{o=r;break}if(r=o,i[r]===n)return r/(a-1);let c=i[r],h=i[r+1]-c,d=(n-c)/h;return(r+d)/(a-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),n=this.getPoint(r),s=t||(a.isVector2?new Pe:new L);return s.copy(n).sub(a).normalize(),s}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new L,r=[],a=[],n=[],s=new L,o=new Ve;for(let u=0;u<=e;u++){let p=u/e;r[u]=this.getTangentAt(p,new L)}a[0]=new L,n[0]=new L;let l=Number.MAX_VALUE,c=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);c<=l&&(l=c,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),d<=l&&i.set(0,0,1),s.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],s),n[0].crossVectors(r[0],a[0]);for(let u=1;u<=e;u++){if(a[u]=a[u-1].clone(),n[u]=n[u-1].clone(),s.crossVectors(r[u-1],r[u]),s.length()>Number.EPSILON){s.normalize();let p=Math.acos(qe(r[u-1].dot(r[u]),-1,1));a[u].applyMatrix4(o.makeRotationAxis(s,p))}n[u].crossVectors(r[u],a[u])}if(t===!0){let u=Math.acos(qe(a[0].dot(a[e]),-1,1));u/=e,r[0].dot(s.crossVectors(a[0],a[e]))>0&&(u=-u);for(let p=1;p<=e;p++)a[p].applyMatrix4(o.makeRotationAxis(r[p],u*p)),n[p].crossVectors(r[p],a[p])}return{tangents:r,normals:a,binormals:n}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Bo=class extends Ui{constructor(e=0,t=0,i=1,r=1,a=0,n=Math.PI*2,s=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=n,this.aClockwise=s,this.aRotation=o}getPoint(e,t=new Pe){let i=t,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,n=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(n?a=0:a=r),this.aClockwise===!0&&!n&&(a===r?a=-r:a=a-r);let s=this.aStartAngle+e*a,o=this.aX+this.xRadius*Math.cos(s),l=this.aY+this.yRadius*Math.sin(s);if(this.aRotation!==0){let c=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=o-this.aX,u=l-this.aY;o=d*c-u*h+this.aX,l=d*h+u*c+this.aY}return i.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Tp=class extends Bo{constructor(e,t,i,r,a,n){super(e,t,i,i,r,a,n),this.isArcCurve=!0,this.type="ArcCurve"}};Jl=new L,$l=new L,ls=new zo,cs=new zo,hs=new zo,Th=class extends Ui{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new L){let i=t,r=this.points,a=r.length,n=(a-(this.closed?0:1))*e,s=Math.floor(n),o=n-s;this.closed?s+=s>0?0:(Math.floor(Math.abs(s)/a)+1)*a:o===0&&s===a-1&&(s=a-2,o=1);let l,c;this.closed||s>0?l=r[(s-1)%a]:($l.subVectors(r[0],r[1]).add(r[0]),l=$l);let h=r[s%a],d=r[(s+1)%a];if(this.closed||s+2<a?c=r[(s+2)%a]:(Jl.subVectors(r[a-1],r[a-2]).add(r[a-1]),c=Jl),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(h),u),v=Math.pow(h.distanceToSquared(d),u),g=Math.pow(d.distanceToSquared(c),u);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),ls.initNonuniformCatmullRom(l.x,h.x,d.x,c.x,p,v,g),cs.initNonuniformCatmullRom(l.y,h.y,d.y,c.y,p,v,g),hs.initNonuniformCatmullRom(l.z,h.z,d.z,c.z,p,v,g)}else this.curveType==="catmullrom"&&(ls.initCatmullRom(l.x,h.x,d.x,c.x,this.tension),cs.initCatmullRom(l.y,h.y,d.y,c.y,this.tension),hs.initCatmullRom(l.z,h.z,d.z,c.z,this.tension));return i.set(ls.calc(o),cs.calc(o),hs.calc(o)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Ip=class extends Ui{constructor(e=new Pe,t=new Pe,i=new Pe,r=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Pe){let i=t,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(ga(e,r.x,a.x,n.x,s.x),ga(e,r.y,a.y,n.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Np=class extends Ui{constructor(e=new L,t=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new L){let i=t,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(ga(e,r.x,a.x,n.x,s.x),ga(e,r.y,a.y,n.y,s.y),ga(e,r.z,a.z,n.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Dp=class extends Ui{constructor(e=new Pe,t=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Pe){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Up=class extends Ui{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Op=class extends Ui{constructor(e=new Pe,t=new Pe,i=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Pe){let i=t,r=this.v0,a=this.v1,n=this.v2;return i.set(ma(e,r.x,a.x,n.x),ma(e,r.y,a.y,n.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wh=class extends Ui{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){let i=t,r=this.v0,a=this.v1,n=this.v2;return i.set(ma(e,r.x,a.x,n.x),ma(e,r.y,a.y,n.y),ma(e,r.z,a.z,n.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fp=class extends Ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Pe){let i=t,r=this.points,a=(r.length-1)*e,n=Math.floor(a),s=a-n,o=r[n===0?n:n-1],l=r[n],c=r[n>r.length-2?r.length-1:n+1],h=r[n>r.length-3?r.length-1:n+2];return i.set(Ql(s,o.x,l.x,c.x,h.x),Ql(s,o.y,l.y,c.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Pe().fromArray(r))}return this}},Bp=Object.freeze({__proto__:null,ArcCurve:Tp,CatmullRomCurve3:Th,CubicBezierCurve:Ip,CubicBezierCurve3:Np,EllipseCurve:Bo,LineCurve:Dp,LineCurve3:Up,QuadraticBezierCurve:Op,QuadraticBezierCurve3:wh,SplineCurve:Fp}),ko=class Eh extends Pt{constructor(t=1,i=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:a};let n=t/2,s=i/2,o=Math.floor(r),l=Math.floor(a),c=o+1,h=l+1,d=t/o,u=i/l,p=[],v=[],g=[],m=[];for(let f=0;f<h;f++){let _=f*u-s;for(let M=0;M<c;M++){let y=M*d-n;v.push(y,-_,0),g.push(0,0,1),m.push(M/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<o;_++){let M=_+c*f,y=_+c*(f+1),T=_+1+c*(f+1),E=_+1+c*f;p.push(M,y,E),p.push(y,T,E)}this.setIndex(p),this.setAttribute("position",new st(v,3)),this.setAttribute("normal",new st(g,3)),this.setAttribute("uv",new st(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eh(t.width,t.height,t.widthSegments,t.heightSegments)}},zp=class Ah extends Pt{constructor(t=.5,i=1,r=32,a=1,n=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:r,phiSegments:a,thetaStart:n,thetaLength:s},r=Math.max(3,r),a=Math.max(1,a);let o=[],l=[],c=[],h=[],d=t,u=(i-t)/a,p=new L,v=new Pe;for(let g=0;g<=a;g++){for(let m=0;m<=r;m++){let f=n+m/r*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),v.x=(p.x/i+1)/2,v.y=(p.y/i+1)/2,h.push(v.x,v.y)}d+=u}for(let g=0;g<a;g++){let m=g*(r+1);for(let f=0;f<r;f++){let _=f+m,M=_,y=_+r+1,T=_+r+2,E=_+1;o.push(M,y,E),o.push(y,T,E)}}this.setIndex(o),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ah(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},kp=class Rh extends Pt{constructor(t=1,i=32,r=16,a=0,n=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:r,phiStart:a,phiLength:n,thetaStart:s,thetaLength:o},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));let l=Math.min(s+o,Math.PI),c=0,h=[],d=new L,u=new L,p=[],v=[],g=[],m=[];for(let f=0;f<=r;f++){let _=[],M=f/r,y=0;f===0&&s===0?y=.5/i:f===r&&l===Math.PI&&(y=-.5/i);for(let T=0;T<=i;T++){let E=T/i;d.x=-t*Math.cos(a+E*n)*Math.sin(s+M*o),d.y=t*Math.cos(s+M*o),d.z=t*Math.sin(a+E*n)*Math.sin(s+M*o),v.push(d.x,d.y,d.z),u.copy(d).normalize(),g.push(u.x,u.y,u.z),m.push(E+y,1-M),_.push(c++)}h.push(_)}for(let f=0;f<r;f++)for(let _=0;_<i;_++){let M=h[f][_+1],y=h[f][_],T=h[f+1][_],E=h[f+1][_+1];(f!==0||s>0)&&p.push(M,y,E),(f!==r-1||l<Math.PI)&&p.push(y,T,E)}this.setIndex(p),this.setAttribute("position",new st(v,3)),this.setAttribute("normal",new st(g,3)),this.setAttribute("uv",new st(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rh(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Gp=class Ch extends Pt{constructor(t=1,i=.4,r=12,a=48,n=Math.PI*2,s=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:i,radialSegments:r,tubularSegments:a,arc:n,thetaStart:s,thetaLength:o},r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=new L,p=new L,v=new L;for(let g=0;g<=r;g++){let m=s+g/r*o;for(let f=0;f<=a;f++){let _=f/a*n;p.x=(t+i*Math.cos(m))*Math.cos(_),p.y=(t+i*Math.cos(m))*Math.sin(_),p.z=i*Math.sin(m),c.push(p.x,p.y,p.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),v.subVectors(p,u).normalize(),h.push(v.x,v.y,v.z),d.push(f/a),d.push(g/r)}}for(let g=1;g<=r;g++)for(let m=1;m<=a;m++){let f=(a+1)*g+m-1,_=(a+1)*(g-1)+m-1,M=(a+1)*(g-1)+m,y=(a+1)*g+m;l.push(f,_,y),l.push(_,M,y)}this.setIndex(l),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ch(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},Vp=class Lh extends Pt{constructor(t=new wh(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),i=64,r=1,a=8,n=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:i,radius:r,radialSegments:a,closed:n};let s=t.computeFrenetFrames(i,n);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let o=new L,l=new L,c=new Pe,h=new L,d=[],u=[],p=[],v=[];g(),this.setIndex(v),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(p,2));function g(){for(let M=0;M<i;M++)m(M);m(n===!1?i:0),_(),f()}function m(M){h=t.getPointAt(M/i,h);let y=s.normals[M],T=s.binormals[M];for(let E=0;E<=a;E++){let C=E/a*Math.PI*2,x=Math.sin(C),w=-Math.cos(C);l.x=w*y.x+x*T.x,l.y=w*y.y+x*T.y,l.z=w*y.z+x*T.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+r*l.x,o.y=h.y+r*l.y,o.z=h.z+r*l.z,d.push(o.x,o.y,o.z)}}function f(){for(let M=1;M<=i;M++)for(let y=1;y<=a;y++){let T=(a+1)*(M-1)+(y-1),E=(a+1)*M+(y-1),C=(a+1)*M+y,x=(a+1)*(M-1)+y;v.push(T,E,x),v.push(E,C,x)}}function _(){for(let M=0;M<=i;M++)for(let y=0;y<=a;y++)c.x=M/i,c.y=y/a,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Lh(new Bp[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},Hp=class extends si{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ze(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};Ih={clone:Vr,merge:Nt},Xp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zt=class extends si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xp,this.fragmentShader=jp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vr(e.uniforms),this.uniformsGroups=Wp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},qp=class extends Zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Tn=class extends si{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lo,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},oi=class extends Tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Yp=class extends si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Kp=class extends si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};jr=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];e:{t:{let n;i:{r:if(!(e<r)){for(let s=i+2;;){if(r===void 0){if(e<a)break r;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===s)break;if(a=r,r=t[++i],e<r)break t}n=t.length;break i}if(!(e>=a)){let s=t[1];e<s&&(i=2,a=s);for(let o=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(r=a,a=t[--i-1],e>=a)break t}n=i,i=0;break i}break e}for(;i<n;){let s=i+n>>>1;e<t[s]?n=s:i=s+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let n=0;n!==r;++n)t[n]=i[a+n];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jp=class extends jr{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pr,endingEnd:Pr}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,n=e+1,s=r[a],o=r[n];if(s===void 0)switch(this.getSettings_().endingStart){case Ir:a=e,s=2*t-i;break;case vn:a=r.length-2,s=t+r[a]-r[a+1];break;default:a=e,s=i}if(o===void 0)switch(this.getSettings_().endingEnd){case Ir:n=e,o=2*i-t;break;case vn:n=1,o=i+r[1]-r[0];break;default:n=e-1,o=t}let l=(i-t)*.5,c=this.valueSize;this._weightPrev=l/(t-s),this._weightNext=l/(o-i),this._offsetPrev=a*c,this._offsetNext=n*c}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,c=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,u=this._weightNext,p=(i-t)/(r-t),v=p*p,g=v*p,m=-d*g+2*d*v-d*p,f=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*p+1,_=(-1-u)*g+(1.5+u)*v+.5*p,M=u*g-u*v;for(let y=0;y!==s;++y)a[y]=m*n[c+y]+f*n[l+y]+_*n[o+y]+M*n[h+y];return a}},Dh=class extends jr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,c=(i-t)/(r-t),h=1-c;for(let d=0;d!==s;++d)a[d]=n[l+d]*h+n[o+d]*c;return a}},$p=class extends jr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Qp=class extends jr{interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,c=this.settings||this.DefaultSettings_,h=c.inTangents,d=c.outTangents;if(!h||!d){let v=(i-t)/(r-t),g=1-v;for(let m=0;m!==s;++m)a[m]=n[l+m]*g+n[o+m]*v;return a}let u=s*2,p=e-1;for(let v=0;v!==s;++v){let g=n[l+v],m=n[o+v],f=p*u+v*2,_=d[f],M=d[f+1],y=e*u+v*2,T=h[y],E=h[y+1],C=(i-t)/(r-t),x,w,U,R,B;for(let j=0;j<8;j++){x=C*C,w=x*C,U=1-C,R=U*U,B=R*U;let O=B*t+3*R*C*_+3*U*x*T+w*r-i;if(Math.abs(O)<1e-10)break;let H=3*R*(_-t)+6*U*C*(T-_)+3*x*(r-T);if(Math.abs(H)<1e-10)break;C=C-O/H,C=Math.max(0,Math.min(1,C))}a[v]=B*g+3*R*C*M+3*U*x*E+w*m}return a}},li=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qa(t,this.TimeBufferType),this.values=Qa(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Qa(e.times,Array),values:Qa(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new $p(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Dh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Qp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ma:t=this.InterpolantFactoryMethodDiscrete;break;case Sa:t=this.InterpolantFactoryMethodLinear;break;case On:t=this.InterpolantFactoryMethodSmooth;break;case xl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return be("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ma;case this.InterpolantFactoryMethodLinear:return Sa;case this.InterpolantFactoryMethodSmooth:return On;case this.InterpolantFactoryMethodBezier:return xl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,a=0,n=r-1;for(;a!==r&&i[a]<e;)++a;for(;n!==-1&&i[n]>t;)--n;if(++n,a!==0||n!==r){a>=n&&(n=Math.max(n,1),a=n-1);let s=this.getValueSize();this.times=i.slice(a,n),this.values=this.values.slice(a*s,n*s)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ue("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&(Ue("KeyframeTrack: Track is empty.",this),e=!1);let n=null;for(let s=0;s!==a;s++){let o=i[s];if(typeof o=="number"&&isNaN(o)){Ue("KeyframeTrack: Time is not a valid number.",this,s,o),e=!1;break}if(n!==null&&n>o){Ue("KeyframeTrack: Out of order keys.",this,s,o,n),e=!1;break}n=o}if(r!==void 0&&bd(r))for(let s=0,o=r.length;s!==o;++s){let l=r[s];if(isNaN(l)){Ue("KeyframeTrack: Value is not a valid number.",this,s,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===On,a=e.length-1,n=1;for(let s=1;s<a;++s){let o=!1,l=e[s],c=e[s+1];if(l!==c&&(s!==1||l!==e[0]))if(r)o=!0;else{let h=s*i,d=h-i,u=h+i;for(let p=0;p!==i;++p){let v=t[h+p];if(v!==t[d+p]||v!==t[u+p]){o=!0;break}}}if(o){if(s!==n){e[n]=e[s];let h=s*i,d=n*i;for(let u=0;u!==i;++u)t[d+u]=t[h+u]}++n}}if(a>0){e[n]=e[a];for(let s=a*i,o=n*i,l=0;l!==i;++l)t[o+l]=t[s+l];++n}return n!==e.length?(this.times=e.slice(0,n),this.values=t.slice(0,n*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};li.prototype.ValueTypeName="";li.prototype.TimeBufferType=Float32Array;li.prototype.ValueBufferType=Float32Array;li.prototype.DefaultInterpolation=Sa;qr=class extends li{constructor(e,t,i){super(e,t,i)}};qr.prototype.ValueTypeName="bool";qr.prototype.ValueBufferType=Array;qr.prototype.DefaultInterpolation=Ma;qr.prototype.InterpolantFactoryMethodLinear=void 0;qr.prototype.InterpolantFactoryMethodSmooth=void 0;Uh=class extends li{constructor(e,t,i,r){super(e,t,i,r)}};Uh.prototype.ValueTypeName="color";Hr=class extends li{constructor(e,t,i,r){super(e,t,i,r)}};Hr.prototype.ValueTypeName="number";ef=class extends jr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=(i-t)/(r-t),l=e*s;for(let c=l+s;l!==c;l+=4)Ht.slerpFlat(a,0,n,l-s,n,l,o);return a}},Wr=class extends li{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new ef(this.times,this.values,this.getValueSize(),e)}};Wr.prototype.ValueTypeName="quaternion";Wr.prototype.InterpolantFactoryMethodSmooth=void 0;Yr=class extends li{constructor(e,t,i){super(e,t,i)}};Yr.prototype.ValueTypeName="string";Yr.prototype.ValueBufferType=Array;Yr.prototype.DefaultInterpolation=Ma;Yr.prototype.InterpolantFactoryMethodLinear=void 0;Yr.prototype.InterpolantFactoryMethodSmooth=void 0;Xr=class extends li{constructor(e,t,i,r){super(e,t,i,r)}};Xr.prototype.ValueTypeName="vector";mo=class{constructor(e="",t=-1,i=[],r=Ro){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=ai(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let n=0,s=i.length;n!==s;++n)t.push(rf(i[n]).scale(r));let a=new this(e.name,e.duration,t,e.blendMode);return a.uuid=e.uuid,a.userData=JSON.parse(e.userData||"{}"),a}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let a=0,n=i.length;a!==n;++a)t.push(li.toJSON(i[a]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let a=t.length,n=[];for(let s=0;s<a;s++){let o=[],l=[];o.push((s+a-1)%a,s,(s+1)%a),l.push(0,1,0);let c=Zp(o);o=tc(o,1,c),l=tc(l,1,c),!r&&o[0]===0&&(o.push(a),l.push(l[0])),n.push(new Hr(".morphTargetInfluences["+t[s].name+"]",o,l).scale(1/i))}return new this(e,-1,n)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},a=/^([\w-]*?)([\d]+)$/;for(let s=0,o=e.length;s<o;s++){let l=e[s],c=l.name.match(a);if(c&&c.length>1){let h=c[1],d=r[h];d||(r[h]=d=[]),d.push(l)}}let n=[];for(let s in r)n.push(this.CreateFromMorphTargetSequence(s,r[s],t,i));return n}static parseAnimation(e,t){if(be("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ue("AnimationClip: No animation in JSONLoader data."),null;let i=function(c,h,d,u,p){if(d.length!==0){let v=[],g=[];Nh(d,v,g,u),v.length!==0&&p.push(new c(h,v,g))}},r=[],a=e.name||"default",n=e.fps||30,s=e.blendMode,o=e.length||-1,l=e.hierarchy||[];for(let c=0;c<l.length;c++){let h=l[c].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let d={},u;for(u=0;u<h.length;u++)if(h[u].morphTargets)for(let p=0;p<h[u].morphTargets.length;p++)d[h[u].morphTargets[p]]=-1;for(let p in d){let v=[],g=[];for(let m=0;m!==h[u].morphTargets.length;++m){let f=h[u];v.push(f.time),g.push(f.morphTarget===p?1:0)}r.push(new Hr(".morphTargetInfluence["+p+"]",v,g))}o=d.length*n}else{let d=".bones["+t[c].name+"]";i(Xr,d+".position",h,"pos",r),i(Wr,d+".quaternion",h,"rot",r),i(Xr,d+".scale",h,"scl",r)}}return r.length===0?null:new this(a,o,r,s)}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let a=this.tracks[i];t=Math.max(t,a.times[a.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};Li={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(ic(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!ic(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};af=class{constructor(e,t,i){let r=this,a=!1,n=0,s=0,o,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(c){s++,a===!1&&r.onStart!==void 0&&r.onStart(c,n,s),a=!0},this.itemEnd=function(c){n++,r.onProgress!==void 0&&r.onProgress(c,n,s),n===s&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(c){r.onError!==void 0&&r.onError(c)},this.resolveURL=function(c){return o?o(c):c},this.setURLModifier=function(c){return o=c,this},this.addHandler=function(c,h){return l.push(c,h),this},this.removeHandler=function(c){let h=l.indexOf(c);return h!==-1&&l.splice(h,2),this},this.getHandler=function(c){for(let h=0,d=l.length;h<d;h+=2){let u=l[h],p=l[h+1];if(u.global&&(u.lastIndex=0),u.test(c))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},nf=new af,Kr=class{constructor(e){this.manager=e!==void 0?e:nf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Kr.DEFAULT_MATERIAL_NAME="__DEFAULT";Ri={},sf=class extends Error{constructor(e,t){super(e),this.response=t}},Oh=class extends Kr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=Li.get(`file:${e}`);if(a!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(a),this.manager.itemEnd(e)},0);return}if(Ri[e]!==void 0){Ri[e].push({onLoad:t,onProgress:i,onError:r});return}Ri[e]=[],Ri[e].push({onLoad:t,onProgress:i,onError:r});let n=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),s=this.mimeType,o=this.responseType;fetch(n).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&be("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let c=Ri[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),u=d?parseInt(d):0,p=u!==0,v=0,g=new ReadableStream({start(m){f();function f(){h.read().then(({done:_,value:M})=>{if(_)m.close();else{v+=M.byteLength;let y=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:u});for(let T=0,E=c.length;T<E;T++){let C=c[T];C.onProgress&&C.onProgress(y)}m.enqueue(M),f()}},_=>{m.error(_)})}}});return new Response(g)}else throw new sf(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(o){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(c=>new DOMParser().parseFromString(c,s));case"json":return l.json();default:if(s==="")return l.text();{let c=/charset="?([^;"\s]*)"?/i.exec(s),h=c&&c[1]?c[1].toLowerCase():void 0,d=new TextDecoder(h);return l.arrayBuffer().then(u=>d.decode(u))}}}).then(l=>{Li.add(`file:${e}`,l);let c=Ri[e];delete Ri[e];for(let h=0,d=c.length;h<d;h++){let u=c[h];u.onLoad&&u.onLoad(l)}}).catch(l=>{let c=Ri[e];if(c===void 0)throw this.manager.itemError(e),l;delete Ri[e];for(let h=0,d=c.length;h<d;h++){let u=c[h];u.onError&&u.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},wr=new WeakMap,of=class extends Kr{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=this,n=Li.get(`image:${e}`);if(n!==void 0){if(n.complete===!0)a.manager.itemStart(e),setTimeout(function(){t&&t(n),a.manager.itemEnd(e)},0);else{let h=wr.get(n);h===void 0&&(h=[],wr.set(n,h)),h.push({onLoad:t,onError:r})}return n}let s=ba("img");function o(){c(),t&&t(this);let h=wr.get(this)||[];for(let d=0;d<h.length;d++){let u=h[d];u.onLoad&&u.onLoad(this)}wr.delete(this),a.manager.itemEnd(e)}function l(h){c(),r&&r(h),Li.remove(`image:${e}`);let d=wr.get(this)||[];for(let u=0;u<d.length;u++){let p=d[u];p.onError&&p.onError(h)}wr.delete(this),a.manager.itemError(e),a.manager.itemEnd(e)}function c(){s.removeEventListener("load",o,!1),s.removeEventListener("error",l,!1)}return s.addEventListener("load",o,!1),s.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(s.crossOrigin=this.crossOrigin),Li.add(`image:${e}`,s),a.manager.itemStart(e),s.src=e,s}},Fh=class extends Kr{constructor(e){super(e)}load(e,t,i,r){let a=new Lt,n=new of(this.manager);return n.setCrossOrigin(this.crossOrigin),n.setPath(this.path),n.load(e,function(s){a.image=s,a.needsUpdate=!0,t!==void 0&&t(a)},i,r),a}},wa=class extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},lf=class extends wa{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},us=new Ve,rc=new L,ac=new L,Go=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.mapType=Vt,this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Uo,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;rc.setFromMatrixPosition(e.matrixWorld),t.position.copy(rc),ac.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ac),t.updateMatrixWorld(),us.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(us,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ya||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(us)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},en=new L,tn=new Ht,di=new L,Bh=class extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(en,tn,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(en,tn,di.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(en,tn,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(en,tn,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Hi=new L,nc=new Pe,sc=new Pe,Ft=class extends Bh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(pa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,nc,sc),t.subVectors(sc,nc)}setViewOffset(e,t,i,r,a,n){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(pa*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,n=this.view;if(this.view!==null&&this.view.enabled){let o=n.fullWidth,l=n.fullHeight;a+=n.offsetX*r/o,t-=n.offsetY*i/l,r*=n.width/o,i*=n.height/l}let s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},cf=class extends Go{constructor(){super(new Ft(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=zr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,a=e.distance||t.far;(i!==t.fov||r!==t.aspect||a!==t.far)&&(t.fov=i,t.aspect=r,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},hf=class extends wa{constructor(e,t,i=0,r=Math.PI/3,a=0,n=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=i,this.angle=r,this.penumbra=a,this.decay=n,this.map=null,this.shadow=new cf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},uf=class extends Go{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0}},zh=class extends wa{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new uf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ea=class extends Bh{constructor(e=-1,t=1,i=1,r=-1,a=.1,n=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=n,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,n){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,n=i+e,s=r+t,o=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,n=a+l*this.view.width,s-=c*this.view.offsetY,o=s-c*this.view.height}this.projectionMatrix.makeOrthographic(a,n,s,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},df=class extends Go{constructor(){super(new Ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},kh=class extends wa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new df}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},pf=class extends wa{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},va=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},ds=new WeakMap,ff=class extends Kr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&be("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&be("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=this,n=Li.get(`image-bitmap:${e}`);if(n!==void 0){if(a.manager.itemStart(e),n.then){n.then(l=>{ds.has(n)===!0?(r&&r(ds.get(n)),a.manager.itemError(e),a.manager.itemEnd(e)):(t&&t(l),a.manager.itemEnd(e))});return}setTimeout(function(){t&&t(n),a.manager.itemEnd(e)},0);return}let s={};s.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",s.headers=this.requestHeader,s.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let o=fetch(e,s).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(a.options,{colorSpaceConversion:"none"}))}).then(function(l){Li.add(`image-bitmap:${e}`,l),t&&t(l),a.manager.itemEnd(e)}).catch(function(l){r&&r(l),ds.set(o,l),Li.remove(`image-bitmap:${e}`),a.manager.itemError(e),a.manager.itemEnd(e)});Li.add(`image-bitmap:${e}`,o),a.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Er=-90,Ar=1,mf=class extends St{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ft(Er,Ar,e,t);r.layers=this.layers,this.add(r);let a=new Ft(Er,Ar,e,t);a.layers=this.layers,this.add(a);let n=new Ft(Er,Ar,e,t);n.layers=this.layers,this.add(n);let s=new Ft(Er,Ar,e,t);s.layers=this.layers,this.add(s);let o=new Ft(Er,Ar,e,t);o.layers=this.layers,this.add(o);let l=new Ft(Er,Ar,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,n,s,o]=t;for(let l of t)this.remove(l);if(e===vi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),n.up.set(0,0,1),n.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===ya)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),n.up.set(0,0,-1),n.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,n,s,o,l,c]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,n),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(h,d,u),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},gf=class extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},vf=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let r,a,n;switch(t){case"quaternion":r=this._slerp,a=this._slerpAdditive,n=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,a=this._select,n=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:r=this._lerp,a=this._lerpAdditive,n=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=a,this._setIdentity=n,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,r=this.valueSize,a=e*r+r,n=this.cumulativeWeight;if(n===0){for(let s=0;s!==r;++s)i[a+s]=i[s];n=t}else{n+=t;let s=t/n;this._mixBufferRegion(i,a,0,s,r)}this.cumulativeWeight=n}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,r=e*t+t,a=this.cumulativeWeight,n=this.cumulativeWeightAdditive,s=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,a<1){let o=t*this._origIndex;this._mixBufferRegion(i,r,o,1-a,t)}n>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*t,1,t);for(let o=t,l=t+t;o!==l;++o)if(i[o]!==i[o+t]){s.setValue(i,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(t,r);for(let a=i,n=r;a!==n;++a)t[a]=t[r+a%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,r,a){if(r>=.5)for(let n=0;n!==a;++n)e[t+n]=e[i+n]}_slerp(e,t,i,r){Ht.slerpFlat(e,t,e,t,e,i,r)}_slerpAdditive(e,t,i,r,a){let n=this._workIndex*a;Ht.multiplyQuaternionsFlat(e,n,e,t,e,i),Ht.slerpFlat(e,t,e,t,e,n,r)}_lerp(e,t,i,r,a){let n=1-r;for(let s=0;s!==a;++s){let o=t+s;e[o]=e[o]*n+e[i+s]*r}}_lerpAdditive(e,t,i,r,a){for(let n=0;n!==a;++n){let s=t+n;e[s]=e[s]+e[i+n]*r}}},Vo="\\[\\]\\.:\\/",_f=new RegExp("["+Vo+"]","g"),Ho="[^"+Vo+"]",xf="[^"+Vo.replace("\\.","")+"]",Mf=/((?:WC+[\/:])*)/.source.replace("WC",Ho),Sf=/(WCOD+)?/.source.replace("WCOD",xf),yf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ho),bf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ho),Tf=new RegExp("^"+Mf+Sf+yf+bf+"$"),wf=["material","materials","bones","map"],Ef=class{constructor(e,t,i){let r=i||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ut=class Lr{constructor(t,i,r){this.path=i,this.parsedPath=r||Lr.parseTrackName(i),this.node=Lr.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new Lr.Composite(t,i,r):new Lr(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(_f,"")}static parseTrackName(t){let i=Tf.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},a=r.nodeName&&r.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let n=r.nodeName.substring(a+1);wf.indexOf(n)!==-1&&(r.nodeName=r.nodeName.substring(0,a),r.objectName=n)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(n){for(let s=0;s<n.length;s++){let o=n[s];if(o.name===i||o.uuid===i)return o;let l=r(o.children);if(l)return l}return null},a=r(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)t[i++]=r[a]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,a=i.propertyName,n=i.propertyIndex;if(t||(t=Lr.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){be("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let c=i.objectIndex;switch(r){case"materials":if(!t.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(c!==void 0){if(t[c]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let s=t[a];if(s===void 0){let c=i.nodeName;Ue("PropertyBinding: Trying to update property for track: "+c+"."+a+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(n!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[n]!==void 0&&(n=t.morphTargetDictionary[n])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=n}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=a;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ut.Composite=Ef;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];Af=class{constructor(e,t,i=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=r;let a=t.tracks,n=a.length,s=new Array(n),o={endingStart:Pr,endingEnd:Pr};for(let l=0;l!==n;++l){let c=a[l].createInterpolant(null);s[l]=c,c.settings&&Object.assign(o,c.settings),c.settings=o}this._interpolantSettings=o,this._interpolants=s,this._propertyBindings=new Array(n),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=cd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){let r=this._clip.duration,a=e._clip.duration,n=a/r,s=r/a;e.warp(1,n,t),this.warp(s,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let r=this._mixer,a=r.time,n=this.timeScale,s=this._timeScaleInterpolant;s===null&&(s=r._lendControlInterpolant(),this._timeScaleInterpolant=s);let o=s.parameterPositions,l=s.sampleValues;return o[0]=a,o[1]=a+i,l[0]=e/n,l[1]=t/n,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,r){if(!this.enabled){this._updateWeight(e);return}let a=this._startTime;if(a!==null){let o=(e-a)*i;o<0||i===0?t=0:(this._startTime=null,t=i*o)}t*=this._updateTimeScale(e);let n=this._updateTime(t),s=this._updateWeight(e);if(s>0){let o=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case ud:for(let c=0,h=o.length;c!==h;++c)o[c].evaluate(n),l[c].accumulateAdditive(s);break;case Ro:default:for(let c=0,h=o.length;c!==h;++c)o[c].evaluate(n),l[c].accumulate(r,s)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,r=this.time+e,a=this._loopCount,n=i===hd;if(e===0)return a===-1?r:n&&(a&1)===1?t-r:r;if(i===ld){a===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(a===-1&&(e>=0?(a=0,this._setEndings(!0,this.repetitions===0,n)):this._setEndings(this.repetitions===0,!0,n)),r>=t||r<0){let s=Math.floor(r/t);r-=t*s,a+=Math.abs(s);let o=this.repetitions-a;if(o<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(o===1){let l=e<0;this._setEndings(l,!l,n)}else this._setEndings(!1,!1,n);this._loopCount=a,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:s})}}else this._loopCount=a,this.time=r;if(n&&(a&1)===1)return t-r}return r}_setEndings(e,t,i){let r=this._interpolantSettings;i?(r.endingStart=Ir,r.endingEnd=Ir):(e?r.endingStart=this.zeroSlopeAtStart?Ir:Pr:r.endingStart=vn,t?r.endingEnd=this.zeroSlopeAtEnd?Ir:Pr:r.endingEnd=vn)}_scheduleFading(e,t,i){let r=this._mixer,a=r.time,n=this._weightInterpolant;n===null&&(n=r._lendControlInterpolant(),this._weightInterpolant=n);let s=n.parameterPositions,o=n.sampleValues;return s[0]=a,o[0]=t,s[1]=a+e,o[1]=i,this}},Rf=new Float32Array(1),Cf=class extends Zi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let i=e._localRoot||this._root,r=e._clip.tracks,a=r.length,n=e._propertyBindings,s=e._interpolants,o=i.uuid,l=this._bindingsByRootAndName,c=l[o];c===void 0&&(c={},l[o]=c);for(let h=0;h!==a;++h){let d=r[h],u=d.name,p=c[u];if(p!==void 0)++p.referenceCount,n[h]=p;else{if(p=n[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,o,u));continue}let v=t&&t._propertyBindings[h].binding.parsedPath;p=new vf(ut.create(i,u,v),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,o,u),n[h]=p}s[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,r=e._clip.uuid,a=this._actionsByClip[r];this._bindAction(e,a&&a.knownActions[0]),this._addInactiveAction(e,r,i)}let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.useCount++===0&&(this._lendBinding(a),a.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let a=t[i];--a.useCount===0&&(a.restoreOriginalState(),this._takeBackBinding(a))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let r=this._actions,a=this._actionsByClip,n=a[t];if(n===void 0)n={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,a[t]=n;else{let s=n.knownActions;e._byClipCacheIndex=s.length,s.push(e)}e._cacheIndex=r.length,r.push(e),n.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],r=e._cacheIndex;i._cacheIndex=r,t[r]=i,t.pop(),e._cacheIndex=null;let a=e._clip.uuid,n=this._actionsByClip,s=n[a],o=s.knownActions,l=o[o.length-1],c=e._byClipCacheIndex;l._byClipCacheIndex=c,o[c]=l,o.pop(),e._byClipCacheIndex=null;let h=s.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],o.length===0&&delete n[a],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let a=t[i];--a.referenceCount===0&&this._removeInactiveBinding(a)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,r=this._nActiveActions++,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,r=--this._nActiveActions,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_addInactiveBinding(e,t,i){let r=this._bindingsByRootAndName,a=this._bindings,n=r[t];n===void 0&&(n={},r[t]=n),n[i]=e,e._cacheIndex=a.length,a.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,r=i.rootNode.uuid,a=i.path,n=this._bindingsByRootAndName,s=n[r],o=t[t.length-1],l=e._cacheIndex;o._cacheIndex=l,t[l]=o,t.pop(),delete s[a],Object.keys(s).length===0&&delete n[r]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,a=t[r];e._cacheIndex=r,t[r]=e,a._cacheIndex=i,t[i]=a}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new Dh(new Float32Array(2),new Float32Array(2),1,Rf),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,a=t[r];e.__cacheIndex=r,t[r]=e,a.__cacheIndex=i,t[i]=a}clipAction(e,t,i){let r=t||this._root,a=r.uuid,n=typeof e=="string"?mo.findByName(r,e):e,s=n!==null?n.uuid:e,o=this._actionsByClip[s],l=null;if(i===void 0&&(n!==null?i=n.blendMode:i=Ro),o!==void 0){let h=o.actionByRoot[a];if(h!==void 0&&h.blendMode===i)return h;l=o.knownActions[0],n===null&&(n=l._clip)}if(n===null)return null;let c=new Af(this,n,t,i);return this._bindAction(c,l),this._addInactiveAction(c,s,a),c}existingAction(e,t){let i=t||this._root,r=i.uuid,a=typeof e=="string"?mo.findByName(i,e):e,n=a?a.uuid:e,s=this._actionsByClip[n];return s!==void 0&&s.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,r=this.time+=e,a=Math.sign(e),n=this._accuIndex^=1;for(let l=0;l!==i;++l)t[l]._update(r,e,a,n);let s=this._bindings,o=this._nActiveBindings;for(let l=0;l!==o;++l)s[l].apply(n);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,r=this._actionsByClip,a=r[i];if(a!==void 0){let n=a.knownActions;for(let s=0,o=n.length;s!==o;++s){let l=n[s];this._deactivateAction(l);let c=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=c,t[c]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete r[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let n in i){let s=i[n].actionByRoot,o=s[t];o!==void 0&&(this._deactivateAction(o),this._removeInactiveAction(o))}let r=this._bindingsByRootAndName,a=r[t];if(a!==void 0)for(let n in a){let s=a[n];s.restoreOriginalState(),this._removeInactiveBinding(s)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}},oc=new Ve,Lf=class{constructor(e,t,i=0,r=1/0){this.ray=new Ta(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new No,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ue("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return oc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(oc),this}intersectObject(e,t=!0,i=[]){return go(e,this,i,t),i.sort(lc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,a=e.length;r<a;r++)go(e[r],this,i,t);return i.sort(lc),i}};bx=class Gh{static{Gh.prototype.isMatrix2=!0}constructor(t,i,r,a){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,r,a)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let r=0;r<4;r++)this.elements[r]=t[r+i];return this}set(t,i,r,a){let n=this.elements;return n[0]=t,n[2]=i,n[1]=r,n[3]=a,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");/**
* @license
* Copyright 2010-2026 Three.js Authors
* SPDX-License-Identifier: MIT
*/Nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Df=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Uf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ff=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$f=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,em=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,im=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,am=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,om=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cm="gl_FragColor = linearToOutputTexel( gl_FragColor );",hm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,um=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,dm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Sm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,wm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Am=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Pm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Im=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Um=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Om=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Hm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ym=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$m=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ig=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ng=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,og=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_g=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ag=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ig=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Gg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$g=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,e0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,t0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,a0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,l0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,d0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Nf,alphahash_pars_fragment:Df,alphamap_fragment:Uf,alphamap_pars_fragment:Of,alphatest_fragment:Ff,alphatest_pars_fragment:Bf,aomap_fragment:zf,aomap_pars_fragment:kf,batching_pars_vertex:Gf,batching_vertex:Vf,begin_vertex:Hf,beginnormal_vertex:Wf,bsdfs:Xf,iridescence_fragment:jf,bumpmap_pars_fragment:qf,clipping_planes_fragment:Yf,clipping_planes_pars_fragment:Kf,clipping_planes_pars_vertex:Zf,clipping_planes_vertex:Jf,color_fragment:$f,color_pars_fragment:Qf,color_pars_vertex:em,color_vertex:tm,common:im,cube_uv_reflection_fragment:rm,defaultnormal_vertex:am,displacementmap_pars_vertex:nm,displacementmap_vertex:sm,emissivemap_fragment:om,emissivemap_pars_fragment:lm,colorspace_fragment:cm,colorspace_pars_fragment:hm,envmap_fragment:um,envmap_common_pars_fragment:dm,envmap_pars_fragment:pm,envmap_pars_vertex:fm,envmap_physical_pars_fragment:wm,envmap_vertex:mm,fog_vertex:gm,fog_pars_vertex:vm,fog_fragment:_m,fog_pars_fragment:xm,gradientmap_pars_fragment:Mm,lightmap_pars_fragment:Sm,lights_lambert_fragment:ym,lights_lambert_pars_fragment:bm,lights_pars_begin:Tm,lights_toon_fragment:Em,lights_toon_pars_fragment:Am,lights_phong_fragment:Rm,lights_phong_pars_fragment:Cm,lights_physical_fragment:Lm,lights_physical_pars_fragment:Pm,lights_fragment_begin:Im,lights_fragment_maps:Nm,lights_fragment_end:Dm,lightprobes_pars_fragment:Um,logdepthbuf_fragment:Om,logdepthbuf_pars_fragment:Fm,logdepthbuf_pars_vertex:Bm,logdepthbuf_vertex:zm,map_fragment:km,map_pars_fragment:Gm,map_particle_fragment:Vm,map_particle_pars_fragment:Hm,metalnessmap_fragment:Wm,metalnessmap_pars_fragment:Xm,morphinstance_vertex:jm,morphcolor_vertex:qm,morphnormal_vertex:Ym,morphtarget_pars_vertex:Km,morphtarget_vertex:Zm,normal_fragment_begin:Jm,normal_fragment_maps:$m,normal_pars_fragment:Qm,normal_pars_vertex:eg,normal_vertex:tg,normalmap_pars_fragment:ig,clearcoat_normal_fragment_begin:rg,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:ng,iridescence_pars_fragment:sg,opaque_fragment:og,packing:lg,premultiplied_alpha_fragment:cg,project_vertex:hg,dithering_fragment:ug,dithering_pars_fragment:dg,roughnessmap_fragment:pg,roughnessmap_pars_fragment:fg,shadowmap_pars_fragment:mg,shadowmap_pars_vertex:gg,shadowmap_vertex:vg,shadowmask_pars_fragment:_g,skinbase_vertex:xg,skinning_pars_vertex:Mg,skinning_vertex:Sg,skinnormal_vertex:yg,specularmap_fragment:bg,specularmap_pars_fragment:Tg,tonemapping_fragment:wg,tonemapping_pars_fragment:Eg,transmission_fragment:Ag,transmission_pars_fragment:Rg,uv_pars_fragment:Cg,uv_pars_vertex:Lg,uv_vertex:Pg,worldpos_vertex:Ig,background_vert:Ng,background_frag:Dg,backgroundCube_vert:Ug,backgroundCube_frag:Og,cube_vert:Fg,cube_frag:Bg,depth_vert:zg,depth_frag:kg,distance_vert:Gg,distance_frag:Vg,equirect_vert:Hg,equirect_frag:Wg,linedashed_vert:Xg,linedashed_frag:jg,meshbasic_vert:qg,meshbasic_frag:Yg,meshlambert_vert:Kg,meshlambert_frag:Zg,meshmatcap_vert:Jg,meshmatcap_frag:$g,meshnormal_vert:Qg,meshnormal_frag:e0,meshphong_vert:t0,meshphong_frag:i0,meshphysical_vert:r0,meshphysical_frag:a0,meshtoon_vert:n0,meshtoon_frag:s0,points_vert:o0,points_frag:l0,shadow_vert:c0,shadow_frag:h0,sprite_vert:u0,sprite_frag:d0},fe={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},mi={basic:{uniforms:Nt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Nt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Nt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Nt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Nt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new ze(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Nt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Nt([fe.points,fe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Nt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Nt([fe.common,fe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Nt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Nt([fe.sprite,fe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Nt([fe.common,fe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Nt([fe.lights,fe.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};mi.physical={uniforms:Nt([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};rn={r:0,b:0,g:0},p0=new Ve,Hh=new He;Hh.set(-1,0,0,0,1,0,0,0,1);Ki=4,hc=[.125,.215,.35,.446,.526,.582],sr=20,x0=256,oa=new Ea,uc=new ze,ps=null,fs=0,ms=0,gs=!1,M0=new L,dc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){let{size:n=256,position:s=M0}=a;ps=this._renderer.getRenderTarget(),fs=this._renderer.getActiveCubeFace(),ms=this._renderer.getActiveMipmapLevel(),gs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(n);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o,s),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ps,fs,ms),this._renderer.xr.enabled=gs,e.scissorTest=!1,Rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===lr||e.mapping===Fr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ps=this._renderer.getRenderTarget(),fs=this._renderer.getActiveCubeFace(),ms=this._renderer.getActiveMipmapLevel(),gs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Mt,minFilter:Mt,generateMipmaps:!1,type:xi,format:Kt,colorSpace:Wt,depthBuffer:!1},r=pc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pc(e,t,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=S0(a)),this._blurMaterial=b0(a,e,t),this._ggxMaterial=y0(a,e,t)}return r}_compileMaterial(e){let t=new Dt(new Pt,e);this._renderer.compile(t,oa)}_sceneToCubeUV(e,t,i,r,a){let n=new Ft(90,1,t,i),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor(uc),l.toneMapping=ri,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Dt(new Fo,new Yi({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,p=!1,v=e.background;v?v.isColor&&(u.color.copy(v),e.background=null,p=!0):(u.color.copy(uc),p=!0);for(let g=0;g<6;g++){let m=g%3;m===0?(n.up.set(0,s[g],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x+o[g],a.y,a.z)):m===1?(n.up.set(0,0,s[g]),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y+o[g],a.z)):(n.up.set(0,s[g],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y,a.z+o[g]));let f=this._cubeSize;Rr(r,m*f,g>2?f:0,f,f),l.setRenderTarget(r),p&&l.render(d,n),l.render(e,n)}l.toneMapping=h,l.autoClear=c,e.background=v}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===lr||e.mapping===Fr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fc());let a=r?this._cubemapMaterial:this._equirectMaterial,n=this._lodMeshes[0];n.material=a;let s=a.uniforms;s.envMap.value=e;let o=this._cubeSize;Rr(t,0,0,3*o,2*o),i.setRenderTarget(t),i.render(n,oa)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,a=this._pingPongRenderTarget,n=this._ggxMaterial,s=this._lodMeshes[i];s.material=n;let o=n.uniforms,l=i/(this._lodMeshes.length-1),c=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-c*c),d=0+l*1.25,u=h*d,{_lodMax:p}=this,v=this._sizeLods[i],g=3*v*(i>p-Ki?i-p+Ki:0),m=4*(this._cubeSize-v);o.envMap.value=e.texture,o.roughness.value=u,o.mipInt.value=p-t,Rr(a,g,m,3*v,2*v),r.setRenderTarget(a),r.render(s,oa),o.envMap.value=a.texture,o.roughness.value=0,o.mipInt.value=p-i,Rr(e,g,m,3*v,2*v),r.setRenderTarget(e),r.render(s,oa)}_blur(e,t,i,r,a){let n=this._pingPongRenderTarget;this._halfBlur(e,n,t,i,r,"latitudinal",a),this._halfBlur(n,e,i,i,r,"longitudinal",a)}_halfBlur(e,t,i,r,a,n,s){let o=this._renderer,l=this._blurMaterial;n!=="latitudinal"&&n!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");let c=3,h=this._lodMeshes[r];h.material=l;let d=l.uniforms,u=this._sizeLods[i]-1,p=isFinite(a)?Math.PI/(2*u):2*Math.PI/(2*sr-1),v=a/p,g=isFinite(a)?1+Math.floor(c*v):sr;g>sr&&be(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${sr}`);let m=[],f=0;for(let E=0;E<sr;++E){let C=E/v,x=Math.exp(-C*C/2);m.push(x),E===0?f+=x:E<g&&(f+=2*x)}for(let E=0;E<m.length;E++)m[E]=m[E]/f;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=n==="latitudinal",s&&(d.poleAxis.value=s);let{_lodMax:_}=this;d.dTheta.value=p,d.mipInt.value=_-i;let M=this._sizeLods[r],y=3*M*(r>_-Ki?r-_+Ki:0),T=4*(this._cubeSize-M);Rr(t,y,T,3*M,2*M),o.setRenderTarget(t),o.render(h,oa)}};Wh=class extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Mh(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Fo(5,5,5),a=new Zt({name:"CubemapFromEquirect",uniforms:Vr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Bt,blending:Pi});a.uniforms.tEquirect.value=t;let n=new Dt(r,a),s=t.minFilter;return t.minFilter===Ci&&(t.minFilter=Mt),new mf(1,10,this).update(e,n),t.minFilter=s,n.geometry.dispose(),n.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let a=e.getRenderTarget();for(let n=0;n<6;n++)e.setRenderTarget(this,n),e.clear(t,i,r);e.setRenderTarget(a)}};P0={[Gc]:"LINEAR_TONE_MAPPING",[Vc]:"REINHARD_TONE_MAPPING",[Hc]:"CINEON_TONE_MAPPING",[Wc]:"ACES_FILMIC_TONE_MAPPING",[jc]:"AGX_TONE_MAPPING",[qc]:"NEUTRAL_TONE_MAPPING",[Xc]:"CUSTOM_TONE_MAPPING"};Xh=new Lt,vo=new Gr(1,1),jh=new ch,qh=new Yd,Yh=new Mh,gc=[],vc=[],_c=new Float32Array(16),xc=new Float32Array(9),Mc=new Float32Array(4);xv=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=$0(t.type)}},Mv=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_v(t.type)}},Sv=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,n=r.length;a!==n;++a){let s=r[a];s.setValue(e,t[s.id],i)}}},vs=/(\w+)(\])?(\[|\.)?/g;pn=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){let s=e.getActiveUniform(t,n),o=e.getUniformLocation(t,s.name);yv(s,o,this)}let r=[],a=[];for(let n of this.seq)n.type===e.SAMPLER_2D_SHADOW||n.type===e.SAMPLER_CUBE_SHADOW||n.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(n):a.push(n);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,n=t.length;a!==n;++a){let s=t[a],o=i[s.id];o.needsUpdate!==!1&&s.setValue(e,o.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let n=e[r];n.id in t&&i.push(n)}return i}};bv=37297,Tv=0;bc=new He;Rv={[Gc]:"Linear",[Vc]:"Reinhard",[Hc]:"Cineon",[Wc]:"ACESFilmic",[jc]:"AgX",[qc]:"Neutral",[Xc]:"Custom"};an=new L;Dv=/^[ \t]*#include +<([\w\d./]+)>/gm;Uv=new Map;Fv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;zv={[nn]:"SHADOWMAP_TYPE_PCF",[ha]:"SHADOWMAP_TYPE_VSM"};Gv={[lr]:"ENVMAP_TYPE_CUBE",[Fr]:"ENVMAP_TYPE_CUBE",[yn]:"ENVMAP_TYPE_CUBE_UV"};Hv={[Fr]:"ENVMAP_MODE_REFRACTION"};Xv={[kc]:"ENVMAP_BLENDING_MULTIPLY",[nd]:"ENVMAP_BLENDING_MIX",[sd]:"ENVMAP_BLENDING_ADD"};Kv=0,Zv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),n=this._getShaderCacheForMaterial(e);return n.has(r)===!1&&(n.add(r),r.usedTimes++),n.has(a)===!1&&(n.add(a),a.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Jv(e),t.set(e,i)),i}},Jv=class{constructor(e){this.id=Kv++,this.code=e,this.usedTimes=0}};n_=0;c_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,u_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],d_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Ic=new Ve,la=new L,_s=new L;v_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,__=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,x_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Sh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Zt({vertexShader:v_,fragmentShader:__,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Dt(new ko(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},M_=class extends Zi{constructor(e,t){super();let i=this,r=null,a=1,n=null,s="local-floor",o=1,l=null,c=null,h=null,d=null,u=null,p=null,v=typeof XRWebGLBinding<"u",g=new x_,m={},f=t.getContextAttributes(),_=null,M=null,y=[],T=[],E=new Pe,C=null,x=new Ft;x.viewport=new nt;let w=new Ft;w.viewport=new nt;let U=[x,w],R=new gf,B=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let le=y[Z];return le===void 0&&(le=new Vn,y[Z]=le),le.getTargetRaySpace()},this.getControllerGrip=function(Z){let le=y[Z];return le===void 0&&(le=new Vn,y[Z]=le),le.getGripSpace()},this.getHand=function(Z){let le=y[Z];return le===void 0&&(le=new Vn,y[Z]=le),le.getHandSpace()};function O(Z){let le=T.indexOf(Z.inputSource);if(le===-1)return;let ge=y[le];ge!==void 0&&(ge.update(Z.inputSource,Z.frame,l||n),ge.dispatchEvent({type:Z.type,data:Z.inputSource}))}function H(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",W);for(let Z=0;Z<y.length;Z++){let le=T[Z];le!==null&&(T[Z]=null,y[Z].disconnect(le))}B=null,j=null,g.reset();for(let Z in m)delete m[Z];e.setRenderTarget(_),u=null,d=null,h=null,r=null,M=null,Oe.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,i.isPresenting===!0&&be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){s=Z,i.isPresenting===!0&&be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||n},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",H),r.addEventListener("inputsourceschange",W),f.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,ge=null,pe=null;f.depth&&(pe=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=f.stencil?or:Di,ge=f.stencil?xa:_i);let Ae={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:a};h=this.getBinding(),d=h.createProjectionLayer(Ae),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new ni(d.textureWidth,d.textureHeight,{format:Kt,type:Vt,depthTexture:new Gr(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let le={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:a};u=new XRWebGLLayer(r,t,le),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),M=new ni(u.framebufferWidth,u.framebufferHeight,{format:Kt,type:Vt,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(o),l=null,n=await r.requestReferenceSpace(s),Oe.setContext(r),Oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(Z){for(let le=0;le<Z.removed.length;le++){let ge=Z.removed[le],pe=T.indexOf(ge);pe>=0&&(T[pe]=null,y[pe].disconnect(ge))}for(let le=0;le<Z.added.length;le++){let ge=Z.added[le],pe=T.indexOf(ge);if(pe===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=T.length){T.push(ge),pe=Ie;break}else if(T[Ie]===null){T[Ie]=ge,pe=Ie;break}if(pe===-1)break}let Ae=y[pe];Ae&&Ae.connect(ge)}}let k=new L,ee=new L;function te(Z,le,ge){k.setFromMatrixPosition(le.matrixWorld),ee.setFromMatrixPosition(ge.matrixWorld);let pe=k.distanceTo(ee),Ae=le.projectionMatrix.elements,Ie=ge.projectionMatrix.elements,J=Ae[14]/(Ae[10]-1),Re=Ae[14]/(Ae[10]+1),_e=(Ae[9]+1)/Ae[5],Ye=(Ae[9]-1)/Ae[5],$e=(Ae[8]-1)/Ae[0],pt=(Ie[8]+1)/Ie[0],it=J*$e,ot=J*pt,D=pe/(-$e+pt),mt=D*-$e;if(le.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(mt),Z.translateZ(D),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ae[10]===-1)Z.projectionMatrix.copy(le.projectionMatrix),Z.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{let we=J+D,Xe=Re+D,de=it-mt,rt=ot+(pe-mt),Ce=_e*Re/Xe*we,A=Ye*Re/Xe*we;Z.projectionMatrix.makePerspective(de,rt,Ce,A,we,Xe),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ne(Z,le){le===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(le.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let le=Z.near,ge=Z.far;g.texture!==null&&(g.depthNear>0&&(le=g.depthNear),g.depthFar>0&&(ge=g.depthFar)),R.near=w.near=x.near=le,R.far=w.far=x.far=ge,(B!==R.near||j!==R.far)&&(r.updateRenderState({depthNear:R.near,depthFar:R.far}),B=R.near,j=R.far),R.layers.mask=Z.layers.mask|6,x.layers.mask=R.layers.mask&-5,w.layers.mask=R.layers.mask&-3;let pe=Z.parent,Ae=R.cameras;ne(R,pe);for(let Ie=0;Ie<Ae.length;Ie++)ne(Ae[Ie],pe);Ae.length===2?te(R,x,w):R.projectionMatrix.copy(x.projectionMatrix),ce(Z,R,pe)};function ce(Z,le,ge){ge===null?Z.matrix.copy(le.matrixWorld):(Z.matrix.copy(ge.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(le.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(le.projectionMatrix),Z.projectionMatrixInverse.copy(le.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=zr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(d===null&&u===null))return o},this.setFoveation=function(Z){o=Z,d!==null&&(d.fixedFoveation=Z),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(R)},this.getCameraTexture=function(Z){return m[Z]};let Se=null;function De(Z,le){if(c=le.getViewerPose(l||n),p=le,c!==null){let ge=c.views;u!==null&&(e.setRenderTargetFramebuffer(M,u.framebuffer),e.setRenderTarget(M));let pe=!1;ge.length!==R.cameras.length&&(R.cameras.length=0,pe=!0);for(let Ie=0;Ie<ge.length;Ie++){let J=ge[Ie],Re=null;if(u!==null)Re=u.getViewport(J);else{let Ye=h.getViewSubImage(d,J);Re=Ye.viewport,Ie===0&&(e.setRenderTargetTextures(M,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(M))}let _e=U[Ie];_e===void 0&&(_e=new Ft,_e.layers.enable(Ie),_e.viewport=new nt,U[Ie]=_e),_e.matrix.fromArray(J.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(J.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(Re.x,Re.y,Re.width,Re.height),Ie===0&&(R.matrix.copy(_e.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),pe===!0&&R.cameras.push(_e)}let Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();let Ie=h.getDepthInformation(ge[0]);Ie&&Ie.isValid&&Ie.texture&&g.init(Ie,r.renderState)}if(Ae&&Ae.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let Ie=0;Ie<ge.length;Ie++){let J=ge[Ie].camera;if(J){let Re=m[J];Re||(Re=new Sh,m[J]=Re);let _e=h.getCameraImage(J);Re.sourceTexture=_e}}}}for(let ge=0;ge<y.length;ge++){let pe=T[ge],Ae=y[ge];pe!==null&&Ae!==void 0&&Ae.update(pe,le,l||n)}Se&&Se(Z,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),p=null}let Oe=new Vh;Oe.setAnimationLoop(De),this.setAnimationLoop=function(Z){Se=Z},this.dispose=function(){}}},S_=new Ve,Kh=new He;Kh.set(-1,0,0,0,1,0,0,0,1);T_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pi=null;E_=class{constructor(e={}){let{canvas:t=Td(),context:i=null,depth:r=!0,stencil:a=!1,alpha:n=!1,antialias:s=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Vt}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=n;let v=u,g=new Set([Ao,Eo,wo]),m=new Set([Vt,_i,_a,xa,yo,bo]),f=new Uint32Array(4),_=new Int32Array(4),M=new L,y=null,T=null,E=[],C=[],x=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let w=this,U=!1,R=null;this._outputColorSpace=Et;let B=0,j=0,O=null,H=-1,W=null,k=new nt,ee=new nt,te=null,ne=new ze(0),ce=0,Se=t.width,De=t.height,Oe=1,Z=null,le=null,ge=new nt(0,0,Se,De),pe=new nt(0,0,Se,De),Ae=!1,Ie=new Uo,J=!1,Re=!1,_e=new Ve,Ye=new L,$e=new nt,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},it=!1;function ot(){return O===null?Oe:1}let D=i;function mt(b,F){return t.getContext(b,F)}try{let b={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r184"),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",ie,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),D===null){let F="webgl2";if(D=mt(F,b),D===null)throw mt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw Ue("WebGLRenderer: "+b.message),b}let we,Xe,de,rt,Ce,A,S,G,N,z,Y,Q,P,ae,re,he,K,ve,Le,ke,Ge,I,$;function se(){we=new w0(D),we.init(),Ge=new g_(D,we),Xe=new v0(D,we,e,Ge),de=new f_(D,we),Xe.reversedDepthBuffer&&d&&de.buffers.depth.setReversed(!0),rt=new R0(D),Ce=new e_,A=new m_(D,we,de,Ce,Xe,Ge,rt),S=new T0(w),G=new If(D),I=new m0(D,G),N=new E0(D,G,rt,I),z=new L0(D,N,G,I,rt),ve=new C0(D,Xe,A),re=new _0(Ce),Y=new Qv(w,S,we,Xe,I,re),Q=new y_(w,Ce),P=new i_,ae=new l_(we),K=new f0(w,S,de,z,p,o),he=new p_(w,z,Xe),$=new b_(D,rt,Xe,de),Le=new g0(D,we,rt),ke=new A0(D,we,rt),rt.programs=Y.programs,w.capabilities=Xe,w.extensions=we,w.properties=Ce,w.renderLists=P,w.shadowMap=he,w.state=de,w.info=rt}se(),v!==Vt&&(x=new I0(v,t.width,t.height,r,a));let ue=new M_(w,D);this.xr=ue,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let b=we.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=we.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(b){b!==void 0&&(Oe=b,this.setSize(Se,De,!1))},this.getSize=function(b){return b.set(Se,De)},this.setSize=function(b,F,q=!0){if(ue.isPresenting){be("WebGLRenderer: Can't change size while VR device is presenting.");return}Se=b,De=F,t.width=Math.floor(b*Oe),t.height=Math.floor(F*Oe),q===!0&&(t.style.width=b+"px",t.style.height=F+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(Se*Oe,De*Oe).floor()},this.setDrawingBufferSize=function(b,F,q){Se=b,De=F,Oe=q,t.width=Math.floor(b*q),t.height=Math.floor(F*q),this.setViewport(0,0,b,F)},this.setEffects=function(b){if(v===Vt){Ue("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let F=0;F<b.length;F++)if(b[F].isOutputPass===!0){be("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(k)},this.getViewport=function(b){return b.copy(ge)},this.setViewport=function(b,F,q,X){b.isVector4?ge.set(b.x,b.y,b.z,b.w):ge.set(b,F,q,X),de.viewport(k.copy(ge).multiplyScalar(Oe).round())},this.getScissor=function(b){return b.copy(pe)},this.setScissor=function(b,F,q,X){b.isVector4?pe.set(b.x,b.y,b.z,b.w):pe.set(b,F,q,X),de.scissor(ee.copy(pe).multiplyScalar(Oe).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(b){de.setScissorTest(Ae=b)},this.setOpaqueSort=function(b){Z=b},this.setTransparentSort=function(b){le=b},this.getClearColor=function(b){return b.copy(K.getClearColor())},this.setClearColor=function(){K.setClearColor(...arguments)},this.getClearAlpha=function(){return K.getClearAlpha()},this.setClearAlpha=function(){K.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,q=!0){let X=0;if(b){let V=!1;if(O!==null){let oe=O.texture.format;V=g.has(oe)}if(V){let oe=O.texture.type,me=m.has(oe),xe=K.getClearColor(),Me=K.getClearAlpha(),Be=xe.r,je=xe.g,Je=xe.b;me?(f[0]=Be,f[1]=je,f[2]=Je,f[3]=Me,D.clearBufferuiv(D.COLOR,0,f)):(_[0]=Be,_[1]=je,_[2]=Je,_[3]=Me,D.clearBufferiv(D.COLOR,0,_))}else X|=D.COLOR_BUFFER_BIT}F&&(X|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(X|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&D.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),R=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",ie,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),K.dispose(),P.dispose(),ae.dispose(),Ce.dispose(),S.dispose(),z.dispose(),I.dispose(),$.dispose(),Y.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",el),ue.removeEventListener("sessionend",tl),$i.stop()};function Te(b){b.preventDefault(),xn("WebGLRenderer: Context Lost."),U=!0}function ie(){xn("WebGLRenderer: Context Restored."),U=!1;let b=rt.autoReset,F=he.enabled,q=he.autoUpdate,X=he.needsUpdate,V=he.type;se(),rt.autoReset=b,he.enabled=F,he.autoUpdate=q,he.needsUpdate=X,he.type=V}function Ee(b){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Fe(b){let F=b.target;F.removeEventListener("dispose",Fe),Ut(F)}function Ut(b){ht(b),Ce.remove(b)}function ht(b){let F=Ce.get(b).programs;F!==void 0&&(F.forEach(function(q){Y.releaseProgram(q)}),b.isShaderMaterial&&Y.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,q,X,V,oe){F===null&&(F=pt);let me=V.isMesh&&V.matrixWorld.determinant()<0,xe=Iu(b,F,q,X,V);de.setMaterial(X,me);let Me=q.index,Be=1;if(X.wireframe===!0){if(Me=N.getWireframeAttribute(q),Me===void 0)return;Be=2}let je=q.drawRange,Je=q.attributes.position,Ne=je.start*Be,lt=(je.start+je.count)*Be;oe!==null&&(Ne=Math.max(Ne,oe.start*Be),lt=Math.min(lt,(oe.start+oe.count)*Be)),Me!==null?(Ne=Math.max(Ne,0),lt=Math.min(lt,Me.count)):Je!=null&&(Ne=Math.max(Ne,0),lt=Math.min(lt,Je.count));let gt=lt-Ne;if(gt<0||gt===1/0)return;I.setup(V,X,xe,q,Me);let dt,ct=Le;if(Me!==null&&(dt=G.get(Me),ct=ke,ct.setIndex(dt)),V.isMesh)X.wireframe===!0?(de.setLineWidth(X.wireframeLinewidth*ot()),ct.setMode(D.LINES)):ct.setMode(D.TRIANGLES);else if(V.isLine){let ft=X.linewidth;ft===void 0&&(ft=1),de.setLineWidth(ft*ot()),V.isLineSegments?ct.setMode(D.LINES):V.isLineLoop?ct.setMode(D.LINE_LOOP):ct.setMode(D.LINE_STRIP)}else V.isPoints?ct.setMode(D.POINTS):V.isSprite&&ct.setMode(D.TRIANGLES);if(V.isBatchedMesh)if(we.get("WEBGL_multi_draw"))ct.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let ft=V._multiDrawStarts,ye=V._multiDrawCounts,zt=V._multiDrawCount,Qi=Me?G.get(Me).bytesPerElement:1,Xt=Ce.get(X).currentProgram.getUniforms();for(let hi=0;hi<zt;hi++)Xt.setValue(D,"_gl_DrawID",hi),ct.render(ft[hi]/Qi,ye[hi])}else if(V.isInstancedMesh)ct.renderInstances(Ne,gt,V.count);else if(q.isInstancedBufferGeometry){let ft=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ye=Math.min(q.instanceCount,ft);ct.renderInstances(Ne,gt,ye)}else ct.render(Ne,gt)};function ci(b,F,q){b.transparent===!0&&b.side===ti&&b.forceSinglePass===!1?(b.side=Bt,b.needsUpdate=!0,Ra(b,F,q),b.side=Ni,b.needsUpdate=!0,Ra(b,F,q),b.side=ti):Ra(b,F,q)}this.compile=function(b,F,q=null){q===null&&(q=b),T=ae.get(q),T.init(F),C.push(T),q.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),b!==q&&b.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),T.setupLights();let X=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let oe=V.material;if(oe)if(Array.isArray(oe))for(let me=0;me<oe.length;me++){let xe=oe[me];ci(xe,q,V),X.add(xe)}else ci(oe,q,V),X.add(oe)}),T=C.pop(),X},this.compileAsync=function(b,F,q=null){let X=this.compile(b,F,q);return new Promise(V=>{function oe(){if(X.forEach(function(me){Ce.get(me).currentProgram.isReady()&&X.delete(me)}),X.size===0){V(b);return}setTimeout(oe,10)}we.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Jt=null;function Lu(b){Jt&&Jt(b)}function el(){$i.stop()}function tl(){$i.start()}let $i=new Vh;$i.setAnimationLoop(Lu),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(b){Jt=b,ue.setAnimationLoop(b),b===null?$i.stop():$i.start()},ue.addEventListener("sessionstart",el),ue.addEventListener("sessionend",tl),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;R!==null&&R.renderStart(b,F);let q=ue.enabled===!0&&ue.isPresenting===!0,X=x!==null&&(O===null||q)&&x.begin(w,O);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(F),F=ue.getCamera()),b.isScene===!0&&b.onBeforeRender(w,b,F,O),T=ae.get(b,C.length),T.init(F),T.state.textureUnits=A.getTextureUnits(),C.push(T),_e.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ie.setFromProjectionMatrix(_e,vi,F.reversedDepth),Re=this.localClippingEnabled,J=re.init(this.clippingPlanes,Re),y=P.get(b,E.length),y.init(),E.push(y),ue.enabled===!0&&ue.isPresenting===!0){let oe=w.xr.getDepthSensingMesh();oe!==null&&Ln(oe,F,-1/0,w.sortObjects)}Ln(b,F,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(Z,le),it=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,it&&K.addToRenderList(y,b),this.info.render.frame++,J===!0&&re.beginShadows();let V=T.state.shadowsArray;if(he.render(V,b,F),J===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset(),(X&&x.hasRenderPass())===!1){let oe=y.opaque,me=y.transmissive;if(T.setupLights(),F.isArrayCamera){let xe=F.cameras;if(me.length>0)for(let Me=0,Be=xe.length;Me<Be;Me++){let je=xe[Me];rl(oe,me,b,je)}it&&K.render(b);for(let Me=0,Be=xe.length;Me<Be;Me++){let je=xe[Me];il(y,b,je,je.viewport)}}else me.length>0&&rl(oe,me,b,F),it&&K.render(b),il(y,b,F)}O!==null&&j===0&&(A.updateMultisampleRenderTarget(O),A.updateRenderTargetMipmap(O)),X&&x.end(w),b.isScene===!0&&b.onAfterRender(w,b,F),I.resetDefaultState(),H=-1,W=null,C.pop(),C.length>0?(T=C[C.length-1],A.setTextureUnits(T.state.textureUnits),J===!0&&re.setGlobalState(w.clippingPlanes,T.state.camera)):T=null,E.pop(),E.length>0?y=E[E.length-1]:y=null,R!==null&&R.renderEnd()};function Ln(b,F,q,X){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLightProbeGrid)T.pushLightProbeGrid(b);else if(b.isLight)T.pushLight(b),b.castShadow&&T.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ie.intersectsSprite(b)){X&&$e.setFromMatrixPosition(b.matrixWorld).applyMatrix4(_e);let oe=z.update(b),me=b.material;me.visible&&y.push(b,oe,me,q,$e.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ie.intersectsObject(b))){let oe=z.update(b),me=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),$e.copy(b.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),$e.copy(oe.boundingSphere.center)),$e.applyMatrix4(b.matrixWorld).applyMatrix4(_e)),Array.isArray(me)){let xe=oe.groups;for(let Me=0,Be=xe.length;Me<Be;Me++){let je=xe[Me],Je=me[je.materialIndex];Je&&Je.visible&&y.push(b,oe,Je,q,$e.z,je)}}else me.visible&&y.push(b,oe,me,q,$e.z,null)}}let V=b.children;for(let oe=0,me=V.length;oe<me;oe++)Ln(V[oe],F,q,X)}function il(b,F,q,X){let{opaque:V,transmissive:oe,transparent:me}=b;T.setupLightsView(q),J===!0&&re.setGlobalState(w.clippingPlanes,q),X&&de.viewport(k.copy(X)),V.length>0&&Aa(V,F,q),oe.length>0&&Aa(oe,F,q),me.length>0&&Aa(me,F,q),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function rl(b,F,q,X){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[X.id]===void 0){let Je=we.has("EXT_color_buffer_half_float")||we.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[X.id]=new ni(1,1,{generateMipmaps:!0,type:Je?xi:Vt,minFilter:Ci,samples:Math.max(4,Xe.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}let V=T.state.transmissionRenderTarget[X.id],oe=X.viewport||k;V.setSize(oe.z*w.transmissionResolutionScale,oe.w*w.transmissionResolutionScale);let me=w.getRenderTarget(),xe=w.getActiveCubeFace(),Me=w.getActiveMipmapLevel();w.setRenderTarget(V),w.getClearColor(ne),ce=w.getClearAlpha(),ce<1&&w.setClearColor(16777215,.5),w.clear(),it&&K.render(q);let Be=w.toneMapping;w.toneMapping=ri;let je=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),T.setupLightsView(X),J===!0&&re.setGlobalState(w.clippingPlanes,X),Aa(b,q,X),A.updateMultisampleRenderTarget(V),A.updateRenderTargetMipmap(V),we.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Ne=0,lt=F.length;Ne<lt;Ne++){let gt=F[Ne],{object:dt,geometry:ct,material:ft,group:ye}=gt;if(ft.side===ti&&dt.layers.test(X.layers)){let zt=ft.side;ft.side=Bt,ft.needsUpdate=!0,al(dt,q,X,ct,ft,ye),ft.side=zt,ft.needsUpdate=!0,Je=!0}}Je===!0&&(A.updateMultisampleRenderTarget(V),A.updateRenderTargetMipmap(V))}w.setRenderTarget(me,xe,Me),w.setClearColor(ne,ce),je!==void 0&&(X.viewport=je),w.toneMapping=Be}function Aa(b,F,q){let X=F.isScene===!0?F.overrideMaterial:null;for(let V=0,oe=b.length;V<oe;V++){let me=b[V],{object:xe,geometry:Me,group:Be}=me,je=me.material;je.allowOverride===!0&&X!==null&&(je=X),xe.layers.test(q.layers)&&al(xe,F,q,Me,je,Be)}}function al(b,F,q,X,V,oe){b.onBeforeRender(w,F,q,X,V,oe),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(w,F,q,X,b,oe),V.transparent===!0&&V.side===ti&&V.forceSinglePass===!1?(V.side=Bt,V.needsUpdate=!0,w.renderBufferDirect(q,F,X,V,b,oe),V.side=Ni,V.needsUpdate=!0,w.renderBufferDirect(q,F,X,V,b,oe),V.side=ti):w.renderBufferDirect(q,F,X,V,b,oe),b.onAfterRender(w,F,q,X,V,oe)}function Ra(b,F,q){F.isScene!==!0&&(F=pt);let X=Ce.get(b),V=T.state.lights,oe=T.state.shadowsArray,me=V.state.version,xe=Y.getParameters(b,V.state,oe,F,q,T.state.lightProbeGridArray),Me=Y.getProgramCacheKey(xe),Be=X.programs;X.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,X.fog=F.fog;let je=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;X.envMap=S.get(b.envMap||X.environment,je),X.envMapRotation=X.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Be===void 0&&(b.addEventListener("dispose",Fe),Be=new Map,X.programs=Be);let Je=Be.get(Me);if(Je!==void 0){if(X.currentProgram===Je&&X.lightsStateVersion===me)return sl(b,xe),Je}else xe.uniforms=Y.getUniforms(b),R!==null&&b.isNodeMaterial&&R.build(b,q,xe),b.onBeforeCompile(xe,w),Je=Y.acquireProgram(xe,Me),Be.set(Me,Je),X.uniforms=xe.uniforms;let Ne=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ne.clippingPlanes=re.uniform),sl(b,xe),X.needsLights=Du(b),X.lightsStateVersion=me,X.needsLights&&(Ne.ambientLightColor.value=V.state.ambient,Ne.lightProbe.value=V.state.probe,Ne.directionalLights.value=V.state.directional,Ne.directionalLightShadows.value=V.state.directionalShadow,Ne.spotLights.value=V.state.spot,Ne.spotLightShadows.value=V.state.spotShadow,Ne.rectAreaLights.value=V.state.rectArea,Ne.ltc_1.value=V.state.rectAreaLTC1,Ne.ltc_2.value=V.state.rectAreaLTC2,Ne.pointLights.value=V.state.point,Ne.pointLightShadows.value=V.state.pointShadow,Ne.hemisphereLights.value=V.state.hemi,Ne.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ne.spotLightMatrix.value=V.state.spotLightMatrix,Ne.spotLightMap.value=V.state.spotLightMap,Ne.pointShadowMatrix.value=V.state.pointShadowMatrix),X.lightProbeGrid=T.state.lightProbeGridArray.length>0,X.currentProgram=Je,X.uniformsList=null,Je}function nl(b){if(b.uniformsList===null){let F=b.currentProgram.getUniforms();b.uniformsList=pn.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function sl(b,F){let q=Ce.get(b);q.outputColorSpace=F.outputColorSpace,q.batching=F.batching,q.batchingColor=F.batchingColor,q.instancing=F.instancing,q.instancingColor=F.instancingColor,q.instancingMorph=F.instancingMorph,q.skinning=F.skinning,q.morphTargets=F.morphTargets,q.morphNormals=F.morphNormals,q.morphColors=F.morphColors,q.morphTargetsCount=F.morphTargetsCount,q.numClippingPlanes=F.numClippingPlanes,q.numIntersection=F.numClipIntersection,q.vertexAlphas=F.vertexAlphas,q.vertexTangents=F.vertexTangents,q.toneMapping=F.toneMapping}function Pu(b,F){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let q=0,X=b.length;q<X;q++){let V=b[q];if(V.texture!==null&&V.boundingBox.containsPoint(M))return V}return null}function Iu(b,F,q,X,V){F.isScene!==!0&&(F=pt),A.resetTextureUnits();let oe=F.fog,me=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?F.environment:null,xe=O===null?w.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Ze.workingColorSpace,Me=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Be=S.get(X.envMap||me,Me),je=X.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Je=!!q.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ne=!!q.morphAttributes.position,lt=!!q.morphAttributes.normal,gt=!!q.morphAttributes.color,dt=ri;X.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(dt=w.toneMapping);let ct=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ft=ct!==void 0?ct.length:0,ye=Ce.get(X),zt=T.state.lights;if(J===!0&&(Re===!0||b!==W)){let tt=b===W&&X.id===H;re.setState(X,b,tt)}let Qi=!1;X.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==zt.state.version||ye.outputColorSpace!==xe||V.isBatchedMesh&&ye.batching===!1||!V.isBatchedMesh&&ye.batching===!0||V.isBatchedMesh&&ye.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&ye.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&ye.instancing===!1||!V.isInstancedMesh&&ye.instancing===!0||V.isSkinnedMesh&&ye.skinning===!1||!V.isSkinnedMesh&&ye.skinning===!0||V.isInstancedMesh&&ye.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ye.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ye.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ye.instancingMorph===!1&&V.morphTexture!==null||ye.envMap!==Be||X.fog===!0&&ye.fog!==oe||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==re.numPlanes||ye.numIntersection!==re.numIntersection)||ye.vertexAlphas!==je||ye.vertexTangents!==Je||ye.morphTargets!==Ne||ye.morphNormals!==lt||ye.morphColors!==gt||ye.toneMapping!==dt||ye.morphTargetsCount!==ft||!!ye.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Qi=!0):(Qi=!0,ye.__version=X.version);let Xt=ye.currentProgram;Qi===!0&&(Xt=Ra(X,F,V),R&&X.isNodeMaterial&&R.onUpdateProgram(X,Xt,ye));let hi=!1,Oi=!1,ur=!1,at=Xt.getUniforms(),vt=ye.uniforms;if(de.useProgram(Xt.program)&&(hi=!0,Oi=!0,ur=!0),X.id!==H&&(H=X.id,Oi=!0),ye.needsLights){let tt=Pu(T.state.lightProbeGridArray,V);ye.lightProbeGrid!==tt&&(ye.lightProbeGrid=tt,Oi=!0)}if(hi||W!==b){de.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),at.setValue(D,"projectionMatrix",b.projectionMatrix),at.setValue(D,"viewMatrix",b.matrixWorldInverse);let tt=at.map.cameraPosition;tt!==void 0&&tt.setValue(D,Ye.setFromMatrixPosition(b.matrixWorld)),Xe.logarithmicDepthBuffer&&at.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&at.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),W!==b&&(W=b,Oi=!0,ur=!0)}if(ye.needsLights&&(zt.state.directionalShadowMap.length>0&&at.setValue(D,"directionalShadowMap",zt.state.directionalShadowMap,A),zt.state.spotShadowMap.length>0&&at.setValue(D,"spotShadowMap",zt.state.spotShadowMap,A),zt.state.pointShadowMap.length>0&&at.setValue(D,"pointShadowMap",zt.state.pointShadowMap,A)),V.isSkinnedMesh){at.setOptional(D,V,"bindMatrix"),at.setOptional(D,V,"bindMatrixInverse");let tt=V.skeleton;tt&&(tt.boneTexture===null&&tt.computeBoneTexture(),at.setValue(D,"boneTexture",tt.boneTexture,A))}V.isBatchedMesh&&(at.setOptional(D,V,"batchingTexture"),at.setValue(D,"batchingTexture",V._matricesTexture,A),at.setOptional(D,V,"batchingIdTexture"),at.setValue(D,"batchingIdTexture",V._indirectTexture,A),at.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&at.setValue(D,"batchingColorTexture",V._colorsTexture,A));let Fi=q.morphAttributes;if((Fi.position!==void 0||Fi.normal!==void 0||Fi.color!==void 0)&&ve.update(V,q,Xt),(Oi||ye.receiveShadow!==V.receiveShadow)&&(ye.receiveShadow=V.receiveShadow,at.setValue(D,"receiveShadow",V.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&F.environment!==null&&(vt.envMapIntensity.value=F.environmentIntensity),vt.dfgLUT!==void 0&&(vt.dfgLUT.value=w_()),Oi){if(at.setValue(D,"toneMappingExposure",w.toneMappingExposure),ye.needsLights&&Nu(vt,ur),oe&&X.fog===!0&&Q.refreshFogUniforms(vt,oe),Q.refreshMaterialUniforms(vt,X,Oe,De,T.state.transmissionRenderTarget[b.id]),ye.needsLights&&ye.lightProbeGrid){let tt=ye.lightProbeGrid;vt.probesSH.value=tt.texture,vt.probesMin.value.copy(tt.boundingBox.min),vt.probesMax.value.copy(tt.boundingBox.max),vt.probesResolution.value.copy(tt.resolution)}pn.upload(D,nl(ye),vt,A)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(pn.upload(D,nl(ye),vt,A),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&at.setValue(D,"center",V.center),at.setValue(D,"modelViewMatrix",V.modelViewMatrix),at.setValue(D,"normalMatrix",V.normalMatrix),at.setValue(D,"modelMatrix",V.matrixWorld),X.uniformsGroups!==void 0){let tt=X.uniformsGroups;for(let Jr=0,dr=tt.length;Jr<dr;Jr++){let ol=tt[Jr];$.update(ol,Xt),$.bind(ol,Xt)}}return Xt}function Nu(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Du(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(b,F,q){let X=Ce.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Ce.get(b.texture).__webglTexture=F,Ce.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:q,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){let q=Ce.get(b);q.__webglFramebuffer=F,q.__useDefaultFramebuffer=F===void 0};let Uu=D.createFramebuffer();this.setRenderTarget=function(b,F=0,q=0){O=b,B=F,j=q;let X=null,V=!1,oe=!1;if(b){let me=Ce.get(b);if(me.__useDefaultFramebuffer!==void 0){de.bindFramebuffer(D.FRAMEBUFFER,me.__webglFramebuffer),k.copy(b.viewport),ee.copy(b.scissor),te=b.scissorTest,de.viewport(k),de.scissor(ee),de.setScissorTest(te),H=-1;return}else if(me.__webglFramebuffer===void 0)A.setupRenderTarget(b);else if(me.__hasExternalTextures)A.rebindTextures(b,Ce.get(b.texture).__webglTexture,Ce.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Be=b.depthTexture;if(me.__boundDepthTexture!==Be){if(Be!==null&&Ce.has(Be)&&(b.width!==Be.image.width||b.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(b)}}let xe=b.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(oe=!0);let Me=Ce.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Me[F])?X=Me[F][q]:X=Me[F],V=!0):b.samples>0&&A.useMultisampledRTT(b)===!1?X=Ce.get(b).__webglMultisampledFramebuffer:Array.isArray(Me)?X=Me[q]:X=Me,k.copy(b.viewport),ee.copy(b.scissor),te=b.scissorTest}else k.copy(ge).multiplyScalar(Oe).floor(),ee.copy(pe).multiplyScalar(Oe).floor(),te=Ae;if(q!==0&&(X=Uu),de.bindFramebuffer(D.FRAMEBUFFER,X)&&de.drawBuffers(b,X),de.viewport(k),de.scissor(ee),de.setScissorTest(te),V){let me=Ce.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,me.__webglTexture,q)}else if(oe){let me=F;for(let xe=0;xe<b.textures.length;xe++){let Me=Ce.get(b.textures[xe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+xe,Me.__webglTexture,q,me)}}else if(b!==null&&q!==0){let me=Ce.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,me.__webglTexture,q)}H=-1},this.readRenderTargetPixels=function(b,F,q,X,V,oe,me,xe=0){if(!(b&&b.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){de.bindFramebuffer(D.FRAMEBUFFER,Me);try{let Be=b.textures[xe],je=Be.format,Je=Be.type;if(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xe),!Xe.textureFormatReadable(je)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Je)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-X&&q>=0&&q<=b.height-V&&D.readPixels(F,q,X,V,Ge.convert(je),Ge.convert(Je),oe)}finally{let Be=O!==null?Ce.get(O).__webglFramebuffer:null;de.bindFramebuffer(D.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(b,F,q,X,V,oe,me,xe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me)if(F>=0&&F<=b.width-X&&q>=0&&q<=b.height-V){de.bindFramebuffer(D.FRAMEBUFFER,Me);let Be=b.textures[xe],je=Be.format,Je=Be.type;if(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xe),!Xe.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ne=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.bufferData(D.PIXEL_PACK_BUFFER,oe.byteLength,D.STREAM_READ),D.readPixels(F,q,X,V,Ge.convert(je),Ge.convert(Je),0);let lt=O!==null?Ce.get(O).__webglFramebuffer:null;de.bindFramebuffer(D.FRAMEBUFFER,lt);let gt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await wd(D,gt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,oe),D.deleteBuffer(Ne),D.deleteSync(gt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,q=0){let X=Math.pow(2,-q),V=Math.floor(b.image.width*X),oe=Math.floor(b.image.height*X),me=F!==null?F.x:0,xe=F!==null?F.y:0;A.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,me,xe,V,oe),de.unbindTexture()};let Ou=D.createFramebuffer(),Fu=D.createFramebuffer();this.copyTextureToTexture=function(b,F,q=null,X=null,V=0,oe=0){let me,xe,Me,Be,je,Je,Ne,lt,gt,dt=b.isCompressedTexture?b.mipmaps[oe]:b.image;if(q!==null)me=q.max.x-q.min.x,xe=q.max.y-q.min.y,Me=q.isBox3?q.max.z-q.min.z:1,Be=q.min.x,je=q.min.y,Je=q.isBox3?q.min.z:0;else{let vt=Math.pow(2,-V);me=Math.floor(dt.width*vt),xe=Math.floor(dt.height*vt),b.isDataArrayTexture?Me=dt.depth:b.isData3DTexture?Me=Math.floor(dt.depth*vt):Me=1,Be=0,je=0,Je=0}X!==null?(Ne=X.x,lt=X.y,gt=X.z):(Ne=0,lt=0,gt=0);let ct=Ge.convert(F.format),ft=Ge.convert(F.type),ye;F.isData3DTexture?(A.setTexture3D(F,0),ye=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(A.setTexture2DArray(F,0),ye=D.TEXTURE_2D_ARRAY):(A.setTexture2D(F,0),ye=D.TEXTURE_2D),de.activeTexture(D.TEXTURE0),de.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),de.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),de.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);let zt=de.getParameter(D.UNPACK_ROW_LENGTH),Qi=de.getParameter(D.UNPACK_IMAGE_HEIGHT),Xt=de.getParameter(D.UNPACK_SKIP_PIXELS),hi=de.getParameter(D.UNPACK_SKIP_ROWS),Oi=de.getParameter(D.UNPACK_SKIP_IMAGES);de.pixelStorei(D.UNPACK_ROW_LENGTH,dt.width),de.pixelStorei(D.UNPACK_IMAGE_HEIGHT,dt.height),de.pixelStorei(D.UNPACK_SKIP_PIXELS,Be),de.pixelStorei(D.UNPACK_SKIP_ROWS,je),de.pixelStorei(D.UNPACK_SKIP_IMAGES,Je);let ur=b.isDataArrayTexture||b.isData3DTexture,at=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){let vt=Ce.get(b),Fi=Ce.get(F),tt=Ce.get(vt.__renderTarget),Jr=Ce.get(Fi.__renderTarget);de.bindFramebuffer(D.READ_FRAMEBUFFER,tt.__webglFramebuffer),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,Jr.__webglFramebuffer);for(let dr=0;dr<Me;dr++)ur&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(b).__webglTexture,V,Je+dr),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(F).__webglTexture,oe,gt+dr)),D.blitFramebuffer(Be,je,me,xe,Ne,lt,me,xe,D.DEPTH_BUFFER_BIT,D.NEAREST);de.bindFramebuffer(D.READ_FRAMEBUFFER,null),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(V!==0||b.isRenderTargetTexture||Ce.has(b)){let vt=Ce.get(b),Fi=Ce.get(F);de.bindFramebuffer(D.READ_FRAMEBUFFER,Ou),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,Fu);for(let tt=0;tt<Me;tt++)ur?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,vt.__webglTexture,V,Je+tt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,vt.__webglTexture,V),at?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Fi.__webglTexture,oe,gt+tt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Fi.__webglTexture,oe),V!==0?D.blitFramebuffer(Be,je,me,xe,Ne,lt,me,xe,D.COLOR_BUFFER_BIT,D.NEAREST):at?D.copyTexSubImage3D(ye,oe,Ne,lt,gt+tt,Be,je,me,xe):D.copyTexSubImage2D(ye,oe,Ne,lt,Be,je,me,xe);de.bindFramebuffer(D.READ_FRAMEBUFFER,null),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else at?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(ye,oe,Ne,lt,gt,me,xe,Me,ct,ft,dt.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(ye,oe,Ne,lt,gt,me,xe,Me,ct,dt.data):D.texSubImage3D(ye,oe,Ne,lt,gt,me,xe,Me,ct,ft,dt):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,oe,Ne,lt,me,xe,ct,ft,dt.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,oe,Ne,lt,dt.width,dt.height,ct,dt.data):D.texSubImage2D(D.TEXTURE_2D,oe,Ne,lt,me,xe,ct,ft,dt);de.pixelStorei(D.UNPACK_ROW_LENGTH,zt),de.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Qi),de.pixelStorei(D.UNPACK_SKIP_PIXELS,Xt),de.pixelStorei(D.UNPACK_SKIP_ROWS,hi),de.pixelStorei(D.UNPACK_SKIP_IMAGES,Oi),oe===0&&F.generateMipmaps&&D.generateMipmap(ye),de.unbindTexture()},this.initRenderTarget=function(b){Ce.get(b).__webglFramebuffer===void 0&&A.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),de.unbindTexture()},this.resetState=function(){B=0,j=0,O=null,de.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};R_=class extends Kr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new N_(t)}),this.register(function(t){return new D_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new W_(t)}),this.register(function(t){return new X_(t)}),this.register(function(t){return new O_(t)}),this.register(function(t){return new F_(t)}),this.register(function(t){return new B_(t)}),this.register(function(t){return new z_(t)}),this.register(function(t){return new I_(t)}),this.register(function(t){return new k_(t)}),this.register(function(t){return new U_(t)}),this.register(function(t){return new V_(t)}),this.register(function(t){return new G_(t)}),this.register(function(t){return new L_(t)}),this.register(function(t){return new Dc(t,Ke.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Dc(t,Ke.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new j_(t)})}load(e,t,i,r){let a=this,n;if(this.resourcePath!=="")n=this.resourcePath;else if(this.path!==""){let l=va.extractUrlBase(e);n=va.resolveURL(l,this.path)}else n=va.extractUrlBase(e);this.manager.itemStart(e);let s=function(l){r?r(l):console.error(l),a.manager.itemError(e),a.manager.itemEnd(e)},o=new Oh(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{a.parse(l,n,function(c){t(c),a.manager.itemEnd(e)},s)}catch(c){s(c)}},i,s)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let a,n={},s={},o=new TextDecoder;if(typeof e=="string")a=JSON.parse(e);else if(e instanceof ArrayBuffer)if(o.decode(new Uint8Array(e,0,4))===Jh){try{n[Ke.KHR_BINARY_GLTF]=new q_(e)}catch(c){r&&r(c);return}a=JSON.parse(n[Ke.KHR_BINARY_GLTF].content)}else a=JSON.parse(o.decode(e));else a=e;if(a.asset===void 0||a.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new sx(a,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){let h=this.pluginCallbacks[c](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),s[h.name]=h,n[h.name]=!0}if(a.extensionsUsed)for(let c=0;c<a.extensionsUsed.length;++c){let h=a.extensionsUsed[c],d=a.extensionsRequired||[];switch(h){case Ke.KHR_MATERIALS_UNLIT:n[h]=new P_;break;case Ke.KHR_DRACO_MESH_COMPRESSION:n[h]=new Y_(a,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:n[h]=new K_;break;case Ke.KHR_MESH_QUANTIZATION:n[h]=new Z_;break;default:d.indexOf(h)>=0&&s[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(n),l.setPlugins(s),l.parse(i,r)}parseAsync(e,t){let i=this;return new Promise(function(r,a){i.parse(e,t,r,a)})}};Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},L_=class{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,r=t.cache.get(i);if(r)return r;let a=t.json,n=((a.extensions&&a.extensions[this.name]||{}).lights||[])[e],s,o=new ze(16777215);n.color!==void 0&&o.setRGB(n.color[0],n.color[1],n.color[2],Wt);let l=n.range!==void 0?n.range:0;switch(n.type){case"directional":s=new kh(o),s.target.position.set(0,0,-1),s.add(s.target);break;case"point":s=new zh(o),s.distance=l;break;case"spot":s=new hf(o),s.distance=l,n.spot=n.spot||{},n.spot.innerConeAngle=n.spot.innerConeAngle!==void 0?n.spot.innerConeAngle:0,n.spot.outerConeAngle=n.spot.outerConeAngle!==void 0?n.spot.outerConeAngle:Math.PI/4,s.angle=n.spot.outerConeAngle,s.penumbra=1-n.spot.innerConeAngle/n.spot.outerConeAngle,s.target.position.set(0,0,-1),s.add(s.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+n.type)}return s.position.set(0,0,0),fi(s,n),n.intensity!==void 0&&(s.intensity=n.intensity),s.name=t.createUniqueName(n.name||"light_"+e),r=Promise.resolve(s),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(n){return i._getNodeRef(t.cache,a,n)})}},P_=class{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Yi}extendParams(e,t,i){let r=[];e.color=new ze(1,1,1),e.opacity=1;let a=t.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){let n=a.baseColorFactor;e.color.setRGB(n[0],n[1],n[2],Wt),e.opacity=n[3]}a.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",a.baseColorTexture,Et))}return Promise.all(r)}},I_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},N_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let a=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(a,a)}return Promise.all(r)}},D_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},U_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(r)}},O_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let a=i.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Wt)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,Et)),i.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(r)}},F_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(r)}},B_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let a=i.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(a[0],a[1],a[2],Wt),Promise.all(r)}},z_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},k_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let a=i.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(a[0],a[1],a[2],Wt),i.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,Et)),Promise.all(r)}},G_=class{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(r)}},V_=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return _t(this.parser,e,this.name)!==null?oi:null}extendMaterialParams(e,t){let i=_t(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(r)}},H_=class{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let a=r.extensions[this.name],n=t.options.ktx2Loader;if(!n){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,a.source,n)}},W_=class{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,r=i.json,a=r.textures[e];if(!a.extensions||!a.extensions[t])return null;let n=a.extensions[t],s=r.images[n.source],o=i.textureLoader;if(s.uri){let l=i.options.manager.getHandler(s.uri);l!==null&&(o=l)}return i.loadTextureImage(e,n.source,o)}},X_=class{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,r=i.json,a=r.textures[e];if(!a.extensions||!a.extensions[t])return null;let n=a.extensions[t],s=r.images[n.source],o=i.textureLoader;if(s.uri){let l=i.options.manager.getHandler(s.uri);l!==null&&(o=l)}return i.loadTextureImage(e,n.source,o)}},Dc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],a=this.parser.getDependency("buffer",r.buffer),n=this.parser.options.meshoptDecoder;if(!n||!n.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(s){let o=r.byteOffset||0,l=r.byteLength||0,c=r.count,h=r.byteStride,d=new Uint8Array(s,o,l);return n.decodeGltfBufferAsync?n.decodeGltfBufferAsync(c,h,d,r.mode,r.filter).then(function(u){return u.buffer}):n.ready.then(function(){let u=new ArrayBuffer(c*h);return n.decodeGltfBuffer(new Uint8Array(u),c,h,d,r.mode,r.filter),u})})}else return null}},j_=class{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=t.meshes[i.mesh];for(let o of r.primitives)if(o.mode!==qt.TRIANGLES&&o.mode!==qt.TRIANGLE_STRIP&&o.mode!==qt.TRIANGLE_FAN&&o.mode!==void 0)return null;let a=i.extensions[this.name].attributes,n=[],s={};for(let o in a)n.push(this.parser.getDependency("accessor",a[o]).then(l=>(s[o]=l,s[o])));return n.length<1?null:(n.push(this.parser.createNodeMesh(e)),Promise.all(n).then(o=>{let l=o.pop(),c=l.isGroup?l.children:[l],h=o[0].count,d=[];for(let u of c){let p=new Ve,v=new L,g=new Ht,m=new L(1,1,1),f=new mp(u.geometry,u.material,h);for(let _=0;_<h;_++)s.TRANSLATION&&v.fromBufferAttribute(s.TRANSLATION,_),s.ROTATION&&g.fromBufferAttribute(s.ROTATION,_),s.SCALE&&m.fromBufferAttribute(s.SCALE,_),f.setMatrixAt(_,p.compose(v,g,m));for(let _ in s)if(_==="_COLOR_0"){let M=s[_];f.instanceColor=new po(M.array,M.itemSize,M.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&u.geometry.setAttribute(_,s[_]);St.prototype.copy.call(f,u),this.parser.assignFinalMaterial(f),d.push(f)}return l.isGroup?(l.clear(),l.add(...d),l):d[0]}))}},Jh="glTF",ca=12,Uc={JSON:1313821514,BIN:5130562},q_=class{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ca),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Jh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-ca,a=new DataView(e,ca),n=0;for(;n<r;){let s=a.getUint32(n,!0);n+=4;let o=a.getUint32(n,!0);if(n+=4,o===Uc.JSON){let l=new Uint8Array(e,ca+n,s);this.content=i.decode(l)}else if(o===Uc.BIN){let l=ca+n;this.body=e.slice(l,l+s)}n+=s}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Y_=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,r=this.dracoLoader,a=e.extensions[this.name].bufferView,n=e.extensions[this.name].attributes,s={},o={},l={};for(let c in n){let h=xo[c]||c.toLowerCase();s[h]=n[c]}for(let c in e.attributes){let h=xo[c]||c.toLowerCase();if(n[c]!==void 0){let d=i.accessors[e.attributes[c]],u=Ur[d.componentType];l[h]=u.name,o[h]=d.normalized===!0}}return t.getDependency("bufferView",a).then(function(c){return new Promise(function(h,d){r.decodeDracoFile(c,function(u){for(let p in u.attributes){let v=u.attributes[p],g=o[p];g!==void 0&&(v.normalized=g)}h(u)},s,l,Wt,d)})})}},K_=class{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Z_=class{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}},$h=class extends jr{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r*3+r;for(let n=0;n!==r;n++)t[n]=i[a+n];return t}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=s*2,l=s*3,c=r-t,h=(i-t)/c,d=h*h,u=d*h,p=e*l,v=p-l,g=-2*u+3*d,m=u-d,f=1-g,_=m-d+h;for(let M=0;M!==s;M++){let y=n[v+M+s],T=n[v+M+o]*c,E=n[p+M+s],C=n[p+M]*c;a[M]=f*y+_*T+g*E+m*C}return a}},J_=new Ht,$_=class extends $h{interpolate_(e,t,i,r){let a=super.interpolate_(e,t,i,r);return J_.fromArray(a).normalize().toArray(a),a}},qt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ur={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Oc={9728:yt,9729:Mt,9984:Kc,9985:sn,9986:ua,9987:Ci},Fc={33071:gi,33648:fn,10497:cr},xs={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},xo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Wi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Q_={CUBICSPLINE:void 0,LINEAR:Sa,STEP:Ma},Ms={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};nx=new Ve,sx=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new C_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,a=!1,n=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let s=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(s)===!0;let o=s.match(/Version\/(\d+)/);r=i&&o?parseInt(o[1],10):-1,a=s.indexOf("Firefox")>-1,n=a?s.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||a&&n<98?this.textureLoader=new Fh(this.options.manager):this.textureLoader=new ff(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Oh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,r=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(n){return n._markDefs&&n._markDefs()}),Promise.all(this._invokeAll(function(n){return n.beforeRoot&&n.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(n){let s={scene:n[0][r.scene||0],scenes:n[0],animations:n[1],cameras:n[2],asset:r.asset,parser:i,userData:{}};return ar(a,s,r),fi(s,r),Promise.all(i._invokeAll(function(o){return o.afterRoot&&o.afterRoot(s)})).then(function(){for(let o of s.scenes)o.updateMatrixWorld();e(s)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,a=t.length;r<a;r++){let n=t[r].joints;for(let s=0,o=n.length;s<o;s++)e[n[s]].isBone=!0}for(let r=0,a=e.length;r<a;r++){let n=e[r];n.mesh!==void 0&&(this._addNodeRef(this.meshCache,n.mesh),n.skin!==void 0&&(i[n.mesh].isSkinnedMesh=!0)),n.camera!==void 0&&this._addNodeRef(this.cameraCache,n.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let r=i.clone(),a=(n,s)=>{let o=this.associations.get(n);o!=null&&this.associations.set(s,o);for(let[l,c]of n.children.entries())a(c,s.children[l])};return a(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let r=e(t[i]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let r=0;r<t.length;r++){let a=e(t[r]);a&&i.push(a)}return i}getDependency(e,t){let i=e+":"+t,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(a){return a.loadNode&&a.loadNode(t)});break;case"mesh":r=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(a,n){return i.getDependency(e,n)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(a,n){i.load(va.resolveURL(t.uri,r.path),a,void 0,function(){n(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let r=t.byteLength||0,a=t.byteOffset||0;return i.slice(a,a+r)})}loadAccessor(e){let t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let n=xs[r.type],s=Ur[r.componentType],o=r.normalized===!0,l=new s(r.count*n);return Promise.resolve(new Ct(l,n,o))}let a=[];return r.bufferView!==void 0?a.push(this.getDependency("bufferView",r.bufferView)):a.push(null),r.sparse!==void 0&&(a.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(a).then(function(n){let s=n[0],o=xs[r.type],l=Ur[r.componentType],c=l.BYTES_PER_ELEMENT,h=c*o,d=r.byteOffset||0,u=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,p=r.normalized===!0,v,g;if(u&&u!==h){let m=Math.floor(d/u),f="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+m+":"+r.count,_=t.cache.get(f);_||(v=new l(s,m*u,r.count*u/c),_=new sp(v,u/c),t.cache.add(f,_)),g=new op(_,o,d%u/c,p)}else s===null?v=new l(r.count*o):v=new l(s,d,r.count*o),g=new Ct(v,o,p);if(r.sparse!==void 0){let m=xs.SCALAR,f=Ur[r.sparse.indices.componentType],_=r.sparse.indices.byteOffset||0,M=r.sparse.values.byteOffset||0,y=new f(n[1],_,r.sparse.count*m),T=new l(n[2],M,r.sparse.count*o);s!==null&&(g=new Ct(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let E=0,C=y.length;E<C;E++){let x=y[E];if(g.setX(x,T[E*o]),o>=2&&g.setY(x,T[E*o+1]),o>=3&&g.setZ(x,T[E*o+2]),o>=4&&g.setW(x,T[E*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],n=this.textureLoader;if(a.uri){let s=i.manager.getHandler(a.uri);s!==null&&(n=s)}return this.loadTextureImage(e,r,n)}loadTextureImage(e,t,i){let r=this,a=this.json,n=a.textures[e],s=a.images[t],o=(s.uri||s.bufferView)+":"+n.sampler;if(this.textureCache[o])return this.textureCache[o];let l=this.loadImageSource(t,i).then(function(c){c.flipY=!1,c.name=n.name||s.name||"",c.name===""&&typeof s.uri=="string"&&s.uri.startsWith("data:image/")===!1&&(c.name=s.uri);let h=(a.samplers||{})[n.sampler]||{};return c.magFilter=Oc[h.magFilter]||Mt,c.minFilter=Oc[h.minFilter]||Ci,c.wrapS=Fc[h.wrapS]||cr,c.wrapT=Fc[h.wrapT]||cr,c.generateMipmaps=!c.isCompressedTexture&&c.minFilter!==yt&&c.minFilter!==Mt,r.associations.set(c,{textures:e}),c}).catch(function(){return null});return this.textureCache[o]=l,l}loadImageSource(e,t){let i=this,r=this.json,a=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let n=r.images[e],s=self.URL||self.webkitURL,o=n.uri||"",l=!1;if(n.bufferView!==void 0)o=i.getDependency("bufferView",n.bufferView).then(function(h){l=!0;let d=new Blob([h],{type:n.mimeType});return o=s.createObjectURL(d),o});else if(n.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let c=Promise.resolve(o).then(function(h){return new Promise(function(d,u){let p=d;t.isImageBitmapLoader===!0&&(p=function(v){let g=new Lt(v);g.needsUpdate=!0,d(g)}),t.load(va.resolveURL(h,a.path),p,void 0,u)})}).then(function(h){return l===!0&&s.revokeObjectURL(o),fi(h,n),h.userData.mimeType=n.mimeType||ax(n.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",o),h});return this.sourceCache[e]=c,c}assignTexture(e,t,i,r){let a=this;return this.getDependency("texture",i.index).then(function(n){if(!n)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(n=n.clone(),n.channel=i.texCoord),a.extensions[Ke.KHR_TEXTURE_TRANSFORM]){let s=i.extensions!==void 0?i.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(s){let o=a.associations.get(n);n=a.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(n,s),a.associations.set(n,o)}}return r!==void 0&&(n.colorSpace=r),e[t]=n,n})}assignFinalMaterial(e){let t=e.geometry,i=e.material,r=t.attributes.tangent===void 0,a=t.attributes.color!==void 0,n=t.attributes.normal===void 0;if(e.isPoints){let s="PointsMaterial:"+i.uuid,o=this.cache.get(s);o||(o=new xh,si.prototype.copy.call(o,i),o.color.copy(i.color),o.map=i.map,o.sizeAttenuation=!1,this.cache.add(s,o)),i=o}else if(e.isLine){let s="LineBasicMaterial:"+i.uuid,o=this.cache.get(s);o||(o=new Oo,si.prototype.copy.call(o,i),o.color.copy(i.color),o.map=i.map,this.cache.add(s,o)),i=o}if(r||a||n){let s="ClonedMaterial:"+i.uuid+":";r&&(s+="derivative-tangents:"),a&&(s+="vertex-colors:"),n&&(s+="flat-shading:");let o=this.cache.get(s);o||(o=i.clone(),a&&(o.vertexColors=!0),n&&(o.flatShading=!0),r&&(o.normalScale&&(o.normalScale.y*=-1),o.clearcoatNormalScale&&(o.clearcoatNormalScale.y*=-1)),this.cache.add(s,o),this.associations.set(o,this.associations.get(i))),i=o}e.material=i}getMaterialType(){return Tn}loadMaterial(e){let t=this,i=this.json,r=this.extensions,a=i.materials[e],n,s={},o=a.extensions||{},l=[];if(o[Ke.KHR_MATERIALS_UNLIT]){let h=r[Ke.KHR_MATERIALS_UNLIT];n=h.getMaterialType(),l.push(h.extendParams(s,a,t))}else{let h=a.pbrMetallicRoughness||{};if(s.color=new ze(1,1,1),s.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;s.color.setRGB(d[0],d[1],d[2],Wt),s.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(s,"map",h.baseColorTexture,Et)),s.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,s.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(s,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(s,"roughnessMap",h.metallicRoughnessTexture))),n=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,s)})))}a.doubleSided===!0&&(s.side=ti);let c=a.alphaMode||Ms.OPAQUE;if(c===Ms.BLEND?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,c===Ms.MASK&&(s.alphaTest=a.alphaCutoff!==void 0?a.alphaCutoff:.5)),a.normalTexture!==void 0&&n!==Yi&&(l.push(t.assignTexture(s,"normalMap",a.normalTexture)),s.normalScale=new Pe(1,1),a.normalTexture.scale!==void 0)){let h=a.normalTexture.scale;s.normalScale.set(h,h)}if(a.occlusionTexture!==void 0&&n!==Yi&&(l.push(t.assignTexture(s,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&n!==Yi){let h=a.emissiveFactor;s.emissive=new ze().setRGB(h[0],h[1],h[2],Wt)}return a.emissiveTexture!==void 0&&n!==Yi&&l.push(t.assignTexture(s,"emissiveMap",a.emissiveTexture,Et)),Promise.all(l).then(function(){let h=new n(s);return a.name&&(h.name=a.name),fi(h,a),t.associations.set(h,{materials:e}),a.extensions&&ar(r,h,a),h})}createUniqueName(e){let t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,r=this.primitiveCache;function a(s){return i[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s,t).then(function(o){return Bc(o,s,t)})}let n=[];for(let s=0,o=e.length;s<o;s++){let l=e[s],c=rx(l),h=r[c];if(h)n.push(h.promise);else{let d;l.extensions&&l.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=a(l):d=Bc(new Pt,l,t),r[c]={primitive:l,promise:d},n.push(d)}}return Promise.all(n)}loadMesh(e){let t=this,i=this.json,r=this.extensions,a=i.meshes[e],n=a.primitives,s=[];for(let o=0,l=n.length;o<l;o++){let c=n[o].material===void 0?ex(this.cache):this.getDependency("material",n[o].material);s.push(c)}return s.push(t.loadGeometries(n)),Promise.all(s).then(function(o){let l=o.slice(0,o.length-1),c=o[o.length-1],h=[];for(let u=0,p=c.length;u<p;u++){let v=c[u],g=n[u],m,f=l[u];if(g.mode===qt.TRIANGLES||g.mode===qt.TRIANGLE_STRIP||g.mode===qt.TRIANGLE_FAN||g.mode===void 0)m=a.isSkinnedMesh===!0?new up(v,f):new Dt(v,f),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===qt.TRIANGLE_STRIP?m.geometry=Nc(m.geometry,ih):g.mode===qt.TRIANGLE_FAN&&(m.geometry=Nc(m.geometry,oo));else if(g.mode===qt.LINES)m=new _h(v,f);else if(g.mode===qt.LINE_STRIP)m=new bn(v,f);else if(g.mode===qt.LINE_LOOP)m=new xp(v,f);else if(g.mode===qt.POINTS)m=new Mp(v,f);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&ix(m,a),m.name=t.createUniqueName(a.name||"mesh_"+e),fi(m,a),g.extensions&&ar(r,m,g),t.assignFinalMaterial(m),h.push(m)}for(let u=0,p=h.length;u<p;u++)t.associations.set(h[u],{meshes:e,primitives:u});if(h.length===1)return a.extensions&&ar(r,h[0],a),h[0];let d=new qi;a.extensions&&ar(r,d,a),t.associations.set(d,{meshes:e});for(let u=0,p=h.length;u<p;u++)d.add(h[u]);return d})}loadCamera(e){let t,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Ft(ah.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new Ea(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),fi(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let r=0,a=t.joints.length;r<a;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let a=r.pop(),n=r,s=[],o=[];for(let l=0,c=n.length;l<c;l++){let h=n[l];if(h){s.push(h);let d=new Ve;a!==null&&d.fromArray(a.array,l*16),o.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new pp(s,o)})}loadAnimation(e){let t=this.json,i=this,r=t.animations[e],a=r.name?r.name:"animation_"+e,n=[],s=[],o=[],l=[],c=[];for(let h=0,d=r.channels.length;h<d;h++){let u=r.channels[h],p=r.samplers[u.sampler],v=u.target,g=v.node,m=r.parameters!==void 0?r.parameters[p.input]:p.input,f=r.parameters!==void 0?r.parameters[p.output]:p.output;v.node!==void 0&&(n.push(this.getDependency("node",g)),s.push(this.getDependency("accessor",m)),o.push(this.getDependency("accessor",f)),l.push(p),c.push(v))}return Promise.all([Promise.all(n),Promise.all(s),Promise.all(o),Promise.all(l),Promise.all(c)]).then(function(h){let d=h[0],u=h[1],p=h[2],v=h[3],g=h[4],m=[];for(let _=0,M=d.length;_<M;_++){let y=d[_],T=u[_],E=p[_],C=v[_],x=g[_];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let w=i._createAnimationTracks(y,T,E,C,x);if(w)for(let U=0;U<w.length;U++)m.push(w[U])}let f=new mo(a,void 0,m);return fi(f,r),f})}createNodeMesh(e){let t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(a){let n=i._getNodeRef(i.meshCache,r.mesh,a);return r.weights!==void 0&&n.traverse(function(s){if(s.isMesh)for(let o=0,l=r.weights.length;o<l;o++)s.morphTargetInfluences[o]=r.weights[o]}),n})}loadNode(e){let t=this.json,i=this,r=t.nodes[e],a=i._loadNodeShallow(e),n=[],s=r.children||[];for(let l=0,c=s.length;l<c;l++)n.push(i.getDependency("node",s[l]));let o=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([a,Promise.all(n),o]).then(function(l){let c=l[0],h=l[1],d=l[2];d!==null&&c.traverse(function(u){u.isSkinnedMesh&&u.bind(d,nx)});for(let u=0,p=h.length;u<p;u++)c.add(h[u]);if(c.userData.pivot!==void 0&&h.length>0){let u=c.userData.pivot,p=h[0];c.pivot=new L().fromArray(u),c.position.x-=u[0],c.position.y-=u[1],c.position.z-=u[2],p.position.set(0,0,0),delete c.userData.pivot}return c})}_loadNodeShallow(e){let t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let a=t.nodes[e],n=a.name?r.createUniqueName(a.name):"",s=[],o=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return o&&s.push(o),a.camera!==void 0&&s.push(r.getDependency("camera",a.camera).then(function(l){return r._getNodeRef(r.cameraCache,a.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){s.push(l)}),this.nodeCache[e]=Promise.all(s).then(function(l){let c;if(a.isBone===!0?c=new gh:l.length>1?c=new qi:l.length===1?c=l[0]:c=new St,c!==l[0])for(let h=0,d=l.length;h<d;h++)c.add(l[h]);if(a.name&&(c.userData.name=a.name,c.name=n),fi(c,a),a.extensions&&ar(i,c,a),a.matrix!==void 0){let h=new Ve;h.fromArray(a.matrix),c.applyMatrix4(h)}else a.translation!==void 0&&c.position.fromArray(a.translation),a.rotation!==void 0&&c.quaternion.fromArray(a.rotation),a.scale!==void 0&&c.scale.fromArray(a.scale);if(!r.associations.has(c))r.associations.set(c,{});else if(a.mesh!==void 0&&r.meshCache.refs[a.mesh]>1){let h=r.associations.get(c);r.associations.set(c,{...h})}return r.associations.get(c).nodes=e,c}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],r=this,a=new qi;i.name&&(a.name=r.createUniqueName(i.name)),fi(a,i),i.extensions&&ar(t,a,i);let n=i.nodes||[],s=[];for(let o=0,l=n.length;o<l;o++)s.push(r.getDependency("node",n[o]));return Promise.all(s).then(function(o){for(let c=0,h=o.length;c<h;c++){let d=o[c];d.parent!==null?a.add(A_(d)):a.add(d)}let l=c=>{let h=new Map;for(let[d,u]of r.associations)(d instanceof si||d instanceof Lt)&&h.set(d,u);return c.traverse(d=>{let u=r.associations.get(d);u!=null&&h.set(d,u)}),h};return r.associations=l(a),a})}_createAnimationTracks(e,t,i,r,a){let n=[],s=e.name?e.name:e.uuid,o=[];function l(u){u.morphTargetInfluences&&o.push(u.name?u.name:u.uuid)}Wi[a.path]===Wi.weights?(l(e),e.isGroup&&e.children.forEach(l)):o.push(s);let c;switch(Wi[a.path]){case Wi.weights:c=Hr;break;case Wi.rotation:c=Wr;break;case Wi.translation:case Wi.scale:c=Xr;break;default:switch(i.itemSize){case 1:c=Hr;break;case 2:case 3:default:c=Xr;break}break}let h=r.interpolation!==void 0?Q_[r.interpolation]:Sa,d=this._getArrayFromAccessor(i);for(let u=0,p=o.length;u<p;u++){let v=new c(o[u]+"."+Wi[a.path],t.array,d,h);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),n.push(v)}return n}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Mo(t.constructor),r=new Float32Array(t.length);for(let a=0,n=t.length;a<n;a++)r[a]=t[a]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(t){let i=this instanceof Wr?$_:$h;return new i(this.times,this.values,this.getValueSize()/3,t)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};Qh=class eu extends Dt{constructor(t,i={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;let r=this,a=i.color!==void 0?new ze(i.color):new ze(8355711),n=i.textureWidth||512,s=i.textureHeight||512,o=i.clipBias||0,l=i.shader||eu.ReflectorShader,c=i.multisample!==void 0?i.multisample:4,h=new Xi,d=new L,u=new L,p=new L,v=new Ve,g=new L(0,0,-1),m=new nt,f=new L,_=new L,M=new nt,y=new Ve,T=new ni(n,s,{samples:c,type:xi}),E=new Zt({name:l.name!==void 0?l.name:"unspecified",uniforms:Ih.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});E.uniforms.tDiffuse.value=T.texture,E.uniforms.color.value=a,E.uniforms.textureMatrix.value=y,this.material=E,this.onBeforeRender=function(C,x,w){let U=this._getReflectionCamera(w);if(u.setFromMatrixPosition(r.matrixWorld),p.setFromMatrixPosition(w.matrixWorld),v.extractRotation(r.matrixWorld),d.set(0,0,1),d.applyMatrix4(v),f.subVectors(u,p),f.dot(d)>0&&this.forceUpdate===!1)return;f.reflect(d).negate(),f.add(u),v.extractRotation(w.matrixWorld),g.set(0,0,-1),g.applyMatrix4(v),g.add(p),_.subVectors(u,g),_.reflect(d).negate(),_.add(u),U.position.copy(f),U.up.set(0,1,0),U.up.applyMatrix4(v),U.up.reflect(d),U.lookAt(_),U.far=w.far,U.updateMatrixWorld(),U.projectionMatrix.copy(w.projectionMatrix),y.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),y.multiply(U.projectionMatrix),y.multiply(U.matrixWorldInverse),y.multiply(r.matrixWorld),h.setFromNormalAndCoplanarPoint(d,u),h.applyMatrix4(U.matrixWorldInverse),m.set(h.normal.x,h.normal.y,h.normal.z,h.constant);let R=U.projectionMatrix;U.isOrthographicCamera?(M.x=(Math.sign(m.x)+R.elements[8])/R.elements[0],M.y=(Math.sign(m.y)+R.elements[9])/R.elements[5],M.z=-w.far,M.w=1):(M.x=(Math.sign(m.x)+R.elements[8])/R.elements[0],M.y=(Math.sign(m.y)+R.elements[9])/R.elements[5],M.z=-1,M.w=(1+R.elements[10])/R.elements[14]),m.multiplyScalar(2/m.dot(M)),R.elements[2]=m.x,R.elements[6]=m.y,U.isOrthographicCamera?(R.elements[10]=m.z-o,R.elements[14]=m.w-1):(R.elements[10]=m.z+1-o,R.elements[14]=m.w),r.visible=!1;let B=C.getRenderTarget(),j=C.xr.enabled,O=C.shadowMap.autoUpdate;C.xr.enabled=!1,C.shadowMap.autoUpdate=!1,C.setRenderTarget(T),C.state.buffers.depth.setMask(!0),C.autoClear===!1&&C.clear(),C.render(x,U),C.xr.enabled=j,C.shadowMap.autoUpdate=O,C.setRenderTarget(B);let H=w.viewport;H!==void 0&&C.state.viewport(H),r.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return T},this.dispose=function(){T.dispose(),r.material.dispose()},this._getReflectionCamera=function(C){let x=this._reflectionCameras.get(C);return x===void 0&&(x=C.clone(),this._reflectionCameras.set(C,x)),x}}};Qh.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`}});function au({THREE:e,parent:t,prepared:i,texture:r}){let a=[],n=i.map(o=>{let[l,c,h,d]=o.rect,[u,p]=o.pivot,v=new e.PlaneGeometry(h,d,8,12);v.translate(l+h/2-u,p-c-d/2,0);let g=new Float32Array(v.attributes.position.array),m=new e.MeshBasicMaterial({map:r(o.texture),transparent:!0,depthWrite:!1,toneMapped:!1,side:e.DoubleSide});o.isolated&&m.color.setRGB(.68,.72,.76);let f=new e.Mesh(v,m);return f.position.set(u,1024-p,o.id==="foreground-garden"?210:9),f.renderOrder=o.id==="foreground-garden"?18:4,t.add(f),a.push(v,m),{spec:o,mesh:f,original:g}});function s(o){for(let l of n){let{spec:c,original:h,mesh:d}=l,u=d.geometry.attributes.position,p=c.rect[3];for(let v=0;v<u.count;v++){let g=v*3,m=Math.min(1,Math.abs(h[g+1])/p),f=Math.pow(m,1.35),M=(.65+.35*Math.sin(o*.19+c.phase*.3))*(Math.sin(o*.71+c.phase)*.68+Math.sin(o*1.43+c.phase+h[g]*.032)*.32);u.setXYZ(v,h[g]+M*c.amplitude*f,h[g+1]+Math.sin(o*1.13+c.phase+h[g]*.04)*f*1.5,Math.sin(o*.77+c.phase)*f*1.8)}u.needsUpdate=!0}}return{update:s,setPortrait(o){let l=n.find(c=>c.spec.id==="foreground-garden");l&&(l.mesh.visible=!o)},snapshot:()=>({count:n.length,anchored:!0,maxDisplacement:7.8,isolatedAlpha:n.every(o=>o.spec.isolated),alphaOccupancy:n.map(o=>[o.spec.id,o.spec.alphaOccupancy]),objects:n.map(o=>o.spec.id)}),dispose:()=>{n.forEach(o=>t.remove(o.mesh)),a.forEach(o=>o.dispose())}}}var lx,ru,Wo=Ot(()=>{lx={"hanging-ivy":[553,0,150,155],"magic-maple":[548,398,193,226],"bowl-plant":[721,556,169,158],"left-fern":[0,395,210,190],"hub-vine":[1365,367,159,318],"left-low-fern":[0,575,150,110],"doorway-fern":[210,613,146,120],"lantern-pot":[575,593,143,111],"foreground-garden":[0,850,390,174]},ru=[{id:"hanging-ivy",rect:[558,0,138,152],pivot:[590,0],anchor:"top",amplitude:5.8,phase:.7,path:"M559 0 L668 0 L682 18 L676 37 L692 53 L680 72 L695 91 L679 107 L686 129 L666 151 L654 127 L647 102 L620 89 L610 65 L580 58 L564 37 Z"},{id:"magic-maple",rect:[550,440,170,179],pivot:[636,617],amplitude:7.4,phase:2.3,feather:1.2,path:"M639 596 L616 571 L587 565 L576 547 L554 542 L569 523 L557 504 L579 488 L576 467 L603 474 L618 450 L641 466 L657 450 L679 474 L708 472 L696 497 L714 519 L691 539 L701 559 L665 570 Z"},{id:"bowl-plant",rect:[720,548,143,149],pivot:[783,691],amplitude:6.8,phase:4.7,feather:1,path:"M780 691 L757 670 L738 671 L735 650 L722 632 L740 614 L727 602 L748 587 L764 591 L769 562 L792 553 L803 578 L827 574 L824 603 L850 600 L859 628 L838 644 L841 663 L816 667 L809 690 Z"},{id:"left-fern",rect:[0,418,182,204],pivot:[76,620],amplitude:7.8,phase:6.8,feather:1.1,path:"M75 620 L45 600 L21 591 L2 580 L0 550 L21 542 L0 518 L5 475 L28 482 L18 456 L41 433 L61 441 L74 422 L102 427 L110 446 L136 442 L153 459 L176 465 L169 479 L147 479 L136 488 L159 508 L145 523 L125 519 L125 544 L105 562 L98 594 Z"},{id:"hub-vine",rect:[1385,384,110,176],pivot:[1455,552],amplitude:7.2,phase:9.4,feather:1,path:"M1455 553 L1428 538 L1435 514 L1408 512 L1418 492 L1388 478 L1399 457 L1385 440 L1411 427 L1400 409 L1426 400 L1450 384 L1464 405 L1490 410 L1480 439 L1495 461 L1474 477 L1485 506 L1465 523 Z"},{id:"left-low-fern",rect:[0,592,117,80],pivot:[59,669],amplitude:6.2,phase:1.9,feather:1,path:"M58 669 L33 651 L3 656 L1 632 L17 617 L5 607 L30 600 L47 612 L63 594 L81 609 L107 602 L116 626 L97 633 L104 650 L78 653 Z"},{id:"doorway-fern",rect:[251,643,95,80],pivot:[286,721],amplitude:5.8,phase:3.7,feather:1,path:"M284 721 L263 702 L252 687 L263 674 L251 660 L269 654 L281 670 L292 646 L306 661 L334 653 L344 675 L324 682 L338 698 L308 694 L300 718 Z"},{id:"lantern-pot",rect:[588,600,93,99],pivot:[633,697],amplitude:6.6,phase:5.1,feather:1,path:"M634 697 L615 685 L599 687 L604 672 L590 663 L604 647 L593 635 L614 628 L620 610 L634 626 L650 602 L661 620 L679 632 L665 649 L679 663 L655 671 L652 688 Z"},{id:"foreground-garden",rect:[70,835,270,189],pivot:[166,1023],amplitude:3.8,phase:7.2,feather:12,path:"M76 1023 C79 985 75 947 87 917 C78 886 94 854 111 857 C125 846 143 865 151 881 C170 871 181 887 188 904 C204 887 222 901 230 923 C254 907 277 923 282 943 C310 937 328 960 332 985 L331 1023 Z"}].map(e=>({...e,atlasRect:lx[e.id]}))});function su({THREE:e,parent:t,prepared:i,texture:r}){let a=i.map(n=>{let[s,o,l,c]=n.rect,[h,d]=n.pivot,u=new e.PlaneGeometry(l,c,16,24);u.translate(s+l/2-h,d-o-c/2,0);let p=new e.MeshBasicMaterial({map:r(n.texture),transparent:!0,depthWrite:!1,side:e.DoubleSide,toneMapped:!1}),v=new e.Mesh(u,p);return v.position.set(h,1024-d,12),v.renderOrder=5,t.add(v),{spec:n,mesh:v,rest:new Float32Array(u.attributes.position.array)}});return{update(n){for(let{spec:s,mesh:o,rest:l}of a){let c=o.geometry.attributes.position,h=.62+.25*Math.sin(n*.31+s.phase)+.13*Math.sin(n*.17);for(let u=0;u<c.count;u++){let p=u*3,v=Math.pow(Math.max(0,-l[p+1])/s.rect[3],1.7),g=Math.sin(n*(.78+s.phase*.09)+s.phase+l[p]*.021);c.setXYZ(u,l[p]+v*g*h*7.5,l[p+1]+v*Math.sin(n*1.3+s.phase+l[p]*.055)*2.6,v*g*10)}c.needsUpdate=!0;let d=.78+.025*Math.sin(n*1.05+s.phase);o.material.color.setRGB(d,d,d)}},snapshot:()=>({count:a.length,topAnchored:!0,isolatedAlpha:i.every(n=>n.isolated)}),dispose(){for(let{mesh:n}of a)t.remove(n),n.geometry.dispose(),n.material.dispose()}}}var nu,Xo=Ot(()=>{nu=[{id:"noren-left",rect:[289,315,99,142],atlasRect:[274,319,94,148],pivot:[338,316],phase:.4,path:"M291 316 L386 316 L381 347 L380 408 L377 450 L356 453 L324 450 L291 452 Z"},{id:"noren-center",rect:[380,315,124,144],atlasRect:[368,319,133,150],pivot:[442,316],phase:1.3,path:"M386 316 L501 316 L498 350 L499 400 L496 451 L474 455 L442 452 L410 454 L382 451 L384 394 Z"},{id:"noren-right",rect:[499,315,106,143],atlasRect:[501,319,92,148],pivot:[551,316],phase:2.6,path:"M503 316 L603 316 L600 351 L600 402 L596 450 L566 453 L539 450 L501 453 L503 390 Z"}]});function ux(e){let[t,i,r,a]=e.rect,n=yi(r*4,a*4),s=n.getContext("2d");s.scale(4,4),s.translate(-t,-i),s.fillStyle="#fff",e.path?s.fill(new Path2D(e.path)):(s.beginPath(),s.ellipse(t+r/2,i+a/2,r*.49,a*.49,0,0,Math.PI*2),s.fill());let o=yi(r,a),l=o.getContext("2d");return e.feather&&(l.filter=`blur(${e.feather}px)`),l.drawImage(n,0,0,r,a),o}function dx(e,t){let i=e.width,r=e.height,n=e.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,i,r),s=t.getContext("2d").getImageData(0,0,i,r).data,o=new Uint8Array(i*r),l=new Float32Array(i*r*3),c=[];for(let p=1;p<r-1;p++)for(let v=1;v<i-1;v++){let g=!1;for(let m=-1;m<=1&&!g;m++)for(let f=-1;f<=1;f++)if(s[((p+m)*i+v+f)*4+3]>8){g=!0;break}o[p*i+v]=g?1:0}for(let p=0;p<i*r;p++)for(let v=0;v<3;v++)l[p*3+v]=n.data[p*4+v];for(let p=1;p<r-1;p++)for(let v=1;v<i-1;v++){let g=p*i+v;if(!o[g])continue;let m=v,f=v;for(;m>0&&o[p*i+m];)m--;for(;f<i-1&&o[p*i+f];)f++;let _=(v-m)/Math.max(1,f-m);for(let M=0;M<3;M++)l[g*3+M]=l[(p*i+m)*3+M]*(1-_)+l[(p*i+f)*3+M]*_;c.push(g)}for(let p=0;p<100;p++)for(let v of c)for(let g=0;g<3;g++)l[v*3+g]=.25*(l[(v-1)*3+g]+l[(v+1)*3+g]+l[(v-i)*3+g]+l[(v+i)*3+g]);let h=yi(i,r),d=h.getContext("2d"),u=d.createImageData(i,r);u.data.set(n.data);for(let p of c)for(let v=0;v<3;v++)u.data[p*4+v]=Math.round(l[p*3+v]);return d.putImageData(u,0,0),h}function ou(e,t,i,r,a,n,s){let o=yi(1536,1024),l=o.getContext("2d");l.drawImage(e,0,0);let c=t?jo.map(f=>({rect:f,source:t})):[];i&&c.push({rect:qo,source:i}),a&&c.push(...Yo.map(f=>({rect:f,source:a})));let h=({rect:[f,_,M,y],source:T})=>{let E=yi(M,y),C=E.getContext("2d");C.drawImage(T,f,_,M,y,0,0,M,y);let x=C.getImageData(0,0,M,y);for(let w=0;w<y;w++)for(let U=0;U<M;U++){let R=Math.min(U,w,M-1-U,y-1-w);x.data[(w*M+U)*4+3]=Math.min(255,R/6*255)}C.putImageData(x,0,0),l.drawImage(E,f,_)};c.forEach(h);let d=f=>{let[_,M,y,T]=f.rect,E=yi(y,T);E.getContext("2d").drawImage(e,_,M,y,T,0,0,y,T);let x=ux(f),w=dx(E,x);l.drawImage(w,_,M);let U=yi(y,T),R=U.getContext("2d");return R.drawImage(E,0,0),R.globalCompositeOperation="destination-in",R.drawImage(x,0,0),{...f,texture:U,plate:w,mask:x}},u=f=>{let[_,M,y,T]=f.rect,E=yi(y,T),C=E.getContext("2d");C.drawImage(a,_,M,y,T,0,0,y,T);let x=C.getImageData(0,0,y,T);for(let j=0;j<T;j++)for(let O=0;O<y;O++){let H=Math.min(_===0?20:O,M===0?20:j,y-1-O,M+T===1024?20:T-1-j);x.data[(j*y+O)*4+3]=Math.min(255,H/3*255)}C.putImageData(x,0,0),l.drawImage(E,_,M);let w=yi(y,T),U=w.getContext("2d");U.drawImage(r,...f.atlasRect,0,0,y,T);let R=U.getImageData(0,0,y,T),B=0;for(let j=3;j<R.data.length;j+=4){let O=R.data[j];R.data[j]=O<12?0:Math.min(255,(O-12)*255/239),R.data[j]>12&&B++}return U.putImageData(R,0,0),{...f,texture:w,plate:E,isolated:!0,alphaOccupancy:B/(y*T)}},p=ru.map(r&&a?u:d);s&&h({rect:Ko,source:s});let v=cx.map(d),g=hx.map(d),m=nu.map(f=>{if(!n||!s)return d(f);let _=yi(f.rect[2],f.rect[3]),M=_.getContext("2d");M.drawImage(n,...f.atlasRect,0,0,_.width,_.height);let y=M.getImageData(0,0,_.width,_.height);for(let T=3;T<y.data.length;T+=4){let E=y.data[T];y.data[T]=E<16?0:Math.min(255,(E-16)*255/235)}return M.putImageData(y,0,0),{...f,texture:_,isolated:!0}});return{clean:o,lanterns:v,flames:g,foliage:p,curtains:m,catRemoved:!!t}}function lu(e,t,i=-100){let r=(t+e.offset)%e.period,a=r<10.5?e.amplitude*Math.sin(r*2.1)*Math.exp(-r*.22)*Math.min(r/.8,1):0,n=t-i,s=n>=0&&n<5.2?.03*Math.sin(n*2.9)*Math.exp(-n*.65):0,o=.005*Math.sin(t*.67+e.offset);return Math.max(-.048,Math.min(.048,a+s+o))}var jo,qo,Yo,Ko,cx,hx,yi,cu=Ot(()=>{Wo();Xo();jo=[[628,678,188,114],[1090,188,145,95],[1231,112,243,205],[1106,548,216,151],[1330,312,54,223]],qo=[1215,821,110,100],Yo=[[552,394,184,236],[680,532,66,102],[720,540,156,172]],Ko=[285,313,324,151],cx=[{id:"left",rect:[116,214,100,176],pivot:[164,224],path:"M162 224 L166 224 L166 233 L171 235 L171 244 L179 246 L180 252 C197 258 202 270 203 291 L203 331 C202 350 196 359 185 365 L179 367 L179 376 L166 378 L166 385 L162 385 L162 378 L146 378 L145 367 C131 360 125 345 125 329 L124 290 C124 269 131 260 146 254 L146 246 L157 244 L157 235 L162 232 Z",period:14.5,offset:0,amplitude:.04},{id:"right",rect:[618,205,104,196],pivot:[669,214],path:"M667 214 L671 214 L671 222 L675 225 L677 233 L689 233 L690 244 C708 251 711 267 711 284 L711 326 C711 345 706 357 691 360 L686 362 L686 372 L673 374 L673 390 L669 395 L666 392 L668 374 L653 373 L652 362 C638 357 632 345 632 328 L632 280 C632 260 640 250 653 243 L653 234 L663 232 L664 225 L667 222 Z",period:17.7,offset:2.2,amplitude:.035}],hx=[{id:"table",rect:[471,553,9,12],pivot:[475.5,565]},{id:"shelf-low",rect:[368,544,8,11],pivot:[372,555]},{id:"shelf-high",rect:[366,452,10,13],pivot:[371,465]},{id:"shelf-high-left",rect:[353,452,8,12],pivot:[357,464]},{id:"wall",rect:[578,439,10,16],pivot:[583,455]}],yi=(e,t)=>Object.assign(document.createElement("canvas"),{width:e,height:t})});function hu({THREE:e,parent:t}){let i=[],r=[],a=`
    varying vec2 mistUv;
    void main() {
      mistUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,n=`
    uniform float clock, seed, density;
    uniform vec3 cold, warm;
    varying vec2 mistUv;
    float hashNoise(vec2 point) {
      return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 point) {
      vec2 cell = floor(point), fraction = fract(point);
      fraction = fraction * fraction * fraction * (fraction * (fraction * 6.0 - 15.0) + 10.0);
      return mix(mix(hashNoise(cell), hashNoise(cell + vec2(1.0, 0.0)), fraction.x),
        mix(hashNoise(cell + vec2(0.0, 1.0)), hashNoise(cell + vec2(1.0, 1.0)), fraction.x), fraction.y);
    }
    float cloud(vec2 point) {
      return noise(point) * .54 + noise(point * 2.03 + 7.2) * .27 + noise(point * 4.13 + 19.1) * .13 + noise(point * 8.37) * .06;
    }
    void main() {
      vec2 position = mistUv * vec2(5.8, 3.1);
      position.x -= clock * .085 - seed;
      position.y += sin(position.x * .9 + clock * .055 + seed) * .18;
      float turbulence = cloud(position + cloud(position * .73 + clock * .023));
      float envelope = smoothstep(0.0, .18, mistUv.y) * (1.0 - smoothstep(.35, 1.0, mistUv.y));
      envelope *= smoothstep(0.0, .09, mistUv.x) * (1.0 - smoothstep(.91, 1.0, mistUv.x));
      float wisp = smoothstep(.29, .79, turbulence);
      vec3 tint = mix(warm, cold, smoothstep(.28, .76, mistUv.x));
      gl_FragColor = vec4(tint, envelope * wisp * density);
      #include <colorspace_fragment>
    }
  `;for(let[s,o,l,c,h,d,u]of[[0,1900,400,768,220,18,.22],[1,2e3,380,768,87,160,.19],[2,740,360,210,175,175,.16],[3,950,920,1230,570,80,.12],[4,530,530,430,450,85,.1]]){let p=new e.PlaneGeometry(o,l),v=new e.ShaderMaterial({uniforms:{clock:{value:0},seed:{value:s*8.37},density:{value:u},cold:{value:new e.Color(s===4?"#9b7653":"#6a9cbf")},warm:{value:new e.Color(s===3?"#648baf":"#b09579")}},vertexShader:a,fragmentShader:n,transparent:!0,depthWrite:!1,toneMapped:!1}),g=new e.Mesh(p,v);g.position.set(c,h,d),g.renderOrder=11+s,t.add(g),r.push(g),i.push(p,v)}return{setViewport:s=>r.forEach(o=>{o.visible=!s}),update:s=>r.forEach(o=>{o.material.uniforms.clock.value=s}),snapshot:()=>({layers:r.length,animated:!0,viewport:r.every(s=>!s.visible)}),dispose:()=>{r.forEach(s=>t.remove(s)),i.forEach(s=>s.dispose())}}}var uu=Ot(()=>{});function Rn(e=97402971){let t=e>>>0,i=0,r=745,a=778,n=1,s=!0,o=[],l=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296),c=(_,M)=>An(_,M,l());function h(_,M,y={}){let T={mode:_,start:i,duration:M,fromX:r,toX:r,fromY:a,toY:a,facing:n,nextFacing:n,rate:c(.83,1.07),...y};o.push(T),i+=M,r=T.toX,a=T.toY,n=T.nextFacing}function d(){s&&(h("stand",1.5),s=!1)}function u(_){n!==_&&h("turn",c(1.2,1.8),{nextFacing:_})}function p(_){d(),u(_>r?1:-1),Math.abs(_-r)>5&&h("walk",Math.abs(_-r)/c(34,43),{toX:_})}function v(_){h("sit-down",1.5),s=!0,h(a===707?"perch":"sit",_)}function g(_){_==="crate"?(p(1167),h("look",c(1.8,4.2)),h("crouch",.65),h("jump",.72,{toX:1268,toY:707}),h("land",.55),v(c(22,46))):_==="bowl"?(p(745),u(1),h("drink",c(9,19)),v(c(10,25))):(p(_==="left"?c(340,555):c(890,1110)),h("look",c(2.5,7)),v(c(14,39)))}h("sit",c(10,22)),d(),h("drink",c(8,15)),g("left"),g("crate");function m(_){for(;i<_+120;){a===707&&(d(),u(-1),h("crouch",.5),h("jump-down",.66,{toX:1154,toY:778}),h("land",.55));let M=l();g(M<.28?"bowl":M<.54?"left":M<.78?"right":"crate")}}function f(_,M=-100){let y=Math.max(0,_);m(y);let T=o.find(U=>y>=U.start&&y<U.start+U.duration),E=du((y-T.start)/T.duration),C=y-T.start,x={mode:T.mode,x:T.fromX,screenY:T.fromY,surfaceY:T.fromY,facing:T.facing,clip:"Idle",clipTime:C*T.rate%2,blend:1,previousClip:null,previousTime:0,progress:E,greeting:0,jump:0,crouch:0,pitch:0,drink:0,frontContact:!1,rearContact:!1};if((T.mode==="sit"||T.mode==="perch")&&(x.clip="SittingIdle"),(T.mode==="stand"||T.mode==="sit-down")&&(x.clip=T.mode==="stand"?"StandUp":"SitDown",x.clipTime=C),T.mode==="turn"&&(x.facing=An(T.facing,T.nextFacing,Ji(E)),x.clip="WalkClean",x.clipTime=C*.45%(4/3)),T.mode==="walk"){let U=Math.min(.08,.35/T.duration),B=(E<U?E*E/(2*U):E>1-U?1-U-(1-E)**2/(2*U):E-U/2)/(1-U);x.x=An(T.fromX,T.toX,B),x.clip="WalkClean",x.clipTime=Math.abs(x.x-T.fromX)/45*(4/3)%(4/3),x.blend=Math.min(Ji(C/.25),Ji((T.duration-C)/.25)),x.previousClip="Idle"}if(T.mode==="drink"&&(x.drink=Ji(C/1.4)*Ji((T.duration-C)/1.5)),T.mode==="crouch"&&(x.clip="SitDown",x.clipTime=.65*Ji(E),x.crouch=Ji(E)),T.mode==="jump"||T.mode==="jump-down"){let U=T.fromY-T.toY,R=T.mode==="jump"?42:43;x.x=An(T.fromX,T.toX,E),x.screenY=T.fromY-U*E-R*4*E*(1-E),x.surfaceY=x.x>=1228?707:778,x.clipTime=0,x.jump=Math.sin(E*Math.PI),x.pitch=T.mode==="jump"?.27*Math.sin(E*Math.PI*2):-.12*Math.sin(E*Math.PI),x.blend=Ji(C/.15),x.previousClip="SitDown",x.previousTime=.65,x.frontContact=E>.94}T.mode==="land"&&(x.clip="SitDown",x.clipTime=.48*Math.sin(E*Math.PI),x.frontContact=!0,x.rearContact=E>.28,x.crouch=Math.sin(E*Math.PI),x.pitch=-.1*Math.sin(E*Math.PI));let w=y-M;return w>=0&&w<2.4&&!T.mode.includes("jump")&&(x.greeting=Math.sin(w/2.4*Math.PI)),x}return m(0),{poseAt:f,plan:()=>o.map(_=>({..._})),seed:e}}var du,Ji,An,oS,pu=Ot(()=>{du=e=>Math.max(0,Math.min(1,e)),Ji=e=>{let t=du(e);return t*t*(3-2*t)},An=(e,t,i)=>e+(t-e)*i;oS=Rn()});function fu(e,t){let i=t.scene,r=t.animations[0].tracks.filter(_=>_.name.endsWith(".quaternion")).map(_=>_.name.slice(0,-11)),a=new Map(r.map(_=>[_.replace(/_\d+$/,""),i.getObjectByName(_)])),n=[...a.values()].filter(Boolean).map(_=>({node:_,position:_.position.clone(),rotation:_.quaternion.clone()})),s=new e.Vector3,o=new e.Vector3,l=new e.Quaternion,c=new e.Vector3,h=new e.Vector3,d=new e.Vector3,u=new e.Quaternion,p=new e.Quaternion,v=["PawL","PawR","FootL","FootR"].map(_=>{let M=a.get(_),y=i.worldToLocal(M.getWorldPosition(new e.Vector3)),T=_.startsWith("Paw"),E=_.endsWith("L")?"L":"R",C=(T?["UpperArm","Arm"]:["Hip","Thigh","Heel"]).map(w=>a.get(w+E)),x=i.getObjectByName((T?"Arm":"Heel")+E+"_end");return{node:M,rest:y,front:T,chain:C,end:x}});function g(_,M){_.getWorldQuaternion(p),_.parent.getWorldQuaternion(u).invert(),_.quaternion.copy(u).multiply(M).multiply(p),_.updateWorldMatrix(!1,!0)}function m(_,M){M&&(i.getWorldQuaternion(l),o.set(1,0,0).applyQuaternion(l),g(a.get(_),l.setFromAxisAngle(o,M)))}function f(_,M,y){for(let T=0;T<5;T++)for(let E=_.length-1;E>=0;E--){let C=_[E];C.getWorldPosition(d),M.getWorldPosition(c),c.sub(d).normalize(),h.copy(y).sub(d).normalize(),l.setFromUnitVectors(c,h),g(C,l)}}return{restore(){for(let _ of n)_.node.position.copy(_.position),_.node.quaternion.copy(_.rotation)},apply(_,M){for(let T of n)T.position.copy(T.node.position),T.rotation.copy(T.node.quaternion);if(i.updateWorldMatrix(!0,!0),m("UpperSpine",-.43*_.drink),m("Neck",-.36*_.drink-_.pitch*.5),m("Head",-.24*_.drink+_.drink*Math.sin(M*7.4)*.018),m("TailBase",-.4*_.jump-.16*_.drink),m("TailBaseMiddle",.2*_.jump),a.get("TailBase").scale.set(.48,.72,.48),a.get("TailBase").updateWorldMatrix(!1,!0),_.jump>0||_.drink>0||_.mode==="land"||_.mode==="crouch")for(let T of v){s.copy(T.rest),_.jump>0&&(s.y+=_.jump*(T.front?72:95),s.z+=_.jump*(T.front?-65:-25));let E=i.localToWorld(s.clone());_.frontContact&&T.front&&(E.y=Math.max(E.y,1024-_.surfaceY+2.8)),_.mode==="land"&&(E.y=1024-_.surfaceY+2.8+(!T.front&&!_.rearContact?(1-_.progress/.28)*9:0)),f(T.chain,T.end,E),T.node.position.copy(T.node.parent.worldToLocal(E.clone())),T.node.updateWorldMatrix(!1,!0)}},contacts(){return v.map(_=>({front:_.front,point:_.node.getWorldPosition(new e.Vector3).toArray()}))}}}var mu=Ot(()=>{});function gu(e,t,i=97402971){let r=new e.Group;r.name="BlackStreetCat";let a=new e.Group;r.add(a),a.add(t.scene);let n=new e.AnimationMixer(t.scene),s=new Map(t.animations.map(f=>[f.name,n.clipAction(f).play()]));for(let f of s.values())f.setEffectiveWeight(0);s.get("Idle").setEffectiveWeight(1),n.update(0),t.scene.updateMatrixWorld(!0);let o=new e.Box3,l=new e.Vector3,c=0;t.scene.traverse(f=>{if(f.isBone&&c++,!!f.isMesh){f.skeleton?.update(),f.renderOrder=8,f.frustumCulled=!1,f.castShadow=!0,f.layers.enable(1);for(let _=0;_<f.geometry.attributes.position.count;_++)f.getVertexPosition(_,l).applyMatrix4(f.matrixWorld),o.expandByPoint(l)}});let h=100/(o.max.y-o.min.y);t.scene.scale.setScalar(h),t.scene.position.y=-o.min.y*h;let d=fu(e,t),u=Rn(i),p=-100,v=0,g=u.poseAt(0);function m(f){v=f,g=u.poseAt(f,p),d.restore();for(let M of s.values())M.setEffectiveWeight(0);let _=s.get(g.clip);if(_.time=Math.min(_.getClip().duration-1e-4,g.clipTime),_.setEffectiveWeight(g.blend),g.previousClip&&g.blend<1){let M=s.get(g.previousClip);M.time=g.previousTime,M.setEffectiveWeight(1-g.blend)}n.update(0),r.position.set(g.x,1024-g.screenY,105),a.rotation.y=-Math.PI/2+Math.PI*(1-g.facing)/2+g.greeting*.16,r.rotation.z=g.pitch*g.facing,r.updateWorldMatrix(!0,!0),d.apply(g,f)}return m(0),{root:r,update:m,pose:()=>g,greet:()=>{p=v},setSeed:f=>{u=Rn(f),p=-100,m(0)},snapshot:()=>({...g,joints:c,model:"authored-gltf",author:"DreamNoms",clips:[...s.keys()],jumpReady:!0,coat:"black-short-fur",tailScale:[.48,.72,.48],seed:u.seed,plan:u.plan(),contacts:d.contacts()}),dispose:()=>{n.stopAllAction(),n.uncacheRoot(t.scene)}}}var vu=Ot(()=>{pu();mu()});async function _u({THREE:e,parent:t}){let i=new e.GLTFLoader,r=async()=>{if(!("DecompressionStream"in globalThis))return i.loadAsync(new URL("./models/black-cat-runtime.glb",import.meta.url).href);let f=await fetch(new URL("./models/black-cat-runtime.glb.gz",import.meta.url));if(!f.ok)throw new Error("Cat model unavailable");let _=await f.arrayBuffer(),M=new Uint8Array(_,0,2),y=M[0]===31&&M[1]===139?await new Response(new Blob([_]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer():_;return i.parseAsync(y,"")},[a,n]=await Promise.all([r(),new e.TextureLoader().loadAsync(new URL("./models/black-shorthair-fur.webp",import.meta.url).href)]);n.colorSpace=e.SRGBColorSpace,n.flipY=!1,n.anisotropy=8;let s=new Set;a.scene.traverse(f=>{f.isMesh&&(s.add(f.material),f.material=new e.MeshPhysicalMaterial({map:n,color:11974588,roughness:.84,metalness:0,sheen:.65,sheenColor:7041402,sheenRoughness:.86}),f.name.startsWith("Eye")&&(f.material.dispose(),f.material=new e.MeshPhysicalMaterial({color:6910796,roughness:.22,clearcoat:1,clearcoatRoughness:.12}),f.material.onBeforeCompile=_=>{_.vertexShader=`varying vec3 eyePosition;
`+_.vertexShader,_.vertexShader=_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
eyePosition = position / .12;`),_.fragmentShader=`varying vec3 eyePosition;
`+_.fragmentShader,_.fragmentShader=_.fragmentShader.replace("#include <color_fragment>",`
          #include <color_fragment>
          float irisRadius = length(eyePosition.xy);
          float pupil = 1.0-smoothstep(.67,.76,length(eyePosition.xy*vec2(4.2,1.1)));
          float fibers = .9+.1*sin(atan(eyePosition.y,eyePosition.x)*73.0+irisRadius*18.0);
          diffuseColor.rgb = mix(vec3(.13,.16,.07)*fibers,vec3(.002,.003,.003),pupil);
          diffuseColor.rgb *= 1.0-smoothstep(.72,1.0,irisRadius)*.8;
        `)}))});for(let f of s)f.map?.dispose(),f.dispose();let o=new Uint32Array(1);crypto.getRandomValues(o);let l=gu(e,a,o[0]);t.add(l.root);let c=Object.assign(document.createElement("canvas"),{width:128,height:64}),h=c.getContext("2d");h.scale(1,.5);let d=h.createRadialGradient(64,64,0,64,64,60);d.addColorStop(0,"rgba(0,0,0,.65)"),d.addColorStop(.45,"rgba(0,0,0,.28)"),d.addColorStop(1,"rgba(0,0,0,0)"),h.fillStyle=d,h.fillRect(0,0,128,128);let u=new e.CanvasTexture(c),p=new e.MeshBasicMaterial({map:u,transparent:!0,depthWrite:!1,toneMapped:!1}),v=new e.PlaneGeometry(108,20),g=new e.Mesh(v,p);g.renderOrder=7,t.add(g);function m(f){l.update(f);let _=l.pose(),M=Math.max(0,_.surfaceY-_.screenY);g.position.set(_.x,1024-_.surfaceY-1,30);let y=_.mode==="sit"||_.mode==="perch";g.scale.set((y?.6:1)+M*.002,1+M*.004,1),p.opacity=.85/(1+M*.025)}return m(0),{setVisible:f=>{l.root.visible=f,g.visible=f},update:m,root:l.root,pose:l.pose,greet:l.greet,setSeed:l.setSeed,snapshot:l.snapshot,dispose(){l.dispose(),t.remove(l.root,g);let f=new Set([u,p,v]);a.scene.traverse(_=>{if(_.isMesh){f.add(_.geometry),f.add(_.material);for(let M of Object.values(_.material))M?.isTexture&&f.add(M);_.skeleton?.dispose()}}),f.forEach(_=>_.dispose())}}}var xu=Ot(()=>{vu()});function px(e,t,i=Zo[0]){let a=(e%i.cycle+i.cycle)%i.cycle-i.starts[t],n=Math.sqrt(2*(i.target.y-i.source.y)/Cn),s=a-n;return{falling:a>=0&&a<n,y:Math.min(i.target.y,i.source.y+.5*Cn*Math.max(0,a)**2),speed:Cn*Math.max(0,a),impactAge:s,ripple:s>=0&&s<.85}}function Su({THREE:e,parent:t}){let i=new e.Group;i.name="GutterAndBowl",t.add(i);let r=[],a=new e.CatmullRomCurve3([new e.Vector3(728,827,10),new e.Vector3(754,826,10),new e.Vector3(775,823,10),new e.Vector3(786,815,12),new e.Vector3(790,798,15)]),n=new e.TubeGeometry(a,48,4.4,20,!1),s=new e.MeshStandardMaterial({color:3750708,roughness:.65,metalness:.68,side:e.DoubleSide});s.onBeforeCompile=p=>{p.fragmentShader=p.fragmentShader.replace("#include <color_fragment>",`
      #include <color_fragment>
      float oxidation = fract(sin(dot(floor(vViewPosition * 1.3), vec3(12.9898,78.233,44.137))) * 43758.5453);
      diffuseColor.rgb *= .72 + oxidation * .45;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.035,.052,.043), smoothstep(.82,.98,oxidation) * .32);
    `)};let o=new e.Mesh(n,s);o.renderOrder=2,i.add(o),r.push(n,s);let l=new e.TubeGeometry(a,48,3.4,20,!1),c=new e.MeshStandardMaterial({color:1186844,roughness:.9,side:e.DoubleSide}),h=new e.Mesh(l,c);h.renderOrder=2,i.add(h),r.push(l,c);for(let p of[.1,.53,1]){let v=new e.TorusGeometry(p===1?3.9:4.5,p===1?.52:.68,8,24),g=new e.Mesh(v,s);g.position.copy(a.getPointAt(p)),g.quaternion.setFromUnitVectors(new e.Vector3(0,0,1),a.getTangentAt(p)),g.renderOrder=3,i.add(g),r.push(v)}let d=Zo.flatMap(p=>p.starts.map((v,g)=>{let m=new e.SphereGeometry(.8,12,12),f=new e.MeshStandardMaterial({color:12113630,roughness:.12,metalness:.35,transparent:!0,opacity:.64,depthWrite:!1}),_=new e.Mesh(m,f);_.renderOrder=3,i.add(_);let M=new e.RingGeometry(.86,1,48),y=new e.MeshBasicMaterial({color:10863566,transparent:!0,opacity:0,depthWrite:!1}),T=new e.Mesh(M,y);T.position.set(p.target.x,1024-p.target.y,22),T.renderOrder=7,i.add(T);let E=new e.SphereGeometry(.65,6,6),C=new e.Mesh(E,f);return C.renderOrder=7,i.add(C),r.push(m,f,M,y,E),{mesh:_,ring:T,splash:C,emitter:p,index:g}})),u=0;return{update(p){u=p,d.forEach(({mesh:v,ring:g,splash:m,emitter:f,index:_})=>{let M=px(p,_,f);v.visible=M.falling,v.position.set(f.source.x+Math.sin(_*2.4)*.5,1024-M.y,16),v.scale.set(.8,1+Math.min(1.8,M.speed*.0012),.75),g.visible=M.ripple;let y=Math.max(0,M.impactAge)/.85,T=1+y*17;g.scale.set(T,T*.23,1),g.material.opacity=.52*(1-Math.min(1,y))**1.5,m.visible=M.impactAge>=0&&M.impactAge<.19,m.position.set(f.target.x+_-1,1024-f.target.y+Math.sin(Math.max(0,M.impactAge)/.19*Math.PI)*3,23)})},snapshot:()=>({dropsPerCycle:Mu.length,cycle:7.4,emitters:Zo.map(p=>({id:p.id,source:p.source,target:p.target,cycle:p.cycle})),active:d.filter(p=>p.mesh.visible).length,clock:u,source:Jo,bowl:$o}),dispose(){t.remove(i),r.forEach(p=>p.dispose())}}}var Mu,Jo,$o,Zo,Cn,mS,yu=Ot(()=>{Mu=[.8,1.16,1.72],Jo={x:790,y:226},$o={x:790,y:754},Zo=[{id:"bowl",source:Jo,target:$o,starts:Mu,cycle:7.4},{id:"left-eave",source:{x:211,y:219},target:{x:211,y:778},starts:[2.3,2.75],cycle:13.1},{id:"magic-eave",source:{x:598,y:221},target:{x:598,y:773},starts:[5.1],cycle:10.7},{id:"hub-pipe",source:{x:1094,y:327},target:{x:1094,y:779},starts:[3.7,4.18],cycle:16.4},{id:"right-cable",source:{x:1484,y:303},target:{x:1484,y:810},starts:[8.2],cycle:19.3}],Cn=1580,mS=Math.sqrt(2*($o.y-Jo.y)/Cn)});function bu({THREE:e,parent:t,texture:i}){let r=new e.PlaneGeometry(1900,1400),a={name:"WetCobblestoneReflection",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null},street:{value:i},clock:{value:0},catPosition:{value:new e.Vector2}},vertexShader:`
      uniform mat4 textureMatrix;
      varying vec4 reflectionUv;
      varying vec3 surfaceWorld;
      void main() {
        reflectionUv = textureMatrix * vec4(position, 1.0);
        surfaceWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
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
    `},n=new e.Reflector(r,{textureWidth:1536,textureHeight:1024,multisample:0,shader:a});n.name="PuddleCatReflection",n.position.set(768,Qo.height,Qo.depth),n.rotation.x=Qo.tilt,n.material.transparent=!0,n.material.depthWrite=!1,n.material.toneMapped=!1,n.renderOrder=2,t.add(n);let s=n.onBeforeRender,o=new e.Color;n.onBeforeRender=function(u,p,v){this._getReflectionCamera(v).layers.set(1),u.getClearColor(o);let g=u.getClearAlpha();u.setClearColor(0,0);try{s.call(this,u,p,v)}finally{u.setClearColor(o,g)}};let l=new e.ShadowMaterial({color:263953,opacity:.38,depthWrite:!1}),c=new e.Mesh(r,l);c.name="CatCastShadowReceiver",c.position.copy(n.position),c.rotation.copy(n.rotation),c.receiveShadow=!0,c.renderOrder=3,t.add(c);let h=new e.DirectionalLight(16765866,1.5);h.position.set(350,900,-100),h.target.position.set(780,250,105),h.castShadow=!0,Object.assign(h.shadow.camera,{left:-850,right:850,top:500,bottom:-500,near:1,far:1800}),h.shadow.mapSize.set(2048,1024),h.shadow.bias=-3e-4,h.shadow.normalBias=.6,h.shadow.radius=3,h.layers.enable(1),t.add(h,h.target);let d=0;return{setVisible(u){n.visible=u,c.visible=u},update(u,p){d=u,n.material.uniforms.clock.value=u,n.material.uniforms.catPosition.value.set(p?.x??768,p?.surfaceY??778),h.intensity=1.5*(1+Math.sin(u*5.3)*.035)},snapshot:()=>({reflection:"planar-skinned-mesh",shadows:"pcf-cast-and-contact",waterOnly:!0,textureSize:[1536,1024],clock:d}),dispose(){t.remove(n,c,h,h.target),n.dispose(),l.dispose(),r.dispose(),h.shadow.dispose()}}}var Qo,Tu=Ot(()=>{Qo=Object.freeze({height:246,depth:105,tilt:-Math.asin(.85)})});var wu={};Pn(wu,{createLivingScene:()=>fx});async function fx({THREE:e,scene:t,image:i,material:r,originalTexture:a,cleanPlate:n,pavementPlate:s,foliageAtlas:o,foliagePlate:l,curtainAtlas:c,clothPlate:h,preparedAssets:d}){let p=[],v=d||ou(i,n,s,o,l,c,h),g=new e.Group;g.name="LivingProps",g.visible=!1,t.add(g);let m=J=>{let Re=new e.CanvasTexture(J);return Re.colorSpace=e.SRGBColorSpace,Re.generateMipmaps=!1,Re.minFilter=Re.magFilter=e.LinearFilter,p.push(Re),Re},f=m(v.clean),_={value:0},M=r.onBeforeCompile,y=[...v.lanterns,...v.flames,...v.foliage,...v.curtains].map(J=>J.rect);v.catRemoved&&y.push(...jo),s&&y.push(qo),y.push(...Yo,Ko),r.onBeforeCompile=J=>{M(J),J.uniforms.uCleanMap={value:f},J.uniforms.uCleanActive=_,J.fragmentShader=`
      uniform sampler2D uCleanMap;
      uniform float uCleanActive;
      float cleanRegion(vec2 point,vec4 bounds){
        return step(bounds.x,point.x)*step(bounds.y,point.y)
          *(1.0-step(bounds.x+bounds.z,point.x))*(1.0-step(bounds.y+bounds.w,point.y));
      }
    `+J.fragmentShader;let Re=y.map(_e=>`cleanRegion(cleanPoint,vec4(${_e.map(Ye=>Number(Ye).toFixed(1)).join(",")}))`).join("+");J.fragmentShader=J.fragmentShader.replace("#include <map_fragment>",`
      #include <map_fragment>
      vec2 cleanPoint=vec2(vMapUv.x*1536.0,(1.0-vMapUv.y)*1024.0);
      float cleanMask=clamp(${Re},0.0,1.0)*uCleanActive;
      if(cleanMask>.5)diffuseColor=texture2D(uCleanMap,vMapUv);
    `)};function T(J,Re){let[_e,Ye,$e,pt]=J.rect,[it,ot]=J.pivot,D=new e.Group;D.position.set(it,1024-ot,Re),g.add(D);let mt=new e.PlaneGeometry($e,pt),we=new e.MeshBasicMaterial({map:m(J.texture),transparent:!0,depthWrite:!1,toneMapped:!1}),Xe=new e.Mesh(mt,we);return Xe.position.set(_e+$e/2-it,ot-Ye-pt/2,0),Xe.renderOrder=5,D.add(Xe),p.push(mt,we),{...J,pivot:D,mesh:Xe,hoveredAt:-100}}let E=v.lanterns.map(J=>T(J,.12)),C=v.flames.map(J=>T(J,.14)),x=au({THREE:e,parent:g,prepared:v.foliage,texture:m}),w=su({THREE:e,parent:g,prepared:v.curtains,texture:m}),U=hu({THREE:e,parent:g}),R=Su({THREE:e,parent:g}),B=null,j=null,O=null,H=null,W=!1;function k(){return v.catRemoved?(j||(j=_u({THREE:e,parent:g}).then(J=>{if(W){J.dispose();return}B=J,H!==null&&B.setSeed(H),B.update(Z)}).catch(J=>{O=J.message})),j):Promise.resolve()}let ee=bu({THREE:e,parent:g,texture:f}),te=new e.HemisphereLight(10398659,3089441,1.3),ne=new e.PointLight(16757878,24e4,1400,2);ne.position.set(360,550,260);let ce=new e.PointLight(7913471,27e4,1400,2);ce.position.set(1110,650,300);let Se=new e.DirectionalLight(9414331,1.5);Se.position.set(-100,700,-120);let De=new e.PointLight(15042284,18e3,380,2);De.position.set(1164,413,110),g.add(te,ne,ce,Se,De);for(let J of[te,ne,ce,Se,De])J.layers.enable(1);let Oe=!1,Z=0;function le(J){if(Oe=!!J,g.visible=Oe,_.value=Oe?1:0,!Oe)for(let Re of E)Re.pivot.rotation.z=0}function ge(J){if(Z=J,!Oe)return;x.update(J),w.update(J),U.update(J),R.update(J),B?.update(J),ee.update(J,B?.pose()),ne.intensity=24e4*(1+Math.sin(J*5.3)*.085+Math.sin(J*12.7)*.035);let Re=Ca(J);ce.intensity=27e4*(.78+Re[1]*.22),De.intensity=18e3*Re[5];for(let _e of E){_e.pivot.rotation.z=-lu(_e,J,_e.hoveredAt);let Ye=1+.08*Math.sin(J*1.7+_e.offset)+.035*Math.sin(J*6.9+_e.offset*3);_e.mesh.material.color.setRGB(Ye,Ye,Ye)}for(let _e=0;_e<C.length;_e++){let Ye=C[_e];Ye.pivot.rotation.z=.12*Math.sin(J*5.2+_e*1.7)+.065*Math.sin(J*11.1+_e),Ye.pivot.scale.set(1+.15*Math.sin(J*7.1+_e),1+.22*Math.sin(J*8.7+_e*2),1);let $e=1+.18*Math.sin(J*9.3+_e*.8)+.06*Math.sin(J*17.1+_e);Ye.mesh.material.color.setRGB($e,$e,$e)}}function pe(J){let Re=E.find(_e=>_e.id===J);Re&&(Re.hoveredAt=Z)}function Ae(){return{enabled:Oe,clock:Z,prepared:!0,lanterns:E.map(J=>({id:J.id,angle:J.pivot.rotation.z,pivot:[...J.pivot.position],rect:J.rect})),flames:C.length,rainCount:0,foliage:x.snapshot(),curtains:w.snapshot(),gutter:R.snapshot(),atmosphere:U.snapshot(),pavement:ee.snapshot(),cat:B?.snapshot()||{model:O?"unavailable":"loading",error:O}}}function Ie(){W=!0,B?.dispose(),ee.dispose(),x.dispose(),w.dispose(),R.dispose(),U.dispose(),t.remove(g);for(let J of p)J.dispose()}return{enable:le,update:ge,react:pe,snapshot:Ae,dispose:Ie,prepared:v,loadCat:k,setPortrait:x.setPortrait,setViewportMist:U.setViewport,setCatVisible:J=>B?.setVisible(J),greet:()=>B?.greet(),catPose:()=>B?.pose(),setCatSeed:J=>{H=J,B?.setSeed(J)},setSurfaceVisible:J=>ee.setVisible(J)}}var Eu=Ot(()=>{cu();Wo();uu();xu();Xo();yu();Tu();In()});var Au={};Pn(Au,{createViewportMist:()=>mx});function mx({THREE:e,stage:t}){let i=document.createElement("canvas");i.className="viewport-mist",i.setAttribute("aria-hidden","true"),t.append(i);let r=new e.WebGLRenderer({canvas:i,alpha:!0,antialias:!1,powerPreference:"low-power"});r.setClearColor(0,0),r.outputColorSpace=e.SRGBColorSpace;let a=new e.Scene,n=new e.OrthographicCamera(-1,1,1,-1,.1,10);n.position.z=1;let s=new e.PlaneGeometry(2,2),o={clock:{value:0},viewport:{value:new e.Vector2(1,1)},artOrigin:{value:new e.Vector2},artScale:{value:1}},l=new e.ShaderMaterial({transparent:!0,depthWrite:!1,uniforms:o,vertexShader:"varying vec2 screenUv; void main() { screenUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
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
    `});a.add(new e.Mesh(s,l));let c=-1,h=!1;return{layout(d,u,p){let v=Math.min(1,960/d,1120/u,Math.sqrt(65e4/(d*u)));r.setSize(Math.round(d*v),Math.round(u*v),!1),o.viewport.value.set(d,u),o.artOrigin.value.set(p.left-p.artWidth/2,p.top-p.artHeight/2),o.artScale.value=p.scale,c=-1},enable(d){h=d,i.hidden=!d,c=-1},update(d,u=!1){!h||!u&&Math.abs(d-c)<.029||(c=d,o.clock.value=d,r.render(a,n))},dispose(){s.dispose(),l.dispose(),r.dispose(),i.remove()}}}var Ru=Ot(()=>{});async function ll(){let e=async n=>{let s=new Image;return s.decoding="async",s.src=new URL(n,import.meta.url).href,await s.decode(),s},[t,i,r]=await Promise.all([e("./scene-base-v8.webp"),e("./scene-props-v8.webp"),fetch(new URL("./scene-props-v8.json",import.meta.url)).then(n=>{if(!n.ok)throw new Error("Scene manifest unavailable");return n.json()})]),a={clean:t,catRemoved:!0};for(let n of["lanterns","flames","foliage","curtains"])a[n]=r[n].map(s=>{let o=document.createElement("canvas");return o.width=s.rect[2],o.height=s.rect[3],o.getContext("2d").drawImage(i,...s.packed,0,0,o.width,o.height),{...s,texture:o}});return a}function cl(e,t,i="full"){let r=e<=760&&i!=="full",a=(r?Math.max:Math.min)(e/1536,t/1024),n=1536*a,s=1024*a,o=r?i==="magic"?420:1130:768;r&&(o=Math.max(e/a/2,Math.min(1536-e/a/2,o)));let l=e/t>=1.5;return{scale:a,artWidth:n,artHeight:s,left:e/2+(768-o)*a,top:t/2,close:r,horizontal:l,surroundWidth:l?n*2:n,surroundHeight:l?s:n*2.25,feather:r||Math.abs(e/t-1.5)<.002?0:l?Math.min(6,a*8):Math.min(32,a*40)}}var hl=`
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
`;In();var pl=`
  uniform sampler2D uEnvironment;
  uniform vec4 uEnvironmentTransform;
  vec3 environmentColor(vec2 sourceUv) {
    return texture2D(uEnvironment,sourceUv*uEnvironmentTransform.xy+uEnvironmentTransform.zw).rgb;
  }
  vec3 streetColor(vec2 sourceUv) {
    vec3 source=texture2D(uCleanMap,sourceUv).rgb;
    return mix(source,environmentColor(sourceUv),smoothstep(795.0,831.0,(1.0-sourceUv.y)*1024.0));
  }
`;function Nn(e){return e?[.5,1,.25-15/1086,0]:[1,1024/3456,0,1-(2240-1536*42/836)/3456]}var Cu=document.getElementById("gateway-experience");Cu&&gx(Cu);function gx(e){let r="living-street-8",a=matchMedia("(prefers-reduced-motion: reduce)"),n=matchMedia("(max-width: 760px)"),s=Object.freeze({magic:{x:300,y:452,w:296,h:283,label:"Magic Shop"},software:{x:901,y:363,w:152,h:374,label:"Software Hub"}}),o={mode:"reference",view:"full",renderer:"loading",hover:null,magic:0,software:0,frame:0,last:0,entering:null,timer:0,disposed:!1,width:0,height:0,reason:null},l,c,h,d,u,p,v,g,m,f,_=0,M=null,y=null,T=null,E=0,C=0,x=new URLSearchParams(location.search).has("bake"),w={started:performance.now(),firstLive:null,catReady:null},U=new Map,R=null;async function B(N){if(!l)return;let z=N?"wide":"portrait";R=z,U.has(z)||U.set(z,new l.TextureLoader().loadAsync(new URL(`./street-environment-${z}.webp`,import.meta.url).href).then(Q=>(Q.colorSpace=l.SRGBColorSpace,Q.generateMipmaps=!1,Q.minFilter=Q.magFilter=l.LinearFilter,O.push(Q),Q)));let Y=await U.get(z);o.disposed||R!==z||(W.uEnvironment.value=Y,W.uEnvironmentTransform.value=Nn(N),e.dataset.environment=z,g?.setPortrait(!N),we())}let j=[],O=[],H=[],W={uEnvironment:{value:null},uEnvironmentTransform:{value:Nn(!0)},uNeonA:{value:[1,1,1,1]},uNeonB:{value:[1,1,1,1]},uClock:{value:0},uLive:{value:0},uMagic:{value:0},uSoftware:{value:0}},k=(N,z,Y,Q)=>{N.addEventListener(z,Y,Q),H.push(()=>N.removeEventListener(z,Y,Q))},ee=(N,z)=>{let Y=document.createElement(N);return Y.className=z,Y},te=e.querySelector("#gateway-still"),ne=e.querySelector("#gateway-webgl");if(!te||!ne)return;te.removeAttribute("aria-hidden"),te.style.cssText="",ne.className="",ne.style.cssText="";let ce=ee("div","reference-stage"),Se=ee("div","reference-surround");Se.setAttribute("aria-hidden","true");let De=ee("div","reference-art");De.id="reference-art";let Oe=ee("div","gateway-hotspots");Oe.setAttribute("aria-label","Enter a shop");for(let[N,z]of Object.entries(s)){let Y=ee("a",`gateway-door gateway-door--${N}`);Y.href=`#/${N}`,Y.dataset.gatewayDoor=N,Y.setAttribute("aria-label",`Enter ${z.label}`),Object.assign(Y.style,{left:`${z.x/1536*100}%`,top:`${z.y/1024*100}%`,width:`${z.w/1536*100}%`,height:`${z.h/1024*100}%`}),Oe.append(Y)}let Z=ee("div","reference-transition");Z.setAttribute("aria-hidden","true"),De.append(te,ne,Oe),ce.append(Se,De,Z);let le=ee("h1","reference-mobile-heading");le.innerHTML="Find your doorway.<span>Magic and software. Same curious mind.</span>";let ge=ee("div","reference-views");ge.setAttribute("role","group"),ge.setAttribute("aria-label","Street framing"),ge.innerHTML='<button type="button" data-view="full" aria-pressed="true">Full street</button><button type="button" data-view="magic" aria-pressed="false">Magic view</button><button type="button" data-view="software" aria-pressed="false">Software view</button>';let pe=ee("div","reference-controls"),Ae=ee("div","reference-note");Ae.innerHTML='Two worlds. One curious mind.<details class="scene-credits"><summary>Scene credits</summary><div>Cat: <a href="https://sketchfab.com/3d-models/somali-cat-animated-ver-12-e185c3fd92b64c32b4515a32b29252fc" target="_blank" rel="noopener">Somali Cat</a> by DreamNoms, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>. Converted and relit for this scene.</div></details>';let Ie=ee("nav","gateway-world-links");Ie.setAttribute("aria-label","Shop destinations"),Ie.innerHTML='<a href="#/magic" data-gateway-door="magic">Magic Shop <span aria-hidden="true">\u2197</span></a><a href="#/software" data-gateway-door="software">Software Hub <span aria-hidden="true">\u2197</span></a>';let J=ee("div","reference-light");J.setAttribute("role","group"),J.setAttribute("aria-label","Pause or play the living street"),J.innerHTML='<button type="button" data-mode="reference" aria-pressed="true">Original</button><button type="button" data-mode="live" aria-pressed="false" disabled>Live scene</button>',pe.append(Ae,Ie,J);let Re=ee("p","reference-instruction");Re.setAttribute("role","status"),Re.setAttribute("aria-live","polite"),e.replaceChildren(le,ce,ge,pe,Re),e.className="gateway-experience is-reference-repair",e.dataset.view="full",e.dataset.mode="reference",e.dataset.version=r,e.dataset.renderer="loading";let _e=()=>document.body.dataset.world==="gateway"&&!document.hidden;function Ye(){if(o.disposed)return;let N=ce.clientWidth,z=ce.clientHeight;if(!N||!z)return;let Y=cl(N,z,o.view),Q=Y.artWidth,P=Y.artHeight;De.style.width=`${Q}px`,De.style.height=`${P}px`,De.style.left=`${Y.left}px`,De.style.top=`${Y.top}px`;let ae=Y.horizontal?"right":"bottom";if(De.style.maskImage=Y.feather?`linear-gradient(to ${ae},transparent,#000 ${Y.feather}px,#000 calc(100% - ${Y.feather}px),transparent)`:"none",Se.dataset.axis=Y.horizontal?"wide":"portrait",l&&R!==Se.dataset.axis&&B(Y.horizontal).catch(()=>{}),Se.style.backgroundSize=`${Y.surroundWidth}px ${Y.surroundHeight}px`,Se.style.backgroundPosition=Y.horizontal?`calc(50% + ${Q*30/1086}px) center`:`center calc(50% + ${Q*42/836}px)`,ce.style.setProperty("--focus-width",`${Q*.68}px`),ce.style.setProperty("--focus-height",`${P*.72}px`),c&&(Math.abs(Q-o.width)>.1||Math.abs(P-o.height)>.1)){let re=Math.min(devicePixelRatio||1,2,Math.sqrt(5e6/Math.max(Q*P,1)));c.setPixelRatio(re),c.setSize(Q,P,!1)}o.width=Q,o.height=P,f?.layout(N,z,Y),we()}function $e(N){if(["full","magic","software"].includes(N)){o.view=n.matches?N:"full",e.dataset.view=o.view;for(let z of ge.querySelectorAll("button"))z.setAttribute("aria-pressed",String(z.dataset.view===o.view));Ye()}}async function pt(N){let z=++E;if(N==="reference"&&o.renderer==="webgl"){T||(T=new l.TextureLoader().loadAsync(new URL("./street-master.webp",import.meta.url).href).then(Q=>(Q.colorSpace=l.SRGBColorSpace,Q.generateMipmaps=!1,Q.minFilter=Q.magFilter=l.LinearFilter,O.push(Q),Q)));let Y=await T;if(o.disposed||z!==E)return;u.map=Y,te.src=Y.image.src}else y&&u&&(u.map=y,x||(te.src=new URL("./scene-preview-v8.webp",import.meta.url).href));o.mode=N==="live"&&c&&o.renderer==="webgl"&&!a.matches?"live":"reference",e.dataset.mode=o.mode;for(let Y of J.querySelectorAll("button"))Y.setAttribute("aria-pressed",String(Y.dataset.mode===o.mode));W.uLive.value=o.mode==="live"?1:0,g?.enable(o.mode==="live"),o.mode==="live"&&w.firstLive&&g.loadCat().then(()=>{w.catReady=performance.now(),we()}),f?.enable(o.mode==="live"),m&&o.mode!=="live"&&(m.hidden=!0),o.last=0,o.mode==="reference"&&(o.magic=o.software=0,W.uMagic.value=W.uSoftware.value=0),we()}function it(N){o.hover=N,Re.textContent=N?`Enter ${s[N].label}`:"",we()}function ot(){clearTimeout(o.timer),o.timer=0,o.entering=null,delete e.dataset.entering}function D(N){if(!s[N]||o.entering||o.disposed)return;o.entering=N;let z=s[N];De.style.transformOrigin=`${(z.x+z.w/2)/1536*100}% ${(z.y+z.h/2)/1024*100}%`,e.dataset.entering=N;let Y=()=>{window.__fromStreetGateway=!0,location.hash=`#/${N}`;let Q=document.querySelector(`#${N}-title`);setTimeout(()=>{ot(),Q&&document.body.dataset.world===N&&(Q.setAttribute("tabindex","-1"),Q.focus({preventScroll:!0}))},80)};a.matches?Y():o.timer=setTimeout(Y,760)}for(let N of e.querySelectorAll("[data-gateway-door]")){let z=N.dataset.gatewayDoor;k(N,"click",Y=>{Y.button!==0||Y.ctrlKey||Y.metaKey||Y.shiftKey||Y.altKey||(Y.preventDefault(),D(z))}),k(N,"pointerenter",()=>it(z)),k(N,"pointerleave",()=>it(null)),k(N,"focus",()=>it(z)),k(N,"blur",()=>it(null))}for(let N of ge.querySelectorAll("button"))k(N,"click",()=>$e(N.dataset.view));for(let N of J.querySelectorAll("button"))k(N,"click",()=>pt(N.dataset.mode));k(window,"resize",()=>{n.matches||$e("full"),Ye()},{passive:!0}),k(window,"hashchange",()=>{ot(),it(null),setTimeout(Ye,350)}),k(document,"visibilitychange",()=>{_e()?we():(cancelAnimationFrame(o.frame),o.frame=0,o.last=0)}),k(a,"change",()=>{J.querySelector('[data-mode="live"]').disabled=a.matches||o.renderer!=="webgl",a.matches?pt("reference"):we()});let mt=new ResizeObserver(Ye);mt.observe(ce),Ye();function we(){!c||o.renderer!=="webgl"||!_e()||o.frame||o.disposed||(o.frame=requestAnimationFrame(Xe))}function Xe(N){if(o.frame=0,!_e()||o.disposed||o.renderer!=="webgl"){o.last=0;return}let z=Math.min(.08,(N-(o.last||N-16))/1e3);o.last=N;let Y=o.mode==="live";Y&&M===null&&(_+=z);let Q=M===null?_:M;if(g?.update(Q),m){let K=g.catPose();m.hidden=!Y||!K,K&&(m.style.left=`${(K.x-76)/1536*100}%`,m.style.top=`${(K.screenY-99)/1024*100}%`,m.dataset.greeting=String(K.greeting>.1))}let P=Y&&o.hover==="magic"?1:0,ae=Y&&o.hover==="software"?1:0,re=1-Math.exp(-z*12);o.magic+=(P-o.magic)*re,o.software+=(ae-o.software)*re,W.uClock.value=Q;let he=Ca(Q);W.uNeonA.value=he.slice(0,4),W.uNeonB.value=he.slice(4),W.uMagic.value=o.magic,W.uSoftware.value=o.software,c.render(h,d),f?.update(Q,M!==null),(Y&&M===null||Math.abs(o.magic-P)+Math.abs(o.software-ae)>.001)&&we()}function de(N,z){if(!v)return null;let Y=De.getBoundingClientRect(),Q=new l.Vector2((N-Y.left)/Y.width*2-1,1-(z-Y.top)/Y.height*2);return v.setFromCamera(Q,d),v.intersectObjects(j,!1)[0]?.object.userData.door||null}k(ce,"pointermove",N=>{if(o.renderer!=="webgl"||N.pointerType==="touch")return;let z=de(N.clientX,N.clientY);z!==o.hover&&it(z)},{passive:!0}),k(ce,"pointerleave",()=>it(null));function rt(N){o.renderer="image",o.reason=N,e.dataset.renderer="image",cancelAnimationFrame(o.frame),o.frame=0,pt("reference");let z=J.querySelector('[data-mode="live"]');z.disabled=!0,z.title="Live light requires WebGL 2. The original artwork and both doors remain available."}k(ne,"webglcontextlost",N=>{N.preventDefault(),rt("context-lost")});async function Ce(){let N;try{if(N=ne.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"low-power"}),!N){rt("webgl-unavailable");return}let z=x?null:ll();x&&(te.src=new URL("./street-master.webp",import.meta.url).href),l=await Promise.resolve().then(()=>(iu(),tu));let[Y]=await Promise.all([z,B(ce.clientWidth/ce.clientHeight>=1.5),x?te.decode():Promise.resolve()]);if(o.disposed)return;c=new l.WebGLRenderer({canvas:ne,context:N,antialias:!1,alpha:!1}),c.outputColorSpace=l.SRGBColorSpace,c.toneMapping=l.NoToneMapping,c.shadowMap.enabled=!0,c.shadowMap.type=l.PCFSoftShadowMap,c.setClearColor(527118,1),h=new l.Scene,d=new l.OrthographicCamera(-1536/2,1536/2,1024/2,-1024/2,.1,2500),d.position.set(1536/2,1024/2,1200),d.updateProjectionMatrix(),d.updateMatrixWorld(!0);let Q=new l.Texture(Y?.clean||te);y=Q,Q.colorSpace=l.SRGBColorSpace,Q.generateMipmaps=!1,Q.minFilter=Q.magFilter=l.LinearFilter,Q.needsUpdate=!0,O.push(Q),u=new l.MeshBasicMaterial({map:Q,toneMapped:!1}),u.onBeforeCompile=K=>{Object.assign(K.uniforms,W),K.fragmentShader=`
          uniform float uClock, uLive, uMagic, uSoftware;
          ${ul}
          ${pl}
          float lightMask(vec2 p, vec2 c, vec2 r) {
            return 1.0 - smoothstep(0.15, 1.0, length((p-c)/r));
          }
        `+K.fragmentShader,K.fragmentShader=K.fragmentShader.replace("#include <map_fragment>",`
          #include <map_fragment>
          vec2 px = vec2(vMapUv.x * 1536.0, (1.0-vMapUv.y) * 1024.0);
          if(uLive>.5)diffuseColor.rgb=mix(diffuseColor.rgb,environmentColor(vMapUv),smoothstep(795.0,831.0,px.y));
          float warm = clamp((diffuseColor.r - diffuseColor.b) * 6.0, 0.0, 1.0);
          float cool = clamp(max(diffuseColor.b, diffuseColor.g) * 6.0 - diffuseColor.r, 0.0, 1.0);
          float flicker = 0.0;
          flicker += lightMask(px,vec2(354.0,552.0),vec2(31.0,49.0)) * sin(uClock*7.1) * .13;
          flicker += lightMask(px,vec2(475.0,563.0),vec2(62.0,64.0)) * (sin(uClock*5.3+1.8)*.16+sin(uClock*12.7)*.04);
          flicker += lightMask(px,vec2(370.0,462.0),vec2(35.0,46.0)) * sin(uClock*6.6+3.2) * .12;
          flicker += lightMask(px,vec2(582.0,457.0),vec2(39.0,54.0)) * sin(uClock*8.3+2.3) * .12;
          flicker += lightMask(px,vec2(158.0,307.0),vec2(118.0,125.0)) * (sin(uClock*1.7)*.12+sin(uClock*6.9)*.04);
          flicker += lightMask(px,vec2(670.0,301.0),vec2(110.0,125.0)) * (sin(uClock*1.7+2.2)*.12+sin(uClock*6.9+6.6)*.04);
          flicker += lightMask(px,vec2(782.0,389.0),vec2(30.0,58.0)) * (.24*sin(uClock*2.8)+.12*sin(uClock*8.9)-.75*(1.0-smoothstep(.03,.11,abs(mod(uClock,13.7)-6.1))));
          flicker += lightMask(px,vec2(64.0,69.0),vec2(49.0,84.0)) * (.27*sin(uClock*1.6)+.10*sin(uClock*10.7)-1.1*(1.0-smoothstep(.04,.13,abs(mod(uClock,18.1)-9.3))));
          float gain = uLive * warm * flicker;
          gain += uMagic * lightMask(px,vec2(448.0,603.0),vec2(131.0,124.0)) * .09;
          gain += uSoftware * lightMask(px,vec2(984.0,550.0),vec2(65.0,171.0)) * .07;
          diffuseColor.rgb *= exp2(gain);
          ${dl}
          ${hl}
        `)};let P=new l.PlaneGeometry(1536,1024,1,1);p=new l.Mesh(P,u),p.position.set(1536/2,1024/2,0),h.add(p),O.push(P,u),v=new l.Raycaster;for(let[K,ve]of Object.entries(s)){let Le=new l.PlaneGeometry(ve.w,ve.h),ke=new l.MeshBasicMaterial({colorWrite:!1,depthWrite:!1}),Ge=new l.Mesh(Le,ke);Ge.position.set(ve.x+ve.w/2,1024-ve.y-ve.h/2,.05),Ge.userData.door=K,h.add(Ge),j.push(Ge),O.push(Le,ke)}h.updateMatrixWorld(!0);let ae=!1;c.debug.onShaderError=(K,ve,Le,ke)=>{ae=[K.getProgramInfoLog(ve),K.getShaderInfoLog(Le),K.getShaderInfoLog(ke)].filter(Boolean).join(" | ")||"Unknown shader error"};let re={};if(x){let K={cleanPlate:"street-clean.webp",pavementPlate:"street-pavement-clean.webp",foliageAtlas:"foliage-alpha.webp",foliagePlate:"foliage-background.webp",curtainAtlas:"curtains-alpha.webp",clothPlate:"cloth-background.webp"};await Promise.all(Object.entries(K).map(async([ve,Le])=>{let ke=new Image;ke.src=new URL(Le,import.meta.url).href,await ke.decode(),re[ve]=ke}))}if(o.disposed)return;let{createLivingScene:he}=await Promise.resolve().then(()=>(Eu(),wu));g=await he({THREE:l,scene:h,image:te,material:u,originalTexture:Q,preparedAssets:Y,...re}),g.setPortrait(R==="portrait");try{let{createViewportMist:K}=await Promise.resolve().then(()=>(Ru(),Au));f=K({THREE:l,stage:ce}),g.setViewportMist(!0)}catch{f=null}m=ee("button","living-cat-target"),m.type="button",m.setAttribute("aria-label","Say hello to the street cat"),m.innerHTML='<span aria-hidden="true">mrrp.</span>',m.hidden=!0,Oe.append(m),k(m,"click",()=>{o.mode==="live"&&(g.greet(),we())});for(let K of g.prepared.lanterns){let ve=ee("button","living-lantern-target");ve.type="button",ve.dataset.lantern=K.id,ve.setAttribute("aria-label",`Gently sway the ${K.id} lantern`);let[Le,ke,Ge,I]=K.rect;Object.assign(ve.style,{left:`${Le/1536*100}%`,top:`${ke/1024*100}%`,width:`${Ge/1536*100}%`,height:`${I/1024*100}%`}),Oe.append(ve);let $=()=>{o.mode==="live"&&(g.react(K.id),we())};k(ve,"pointerenter",$),k(ve,"focus",$),k(ve,"click",$)}if(o.width=o.height=0,Ye(),c.render(h,d),ae)throw new Error(`Gateway shader compilation failed: ${ae}`);if(o.renderer="webgl",e.dataset.renderer="webgl",J.querySelector('[data-mode="live"]').disabled=a.matches,await pt(a.matches?"reference":"live"),c.render(h,d),w.firstLive=performance.now(),a.matches||(C=setTimeout(()=>g.loadCat().then(()=>{w.catReady=performance.now(),we()}),50)),ae)throw new Error(`Living scene compilation failed: ${ae}`);we()}catch(z){rt(z?.message||"renderer-unavailable")}}function A(){o.disposed=!0,clearTimeout(o.timer),clearTimeout(C),cancelAnimationFrame(o.frame),mt.disconnect(),H.forEach(N=>N()),g?.dispose(),f?.dispose(),O.forEach(N=>N.dispose()),c?.dispose()}window.__gatewayTest=Object.freeze({version:r,setMode:pt,setView:$e,raycastAt:de,exportPrepared:()=>{let N=g.prepared,z=document.createElement("canvas");z.width=1280,z.height=1120;let Y=z.getContext("2d"),Q={},P=0;for(let ae of["lanterns","flames","foliage","curtains"])Q[ae]=N[ae].map(re=>{let he=P%4,K=Math.floor(P++/4);Y.drawImage(re.texture,he*320,K*224);let{texture:ve,plate:Le,mask:ke,...Ge}=re;return{...Ge,packed:[he*320,K*224,re.rect[2],re.rect[3]]}});return{base:N.clean.toDataURL(),props:z.toDataURL(),manifest:Q}},setCatVisible:N=>g?.setCatVisible(N),seek:N=>{M=Number.isFinite(N)?Math.max(0,N):null,we()},nudgeLantern:N=>{g?.react(N),we()},greetCat:()=>{g?.greet(),we()},setCatSeed:N=>{g?.setCatSeed(N),we()},setSurfaceVisible:N=>{g?.setSurfaceVisible(!!N),we()},snapshot:()=>({timing:{...w},renderer:o.renderer,reason:o.reason,mode:o.mode,motion:g?.snapshot()||null,view:o.view,camera:d?.type||null,vertices:p?.geometry.attributes.position.count||0,maxDepth:p?Math.max(...Array.from(p.geometry.attributes.position.array).filter((N,z)=>z%3===2)):null,art:{width:De.getBoundingClientRect().width,height:De.getBoundingClientRect().height},source:{width:te.naturalWidth,height:te.naturalHeight},doors:s}),dispose:A});let S=!1,G=()=>{!S&&document.body.dataset.world==="gateway"&&(S=!0,Ce())};k(window,"hashchange",()=>setTimeout(G,400)),G()}
