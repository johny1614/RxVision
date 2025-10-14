import {Injectable} from "@angular/core";
import {Emissions} from "../../emission/Emissions.model";
import {TimelineGap} from "../TimelineGap";

@Injectable({providedIn: 'root'})
export class FullTimelineOptimalGapTimeResolver {

  static OPTIMAL_GAP_PX = 60;

  resolve(emissions: Emissions, availableWidthSpaceForTicks: number): TimelineGap {
    const lastEmissionTime = this.getLastEmissionTime(emissions)

    const optimalGapPx = FullTimelineOptimalGapTimeResolver.OPTIMAL_GAP_PX;
    const acceptableTimeGaps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];

    let bestTimeGap = acceptableTimeGaps[0];
    let bestGapPx = this.calculatePixelsPerTimeGap(lastEmissionTime, availableWidthSpaceForTicks, bestTimeGap);
    let smallestDifference = Math.abs(bestGapPx - optimalGapPx);

    for (let i = 1; i < acceptableTimeGaps.length; i++) {
      const currentTimeGap = acceptableTimeGaps[i];
      const currentGapPx = this.calculatePixelsPerTimeGap(lastEmissionTime, availableWidthSpaceForTicks, currentTimeGap);
      const currentDifference = Math.abs(currentGapPx - optimalGapPx);

      if (currentDifference < smallestDifference) {
        bestTimeGap = currentTimeGap;
        bestGapPx = currentGapPx;
        smallestDifference = currentDifference;
      }
    }
    return new TimelineGap(bestGapPx, bestTimeGap);
  }

  private calculatePixelsPerTimeGap(lastEmissionTime: number, availableWidthSpaceForTicks: number, timeGap: number): number {
    const ticksCount = Math.ceil(lastEmissionTime / timeGap) + 1;
    const gapsBetweenTicks = ticksCount - 1;
    return availableWidthSpaceForTicks / gapsBetweenTicks;
  }

  private getLastEmissionTime(emissions: Emissions): number {
    return Math.max(
      ...Object.values(emissions).map(streamEmissions =>
        Math.max(...streamEmissions.map(emission => emission.time))
      )
    );
  }
}
