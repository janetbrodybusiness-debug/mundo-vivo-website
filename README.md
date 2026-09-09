# Mundo Vivo GitHub Website Package

Static GitHub Pages-ready landing website for Mundo Vivo.

## Included
- `index.html` — full website structure
- `styles.css` — responsive Mundo Vivo styling
- `script.js` — mouse-follow animation, ON/OFF toggle, local preference memory, signup-form front-end validation
- `assets/mundo-vivo-bg.png` — underwater landing artwork

## Mouse-follow option
The interactive artwork is ON by default. Visitors can switch it ON/OFF using the control in the bottom-right corner. The choice is remembered with `localStorage`.

To replace the temporary SVG fish with the final approved transparent artwork:
1. Put the PNG in `assets/`, e.g. `assets/interactive-mouse-art.png`.
2. Replace the SVG inside `<div id="mouse-art">` in `index.html` with:
   `<img src="assets/interactive-mouse-art.png" alt="" />`
3. Add `.mouse-art img{width:100%;height:100%;object-fit:contain}` to `styles.css`.

## Launch-list form
GitHub Pages is static and cannot save email addresses by itself. The form is visually complete and validated, but production email capture must be connected to Formspree, Mailchimp, Brevo, Airtable automation/API, or another backend endpoint.

## GitHub Pages deployment
This project requires no build process, npm, React, or server. Upload the files to a GitHub repository and publish from the repository root with GitHub Pages.
