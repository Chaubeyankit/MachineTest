import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { validateEmail } from "../../utils/validators.js"
import { User } from "../models/user.model.js"

const options = {
   httpOnly: true,
   secure: true
}

const generateAccessTokens = async function (userId) {
   try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      return { accessToken }

   } catch (error) {
      throw new ApiError(500, "server error while generation token, plese try again !!")
   }
}

class AuthController {
   static async userRegistration(req, res, next) {
      try {
         const { username, name, email, password } = req.body;
         if ([email, name, password].some((field) =>
            field?.trim() === "")
         ) {
            throw new ApiError(400, 'All fields are required');
         }

         if (!validateEmail(email)) {
            throw new ApiError(400, 'Invalid email format');
         }

         const isUserExist = await User.findOne({ email })

         if (isUserExist) {
            throw new ApiError(409, "User with this email or username already exists!");
         }

         const user = await User.create({
            email,
            name,
            password,
            role: 'admin'
         });

         const createUser = await User.findById(user._id).select(
            "-password"
         );

         if (!createUser) {
            throw new ApiError(500, "Server error, try again!");
         }

         return res.status(201).json(
            new ApiResponse(200, createUser, "User registered successfully")
         );
      }
      catch (error) {
         return res
         .status(error.status || 400)
         .json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));
      }
   }
   // User login by their credentials either email id or UserId and password
   static async userLogin(req, res, next) {
      try {
         const { email, password } = req.body;
         if (!email) {
            throw new ApiError(400, "Username or email is required");
         }

         if (email && !validateEmail(email)) {
            throw new ApiError(400, 'Invalid email format');
         }

         const isUserExist = await User.findOne({ email })

         if (!isUserExist) {
            throw new ApiError(400, "User does not exist!");
         }

         const isPasswordValid = await isUserExist.isPasswordCorrect(password);
         if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials!");
         }

         const { accessToken } = await generateAccessTokens(isUserExist._id);

         const loggedInUser = await User.findById(isUserExist._id).select("-password");

         return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(
               new ApiResponse(
                  200,
                  { user: loggedInUser, accessToken },
                  "User logged in successfully"
               )
            );
      }
      catch (error) {
         return res
            .status(error.status || 400)
            .json(new ApiResponse(error.status || 400, null, error.message || 'Internal Server Error'));

      }
   }
}

export const userRegistration = asyncHandler(AuthController.userRegistration);
export const userLogin = asyncHandler(AuthController.userLogin);
