# Sora — ikki kichik olam

Static Uzbek-language website with no build step. Serve this directory with any static web server.

- `index.html`: two-choice landing page.
- `gullar.html`: original pink-flower website, with a small return link added. Original letter, music and illustrations are retained.
- `sarguzasht.html`: original Uzbek story, “Yo‘qolgan yulduz”, with a scroll-linked landscape, chapter navigation, optional packing interactions and motion controls.
- `landing.js`: redirects original section hashes to the preserved flower page.

The adventure uses newly authored SVG artwork and text. Une Mini Aventure (https://uneminiaventure.webflow.io/) inspired the general scroll-driven story format only; no source code, visual assets or story text were copied. Google Fonts are optional; system fallback fonts work offline.

Accessibility: semantic links and buttons, keyboard focus indicators, labelled chapter navigation, live packing status, reduced-motion support and a manual motion toggle. Story text and navigation remain available without JavaScript.

Deploy these files at a static host's document root or subdirectory. Relative links support GitHub Pages project paths. The feature branch does not automatically replace the live site; merge the PR and use the repository's hosting setup to publish.
