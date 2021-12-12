import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import './App.css';
import StopwatchFun from './components/StopwatchFun';
import StopwatchObs from './components/StopwatchObs';

const App = () => {
  const ROUTES = {
    FIRST: '/first',
    SECOND: '/second',
  }
  const location = useLocation()
  const isFirst = () => location.pathname === '/first';

  return (
    <div className="App">
      <Routes>
        <Route path={ ROUTES.FIRST } element={<StopwatchObs />} />
        <Route path={ ROUTES.SECOND } element={ <StopwatchFun /> } />
        <Route path="*" element={ <Navigate to='/first'/> } />
      </Routes>
      <Link to={!isFirst() ? '/first' : '/second'} >
        <button>
          { isFirst()? 'to second implementation' : 'to first implementation' }
        </button>
      </Link>
      <p>double click to wait</p>
    </div>
  );
}

export default App;
