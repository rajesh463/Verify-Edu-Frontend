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
  const [loading, setLoading] = useState(true);

  // Load the user from localStorage or API when the app mounts
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("ve-token");
        if (token) {
          // Clean the token by removing any quotes
          const cleanToken = token.replace(/"/g, "");
          localStorage.setItem("ve-token", cleanToken);

          // Get the profile
          const profile = await getProfile();
          console.log("Profile loaded:", profile);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear invalid token
        localStorage.removeItem("ve-token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const getProfile = async () => {
    try {
      const res = await Services.getProfile();
      console.log("Profile API response:", res);

      if (res?.data?.data) {
        // The API response structure is { data: { data: { ... } } }
        const profile = {
          role: res.data.data.role,
          name: res.data.data.name,
          email: res.data.data.email,
          _id: res.data.data._id,
        };
        setUser(profile);
        return profile;
      } else if (res?.data) {
        // Direct data structure
        const profile = {
          role: res.data.role,
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
        };
        setUser(profile);
        return profile;
      } else {
        console.error("Invalid profile data:", res);
        throw new Error("Invalid profile data");
      }
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
      // Clean the token by removing any quotes
      const cleanToken = token.replace(/"/g, "");
      localStorage.setItem("ve-token", cleanToken);

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
    <AuthContext.Provider value={{ user, login, logout, getProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
