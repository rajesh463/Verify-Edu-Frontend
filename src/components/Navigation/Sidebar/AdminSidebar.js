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
} from "react-icons/fa"; // Import icons from react-icons
import { useAuth } from "../../../context/AuthContext";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isProjectsSubmenuOpen, setIsProjectsSubmenuOpen] = useState(false);
  const location = useLocation(); // Get current location
  const toggleProjectsSubmenu = () => {
    setIsProjectsSubmenuOpen(!isProjectsSubmenuOpen);
  };

  const { user } = useAuth();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Helper function to check if the route is active
  const isActive = (path) => location.pathname === path;
  const returnFun = () => {
    if (user?.email) {
      return (
        <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
          <div className="user-info-wrapper">
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
                  isActive("/admindashboard") ? "active" : ""
                }`}
              >
                <FaSchool className="icon" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/locations"
                className={`menu-item ${
                  isActive("/locations") ? "active" : ""
                }`}
              >
                <FaUserGraduate className="icon" />
                {!isCollapsed && <span>Locations</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className={`menu-item ${
                  isActive("/education") ? "active" : ""
                }`}
              >
                <MdAssignment className="icon" />
                {!isCollapsed && <span>Education</span>}
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return returnFun();
};

export default AdminSidebar;
