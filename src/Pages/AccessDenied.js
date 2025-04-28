import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AccessDenied.css";

const AccessDenied = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="access-denied-container">
      <div className="access-denied-content">
        <div className="access-denied-icon">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h1 className="access-denied-title">Access Denied</h1>
        <p className="access-denied-message">
          Sorry, you don't have permission to access this page. This might be because:
        </p>
        <ul className="access-denied-reasons">
          <li>You're not logged in</li>
          <li>Your session has expired</li>
          <li>You don't have the required permissions</li>
        </ul>
        <div className="access-denied-actions">
          <Link to="/login" className="access-denied-button primary">
            Log In
          </Link>
          <button onClick={goBack} className="access-denied-button secondary">
            Go Back
          </button>
        </div>
        <p className="access-denied-help">
          Need help? <Link to="/contact">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
