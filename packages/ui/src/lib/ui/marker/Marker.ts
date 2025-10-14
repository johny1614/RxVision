import {PositionedTimePoint} from "../time-point/PositionedTimePoint";

export class Marker {
    constructor(
        public readonly position: number,
        public readonly time: number,
        public readonly value: unknown,
        public readonly displayValue: string
    ) {
    }

    static fromPositionedPoint(positionedPoint: PositionedTimePoint): Marker {
        return new Marker(positionedPoint.position, positionedPoint.time, positionedPoint.value, positionedPoint.displayValue);
    }
}
