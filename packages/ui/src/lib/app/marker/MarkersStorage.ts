import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Marker} from "../../ui/marker/Marker";
import {PositionedTimePointsStorage} from "../time-point/PositionedTimePointsStorage";
import {MarkersResolver} from "./MarkersResolver";
import {PositionedTimePoints} from "../time-point/PositionedTimePoints";

@Injectable({providedIn: 'root'})
export class MarkersStorage {

    constructor(
        private readonly positionedTimePointsStorage: PositionedTimePointsStorage,
        private readonly markersResolver: MarkersResolver,
    ) {
    }

    select(): Observable<{ [laneId: string]: Array<Marker> }> {
        return this.positionedTimePointsStorage.select().pipe(
            map((positionedTimePoints: PositionedTimePoints) => {
                const lanesMarkers = {};
                Object.entries(positionedTimePoints).forEach(([laneId, lanePositionedTimePoints]) => {
                    const markers = this.markersResolver.resolve(lanePositionedTimePoints);
                    lanesMarkers[laneId] = [
                        ...(lanesMarkers[laneId] || []),
                        ...markers
                    ];
                });
                return lanesMarkers;
            }));
    }
}
