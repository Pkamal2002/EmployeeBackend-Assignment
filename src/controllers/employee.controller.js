import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import employeeDetailModel from "../models/employeeDetail.model.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create Employee
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, designation, gender, course, avatar } = req.body;

  // Validate input data
  if (!name || !email || !phone || !designation || !gender || !course) {
    throw new ApiError(400, "All fields are required");
  }

  const existedEmployee = await employeeDetailModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (existedEmployee) {
    throw new ApiError(409, "Employee with this email or phone already exists");
  }

  const employee = await employeeDetailModel.create({
    name,
    email,
    phone,
    designation,
    gender,
    course,
    avatar,
  });

  const createdEmployee = await employeeDetailModel.findById(employee._id);

  if (!createdEmployee) {
    throw new ApiError(500, "Something went wrong while creating the employee");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdEmployee, "Employee created successfully"));
});

// Get All Employees
const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await employeeDetailModel.find();
  return res
    .status(200)
    .json(new ApiResponse(200, employees, "All employees fetched successfully"));
});

// Get Employee by ID
const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const employee = await employeeDetailModel.findById(id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee details fetched successfully"));
});

// Update Employee
const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, designation, gender, course, avatar } = req.body;

  const employee = await employeeDetailModel.findById(id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  employee.name = name || employee.name;
  employee.email = email || employee.email;
  employee.phone = phone || employee.phone;
  employee.designation = designation || employee.designation;
  employee.gender = gender || employee.gender;
  employee.course = course || employee.course;
  employee.avatar = avatar || employee.avatar;

  await employee.save({ validateBeforeSave: false });

  const updatedEmployee = await employeeDetailModel.findById(id);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEmployee, "Employee updated successfully"));
});

// Delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const employee = await employeeDetailModel.findById(id);
  
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }
  
    await employeeDetailModel.findByIdAndDelete(id); // Use findByIdAndDelete instead
  
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Employee deleted successfully"));
  });
  

// Update Employee Course (Additional Example)
const updateEmployeeCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { course } = req.body;

  if (!course) {
    throw new ApiError(400, "Course is required");
  }

  const employee = await employeeDetailModel.findByIdAndUpdate(
    id,
    { course },
    { new: true, runValidators: true }
  );

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee course updated successfully"));
});

export {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateEmployeeCourse
};
