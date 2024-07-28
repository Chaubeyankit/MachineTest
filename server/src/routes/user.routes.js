import { Router } from "express"
import { registerEmployee, updateEmployeeDetails, allEmployeeDetails, deleteEmployee, getEmployeeDetails, updateUserAvatar } from "../controllers/user.controller.js"
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/employee/register").post(authenticate, authorizeAdmin, registerEmployee);

router.route('/employees/:employeeId').put(authenticate, authorizeAdmin, updateEmployeeDetails);

router.route("/employees/getDetails").get(authenticate, authorizeAdmin, allEmployeeDetails)

router.route("/employee/:employeeId").get(authenticate, authorizeAdmin, getEmployeeDetails)

router.route("/employees-delete/:id").delete(authenticate, authorizeAdmin, deleteEmployee)

// Endpoint to update user avatar
router.put('/uploadAvatar/:employeeId', authenticate, authorizeAdmin, upload.single('avatar'), updateUserAvatar);

export default router