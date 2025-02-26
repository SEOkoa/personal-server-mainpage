import React from 'react';
import '../../styles/components/WriteModal.css';

const WriteModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="write-modal-overlay">
      <div className="write-modal write-modal-dark">
        <div className="write-modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">
            <span className="material-icons">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default WriteModal; 