const fs = require('fs');
const path = require('path');

const logMessage = (filePath, level, message) => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

    console.log(log.trim());

    fs.appendFile(filePath, log, (err) => {
        if (err) {
            console.error(`Failed to write log to ${filePath}`, err);
        }
    });
};

const logger = (component) => {
    const logFilePath = path.join(__dirname, '../logs', `${component}.log`);

    if (!fs.existsSync(path.join(__dirname, '../logs'))) {
        fs.mkdirSync(path.join(__dirname, '../logs'));
    }

    return {
        info: (message) => logMessage(logFilePath, 'info', message),
        warn: (message) => logMessage(logFilePath, 'warn', message),
        error: (message) => logMessage(logFilePath, 'error', message),
    };
};

module.exports = logger;
