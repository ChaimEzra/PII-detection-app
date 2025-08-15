import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login-page" replace />;
}

export default PrivateRoute;
