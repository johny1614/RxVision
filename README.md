# RxVision

RxJS streams visualizer and debugger for Chrome DevTools and standalone use.
Integrate it with your web application by marking emission points, and instantly inspect how your streams behave in real time inside DevTools.

---

## Demo usage
// TODO add demo video here  
// TODO add screenshot of timeline view

---

## Basic usage in your project
1. Install the RxVision extension from the Chrome Web Store – // TODO give link
2. Install the library with `npm install rx-vis-lib-new` or `yarn add rx-vis-lib-new` depending on your package manager
3. Mark emission points in your code using the `addRxVisionEmission` function which takes 2 parameters:
  - `streamName: string` – unique identifier of the stream
  - `emissionValue: any` – value emitted

Example:

```ts
const streamName = 'A';

setTimeout(() => {
  addRxVisionEmission(streamName, 'value of first emission');
}, 1000);

setTimeout(() => {
  addRxVisionEmission(streamName, 'another value of emission');
}, 2000);

setTimeout(() => {
  addRxVisionEmission(streamName, { valueCanBe: 'object or any type!' });
}, 3000);
```

---

## Development
1. Clone this repository to your local machine
2. Make sure you have Python 3.11 or newer installed (you can check this running `python --version`)
3. Optionally, modify the source code before building the extension
4. Run:
   ```bash
   npm run build-extension
   ```  
   This script compiles the extension into `dist/rxvis-extension` directory.
5. Navigate in chrome browser to `chrome://extensions` – enable developer mode and load unpacked extension (pass `dist/rxvis-extension` directory).  
   If you've done this step before – just reload is enough.
6. Open http://localhost:4200 in a new browser tab
7. RxVision UI is available on the main page and in Chrome DevTools (F12 → RxVision tab)

---

## Important files for development
Everything in `src/chrome-extension-js` is passed by `build-extension.py` script into `dist/rxvis-extension`.

Files of chrome-extension-js are:
- `manifest.json` – describes extension
- `background.js` – background script, runs on browser startup (has dedicated console)
- `content.js` – injected into client application (runs in page context)
- `devtools.html` – defines the DevTools panel UI (on F12 → RxVision tab)
- `devtools.js` – script loaded by devtools.html, responsible for loading panel.html
- `panel.html` – page with stream's timelines and emissions

---

## Contributing
Contributions are welcome!
1. Fork this repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## Issues & Support
- Found a bug? Please open an [issue](../../issues).
- Questions or suggestions? Feel free to reach out via GitHub Issues or Discussions.

---

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## TODO / Planned improvements
Tak na teraz:
- Sprawdzenie czy obecne zmiany nie wprowadzily jakiegos regresu na devtoolsie
- Testy z devtoolsem
- Testy z iframem
- Wrzucenie liby do tego reposa (appliera na razie nie)
- Research odnosnie appliera kolejny - moze ai juz dzisiaj to ogarnia, moze copilot to umie?

Bugs:
- On F12 last tick is stuck when going into custom range and later back to full range


UI analysis/improvements:
- Dott lines of streams + po lewej stronie pewnie tez by sie przydaly moze? 
- Może nie pozwalać na zmiane rozmiaru panelu z lewej na wiekszy niz wszystkie streamy? - bo pojawia
się problem z tym jak zrobimy duzo mniejsca z lewej i potem zwężamy body

Bugs:
- Sometimes selecting range is buggy - there is 0 ms (maybe after we go back to Full range?)

- Design changes
  - Colorful lozenge with name of stream on left
  - Gentle horizontal line for every stream
  - Vertical stacking of emissions
  - +x icon when vertical stacking is sussy
- Play/pause/stop panel (To analyze how it should looks like and works)
- rxVisLibNew project - it should be in this repo as a library pipeline that upgrades it on npm
- rxVisUser - it should be as demo/angular + maybe give react one for fun huh?
- Selecting markers - and displaying them in a sidebar (to analyze UI/UX)
- Exporting data as JSON
- Importing data from JSON
- Exporting to Image/PDF
- Stream based on different streams (with particular rxjs pipe)
- X-markers in a stairway fashion
- Dark mode (toggler && auto based on system theme or maybe time of day?)
- Approach of not rerendering all markers components but only changing their positions when possible
- Test on a lot of emissions (performance)
- Ability to hide stream
- Ability to stop getting more emissions
- Movie with demo of usage

## Project Structure

- **demo-app/**  
  *Realistic Angular app demonstrating RxVision end-to-end in devtools tab.*  
  Uses npm package from /api and expects the Chrome extension to be loaded.

- **chrome-devtools/**  
  *Chrome DevTools host & glue.*
  *It's build (npm run build) output is Chrome extension to be loaded in chrome browser *
  **No domain/UI logic resides here.**

- **frontend/**  
  *RxVision UI, domain and application logic.*
  *Can be run with ng serve for dev purposes.*

- **api/**  
  *Npm package.*
  Stable API for sending emissions from user code to RxVision (as used in `demo-app`).  
  Contains no Angular or Chrome-specific code.






