import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Emission} from "./emission.model";
import {TimePoint} from "../app/time-point/TimePoint";
import {TimePoints} from "../app/time-point/TimePoints";

@Injectable({
    providedIn: 'root'
})
export class UiApiService {
    timePoints: TimePoints = {};
    private timePointsSubject$: BehaviorSubject<TimePoints> = new BehaviorSubject<any>([]);
    public timePoints$: Observable<TimePoints> = this.timePointsSubject$.asObservable();

    addEmission(emission: Emission, streamId: string) {
        const timePoint: TimePoint = emission.toTimePoint();
        const laneId = streamId;
        if (this.timePoints[laneId]) {
            this.timePoints[laneId].push(timePoint);
        } else {
            this.timePoints[laneId] = [timePoint];
        }
        this.timePointsSubject$.next(this.timePoints);
    }

    clearEmissions(): void {
        this.timePoints = {};
        this.timePointsSubject$.next(this.timePoints);
    }

    emitEmissionClick(value: any) {
        // TODO not sure if we go with logging when clicking marker - decide later
        //     this.port.postMessage({type: 'DEVTOOLS_CLICK', data: value});
    }
}
