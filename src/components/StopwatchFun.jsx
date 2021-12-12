import {
  interval,
  NEVER,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { useEffect, useState } from 'react';
import DisplayTime from './DisplayTime';

const action$ = new Subject();

const ACTIONS = {
  START: 'start',
  WAIT: 'wait',
  RESET: 'reset',
}

const stopWatchSub = (value, setValue) => {
  const stopWatch$ = action$.pipe(
    startWith({ count: false, value: value }),
    scan((state, action) => {
      let newVal = {};
      if (Object.keys(state).length === 0) newVal = { count: false, value: value };   // because startWith returns {} on the first iteration
      if (action === ACTIONS.START) {
        newVal = (state.count) ? { count: false, value: 0 } : { count: true };
      }
      if (action === ACTIONS.WAIT) {
        newVal = { count: false };
      }
      if (action === ACTIONS.RESET) {
        newVal = { count: true, value: 0 };
      }
      return ({ ...state, ...newVal });
    }, {}),
    tap((state) => setValue(state.value)),
    switchMap((state) => 
    state.count
      ? interval(1000)
        .pipe(
          tap(_ => state.value += 1),
          tap(_ => setValue(state.value)),
        )
      : NEVER)
  );

  return stopWatch$.subscribe();
}

const StopwatchFun = () => {
  const [sec, setSec] = useState(0);
  const [dbClick, setDbClick] = useState(false);
  
  useEffect(() => {
    const observ = stopWatchSub(sec, setSec);
    return () => observ.unsubscribe();
  }, [])

  const handleStart = () => {
    action$.next(ACTIONS.START);
  }

  
  const handleWait = () => {
    if (dbClick) {
      action$.next(ACTIONS.WAIT);
      setDbClick(false);
    }
    setDbClick(true);
    setTimeout(() => {
      setDbClick(false);
    }, 300);
  }

  const handleReset = () => {
    action$.next(ACTIONS.RESET);
  }

  return (
    <div>
      <h1>stopwatch Fun</h1>
      <DisplayTime time={sec} />
      <button onClick={handleStart}>Start/stop</button>
      <button onClick={handleWait}>wait</button>
      <button onClick={handleReset}>reset</button>
    </div>
  );
}

export default StopwatchFun;
