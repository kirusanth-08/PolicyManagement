// controllers/PolicyController.js
const Policy = require("../models/Policy");
const Acknowledgment = require("../models/Acknowledgment");

// Create new policy
const createPolicy = async (req, res) => {
  try {
    const { title, description, domain, version } = req.body;
    const policy = new Policy({ title, description, domain, version });
    await policy.save();
    res.status(201).json({ policy, message: "Policy created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all policies
const getAllPolicies = async (req, res) => {
  try {
    const { search } = req.query;

    // If a search term is provided, filter policies by title or description
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: new RegExp(search, "i") },  // case-insensitive search
          { description: new RegExp(search, "i") }
        ]
      };
    }

    const policies = await Policy.find(query);
    res.status(200).json(policies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific policy by ID
const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.policyId);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.json({ policy });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update policy
const updatePolicy = async (req, res) => {
  try {
    const { title, description, domain, version } = req.body;
    const policy = await Policy.findByIdAndUpdate(req.params.policyId, {
      title,
      description,
      domain,
      version,
    }, { new: true });
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.json({ policy, message: "Policy updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete policy
const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.policyId);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.json({ message: "Policy deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Acknowledge a policy
const acknowledgePolicy = async (req, res) => {
  try {
    const { policyId } = req.params;
    const acknowledgment = new Acknowledgment({
      policyId,
      userId: req.user._id,
    });
    await acknowledgment.save();
    res.json({ message: "Policy acknowledged successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all acknowledgments for a specific policy
const getAcknowledgmentsForPolicy = async (req, res) => {
  try {
    const acknowledgments = await Acknowledgment.find({ policyId: req.params.policyId }).populate('userId', 'name email');
    res.json({ acknowledgments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
  acknowledgePolicy,
  getAcknowledgmentsForPolicy,
};