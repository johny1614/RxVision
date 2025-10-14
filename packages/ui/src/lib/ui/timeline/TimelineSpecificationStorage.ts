import {Injectable} from "@angular/core";
import {Observable, switchMap, tap} from "rxjs";
import {TimelinesService} from "./TimelinesService";
import {FullTimelineSpecificationStorage} from "./full/FullTimelineSpecificationStorage";
import {ChosenTimelineSpecificationStorage} from "./chosen/ChosenTimelineSpecificationStorage";
import {TimelineSpecification} from "./TimelineSpecification";

@Injectable({providedIn: 'root'})
export class TimelineSpecificationStorage {
  constructor(
    private readonly timelinesService: TimelinesService,
    private readonly fullTimelineSpecificationStorage: FullTimelineSpecificationStorage,
    private readonly chosenTimelineSpecificationStorage: ChosenTimelineSpecificationStorage
  ) {
  }

  selectActive(): Observable<TimelineSpecification> {
    return this.timelinesService.selectActive()
      .pipe(
        switchMap(activeTimeline => {
          if (activeTimeline.isFullRange) {
            return this.fullTimelineSpecificationStorage.select();
          } else {
            return this.chosenTimelineSpecificationStorage.selectWhenActive();
          }
        }),
        tap(x => {
        })
      )
  }
}
