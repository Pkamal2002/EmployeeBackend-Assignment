import { body } from "express-validator";

export const validateEmployeeInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("phone")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be 10 digits")
    .notEmpty()
    .withMessage("Phone number is required"),
  body("designation")
    .isIn(["Manager", "Developer", "Tester", "Designer"])
    .withMessage("Designation is not valid")
    .notEmpty()
    .withMessage("Designation is required"),
  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other")
    .notEmpty()
    .withMessage("Gender is required"),
  body("course").notEmpty().withMessage("Course is required"),
];
