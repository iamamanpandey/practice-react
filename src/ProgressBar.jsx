import React, { useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          setProgress(100);
          return clearInterval(interval);
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
