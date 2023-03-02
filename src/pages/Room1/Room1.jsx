


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Room1.css';
import myImage from '../assests/room1-firstpic.webp';
import Story from '../../components/story/Story';
import FirstChallenge from '../../components/GetTheCode/FirstChallenge';
function Room1() {

  const [isSolved, setIsSolved] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  if (isDarkMode) {
    const bodyElement = document.querySelector('body');
    bodyElement.classList.add('hide-content');
  }

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    const bodyElement = document.querySelector('body');
    bodyElement.classList.toggle('hide-content');

    const contentElement = document.querySelector('.mode-toggle');
    contentElement.classList.toggle('hidden');
  };

  const [isComplete, setIsComplete] = useState(false);

  return (
      <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        <button onClick={handleModeToggle} className="mode-toggle"></button>
        {!isSolved ? (
          <div className="content">
            <img src={myImage} alt="Room 1" />
            <>

              <Story />
              <FirstChallenge isComplete={isComplete} setIsComplete={setIsComplete} />
            </>
          </div>
        ) : (
          <div className="content"></div>
        )}
      </div>
  );
}

export default Room1;








// const [showResult, setShowResult] = useState(false);
// const handleTimeout = () => {
//   setShowResult(true);
// };

{/* <h1>Room 1</h1>
<Timer timeLimit={60} onTimeout={handleTimeout} />
{showResult ? (
  <div>
    <h2>Time's up!</h2>
    <Link to="/">Go back to home</Link>
  </div>
) : (
  <div>
    <h2>Play the game here</h2>
  </div>
)} */}