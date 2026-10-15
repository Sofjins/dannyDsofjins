# Living street: direction and implementation

## Brief

Use `two_shops.png` for the composition: warm Magic Shop on the left, cool Software Hub on the right. Borrow the second reference's drifting mist and warm/cool atmosphere. The street is the landing, and each door transitions to its own world. Interior scenes will be planned separately.

## Chosen approach

Start with a hybrid Three.js scene. The supplied architecture stays rigid and keeps its fine detail. Moving objects are separated from that artwork and have their own geometry, transforms and timelines. This provides a closer match than replacing the street with a procedural full-3D blockout. A fully navigable street would require authored geometry, materials, lighting and models as a later asset-production phase.

## Implementation stages

1. **Separate the artwork.** Preserve the original WebP for fallback and Original mode. Reconstruct the pavement behind the painted cat, then composite only that small region into the live background. Keep the existing lantern/flame cutouts. Extract five foliage silhouettes, reconstruct their narrow exposed boundaries, and give them anchored meshes.
2. **Animate the cat.** Use an independent 3D character with paired leg joints, inverse-kinematic paw placement, an articulated tail, a head and ears, and localized warm/cool illumination. Its 36-second route connects the water bowl to the crate beside the bicycle. The sequence includes drink, walk, crouch, jump, absorb the landing, perch, jump down and return. Jump trajectories and crate height are shared testable coordinates. The current model is procedural; replacing its anatomy/materials with a bespoke GLB is the main quality upgrade if browser review shows it does not fit the artwork.
3. **Add secondary motion.** Stems stay planted while leaf tips move. Lantern impulses decay, flames have independent rhythms, and selected neon segments briefly dim. The neon dip also reaches its pavement reflection. Three shader planes place drifting mist behind and in front of the character; existing sparse ground drizzle and puddle rings remain.
4. **Make the doors feel like entrances.** Accessible links stay aligned to the openings. Clicking shifts the view toward that doorway and fades into the existing destination. These pages remain temporary destinations until the second scenes are designed.
5. **Verify and publish.** Preserve full-street framing, explicit mobile close views, an untouched Original mode, reduced-motion support, tab visibility pausing and no-WebGL navigation. Run motion/contact checks, real WebGL screenshots and both door routes. Push to the existing repository; Coolify auto-deploys it.

## Quality gates

- Exactly one visible cat in live mode, with no painted duplicate at the bowl.
- Paws land at image coordinate y=707 on the bicycle-side crate. Walking feet use joint solving rather than translating an unmoving silhouette.
- The roof and shop architecture stay pixel-stable while the independently registered props move.
- Original mode restores the supplied image without the clean patch or animated props.
- Fog stays subtle enough to retain readable signs and the warm/cool separation.
- The model must be judged in motion at actual display size. Automated animation tests do not establish cinematic asset quality.
- Door routes work on desktop, mobile and when WebGL is unavailable.

## Asset provenance

`assets/v25/street-master.webp` is the existing repository's derivative of the user's supplied artwork. `assets/v25/street-clean.webp` is a size-optimized derivative of the cat-removal edit generated with the built-in imagegen tool. Only a 188 × 114 pixel patch is composited into the live scene; the rest of the generated image is not substituted for the approved street. The cat geometry, motion, mist and plant mesh animation are authored in code. The vendor bundle is Three.js 0.184.0; its upstream license is retained beside the bundle.

### Clean-plate prompt

Use case: precise-object-edit. Edit target: the supplied 1536 x 1024 two-shop street artwork. Asset type: clean background plate for an interactive Three.js scene. Remove ONLY the black cat near the center bottom (approximately x=646..801, y=685..785) and its cast shadow. Reconstruct the small area behind it as continuous realistically textured stone pavement, curb, and the dark base of the existing plant pots and wall, matching their exact perspective and lighting. Keep the water bowl at x=792 y=761. Keep absolutely everything else unchanged: both storefronts, composition, all lettering, lanterns, plants, bicycle, boxes, wet street reflections, exact framing and dimensions, black levels and color grade. Do not add any animal or new object. The result must look like the very same image photographed with the cat absent. This is a narrowly localized removal, not a redesign.
