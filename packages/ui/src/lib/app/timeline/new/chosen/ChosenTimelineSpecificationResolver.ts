import {Injectable} from "@angular/core";
import {TimelineSpecification} from "../TimelineSpecification";
import {TimelineRange} from "../../timeline-range";
import {ChosenTimelineOptimalGapTimeResolver} from "./ChosenTimelineOptimalGapTimeResolver";
import {ChosenTimelineTicksResolver} from "./ChosenTimelineTicksResolver";
import {Tick} from "../Tick";

@Injectable({providedIn: 'root'})
export class ChosenTimelineSpecificationResolver {

  constructor(
    private readonly chosenTimelineOptimalGapTimeResolver: ChosenTimelineOptimalGapTimeResolver,
    private readonly chosenTimelineTicksResolver: ChosenTimelineTicksResolver
  ) {
  }

  resolve(availableWidthSpaceForTicks: number, startTime: number, endTime: number): TimelineSpecification {
    const gap = this.chosenTimelineOptimalGapTimeResolver.resolve(availableWidthSpaceForTicks);
    const timelineRange = new TimelineRange(startTime, endTime, true)
    const ticks: Array<Tick> = this.chosenTimelineTicksResolver.resolve(gap, availableWidthSpaceForTicks, startTime, endTime);
    return new TimelineSpecification(timelineRange, ticks);
  }
}
