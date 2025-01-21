// src/App.js

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar/Navbar";
import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
