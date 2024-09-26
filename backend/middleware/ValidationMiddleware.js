const { body, validationResult } = require("express-validator");

// Validation rules for user registration
const registerValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be exactly 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),

  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .matches(/@gmail\.com$/)
    .withMessage("Email must be a Gmail address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation rules for user login
const loginValidationRules = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .matches(/@gmail\.com$/)
    .withMessage("Email must be a Gmail address"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validation rules for updating user profile
const updateProfileValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .matches(/@gmail\.com$/)
    .withMessage("Email must be a Gmail address"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .trim() // Trim leading and trailing spaces
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be exactly 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),
];

// Validation rules for creating or updating a policy
const policyValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("domain")
    .notEmpty()
    .withMessage("Domain is required")
    .isLength({ max: 50 })
    .withMessage("Domain cannot exceed 50 characters"),

  body("version")
    .notEmpty()
    .withMessage("Version is required"),
];



// Middleware function to validate the request and handle errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
  policyValidationRules,
  validate,
};
