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

// Create a wrapper component that combines ProtectedRoute and FormProvider
const ProtectedProfileWithForm = () => (
  <ProtectedRoute roles={["ve_student"]}>
    <FormProvider>
      <Profile />
    </FormProvider>
  </ProtectedRoute>
);

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
        Component: ProtectedProfileWithForm,
      },
    ],
  },
]);
