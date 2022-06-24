const { app, httpServer } = require("./app");
const logger = require('./src/middleware/logger');
require('dotenv').config()

// Connection
const server = httpServer.listen(app.get("port"), () => {
    logger.info(`Servidor ejecutado en puerto ${app.get("port")}`);
});

server.on("error", (error) => {
    logger.error(`Se ha producido un error: ${error.code} (${error.errno})`);
});