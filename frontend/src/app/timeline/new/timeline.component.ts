import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, Observable, take} from "rxjs";
import {TimelineRange} from "../timeline-range";
import {TimelinesService} from "./TimelinesService";
import {TimelineRectangle} from "../timeline-rectangle";
import {TimelineWidthStorage} from "./TimelineWidthStorage";
import {TimelinePositionService} from "./TimelinePositionService";
import {ChosenTimelinesStorage} from "./chosen/ChosenTimelinesStorage";
import {TimelineSpecification} from "./TimelineSpecification";
import {TimelineSpecificationStorage} from "./TimelineSpecificationStorage";

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TimelineComponent implements OnInit, AfterViewInit {

  @ViewChild('timelineDiv')
  timelineDiv: ElementRef;

  @ViewChildren('rangeElement') ranges!: QueryList<ElementRef<HTMLElement>>;

  highlightedRect: TimelineRectangle = new TimelineRectangle(0, 0);
  highlightingRect = false;
  isMouseDown = false;
  dragStartAnchorTime: number;
  timelineRanges$: Observable<Array<TimelineRange>>;
  activeTimelineRange: TimelineRange;


  positionForLoopButton: number = 0;
  requestedTimelineButtonWidth = 100;
  requestedTimelineRange?: TimelineRange;
  showRequestedTimelineRange = true;

  resizeObserver: ResizeObserver;
  timelineSpecification$: Observable<TimelineSpecification> = this.activeTimelineSpecificationStorage.selectActive();
  timelineSpecification: TimelineSpecification;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showRequestedTimelineRange = false;
      this.highlightingRect = false;
      this.highlightedRect = new TimelineRectangle(0, 0);
      this.changeDetectorRef.detectChanges();
    }
  }

  @HostListener('mouseup')
  onComponentMouseDown(event: MouseEvent): void {
    if (this.isMouseDown) {
      this.onMouseUp();
    }
  }


  constructor(private readonly timelinePositionService: TimelinePositionService,
              private readonly timelineWidthStorage: TimelineWidthStorage,
              private readonly elementRef: ElementRef,
              private readonly chosenTimelinesStorage: ChosenTimelinesStorage,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly timelineRangesService: TimelinesService,
              private readonly activeTimelineSpecificationStorage: TimelineSpecificationStorage
  ) {
  }

  ngOnInit(): void {
    this.timelineRanges$ = this.timelineRangesService.selectAll();
    this.timelineRangesService.selectActive()
      .subscribe((activeTimelineRange) => {
        this.activeTimelineRange = activeTimelineRange;
      });
    this.timelineSpecification$.subscribe((activeTimelineSpecification) => {
      this.timelineSpecification = activeTimelineSpecification;
      this.changeDetectorRef.detectChanges();
    })
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      this.timelineWidthStorage.timelineContainerWidth$.next(width);
      this.changeDetectorRef.detectChanges();
    });
    if (this.timelineDiv?.nativeElement) {
      this.resizeObserver.observe(this.timelineDiv.nativeElement);
    }
    this.ranges.changes.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) {
      return;
    }
    this.highlightingRect = true;
    const mousePositionInElement = this.getMousePositionInElement(event);
    if (mousePositionInElement > this.dragStartAnchorTime) {
      this.highlightedRect = new TimelineRectangle(this.dragStartAnchorTime, mousePositionInElement);
    } else {
      this.highlightedRect = new TimelineRectangle(mousePositionInElement, this.dragStartAnchorTime);
    }
  }

  getMousePositionInElement(event: MouseEvent): number {
    const element = this.timelineDiv.nativeElement as HTMLElement;
    const boundingRect = element.getBoundingClientRect();
    return event.clientX - boundingRect.left;
  }

  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.dragStartAnchorTime = this.getMousePositionInElement(event);
    this.highlightedRect = new TimelineRectangle(this.dragStartAnchorTime, this.dragStartAnchorTime);
  }

  onMouseUp(): void {
    this.isMouseDown = false;
    if (!this.highlightingRect) {
      return;
    }
    this.showTimelineRangeChangeRequest();
  }

  private showTimelineRangeChangeRequest(): void {
    const startTime$ = this.timelinePositionService.selectTimeByPosition(this.highlightedRect.startPx, this.activeTimelineRange.getDuration());
    const endTime$ = this.timelinePositionService.selectTimeByPosition(this.highlightedRect.endPx, this.activeTimelineRange.getDuration());
    const timelineRange$ = this.timelineRangesService.selectActive();
    combineLatest([startTime$, endTime$, timelineRange$])
      .pipe(take(1))
      .subscribe(([startTime, endTime, currentTimelineRange]) => {
        this.showRequestedTimelineRange = true;
        this.requestedTimelineRange = new TimelineRange(
          currentTimelineRange.startTime + startTime,
          currentTimelineRange.startTime + endTime,
          false
        );
        this.positionForLoopButton = this.getPositionForLoopButton();
        this.dragStartAnchorTime = null;
        this.highlightingRect = false;
      });
  }

  getPositionForLoopButton(): number {
    const centerOfRectangle = (this.highlightedRect.startPx + this.highlightedRect.endPx) / 2
    return centerOfRectangle - this.requestedTimelineButtonWidth / 2;
  }

  getBackground(): string {
    return `linear-gradient(to right, transparent ${this.highlightedRect.startPx}px, aqua ${this.highlightedRect.startPx}px, aqua ${this.highlightedRect.endPx}px, transparent ${this.highlightedRect.endPx}px)`;
  }

  onRequestedTimelineAccepted(event$: MouseEvent) {
    event$.stopPropagation();
    this.chosenTimelinesStorage.addTimeline(this.requestedTimelineRange);
    this.highlightedRect = new TimelineRectangle(0, 0);
    this.requestedTimelineRange = null;
  }

  onTimelineRangeTitleClick(timelineRange: TimelineRange): void {
    if (timelineRange.isFullRange) {
      this.chosenTimelinesStorage.removeAllTimelineRanges();
    }
    if (!timelineRange.isFullRange) {
      this.chosenTimelinesStorage.setChosenBeforeTimeline(timelineRange)
    }
  }

  getDisplayedTimeValue(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
