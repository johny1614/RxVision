import {TimelineRange} from "./timeline-range";
import {Tick} from "./Tick";

export class TimelineSpecification {
  constructor(
    public readonly range: TimelineRange,
    public readonly ticks: Array<Tick>
  ) {
  }

  equals(other: TimelineSpecification) {
    return this.range.equals(other.range);
  }

  getLastTick(): Tick | undefined {
    return this.ticks[this.ticks.length - 1];
  }
}
