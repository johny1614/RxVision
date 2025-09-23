import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {PanelComponent} from "./panel/panel.component";
import {PanelEmissionsTimelineComponent} from "./emissions-timeline/panel-emissions-timeline.component";
import {ColorModifier} from "./util/ColorModifier";
import {TimelineComponent} from "./timeline/new/timeline.component";
import {NewPanelComponent} from "./panel/new/new-panel.component";
import {StreamTimelineComponent} from "./stream-timeline/stream-timeline.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {XIconComponent} from "../ui/marker/x-marker/x-icon/x-icon.component";
import {XMarkerComponent} from "../ui/marker/x-marker/x-marker.component";
import {MarkerTooltipComponent} from "../ui/marker/marker-tooltip/marker-tooltip.component";
import {MarkerTooltipDirective} from "../ui/marker/marker-tooltip/marker-tooltip.directive";
import {VerticalSplitPaneComponent} from "./panel/new/vertical-split-pane/vertical-split-pane.component";
import {TagComponent} from "../ui/tag/tag.component";
import {GroupingMarkerComponent} from "../ui/marker/grouping-marker/grouping-marker.component";
import {MarkerComponent} from "../ui/marker/marker-component";


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    StreamTimelineComponent,
    PanelComponent,
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
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [ColorModifier, provideAnimationsAsync()]
})
export class AppModule {
  private domSanitizer: DomSanitizer;

  constructor(private matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.domSanitizer = domSanitizer;
    this.matIconRegistry.addSvgIcon(
      'zoom_in',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/zoom_in.svg')
    );
  }
}
