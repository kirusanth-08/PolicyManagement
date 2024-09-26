const mongoose = require("mongoose");

const SaamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoLinks: [
    {
      url: { type: String },
      description: { type: String },
    },
  ],
  documents: [
    {
      fileName: { type: String },
      downloadLink: { type: String },
    },
  ],
  quizzes: [
    {
      question: { type: String },
      options: [{ type: String }],
      correctAnswer: { type: String },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Saam = mongoose.model("Saam", SaamSchema);
module.exports = Saam;
