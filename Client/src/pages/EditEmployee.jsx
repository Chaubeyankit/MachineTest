/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileImage from "./ProfileImage";

const EditEmployee = () => {
  const { token, employeeInformation, updateEmployeeHandler } =
    useContext(AuthContext);
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const details = await employeeInformation(token, id);
      setEmployeeDetails(details);
    };
    fetchEmployeeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployeeHandler(token, id, employeeDetails);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <>
      <Toaster />
      <div className="pt-8 pb-4">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Employee profile</CardTitle>
          </CardHeader>

          {/* Avatar */}
          <ProfileImage />

          <Card className="m-2">
            <CardHeader>
              <CardTitle className="text-base">Employee Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={employeeDetails.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("designation", value)
                        }
                        value={employeeDetails?.designation}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Designation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Designation</SelectLabel>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mobile">Mobile No</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        type="text"
                        value={employeeDetails?.mobile}
                        onChange={handleInputChange}
                        placeholder="1234567890"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={employeeDetails?.email}
                      onChange={handleInputChange}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="course">Course</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("course", value)
                        }
                        value={employeeDetails?.course}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Course</SelectLabel>
                            <SelectItem value="BCA">BCA</SelectItem>
                            <SelectItem value="MCA">MCA</SelectItem>
                            <SelectItem value="BSC">BSC</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                        value={employeeDetails?.gender}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Save changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Card>
      </div>
    </>
  );
};

export default EditEmployee;
