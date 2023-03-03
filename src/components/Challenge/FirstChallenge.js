import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FirstChallenge.css';
import Timer from '../countdown/Timer';
import api from '../../api/api';
const FirstChallenge = ({ isComplete, setIsComplete }) => {
  const [inputValue, setInputValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timerCount, setTimerCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerCount((prevCount) => prevCount + 1);
    }, 1000);
  
    const postTimeElapsed = async () => {
      try {
        const userID = localStorage.getItem('userID');
        await api.put(
          
          `/escape/${userID}`, {
          timerElapsed: timerCount,
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    if (isGameWon) {
      postTimeElapsed();
      clearInterval(intervalId);
    }
  
    return () => clearInterval(intervalId);
  }, [isGameWon, timerCount]);
  

  const handleTimeout = () => {
    if (!isGameWon) {
      setShowResult(true);
    }
  };

  const handleButtonClick = (event) => {
    const button = event.target;
    const number = button.getAttribute('data-number');
    button.innerHTML = number;
  };

  // const checkSequence = () => {
  //   if (inputValue === '1865') {
  //     setIsComplete(true);
  //     setIsGameWon(true);
  //   }
  // };

  return (
    <>
      {isGameWon ? (
        <div>
          <h2>Congratulations! You won the game in {timerCount} seconds.</h2>

          <Link to="/home">Go back to home</Link>
        </div>
      ) : (
        <>
          <Timer timeLimit={500} onTimeout={handleTimeout} />
          {showResult ? (
            <div>
              <h2>Time's up!</h2>
              <Link to="/home">Go back to home</Link>
            </div>
          ) : (
            <div>
              <button
                className="first"
                onClick={handleButtonClick}
                data-number="1"
              ></button>
              <button
                className="second"
                onClick={handleButtonClick}
                data-number="8"
              ></button>
              <button
                className="third"
                onClick={handleButtonClick}
                data-number="6"
              ></button>
              <button
                className="fourth"
                onClick={handleButtonClick}
                data-number="5"
              ></button>
              {/* <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              ></input>
              {isComplete && (
                <div>
                  <p>Finish game!</p>
                  <Link to="/home">Go to Home page</Link>
                </div>
              )}
              <button onClick={checkSequence}>Check Sequence</button> */}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FirstChallenge;
