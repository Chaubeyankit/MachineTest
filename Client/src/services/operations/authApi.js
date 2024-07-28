import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
const {
   LOGIN_API,
   SIGNUP_API,
   EMP_REG_API,
} = endpoints


export async function login(credentials) {
   try {
      const response = await apiConnector("POST", LOGIN_API, credentials);
      return response.data;
   }
   catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
   }
}
export async function registerAdmin(credentials) {
   try {
      const response = await apiConnector("POST", SIGNUP_API, credentials);
      return response.data;
   }
   catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
   }
}

export async function registerEmployee(employeeInfo, accessToken) {
   try {
      const response = await apiConnector("POST", EMP_REG_API, employeeInfo,
         {
            Authorization: `Bearer ${accessToken}`,
         }
      );
      return response.data;
   }
   catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
   }
}