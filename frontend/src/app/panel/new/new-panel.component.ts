import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {TimelineComponent} from "../../timeline/new/timeline.component";
import {StreamsStorage} from "../../stream/StreamsStorage";
import {Stream} from "../../stream/Stream";
import {markerWidthPx, streamNameHeightPx, streamNamesMarginBetweenPx} from "../../../ui/uiConsts";

@Component({
  selector: 'app-new-panel',
  templateUrl: './new-panel.component.html',
  styleUrls: ['./new-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewPanelComponent implements OnInit, AfterViewInit {

  @HostBinding('style.display') display = 'block';

  @HostBinding('style.--tag-height.px')
  get getTagHeight() {
    return streamNameHeightPx;
  }

  @HostBinding('style.--right-panel-margin-left.px')
  get getRightPanelMarginLeft() {
    return markerWidthPx / 2;
  }

  @ViewChild(TimelineComponent, {read: ElementRef})
  timelineComponentRef!: ElementRef<HTMLElement>;

  @ViewChild('timelineRightPane')
  timelineRightPaneRef!: ElementRef<HTMLElement>;

  readonly streamNamesMarginBetweenPx = streamNamesMarginBetweenPx;
  readonly streamNameHeightPx = streamNameHeightPx;
  timelineHeight: number = 0;
  streams: Array<Stream>;

  private resizeObserver: ResizeObserver;

  constructor(private streamsStorage: StreamsStorage,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.streamsStorage.select().subscribe(
      streams => {
        this.streams = streams;
        this.changeDetector.detectChanges();
      }
    )
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(([entry]) => {
      this.timelineHeight = entry.contentRect.height;
      this.changeDetector.detectChanges();
    });

    if (this.timelineRightPaneRef?.nativeElement) {
      this.resizeObserver.observe(this.timelineRightPaneRef.nativeElement);
    }
  }

}
