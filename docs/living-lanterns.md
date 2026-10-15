# Living street — lantern pass

The reference framing, rigid architecture, colour pipeline and existing pages remain unchanged.
Live scene starts automatically after a successful WebGL frame, unless reduced motion is requested.
Original mode restores the untouched source texture exactly.

## Implemented
- Two manually registered lantern silhouettes, cut directly from the approved image.
- Local hidden-background reconstruction inside each silhouette: only a few pixels become exposed during a swing.
- Independent rigid textured planes, pivoted at the actual suspension points. No depth deformation of the architecture.
- Long rests between damped wind impulses; a short extra impulse on pointer hover, keyboard focus or tap.
- Five separately registered candle-flame cutouts with small independent motion.
- Local downward neon intensity dips, sparse foreground drizzle, and small pavement ripples.
- Animation clock pauses while hidden; accessible destination links and no-WebGL fallback retained.

These are carefully registered 2.5D cutouts, not fully volumetric replacement models. The cat remains in the untouched artwork; no duplicate or low-poly cat is introduced.

## Verification
`tests/gateway_reference.py` checks the rigid reference rendering, framing and navigation.
`tests/gateway_living.py` requires actual WebGL, verifies moving pixels and static architecture, checks default autoplay/reduced motion, and records the running browser in `test-results/living-street.webm`.
GitHub Actions uploads the recording and reports as `gateway-reference-proof` (7-day retention).

No production build step or Coolify change is required.
