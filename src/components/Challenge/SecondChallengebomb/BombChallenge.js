
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BombChallenge.css';
import Home from '../../../pages/Home/Home';
import { useIsBombDisarmedContext } from '../../context/isWinContext';
const BombChallenge = () => {
  const [countdown, setCountdown] = useState(20); // start the countdown at 60 seconds
  const [bombActive, setBombActive] = useState(true); // set the bomb to active
  // const [bombDisarmed, setBombDisarmed] = useState(false); // set the bomb to not disarmed
  const [holdPosition, setHoldPosition] = useState({ x: 0, y: 0 }); // set initial hold button position to top-left
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timerCount3, setTimerCountrusume] = useState(0);
  const [timerOff, setTimerOff] = useState(true);

   const {bombDisarmed,setBombDisarmed}=useIsBombDisarmedContext()
  const [holdButtonInPosition, setHoldButtonInPosition] = useState(false);
  useEffect(() => {
    localStorage.setItem('counter', '0');

  }, []);

  useEffect(() => {
    const resumeTimer = setInterval(() => {
      setTimerCountrusume((prevCount) => prevCount + 1);
      // if (!localStorage.getItem('counter')) {
      //   localStorage.setItem('counter', '0');
      // }
      localStorage.setItem('counter', JSON.stringify(Number(localStorage.getItem('counter')) + 1));
    }, 1000);
    if (bombDisarmed) {
      clearInterval(resumeTimer)
    }
    return () => {
      clearInterval(resumeTimer);
    };
  }, [bombDisarmed])
  // start the countdown timer when the component mounts
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
    if (newX > 2 && newX <= 690 && newY >= 200 && newY <= 220) {
      setHoldButtonInPosition(true);
    } else {
      setHoldButtonInPosition(false);
    }
    // if (newX < 2 && newX <= 690 && newY >= 200 && newY <= 220){
    //   alert("cant movie")
    //   return

    // }
  };
  // handle the player releasing the hold button
  const handleHoldRelease = () => {
    if (buttonClicked) {
      console.log("hi");
      setBombDisarmed(true);
      setBombActive(false);
    } else {
      // setHoldPosition({ x: , y: 5 });
    }
  };

  // handle the player clicking the button
  const handleButtonClick = () => {
    if (holdButtonInPosition) {
      setBombDisarmed(true);
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

        </>
      ) : (
        <div>


          {bombDisarmed ? (
            <div className='fixtocenter'>
              <h1 className='success'>Bomb Disarmed!</h1>
              <h1 className='getLink'><Link className='homee' to="/home">back to home page</Link></h1>
            </div>

          ) : (
            <div className='fixToCenter'>
              <h1 className='failure'>you lost!</h1>
              <h1><Link to='/home'>back to home page</Link></h1>
            </div>
          )}</div>
      )}
    </div>
  );
};

export default BombChallenge


