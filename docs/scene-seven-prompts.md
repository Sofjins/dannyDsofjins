# Scene 7: cloth, continuous paving and tube light

Assets were edited with the built-in imagegen tool, not the API fallback. Original assets are retained.

- `assets/v25/curtains-alpha.webp`: transparent cloth-only atlas, exported losslessly from `exec-682e4e18-922d-4769-bf7f-6c22dee401a5.png`.
- `assets/v25/cloth-background.webp`: stationary shop interior behind the fabric, from `exec-54f1693e-150b-437a-b1d6-a640f0f30810.png`.
- `assets/v25/street-environment-wide.webp`: continuous unobstructed foreground, from `exec-2b766e47-4d7d-4cd3-9eb2-78ac6c9c55a0.png`.
- `assets/v25/street-environment-portrait.webp`: corresponding tall environment, from `exec-0b214678-3bba-4c98-b28a-ff7b7e9b8657.png`.

## Cloth extraction prompt

Use case: background-extraction. Edit this exact 1536x1024 artwork into a TRUE TRANSPARENT RGBA sprite atlas. Keep ONLY the three burgundy noren fabric panels over Magic Shop entrance, around x=291..602 and y=316..454. Preserve exact original canvas, placement, size, silhouette, fabric folds, dark wine-red colors, worn woven texture and the gold 術 character on the center panel. Everything else is fully alpha-transparent, including gaps/slits BETWEEN the three fabric panels, wood mounting bar, walls, shop interior, candle light visible in gaps, roof, door frame, all plants. No black or colored background, no glow outside the cloth, no rectangular opaque crop. At the top keep the exact suspension edge, at the bottom preserve each slightly curved uneven hem. Do not rearrange or enlarge. This is isolated moving cloth over stationary architecture. Output 1536x1024, identical registration to reference.

## Stationary backdrop prompt

Use case: precise-object-edit. Create a clean stationary background plate from this exact 1536x1024 artwork. Remove ONLY the three burgundy cloth panels/noren over Magic Shop entrance at x=288..605,y=315..461. Reveal the dim warm shop interior and fixed wooden doorway behind them, with straight crisp structural lines and plausible detailed dark shelving, not blurred smeared red fabric. Keep the overhead hanging bar. No floating cloth fragments, no extra candles/lights. Also remove the obsolete MAGENTA coffee-sign reflection on the roadway between x=1190..1350,y=815..1024; reconstruct detailed wet blue-black cobblestones in that small area without any pink reflected words, cup or vertical magenta streak. Do not alter the coffee sign itself. Preserve all other pixels, framing, camera, existing colors, sharpness, signs, bicycle, original plants and pavement. Do not regenerate or move any architecture. No new objects. Output same 1536x1024 canvas.

## Environment prompt (applied separately to each layout)

Use case: precise-object-edit. Preserve this exact composition, image dimensions, shop sizes, camera, perspective, pavement height and all facade details. Change ONLY the foreground roadway and near-camera obstructions: REMOVE all close foreground railing bars/bollards and blurry leaf clusters at the bottom left and bottom right. Continue the same finely detailed wet cobblestone roadway cleanly across the ENTIRE image with no black/brown smears, no blurry posts, no sudden seams, no blurry foreground obstruction. REMOVE the old vertical magenta COFFEE sign reflection on the right side of the roadway entirely; replace it with subtle cold wet blue-black cobblestones (no reflected cup or words or pink stripes there). Keep amber and cyan light pools and natural small irregular specular highlights. Do not add a new coffee reflection: that is rendered dynamically later. Do not move or duplicate the curb, drainage grate or manhole. Keep all buildings, bicycle, boxes and shop interiors unchanged, no new objects or cats. Less than 5% mist, preserve crisp detail, cinematic dark sidewalls. This is one seamless surface for a website 3D overlay, not a redesign.

## Runtime design

The same registered environment texture supplies the foreground inside and outside the source image, instead of crossfading two incompatible sets of foreground rails. The original source remains available in Original mode. Plant cleanup includes the former leaf tips beyond the animated maple's rectangle. Curtains have transparent hems/gaps, separate phase/frequency and fixed upper attachments. Neon attenuation follows colored emitting pixels within each sign, not a radial dark overlay. Four of eight circuits have independent dropouts; the others breathe subtly. Coffee reflection samples the actual inverted new sign, breaks it up over wet stones and shares the sign's electrical intensity. These remain 2.5D light approximations; architecture is not a full ray-traced 3D reconstruction.
