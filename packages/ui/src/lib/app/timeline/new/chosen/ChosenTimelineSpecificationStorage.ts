import {Injectable} from "@angular/core";
import {TimelineSpecification} from "../TimelineSpecification";
import {combineLatest, filter, map, Observable} from "rxjs";
import {ChosenTimelineSpecificationResolver} from "./ChosenTimelineSpecificationResolver";
import {TimelineWidthStorage} from "../TimelineWidthStorage";
import {TimelinesService} from "../TimelinesService";

@Injectable({providedIn: 'root'})
export class ChosenTimelineSpecificationStorage {

    constructor(
        private readonly chosenTimelineSpecificationResolver: ChosenTimelineSpecificationResolver,
        private timelineWidthStorage: TimelineWidthStorage,
        private timelinesService: TimelinesService // timeline range i aktywny filtrowac!
    ) {
    }

    selectWhenActive(): Observable<TimelineSpecification> {
        return combineLatest([
            this.timelinesService.selectActive().pipe(filter(activeTimeline => !activeTimeline.isFullRange)),
            this.timelineWidthStorage.timelineAvailableWidthSpaceForTicks$
        ]).pipe(
            filter(activeRange => activeRange !== null),
            map(([activeRange, availableWidthSpaceForTicks]) => {
              const additionalSpaceForTimelineOverlappingMarkersAndLastTickTittle = 26;
                return this.chosenTimelineSpecificationResolver.resolve(availableWidthSpaceForTicks - additionalSpaceForTimelineOverlappingMarkersAndLastTickTittle, activeRange.startTime, activeRange.endTime);
            })
        )
    }
}
