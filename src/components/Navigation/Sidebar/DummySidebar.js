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

const DummySidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProjectsSubmenuOpen, setIsProjectsSubmenuOpen] = useState(false);
  const location = useLocation(); // Get current location
  const toggleProjectsSubmenu = () => {
    setIsProjectsSubmenuOpen(!isProjectsSubmenuOpen);
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Helper function to check if the route is active
  const isActive = (path) => location.pathname === path;
  const returnFun = () => {
    
      return (
        <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
         

         
          <hr className="sidebar-divider" />

          {/* Sidebar Menu */}
          <ul className="sidebar-menu">
            <li>
              <Link
                to="/"
                className={`menu-item ${
                  isActive("/") ? "active" : ""
                }`}
              >
                <FaCentercode className="icon" />
                {!isCollapsed && <span>Home</span>}
              </Link>
            </li>
            {/* <li>
              <Link
                to="/institute/verify-requests"
                className={`menu-item ${
                  isActive("/institute/verify-requests") ? "active" : ""
                }`}
              >
                <FaChartBar className="icon" />
                {!isCollapsed && <span>Verify Requests</span>}
              </Link>
            </li> */}
            
           
          </ul>
        </div>
      );
    
  };

  return returnFun();
};

export default DummySidebar;
