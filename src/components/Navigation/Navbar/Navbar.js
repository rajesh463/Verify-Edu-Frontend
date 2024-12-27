import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Services from "../../../services/Services";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    console.log("logout form system");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">Verify Edu</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {!user?.email ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <Link onClick={handleLogout}>logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
