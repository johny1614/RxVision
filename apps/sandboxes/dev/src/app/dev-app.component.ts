import {Component} from '@angular/core';
import {createAbsoluteTimedObservable, Emission, RxVisionComponent} from "ui";
import {PanelMessageService} from "ui/app/panel/panel-message.service";
import {combineLatest} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './dev-app.component.html',
    styleUrl: './dev-app.component.scss',
    imports: [RxVisionComponent]
})
export class DevAppComponent {

    valuesA = [2222, 3333];
    delaysA = [0, 1200];
    delaysB = [400, 1600]
    valuesC = [2222, 3333];
    delaysC = [500, 510, 512, 515, 520];

    A$ = createAbsoluteTimedObservable(this.valuesA, this.delaysA);
    B$ = createAbsoluteTimedObservable(this.delaysB, this.delaysB);
    C$ = createAbsoluteTimedObservable(this.valuesC, this.delaysC);
    combinedAB$ = combineLatest([this.A$, this.B$]);


    constructor(
        private readonly panelMessageService: PanelMessageService
    ) {


        const startTime = Date.now();
        this.A$.subscribe(value => {
            const time = Date.now() - startTime;
            const emission = new Emission(value, `time: ${time} value: ${value} `, time);
            this.panelMessageService.addDeveloperEmission(emission, 'Salary$');
        });
        this.B$.subscribe(value => {
            const time = Date.now() - startTime;
            const emission = new Emission(value, `time: ${time} value: ${value} \n`, time);
            console.log('emission B', emission.time);
            this.panelMessageService.addDeveloperEmission(emission, 'Rent$');
        });

        this.combinedAB$.subscribe(([a, b]) => {
            const time = Date.now() - startTime;
            const emission = new Emission(
                { a, b },
                `time: ${time} Weather: ${a}, Rent: ${b}`,
                time
            );
            this.panelMessageService.addDeveloperEmission(emission, 'combined$');
        });

    }
}
