import React from "react";
import { useAuth } from "../../../context/AuthContext";

import AdminSidebar from "./AdminSidebar";
import StudentSidebar from "./StudentSidebar";
import InstituteSidebar from "./InstituteSidebar";
const Sidebar = () => {
  const { user } = useAuth();
  const FunReturn = () => {
    if (user?.role == "ve_admin") {
      return <AdminSidebar />;
    } else if (user?.role == "ve_student") {
      return <StudentSidebar />;
    } else if (user?.role == "ve_institute") {
      return <InstituteSidebar />;
    }
    return null; // Default return for when no role matches
  };
  return FunReturn();
};

export default Sidebar;
