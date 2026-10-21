# Natasha Nicole Remoto — Portfolio

A coquette macOS-style desktop portfolio. Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Run it
Open `index.html` in a browser (double-click it).

## Put it online (free)
- **Vercel / Netlify:** drag and drop this whole folder into their dashboard.
- **GitHub Pages:** upload the folder's contents to a repo, then Settings > Pages > deploy from `main`.

## Folder structure
```
index.html                         page markup (windows, dock, lock screen)
css/style.css                      all styles and animations
js/script.js                       boot/lock intro, profile reel, windows, dock, certificate viewer
assets/profile.jpg                 your profile photo (replace with a new one, same name)
assets/Natasha-Remoto-Resume.pdf   résumé behind the Download button (replace with your own)
assets/certificates/               16 certificate images shown in the viewer
```

## Common edits
- **Profile story scenes:** the `<div class="sc">` blocks inside `#reel` in `index.html`; timings are `DUR` in `js/script.js`.
- **Organizations / Projects / Toolbox / Contact:** the `<section class="win" id="w-...">` blocks in `index.html`.
- **Add a certificate:** copy a `<div class="cc">` card in `#w-certs`, then add its image path to the `CERT` object in `js/script.js` (key = the card's title).
- **Colors:** the variables at the top of `css/style.css` (`--deep`, `--pink`, `--chip`, ...).
