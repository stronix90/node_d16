const logger = require ('./logger');

const customMorgan = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}

module.exports = customMorgan;