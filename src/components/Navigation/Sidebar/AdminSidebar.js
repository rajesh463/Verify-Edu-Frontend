import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css"; // Import custom styles
// import { FaSchool, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa"; // Import icons from react-icons
import { MdCastForEducation, MdAssignment, MdTopic } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  FaSchool,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaChartBar,
  FaCentercode,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Import icons from react-icons
import { useAuth } from "../../../context/AuthContext";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isProjectsSubmenuOpen, setIsProjectsSubmenuOpen] = useState(false);
  const location = useLocation(); // Get current location
  const { user } = useAuth();

  const toggleProjectsSubmenu = () => {
    setIsProjectsSubmenuOpen(!isProjectsSubmenuOpen);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Helper function to format name
  const formatName = (name) => {
    if (!name) return "";
    // Split the name into parts
    const nameParts = name.split(" ");
    // If there's only one part, return it capitalized
    if (nameParts.length === 1) {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[0].slice(1).toLowerCase()
      );
    }
    // Otherwise, return first name and last name capitalized
    return `${
      nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase()
    } ${
      nameParts[nameParts.length - 1].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].slice(1).toLowerCase()
    }`;
  };

  // Helper function to check if the route is active
  const isActive = (path) => location.pathname === path;

  return user?.email ? (
    <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="user-info-wrapper">
        <div className="user-info">
          <p>Welcome,</p>
          <p className="user-name">{formatName(user.name)}</p>
        </div>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isCollapsed ? "»" : "«"}
        </button>
      </div>

      {/* Divider Line */}
      <hr className="sidebar-divider" />

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <li>
          <Link
            to="/admin-dashboard"
            className={`menu-item ${
              isActive("/admin-dashboard") ? "active" : ""
            }`}
          >
            <FaSchool className="icon" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/locations"
            className={`menu-item ${isActive("/locations") ? "active" : ""}`}
          >
            <FaMapMarkerAlt className="icon" />
            {!isCollapsed && <span>Locations</span>}
          </Link>
        </li>
      </ul>
    </div>
  ) : null;
};

export default AdminSidebar;
