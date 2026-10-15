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

Open http://localhost:4173. Production is static HTML/CSS/JS and local assets; Coolify serves the repository root without a Node process or build step. Three.js 0.184.0 is bundled locally. Rebuild it with `npm run build:vendor` after dependency changes.

## Scene behavior

- DreamNoms' free CC BY 4.0 Somali Cat uses its authored walk, idle, sit-down, sitting and stand-up clips. Custom rig adjustments handle drinking, crouching, jumping and front-first landing; these are not motion-captured jump clips.
- The same authored mesh now has a detailed black short-fur atlas, a restrained physical sheen, separate iris materials and a shorter, thinner tail. It is a retextured/adapted asset, not a newly sourced photorealistic model.
- Wet paving has a separate tilted planar reflection pass rendering the actual animated cat, a soft shadow-map receiver and contact shading. Water normals subtly break reflected highlights; paving, typography, grates and architecture are not displaced.
- Each visit gets a randomized schedule: long rests, left/right walks, drinking and occasional crate visits. Motion is seeded for reproducible tests, not a short repeating loop. Clicking the cat gives a brief greeting without changing its path.
- Nine leaf-only RGBA foliage sprites and three burgundy curtain panels have individually anchored motion. Plant gaps are transparent over a fixed clean facade, rather than moving pieces of wall. These are textured sprites, not fully volumetric plant models.
- Lanterns sway independently, candle flames and local illumination vary, and separate neon signs have different rhythms. Coffee now sits at the window's bottom-left with OPEN 24/7; a slim Japanese development sign sits on the right.
- Five local mist layers and a low-resolution viewport-wide haze pass add depth without rain. The weathered, hollow gutter releases three drops every 7.4 seconds, with small bowl ripples after impact.
- The original composition fits the viewport without cropping or stretching. Generated environment extensions fill wider and taller screens rather than black bars. Only explicit mobile focus controls select a close-up; destination links remain accessible.
- Original mode restores the untouched reference. Reduced motion and WebGL failure retain the still artwork and working navigation. Animation pauses when the tab or gateway is hidden.

## Assets and checks

Cat attribution and source details: [model credits](assets/v25/models/CREDITS.md). Artwork edits and design limits: [implementation notes](docs/living-street-plan.md).

GitHub Actions runs motion/contact tests, real WebGL checks, reference-color checks and a browser recording. Reports and screenshots are retained as `gateway-reference-proof`. Automated tests verify behavior, not cinematic quality; inspect the actual screenshots and motion as well.
