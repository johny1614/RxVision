import {Injectable} from "@angular/core";
import {TimelinePositionService} from "../timeline/TimelinePositionService";
import {TimelineSpecification} from "../timeline/TimelineSpecification";
import {TimePoints} from "./TimePoints";
import {TimePoint} from "./TimePoint";
import {PositionedTimePoint} from "./PositionedTimePoint";
import {PositionedTimePoints} from "./PositionedTimePoints";

@Injectable({providedIn: 'root'})
export class PositionedTimePointsResolver {

    constructor(
        private readonly timelinePositionService: TimelinePositionService
    ) {
    }

    resolve(timePoints: TimePoints, activeTimelineSpecification: TimelineSpecification): PositionedTimePoints {
        const positionedPoints: PositionedTimePoints = {};
        const range = activeTimelineSpecification.range;
        const lastTickPosition: number = activeTimelineSpecification.getLastTick()?.position ?? 0;
        Object.entries(timePoints).forEach(([laneId, lanePoints]) => {
            const updatedPositionedLanePoints = lanePoints.map((timePoint: TimePoint) => {
                const position = this.timelinePositionService.getPositionByTime(timePoint.time, range, lastTickPosition);
                return new PositionedTimePoint(timePoint.time, timePoint.value, timePoint.displayValue, position)
            });
            positionedPoints[laneId] = [
                ...(positionedPoints[laneId] || []),
                ...updatedPositionedLanePoints
            ];
        });
        return positionedPoints;
    }
}
