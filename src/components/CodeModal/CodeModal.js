import React, { useState } from 'react';
import './CodeModal.css';
// import { useNavigate } from 'react-router-dom';

const ModalTwo = ({ closeModal, onWin, inputValue }) => {
    const [pinCode, setPinCode] = useState(inputValue);
    // const navigate = useNavigate();
    const handlePinCodeChange = (event) => {
        const newPinCode = event.target.value;
        setPinCode(newPinCode);

        if (newPinCode === '1865') {
            onWin();
            closeModal(false);
        }
    };

    const handleNumberButtonClick = (number) => {
        setPinCode(pinCode + number);
    };

    const handleModalContainerClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={`modalBackground2`} onClick={() => closeModal(false)}>
            <div className={`modalContainer2`} onClick={handleModalContainerClick}>
                <div className='containerModal'>
                    <div className='pinCodeInputContainer'>
                        <input type='text' value={pinCode} onChange={handlePinCodeChange} placeholder="Enter the pin code"/>
                    </div>
                    <div className='numberButtonsContainer'>
                        <div className='numberButtonRow'>
                            <button onClick={() => handleNumberButtonClick('1')}>1</button>
                            <button onClick={() => handleNumberButtonClick('2')}>2</button>
                            <button onClick={() => handleNumberButtonClick('3')}>3</button>
                        </div>
                        <div className='numberButtonRow'>
                            <button onClick={() => handleNumberButtonClick('4')}>4</button>
                            <button onClick={() => handleNumberButtonClick('5')}>5</button>
                            <button onClick={() => handleNumberButtonClick('6')}>6</button>
                        </div>
                        <div className='numberButtonRow'>
                            <button onClick={() => handleNumberButtonClick('7')}>7</button>
                            <button onClick={() => handleNumberButtonClick('8')}>8</button>
                            <button onClick={() => handleNumberButtonClick('9')}>9</button>
                        </div>
                        <div className='numberButtonRow'>
                            <button onClick={() => handleNumberButtonClick('0')}>0</button>
                        </div>
                        <div className='submitButtonContainer'>
                            <button onClick={() =>{ onWin(pinCode)}}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTwo;
