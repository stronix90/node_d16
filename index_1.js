const { app, httpServer } = require("./app");
const { modo } = require("./src/config/args");
require("dotenv").config();

// Connection
if (modo === "fork") {
    const server = httpServer.listen(app.get("port"), () => {
        console.log(`Servidor ejecutado en puerto ${app.get("port")}`);
    });

    server.on("error", (error) => {
        console.log(`Se ha producido un error: ${error.code} (${error.errno})`);
    });
} else {
    const cluster = require("cluster");
    const numCPUs = require("os").cpus().length;

    if (cluster.isMaster) {
        console.log(`Cantidad de procesadores: ${numCPUs}`);
        console.log(
            `Master ${process.pid} is running on port ${app.get("port")}`
        );

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker) => {
            console.log(
                `worker ${worker.process.pid} died`,
                new Date().toLocaleString()
            );
            cluster.fork();
        });
    } else {
        app.get("/", (req, res) => {
            res.send(
                `worker ${
                    process.pid
                } is running. Fecha: ${new Date().toLocaleString()}`
            );
        });

        // Server
        const server = httpServer.listen(app.get("port"), () => {
            console.log(
                `Worker ${process.pid} started on port ${app.get("port")}`
            );
        });
    }
}
