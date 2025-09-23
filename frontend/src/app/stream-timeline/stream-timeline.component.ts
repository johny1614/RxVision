import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {Stream} from "../stream/Stream";
import {markerWidthPx, streamHeightPx} from "../../ui/uiConsts";

@Component({
  selector: 'app-stream-timeline',
  templateUrl: './stream-timeline.component.html',
  styleUrls: ['./stream-timeline.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.--stream-color]': 'stream?.color'
  }
})
export class StreamTimelineComponent {

  @Input()
  stream: Stream;

  @HostBinding('style.height.px') get hostHeight() {
    return streamHeightPx;
  }

  getMarkerTranslateXPosition(markerPosition: number) {
    const halfIconWidth = markerWidthPx / 2;
    return markerPosition - halfIconWidth;
  }
}
