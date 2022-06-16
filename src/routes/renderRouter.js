const renderRouter = require("express").Router();
const { usersDao } = require("../daos/index");
const { isAuth } = require("../middleware/auth");

renderRouter.get("/", isAuth, async (req, res) => {
    const user = req.user;

    res.render("home", { user });
});

renderRouter.get("/signup", (req, res) => {
    res.render("register");
});

renderRouter.get("/login", (req, res) => {
    if (req.session.name) res.redirect("/");
    else res.render("login");
});

renderRouter.get("/logout", isAuth, async (req, res) => {
    const name = req.user.name;

    await req.session.destroy();
    res.render("logout", { name });
});

renderRouter.get("/info", (req, res) => {
    console.log(require("os").cpus().length)
    const info = {
        argumentos: process.argv.slice(2),
        OS: process.platform,
        nodeVersion: process.version,
        RSS: process.memoryUsage().rss,
        execPath: process.execPath,
        processID: process.pid,
        processPath: process.argv[1],
        numCPUs:  require("os").cpus().length
    };
    res.render("info", { info });
});

module.exports = renderRouter;
