// middleware/errorHandler.js
const fs = require("fs");
const path = require("path");

function writeLog(file, message) {
  const logDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  fs.appendFileSync(path.join(logDir, file), message);
}

function errorHandler(err, req, res, next) {
  const logMessage = `[${new Date().toISOString()}] [ERROR] ${req.method} ${
    req.originalUrl
  } ${err.message}\n`;

  console.error(logMessage.trim());
  writeLog("error.log", logMessage);

  res.status(500).json({ status: 500, error: err.message });
}

module.exports = errorHandler;
