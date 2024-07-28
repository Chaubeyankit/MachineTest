/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        <h1 className="text-center pt-10 font-serif text-4xl">
          Welcome, {user.name}
        </h1>
        <div className="text-center ">
          <Link to={"/emplyee-registration"}>
            <Button className="mx-2 my-8">Create Employee</Button>
          </Link>

          <Link to={"/employee-list"}>
            <Button>Employee List</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
