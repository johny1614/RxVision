// create-absolute-timed-observable.spec.ts
import {discardPeriodicTasks, fakeAsync, flush, tick} from '@angular/core/testing';
import { Subject } from 'rxjs';
import {createAbsoluteTimedObservable} from "./createAbsoluteTimedObservable";

describe('createAbsoluteTimedObservable', () => {
  it('emits values at the correct times and completes after the last emission', fakeAsync(() => {
    const values = [10, 20, 30];
    const delays = [70, 130, 180];
    const results: number[] = [];

    const subscription = createAbsoluteTimedObservable(values, delays)
      .subscribe(v => results.push(v));

    tick(70);
    expect(results).toEqual([10]);
    tick(60);
    expect(results).toEqual([10, 20]);
    tick(50);
    expect(results).toEqual([10, 20, 30]);

    subscription.unsubscribe();
    flush();
    discardPeriodicTasks();
  }));
});
