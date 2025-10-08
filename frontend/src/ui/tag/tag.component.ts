import {Component, Input, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TagComponent {
  @Input() text = '';
  @Input() color: string = 'blue';

  @Input() heightPx = 16;
  @Input() fontScale = 0.5;

  @HostBinding('style.--tag-height.px') get cssHeight() {
    return this.heightPx;
  }

  @HostBinding('style.--tag-font-size.px') get cssFontSize() {
    const minimalFontSize = 10;
    return Math.max(minimalFontSize, Math.round(this.heightPx * this.fontScale));
  }
}
