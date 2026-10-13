# Danny Sofjins — Rift + Typography Prototype

A **lightweight, interactive design prototype** for [dannysofjins.xyz](https://dannysofjins.xyz/).

The website has three connected worlds:

- **Gateway** — two clickable, animated portals.
- **Magic** — interactive disappearing-card moment, performances, school teaser and booking enquiry.
- **Software** — three external project links, engineering profile and downloadable CV.

## Try the prototype

Open `index.html` in a browser. Everything important works without a build step. For a local server, run `python3 -m http.server 8080` in this folder and visit `http://localhost:8080`.

Navigation uses **hash links** (`#/magic`, `#/software`) for the prototype so direct links and Back/Forward work even on static hosting or local files. We can switch to clean URL routing when choosing final deployment/rewrites.

## Implementation

- Vanilla HTML, CSS and JavaScript (no React, no framework, no npm dependencies).
- Three.js is a **progressive enhancement**, dynamically imported from jsDelivr only to render a tiny star field and rift line. If WebGL or the CDN is unavailable, the site stays fully usable.
- No photography, 3D assets, image generation, GPU physics or heavy bundles.
- Card trick is a simple CSS/JS illusion; visual previews for projects are **abstract placeholders**, not actual screenshots.
- Contact form validates input and opens a prefilled `mailto:` draft; it does **not** send or store data. We'll wire a proper booking backend later.
- Motion reduced for `prefers-reduced-motion` and simplified on mobile.

## Assets to supply later

- Performance photographs and short videos, booking details, magic school pricing/schedule.
- Verified project descriptions, real screenshots and scope of your involvement.
- Instagram and other social accounts.
- Custom domain hosting configuration, booking/lead collection and analytics.

## Original site

The prototype replaces `index.html` **on a design branch only**. The existing CV PDF remains available; the main branch and live website are not changed.