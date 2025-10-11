import {Injectable} from "@angular/core";
import {TimelineWidthStorage} from "../TimelineWidthStorage";
import {FullTimelineOptimalGapTimeResolver} from "./FullTimelineOptimalGapTimeResolver";
import {combineLatest, map, Observable, shareReplay} from "rxjs";
import {TimelineFullRangeSpecification} from "./TimelineFullRangeSpecification";
import {UiApiService} from "../../../../api/ui-api.service";

@Injectable({providedIn: 'root'})
export class TimelineFullRangeSpecificationStorage {

  constructor(
    private uiApiService: UiApiService,
    private timelineWidthStorage: TimelineWidthStorage,
    private timelineOptimalGapTimeCalculator: FullTimelineOptimalGapTimeResolver,
  ) {
  }

  select(): Observable<TimelineFullRangeSpecification> {
    // TODO niech to sie selektuje tylko gdy jest full range wybrany
    return combineLatest([this.uiApiService.emissions$, this.timelineWidthStorage.timelineAvailableWidthSpaceForTicks$])
      .pipe(
        map(([emissions, timelineWidthSpaceForTicks]) => {
          const gap = this.timelineOptimalGapTimeCalculator.resolve(
            emissions, timelineWidthSpaceForTicks
          )
          const gapCount = Math.floor(timelineWidthSpaceForTicks / gap.px);
          const endTime = gapCount * gap.time;
          return new TimelineFullRangeSpecification(gap.px, endTime);
          //   TODO TimelineFullRangeSpecification jest mega dzikie!
        }),
        shareReplay({bufferSize: 1, refCount: true})
      )
  }

}
