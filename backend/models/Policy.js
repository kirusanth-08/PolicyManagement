// models/Policy.js
const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,  // e.g., "Data Protection", "Access Control"
  },
  version: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Policy = mongoose.model("Policy", PolicySchema);
module.exports = Policy;