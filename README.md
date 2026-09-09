# Mundo Vivo — Pixel-Match Landing Page

This version is intentionally built to match the supplied approved landing-page image as closely as possible.

## Controlling references

- `assets/landing-page-reference.png` — exact landing-page image supplied by the user
- `assets/mundo-vivo-logo.png` — exact Mundo Vivo logo supplied by the user
- `assets/mundo-fish-cursor.png` — fish emblem extracted from the supplied logo for mouse animation

## Implementation approach

The approved landing page is rendered as one complete responsive visual so the composition does **not** drift between sections. Functional HTML overlays sit precisely over the visible navigation, buttons and launch-list form.

This avoids the previous problem where recreating/slicing/reflowing sections changed the visual appearance.

## Included functionality

- Exact supplied Mundo Vivo logo overlaid in the header
- Navigation click targets
- Launch-list email form integration point
- Care Experience button
- Mundo Labs / approach button
- Standards button
- Community button
- Supplier enquiry email button
- Footer links
- Mundo Vivo fish mouse-follow animation
- Motion ON/OFF control
- Reduced-motion and touch-device support

## Production note

The visible text is currently part of the approved reference artwork. This is deliberate for visual matching. Later, once the exact design is signed off in-browser, individual text areas can be converted to live HTML without changing the approved look.

## GitHub

Upload the contents of this folder to the repository root. It is a static site and can be hosted with GitHub Pages, Cloudflare Pages, Netlify, Vercel, or similar.

For GitHub Pages: Settings → Pages → Deploy from branch → main / root.
