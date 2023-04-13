import React from 'react';

function Modal({ onClose, object }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Stäng</button>
        {object}
      </div>
    </div>
  );
}

export default Modal;