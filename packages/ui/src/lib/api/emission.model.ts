import {TimePoint} from "../ui/time-point/TimePoint";

export class Emission {
    constructor(
        public value: any,
        public displayValue: string,
        public time: number
    ) {
    }

    static fromRaw(raw: any): Emission {
        return new Emission(raw.value, raw.displayValue, raw.time);
    }

    toTimePoint(): TimePoint {
        return new TimePoint(this.time, this.value, this.displayValue);
    }
}
