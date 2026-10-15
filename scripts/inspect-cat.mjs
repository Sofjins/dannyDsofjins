import { createHash } from 'node:crypto';

const source = 'https://raw.githubusercontent.com/code4fukui/vr-cats/main/bicolor_cat.glb';
const response = await fetch(source);
if (!response.ok) throw new Error(`Model download failed: ${response.status}`);
const bytes = Buffer.from(await response.arrayBuffer());
const gitHash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
if (gitHash !== 'e53deea554436d0ebc0f83234b1ef7bc1182e409') throw new Error('Upstream model changed; inspect before importing');
if (bytes.readUInt32LE(0) !== 0x46546c67) throw new Error('Expected a binary glTF');
const document = JSON.parse(bytes.subarray(20, 20 + bytes.readUInt32LE(12)).toString('utf8'));
console.log(JSON.stringify({
  asset: document.asset,
  size: bytes.length,
  animations: document.animations?.map(animation => ({ name: animation.name, channels: animation.channels.length,
    times: animation.samplers.map(sampler => ({ min: document.accessors[sampler.input].min, max: document.accessors[sampler.input].max })).slice(0, 3) })),
  meshes: document.meshes?.map(mesh => mesh.name),
  materials: document.materials,
  nodes: document.nodes?.map(node => ({ name: node.name, translation: node.translation, rotation: node.rotation, scale: node.scale })),
  extensions: document.extensionsUsed
}, null, 2));
console.log(`CAT_MODEL_BASE64=${bytes.toString('base64')}`);
