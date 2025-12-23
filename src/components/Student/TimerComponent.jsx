import React, { useState, useEffect, useRef } from 'react';
import './TimerComponent.css';

const TimerComponent = ({ totalSeconds, onTimeEnd }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const onTimeEndRef = useRef(onTimeEnd);

  // Keep the ref updated
  useEffect(() => {
    onTimeEndRef.current = onTimeEnd;
  }, [onTimeEnd]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          if (onTimeEndRef.current) {
            onTimeEndRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array - only run once on mount

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (remainingSeconds > 300) return 'green'; // > 5 minutes
    if (remainingSeconds > 60) return 'orange'; // 1-5 minutes
    return 'red'; // < 1 minute
  };

  return (
    <div className={`timer-component ${getTimerColor()}`}>
      <div className="timer-label">Time Remaining</div>
      <div className="timer-display">{formatTime(remainingSeconds)}</div>
    </div>
  );
};

export default TimerComponent;
