
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Room2.css';
import { useIsBombDisarmedContext } from '../../components/context/isWinContext';
import { LoggedUserContext } from '../../components/context/context';
import api from '../../api/api';
const Room2 = () => {
  const [getCurrentTimeRoom2, SetCurrentTimeRoom2] = useState(0)
  const {
    setCountdown,
    countdown,
    setBombActive,
    setHoldPosition,
    holdPosition,
    setHoldButtonInPosition,
    buttonClicked,
    holdButtonInPosition,
    setTimerOff,
    bombActive,

    setIsLost
  } = LoggedUserContext();


  useEffect(() => {
    setCountdown(60)
    setIsLost(false)
  }, []);



  const { bombDisarmed, setBombDisarmed } = useIsBombDisarmedContext()


  useEffect(() => {
    setBombDisarmed(false)
  }, [])
  useEffect(() => {
    const resumeTimer = setInterval(() => {
      SetCurrentTimeRoom2((prevCount) => prevCount + 1);
    }, 1000);




    const postTimeElapsedAllTime = async () => {
      try {
        const currentTimeRoom1 = localStorage.getItem('CurrentTimeRoom1');
        let totalTimerAllRooms = Number(currentTimeRoom1) + Number(getCurrentTimeRoom2)
        const userID = localStorage.getItem('userID');
        await api.put(
          `/escape/${userID}`,
          {
            timerElapsed: totalTimerAllRooms,
          }
        );
        // console.log("currentTimeRoom1:",totalTimerAllRooms);
      } catch (error) {
        console.error(error)
      }


    }
    if (bombDisarmed) {

      postTimeElapsedAllTime()
      clearInterval(resumeTimer)
    }
    return () => {
      clearInterval(resumeTimer);
    };
  }, [bombDisarmed])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown => countdown - 1);
    }, 1000);

    // stop the countdown timer when the countdown reaches 0
    if (countdown === 0) {
      clearInterval(interval);
      setBombActive(false);
    }
    return () => clearInterval(interval);
  }, [countdown]);


  // handle the player moving the hold button
  const handleHoldMove = (event) => {
    const { x, y } = holdPosition;
    const newX = x + event.movementX;
    const newY = y + event.movementY;
    setHoldPosition({ x: newX, y: newY });

    // check if hold button is in the correct position
    if (newX > 170 && newX <= 830 && newY >= 200 && newY <= 230) {
      setHoldButtonInPosition(true);
    } else {
      setHoldButtonInPosition(false);
    }

  };
  const handleHoldRelease = () => {
    if (buttonClicked) {
      console.log("hi");
      setBombDisarmed(true);
      setIsLost(true)
      setBombActive(false);
    } else {
    }
  };

  // handle the player clicking the button
  const handleButtonClick = () => {
    if (holdButtonInPosition) {
      setBombDisarmed(true);
      setIsLost(true)
      setBombActive(false);
      setTimerOff(false)
    }
  };
  return (
    <div className='pics'>
      <div className='centerit'>
        <div className="Wires"></div>
        <div className='givePowerToTheBomb'></div>
      </div>
      {bombActive ? (
        <>
        
          <div className="bomb-timer">
            
            <div className='postionbutton'>
              <button className='cutit' onClick={handleButtonClick}></button>
            </div>
            <div className='reachthisway'></div>
            <div className={`bomb-timer__progress ${countdown < 10 ? 'bomb-timer__critical' : countdown < 20 ? 'bomb-timer__danger' : ''}`} style={{ width: `${countdown / 60 * 100}%` }}></div>
          </div>
          <div className={`bomb-animation ${countdown < 10 ? 'bomb-animation__dangerous' : ''}`}>
            <div className="bomb-animation__body"></div>
            <div className="bomb-animation__fuse">
              <div className={`bomb-animation__spark ${countdown < 10 ? 'bomb-animation__dangerous' : ''}`}></div>
            </div>
          </div>
          <div className="hold-button" onMouseMove={handleHoldMove} onMouseUp={handleHoldRelease} onMouseLeave={handleHoldRelease} style={{ left: holdPosition.x, top: holdPosition.y }}>
            <div className="hold-button__text"></div>
            <div className="hold-button__circle"></div>
          </div>
          <div className='imgHelp'></div>

        </>
      ) : (
        <div>


          {bombDisarmed ? (
            <div className='fixtocenter'>
              <h1 className='success'></h1>
              <h1 className='getLink'><Link className='fixthelink' to="/home">back to home page</Link></h1>
            </div>

          ) : (
            <div className='fixToCenterlost'>
              <h1 className='failure'></h1>
              <h1><Link className='fixthelink' to='/home'>back to home page</Link></h1>
            </div>
          )}</div>
      )}
    </div>
  );
};

export default Room2
