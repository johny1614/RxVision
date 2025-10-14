import {Injectable} from "@angular/core";
import {TimelineSpecification} from "../TimelineSpecification";
import {TimelineRange} from "../timeline-range";
import {FullTimelineOptimalGapTimeResolver} from "./FullTimelineOptimalGapTimeResolver";
import {FullTimelineTicksResolver} from "./FullTimelineTicksResolver";
import {TimelineGap} from "../TimelineGap";
import {TimePoints} from "../../time-point/TimePoints";

@Injectable({providedIn: 'root'})
export class FullTimelineSpecificationResolver {

  constructor(
    private readonly fullTimelineOptimalGapTimeResolver: FullTimelineOptimalGapTimeResolver,
    private readonly fullTimelineTicksResolver: FullTimelineTicksResolver
  ) {
  }

  resolve(timePoints: TimePoints, availableWidthSpaceForTicks: number): TimelineSpecification {
    const gap: TimelineGap = this.fullTimelineOptimalGapTimeResolver.resolve(timePoints, availableWidthSpaceForTicks);
    const gapsCount = Math.floor(availableWidthSpaceForTicks / gap.px);
    const endTime = gapsCount * gap.time;
    const timelineRange = new TimelineRange(0, endTime, true)
    const ticks = this.fullTimelineTicksResolver.resolve(gap, availableWidthSpaceForTicks, endTime);
    return new TimelineSpecification(timelineRange, ticks);
  }
}
