import {Injectable} from "@angular/core";
import {Marker} from "../../ui/marker/Marker";
import {GroupingMarker} from "../../ui/marker/grouping-marker/GroupingMarker";
import {PositionedEmission} from "./position/PositionedEmission";
import { markerWidthPx} from "../../ui/uiConsts";

@Injectable({providedIn: 'root'})
export class MarkersResolver {

  resolve(positionedEmissions: Array<PositionedEmission>): Array<Marker> {
    const markers = [];
    const sortedEmissions = positionedEmissions.sort((a, b) => a.position - b.position);
    for (let i = 0; i < sortedEmissions.length; i++) {
      const currentEmission = sortedEmissions[i];
      const currentMarker = Marker.fromPositionedEmission(currentEmission);
      if (i === 0) {
        markers.push(currentMarker);
        continue;
      }
      const previousMarker: Marker = markers[markers.length - 1];
      if (this.shouldJoinPreviousMarker(currentEmission.position, previousMarker.position)) {
        if (previousMarker instanceof GroupingMarker) {
          previousMarker.markers.push(currentEmission);
          markers[markers.length - 1] = new GroupingMarker([...previousMarker.markers, currentMarker]);
        } else {
          markers[markers.length - 1] = new GroupingMarker([PositionedEmission.fromMarker(previousMarker), currentMarker]);
        }
      } else {
        markers.push(currentMarker);
      }
    }
    return markers;
  }

  private shouldJoinPreviousMarker(emissionPosition: number, previousMarkerPosition: number): boolean {
    return emissionPosition - previousMarkerPosition < markerWidthPx;
  }
}
