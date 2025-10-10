import {Marker} from "../../ui/marker/Marker";
import {Color} from "../../ui/Color";
import {GroupingMarker} from "../../ui/marker/grouping-marker/GroupingMarker";

export class Stream {
  constructor(public emissionMarkers: Array<Marker | GroupingMarker>,
              public color: Color,
              public id: string
  ) {
  }
}
