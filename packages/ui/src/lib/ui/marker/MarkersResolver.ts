import {Injectable} from "@angular/core";
import {Marker} from "./Marker";
import {GroupingMarker} from "./grouping-marker/GroupingMarker";
import {markerWidthPx} from "../layoutContants";
import {PositionedTimePoint} from "../time-point/PositionedTimePoint";

@Injectable({providedIn: 'root'})
export class MarkersResolver {

    resolve(lanePositionedTimePoints: Array<PositionedTimePoint>): Array<Marker> {
        const markers = [];
        const sortedPoints = [...lanePositionedTimePoints].sort((a, b) => a.position - b.position);
        for (let i = 0; i < sortedPoints.length; i++) {
            const currentPoint = sortedPoints[i];
            if (i === 0) {
                markers.push(Marker.fromPositionedPoint(currentPoint));
                continue;
            }
            const previousMarker: Marker = markers[markers.length - 1];
            if (this.shouldJoinPreviousMarker(currentPoint.position, previousMarker)) {
                if (previousMarker instanceof GroupingMarker) {
                    markers[markers.length - 1] = new GroupingMarker([...previousMarker.markers, Marker.fromPositionedPoint(currentPoint)]);
                } else {
                    markers[markers.length - 1] = new GroupingMarker([previousMarker, Marker.fromPositionedPoint(currentPoint)]);
                }
            } else {
                markers.push(Marker.fromPositionedPoint(currentPoint));
            }
        }
        return markers;
    }

    private shouldJoinPreviousMarker(position: number, previousMarker: Marker): boolean {
        const previousMarkerPosition = (previousMarker instanceof GroupingMarker) ? previousMarker.getLeftiestMarker().position : previousMarker.position;
        return position - previousMarkerPosition < markerWidthPx;
    }
}
