import { useId, useReducer, useState } from "react";
import "./App.css";
import Name from "../Name";
import NameProvider from "../context/NameContext";
import reducer from "../context/reducer";
import ProgressBar from "../ProgressBar";

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  const [progressList, setProgressList] = useState([]);

  const handleIncrement = () => {
    dispatch({ type: "increament" });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  const handleProgressBar = () => {
    setProgressList([...progressList, { id: useId() }]);
  };
  return (
    <NameProvider>
      <Name />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleIncrement}>add</button>
        <button onClick={handleDecrement}>Substrac</button>
        {state.count}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {progressList.map((item) => (
        <ProgressBar key={item?.id} />
      ))}
      <button onClick={handleProgressBar}>Add Progress Bar</button>
    </NameProvider>
  );
}

export default App;
