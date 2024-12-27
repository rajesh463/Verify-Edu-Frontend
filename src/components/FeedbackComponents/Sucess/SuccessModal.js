import React from "react";
import "./SuccessModal.css";



const SuccessModal = ({ onClose, data }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data.heading}</h2>
        <p>{data.description}</p>
        <button onClick={onClose} className="close-button">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
