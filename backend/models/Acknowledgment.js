// models/Acknowledgment.js
const mongoose = require("mongoose");

const AcknowledgmentSchema = new mongoose.Schema({
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policy",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  acknowledgedAt: {
    type: Date,
    default: Date.now,
  },
  quizAttempts: {
    type: Number,
    default: 0, // Tracks number of quiz attempts
  },
  quizScore: {
    type: Number, // You could store a score if quizzes are completed
    default: null,
  },
  trainingCompleted: {
    type: Boolean,
    default: false, // Tracks whether the user completed any associated training
  },
  reportLog: [
    {
      date: { type: Date, default: Date.now },
      status: { type: String, enum: ["acknowledged", "incomplete", "completed"], default: "incomplete" },
    },
  ],
});

const Acknowledgment = mongoose.model("Acknowledgment", AcknowledgmentSchema);
module.exports = Acknowledgment;