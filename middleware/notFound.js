// middleware/notFound.js
const fs = require("fs");
const path = require("path");

function writeLog(file, message) {
  const logDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  fs.appendFileSync(path.join(logDir, file), message);
}

function notFound(req, res, next) {
  const logMessage = `[${new Date().toISOString()}] [WARN] ${req.method} ${
    req.originalUrl
  } 404 Not Found\n`;

  console.warn(logMessage.trim());
  writeLog("request.log", logMessage);

  res.status(404).json({ status: 404, error: "Endpoint tidak ditemukan" });
}

module.exports = notFound;
