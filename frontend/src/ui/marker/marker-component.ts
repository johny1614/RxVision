import {Component, HostBinding, Input, ViewEncapsulation} from "@angular/core";
import {Marker} from "./Marker";
import {Color} from "../Color";
import {GroupingMarker} from "./grouping-marker/GroupingMarker";
import {markerHeightPx, markerWidthPx} from "../uiConsts";

@Component({
  selector: 'app-marker',
  templateUrl: './marker-component.html',
  styleUrls: ['./marker-component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MarkerComponent {

  @Input()
  marker: Marker;

  @Input() color!: Color;

  @HostBinding('style.width.px')   get hostWidth()  { return markerWidthPx; }
  @HostBinding('style.height.px')  get hostHeight() { return markerHeightPx; }


  isGroupingMarker = (marker: Marker | GroupingMarker): marker is GroupingMarker => {
    return marker instanceof GroupingMarker
  };
}
