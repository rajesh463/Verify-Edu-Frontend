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
import BcProfile from "./features/StudentProfile/BcProfile";

import LocationFeature from "./features/Admin/Locations/LocationFeature";
import AdminDashboard from "./features/Admin/AdminDashboard";
import EducationFeatures from "./features/Admin/Educations/EducationFeatures";
import DemographicFeatures from "./features/Admin/Demographic/DemographicFeatures";
import InstituteRegister from "./features/Auth/InstituteRegister";
import InstituteDashboard from "./features/Institute/InstituteDashboard";
import VerifyDocuments from "./features/StudentProfile/VerifyDocuments/VerifyDocuments";
import VerifyFormPastQualification from "./features/StudentProfile/VerifyDocuments/VerifyFormPastQualification";
import AllRequest from "./features/Institute/AllRequest";
import VerifyFormInstitute from "./features/Institute/VerifyFormInstitute";
import RejectedRequest from "./features/Institute/RejectedRequest";
import ApprovedRequest from "./features/Institute/ApprovedRequest";
import ViewForm from "./features/Institute/ViewForm";
import ViewStudentForm from "./features/StudentProfile/VerifyDocuments/ViewForm";
import RequestStatus from "./features/StudentProfile/VerifyDocuments/RequestStatus";
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
        path: "/:email",
        Component:BcProfile
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
        path: "/student-verify-request-status",
        Component: () => (
          <ProtectedRoute roles={["ve_student"]}>
            <RequestStatus/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/student/view-requests/:qualId/:studEmail",
        Component: () => (
          <ProtectedRoute roles={["ve_student"]}>
             <ViewStudentForm/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/verify-documents-form-past-qualification/:qualId",
        Component: () => (
          <ProtectedRoute roles={["ve_student"]}>
            <VerifyFormPastQualification />
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
      {
        path: "/institute/verify-requests",
        Component: () => (
          <ProtectedRoute roles={["ve_institute"]}>
            <AllRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/institute/verify-form/:qualId/:studEmail",
        Component: () => (
          <ProtectedRoute roles={["ve_institute"]}>
            <VerifyFormInstitute />
          </ProtectedRoute>
        ),
      },
      {
        path: "/institute/approved-requests",
        Component: () => (
          <ProtectedRoute roles={["ve_institute"]}>
            <ApprovedRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/institute/rejected-requests",
        Component: () => (
          <ProtectedRoute roles={["ve_institute"]}>
            <RejectedRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/institute/view-requests/:qualId/:studEmail",
        Component: () => (
          <ProtectedRoute roles={["ve_institute"]}>
            <ViewForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
