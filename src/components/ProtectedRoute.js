import React from "react";
import { useHistory } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <useHistory to="/" />;
  }
  return children;
};

export default ProtectedRoute;
