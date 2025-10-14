import {Injectable} from "@angular/core";
import {TimelineSpecificationStorage} from "../timeline/TimelineSpecificationStorage";
import {combineLatest, map, Observable, tap} from "rxjs";
import {Marker} from "../../ui/marker/Marker";
import {PositionedEmissionsResolver} from "./position/PositionedEmissionsResolver";
import {UiApiService} from "../../api/ui-api.service";


@Injectable({providedIn: 'root'})
export class EmissionsStorage {

  constructor(
    private readonly uiApiService: UiApiService,
    private readonly activeTimelineSpecificationStorage: TimelineSpecificationStorage,
    private readonly positionedEmissionsResolver: PositionedEmissionsResolver
  ) {
  }

  select(): Observable<{ [streamId: string]: Array<Marker> }> {
    return combineLatest([
      this.uiApiService.emissions$,
      this.activeTimelineSpecificationStorage.selectActive()
    ]).pipe(
      map(([emissions, activeTimelineSpecifications]) => {
        return this.positionedEmissionsResolver.resolve(emissions, activeTimelineSpecifications);
      })
    );
  }
}
