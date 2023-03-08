import React from 'react';
import './Modal.css';

const Modal = ({ closeModal, className, imageSrc, modalNumber }) => {
  return (
    <div className="modalBackground" onClick={() => closeModal(false)}>
      <div className={`modalContainer ${className}`}>
        <img src={imageSrc} className="modalImage" alt="modalImage" />
        {modalNumber === 1 &&<div className='number'>
          <div className='continer'>
            <p>5</p>
            <p>6</p>
            <p>8</p>
            <p>1</p>
          </div>
          <div className='container2'>
            <p>1</p>
            <p>2</p>
            <p>8</p>
            <p>6</p>
          </div>
          <div className='container3'>
            <p>1</p>
            <p>8</p>
            <p>6</p>
            <p>5</p>
          </div>
          <div className='container4'>
            <p>1</p>
            <p>7</p>
            <p>3</p>
            <p>9</p>
          </div>
          
          </div>}
      </div>
    </div>
  );
};

export default Modal;
