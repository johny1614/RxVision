import {NgModule} from "@angular/core";
// import {UiAppComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import { DomSanitizer} from "@angular/platform-browser";
import {PanelComponent} from "./panel/panel.component";
import {PanelEmissionsTimelineComponent} from "./emissions-timeline/panel-emissions-timeline.component";
import {ColorModifier} from "./util/ColorModifier";
// import {TimelineComponent} from "./timeline/new/timeline.component";
import {NewPanelComponent} from "./panel/new/new-panel.component";
import {StreamTimelineComponent} from "./stream-timeline/stream-timeline.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {TimelineComponent} from "ui/app/timeline/new/timeline.component";
import {XIconComponent} from "../ui/marker/x-marker/x-icon/x-icon.component";
import {XMarkerComponent} from "../ui/marker/x-marker/x-marker.component";
import {MarkerTooltipComponent} from "../ui/marker/marker-tooltip/marker-tooltip.component";
import {MarkerTooltipDirective} from "../ui/marker/marker-tooltip/marker-tooltip.directive";
import {VerticalSplitPaneComponent} from "./panel/new/vertical-split-pane/vertical-split-pane.component";
import {TagComponent} from "../ui/tag/tag.component";
import {GroupingMarkerComponent} from "../ui/marker/grouping-marker/grouping-marker.component";
import {MarkerComponent} from "../ui/marker/marker-component";
// import {UiAppComponent} from "ui/app/ui-app.component";

@NgModule({
    declarations: [
        // UiAppComponent, // TODO do usuniecia raczej albo tylko do budowania extension?
        TimelineComponent,
        StreamTimelineComponent,
        // PanelComponent,
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
    ],
    providers: [ColorModifier]
})
export class AppModule {
}
