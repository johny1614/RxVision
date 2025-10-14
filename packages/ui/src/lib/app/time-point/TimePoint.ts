export class TimePoint {
    constructor(
        public readonly time: number,
        public readonly value: unknown,
        public readonly displayValue: string
    ) {
    }
}