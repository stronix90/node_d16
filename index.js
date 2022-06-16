const { app, httpServer } = require("./app");
require('dotenv').config()

// Connection
const server = httpServer.listen(app.get("port"), () => {
    console.log(`Servidor ejecutado en puerto ${app.get("port")}`);
});

server.on("error", (error) => {
    console.log(`Se ha producido un error: ${error.code} (${error.errno})`);
});