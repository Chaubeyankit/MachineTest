/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tableHeading = [
  "Unique Id",
  "Image",
  "Name",
  "Email",
  "Mobile",
  "Designation",
  "Gender",
  "Course",
  "Created Date",
];

export function EmployeeList() {
  const { employeesInformation, token, deleteEmployeeHandler } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [employeesDetails, setEmployeesDetails] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("id");

  const fetchEmployeesDetails = async () => {
    const details = await employeesInformation(token);
    setEmployeesDetails(details);
  };

  useEffect(() => {
    fetchEmployeesDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteEmployeeHandler(token, id);
      await fetchEmployeesDetails(); // Fetch updated list after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedEmployees = [...employeesDetails].sort((a, b) => {
    if (sortCriteria === "id") {
      return a._id.localeCompare(b._id);
    }
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortCriteria === "email") {
      return a.email.localeCompare(b.email);
    }
    if (sortCriteria === "date") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  return (
    <>
      {employeesDetails.length === 0 ? (
        <p className="text-center pt-28 text-yellow-500 text-2xl">
          No employees found
        </p>
      ) : (
        <div>
          <div>
            <h2 className="heading text-center pt-4">
              <span className="border-b-2 border-green-500 p-1">
                Employee List
              </span>
            </h2>
          </div>
          <div className="pt-4 pl-2 pr-2">
            <Select onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                </SelectGroup>
                <SelectItem value="id">Unique Id</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="date">Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-8 pl-2 pr-2">
            <Table className="border">
              <TableHeader>
                <TableRow>
                  {tableHeading.map((item, index) => (
                    <TableHead key={index}>{item}</TableHead>
                  ))}
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEmployees.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item._id}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={item.avatar || "https://github.com/shadcn.png"}
                          alt="Employee avatar"
                        />
                        <AvatarFallback>AVT</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.mobile}</TableCell>
                    <TableCell>{item.designation}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.course}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        className="mx-2"
                        onClick={() => handleEditClick(item._id)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button>Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the employee and remove their
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteClick(item._id)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
