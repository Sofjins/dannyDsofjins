import { readFileSync, writeFileSync } from 'node:fs';
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
const [sourcePath, texturePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !texturePath || !outputPath) throw new Error('Usage: node scripts/convert-cat.mjs source.fbx texture.png output.glb');
globalThis.window = globalThis;
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.(); }); }
  readAsDataURL(blob) { blob.arrayBuffer().then(result => { this.result = `data:${blob.type};base64,${Buffer.from(result).toString('base64')}`; this.onloadend?.(); }); }
};
THREE.TextureLoader.prototype.load = () => new THREE.Texture();
const bytes = readFileSync(sourcePath);
const model = new FBXLoader().parse(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
console.log(model.animations.map(clip => ({name:clip.name,duration:clip.duration,tracks:clip.tracks.length})));
console.log(new THREE.Box3().setFromObject(model));
model.traverse(mesh => {
  if (mesh.isMesh) mesh.material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .9 });
});
const selected = model.animations.filter(clip => ['Idle','SitDown','WalkClean','StandUp','SittingIdle'].includes(clip.name.split('|').at(-1)));
selected.forEach(clip => { clip.name = clip.name.split('|').at(-1); clip.optimize(); });
const document = await new GLTFExporter().parseAsync(model, { animations: selected, binary: false });
document.asset.extras = { author: 'DreamNoms', title: 'Somali Cat Animated ver 1.2',
  license: 'CC-BY-4.0', source: 'https://sketchfab.com/3d-models/somali-cat-animated-ver-12-e185c3fd92b64c32b4515a32b29252fc' };
document.images = [{ uri: 'data:image/png;base64,' + readFileSync(texturePath).toString('base64') }];
document.textures = [{ source: 0 }];
for (const material of document.materials) material.pbrMetallicRoughness.baseColorTexture = { index: 0 };
const geometryBytes = Buffer.from(document.buffers[0].uri.split(',')[1], 'base64');
const textureBytes = readFileSync(texturePath);
const paddedGeometry = Buffer.concat([geometryBytes, Buffer.alloc((4 - geometryBytes.length % 4) % 4)]);
document.images[0] = { mimeType: 'image/png', bufferView: document.bufferViews.length };
document.bufferViews.push({ buffer: 0, byteOffset: paddedGeometry.length, byteLength: textureBytes.length });
const binary = Buffer.concat([paddedGeometry, textureBytes, Buffer.alloc((4 - textureBytes.length % 4) % 4)]);
document.buffers[0] = { byteLength: binary.length };
const json = Buffer.from(JSON.stringify(document));
const jsonChunk = Buffer.concat([json, Buffer.alloc((4-json.length%4)%4,32)]);
const header = Buffer.alloc(20);
header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(28+jsonChunk.length+binary.length,8);
header.writeUInt32LE(jsonChunk.length,12);header.writeUInt32LE(0x4e4f534a,16);
const binaryHeader = Buffer.alloc(8);binaryHeader.writeUInt32LE(binary.length,0);binaryHeader.writeUInt32LE(0x004e4942,4);
writeFileSync(outputPath,Buffer.concat([header,jsonChunk,binaryHeader,binary]));
