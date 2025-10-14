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
import {TimelineComponent} from "../timeline/timeline.component";
import {MarkerLanesStorage} from "../marker/MarkerLanesStorage";
import {MarkerLane} from "../marker/MarkerLane";
import {markerWidthPx, streamNameHeightPx, streamNamesMarginBetweenPx} from "../../ui/uiConsts";

@Component({
    selector: 'ui-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class GraphComponent implements OnInit, AfterViewInit {

    @HostBinding('style.display') display = 'block';

    @HostBinding('style.--tag-height.px')
    get getTagHeight() {
        return streamNameHeightPx;
    }

    @HostBinding('style.--right-graph-margin-left.px')
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
    markerLanes: Array<MarkerLane>;

    private resizeObserver: ResizeObserver;

    constructor(private markerLanesStorage: MarkerLanesStorage,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.markerLanesStorage.select().subscribe(
            markerLanes => {
                this.markerLanes = markerLanes;
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
