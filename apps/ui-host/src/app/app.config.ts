import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {IS_DEVELOPER_MODE} from "ui/isDeveloperMode";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: IS_DEVELOPER_MODE, useValue: false}
  //     TODO na pewno tak? bo to jakby mowi ze na pewno jestesmy w trybie devtoolsa
      // no i moze inaczej to nazwac trzeba albo wywalic wgle - zastanow sie
  ]
};
