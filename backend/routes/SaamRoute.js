const express = require("express");
const router = express.Router();
const SaamController = require("../controllers/SaamController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const { submitQuiz, createSaam, getAllSaam, getSaamById } = require("../controllers/SaamController");


router.post("/", AuthMiddleware, SaamController.createSaam);
router.get("/", AuthMiddleware, SaamController.getAllSaam);
router.get("/:saamId", AuthMiddleware, SaamController.getSaamById);
router.post("/:saamId/submitQuiz", AuthMiddleware, SaamController.submitQuiz);

module.exports = router;
