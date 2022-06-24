const winston = require("winston");

const buildProdLogger = () => {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "info",
            }),

            new winston.transports.File({
                filename: "warn.log",
                level: "warn",
            }),

            new winston.transports.File({
                filename: "error.log",
                level: "error",
            }),
        ],
    });
};

const logger = buildProdLogger();
// process.env.NODE_ENV === "PROD" ? buildProdLogger() : buildDevLogger();

module.exports = logger;
