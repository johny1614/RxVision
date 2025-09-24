Files of chrome-extension-js are:
- `manifest.json` – describes extension
- `background.js` – background script, runs on browser startup (has dedicated console)
- `content.js` – injected into client application (runs in page context)
- `devtools.html` – defines the DevTools panel UI (on F12 → RxVision tab)
- `devtools.js` – script loaded by devtools.html, responsible for loading panel.html
- `panel.html` – page with stream's timelines and emissions