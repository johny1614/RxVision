import {Marker} from "../../ui/marker/Marker";
import {Color} from "../../ui/Color";

export class MarkerLane {
    constructor(public markers: Array<Marker>,
                public color: Color,
                public id: string
    ) {
    }
}
