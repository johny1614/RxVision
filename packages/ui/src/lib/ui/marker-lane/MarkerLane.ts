import {Marker} from "../marker/Marker";
import {Color} from "../Color";

export class MarkerLane {
    constructor(public markers: Array<Marker>,
                public color: Color,
                public id: string
    ) {
    }
}
