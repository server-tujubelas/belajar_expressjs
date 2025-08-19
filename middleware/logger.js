// middleware/logger.js
const fs = require("fs");
const path = require("path");

function writeLog(file, message) {
  const logDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  fs.appendFileSync(path.join(logDir, file), message);
}

function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMessage = `[${new Date().toISOString()}] [INFO] ${req.method} ${
      req.originalUrl
    } ${res.statusCode} - ${duration}ms\n`;

    console.log(logMessage.trim());
    writeLog("request.log", logMessage);
  });

  next();
}

module.exports = logger;