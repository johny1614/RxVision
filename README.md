# RxVision

RxJS streams visualizer and debugger for Chrome DevTools and standalone use.<br>
Integrate it with your web application by marking emission points, and instantly inspect how your streams behave in real time inside DevTools.

---

## Gallery
![Gallery 1](assets/graph.png)


## Video
Coming soon (demo video will be added here)


## StackBlitz demo

1. Make sure you have RxVision extension installed from [Chrome Web Store](https://chrome.google.com/webstore/detail/rxvision-rxjs-streams-v/ldgfbffkpkdmdmflfjdlnaclhkmjblmd)
2. Open [this StackBlitz demo project](https://stackblitz.com/edit/vitejs-vite-txfkgfrf?file=src%2Fmain.ts)
3. Open Chrome DevTools (F12) and navigate to RxVision tab
4. There you go! You can see emissions from the demo project in real time.

## Basic usage in your project

1. Make sure you have RxVision extension installed from [Chrome Web Store](https://chrome.google.com/webstore/detail/rxvision-rxjs-streams-v/ldgfbffkpkdmdmflfjdlnaclhkmjblmd)
2. Install the library in your project with one of these commands:

   ```bash
   npm install rx-vision
   ```
   ```bash
   yarn add rx-vision
   ```
    ```bash
   pnpm add rx-vision
   ```
   depending on your package manager.

3. Mark observable's emission points in your code using the `addRxVisionEmission` function which takes 2 parameters:
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


## Contributing
Contributions are welcome!
1. Fork this repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request
---

## UI development
Most of the time you want to develop in this mode.
This development mode allows you to work on RxVision UI and see changes in real time in the browser.
1. Clone this repository to your local machine
2. Make sure you have installed:
    - Python 3.11+ (`python --version`)
    - Node.js 22.14+ (`node --version`)
    - Angular CLI 20+ (`ng version`)
3. Run:
   ```bash
   npm install
   ```
4. Run:
   ```bash
   ng serve dev
   ```
4. Open http://localhost:4200 in a new browser tab
5. Any code modifications in `packages/ui` directory will be automatically rebuilt and reflected in the browser.


## Chrome extension development
This development mode allows you to check changes connected to chrome extension technicalities.
1. Follow steps 1-3 from [UI development](#ui-development)
2. Run:
   ```bash
   ng serve demo-app
   ```
3. Optionally - modify the source code in `apps/chrome/extension` before building the extension
4. On another console run:
   ```bash
   npm run build:extension
   ```  
   This script compiles the extension into `dist/rxvision-extension` directory.
5. Navigate in Chrome browser to `chrome://extensions` – enable developer mode and load unpacked extension (pass `dist/rxvision-extension` directory).<br><br>
   If you've done this step before – just reload is enough.
6. Open http://localhost:4200 in a new browser tab
7. RxVision UI is available in Chrome DevTools (F12 → RxVision tab)
---

## Issues & Support
- Found a bug? Please open an [issue](../../issues).
- Questions or suggestions? Feel free to reach out via GitHub Issues or Discussions.

---

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---
## Project Structure

- **packages/api**  
  *Npm package* — [rx-vision](https://www.npmjs.com/package/rx-vision)  
  Stable API for sending emissions from user code to RxVision extension.

- **packages/ui**  
  *RxVision UI, domain and application logic.*

- **apps/chrome/ui-host**  
  *Angular application which hosts `packages/ui`.*

- **apps/chrome/extension**  
  *Chrome Extension host & glue.*  
  Its build output is a Chrome extension with Angular application from `apps/chrome/ui-host`.

- **apps/sandboxes**  
  *Angular apps that are not considered vital for RxVision product itself.*  
  Purposes: development, presentation, testing.
    - **demo-app** – Angular app used to test and demonstrate RxVision extension in DevTools.
    - **dev** – Angular app used to develop RxVision UI as a standalone app (without Chrome extension).
    - **iframe-host** & **iframe-client** – Angular apps used to test and demonstrate RxVision extension in iframes.
