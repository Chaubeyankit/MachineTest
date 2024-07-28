/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Login } from ".";
import { Dashboard } from ".";
const Home = () => {
  const { token } = useContext(AuthContext);
  return (
    <>
      {token ? (
        <Dashboard />
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
};

export default Home;
