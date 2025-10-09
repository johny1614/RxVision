export class TimelineRange {

  constructor(
    public readonly startTime: number,
    public readonly endTime: number,
    public readonly isFullRange: boolean = false
  ) {
  }

  equals(other: TimelineRange): boolean {
    return other.startTime === this.startTime && other.endTime === this.endTime && other.isFullRange == this.isFullRange;
  }

  getLabel(): string {
    const baseLabel = Math.round(this.endTime - this.startTime) + 'ms';
    if (this.isFullRange) {
      return 'Full range (' + baseLabel + ')';
    }
    return baseLabel;
  }

  getDuration(): number {
    return this.endTime - this.startTime;
  }

  isTimeInRange(time: number): boolean {
    return time >= this.startTime && time <= this.endTime;
  }
}
