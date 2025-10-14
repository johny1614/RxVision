import {map, Observable} from "rxjs";
import {TimelineRange} from "../timeline-range";
import {Injectable} from "@angular/core";
import {TimelineFullRangeSpecificationStorage} from "./TimelineFullRangeSpecificationStorage";
import {TimelineFullRangeSpecification} from "./TimelineFullRangeSpecification";

@Injectable({providedIn: 'root'})
export class TimelineFullRangeStorage {

  constructor(
    private timelineFullRangeSpecificationStorage: TimelineFullRangeSpecificationStorage,
  ) {
  }

  select(): Observable<TimelineRange> {
    return this.timelineFullRangeSpecificationStorage
      .select()
      .pipe(
        map((specification: TimelineFullRangeSpecification) => {
          return new TimelineRange(0, specification.endTime, true);
        })
      )
  }
}
