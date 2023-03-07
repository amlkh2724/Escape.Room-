// import React, { useState } from 'react';
// import './FirstChallenge.css';
// import Timer from '../countdown/Timer';
// import ModalTwo from '../CodeModal/CodeModal';
// import BombChallenge from './SecondChallengebomb/BombChallenge';

// const FirstChallenge = () => {
//   const [isCodeCorrect, setIsCodeCorrect] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [isGameWon, setIsGameWon] = useState(false);
//   const [timerCount, setTimerCount] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   const handleTimeout = () => {
//     if (!isGameWon) {
//       setShowResult(true);
//     }
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const handleModalTwoResult = (result) => {
//     if (result === '1865') {
//       setIsCodeCorrect(true);
//       setIsGameWon(true);
//       setShowModal(false);
//     } else {
//       setIsCodeCorrect(false);
//     }
//   };

//   return (
//     <>
//       {isGameWon ? (
//         <>
//           <h1>Game Won</h1>
//           <BombChallenge />
//         </>
//       ) : (
//         <>
//           <Timer timeLimit={10} onTimeout={handleTimeout} />
//           {showResult ? (
//             <h1>oka</h1>
//           ) : (
//             <div className='theAllPage'>
//               <button className='buttonLock' onClick={openModal}>
//                 asd
//               </button>
//               {showModal && (
//                 <ModalTwo
//                   closeModal={setShowModal}
//                   onWin={handleModalTwoResult}
//                   inputValue={inputValue}
//                 />
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default FirstChallenge;







import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FirstChallenge.css';
import Timer from '../countdown/Timer';
import api from '../../api/api';
import ModalTwo from '../CodeModal/CodeModal';
import BombChallenge from './SecondChallengebomb/BombChallenge';
import lockImg from '../../pages/assests/lockGifCode.gif';


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
  }, [ isGameWon,timerCount]);

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

  return (
    <>
      {isGameWon ? (
        <div>

<BombChallenge  bombDisarmed={isGameWon} />
         
        </div>
      ) : (
        <>
          <Timer timeLimit={110} onTimeout={handleTimeout} />
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
          </div>
          )}
        </>
      )}
    </>
  );
};

export default FirstChallenge;
