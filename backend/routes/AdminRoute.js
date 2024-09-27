// routes/AdminRoute.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const AuthMiddleware = require("../middleware/AuthMiddleware");  // Assume this checks if the user is an admin
const adminCheck = require('../middleware/AdminCheck');

// View logs (admin only)
router.get("/logs",
    AuthMiddleware,
    adminCheck,
    AdminController.viewLogs);

// Add other admin routes here as needed, for example:
router.get('/dashboard', [AuthMiddleware, adminCheck], AdminController.getDashboard);

module.exports = router;