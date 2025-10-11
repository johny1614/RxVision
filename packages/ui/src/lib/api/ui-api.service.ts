import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Emissions} from "../app/emission/Emissions.model";
import {Emission} from "../app/emission/emission.model";

@Injectable({
    providedIn: 'root'
})
export class UiApiService {
    emissions: Emissions = {};
    private emissionsSubject$: BehaviorSubject<Emissions> = new BehaviorSubject<any>([]);
    public emissions$: Observable<Emissions> = this.emissionsSubject$.asObservable();


    addEmission(emission: Emission, streamId: string) {
        if (this.emissions[streamId]) {
            this.emissions[streamId].push(emission);
        } else {
            this.emissions[streamId] = [emission];
        }
        this.emissionsSubject$.next(this.emissions);
    }

    clearEmissions(): void {
        this.emissions = {};
        this.emissionsSubject$.next(this.emissions);
    }

    addDeveloperEmission(emission: Emission, streamId: string) {
        if (this.emissions[streamId]) {
            this.emissions[streamId].push(emission);
        } else {
            this.emissions[streamId] = [emission];
        }
        this.emissionsSubject$.next(this.emissions);
    }

    emitEmissionClick(value: any) {
        // TODO not sure if we go with logging when clicking marker - decide later
        //     this.port.postMessage({type: 'DEVTOOLS_CLICK', data: value});
    }
}
