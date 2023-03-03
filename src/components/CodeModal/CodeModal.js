import React from 'react'
import './CodeModal.css'

const ModalTwo = ({ closeModal }) => {
    return (
        <div className={`modalBackground`} onClick={() => closeModal(false)}>
            <div className={`modalContainer`}>
                <button onClick={() => {
                    closeModal(false)
                }}> x </button>
            </div>
        </div>
    )
}

export default ModalTwo
