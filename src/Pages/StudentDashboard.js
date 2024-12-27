import React from "react";
import { useLoaderData } from "react-router-dom"; // Import the hook
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name || "Guest"}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      {/* Render other details based on the fetched data */}
      {/* Hello this is dashboard */}
    </div>
  );
};

export default StudentDashboard;
