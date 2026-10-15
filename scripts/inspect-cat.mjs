import { createHash } from 'node:crypto';

const source = 'https://raw.githubusercontent.com/ammarqd/Never-Upon-a-Time-source/main/Assets/Character%20Models/Cat/Seren/source/Seren.fbx';
const response = await fetch(source);
if (!response.ok) throw new Error(`Model download failed: ${response.status}`);
const bytes = Buffer.from(await response.arrayBuffer());
const gitHash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
if (gitHash !== '69ccb1c8bf7513116d5e29ce12e0e2ab2950a4ac') throw new Error('Upstream model changed; inspect before importing');
console.log(JSON.stringify({ source, size: bytes.length, gitHash }));
console.log(`CAT_MODEL_BASE64=${bytes.toString('base64')}`);
