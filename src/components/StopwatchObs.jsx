import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';
import DisplayTime from './DisplayTime';

const counter = new Observable(function subscribe(observer) {
  var intervalID = setInterval(() => {
    observer.next(1);
  }, 1000);
  return function unsubscribe() {
    clearInterval(intervalID);
  };
});

const StopwatchObs = () => {
  const [sec, setSec] = useState(0);
  const [subscr, setSub] = useState(null);
  const [dbClick, setDbClick] = useState(false);

  useEffect(() => (subscr) & (() => subscr.unsubscribe()), []);

  const startHandler = () => {
    if (subscr) {
      subscr.unsubscribe();
      setSub(null);
      setSec(0);
    } else setSub(counter.subscribe(x => setSec(v => v + x)));
  }
  const waitHandler = () => {
    if (subscr && dbClick) {
      subscr.unsubscribe();
      setSub(null);
      setDbClick(false);
    }
    setDbClick(true);
    setTimeout(() => {
      setDbClick(false);
    }, 300);
  }
  const resetHandler = () => {
    setSec(0);
    if(!subscr) setSub(counter.subscribe(x => setSec(v => v + x)));
  }
  return (
    <div>
      <h1>stopwatch</h1>
      <DisplayTime time={sec} />
      <button onClick={startHandler}> {(!subscr) ? 'Start':'Stop'}</button>
      <button onClick={waitHandler}>wait</button>
      <button onClick={resetHandler}>reset</button>
    </div>
  );
}

export default StopwatchObs;
