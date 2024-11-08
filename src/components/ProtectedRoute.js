import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import the AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
