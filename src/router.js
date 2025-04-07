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

import LocationFeature from "./features/Admin/Locations/LocationFeature";
import AdminDashboard from "./features/Admin/AdminDashboard";
import EducationFeatures from "./features/Admin/Educations/EducationFeatures";
import DemographicFeatures from "./features/Admin/Demographic/DemographicFeatures";
import InstituteRegister from "./features/Auth/InstituteRegister";
import InstituteDashboard from "./features/Institute/InstituteDashboard";
import VerifyDocuments from "./features/StudentProfile/VerifyDocuments/VerifyDocuments";
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
        path: "/verify-documents",
        Component: () => (
          <ProtectedRoute roles={["ve_student"]}>
            <VerifyDocuments />
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
      //admin
      {
        path: "/admin-dashboard",
        Component: () => (
          <ProtectedRoute roles={["ve_admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/locations",
        Component: () => (
          <ProtectedRoute roles={["ve_admin"]}>
            <LocationFeature />
          </ProtectedRoute>
        ),
      },
      {
        path: "/education",
        Component: () => (
          <ProtectedRoute roles={["ve_admin"]}>
            <EducationFeatures />
          </ProtectedRoute>
        ),
      },
      {
        path: "/demographic",
        Component: () => (
          <ProtectedRoute roles={["ve_admin"]}>
            <DemographicFeatures />
          </ProtectedRoute>
        ),
      },
      // Institute
      {
        path: "/institute-register",
        Component: () => <InstituteRegister />,
      },
      {
        path: "/institute-dashboard",
        Component: () => (
          <ProtectedRoute roles={["ve_institute"]}>
            <InstituteDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
