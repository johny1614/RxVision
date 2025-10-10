import {Component, ViewEncapsulation} from '@angular/core';
import {AppModule} from "ui/app/app.module";

@Component({
    selector: 'rx-vision',
    imports: [
        AppModule
    ],
    template: `
        <app-new-panel></app-new-panel>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: `
    :host, :host * {
        font-family: Roboto, "Helvetica Neue", sans-serif;
    }
    `
})
export class RxVisionComponent {

}
