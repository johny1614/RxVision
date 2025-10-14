import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {MarkerLane} from "./MarkerLane";
import {Color} from "../../ui/Color";
import {MarkersStorage} from "./MarkersStorage";

@Injectable({providedIn: 'root'})
export class MarkerLanesStorage {
  constructor(
    private readonly markersStorage: MarkersStorage
  ) {
  }

  select(): Observable<MarkerLane[]> {
    const colors = Object.values(Color);
    return this.markersStorage.select().pipe(
      map(markers =>
        Object.keys(markers).map((id, i) =>
          new MarkerLane(markers[id], colors[i % colors.length], id)
        )
      )
    );
  }
}
