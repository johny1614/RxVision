import {Marker} from "../Marker";

export class GroupingMarker extends Marker {
    constructor(
        public markers: Array<Marker>
    ) {
        const leftiestPosition = Math.min(...markers.map(m => m.position));
        const earliestTime = Math.min(...markers.map(m => m.time));
        const value = markers.map(m => m.value);
        const displayValue = markers.map(m => m.displayValue).join("\n");
        super(leftiestPosition, earliestTime, value, displayValue);
    }

    getLeftiestMarker(): Marker {
        return this.markers.reduce((leftiest, current) => current.position < leftiest.position ? current : leftiest, this.markers[0]);
    }
}

