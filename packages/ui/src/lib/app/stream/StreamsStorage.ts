import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Stream} from "./Stream";
import {Color} from "../../ui/Color";
import {MarkersStorage} from "../marker/MarkersStorage";

@Injectable({providedIn: 'root'})
export class StreamsStorage {
  constructor(
    private readonly markersStorage: MarkersStorage
  ) {
  }

  select(): Observable<Stream[]> {
    const colors = Object.values(Color);
    return this.markersStorage.select().pipe(
      map(emissionMarkers =>
        Object.keys(emissionMarkers).map((id, i) =>
          new Stream(emissionMarkers[id], colors[i % colors.length], id)
        )
      )
    );
  }
}
