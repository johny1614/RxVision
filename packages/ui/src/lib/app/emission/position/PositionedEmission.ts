import {Emission} from "../emission.model";
import {Marker} from "../../../ui/marker/Marker";

export class PositionedEmission extends Emission {
  constructor(
    public position: number,
    value: unknown,
    displayValue: string,
    time: number
  ) {
    super(value, displayValue, time);
  }

  static fromMarker(marker: Marker) {
    return new PositionedEmission(marker.position, marker.value, marker.displayValue, marker.time);
  }
}
