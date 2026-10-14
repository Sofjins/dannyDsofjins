# Danny Sofjins — Gallery-quality 2.5D Gateway

This is the **art-directed 2.5D** rebuild of the gateway. Unlike the procedural V3 blockout, the approved storefront composition forms the main artwork. Three.js samples a hand-authored depth map to displace a single continuous mesh and animates separately registered warm, cyan and magenta emission masks.

## Design choices

- The art is deliberately high-fidelity. No low-poly procedural storefronts, duplicate cat sprites, or cheap animated models.
- The door hit zones are invisible, keyboard-accessible HTML links. Hover adds light **inside** the door, not a rectangular frame.
- The cat is baked into the approved artwork until a genuinely convincing licensed rigged GLB asset is acquired. It can currently be greeted; fake walk/lick animations have intentionally been removed.
- The Three.js relief adds restrained actual geometry depth (recessed doors and windows, closer lanterns and road), with camera parallax and zoom. This is a 2.5D scene, not a freely explorable 3D street.
- Light masks are derived from the exact image pixels so they stay aligned. Neon is slightly imperfect, candle/window warm light flickers subtly, and rain is very sparse.
- Mobile uses a horizontally pannable close-up and accessible destination links. Reduced motion/WebGL failure show the original high-quality artwork.
- `/magic` and `/software` remain the previous content pages, unchanged.

## Run and deploy

No bundler or backend is required. Keep Coolify's existing **Static** build pack / **nginx:alpine**, base directory `/`. Modules load via HTTPS (Three.js via a pinned CDN version). The image and the depth/emission maps are served as local files in `assets/v25`.

Serve locally with `python3 -m http.server 8080` (do not open from `file://`), then visit `http://localhost:8080`.

## Optional next assets

A high-quality animated black-cat GLB can be imported later after visual review and licensing verification. Do not replace the baked cat with a low-quality primitive model. More sophisticated 2.5D foreground cut-outs (lanterns, plants, cables) require clean plates or manual inpainting to avoid doubled visual edges when moved.