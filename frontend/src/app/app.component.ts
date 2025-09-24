import {Component, DestroyRef, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {IS_DEVELOPER_MODE} from "../isDeveloperMode";
import {PanelMessageService} from "./panel/panel-message.service";
import {combineLatest, Observable, Subject, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Emission} from "./emission/emission.model";
import {createAbsoluteTimedObservable} from "./util/createAbsoluteTimedObservable";

declare const chrome: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  valuesA = [2222, 3333];
  delaysA = [0, 1200];
  delaysB = [400, 1600]
  valuesC = [2222, 3333];
  delaysC = [500, 510, 512, 515, 520];

  A$ = createAbsoluteTimedObservable(this.valuesA, this.delaysA);
  B$ = createAbsoluteTimedObservable(this.delaysB, this.delaysB);
  C$ = createAbsoluteTimedObservable(this.valuesC, this.delaysC);
  combineAB$ = combineLatest([this.A$, this.B$]);

  isChromeExtension = false;

  constructor(private router: Router,
              private destroyRef: DestroyRef,
              @Inject(IS_DEVELOPER_MODE) private isDeveloperMode: boolean,
              private readonly panelMessageService: PanelMessageService,
  ) {
    if (this.isDeveloperMode) {
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

      this.combineAB$.subscribe(([a, b]) => {
        const time = Date.now() - startTime;
        const emission = new Emission(
          { a, b },
          `time: ${time} Weather: ${a}, Rent: ${b}`,
          time
        );
        this.panelMessageService.addDeveloperEmission(emission, 'combine$');
      });


      // this.C$.subscribe(value => {
      //   const time = Date.now() - startTime;
      //   const emission = new Emission(value, `time: ${time} value: ${value}`, time);
      //   this.panelMessageService.addDeveloperEmission(emission, 'Bus$');
      // });
      // const streams = ['stream1', 'stream2', 'stream3', 'stream4', 'stream5', 'stream6', 'stream7', 'stream8', 'stream9', 'stream10',
      //   'stream11', 'stream12', 'stream13', 'stream14', 'stream15', 'stream16', 'stream17', 'stream18', 'stream19', 'stream20',
      //   'stream21', 'stream22', 'stream23', 'stream24', 'stream25', 'stream26', 'stream27', 'stream28', 'stream29', 'stream30'
      // ];
      // streams.forEach((stream, index) => {
      //   addRxVisionEmission(stream, '' + index);
      //   // const emission = new Emission(index, '' + index, Date.now() - startTime, stream);
      //   // this.panelMessageService.addDeveloperEmission(emission);
      // });
    }
  }

  ngOnInit(): void {
    this.isChromeExtension = typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined';
    console.log('jest oninit!', this.isChromeExtension);
  }
}

