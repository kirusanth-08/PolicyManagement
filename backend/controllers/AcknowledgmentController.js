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

const getAcknowledgments = async (req, res) => {
  try {
    const acknowledgments = await Acknowledgment.find( { userId: req.user._id } );
    res.json(acknowledgments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch acknowledgments' });
  }
}

module.exports = { createAcknowledgment, getAcknowledgments };