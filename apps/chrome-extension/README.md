This library's purpose is to provide a Chrome DevTools extension for RxVision. <br>
ALl logic responsible for client application to DevTools communication is here.

Important files are:
- `manifest.json` – describes extension
- `background.js` – background script, runs on browser startup (has dedicated console)
- `content.js` – injected into client application (runs in client page context)
- `devtools.html` – defines the DevTools panel UI (on F12 → RxVision tab)
- `devtools.js` – script loaded by devtools.html, responsible for loading panel.html
- `panel.html` – page which loads RxVision whole UI
- 