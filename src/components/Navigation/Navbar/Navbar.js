// Navbar.tsx

import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { BsPersonCircle, BsBell, BsChevronDown } from "react-icons/bs";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="top-header">
      <nav className="top-navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-title">
            Verify Edu
          </Link>
        </div>

        <div className="navbar-right">
          <div className="user-profile" ref={dropdownRef}>
            {user?.email ? (
              <div className="profile-menu">
                <button
                  className="profile-trigger"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="avatar">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <BsChevronDown className="dropdown-icon" />
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/student-profile" className="dropdown-item">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                {location.pathname !== "/login" && (
                  <Link to="/login" className="auth-button register-button">
                    Login
                  </Link>
                )}
                {location.pathname !== "/register" && (
                  <Link to="/register" className="auth-button register-button">
                    Register
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
