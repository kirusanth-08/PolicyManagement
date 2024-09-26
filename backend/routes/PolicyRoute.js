// routes/PolicyRoute.js
const express = require("express");
const router = express.Router();
const PolicyController = require("../controllers/PolicyController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const ValidationMiddleware = require("../middleware/ValidationMiddleware");
const { getAllPolicies } = require("../controllers/PolicyController");
const adminCheck = require("../middleware/AdminCheck");

// Admin routes
// Use validation middleware for policy creation
router.post(
    "/",
    AuthMiddleware,
    adminCheck,
    ValidationMiddleware.policyValidationRules,
    ValidationMiddleware.validate,
    PolicyController.createPolicy
  );// Admin only
  
  // Use validation middleware for policy update
  router.put(
    "/:policyId",
    AuthMiddleware,
    adminCheck,
    ValidationMiddleware.policyValidationRules,
    ValidationMiddleware.validate,
    PolicyController.updatePolicy
  ); // Admin only
router.delete("/:policyId",
  AuthMiddleware,
  adminCheck,
  PolicyController.deletePolicy); // Admin only

// User routes
router.get("/",
  AuthMiddleware,
  PolicyController.getAllPolicies);

router.get("/:policyId",
  AuthMiddleware,
  PolicyController.getPolicyById);

router.post("/:policyId/acknowledge",
   AuthMiddleware,
   PolicyController.acknowledgePolicy);

// Define the route for fetching all policies
router.get("/api/policies",
   getAllPolicies);

// Admin can view acknowledgments
router.get("/:policyId/acknowledgments",
  AuthMiddleware, 
  adminCheck,
  PolicyController.getAcknowledgmentsForPolicy);

module.exports = router;
