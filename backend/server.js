const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet"); 
const UserRoute = require("./routes/UserRoute");
const bodyParser = require("body-parser");
const PolicyRoute = require("./routes/PolicyRoute");
const AcknowledgeRoute = require("./routes/AcknowledgmentRoute");
const SaamRoute = require("./routes/SaamRoute");
const AdminRoute = require('./routes/AdminRoute');
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AuthRoute = require('./routes/AuthRoute');

require("dotenv").config();

//express app
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;


// Middleware setup
app.use(cors());
app.use(helmet()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", UserRoute);
app.use("/api/acknowledgments", AcknowledgeRoute);
app.use("/api/policies", PolicyRoute);
app.use("/api/saam", SaamRoute);
app.use("/api/admin", AdminRoute);
app.use('/auth', AuthRoute);


mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("🔌 Connected to the Database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port ${PORT}`);
});

module.exports = app;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  // Find or create user in the database
  // User.findOne({ googleId: profile.id }, (err, user) => done(err, user));
  return done(null, profile);
}));
// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => 
  {
  done(null, user);
});