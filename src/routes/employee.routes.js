import { Router } from "express";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    updateEmployeeCourse,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateEmployeeInput } from "../helper/employeeValidator.js"; 
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = Router();

// Create Employee Route (with file upload if necessary)
router.route("/create").post(
    upload.fields([
        { name: "avatar", maxCount: 1 }, // if you're uploading employee avatars
    ]),
    validateEmployeeInput, 
    handleValidationErrors,
    createEmployee,
);

// Get All Employees
router.route("/").get( getAllEmployees);

// Get Employee by ID
router.route("/:id").get( getEmployeeById);

// Update Employee
router.route("/:id").patch(
    upload.fields([
        { name: "avatar", maxCount: 1 },
    ]),
    validateEmployeeInput,
    handleValidationErrors,
    updateEmployee
);

// Delete Employee
router.route("/:id").delete(deleteEmployee);

// Update Employee Course (Example of specific field update)
router.route("/:id/course").patch(verifyJWT, updateEmployeeCourse);

export default router;
