import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Circle} from "../circle/circle";

@Component({
    selector: 'app-panel-emissions-timeline',
    templateUrl: './panel-emissions-timeline.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PanelEmissionsTimelineComponent {

  @Input()
  streamsCircles: { [streamId: string]: Array<Circle> };

}
