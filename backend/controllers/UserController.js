const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger } = require('../middleware/Logger');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Controller to register a new user by hashing their password and saving them to the database
const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Email address is already registered" });
    }

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to log in a user by validating their credentials and generating a JWT token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Email, Try again!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Password, Try again!");
    }

     // Include the role in the token payload
    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role }, // Include role here
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
      // Log successful login
      logger.info({ message: `User ${user.name} logged in`, userId: user._id });
  
      res.json({ token, user: { name: user.name, role: user.role }, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    
};

// // Controller to log out a user by removing their token from local storage
// const logoutUser = async (req, res) => {
//   try {
//     localStorage.removeItem("token");
//     res.json({ message: "Logout successful" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Forgot password handler
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Create reset token
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Configure nodemailer (you may want to customize this part based on your email service)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your email password
    }
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset',
    html: `<p>You requested for a password reset. Click <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">here</a> to reset your password.</p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.status(200).json({ message: 'Password reset email sent successfully' });
  });
};

// Reset password handler
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash new password and save
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};


// Controller to update the user's profile information in the database
const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = name;
    (user.phone = phone), (user.email = email);

    await user.save();
    res.json({ user, message: "User profile updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete the user's profile from the database
const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get a list of all users with the role 'user', accessible only to admin users
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // Find all users with the role 'user', excluding the password and role field
    const users = await User.find({ role: "user" }, { password: 0, role: 0 });
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get the profile of the logged-in user
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all controller functions
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  // logoutUser,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserProfile,
};
