import { createBrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/FormContext";

import Home from "./Pages/Home";
import Register from "./features/Auth/Register";
import Login from "./features/Auth/Login";
import AboutUs from "./Pages/AboutUs";
import StudentDashboard from "./Pages/StudentDashboard";
import App from "./App";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import AccessDenied from "./Pages/AccessDenied";
import Profile from "./Pages/Profile";
import Locations from "./Pages/Admin/Locations";
import VerifyDocument from "./features/Verification-Request/VerifyDocument";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      {
        path: "/", // Root path
        Component: Home, // Home component rendered at "/"
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "/student-dashboard",
        Component: () => (
          <ProtectedRoute roles={["ve_student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/aboutus",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: Home,
      },
      {
        path: "/accessdenied",
        Component: AccessDenied,
      },
      {
        path: "/student-profile",
        Component: () => (
          <ProtectedRoute roles={["ve_student"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/verify-document",
        Component: () => (
          <ProtectedRoute roles={["ve_student"]}>
            <VerifyDocument />
          </ProtectedRoute>
        ),
      },
      // Admin Rooutes

      {
        path: "/admin-dashboard",
        Component: () => (
          <ProtectedRoute roles={["ve_admin"]}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/locations",
        Component: () => (
          <ProtectedRoute roles={["ve_admin"]}>
            <Locations />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
