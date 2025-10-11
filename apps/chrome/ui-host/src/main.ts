import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ChromeExtensionUiHostAppComponent } from './app/chrome-extension-ui-host-app.component';

bootstrapApplication(ChromeExtensionUiHostAppComponent, appConfig)
  .catch((err) => console.error(err));
