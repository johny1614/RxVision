import { Observable, Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";

export function createAbsoluteTimedObservable(
  values: number[],
  delays: number[],
  destroy$?: Observable<void>
): Observable<number> {
  const subject = new Subject<number>();
  const startTime = Date.now();

  values.forEach((value, index) => {
    const targetTime = startTime + delays[index];
    const currentTime = Date.now();
    const delayTime = Math.max(0, targetTime - currentTime);

    let stream = timer(delayTime);
    if (destroy$) {
      stream = stream.pipe(takeUntil(destroy$));
    }

    stream.subscribe({
      next: () => subject.next(value),
      complete: () => {
        if (index === values.length - 1) {
          subject.complete();
        }
      }
    });
  });
  return subject.asObservable();
}
