import {Component, ElementRef, HostBinding, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {Marker} from "../Marker";
import {XIconComponent} from "./x-icon/x-icon.component";
import {Color} from "../../Color";
import {markerWidthPx} from "../../uiConsts";

@Component({
    selector: 'app-x-marker',
    templateUrl: './x-marker.component.html',
    styleUrl: './x-marker.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class XMarkerComponent {

  @Input()
  marker: Marker;

  markerSizePx = markerWidthPx;

  @Input() color!: Color;

  @ViewChild(XIconComponent, {read: ElementRef})
  iconComponent!: ElementRef;

  @HostBinding('style')
  get hostStyles() {
    return {width: markerWidthPx + 'px', height: markerWidthPx + 'px'};
  }

  hovered: boolean = false;

  onMarkerHover(marker: Marker) {
    this.hovered = true;
  }

  onMarkerLeave() {
    this.hovered = false;
  }
}
