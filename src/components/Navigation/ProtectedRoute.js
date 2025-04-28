import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  // If still loading, don't redirect yet
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Only redirect if not loading and user doesn't have required role
  if (!user || !roles.includes(user?.role)) {
    return <Navigate to="/accessdenied" replace />;
  }

  return children;
};

export default ProtectedRoute;
