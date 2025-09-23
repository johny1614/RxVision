import {Injectable} from "@angular/core";
import {TimelineGap} from "../TimelineGap";
import {Tick} from "../Tick";

@Injectable({providedIn: 'root'})
export class FullTimelineTicksResolver {
  resolve(gap: TimelineGap, availableWidthSpaceForTicks: number, endTime: number): Array<Tick> {
    const ticks: Array<Tick> = [];
    const numberOfTicks = Math.floor(availableWidthSpaceForTicks / gap.px);
    for (let i = 0; i <= numberOfTicks; i++) {
      const position = Math.min(i * gap.px, availableWidthSpaceForTicks);
      const time = Math.min(i * gap.time, endTime);
      ticks.push(new Tick(time, position));
    }
    return ticks;
  }
}
