import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {TimelineWidthStorage} from "./TimelineWidthStorage";
import {TimelineRange} from "./timeline-range";

@Injectable({providedIn: 'root'})
export class TimelinePositionService {

  constructor(private timelineWidthStorage: TimelineWidthStorage) {
  }

  private readonly timelineWidthSpaceForTicks$ = this.timelineWidthStorage.timelineAvailableWidthSpaceForTicks$;


  selectTimeByPosition(position: number, rangeDuration: number): Observable<number> {
    return this.timelineWidthSpaceForTicks$
      .pipe(
        map((timelineWidthSpaceForTicks) => this.getTimeByPosition(position, timelineWidthSpaceForTicks, rangeDuration)),
      )
  }

  calcPositionByTime(timelineWidthSpaceForTicks: number, duration: number, time: number): number {
    const paddinForTextAndTick = 100;
    return (time / duration) * (timelineWidthSpaceForTicks - paddinForTextAndTick);
  }

  getPositionByTime(time: number, range: TimelineRange, posMax: number): number {
    if (isNaN(posMax)) return 0;
    if (!range.isTimeInRange(time)) {
      return -999;
    }
    const startTime = range.startTime;
    const endTime = range.endTime;
    return (time - startTime) * posMax / (endTime - startTime);
  }

  private getTimeByPosition(position: number, timelineWidthSpaceForTicks: number, rangeDuration: number): number {
    return (position / timelineWidthSpaceForTicks) * rangeDuration;
  }


}
