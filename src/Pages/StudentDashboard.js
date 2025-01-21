import React from "react";
import { useAuth } from "../context/AuthContext";
import FileUpload from "../components/File/FileUpload";
import ViewFile from "../components/File/ViewFile";
import Tag from "../constant/Tag";
const StudentDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name || "Guest"}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <FileUpload tag={Tag.marksheets.school.marksheet_10} />
      <ViewFile tag={Tag.marksheets.school.marksheet_10} />
    </div>
  );
};

export default StudentDashboard;
