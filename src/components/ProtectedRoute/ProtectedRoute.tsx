import React, { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("USER" | "ADMIN")[]; // restrict access to these roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const auth = useContext(AuthContext);
  const currentUser = auth?.user;

  if (!currentUser) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Logged in but doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
