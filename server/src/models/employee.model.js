import { Schema, model } from "mongoose"

const employeeSchema = new Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
      index: true
   },
   mobile: {
      type: String,
      required: true,
      trim: true,
   },
   designation: {
      type: String,
      required: true,
      enum: ['Manager', 'HR', 'Sales']
   },
   gender: {
      type: String,
      required: true,
      trim: true,
      enum: ['Male', 'Female']
   },
   course: {
      type: String,
      required: true,
      enum: ['MCA', 'BCA', 'BSC']
   },
   avatar: {
      type: String, // cloudinary url
   },
   role: {
      type: String,
      trim: true,
      enum: ['employee'],
      default: 'employee'
   },


}, { timestamps: true })


export const Employee = model("Employee", employeeSchema)