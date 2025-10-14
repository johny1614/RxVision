import {Injectable} from "@angular/core";
import {TimelineSpecificationStorage} from "../timeline/TimelineSpecificationStorage";
import {combineLatest, map, Observable} from "rxjs";
import {PositionedTimePointsResolver} from "./PositionedTimePointsResolver";
import {UiApiService} from "../../api/ui-api.service";
import {PositionedTimePoints} from "./PositionedTimePoints";


@Injectable({providedIn: 'root'})
export class PositionedTimePointsStorage {

    constructor(
        private readonly uiApiService: UiApiService,
        private readonly activeTimelineSpecificationStorage: TimelineSpecificationStorage,
        private readonly positionedTimePointsResolver: PositionedTimePointsResolver
    ) {
    }

    select(): Observable<PositionedTimePoints> {
        return combineLatest([
            this.uiApiService.timePoints$,
            this.activeTimelineSpecificationStorage.selectActive()
        ]).pipe(
            map(([timePoints, activeTimelineSpecifications]) => {
                return this.positionedTimePointsResolver.resolve(timePoints, activeTimelineSpecifications);
            })
        );
    }
}
