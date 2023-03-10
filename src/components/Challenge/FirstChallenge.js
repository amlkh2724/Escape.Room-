

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FirstChallenge.css';
import Timer from '../CountDownTimer/Timer';
import api from '../../api/api';
import ModalTwo from '../CodeModal/CodeModal';
import { useNavigate } from 'react-router-dom';

// import BombChallenge from './SecondChallengebomb/BombChallenge';
import lockImg from '../../pages/assests/lockGifCode.gif';
// import Story from '../story/Story';
import Hint from '../TipToFindTheWay/Hint';

const FirstChallenge = () => {
  const [inputValue, setInputValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [openHint, SetOpenHint] = useState(false)
  const navigate = useNavigate();





  // const navigate = useNavigate();

  // import { useNavigate } from 'react-router-dom';

  // <button onClick={() => navigate('/room2')}>Submit</button>
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerCount((prevCount) => prevCount + 1);
      localStorage.setItem('counterFirstChallenge', JSON.stringify(Number(localStorage.getItem('counter')) + 1));

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



  const handleModalTwoResult = (result) => {
    if (result === '1865') {
      setIsGameWon(true);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };
  const Hint2 = () => {
    SetOpenHint((prevState) => !prevState);
  };
  useEffect(() => {
    if (isGameWon) {
      navigate('/room2');
    }
  }, [isGameWon]);

  return (
    <>
      {isGameWon ? (
        <div>
          {/* {navigate('/room2')} */}
        </div>
      ) : (
        <>
          <Timer timeLimit={1110} onTimeout={handleTimeout} />
          {showResult ? (
            <div>
              <h2>Time's up!</h2>
              <Link to="/home">Go back to home</Link>
            </div>
          ) : (
            <div className='theAllPage2'>
              <div className='buttonloc'>
                <button className='buttonLock' onClick={openModal}>
                  <img src={lockImg} alt="Lock icon" />

                </button>
              </div>
              {showModal && <ModalTwo closeModal={setShowModal} onWin={handleModalTwoResult} inputValue={inputValue} />}
              <div className='containerPostionButton'>
                <button className='postionButtonHint' onClick={Hint2}>Hint</button>

              </div>
              {openHint && <Hint SetOpenHint={SetOpenHint}></Hint>}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FirstChallenge;
