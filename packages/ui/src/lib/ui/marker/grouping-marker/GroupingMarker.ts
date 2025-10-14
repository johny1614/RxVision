import {Marker} from "../Marker";

export class GroupingMarker extends Marker {
    constructor(
        public markers: Array<Marker>
    ) {
        const leftiestPosition = Math.min(...markers.map(m => m.position));
        const earliestEmissionTime = Math.min(...markers.map(m => m.time));
        const value = markers.map(m => m.value);
        const displayValue = markers.map(m => m.displayValue).join("\n");
        super(leftiestPosition, earliestEmissionTime, value, displayValue);
    }
}

