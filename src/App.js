
import './App.css';
import { UseReducer } from './useReducers';
import { UseState } from './UseState';

function App() {
  return (
    <div className='App'>
      <UseReducer name="Use Reducer"/>
      <UseState name="Use State" />
    </div>
  );
}

export default App;
