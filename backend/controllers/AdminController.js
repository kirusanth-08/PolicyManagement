// controllers/AdminController.js
const fs = require('fs');
const path = require('path');

// Controller to view logs
const viewLogs = (req, res) => {
  const logFile = path.join(__dirname, '../logs/activity.log');
  
  fs.readFile(logFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to read log file' });
    }
    
    // Send logs as plain text
    res.status(200).send(`<pre>${data}</pre>`);
  });
};

// Admin Dashboard controller
const getDashboard = (req, res) => {
    // You can fetch and display user stats, acknowledgment rates, or other data here
    res.status(200).json({
      message: "Welcome to the Admin Dashboard",
      // Add more statistics/data here
    });
  };

module.exports = { 
    viewLogs,
    getDashboard,
};
