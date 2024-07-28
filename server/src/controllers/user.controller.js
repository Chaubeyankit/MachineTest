import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { validateEmail } from "../../utils/validators.js"
import { Employee } from "../models/employee.model.js"
import { uploadOnCloudinary } from "../../utils/cloudinary.js"
import moment from 'moment';

class UserController {
   static async registerEmployee(req, res) {
      try {
         const { name, email, mobile, designation, gender, course } = req.body;
         if ([email, name, mobile, designation, gender, course].some((field) => field?.trim() === "")) {
            throw new ApiError(400, 'All fields are required');
         }

         if (!validateEmail(email)) {
            throw new ApiError(400, 'Invalid email format');
         }

         const isUserExist = await Employee.findOne({ email })

         if (isUserExist) {
            throw new ApiError(409, "User with this email or username already exists!");
         }

         const employee = await Employee.create({
            email,
            name,
            mobile,
            designation,
            gender,
            course,
            avatar: "",
            role: 'employee'
         });
         const createdEmployee = await Employee.findById(employee._id).select("-password");

         if (!createdEmployee) {
            throw new ApiError(500, "Server error, try again!");
         }

         return res.status(201).json(
            new ApiResponse(200, createdEmployee, "Employee registered successfully")
         );
      }
      catch (error) {
         return res
            .status(error.status || 400)
            .json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));
      }
   }

   static async updateEmployeeDetails(req, res) {
      try {
         const { employeeId } = req.params;
         const { name, email, mobile, designation, gender, course } = req.body;
         const employee = await Employee.findById(employeeId);

         if (!employee) {
            throw new ApiError(404, "Employee not found");
         }

         if (email && !validateEmail(email)) {
            throw new ApiError(400, 'Invalid email format');
         }
         employee.name = name || employee.name;
         employee.email = email || employee.email;
         employee.mobile = mobile || employee.mobile;
         employee.designation = designation || employee.designation;
         employee.gender = gender || employee.gender;
         employee.course = course || employee.course;

         await employee.save();

         const updatedEmployee = await Employee.findById(employeeId);

         return res.status(200).json(
            new ApiResponse(200, updatedEmployee, "Employee details updated successfully")
         );
      }
      catch (error) {
         return res
            .status(error.status || 400)
            .json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));
      }
   }

   static async deleteEmployee(req, res) {
      try {
         const { id } = req.params;
         const employee = await Employee.findByIdAndDelete(id);

         if (!employee) {
            throw new ApiError(404, 'Employee not found');
         }

         return res.status(200).json(new ApiResponse(200, null, 'Employee deleted successfully'));
      }
      catch (error) {
         return res
            .status(error.status || 400)
            .json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));
      }
   }

   static async getAllEmployee(req, res) {
      try {
         const allEmployeeDetails = await Employee.find({});
         const formattedEmployees = allEmployeeDetails.map(employee => ({
            ...employee.toObject(),
            createdAt: moment(employee.createdAt).format('DD-MM-YY')
         }));
         return res
            .status(200)
            .json(
               new ApiResponse(
                  200,
                  formattedEmployees,
                  "Employees fetched successfully"
               )
            );
      }
      catch (error) {
         return res
            .status(error.status || 400)
            .json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));
      }
   }

   static async getEmployeeDetails(req, res) {
      try {
         const { employeeId } = req.params;
         const data = await Employee.findById(employeeId)

         return res
            .status(200)
            .json(
               new ApiResponse(
                  200,
                  data,
                  "Current user fetch successfully"
               )
            )
      }
      catch (error) {
         return res
            .status(error.status || 400)
            .json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));
      }
   }

   // The updateUserAvatar function updates the user's avatar image
   static async updateUserAvatar(req, res) {
      try {
         const avatarLocalPath = req.file?.path;
         const { employeeId } = req.params;
         const profile = await Employee.findById(employeeId);
         console.log(profile)
         if (!profile) {
            throw new ApiError(404, "User not found");
         }

         if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is missing");
         }

         // Uploading the avatar image to Cloudinary
         const avatar = await uploadOnCloudinary(avatarLocalPath);

         if (!avatar.url) {
            throw new ApiError(400, "Error while uploading avatar");
         }

         // Updating the profile's avatar field and saving the changes
         profile.avatar = avatar.url;
         await profile.save();
         return res.status(200).json(new ApiResponse(200, profile, "Avatar image updated successfully"));
      } catch (error) {
         return res.status(error.status || 400).json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));
      }
   }
}

export const registerEmployee = asyncHandler(UserController.registerEmployee);
export const updateEmployeeDetails = asyncHandler(UserController.updateEmployeeDetails);
export const allEmployeeDetails = asyncHandler(UserController.getAllEmployee);
export const getEmployeeDetails = asyncHandler(UserController.getEmployeeDetails);
export const deleteEmployee = asyncHandler(UserController.deleteEmployee);

export const updateUserAvatar = asyncHandler(UserController.updateUserAvatar)