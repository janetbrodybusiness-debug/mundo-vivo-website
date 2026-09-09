# Mundo Vivo — Approved Landing Page GitHub Package v3

This version is designed to reproduce the **approved Mundo Vivo landing-page artwork** as closely as possible.

## What changed

- Approved full landing-page artwork is now the visual base.
- Mundo Vivo logo is visible as part of the approved artwork.
- The previous simplified mouse-follow fish has been replaced.
- The cursor follower now uses the branded blue/purple Mundo Vivo fish artwork.
- Fish size reduced to approximately 30 px.
- Fish follows only a few pixels away from the mouse.
- ON/OFF Interactive Art toggle retained.
- Visitor ON/OFF preference is remembered in localStorage.
- Real email input/button is positioned over the approved signup area.
- Static GitHub Pages remains compatible; no npm, React or build process required.

## Updating the current GitHub repository

1. Unzip this package.
2. In GitHub open `mundo-vivo-website`.
3. Upload/replace:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `404.html`
   - the full `assets` folder
4. Commit changes to `main`.
5. GitHub Pages will automatically redeploy.

## Launch-list storage

The form currently validates and responds on the page, but GitHub Pages cannot store emails by itself.
Connect the form to Airtable, Formspree, Brevo, Mailchimp or another backend before collecting public signups.
