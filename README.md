# Danny Sofjins — Living Street

The landing is a reference-matched hybrid Three.js scene: the two-shop artwork provides the architecture, with independently animated lanterns, candle flames, foliage, a jointed 3D cat, and mist at three depths.

Both shop doors transition to the existing Magic and Software pages. The next scenes/interiors are a separate design phase.

## Run and verify

```sh
npm ci
npm run dev
npm test
npx playwright install chromium
npm run test:browser
```

Open http://localhost:4173. Production is still static HTML/CSS/JS and images; Coolify can serve the repository root without a Node process or a build command. Three.js 0.184.0 is bundled locally, so the scene does not depend on a CDN. Rebuild that checked-in bundle with `npm run build:vendor` after dependency changes.

## Scene behavior

- The cat drinks, walks to the crate beside the bicycle, crouches, jumps, lands, perches, and returns. Its leg joints use inverse kinematics, with a segmented tail, warm/cool lighting and a contact shadow. Clicking it produces a brief greeting without interrupting its path.
- The original painted cat is removed in live mode using a small feathered patch from the generated clean plate. Original mode restores the untouched reference, including its original cat.
- Five plant groups have separate textured meshes with fixed roots. Only their meshes bend; the building and street never deform.
- Lanterns and candle flames retain the existing registered cutouts. Neon dips are localized and reflected on the wet pavement; mist drifts in three layers.
- Both doors remain accessible links. Entry adds a short push-in/fade; reduced motion skips it. Mobile offers the whole street and explicit close views.
- Animation pauses outside the gateway and when the tab is hidden. Reduced motion and WebGL failure retain the original artwork and working navigation.

The cat is a first-pass procedural model, not a licensed or sculpted film-quality asset. Visual review should decide whether its silhouette/materials need a bespoke rig. See [the implementation plan](docs/living-street-plan.md).

## Checks

GitHub Actions runs motion/contact tests, actual WebGL browser checks, the existing reference checks, and a browser recording. Screenshots and reports are retained as `gateway-reference-proof`. A passing motion test alone does not establish visual quality; inspect the screenshots and video.
