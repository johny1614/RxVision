import {TimePoint} from "./TimePoint";

export class PositionedTimePoint extends TimePoint {
    constructor(
        time: number,
        value: unknown,
        displayValue: string,
        public readonly position: number
    ) {
        super(time, value, displayValue);
    }
}