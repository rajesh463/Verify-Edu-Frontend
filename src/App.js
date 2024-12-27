// src/App.js

import React from "react";
import Navbar from "./components/Navigation/Navbar/Navbar";
import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet /> {/* Renders the child components based on route */}
    </>
  );
}

export default App;
