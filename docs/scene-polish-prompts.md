# Living Street 5 bitmap provenance

All assets use the built-in imagegen editing tool; no API/CLI fallback. Originals remain unchanged. Exported WebP files are in the repository.

- `assets/v25/models/black-shorthair-fur.webp`: generated UV atlas, 1254×1254; runtime replacement for the existing DreamNoms cat material.
- `assets/v25/street-surround-portrait-v2.webp`: 836×1881 decorative extension; interactive source stays overlaid, never stretched.
- `assets/v25/street-pavement-clean.webp`: only [1215,821,110,100] is composited to remove obsolete reflected lettering.

## Black coat

Use case: precise-object-edit. Asset: production UV albedo atlas for an existing rigged 3D cat, 2048x2048 PNG.
Edit this exact UV texture atlas, keeping EVERY island silhouette, position, orientation and boundary EXACTLY fixed. Do not rearrange or add islands. Retexture the existing islands as a realistic BLACK SHORT-HAIRED domestic cat. Replace all white bib/chest/muzzle markings with black fur. Restrained charcoal-black albedo, tiny extremely fine directional short fur strands with dark brown undertones, physically plausible fine detail at nose and paw pads, muted dark warm inner ears. Delicate natural fur flow following existing anatomy: forehead/cheeks center, body across lower middle, tail strip bottom, paw islands left, ear islands top. Keep the original black unused background, no labels, no wireframe, no highlights or baked directional lighting, no new face illustration, no long fluffy fur. Higher detail without bright gray/white hairs. Maintain exact UV registration; this is a drop-in texture replacement, not an image of a cat.

## Portrait environment

Use case: compositing / outpainting. Create a seamless PORTRAIT environment extension of Image 1, a cinematic nighttime two-shop facade. Tall output aspect ratio 4:9, ideally 1536x3456.
Preserve the entire supplied 1536x1024 picture as an unchanged central horizontal band: x=0..1536, y=1216..2240. No zoom, no reshaping, no relocating any element inside this band. Extend ONLY upward and downward.
UPWARD: exact continuation of the existing wall/window/cable geometry from the source's top edge, then a receding second floor of old dark Japanese architecture, faint cool-blue distance mist. Upper floor is 2 stops darker than shops. No additional glowing orange windows, no duplicate shop roof, no extra red lamps, no additional readable signs.
DOWNWARD: exact continuation of the source's bottom-edge cobblestones and cut-off out-of-focus foreground plants/railing; these existing foreground objects continue downward off-frame, NEVER duplicate them, no second railing or second manhole, no extra typography. Blue and muted amber puddle reflections gradually dim toward bottom.
Only two shops, same proportions and relative positions. The CENTER must remain the brightest, most detailed focal point. Outer architecture stays subdued charcoal and midnight blue, no large black empty margins, no vignette frame or borders. No cats anywhere. No additional doors/windows at street level. Elegant cinematic mist, no rainfall. Very fine photographic masonry and paving texture, consistent perspective. This is a website environment extension intended to blend pixel-perfectly behind the unchanged source, not a redesign.

## Portrait foreground repair

Edit this tall image, preserve everything above y=1180 exactly (image is 836x1881). Only repair the lower foreground extension.
Below y=1180 remove ALL duplicate manhole covers and the SECOND set of black foreground railings at y=1540..1881. No second layer of big blurry plants at bottom. Continue the existing side plants/rail posts from y=1100 smoothly down and OUT of the frame without repeating objects. Center from y=1180 to bottom should be one continuous wet cobbled street with smaller patches of broken blue/amber reflections, consistent pavement perspective. It must be 1 to 2 stops darker at the bottom than it currently is, understated charcoal blue, not vivid electric blue or orange rivers. Remove any second curb crossing the middle foreground. No new objects, no new text, no manholes below1180, no frame/borders. Keep the original two shops and top architecture completely unchanged. This is a seamless portrait backdrop for a website, repeated foreground elements look artificial.

## Obsolete pavement reflection

Use case: precise-object-edit. Edit this exact 1536x1024 source image. ONLY repair a small region of wet pavement at x=1215..1320, y=822..916. This area contains an obsolete magenta reflection with upside-down lettering from a coffee sign that has moved. Remove the reflected LETTERING and obvious mirrored cup shape in this small area. Replace with matching dark wet cobblestone texture and sparse irregular violet/blue light glints from neighboring signage, not readable text. Preserve the original paving seams and perspective, no flat blur patch. Keep absolutely all other image pixels, the stores, current COFFEE OPEN 24/7 at left of glass, plant silhouettes, bicycle, foreground, text TWO WORLDS. ONE MIND. and lights unchanged. No cat, no rain, no extra objects.

## Living Street 6: isolated foliage

Built-in imagegen edits; no API fallback. `assets/v25/foliage-alpha.webp` is a lossless RGBA export of the leaf-only atlas (1536×1024). `assets/v25/foliage-background.webp` is the separately reconstructed stationary backdrop. Runtime reads only the registered plant regions, not the entire regenerated scene.

### Foliage alpha atlas

Use case: background-extraction. Produce a TRUE TRANSPARENT RGBA foliage-only sprite atlas from this exact 1536x1024 reference. Keep the original 1536x1024 canvas, exact object placement, exact scale, camera, colors and painted fine detail. Retain ONLY the leaves, small branches and stems of all existing plants, in their original locations: hanging ivy at top center; tall leafy tree at left; low left foliage; small doorway fern at x285 y685; red Japanese maple at x635 y530; fern left of the cat lantern at x627 y651; leafy plant right of cat lantern at x785 y620; vine at x1445 y465; blurred foreground leaves along lower-left. Everything else MUST be fully transparent: no walls, no windows, no pavement, no roof, no pots, no cat, no bicycle, no lantern or sign, no boxes, no railing, no shadow rectangles. Every gap BETWEEN individual leaves and branches must also be transparent, not filled with dark background. This is for individually animated foliage laid over a fixed background: including even a small piece of wall is unacceptable. Do not recolor or redesign the leaves; preserve existing warm light on left and cool blue light on right; precise featherless botanical silhouettes with clean antialiasing, no halos. Do not arrange into a grid or move plants; the blank canvas between plants stays transparent.

### Fixed background plate

Use case: precise-object-edit. Create a clean BACKGROUND PLATE from the exact supplied 1536x1024 street picture for isolated animated foliage overlays.
Remove only ALL plant leaves, thin stems and small branches in these original image regions: top ivy x558..696/y0..152; left tree and low leaves x0..185/y418..680; doorway potted fern x251..346/y643..723; red maple x550..720/y440..619; fern beside cat lantern x588..681/y600..699; broad-leaf bowl plant x720..863/y548..697; right vine x1385..1495/y384..560; foreground blurred garden x70..340/y835..1024.
Reconstruct the now-visible background as CONTINUOUS CRISP wall, dark shop window/interior or wet pavement, matching the exact existing straight lines, materials, grain and lighting. Never use a blur patch to hide a removed plant. Keep ALL pots/planters, the cat lantern, bicycle, railing, window frames, lamps, sign text, box, bowls, curtains and stone architecture exactly unchanged. Especially preserve the vertical window and brick lines behind the red tree. The two shop signs and all neon typography are locked. Do not invent new plants, architecture or objects. No cats. Do not resize, zoom, reframe or recolor the image. Output exactly the same landscape composition. This empty plate is UNDER the leaf sprites; it is essential that no leaf remains behind the animated leaves and no background wall will move.


