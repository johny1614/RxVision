import {Injectable} from "@angular/core";
import {TimelineGap} from "../TimelineGap";
import {TimePoints} from "../../time-point/TimePoints";

@Injectable({providedIn: 'root'})
export class FullTimelineOptimalGapTimeResolver {

  static OPTIMAL_GAP_PX = 60;

  resolve(timePoints: TimePoints, availableWidthSpaceForTicks: number): TimelineGap {
    const lastPointTime = this.getLastPointTime(timePoints)

    const optimalGapPx = FullTimelineOptimalGapTimeResolver.OPTIMAL_GAP_PX;
    const acceptableTimeGaps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];

    let bestTimeGap = acceptableTimeGaps[0];
    let bestGapPx = this.calculatePixelsPerTimeGap(lastPointTime, availableWidthSpaceForTicks, bestTimeGap);
    let smallestDifference = Math.abs(bestGapPx - optimalGapPx);

    for (let i = 1; i < acceptableTimeGaps.length; i++) {
      const currentTimeGap = acceptableTimeGaps[i];
      const currentGapPx = this.calculatePixelsPerTimeGap(lastPointTime, availableWidthSpaceForTicks, currentTimeGap);
      const currentDifference = Math.abs(currentGapPx - optimalGapPx);

      if (currentDifference < smallestDifference) {
        bestTimeGap = currentTimeGap;
        bestGapPx = currentGapPx;
        smallestDifference = currentDifference;
      }
    }
    return new TimelineGap(bestGapPx, bestTimeGap);
  }

  private calculatePixelsPerTimeGap(lastPointTime: number, availableWidthSpaceForTicks: number, timeGap: number): number {
    const ticksCount = Math.ceil(lastPointTime / timeGap) + 1;
    const gapsBetweenTicks = ticksCount - 1;
    return availableWidthSpaceForTicks / gapsBetweenTicks;
  }

  private getLastPointTime(timePoints: TimePoints): number {
    return Math.max(
      ...Object.values(timePoints).map(laneTimePoints =>
        Math.max(...laneTimePoints.map(timePoint => timePoint.time))
      )
    );
  }
}
