# Danny Sofjins — Living Street Gateway

A lightweight interactive landing for [dannysofjins.xyz](https://dannysofjins.xyz/). The approved, straight-on night-street artwork is the foundation: **Magic Shop** on the left, **Software Hub** on the right.

## What is interactive

- Click either door to zoom into its world; existing Magic and Software pages remain available through hash URLs and browser Back.
- Three.js draws low-cost depth-aware rain and atmospheric particles over the street (loaded progressively).
- Two Chinese/Japanese-style lanterns sway **only during occasional wind gusts** or gentle pointer interaction.
- Independent candlelight glows and small animated flames, plus intermittent cyan/magenta neon flicker and wet-road reflections.
- Animated black cat with walking / drinking / licking / sitting states. Hover / focus for a purr caption, click for an optional generated purr sound. A small bowl sits between the shops.
- Dimmed upper floors and more private/darker Software Hub windows, and a small `COFFEE · WORKING 24/7` sign.
- On narrow screens, drag horizontally to inspect the street. The two always-visible links at the bottom go directly to either page.

## Files

- `index.html` — HTML scene, two accessible clickable door regions, existing inner pages.
- `assets/site.css` — page and world styles plus responsive street staging.
- `assets/site.js` — previously implemented Magic / Software pages and routing.
- `assets/gateway.js` — lantern, cat, Three.js rain, candle and neon behaviors, mobile panning, entrance zoom.
- `assets/street-night.webp` — scene art with isolated moving elements removed, compressed for fast load.
- `assets/street-cat.png`, `assets/lantern-left.png`, `assets/lantern-right.png` — moving cutout layers.
- `CV_Daniils_Sofjins_SDE_2026.pdf` — existing CV, preserved.

## How to run

This prototype is static HTML + CSS + JavaScript. Serve the directory from any static server (`python -m http.server 8000`) and open it in a browser. `#`, `#/magic`, and `#/software` work without special routing configuration. Three.js is imported from jsDelivr if WebGL is available; a static artwork fallback works without WebGL.

## Deliberately postponed

Real 3D cat rigging, dynamic interior scenes, custom shader lighting and physical rain simulation, booking backend and CMS. The existing Magic and Software content is unchanged. This is a gateway iteration for visual feedback.