import { check } from "express-validator";

export const RegisterSchema = [
  check("name").trim().isAlpha().withMessage("Name should be Alphabets only"),

  check("username", "Username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("Username should be alphanumeric character only")
    .trim()
    .isLength({ min: 3, max: 32 }),

  check("password", "Password is required")
    .isLength({ min: 3, max: 100 })
    .trim(),

  check("email", "Email is required").exists().isEmail(),
];
