import {Injectable} from "@angular/core";
import {Tick} from "../Tick";

@Injectable({providedIn: 'root'})
export class ChosenTimelineTicksResolver {
  resolve(gap: number, availableWidthSpaceForTicks: number, startTime: number, endTime: number): Array<Tick> {
    const ticks: Array<Tick> = [];
    const regularGapsCount = Math.floor(availableWidthSpaceForTicks / gap);
    const regularTicksCount = regularGapsCount + 1;
    for (let i = 0; i <= regularTicksCount; i++) {
      const position = Math.min(i * gap, availableWidthSpaceForTicks);
      const time = position * (endTime - startTime) / availableWidthSpaceForTicks + startTime; // TODO tu beda nierowne wartosci kurde
      ticks.push(new Tick(time, position));
    }
    const lastExtratick = new Tick(endTime, availableWidthSpaceForTicks);
    ticks.push(lastExtratick);
    return ticks;
  }
}
