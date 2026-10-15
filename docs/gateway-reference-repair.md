# Gateway reference repair

## Scope

Fix the 2.5D rendering without changing the approved street design. Existing Magic/Software pages, CV and contact flow are preserved. Static nginx hosting remains valid.

## Implemented

- Orthographic camera and a flat four-vertex plane. No depth.png, perspective warp, continuous displacement or automatic camera drift.
- The existing approved-artwork WebP is reused without another lossy conversion. It is a 1536 x 1024 derivative of the supplied PNG, not newly invented art and not a higher-resolution replacement.
- Contain framing on first load, with native-size cap. Both the upper facade and full foreground remain visible. Dark margins on wide screens are intentional.
- HTML image, WebGL canvas and door targets share a single art container and pixel coordinate system.
- Navigation outside the picture. No mouse-hover rectangle or floating door button.
- Original mode is the default and disables all light variations, including hover illumination. Live light is explicit and uses small local multiplicative changes to existing light, not additive full-scene glow. WebGL is required for Live light.
- Independently timed candle/lantern variations and downward-only dips on selected neon segments. No deformation of flames, lettering, architecture or baked objects.
- Mobile starts with both shops visible. Explicit Magic/Software view controls zoom to a shop; Full street restores the whole composition.
- Doors work with WebGL blocked. Reduced motion stays in reference mode. Inactive views stop continuous rendering.
- No low-poly substitute models, duplicate cat, moving sprite on top of a static copy, generated background or unpainted cutout.

## Deliberately not implemented in this repair

Physical lantern movement, a walking cat, new camera parallax and new rain/fog. These need reviewed cutout/model assets and reconstructed backgrounds before animation. The current cat and lantern shapes remain part of the approved painting.

## Verification

`tests/gateway_reference.py` checks reference pixels at native size, six viewport sizes, explicit mobile focusing, both door routes, fallback navigation, reduced motion and uncaught errors. It additionally checks the real WebGL renderer, orthographic camera, four flat vertices and Three.js raycasts when WebGL is available.

Run the full test in a networked Linux development/CI environment:

```sh
npm install --no-save --no-package-lock --ignore-scripts three@0.179.1
python -m pip install playwright==1.55.0 pillow==11.3.0 numpy==2.3.3
python -m playwright install --with-deps chromium
python tests/gateway_reference.py --require-webgl
```

The workflow requires WebGL and fails rather than treating an image fallback as a successful GPU test. Screenshots and report are retained as an artifact. Do not report a full Three.js visual pass unless `webgl_verified` in the report is true.

Offline fallback verification (also needs beautifulsoup4): `BROWSER_PATH=/usr/bin/chromium python tests/gateway_reference.py --embedded`. The embedded mode injects the exact local CSS/JS/image bytes into Chromium without loading network resources; it is not a GPU test when the report says `renderer: image`.
