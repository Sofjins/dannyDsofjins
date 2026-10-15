import { readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
const source=new URL('../assets/v25/models/somali-cat.glb',import.meta.url);
const output=new URL('../assets/v25/models/black-cat-runtime.glb',import.meta.url);
const bytes=readFileSync(source),jsonLength=bytes.readUInt32LE(12);
const document=JSON.parse(bytes.subarray(20,20+jsonLength));
const binary=bytes.subarray(28+jsonLength);
const removed=new Set((document.images||[]).map(image=>image.bufferView));
const retained=new Map(),chunks=[];
let offset=0;
for(const [index,view] of document.bufferViews.entries()) {
  if(removed.has(index)){view.byteLength=4;view.byteOffset=0;continue;}
  const data=binary.subarray(view.byteOffset||0,(view.byteOffset||0)+view.byteLength);
  const hash=createHash('sha256').update(data).digest('hex');
  if(!retained.has(hash)){
    retained.set(hash,offset);chunks.push(data);offset+=data.length;
    const padding=(4-offset%4)%4;
    if(padding){chunks.push(Buffer.alloc(padding));offset+=padding;}
  }
  view.byteOffset=retained.get(hash);
}
delete document.images;delete document.textures;delete document.samplers;
for(const material of document.materials)delete material.pbrMetallicRoughness.baseColorTexture;
document.buffers[0].byteLength=offset;
document.asset.extras.runtimeOptimization='Identical binary views deduplicated; unused embedded coat removed. Meshes, skin weights and animation values unchanged.';
const json=Buffer.from(JSON.stringify(document));
const paddedJson=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,0x20)]);
const header=Buffer.alloc(20);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);
header.writeUInt32LE(28+paddedJson.length+offset,8);header.writeUInt32LE(paddedJson.length,12);header.writeUInt32LE(0x4e4f534a,16);
const binaryHeader=Buffer.alloc(8);binaryHeader.writeUInt32LE(offset,0);binaryHeader.writeUInt32LE(0x004e4942,4);
const result=Buffer.concat([header,paddedJson,binaryHeader,...chunks]);writeFileSync(output,result);
writeFileSync(new URL('../assets/v25/models/black-cat-runtime.glb.gz',import.meta.url),gzipSync(result,{level:9}));
console.log(JSON.stringify({originalBytes:bytes.length,runtimeBytes:result.length,savedPercent:Math.round((1-result.length/bytes.length)*100)}));
