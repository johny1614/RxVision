import {Injectable} from "@angular/core";
import {MarkerTooltipPlacement} from "./MarkerTooltipPlacement";
import {ElementSize} from "../../../../util/ElementSize";

@Injectable({providedIn: 'root'})
export class MarkerTooltipPlacementResolver {
  resolve(
    marker: DOMRect,
    tooltip: ElementSize,
    viewport: ElementSize
  ): MarkerTooltipPlacement {

    if (this.fitsTop(marker, tooltip, viewport)) {
      return MarkerTooltipPlacement.TOP;
    }
    if (this.fitsRight(marker, tooltip, viewport)) {
      return MarkerTooltipPlacement.RIGHT;
    }
    if (this.fitsBottom(marker, tooltip, viewport)) {
      return MarkerTooltipPlacement.BOTTOM;
    }
    if (this.fitsLeft(marker, tooltip, viewport)) {
      return MarkerTooltipPlacement.LEFT;
    }
    return MarkerTooltipPlacement.TOP;
  }

  private centerX(marker: DOMRect): number {
    return marker.x + marker.width / 2;
  }

  private centerY(marker: DOMRect): number {
    return marker.y + marker.height / 2;
  }

  private horizontallyInside(viewport: ElementSize, left: number, width: number): boolean {
    const right = left + width;
    return left >= 0 && right <= viewport.width;
  }

  private verticallyInside(viewport: ElementSize, top: number, height: number): boolean {
    const bottom = top + height;
    return top >= 0 && bottom <= viewport.height;
  }

  private fitsTop(marker: DOMRect, tooltip: ElementSize, viewport: ElementSize): boolean {
    const spaceTop = marker.y;
    if (spaceTop < tooltip.height) return false;
    const left = this.centerX(marker) - tooltip.width / 2;
    return this.horizontallyInside(viewport, left, tooltip.width);
  }

  private fitsBottom(marker: DOMRect, tooltip: ElementSize, viewport: ElementSize): boolean {
    const spaceBottom = viewport.height - (marker.y + marker.height);
    if (spaceBottom < tooltip.height) return false;
    const left = this.centerX(marker) - tooltip.width / 2;
    return this.horizontallyInside(viewport, left, tooltip.width);
  }

  private fitsRight(marker: DOMRect, tooltip: ElementSize, viewport: ElementSize): boolean {
    const spaceRight = viewport.width - (marker.x + marker.width);
    if (spaceRight < tooltip.width) return false;
    const top = this.centerY(marker) - tooltip.height / 2;
    return this.verticallyInside(viewport, top, tooltip.height);
  }

  private fitsLeft(marker: DOMRect, tooltip: ElementSize, viewport: ElementSize): boolean {
    const spaceLeft = marker.x;
    if (spaceLeft < tooltip.width) return false;
    const top = this.centerY(marker) - tooltip.height / 2;
    return this.verticallyInside(viewport, top, tooltip.height);
  }
}
