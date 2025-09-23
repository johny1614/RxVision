import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {Marker} from '../Marker';
import {MarkerTooltipPlacementResolver} from "./placement/MarkerTooltipPlacementResolver";
import {MarkerTooltipPlacement} from "./placement/MarkerTooltipPlacement";
import {MarkerTooltipPositionResolver} from "./position/MarkerTooltipPositionResolver";
import {ElementSize} from "../../../util/ElementSize";
import {MarkerTooltipPosition} from "./position/MarkerTooltipPosition";

@Component({
  selector: 'app-marker-tooltip',
  templateUrl: './marker-tooltip.component.html',
  styleUrls: ['./marker-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MarkerTooltipComponent implements AfterViewInit {
  @Input() marker!: Marker;
  @Input() markerElementRect!: DOMRect;
  @ViewChild('tooltip', {static: false}) tooltipRef!: ElementRef<HTMLElement>;

  placement: MarkerTooltipPlacement = MarkerTooltipPlacement.TOP;

  markerTooltipPosition: MarkerTooltipPosition;

  ngAfterViewInit() {
    this.updatePosition();
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onWinChange() {
    this.updatePosition();
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    private readonly markerTooltipPlacementResolver: MarkerTooltipPlacementResolver,
    private readonly markerTooltipPositionResolver: MarkerTooltipPositionResolver,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  private updatePosition(): void {
    const tooltipRect = this.tooltipRef?.nativeElement.getBoundingClientRect();
    const tooltipSize: ElementSize = {width: tooltipRect.width, height: tooltipRect.height};
    const viewportSize: ElementSize = {width: window.innerWidth, height: window.innerHeight};
    this.placement = this.markerTooltipPlacementResolver.resolve(this.markerElementRect, tooltipSize, viewportSize);
    this.markerTooltipPosition = this.markerTooltipPositionResolver.resolve(this.markerElementRect, tooltipRect, this.placement);
  }
}
