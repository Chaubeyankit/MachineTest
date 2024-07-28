import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const authenticate = asyncHandler(async (req, res, next) => {

   const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

   if (!token) throw new ApiError(401, 'Authentication failed!');

   try {
      // Verify the JWT Token
      const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = verifiedToken
      next()
   }
   catch (error) {
      return res
         .status(error.status || 401)
         .json(new ApiResponse(error.status || 500, null, error.message || 'Invalid access token'));
   }
})

export const authorizeAdmin = (req, res, next) => {
   if (req.user.role !== 'admin') {
      throw new ApiError(403, 'Access forbidden: Admins only');
   }
   next()
}