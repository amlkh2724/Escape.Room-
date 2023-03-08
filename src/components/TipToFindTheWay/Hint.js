import React from 'react'
import './Hint.css'
// import { FontAwesomeIcon } from '../../../public/index.html';

 const Hint = ({SetOpenHint}) => {
  const handleClose = () => {
    SetOpenHint(false);
  };

  return (
    <div className='hintContainer' onClick={handleClose}>
    <div className='hint'>
      <div className='arrowOne'>
    <i class="fa-solid fa-arrow-down fa-4x red"></i>
    </div>
    <div className='arrowTwo'>
    <i class="fa-solid fa-arrow-down fa-4x red"></i>
    </div>
    </div>
    </div>
  )
}
export default Hint