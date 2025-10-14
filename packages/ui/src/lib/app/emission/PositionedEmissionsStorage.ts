import {Injectable} from "@angular/core";
import {TimelineSpecificationStorage} from "../timeline/TimelineSpecificationStorage";
import {combineLatest, map, Observable} from "rxjs";
import {PositionedEmissionsResolver} from "./position/PositionedEmissionsResolver";
import {UiApiService} from "../../api/ui-api.service";
import {PositionedEmission} from "./position/PositionedEmission";


@Injectable({providedIn: 'root'})
export class PositionedEmissionsStorage {

  constructor(
    private readonly uiApiService: UiApiService,
    private readonly activeTimelineSpecificationStorage: TimelineSpecificationStorage,
    private readonly positionedEmissionsResolver: PositionedEmissionsResolver
  ) {
  }

  select(): Observable<{ [streamId: string]: Array<PositionedEmission> }> {
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
