# Living street: direction and implementation

## Brief and approach

Keep the supplied two-shop composition: warm Magic Shop left, cool Software Hub right. Use the second reference for blue atmospheric mist and warm pools of light, not rain. The landing fills the viewport. Its doors retain existing destination pages; new interiors are out of scope.

This is a hybrid scene, not a fully navigable 3D street. Architecture stays on a rigid reference-matched quad. Nine plant clusters and three curtain panels are separate textured meshes with anchored deformation; lanterns and flames are registered cutouts. A licensed, authored 3D cat receives warm/cool scene lighting and a contact shadow. Five shader mist layers add depth.

## Character and motion

The free Somali Cat Animated ver 1.2 by DreamNoms replaces the earlier procedural character. Five authored clips are retained: Idle, WalkClean, SitDown, SittingIdle and StandUp. See [credits](../assets/v25/models/CREDITS.md).

A seeded behavior planner chooses destinations, variable walking speeds, 10–46 second rests and drinking visits. The cat also visits the left side; it does not repeat a fixed two-second or fixed-length route. Crate visits include anticipation, a ballistic arc, leg tucking and a front-first landing, then a longer seated rest. These jump/drink adjustments are custom skeletal animation on the existing model, not authored source clips. Ground is y=778 and crate top y=707 in artwork coordinates. Actual skeleton contact checks accompany trajectory tests.

## Lighting, signs and interaction

- Software Hub uses a larger Hub word. The three smaller terminal placards pulse independently; Canoodling carries an orange Claude-style asterisk.
- Coffee/cup and OPEN 24/7 sit at the window's bottom-left. Coffee has irregular short power dips, not a constant blink. A narrow vertical Japanese development sign occupies the right side.
- Lanterns retain gentle breeze between stronger damped gusts. Their light and candle light vary independently.
- Three individual gutter droplets fall into the bowl every 7.4 seconds; ripples start after impact. There is no rain sheet or continuous stream.
- Doors remain keyboard-accessible links, with a short entry transition. Mobile explicitly focuses each storefront while persistent links keep both destinations reachable.
- Original mode and reduced motion restore the untouched artwork. No-WebGL fallback preserves navigation.

## Quality gates

Real browser tests verify full-viewport cover, original-image color fidelity, rigid architecture, independent props, visible neon flicker at the new Coffee location, cat states, both door routes and mobile/reduced-motion/fallback behavior. Pure tests cover ten minutes of continuous trajectories, deterministic seeds, varied schedules, GLB contents and actual skeletal landing contacts. Screenshots and browser recordings remain necessary for visual judgement.

The hybrid approach cannot reveal unseen sides of plants or architecture. Custom jump adaptation should be reviewed at actual display size; it is not equivalent to a film-quality animated asset.

## Asset provenance

`street-master.webp` is the repository's derivative of the supplied two-shop artwork. `street-clean.webp` is a WebP export of successive built-in imagegen edits. Only five small feathered rectangles are composited into live mode: cat removal [628,678,188,114], enlarged Hub [1090,188,145,95], compact placards [1231,112,243,205], Coffee relocation [1106,548,216,151], Japanese sign [1330,312,54,223]. Everything outside those and the independently animated cutouts keeps original pixels. Original mode never uses the edited plate.

Generated images are artwork edits, not new 3D models. The model is separately licensed; Three.js' upstream license is retained beside the vendor bundle.

### Image-edit specifications

1. **Clean plate — precise-object-edit.** Remove only the painted cat and its shadow around x646–801/y685–785. Reconstruct pavement, curb and pot bases in the same perspective and lighting. Preserve the bowl, both storefronts, lettering, lanterns, plants, bicycle, crates, framing and color grade. No replacement animal.
2. **Hub lettering — text-localization.** Enlarge Hub to visually match Software while keeping the same blue neon tube style, sign border and perspective. Do not redesign the storefront.
3. **Terminal placards — precise-object-edit.** Make the three Canoodling / git commit / git push placards more compact. Place an orange Claude-style asterisk beside Canoodling. Preserve surrounding cables, masonry and all other signs.
4. **Coffee and Japanese neon — precise-object-edit/text-localization.** Move the existing cup, COFFEE and opening hours from the bottom-right to the bottom-left of the Software Hub window. Use OPEN above 24/7, not WORKING. Restore the old location as dark window glass. Add one slim, simple vertical development/programming neon at the right, with blue-violet Japanese lettering. Keep all other scene elements unchanged.

The final selected image edit is `exec-300c1bdf-5a52-4ce6-9ec6-d939f7df0781.png`, generated in this task and exported at original 1536×1024 resolution. Runtime feathered patch compositing prevents incidental changes elsewhere in that generated plate from replacing approved artwork.

## Full composition, full viewport

The earlier cover-style layout enlarged and cropped the artwork on non-3:2 screens. Full street now uses contain-style fitting for the actual interactive art, with generated side/vertical environment extensions behind it. This keeps both shops, roof and foreground visible without distortion or a surrounding black frame. Only the explicitly selected mobile close views use cover. A narrow edge feather joins the two layers; no mask is applied at the native aspect ratio, preserving exact reference tests.

`street-surround-wide.webp` and `street-surround-portrait.webp` are built-in imagegen outpaint outputs, exported to WebP. They are decorative background context; the original architecture, animated props and doorway hitboxes still use the untouched 1536×1024 coordinate system. Wide output: `exec-3eee90fa-9837-4a6d-a0b0-ed8dafcda2a5.png` (2172×724). Portrait output: `exec-5fb84f63-0521-453f-9c88-36af5c2331e2.png` (836×1881). Registration offsets are measured against the source, not assumed from the requested output sizes. Full prompts are in `surround-prompts.md`.
