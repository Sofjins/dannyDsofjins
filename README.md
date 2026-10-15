# Danny Sofjins — Living Street

Full-viewport hybrid Three.js landing: the approved two-shop artwork supplies rigid architecture, while separate lanterns, flames, foliage, curtains, a licensed animated 3D cat and layered mist bring the street to life.

Both doors transition to the existing Magic and Software pages. Their future interiors are a separate design phase.

## Run and verify

```sh
npm ci
npm run dev
npm test
npx playwright install chromium
npm run test:browser
```

Open http://localhost:4173. Production is static HTML/CSS/JS and local assets; Coolify serves the repository root without a Node process or build step. Three.js 0.184.0 is bundled locally. Rebuild the vendor with `npm run build:vendor` after dependency changes, then run `npm run build` to update the checked-in application bundle. Coolify needs no runtime build.

## Scene behavior

- DreamNoms' free CC BY 4.0 Somali Cat uses its authored walk, idle, sit-down, sitting and stand-up clips. Custom rig adjustments handle drinking, crouching, jumping and front-first landing; these are not motion-captured jump clips.
- The same authored mesh now has a detailed black short-fur atlas, a restrained physical sheen, separate iris materials and a shorter, thinner tail. It is a retextured/adapted asset, not a newly sourced photorealistic model.
- Wet paving has a separate tilted planar reflection pass rendering the actual animated cat, a soft shadow-map receiver and contact shading. Water normals subtly break reflected highlights without moving the stones. Coffee's reflection follows its new sign position, with separate sidewalk/road projection and a non-reflective curb face.
- Each visit gets a randomized schedule: long rests, left/right walks, drinking and occasional crate visits. Motion is seeded for reproducible tests, not a short repeating loop. Clicking the cat gives a brief greeting without changing its path.
- Nine leaf-only RGBA foliage sprites and three burgundy curtain panels have individually anchored motion. Plant gaps are transparent over a fixed clean facade, rather than moving pieces of wall. These are textured sprites, not fully volumetric plant models.
- Lanterns sway independently, candle flames and local illumination vary, and separate neon signs have different rhythms. Coffee now sits at the window's bottom-left with OPEN 24/7; a slim Japanese development sign sits on the right.
- Five mist components are composited into one continuous viewport-wide pass, with no artwork-edge clipping. The gutter keeps its three-drop bowl burst; four additional origins have independently staggered sparse drips.
- The original composition fits the viewport without cropping or stretching. Generated environment extensions fill wider and taller screens rather than black bars. Only explicit mobile focus controls select a close-up; destination links remain accessible.
- Original mode restores the untouched reference. Reduced motion restores the original reference; WebGL failure retains the current scene preview and working navigation. Animation pauses when the tab or gateway is hidden.

## Assets and checks

Cat attribution and source details: [model credits](assets/v25/models/CREDITS.md). Artwork edits and design limits: [implementation notes](docs/living-street-plan.md).

GitHub Actions runs motion/contact tests, real WebGL checks, reference-color checks and a browser recording. Reports and screenshots are retained as `gateway-reference-proof`. Automated tests verify behavior, not cinematic quality; inspect the actual screenshots and motion as well.

## Loading and performance

The HTML paints a 130 KB preview of the current scene, not the old reference. Two prebaked WebP resources (322 KB backdrop and 142 KB prop atlas) replace browser-side inpainting and multiple full-size authoring images. `npm run build` bundles the module graph into one application request. Non-critical font CSS no longer blocks first paint.

The live scene starts before the cat downloads. Its lossless runtime GLB removes unused embedded material data and deduplicates identical binary views. Native gzip decoding reduces its transfer to about 294 KiB; browsers without DecompressionStream use the uncompressed fallback. Meshes, joints and authored animation samples are unchanged. Regenerate with `npm run optimize:cat`, then `npm run build`.

The original 428 KB reference is fetched only when Original/reduced-motion is requested. Direct shop routes do not initialize the 3D renderer or fetch the model. Animation stops outside the gateway or while the document is hidden. Fog resolution is capped at 650,000 pixels and five overlapping fog passes are disabled once the shared viewport pass is available.

`tests/loading.mjs` deliberately holds the model request until the live scene is usable, checks that authoring plates/old reference are absent from startup requests, and verifies direct shop links. Reports expose actual timings, not a promise of zero network/GPU latency. First-visit speed still depends on bandwidth, server caching/compression and device GPU.

Prebaked assets are reproducible from `?bake=1` using `node tests/bake-scene.mjs`; the Actions artifact includes rendered PNG sources and WebP outputs. Artwork prompts and compositing limitations: [Scene 7 notes](docs/scene-seven-prompts.md).

