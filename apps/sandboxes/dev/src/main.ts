import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { DevAppComponent } from './app/dev-app.component';

bootstrapApplication(DevAppComponent, appConfig)
  .catch((err) => console.error(err));
