import { FOLIAGE } from './foliage.js?v=living-street-6';
import { CURTAINS } from './curtains.js?v=living-street-6';

export const CLEAN_PATCHES = [[628, 678, 188, 114], [1090, 188, 145, 95], [1231, 112, 243, 205],
  [1106, 548, 216, 151], [1330, 312, 54, 223]];
export const PAVEMENT_PATCH = [1215, 821, 110, 100];

export const LANTERNS = [
  { id:'left', rect:[116,214,100,176], pivot:[164,224],
    path:'M162 224 L166 224 L166 233 L171 235 L171 244 L179 246 L180 252 C197 258 202 270 203 291 L203 331 C202 350 196 359 185 365 L179 367 L179 376 L166 378 L166 385 L162 385 L162 378 L146 378 L145 367 C131 360 125 345 125 329 L124 290 C124 269 131 260 146 254 L146 246 L157 244 L157 235 L162 232 Z',
    period:14.5, offset:0, amplitude:.040 },
  { id:'right', rect:[618,205,104,196], pivot:[669,214],
    path:'M667 214 L671 214 L671 222 L675 225 L677 233 L689 233 L690 244 C708 251 711 267 711 284 L711 326 C711 345 706 357 691 360 L686 362 L686 372 L673 374 L673 390 L669 395 L666 392 L668 374 L653 373 L652 362 C638 357 632 345 632 328 L632 280 C632 260 640 250 653 243 L653 234 L663 232 L664 225 L667 222 Z',
    period:17.7, offset:2.2, amplitude:.035 }
];
// Only the flame above each wick is separated, not the candle or surrounding furniture.
export const FLAMES = [
  {id:'table', rect:[471,553,9,12], pivot:[475.5,565]},
  {id:'shelf-low', rect:[368,544,8,11], pivot:[372,555]},
  {id:'shelf-high', rect:[366,452,10,13], pivot:[371,465]},
  {id:'shelf-high-left', rect:[353,452,8,12], pivot:[357,464]},
  {id:'wall', rect:[578,439,10,16], pivot:[583,455]}
];
const makeCanvas = (w,h) => Object.assign(document.createElement('canvas'),{width:w,height:h});

function maskFor(spec) {
  const [x,y,w,h] = spec.rect;
  const high=makeCanvas(w*4,h*4), c=high.getContext('2d');
  c.scale(4,4);c.translate(-x,-y);c.fillStyle='#fff';
  if(spec.path)c.fill(new Path2D(spec.path));
  else { c.beginPath();c.ellipse(x+w/2,y+h/2,w*.49,h*.49,0,0,Math.PI*2);c.fill(); }
  const mask=makeCanvas(w,h),context=mask.getContext('2d');
  if(spec.feather)context.filter=`blur(${spec.feather}px)`;
  context.drawImage(high,0,0,w,h);
  return mask;
}

/** Edge-boundary interpolation + harmonic relaxation. The small revealed border,
 * not an invented room, is the target. Input source and alpha never mutate.
 * No download, AI inference or model weights; ~35k pixels in two lantern regions.
 */
function restoreBehind(source, mask) {
  const w=source.width,h=source.height, c=source.getContext('2d',{willReadFrequently:true});
  const original=c.getImageData(0,0,w,h), a=mask.getContext('2d').getImageData(0,0,w,h).data;
  const holes=new Uint8Array(w*h), values=new Float32Array(w*h*3), indices=[];
  for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
    let on=false;
    for(let dy=-1;dy<=1&&!on;dy++)for(let dx=-1;dx<=1;dx++)if(a[((y+dy)*w+x+dx)*4+3]>8){on=true;break;}
    holes[y*w+x]=on?1:0;
  }
  for(let i=0;i<w*h;i++)for(let k=0;k<3;k++)values[i*3+k]=original.data[i*4+k];
  for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
    const i=y*w+x;if(!holes[i])continue;
    let l=x,r=x;while(l>0&&holes[y*w+l])l--;while(r<w-1&&holes[y*w+r])r++;
    const f=(x-l)/Math.max(1,r-l);
    for(let k=0;k<3;k++)values[i*3+k]=values[(y*w+l)*3+k]*(1-f)+values[(y*w+r)*3+k]*f;
    indices.push(i);
  }
  for(let pass=0;pass<100;pass++)for(const i of indices){
    for(let k=0;k<3;k++)values[i*3+k]=.25*(values[(i-1)*3+k]+values[(i+1)*3+k]+values[(i-w)*3+k]+values[(i+w)*3+k]);
  }
  const out=makeCanvas(w,h),ctx=out.getContext('2d'),result=ctx.createImageData(w,h);
  result.data.set(original.data);
  for(const i of indices)for(let k=0;k<3;k++)result.data[i*4+k]=Math.round(values[i*3+k]);
  ctx.putImageData(result,0,0);return out;
}

export function prepareLivingAssets(image, cleanPlate, pavementPlate, foliageAtlas, foliagePlate) {
  const clean=makeCanvas(1536,1024),cc=clean.getContext('2d');cc.drawImage(image,0,0);
  const patches = cleanPlate ? CLEAN_PATCHES.map(rect => ({ rect, source: cleanPlate })) : [];
  if (pavementPlate) patches.push({ rect: PAVEMENT_PATCH, source: pavementPlate });
  for (const { rect: [left, top, width, height], source } of patches) {
    const patch = makeCanvas(width, height);
    const context = patch.getContext('2d');
    context.drawImage(source, left, top, width, height, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height);
    for (let row = 0; row < height; row++) for (let column = 0; column < width; column++) {
      const edge = Math.min(column, row, width - 1 - column, height - 1 - row);
      pixels.data[(row * width + column) * 4 + 3] = Math.min(255, edge / 6 * 255);
    }
    context.putImageData(pixels, 0, 0);
    cc.drawImage(patch, left, top);
  }
  const cut = (spec) => {
    const [x,y,w,h]=spec.rect,source=makeCanvas(w,h),sc=source.getContext('2d');
    sc.drawImage(image,x,y,w,h,0,0,w,h);
    const mask=maskFor(spec),plate=restoreBehind(source,mask);
    cc.drawImage(plate,x,y);
    const texture=makeCanvas(w,h),tc=texture.getContext('2d');tc.drawImage(source,0,0);
    tc.globalCompositeOperation='destination-in';tc.drawImage(mask,0,0);
    return {...spec,texture,plate,mask};
  };
  const isolatePlant = spec => {
    const [left, top, width, height] = spec.rect;
    const plate = makeCanvas(width, height), plateContext = plate.getContext('2d');
    plateContext.drawImage(foliagePlate, left, top, width, height, 0, 0, width, height);
    const backdrop = plateContext.getImageData(0, 0, width, height);
    for (let row = 0; row < height; row++) for (let column = 0; column < width; column++) {
      const edge = Math.min(left === 0 ? 20 : column, top === 0 ? 20 : row,
        width - 1 - column, top + height === 1024 ? 20 : height - 1 - row);
      backdrop.data[(row * width + column) * 4 + 3] = Math.min(255, edge / 3 * 255);
    }
    plateContext.putImageData(backdrop, 0, 0); cc.drawImage(plate, left, top);
    const texture = makeCanvas(width, height), context = texture.getContext('2d');
    context.drawImage(foliageAtlas, ...spec.atlasRect, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height);
    let occupied = 0;
    for (let offset = 3; offset < pixels.data.length; offset += 4) {
      const alpha = pixels.data[offset];
      pixels.data[offset] = alpha < 12 ? 0 : Math.min(255, (alpha - 12) * 255 / 239);
      if (pixels.data[offset] > 12) occupied++;
    }
    context.putImageData(pixels, 0, 0);
    return { ...spec, texture, plate, isolated: true, alphaOccupancy: occupied / (width * height) };
  };
  const foliage=FOLIAGE.map(foliageAtlas && foliagePlate ? isolatePlant : cut);
  const lanterns=LANTERNS.map(cut), flames=FLAMES.map(cut), curtains=CURTAINS.map(cut);
  return {clean,lanterns,flames,foliage,curtains,catRemoved:Boolean(cleanPlate)};
}

/** Long rests between naturally damped gusts. Hover is a single extra impulse,
 * not an infinite stronger swing; no animation clock advance while page hidden. */
export function lanternAngle(spec, seconds, hoveredAt=-100) {
  const phase=(seconds+spec.offset)%spec.period;
  const natural=phase<10.5 ? spec.amplitude*Math.sin(phase*2.1)*Math.exp(-phase*.22)*Math.min(phase/.8,1) : 0;
  const h=seconds-hoveredAt;
  const hover=h>=0&&h<5.2 ? .030*Math.sin(h*2.9)*Math.exp(-h*.65) : 0;
  const breeze=.005*Math.sin(seconds*.67+spec.offset);
  return Math.max(-.048,Math.min(.048,natural+hover+breeze));
}
