import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FirstChallenge.css';
import Timer from '../Timer/Timer';

const FirstChallenge = ({ isComplete, setIsComplete }) => {
  const [inputValue, setInputValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

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

  const checkSequence = () => {
    if (inputValue === '1865') {
      setIsComplete(true);
      setIsGameWon(true);
    }
  }

  return (
    <>
      {isGameWon ? (
        <div>
          <h2>Congratulations! You won the game!</h2>
          <Link to="/home">Go back to home</Link>
        </div>
      ) : (
        <>
          <Timer timeLimit={10} onTimeout={handleTimeout} />
          {showResult ? (
            <div>
              <h2>Time's up!</h2>
              <Link to="/home">Go back to home</Link>
            </div>
          ) : (
            <div>
              <button className="first" onClick={handleButtonClick} data-number="1"></button>
              <button className="second" onClick={handleButtonClick} data-number="8"></button>
              <button className="third" onClick={handleButtonClick} data-number="6"></button>
              <button className="fourth" onClick={handleButtonClick} data-number="5"></button>
              <input type='text' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }}></input>
              {isComplete && (
                <div>
                  <p>Finish game!</p>
                  <Link to="/home">Go to Home page</Link>
                </div>
              )}
              <button onClick={checkSequence}>Check Sequence</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FirstChallenge;
