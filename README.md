# Danny Sofjins — Two Worlds, One Mind

**Gateway V3:** a real-time interactive 3D street: a warm Japanese-influenced Magic Shop and a darker neon Software Hub. This replaces the previously painted/static street with procedural Three.js geometry; the previous artwork is used only as a composition reference and is not loaded by the Gateway.

## Deploying with Coolify

The repo remains a **static website**. Coolify settings:

- Build Pack: `Static`
- Static image: `nginx:alpine`
- Base Directory: `/`
- Git branch: `main`
- Domain: `https://dannysofjins.xyz`
- Keep **Auto Deploy** enabled and configure GitHub App/webhook delivery; if necessary trigger the first deploy manually.

No backend, Dockerfile, package manager, build process, or environment variables are required. Three.js runs in the browser and is loaded as a pinned ES module from jsDelivr. A static nginx container is sufficient; switching to Docker will **not** increase client-side frame rate or 3D quality.

Local test: serve the folder over HTTP, e.g. `python3 -m http.server 8080`, then open `http://localhost:8080`. (Use HTTP, not `file://`, for ESM.)

## Structure

```text
index.html                existing Magic / Software content, redesigned Gateway
assets/site.css           shared styles + V3 responsive Gateway UI
assets/site.js            existing accessible hash router, booking modal, Magic mini-trick
assets/v3/three.js        pinned CDN loader for Three.js 0.179.1
assets/v3/primitives.js   3D mesh/material/text helpers
assets/v3/environment.js  genuine 3D paving, walls, neon reflections, rain, lights
assets/v3/shops.js        genuine 3D shops, interior openings, doors, lanterns, signs
assets/v3/art-pass.js     procedural surface maps, architecture details, props, warm window lighting
assets/v3/cat.js          separate articulated 3D cat + bowl; animation states
assets/v3/main.js         camera, pointer raycasting, transitions, updates, responsive motion
```

## Designed interactions

- **Magic Shop door:** mouse hover reveals subtle warm light from inside; click pulls the camera towards the shop and opens `#/magic`.
- **Software Hub door:** cool hover focus, dark frosted shop window, irregular neon `Software Hub`, `Canoodling`, `git commit`, `git push`, `COFFEE`, `WORKING 24/7`; click opens `#/software`.
- **Cat:** independent walking, sitting, grooming, drinking and looking animations; pointer hover gives an `mrrr~` response.
- **Lanterns:** modeled paper lanterns with gentle occasional motion rather than uninterrupted swinging.
- **Street:** mesh cobbles and metal fixtures, warm/cool reflected streaks, particles, fog and soft practical light.
- **Mobile:** touch-friendly always-visible Magic / Software links and horizontal drag to look around; capped pixel ratio / reduced particles / fewer cobbles.
- **Accessibility:** navigation is ordinary HTML; direct URLs work with hash routing; a CSS-only text fallback stays visible if JavaScript or WebGL fails; honors `prefers-reduced-motion`.

## What's in this V3 pass (and what's next)

Art pass 1 adds **procedural wood, metal and stone maps**, shelf displays, wood brackets, lamps, extra metalwork and brighter, warmer lighting. This is an early stylized 3D prototype, not yet a high-fidelity asset reconstruction. The approved design image is a visual art direction, not an available source for editable 3D models. Higher-poly custom models, detailed PBR textures, baked lightmaps, skeletal cat animation, and comprehensive device-by-device visual QA would be a later targeted art pass once the user approves the modeled composition. No claim is made that these models are exact replicas of the concept art.

Important performance work later: export Blender-modeled `.glb` assets, use Draco/KTX2 compression, test on real iOS/Android GPUs, and consider selective bloom post-processing. We should **not** switch to a server backend merely for WebGL visuals.

## Art-pass visual QA
JavaScript syntax and local HTTP asset tests passed. Final WebGL appearance still requires a browser with GPU and network access to jsDelivr. Compare the deployed scene against the approved reference on desktop and mobile; lighting, proportions and performance still need visual review.


## Art pass 2 — enhanced storefront detail

`assets/v3/detail-pass2.js` adds curved 3D roof tile instances, sculpted paper lanterns, dimensional curtains, added display shelves and card objects, industrial vents, old service boxes and small world-space wet pavement glints. The art direction still needs iteration against the approved reference on real browsers. These are real Three.js meshes, not a photographic background image. For final high-fidelity art we should use curated Blender-made GLB assets and baked maps after the composition is approved.
