// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import Services from "../services/Services";

// Create context for authentication
const AuthContext = createContext();

// Custom hook to access the authentication state
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider to wrap your app and provide the authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load the user from localStorage or API when the app mounts
  useEffect(() => {
    const token = localStorage.getItem("ve-token");
    if (token) {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    try {
      const res = await Services.getProfile();
      const profile = {
        role: res?.data?.role,
        name: res?.data?.name,
        email: res?.data?.email,
        _id: res?.data?._id,
      };
      setUser(profile);
      return profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
      localStorage.removeItem("ve-token"); // Clear invalid token
      throw new Error("Failed to fetch user profile.");
    }
  };

  const login = async (loginResponse) => {
    try {
      const { token, user: userData } = loginResponse;
      localStorage.setItem("ve-token", token);

      const profile = {
        role: userData.role,
        name: userData.name,
        email: userData.email,
        _id: userData._id,
      };

      setUser(profile);
      return profile;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ve-token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
