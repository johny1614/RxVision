import {Component, ViewEncapsulation} from '@angular/core';
import {RxVisionModule} from "./rx-vision.module";

@Component({
    selector: 'rx-vision',
    imports: [RxVisionModule],
    template: `<app-panel></app-panel>`,
    encapsulation: ViewEncapsulation.None,
    styles: `:host, :host * {font-family: Roboto, "Helvetica Neue", sans-serif;}`
})
export class RxVisionComponent {

}
