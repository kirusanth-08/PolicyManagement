const Saam = require("../models/saam");
const Acknowledgment = require("../models/Acknowledgment");
const { logger } = require('../middleware/Logger');

const createSaam = async (req, res) => {
  try {
    const { title, description, videoLinks, documents, quizzes } = req.body;
    const saam = new Saam({ title, description, videoLinks, documents, quizzes });
    await saam.save();
    res.status(201).json({ saam, message: "Security Awareness module created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSaam = async (req, res) => {
  try {
    const { search } = req.query;

    // If a search term is provided, filter SAAM modules by title or description
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: new RegExp(search, "i") },  // case-insensitive search
          { description: new RegExp(search, "i") }
        ]
      };
    }
    const saamModules = await Saam.find(query);
    res.status(200).json(saamModules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSaamById = async (req, res) => {
  try {
    const saam = await Saam.findById(req.params.saamId);
    if (!saam) {
      return res.status(404).json({ message: "Security Awareness module not found" });
    }
    res.json({ saam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const submitQuiz = async (req, res) => {
    try {
      const { saamId } = req.params;
      const { answers } = req.body;
  
      const saam = await Saam.findById(saamId);
      if (!saam) {
        return res.status(404).json({ message: "SAAM module not found" });
      }
  
      // Find acknowledgment for this user and policy
      let acknowledgment = await Acknowledgment.findOne({
        userId: req.user._id,
        policyId: saamId,
      });
  
      // Check if the user has already attempted the quiz more than 3 times
      if (acknowledgment && acknowledgment.quizAttempts >= 3) {
        return res.status(403).json({
          message: "You have exceeded the maximum number of quiz attempts.",
        });
      }
  
      // Calculate the score
      let score = 0;
      saam.quizzes.forEach((quiz, index) => {
        if (quiz.correctAnswer === answers[index]) {
          score++;
        }
      });
  
      // If acknowledgment exists, update the score and attempt count
      if (acknowledgment) {
        acknowledgment.quizAttempts += 1;
        acknowledgment.quizScore = score;
        await acknowledgment.save();
      } else {
        // If acknowledgment does not exist, create a new one
        acknowledgment = new Acknowledgment({
          userId: req.user._id,
          policyId: saamId,
          quizAttempts: 1,
          quizScore: score,
        });
        await acknowledgment.save();
      }
  
      const totalQuestions = saam.quizzes.length;
   
      // Log quiz submission
      logger.info({ message: `User ${req.user.name} submitted quiz`, userId: req.user._id, score });

      res.status(200).json({
        score,
        totalQuestions,
        attempts: acknowledgment.quizAttempts, // Return attempts as well
        message: "Quiz submitted successfully",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {
  createSaam,
  getAllSaam,
  getSaamById,
  submitQuiz,
};
