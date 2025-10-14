import {PositionedTimePoint} from "./PositionedTimePoint";

export interface PositionedTimePoints {
    [laneId: string]: Array<PositionedTimePoint>;
}
