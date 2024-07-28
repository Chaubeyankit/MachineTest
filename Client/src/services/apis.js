const BASE_URL = "http://localhost:8000/api/v1"

//Auth endpoints

export const endpoints = {
   SIGNUP_API: BASE_URL + "/auth/register",
   LOGIN_API: BASE_URL + "/auth/login",
   EMP_REG_API: BASE_URL + "/user/employee/register"
}

export const userEndpoints = {
   GET_EMPLOYEES_API: BASE_URL + "/user/employees/getDetails",
   EMPLOYEE_API: BASE_URL + "/user/employee",
   UPDATE_EMPLOYEE_DETAILS: BASE_URL + "/user/employees",
   DELETE_EMPLOYEE_API: BASE_URL + "/user/employees-delete",
   AVATAR_API: BASE_URL + "/user/uploadAvatar"
}