// middleware/Logger.js
const { createLogger, transports, format } = require('winston');
const path = require('path');

// Create logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../logs/activity.log'),
      level: 'info',
    }),
    new transports.Console({ format: format.simple() })
  ]
});

// Middleware function to log activity
const logActivity = (req, res, next) => {
  const user = req.user ? req.user.name : 'Unknown User';
  logger.info({
    user,
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
  next();
};

module.exports = { 
    logger,
    logActivity,
 };
