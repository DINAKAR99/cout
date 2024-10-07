import { Route, Navigate } from "react-router-dom";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = sessionStorage.getItem("authToken");
  return token !== null; // Replace with proper validation
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
