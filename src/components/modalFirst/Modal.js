import React from 'react';
import './Modal.css';

const Modal = ({ closeModal, className, imageSrc, modalNumber }) => {
  return (
    <div className="modalBackground" onClick={() => closeModal(false)}>
      <div className={`modalContainer ${className}`}>
        <img src={imageSrc} className="modalImage" alt="modalImage" />
        {modalNumber === 1 &&<div className='number'>
          <div className='continer'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div className='container2'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div className='container3'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div className='container4'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          
          </div>}
      </div>
    </div>
  );
};

export default Modal;
