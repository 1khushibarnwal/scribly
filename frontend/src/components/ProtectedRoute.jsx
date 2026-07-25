import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, checkingSession } = useAuth();

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
