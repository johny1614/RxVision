import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Marker} from "../../ui/marker/Marker";
import {EmissionsStorage} from "../emission/EmissionsStorage";
import {PositionedEmission} from "../emission/position/PositionedEmission";
import {MarkersResolver} from "../emission/MarkersResolver";

@Injectable({providedIn: 'root'})
export class MarkersStorage {

  constructor(
    private readonly emissionsStorage: EmissionsStorage,
    private readonly markersResolver: MarkersResolver,
  ) {
  }

  select(): Observable<{ [streamId: string]: Array<Marker> }> {
    return this.emissionsStorage.select().pipe(
      map((positionedEmissions: { [streamId: string]: Array<PositionedEmission> }) => {
        const streamsMarkers = {};
        Object.entries(positionedEmissions).forEach(([streamId, positionedEmissions]) => {
          const markers = this.markersResolver.resolve(positionedEmissions);
          streamsMarkers[streamId] = [
            ...(streamsMarkers[streamId] || []),
            ...markers
          ];
        });
        return streamsMarkers;
      }));
  }
}
