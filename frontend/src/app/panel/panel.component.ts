import {ChangeDetectorRef, Component, DestroyRef, OnInit, ViewEncapsulation} from '@angular/core';
import {PanelMessageService} from "./panel-message.service";
import {Emissions} from "../emission/Emissions.model";
import {Circle} from "../circle/circle";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

declare const chrome: any;

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PanelComponent implements OnInit {

  streamsCircles: { [streamId: string]: Array<Circle> } = {};

  constructor(private panelMessageService: PanelMessageService,
              private changeDetectorRef: ChangeDetectorRef,
              private destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.observeEmissions();
  }

  private observeEmissions() {
    this.panelMessageService.emissions$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((emissions: Emissions) => {
        this.updateCircles(emissions);
        this.changeDetectorRef.detectChanges();
      });
  }

  private updateCircles(emissions: Emissions): void {
    const newStreamsCircles = {};
    Object.entries(emissions).forEach(([streamId, streamEmissions]) => {
      const updatedStreamEmissions = streamEmissions.map(emission => {
        const position = (emission.time / 1000) * 25;
        return new Circle(position, emission.value, emission.displayValue.toString(), 'red');
      });
      newStreamsCircles[streamId] = [
        ...(newStreamsCircles[streamId] || []),
        ...updatedStreamEmissions
      ];
    });
    this.streamsCircles = newStreamsCircles;
  }

  onWindowSelectorChange() {
    const selector = '';
    chrome.storage.sync.set({userSelector: selector}, function () {
      var statusMessage = document.getElementById('statusMessage');
      statusMessage.style.display = 'block';
      var clearMessage = document.getElementById('clearMessage');
      clearMessage.style.display = 'none';
    })
  }
}

