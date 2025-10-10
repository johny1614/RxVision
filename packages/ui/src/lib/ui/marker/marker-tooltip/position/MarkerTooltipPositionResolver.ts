import {Injectable} from "@angular/core";
import {MarkerTooltipPlacement} from "../placement/MarkerTooltipPlacement";
import {MarkerTooltipPosition} from "./MarkerTooltipPosition";

@Injectable({providedIn: 'root'})
export class MarkerTooltipPositionResolver {

  private readonly minimalGapBetweenMarkerAndTooltip = 8;


  resolve(markerElementRect: DOMRect, tooltipElementRect: DOMRect, tooltipPlacement: MarkerTooltipPlacement): MarkerTooltipPosition {
    let left = 0;
    let top = 0;
    switch (tooltipPlacement) {
      case MarkerTooltipPlacement.TOP:
        left = markerElementRect.left + markerElementRect.width / 2 - tooltipElementRect.width / 2;
        top = markerElementRect.top - tooltipElementRect.height - this.minimalGapBetweenMarkerAndTooltip;
        break;
      case MarkerTooltipPlacement.BOTTOM:
        left = markerElementRect.left + markerElementRect.width / 2 - tooltipElementRect.width / 2;
        top = markerElementRect.bottom + this.minimalGapBetweenMarkerAndTooltip;
        break;
      case MarkerTooltipPlacement.RIGHT:
        left = markerElementRect.right + this.minimalGapBetweenMarkerAndTooltip;
        top = markerElementRect.top + markerElementRect.height / 2 - tooltipElementRect.height / 2;
        break;
      case MarkerTooltipPlacement.LEFT:
        left = markerElementRect.left - tooltipElementRect.width - this.minimalGapBetweenMarkerAndTooltip;
        top = markerElementRect.top + markerElementRect.height / 2 - tooltipElementRect.height / 2;
        break;
    }
    return {left, top};
  }
}
