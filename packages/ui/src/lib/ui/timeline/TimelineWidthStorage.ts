import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TimelineWidthStorage {

  timelineContainerWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  timelineAvailableWidthSpaceForTicks$: Observable<number> = this.timelineContainerWidth$;
//   TODO zrefactoruj to - i zastanow sie bo sa 2 rozne klienty w sumie albo 3 nawet
}
