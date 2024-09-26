const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']  // Request profile and email from Google
}));

// Callback route after Google authentication
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to dashboard or profile
    res.redirect('/dashboard');
  }
);

// Route to log out
router.get('/logout', (req, res) => {
  req.logout();  // Provided by Passport
  res.redirect('/');
});

module.exports = router;
