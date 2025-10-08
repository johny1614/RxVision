import { Component, signal } from '@angular/core';
import {Shared} from "shared";

@Component({
  selector: 'app-root',
  imports: [Shared],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
