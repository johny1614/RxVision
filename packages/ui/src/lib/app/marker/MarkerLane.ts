import {Marker} from "../../ui/marker/Marker";
import {Color} from "../../ui/Color";
import {GroupingMarker} from "../../ui/marker/grouping-marker/GroupingMarker";

export class MarkerLane {
  constructor(public markers: Array<Marker | GroupingMarker>,
              public color: Color,
              public id: string
  ) {
  }
}
