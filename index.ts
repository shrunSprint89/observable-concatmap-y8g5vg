import { of, from, fromEvent } from 'rxjs';
import {
  map,
  delay,
  mergeMap,
  concatMap,
  take,
  exhaust,
  exhaustMap,
  switchMap,
} from 'rxjs/operators';

let clickCounter = 0;
const getData = (param) => {
  const delayTime = 3000; //Math.floor(Math.random() * 10000) + 1;
  //return of(`retrieved new data with params: ${param} and delay: ${delayTime}`).pipe(
  //  delay(delayTime)
  //)
  return fromEvent(document, 'click').pipe(map(() => [param, clickCounter++]));
};

// using a regular map
from([1, 2, 3, 4])
  .pipe(map((param) => getData(param)))
  .subscribe((val) => val.subscribe((data) => console.log('map:', data)));

// using mergeMap
from([1, 2, 3, 4])
  .pipe(mergeMap((param) => getData(param)))
  .subscribe((val) => console.log('mergeMap:', val));

// using concatMap
from([1, 2, 3, 4])
  .pipe(concatMap((param) => getData(param)))
  .subscribe((val) => console.log('concatMap:', val));

// using concatMap
from([1, 2, 3, 4])
  .pipe(exhaustMap((param) => getData(param)))
  .subscribe((val) => console.log('exhaustMap:', val));

// using concatMap
from([1, 2, 3, 4])
  .pipe(switchMap((param) => getData(param)))
  .subscribe((val) => console.log('switchMap:', val));
