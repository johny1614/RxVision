import {Component, HostBinding, Input, ViewEncapsulation} from "@angular/core";
import {GroupingMarker} from "./GroupingMarker";
import {markerWidthPx} from "../../layoutContants";

@Component({
    selector: 'app-grouping-marker',
    templateUrl: './grouping-marker.component.html',
    styleUrls: ['./grouping-marker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
}
)
export class GroupingMarkerComponent {
  @Input() marker!: GroupingMarker;

  @Input()
  color: string;

  borderWidthPx: number = 1;

  @HostBinding('style.--marker-size.px')
  get cssMarkerSize() {
    return markerWidthPx;
  }

  @HostBinding('style.--border-width.px')
  get cssBorderWidth() {
    return this.borderWidthPx;
  }

  onClick() {
    console.log('this.marker', this.marker);
  }
}
