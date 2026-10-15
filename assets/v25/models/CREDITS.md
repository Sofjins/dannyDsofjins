# Somali Cat Animated ver 1.2

- Author: **DreamNoms**.
- Original: https://sketchfab.com/3d-models/somali-cat-animated-ver-12-e185c3fd92b64c32b4515a32b29252fc
- License: **Creative Commons Attribution 4.0 International** — https://creativecommons.org/licenses/by/4.0/
- FBX source mirror: https://github.com/ammarqd/Never-Upon-a-Time-source/blob/main/Assets/Character%20Models/Cat/Seren/source/Seren.fbx
- Verified source Git blob SHA: `69ccb1c8bf7513116d5e29ce12e0e2ab2950a4ac`.
- Texture: `Assets/Character Models/Cat/Seren/textures/CatTexture.png` from the same repository.

Changes: converted FBX to GLB with Three.js 0.184.0, embedded the source texture, retained and optimized Idle, WalkClean, SitDown, SittingIdle and StandUp, and used a rough non-metallic material. Runtime code scales and lights the character and adds custom drinking, jumping and landing adjustments to the authored skeleton. The original author does not endorse these modifications or this website.

Recreate: `node scripts/convert-cat.mjs /path/to/Seren.fbx /path/to/CatTexture.png assets/v25/models/somali-cat.glb`.

Attribution is also exposed through the landing's Art credits control. This license applies to the cat asset, not automatically to the rest of this repository.
