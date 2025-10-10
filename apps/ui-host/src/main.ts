import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { UiHostAppComponent } from './app/ui-host-app.component';

bootstrapApplication(UiHostAppComponent, appConfig)
  .catch((err) => console.error(err));
