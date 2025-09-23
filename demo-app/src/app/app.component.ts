import {Component} from '@angular/core';
import {interval, map, take} from 'rxjs';
import {addRxVisionEmission} from 'rx-vision';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  randomNumber = Math.floor(Math.random() * 100);

  private readonly notifications = [
    {type: 'info', message: 'Welcome back!'},
    {type: 'warning', message: 'Low disk space.'},
    {type: 'success', message: 'File uploaded successfully.'},
    {type: 'error', message: 'Something went wrong.'},
  ];

  constructor() {
    this.getWeather$().subscribe(weather => addRxVisionEmission('weather', weather));
    this.observeNotifications();
  }

  private observeNotifications() {
    setTimeout(() => addRxVisionEmission('notifications', this.notifications[0]), 0);
    setTimeout(() => addRxVisionEmission('notifications', this.notifications[1]), 200);
    setTimeout(() => addRxVisionEmission('notifications', this.notifications[2]), 800);
    setTimeout(() => addRxVisionEmission('notifications', this.notifications[3]), 1200);
    setTimeout(() => addRxVisionEmission('notifications', this.notifications[4]), 2000);
  }


  private getWeather$() {
    return interval(1000).pipe(
      take(5),
      map(i => {
        const weatherSamples = [
          {temp: 18, condition: '☀️ Sunny'},
          {temp: 15, condition: '🌧️ Rainy'},
          {temp: 12, condition: '🌫️ Foggy'},
          {temp: 20, condition: '⛅ Partly Cloudy'},
          {temp: 16, condition: '🌩️ Thunderstorm'},
        ];
        return weatherSamples[i];
      })
    );
  }
}
