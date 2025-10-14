import {TimePoint} from "../app/time-point/TimePoint";

export class Emission {
    constructor(
        public value: any,
        public displayValue: string,
        public time: number
    ) {
    }

    toTimePoint(): TimePoint {
        return new TimePoint(this.time, this.value, this.displayValue);
    }
}
