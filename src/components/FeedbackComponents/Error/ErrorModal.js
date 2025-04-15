import React from "react";
import "./ErrorModal.css";
import { FaExclamationCircle } from "react-icons/fa";

const ErrorModal = ({ onClose, data }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content error-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header error-header">
          <FaExclamationCircle className="error-icon" />
          <h2>{data.heading}</h2>
        </div>

        <div className="modal-body">
          <p>{data.description}</p>
        </div>

        <div className="modal-footer">
          <button className="modal-close-btn error-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
