/*
 *** IMPORTS ***
 */

// General
const express = require("express");
const path = require("path");
const { port } = require("./src/config/args");
const exphbs = require("express-handlebars");
const session = require("express-session");
const compression = require("compression");
const logger = require("./src/middleware/logger");
const customMorgan = require("./src/middleware/customMorgan");

// Messages controller
const { messagesDao } = require("./src/daos/index");

// Routers
const apiRouter = require("./src/routes/apiRouter");
const renderRouter = require("./src/routes/renderRouter");

// Passport
const { passport } = require("./src/utils/passport");

// Socket
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");


/*
 *** APPLICATION ***
 */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Settings
app.set("port", port);

app.engine(".handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/src/views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression())

app.use(
    session({
        secret: "fraseSecretaSt",
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 10 }, // 1 seg * Segundos * Minutos
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", customMorgan,  apiRouter);
app.use("/", customMorgan, renderRouter);
app.get("*", (req,res) => {
    logger.warn(`${req.method} ${req.url} no implementado`);
    res.status(404).render('404');

 } )

/*
 *** SOCKET ***
 */
let msgArray;
messagesDao.findAll().then((res) => {
    msgArray = res;
});

io.on("connection", async (socket) => {
    // Mensajes
    socket.on("getMessages", () => {
        const normalizedMessages = messagesDao.normalizeMessages(msgArray);
        socket.emit("inicioMsg", normalizedMessages);
    });

    socket.on("newMessage", async (newMsg) => {
        io.sockets.emit("newMessage", newMsg);

        const newMsgWithId = await messagesDao.save(newMsg);
        msgArray.push(newMsgWithId);
    });
});

module.exports = { httpServer, app };
