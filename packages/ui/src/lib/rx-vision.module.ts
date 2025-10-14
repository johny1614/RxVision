import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TimelineComponent} from "./ui/timeline/timeline.component";
import {XIconComponent} from "./ui/marker/x-marker/x-icon/x-icon.component";
import {XMarkerComponent} from "./ui/marker/x-marker/x-marker.component";
import {MarkerTooltipComponent} from "./ui/marker/marker-tooltip/marker-tooltip.component";
import {MarkerTooltipDirective} from "./ui/marker/marker-tooltip/marker-tooltip.directive";
import {TagComponent} from "./ui/tag/tag.component";
import {GroupingMarkerComponent} from "./ui/marker/grouping-marker/grouping-marker.component";
import {MarkerComponent} from "./ui/marker/marker-component";
import {GraphComponent} from "./ui/graph/graph.component";
import {VerticalSplitPaneComponent} from "./ui/vertical-split-pane/vertical-split-pane.component";
import {MarkerLaneComponent} from "./ui/marker-lane/marker-lane.component";

@NgModule({
    declarations: [
        TimelineComponent,
        MarkerLaneComponent,
        GraphComponent,
        XIconComponent,
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
        GraphComponent
    ]
})
export class RxVisionModule {
}
