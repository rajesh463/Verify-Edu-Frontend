import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <NavLink to="/student-dashboard" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/student-profile" className="nav-link">
            Profile
          </NavLink>
          {/* Add more navigation links */}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
