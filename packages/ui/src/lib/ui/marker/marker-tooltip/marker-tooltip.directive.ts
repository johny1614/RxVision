import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { Marker } from '../Marker';
import { MarkerTooltipComponent } from './marker-tooltip.component';

@Directive({
    selector: '[appMarkerTooltip]',
    standalone: false
})
export class MarkerTooltipDirective implements OnDestroy {
  @Input()
  marker!: Marker;

  private tooltipComponentRef: ComponentRef<MarkerTooltipComponent> | null = null;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.openTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.closeTooltip();
  }

  openTooltip() {
    if (this.tooltipComponentRef || !this.marker) return;
    this.tooltipComponentRef = this.viewContainerRef.createComponent(MarkerTooltipComponent);
    this.tooltipComponentRef.instance.marker = this.marker;
    this.tooltipComponentRef.instance.markerElementRect = this.elementRef.nativeElement.getBoundingClientRect();
    const componentElement = this.tooltipComponentRef.location.nativeElement as HTMLElement;
    this.renderer2.appendChild(document.body, componentElement);
  }

  private closeTooltip() {
    if (this.tooltipComponentRef) {
      const el = this.tooltipComponentRef.location.nativeElement as HTMLElement;
      el.remove();
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }
  }

  ngOnDestroy() {
    this.closeTooltip();
  }
}
