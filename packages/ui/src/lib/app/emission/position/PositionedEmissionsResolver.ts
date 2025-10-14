import {Emissions} from "../Emissions.model";
import {Injectable} from "@angular/core";
import {Marker} from "../../../ui/marker/Marker";
import {TimelinePositionService} from "../../timeline/TimelinePositionService";
import {TimelineSpecification} from "../../timeline/TimelineSpecification";
import {PositionedEmission} from "./PositionedEmission";

@Injectable({providedIn: 'root'})
export class PositionedEmissionsResolver {

  constructor(
    private readonly timelinePositionService: TimelinePositionService
  ) {
  }

  resolve(emissions: Emissions, activeTimelineSpecification: TimelineSpecification): {
    [streamId: string]: Array<PositionedEmission>
  } {
    const positionedEmissions: { [streamId: string]: Array<PositionedEmission> } = {};
    const range = activeTimelineSpecification.range;
    const lastTickPosition: number = activeTimelineSpecification.getLastTick()?.position ?? 0;
    Object.entries(emissions).forEach(([streamId, streamEmissions]) => {
      const updatedStreamEmissions = streamEmissions.map(emission => {
        const position = this.timelinePositionService.getPositionByTime(emission.time, range, lastTickPosition);
        return new PositionedEmission(position, emission.value, emission.displayValue, emission.time);
      });
      positionedEmissions[streamId] = [
        ...(positionedEmissions[streamId] || []),
        ...updatedStreamEmissions
      ];
    });
    return positionedEmissions;
  }
}
