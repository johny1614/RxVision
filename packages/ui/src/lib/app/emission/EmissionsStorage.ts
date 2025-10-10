import {Injectable} from "@angular/core";
import {PanelMessageService} from "../panel/panel-message.service";
import {TimelineSpecificationStorage} from "../timeline/new/TimelineSpecificationStorage";
import {combineLatest, map, Observable, tap} from "rxjs";
import {Marker} from "../../ui/marker/Marker";
import {PositionedEmissionsResolver} from "./position/PositionedEmissionsResolver";


@Injectable({providedIn: 'root'})
export class EmissionsStorage {

  constructor(
    private readonly panelMessageService: PanelMessageService,
    private readonly activeTimelineSpecificationStorage: TimelineSpecificationStorage,
    private readonly positionedEmissionsResolver: PositionedEmissionsResolver
  ) {
  }

  select(): Observable<{ [streamId: string]: Array<Marker> }> {
    return combineLatest([
      this.panelMessageService.emissions$,
      this.activeTimelineSpecificationStorage.selectActive()
    ]).pipe(
      map(([emissions, activeTimelineSpecifications]) => {
        return this.positionedEmissionsResolver.resolve(emissions, activeTimelineSpecifications);
      })
    );
  }
}
