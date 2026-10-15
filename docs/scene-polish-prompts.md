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

