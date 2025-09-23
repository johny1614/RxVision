import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ChosenTimelineOptimalGapTimeResolver {

  static OPTIMAL_GAP_PX = 60;

  resolve(availableSpaceWidth: number): number {
    const optimalGapPx = ChosenTimelineOptimalGapTimeResolver.OPTIMAL_GAP_PX;
    const acceptableTimeGaps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];
    const bestAcceptableTimeGap = acceptableTimeGaps.reduce((bestTimeGap, currentTimeGap) => {
      const bestGapPx = this.calculatePixelsPerRegularGap(bestTimeGap, availableSpaceWidth);
      const currentGapPx = this.calculatePixelsPerRegularGap(currentTimeGap, availableSpaceWidth);
      return Math.abs(currentGapPx - optimalGapPx) < Math.abs(bestGapPx - optimalGapPx) ? currentTimeGap : bestTimeGap;
    });
    return bestAcceptableTimeGap;
  }

  private calculatePixelsPerRegularGap(timeGap: number, availableSpaceWidth): number {
    const gapsFittingSpace = Math.floor(availableSpaceWidth / timeGap);
    return availableSpaceWidth / gapsFittingSpace;
  }

}
