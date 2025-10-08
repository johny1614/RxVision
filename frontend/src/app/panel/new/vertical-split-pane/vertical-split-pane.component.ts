import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {VerticalSplitPaneLeftSideWidthStorage} from "./VerticalSplitPaneLeftSideWidthStorage";
import {Subject} from "rxjs";

@Component({
    selector: 'app-vertical-split-pane',
    templateUrl: './vertical-split-pane.component.html',
    styleUrls: ['./vertical-split-pane.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class VerticalSplitPaneComponent {
  @ViewChild('leftPane', {static: true}) leftPaneRef!: ElementRef<HTMLElement>;
  @ViewChild('rightPane', {static: true}) rightPaneRef!: ElementRef<HTMLDivElement>;
  @Output() rightPaneWidthChange = new Subject<number>();

  private dragStartX = 0;
  private startDragLeftPaneWidth = 0;
  private dragging = false;

  currentLeftPaneWidth?: number;

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(ev: PointerEvent) {
    if (!this.dragging) return;
    const dragDeltaX = ev.clientX - this.dragStartX;
    this.currentLeftPaneWidth = this.startDragLeftPaneWidth + dragDeltaX;
    this.rightPaneWidthChange.next(this.rightPaneRef.nativeElement.getBoundingClientRect().width);
  }

  @HostListener('document:pointerup')
  onPointerUp(ev: PointerEvent) {
    this.dragging = false;
    this.resetOnDragStyles();
    this.verticalSplitPaneLeftPaneWidthStorage.save(this.currentLeftPaneWidth);
  }

  @HostListener('window:resize')
  onResize() {
    this.rightPaneWidthChange.next(this.rightPaneRef.nativeElement.getBoundingClientRect().width);
  }

  constructor(private verticalSplitPaneLeftPaneWidthStorage: VerticalSplitPaneLeftSideWidthStorage) {
  }

  async ngAfterViewInit() {
    this.currentLeftPaneWidth = await this.verticalSplitPaneLeftPaneWidthStorage.load() || 60;
    this.rightPaneWidthChange.next(this.rightPaneRef.nativeElement.getBoundingClientRect().width);
  }

  onDragStart(ev: PointerEvent) {
    this.adjustOnDragStyles();
    this.dragging = true;
    this.dragStartX = ev.clientX;
    this.startDragLeftPaneWidth = this.leftPaneRef.nativeElement.getBoundingClientRect().width;
  }

  onHandleDoubleClick(): void {
    const leftPaneElement = this.leftPaneRef.nativeElement;
    const neededWidthForLeftPaneElements = Math.max(
      ...Array.from(leftPaneElement.querySelectorAll<HTMLElement>('span')) // TODO better selector
        .map(child => child.scrollWidth)
    );
    if (this.currentLeftPaneWidth > neededWidthForLeftPaneElements) {
      this.currentLeftPaneWidth = Math.ceil(neededWidthForLeftPaneElements + 1);
      this.verticalSplitPaneLeftPaneWidthStorage.save(this.currentLeftPaneWidth);
      return;
    }
    if (this.currentLeftPaneWidth < neededWidthForLeftPaneElements) {
      this.currentLeftPaneWidth = Math.ceil(neededWidthForLeftPaneElements + 1);
      this.verticalSplitPaneLeftPaneWidthStorage.save(this.currentLeftPaneWidth);
      return;
    }
  }

  private adjustOnDragStyles() {
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  private resetOnDragStyles() {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
}
