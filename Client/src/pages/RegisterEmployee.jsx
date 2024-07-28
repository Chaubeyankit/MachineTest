/* eslint-disable no-unused-vars */
import AuthContext from "@/contexts/AuthContext";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterEmployee() {
  const { registerEmployeeHandler, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

  const { name, email, mobile, designation, gender, course } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      course: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerEmployeeHandler(formData, token);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }

    setFormData({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      gender: "",
      course: "",
    });
  };

  return (
    <>
      <Toaster />
      <div className="pt-24">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    placeholder="Max"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobile">Mobile No</Label>
                  <Input
                    id="mobile"
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={handleOnChange}
                    placeholder="1234567890"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select
                    onValueChange={(value) =>
                      handleOnChange({ target: { name: "designation", value } })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select Designation"
                        value={designation}
                      />
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
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup
                    value={gender}
                    onValueChange={(value) =>
                      handleOnChange({ target: { name: "gender", value } })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <div className="items-top flex space-x-2">
                    <input
                      type="checkbox"
                      id="bca"
                      name={course}
                      value="BCA"
                      checked={course === "BCA"}
                      onChange={handleCourseChange}
                    />
                    <Label htmlFor="bca">BCA</Label>
                  </div>
                  <div className="items-top flex space-x-2">
                    <input
                      type="checkbox"
                      id="mca"
                      name="course"
                      value="MCA"
                      checked={course === "MCA"}
                      onChange={handleCourseChange}
                    />
                    <Label htmlFor="mca">MCA</Label>
                  </div>
                  <div className="items-top flex space-x-2">
                    <input
                      type="checkbox"
                      id="bsc"
                      name={course}
                      value="BSC"
                      checked={course === "BSC"}
                      onChange={handleCourseChange}
                    />
                    <Label htmlFor="bsc">BSC</Label>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
