import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";
import 'zone.js';
import {IS_DEVELOPER_MODE} from "./isDeveloperMode";

declare const chrome;
const isChromeExtension = chrome && chrome.runtime;
const isDeveloperMode = !isChromeExtension;

console.log('isDeveloperMode', isDeveloperMode)
platformBrowserDynamic([{
  provide: IS_DEVELOPER_MODE, useValue: isDeveloperMode
}])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
