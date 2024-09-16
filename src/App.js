
import './App.css';
import { ClassState } from './ClassState';
import { UseState } from './UseState';

function App() {
  return (
    <div className='App'>
      <ClassState name="Class State"/>
      <UseState name="Use State" />
    </div>
  );
}

export default App;
