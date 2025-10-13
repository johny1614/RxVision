import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {markerWidthPx, streamHeightPx} from "../../ui/uiConsts";
import {Stream} from "../../app/stream/Stream";

@Component({
    selector: 'app-stream-timeline',
    templateUrl: './stream-timeline.component.html',
    styleUrls: ['./stream-timeline.component.css'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[style.--stream-color]': 'stream?.color'
    },
    standalone: false
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
