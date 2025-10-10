import {TimelineRange} from "../../timeline-range";
import {BehaviorSubject, Observable, shareReplay} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ChosenTimelinesStorage {

  chosenTimelines$ = new BehaviorSubject<Array<TimelineRange>>([]);

  addTimeline(timeline: TimelineRange) {
    const chosenTimelines = [...this.chosenTimelines$.getValue(), timeline];
    this.chosenTimelines$.next(chosenTimelines);
  }

  setChosenBeforeTimeline(timeline: TimelineRange): void {
    const chosenBeforeTimelines = this.chosenTimelines$.getValue();

    if (chosenBeforeTimelines.length === 0) {
      this.chosenTimelines$.next([timeline]);
      return;
    }

    const timelineIndexInChosenRanges = chosenBeforeTimelines.findIndex(t => t.equals(timeline));
    if (timelineIndexInChosenRanges !== -1) {
      this.chosenTimelines$.next(chosenBeforeTimelines.slice(0, timelineIndexInChosenRanges + 1));
    }
  }

  select(): Observable<Array<TimelineRange>> {
    return this.chosenTimelines$.pipe(
      shareReplay({bufferSize: 1, refCount: true}),
    )
  }

  removeAllTimelineRanges(): void {
    this.chosenTimelines$.next([]);
  }
}
