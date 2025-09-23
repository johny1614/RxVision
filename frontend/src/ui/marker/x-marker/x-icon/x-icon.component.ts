import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-x-icon',
  templateUrl: './x-icon.component.html',
  styleUrls: ['./x-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.--size.px]': 'sizePx',
    '[style.--weight.px]': 'weightPx',
    '[style.--color]': 'color',
    '[style.--border-color]': 'borderColor || "transparent"',
    '[style.--border-w.px]': 'borderWidth || 0',
  }
})
export class XIconComponent {
  @Input() sizePx = 16;
  @Input() weightPx = 2;
  @Input() color = '#2d7bdc';
  @Input() borderColor?: string;
  @Input() borderWidth = 0;

  @HostBinding('style.width.px')   get hostWidth()  { return this.sizePx; }
  @HostBinding('style.height.px')  get hostHeight() { return this.sizePx; }

}
