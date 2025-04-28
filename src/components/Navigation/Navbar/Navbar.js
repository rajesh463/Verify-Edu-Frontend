import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getDashboardLink = () => {
    if (!user?.role) return "/";
    switch (user.role) {
      case "ve_student":
        return "/student-dashboard";
      case "ve_institute":
        return "/institute-dashboard";
      case "ve_admin":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  const getProfileLink = () => {
    if (!user?.role) return "/";
    switch (user.role) {
      case "ve_student":
        return "/student-profile";
      case "ve_institute":
        return "/institute-profile";
      case "ve_admin":
        return "/admin-profile";
      default:
        return "/";
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <span className="navbar-title">Verify Edu</span>
          </Link>
        </div>

        <div className="navbar-right">
          {user ? (
            <div className="user-info">
              <div className="user-profile" onClick={toggleDropdown}>
                <div className="user-avatar">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name || "User"}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <i className={`dropdown-arrow ${showDropdown ? 'up' : 'down'}`} />
              </div>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to={getDashboardLink()} className="dropdown-item">
                    <i className="icon dashboard-icon" />
                    Dashboard
                  </Link>
                  <Link to={getProfileLink()} className="dropdown-item">
                    <i className="icon profile-icon" />
                    Profile
                  </Link>
                  <div className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <i className="icon logout-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
