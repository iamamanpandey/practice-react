import React, { useRef } from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(0);
  const [start, setStart] = React.useState(false);
  let interVal = useRef(null);

  const handleReset = (e) => {
    setProgress(0);
  };
  const handleStop = () => {
    if (progress === 100) return;
    if (start) {
      clearInterval(interVal.current);
      setStart(false);
      return;
    } else {
      setStart(true);
      interVal.current = setInterval(() => {
        setProgress((prev) => {
          if (prev === 100) {
            setProgress(100);
            return clearInterval(interVal.current);
          }
          return prev + 10;
        });
      }, 1000);
    }
  };
  return (
    <div>
      <div className="progress">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
      <button onClick={handleStop}>{start ? "Start" : "Resume"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ProgressBar;
