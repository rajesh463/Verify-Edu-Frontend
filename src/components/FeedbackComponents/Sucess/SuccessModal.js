import React from "react";
import "./SuccessModal.css";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = ({ onClose, data }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <FaCheckCircle className="success-icon" />
          <h2>{data.heading}</h2>
        </div>

        <div className="modal-body">
          <p>{data.description}</p>
        </div>

        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
