/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  login,
  registerAdmin,
  registerEmployee,
} from "../services/operations/authApi";
import {
  getEmployeesDetails,
  getEmployeeDetails,
  updateEmployee,
  deleteEmployee,
  updateAvatar,
} from "../services/operations/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [employeesDetails, setEmployeesDetails] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = JSON.parse(localStorage.getItem("token"));

    if (storedUser) {
      setUser(storedUser);
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const loginHandler = async (credentials) => {
    try {
      const response = await login(credentials);
      if (response.success) {
        setUser(response?.data?.user);
        setToken(response?.data?.accessToken);

        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.accessToken)
        );
        toast.success(response.message || "Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    }
  };

  const registerHandler = async (userInfo) => {
    try {
      const response = await registerAdmin(userInfo);
      if (response.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerEmployeeHandler = async (employeeInfo, token) => {
    try {
      const response = await registerEmployee(employeeInfo, token);
      console.log(response);
      toast.success(response.message || "Employee registered successfully!");

      navigate("/emplyee-registration");
    } catch (error) {
      toast.error(
        error.message || "Employee registration failed. Please try again."
      );
    }
  };

  const employeesInformation = async (token) => {
    try {
      const response = await getEmployeesDetails(token);
      if (response?.success) {
        setEmployeesDetails(response?.data);
        navigate("/employee-list");
      }
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const employeeInformation = async (token, id) => {
    try {
      const response = await getEmployeeDetails(token, id);
      if (response?.success) {
        setEmployeeDetails(response?.data);
        navigate(`/edit-employee/${id}`);
      }
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployeeHandler = async (token, id, employeeDetails) => {
    try {
      const response = await updateEmployee(token, id, employeeDetails);
      if (response?.success) {
        setEmployeeDetails(response?.data);
      }
      toast.success(response.message || "Details updated successfully!");
    } catch (error) {
      toast.error(error.message || "Updation Failed.");
    }
  };

  const deleteEmployeeHandler = async (token, id) => {
    try {
      const response = await deleteEmployee(token, id);
      if (response?.success) {
        console.log("User deleted successfully");
        toast.success(response.message || "User deleted successfully!");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const updateAvatarHandler = async (token, formData, id) => {
    try {
      const response = await updateAvatar(token, formData, id);
      console.log(response?.data);
      setEmployeeDetails(response?.data);
      toast.success(`Successfully updated your profile picture!`);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        employeesDetails,
        employeeDetails,
        loginHandler,
        registerHandler,
        registerEmployeeHandler,
        employeesInformation,
        employeeInformation,
        updateEmployeeHandler,
        updateAvatarHandler,
        deleteEmployeeHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
