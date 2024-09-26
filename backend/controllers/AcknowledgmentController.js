const Acknowledgment = require('../models/Acknowledgment');

const createAcknowledgment = async (req, res) => {
  const { policyId, userId } = req.body;

  try {
    const acknowledgment = new Acknowledgment({
      policyId,
      userId,
    });

    await acknowledgment.save();
    res.status(201).json(acknowledgment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to acknowledge policy' });
  }
};

module.exports = { createAcknowledgment };
