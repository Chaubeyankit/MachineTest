import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../apis";

const {
   GET_EMPLOYEES_API,
   EMPLOYEE_API,
   UPDATE_EMPLOYEE_DETAILS,
   DELETE_EMPLOYEE_API,
   AVATAR_API,
} = userEndpoints

export async function getEmployeesDetails(accessToken) {
   try {
      const response = await apiConnector("GET", GET_EMPLOYEES_API, null,
         {
            Authorization: `Bearer ${accessToken}`,
         }
      );
      return response.data;
   } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
   }
}

export async function getEmployeeDetails(accessToken, id) {
   try {
      const response = await apiConnector("GET", `${EMPLOYEE_API}/${id}`, null,
         {
            Authorization: `Bearer ${accessToken}`,
         }
      );
      return response.data;
   } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
   }
}

export async function updateEmployee(accessToken, id, employeeDetails) {
   try {
      const response = await apiConnector("PUT", `${UPDATE_EMPLOYEE_DETAILS}/${id}`, employeeDetails,
         {
            Authorization: `Bearer ${accessToken}`,
         }
      );
      return response.data;
   } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
   }
}

export async function deleteEmployee(accessToken, id) {
   console.log(id)
   try {
      const response = await apiConnector("DELETE", `${DELETE_EMPLOYEE_API}/${id}`, null,
         {
            Authorization: `Bearer ${accessToken}`,
         }
      );
      return response.data;
   } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
   }
}

export async function updateAvatar(accessToken, formData, id) {
   console.log(formData);
   try {
      const response = await apiConnector("PUT", `${AVATAR_API}/${id}`, formData,
         {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
         }
      )
      return response.data;
   } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
   }
}