/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const OpenRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

export default OpenRoute;
