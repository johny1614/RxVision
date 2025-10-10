import {Component, ElementRef, ViewChild} from '@angular/core';
import {addRxVisionEmission, clearAllRxVisionEmissions} from "rx-vision";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('streamName')
  streamNameElement!: ElementRef;

  @ViewChild('emissionName')
  emissionNameElement!: ElementRef;

  onEmitClick() {
    const streamName = this.streamNameElement.nativeElement.value;
    const emissionName = this.emissionNameElement.nativeElement.value;
    addRxVisionEmission(streamName, emissionName);
  }

  onClearClick() {
    clearAllRxVisionEmissions();
  }
}
