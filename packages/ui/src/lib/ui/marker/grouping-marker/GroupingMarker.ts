import {Marker} from "../Marker";
import {PositionedEmission} from "../../../app/emission/position/PositionedEmission";

export class GroupingMarker extends Marker {
  constructor(
    public emissions: Array<PositionedEmission>
  ) {
    const leftiestPosition = Math.min(...emissions.map(m => m.position));
    const earliestEmissionTime = Math.min(...emissions.map(m => m.time));
    const value = emissions.map(m => m.value);
    const displayValue = emissions.map(m => m.displayValue).join("\n");
    super(leftiestPosition, earliestEmissionTime, value, displayValue);
  }
}

