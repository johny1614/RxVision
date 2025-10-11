import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PanelEmissionsTimelineComponent} from "./app/emissions-timeline/panel-emissions-timeline.component";
import {StreamTimelineComponent} from "./app/stream-timeline/stream-timeline.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TimelineComponent} from "./app/timeline/new/timeline.component";
import {XIconComponent} from "./ui/marker/x-marker/x-icon/x-icon.component";
import {XMarkerComponent} from "./ui/marker/x-marker/x-marker.component";
import {MarkerTooltipComponent} from "./ui/marker/marker-tooltip/marker-tooltip.component";
import {MarkerTooltipDirective} from "./ui/marker/marker-tooltip/marker-tooltip.directive";
import {TagComponent} from "./ui/tag/tag.component";
import {GroupingMarkerComponent} from "./ui/marker/grouping-marker/grouping-marker.component";
import {MarkerComponent} from "./ui/marker/marker-component";
import {NewPanelComponent} from "./app/panel/new-panel.component";
import { VerticalSplitPaneComponent } from "./app/panel/vertical-split-pane/vertical-split-pane.component";

@NgModule({
    declarations: [
        TimelineComponent,
        StreamTimelineComponent,
        NewPanelComponent,
        XIconComponent,
        PanelEmissionsTimelineComponent,
        XMarkerComponent,
        MarkerTooltipComponent,
        MarkerTooltipDirective,
        VerticalSplitPaneComponent,
        TagComponent,
        GroupingMarkerComponent,
        MarkerComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        NewPanelComponent
    ]
})
export class RxVisionModule {
}
