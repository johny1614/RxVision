import {Injectable} from "@angular/core";
import {TimelineRange} from "./timeline-range";
import {combineLatest, map, Observable, Subject, take} from "rxjs";
import {TimelineFullRangeStorage} from "./full/TimelineFullRangeStorage";
import {ChosenTimelinesStorage} from "./chosen/ChosenTimelinesStorage";

@Injectable({providedIn: 'root'})
export class TimelinesService {

  constructor(
    private readonly chosenTimelinesStorage: ChosenTimelinesStorage,
    private readonly timelineFullRangeStorage: TimelineFullRangeStorage,
  ) {
  }

  selectActive(): Observable<TimelineRange> {
    return combineLatest([this.selectFullRange(), this.chosenTimelinesStorage.select()]).pipe(
      map(([fullRange, chosenRanges]) => {
        if (chosenRanges.length > 0) {
          return chosenRanges[chosenRanges.length - 1];
        }
        return fullRange;
      })
    );
  }

  selectAll(): Observable<Array<TimelineRange>> {
    return combineLatest([this.selectFullRange(), this.chosenTimelinesStorage.select()]).pipe(
      map(([fullRange, chosenRanges]) => {
        return [fullRange, ...chosenRanges];
      })
    );
  }

  selectFullRange(): Observable<TimelineRange> {
    return this.timelineFullRangeStorage.select();
  }
}
