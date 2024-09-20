import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../utils/getUserfromStorage";
const token = getUserFromStorage();
const AuthRoute = ({ children }) => {
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default AuthRoute;
