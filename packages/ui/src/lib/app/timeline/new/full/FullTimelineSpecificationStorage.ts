import {TimelineSpecification} from "../TimelineSpecification";
import {combineLatest, map, Observable, shareReplay} from "rxjs";
import {TimelineWidthStorage} from "../TimelineWidthStorage";
import {PanelMessageService} from "../../../panel/panel-message.service";
import {FullTimelineSpecificationResolver} from "./FullTimelineSpecificationResolver";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class FullTimelineSpecificationStorage {

  constructor(
    private readonly panelMessageService: PanelMessageService,
    private timelineWidthStorage: TimelineWidthStorage,
    private fullTimelineSpecificationResolver: FullTimelineSpecificationResolver,
  ) {
  }

  select(): Observable<TimelineSpecification> {
    return combineLatest([this.panelMessageService.emissions$, this.timelineWidthStorage.timelineAvailableWidthSpaceForTicks$])
      .pipe(
        map(([emissions, timelineWidthSpaceForTicks]) => {
          const additionalSpaceForTimelineOverlappingMarkersAndLastTickTittle = 22;
          // TODO make it better ^^ maybe left instead of transform im marker component?
          return this.fullTimelineSpecificationResolver.resolve(
            emissions, timelineWidthSpaceForTicks - additionalSpaceForTimelineOverlappingMarkersAndLastTickTittle
          )
        }),
        shareReplay({bufferSize: 1, refCount: true})
      )

  }
}
