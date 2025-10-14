import {TimePoint} from "./TimePoint";

export interface TimePoints {
    [laneId: string]: Array<TimePoint>;
}
