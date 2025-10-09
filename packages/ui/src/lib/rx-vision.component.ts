import {Component} from '@angular/core';
import {AppModule} from "ui/app/app.module";

@Component({
    selector: 'rx-vision',
    imports: [
        AppModule
    ],
    template: `
        <app-new-panel></app-new-panel>
    `,
    styles: ``
})
export class RxVisionComponent {

}
