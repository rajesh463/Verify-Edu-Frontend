import React from "react";

import StudentSidebar from "./StudentSidebar";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  if (user?.role === "ve_student") {
    return <StudentSidebar />;
  } else if (user?.role === "ve_admin") {
    return <AdminSidebar />;
  }
};

export default Sidebar;
