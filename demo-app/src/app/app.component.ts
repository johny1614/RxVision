import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {addRxVisionEmission} from "rx-vision";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  randomNumber = Math.floor(Math.random() * 100);

  constructor() {
    setTimeout(() => {
      addRxVisionEmission('stream1', this.randomNumber);
    }, 2000)
    setTimeout(() => {
      addRxVisionEmission('stream1', 'value2');
    }, 2500)
    //
    // setTimeout(() => {
    //   addRxVisionEmission('stream1', 'value2');
    // }, 3000)
    //
    // setTimeout(() => {
    //   addRxVisionEmission('stream2', 'xd');
    // }, 4000)
  }
}
