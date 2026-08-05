import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../admin/services/authService";

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;