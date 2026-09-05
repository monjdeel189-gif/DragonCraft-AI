---
name: Vite HTML head asset URLs
description: A deployment-specific Vite behavior affecting canonical and other root-relative head URLs.
---

Root-relative or build-token-only canonical URLs in the HTML shell can be interpreted as local asset paths by Vite and fail production builds with an EISDIR error. Use a verified absolute production URL for canonical/og:url when one is available; keep static asset links rooted at a real public file.

**Why:** The dev server can serve the same HTML successfully while the production HTML transform tries to read a directory as an asset.

**How to apply:** When editing index.html SEO links, run the production build immediately; do not assume a dev-preview success validates Vite's HTML asset transform.