import React, { useState } from 'react';
import './Room1.css';
import myImage from '../assests/room1-firstpic.webp';
import modal1Image from '../../pages/assests/numberscolors.png';
import modal4Image from '../../pages/assests/imgcolors.gif';
import FirstChallenge from '../../components/Challenge/FirstChallenge';
import Modal from '../../components/ModalforTwoSearching/Modal';
function Room1() {
  const [isSolved, setIsSolved] = useState(false);
  const [istrueLight, settrueLight] = useState(false)
  const [isComplete, setIsComplete] = useState(false);
  const [isOpenModal1, setOpenModal1] = useState(false);
  const [isOpenModal4, setOpenModal4] = useState(false);

  const handleModeToggle = (e) => {
    e.target.style.display = 'none';
    settrueLight(true);
  };

  const openModal1 = () => {
    setOpenModal1(true);
  };

  const openModal4 = () => {
    setOpenModal4(true);
  };

  return (
    <>
      <div className={istrueLight ? 'theall' : 'offit'}>
        {!isSolved ? (
          <div className="content">
            <img src={myImage} alt="Room 1" />
            <>
              <button onClick={handleModeToggle} className="mode-toggle"><i class="fa-regular fa-lightbulb"></i></button>
              <button onClick={openModal1} className="modal"></button>
              {isOpenModal1 && <Modal closeModal={setOpenModal1} className="modal1" imageSrc={modal1Image} modalNumber={1} />}
              <button onClick={openModal4} className="modal4"></button>
              {isOpenModal4 && <Modal closeModal={setOpenModal4} className="modal4" imageSrc={modal4Image} />}
              <FirstChallenge isComplete={isComplete} setIsComplete={setIsComplete}  />
            </>
          </div>
        ) : (
          <div className="content"></div>
        )}
      </div>
    </>
  );
}

export default Room1;
