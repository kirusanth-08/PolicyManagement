const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const ValidationMiddleware = require("../middleware/ValidationMiddleware");
//const { registerUser, loginUser } = require("../controllers/UserController");

// Add forgotPassword and resetPassword routes
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password/:token", UserController.resetPassword);

// user register
router.post(
  "/register",
  ValidationMiddleware.registerValidationRules,
  ValidationMiddleware.validate,
  UserController.registerUser
);

// user login
router.post(
  "/login",
  ValidationMiddleware.loginValidationRules,
  ValidationMiddleware.validate,
  UserController.loginUser
);

// user view profile
router.get("/profile/:userId", AuthMiddleware, UserController.getUserProfile);

// user update profile
router.put(
  "/profile/update/:userId",
  AuthMiddleware,
  ValidationMiddleware.updateProfileValidationRules,
  ValidationMiddleware.validate,
  UserController.updateUserProfile
);

// user delete profile
router.delete(
  "/profile/delete/:userId",
  AuthMiddleware,
  UserController.deleteUserProfile
);

// admin view all users
router.get("/users", AuthMiddleware, UserController.getAllUsers);

module.exports = router;
