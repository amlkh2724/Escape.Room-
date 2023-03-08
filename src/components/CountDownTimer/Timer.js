import React, { useState, useEffect } from 'react';
import './Timer.css'
function Timer({ timeLimit, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
    }
  }, [timeLeft, onTimeout]);

  return(
    
    <div className='containerTimer'>
    <div className='fixTimeStyle'>{timeLeft} seconds left</div>
    </div>
    
    
    
    )
}

export default Timer;
