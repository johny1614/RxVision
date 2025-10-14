import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {markerWidthPx, markerLaneHeightPx} from "../../ui/uiConsts";
import {MarkerLane} from "../../app/marker/MarkerLane";

@Component({
    selector: 'ui-marker-lane',
    templateUrl: './marker-lane.component.html',
    styleUrls: ['./marker-lane.component.css'],
    encapsulation: ViewEncapsulation.None,
    host: {'[style.--marker-lane-color]': 'markerLane?.color'},
    standalone: false
})
export class MarkerLaneComponent {

    @Input()
    markerLane: MarkerLane;

    @HostBinding('style.height.px') get hostHeight() {
        return markerLaneHeightPx;
    }

    getMarkerTranslateXPosition(markerPosition: number) {
        const halfIconWidth = markerWidthPx / 2;
        return markerPosition - halfIconWidth;
    }
}
