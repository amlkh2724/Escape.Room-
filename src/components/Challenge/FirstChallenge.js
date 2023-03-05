import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FirstChallenge.css';
import Timer from '../countdown/Timer';
import api from '../../api/api';
import ModalTwo from '../CodeModal/CodeModal';

const FirstChallenge = () => {
  const [inputValue, setInputValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerCount((prevCount) => prevCount + 1);
    }, 1000);

    const postTimeElapsed = async () => {
      try {
        const userID = localStorage.getItem('userID');
        await api.put(
          `/escape/${userID}`,
          {
            timerElapsed: timerCount,
          }
        );
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

  // const handleInputValueChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  const handleModalTwoResult = (result) => {
    if (result === '1865') {
      setIsGameWon(true);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

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
            <div className='theAllPage'>
              <button className='buttonLock' onClick={openModal}></button>
              {showModal && <ModalTwo closeModal={setShowModal} onWin={handleModalTwoResult} inputValue={inputValue} />}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FirstChallenge;
