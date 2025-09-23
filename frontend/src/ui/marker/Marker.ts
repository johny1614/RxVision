import {PositionedEmission} from "../../app/emission/position/PositionedEmission";

export class Marker {
  constructor(
    public readonly position: number,
    public readonly time: number,
    public readonly value: unknown,
    public readonly displayValue: string
  ) {
  }

  static fromPositionedEmission(positionedEmission: PositionedEmission): Marker {
    return new Marker(positionedEmission.position, positionedEmission.time, positionedEmission.value, positionedEmission.displayValue);
  }
}
