import {Component, ViewEncapsulation} from '@angular/core';
import {RxVisionModule} from "../rx-vision.module";

@Component({
    selector: 'rx-vision',
    imports: [RxVisionModule],
    template: `<ui-graph></ui-graph>`,
    encapsulation: ViewEncapsulation.None,
    styles: `:host, :host * {font-family: Roboto, "Helvetica Neue", sans-serif;}`
})
export class RxVisionComponent {

}
