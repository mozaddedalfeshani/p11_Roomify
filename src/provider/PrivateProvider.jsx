import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log("Data in PrivateProvider:", location);

  console.log("User in PrivateProvider:", user);
  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <div>{children}</div>;
};

export default PrivateProvider;
